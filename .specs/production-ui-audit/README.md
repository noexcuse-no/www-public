# Production UI/UX Audit

> **Backlog References:** R27
> **Created:** 2026-06-09
> **Status:** Draft

## Problem / Goal

The production site (https://noexcuse.no) has not had a systematic visual inspection across all page types. Individual fixes have been applied (R24.x series) but there has been no comprehensive audit since the HTML→MD refactor and the questions component rollout. Minor UI/UX regressions may have accumulated, especially in layout, spacing, dark mode, and interactive elements.

Goal: Perform a browser-by-browser inspection of every publicly accessible page on the production site, document issues found, and create BL items + specs for each distinct problem discovered.

## Scope

### Pages to inspect

All pages listed in `.design/information-architecture.md`:

| URL | Type |
|-----|------|
| `/` | Homepage (index) |
| `/ledelse-60-2/` | Product page |
| `/om-oss/` | About |
| `/om-metode/` | Methodology |
| `/perspektiv/` | Article |
| `/triader/` | Article |
| `/struktur/` | Frame article |
| `/mennesker/` | Frame article |
| `/identitet/` | Frame article |
| `/pavirkning/` | Frame article |
| `/forankring/` | Benefit article |
| `/tillit/` | Benefit article |
| `/makt/` | Benefit article |
| `/generativ-ki/` | Benefit article |
| `/usikkerhet/` | Benefit article |
| `/grc/` | GRC page |
| `/samtale/` | Step page |
| `/intervju/` | Step page |
| `/rapport/` | Step page |
| `/emne/` + tag pages | Tag landing pages |

### What to check per page

1. **Layout & spacing** — Content alignment, grid breaks, overflow, whitespace consistency
2. **Dark mode** — Every element visible, proper contrast, no missing backgrounds
3. **Interactive elements** — Hover/focus/active states on all buttons, links, cards
4. **Images** — All images loading, no broken `src`, proper aspect ratios, alt text presence
5. **Typography** — Font rendering, heading hierarchy, line length, no orphaned text
6. **Mobile (≤768px)** — Hamburger menu, tap targets, content readability, no horizontal scroll
7. **Tablet (~1024px)** — Card grids, layout breakpoints, image sizing
8. **JSON-LD** — Valid structured data per page type
9. **Questions component** — Modal opens, providers render, copy works, dark mode
10. **Animations** — Scroll animations fire, no content hidden after animation (regression of R24.2)

### Deliverables

1. A table of findings (page, issue, severity, suggested action)
2. For each finding: new BL item reference + spec if the fix is non-trivial
3. Trivial fixes (single line CSS, single attribute) go directly to a fix commit with no separate spec

## Acceptance Criteria

- [ ] All ~20 pages inspected in browser (Chrome/Firefox minimum)
- [ ] Dark mode toggled and verified on every page
- [ ] Mobile and tablet viewports tested via DevTools
- [ ] Findings table delivered with severity rating (critical/major/minor/cosmetic)
- [ ] BL items created for all non-trivial fixes
- [ ] New specs created for multi-file or behavioral changes
