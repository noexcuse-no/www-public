#!/usr/bin/env node
/**
 * local-ci.mjs — Run all validation checks locally (no GitHub Actions required).
 *
 * This script replaces the GitHub Actions CI workflow for local/PR validation.
 * All checks run via npm scripts that were added by the risk-reduction tasks.
 *
 * Usage: node scripts/local-ci.mjs [--all|--quick|--check=<name>]
 */

import { execSync } from 'node:child_process';
import process from 'node:process';

const CHECKS = {
  // Core validation (always run)
  lint: { cmd: 'npm run lint', desc: 'HTML/CSS/JS lint + tests' },
  rights: { cmd: 'npm run rights:check', desc: 'Rights metadata consistency' },

  // Security scans
  'scan:sensitivity': { cmd: 'npm run scan:sensitivity', desc: 'Sensitive content scan (publicability)' },
  'scan:secrets': { cmd: 'npm run scan:secrets', desc: 'Secret scan (gitleaks)' },

  // Custom validators (added by risk-reduction tasks 12-23)
  'audit:site': { cmd: 'npm run audit:site', desc: 'Post-build publication audit' },
  'check:stale': { cmd: 'npm run check:stale', desc: 'Stale reference integrity' },
  'check:docs': { cmd: 'npm run check:docs', desc: 'Document structure validation' },
  'check:consistency': { cmd: 'npm run check:consistency', desc: 'AI/rights transparency consistency' },

  // Task-specific
  'sanitize:media': { cmd: 'npm run sanitize:media -- --check', desc: 'Metadata sanitation check' },
};

function runCheck(name, config) {
  console.log(`\n▶ ${name}: ${config.desc}`);
  try {
    const output = execSync(config.cmd, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 180000,
    });
    console.log(`  ✅ PASS`);
    if (output.trim()) console.log(`     ${output.trim().split('\n').slice(-2).join('\n     ')}`);
    return { name, pass: true };
  } catch (e) {
    console.log(`  ❌ FAIL`);
    if (e.stdout) console.log(`     ${e.stdout.toString().trim().split('\n').slice(-3).join('\n     ')}`);
    if (e.stderr) console.log(`     ${e.stderr.toString().trim().split('\n').slice(-3).join('\n     ')}`);
    return { name, pass: false, error: e.message };
  }
}

function main() {
  const args = process.argv.slice(2);
  const only = args.find(a => a.startsWith('--check='))?.split('=')[1];
  const quick = args.includes('--quick');
  const all = args.includes('--all') || !quick && !only;

  console.log('═══ LOCAL CI VALIDATION ═══');
  console.log(`Running ${only ? `single check: ${only}` : quick ? 'quick subset' : 'all checks'}`);

  const toRun = only
    ? { [only]: CHECKS[only] }
    : quick
      ? { lint: CHECKS.lint, rights: CHECKS.rights }
      : CHECKS;

  if (!toRun[Object.keys(toRun)[0]]) {
    console.error(`Unknown check: ${only}`);
    console.error(`Available: ${Object.keys(CHECKS).join(', ')}`);
    process.exit(2);
  }

  const results = [];
  for (const [name, config] of Object.entries(toRun)) {
    results.push(runCheck(name, config));
  }

  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;

  console.log('\n═══ SUMMARY ═══');
  console.log(`Passed: ${passed}/${results.length}`);
  if (failed > 0) {
    console.log(`Failed: ${failed}`);
    results.filter(r => !r.pass).forEach(r => console.log(`  - ${r.name}`));
    process.exit(1);
  } else {
    console.log('All checks passed ✅');
    process.exit(0);
  }
}

main();