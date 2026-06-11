# Visual Polish Pass — R23 Design Decisions

## Principle

Cards are containers — they frame content, they don't move. CTAs are actions — they respond with movement. This semantic distinction drives all hover interaction changes.

---

## R23.1 — Card Hover: Transform Removal

### Before/After

**profiles.css — `.profile-compact:hover`:**
```css
/* Before */
.profile-compact:hover {
    transform: translateY(-4px);
    box-shadow: var(--box-shadow-hover-light);
}
/* After */
.profile-compact:hover {
    box-shadow: var(--box-shadow-hover-light);
}
```

**article.css — `.info-box:hover`, `.perspektiv-element:hover`, `.frame-element:hover`:**
```css
/* Before */
.info-box:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
/* After */
.info-box:hover {
    box-shadow: var(--shadow-md);
}
```

**article.css — `.challenge-card:hover`, `.perspektiv-challenge:hover`, `.frame-challenge:hover`:**
```css
/* Before */
.challenge-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}
/* After */
.challenge-card:hover {
    box-shadow: var(--shadow-lg);
}
```

**perspektiv-styles.css — `.perspektiv-element:hover`:**
```css
/* Before */
.perspektiv-element:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
/* After */
.perspektiv-element:hover {
    box-shadow: var(--shadow-md);
}
```

**perspektiv-styles.css — `.perspektiv-challenge:hover`:**
```css
/* Before */
.perspektiv-challenge:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
}
/* After */
.perspektiv-challenge:hover {
    box-shadow: var(--shadow-md);
}
```

**card.css — `.card:hover`:**
```css
/* Before */
.card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}
/* After */
.card:hover {
    box-shadow: var(--shadow-lg);
}
```

**article.css — `.tag-cloud-item:hover`:**
```css
/* Before */
.tag-cloud-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
/* After */
.tag-cloud-item:hover {
    box-shadow: var(--shadow-md);
}
```

### Rationale

Consistent visual feedback (shadow depth) without motion. Users still get "this is interactive" signals, but the page doesn't feel jumpy. CTA buttons retain their lift as they represent intentional actions.

### Dark mode

All hover shadows already have dark mode counterparts via CSS variable theming — no additional changes needed.

---

## R23.2 — Profile Person Title

### Structure

Insert after `.profile-name` inside `.profile-compact`:
```html
{% if profile.person_title %}
<p class="profile-person-title">{{ profile.person_title }}</p>
{% endif %}
```

### CSS

```css
.profile-person-title {
    font-size: 0.9em;
    opacity: 0.7;
    margin: -8px 0 16px 0;
}
```

The negative top margin pulls the title closer to the name (compensating for `.profile-name` having `margin: 0 0 12px 0`). The `16px` bottom margin matches the spacing of the original layout.

### Profile frontmatter

Profile pages should have `person_title:` in frontmatter. This is a data addition, not a layout change. If a profile lacks the field, the `{% if %}` guard prevents rendering.

---

## R23.3 — Profile Image White Background

### CSS change

```css
.profile-image,
.profile-image-large {
    background: #fff;
}
```

This is intentionally hardcoded `#fff` (not a CSS variable) because:
1. Profile photos sit on a white background regardless of theme
2. The white circle behind the circular crop is a universal photo convention
3. Dark mode would make photos look weird with a dark circle behind them

---

## R23.4 — Mennesker Dynamic Element Count

### Layout change

`_layouts/perspektiv.html` line 72:
```html
<!-- Before -->
<h2>De tre hovedelementene</h2>
<!-- After -->
<h2>De {{ frame.elements | size }} hovedelementene</h2>
```

### Alt text change

The `alt_hoved` variable is built per-frame. Instead of hardcoding "tre", use:
```
{% assign antall_elementer = frame.elements | size %}
{% assign alt_hoved = "Illustrasjon av de " | append: antall_elementer | append: " hovedelementene i " | append: frame.frame_id | append: "perspektivet" %}
```

Actually, cleaner approach: just set `alt_hoved` per frame as before but use the dynamic count. For frames with 3 elements it says "tre", for Mennesker with 4 it says "fire". But Liquid doesn't have a built-in number-to-word filter.

Alternative: write `alt="Illustrasjon av {{ frame.elements | size }} hovedelementer i {{ frame.frame_id }}perspektivet"` — using the numeral is fine since this is an `alt` attribute (accessibility), not visible text.

For the visible heading, still use the numeral: "De 4 hovedelementene" reads fine in Norwegian.

### New illustration needed

