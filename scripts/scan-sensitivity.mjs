#!/usr/bin/env node
/**
 * scan-sensitivity.mjs — deterministic sensitive-content scanner.
 *
 * Detects accidental publication of commercial / PII / internal-temporary
 * material in this PUBLIC repository. Never echoes matched content: output is
 * `ruleId|path|line|genericReason` only.
 *
 * Modes:
 *   default      full-tree scan from the project root
 *   --changed    scan files changed vs the branch base (origin/main, else HEAD~1)
 *   --path <dir> scan a specific path (used by tests; overrides mode selection)
 *   --help       print usage
 *
 * Exit codes: 0 clean, 1 hits found, 2 usage error.
 *
 * Deterministic: stable ordering, no network, no LLM, stdlib only.
 * Synthetic test fixtures under tests/fixtures/sensitivity/ and this scanner's
 * own rule/allowlist files are excluded by design (they are detection data,
 * never production content); tests prove scanner behaviour via --path.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve, dirname, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RULES_PATH = join(ROOT, 'scripts', 'sensitivity-rules.json');
const ALLOWLIST_PATH = join(ROOT, 'scripts', 'sensitivity-allowlist.json');

// Directories that must never be scanned (build/vendor/ignored/agent-config
// working areas; the always-loaded rule text in .opencode/ is self-referential
// category names, not sensitive content).
const EXCLUDED_DIRS = new Set([
  'node_modules',
  '_site',
  '.git',
  '.omo',
  '.opencode',
  '.jekyll-cache',
  'dist',
  'build',
  '.cache',
]);

// Paths that are detection data (synthetic fixtures + this scanner's own pattern
// files). They deliberately contain trigger-like strings and must not cause
// self-flagging; tests exercise them explicitly with --path.
const EXCLUDED_FILES = new Set([
  'scripts/scan-sensitivity.mjs',
  'scripts/sensitivity-rules.json',
  'scripts/sensitivity-allowlist.json',
  'scripts/ci-scan-sensitivity.sh',
]);
const EXCLUDED_PATH_PREFIXES = ['tests/fixtures/sensitivity'];

const rules = JSON.parse(readFileSync(RULES_PATH, 'utf8')).rules.map((r) => ({
  ...r,
  rx: (r.patterns ?? []).map((p) => new RegExp(p, r.flags ?? '')),
}));
const allowlist = new Set(
  JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8')).map(
    (e) => `${e.ruleId}|${e.path.replaceAll('\\', '/')}`,
  ),
);

function toRel(p) {
  return relative(ROOT, p).split(sep).join('/');
}

function isExcluded(relPath) {
  if (EXCLUDED_FILES.has(relPath)) return true;
  if (EXCLUDED_PATH_PREFIXES.some((p) => relPath === p || relPath.startsWith(p + '/'))) return true;
  return relPath.split('/').some((seg) => EXCLUDED_DIRS.has(seg));
}

function collectFiles(dir, explicit) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    const rel = toRel(p);
    if (entry.isDirectory()) {
      if (!explicit && isExcluded(rel)) continue;
      out.push(...collectFiles(p, explicit));
    } else if (entry.isFile()) {
      if (explicit) {
        out.push(p);
      } else if (!isExcluded(rel)) {
        out.push(p);
      }
    }
  }
  return out;
}

function readText(file) {
  const buf = readFileSync(file);
  if (buf.includes(0)) return null; // binary
  return buf.toString('utf8');
}

function changedFiles() {
  let base = null;
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', 'origin/main'], {
      cwd: ROOT,
      stdio: 'ignore',
    });
    base = 'origin/main';
  } catch {
    try {
      execFileSync('git', ['rev-parse', '--verify', '--quiet', 'HEAD~1'], {
        cwd: ROOT,
        stdio: 'ignore',
      });
      base = 'HEAD~1';
    } catch {
      return collectFiles(ROOT, false); // no base available -> full tree
    }
  }
  const changed = execFileSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMR', `${base}...HEAD`],
    { encoding: 'utf8', cwd: ROOT },
  ).split('\n');
  let untracked = '';
  try {
    untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard'], {
      encoding: 'utf8',
      cwd: ROOT,
    });
  } catch {
    /* no untracked listing needed */
  }
  const set = new Set(
    [...changed, ...untracked.split('\n')]
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((rel) => !isExcluded(rel)),
  );
  return [...set].map((rel) => join(ROOT, rel));
}

