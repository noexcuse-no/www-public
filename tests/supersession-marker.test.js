import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const doc = readFileSync(path.join(root, '.design/semantic-metadata.md'), 'utf8');

describe('.design/semantic-metadata.md supersession', () => {
  it('marks the old No Visible AI Label stance as SUPERSEDED', () => {
    expect(doc).toContain('> **SUPERSEDED (2026-09-09):**');
    expect(doc).toMatch(/SUPERSEDED[\s\S]{0,300}## No Visible AI Label/);
  });

  it('documents the EU AI Act alignment stance as replacement', () => {
    expect(doc).toContain('## EU AI Act Alignment — Updated Stance');
    expect(doc).toContain('layered disclosure approach per EU AI Act Article 50');
  });

  it('keeps the remaining stale legacy vocabulary superseded', () => {
    expect(doc).toContain('SUPERSEDED: the legacy `ai_provenance` vocabulary');
  });
});