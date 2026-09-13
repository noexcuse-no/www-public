import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve relative to this test file — robust to any cwd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, '_config.yml');
const pagesDir = path.join(root, '_pages');

const config = readFileSync(configPath, 'utf8');

function readPages() {
    return readdirSync(pagesDir)
        .filter((f) => f.endsWith('.md'))
        .map((f) => ({ file: f, content: readFileSync(path.join(pagesDir, f), 'utf8') }));
}

const pages = readPages();

describe('Jekyll config structure (A5 native pages conversion)', () => {
    describe('_config.yml', () => {
        it('should NOT define a `pages` collection (shadowing site.pages)', () => {
            expect(config).not.toMatch(/^ {2}pages:\s*$/m);
        });

        it('should still define the `tags` collection', () => {
            expect(config).toMatch(/^ {2}tags:\s*$/m);
        });

        it('should load `_pages` via the `include` key', () => {
            expect(config).toMatch(/^include:\n {2}- _pages$/m);
        });

        it('should keep the defaults block intact (published: true is load-bearing)', () => {
            const defaultsBlock = `defaults:
  - scope:
      path: ""
      type: pages
    values:
      layout: page
      lang: no
      published: true`;
            expect(config).toContain(defaultsBlock);
        });
    });

    describe('_pages/*.md frontmatter invariants', () => {
        it('every page has a permalink', () => {
            for (const { file, content } of pages) {
                expect(content, `${file} missing permalink`).toMatch(/^permalink:\s*\S/m);
            }
        });

        it('every page has a layout', () => {
            for (const { file, content } of pages) {
                expect(content, `${file} missing layout`).toMatch(/^layout:\s*\S/m);
            }
        });

        it('at least one page is a product', () => {
            const productPages = pages.filter(({ content }) => /^class: product$/m.test(content));
            expect(productPages.length).toBeGreaterThanOrEqual(1);
        });

        it('no page uses the `name:` key (shadowed by Jekyll::Page built-in on native pages)', () => {
            for (const { file, content } of pages) {
                expect(content, `${file} uses forbidden name: key`).not.toMatch(/^name:/m);
            }
        });

        it('ledelse-60-2.md uses display_name for its product name', () => {
            const page = pages.find(({ file }) => file === 'ledelse-60-2.md');
            expect(page).toBeDefined();
            expect(page.content).toMatch(/^display_name: "Ledelse 60:2"$/m);
        });

        it('dagfinn.md uses display_name for its profile name', () => {
            const page = pages.find(({ file }) => file === 'dagfinn.md');
            expect(page).toBeDefined();
            expect(page.content).toMatch(/^display_name: "Dagfinn Bang-Johansen"$/m);
        });
    });
});
