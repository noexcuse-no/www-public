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

// Keep in sync with FORBIDDEN_PATTERNS in scripts/validate-production-build.mjs.
const FORBIDDEN = [
  { pattern: /route_b_live/i, label: 'route_b_live staging flag' },
  { pattern: /Route\s+[AB]/i, label: 'Route A/B internal reference' },
  { pattern: /ikke ennå publisert/i, label: 'not-yet-published message' },
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
];

d('production strings (built site)', () => {
  it('found generated HTML files (site is built)', () => {
    expect(walkDir(SITE_DIR).length).toBeGreaterThan(0);
  });

  it('contains no staging/debug/placeholder strings in generated HTML', () => {
    const violations = [];
    for (const file of walkDir(SITE_DIR)) {
      const html = readFileSync(file, 'utf8');
      for (const { pattern, label } of FORBIDDEN) {
        if (pattern.test(html)) {
          violations.push(`${file}: ${label}`);
        }
      }
    }
    expect(violations).toEqual([]);
  });
});