The 4th Mennesker element (Verdier og mening) needs a spot image matching the existing 3:
- File: `assets/images/banners/spot-mennesker-verdier-og-mening.webp`
- Style: T4 micro (80×80px), abstract Scandinavian minimal, golden yellow (#D4A836) and deep blue (#003060)
- Subject: A compass or north star — values and meaning
- Generated via EvoLink GPT Image 2 at 1024×1024 → sharp resize to 80×80px WebP at quality 85

---

## R23.5 — Avtale Micro-Illustrations

### Markup change

Move `<img>` from inside `.avtale-section-header` to between the header and the first paragraph:

```html
<!-- Before -->
<div class="avtale-section-header">
    <img src="..." class="micro-illustration" ...>
    <h2>§1...</h2>
</div>
<p>§1.1 ...</p>

<!-- After -->
<div class="avtale-section-header">
    <h2>§1...</h2>
</div>
<img src="..." class="micro-illustration avtale-micro" ... loading="lazy" aria-hidden="true">
<p>§1.1 ...</p>
```

### CSS

```css
.avtale-micro {
    float: right;
    width: 48px;
    height: 48px;
    margin: 4px 0 8px 12px;
}
```

The micro-illustration sits to the right of the paragraph text, visually balancing the section heading. On mobile (via existing `@media` rules or the natural float-clearing at viewport edges), the image stacks above or inline with the text.

---

## R23.6 — Perspektiv Overflow Fix

### CSS

```css
.perspektiv-element,
.frame-element,
.info-box {
    display: flow-root; /* creates new BFC, contains floats without overflow:hidden side effects */
}
```

Using `display: flow-root` instead of `overflow: hidden` because:
- `overflow: hidden` can clip shadows, dropdowns, or absolutely-positioned children
- `flow-root` creates a new Block Formatting Context without clipping
- Wide browser support (Chrome 58+, Firefox 53+, Safari 13+)

### Note

The `transition` property already set on these elements works fine with `display: flow-root` — no animation disruption.

---

## R23.7 — GRC Inline Style Extraction

### Target file

The GRC page loads `article.css` (via `class: article` → `_layouts/page.html` → `_includes/styles.html`). Add the extracted styles to `article.css` since `.grc-table` and `.cta-box` are GRC-page-specific variants of existing patterns (`.cta-box` is an `.info-box` variant).

### Extraction scope

Move lines 207-261 from `_pages/grc.md` (the `<style>` block) into `assets/css/article.css`, wrapping in a `.grc-table` section appended at the end of the file. Also add a `.cta-box` section near the existing `.info-box` styles.

---

## R23.8 — GRC Perspective Cards

### Approach

The 4 perspective `.info-box` sections on the GRC page get colored left borders matching frame colors. We use the existing `--card-accent` pattern via inline style:

```html
<div class="info-box animate-on-scroll fade-in-up" style="--card-accent: #2A4D6E; border-left-color: var(--card-accent);">
```

### Frame accent values

| Frame | Accent color |
|-------|-------------|
| Struktur | `#2A4D6E` |
| Mennesker | `#D4A836` |
| Påvirkning | `#355E3B` |
| Identitet | `#8E0D3C` |

### CTA links

Each card already has some link text — standardize to a visible button/link pattern at the bottom of each card. The Struktur and Påvirkning cards have links; Mennesker and Identitet need links added.

Use existing `.card-link` pattern or simple `<a href>` with `class="card-link"`:

```html
<a href="/struktur/" class="card-link">Les mer i strukturperspektivet →</a>
```

---

## R23.9 — Tag Cloud Hover

### CSS change

Same pattern as R23.1 — remove `transform: translateY(-2px)` from `.tag-cloud-item:hover`:

```css
.tag-cloud-item:hover {
    box-shadow: var(--shadow-md);
    text-decoration: none;
}
```

---

## Summary of CSS Changes by File

| File | Changes |
|------|---------|
| `assets/css/profiles.css` | Remove hover transform from `.profile-compact`; add `.profile-person-title` styles; add white bg to profile images |
| `assets/css/article.css` | Remove hover transforms from `.info-box`, `.challenge-card`, `.perspektiv-*`, `.frame-*`; add `display: flow-root` to infoboxes; add `grc-table` styles; add tag cloud hover cleanup |
| `assets/css/perspektiv-styles.css` | Remove hover transforms from `.perspektiv-element`, `.perspektiv-challenge` |
| `assets/css/components/card.css` | Remove hover transform from `.card` |
| `assets/css/avtale.css` | Add `.avtale-micro` float style |

## Summary of Content Changes by File

| File | Changes |
|------|---------|
| `_includes/profiles.html` | Add `person_title` rendering |
| `_layouts/perspektiv.html` | Dynamic element count; dynamic alt text |
| `_pages/mennesker.md` | Add `spot_image` to 4th element |
| `_pages/om_avtale.md` | Move micro-illustrations out of headers |
| `_pages/grc.md` | Remove `<style>` block; add frame colors to perspective cards; add missing CTAs |
