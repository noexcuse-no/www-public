import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(path.join(root, rel), 'utf8');

const SITE_DIR = path.join(root, '_site');
const siteBuilt = existsSync(SITE_DIR);
// Integration checks against the built site — run `JEKYLL_ENV=production jekyll build` first.
const d = siteBuilt ? describe : describe.skip;

// Regression guards for the visual bug hunt (VIS-001 … VIS-014).
// Each rule exists because a defect shipped: keep the assertion, not just the fix.

describe('visual hunt regression — includes (source)', () => {
  it('recognition-card emits only canonical media-editorial modes (no --illustration-contained)', () => {
    const include = read('_includes/recognition-card.html');
    expect(include).not.toContain('illustration-contained');
    expect(include).toMatch(/default: "illustration"/);
  });

  it('process-step wraps its image in media-editorial--reference (stable 16:9 contract)', () => {
    const include = read('_includes/process-step.html');
    expect(include).toMatch(/<div class="media-editorial media-editorial--reference">\s*<img/);
  });

  it('full-style hero image carries an explicit sizing class', () => {
    const include = read('_includes/commercial/hero.html');
    expect(include).toContain('home-hero__img-full');
  });

  it('logo SVG exposes the .logo hook (header sizing rules are not dead)', () => {
    const svg = read('_includes/logo-svg.html');
    expect(svg).toMatch(/<svg\s+class="logo"/);
  });

  it('final CTA derives price and inclusions from the single commercial source', () => {
    const include = read('_includes/commercial/final_cta.html');
    expect(include).toContain('site.data.commercial.price_display');
    expect(include).toContain('site.data.commercial.price_note');
    expect(include).toContain('site.data.commercial.inclusions');
  });
});

describe('visual hunt regression — markdown sources', () => {
  it('homepage renders exactly 4 recognition cards and 3 process steps', () => {
    const index = read('index.md');
    expect((index.match(/include recognition-card\.html/g) ?? []).length).toBe(4);
    expect((index.match(/include process-step\.html/g) ?? []).length).toBe(3);
  });

  it('homepage does not hardcode price data or the dead recognition mode', () => {
    const index = read('index.md');
    expect(index).not.toContain('illustration-contained');
    expect(index).not.toMatch(/^\s+price:/m);
  });

  it('published pages ship no inert ai-reflection CTA', () => {
    for (const page of ['_pages/ledelse-60-2.md', '_pages/metode.md']) {
      expect(read(page)).not.toContain('ai-reflection-cta');
    }
  });
});

describe('visual hunt regression — CSS contracts (source)', () => {
  it('hero grid containment: .hero clips the parallax-scaled child', () => {
    const css = read('assets/css/components/hero.css');
    expect(css).toMatch(/\.hero\s*\{[^}]*overflow:\s*hidden/);
  });

  it('--header-height lives on :root (fixed TOC toggle must resolve it)', () => {
    const css = read('assets/css/header.css');
    expect(css).toMatch(/:root\s*\{[^}]*--header-height:\s*97px/);
    expect(css).toMatch(/:root\s*\{[^}]*--header-height:\s*85px/);
  });

  it('buttons.css owns no .back-to-top selectors (layout.css is the single owner)', () => {
    const css = read('assets/css/components/buttons.css');
    expect(css).not.toMatch(/^\.back-to-top[\s,:{]/m);
  });

  it('back-to-top visible state is readable (opacity 0.95)', () => {
    const css = read('assets/css/layout.css');
    expect(css).toMatch(/\.back-to-top\.is-visible\s*\{[^}]*opacity:\s*0\.95/);
  });

  it('article tables use the descendant scroll pattern (nested tables included)', () => {
    const css = read('assets/css/article.css');
    expect(css).not.toContain('.article-body > table');
    expect(css).toMatch(/\.article-body table\s*\{[^}]*overflow-x:\s*auto/);
  });

  it('inline code cannot force the page wider than the viewport', () => {
    const css = read('assets/css/article.css');
    expect(css).toMatch(/\.article-body code\s*\{[^}]*overflow-wrap:\s*anywhere/);
  });

  it('headings break unbreakable Norwegian compounds at narrow viewports', () => {
    const css = read('assets/css/typography.css');
    for (const tag of ['h1', 'h2', 'h3', 'h4']) {
      expect(css).toMatch(new RegExp(`${tag}\\s*\\{[^}]*overflow-wrap:\\s*anywhere`));
    }
  });

  it('products.css keeps landing-page .process-step styles scoped', () => {
    const css = read('assets/css/products.css');
    expect(css).not.toMatch(/^\.process-step\s*\{/m);
    expect(css).not.toMatch(/^\.process-step:/m);
  });

  it('commercial.css references only defined surface/focus tokens', () => {
    const css = read('assets/css/components/commercial.css');
    expect(css).not.toContain('var(--surface-color)');
    expect(css).not.toContain('var(--focus-ring-color)');
  });

  it('hero image sizing contract exists in home.css', () => {
    const css = read('assets/css/components/home.css');
    expect(css).toMatch(/\.home-hero__img-full\s*\{[^}]*max-width:\s*100%/);
    expect(css).toMatch(/\.home-hero__grid > \*\s*\{[^}]*min-width:\s*0/);
  });
});

describe('visual hunt regression — commercial data source', () => {
  it('inclusions include the 45-minute report walkthrough; price stays single-sourced', () => {
    const yml = read('_data/commercial.yml');
    expect(yml).toContain('Gjennomgang av rapport (45 min)');
    expect(yml).toMatch(/price_display:\s*"kr 14 850,-"/);
  });
});

d('visual hunt regression — built site', () => {
  const home = readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8');

  it('homepage renders 4 recognition cards, 3 process steps, contained hero image, no raw Markdown', () => {
    expect((home.match(/class="recognition-card"/g) ?? []).length).toBe(4);
    expect((home.match(/class="process-step"/g) ?? []).length).toBe(3);
    expect((home.match(/media-editorial--reference/g) ?? []).length).toBe(3);
    expect(home).toContain('home-hero__img-full');
    // Raw Markdown headings inside raw-HTML blocks pass through unprocessed.
    expect(home).not.toContain('###');
  });

  it('header logo carries the .logo class in output', () => {
    expect(home).toMatch(/<svg\s+class="logo"/);
  });

  it('secondary decision card shows data-derived price and 6 inclusions', () => {
    const card = home.match(/decision-card--secondary[\s\S]*?<ul class="home-price-card__inclusions">([\s\S]*?)<\/ul>/) ?? [];
    expect(card[0]).toContain('kr 14 850,-');
    expect((card[1]?.match(/<li>/g) ?? []).length).toBe(6);
  });

  it('published pages render no inert ai-reflection CTA', () => {
    for (const page of ['ledelse-60-2/index.html', 'metode/index.html']) {
      expect(readFileSync(path.join(SITE_DIR, page), 'utf8')).not.toContain('ai-reflection-cta');
    }
  });
});
