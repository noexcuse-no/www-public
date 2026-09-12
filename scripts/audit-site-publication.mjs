#!/usr/bin/env node
/**
 * audit-site-publication.mjs — Post-build audit of _site/ output.
 *
 * Scans the generated site for internal material, secrets, local paths,
 * and other content that must not be published. Uses an allowlist for
 * intentionally-published specials.
 *
 * Exit codes: 0 = clean, 1 = violations found, 2 = usage/config error.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT, '_site');
const ALLOWLIST_FILE = path.join(ROOT, 'scripts', 'site-audit-allowlist.json');

function usage() {
  console.error('Usage: node scripts/audit-site-publication.mjs [--check]');
  console.error('  --check    Exit non-zero on violations (default)');
  process.exit(2);
}

function loadAllowlist() {
  try {
    const content = fs.readFileSync(ALLOWLIST_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`[ERROR] Failed to load allowlist: ${e.message}`);
    process.exit(2);
  }
}

function isAllowed(relPath, allowlist) {
  // Exact match
  if (allowlist.allowlist.includes(relPath)) return true;
  // Prefix match for directories
  for (const prefix of allowlist.allowlist) {
    if (prefix.endsWith('/') && relPath.startsWith(prefix)) return true;
  }
  return false;
}

function checkFile(filePath, relPath, allowlist, violations) {
  const stats = fs.statSync(filePath);
  if (!stats.isFile()) return;

  // Check forbidden prefixes
  for (const prefix of allowlist.forbiddenPrefixes) {
    if (relPath.startsWith(prefix)) {
      violations.push({ kind: 'forbidden-prefix', path: relPath, reason: `Path under forbidden prefix: ${prefix}` });
      return;
    }
  }

  // Check forbidden patterns (filename)
  const basename = path.basename(filePath);
  for (const pattern of allowlist.forbiddenPatterns) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(basename)) {
      violations.push({ kind: 'forbidden-pattern', path: relPath, reason: `Filename matches forbidden pattern: ${pattern}` });
      return;
    }
  }

  // Check file content for local paths and secrets (text files only)
  const ext = path.extname(filePath).toLowerCase();
  const textExts = ['.html', '.css', '.js', '.json', '.xml', '.txt', '.md', '.yml', '.yaml', '.toml', '.svg', '.webmanifest'];
  if (textExts.includes(ext) || basename === 'security.txt' || basename === 'ai-transparency.json') {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      // Local filesystem paths
      for (const pattern of allowlist.localPathPatterns) {
        const regex = new RegExp(pattern.replace(/\\\\/g, '\\\\'), 'gi');
        if (regex.test(content)) {
          violations.push({ kind: 'local-path', path: relPath, reason: `Content contains local filesystem path pattern: ${pattern}` });
          return;
        }
      }
      // Obvious secrets (basic patterns, never echo the value)
      const secretPatterns = [
        /AKIA[0-9A-Z]{16}/,
        /gh[ps]_[0-9a-zA-Z]{36}/,
        /sk-[a-zA-Z0-9]{48}/,
        /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/,
        /password\s*[:=]\s*['"][^'"]{8,}['"]/i,
        /secret\s*[:=]\s*['"][^'"]{16,}['"]/i,
        /token\s*[:=]\s*['"][^'"]{16,}['"]/i,
        /api[_-]?key\s*[:=]\s*['"][^'"]{16,}['"]/i,
      ];
      for (const regex of secretPatterns) {
        if (regex.test(content)) {
          violations.push({ kind: 'secret', path: relPath, reason: 'Content contains potential secret pattern' });
          return;
        }
      }
    } catch {
      // Binary or unreadable - skip content check
    }
  }
}

function walkDir(dir, allowlist, violations, baseDir = SITE_DIR) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');

    if (isAllowed(relPath, allowlist)) continue;

    if (entry.isDirectory()) {
      walkDir(fullPath, allowlist, violations, baseDir);
    } else if (entry.isFile()) {
      checkFile(fullPath, relPath, allowlist, violations);
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) usage();

  if (!fs.existsSync(SITE_DIR)) {
    console.error(`[ERROR] _site directory not found at ${SITE_DIR}. Run jekyll build first.`);
    process.exit(2);
  }

  const allowlist = loadAllowlist();
  const violations = [];

  walkDir(SITE_DIR, allowlist, violations);

  if (violations.length > 0) {
    console.error('[FAIL] Publication audit violations:');
    for (const v of violations) {
      console.error(`  ${v.kind}|${v.path}|${v.reason}`);
    }
    process.exit(1);
  } else {
    console.log('[OK] Publication audit passed — no violations found.');
    process.exit(0);
  }
}

main();