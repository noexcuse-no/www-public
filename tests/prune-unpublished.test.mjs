import { describe, it, expect, afterAll } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import {
    normalizePathname,
    parseFrontMatter,
    collectUnpublishedPermalinks,
    generatedFileToPageUrl,
    resolveHref,
    processHtml,
    runPrune
} from '../scripts/prune-unpublished.mjs';

const SITE_ORIGIN = 'https://noexcuse.no';
const PAGE_URL = new URL('https://noexcuse.no/');
const UNPUBLISHED = new Set(['/metode/', '/mennesker/', '/a/', '/b/', '/ledelse-60-2/']);

const tempRoots = [];

function tempDir(prefix) {
    const dir = mkdtempSync(join(tmpdir(), prefix));
    tempRoots.push(dir);
    return dir;
}

function writeTree(root, tree) {
    for (const [rel, content] of Object.entries(tree)) {
        const p = join(root, rel);
        mkdirSync(dirname(p), { recursive: true });
        writeFileSync(p, content);
    }
}

afterAll(() => {
    for (const dir of tempRoots) {
        rmSync(dir, { recursive: true, force: true });
    }
});

describe('normalizePathname', () => {
    it('matches /metode and /metode/ as the same destination', () => {
        expect(normalizePathname('/metode')).toBe('/metode/');
        expect(normalizePathname('/metode/')).toBe('/metode/');
    });

    it('converts trailing /index.html to a directory path', () => {
        expect(normalizePathname('/metode/index.html')).toBe('/metode/');
    });

    it('strips fragments', () => {
        expect(normalizePathname('/metode/#foo')).toBe('/metode/');
    });

    it('strips query strings', () => {
        expect(normalizePathname('/metode/?x=1')).toBe('/metode/');
    });

    it('normalizes same-origin absolute URLs by pathname', () => {
        expect(normalizePathname('https://noexcuse.no/metode/')).toBe('/metode/');
    });

    it('preserves ordinary file paths', () => {
        expect(normalizePathname('/assets/file.pdf')).toBe('/assets/file.pdf');
        expect(normalizePathname('/404.html')).toBe('/404.html');
    });

    it('keeps the root as /', () => {
        expect(normalizePathname('/')).toBe('/');
        expect(normalizePathname('/index.html')).toBe('/');
    });

    it('ignores fragment-only input', () => {
        expect(normalizePathname('#section')).toBe('/');
    });
});

describe('parseFrontMatter', () => {
    it('parses standard Jekyll front matter', () => {
        const { hasFrontMatter, frontMatter, error } = parseFrontMatter(
            '---\ntitle: "x"\npermalink: /x/\npublished: false\n---\nbody'
        );
        expect(hasFrontMatter).toBe(true);
        expect(error).toBeNull();
        expect(frontMatter.published).toBe(false);
        expect(frontMatter.permalink).toBe('/x/');
    });

    it('returns no front matter when the file does not start with ---', () => {
        expect(parseFrontMatter('plain content').hasFrontMatter).toBe(false);
    });

    it('returns no front matter when the closing delimiter is missing', () => {
        expect(parseFrontMatter('---\ntitle: x\nno closing here').hasFrontMatter).toBe(false);
    });

    it('reports malformed YAML via error', () => {
        const { hasFrontMatter, error } = parseFrontMatter('---\npublished: [unclosed\n---');
        expect(hasFrontMatter).toBe(true);
        expect(error).toBeTruthy();
    });
});

