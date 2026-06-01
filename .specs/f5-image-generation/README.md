# F5 — Image Generation for N1-N3 Articles

> Created: 2026-06-01
> Status: In Progress

## Problem / Goal

The three completed articles N1 (Triader), N2 (Makt), and N3 (Perspektiv) reference hero banner images that do not yet exist:

| Article | Image File | Alt Text | Status |
|---------|-----------|----------|--------|
| N1 — Triader | `assets/images/banners/hero-triade.webp` | "Abstrakt geometrisk illustrasjon av tre sammenkoblede noder" | ❌ Missing |
| N2 — Makt | `assets/images/banners/hero-makt.webp` | "Makt eller tjeneste — balansen i ledergruppen" | ❌ Missing |
| N3 — Perspektiv | `assets/images/banners/hero-perspektiv.webp` | "Abstrakt illustrasjon av fire overlappende linser — et prisme som splitter lys" | ❌ Missing |

These hero images are displayed at **full viewport height** (`100vh`) and require **4K resolution** (3840×2160px minimum) to avoid pixelation on retina, 4K, and ultrawide displays. See updated `.specs/image-optimization/README.md` and `.design/graphics.md` for the 4K requirement.

## Scope

- Generate 3 hero banner images in **Style 2: Professional Abstract** (`.design/graphics.md`)
- All images: 16:9 horizontal format, minimum 3840×2160px, no text
- Save originals to `.design/graphics/originals/`
- Convert to WebP with `magick mogrify -resize 3840x2160> -quality 85 -format webp`
- Update `.design/graphics.md` with documented prompts

## Prompts

### N1 — hero-triade.webp

```
Professional abstract illustration for leadership article about triangular
relationships and team dynamics, clean minimal Scandinavian style, showing
three interlocking geometric nodes connected by flowing lines suggesting
resilience and structural stability, azure blue (#F0FFFF) and neutral gray
tones, clean white background, symbolic imagery only, no text, 16:9
horizontal format, high resolution 4K
```

**Alt text (Norwegian):** "Abstrakt geometrisk illustrasjon av tre sammenkoblede noder"

### N2 — hero-makt.webp

```
Professional abstract illustration for leadership article about power and
service balance, clean minimal Scandinavian style, showing two opposing
forces in dynamic equilibrium — a structured geometric form and an open
welcoming form balanced on a central axis, azure blue (#F0FFFF) and
neutral gray tones, clean white background, symbolic imagery only, no
text, 16:9 horizontal format, high resolution 4K
```

**Alt text (Norwegian):** "Makt eller tjeneste — balansen i ledergruppen"

### N3 — hero-perspektiv.webp

```
Professional abstract illustration for leadership article about multiframe
thinking and multiple perspectives, clean minimal Scandinavian style,
showing four overlapping transparent geometric lenses or prisms splitting
a single beam of light into multiple paths, azure blue (#F0FFFF) and
neutral gray tones, clean white background, symbolic imagery only, no
text, 16:9 horizontal format, high resolution 4K
```

**Alt text (Norwegian):** "Abstrakt illustrasjon av fire overlappende linser — et prisme som splitter lys"

## Color Palette

All three images use the site-wide azure accent:
- **Azure:** `#F0FFFF` (primary accent)
- **Background:** `#e2e8f0` or clean white
- **Secondary:** `#37474f` (muted shapes)

## Generation Tool

Use an external image generation service (e.g., DALL-E 3, Midjourney, Stable Diffusion) with the above prompts. Ensure output is at least 3840×2160px.

## Acceptance Criteria

- [ ] `hero-triade.webp` exists at `assets/images/banners/` (3840×2160 or larger)
- [ ] `hero-makt.webp` exists at `assets/images/banners/` (3840×2160 or larger)
- [ ] `hero-perspektiv.webp` exists at `assets/images/banners/` (3840×2160 or larger)
- [ ] Original PNG/source files copied to `.design/graphics/originals/`
- [ ] All WebP files ≤ 500KB (target: balance quality vs file size)
- [ ] Prompts documented in `.design/graphics.md` under Style 2
- [ ] `npm run lint` passes with no broken image references
- [ ] N1-N3 articles render without missing image errors

## Dependencies

- `.design/graphics.md` — Style 2 template and color guidelines
- `.specs/image-optimization/README.md` — 4K resolution requirement
- ImageMagick (`magick`) for WebP conversion

## Related

- N4-N7 spot illustrations (16 images, Style 3 variant) — separate backlog items
