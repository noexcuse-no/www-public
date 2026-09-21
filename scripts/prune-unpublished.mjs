#!/usr/bin/env node
/**
 * prune-unpublished.mjs — controlled page rollout for the generated production site.
 *
 * Jekyll keeps pages with `published: false` out of _site/. Any link to such a page
 * that survives in a generated HTML file is a broken-link risk. This postprocessor
 * removes the safe semantic block containing such a link from the built _site/ HTML
 * so the deployed artifact never references unpublished pages.
 *
 * Authoring rule: a link to an unpublished internal page means the containing
 * semantic block is also not ready for publication.
 *
 * Safe pruning boundaries (priority order):
 *   1. the nearest [data-rollout-block] ancestor
 *   2. the nearest <li>
 *   3. the nearest <p>
 * Anything else fails production instead of guessing.
 *
 * Source files in _pages/ are only ever read — never rewritten.
 *
 * Pipeline:  jekyll build → prune-unpublished → validate-production-build → check-links
 *
 * Exit codes: 0 success · 1 unsafe generated dependency · 2 configuration/precondition error
 */

import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { Window } from 'happy-dom';

const SITE_DIR = '_site';
const PAGES_DIR = '_pages';
const CONFIG_FILE = '_config.yml';
const SOURCE_EXTENSIONS = new Set(['.md', '.markdown', '.html']);
const BLOCK_MARKER = '[data-rollout-block]';

/** Convert a path to forward-slash form for machine-readable output. */
function toPosix(p) {
    return p.split(sep).join('/');
}

/**
 * Normalize a pathname to a canonical destination.
 *
 * Rules:
 *   1. strip query strings and fragments
 *   2. ensure the pathname begins with "/"
 *   3. convert a trailing "/index.html" to "/"
 *   4. for extensionless paths other than "/", normalize to a trailing "/"
 *   5. preserve ordinary file paths such as "/assets/file.pdf"
 *
 * @param {string} pathname
 * @returns {string} canonical normalized pathname
 */
export function normalizePathname(pathname) {
    let p = String(pathname ?? '');
    let url = null;
    if (/^[a-z][a-z0-9+.-]*:/i.test(p)) {
        try {
            url = new URL(p);
            p = url.pathname;
        } catch {
            /* not a parseable absolute URL — fall through */
        }
    }
    [p] = p.split('?'); // strip query
    [p] = p.split('#'); // strip fragment
    if (p.endsWith('/index.html')) {
        p = p.slice(0, -'/index.html'.length);
    }
    if (!p.startsWith('/')) {
        p = '/' + p;
    }
    if (p.length > 1 && !p.endsWith('/')) {
        const lastSegment = p.slice(p.lastIndexOf('/') + 1);
        if (!lastSegment.includes('.')) {
            p = p + '/';
        }
    }
    return p === '' ? '/' : p;
}

/**
 * Deterministic front-matter parsing.
 *
 * A file counts as having YAML front matter only when it starts with the standard
 * Jekyll delimiter `---` and contains a matching closing `---` line. Malformed YAML
 * between the delimiters is reported via `error`.
 *
 * @param {string} source raw file content
 * @returns {{hasFrontMatter: boolean, frontMatter: object|null, error: string|null}}
 */
export function parseFrontMatter(source) {
    const newlineIndex = source.indexOf('\n');
    const firstLine = newlineIndex === -1 ? source : source.slice(0, newlineIndex);
    if (firstLine.trim() !== '---') {
        return { hasFrontMatter: false, frontMatter: null, error: null };
    }
    const body = newlineIndex === -1 ? '' : source.slice(newlineIndex + 1);
    const yamlLines = [];
    let closed = false;
    for (const line of body.split('\n')) {
        if (line.replace(/\r$/, '').trim() === '---') {
            closed = true;
            break;
        }
        yamlLines.push(line);
    }
    if (!closed) {
        return { hasFrontMatter: false, frontMatter: null, error: null };
    }
    try {
        const frontMatter = parseYaml(yamlLines.join('\n'));
        return { hasFrontMatter: true, frontMatter, error: null };
    } catch (err) {
        return { hasFrontMatter: true, frontMatter: null, error: err.message };
    }
}

