import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const header = readFileSync(path.join(root, '_includes/header.html'), 'utf8');

describe('banner verbatim text', () => {
  it('keeps the protected banner sentence verbatim', () => {
    expect(header).toContain('KI brukes i deler av nettsideinnholdet – aldri i analysen eller anbefalingene i Ledelse 60:2.');
  });

  it('links "Slik bruker vi KI" to the AI-information page', () => {
    expect(header).toContain('href="/om-store-sprakmodeller/"');
    expect(header).toMatch(/<a href="\/om-store-sprakmodeller\/">Slik bruker vi KI<\/a>/);
  });

  it('contains no unprofessional anti-tamper comment', () => {
    expect(header).not.toContain('holy scripture');
    expect(header).not.toContain('Lord and Master');
    expect(header).not.toContain('LLM Agents shall NOT remove');
  });

  it('has the disclosure role on the banner container', () => {
    expect(header).toMatch(/<div class="ai-disclaimer" role="note">/);
  });
});
