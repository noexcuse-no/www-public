#!/usr/bin/env node
/**
 * Document structure validation — flags archived/superseded/obsolete/done
 * documents in active .design/ and .specs/ locations based on frontmatter status.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const ROOT = resolve(__dirname, '..');
const CONVENTIONS_FILE = resolve(ROOT, 'scripts/doc-conventions.json');

function loadConventions() {
  return JSON.parse(readFileSync(CONVENTIONS_FILE, 'utf8'));
}

function parseFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const endIdx = content.indexOf('---', 3);
  if (endIdx === -1) return null;
  const fm = content.slice(3, endIdx).trim();
  const data = {};
  for (const line of fm.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      data[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  }
  return data;
}

function isAllowlisted(filePath, validation) {
  const rel = filePath.replace(ROOT + '/', '');
  // Allowlisted files
  if (validation.allowlist_files.includes(rel)) return true;
  // Allowlisted directories
  for (const dir of validation.allowlist_directories) {
    if (rel.startsWith(dir)) return true;
  }
  return false;
}

function isInActiveLocation(filePath, validation) {
  const rel = filePath.replace(ROOT + '/', '');
  for (const loc of validation.active_locations) {
    if (rel.startsWith(loc)) return true;
  }
  return false;
}

function walk(dir, fileList = []) {
  if (!existsSync(dir)) return fileList;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      const ext = extname(file).toLowerCase();
      if (['.md'].includes(ext)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function main() {
  console.log('🔍 Validating document structure in active locations...\n');

  const conventions = loadConventions();
  const validation = conventions.frontmatter.validation;
  const flaggedStatuses = new Set(validation.flagged_statuses_in_active);
  const allowMissing = validation.allow_missing_status;

  const scanDirs = ['.design', '.specs'];
  let totalViolations = 0;
  let checkedCount = 0;

  for (const scanDir of scanDirs) {
    const fullPath = resolve(ROOT, scanDir);
    const files = walk(fullPath);

    for (const filePath of files) {
      const relPath = filePath.replace(ROOT + '/', '');

      // Skip allowlisted
      if (isAllowlisted(filePath, validation)) continue;

      // Only check active locations
      if (!isInActiveLocation(filePath, validation)) continue;

      checkedCount++;
      try {
        const content = readFileSync(filePath, 'utf8');
        const fm = parseFrontmatter(content);

        if (fm && fm.status) {
          const status = fm.status.toLowerCase();
          if (conventions.frontmatter.fields.status.enum.includes(status)) {
            if (flaggedStatuses.has(status)) {
              console.error(`❌ doc-structure|${filePath.replace(ROOT + '/', '')}|1|document has flagged status "${fm.status}" in active location`);
              console.error(`   Frontmatter: ${JSON.stringify(fm)}`);
              totalViolations++;
            }
          } else {
            console.error(`❌ doc-structure|${filePath.replace(ROOT + '/', '')}|1|unknown status "${fm.status}" in frontmatter`);
            totalViolations++;
          }
        } else if (fm && !fm.status && !allowMissing) {
          // Only flag missing status if allow_missing is false
          console.error(`⚠️  doc-structure|${filePath.replace(ROOT + '/', '')}|1|missing status in frontmatter`);
          totalViolations++;
        }
      } catch {
        // skip unreadable
      }
    }
  }

  if (totalViolations > 0) {
    console.error(`\n❌ Document structure check failed: ${totalViolations} violation(s) found`);
    process.exit(1);
  }

  console.log(`✅ Document structure check passed — ${checkedCount} files checked, no flagged statuses in active locations`);
}

main().catch(e => {
  console.error('❌ Check failed:', e.message);
  process.exit(1);
});