/** Recursively list pages directory source files (.md/.markdown/.html). */
export function walkPages(pagesDir, fileList = []) {
    for (const entry of readdirSync(pagesDir, { withFileTypes: true })) {
        const full = join(pagesDir, entry.name);
        if (entry.isDirectory()) {
            walkPages(full, fileList);
        } else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
            fileList.push(full);
        }
    }
    return fileList;
}

/** Recursively list generated HTML files under _site/. */
export function walkHtmlFiles(siteDir, fileList = []) {
    for (const entry of readdirSync(siteDir, { withFileTypes: true })) {
        const full = join(siteDir, entry.name);
        if (entry.isDirectory()) {
            walkHtmlFiles(full, fileList);
        } else if (entry.name.toLowerCase().endsWith('.html')) {
            fileList.push(full);
        }
    }
    return fileList;
}

/**
 * Discover every _pages source file whose front matter explicitly says
 * `published: false` and map its normalized permalink to the source path.
 *
 * Published pages (`published: true`, missing `published`, or no front matter)
 * are not collected. An unpublished page without an explicit non-empty
 * `permalink`, or a file with malformed front matter, is reported as a
 * configuration error.
 *
 * @param {string} pagesDir absolute path to the _pages directory
 * @returns {{unpublished: Map<string,string>, errors: Array<{code:string, path:string}>}}
 */
export function collectUnpublishedPermalinks(pagesDir) {
    const unpublished = new Map();
    const errors = [];
    for (const file of walkPages(pagesDir)) {
        const relPath = toPosix(relative(pagesDir, file));
        const source = readFileSync(file, 'utf8');
        const { hasFrontMatter, frontMatter, error } = parseFrontMatter(source);
        if (error) {
            errors.push({ code: 'invalid-front-matter', path: relPath });
            continue;
        }
        if (!hasFrontMatter) {
            continue;
        }
        const fm = frontMatter && typeof frontMatter === 'object' ? frontMatter : {};
        if (fm.published === false) {
            const permalink = fm.permalink;
            if (typeof permalink !== 'string' || permalink.trim() === '') {
                errors.push({ code: 'missing-permalink', path: relPath });
                continue;
            }
            unpublished.set(normalizePathname(permalink.trim()), relPath);
        }
    }
    return { unpublished, errors };
}

/**
 * Read the canonical site origin from _config.yml.
 *
 * @param {string} configPath absolute path to _config.yml
 * @returns {URL|null} parsed absolute origin URL, or null when missing/invalid
 */
export function readSiteUrl(configPath) {
    let content;
    try {
        content = readFileSync(configPath, 'utf8');
    } catch {
        return null;
    }
    let config;
    try {
        config = parseYaml(content);
    } catch {
        return null;
    }
    const url = config && typeof config === 'object' ? config.url : undefined;
    if (typeof url !== 'string' || url.trim() === '') {
        return null;
    }
    try {
        const parsed = new URL(url.trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return null;
        }
        if (!parsed.hostname) {
            return null;
        }
        return parsed;
    } catch {
        return null;
    }
}

/**
 * Compute the canonical page URL represented by a generated _site/ HTML file
 * (e.g. _site/struktur/index.html → https://noexcuse.no/struktur/).
 * Relative links resolve against this URL.
 *
 * @param {string} siteDirAbs absolute _site directory
 * @param {string} fileAbs absolute generated HTML file path
 * @param {string} siteOrigin canonical origin, e.g. "https://noexcuse.no"
 * @returns {URL}
 */
export function generatedFileToPageUrl(siteDirAbs, fileAbs, siteOrigin) {
    const relPath = toPosix(relative(siteDirAbs, fileAbs));
    const base = siteOrigin.endsWith('/') ? siteOrigin : siteOrigin + '/';
    const url = new URL(relPath, base);
    if (url.pathname.endsWith('/index.html')) {
        url.pathname = url.pathname.slice(0, -'index.html'.length);
    }
    return url;
}

/**
 * Classify and resolve an <a href> destination.
 *
 * Eligible for rollout pruning: root-relative, relative, and same-origin
 * absolute internal links. Not eligible: empty hrefs, fragment-only links,
 * protocol-relative URLs, mailto:/tel:/data:/javascript: and other schemes,
 * and absolute URLs with a foreign origin.
 *
 * @param {string} href raw href attribute value
 * @param {URL|string} pageUrl URL of the generated page containing the link
 * @param {string} siteOrigin canonical origin, e.g. "https://noexcuse.no"
 * @returns {{kind: 'internal'|'external'|'skip', pathname?: string}}
 */
