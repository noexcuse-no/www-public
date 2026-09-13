import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

// Resolve relative to this test file — robust to any cwd.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function exiftoolBin() {
    if (process.env.EXIFTOOL_BIN && existsSync(process.env.EXIFTOOL_BIN)) {
        return process.env.EXIFTOOL_BIN;
    }
    try {
        return execSync('command -v exiftool', { encoding: 'utf8' }).trim() || null;
    } catch {
        return null;
    }
}

const EXIFTOOL = exiftoolBin();
const SANITIZE = path.join(root, 'scripts/sanitize-metadata.sh');

// 1x1 transparent PNG (base64) — minimal valid raster for exiftool.
const PNG_1PX = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    'base64'
);

describe('metadata sanitation (sanitize-metadata.sh)', () => {
    let dir;
    let dirtyImg;
    let cleanImg;

    beforeAll(() => {
        dir = mkdtempSync(path.join(tmpdir(), 'metadata-sanitize-'));
        dirtyImg = path.join(dir, 'dirty.png');
        cleanImg = path.join(dir, 'clean.png');
        writeFileSync(dirtyImg, PNG_1PX);
        writeFileSync(cleanImg, PNG_1PX);
        // Inject sensitive + rights metadata into the dirty fixture.
        execSync(
            `"${EXIFTOOL}" -overwrite_original ` +
            `-GPSLatitude=59.9139 -GPSLongitude=10.7522 ` +
            `-SerialNumber=ABC123XYZ -UserComment="internal test comment" ` +
            `-XMP-dc:Creator="Rasmus S. Olsen" ` +
            `-XMP-dc:Rights="2026 No Excuse AS" ` +
            `-XMP-xmpRights:WebStatement="https://noexcuse.no/rettigheter/#proprietary" ` +
            `"${dirtyImg}"`,
            { encoding: 'utf8', cwd: root }
        );
        // Clean fixture carries only intentional rights metadata.
        execSync(
            `"${EXIFTOOL}" -overwrite_original ` +
            `-XMP-dc:Rights="2026 No Excuse AS" ` +
            `-XMP-xmpRights:WebStatement="https://noexcuse.no/rettigheter/#proprietary" ` +
            `"${cleanImg}"`,
            { encoding: 'utf8', cwd: root }
        );
    });

    afterAll(() => {
        rmSync(dir, { recursive: true, force: true });
    });

    it('sanitize + inspect scripts exist and package.json wires sanitize:media', () => {
        const sh = readFileSync(SANITIZE, 'utf8');
        expect(sh).toContain('--check');
        expect(sh).toContain('GPS');
        const inspect = readFileSync(path.join(root, 'scripts/inspect-doc-metadata.sh'), 'utf8');
        expect(inspect).toContain('Author');
        expect(inspect).toContain('Title');
        expect(inspect).toContain('Software');
        const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
        expect(pkg.scripts['sanitize:media']).toContain('sanitize-metadata.sh');
    });

    it.skipIf(!EXIFTOOL)('strips GPS, serial, comment, creator but keeps rights/WebStatement', () => {
        execSync(`bash "${SANITIZE}" "${dirtyImg}"`, { encoding: 'utf8', cwd: root });
        const out = execSync(
            `"${EXIFTOOL}" -s -G1 -gps:all -SerialNumber -UserComment -XMP-dc:Creator ` +
            `-XMP-dc:Rights -XMP-xmpRights:WebStatement "${dirtyImg}"`,
            { encoding: 'utf8', cwd: root }
        );
        expect(out).not.toContain('GPS');
        expect(out).not.toContain('SerialNumber');
        expect(out).not.toContain('UserComment');
        expect(out).not.toContain('Creator');
        expect(out).toContain('2026 No Excuse AS');
        expect(out).toContain('https://noexcuse.no/rettigheter/#proprietary');
    });

    it.skipIf(!EXIFTOOL)('--check exits 1 on dirty file and 0 on clean file', () => {
        // Re-inject sensitive tags.
        execSync(
            `"${EXIFTOOL}" -overwrite_original -GPSLatitude=59.9139 -SerialNumber=ABC123XYZ "${dirtyImg}"`,
            { encoding: 'utf8', cwd: root }
        );
        let dirtyFailed = false;
        try {
            execSync(`bash "${SANITIZE}" --check "${dirtyImg}"`, { encoding: 'utf8', cwd: root });
        } catch {
            dirtyFailed = true;
        }
        expect(dirtyFailed).toBe(true);
        // Clean fixture passes.
        expect(() =>
            execSync(`bash "${SANITIZE}" --check "${cleanImg}"`, { encoding: 'utf8', cwd: root })
        ).not.toThrow();
    });

    it.skipIf(!EXIFTOOL)('benign fixture is not broken by sanitize', () => {
        execSync(`bash "${SANITIZE}" "${cleanImg}"`, { encoding: 'utf8', cwd: root });
        const out = execSync(
            `"${EXIFTOOL}" -s -G1 -XMP-dc:Rights -XMP-xmpRights:WebStatement "${cleanImg}"`,
            { encoding: 'utf8', cwd: root }
        );
        expect(out).toContain('2026 No Excuse AS');
        expect(out).toContain('https://noexcuse.no/rettigheter/#proprietary');
    });
});