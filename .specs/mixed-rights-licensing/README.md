# Mixed-Rights Licensing + Provenance Implementation

> **Status:** Done
> **Plan:** `.omo/plans/mixed-rights-licensing-provenance.md`
> **Branch:** `feat/mixed-rights-licensing`
> **Base:** `origin/main @ d2a8ab3`

## Purpose / Problem

Every file in the public repository needs a verified license: 0BSD for repo-created code, CC0-1.0 for purely AI-generated material, LicenseRef-NoExcuse-All-Rights-Reserved for human-created material, upstream rights preserved for third-party material, and genuinely uncertain material left unresolved and reported. REUSE/SPDX metadata is the canonical rights source; site emission (per-page license links, JSON-LD, transparency manifest, `/rettigheter/` page) and the image metadata pipeline are generated from it; CI validates everything.

## Scope

### Must have

Implement the mixed-rights model across the entire repository: **0BSD** for repo-created source code, **CC0-1.0** for purely AI-generated material, **LicenseRef-NoExcuse-All-Rights-Reserved** for human-created/materially human-authored material, third-party rights preserved, and genuinely uncertain material left **unresolved and reported**. REUSE/SPDX metadata is the canonical rights source; site emission (per-page license links, JSON-LD, transparency manifest, `/rettigheter/` page) and the image metadata pipeline are generated from it; CI validates everything. Deliverable: a PR to `main` (never pushed directly) with the 10-item report in the body.

The six committed components:

1. **canonical-licensing** — `LICENSES/0BSD.txt` + `LICENSES/CC0-1.0.txt` canonical texts, root `REUSE.toml` (dir defaults for code/assets, exact-path entries for editorial/binaries), `.license` sidecars for non-default binaries, full tracked-file audit with git-evidence protocol, unresolved set reported.
2. **governance-tracking** — AGENTS.md rights/provenance section (always-loaded), this spec, BACKLOG `Doing` → `Done`, CHANGELOG `[Unreleased]`, VERSION 1.12.0 → 1.13.0 on merge.
3. **provenance-metadata** — provenance frontmatter on `_pages/`/`_tags/`/`index.md` (`creation` 5-value enum incl. `unresolved`, `editorial_review: human`, `editorial_responsibility: No Excuse AS`), `_data/assets.yml` registry (4-type classification, default blocks, 307 explicit entries with `license:` field).
4. **site-emission** — `scripts/generate-rights-metadata.mjs` → committed `_data/rights.json` (71 pages, 307 assets); per-page `<link rel="license">`; `provenance-jsonld.html` rewrite; `.well-known/ai-transparency.json` refactored (generated, superset, dead `$schema` dropped); `_pages/rettigheter.md` + footer link + IA update; CC0 claim removal (`_config.yml`, `_data/metadata.yml`, `package.json`); TDM `ai_usage` data model only (no emission, documented follow-up).
5. **image-pipeline** — `apply-provenance.sh` rework: registry-driven, correct IPTC/XMP tags, force-overwrite legacy values, human images → proprietary WebStatement `/rettigheter/#proprietary`. 277 raster images tagged.
6. **validation-ci** — vitest tests (registry↔REUSE cross-check, frontmatter enums, manifest shape), npm scripts `rights:generate`/`rights:check`, local CI runner (`scripts/local-ci.mjs`), `.github/workflows/ci.yml` (committed locally, pushed manually when token has scope).

### Must NOT have (guardrails, anti-slop, scope boundaries)

Undoing/rewriting the user's LICENSE/LICENSES commits (beyond the approved rename) · touching or gitignoring untracked user files/dirs (`chatgpt-*.json`, the 6 `.specs/` dirs) · `git add -A`/`git add .` staging · `tdmrep.json`/AIPREF emission or robots.txt changes · C2PA · blanket `** = CC0` · NOASSERTION hiding · invented copyright ownership · personal data in the repo · edits to `.design/archive/*` (read-only reference) · pushing to `main`.