export function resolveHref(href, pageUrl, siteOrigin) {
    const raw = String(href ?? '').trim();
    if (!raw || raw.startsWith('#')) {
        return { kind: 'skip' };
    }
    if (raw.startsWith('//')) {
        return { kind: 'external' };
    }
    const schemeMatch = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.exec(raw);
    if (schemeMatch) {
        const scheme = schemeMatch[0].toLowerCase();
        if (scheme !== 'http:' && scheme !== 'https:') {
            return { kind: 'skip' };
        }
        try {
            const parsed = new URL(raw);
            if (parsed.origin !== new URL(siteOrigin).origin) {
                return { kind: 'external' };
            }
            return { kind: 'internal', pathname: parsed.pathname };
        } catch {
            return { kind: 'external' };
        }
    }
    try {
        const baseUrl = pageUrl instanceof URL ? pageUrl : new URL(pageUrl);
        if (raw.startsWith('/')) {
            return { kind: 'internal', pathname: new URL(raw, siteOrigin).pathname };
        }
        return { kind: 'internal', pathname: new URL(raw, baseUrl).pathname };
    } catch {
        return { kind: 'skip' };
    }
}

/**
 * Determine the exact safe pruning boundary for an unpublished link.
 *
 * Priority: [data-rollout-block] → <li> → <p>. Returns null when no safe
 * boundary exists (never an arbitrary parent).
 *
 * @param {import('happy-dom').HTMLElement} anchor the <a> element
 * @returns {{tag: string, node: import('happy-dom').HTMLElement}|null}
 */
export function determinePruneBoundary(anchor) {
    const rollout = anchor.closest(BLOCK_MARKER);
    if (rollout) {
        return { tag: rollout.nodeName.toLowerCase(), node: rollout };
    }
    const li = anchor.closest('li');
    if (li) {
        return { tag: 'li', node: li };
    }
    const p = anchor.closest('p');
    if (p) {
        return { tag: 'p', node: p };
    }
    return null;
}

/**
 * Remove now-empty <ul>/<ol> elements (zero remaining <li> descendants).
 * Headings and other siblings are never touched.
 *
 * @param {import('happy-dom').Document} doc
 */
export function cleanupEmptyLists(doc) {
    for (const list of Array.from(doc.querySelectorAll('ul, ol'))) {
        if (list.querySelectorAll('li').length === 0) {
            list.remove();
        }
    }
}

/**
 * Process a single generated HTML file: find links to unpublished pages and
 * remove their safe semantic block. Never guesses beyond the three safe
 * boundaries; an unprunable link is reported as unsafe.
 *
 * @param {string} html generated file content
 * @param {URL|string} pageUrl URL of the generated page
 * @param {string} siteOrigin canonical origin
 * @param {Set<string>} unpublishedPermalinks normalized unpublished permalinks
 * @returns {{html: string, changed: boolean, removed: Array<{tag: string, target: string}>, unsafe: Array<{target: string}>, blocksRemoved: number}}
 */
export function processHtml(html, pageUrl, siteOrigin, unpublishedPermalinks) {
    const pageUrlInstance = pageUrl instanceof URL ? pageUrl : new URL(pageUrl);
    const window = new Window({ url: pageUrlInstance.href });
    const doc = window.document;
    doc.write(html);
    doc.close();

    const removed = [];
    const unsafe = [];
    const removedNodes = new Set();
    let blocksRemoved = 0;

    for (const anchor of Array.from(doc.querySelectorAll('a[href]'))) {
        const resolved = resolveHref(anchor.getAttribute('href'), pageUrlInstance, siteOrigin);
        if (resolved.kind !== 'internal') {
            continue;
        }
        const target = normalizePathname(resolved.pathname);
        if (!unpublishedPermalinks.has(target)) {
            continue;
        }
        const boundary = determinePruneBoundary(anchor);
        if (!boundary) {
            unsafe.push({ target });
            continue;
        }
        if (removedNodes.has(boundary.node)) {
            // Block already removed by an earlier dependency link in the same block.
            removed.push({ tag: boundary.tag, target });
            continue;
        }
        boundary.node.remove();
        removedNodes.add(boundary.node);
        removed.push({ tag: boundary.tag, target });
        blocksRemoved += 1;
    }

    if (blocksRemoved > 0) {
        cleanupEmptyLists(doc);
    }

    const hasDoctype = /^\s*<!doctype html>/i.test(html);
    const serialized = (hasDoctype ? '<!DOCTYPE html>\n' : '') + doc.documentElement.outerHTML;
    const changed = serialized !== html;

    return {
        html: changed ? serialized : html,
        changed,
        removed,
        unsafe,
        blocksRemoved
    };
}

