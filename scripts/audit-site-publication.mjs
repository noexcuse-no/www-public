#!/usr/bin/env node
/**
 * Post-build site publication audit — scans _site/ for internal material,
 * local paths, secrets, and other content that should not be published.
 * Exits non-zero on violations, reporting only kind|path|line|reason.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const ROOT = resolve(__dirname, '..');
const SITE_DIR = resolve(ROOT, '_site');
const ALLOWLIST_PATH = resolve(ROOT, 'scripts/site-audit-allowlist.json');

function loadAllowlist() {
  return JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
}

function isAllowed(path, allowlist) {
  const rel = path.replace(SITE_DIR + '/', '');
  // Check exact path matches in allowlist.paths
  for (const pattern of allowlist.allowlist.paths) {
    if (minimatch(rel, pattern)) return true;
  }
  // Check extension patterns
  const ext = extname(rel).toLowerCase();
  for (const pattern of allowlist.allowlist.patterns) {
    if (minimatch(rel, pattern) || minimatch(ext, pattern.replace('*', ''))) return true;
  }
  return false;
}

function isBlocked(path, allowlist) {
  const rel = path.replace(SITE_DIR + '/', '');
  // Check prefix blocklist
  for (const prefix of allowlist.blocklist.prefixes) {
    if (rel.startsWith(prefix.replace(/\*\*/, ''))) return { reason: `blocked prefix: ${prefix}`, kind: 'internal-path' };
  }
  // Check filename blocklist
  const base = basename(rel);
  for (const fn of allowlist.blocklist.filenames) {
    if (base === fn) return { reason: `blocked filename: ${fn}`, kind: 'internal-file' };
  }
  // Check pattern blocklist
  for (const pattern of allowlist.blocklist.patterns) {
    if (minimatch(rel, pattern) || minimatch(base, pattern)) {
      return { reason: `blocked pattern: ${pattern}`, kind: 'internal-pattern' };
    }
  }
  return null;
}

function minimatch(path, pattern) {
  // Simple glob matching: ** = any depth, * = any chars except /
  const regex = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '___GLOBSTAR___')
    .replace(/\*/g, '___STAR___')
    .replace(/___GLOBSTAR___/g, '.*')
    .replace(/___STAR___/g, '[^/]*');
  return new RegExp(`^${regex}$`).test(path);
}

function scanFile(filePath, allowlist) {
  const violations = [];
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = filePath.replace(SITE_DIR + '/', '');

  // 1. Local filesystem paths
  const localPathPatterns = [
    /[A-Za-z]:[\\/][\w\s\-.]+/g,  // C:\Users\..., C:/Users/...
    /\/home\/[\w\s\-.]+/g,         // /home/user/...
    /\/Users\/[\w\s\-.]+/g,        // /Users/user/...
    /\/c\/Users\/[\w\s\-.]+/gi,    // /c/Users/... (WSL)
  ];
  for (let i = 0; i < lines.length; i++) {
    for (const pattern of localPathPatterns) {
      const matches = lines[i].match(pattern);
      if (matches) {
        for (const m of matches) {
          violations.push({
            kind: 'local-path',
            path: relPath,
            line: i + 1,
            reason: `local filesystem path detected: ${m.substring(0, 60)}`
          });
        }
      }
    }
  }

  // 2. Obvious secrets (basic patterns)
  const secretPatterns = [
    { name: 'api-key', regex: /(?:api[_-]?key|apikey)\s*[:=]\s*['"`][\w\-]{20,}/gi },
    { name: 'api-key-hyphen', regex: /(?:api[_-]?key[_-]?)\s*[:=]\s*['"`][\w\-]{20,}/gi },
    { name: 'secret', regex: /(?:secret|token)\s*[:=]\s*['"`][\w\-]{20,}/gi },
    { name: 'password', regex: /(?:password|passwd)\s*[:=]\s*['"`][\w\-]{8,}/gi },
    { name: 'credential', regex: /(?:credential|access[_-]?key|secret[_-]?key)\s*[:=]\s*['"`][\w\-]{16,}/gi },
    { name: 'aws-key', regex: /(?:aws[_-]?(?:access[_-]?key|secret[_-]?key)|AKIA[A-Z0-9]{16})/gi },
    { name: 'github-token', regex: /(?:gh[ps]o_[A-Za-z0-9]{36,}|github[_-]?token\s*[:=]\s*['"`][\w\-]{20,})/gi },
    { name: 'private-key', regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/gi },
  ];
  for (let i = 0; i < lines.length; i++) {
    for (const { name, regex } of secretPatterns) {
      if (regex.test(lines[i])) {
        violations.push({
          kind: 'secret',
          path: relPath,
          line: i + 1,
          reason: `possible ${name} detected`
        });
      }
    }
  }

  // 3. Internal-only filenames/paths in content
  const internalRefs = [
    /\.design\//g,
    /\.specs\//g,
    /\.research\//g,
    /\.omo\//g,
    /\.github\//g,
    /\.git\//g,
    /node_modules\//g,
    /\.jekyll-cache\//g,
  ];
  for (let i = 0; i < lines.length; i++) {
    for (const pattern of internalRefs) {
      if (pattern.test(lines[i])) {
        violations.push({
          kind: 'internal-reference',
          path: relPath,
          line: i + 1,
          reason: `internal path reference: ${pattern.source.replace(/\\/g, '')}`
        });
      }
    }
  }

  return violations;
}

function walk(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function main() {
  console.log('🔍 Scanning _site/ for publication violations...\n');

  if (!existsSync(SITE_DIR)) {
    console.error('❌ _site/ directory not found. Run `bundle exec jekyll build` first.');
    process.exit(1);
  }

  if (!existsSync(ALLOWLIST_PATH)) {
    console.error('❌ Allowlist not found at', ALLOWLIST_PATH);
    process.exit(1);
  }

  const allowlist = loadAllowlist();
  const allFiles = walk(SITE_DIR);
  let totalViolations = 0;

  for (const filePath of allFiles) {
    const relPath = filePath.replace(SITE_DIR + '/', '');

    // Check if file is explicitly allowed
    if (!isAllowed(filePath, allowlist)) {
      const blocked = isBlocked(filePath, allowlist);
      if (blocked) {
        console.error(`❌ ${blocked.kind}|${relPath}|0|${blocked.reason}`);
        totalViolations++;
      } else {
        // Not allowed, not explicitly blocked - warn but don't fail (unknown file)
        console.warn(`⚠️  unknown|${relPath}|0|not in allowlist or blocklist`);
      }
    }

    // Scan file content for violations (text files only)
    const stat = statSync(filePath);
    if (stat.size > 0 && stat.size < 1024 * 1024) { // skip large files
      const ext = extname(filePath).toLowerCase();
      const textExts = ['.html', '.xml', '.json', '.txt', '.md', '.css', '.js', '.mjs', '.webmanifest', '.svg', '.yml', '.yaml', '.toml', '.ini', '.conf', '.config', '.sh', '.py', '.rb', '.php'];
      if (textExts.includes(ext) || filePath.endsWith('robots.txt') || filePath.endsWith('CNAME')) {
        try {
          const contentViolations = scanFile(filePath, allowlist);
          for (const v of contentViolations) {
            console.error(`❌ ${v.kind}|${v.path}|${v.line}|${v.reason}`);
            totalViolations++;
          }
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  if (totalViolations > 0) {
    console.error(`\n❌ Publication audit failed: ${totalViolations} violation(s) found`);
    process.exit(1);
  }

  console.log('\n✅ Publication audit passed — no violations found');
}

main().catch(e => {
  console.error('❌ Audit failed:', e.message);
  process.exit(1);
});