function scanFile(file) {
  const text = readText(file);
  if (text === null) return [];
  const rel = toRel(file);
  const hits = [];
  const lines = text.split(/\r?\n/);
  const emails = [...text.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)].map(
    (m) => m[0].toLowerCase(),
  );
  const phones = [...text.matchAll(/(\+47|0047)[\s-]?\d{8}/g)].map((m) =>
    m[0].replace(/[\s-]/g, ''),
  );
  const uniqueEmails = new Set(emails);
  const uniquePhones = new Set(phones);
  const firstEmailLine =
    uniqueEmails.size > 0 ? lines.findIndex((l) => /@/.test(l)) + 1 : 0;
  const firstPhoneLine =
    uniquePhones.size > 0 ? lines.findIndex((l) => /(\+47|0047)/.test(l)) + 1 : 0;

  for (const r of rules) {
    const key = `${r.id}|${rel}`;
    if (allowlist.has(key)) continue;
    if (r.match === 'filename') {
      if (r.rx.some((rx) => rx.test(basename(file)) || rx.test(rel))) {
        hits.push({ ruleId: r.id, path: rel, line: 0, reason: r.reason });
      }
      continue;
    }
    if (r.collect === 'contacts') {
      const count = Math.max(uniqueEmails.size, uniquePhones.size);
      if (count >= r.threshold) {
        const line = uniqueEmails.size >= uniquePhones.size ? firstEmailLine : firstPhoneLine;
        hits.push({ ruleId: r.id, path: rel, line, reason: r.reason });
      }
      continue;
    }
    for (let i = 0; i < lines.length; i++) {
      if (r.rx.some((rx) => {
        rx.lastIndex = 0;
        return rx.test(lines[i]);
      })) {
        hits.push({ ruleId: r.id, path: rel, line: i + 1, reason: r.reason });
        break; // one hit per rule per file keeps output compact & stable
      }
    }
  }
  return hits;
}

function usage() {
  const used = `Usage: node scripts/scan-sensitivity.mjs [--changed] [--path <dir>] [--help]

  default        full-tree scan of the project root
  --changed      scan files changed against the branch base
  --path <dir>   scan a specific path (relative to project root)
  --help         print this help

Output format (one line per hit, NEVER the matched content):
  ruleId|path|line|genericReason

Line 0 = filename-level match. Exit codes: 0 clean, 1 hits, 2 usage error.`;
  process.stdout.write(`${used}\n`);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  usage();
  process.exit(0);
}

let changed = false;
let explicitPath = null;
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--changed') {
    changed = true;
  } else if (arg === '--path') {
    explicitPath = args[i + 1];
    if (!explicitPath) {
      usage();
      process.exit(2);
    }
    i += 1; // skip the value
  } else {
    usage();
    process.exit(2);
  }
}

let files;
if (explicitPath) {
  files = collectFiles(resolve(ROOT, explicitPath), true);
} else if (changed) {
  files = changedFiles();
} else {
  files = collectFiles(ROOT, false);
}

const hits = files.flatMap(scanFile).sort(
  (a, b) => a.ruleId.localeCompare(b.ruleId) || a.path.localeCompare(b.path) || a.line - b.line,
);

for (const h of hits) {
  process.stdout.write(`${h.ruleId}|${h.path}|${h.line}|${h.reason}\n`);
}
process.exit(hits.length > 0 ? 1 : 0);