/**
 * Run the full transactional prune over a built _site/ directory.
 *
 * Order of operations:
 *   1. validate preconditions (site exists, config url valid, pages dir exists)
 *   2. collect unpublished permalinks (config errors fail closed)
 *   3. analyse every generated HTML file and collect all mutations
 *   4. detect every unsafe dependency
 *   5. if ANY unsafe/config error exists, do not write any file
 *   6. only then write changed HTML files
 *
 * No console output is produced here — lines are returned so main() (or tests)
 * decides how to surface them.
 *
 * @param {{cwd?: string, siteDir?: string, pagesDir?: string, configPath?: string}} options
 * @returns {{exitCode: number, stdout: string[], stderr: string[]}}
 */
export function runPrune(options = {}) {
    const cwd = options.cwd ?? process.cwd();
    const siteDir = options.siteDir ?? join(cwd, SITE_DIR);
    const pagesDir = options.pagesDir ?? join(cwd, PAGES_DIR);
    const configPath = options.configPath ?? join(cwd, CONFIG_FILE);
    const stdout = [];
    const stderr = [];

    if (!existsSync(siteDir) || !statSync(siteDir).isDirectory()) {
        stderr.push('✋ _site/ not found — build the site first.');
        return { exitCode: 2, stdout, stderr };
    }

    const siteUrl = readSiteUrl(configPath);
    if (!siteUrl) {
        stdout.push('rollout-config|_config.yml|missing-or-invalid-url');
        return { exitCode: 2, stdout, stderr };
    }
    const siteOrigin = siteUrl.origin;

    if (!existsSync(pagesDir) || !statSync(pagesDir).isDirectory()) {
        stdout.push('rollout-config|_pages|missing-directory');
        return { exitCode: 2, stdout, stderr };
    }

    const { unpublished, errors } = collectUnpublishedPermalinks(pagesDir);
    if (errors.length > 0) {
        for (const err of errors) {
            stdout.push(`rollout-config|_pages/${err.path}|${err.code}`);
        }
        return { exitCode: 2, stdout, stderr };
    }

    const permalinks = new Set(unpublished.keys());
    const plans = [];
    const allUnsafe = [];

    if (permalinks.size > 0) {
        for (const file of walkHtmlFiles(siteDir)) {
            const html = readFileSync(file, 'utf8');
            const pageUrl = generatedFileToPageUrl(siteDir, file, siteOrigin);
            const plan = processHtml(html, pageUrl, siteOrigin, permalinks);
            for (const u of plan.unsafe) {
                allUnsafe.push({ file, target: u.target });
            }
            plans.push({ file, ...plan });
        }
    }

    if (allUnsafe.length > 0) {
        for (const u of allUnsafe) {
            stdout.push(`rollout-unsafe|${toPosix(relative(siteDir, u.file))}|${u.target}`);
        }
        return { exitCode: 1, stdout, stderr };
    }

    let totalBlocks = 0;
    let totalDeps = 0;
    for (const plan of plans) {
        totalBlocks += plan.blocksRemoved;
        totalDeps += plan.removed.length;
        if (plan.changed) {
            writeFileSync(plan.file, plan.html);
        }
    }
    for (const plan of plans) {
        for (const r of plan.removed) {
            stdout.push(`rollout-pruned|${toPosix(relative(siteDir, plan.file))}|${r.tag}|${r.target}`);
        }
    }

    stdout.push(`✅ Rollout pruning complete — ${totalBlocks} block(s) removed for ${totalDeps} unpublished dependency link(s).`);
    return { exitCode: 0, stdout, stderr };
}

/** CLI orchestration and exit handling only. */
export function main() {
    const { exitCode, stdout, stderr } = runPrune({ cwd: process.cwd() });
    for (const line of stdout) {
        console.log(line);
    }
    for (const line of stderr) {
        console.error(line);
    }
    process.exit(exitCode);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main();
}