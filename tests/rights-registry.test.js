import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';
import YAML from 'yaml';

// Resolve relative to this test file — robust to any cwd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const VALID_CREATION = ['human-created', 'ai-assisted', 'ai-generated', 'third-party', 'unresolved'];
const EXPECTED_DEFAULTS = ['assets/images/banners/', 'assets/images/icons/'];

function matchGlob(str, pattern) {
    const regex = '^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
    return new RegExp(regex).test(str);
}

function matches(pattern, file) {
    const p = pattern.replace('*', '');
    return file === pattern || file.startsWith(p) || (pattern.includes('*') && matchGlob(file, pattern));
}

// Resolve the REUSE license for a file: sidecar beats annotations,
// last matching annotation wins (REUSE Spec 3.3).
function resolveLicense(annotations, file) {
    const sidecar = path.join(root, file + '.license');
    if (existsSync(sidecar)) {
        const text = readFileSync(sidecar, 'utf8');
        const idKey = 'SPDX-License-' + 'Identifier:';
        const crKey = 'SPDX-File' + 'CopyrightText:';
        const id = (text.match(new RegExp('^' + idKey + '\\s*(\\S+)\\s*$', 'm')) || [])[1];
        const cr = (text.match(new RegExp('^' + crKey + '\\s*(.+?)\\s*$', 'm')) || [])[1];
        return { id: id || null, copyright: cr || null, via: 'sidecar' };
    }
    let hit = null;
    let hitPattern = null;
    for (const table of annotations) {
        const paths = Array.isArray(table.path) ? table.path : [table.path];
        for (const p of paths) {
            const pattern = p.replace('*', '');
            if (file === p || file.startsWith(pattern) || (p.includes('*') && matchGlob(file, p))) {
                hit = table;
                hitPattern = p;
            }
        }
    }
    if (!hit) return { id: null, copyright: null, via: null, pattern: null };
    return {
        id: hit['SPDX-License-Identifier'] || null,
        copyright: hit['SPDX-FileCopyrightText'] || null,
        via: 'toml',
        pattern: hitPattern,
    };
}

function walkAssets() {
    const out = [];
    const walk = (dir) => {
        for (const entry of readdirSync(path.join(root, dir), { withFileTypes: true })) {
            const rel = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(rel);
            } else if (!rel.endsWith('.license')) {
                out.push(rel.split(path.sep).join('/'));
            }
        }
    };
    walk('assets/images');
    for (const f of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.webp']) {
        if (existsSync(path.join(root, f))) out.push(f);
    }
    for (const f of ['assets/avtale.pdf', 'assets/samtykke.pdf']) {
        if (existsSync(path.join(root, f))) out.push(f);
    }
    walk('.design/graphics/originals');
    return out.sort();
}

const registry = YAML.parse(readFileSync(path.join(root, '_data/assets.yml'), 'utf8'));
const reuse = parseToml(readFileSync(path.join(root, 'REUSE.toml'), 'utf8'));
const annotations = reuse.annotations || [];

