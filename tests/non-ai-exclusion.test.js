import { describe, it, expect } from 'vitest';
import { Window } from 'happy-dom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Non-AI images per _data/image-provenance.yml exclude-list.
// The plan names dagfinn.webp, noexcuse-logo-horizontal.webp, noexcuse-logo-azure.webp,
// og-image.webp explicitly. Regression guard against the "all images AI-generated" bug.
const NON_AI_IMAGES = [
  'assets/images/dagfinn.webp',
  'assets/images/noexcuse-logo-horizontal.webp',
  'assets/images/noexcuse-logo-azure.webp',
  'assets/images/og-image.webp',
];

// Loads the exclude-list exactly as _includes/provenance-jsonld.html emits it:
// `site.data.image-provenance.images | where_exp: ai_generated == false | map: "path" | jsonify`
// -> a JSON ARRAY of path strings.
function loadExcludeListFromData() {
  const yml = fs.readFileSync(path.join(ROOT, '_data/image-provenance.yml'), 'utf8');
  const data = YAML.parse(yml);
  return data.images
    .filter((item) => item.ai_generated === false)
    .map((item) => item.path);
}

function loadRealInjectorSource() {
  return fs.readFileSync(path.join(ROOT, 'assets/scripts/ai-provenance-injector.js'), 'utf8');
}

function createDOM(html) {
  const window = new Window();
  const document = window.document;
  document.write(html);
  document.close();
  return { window, document };
}

// Runs the REAL ai-provenance-injector.js against the given DOM, with the
// exclude-list blob shaped exactly as the Liquid template emits it (array).
function runRealInjector(dom, excludeList) {
  const { window, document } = dom;
  const blob = document.createElement('script');
  blob.id = 'ai-provenance-exclude-list';
  blob.type = 'application/json';
  blob.textContent = JSON.stringify(excludeList);
  document.body.appendChild(blob);

  window.eval(loadRealInjectorSource());

  // The IIFE runs init() on DOMContentLoaded (or immediately if loading is done).
  if (document.readyState === 'loading') {
    document.dispatchEvent(new window.Event('DOMContentLoaded'));
  }
}

describe('non-AI image exclusion (regression: "all images AI-generated" bug)', () => {
  it('marks all non-AI images as ai_generated: false in _data/image-provenance.yml', () => {
    const yml = fs.readFileSync(path.join(ROOT, '_data/image-provenance.yml'), 'utf8');
    const data = YAML.parse(yml);

    for (const imgPath of NON_AI_IMAGES) {
      const entry = data.images.find((item) => item.path === imgPath);
      expect(entry, `${imgPath} must be listed in image-provenance.yml`).toBeTruthy();
      expect(entry.ai_generated, `${imgPath} must be ai_generated: false`).toBe(false);
    }
  });

  it('emits every non-AI image path in the exclude-list blob (array shape)', () => {
    const excludeList = loadExcludeListFromData();
    // The template contract is an ARRAY (map: "path"). If this ever becomes
    // anything else, provenance-jsonld.html and the injector must be re-aligned.
    expect(Array.isArray(excludeList)).toBe(true);
    for (const imgPath of NON_AI_IMAGES) {
      expect(excludeList).toContain(imgPath);
    }
  });

  it('does not target non-AI images with RDFa injection (real injector, array-shaped exclude-list)', () => {
    const excludeList = loadExcludeListFromData();
    const html = `<!DOCTYPE html>
      <html prefix="schema: https://schema.org/ iptc: http://cv.iptc.org/newscodes/digitalsourcetype/">
      <body>
        <img src="/assets/images/dagfinn.webp" alt="Team">
        <img src="/assets/images/noexcuse-logo-horizontal.webp" alt="Logo">
        <img src="/assets/images/noexcuse-logo-azure.webp" alt="Logo">
        <img src="/assets/images/og-image.webp" alt="Og">
      </body>
    </html>`;
    const dom = createDOM(html);
    runRealInjector(dom, excludeList);

    const imgs = dom.document.querySelectorAll('img');
    expect(imgs.length).toBe(NON_AI_IMAGES.length);
    imgs.forEach((img) => {
      expect(img.hasAttribute('data-ai-provenance-processed'), `${img.getAttribute('src')} must be skipped`).toBe(false);
      expect(img.getAttribute('property')).toBeNull();
    });
  });

  it('still injects RDFa on AI-generated images with the real injector', () => {
    const excludeList = loadExcludeListFromData();
    const html = `<!DOCTYPE html>
      <html prefix="schema: https://schema.org/ iptc: http://cv.iptc.org/newscodes/digitalsourcetype/">
      <body>
        <img src="/assets/images/banners/banner-om-oss.webp" alt="Banner">
      </body>
    </html>`;
    const dom = createDOM(html);
    runRealInjector(dom, excludeList);

    const img = dom.document.querySelector('img');
    // Real injector sets property=license last (wins) + data-digital-source-type marker
    expect(img.getAttribute('data-ai-provenance-processed')).toBe('true');
    expect(img.getAttribute('data-digital-source-type')).toBe('http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia');
    expect(img.getAttribute('property')).toBe('schema:license');
  });
});