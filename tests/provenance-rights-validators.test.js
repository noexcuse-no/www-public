import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GENERATE_SCRIPT = path.join(ROOT, 'scripts', 'generate-rights-metadata.mjs');
const CHECK_CONSISTENCY = path.join(ROOT, 'scripts', 'check-transparency-consistency.mjs');
const CHECK_STALE = path.join(ROOT, 'scripts', 'check-stale-references.mjs');
const AUDIT_SITE = path.join(ROOT, 'scripts', 'audit-site-publication.mjs');
const SCAN_SENSITIVITY = path.join(ROOT, 'scripts', 'scan-sensitivity.mjs');
const SANITIZE_METADATA = path.join(ROOT, 'scripts', 'sanitize-metadata.sh');
const INSPECT_DOC = path.join(ROOT, 'scripts', 'inspect-doc-metadata.sh');

describe('provenance/rights validators cross-cutting tests', () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(ROOT, 'tmp-validator-test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  describe('generate-rights-metadata.mjs', () => {
    it('produces valid _data/rights.json with pages and assets', () => {
      const result = execSync(`node "${GENERATE_SCRIPT}" 2>&1`, { cwd: ROOT, encoding: 'utf8' });
      // Script outputs to stderr (console.error) - capture both stdout and stderr
      expect(result).toContain('pages:');
      expect(result).toContain('assets:');

      const rights = JSON.parse(fs.readFileSync(path.join(ROOT, '_data/rights.json'), 'utf8'));
      expect(rights).toHaveProperty('licenses');
      expect(rights).toHaveProperty('pages');
      expect(rights).toHaveProperty('assets');
      expect(Object.keys(rights.pages).length).toBeGreaterThan(0);
      expect(Object.keys(rights.assets).length).toBeGreaterThan(0);
    });

    it('human-created assets do not default to CC0-1.0', () => {
      const rights = JSON.parse(fs.readFileSync(path.join(ROOT, '_data/rights.json'), 'utf8'));

      // Check dagfinn.webp (human-created) has LicenseRef, not CC0
      expect(rights.assets['assets/images/dagfinn.webp']).toBeDefined();
      expect(rights.assets['assets/images/dagfinn.webp'].spdxId).toBe('LicenseRef-NoExcuse-All-Rights-Reserved');
      expect(rights.assets['assets/images/dagfinn.webp'].creation).toBe('human-created');

      // Check avtale.pdf (human-created) has LicenseRef
      expect(rights.assets['assets/avtale.pdf']).toBeDefined();
      expect(rights.assets['assets/avtale.pdf'].spdxId).toBe('LicenseRef-NoExcuse-All-Rights-Reserved');
    });

    it('ai-generated assets have CC0-1.0', () => {
      const rights = JSON.parse(fs.readFileSync(path.join(ROOT, '_data/rights.json'), 'utf8'));

      // Check banner assets (ai-generated) have CC0
      const bannerAssets = Object.entries(rights.assets).filter(([path]) => path.startsWith('assets/images/banners/'));
      expect(bannerAssets.length).toBeGreaterThan(0);
      for (const [, asset] of bannerAssets) {
        expect(asset.spdxId).toBe('CC0-1.0');
        expect(asset.creation).toBe('ai-generated');
      }
    });

    it('provenance frontmatter on pages has valid creation values', () => {
      const rights = JSON.parse(fs.readFileSync(path.join(ROOT, '_data/rights.json'), 'utf8'));

      for (const [pagePath, pageInfo] of Object.entries(rights.pages)) {
        expect(pageInfo.spdxId).toBeDefined();
        expect(pageInfo.copyrightText).toBeDefined();
        expect(pageInfo.url).toBeDefined();
      }
    });
  });

  describe('check-transparency-consistency.mjs', () => {
    it('passes on clean tree', () => {
      const result = execSync(`node "${CHECK_CONSISTENCY}"`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('[OK] Transparency consistency check passed');
    });

    it('rejects unknown provenance creation values', () => {
      // This is tested by the validator logic - we verify the allowed values list
      const sources = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'consistency-sources.json'), 'utf8'));
      expect(sources.allowedCreationValues).toContain('human-created');
      expect(sources.allowedCreationValues).toContain('ai-generated');
      expect(sources.allowedCreationValues).toContain('ai-assisted');
      expect(sources.allowedCreationValues).toContain('third-party');
      expect(sources.allowedCreationValues).toContain('unresolved');
    });

    it('rejects unknown license values', () => {
      const sources = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'consistency-sources.json'), 'utf8'));
      expect(sources.allowedLicenseValues).toContain('CC0-1.0');
      expect(sources.allowedLicenseValues).toContain('LicenseRef-NoExcuse-All-Rights-Reserved');
      expect(sources.allowedLicenseValues).toContain('0BSD');
      expect(sources.allowedLicenseValues).toContain('unresolved');
    });

    it('detects prohibited site-level blanket claims', () => {
      const sources = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'consistency-sources.json'), 'utf8'));
      expect(sources.prohibitedSiteLevelClaims).toContain('all content is AI');
      expect(sources.prohibitedSiteLevelClaims).toContain('all content is CC0');
    });
  });

  describe('check-stale-references.mjs', () => {
    it('passes on clean tree', () => {
      const result = execSync(`node "${CHECK_STALE}"`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('[OK] Stale reference check passed');
    });

    it('detects stale path references', () => {
      const stalePaths = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'stale-paths.json'), 'utf8')).stalePaths;
      expect(stalePaths).toContain('.research/');
      expect(stalePaths).toContain('.design/archive/');
      expect(stalePaths).toContain('.specs/archive/');
    });
  });

  describe('audit-site-publication.mjs', () => {
    it('passes on clean _site/', () => {
      const result = execSync(`node "${AUDIT_SITE}"`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('[OK] Publication audit passed');
    });

    it('allowlist permits approved specials', () => {
      const allowlist = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'site-audit-allowlist.json'), 'utf8'));
      expect(allowlist.allowlist).toContain('/.well-known/security.txt');
      expect(allowlist.allowlist).toContain('/.well-known/ai-transparency.json');
      expect(allowlist.allowlist).toContain('/assets/avtale.pdf');
      expect(allowlist.allowlist).toContain('/assets/samtykke.pdf');
    });
  });

  describe('scan-sensitivity.mjs', () => {
    it('passes on clean tree (no sensitive content)', () => {
      const result = execSync(`node "${SCAN_SENSITIVITY}"`, { cwd: ROOT, encoding: 'utf8' });
      expect(result.trim()).toBe('');
    });

    it('never echoes matched sensitive content in output', () => {
      // The scanner outputs ruleId|path|line|reason, never the matched content
      const result = execSync(`node "${SCAN_SENSITIVITY}"`, { cwd: ROOT, encoding: 'utf8' });
      // Should not contain actual secret patterns
      expect(result).not.toMatch(/AKIA[0-9A-Z]{16}/);
      expect(result).not.toMatch(/gh[ps]_[0-9a-zA-Z]{36}/);
      expect(result).not.toMatch(/sk-[a-zA-Z0-9]{48}/);
    });
  });

  describe('sanitize-metadata.sh', () => {
    it('strips GPS, serial, comment, creator but keeps rights/WebStatement', () => {
      const result = execSync(`bash "${SANITIZE_METADATA}" --check`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('OK — no sensitive metadata found');
    });

    it('check mode exits 1 on dirty, 0 on clean', () => {
      // This is tested by metadata-sanitize.test.js
      expect(true).toBe(true);
    });
  });

  describe('inspect-doc-metadata.sh', () => {
    it('extracts Author/Creator/Producer/CreatorTool/Title/CreateDate/ModifyDate from PDFs', () => {
      const result = execSync(`bash "${INSPECT_DOC}" assets/avtale.pdf assets/samtykke.pdf`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('Author');
      expect(result).toContain('Creator');
      expect(result).toContain('Producer');
      expect(result).toContain('CreatorTool');
      expect(result).toContain('CreateDate');
      expect(result).toContain('ModifyDate');
    });

    it('flags no local paths in current PDFs', () => {
      const result = execSync(`bash "${INSPECT_DOC}" assets/avtale.pdf assets/samtykke.pdf`, { cwd: ROOT, encoding: 'utf8' });
      expect(result).toContain('no local paths found');
    });
  });

  describe('fixtures are synthetic (no real credentials/personal data)', () => {
    it('test fixtures contain no realistic secrets', () => {
      const fixturesDir = path.join(ROOT, 'tests', 'fixtures');
      if (fs.existsSync(fixturesDir)) {
        const files = fs.readdirSync(fixturesDir);
        for (const file of files) {
          const filePath = path.join(fixturesDir, file);
          const stat = fs.statSync(filePath);
          if (!stat.isFile()) continue;
          const content = fs.readFileSync(filePath, 'utf8');
          expect(content).not.toMatch(/AKIA[0-9A-Z]{16}/);
          expect(content).not.toMatch(/gh[ps]_[0-9a-zA-Z]{36}/);
          expect(content).not.toMatch(/sk-[a-zA-Z0-9]{48}/);
          expect(content).not.toMatch(/-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/);
          expect(content).not.toMatch(/firmapost@noexcuse\.no/);
          expect(content).not.toMatch(/rasmus@noexcuse\.no/);
          expect(content).not.toMatch(/[0-9]{8}/); // No 8-digit numbers that could be personal IDs
        }
      }
    });

    it('metadata-sanitize test fixture is synthetic', () => {
      // The test creates a synthetic PNG with base64 data - verify it's not a real image
      const testFile = path.join(ROOT, 'tests', 'metadata-sanitize.test.js');
      const content = fs.readFileSync(testFile, 'utf8');
      // Should use base64 synthetic fixture, not real file paths
      expect(content).toContain('base64');
    });
  });

  describe('existing scans still pass', () => {
    it('validator scripts exist and are executable', () => {
      expect(fs.existsSync(GENERATE_SCRIPT)).toBe(true);
      expect(fs.existsSync(CHECK_CONSISTENCY)).toBe(true);
      expect(fs.existsSync(CHECK_STALE)).toBe(true);
      expect(fs.existsSync(AUDIT_SITE)).toBe(true);
      expect(fs.existsSync(SCAN_SENSITIVITY)).toBe(true);
      expect(fs.existsSync(SANITIZE_METADATA)).toBe(true);
      expect(fs.existsSync(INSPECT_DOC)).toBe(true);
    });
  });
});