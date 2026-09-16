#!/usr/bin/env node
/**
 * check-links.mjs — Validate internal links and anchors in the built site (_site/).
 *
 * Checks every href/src in generated HTML:
 *  - internal targets must resolve to an existing generated file
 *  - #anchors must exist in the target HTML (id= or name=)
 *  - external URLs (http/https/mailto/tel/data) are skipped
 *
 * Output on failure: `link-broken|<source>|<target>` lines (machine-readable).
 * Exit 1 if any broken link is found; exit 0 when clean; exit 2 when _site/ is missing.
 *
 * Run as part of npm run ci:local after jekyll build (dependsOn site-build).
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, relative, resolve, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE_DIR = '_site';
const RULE_ID = 'link-broken';

export function walkDir(dir, fileList = []) {
  for (const file of readdirSync(dir)) {
    const full = join(dir, file);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkDir(full, fileList);
    } else if (extname(file).toLowerCase() === '.html') {
      fileList.push(full);
    }
  }
  return fileList;
}

/** Extract href/src attributes from HTML. Returns [{ attr, raw }]. */
export function extractLinks(html) {
  const links = [];
  const re = /\b(href|src)\s*=\s*"([^"]*)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    links.push({ attr: m[1].toLowerCase(), raw: m[2].trim() });
  }
  return links;
}

/** True when the URL is site-internal (not fragment-only, external, or a URI scheme). */
export function isInternal(raw) {
  if (!raw || raw.startsWith('#')) return false;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return false; // mailto:, tel:, https:, data:, javascript:
  if (/^\/\//.test(raw)) return false; // protocol-relative
  return true;
}

/** Split "/a/b/#frag" into { path: '/a/b/', anchor: 'frag' } (query strings dropped). */
export function splitAnchor(raw) {
  const withoutQuery = raw.split('?')[0];
  const hashIndex = withoutQuery.indexOf('#');
  if (hashIndex === -1) return { path: withoutQuery, anchor: null };
  return { path: withoutQuery.slice(0, hashIndex), anchor: withoutQuery.slice(hashIndex + 1) };
}

/** Resolve a link's path against the source file; return an absolute filesystem path candidate or null. */
export function resolveTargetPath(rawPath, sourceAbsPath, siteDirAbs) {
  if (!rawPath) return null;
  let resolved;
  if (rawPath.startsWith('/')) {
    resolved = join(siteDirAbs, rawPath);
  } else {
    resolved = resolve(dirname(sourceAbsPath), rawPath);
  }
  // Guard against escaping the site root
  if (!resolved.startsWith(siteDirAbs + sep) && resolved !== siteDirAbs) return null;

  const candidates = [];
  if (rawPath.endsWith('/')) {
    candidates.push(join(resolved, 'index.html'));
  } else {
    candidates.push(resolved);
    candidates.push(resolved + '.html');
    candidates.push(join(resolved, 'index.html'));
  }
  return candidates.find((c) => existsSync(c)) ?? null;
}

/** True when the anchor exists in the target HTML (id= or name=, quote variants). */
export function hasAnchor(html, anchor) {
  if (!anchor) return true;
  const esc = anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(?:\\bid|\\bname)\\s*=\\s*["']${esc}["']`, 'i');
  return re.test(html);
}

/**
 * Run the full check over a built site directory.
 * Returns { checked, failures: [{ rule, source, target, reason }] }.
 */
export function runLinkCheck(siteDirAbs) {
  const files = walkDir(siteDirAbs);
  const failures = [];
  let checked = 0;

  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    for (const { raw } of extractLinks(html)) {
      if (!isInternal(raw)) continue;
      checked += 1;
      const { path: linkPath, anchor } = splitAnchor(raw);
      const target = resolveTargetPath(linkPath || '/', file, siteDirAbs);
      if (!target) {
        failures.push({ rule: RULE_ID, source: file, target: raw, reason: 'target not found' });
        continue;
      }
      if (anchor && extname(target).toLowerCase() === '.html') {
        if (!hasAnchor(readFileSync(target, 'utf8'), anchor)) {
          failures.push({ rule: RULE_ID, source: file, target: raw, reason: 'anchor not found' });
        }
      }
    }
  }
  return { checked, failures };
}

function main() {
  const siteDirAbs = resolve(process.cwd(), SITE_DIR);
  if (!existsSync(siteDirAbs)) {
    console.error(`✋ ${SITE_DIR}/ not found — build the site first (JEKYLL_ENV=production jekyll build).`);
    process.exit(2);
  }
  const { checked, failures } = runLinkCheck(siteDirAbs);
  for (const f of failures) {
    console.log(`${f.rule}|${relative(siteDirAbs, f.source)}|${f.target} (${f.reason})`);
  }
  if (failures.length > 0) {
    console.error(`🛑 ${failures.length} broken link(s) across ${checked} internal links checked.`);
    process.exit(1);
  }
  console.log(`✅ ${checked} internal links checked — all resolve.`);
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main();
}
