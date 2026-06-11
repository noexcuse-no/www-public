# Dynamic Crosslinking — JS Anchor Navigation Utility

> **Backlog References:** R26
> **Created:** 2026-06-09
> **Status:** Draft

## Problem / Goal

The site currently has static cross-links between pages (added in R24.5) via manual markdown edits. However, there is no **dynamic cross-navigation** system that helps users discover related content as they scroll through articles. Readers must manually navigate to find related topics.

Goal: Create a lightweight JavaScript utility that automatically injects contextual cross-links into article pages, enabling users to dynamically navigate between related content sections using anchor IDs within pages.

### Target cross-link pairs

The following topics should cross-link bidirectionally with anchor-level precision:

| Source Topic | Target Page(s) | Target Section / Anchor |
|---|---|---|
| Ledelse 60:2 | Om Oss, Om Metode | `/om-oss/#`, `/om-metode/#` |
| GRC | Triader, Makt, Perspektiv | `/triader/#`, `/makt/#`, `/perspektiv/#` |
| Identitet | Struktur, Mennesker, Påvirkning | `/struktur/#`, `/mennesker/#`, `/pavirkning/#` |
| Tillit | Usikkerhet, Generativ KI, Forankring | `/usikkerhet/#`, `/generativ-ki/#`, `/forankring/#` |

## Scope

### New files

| File | Purpose |
|------|---------|
| `assets/scripts/cross-links.js` | Vanilla JS — injects contextual cross-link banners into article content based on detected topics |

### Modified files

| File | Change |
|------|--------|
| `_includes/scripts.html` | Add `cross-links.js` to script loading order |

### How it works (proposed)

1. The script scans the page body for known topic keywords (from a configurable mapping)
2. When it finds a match, it injects a small cross-link banner/callout below the relevant paragraph or section
3. The banner shows the target page name, a brief description, and a clickable link with anchor reference
4. Links are relative and open in the same tab (standard navigation)
5. The script uses `IntersectionObserver` to only inject links when the relevant section is scrolled near, or alternatively injects them all on page load but hides non-visible ones

### Design constraints

- Must not modify the page MD content files (`.md` files stay untouched)
- Must work with Jekyll's static page generation (no backend)
- Must be lightweight, no dependencies, vanilla JS only
- Must respect dark mode via CSS custom properties
- Must have `44×44px` touch targets for mobile
- Must use `aria-label` for accessibility

## Acceptance Criteria

- [ ] Script injects cross-link callouts on matching pages
- [ ] Callouts include anchor-level references where sections have IDs
- [ ] Norwegian Bokmål callout text (e.g. "Les mer om [tema] i [artikkel] →")
- [ ] No modification to any `.md` content file
- [ ] `npm run lint:js` passes (0 errors, 0 warnings)
- [ ] `npm test` passes
- [ ] Mobile touch targets ≥44×44px
