# Codebase Integrity — Spec/Design Audit Specification

## Purpose / Problem

Over the project lifecycle, `.specs/` and `.design/` have accumulated 75+ spec files and 30 design documents. Many reference features that are already completed (Z1, Y1-Y9, FF4, etc.), use stale implementation descriptions, or mix content research with functional specs. This makes it difficult to determine what's active, what's done, and what still needs work.

Specifically:
- **Completed specs mixed with active ones**: ~20 specs for features marked Done in BACKLOG.md sit alongside current specs with no clear distinction.
- **Content research in specs**: `.specs/shared/`, `.specs/ledelse-60-2/`, `.specs/grc/`, `.specs/generativ-ki/`, `.specs/frames/` contain article outlines and research — not implementation specs.
- **Stale implementation references**: `.specs/partners/README.md` describes templates and includes that don't match what's shipped.
- **Spec names don't reflect purpose**: 4 specs were rewritten as feature specs but retain `-gaps` in their directory names.
- **Weak cross-referencing**: Not all BL items reference their spec, and not all specs reference their BL item.

## Scope

Files and directories to be changed:

- `.specs/` — reorganize into active specs, archive, and research directories
- `.specs/partners/README.md` — fix stale implementation references
- `.specs/cases/README.md` — fix stale implementation references
- `.design/archive/` — archive directory for superseded design docs
- `.research/` — new top-level directory for content research (not implementation specs)
- BACKLOG.md — update references

## Design Documents

- `.design/codebase-integrity.md` — full analysis with findings and per-item details

## Acceptance Criteria

- [ ] `.specs/archive/` contains all specs for BL items marked Done (Z1, Y1-Y9, FF4, R4, R15, X2, A1, P5, etc.) — exactly those, no active specs moved
- [ ] `.research/` directory contains `.specs/shared/`, `.specs/ledelse-60-2/`, `.specs/grc/`, `.specs/generativ-ki/`, `.specs/frames/` — these are removed from `.specs/`
- [ ] Gap-analysis specs renamed: `homepage-gaps` → `homepage-overhaul`, `om-oss-gaps` → `om-oss-forbedringer`, `conversion-gaps` → `conversion-infrastructure`, `missing-landing-pages` → `topical-landing-pages`
- [ ] `.specs/partners/README.md` correctly describes: page-class query model, existing templates and CSS, correct layout reference (`home.html`, not `default.html`)
- [ ] `.specs/cases/README.md` correctly describes: page-query model (`site.pages where: class: "case"`), existing CSS classes used by `cases-cards.html`
- [ ] Every spec file has a `## Backlog References` section linking to its BL item(s)
- [ ] Every active BL item has a spec reference in its description
- [ ] Superseded design docs (`review-questions.md`, `citation-enhancement.md`, `c2pa-cc0-licensing.md`, `visual-polish-r23.md`) moved to `.design/archive/`
- [ ] No files deleted from `.design/` — only reorganized
- [ ] BACKLOG.md updated with spec references for I1 items
- [ ] No page `.md` content files modified
- [ ] No implementation code changed

## Backlog References

I1

## Dependencies

- None — this is an organizational/planning task, safe to do independently

## Design Constraints

- Page `.md` content files must not be touched
- `.design/` files must not be deleted — only reorganized to archive
- Spec files for Done items must be verifiable by checking BL status
- The spec-discipline rule in `.omo/rules/spec-discipline.md` must still apply after reorganization
