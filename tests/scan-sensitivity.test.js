import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = process.cwd();
const SCANNER = join(ROOT, 'scripts', 'scan-sensitivity.mjs');

function runScanner(...args) {
    try {
        const stdout = execFileSync('node', [SCANNER, ...args], {
            cwd: ROOT,
            encoding: 'utf8',
        });
        return { code: 0, stdout };
    } catch (err) {
        return { code: err.status ?? 1, stdout: (err.stdout || '').toString() };
    }
}

describe('scan-sensitivity.mjs', () => {
    it('exits 0 on changed content (no project-wide BACKLOG)', () => {
        expect(runScanner('--changed').code).toBe(0);
    });

    it('flags the unsafe fixture without echoing the matched value', () => {
        const marker = ['12', '%', 'provisjon'].join(' ');
        const { code, stdout } = runScanner('--path', 'tests/fixtures/sensitivity/unsafe');
        expect(code).toBe(1);
        const lines = stdout.trim().split('\n').filter(Boolean);
        expect(lines.length).toBeGreaterThan(0);
        for (const line of lines) {
            expect(line).toMatch(/^[A-Z-]+\|[^|]+\|\d+\|[^|]+$/);
            expect(line).not.toContain(marker);
            expect(line).not.toContain('provisjon');
        }
        expect(stdout).not.toContain(marker);
    });

    it('does not flag benign public copy', () => {
        const { code } = runScanner('--path', 'tests/fixtures/sensitivity/benign');
        expect(code).toBe(0);
    });

    it('is deterministic', () => {
        const first = runScanner('--path', 'tests/fixtures/sensitivity/unsafe');
        const second = runScanner('--path', 'tests/fixtures/sensitivity/unsafe');
        expect(first.stdout).toBe(second.stdout);
    });

    it('prints usage and exits 0 for --help', () => {
        const { code, stdout } = runScanner('--help');
        expect(code).toBe(0);
        expect(stdout).toContain('ruleId|path|line|genericReason');
    });

    it('exits with code 2 on an unknown flag', () => {
        expect(runScanner('--nope').code).toBe(2);
    });
});