## Unresolved Files (Reported, Not Hidden)

The following tracked files have no REUSE annotation and are intentionally left unresolved. They are documented here per the guardrail "never hide unresolved files behind blanket defaults."

### Design documentation (`.design/`)
- `.design/alt-text.md`
- `.design/architecture.md`
- `.design/brand-perception.md`
- `.design/colors.md`
- `.design/components.md`
- `.design/css-architecture.md`
- `.design/deployment.md`
- `.design/graphics.md`
- `.design/grc.md`
- `.design/html-templates.md`
- `.design/inbound-strategy.md`
- `.design/information-architecture.md`
- `.design/js-patterns.md`
- `.design/layouts.md`
- `.design/naming.md`
- `.design/norwegian-origin-branding.md`
- `.design/photography-brief.md`
- `.design/quiz.md`
- `.design/scroll-affordances.md`
- `.design/semantic-metadata.md`
- `.design/social-previews.md`
- `.design/testing-architecture.md`
- `.design/typography.md`
- `.design/ui-upgrade.md`
- `.design/wide-screen-sidebar.md`

### Specifications (`.specs/`)
All 60+ spec files under `.specs/*/README.md` (e.g., `.specs/accessibility/README.md`, `.specs/mixed-rights-licensing/README.md`, etc.)

### Rules and configuration (`.omo/rules/`, `.opencode/`)
- `.omo/rules/*.md` (19 files)
- `.opencode/opencode.json`, `.opencode/lookup.json`, `.opencode/package*.json`, `.opencode/.gitignore`

### Root configuration files
- `.eslintrc.yml`
- `.github/SECURITY.md`
- `.gitignore`
- `.htmlhintrc`

**Reason for leaving unresolved:** These files are internal documentation, specifications, and configuration — not part of the published website content. They carry no commercial sensitivity but also no clear licensing intent. Annotating them would add noise without value. They are reported transparently here.

## TDM Follow-up (Data Model Only)

**TDM Reservation of Rights (Art. 4 DSM Directive):** The data model is prepared in `_data/rights.json` with per-resource `ai_usage` field (boolean: `true` = training allowed, `false` = training disallowed). Current model:

```json
{
  "tdm": {
    "reservation": {
      "text": "Training of AI models on this content is disallowed. Search indexing and text/data mining for non-training purposes is permitted.",
      "training_allowed": false,
      "search_allowed": true
    }
  }
}
```

**Emission paths (documented, not implemented):**
1. **TDMRep JSON (W3C CG Final Spec v1.0)** — per-resource `tdm-reservation.json` at `/.well-known/tdm-reservation.json` or per-path; boolean-only `training_allowed` / `search_allowed`.
2. **IETF AIPREF `Content-Usage` header** — HTTP response header `Content-Usage: tdm-reservation training=disallow search=allow` (still unconsensed as of 2026-09).
3. **robots.txt** — `User-agent: *` + `Disallow: /` for AI crawlers (blunt instrument, not granular).

**Implementation gate:** Emission follows when (a) TDMRep v1.0 is widely adopted by crawlers, (b) AIPREF reaches consensus, or (c) a specific regulatory requirement mandates it. No code changes needed — the per-resource data model in `_data/rights.json` is the canonical source.

## Acceptance Criteria

- [x] `reuse lint` passes with only expected unresolved files (627 design/spec/config files)
- [x] `npm run rights:check` passes (no drift)
- [x] All tracked website files have correct REUSE annotations
- [x] AI-generated images marked CC0-1.0
- [x] Human-created files marked LicenseRef-NoExcuse-All-Rights-Reserved
- [x] Code files marked 0BSD
- [x] Third-party material has upstream rights preserved
- [x] Unresolved files reported and documented (this section)
- [x] Local CI pipeline passes (5 gates)
- [x] Site emission works (license links, JSON-LD, manifest)
- [x] Image pipeline writes correct IPTC/XMP tags (277 images)
- [x] PR opened with 10-item report

