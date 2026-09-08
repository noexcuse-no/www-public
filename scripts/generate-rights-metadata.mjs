// Generates _data/rights.json from REUSE.toml + .license sidecars + _data/assets.yml.
// Resolution mirrors the official REUSE tool exactly:
// sidecar beats annotations; last matching annotation in file wins.
// Output is deterministic (sorted keys, stable serialization, no timestamp).
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

function toRegExp(src) {
    let flags = '';
    if (src.startsWith('(?i)')) {
        src = src.slice(4);
        flags = 'i';
    }
    return new RegExp(src, flags);
}

export function loadConfig() {
    const rulesDoc = JSON.parse(readFileSync(path.join(root, 'scripts/sensitivity-rules.json'), 'utf8'));
    const allowDoc = JSON.parse(readFileSync(path.join(root, 'scripts/sensitivity-allowlist.json'), 'utf8'));
    const rules = rulesDoc.rules.map((r) => ({
        id: r.id,
        reason: r.reason,
        any: (r.any || []).map(toRegExp),
        all: (r.all || []).map(toRegExp),
        paths: (r.paths || []).map(toRegExp),
    });
    const allowlist = new Set((allowDoc.entries || []).map((e) => e.ruleId + '|' + e.path));
    return { rules, allowlist };
}
    let flags = '';
    if (src.startsWith('(?i)')) {
        src = src.slice(4);
        flags = 'i';
    }
    return new RegExp(src, flags);
}

export function loadConfig() {
    const rulesDoc = JSON.parse(readFileSync(path.join(root, 'scripts/sensitivity-rules.json'), 'utf8'));
    const allowDoc = JSON.parse(readFileSync(path.join(root, 'scripts/sensitivity-allowlist.json'), 'utf8'));
    const rules = rulesDoc.rules.map((r) => ({
        id: r.id,
        reason: r.reason,
        any: (r.any || []).map(toRegExp),
        all: (r.all || []).map(toRegExp),
        paths: (r.paths || []).map(toRegExp),
    });
    const allowlist = new Set((allowDoc.entries || []).map((e) => e.ruleId + '|' + e.path));
    return { rules, allowlist };
}
    return path.relative(ROOT, abs).split(path.sep).join('/');
}

function walkMd(dir) {
    const mdFiles = [];
    const walk = (d) => {
        for (const entry of readdirSync(path.join(root, d), { withFileTypes: true })) {
            const rel = path.join(d, entry.name);
            if (entry.isDirectory()) {
                walk(rel);
            } else if (!rel.endsWith('.license')) {
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

const reuse = parseToml(readFileSync(path.join(root, 'REUSE.toml'), 'utf8'));
const annotations = reuse.annotations || [];
const registry = YAML.parse(readFileSync(path.join(root, '_data/assets.yml'), 'utf8'));
const byPath = new Map(registry.assets.map((e) => [e.path, e]));
const defaultFor = (f) => registry.defaults.find((d) => f.startsWith(d.path)) || null;

const out = { licenses: {}, pages: {}, assets: {} };
for (const [id, url] of Object.entries(LICENSE_URLS)) {
    out.licenses[id] = { url };
}

// Pages: every renderable source (_pages incl. go/, _tags, index.md).
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

// Assets: defaults expanded + explicit entries.
const assets = {};
const omitted = [];
const seen = new Set();
const addAsset = (rel, creation) => {
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
    assets[rel] = {
        creation,
        spdxId: resolved.id,
        copyrightText: resolved.copyright,
        url: LICENSE_URLS[resolved.id],
        digitalSourceType: dst,
    };
};

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

for (const [id, url] of Object.entries(LICENSE_URLS)) {
    out.licenses[id] = { url };
}

for (const k of Object.keys(pages).sort()) out.pages[k] = pages[k];
for (const k of Object.keys(assets).sort()) out.assets[k] = assets[k];

writeFileSync(path.join(root, '_data/rights.json'), JSON.stringify(out, null, 2) + '\n');
console.error('omitted unresolved assets (' + omitted.length + '): ' + omitted.sort().join(', '));
console.error('pages: ' + Object.keys(pages).length + ', assets: ' + Object.keys(assets).length);
