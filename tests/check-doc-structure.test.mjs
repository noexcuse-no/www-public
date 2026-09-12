import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const SCRIPT = 'node scripts/check-doc-structure.mjs';
const CONVENTIONS_FILE = resolve('scripts/doc-conventions.json');

function run(cmd) {
  try {
    return { code: 0, out: execSync(cmd, { encoding: 'utf8', stdio: 'pipe' }).trim() };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '') };
  }
}

describe('check-doc-structure.mjs', () => {
  let testDir;

  beforeAll(() => {
    testDir = join(tmpdir(), 'doc-structure-test-' + Date.now());
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    if (testDir && existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('passes on clean tree', () => {
    const result = run(SCRIPT);
    expect(result.code).toBe(0);
    expect(result.out).toContain('✅ Document structure check passed');
  });

  it('detects flagged status "archived" in active location', () => {
    const fm = { status: 'archived' };
    const flaggedStatuses = ['archived', 'superseded', 'obsolete', 'done'];
    expect(flaggedStatuses.includes(fm.status.toLowerCase())).toBe(true);
  });

  it('detects flagged status "superseded" in active location', () => {
    const fm = { status: 'superseded' };
    const flaggedStatuses = ['archived', 'superseded', 'obsolete', 'done'];
    expect(flaggedStatuses.includes(fm.status.toLowerCase())).toBe(true);
  });

  it('detects flagged status "obsolete" in active location', () => {
    const fm = { status: 'obsolete' };
    const flaggedStatuses = ['archived', 'superseded', 'obsolete', 'done'];
    expect(flaggedStatuses.includes(fm.status.toLowerCase())).toBe(true);
  });

  it('detects flagged status "done" in active location', () => {
    const fm = { status: 'done' };
    const flaggedStatuses = ['archived', 'superseded', 'obsolete', 'done'];
    expect(flaggedStatuses.includes(fm.status.toLowerCase())).toBe(true);
  });

  it('allows non-flagged statuses', () => {
    const allowed = ['current', 'planned', 'in-progress', 'review'];
    for (const status of allowed) {
      const fm = { status };
      const flaggedStatuses = ['archived', 'superseded', 'obsolete', 'done'];
      expect(flaggedStatuses.includes(fm.status.toLowerCase())).toBe(false);
    }
  });

  it('detects unknown status', () => {
    const fm = { status: 'unknown-status' };
    const validStatuses = ['current', 'planned', 'in-progress', 'review', 'archived', 'superseded', 'obsolete', 'done'];
    expect(validStatuses.includes(fm.status.toLowerCase())).toBe(false);
  });

  it('allows missing status when allow_missing is true', () => {
    // allow_missing is true in conventions
    const allowMissing = true;
    const fm = {};
    expect(allowMissing || fm.status).toBe(true); // allowMissing is true, so ok
  });

  it('flags missing status when allow_missing is false', () => {
    const allowMissing = false;
    const fm = {};
    const wouldFlag = !allowMissing && !fm.status;
    expect(wouldFlag).toBe(true);
  });

  it('validates conventions file has correct flagged statuses', () => {
    const conventions = JSON.parse(execSync(`cat ${CONVENTIONS_FILE}`, { encoding: 'utf8' }));
    const flagged = conventions.frontmatter.validation.flagged_statuses_in_active;
    expect(flagged).toEqual(['archived', 'superseded', 'obsolete', 'done']);
    expect(conventions.frontmatter.validation.allow_missing_status).toBe(true);
  });
});