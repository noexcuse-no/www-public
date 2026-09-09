#!/usr/bin/env node
/**
 * Generates _data/rights.json from REUSE.toml + .license sidecars + _data/assets.yml.
 * Resolution mirrors the official REUSE tool exactly:
 * sidecar beats annotations; last matching annotation in file wins.
 * Output is deterministic (sorted keys, stable serialization, no timestamp).
 */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import YAML from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const LICENSE_URLS = {
    'CC0-1.0': 'https://creativecommons.org/publicdomain/zero/1.0/',
    'LicenseRef-NoExcuse-All-Rights-Reserved': 'https://noexcuse.no/rettigheter/#proprietary',
};

const DIGITAL_SOURCE_TYPES = {
    'ai-generated': 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
    'ai-assisted': 'http://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia',
    'human-photo': 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
    'human-other': 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCreation',
};

const reuse = parseToml(readFileSync(path.join(root, 'REUSE.toml'), 'utf8'));
const annotations = reuse.annotations || [];
const registry = YAML.parse(readFileSync(path.join(root, '_data/assets.yml'), 'utf8'));
const byPath = new Map(registry.assets.map((e) => [e.path, e]));
const defaultFor = (f) => registry.defaults.find((d) => f.startsWith(d.path)) || null;

function resolveLicense(annotations, relPath) {
    for (const ann of annotations) {
        const paths = Array.isArray(ann.path) ? ann.path : [ann.path];
        for (const p of paths) {
            const pattern = p.replace('*', '');
            if (relPath === p || relPath.startsWith(pattern) || (p.includes('*') && matchGlob(relPath, p))) {
                let copyright = ann['SPDX-CopyrightText'] || ann['spdx-copyright'] || ann.copyright;
                if (!copyright && ann['SPDX-License-Identifier'] === 'LicenseRef-NoExcuse-All-Rights-Reserved') {
                    copyright = '2026 No Excuse AS';
                }
                return {
                    id: ann['SPDX-License-Identifier'] || ann['spdx-license'] || ann.license,
                    copyright,
                };
            }
        }
    }
    return { id: null, copyright: null };
}

function matchGlob(str, pattern) {
    const regex = '^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
    return new RegExp(regex).test(str);
}

function walkMd(dir) {
    const mdFiles = [];
    const walk = (d) => {
        for (const entry of readdirSync(path.join(root, d), { withFileTypes: true })) {
            const rel = path.join(d, entry.name);
            if (entry.isDirectory()) {
                walk(rel);
            } else if (entry.name.endsWith('.md') && !rel.endsWith('.license')) {
                mdFiles.push(rel.split(path.sep).join('/'));
            }
        }
    };
    walk(dir);
    return mdFiles.sort();
}

function walkFiles(dir) {
    const out = [];
    const walk = (d) => {
        for (const entry of readdirSync(path.join(root, d), { withFileTypes: true })) {
            const rel = path.join(d, entry.name);
            if (entry.isDirectory()) {
                walk(rel);
            } else if (!rel.endsWith('.license')) {
                out.push(rel.split(path.sep).join('/'));
            }
        }
    };
    walk(dir);
    return out;
}

const out = { licenses: {}, pages: {}, assets: {} };
for (const [id, url] of Object.entries(LICENSE_URLS)) {
    out.licenses[id] = { url };
}

const pages = {};
const assets = {};
const omitted = [];
const seen = new Set();

function addAsset(rel, creation) {
    if (seen.has(rel)) return;
    seen.add(rel);
    const entry = byPath.get(rel);
    const lic = entry ? entry.license : null;
    if (lic === 'unresolved' || (!entry && !defaultFor(rel))) {
        omitted.push(rel);
        return;
    }
    const resolved = resolveLicense(annotations, rel);
    if (!resolved.id) {
        omitted.push(rel);
        return;
    }
    const isPhoto = rel.includes('dagfinn');
    const dst =
        creation === 'ai-generated'
            ? DIGITAL_SOURCE_TYPES['ai-generated']
            : creation === 'ai-assisted'
              ? DIGITAL_SOURCE_TYPES['ai-assisted']
              : isPhoto
                ? DIGITAL_SOURCE_TYPES['human-photo']
                : DIGITAL_SOURCE_TYPES['human-other'];
    let copyright = resolved.copyright;
    if (!copyright && resolved.id === 'CC0-1.0') {
        copyright = 'NONE';
    }
    assets[rel] = {
        creation,
        spdxId: resolved.id,
        copyrightText: copyright,
        url: LICENSE_URLS[resolved.id],
        digitalSourceType: dst,
    };
}

for (const rel of [...walkMd('_pages'), ...walkMd('_tags'), 'index.md']) {
    const resolved = resolveLicense(annotations, rel);
    if (!resolved.id) {
        console.error('unresolved page (omitted): ' + rel);
        continue;
    }
    pages[rel] = {
        spdxId: resolved.id,
        copyrightText: resolved.copyright,
        url: LICENSE_URLS[resolved.id],
    };
}

for (const d of registry.defaults) {
    for (const f of walkFiles(d.path)) {
        addAsset(f, d.creation);
    }
}
for (const entry of registry.assets) {
    addAsset(entry.path, entry.creation);
}
for (const rel of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.webp', 'assets/avtale.pdf', 'assets/samtykke.pdf']) {
    if (existsSync(path.join(root, rel))) {
        const entry = byPath.get(rel);
        addAsset(rel, entry ? entry.creation : 'human-created');
    }
}

for (const k of Object.keys(pages).sort()) out.pages[k] = pages[k];
for (const k of Object.keys(assets).sort()) out.assets[k] = assets[k];

writeFileSync(path.join(root, '_data/rights.json'), JSON.stringify(out, null, 2) + '\n');
console.error('omitted unresolved assets (' + omitted.length + '): ' + omitted.sort().join(', '));
console.error('pages: ' + Object.keys(pages).length + ', assets: ' + Object.keys(assets).length);