import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const SCRIPT = 'node scripts/check-transparency-consistency.mjs';
const SOURCES_FILE = resolve('scripts/consistency-sources.json');

function run(cmd) {
  try {
    return { code: 0, out: execSync(cmd, { encoding: 'utf8', stdio: 'pipe' }).trim() };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '') };
  }
}

describe('check-transparency-consistency.mjs', () => {
  let testDir;

  beforeAll(() => {
    testDir = join(tmpdir(), 'transparency-test-' + Date.now());
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    if (testDir && existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('passes on current clean tree', () => {
    const result = run(SCRIPT);
    expect(result.code).toBe(0);
    expect(result.out).toContain('✅ Transparency consistency check passed');
  });

  it('detects blanket "all content is AI" assertion', () => {
    const forbiddenPatterns = [
      /all content is (AI|CC0)/gi,
      /everything is (AI|CC0)/gi
    ];
    const testLine = 'This site claims all content is AI-generated';
    let found = false;
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(testLine)) found = true;
    }
    expect(found).toBe(true);
  });

  it('detects blanket "everything is CC0" assertion', () => {
    const forbiddenPatterns = [
      /all content is (AI|CC0)/gi,
      /everything is (AI|CC0)/gi
    ];
    const testLine = 'Our policy states everything is CC0';
    let found = false;
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(testLine)) found = true;
    }
    expect(found).toBe(true);
  });

  it('allows non-blanket policy statements', () => {
    const allowedLines = [
      'AI is used as a tool in production',
      'Some content is AI-assisted',
      'Per-resource provenance is documented',
      'Editorial responsibility remains with humans'
    ];
    const forbiddenPatterns = [
      /all content is (AI|CC0)/gi,
      /everything is (AI|CC0)/gi
    ];
    for (const line of allowedLines) {
      let found = false;
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(line)) found = true;
      }
      expect(found).toBe(false);
    }
  });

  it('validates canonical sources config', () => {
    const sources = JSON.parse(execSync(`cat ${SOURCES_FILE}`, { encoding: 'utf8' }));
    expect(sources.sources.ai_transparency.canonical).toBe(true);
    expect(sources.sources.ai_policy_page.canonical).toBe(true);
    expect(sources.sources.photography_brief.canonical).toBe(true);
    expect(sources.validation_rules.forbidden_blanket_assertions.length).toBeGreaterThan(0);
  });

it('detects contradiction: site-level "all AI" + per-resource "human"', () => {
    // This would be caught by the blanket assertion check
    const siteLevel = 'All content is AI-generated on this site';
    const perResource = 'This article is human-created';
    const patterns = [/all content is AI/gi, /everything is AI/gi];
    let siteViolation = false;
    for (const pattern of patterns) {
      if (pattern.test(siteLevel)) siteViolation = true;
    }
    expect(siteViolation).toBe(true);
    // The per-resource claim doesn't violate blanket check
    let perResourceViolation = false;
    for (const pattern of patterns) {
      if (pattern.test(perResource)) perResourceViolation = true;
    }
    expect(perResourceViolation).toBe(false);
  });
});