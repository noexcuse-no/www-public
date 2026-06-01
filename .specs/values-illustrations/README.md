# Values Illustrations — Feature Specification

> Created: 2026-06-01
> Status: Draft

## Problem / Goal

The Om Oss page (`/om-oss/`) displays three value cards (Ansvarlighet, Tillit, Ærlighet) under the "Våre verdier" section. Each card currently uses a plain CSS circle (`●`) as a placeholder icon via the `.value-icon` class in `about.css`. This is a visual gap — the value cards are the first brand statement a visitor sees about the company's principles, but they lack distinctive visual identity.

Goal: Create 3 original square spot illustrations to replace the placeholder `●` icons in the value cards, giving each value a unique and memorable visual representation consistent with the No Excuse brand.

---

## Scope

### Files to create/modify

| File | Change |
|------|--------|
| `assets/images/banners/verdi-ansvarlighet.webp` | New spot illustration for Ansvarlighet |
| `assets/images/banners/verdi-tillit.webp` | New spot illustration for Tillit |
| `assets/images/banners/verdi-ærlighet.webp` | New spot illustration for Ærlighet |
| `_pages/om_oss.md` | Replace `●` span with `<img>` tag referencing the illustration in each `.value-card` |
| `assets/css/about.css` | Update `.value-icon` to handle image elements (width/height, border-radius, object-fit) in addition to the current inline-span style; or add `.value-icon-img` class |

### Files unchanged

- `.value-card` layout — grid structure, padding, hover effects remain as-is
- Other `_pages/*` — no changes to other pages
- Other sections of `about.css` — no changes to `.about-story`, `.about-cta`, etc.
- `_layouts/` — no layout changes

---

## Design Constraints

- **Style**: Use **Spot Illustrations (Square — Style 3 variant)** from `.design/graphics.md`:
  "Clean minimal infographic showing [subject], Scandinavian design style, [value color palette], professional illustration, no text"
- **Format**: Square (1:1 aspect ratio), WebP, ≤80KB per image
- **No text in images** — must be language-independent
- **Alt text**: Required, descriptive Norwegian, no "Bilde av" prefix
- **Dark mode**: Test on both themes; illustration backgrounds should work on both light and dark card backgrounds
- **File naming**: `verdi-<kebab-case>.webp` pattern consistent with existing image conventions
- **Size**: Display at ~60×60px inside the value card (larger than current 40×40px circle)
- **Generation**: Use `/gpt-image-2-gen` skill via EvoLink API when generating

---

## Image Specifications

### 1. Ansvarlighet (Responsibility)

**Card text**: "Vi får frem styrkene som ligger i ansvarlig og tillitsbasert ledelse"

**Subject**: A person holding a compass or steering wheel — symbolizing taking ownership and direction-setting. Or: interlocking hands/shapes forming a stable structure.

**Color palette**: Azure blue (#003060) / white — clean and authoritative

**Prompt direction**:
```
Clean minimal infographic showing responsibility and ownership,
a person figure holding a compass, interlocking elements forming a stable foundation,
Scandinavian design style, azure blue and white color palette,
professional illustration, no text
```

### 2. Tillit (Trust)

**Card text**: "Vårt mål er å gjøre organisasjoner mer bærekraftige ved å styrke tillitsgrunnlaget"

**Subject**: An open hand or two hands meeting in a handshake/trust gesture. Or: a bridge with abstract figures — symbolizing the foundation trust provides.

**Color palette**: Warm neutral / muted amber + white

**Prompt direction**:
```
Clean minimal infographic showing trust as a foundation,
open palms and a bridge symbol, abstract figures connected by a line of trust,
Scandinavian design style, warm amber and white color palette,
professional illustration, no text
```

### 3. Ærlighet (Honesty)

**Card text**: "Våre metoder fokuserer på mennesker, vektlegger ærlighet og produserer målbare resultater"

**Subject**: A transparent glass-like shape or a figure speaking with an open posture. Or: a clear lens focusing light into measurable results — symbolizing clarity and transparency.

**Color palette**: Cool gray / white with a teal accent

**Prompt direction**:
```
Clean minimal infographic showing honesty and transparency,
a clear lens focusing light, an abstract figure with open posture,
symbols of clarity and measurable results,
Scandinavian design style, cool gray and teal accent color palette,
professional illustration, no text
```

---

## Implementation Notes

### HTML change in `_pages/om_oss.md`

Each `.value-card` currently contains:
```html
<span class="value-icon" aria-hidden="true">●</span>
```

Replace with:
```html
<img class="value-icon" src="{{ '/assets/images/banners/verdi-ansvarlighet.webp' | relative_url }}"
     alt="" aria-hidden="true" width="60" height="60">
```

Using `aria-hidden="true"` since the illustration is decorative — the card heading and text convey the meaning. The `alt=""` (empty alt) is correct per WCAG for decorative images.

### CSS change in `assets/css/about.css`

Update `.value-icon` to handle `<img>` elements:

```css
.value-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-md);
    object-fit: cover;
    display: block;
    margin: 0 auto 12px auto;
}
```

The current `display: inline-flex` + `background` + `color` rules for the `●` span can be kept or removed — illustrations replace the placeholder entirely.

### Placement

The three value cards are already in a 3-column grid (→ 1-column on mobile). The illustrations sit at the top of each card, above the heading. No layout restructuring needed.

---

## Acceptance Criteria

### Images
- [ ] 3 WebP images created, ≤80KB each, square 1:1
- [ ] All images are text-free (language independent)
- [ ] Images follow the Spot Illustration (Style 3 variant) design language
- [ ] Each image clearly communicates its value concept

### Layout & styling
- [ ] Each image replaces the `●` placeholder in its value card
- [ ] Images render at 60×60px with rounded corners and consistent spacing
- [ ] Three-card grid layout remains intact (3 columns desktop, 1 column mobile)
- [ ] No layout shift or overflow at any viewport width
- [ ] Dark mode tested — images look correct on both card background variants

### Accessibility
- [ ] All images have `aria-hidden="true"` (decorative — value text conveys meaning)
- [ ] Empty alt text (`alt=""`) per WCAG for decorative images
- [ ] No color-dependent information — images are purely illustrative

### Quality
- [ ] Illustrations are consistent with the brand's Scandinavian minimal style
- [ ] Colors harmonize with the existing Om Oss page palette
- [ ] `git diff` shows no changes outside specified files
- [ ] No HTML validation errors

---

## Backlog References

| ID | Title | Status |
|----|-------|--------|
| R15 | Values illustrations — 3 original value card illustrations for Om Oss | Planned |

---

## Dependencies

- None — this is a self-contained visual enhancement of the Om Oss page
- The spot illustration style is documented in `.design/graphics.md` (Spot Illustrations — Square Style 3 variant) — ready reference for prompt generation
- No dependency on any other BL item
