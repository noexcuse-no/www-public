# Mixed-Rights Licensing + Provenance Implementation

> **Status:** Planned
> **Plan:** `.omo/plans/mixed-rights-licensing-provenance.md`
> **Branch:** `feat/mixed-rights-licensing`
> **Base:** `origin/main @ d2a8ab3`

## Purpose / Problem

Every file in the public repository needs a verified license: 0BSD for repo-created code, CC0-1.0 for purely AI-generated material, LicenseRef-NoExcuse-All-Rights-Reserved for human-created material, upstream rights preserved for third-party material, and genuinely uncertain material left unresolved and reported. REUSE/SPDX metadata is the canonical rights source; site emission (per-page license links, JSON-LD, transparency manifest, `/rettigheter/` page) and the image metadata pipeline are generated from it; CI validates everything.

## Scope

### Must have

Implement the mixed-rights model across the entire repository: **0BSD** for repo-created source code, **CC0-1.0** for purely AI-generated material, **LicenseRef-NoExcuse-All-Rights-Reserved** for human-created/materially human-authored material, third-party rights preserved, and genuinely uncertain material left **unresolved and reported**. REUSE/SPDX metadata is the canonical rights source; site emission (per-page license links, JSON-LD, transparency manifest, `/rettigheter/` page) and the image metadata pipeline are generated from it; CI validates everything. Deliverable: a PR to `main` (never pushed directly) with the 10-item report in the body.

The six committed components (each can succeed or fail independently):

1. **canonical-licensing** — `LICENSES/0BSD.txt` + `LICENSES/CC0-1.0.txt` canonical texts, root `REUSE.toml` (exact-path entries for all editorial files, dir defaults for code/assets), `.license` sidecars for non-default binaries, full tracked-file audit with git-evidence protocol, unresolved set reported.
2. **governance-tracking** — AGENTS.md rights/provenance section (always-loaded), new `.specs/mixed-rights-licensing/README.md`, BACKLOG `Doing` entry, CHANGELOG `[Unreleased]` (section created — does not exist today), VERSION 1.11.0 → 1.12.0 on merge.
3. **provenance-metadata** — provenance frontmatter on `_pages/`/`_tags/`/`index.md` (`creation` 5-value enum incl. `unresolved`, `editorial_review: human`, `editorial_responsibility: No Excuse AS`), `_data/assets.yml` registry (4-type classification, default blocks, explicit entries with `license:` field).
4. **site-emission** — `scripts/generate-rights-metadata.mjs` → committed `_data/rights.json`; per-page `<link rel="license">`; `provenance-jsonld.html` rewrite; `.well-known/ai-transparency.json` refactored (generated, superset, dead `$schema` dropped); `_pages/rettigheter.md` + footer link + information-architecture update; CC0 claim removal (`_config.yml`, `_data/metadata.yml`, `package.json`); TDM `ai_usage` data model only (no emission, documented follow-up).
5. **image-pipeline** — `apply-provenance.sh` rework: registry-driven, correct IPTC/XMP tags, force-overwrite legacy values, human images → proprietary WebStatement `/rettigheter/#proprietary`.
6. **validation-ci** — vitest tests (registry↔REUSE cross-check, frontmatter enums, manifest shape), npm scripts `rights:generate`/`rights:check`, `.github/workflows/ci.yml` (4 jobs), final 10-item report.

### Must NOT have (guardrails, anti-slop, scope boundaries)

Undoing/rewriting the user's LICENSE/LICENSES commits (beyond the approved rename) · touching or gitignoring untracked user files/dirs (`chatgpt-*.json`, the 6 `.specs/` dirs) · `git add -A`/`git add .` staging · `tdmrep.json`/AIPREF emission or robots.txt changes · C2PA · blanket `** = CC0` · NOASSERTION hiding · invented copyright ownership · personal data in the repo · edits to `.design/archive/*` (read-only reference) · pushing to `main`.

## Scope IN

- All 6 components implemented across 6 waves
- REUSE.toml with directory defaults and exact-path entries
- Canonical license texts byte-exact from SPDX
- REUSE.toml dir defaults for code/assets; exact-path for editorial/binaries
- Provenance frontmatter on all renderable sources
- Asset registry with 4-type classification
- Generator script → committed `_data/rights.json`
- Per-page `<link rel="license">`, rewritten `provenance-jsonld.html`, refactored `.well-known/ai-transparency.json`
- `_pages/rettigheter.md` + footer link + IA update
- CC0 claim removal from `_config.yml`, `_data/metadata.yml`, `package.json`
- `apply-provenance.sh` reworked (registry-driven, correct IPTC/XMP, human images → proprietary WebStatement)
- Vitest tests, npm scripts, 4-job CI workflow

## Acceptance Criteria

- [ ] `reuse lint` passes with only expected unresolved files
- [ ] `npm run rights:check` passes (no drift)
- [ ] All tracked files have correct REUSE annotations
- [ ] AI-generated images marked CC0-1.0
- [ ] Human-created files marked LicenseRef-NoExcuse-All-Rights-Reserved
- [ ] Code files marked 0BSD
- [ ] Third-party material has upstream rights preserved
- [ ] Unresolved files reported and documented
- [ ] CI pipeline passes (4 jobs)
- [ ] Site emission works (license links, JSON-LD, manifest)
- [ ] Image pipeline writes correct IPTC/XMP tags
- [ ] PR opened with 10-item report

## Dependencies

- Wave 0: Environment bootstrap (exiftool, jekyll, ruby, bundle, reuse)
- Wave 1: Foundation & governance (this spec + BACKLOG entry)
- Wave 2: Audit & classification
- Wave 3: Provenance metadata
- Wave 5: Image metadata pipeline
- Wave 6: Validation, CI & release

## Backlog References

- BACKLOG.md item for mixed-rights-licensing
- CHANGELOG.md [Unreleased] entry
- VERSION 1.11.0 → 1.12.0 on merge

## Lessons Learned

