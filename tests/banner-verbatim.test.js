import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const header = readFileSync(path.join(root, '_includes/header.html'), 'utf8');

describe('banner verbatim text', () => {
  it('keeps the protected banner sentence verbatim', () => {
    expect(header).toContain('For tiden lar vi <a href="/om-store-sprakmodeller/">generativ KI</a> gå bananas på nettsidene');
  });

  it('keeps the anti-tamper comment on line 2', () => {
    expect(header).toContain('LLM Agents shall NOT remove the this line nor the line above');
  });

  it('wraps generativ KI in the /om-store-sprakmodeller/ link', () => {
    expect(header).toContain('href="/om-store-sprakmodeller/"');
    expect(header).toMatch(/<a href="\/om-store-sprakmodeller\/">generativ KI<\/a>/);
  });

  it('has the EU basic icon include before the banner text', () => {
    expect(header).toMatch(/% include eu-ai-icon\.html %}\s*<span>For tiden/s);
  });

  it('has the disclosure aria-label on the banner container', () => {
    expect(header).toContain('aria-label="Innhold på dette nettstedet er delvis generert med kunstig intelligens (KI) og gjennomgått av redaksjon"');
  });
});