describe('collectUnpublishedPermalinks', () => {
    it('collects pages with published: false and an explicit permalink', () => {
        const pages = tempDir('prune-pages-');
        writeTree(pages, {
            'a.md': '---\npermalink: /a/\npublished: false\n---\n',
            'b.md': '---\npermalink: /b/\npublished: true\n---\n',
            'c.md': '---\npermalink: /c/\n---\n',
            'go/d.md': '---\npermalink: /d/\npublished: false\n---\n',
            'e.markdown': '---\npermalink: /e/\npublished: false\n---\n',
            'f.html': '---\npermalink: /f/\npublished: false\n---\n<p>x</p>'
        });
        const { unpublished, errors } = collectUnpublishedPermalinks(pages);
        expect(errors).toEqual([]);
        expect(unpublished.get('/a/')).toBe('a.md');
        expect(unpublished.has('/b/')).toBe(false);
        expect(unpublished.has('/c/')).toBe(false);
        expect(unpublished.get('/d/')).toBe('go/d.md');
        expect(unpublished.has('/e/')).toBe(true);
        expect(unpublished.has('/f/')).toBe(true);
    });

    it('fails when published: false has no explicit permalink', () => {
        const pages = tempDir('prune-pages-');
        writeTree(pages, {
            'g.md': '---\npermalink: /g/\npublished: false\n---\nunused',
            'h.md': '---\npublished: false\n---\n'
        });
        const { unpublished, errors } = collectUnpublishedPermalinks(pages);
        expect(unpublished.has('/g/')).toBe(true);
        expect(errors).toHaveLength(1);
        expect(errors[0].code).toBe('missing-permalink');
        expect(errors[0].path).toBe('h.md');
    });

    it('fails on malformed YAML', () => {
        const pages = tempDir('prune-pages-');
        writeTree(pages, {
            'broken.md': '---\npublished: [unclosed\n---\n'
        });
        const { unpublished, errors } = collectUnpublishedPermalinks(pages);
        expect(unpublished.size).toBe(0);
        expect(errors).toHaveLength(1);
        expect(errors[0].code).toBe('invalid-front-matter');
    });
});

describe('generatedFileToPageUrl', () => {
    it('maps root index.html to the site root', () => {
        const site = tempDir('prune-site-');
        expect(generatedFileToPageUrl(site, join(site, 'index.html'), SITE_ORIGIN).pathname).toBe('/');
    });

    it('maps a pretty-url directory to its directory URL', () => {
        const site = tempDir('prune-site-');
        expect(generatedFileToPageUrl(site, join(site, 'struktur', 'index.html'), SITE_ORIGIN).pathname).toBe('/struktur/');
    });

    it('maps a file page to its own file URL', () => {
        const site = tempDir('prune-site-');
        expect(generatedFileToPageUrl(site, join(site, '404.html'), SITE_ORIGIN).pathname).toBe('/404.html');
    });
});

