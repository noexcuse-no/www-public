#!/usr/bin/env node
/**
 * validate-production-build.mjs
 * Fails the build if debug/staging/internal patterns are found in the rendered _site/ output.
 * Run as part of npm run ci:local after jekyll build.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

const SITE_DIR = '_site';

// Patterns that must NOT appear in production HTML
const FORBIDDEN_PATTERNS = [
  { pattern: /route_b_live/i, label: 'route_b_live staging flag' },
  { pattern: /Route\s+[AB]/i, label: 'Route A/B internal reference' },
  { pattern: /ikke ennå publisert/i, label: 'not yet published message' },
  { pattern: /staging/i, label: 'staging reference' },
  { pattern: /feature.?flag/i, label: 'feature flag reference' },
  { pattern: /debug/i, label: 'debug reference' },
  { pattern: /TODO/i, label: 'TODO comment' },
  { pattern: /FIXME/i, label: 'FIXME comment' },
  { pattern: /placeholder(?![="])/i, label: 'placeholder text (not class/attr)' },
  { pattern: /lorem ipsum/i, label: 'lorem ipsum' },
  { pattern: /commit [a-f0-9]{7,}/i, label: 'commit hash' },
  { pattern: /\beksperiment\b/i, label: 'experiment reference (standalone word)' },
  { pattern: /bananas/i, label: 'bananas AI reference' },
  { pattern: /github\.com\/noexcuse-no(?!\/security)(?!\/www-public\/security)/i, label: 'internal GitHub reference (non-security)' },
];

// File extensions to scan
const SCAN_EXTENSIONS = ['.html', '.htm', '.xml', '.json', '.txt', '.md'];

function walkDir(dir, fileList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (SCAN_EXTENSIONS.includes(extname(file).toLowerCase())) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function validate() {
  console.log('🔍 Validating production build for debug/staging leakage...\n');

  const files = walkDir(SITE_DIR);
  let hasErrors = false;

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const relPath = relative(SITE_DIR, file);

    for (const { pattern, label } of FORBIDDEN_PATTERNS) {
      const matches = content.match(pattern);
      if (matches) {
        // Show context around match
        const idx = matches.index;
        const start = Math.max(0, idx - 60);
        const end = Math.min(content.length, idx + matches[0].length + 60);
        const context = content.slice(start, end).replace(/\n/g, '↵');

        console.error(`❌ FORBIDDEN: ${label}`);
        console.error(`   File: ${relPath}`);
        console.error(`   Match: "${matches[0]}"`);
        console.error(`   Context: ...${context}...`);
        console.error('');
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error('🛑 BUILD FAILED: Production build contains debug/staging content.');
    console.error('   Fix the source files and rebuild.');
    process.exit(1);
  } else {
    console.log('✅ Production build clean — no forbidden patterns found.');
    process.exit(0);
  }
}

validate();