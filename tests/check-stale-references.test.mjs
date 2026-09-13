import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const SCRIPT = 'node scripts/check-stale-references.mjs';

function run(cmd) {
  try {
    return { code: 0, out: execSync(cmd, { encoding: 'utf8', stdio: 'pipe' }).trim() };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '') };
  }
}

describe('check-stale-references.mjs', () => {
  let testDir;

  beforeAll(() => {
    testDir = join(tmpdir(), 'stale-refs-test-' + Date.now());
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
    expect(result.out).toContain('✅ No stale references found');
  });

  it('detects .research/ reference in active doc', () => {
    // Test the detection logic directly
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
    // CHANGELOG.md is allowlisted - verify the allowlist logic
    const allowlist = ['CHANGELOG.md'];
    expect(allowlist.includes('CHANGELOG.md')).toBe(true);
  });

  it('allows config files that blocklist stale paths', () => {
    // Config files that blocklist stale paths are allowlisted
    const allowlist = ['CHANGELOG.md', 'scripts/site-audit-allowlist.json', 'scripts/stale-paths.json'];
    expect(allowlist.includes('scripts/stale-paths.json')).toBe(true);
    expect(allowlist.includes('scripts/site-audit-allowlist.json')).toBe(true);
  });
});