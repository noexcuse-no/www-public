import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { extractLinks, isInternal, splitAnchor, resolveTargetPath, hasAnchor, runLinkCheck } from '../scripts/check-links.mjs';

let site;

beforeEach(() => {
  site = mkdtempSync(join(tmpdir(), 'linkcheck-'));
  mkdirSync(join(site, 'about'), { recursive: true });
  mkdirSync(join(site, 'assets'), { recursive: true });
  writeFileSync(
    join(site, 'index.html'),
    [
      '<a href="/about/">About</a>',
      '<a href="/about/#team">Team anchor</a>',
      '<a href="/about/#missing">Missing anchor</a>',
      '<a href="/missing-page/">Broken</a>',
      '<a href="https://external.example.com/">External</a>',
      '<a href="mailto:ledelse@noexcuse.no">Mail</a>',
      '<a href="#local-section">Fragment only</a>',
      '<img src="/assets/pic.webp" alt="x">',
      '<img src="/assets/gone.webp" alt="x">',
    ].join('\n'),
  );
  writeFileSync(join(site, 'about', 'index.html'), '<h1>About</h1><p id="team">Team</p></body>');
  writeFileSync(join(site, 'assets', 'pic.webp'), 'x');
});

afterAll(() => {
  rmSync(site, { recursive: true, force: true });
});

describe('extractLinks', () => {
  it('extracts href and src attributes', () => {
    const links = extractLinks('<a href="/a/">x</a><img src="/b.png">');
    expect(links).toEqual([
      { attr: 'href', raw: '/a/' },
      { attr: 'src', raw: '/b.png' },
    ]);
  });
});

describe('isInternal', () => {
  it('accepts root-relative and relative paths', () => {
    expect(isInternal('/about/')).toBe(true);
    expect(isInternal('sub/page.html')).toBe(true);
    expect(isInternal('../up/')).toBe(true);
  });

  it('rejects fragments, external URLs and URI schemes', () => {
    expect(isInternal('#anchor')).toBe(false);
    expect(isInternal('https://example.com/')).toBe(false);
    expect(isInternal('//cdn.example.com/x.js')).toBe(false);
    expect(isInternal('mailto:a@b.c')).toBe(false);
    expect(isInternal('')).toBe(false);
  });
});

describe('splitAnchor', () => {
  it('splits path and anchor, drops query', () => {
    expect(splitAnchor('/a/b/#frag')).toEqual({ path: '/a/b/', anchor: 'frag' });
    expect(splitAnchor('/a/b/?utm=x')).toEqual({ path: '/a/b/', anchor: null });
    expect(splitAnchor('/a/')).toEqual({ path: '/a/', anchor: null });
  });
});

describe('resolveTargetPath', () => {
  it('resolves pretty URL directories to index.html', () => {
    const source = join(site, 'index.html');
    expect(resolveTargetPath('/about/', source, site)).toBe(join(site, 'about', 'index.html'));
  });

  it('resolves extensionless paths via .html and /index.html candidates', () => {
    const source = join(site, 'index.html');
    expect(resolveTargetPath('/about', source, site)).toBe(join(site, 'about', 'index.html'));
  });

  it('returns null for missing targets', () => {
    expect(resolveTargetPath('/missing/', join(site, 'index.html'), site)).toBeNull();
  });

  it('returns null when escaping the site root', () => {
    expect(resolveTargetPath('../../../../etc/passwd', join(site, 'index.html'), site)).toBeNull();
  });
});

describe('hasAnchor', () => {
  it('matches id and name attributes', () => {
    expect(hasAnchor('<p id="team">x</p>', 'team')).toBe(true);
    expect(hasAnchor('<a name="team">x</a>', 'team')).toBe(true);
    expect(hasAnchor('<p id="other">x</p>', 'team')).toBe(false);
  });
});

describe('runLinkCheck', () => {
  it('passes valid links, external links and mailto; fails broken paths and anchors', () => {
    const { checked, failures } = runLinkCheck(site);
    const targets = failures.map((f) => f.target);

    expect(targets).toContain('/about/#missing');
    expect(targets).toContain('/missing-page/');
    expect(targets).toContain('/assets/gone.webp');

    expect(targets).not.toContain('/about/');
    expect(targets).not.toContain('/about/#team');
    expect(targets).not.toContain('https://external.example.com/');
    expect(targets).not.toContain('mailto:ledelse@noexcuse.no');
    expect(targets).not.toContain('#local-section');

    expect(failures.every((f) => f.rule === 'link-broken')).toBe(true);
    expect(failures.every((f) => f.source.startsWith(site))).toBe(true);
    expect(checked).toBeGreaterThan(0);
  });
});
