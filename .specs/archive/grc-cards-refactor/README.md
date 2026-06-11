# GRC — Perspective Cards Refactor

> **Backlog References:** R30
> **Created:** 2026-06-09
> **Status:** Draft
> **Depends on:** F7 (existing card CSS/banner illustrations)

## Problem / Goal

The GRC page (`/grc/`) currently presents the four governance perspectives (styring, risikostyring, samsvar, ledelse) in a text-heavy layout. The existing visual hierarchy does not distinguish the four perspectives clearly enough, and the layout does not leverage the existing card banner illustrations that have been generated for other parts of the site.

Goal: Refactor the presentation of the four GRC perspectives into card components, using the existing card banner illustrations (from the F7 uniform illustration system or existing GRC T3 images) as visual anchors.

## Scope

### Files

| File | Change |
|------|--------|
| `_pages/grc.md` | Refactor the four perspective sections into card-structured content |
| `assets/css/components/grc.css` (or `article.css`) | Add card layout styles if not already covered by existing card classes |
| `_includes/card.html` or equivalent | May need a reusable card include if one doesn't exist |

### Existing resources to reuse

- Card banner illustrations already in `assets/images/banners/grc-t3-*.webp`
- Existing card CSS from benefit/frame articles (`.info-box`, `.benefit-card`, etc.)
- The `.framework-illustration` and `.section-illustration` CSS classes

### Card design

Each card should contain:

1. **Banner illustration** — Existing GRC T3 image at the top of the card
2. **Perspective title** — e.g. "Styringsperspektivet"
3. **Description** — 2–3 sentences on this GRC dimension
4. **Link to related article** — e.g. → `/struktur/` for strukturperspektivet
5. **Consistent card sizing** — Equal height within the grid

### Layout

- 2×2 grid on desktop (≥900px)
- 1-column stack on mobile
- Cards should have equal height using flexbox or grid
- Cards should use existing `--card-*` CSS variables for consistency

## Acceptance Criteria

- [ ] Four GRC perspectives presented as cards in a 2×2 grid
- [ ] Each card has a banner illustration
- [ ] Each card has title, description, and cross-link
- [ ] Responsive: 2×2 on desktop, single column on mobile
- [ ] Existing content (text, links, cross-references) preserved
- [ ] Dark mode verified on all cards
- [ ] No regression on other page layouts
- [ ] `npm run lint:css` passes
- [ ] `bundle exec jekyll build` exit 0
