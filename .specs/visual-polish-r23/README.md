# Visual Polish Pass — R23 Specification

## Purpose

Eliminate visual inconsistencies, polish card/CTA interactions, and improve layout fidelity across all site pages. This is a pure CSS/content refinement pass — no new features, no new pages.

## Scope

9 task groups across 15+ files. Each group is independent and can be implemented in any order.

---

## R23.1 — Card Hover Shift Removal

### Problem

All card-type elements (`info-box`, `challenge-card`, `perspektiv-element`, `perspektiv-challenge`, `card`, `profile-compact`) lift on hover via `transform: translateY()`. This creates a restless UI where everything moves on hover. The semantic rule: **cards are containers — they don't move. CTAs are actions — they do.**

### Files

| File | Selectors to change |
|------|-------------------|
| `assets/css/profiles.css` | `.profile-compact:hover` — remove `transform: translateY(-4px)` |
| `assets/css/article.css` | `.perspektiv-element:hover`, `.frame-element:hover`, `.info-box:hover` — remove `transform: translateY(-2px)` |
| `assets/css/article.css` | `.perspektiv-challenge:hover`, `.frame-challenge:hover`, `.challenge-card:hover` — remove `transform: translateY(-4px)` |
| `assets/css/perspektiv-styles.css` | `.perspektiv-element:hover` — remove `transform: translateY(-2px)` |
| `assets/css/perspektiv-styles.css` | `.perspektiv-challenge:hover` — remove `transform: translateY(-3px)` |
| `assets/css/components/card.css` | `.card:hover` — remove `transform: translateY(-2px)` |
| `assets/css/article.css` | `.tag-cloud-item:hover` — remove `transform: translateY(-2px)` |

### Keep (exempt — these are CTA/action elements)

- `.profile-contact-btn:hover` — `translateY(-1px)`
- `.profile-booking-btn:hover` — `translateY(-2px)`
- `.profile-contact-item:hover` — `translateY(-1px)`
- `.card-link:hover` — no transform (already clean)
- `.hero-frame-link:hover` — `translateY(-2px)`
- `.product-cta:hover` / CTA button transforms (various)
- `.profile-image:hover` — `scale(1.05)` (image-only, not card)

### Acceptance

- No card/box element lifts on hover
- All CTA/action elements still lift on hover
- Hover shadows remain on cards (visual feedback without movement)

---

## R23.2 — Profile Person Title

### Problem

Profile compact cards show name and contact info but no job title. The title exists in profile page frontmatter (`person_title`) but is not rendered in the card.

### Files

| File | Change |
|------|--------|
| `_includes/profiles.html` | Add `<p class="profile-person-title">{{ profile.person_title }}</p>` after `.profile-name` |
| `assets/css/profiles.css` | Add `.profile-person-title` styling: smaller font, muted color, margin |

### Styling

```css
.profile-person-title {
    font-size: 0.9em;
    opacity: 0.7;
    margin: -8px 0 16px 0;
}
```

### Profile frontmatter check

Profile pages at `_pages/` with class: profile should have `person_title:` field. Check current profiles:
- Rasmus Olsen — add `person_title: "Daglig leder"` (or existing title)
- Other profiles — add as available

### Acceptance

- Person title appears below name in compact card
- Styled subdued (smaller, muted)
- No layout shift when field is missing (use `{% if profile.person_title %}` guard)

---

## R23.3 — Profile Image White Background

### Problem

Profile images with transparent PNG backgrounds show the page background through them, which can look messy against varied page sections.

### Files

| File | Change |
|------|--------|
| `assets/css/profiles.css` | Add `background: #fff` to `.profile-image` and `.profile-image-large` |

### Acceptance

