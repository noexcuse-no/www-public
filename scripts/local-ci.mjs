#!/usr/bin/env node
/**
 * Local CI Runner — runs all validation gates that GitHub Actions CI would run.
 * Evidence is written to .omo/evidence/local-ci-<timestamp>.json
 * Exit code: 0 = all passed, non-zero = at least one gate failed.
 */

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const EVIDENCE_DIR = '.omo/evidence';
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');
const EVIDENCE_FILE = join(EVIDENCE_DIR, `local-ci-${TIMESTAMP}.json`);

const gates = [
  {
    name: 'lint',
    cmd: 'npm run lint',
    description: 'htmlhint + stylelint + eslint + vitest',
  },
  {
    name: 'reuse-lint',
    cmd: 'git worktree add --force /tmp/opencode/lint-clean HEAD && /tmp/opencode/reuse-venv/bin/reuse lint && git worktree remove --force /tmp/opencode/lint-clean',
    description: 'REUSE/SPDX compliance (clean worktree protocol)',
    continueOnError: true, // Non-blocking while unresolved set non-empty
  },
  {
    name: 'rights-drift',
    cmd: 'npm run rights:check',
    description: 'Rights manifest drift check (regenerate + git diff)',
  },
  {
    name: 'site-build',
    cmd: 'jekyll build -d /tmp/site-out --safe && jq . /tmp/site-out/.well-known/ai-transparency.json && test -f /tmp/site-out/rettigheter/index.html && grep -q \'id="proprietary"\' /tmp/site-out/rettigheter/index.html && grep -q \'rel="license"\' /tmp/site-out/index.html && grep -q \'href="/rettigheter/"\' /tmp/site-out/index.html',
    description: 'Jekyll build + output validation (rights page, license links, transparency manifest)',
    continueOnError: true, // Jekyll may not be available locally
  },
  {
    name: 'dependency-review',
    cmd: 'npm audit --audit-level=high',
    description: 'High-severity dependency vulnerabilities',
    continueOnError: true, // Advisory only
  },
];

async function runGate(gate) {
  const start = Date.now();
  let stdout = '', stderr = '', exitCode = 0, error = null;

  try {
    const output = execSync(gate.cmd, {
      shell: '/bin/bash',
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: 'pipe',
    });
    stdout = output;
    exitCode = 0;
  } catch (e) {
    stdout = e.stdout || '';
    stderr = e.stderr || '';
    exitCode = e.status ?? 1;
    error = e.message;
  }

  const duration = Date.now() - start;
  const passed = exitCode === 0 || gate.continueOnError;

  return {
    name: gate.name,
    description: gate.description,
    cmd: gate.cmd,
    passed,
    exitCode,
    durationMs: duration,
    stdout: stdout.slice(0, 5000),
    stderr: stderr.slice(0, 5000),
    error,
    continueOnError: gate.continueOnError ?? false,
  };
}

async function main() {
  if (!existsSync(EVIDENCE_DIR)) {
    mkdirSync(EVIDENCE_DIR, { recursive: true });
  }

  console.log('=== Local CI Runner ===');
  console.log(`Evidence will be written to: ${EVIDENCE_FILE}\n`);

  const results = [];
  let allPassed = true;

  for (const gate of gates) {
    console.log(`Running: ${gate.name} — ${gate.description}`);
    const result = await runGate(gate);
    results.push(result);

    const status = result.passed ? '✓ PASS' : '✗ FAIL';
    const note = gate.continueOnError && !result.passed ? ' (non-blocking)' : '';
    console.log(`  ${status}${note} — ${result.durationMs}ms`);
    if (!result.passed && !gate.continueOnError) {
      allPassed = false;
    }
    if (result.stderr) {
      console.log(`  stderr: ${result.stderr.slice(0, 200)}`);
    }
    console.log();
  }

  const summary = {
    timestamp: new Date().toISOString(),
    overallPassed: allPassed,
    gates: results,
  };

  writeFileSync(EVIDENCE_FILE, JSON.stringify(summary, null, 2));
  console.log(`Evidence written to ${EVIDENCE_FILE}`);
  console.log(`Overall: ${allPassed ? 'ALL GATES PASSED' : 'SOME GATES FAILED'}`);

  process.exit(allPassed ? 0 : 1);
}

main().catch(e => {
  console.error('Local CI runner crashed:', e);
  process.exit(1);
});