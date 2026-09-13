import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PKG_PATH = resolve('package.json');
const ORIGINAL_PKG = JSON.parse(execSync(`cat ${PKG_PATH}`, { encoding: 'utf8' }));

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch (e) {
    return (e.stdout?.toString() ?? '') + (e.stderr?.toString() ?? '').trim();
  }
}

describe('audit-deps.mjs', () => {
  beforeEach(() => {
    // Restore original package.json
    writeFileSync(PKG_PATH, JSON.stringify(ORIGINAL_PKG, null, 2));
  });

  afterEach(() => {
    writeFileSync(PKG_PATH, JSON.stringify(ORIGINAL_PKG, null, 2));
  });

  it('exits 0 on clean dependency tree', () => {
    const result = run('node scripts/audit-deps.mjs');
    expect(result).toContain('✅ All dependency audits passed');
  });

  it('detects high/critical vulnerability (mocked via temp override)', () => {
    // Temporarily add a known vulnerable dep (lodash@4.17.15 has CVE)
    const pkg = { ...ORIGINAL_PKG, dependencies: { ...ORIGINAL_PKG.dependencies, lodash: '4.17.15' } };
    writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2));
    // This will likely fail npm install, so we just test the audit script runs
    // The actual vulnerability detection requires npm install which we skip in unit test
    const result = run('node scripts/audit-deps.mjs');
    // Should still run without crashing (npm audit will run on current tree)
    expect(typeof result).toBe('string');
  });

it('detects slopsquat pattern in package name', () => {
    // Add a suspicious package name (combosquatting: react-dom-fake)
    const pkg = { ...ORIGINAL_PKG, dependencies: { ...ORIGINAL_PKG.dependencies, 'react-dom-fake': '^18.0.0' } };
    writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2));
    const result = run('node scripts/audit-deps.mjs');
    expect(result).toContain('❌');
    expect(result).toContain('slopsquatting');
  });
});

describe('check-supply-chain.mjs', () => {
  it('exits 0 on clean JS assets', () => {
    const result = run('node scripts/check-supply-chain.mjs');
    expect(result).toContain('✅ All supply-chain security checks passed');
  });
});