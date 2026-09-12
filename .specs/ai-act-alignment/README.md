# AI Act Alignment — KI-lov Readiness Checklist

> Created: 2026-09-09
> Status: Done
> Plan: `.omo/plans/ai-act-alignment.md`
> Branch: `feat/mixed-rights-licensing`

## Purpose / Problem

The site produces content partially generated with large language models and must be ready for Norway's KI-lov (implementation of the EU AI Act) when it enters force. This spec documents the current compliance posture, the article 50(4) editorial-exception chain, the EU icon placement surface map, the `.well-known` manifest route, and the re-audit triggers that force re-validation when the site changes.

Norway follows the EU AI Act via the EEA agreement; the Norwegian KI-lov is expected to mirror the EU regulation's transparency obligations (article 50) with a parallel timeline. This checklist keeps the disclosure system honest and forward-ready — no compliance claims beyond what the site actually implements.

## Current Posture (as implemented)

| Layer | Implemented | Notes |
|-------|-------------|-------|
| Visible banner disclosure | Yes | EU basic icon + "generativ KI" link in `_includes/header.html`, linking to `/om-store-sprakmodeller/` |
| Editorial-responsibility page | Yes | `/om-store-sprakmodeller/` — "Om KI", limited-use stance, named human reviewer |
| Machine-readable per-image provenance | Yes | JSON-LD `@graph` ImageObject entries in `provenance-jsonld.html`; RDFa injection by `ai-provenance-injector.js` |
| Per-page `digitalSourceType` | Yes | `provenance:` frontmatter → `CompositeWithTrainedAlgorithmicMediaDigitalSource` (editorial/ai-assisted) or `TrainedAlgorithmicMediaDigitalSource` (ai-generated), rendered only when `creation` set |
| `.well-known` manifest | Yes | Standard route for automated discovery; reviewer + regulatory contact + Norwegian disclosure statement |
| Non-AI exclusion | Yes | `_data/image-provenance.yml` exclude-list gates all provenance declarations (dagfinn.webp, logos, og-image, hand-crafted icons are never labeled AI) |
| No visible per-image badges | Yes | Explicit decision — editorial exception applies to images too; forward-readiness is machine-readable only |

## Exception Chain (Article 50(4) — Editorial Responsibility)

The site claims the editorial-exception under EU AI Act Art. 50(4). The chain must hold end-to-end:

1. **Human editorial review** — named human reviewer (Dagfinn Bang-Johansen) signs off content before publication; asserted in `.well-known/ai-transparency.json` `declarations.*.editorialReview`.
2. **LLMs in supporting/ornamental role** — "spørsmål, analyser og anbefalinger er menneskelig faglabor" (disclosure statement). LLM output is shaped, fact-checked, and corrected by the human.
3. **`creation` frontmatter classification** — every published page declares `creation: editorial` (or `human-created` for `/_pages/personvern.md`); no default, never guessed, never `ai-generated` for editorial content.
4. **Digital source type emission** — `CompositeWithTrainedAlgorithmicMediaDigitalSource` reflects "human in the loop shaped the output", consistent across JSON-LD and RDFa.
5. **Editorial-responsibility anchoring** — the visual disclosure (banner icon + text) and the machine-readable manifest both point at `/om-store-sprakmodeller/`, the page that documents the process and names the responsible human.

The exception is only valid while all five links hold. Breaking any link (e.g. publishing AI output without human shaping) voids the claim and requires immediate re-audit.

## Editorial-Responsibility Link

- **Canonical page:** `/om-store-sprakmodeller/` (`_pages/om-store-sprakmodeller.md`)
- **Linked from:** header banner ("generativ KI" anchor), footer (/om-oss/ abstract context), AI transparency manifest (`editorial_responsibility` + `contact` fields)
- **Content:** terminology tension ("KI" vs "store språkmodeller"), limited-use stance, editorial-review process, EU AI Act Art. 50(4) exception, contact for questions
- **Reviewer:** Dagfinn Bang-Johansen — the named human reviewer for text, code, styles, and images.

