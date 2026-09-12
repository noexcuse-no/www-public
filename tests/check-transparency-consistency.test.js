import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CHECK_SCRIPT = path.join(ROOT, 'scripts', 'check-transparency-consistency.mjs');
const SOURCES_FILE = path.join(ROOT, 'scripts', 'consistency-sources.json');

describe('transparency consistency check', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(ROOT, 'tmp-consistency-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('passes on clean tree', () => {
    const result = execSync(`node "${CHECK_SCRIPT}"`, { cwd: ROOT, encoding: 'utf8' });
    expect(result).toContain('[OK] Transparency consistency check passed');
  });

  it('flags unknown provenance creation value', () => {
    const sources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
    expect(sources.allowedCreationValues).toContain('human-created');
    expect(sources.allowedCreationValues).toContain('ai-generated');
    expect(sources.allowedCreationValues).toContain('ai-assisted');
    expect(sources.allowedCreationValues).toContain('third-party');
    expect(sources.allowedCreationValues).toContain('unresolved');
  });

  it('flags unknown license value', () => {
    const sources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
    expect(sources.allowedLicenseValues).toContain('CC0-1.0');
    expect(sources.allowedLicenseValues).toContain('LicenseRef-NoExcuse-All-Rights-Reserved');
    expect(sources.allowedLicenseValues).toContain('0BSD');
    expect(sources.allowedLicenseValues).toContain('unresolved');
  });

  it('detects prohibited site-level blanket claims', () => {
    const sources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8'));
    expect(sources.prohibitedSiteLevelClaims).toContain('all content is AI');
    expect(sources.prohibitedSiteLevelClaims).toContain('all content is CC0');
  });
});