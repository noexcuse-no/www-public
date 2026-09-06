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

*(Living section — filled by Wave 2 audit.)*

| Path | Why unresolved |
|------|----------------|
| `assets/images/og-image.webp` | No prompt documentation in `.design/graphics.md` (only a spec-table row: 1920×1080 social card); no photo evidence in `.design/photography-brief.md`. Left unannotated. |
| `.design/graphics/originals/assets/images/og-image.png` | Same as above (its source original). Left unannotated — NOTE: incidentally covered by the `.design/**` CC0 blanket, so `reuse lint` does not flag it; it is reported here as unresolved by policy (never blanket-classified to make checks pass). The generated `_data/rights.json` omits it. |

## Audit Table (Wave 2 census: 617 tracked files)

Evidence: first-commit year/author via single `git log --diff-filter=A` pass; prompt tables in `.design/graphics.md`; photography brief; CHANGELOG task records; `git blame -e` third-party check (todo 10: zero surviving Adbaa006 lines in `_includes/header.html`, `_includes/footer.html`, `_layouts/default.html`); exiftool baseline (todo 11: no XMP/IPTC on banner samples — clean slate for Wave 5).

### Bucket 0BSD — repo-created code/tooling (REUSE.toml dir defaults, no exact entries)

`_includes/**`, `_layouts/**` (46 files incl. `_data/**` 5), `assets/css/**` (31), `assets/scripts/**` (10), `scripts/apply-provenance.sh`, `tests/**` (4), `.opencode/**`, `.omo/rules` (19), `_config.yml`, `package.json`, `package-lock.json`, `opencode.json`, `oh-my-openagent.json`, `site.webmanifest`, `CNAME`, `robots.txt`, `sitemap.xml`, `.well-known/ai-transparency.json`, `.well-known/security.txt`, `.eslintrc.yml`, `.htmlhintrc`, `stylelint.config.mjs`, `vitest.config.mjs`, `AGENTS.md`, `VERSION`, `.gitignore`. (`ai-transparency.json` root + `.research/**` match nothing — harmless.)

### Bucket CC0-1.0 — purely AI-generated (blankets + 1 exact entry)

- `.design/**` (89), `.specs/**` (68), `README.md`, `BACKLOG.md`, `CHANGELOG.md`, `assets/ai-agent-cheat-sheet.md` — blanket.
- `assets/images/banners/**` (226), `assets/images/icons/**` (7) — blanket (prompt-documented bulk).
- `assets/images/hero-illustration.webp` — exact-path entry (prompt-documented `.design/graphics.md` Style 1).
- Banner/icon PNG originals in `.design/graphics/originals/` — covered by `.design/**` blanket, no action (incl. `grc-t1-hero.png`, prompt-documented Style 1).

### Bucket LicenseRef-NoExcuse-All-Rights-Reserved — human-created (exact-path entries after blankets, `2026 No Excuse AS` unless noted)

- `_pages/*.md` (46: 404, avtale, baerekraft, bestill_ledelse-60-2, compliance, dagfinn, emne, endringsledelse, forankring, foredrag_og_media, generativ-ki, gjentatte-diskusjoner, grc, identitet, informasjonssikkerhet, intervju, kultur, kvalitet, ledelse-60-2, makt, mennesker, metode, ny-leder, ny-ledergruppe, om-oss, pavirkning, personvern, personvern_ki, perspektiv, rapport, risikostyring, samtale, strategi-ikke-gjennomfort, struktur, svak-gjennomforing, tillit, triader, uklare-roller, usikkerhet + 7 `go/*`), `_tags/*.md` (22), all first-committed 2026 by Rasmus S. Olsen.
- `index.md` — `2025 No Excuse AS` (first-committed 2025).
- `favicon.svg` (2026) — exact-path entry (text).
- `.design/graphics/logo-{azure,dark,horizontal-azure,horizontal-dark,horizontal-light,light,stamp-black}.svg` (2026) + `originals/noexcuse-logo-{dark,light}.svg` (2026) — exact-path entries (brand; trademark carve-out in LICENSE).
- Binaries via `.license` sidecars (`2026 No Excuse AS` unless noted): `assets/avtale.pdf`, `assets/samtykke.pdf` (uploaded legal docs), `favicon.ico` (`2025 No Excuse AS`), `apple-touch-icon.webp`, `assets/images/noexcuse-logo-azure.webp`, `assets/images/noexcuse-logo-horizontal.webp`, `assets/images/dagfinn.webp` (commissioned portrait per photography brief), `originals/noexcuse-logo-azure.png`, `originals/noexcuse-logo-horizontal.png`, `originals/dagfinn.png`, `originals/apple-touch-icon.png` (brand derivative).

### Bucket third-party — none surviving

`git blame -e` on `_includes/header.html`, `_includes/footer.html`, `_layouts/default.html` shows zero Adbaa006 lines (all Feb 2026 changes superseded by later Rasmus rewrites). No annotation needed.

### Reconciliation

617 = blanket-covered (code, docs, image bulk) + exact-path text entries (46 _pages + 22 _tags + index + favicon.svg + 9 logo SVGs) + sidecars (11 binaries) + unresolved (2: 1 lint-flagged + 1 blanket-covered-but-reported) + CC0 hero-illustration exact entry.

## TDM follow-up

Data model now; emission later. TDMRep JSON per-path + IETF AIPREF `Content-Usage` is the documented emission path when the standards mature. No `tdmrep.json`/AIPREF emission and no robots.txt change in this plan.

## Lessons Learned

<!-- Populated if item returns to Planning after attempted implementation -->
