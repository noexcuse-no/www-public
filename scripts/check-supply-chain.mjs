#!/usr/bin/env node
/**
 * Local supply-chain / security static analysis check for JS assets.
 * Focuses on security-relevant patterns: eval, Function, innerHTML with untrusted data,
 * document.write, hardcoded secrets, etc.
 * Exits non-zero on security violations.
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function run(cmd, { silent = false } = {}) {
  try {
    const out = execSync(cmd, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' });
    return { code: 0, stdout: out.trim() };
  } catch (e) {
    return { code: e.status ?? 1, stdout: e.stdout?.toString().trim() ?? '', stderr: e.stderr?.toString().trim() ?? '' };
  }
}

function checkSemgrep() {
  // Check if semgrep is available
  const hasSemgrep = existsSync('/usr/local/bin/semgrep') ||
    run('which semgrep', { silent: true }).code === 0 ||
    run('npx semgrep --version', { silent: true }).code === 0;

  if (!hasSemgrep) {
    console.log('▶ Semgrep not available — skipping (install via `pipx install semgrep` or `brew install semgrep`)');
    return true;
  }

  console.log('▶ Semgrep security rules');
  // Run semgrep with security-focused rulesets
  const result = run('semgrep scan --config=p/security-audit --config=p/secrets --config=p/nodejs assets/scripts/', { silent: true });
  if (result.code !== 0) {
    console.error('❌ Semgrep findings:');
    console.error(result.stdout || result.stderr);
    return false;
  }
  console.log('  No Semgrep findings');
  return true;
}

function checkSecurityPatterns() {
  console.log('▶ Security-relevant pattern scan');
  const patterns = [
    { name: 'eval()', regex: /eval\s*\(/, severity: 'error' },
    { name: 'Function constructor', regex: /new\s+Function\s*\(/, severity: 'error' },
    { name: 'document.write', regex: /document\.write\s*\(/, severity: 'error' },
    { name: 'execScript', regex: /execScript\s*\(/, severity: 'error' },
    { name: 'setTimeout with string', regex: /setTimeout\s*\(\s*['"`]/, severity: 'error' },
    { name: 'setInterval with string', regex: /setInterval\s*\(\s*['"`]/, severity: 'error' },
    { name: 'hardcoded secret pattern', regex: /(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*['"`][^'"`]{8,}/i, severity: 'error' },
    // innerHTML/outerHTML with non-literal empty string or trusted template variable
    { name: 'innerHTML assignment (potential XSS)', regex: /\.(innerHTML|outerHTML)\s*=\s*(?!['"`]\s*['"`])(?!['"`]\s*\+\s*['"`])/, severity: 'warn' },
  ];

  let hasError = false;
  const files = [
    'assets/scripts/animations.js',
    'assets/scripts/carousel.js',
    'assets/scripts/contact.js',
    'assets/scripts/cross-links.js',
    'assets/scripts/dark-mode-toggle.js',
    'assets/scripts/navbar.js',
    'assets/scripts/newsletter.js',
    'assets/scripts/review-questions.js',
    'assets/scripts/sidebar.js',
    'assets/scripts/stagger-observer.js',
  ];

  for (const file of files) {
    const content = run(`cat ${file}`, { silent: true }).stdout;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const { name, regex, severity } of patterns) {
        const match = line.match(regex);
        if (match) {
          const prefix = severity === 'error' ? '❌' : '⚠️';
          console.log(`  ${prefix} ${file}:${i+1}: ${name} — "${match[0].substring(0, 80)}"`);
          if (severity === 'error') hasError = true;
        }
      }
    }
  }
  if (!hasError) console.log('  No critical security patterns detected');
  return !hasError;
}

async function main() {
  console.log('🔍 Running supply-chain security checks...\n');

  const checks = [
    checkSecurityPatterns(),
    checkSemgrep(),
  ];

  if (!checks.every(Boolean)) {
    console.error('\n❌ Supply-chain security checks failed');
    process.exit(1);
  }

  console.log('\n✅ All supply-chain security checks passed');
}

main().catch(e => {
  console.error('❌ Check failed:', e.message);
  process.exit(1);
});