describe('asset provenance registry (_data/assets.yml)', () => {
    it('parses and carries exactly the two dir defaults', () => {
        expect(Array.isArray(registry.defaults)).toBe(true);
        expect(registry.defaults.map((d) => d.path).sort()).toEqual([...EXPECTED_DEFAULTS].sort());
        for (const d of registry.defaults) {
            expect(VALID_CREATION, `invalid creation for default ${d.path}`).toContain(d.creation);
        }
    });

    it('every entry has a valid enum, an existing path, and a license', () => {
        expect(registry.assets.length).toBeGreaterThan(0);
        for (const entry of registry.assets) {
            expect(VALID_CREATION, `invalid creation for ${entry.path}`).toContain(entry.creation);
            expect(entry.license, `${entry.path} missing license`).toBeTruthy();
            expect(existsSync(path.join(root, entry.path)), `${entry.path} missing on disk`).toBe(true);
        }
    });

    it('every non-default asset on disk is covered by an explicit entry', () => {
        const covered = new Set(registry.assets.map((e) => e.path));
        const underDefault = (f) => EXPECTED_DEFAULTS.some((d) => f.startsWith(d));
        const missing = walkAssets().filter((f) => !underDefault(f) && !covered.has(f));
        expect(missing, `uncovered assets: ${missing.join(', ')}`).toEqual([]);
    });

    it('registry license matches the resolved REUSE annotation per asset', () => {
        for (const entry of registry.assets) {
            if (entry.license === 'unresolved') {
                const resolved = resolveLicense(annotations, entry.path);
                if (resolved.via === 'toml') {
                    // Blanket-covered-but-reported exception (see spec Unresolved files):
                    // no exact entry, no sidecar — we never deliberately annotated it.
                    expect(
                        resolved.pattern.endsWith('/**'),
                        `${entry.path} must only match a blanket`
                    ).toBe(true);
                    expect(
                        existsSync(path.join(root, entry.path + '.license')),
                        `${entry.path} must have no sidecar`
                    ).toBe(false);
                } else {
                    expect(resolved.id, `${entry.path} should be unannotated`).toBeNull();
                }
                continue;
            }
            const resolved = resolveLicense(annotations, entry.path);
            expect(resolved.id, `${entry.path} REUSE mismatch`).toBe(entry.license);
        }
    });

    it('one-directional safety: human-created assets are never CC0-covered', () => {
        for (const entry of registry.assets) {
            if (entry.creation === 'human-created' || entry.creation === 'ai-assisted') {
                const resolved = resolveLicense(annotations, entry.path);
                expect(resolved.id, `${entry.path} must be LicenseRef`).toBe(
                    'LicenseRef-NoExcuse-All-Rights-Reserved'
                );
            }
        }
    });

    it('exact-path entries appear after every blanket that could match them', () => {
        const order = [];
        annotations.forEach((table, i) => {
            const paths = Array.isArray(table.path) ? table.path : [table.path];
            for (const p of paths) order.push({ pattern: p, index: i, blanket: p.endsWith('/**') });
        });
        for (const entry of order.filter((e) => !e.blanket)) {
            for (const blanket of order.filter((e) => e.blanket && matches(e.pattern, entry.pattern))) {
                expect(entry.index, `${entry.pattern} must come after blanket ${blanket.pattern}`).toBeGreaterThan(
                    blanket.index
                );
            }
        }
    });

    it('frontmatter creation is consistent with the REUSE license per page', () => {
        const pages = [];
        for (const f of readdirSync(path.join(root, '_pages'))) {
            if (f.endsWith('.md')) pages.push(path.join('_pages', f));
        }
        for (const f of readdirSync(path.join(root, '_pages', 'go'))) {
            if (f.endsWith('.md')) pages.push(path.join('_pages/go', f));
        }
        for (const f of readdirSync(path.join(root, '_tags'))) {
            if (f.endsWith('.md')) pages.push(path.join('_tags', f));
        }
        pages.push('index.md');
        for (const rel of pages) {
            const content = readFileSync(path.join(root, rel), 'utf8');
            const fm = (content.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
            const creation = (fm.match(/^\s*creation:\s*(\S+)\s*$/m) || [])[1];
            expect(creation, `${rel} missing creation`).toBeTruthy();
            const resolved = resolveLicense(annotations, rel);
            if (creation === 'human-created' || creation === 'ai-assisted') {
                expect(resolved.id, `${rel} must be LicenseRef`).toBe('LicenseRef-NoExcuse-All-Rights-Reserved');
            } else if (creation === 'ai-generated') {
                expect(resolved.id, `${rel} must be CC0-1.0`).toBe('CC0-1.0');
            } else if (creation === 'unresolved') {
                if (resolved.via === 'toml') {
                    expect(
                        resolved.pattern.endsWith('/**'),
                        `${rel} must only match a blanket`
                    ).toBe(true);
                    expect(
                        existsSync(path.join(root, rel + '.license')),
                        `${rel} must have no sidecar`
                    ).toBe(false);
                } else {
                    expect(resolved.id, `${rel} should be unannotated`).toBeNull();
                }
            }
        }
    });
});
