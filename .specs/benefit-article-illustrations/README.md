# Benefit Article Illustrations — Feature Specification

> Created: 2026-06-01
> Status: Draft

## Problem / Goal

The four benefit articles (`/tillit/`, `/generativ-ki/`, `/usikkerhet/`, `/forankring/`) currently have hero banner images but **no spot illustrations in the article body**. The content is text-only after the hero, making long articles harder to scan and less visually engaging. The four frame articles (`/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`) already use section illustrations for hovedelementer and utfordringer — the benefit articles should have equivalent visual support.

Goal: Create 1 original spot illustration per benefit article (4 total) placed at a key transition point in the body to break up text, aid comprehension, and reinforce the article's core argument.

---

## Scope

### Files to create/modify

| File | Change |
|------|--------|
| `assets/images/banners/benefit-tillit-spot.webp` | New spot illustration for Tillit article |
| `assets/images/banners/benefit-genki-spot.webp` | New spot illustration for GenKI article |
| `assets/images/banners/benefit-usikkerhet-spot.webp` | New spot illustration for Usikkerhet article |
| `assets/images/banners/benefit-forankring-spot.webp` | New spot illustration for Forankring article |
| `_pages/ledelse_tillit.md` | Add spot illustration after the "Hvorfor tillit er ledelsens valuta" section |
| `_pages/ledelse_generativ-ki.md` | Add spot illustration after the "Organisasjonens rolle" section |
| `_pages/ledelse_usikkerhet.md` | Add spot illustration after the "Teateret i usikkerhet" section |
| `_pages/ledelse_forankring.md` | Add spot illustration after the introduction paragraph |
| `assets/css/benefit-illustrations.css` | New CSS module for benefit spot illustration styling (or add to existing module) |

### Files unchanged

- `_products/ledelse-60-2.md` — product frontmatter stays the same
- `_layouts/` — no layout changes
- Other CSS modules — benefit illustrations get their own styling or share patterns with `.frame-section img`
- `assets/images/banners/benefit-*.webp` — existing hero banners remain untouched

---

## Design Constraints

- **Style**: Use **Style 3: Section Illustrations** from `.design/graphics.md`:
  "Clean minimal infographic showing [subject], Scandinavian design style, [color] and white color palette, professional illustration, no text"
- **Dimensions**: Square or 4:3 aspect ratio, ≤800px width (inline, not full-width)
- **No text in images** — all images must be language-independent (multilingual site)
- **Alt text**: Required, descriptive Norwegian, no "Bilde av" prefix
- **Dark mode**: Test on both themes; use `var(--background-color)` for any background elements if applicable
- **File format**: WebP with lossy compression, target ≤100KB per image
- **Generation**: Use `/gpt-image-2-gen` skill via EvoLink API when generating; prompt must follow established Style 3 template

---

## Image Specifications

### 1. Tillit — "Hvorfor tillit er ledelsens valuta"

**Placement**: After the introductory section (after line 35 in `_pages/ledelse_tillit.md`), before "De fire pilarene for tillitsbasert ledelse"

**Subject**: Trust as currency — abstract figures in a supportive circle, hands reaching toward center, warm golden/blue tones suggesting psychological safety

