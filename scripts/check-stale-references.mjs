#!/usr/bin/env node
/**
 * check-stale-references.mjs — Scan active docs for references to deleted/archived structures.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = usage/config error.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STALE_PATHS_FILE = path.join(ROOT, 'scripts', 'stale-paths.json');

function usage() {
  console.error('Usage: node scripts/check-stale-references.mjs [--check]');
  process.exit(2);
}

function loadStalePaths() {
  try {
    const content = fs.readFileSync(STALE_PATHS_FILE, 'utf8');
    return JSON.parse(content).stalePaths;
  } catch (e) {
    console.error(`[ERROR] Failed to load stale paths: ${e.message}`);
    process.exit(2);
  }
}

function isAllowlisted(filePath, line) {
  // CHANGELOG.md is allowlisted for historical mentions
  if (filePath === 'CHANGELOG.md') return true;
  // .omo/ directory is allowlisted (internal tooling)
  if (filePath.startsWith('.omo/')) return true;
  // scripts/ directory is allowlisted (tooling)
  if (filePath.startsWith('scripts/')) return true;
  // tests/ directory is allowlisted (test fixtures)
  if (filePath.startsWith('tests/')) return true;
  // mixed-rights-licensing spec documents audit where .research/ was checked and found empty
  if (filePath === '.specs/mixed-rights-licensing/README.md') return true;
  return false;
}

function scanFile(filePath, stalePaths, violations) {
  try {
    const content = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const stalePath of stalePaths) {
        if (line.includes(stalePath)) {
          if (!isAllowlisted(filePath, line)) {
            violations.push({
              path: filePath,
              line: i + 1,
              reason: `References stale path: ${stalePath}`
            });
          }
        }
      }
    }
  } catch (e) {
    // Skip unreadable files
  }
}

function walkDir(dir, stalePaths, violations, skipDirs = new Set(['.git', 'node_modules', '_site', '.jekyll-cache', 'vendor', '.cache', 'tests/fixtures'])) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        if (skipDirs.has(entry.name)) continue;
        walkDir(fullPath, stalePaths, violations, skipDirs);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const textExts = ['.md', '.markdown', '.html', '.htm', '.js', '.mjs', '.cjs', '.css', '.yml', '.yaml', '.json', '.toml', '.txt', '.sh', '.xml', '.svg', '.liquid', '.mjs'];
        if (textExts.includes(ext) || entry.name === 'AGENTS.md') {
          scanFile(relPath, stalePaths, violations);
        }
      }
    }
  } catch (e) {
    // Skip unreadable directories
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) usage();

  const stalePaths = loadStalePaths();
  const violations = [];

  // Scan active docs: AGENTS.md, .design/, .specs/, _pages/, _includes/, _layouts/, assets/
  const scanDirs = [
    path.join(ROOT, 'AGENTS.md'),
    path.join(ROOT, '.design'),
    path.join(ROOT, '.specs'),
    path.join(ROOT, '_pages'),
    path.join(ROOT, '_includes'),
    path.join(ROOT, '_layouts'),
    path.join(ROOT, 'assets'),
    path.join(ROOT, '_data'),
    path.join(ROOT, '_config.yml'),
  ];

  for (const scanPath of scanDirs) {
    if (fs.existsSync(scanPath)) {
      const stat = fs.statSync(scanPath);
      if (stat.isDirectory()) {
        walkDir(scanPath, stalePaths, violations);
      } else if (stat.isFile()) {
        const relPath = path.relative(ROOT, scanPath).replace(/\\/g, '/');
        scanFile(relPath, stalePaths, violations);
      }
    }
  }

  if (violations.length > 0) {
    console.error('[FAIL] Stale reference violations:');
    for (const v of violations) {
      console.error(`  ${v.path}|${v.line}|${v.reason}`);
    }
    process.exit(1);
  } else {
    console.log('[OK] Stale reference check passed — no violations found.');
    process.exit(0);
  }
}

main();