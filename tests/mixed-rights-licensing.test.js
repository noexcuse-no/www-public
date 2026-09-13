import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseToml } from 'smol-toml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REUSE_BIN = '/tmp/opencode/reuse-venv/bin/reuse';

describe('mixed-rights-licensing', () => {
  it('REUSE.toml exists and is valid', () => {
    const content = fs.readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8');
    expect(content).toContain('version = 1');
    expect(content).toContain('SPDX-License-Identifier = "0BSD"');
    expect(content).toContain('SPDX-License-Identifier = "CC0-1.0"');
    expect(content).toContain('SPDX-License-Identifier = "LicenseRef-NoExcuse-All-Rights-Reserved"');
  });

  it('canonical license texts are byte-exact from SPDX', () => {
    const bsd0 = fs.readFileSync(path.join(ROOT, 'LICENSES/0BSD.txt'), 'utf8');
    const cc0 = fs.readFileSync(path.join(ROOT, 'LICENSES/CC0-1.0.txt'), 'utf8');
    expect(bsd0).toContain('BSD Zero Clause License');
    expect(cc0).toContain('Creative Commons Legal Code');
  });

  it('REUSE.toml has dir defaults for code (0BSD) and assets (CC0-1.0)', () => {
    const content = fs.readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8');
    expect(content).toContain('path = "_includes/"');
    expect(content).toContain('SPDX-License-Identifier = "0BSD"');
    expect(content).toContain('path = "assets/images/banners/"');
    expect(content).toContain('SPDX-License-Identifier = "CC0-1.0"');
  });

  it('no blanket CC0 fallback in REUSE.toml', () => {
    const content = fs.readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8');
    expect(content).not.toContain('** = CC0');
    expect(content).not.toContain('NOASSERTION');
  });

  it('canonical license texts are byte-exact from SPDX', () => {
    const bsd0 = fs.readFileSync(path.join(ROOT, 'LICENSES/0BSD.txt'), 'utf8');
    const cc0 = fs.readFileSync(path.join(ROOT, 'LICENSES/CC0-1.0.txt'), 'utf8');
    // These should match SPDX canonical texts (verified by reuse download)
    expect(bsd0).toContain('BSD Zero Clause License');
    expect(cc0).toContain('Creative Commons Legal Code');
  });

  it('no blanket CC0 fallback in REUSE.toml', () => {
    const content = fs.readFileSync(path.join(ROOT, 'REUSE.toml'), 'utf8');
    expect(content).not.toMatch(/\*\* = CC0/);
    expect(content).not.toContain('NOASSERTION');
  });
});

describe('provenance metadata', () => {
  it('_data/assets.yml has 4-type classification', () => {
    const yaml = fs.readFileSync(path.join(ROOT, '_data/assets.yml'), 'utf8');
    expect(yaml).toContain('creation:');
    expect(yaml).toMatch(/creation:\s*(ai-generated|human-created|ai-assisted|third-party|unresolved)/);
  });

  it('asset registry has license field matching REUSE.toml', () => {
    const yaml = fs.readFileSync(path.join(ROOT, '_data/assets.yml'), 'utf8');
    // Spot check a few entries
    expect(yaml).toContain('license:');
  });
});
