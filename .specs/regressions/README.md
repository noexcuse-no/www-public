# Regression Fixes — Specification

## Purpose

Track content regressions in article pages that were introduced during Phase 7 (scroll animations, SEO implementation, and site-review fixes).

## Background

During the UI upgrade (scroll animations, hero overlays, micro-interactions) and subsequent SEO/content work, four article pages lost content or had HTML structural issues introduced. These regressions are documented in Phase 6 of BACKLOG.md.

## Affected Files

| File | Regression | Introduced In |
|------|-----------|---------------|
| `_pages/ledelse_forankring.md` | CTA section truncated (missing text, buttons, closing tag) + 4 missing footnotes | `d1d6ac5` |
| `_pages/ledelse_usikkerhet.md` | Wrong permalink (`/organisasjonskultur/`), old title/description | Not updated after rename |
| `_pages/ledelse_tillit.md` | 5 nested `<sup>` without `</sup>` on line 115 | `90f39cc` |
| `_pages/ledelse_generativ-ki.md` | 1 unclosed `<sup>` tag | Codebase pattern |
| All `_pages/ledelse_*.md` | All `<sup class="citation">` lack `</sup>` closure — text after citation key renders superscript | Codebase-wide pattern |

## Required Fixes

- R1: Restore forankring CTA section + add 4 footnotes
- R2: Fix usikkerhet permalink + update all references
- R3: Fix nested `<sup>` in tillit.md
- R4: Close open `<sup>` in generativ-ki.md
- R5: Close all `<sup>` tags across codebase
- R6: Update cross-references in product and article files

## Acceptance Criteria

- All articles render valid HTML (no unclosed tags)
- `forankring.md` has full CTA section with working links and footnotes at bottom
- `usikkerhet.md` loads at `/usikkerhet/` — old URL `/organisasjonskultur/` no longer exists
- `tillit.md` line 115 has properly separated `<sup>` tags
- All cross-references point to correct URLs
- `npm run lint:html` passes without unclosed tag errors