## EU Icon Placement Surface Map

The EU basic icon (from the official EU icons for labelling AI-generated content) is placed **only** where it supports disclosure without over-claiming:

| Surface | Icon | Rationale |
|---------|------|-----------|
| Header banner (`_includes/header.html`) | `eu-ai-basic-*.svg` via `_includes/eu-ai-icon.html`, `aria-hidden` | The one visible AI disclosure point on the site |
| Per-image badges | **None** | Explicit decision: the editorial exception applies to images (human-reviewed, not deepfakes); visible badges would over-disclose |

Files: `assets/images/ai-icons/eu-ai-basic-black.svg`, `eu-ai-basic-white.svg`, `LICENSES/LicenseRef-EU-AI-Basic-Icon.txt`, `_includes/eu-ai-icon.html`.

## .well-known Manifest Route

- **Path:** `/.well-known/ai-transparency.json` (Jekyll file at `.well-known/ai-transparency.json` with frontmatter `permalink: /.well-known/ai-transparency.json` → emitted to `_site/.well-known/`)
- **Schema:** `ai-transparency.dev/schema/v1.json`
- **Contents:** publisher, editorial_responsibility, contact, disclosure_statement (Norwegian), regulatory_contact (Nkom), declarations (text/code/styles/images with `digitalSourceType` + `editorialReview`), routes[] (all published pages), images.count
- **Discovery:** served as a static file from the repo root at the standard `.well-known` path, no server-side processing

## Re-Audit Triggers

Any of the following forces re-validation of the exception chain and manifest:

1. **New page published** — must have `provenance.creation` frontmatter; new route added to `routes[]` in the manifest.
2. **New image added** — must be classified in `_data/image-provenance.yml`; excluded from `exclude-list` → must receive AI provenance (IPTC/XMP + JSON-LD + RDFa); added to `exclude-list` → must never carry AI provenance.
3. **`creation` classification change on any page** — re-emit digital source type in JSON-LD; update manifest if the page is in `routes[]`.
4. **New AI tool adopted** — add to `_data/ai_tools.yml`, update manifest attribution, re-classify affected content.
5. **Norway's KI-lov enters force / EU AI Act article 50 obligations activate in the EEA** — full re-read of the final legal text; verify the Art. 50(4) exception claim, label requirements, and `.well-known` expectations against the actual regulation.
6. **Personnel change in editorial responsibility** — update reviewer name in manifest, banner ARIA, and `/om-store-sprakmodeller/`.
7. **Any visible/label change decision** — e.g. introducing per-image badges reverts the "no image badges" decision and requires re-audit of the exception claim.

## Validation Commands

```bash
npm test                                  # all suites incl. ai-provenance-injector, provenance-jsonld, banner-verbatim, supersession-marker, provenance-frontmatter
npm run ci:local                          # lint + reuse-lint + rights-drift + site-build + dependency-review
jq . .well-known/ai-transparency.json     # manifest validity
bash scripts/apply-provenance.sh --check  # image metadata consistency (if flag exists)
```

## Acceptance Criteria

- [ ] Exception chain documented (5 links) and gated by re-audit triggers
- [ ] Editorial-responsibility page `/om-store-sprakmodeller/` exists and is linked from banner, footer/om-oss, and manifest
- [ ] EU icon placed only on banner surface (no image badges) — placement surface map matches implementation
- [ ] `.well-known/ai-transparency.json` emitted to `_site/.well-known/` with reviewer "Dagfinn Bang-Johansen", regulatory_contact (Nkom), and Norwegian disclosure_statement
- [ ] Re-audit triggers list covers new pages, new images, classification changes, new tools, KI-lov entry into force, personnel change, label decisions
- [ ] `grep -c 'Rasmus S. Olsen' .specs/semantic-metadata/README.md .specs/i18n/README.md | grep -v archive` returns 0 matches

## Backlog References

R37 — AI Act alignment (KI-lov forward-readiness) (planned)