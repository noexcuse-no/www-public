import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve relative to this test file — robust to any cwd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const VALID_CREATION = ['editorial', 'human-created', 'ai-assisted', 'ai-generated', 'third-party', 'unresolved'];

function renderableSources() {
    const out = [];
    for (const f of readdirSync(path.join(root, '_pages'))) {
        if (f.endsWith('.md')) out.push(path.join('_pages', f));
    }
    for (const f of readdirSync(path.join(root, '_pages', 'go'))) {
        if (f.endsWith('.md')) out.push(path.join('_pages/go', f));
    }
    for (const f of readdirSync(path.join(root, '_tags'))) {
        if (f.endsWith('.md')) out.push(path.join('_tags', f));
    }
    out.push('index.md');
    return out;
}

function frontmatter(content) {
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    return m ? m[1] : '';
}

function creationOf(fm) {
    const m = fm.match(/^\s*creation:\s*(\S+)\s*$/m);
    return m ? m[1] : null;
}

describe('provenance frontmatter on renderable sources', () => {
    const sources = renderableSources();

    it('covers every renderable source (_pages incl. go/, _tags, index.md)', () => {
        // 48 _pages + 22 _tags + 1 index = 71 renderable sources
        expect(sources.length).toBe(71);
    });

    it('every source has a provenance block with editorial fields', () => {
        for (const rel of sources) {
            const content = readFileSync(path.join(root, rel), 'utf8');
            const fm = frontmatter(content);
            expect(fm.length, `${rel} missing YAML frontmatter`).toBeGreaterThan(0);
            expect(fm, `${rel} missing provenance block`).toMatch(/^provenance:\s*$/m);
            expect(fm, `${rel} missing editorial_review`).toMatch(/^ {2}editorial_review:\s*human\s*$/m);
            expect(fm, `${rel} missing editorial_responsibility`).toMatch(
                /^ {2}editorial_responsibility:\s*No Excuse AS\s*$/m
            );
        }
    });

    it('every creation value is a valid enum member', () => {
        for (const rel of sources) {
            const content = readFileSync(path.join(root, rel), 'utf8');
            const value = creationOf(frontmatter(content));
            expect(value, `${rel} missing creation value`).not.toBeNull();
            expect(VALID_CREATION, `${rel} invalid creation: ${value}`).toContain(value);
        }
    });
});
