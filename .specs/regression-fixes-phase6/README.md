# Phase 6 Regression Fixes — Fix Specification

## Problem

Content regressions introduced during Phase 7 scroll-animation and SEO work (commit `d1d6ac5`). These are structural HTML issues in the `_pages/ledelse_*.md` content files.

## Issues

### R1 — `_pages/ledelse_forankring.md` trunkert (Fix-260522-01)

- **Problem:** CTA section cut mid-`<h2>` — missing body text, two CTA buttons, closing `</section>`, and 4 footnote references
- **Cause:** Commit `d1d6ac5` — file went from 315 → 106 lines
- **Fix:** Restore CTA content from historical commit, add footnotes, close open `<sup>` tags

### R2 — `_pages/ledelse_usikkerhet.md` feil permalink og navn (Fix-260522-02)

- **Note:** This is covered by `.specs/usikkerhet-rename/README.md`. The scope here is the `<sup>` tags only.
- **Scope:** 12 open `<sup>` tags in addition to the permalink work

### R3 — `_pages/ledelse_tillit.md` nestede `<sup>`-tagger (Fix-260522-03)

- **Problem:** Line 115: 5 `<sup>` tags nested without `</sup>`
- **Cause:** Commit `90f39cc`
- **Scope:** `_pages/ledelse_tillit.md`
- **Fix:** Separate into correct `<sup>...</sup>` per citation, close all 11 open `<sup>` tags

### R4 — `_pages/ledelse_generativ-ki.md` mangler `</sup>` (Fix-260522-04)

- **Problem:** One open `<sup>` on line 90 (Hubbard citation)
- **Scope:** `_pages/ledelse_generativ-ki.md`
- **Fix:** Add `</sup>` at the correct position

### R5 — Alle `<sup class="citation">` mangler `</sup>` (Fix-260522-05)

- **Problem:** Systematic issue — no `</sup>` tags found; subsequent text is rendered as superscript
- **Scope:** All `_pages/ledelse_*.md` files
- **Fix:** Audit and close all open `<sup class="citation">` tags across all article pages

## Backlog References

Fix-260522-01 through Fix-260522-06 (Phase 6 — R1 through R6)

## Dependencies

- R2 and R6 share scope with `.specs/usikkerhet-rename/README.md` — coordinate or do together
- R5 is cross-file and should be done last to avoid re-work

## Acceptance Criteria

- [ ] R1: `_pages/ledelse_forankring.md` has complete CTA section, footnotes, and closed tags
- [ ] R2: `_pages/ledelse_usikkerhet.md` has all `<sup>` tags closed
- [ ] R3: `_pages/ledelse_tillit.md` has no nested `<sup>` issues
- [ ] R4: `_pages/ledelse_generativ-ki.md` has closed `<sup>` on line 90
- [ ] R5: No unclosed `<sup class="citation">` in any `_pages/ledelse_*.md` file
- [ ] Site builds without HTML/lint errors
- [ ] Citations render correctly in both light and dark mode
