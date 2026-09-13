#!/usr/bin/env node
/**
 * Stale-reference integrity check — scans active docs for references
 * to deleted/archived historical structures. Exits non-zero on violations.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const ROOT = resolve(__dirname, '..');
const STALE_PATHS_FILE = resolve(ROOT, 'scripts/stale-paths.json');

function loadStalePaths() {
  return JSON.parse(readFileSync(STALE_PATHS_FILE, 'utf8'));
}

function isAllowlisted(filePath, allowlist) {
  const rel = filePath.replace(ROOT + '/', '');
  return allowlist.files.includes(rel);
}

function walk(dir, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      const ext = extname(file).toLowerCase();
      if (['.md', '.js', '.mjs', '.json', '.yml', '.yaml', '.txt', '.html'].includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function main() {
  console.log('🔍 Scanning for stale references to deleted/archived paths...\n');

  const config = loadStalePaths();
  const stalePaths = config.paths;
  const allowlist = config.allowlist;

  // Directories to scan (active docs only)
  const scanDirs = [
    'AGENTS.md',
    '.design',
    '.specs',
    '.omo/rules',
    'scripts',
    'tests',
    '_pages',
    '_includes',
    '_layouts',
  ];

  let totalViolations = 0;
  const checkedFiles = new Set();

  for (const scanDir of scanDirs) {
    const fullPath = resolve(ROOT, scanDir);
    if (!existsSync(fullPath)) continue;

    const files = statSync(fullPath).isFile() ? [fullPath] : walk(fullPath);

    for (const filePath of files) {
      if (checkedFiles.has(filePath)) continue;
      checkedFiles.add(filePath);

      // Skip allowlisted files
      if (isAllowlisted(filePath, allowlist)) continue;

      try {
        const content = readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          for (const stalePath of stalePaths) {
            if (line.includes(stalePath)) {
              const relPath = filePath.replace(ROOT + '/', '');
              console.error(`❌ stale-reference|${relPath}|${i + 1}|references deleted path: ${stalePath}`);
              totalViolations++;
            }
          }
        }
      } catch {
        // skip unreadable
      }
    }
  }

  if (totalViolations > 0) {
    console.error(`\n❌ Stale-reference check failed: ${totalViolations} violation(s) found`);
    process.exit(1);
  }

  console.log('✅ No stale references found in active documentation');
}

main().catch(e => {
  console.error('❌ Check failed:', e.message);
  process.exit(1);
});