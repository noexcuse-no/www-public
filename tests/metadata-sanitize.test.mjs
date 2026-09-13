import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, renameSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const SANITIZE = join(ROOT, 'scripts', 'sanitize-metadata.sh');

function hasExiftool() {
    try {
        execFileSync('exiftool', ['-ver'], { stdio: 'pipe' });
        return true;
    } catch {
        return false;
    }
}

function runScript(...args) {
    try {
        const stdout = execFileSync('bash', [SANITIZE, ...args], { encoding: 'utf8' });
        return { code: 0, stdout };
    } catch (err) {
        return { code: err.status ?? 1, stdout: (err.stdout || '').toString() };
    }
}

function exiftoolTag(file, tag) {
    try {
        return execFileSync('exiftool', ['-s', '-s', '-s', `-${tag}`, file], { encoding: 'utf8' }).trim();
    } catch {
        return '';
    }
}

function setTags(file, tags) {
    const args = ['-overwrite_original', ...tags, file];
    execFileSync('exiftool', args, { stdio: 'pipe' });
}

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    CRC_TABLE[n] = c >>> 0;
}

function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
    return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makeSyntheticPng() {
    const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(1, 0);
    ihdr.writeUInt32BE(1, 4);
    ihdr[8] = 8;
    ihdr[9] = 6;
    const idat = zlib.deflateSync(Buffer.from([0, 255, 0, 0, 255]));
    return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

const PRIVACY_TAGS = [
    '-GPSLatitude=59.9',
    '-GPSLongitude=10.7',
    '-EXIF:SerialNumber=SN12345',
    '-EXIF:UserComment=test comment',
    '-XMP-dc:Creator=Test Author',
];

const RIGHTS_TAGS = [
    '-XMP-dc:Rights=Copyright No Excuse AS',
    '-XMP-xmpRights:WebStatement=https://noexcuse.no/rettigheter',
    '-XMP-iptcExt:DigitalSourceType=http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt',
];

describe.skipIf(!hasExiftool())('sanitize-metadata.sh', () => {
    let dir;

    beforeAll(() => {
        dir = mkdtempSync(join(tmpdir(), 'sanitize-'));
    });

    afterAll(() => {
        rmSync(dir, { recursive: true, force: true });
    });

    it('flags a dirty image in --check mode and exits 1', () => {
        const file = join(dir, 'dirty.png');
        writeFileSync(file, makeSyntheticPng());
        setTags(file, [...PRIVACY_TAGS, ...RIGHTS_TAGS]);

        const { code, stdout } = runScript('--check', file);
        expect(code).toBe(1);
        expect(stdout).toMatch(/dirty\.png/);
        expect(stdout).toMatch(/GPS|SerialNumber|UserComment|Creator/);
        expect(stdout).not.toContain('SN12345');
        expect(stdout).not.toContain('Test Author');
    });

    it('strips GPS/serial/comment/creator but retains rights and provenance', () => {
        const file = join(dir, 'dirty.png');
        const { code } = runScript('--apply', file);
        expect(code).toBe(0);

        expect(exiftoolTag(file, 'GPSLatitude')).toBe('');
        expect(exiftoolTag(file, 'GPSLongitude')).toBe('');
        expect(exiftoolTag(file, 'SerialNumber')).toBe('');
        expect(exiftoolTag(file, 'UserComment')).toBe('');
        expect(exiftoolTag(file, 'Creator')).toBe('');

        expect(exiftoolTag(file, 'Rights')).toBe('Copyright No Excuse AS');
        expect(exiftoolTag(file, 'WebStatement')).toBe('https://noexcuse.no/rettigheter');
        expect(exiftoolTag(file, 'DigitalSourceType')).toBe(
            'http://cv.iptc.org/newscodes/digitalsourcetype/digitalArt'
        );

        const clean = runScript('--check', file);
        expect(clean.code).toBe(0);
    });

    it('reports a benign image clean and leaves it unchanged by --apply', () => {
        const file = join(dir, 'benign.png');
        const original = makeSyntheticPng();
        writeFileSync(file, original);
        setTags(file, RIGHTS_TAGS);

        const checked = runScript('--check', file);
        expect(checked.code).toBe(0);

        const applied = runScript('--apply', file);
        expect(applied.code).toBe(0);

        const after = execFileSync('exiftool', ['-s', '-s', '-s', '-FileType', file], { encoding: 'utf8' }).trim();
        expect(after).toBe('PNG');
        const rechecked = runScript('--check', file);
        expect(rechecked.code).toBe(0);
        expect(exiftoolTag(file, 'Rights')).toBe('Copyright No Excuse AS');
    });

    it('skips misnamed files (extension != content type) without corrupting them', () => {
        const pngName = join(dir, 'sneaky-src.png');
        const file = join(dir, 'sneaky.webp');
        writeFileSync(pngName, makeSyntheticPng());
        setTags(pngName, [...PRIVACY_TAGS, ...RIGHTS_TAGS]);
        renameSync(pngName, file);

        const { code } = runScript('--apply', file);
        expect(code).not.toBe(0);
        expect(exiftoolTag(file, 'FileType')).toBe('PNG');
        expect(exiftoolTag(file, 'GPSLatitude')).toContain('59');
    });
});