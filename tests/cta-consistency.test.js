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

// Decision D9 canonical labels (see _data/ctas.yml). Link-text variants of the
// secondary booking CTA are forbidden; descriptive prose without "Bestill"/"Book"
// prefix is allowed.
const FORBIDDEN_LINK_TEXT = [
  /bestill\s+uforpliktende\s+samtale/i,
  /bestill\s+en\s+samtale/i,
  /bestill\s+samtale/i,
  /book\s+samtale/i,
  /book\s+20\s+min/i,
  /bestill\s+en\s+gratis\s+20-minutters\s+avklaring/i,
];

function extractAnchors(html) {
  const anchors = [];
  const re = /<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    anchors.push({ href: m[1], text: m[2].replace(/<[^>]*>/g, ' ').trim() });
  }
  return anchors;
}

d('CTA consistency (built site)', () => {
  it('contains no non-canonical booking CTA link labels', () => {
    const violations = [];
    for (const file of walkDir(SITE_DIR)) {
      const html = readFileSync(file, 'utf8');
      for (const { href, text } of extractAnchors(html)) {
        for (const pattern of FORBIDDEN_LINK_TEXT) {
          if (pattern.test(text)) {
            violations.push(`${file}: "${text.trim()}" → ${href}`);
          }
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it('canonical secondary label "Bestill 20 min avklaring" always targets /samtale/', () => {
    const violations = [];
    for (const file of walkDir(SITE_DIR)) {
      const html = readFileSync(file, 'utf8');
      for (const { href, text } of extractAnchors(html)) {
        if (/bestill\s+20\s+min\s+avklaring/i.test(text) && !href.startsWith('/samtale/')) {
          violations.push(`${file}: "${text.trim()}" → ${href}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });
});
