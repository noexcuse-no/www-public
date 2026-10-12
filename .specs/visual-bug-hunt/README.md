# Visual bug hunt & commercial UX polish

> Created: 2026-10-12
> Status: Done

## Problem / Goal

A structured visual bug hunt over all published pages (320–1920 px, both themes)
plus repair of the known homepage defect set from the homepage-repositioning
work. Goal: zero horizontal overflow, no cascade conflicts between shared and
homepage CSS, no inert affordances, and a single commercial price source —
each fix guarded by a regression test.

## Scope

- `index.md`, `_includes/recognition-card.html`, `_includes/process-step.html`,
  `_includes/commercial/hero.html`, `_includes/logo-svg.html`,
  `_includes/commercial/final_cta.html`, `_data/commercial.yml`
- `_pages/ledelse-60-2.md`, `_pages/metode.md`
- CSS: `home.css`, `hero.css`, `products.css`, `header.css`, `sidebar.css`,
  `buttons.css`, `layout.css`, `article.css`, `typography.css`, `commercial.css`
- Docs/tests: `.design/css-architecture.md`, `tests/visual-hunt-regression.test.js`

## Defect inventory (VIS-001 … VIS-014)

| ID | Sev | Symptom | Root cause | Fix |
|----|-----|---------|-----------|-----|
| VIS-001 | P0 | Raw `###` text inside homepage recognition grid | Markdown inside raw-HTML blocks is not processed | Headings removed; cards are include-only |
| VIS-002 | P0 | Raw `####` text inside homepage process grid | Same | Headings removed; steps are include-only |
| VIS-003 | P0 | Hero image unconstrained at wide viewports | Direct `<img>` with no sizing contract in `.home-hero__media` | `.home-hero__img-full` class + explicit block/100%/contain rule + `min-width: 0` on grid children |
| VIS-004 | P0 | Process-step images raw, unstable aspect | Include emitted bare `<img>` targeting a wrapper it never rendered | Wrapped in `.media-editorial.media-editorial--reference` (16:9) |
| VIS-005 | P1 | Homepage process steps got dark landing card styling | Unscoped `.process-step` rules in `products.css`, which loads after `home.css` | Scoped under `.landing-process-steps` |
| VIS-006 | P1 | Mobile TOC toggle mispositioned | `--header-height` defined only on `.header`; fixed-position toggle never resolved it | Token promoted to `:root` (97px / 85px ≤599px) + fallback at consumer |
| VIS-007 | P1 | Back-to-top an unreadable ~108px transparent blob | Present in buttons.css base/ghost/icon lists (padding 14/32, transparent bg) overriding layout.css circle; no global border-box | Removed from all buttons.css lists; layout.css sole owner; `.is-visible` opacity 0.95 |
| VIS-008 | P1 | Inert button-like spans on published pages | `ai-reflection-cta` renders decorative `<span>`s; JS only binds `.ai-topic-btn` | Include removed from `/ledelse-60-2/` and `/metode/` (+ metode dead self-link section) |
| VIS-009 | P1 | Undefined custom properties | `var(--surface-color)` / `var(--focus-ring-color)` in dormant booking-fallback-form styles | `--surface-subtle` / `--focus-color` |
| VIS-010 | P0 | Nav toggle pushed out of 320px viewport on every page | Logo SVG had no `class` attribute — every `.logo` sizing rule dead, logo ~267px wide | `class="logo"` on SVG root |
| VIS-011 | P0 | `/metode/` hero leaks 7–16 px at ≥1280px | Parallax JS scales `.hero-image` itself; its own `overflow` cannot clip its transformed box | `.hero { overflow: hidden }` |
| VIS-012 | P1 | Nested tables leak at 320px (`/opphavsrett/`) | `.article-body > table` child selector missed `li`-nested tables | Broadened to `.article-body table` |
| VIS-013 | P2 | Inline code forces 31–33px overflow at 320px | Unbreakable `language-plaintext` tokens, no wrap rule site-wide | `.article-body code { overflow-wrap: anywhere }` |
| VIS-014 | P2 | Headings leak (e.g. 3 px on `/personvern/`) | Unbreakable Norwegian compounds («Personvernerklæring») | `overflow-wrap: anywhere` on h1–h4 |

## Acceptance Criteria

- [x] Zero horizontal overflow on all 13 published pages × 8 viewports (320/390/768/769/1024/1280/1440/1920), both themes
- [x] Zero console errors across the sweep
- [x] Recognition grid: 4 cards at 4:3; process grid: 3 steps at 16:9; no raw Markdown in output
- [x] Full-style hero image exactly column-width at all viewports
- [x] Back-to-top: 44×44 navy circle, opacity 0.95 when visible
- [x] TOC toggle resolves `top` (85px + `--space-sm` at mobile)
- [x] No inert affordances on published pages
- [x] Price/inclusions render from `_data/commercial.yml` only
- [x] 23 regression tests in `tests/visual-hunt-regression.test.js` pass
- [x] `ci:local` 12/13 — sole failure is the two documented Vitest 5s timeout flakes (51/51 with `--testTimeout=30000`)

## Lessons Learned

- **Browser cache invalidates audits, not fixes**: after a rebuild, the
  certification sweep still reported identical pre-fix overflow numbers
  because http.server + heuristic caching served stale CSS. Certification
  sweeps must clear the browser cache (CDP `Network.clearBrowserCache`) after
  each rebuild.
- **Markdown inside raw-HTML blocks passes through unprocessed**: headings
  written as `###` inside grid `<div>`s render as literal text. The regression
  guard checks the built HTML for literal `###`, not the source.
- **An element's own `overflow` cannot contain its transformed box**: when a
  script applies `transform: scale()` to an element, containment must live on
  a parent.
- **Dead CSS hooks hide layout bugs**: the logo's entire sizing contract was
  inert because the SVG root lacked the class the CSS targets. Markup↔CSS
  hook pairs need a regression test.
