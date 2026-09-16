import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { walkDir } from '../scripts/check-links.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SITE_DIR = path.join(root, '_site');
const siteBuilt = existsSync(SITE_DIR);
// Integration checks against the built site — run `JEKYLL_ENV=production jekyll build` first.
const d = siteBuilt ? describe : describe.skip;

function stripTags(html) {
  return html.replace(/<[^>]*>/g, ' ');
}

d('heading structure (built site)', () => {
  const files = walkDir(SITE_DIR);

  it('found generated HTML files (site is built)', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('every page has exactly one <h1>', () => {
    const violations = [];
    for (const file of files) {
      const html = readFileSync(file, 'utf8');
      const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
      if (h1Count !== 1) violations.push(`${file}: ${h1Count} h1 elements`);
    }
    expect(violations).toEqual([]);
  });

  it('heading levels never skip (h1 → h3 without h2)', () => {
    const violations = [];
    for (const file of files) {
      const html = readFileSync(file, 'utf8');
      const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
      let prev = 0;
      for (const level of levels) {
        if (prev !== 0 && level > prev + 1) {
          violations.push(`${file}: h${prev} → h${level} skip`);
        }
        prev = level;
      }
    }
    expect(violations).toEqual([]);
  });

  it('visible text contains no leftover placeholder headings', () => {
    for (const file of files) {
      const text = stripTags(readFileSync(file, 'utf8'));
      expect(text).not.toMatch(/innholdsfortegnelse krever javascript/i);
    }
  });
});