describe('resolveHref', () => {
    it('treats same-origin absolute URLs as internal and matches', () => {
        const r = resolveHref('https://noexcuse.no/metode/', PAGE_URL, SITE_ORIGIN);
        expect(r.kind).toBe('internal');
        expect(normalizePathname(r.pathname)).toBe('/metode/');
    });

    it('ignores external absolute URLs', () => {
        const r = resolveHref('https://example.com/metode/', PAGE_URL, SITE_ORIGIN);
        expect(r.kind).toBe('external');
    });

    it('resolves relative links against the generated page URL', () => {
        const pageUrl = new URL('https://noexcuse.no/perspektiv/');
        const r = resolveHref('../metode/', pageUrl, SITE_ORIGIN);
        expect(r.kind).toBe('internal');
        expect(normalizePathname(r.pathname)).toBe('/metode/');
    });

    it('resolves root-relative links', () => {
        const r = resolveHref('/metode/', PAGE_URL, SITE_ORIGIN);
        expect(r.kind).toBe('internal');
        expect(normalizePathname(r.pathname)).toBe('/metode/');
    });

    it('ignores fragment-only hrefs', () => {
        expect(resolveHref('#section', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
    });

    it('ignores mailto/tel/data/javascript schemes', () => {
        expect(resolveHref('mailto:a@b.c', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
        expect(resolveHref('tel:+4712345678', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
        expect(resolveHref('data:text/plain,x', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
        expect(resolveHref('javascript:alert(1)', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
    });

    it('ignores protocol-relative URLs', () => {
        expect(resolveHref('//cdn.example.no/x.js', PAGE_URL, SITE_ORIGIN).kind).toBe('external');
    });

    it('ignores empty hrefs', () => {
        expect(resolveHref('', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
        expect(resolveHref('   ', PAGE_URL, SITE_ORIGIN).kind).toBe('skip');
    });
});

const DOC = '<!DOCTYPE html>\n<html lang="no"><head><title>T</title></head><body><main>%BODY%</main></body></html>';

function runHtml(body) {
    return processHtml(DOC.replace('%BODY%', body), PAGE_URL, SITE_ORIGIN, UNPUBLISHED);
}

describe('processHtml — pruning boundaries', () => {
    it('removes the complete <p> containing an unpublished link', () => {
        const { html, changed, removed, unsafe, blocksRemoved } = runHtml(
            '<p>Se også <a href="/metode/">metoden vår</a> for flere detaljer.</p><p>Behold meg.</p>'
        );
        expect(changed).toBe(true);
        expect(unsafe).toEqual([]);
        expect(blocksRemoved).toBe(1);
        expect(removed).toEqual([{ tag: 'p', target: '/metode/' }]);
        expect(html).not.toContain('Se også');
        expect(html).not.toContain('/metode/');
        expect(html).toContain('Behold meg.');
    });

    it('removes the complete <li> containing an unpublished link', () => {
        const { html, removed, blocksRemoved } = runHtml(
            '<ul><li><a href="/metode/">M</a> — beskrivelse</li><li><a href="/struktur/">S</a></li></ul>'
        );
        expect(blocksRemoved).toBe(1);
        expect(removed[0].tag).toBe('li');
        expect(html).not.toContain('M</a>');
        expect(html).toContain('<li><a href="/struktur/">S</a></li>');
    });

    it('removes <li> not merely its nested <p>', () => {
        const { html, removed } = runHtml('<ul><li><p><a href="/metode/">M</a></p></li></ul>');
        expect(removed[0].tag).toBe('li');
        expect(html).not.toContain('<li>');
        expect(html).not.toContain('<p><a href="/metode/">');
    });

    it('removes the explicit [data-rollout-block] ancestor', () => {
        const { html, removed, blocksRemoved } = runHtml(
            '<div class="card" data-rollout-block><h3>Metodikk</h3><p>…</p><a href="/metode/">Les mer</a></div>'
        );
        expect(blocksRemoved).toBe(1);
        expect(removed[0].tag).toBe('div');
        expect(html).not.toContain('data-rollout-block');
        expect(html).not.toContain('Metodikk');
    });

    it('lets [data-rollout-block] take precedence over nested <li> and <p>', () => {
        const html0 = '<ul data-rollout-block><li><p><a href="/metode/">M</a></p></li></ul>';
        const { html, removed, blocksRemoved } = runHtml(html0);
        expect(blocksRemoved).toBe(1);
        expect(removed[0].tag).toBe('ul');
        expect(html).not.toContain('<li>');
        expect(html).not.toContain('<p>');
    });

    it('leaves ordinary published/internal links untouched', () => {
        const { changed, removed, unsafe } = runHtml('<p><a href="/struktur/">S</a></p>');
        expect(changed).toBe(false);
        expect(removed).toEqual([]);
        expect(unsafe).toEqual([]);
    });

    it('leaves external links untouched', () => {
        const { changed } = runHtml('<p><a href="https://example.com/metode/">x</a></p>');
        expect(changed).toBe(false);
    });

    it('removes a paragraph containing both text and an unpublished link completely', () => {
        const { html, blocksRemoved } = runHtml(
            '<p>Viktig tekst og <a href="/metode/">lenke</a> og mer tekst.</p><p>Annen paragraf</p>'
        );
        expect(blocksRemoved).toBe(1);
        expect(html).not.toContain('Viktig tekst');
        expect(html).toContain('Annen paragraf');
    });

    it('removes one block with two unpublished links but reports two dependencies', () => {
        const { html, removed, blocksRemoved } = runHtml('<p>Se <a href="/a/">A</a> og <a href="/b/">B</a>.</p>');
        expect(blocksRemoved).toBe(1);
        expect(removed).toHaveLength(2);
        expect(removed.map((r) => `${r.tag}|${r.target}`)).toEqual(['p|/a/', 'p|/b/']);
        expect(html).not.toContain('/a/');
        expect(html).not.toContain('/b/');
    });

    it('removes an empty <ul> caused by pruning its final <li>', () => {
        const { html } = runHtml('<ul><li><a href="/metode/">M</a></li></ul>');
        expect(html).not.toContain('<ul>');
        expect(html).not.toContain('<li>');
    });

    it('removes an empty <ol> caused by pruning its final <li>', () => {
        const { html } = runHtml('<ol><li><a href="/metode/">M</a></li></ol>');
        expect(html).not.toContain('<ol>');
        expect(html).not.toContain('<li>');
    });

    it('keeps a <ul> when other <li> items remain', () => {
        const { html } = runHtml('<ul><li><a href="/metode/">M</a></li><li><a href="/struktur/">S</a></li></ul>');
        expect(html).toContain('<ul>');
        expect(html).toContain('<li><a href="/struktur/">S</a></li>');
    });
});

describe('processHtml — unsafe and serialization behavior', () => {
    it('reports an unsafe error for an unpublished link inside <h2>', () => {
        const { changed, unsafe, removed } = runHtml('<h2><a href="/metode/">Metodikk</a></h2>');
        expect(changed).toBe(false);
        expect(removed).toEqual([]);
        expect(unsafe).toEqual([{ target: '/metode/' }]);
    });

    it('reports an unsafe error for an unpublished link inside an unmarked generic <div>', () => {
        const { changed, unsafe } = runHtml('<div><a href="/metode/">Metodikk</a></div>');
        expect(changed).toBe(false);
        expect(unsafe).toEqual([{ target: '/metode/' }]);
    });

    it('reports all unsafe links in one file', () => {
        const { unsafe } = runHtml('<h2><a href="/metode/">M</a></h2><h3><a href="/a/">A</a></h3>');
        expect(unsafe).toEqual([{ target: '/metode/' }, { target: '/a/' }]);
    });

    it('does not rewrite unchanged files', () => {
        const { changed, html } = runHtml('<p><a href="/struktur/">S</a></p>');
        expect(changed).toBe(false);
        expect(html).toContain('/struktur/');
    });

    it('preserves the doctype when serializing changed HTML', () => {
        const { html, changed } = runHtml('<p><a href="/metode/">M</a></p>');
        expect(changed).toBe(true);
        expect(html.startsWith('<!DOCTYPE html>')).toBe(true);
    });

    it('does not add a doctype when the source had none', () => {
        const { html } = processHtml(
            '<html><body><p><a href="/metode/">M</a></p></body></html>',
            PAGE_URL,
            SITE_ORIGIN,
            UNPUBLISHED
        );
        expect(html.startsWith('<!DOCTYPE html>')).toBe(false);
    });
});

describe('runPrune — end-to-end filesystem behavior', () => {
    it('rewrites a generated file containing a valid removable dependency', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/metode.md': '---\npermalink: /metode/\npublished: false\n---\n',
            '_site/index.html':
                '<!DOCTYPE html>\n<html><body><p>Ledelse 60:2 bygger på denne modellen.</p><p><a href="/metode/">Les mer</a></p></body></html>'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(0);
        expect(result.stderr).toEqual([]);
        expect(result.stdout).toContain('rollout-pruned|index.html|p|/metode/');
        expect(result.stdout).toContain('✅ Rollout pruning complete — 1 block(s) removed for 1 unpublished dependency link(s).');
        const written = readFileSync(join(root, '_site', 'index.html'), 'utf8');
        expect(written).not.toContain('/metode/');
        expect(written).toContain('Ledelse 60:2 bygger på denne modellen.');
        // Source Markdown is never mutated.
        expect(readFileSync(join(root, '_pages', 'metode.md'), 'utf8')).toContain('published: false');
    });

    it('exits 2 with the site-first message when _site/ is missing', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/metode.md': '---\npermalink: /metode/\npublished: false\n---\n'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(2);
        expect(result.stderr.join(' ')).toContain('_site/ not found');
    });

    it('leaves BOTH files untouched when one file has an unsafe dependency', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/metode.md': '---\npermalink: /metode/\npublished: false\n---\n',
            '_site/safe/index.html': '<!DOCTYPE html>\n<html><body><p><a href="/metode/">M</a></p></body></html>',
            '_site/unsafe/index.html': '<!DOCTYPE html>\n<html><body><h2><a href="/metode/">M</a></h2></body></html>'
        });
        const safeBefore = readFileSync(join(root, '_site', 'safe', 'index.html'), 'utf8');
        const unsafeBefore = readFileSync(join(root, '_site', 'unsafe', 'index.html'), 'utf8');
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(1);
        expect(result.stdout).toContain('rollout-unsafe|unsafe/index.html|/metode/');
        expect(result.stdout).not.toContain('rollout-pruned');
        expect(readFileSync(join(root, '_site', 'safe', 'index.html'), 'utf8')).toBe(safeBefore);
        expect(readFileSync(join(root, '_site', 'unsafe', 'index.html'), 'utf8')).toBe(unsafeBefore);
    });

    it('fails with exit 2 when an unpublished page lacks a permalink', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/g.md': '---\npublished: false\n---\n',
            '_site/index.html': '<!DOCTYPE html>\n<html><body><p>hei</p></body></html>'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(2);
        expect(result.stdout).toContain('rollout-config|_pages/g.md|missing-permalink');
    });

    it('succeeds with zero work when there are no unpublished pages', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/ok.md': '---\npermalink: /ok/\n---\n',
            '_site/index.html': '<!DOCTYPE html>\n<html><body><p><a href="/ok/">OK</a></p></body></html>'
        });
        const mtimeBefore = statSync(join(root, '_site', 'index.html')).mtimeMs;
const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(0);
        expect(result.stdout.join('\n')).toContain('0 block(s) removed for 0 unpublished dependency link(s).');
        expect(result.stdout).not.toContain('rollout-pruned');
        expect(statSync(join(root, '_site', 'index.html')).mtimeMs).toBe(mtimeBefore);
    });

    it('succeeds with zero work when no generated file links to an unpublished page', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/metode.md': '---\npermalink: /metode/\npublished: false\n---\n',
            '_site/index.html': '<!DOCTYPE html>\n<html><body><p><a href="/struktur/">S</a></p></body></html>'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(0);
        expect(result.stdout.join('\n')).toContain('0 block(s) removed for 0 unpublished dependency link(s).');
    });

    it('fails with exit 2 when _config.yml has no valid absolute url', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "relative/path"\n',
            '_pages/metode.md': '---\npermalink: /metode/\npublished: false\n---\n',
            '_site/index.html': '<!DOCTYPE html>\n<html><body></body></html>'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(2);
        expect(result.stdout).toContain('rollout-config|_config.yml|missing-or-invalid-url');
    });

    it('removes an empty <ul> and reports each dependency in a multi-link list', () => {
        const root = tempDir('prune-e2e-');
        writeTree(root, {
            '_config.yml': 'url: "https://noexcuse.no"\n',
            '_pages/a.md': '---\npermalink: /a/\npublished: false\n---\n',
            '_pages/b.md': '---\npermalink: /b/\npublished: false\n---\n',
            '_site/list/index.html':
                '<!DOCTYPE html>\n<html><body><ul><li><a href="/a/">A</a></li><li><a href="/b/">B</a> — beskrivelse</li></ul></body></html>'
        });
        const result = runPrune({ cwd: root });
        expect(result.exitCode).toBe(0);
        expect(result.stdout.filter((l) => l.startsWith('rollout-pruned'))).toEqual([
            'rollout-pruned|list/index.html|li|/a/',
            'rollout-pruned|list/index.html|li|/b/'
        ]);
        const written = readFileSync(join(root, '_site', 'list', 'index.html'), 'utf8');
        expect(written).not.toContain('<ul>');
        expect(written).not.toContain('<li>');
    });
});