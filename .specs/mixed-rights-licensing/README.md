# Mixed-Rights Licensing & Provenance — Feature Specification

> Created: 2026-09-06
> Status: In Progress
> Plan: `.omo/plans/mixed-rights-licensing-provenance.md` (29 todos, Waves 0–6)
> Branch: `feat/mixed-rights-licensing` (base: integration tip, per master-plan amendment)

## Purpose / Problem

Every file in the public repository needs a verified license: 0BSD for repo-created source code, CC0-1.0 for purely AI-generated material, LicenseRef-NoExcuse-All-Rights-Reserved for human-created material, upstream rights preserved for third-party material, and genuinely uncertain material left visibly unresolved and reported. REUSE/SPDX metadata is the canonical rights source; site emission (per-page license links, JSON-LD, transparency manifest, `/rettigheter/` page) and the image metadata pipeline are generated from it; CI validates everything.

## Scope

- `LICENSES/0BSD.txt` + `LICENSES/CC0-1.0.txt` canonical texts (byte-exact from SPDX)
- Root `REUSE.toml` (exact-path entries for editorial files, dir defaults for code/assets)
- `.license` sidecars for non-default binaries
- Full tracked-file audit with git-evidence protocol + unresolved set reported
- Provenance frontmatter on `_pages/`/`_tags/`/`index.md` (`creation` 5-value enum, `editorial_review: human`, `editorial_responsibility: No Excuse AS`)
- `_data/assets.yml` registry (4-type classification, defaults + explicit entries with `license:` field)
- `scripts/generate-rights-metadata.mjs` → committed `_data/rights.json`
- Per-page `<link rel="license">`, `provenance-jsonld.html` rewrite, `.well-known/ai-transparency.json` refactor, `_pages/rettigheter.md` + footer link
- Image metadata pipeline (`apply-provenance.sh` rework, IPTC/XMP tags)
- Validation CI (vitest cross-check tests, `rights:generate`/`rights:check`, 4-job workflow)

## Requirements

### Rights model
- 0BSD: repo-created source code and tooling
- CC0-1.0: purely AI-generated material (docs, banners, icons, AI-authored pages)
- LicenseRef-NoExcuse-All-Rights-Reserved: human-created / materially human-authored material
- Third-party: upstream rights preserved (verify, never assume)
- Unresolved: genuinely uncertain material stays unannotated and reported — never blanket-classified, never hidden behind NOASSERTION

### Provenance vocabulary
- `creation`: `human-created` | `ai-assisted` | `ai-generated` | `third-party` | `unresolved`
- `editorial_review: human`, `editorial_responsibility: No Excuse AS` (constant on publishable pages)
- Consistency: `human-created|ai-assisted` ⟺ LicenseRef; `ai-generated` ⟺ CC0-1.0; `unresolved` ⟺ unannotated

### Registry schema (`_data/assets.yml`)
- Exactly two dir defaults (`assets/images/banners/`, `assets/images/icons/` → ai-generated)
- Explicit entries for every non-default asset with `path`, `creation`, `license` (must match REUSE annotation), `note`
- `creation` is orthogonal to rights: an AI-generated logo is still LicenseRef

### Generator contract (`scripts/generate-rights-metadata.mjs`)
- Reads REUSE.toml (smol-toml) + `.license` sidecars + `_data/assets.yml` (yaml)
- Resolution mirrors official tool: sidecar → last-matching-annotation-in-file
- Writes deterministic `_data/rights.json` (sorted keys, stable serialization, no timestamp)
- npm scripts: `rights:generate`, `rights:check` (regenerate + `git diff --exit-code`)

### CI policy
- 4 jobs: test, reuse (non-blocking while unresolved set non-empty), rights-drift, site-build
- Minimally complex; every check must work on this repo

### Image pipeline
- Registry-driven, correct IPTC/XMP tags, force-overwrite legacy values
- Human images → proprietary WebStatement `/rettigheter/#proprietary`
- ICO/CUR is read-only in exiftool — no metadata writes to `favicon.ico`

## Acceptance Criteria

- [ ] REUSE/SPDX coverage complete, `npm run rights:check` passes
- [ ] Per-page license links resolve; census covers the FINAL tree
- [ ] `npm run lint` passes; `npx vitest run` green (incl. registry↔REUSE cross-check tests)
- [ ] PR open + absorbed; gates green

## Unresolved files

*(Living section — filled by Wave 2 audit. Empty initially.)*

No unresolved files recorded yet.

## TDM follow-up

Data model now; emission later. TDMRep JSON per-path + IETF AIPREF `Content-Usage` is the documented emission path when the standards mature. No `tdmrep.json`/AIPREF emission and no robots.txt change in this plan.

## Lessons Learned

<!-- Populated if item returns to Planning after attempted implementation -->
