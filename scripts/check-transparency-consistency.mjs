#!/usr/bin/env node
/**
 * Transparency consistency validator — checks for contradictions between
 * site-level AI/rights assertions and per-resource metadata.
 * Exits non-zero on contradictions, reporting source|line|reason.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const ROOT = resolve(__dirname, '..');
const SOURCES_FILE = resolve(ROOT, 'scripts/consistency-sources.json');

function loadSources() {
  return JSON.parse(readFileSync(SOURCES_FILE, 'utf8'));
}

function readTextFile(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}

function checkBlanketAssertions(content, sources, filePath) {
  const violations = [];
  const relPath = filePath.replace(ROOT + '/', '');

  for (const rule of sources.validation_rules.forbidden_blanket_assertions) {
    const regex = new RegExp(rule.pattern, 'gi');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        violations.push({
          source: relPath,
          line: i + 1,
          reason: `forbidden blanket assertion: ${rule.description} (matched: "${rule.pattern}")`
        });
      }
    }
  }
  return violations;
}

function checkAiTransparencyConsistency(aiTransparencyContent) {
  const violations = [];
  if (!aiTransparencyContent) return violations;

  try {
    const data = JSON.parse(aiTransparencyContent);
    // Check that routes exist and have digitalSourceType
    if (data.routes && Array.isArray(data.routes)) {
      for (const route of data.routes) {
        if (!route.content || !Array.isArray(route.content) || route.content.length === 0) {
          violations.push({
            source: '.well-known/ai-transparency.json',
            line: 0,
            reason: `route ${route.path} has empty content array`
          });
        }
        // Check for blanket "all content is AI" equivalent
        if (route.content.includes('all') || route.description?.toLowerCase().includes('all content')) {
          // Not a violation per se, but flag for review
        }
      }
    }
    // Check declarations have digitalSourceType
    if (data.declarations) {
      for (const [type, decl] of Object.entries(data.declarations)) {
        if (!decl.digitalSourceType) {
          violations.push({
            source: '.well-known/ai-transparency.json',
            line: 0,
            reason: `declaration type "${type}" missing digitalSourceType`
          });
        }
      }
    }
  } catch (e) {
    violations.push({
      source: '.well-known/ai-transparency.json',
      line: 0,
      reason: `JSON parse error: ${e.message}`
    });
  }
  return violations;
}

function checkPolicyPageConsistency(policyContent) {
  const violations = [];
  if (!policyContent) return violations;

  // Check for forbidden blanket assertions
  const blanketPatterns = [
    /all content is (AI|CC0)/gi,
    /everything is (AI|CC0)/gi,
    /all content is (AI-generated|CC0)/gi
  ];

  const lines = policyContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const pattern of blanketPatterns) {
      if (pattern.test(lines[i])) {
        violations.push({
          source: '_pages/om_store_sprakmodeller.md',
          line: i + 1,
          reason: `forbidden blanket assertion detected: "${lines[i].trim().substring(0, 100)}"`
        });
      }
    }
  }

  // Check that policy mentions per-resource metadata
  if (!policyContent.includes('per-resource') && !policyContent.includes('per ressurs')) {
    violations.push({
      source: '_pages/om_store_sprakmodeller.md',
      line: 0,
      reason: 'policy should reference per-resource metadata/provenance'
    });
  }

  return violations;
}

function checkAiTransparencyJson() {
  const path = resolve(ROOT, '.well-known/ai-transparency.json');
  const content = readTextFile(path);
  return checkAiTransparencyConsistency(content);
}

function checkPolicyPage() {
  const path = resolve(ROOT, '_pages/om_store_sprakmodeller.md');
  const content = readTextFile(path);
  return checkPolicyPageConsistency(content);
}

function checkAllFiles(sources) {
  const violations = [];
  const scanDirs = [
    'README.md',
    '_pages',
    '.design',
    '.specs',
    '_includes',
    '_layouts'
  ];

  for (const scanDir of scanDirs) {
    const fullPath = resolve(ROOT, scanDir);
    if (!existsSync(fullPath)) continue;

    const files = statSync(fullPath).isFile() ? [fullPath] : walk(fullPath);

    for (const filePath of files) {
      const relPath = filePath.replace(ROOT + '/', '');
      if (relPath === '_pages/om_store_sprakmodeller.md' || relPath === '.well-known/ai-transparency.json') {
        continue; // handled separately
      }

      const ext = extname(filePath).toLowerCase();
      if (!['.md', '.html', '.txt', '.yml', '.yaml', '.json'].includes(ext)) continue;

      try {
        const content = readTextFile(filePath);
        if (!content) continue;

        // Check for blanket assertions
        const blanketViolations = checkBlanketAssertions(content, sources, filePath);
        violations.push(...blanketViolations);
      } catch {
        // skip unreadable
      }
    }
  }
  return violations;
}

function walk(dir, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function main() {
  console.log('🔍 Validating AI/rights transparency consistency...\n');

  const sources = loadSources();

  let totalViolations = 0;
  const allViolations = [];

  // Check each canonical source
  console.log('Checking .well-known/ai-transparency.json...');
  allViolations.push(...checkAiTransparencyJson());

  console.log('Checking _pages/om_store_sprakmodeller.md...');
  allViolations.push(...checkPolicyPage());

  console.log('Scanning all docs for blanket assertions...');
  allViolations.push(...checkAllFiles(sources));

  for (const v of allViolations) {
    console.error(`❌ inconsistency|${v.source}|${v.line}|${v.reason}`);
    totalViolations++;
  }

  // Document canonical sources
  console.log('\n📋 Canonical metadata sources:');
  for (const [key, src] of Object.entries(sources.sources)) {
    const canonical = src.canonical ? ' ✓ CANONICAL' : '';
    console.log(`  - ${key}: ${src.path} (${src.type})${canonical}`);
  }

  if (totalViolations > 0) {
    console.error(`\n❌ Consistency check failed: ${totalViolations} contradiction(s) found`);
    process.exit(1);
  }

  console.log('\n✅ Transparency consistency check passed — no contradictions found');
}

main().catch(e => {
  console.error('❌ Check failed:', e.message);
  process.exit(1);
});