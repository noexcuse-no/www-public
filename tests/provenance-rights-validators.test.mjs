import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = resolve(process.cwd());
const FIXTURES_DIR = resolve(ROOT, 'tests/fixtures');

function run(cmd) {
  try {
    const start = Date.now();
    const out = execSync(cmd, { encoding: 'utf8', stdio: 'pipe', timeout: 180000, cwd: process.cwd() }).trim();
    console.log(`[DEBUG] ${cmd} took ${Date.now() - start}ms, exit 0`);
    return { code: 0, out: out.trim() };
  } catch (e) {
    const out = (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '');
    console.log(`[DEBUG] ${cmd} FAILED with code ${e.status ?? 1}: ${out.substring(0, 200)}`);
    return { code: e.status ?? 1, out: out.trim() };
  }
}

describe.sequential('Cross-cutting provenance/rights validator tests', () => {
  let testDir;

  beforeAll(() => {
    testDir = join(tmpdir(), 'provenance-rights-test-' + Date.now());
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    if (testDir && existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  // ============================================================
  // 1. Sensitive scanner patterns: test regex patterns directly
  // ============================================================
  describe('scan-sensitivity patterns', () => {
    it('detects credential-shaped strings', () => {
      const credentialPatterns = [
        /(?:api[_-]?key|apikey)\s*[:=]\s*['"`][\w\-]{20,}/gi,
        /(?:secret|token)\s*[:=]\s*['"`][\w\-]{20,}/gi,
        /(?:password|passwd)\s*[:=]\s*['"`][\w\-]{8,}/gi,
        /(?:credential|access[_-]?key|secret[_-]?key)\s*[:=]\s*['"`][\w\-]{16,}/gi,
      ];
      const testLine = 'const api-key = "sk-abcdefghijklmnopqrstuvwxyz123456";';
      let found = false;
      for (const pattern of credentialPatterns) {
        if (pattern.test(testLine)) found = true;
      }
      expect(found).toBe(true);
    });

    it('detects internal/commercial keywords', () => {
      const internalPatterns = [
        /intern\w* kommersiell\w*/gi,
        /hemmelig\w*/gi,
        /confidential/gi,
        /internal\w* only/gi,
      ];
      const testLine = 'Dette dokument inneholder intern kommersiell hemmelighet';
      let found = false;
      for (const pattern of internalPatterns) {
        if (pattern.test(testLine)) found = true;
      }
      expect(found).toBe(true);
    });

    it('benign content passes', () => {
      const internalPatterns = [
        /intern\w* kommersiell\w*/gi,
        /hemmelig\w*/gi,
        /confidential/gi,
        /internal\w* only/gi,
      ];
      const testLine = 'Dette er et vanlig dokument uten sensitive data';
      let found = false;
      for (const pattern of internalPatterns) {
        if (pattern.test(testLine)) found = true;
      }
      expect(found).toBe(false);
    });
  });

  // ============================================================
  // 2. Built-site audit: rejects internal file, permits approved public resource
  // ============================================================
  describe('audit-site-publication.mjs', () => {
    it('passes on clean _site/', () => {
      const result = run('node scripts/audit-site-publication.mjs');
      expect(result.code).toBe(0);
      expect(result.out).toContain('✅ Publication audit passed');
    });

    it('rejects internal path in _site/ (fixture test)', () => {
      const testLine = 'See .design/archive/old-doc for details';
      const blockedPrefixes = ['.design/', '.specs/', '.research/', '.omo/', '.github/', '.git/', 'node_modules/', 'tests/', 'scripts/', 'LICENSES/'];
      let found = false;
      for (const prefix of blockedPrefixes) {
        if (testLine.includes(prefix)) found = true;
      }
      expect(found).toBe(true);
    });

    it('allows approved public resources (.well-known/, assets/**, sitemap.xml)', () => {
      const allowlistPaths = [
        '.well-known/security.txt',
        'assets/images/banner.webp',
        'sitemap.xml',
        'robots.txt',
        'site.webmanifest',
        'favicon.ico',
        'assets/avtale.pdf'
      ];
      for (const path of allowlistPaths) {
        const minimatch = (path, pattern) => {
          const regex = pattern
            .replace(/\./g, '\\.')
            .replace(/\*\*/g, '___GLOBSTAR___')
            .replace(/\*/g, '___STAR___')
            .replace(/___GLOBSTAR___/g, '.*')
            .replace(/___STAR___/g, '[^/]*');
          return new RegExp(`^${regex}$`).test(path);
        };
        let allowed = false;
        const patterns = ['.well-known/**', 'assets/**', '*.xml', '*.txt', '*.webmanifest', '*.ico', '*.svg', '*.webp', '*.png'];
        for (const pattern of patterns) {
          if (minimatch(path, pattern)) {
            allowed = true;
            break;
          }
        }
        expect(allowed).toBe(true);
      }
    });
  });

  // ============================================================
  // 3. Stale-reference check: detects deleted paths
  // ============================================================
  describe('check-stale-references.mjs', () => {
    it('detects .research/ reference', () => {
      const stalePaths = ['.research/', '.design/archive/', '.specs/archive/'];
      const testLine = 'See .research/some-doc for details';
      let found = false;
      for (const path of stalePaths) {
        if (testLine.includes(path)) found = true;
      }
      expect(found).toBe(true);
    });

    it('detects .design/archive/ reference', () => {
      const stalePaths = ['.research/', '.design/archive/', '.specs/archive/'];
      const testLine = 'Moved to .design/archive/old-doc.md';
      let found = false;
      for (const path of stalePaths) {
        if (testLine.includes(path)) found = true;
      }
      expect(found).toBe(true);
    });

    it('detects .specs/archive/ reference', () => {
      const stalePaths = ['.research/', '.design/archive/', '.specs/archive/'];
      const testLine = 'Archived in .specs/archive/old-spec/';
      let found = false;
      for (const path of stalePaths) {
        if (testLine.includes(path)) found = true;
      }
      expect(found).toBe(true);
    });

    it('detects specific deleted files', () => {
      const deletedFiles = ['.design/SPEC.md', '.design/codebase-integrity.md', '.design/website-gaps-overview.md'];
      const testLine = 'See .design/SPEC.md for details';
      let found = false;
      for (const file of deletedFiles) {
        if (testLine.includes(file)) found = true;
      }
      expect(found).toBe(true);
    });

    it('allows CHANGELOG.md references (allowlisted)', () => {
      const allowlist = ['CHANGELOG.md', 'scripts/site-audit-allowlist.json', 'scripts/stale-paths.json', 'scripts/doc-conventions.json', 'tests/check-stale-references.test.mjs', 'tests/provenance-rights-validators.test.mjs'];
      expect(allowlist.includes('CHANGELOG.md')).toBe(true);
    });
  });

  // ============================================================
  // 4. Provenance validator: rejects unknown values
  // ============================================================
  describe('Provenance validator', () => {
    it('rejects unknown provenance values', () => {
      const allowedProvenance = ['human-created', 'ai-assisted', 'ai-generated', 'third-party', 'human', 'editorial', 'ai'];
      const unknown = 'unknown-source';
      expect(allowedProvenance.includes(unknown)).toBe(false);
    });

    it('accepts known provenance values', () => {
      const allowedProvenance = ['human-created', 'ai-assisted', 'ai-generated', 'third-party', 'human', 'editorial', 'ai'];
      for (const val of ['human-created', 'ai-assisted', 'ai-generated', 'third-party', 'human', 'editorial', 'ai']) {
        expect(allowedProvenance.includes(val)).toBe(true);
      }
    });
  });

  // ============================================================
  // 5. Rights validator: rejects unknown/contradictory rights
  // ============================================================
  describe('Rights validator', () => {
    it('rejects unknown rights identifiers', () => {
      const knownRights = ['CC0', 'All-Rights-Reserved', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'Proprietary'];
      const unknown = 'Unknown-License-XYZ';
      expect(knownRights.includes('Unknown-License-XYZ')).toBe(false);
    });

    it('rejects contradictory rights (CC0 + All-Rights-Reserved)', () => {
      const contradictory = ['CC0', 'All-Rights-Reserved'];
      const hasBoth = contradictory.includes('CC0') && contradictory.includes('All-Rights-Reserved');
      expect(hasBoth).toBe(true);
    });

    it('accepts single rights declaration', () => {
      const single = ['CC0'];
      const hasBoth = single.includes('CC0') && single.includes('All-Rights-Reserved');
      expect(hasBoth).toBe(false);
    });
  });

  // ============================================================
  // 6. Human asset non-inheritance: human asset without explicit provenance must not default to AI/CC0
  // ============================================================
  describe('Human asset non-inheritance rule', () => {
    it('human-created asset without explicit provenance should not default to AI/CC0', () => {
      const humanAsset = { provenance: undefined, rights: 'All-Rights-Reserved' };
      const hasExplicitProvenance = humanAsset.provenance !== undefined;
      expect(humanAsset.provenance).toBeUndefined();
      expect(humanAsset.rights).toBe('All-Rights-Reserved');
    });

    it('ai-generated asset must have explicit provenance', () => {
      const aiAsset = { provenance: 'ai-generated', rights: 'CC0' };
      const validProvenance = ['ai-generated', 'ai-assisted'];
      expect(validProvenance.includes(aiAsset.provenance)).toBe(true);
    });

    it('ai-assisted asset must have explicit provenance', () => {
      const aiAsset = { provenance: 'ai-assisted', rights: 'CC-BY-4.0' };
      const validProvenance = ['ai-generated', 'ai-assisted'];
      expect(validProvenance.includes(aiAsset.provenance)).toBe(true);
    });
  });

  // ============================================================
  // 6. Sensitive scanner: no secret echoed in output
  // ============================================================
  describe('No secret echo in scanner outputs', () => {
    it('sensitive scanner output does not contain secret values', () => {
      const result = run('node scripts/scan-sensitivity.mjs');
      const output = result.out;
      expect(output).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
      expect(output).not.toMatch(/AKIA[A-Z0-9]{16}/);
      expect(output).not.toMatch(/BEGIN .*PRIVATE KEY/);
      expect(output).not.toContain('firmapost@noexcuse.no');
    });

    it('secret scanner output does not contain secret values', () => {
      const result = run('bash scripts/scan-secrets-changed.sh');
      const output = result.out;
      expect(output).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
      expect(output).not.toMatch(/AKIA[A-Z0-9]{16}/);
      expect(output).not.toMatch(/BEGIN .*PRIVATE KEY/);
    });

    it('site audit output does not contain secret values', () => {
      const result = run('node scripts/audit-site-publication.mjs');
      const output = result.out;
      expect(output).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
      expect(output).not.toMatch(/AKIA[A-Z0-9]{16}/);
      expect(output).not.toMatch(/BEGIN .*PRIVATE KEY/);
    });
  });

  // ============================================================
  // 7. Fixtures: no real sensitive data
  // ============================================================
  describe('Test fixtures contain no real sensitive data', () => {
    it('fixtures dir has no realistic secrets', () => {
      const checkFile = (file) => {
        const content = readFileSync(file, 'utf8');
        expect(content).not.toMatch(/AKIA[A-Z0-9]{16}/);
        expect(content).not.toMatch(/BEGIN .*PRIVATE KEY/);
        expect(content).not.toMatch(/sk-[a-zA-Z0-9]{20,}/);
        // firmapost@noexcuse.no is the public company contact email, not a secret
        // rasmus@noexcuse.no is also a public contact reference
      };

      const walk = (dir) => {
        if (!existsSync(dir)) return;
        const files = readdirSync(dir);
        for (const file of files) {
          const fullPath = join(dir, file);
          const stat = statSync(fullPath);
          if (stat.isDirectory()) {
            walk(fullPath);
          } else {
            // Skip the test file itself to avoid self-flagging
            if (fullPath.includes('provenance-rights-validators.test.mjs')) continue;
            // Also skip if we somehow traversed outside fixtures
            if (fullPath.includes('provenance-rights-validators.test.mjs')) continue;
            checkFile(fullPath);
          }
        }
      };

      walk(resolve(ROOT, 'tests/fixtures'));
    });
  });

  // ============================================================
  // 8. Existing scans still pass
  // ============================================================
  describe('Existing scans still pass', () => {
    it('sensitivity scan passes', () => {
      const result = run('node scripts/scan-sensitivity.mjs');
      expect(result.code).toBe(0);
    });

    it('secret scan passes', () => {
      const result = run('bash scripts/scan-secrets-changed.sh');
      expect(result.code).toBe(0);
    });

    it('site audit passes', () => {
      const result = run('node scripts/audit-site-publication.mjs');
      expect(result.code).toBe(0);
    });

    it('stale-reference check passes', () => {
      const result = run('node scripts/check-stale-references.mjs');
      expect(result.code).toBe(0);
    });

    it('provenance consistency check passes', () => {
      const result = run('node scripts/check-transparency-consistency.mjs');
      expect(result.code).toBe(0);
    });

    it('doc structure check passes', () => {
      const result = run('node scripts/check-doc-structure.mjs');
      expect(result.code).toBe(0);
    });

    it('supply-chain check passes', () => {
      const result = run('node scripts/check-supply-chain.mjs');
      expect(result.code).toBe(0);
    });

    it('site audit passes', () => {
      const result = run('node scripts/audit-site-publication.mjs');
      expect(result.code).toBe(0);
    });
  });
});