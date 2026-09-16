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

  // Production build validation
  'site-build': { cmd: 'docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/srv/jekyll" -w /srv/jekyll -e JEKYLL_ENV=production jekyll/jekyll jekyll build', desc: 'Jekyll production build', optional: true },
  'validate-build': { cmd: 'node scripts/validate-production-build.mjs', desc: 'Validate production build for debug/staging leakage', dependsOn: 'site-build' },
  'check:links': { cmd: 'npm run check:links', desc: 'Internal link + anchor validation (built site)', dependsOn: 'site-build' },
};

function runCheck(name, config, skipOptional = false) {
  if (config.optional && skipOptional) {
    console.log(`\n⏭ ${name}: ${config.desc} (skipped — optional)`);
    return { name, pass: true, skipped: true };
  }
  console.log(`\n▶ ${name}: ${config.desc}`);
  try {
    const output = execSync(config.cmd, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 300000,
    });
    console.log(`  ✅ PASS`);
    if (output.trim()) console.log(`     ${output.trim().split('\n').slice(-2).join('\n     ')}`);
    return { name, pass: true };
  } catch (e) {
    if (config.optional) {
      console.log(`  ⚠️ SKIP (optional): ${e.message}`);
      return { name, pass: true, skipped: true };
    }
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
  const skipOptional = args.includes('--skip-optional');

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

  // Run checks in order, respecting dependsOn
  const results = [];
  const runOrder = Object.keys(toRun);

  // Simple topological sort for dependsOn
  const runSorted = [...runOrder].sort((a, b) => {
    const aDepends = CHECKS[a]?.dependsOn;
    const bDepends = CHECKS[b]?.dependsOn;
    if (aDepends === b) return 1;
    if (bDepends === a) return -1;
    return 0;
  });

  for (const name of runSorted) {
    const config = CHECKS[name];
    if (!config) continue;

    // Check if dependency passed
    if (config.dependsOn) {
      const depResult = results.find(r => r.name === config.dependsOn);
      if (!depResult || !depResult.pass || depResult.skipped) {
        console.log(`\n⏭ ${name}: ${config.desc} (skipped — dependency ${config.dependsOn} failed or skipped)`);
        results.push({ name, pass: true, skipped: true });
        continue;
      }
    }

    results.push(runCheck(name, config, skipOptional));
  }

  const passed = results.filter(r => r.pass && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.pass).length;

  console.log('\n═══ SUMMARY ═══');
  console.log(`Passed: ${passed}/${results.length}`);
  if (skipped > 0) console.log(`Skipped (optional/deps): ${skipped}`);
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
