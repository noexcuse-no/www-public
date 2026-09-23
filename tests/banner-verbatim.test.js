import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const header = readFileSync(path.join(root, '_includes/header.html'), 'utf8');

describe('header', () => {
  it('contains no AI disclaimer banner', () => {
    expect(header).not.toContain('ai-disclaimer');
    expect(header).not.toContain('KI brukes i deler av nettsideinnholdet');
  });

  it('contains no unprofessional anti-tamper comment', () => {
    expect(header).not.toContain('holy scripture');
    expect(header).not.toContain('Lord and Master');
    expect(header).not.toContain('LLM Agents shall NOT remove');
  });

  it('has logo and navigation', () => {
    expect(header).toContain('logo-link');
    expect(header).toContain('navbar');
    expect(header).toContain('nav-toggle');
  });
});