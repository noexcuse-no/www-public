#!/usr/bin/env node
/**
 * check-doc-structure.mjs — Structural validation of .specs/ and .design/ directories.
 *
 * Flags documents in active locations that are marked as archived/superseded/obsolete/done
 * without a clear current purpose. Uses explicit frontmatter status field.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = usage/config error.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONVENTIONS_FILE = path.join(ROOT, 'scripts', 'doc-conventions.json');

function usage() {
  console.error('Usage: node scripts/check-doc-structure.mjs [--check]');
  process.exit(2);
}

function loadConventions() {
  try {
    const content = fs.readFileSync(CONVENTIONS_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`[ERROR] Failed to load conventions: ${e.message}`);
    process.exit(2);
  }
}

function extractFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fmContent = fmMatch[1];
  const result = {};
  for (const line of fmContent.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      result[key] = value;
    }
  }
  return result;
}

function isAllowlisted(filePath, conventions) {
  const basename = path.basename(filePath);
  return conventions.allowlistedFiles.includes(basename);
}

function scanFile(filePath, conventions, violations) {
  if (isAllowlisted(filePath, conventions)) return;

  try {
    const content = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    const fm = extractFrontmatter(content);
    if (!fm) return; // No frontmatter = no status to check

    const status = fm.status;
    if (!status) return; // No status = fine

    const normalizedStatus = status.trim();
    if (conventions.flaggedStatuses.includes(normalizedStatus)) {
      // Check if it has a continuing purpose (e.g., "Current" in addition to "Done")
      // For now, flag any flagged status in active locations
      violations.push({
        path: filePath,
        line: 1, // Frontmatter is at top
        reason: `Document has flagged status "${normalizedStatus}" in active location`
      });
    }
  } catch (e) {
    // Skip unreadable files
  }
}

function walkDir(dir, conventions, violations) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        const skipDirs = new Set(['.git', 'node_modules', '_site', '.jekyll-cache', 'vendor', '.cache', 'tests', 'scripts', '.omo']);
        if (!skipDirs.has(entry.name)) {
          walkDir(fullPath, conventions, violations);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.md' || ext === '.markdown') {
          scanFile(relPath, conventions, violations);
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

  const conventions = loadConventions();
  const violations = [];

  // Scan active spec/design directories
  for (const specDir of conventions.specDirs) {
    const fullPath = path.join(ROOT, specDir);
    if (fs.existsSync(fullPath)) {
      walkDir(fullPath, conventions, violations);
    }
  }

  if (violations.length > 0) {
    console.error('[FAIL] Document structure violations:');
    for (const v of violations) {
      console.error(`  ${v.path}|${v.line}|${v.reason}`);
    }
    process.exit(1);
  } else {
    console.log('[OK] Document structure check passed — no violations found.');
    process.exit(0);
  }
}

main();