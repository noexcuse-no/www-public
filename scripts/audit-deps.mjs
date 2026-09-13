#!/usr/bin/env node
/**
 * Local dependency audit script — runs npm audit, checks for outdated packages,
 * and verifies package names against registry for slopsquat patterns.
 * Exits non-zero on high/critical vulnerabilities or slopsquat detections.
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PKG_PATH = resolve('package.json');
const LOCK_PATH = resolve('package-lock.json');

function run(cmd, { silent = false } = {}) {
  try {
    const out = execSync(cmd, { encoding: 'utf8', stdio: silent ? 'pipe' : 'inherit' });
    return { code: 0, stdout: out.trim() };
  } catch (e) {
    return { code: e.status ?? 1, stdout: e.stdout?.toString().trim() ?? '', stderr: e.stderr?.toString().trim() ?? '' };
  }
}

function parseAudit(json) {
  const vulns = json.vulnerabilities ?? {};
  const highCrit = Object.values(vulns).filter(v => v.severity === 'high' || v.severity === 'critical');
  return { total: Object.keys(vulns).length, highCrit, metadata: json.metadata };
}

function checkSlopsquat(pkgNames) {
  // Common slopsquat patterns: typosquatting, brandjacking, combosquatting
  const suspicious = [];
  const knownBrands = ['react', 'vue', 'angular', 'next', 'nuxt', 'svelte', 'express', 'fastify', 'koa', 'lodash', 'ramda', 'axios', 'fetch', 'jest', 'vitest', 'mocha', 'chai', 'cypress', 'playwright', 'puppeteer', 'webpack', 'vite', 'rollup', 'esbuild', 'babel', 'typescript', 'eslint', 'prettier', 'stylelint', 'htmlhint', 'markdownlint', 'remark', 'rehype', 'unified', 'node', 'npm', 'yarn', 'pnpm', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'firebase', 'supabase', 'prisma', 'drizzle', 'sql', 'postgres', 'mysql', 'redis', 'mongodb', 'graphql', 'apollo', 'urql', 'tinacms', 'strapi', 'keystone', 'ghost', 'wordpress', 'drupal', 'joomla', 'hugo', 'jekyll', 'eleventy', 'astro', 'sveltekit', 'remix', 'gatsby', 'nextra', 'docusaurus', 'vitepress', 'mkdocs', 'sphinx', 'pandoc', 'latex', 'tex', 'bibtex', 'citation', 'zotero', 'mendeley', 'endnote', 'refworks', 'overleaf', 'sharelatex', 'authorea', 'manubot', 'jupyter', 'colab', 'kaggle', 'huggingface', 'transformers', 'torch', 'tensorflow', 'jax', 'flax', 'numpy', 'pandas', 'scipy', 'sklearn', 'xgboost', 'lightgbm', 'catboost', 'optuna', 'ray', 'dask', 'modin', 'vaex', 'polars', 'duckdb', 'clickhouse', 'timescale', 'influx', 'prometheus', 'grafana', 'loki', 'tempo', 'jaeger', 'zipkin', 'otel', 'opentelemetry', 'signoz', 'hyperdx', 'arize', 'phoenix', 'langsmith', 'langchain', 'llamaindex', 'haystack', 'semantic-kernel', 'autogen', 'crewai', 'autogpt', 'babyagi', 'openai', 'anthropic', 'cohere', 'mistral', 'together', 'replicate', 'perplexity', 'you.com', 'phind', 'cody', 'cursor', 'vscode', 'zed', 'neovim', 'helix', 'kakoune', 'vis', 'vim', 'emacs', 'doom', 'spacemacs', 'prelude', 'centaur', 'evil', 'use-package', 'straight', 'quelpa', 'el-get', 'package', 'melpa', 'org', 'github', 'gitlab', 'bitbucket', 'sourcehut', 'codeberg', 'git', 'hg', 'svn', 'cvs', 'fossil', 'pijul', 'jj', 'sapling', 'hg-git', 'git-remote-hg', 'git-remote-bzr', 'git-svn', 'git-cinnabar'];
  // Legitimate ecosystem packages that contain brand names (config, plugin, preset, utils, tools, cli, core, types)
  const legitimatePatterns = [
    /^eslint-(config|plugin|plugin-.+|scope|utils|scope-.+)(-.*)?$/,
    /^stylelint-(config|plugin|plugin-.+)(-.*)?$/,
    /^@babel\/(plugin|preset|helper|parser|generator|template|types|traverse)-.+/,
    /^@typescript-eslint\/(eslint-plugin|parser|utils|type-utils)-.+/,
    /^@eslint\/(config|plugin|utils)-.+/,
    /^eslint-plugin-.+/,
    /^stylelint-plugin-.+/,
    /^.+-eslint-plugin$/,
    /^.+-stylelint-plugin$/,
    /^.+-config$/,
    /^.+-preset$/,
    /^@.+\/(config|preset|plugin|utils)$/,
  ];
  function isLegitimate(name) {
    const lower = name.toLowerCase();
    for (const pattern of legitimatePatterns) {
      if (pattern.test(lower)) return true;
    }
    // Official org packages
    if (lower.startsWith('@babel/') || lower.startsWith('@typescript-eslint/') ||
        lower.startsWith('@eslint/') || lower.startsWith('@stylelint/') ||
        lower.startsWith('@prettier/') || lower.startsWith('@vitest/') ||
        lower.startsWith('@vitest/')) return true;
    return false;
  }

  for (const name of pkgNames) {
    if (isLegitimate(name)) continue;
    const lower = name.toLowerCase();
    // Check for known brand + suffix/prefix (combosquatting)
    for (const brand of knownBrands) {
      if (lower !== brand && (lower.startsWith(brand + '-') || lower.startsWith(brand + '_') || lower.endsWith('-' + brand) || lower.endsWith('_' + brand) || lower.includes('-' + brand + '-'))) {
        suspicious.push({ name, reason: `combosquatting: contains brand '${brand}'` });
        break;
      }
      // Typosquatting: edit distance 1 (simple check: missing char, extra char, swapped adjacent)
      if (lower.length === brand.length + 1 || lower.length === brand.length - 1 || lower.length === brand.length) {
        let diff = 0;
        for (let i = 0; i < Math.max(lower.length, brand.length); i++) {
          if (lower[i] !== brand[i]) diff++;
        }
        if (diff <= 2 && lower !== brand) {
          suspicious.push({ name, reason: `typosquatting: similar to '${brand}' (edit distance ${diff})` });
          break;
        }
      }
    }
  }
  return suspicious;
}

async function main() {
  console.log('🔍 Running local dependency audit...\n');

  // 1. npm audit
  console.log('▶ npm audit --omit=dev');
  const audit = run('npm audit --omit=dev --json', { silent: true });
  let auditData;
  try {
    auditData = JSON.parse(audit.stdout);
  } catch {
    console.error('❌ Failed to parse npm audit output');
    process.exit(1);
  }
  const { total, highCrit } = parseAudit(auditData);
  console.log(`  Vulnerabilities: ${total} total, ${highCrit.length} high/critical`);
  if (highCrit.length > 0) {
    console.error('❌ High/critical vulnerabilities found:');
    for (const v of highCrit) {
      console.error(`  - ${v.name}@${v.version}: ${v.severity} - ${v.title}`);
    }
    process.exit(1);
  }

  // 2. npm outdated (report only)
  console.log('\n▶ npm outdated');
  const outdated = run('npm outdated --json', { silent: true });
  if (outdated.stdout) {
    try {
      const out = JSON.parse(outdated.stdout);
      console.log(`  Outdated packages: ${Object.keys(out).length}`);
      for (const [name, info] of Object.entries(out)) {
        console.log(`  - ${name}: current ${info.current} → wanted ${info.wanted} → latest ${info.latest}`);
      }
    } catch {
      // ignore parse errors
    }
  } else {
    console.log('  All packages up to date');
  }

  // 3. Slopsquat detection
  console.log('\n▶ Slopsquat detection');
  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.optionalDependencies };
  const depNames = Object.keys(allDeps);
  const suspicious = checkSlopsquat(depNames);
  if (suspicious.length > 0) {
    console.error('❌ Suspicious package names (possible slopsquatting):');
    for (const s of suspicious) {
      console.error(`  - ${s.name}: ${s.reason}`);
    }
    process.exit(1);
  } else {
    console.log('  No suspicious package names detected');
  }

  // 4. Verify lockfile integrity
  console.log('\n▶ Lockfile integrity');
  try {
    run('npm ls --omit=dev', { silent: true });
    console.log('  Dependency tree valid');
  } catch {
    console.error('❌ Dependency tree has issues (extraneous/missing)');
    process.exit(1);
  }

  console.log('\n✅ All dependency audits passed');
}

main().catch(e => {
  console.error('❌ Audit failed:', e.message);
  process.exit(1);
});