**Frame color**: Azure blue (#003060) / warm accent

**Prompt direction**:
```
Clean minimal infographic showing a team in a supportive circle,
hands reaching toward center, symbols of trust like an open palm and a shield,
Scandinavian design style, azure blue and warm neutral color palette,
professional illustration, no text
```

### 2. GenKI — "Kultur som forutsetning for KI-adopsjon"

**Placement**: After the "Kultur som forutsetning for KI-adopsjon" section (added by B2), before "KI som maktspørsmål"

**Subject**: Cultural maturity stages for KI adoption — abstract figures at different levels, a bridge between individual and collaborative work

**Frame color**: Deep wine / warm neutral

**Prompt direction**:
```
Clean minimal infographic showing abstract figures at different levels,
a bridge connecting individual work to collaborative teamwork,
symbols of AI and data flow,
Scandinavian design style, deep wine and warm neutral color palette,
professional illustration, no text
```

### 3. Usikkerhet — "Teateret i usikkerhet"

**Placement**: After the "Teateret i usikkerhet" paragraph (added by B3), after "Hvorfor endring er så vanskelig" section

**Subject**: Theater metaphor — abstract stage with curtain partially drawn, one figure spotlighted, others in shadow, suggesting performed identity vs reality

**Frame color**: Navy blue (#2A4D6E) / muted amber

**Prompt direction**:
```
Clean minimal infographic showing a theater stage with abstract figures,
one figure in spotlight, others in shadow, curtain partially drawn,
symbolizing performed organizational identity vs reality,
Scandinavian design style, navy blue and muted amber color palette,
professional illustration, no text
```

### 4. Forankring — "Interesser som forankringens byggesteiner"

**Placement**: After the introductory paragraph on forankring (before dimension 1), or after the "Interesser som forankringens byggesteiner" subsection (added by B4)

**Subject**: Interest mapping — abstract figures around a table with visible idea bubbles/connections, suggesting diverse perspectives being aligned

**Frame color**: Hunter green (#355E3B) / cream

**Prompt direction**:
```
Clean minimal infographic showing abstract figures around a table,
connecting idea bubbles between different perspectives,
symbols of alignment and negotiation,
Scandinavian design style, hunter green and cream color palette,
professional illustration, no text
```

---

## Implementation Notes

### Image include pattern

Each spot illustration should be placed as an inline image within its `section`:

```html
<div class="benefit-illustration animate-on-scroll fade-in-up">
    <img src="{{ '/assets/images/banners/benefit-tillit-spot.webp' | relative_url }}"
         alt="Abstrakt figurativ skisse av en støttende sirkel som symboliserer tillit">
</div>
```

### CSS treatment

The `.benefit-illustration` class should:
- Center the image (`text-align: center` or `margin-inline: auto`)
- Apply max-width: 500px (not full-width — inline spot, not banner)
- Round corners (border-radius: var(--radius-lg))
- Add subtle box-shadow for depth
- Respect dark mode via CSS variables
- Be responsive: full width on mobile (≤599px)

### Animation

Use existing `animate-on-scroll fade-in-up` class for scroll-triggered entrance (consistent with other section elements).

---

## Acceptance Criteria

### Images
- [ ] 4 WebP images created, ≤100KB each
- [ ] All images are text-free (language independent)
- [ ] Images follow Style 3 (section illustration) design language
- [ ] Each image clearly communicates its article's core concept

### Placement & layout
- [ ] Each spot illustration placed at logical transition point in its article
- [ ] `.benefit-illustration` CSS renders centered, rounded, shadowed at ≤500px width
- [ ] No layout shift or overflow on any viewport width
- [ ] Mobile: images render at full container width with appropriate padding

### Accessibility
- [ ] All images have descriptive Norwegian alt text (no "Bilde av" prefix)
- [ ] Color contrast maintained in both light and dark mode
- [ ] No decorative-only images — each illustration adds comprehension value
- [ ] `animate-on-scroll fade-in-up` respects `prefers-reduced-motion`

### Quality
- [ ] Brand voice in alt text: descriptive, direct, no consultant-speak
- [ ] Images are visually consistent with frame article illustrations (same style family)
- [ ] `git diff` shows no changes outside specified files
- [ ] No HTML validation errors from new image elements

---

## Backlog References

| ID | Title | Status |
|----|-------|--------|
| R4 | Benefit article illustrations — 4 original infographic spot illustrations | Planned |

---

## Dependencies

- R4 is independent of all other BL items
- The frame illustration style guide (`.design/graphics.md` and `.specs/shared/frame-illustrations.md`) provides the established Style 3 template — no need to invent new illustration patterns
- B1-B4 (benefit frame integration) adds new content sections that serve as logical illustration placement points, but R4 does not depend on B1-B4 — can be implemented independently