- Profile images have solid white circle background
- Images in dark mode also have white background (keep `#fff` regardless of theme — it's a photo background)

---

## R23.4 — Mennesker "tre" → "fire" Hovedelementer

### Problem

Mennesker page has 4 elements but the layout hardcodes "De tre hovedelementene". Additionally, the 4th element (Verdier og mening) lacks a `spot_image`.

### Files

| File | Change |
|------|--------|
| `_layouts/perspektiv.html` | Line 72: Change `<h2>De tre hovedelementene</h2>` to `<h2>De {{ frame.elements | size }} hovedelementene</h2>` |
| `_layouts/perspektiv.html` | Update `alt_hoved` texts: remove hardcoded "tre" — use "hovedelementene" without number, or `alt="{{ frame.elements | size }} hovedelementer i {{ frame.frame_id }}perspektivet"` |
| `_pages/mennesker.md` | Add `spot_image` to 4th element (Verdier og mening) — generate new spot illustration |

### Illustration needed

- `spot-mennesker-verdier-og-mening.webp` — T4 micro (80×80px) matching existing Mennesker spot style
- Prompt: Infographic spot illustration, abstract Scandinavian minimal style, golden yellow (#D4A836) and deep blue (#003060) palette, representing values and meaning — a compass or north star symbol, clean lines, flat design, no text

### Acceptance

- Mennesker heading reads "De fire hovedelementene"
- Mennesker alt texts say "fire" (not "tre")
- 4th element has spot illustration matching existing style
- Other frame pages still read "De tre hovedelementene"

---

## R23.5 — Avtale Micro-Illustration Reposition

### Problem

Avtale section micro-illustrations sit inside `.avtale-section-header` as a flex row before the heading. This places them visually in front of the title, which interrupts the reading flow. They should be right-aligned inline with the paragraph text instead.

### Current structure

```html
<div class="avtale-section-header">
    <img class="micro-illustration" ...>
    <h2>§1...</h2>
</div>
```

### Target structure

```html
<div class="avtale-section-header">
    <h2>§1...</h2>
</div>
<img class="micro-illustration avtale-micro" ...>
<p>§1.1 ...</p>
```

### Files

| File | Change |
|------|--------|
| `_pages/om_avtale.md` | Move each `<img class="micro-illustration">` out of `.avtale-section-header` to after the `</h2>`, before the first `<p>`. Add class `avtale-micro` |
| `assets/css/avtale.css` | Add `.avtale-micro` styling: `float: right; width: 48px; height: 48px; margin: 4px 0 8px 12px;` |

### Acceptance

- Micro-illustrations appear to the right of paragraph text, not in front of headings
- Layout works on mobile (float clears on narrow screens)
- Dark mode: no issues

---

## R23.6 — Perspektiv Card Overflow Fix

### Problem

Perspektiv article (`_pages/ledelse_perspektiv.md`) uses `.info-box` with floating section illustrations (`section-illustration--float-left`, `section-illustration--float-right`). On narrow viewports or with long content, card content can overflow the box boundaries.

### Files

| File | Change |
|------|--------|
| `assets/css/article.css` | Add `overflow: hidden` to `.info-box` (or use `display: flow-root` for clearfix) |

### Alternative

Use `display: flow-root` on `.info-box` which creates a new BFC and contains floats without the clipping risk of `overflow: hidden`.

### Acceptance

- Cards with floating illustrations contain their content properly
- No content clips outside card boundaries
- Floats still work as expected (text wraps images)
- Mobile: images clear floats and stack correctly

---

## R23.7 — GRC Page Inline Style Extraction

### Problem

`_pages/grc.md` contains a `<style>` block (50+ lines) defining `.grc-table` and `.cta-box` styles. Per project conventions, inline `<style>` blocks are prohibited — all CSS must live in dedicated files.

### Files

| File | Change |
|------|--------|
| `_pages/grc.md` | Remove `<style>...</style>` block (lines 207-261) |
| `assets/css/products.css` or new `assets/css/grc.css` | Add extracted styles: `.grc-table`, `.cta-box`, dark mode variants, mobile variants |
| `_layouts/page.html` or `_includes/styles.html` | Link new CSS file if separate; check if `products.css` is already loaded on article pages |

### Which CSS file?

Check which CSS files are loaded on article-class pages. The GRC page uses `class: article` layout pattern. If `article.css` or `products.css` is already loaded, add styles there. If neither, create `grc.css` and add to `_includes/styles.html`.

### Acceptance

- No `<style>` block in `_pages/grc.md`
- `.grc-table` and `.cta-box` render identically before/after extraction
- Dark mode variants preserved

---

## R23.8 — GRC Perspective Card Enhancement

### Problem

GRC page has 4 perspective `<div class="info-box">` sections that are plain text boxes. They should be visually enhanced with frame-accent colors (like the frame cards on `/perspektiv/` and `/metode/`) and include CTAs linking to each frame page.

### Files

| File | Change |
|------|--------|
| `_pages/grc.md` | Add frame accent colors and style hooks to the 4 perspective info-boxes: Struktur, Mennesker, Påvirkning, Identitet |
| `assets/css/article.css` or `assets/css/grc.css` | Add `.info-box--frame-{struktur,mennesker,pavirkning,identitet}` variants with colored left borders |

### Frame colors

| Frame | Color | CSS value |
|-------|-------|-----------|
| Struktur | Navy | `#2A4D6E` |
| Mennesker | Golden yellow | `#D4A836` |
| Påvirkning | Hunter green | `#355E3B` |
| Identitet | Deep wine | `#8E0D3C` |

### Implementation

Option A (lightweight): Add `style="--card-accent: #XXXXXX"` to each `.info-box` and use `border-left-color: var(--card-accent)` via CSS.

Option B (structured): Create CSS classes `.info-box--frame-struktur`, etc., each setting `border-left-color` to the frame color.

Prefer Option A for minimal diff.

### Also add

Each perspective card should include a "Les mer i [perspektiv] →" link at the bottom, styled as `card-link`. Some already have this as inline text links — elevate to a button/link element.

BTW, the Påvirkning card is missing its frame link — add one.

### Acceptance

- 4 perspective boxes have colored left borders matching frame colors
- Each box has a visible CTA/link to its frame page
- Påvirkning card has its missing frame link
- Dark mode: colors should remain visible (use `!important` on border-color or ensure dark mode doesn't override)

---

## R23.9 — Tag Cloud Item Hover Cleanup

### Problem

`.tag-cloud-item` on the emne landing page lifts on hover. This is a navigation element, not a CTA — it should not move.

### Files

| File | Change |
|------|--------|
| `assets/css/article.css` | `.tag-cloud-item:hover` — remove `transform: translateY(-2px)` |

### Acceptance

- Tag cloud items don't lift on hover
- Box-shadow change on hover remains (subtle feedback)

---

## Dependencies

- R23.4 (Mennesker 4th illustration) requires image generation before implementation
- All other groups are independent

## Priorities

1. R23.1 (card hover) — lowest risk, highest visual impact
2. R23.2 + R23.3 (profile improvements) — simple, visible
3. R23.4 (Mennesker fix) — content accuracy
4. R23.6 (overflow fix) — prevents layout bugs
5. R23.7 (inline style extraction) — code quality
6. R23.5 (avtale reposition) — layout refinement
7. R23.8 (GRC cards) — visual enhancement
8. R23.9 (tag cloud) — minor cleanup

## Backlog References

R23.1 through R23.9 — Visual Polish Pass
