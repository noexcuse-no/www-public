import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve relative to this test file — robust to any cwd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const footer = readFileSync(path.join(root, '_includes/footer.html'), 'utf8');
const omOssPage = readFileSync(path.join(root, '_pages/om-oss.md'), 'utf8');

describe('Cross-links to /om-store-sprakmodeller/ (AI1 todo 12)', () => {
    it('footer contains link to /om-store-sprakmodeller/', () => {
        expect(footer).toContain('href="/om-store-sprakmodeller/"');
    });

    it('/om-oss/ page links to /om-store-sprakmodeller/ in the lead section', () => {
        expect(omOssPage).toContain('[Les mer om vår bruk av KI](/om-store-sprakmodeller/)');
    });

    it('/om-oss/ page does NOT claim LLMs are part of core work ("i arbeidet vårt")', () => {
        expect(omOssPage).not.toContain('i arbeidet vårt');
    });

    it('/om-oss/ page lead reflects the LIMITED-USE stance (støttende/pyntende roller)', () => {
        const lead = omOssPage.slice(0, omOssPage.indexOf('## Hvorfor No Excuse?'));
        expect(lead).toMatch(/kun i støttende og pyntende roller/);
        expect(lead).toMatch(/aldri til analyse eller anbefalinger/);
    });
});