#!/usr/bin/env node
/**
 * Local CI runner — runs all repository checks sequentially and reports
 * individual pass/fail. Exits with count of failed checks (0 = all pass).
 * Per project model: no GitHub Actions; GitHub Pages builds natively.
 */

import { spawn } from 'node:child_process';

const CHECKS = [
  { name: 'lint:html', cmd: 'npm', args: ['run', 'lint:html'], desc: 'HTML validation' },
  { name: 'lint:css', cmd: 'npm', args: ['run', 'lint:css'], desc: 'CSS linting' },
  { name: 'lint:js', cmd: 'npm', args: ['run', 'lint:js'], desc: 'JavaScript linting' },
  { name: 'test', cmd: 'npm', args: ['test'], desc: 'Unit tests (Vitest)' },
  { name: 'scan:sensitivity', cmd: 'npm', args: ['run', 'scan:sensitivity'], desc: 'Sensitivity scan (full tree)' },
  { name: 'scan:secrets', cmd: 'npm', args: ['run', 'scan:secrets'], desc: 'Secret scan (changed content)' },
  { name: 'audit:deps', cmd: 'npm', args: ['run', 'audit:deps'], desc: 'Dependency audit + slopsquat detection' },
  { name: 'check:supply-chain', cmd: 'npm', args: ['run', 'check:supply-chain'], desc: 'Supply-chain security scan' },
  { name: 'audit:site', cmd: 'npm', args: ['run', 'audit:site'], desc: 'Post-build publication audit' },
  { name: 'check:stale', cmd: 'npm', args: ['run', 'check:stale'], desc: 'Stale-reference integrity check (T17)' },
  { name: 'check:docs', cmd: 'npm', args: ['run', 'check:docs'], desc: 'Doc structure validation (T18)' },
];

function runCheck({ name, cmd, args, desc }) {
  return new Promise((resolve) => {
    console.log(`\n🔍 [${name}] ${desc}...`);
    const child = spawn(cmd, args, { stdio: 'pipe', shell: true });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (d) => { stdout += d.toString(); });
    child.stderr.on('data', (d) => { stderr += d.toString(); });

    child.on('close', (code) => {
      const passed = code === 0;
      const status = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`   ${status} ${name} (exit ${code})`);
      if (!passed) {
        const out = (stdout + stderr).trim();
        if (out) console.log(`   Output: ${out.substring(0, 500)}${out.length > 500 ? '...' : ''}`);
      }
      resolve({ name, passed, code, output: stdout + stderr });
    });

    child.on('error', (err) => {
      console.log(`   ❌ FAIL ${name} (spawn error: ${err.message})`);
      resolve({ name, passed: false, code: -1, output: err.message });
    });
  });
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    LOCAL CI RUNNER                             ║');
  console.log('║  Runs all repository checks — GitHub Pages native build model  ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  const results = [];
  for (const check of CHECKS) {
    const result = await runCheck(check);
    results.push(result);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  for (const r of results) {
    const status = r.passed ? '✅' : '❌';
    console.log(`  ${status} ${r.name}`);
  }

  console.log(`\n  Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);

  if (failed > 0) {
    console.error('\n❌ CI FAILED — see failures above');
    process.exit(failed);
  }

  console.log('\n✅ ALL CHECKS PASSED');
  process.exit(0);
}

main().catch(e => {
  console.error('❌ CI runner error:', e);
  process.exit(1);
});