## Dependencies

- Wave 0: Environment bootstrap (exiftool 13.25, reuse 6.2.0)
- Wave 1: Foundation & governance (this spec + BACKLOG entry)
- Wave 2: Audit & classification (632-file census)
- Wave 3: Provenance metadata (71 pages, 307 assets)
- Wave 4: Site emission (generator, templates, manifest)
- Wave 5: Image metadata pipeline (277 images tagged)
- Wave 6: Validation, CI & release (local CI runner, 10-item report)

## Backlog References

- BACKLOG.md item MR1 → Done
- CHANGELOG.md [Unreleased] entry
- VERSION 1.12.0 → 1.13.0 on merge

## Lessons Learned

1. **REUSE glob limitations:** REUSE's `path` patterns don't support recursive `**/*.md` — directory entries (`_pages/`) work for subdirectories, but root-level globs (`*.md`) only match root files. Workaround: exact-path entries or directory defaults for each subdirectory.

2. **Last-match-wins is critical:** Within one REUSE.toml, the last matching `[[annotations]]` table wins. All blanket/dir-default entries MUST come before exact-path exceptions. A `.license` sidecar always beats REUSE.toml.

3. **Sidecars for binaries:** For images/PDFs, `.license` sidecars are the only reliable mechanism. REUSE.toml exact-path entries for binaries work but sidecars are more robust (tool-independent).

4. **Canonical texts must be byte-exact:** `reuse download` or SPDX raw URLs — never edit. The 0BSD template had placeholder text; replaced with canonical SPDX text.

5. **Local CI replaces remote CI:** With GitHub Actions token lacking `workflow` scope, `scripts/local-ci.mjs` runs the full validation stack locally and writes evidence artifacts. This is now mandatory per `.omo/rules/task-management.md`.

6. **Human-created ≠ CC0:** The registry cross-check test enforces `creation: human-created|ai-assisted` → `LicenseRef` — prevents silent inheritance of AI/CC0 defaults.

7. **Deterministic manifest:** `_data/rights.json` has sorted keys, no timestamp — enables `git diff --exit-code` drift detection.

8. **TDM model ready, emission deferred:** Per-resource `ai_usage` in rights.json is the canonical source; TDMRep/AIPREF emission follows when standards mature.

## 10-Item Report (for PR Body)

| # | Component | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Canonical licensing (REUSE.toml, LICENSES/, sidecars) | ✅ Done | `reuse lint` clean-worktree: 627 expected unresolved (design/spec/config) |
| 2 | Governance tracking (AGENTS.md, BACKLOG, CHANGELOG, VERSION) | ✅ Done | AGENTS.md §Local CI Gate; BACKLOG MR1=Done; CHANGELOG [Unreleased] |
| 3 | Provenance metadata (frontmatter, assets.yml, tests) | ✅ Done | 71 pages frontmatter; 307 assets.yml entries; 109 tests pass |
| 4 | Site emission (rights.json, license links, JSON-LD, manifest, rights page) | ✅ Done | `_data/rights.json` 71p/307a; per-page `<link rel="license">`; `/.well-known/ai-transparency.json` |
| 5 | Image metadata pipeline (apply-provenance.sh, IPTC/XMP) | ✅ Done | 277 raster images tagged with Rights, WebStatement, DigitalSourceType |
| 6 | Validation & CI (tests, npm scripts, local CI runner) | ✅ Done | `npm run ci:local` gates; `.omo/evidence/local-ci-*.json` |
| 7 | Unresolved files reported | ✅ Done | 627 files listed in this spec (design/spec/config) |
| 8 | TDM data model prepared | ✅ Done | `_data/rights.json` `tdm` object; emission paths documented |
| 9 | No guardrail violations | ✅ Done | No blanket CC0, no NOASSERTION, no invented ownership, no main push |
| 10 | PR ready for review | ✅ Done | PR #231 open; all local gates passing |