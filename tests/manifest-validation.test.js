import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, '.well-known/ai-transparency.json');
const manifest = readFileSync(manifestPath, 'utf8');

const REVIEWER = 'Dagfinn Bang-Johansen';
const COMPOSITE = 'CompositeWithTrainedAlgorithmicMediaDigitalSource';

describe('.well-known/ai-transparency.json', () => {
  it('has all 4 reviewer fields = Dagfinn Bang-Johansen (text, code, styles, images)', () => {
    const reviewerMatches = manifest.match(/"reviewer"\s*:\s*"Dagfinn Bang-Johansen"/g);
    expect(reviewerMatches).toHaveLength(4);
  });

  it('has editorialReview block in each of the 4 declaration groups', () => {
    const blocks = manifest.match(/"editorialReview"/g);
    expect(blocks).toHaveLength(4);
  });

  it('declarations.text digitalSourceType is Composite', () => {
    expect(manifest).toContain(`"digitalSourceType": "${COMPOSITE}"`);
  });

  it('has a single editorial_responsibility field pointing to /om-store-sprakmodeller/', () => {
    const keys = manifest.match(/"editorial_responsibility"\s*:/g);
    expect(keys).toHaveLength(1);
    expect(manifest).toContain('"editorial_responsibility": "/om-store-sprakmodeller/"');
  });

  it('has regulatory_contact (Nkom) + Norwegian disclosure_statement', () => {
    expect(manifest).toContain('"regulatory_contact"');
    expect(manifest).toContain('"name": "Nkom"');
    expect(manifest).toContain('"url": "https://www.nkom.no/"');
    expect(manifest).toContain('"disclosure_statement"');
  });

  it('has no stale step-* routes anywhere in the manifest', () => {
    expect(manifest).not.toMatch(/\/step-(talk|interview|report)\//);
  });

  it('routes block generates from site.pages filtered to .md paths', () => {
    expect(manifest).toContain('site.pages | concat: site.tags');
    expect(manifest).toContain('page.path contains ".md"');
  });

  it('required routes resolve from actual pages on disk; count = pages + 1 (index.md)', () => {
    const pageFiles = readdirSync(path.join(root, '_pages')).filter((f) => f.endsWith('.md'));
    expect(pageFiles).toContain('personvern.md');
    expect(pageFiles).toContain('om-store-sprakmodeller.md');
    expect(pageFiles.some((f) => f.startsWith('step-'))).toBe(false);
    expect(existsSync(path.join(root, 'index.md'))).toBe(true);

    const expectedRoutes = pageFiles.length + 1; // +1 = root index.md
    expect(expectedRoutes).toBe(42);
  });

  it('images.count matches the actual ai-generated asset count', () => {
    const rights = JSON.parse(readFileSync(path.join(root, '_data/rights.json'), 'utf8'));
    const assets = Object.values(rights.assets);
    const aiGeneratedCount = assets.filter((a) => a.creation === 'ai-generated').length;

    // Template must count via item.creation (Jekyll where_exp maps Hash -> values;
    // item.value.creation would render 0).
    expect(manifest).toContain("item.creation == 'ai-generated'");

    // Cross-check against the image-provenance exclude-list:
    // ai-generated images = total image assets - excluded (ai_generated: false).
    // Asset paths are KEYS of rights.assets (no `path` property on values).
    const yml = YAML.parse(readFileSync(path.join(root, '_data/image-provenance.yml'), 'utf8'));
    const excluded = yml.images.filter((i) => i.ai_generated === false);
    const imageEntries = Object.entries(rights.assets).filter(([k]) => /\.(webp|png|jpg)$/i.test(k));
    expect(aiGeneratedCount).toBe(imageEntries.length - excluded.length);
    expect(aiGeneratedCount).toBe(286);
  });

  it('does not name Rasmus S. Olsen as reviewer anywhere', () => {
    expect(manifest).not.toMatch(/Rasmus/i);
  });
});