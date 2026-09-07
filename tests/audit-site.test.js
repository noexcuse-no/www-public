import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_DIR = path.join(ROOT, '_site');
const AUDIT_SCRIPT = path.join(ROOT, 'scripts', 'audit-site-publication.mjs');
const ALLOWLIST_FILE = path.join(ROOT, 'scripts', 'site-audit-allowlist.json');

describe('site publication audit', () => {
  it('passes on clean _site/ output', () => {
    const result = execSync(`node "${AUDIT_SCRIPT}"`, { cwd: ROOT, encoding: 'utf8' });
    expect(result).toContain('[OK] Publication audit passed');
  });

  it('allows allowlisted files', () => {
    const allowlist = JSON.parse(fs.readFileSync(ALLOWLIST_FILE, 'utf8'));
    expect(allowlist.allowlist).toContain('/.well-known/security.txt');
    expect(allowlist.allowlist).toContain('/assets/avtale.pdf');
  });

  it('forbiddenPatterns blocks package.json and package-lock.json', () => {
    const allowlist = JSON.parse(fs.readFileSync(ALLOWLIST_FILE, 'utf8'));
    expect(allowlist.forbiddenPatterns).toContain('package-lock\\.json$');
    expect(allowlist.forbiddenPatterns).toContain('package\\.json$');
  });
});