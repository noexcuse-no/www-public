import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const includeSrc = readFileSync(path.join(ROOT, '_includes/provenance-jsonld.html'), 'utf8');

describe('provenance-jsonld.html @graph emission', () => {
  it('emits ImageObject for any page image UNLESS it is explicitly non-AI in the exclude-list', () => {
    // Regression: the include previously gated emission on `img_data.ai_generated == true`,
    // but _data/image-provenance.yml only ever lists non-AI exclusions (ai_generated: false).
    // That inverted filter meant NO ImageObject ever rendered. The correct contract:
    // everything is AI by default; the exclude-list gates OMISSION.
    expect(includeSrc).toMatch(/unless img_data and img_data\.ai_generated == false/);
    // The buggy inverted form must never reappear.
    expect(includeSrc).not.toMatch(/if img_data and img_data\.ai_generated == true/);
  });

  it('normalizes the leading slash before matching against registry paths', () => {
    // _data/image-provenance.yml paths have no leading slash (assets/images/...),
    // but page frontmatter mixes both ("/assets/..." and "assets/...").
    // Liquid 4.0.4 has no string indexing (img[0] renders empty), so the leading
    // slash is detected via capture + slice before the conditional strip.
    expect(includeSrc).toContain('slice: 0, 1');
    expect(includeSrc).toContain('remove_first: "/"');
  });

  it('does not re-strip the normalized path at iteration time', () => {
    // Regression: discovery already normalizes to registry form (no leading slash).
    // A second remove_first at the @graph loop would corrupt "assets/images/x.webp"
    // into "assetsimages/x.webp" (remove_first: "/" removes the first slash ANYWHERE)
    // and silently break the exclude-list match.
    expect(includeSrc).not.toMatch(/img_path \| remove_first/);
  });

  it('deduplicates page images (hero.image and banner often reference the same file)', () => {
    expect(includeSrc).toContain('page_images = page_images | uniq');
  });

  it('emits the exclude-list JSON blob from ai_generated == false entries only', () => {
    expect(includeSrc).toContain('item.ai_generated == false');
    expect(includeSrc).toContain('id="ai-provenance-exclude-list"');
  });

  it('matches the exclude-list contract that non-ai-exclusion.test.js asserts', () => {
    const yml = readFileSync(path.join(ROOT, '_data/image-provenance.yml'), 'utf8');
    const data = YAML.parse(yml);
    // Registry design: only non-AI images are listed (all ai_generated: false).
    // Every listed entry must be non-AI for the unless-gate to omit exactly those.
    const nonAi = data.images.filter((item) => item.ai_generated === false);
    expect(nonAi.length).toBe(data.images.length);
    for (const item of data.images) {
      expect(item.ai_generated, `${item.path} must be ai_generated: false`).toBe(false);
      expect(item.path.startsWith('/'), `${item.path} must have no leading slash`).toBe(false);
    }
  });
});