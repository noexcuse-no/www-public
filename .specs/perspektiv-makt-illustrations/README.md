# Perspektiv & Makt — Section Illustrations

> **Backlog References:** R29
> **Created:** 2026-06-09
> **Status:** Done
> **Depends on:** F7 (Uniform Illustration System) — tier taxonomy, naming convention, CSS classes

## Problem / Goal

The Perspektiv and Makt articles have hero banners and some T2/T3 images, but many specific sections within these articles lack section-level (T3) or micro (T4) illustrations. The reader encounters large text blocks without visual breaks, making content harder to scan and less engaging.

Goal: Generate and add section illustrations for the listed Perspektiv and Makt sections, following the Uniform Illustration System (F7) with T3 section spots and T4 micro icons where appropriate.

### Perspektiv sections needing illustrations

| Section | Suggested Tier |
|---------|---------------|
| Samtidighet (multiframe simultaneity) | T3 |
| Diagnostisk disiplin | T3 |
| Praktisk multiframe-anvendelse | T3 |
| Hubbard (John Hubbard's influence) | T3 |
| Logan (David Logan's culture stages) | T3 |
| Pfeffer (Jeffrey Pfeffer's power dynamics) | T3 |
| Multi-dimensionalitet | T3 |
| Omorganisering | T3 |
| Fusjon | T3 |
| Krise | T3 |
| Eksplisitt multiframe-praksis | T3 |
| Rullerende perspektivskifte | T3 |
| Tverrfaglig integrasjon | T3 |
| Ledelse 60:2 som multiframe-praksis | T3 |

### Makt sections needing illustrations

| Section | Suggested Tier |
|---------|---------------|
| Prisen du betaler for makt | T3 |
| Spekteret — fra utvinning til balanse | T3 |

### Perspektiv "Hva multiframe thinking faktisk er" card images

The page section "/perspektiv/" under "Hva multiframe thinking faktisk er" displays cards for:
- Samtidighet
- Diagnostisk disiplin
- (and other topics listed above)

Each card needs a T4 micro illustration (80×80px) consistent with the card design system.

## Scope

### New files

| File Pattern | Count | Tier |
|---|---|---|
| `assets/images/banners/perspektiv-t3-{concept}.webp` | ~14 | T3 |
| `assets/images/banners/makt-t3-{concept}.webp` | ~2 | T3 |
| `assets/images/banners/perspektiv-t4-{concept}.webp` | ~14 | T4 (if card images needed) |
| `assets/images/banners/makt-t4-{concept}.webp` | ~2 | T4 (if card images needed) |

### Modified files

| File | Change |
|------|--------|
| `_pages/ledelse_perspektiv.md` | Add image references in markdown body for each section |
| `_pages/ledelse_makt.md` | Add image references in markdown body for each section |
| `.design/graphics.md` | Document generated images in the appropriate tables |

### Image style

- Follow Style 3 guidelines from `.design/graphics.md`: single concept, abstract/minimalist
- T3: ~400px wide, `max-width: 400px`, centered or floated using existing `.section-illustration` CSS
- T4 (if needed): ~80px square, using existing `.micro-illustration` CSS
- No text in any image (multilingual compatibility)
- Azure (#F0FFFF) accent on light/neutral backgrounds
- Monochrome scheme matching existing article illustrations
- WebP format, ≤80KB (T3) or ≤30KB (T4)

## Acceptance Criteria

- [ ] 14 T3 images generated for Perspektiv sections (one per section)
- [ ] 2 T3 images generated for Makt sections
- [ ] Images inserted into the correct position in `_pages/ledelse_perspektiv.md`
- [ ] Images inserted into the correct position in `_pages/ledelse_makt.md`
- [ ] T4 card images generated if the Perspektiv card system requires them
- [ ] All images use correct naming convention (`{page}-t3-{concept}.webp`)
- [ ] All images have descriptive `alt` attributes in Norwegian Bokmål
- [ ] Image style matches existing illustrations (Style 3)
- [ ] Dark mode contrast verified
- [ ] No text in any image
