# Benefit Article Illustrations — Feature Specification

> Created: 2026-06-01
> Status: Ready
> Scope: Expanded from 4 to 52 images via uniform 4-tier system

## Problem / Goal

The four benefit articles (`/tillit/`, `/generativ-ki/`, `/usikkerhet/`, `/forankring/`) currently have hero banner images but **no spot illustrations in the article body**. The content is text-only after the hero, making long articles harder to scan and less visually engaging. The four frame articles (`/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`) already use section illustrations for hovedelementer and utfordringer — the benefit articles should have equivalent visual support.

Goal: Apply the **Uniform Illustration System** (see `.specs/illustration-system/README.md`) to create 52 images across all four benefit articles: T2 framework overviews, T3 section spots for individual elements, and T4 micro icons for challenge cards.

## System Reference

This spec follows the **4-tier taxonomy** defined in `.specs/illustration-system/README.md`:
- **T2 (Framework)**: ~800px, multi-element models
- **T3 (Section)**: ~400px, individual concepts
- **T4 (Micro)**: ~80px, challenge card icons

---

## Scope

### Files to create/modify

**Tillit (9 images)**
| File | Tier | Change |
|------|------|--------|
| `assets/images/banners/tillit-t2-four-pillars.webp` | T2 | Framework overview of 4 pillars |
| `assets/images/banners/tillit-t3-psychological-safety.webp` | T3 | Psychological safety spot |
| `assets/images/banners/tillit-t3-servant-leadership.webp` | T3 | Servant leadership spot |
| `assets/images/banners/tillit-t3-trust-system.webp` | T3 | Trust as system spot |
| `assets/images/banners/tillit-t3-autonomy.webp` | T3 | Autonomy as driver spot |
| `assets/images/banners/tillit-t4-hierarchical-blindness.webp` | T4 | Challenge: hierarchical blindness |
| `assets/images/banners/tillit-t4-info-asymmetry.webp` | T4 | Challenge: information asymmetry |
| `assets/images/banners/tillit-t4-historical-baggage.webp` | T4 | Challenge: historical baggage |
| `assets/images/banners/tillit-t4-inconsistent-followup.webp` | T4 | Challenge: inconsistent follow-up |
| `_pages/ledelse_tillit.md` | — | Add T2 after intro, T3 in each info-box, T4 in challenge cards |

**GenKI (13 images)**
| File | Tier | Change |
|------|------|--------|
| `assets/images/banners/genki-t2-four-competencies.webp` | T2 | Framework overview |
| `assets/images/banners/genki-t3-question-formulation.webp` | T3 | Formulate questions |
| `assets/images/banners/genki-t3-critical-evaluation.webp` | T3 | Evaluate output critically |
| `assets/images/banners/genki-t3-human-integration.webp` | T3 | Integrate in human processes |
| `assets/images/banners/genki-t3-accountability.webp` | T3 | Maintain accountability |
| `assets/images/banners/genki-t3-epistemic-humility.webp` | T3 | Epistemic humility |
| `assets/images/banners/genki-t3-precision.webp` | T3 | Precision of intention |
| `assets/images/banners/genki-t3-iteration.webp` | T3 | Iterative improvement |
| `assets/images/banners/genki-t3-calibration.webp` | T3 | Calibration |
| `assets/images/banners/genki-t4-no-human-review.webp` | T4 | Red flag: no human review |
| `assets/images/banners/genki-t4-ki-said-it.webp` | T4 | Red flag: "KI said it" |
| `assets/images/banners/genki-t4-quantity-over-quality.webp` | T4 | Red flag: quantity over quality |
| `assets/images/banners/genki-t4-faster-less-accurate.webp` | T4 | Red flag: faster but less accurate |
| `_pages/ledelse_generativ-ki.md` | — | Add T2 after intro, T3 in each info-box, T4 in red flag cards |

**Usikkerhet (20 images)**
| File | Tier | Change |
|------|------|--------|
| `assets/images/banners/usikkerhet-t2-logan-stages.webp` | T2 | Logan 5 stages as ladder |
| `assets/images/banners/usikkerhet-t2-kotter-steps.webp` | T2 | Kotter 8 steps as flow |
| `assets/images/banners/usikkerhet-t3-stage-1.webp` | T3 | Stage 1: "Livet suger" |
| `assets/images/banners/usikkerhet-t3-stage-2.webp` | T3 | Stage 2: "Mitt liv suger" |
| `assets/images/banners/usikkerhet-t3-stage-3.webp` | T3 | Stage 3: "Jeg er great" |
| `assets/images/banners/usikkerhet-t3-stage-4.webp` | T3 | Stage 4: "Vi er great" |
| `assets/images/banners/usikkerhet-t3-stage-5.webp` | T3 | Stage 5: "Livet er great" |
| `assets/images/banners/usikkerhet-t3-kotter-1.webp` | T3 | Kotter step 1 |
| ... | ... | ... (steps 2–8 follow same pattern) |
| `assets/images/banners/usikkerhet-t4-values-practice-mismatch.webp` | T4 | Challenge: values/practice mismatch |
| `assets/images/banners/usikkerhet-t4-tacit-knowledge.webp` | T4 | Challenge: tacit knowledge |
| `assets/images/banners/usikkerhet-t4-silo-thinking.webp` | T4 | Challenge: silo thinking |
| `assets/images/banners/usikkerhet-t4-always-done-this-way.webp` | T4 | Challenge: "always done this way" |
| `assets/images/banners/usikkerhet-t4-structural-uncertainty.webp` | T4 | Challenge: structural uncertainty |
| `_pages/ledelse_usikkerhet.md` | — | Add T2 frameworks, T3 in each stage/step, T4 in challenge cards |

**Forankring (10 images)**
| File | Tier | Change |
|------|------|--------|
| `assets/images/banners/forankring-t2-five-dimensions.webp` | T2 | Framework overview |
| `assets/images/banners/forankring-t3-formal-vs-real-power.webp` | T3 | Dimension 1 |
| `assets/images/banners/forankring-t3-interests.webp` | T3 | Dimension 2 |
| `assets/images/banners/forankring-t3-bias.webp` | T3 | Dimension 3 |
| `assets/images/banners/forankring-t3-conflict.webp` | T3 | Dimension 4 |
| `assets/images/banners/forankring-t3-culture.webp` | T3 | Dimension 5 |
| `assets/images/banners/forankring-t4-confirmation.webp` | T4 | Fallacy: confirmation bias |
| `assets/images/banners/forankring-t4-anchoring.webp` | T4 | Fallacy: anchoring |
| `assets/images/banners/forankring-t4-sunk-cost.webp` | T4 | Fallacy: sunk cost |
| `assets/images/banners/forankring-t4-overconfidence.webp` | T4 | Fallacy: overconfidence |
| `_pages/ledelse_forankring.md` | — | Add T2 after intro, T3 in each info-box, T4 in fallacy cards |

**CSS**
| File | Change |
|------|--------|
| `assets/css/illustrations.css` | New CSS module for T2/T3/T4 styling (follows `.specs/illustration-system`) |

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
