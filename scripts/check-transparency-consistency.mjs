#!/usr/bin/env node
/**
 * check-transparency-consistency.mjs — Consistency validation for site-level vs per-resource AI/rights assertions.
 *
 * Detects contradictions between site-level blanket claims and per-resource metadata.
 * Reads canonical sources: _data/rights.json, _data/assets.yml, provenance frontmatter.
 *
 * Exit codes: 0 = clean, 1 = contradictions found, 2 = usage/config error.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCES_FILE = path.join(ROOT, 'scripts', 'consistency-sources.json');

function usage() {
  console.error('Usage: node scripts/check-transparency-consistency.mjs [--check]');
  process.exit(2);
}

function loadSources() {
  try {
    const content = fs.readFileSync(SOURCES_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`[ERROR] Failed to load sources config: ${e.message}`);
    process.exit(2);
  }
}

function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`[ERROR] Failed to load ${filePath}: ${e.message}`);
    process.exit(2);
  }
}

function loadYAML(filePath) {
  try {
    const content = fs.readFileSync(path.join(ROOT, filePath), 'utf8');
    // Simple YAML parsing for our specific structure
    const lines = content.split('\n');
    const assets = [];
    let currentAsset = null;
    let inAssets = false;
    let inDefaults = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('defaults:')) {
        inDefaults = true;
        inAssets = false;
        continue;
      }
      if (trimmed.startsWith('assets:')) {
        inAssets = true;
        inDefaults = false;
        continue;
      }
      if (trimmed.startsWith('- path:')) {
        if (currentAsset) assets.push(currentAsset);
        currentAsset = { path: trimmed.slice(7).trim() };
        continue;
      }
      if (currentAsset && trimmed.startsWith('creation:')) {
        currentAsset.creation = trimmed.slice(9).trim();
        continue;
      }
      if (currentAsset && trimmed.startsWith('license:')) {
        currentAsset.license = trimmed.slice(8).trim();
        continue;
      }
      if (currentAsset && trimmed.startsWith('note:')) {
        currentAsset.note = trimmed.slice(5).trim();
        continue;
      }
    }
    if (currentAsset) assets.push(currentAsset);
    return { assets };
  } catch (e) {
    console.error(`[ERROR] Failed to load YAML ${filePath}: ${e.message}`);
    process.exit(2);
  }
}

function extractFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fmContent = fmMatch[1];
  const result = {};
  for (const line of fmContent.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      result[key] = value;
    }
  }
  return result;
}

function scanProvenanceFrontmatter(sources, violations) {
  const pagesDir = path.join(ROOT, sources.canonicalSources.provenanceFrontmatter);
  if (!fs.existsSync(pagesDir)) return;

  const entries = fs.readdirSync(pagesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const filePath = path.join(pagesDir, entry.name);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = extractFrontmatter(content);
      if (!fm || !fm.provenance) continue;

      const prov = fm.provenance;
      if (prov.creation && !sources.allowedCreationValues.includes(prov.creation)) {
        violations.push({
          source: entry.name,
          line: 1,
          reason: `Unknown provenance creation value: ${prov.creation}`
        });
      }
    } catch (e) {
      // Skip unreadable
    }
  }
}

function checkRightsConsistency(sources, violations) {
  const rights = loadJSON(sources.canonicalSources.rights);
  const assets = loadYAML(sources.canonicalSources.assets);

  // Check for contradictory site-level claims in README or similar
  const readmePath = path.join(ROOT, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8').toLowerCase();
    for (const claim of sources.prohibitedSiteLevelClaims) {
      if (readme.includes(claim.toLowerCase())) {
        violations.push({
          source: 'README.md',
          line: 1,
          reason: `Prohibited site-level blanket claim detected: "${claim}"`
        });
      }
    }
  }

  // Check per-resource rights for contradictions
  if (rights.pages) {
    for (const [pagePath, pageInfo] of Object.entries(rights.pages)) {
      const spdxId = pageInfo.spdxId;
      if (spdxId === 'CC0-1.0' && pagePath.includes('human')) {
        violations.push({
          source: pagePath,
          line: 1,
          reason: `Human-created page marked as CC0-1.0 (should be LicenseRef-NoExcuse-All-Rights-Reserved)`
        });
      }
    }
  }

  // Check assets for creation/license consistency
  if (assets.assets) {
    for (const asset of assets.assets) {
      if (asset.creation === 'human-created' && asset.license === 'CC0-1.0') {
        violations.push({
          source: asset.path,
          line: 1,
          reason: `Human-created asset marked as CC0-1.0 (should be LicenseRef-NoExcuse-All-Rights-Reserved)`
        });
      }
      if (asset.creation === 'ai-generated' && asset.license === 'LicenseRef-NoExcuse-All-Rights-Reserved') {
        violations.push({
          source: asset.path,
          line: 1,
          reason: `AI-generated asset marked as LicenseRef-NoExcuse-All-Rights-Reserved (should be CC0-1.0)`
        });
      }
      if (asset.creation && !sources.allowedCreationValues.includes(asset.creation)) {
        violations.push({
          source: asset.path,
          line: 1,
          reason: `Unknown creation value: ${asset.creation}`
        });
      }
      if (asset.license && !sources.allowedLicenseValues.includes(asset.license)) {
        violations.push({
          source: asset.path,
          line: 1,
          reason: `Unknown license value: ${asset.license}`
        });
      }
    }
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) usage();

  const sources = loadSources();
  const violations = [];

  scanProvenanceFrontmatter(sources, violations);
  checkRightsConsistency(sources, violations);

  if (violations.length > 0) {
    console.error('[FAIL] Transparency consistency violations:');
    for (const v of violations) {
      console.error(`  ${v.source}|${v.line}|${v.reason}`);
    }
    process.exit(1);
  } else {
    console.log('[OK] Transparency consistency check passed — no contradictions found.');
    process.exit(0);
  }
}

main();