# CSS Architecture — No Excuse AS

## Module Structure (27 files, ~4027 total lines)

| Category | Files |
|----------|-------|
| **Base** | `colors.css` (183), `typography.css` (99), `layout.css` (199) |
| **Utilities** | `utilities.css` (18), `animations.css` (89) |
| **Components** | `assets/css/components/hero.css` (112), `assets/css/components/card.css` (157), `assets/css/components/buttons.css` (92), `assets/css/components/carousel.css` (76), `assets/css/components/cta-inline.css` (56), `assets/css/components/cta-section.css` (36), `assets/css/components/disclaimer.css` (21), `assets/css/components/footnotes.css` (35), `assets/css/components/illustrations.css` (63), `assets/css/components/questions.css` (236), `assets/css/components/sidebar.css` (560), `assets/css/components/stat-bridge.css` (18), `assets/css/components/step-timeline.css` (98), `assets/css/components/tag-cloud.css` (78) |
| **Pages** | `article.css` (420), `products.css` (470), `profiles.css` (387), `avtale.css` (69), `perspektiv-styles.css` (39), `partners.css` (42) |
| **Layout** | `header.css` (54), `navbar.css` (189), `footer.css` (43) |
| **Themes** | `styles-light.css` (26), `styles-dark.css` (26) |

Component-specific CSS lives in `assets/css/components/` (14 files). Page-level CSS lives in the root `assets/css/` directory. This separation prevents component styles from being mixed with page layout rules.

## Design Tokens

All design tokens defined in `colors.css`:

### Core Colors (constants)

```
--primary-navy:   #003060    Twin primary dark
--primary-azure:  #F0FFFF    Twin primary light
--logo-fill:      var(--primary-azure)
```

### CTA System (constants)

```
--cta-primary-bg:      var(--primary-azure)
--cta-primary-text:    var(--primary-navy)
--cta-primary-border:  var(--primary-navy)
--cta-secondary-bg:    var(--primary-navy)
--cta-secondary-text:  var(--primary-azure)
--cta-secondary-border: var(--primary-azure)
```

## Unified Button System

All interactive elements (buttons, links-as-buttons, icon buttons, toggles, close buttons) share a **single unified button system** centralized in `assets/css/components/buttons.css`. Per-element transition/hover/active/focus rules have been **removed from component files** and consolidated here.

### Three types

| Type | Class | Alias(es) | Style |
|------|-------|-----------|-------|
| **Primary** | `.btn-primary` | `.cta`, `.cta--primary`, `.card-link--cta`, `.profile-booking-btn` | Azure bg, navy text, navy border |
| **Secondary** | `.btn-secondary` | `.cta--secondary`, `.copy-btn` | Navy bg, azure text, azure border |
| **Ghost** | `.btn-ghost` | `.card-link`, `.carousel-btn`, `.profile-contact-btn`, `.profile-close`, `.share-btn`, `.provider-btn`, `.modal-close`, `.nav-overlay-close`, `.questions-toggle`, `.toc-mobile-toggle`, `.toc-mobile-close`, `.change-provider-btn`, `.back-to-top`, `.landing-scroll-link`, `.tag-cloud-item` | Transparent bg, `--text-color`, no border; `--surface-hover` bg on hover |

### Shared base (all types)

All button classes share a common base: `inline-flex`, centered, `gap: 6px`, `min-height: 44px` (touch target), `padding: 14px 32px`, `font-weight: 600`, `font-size: 1.05em`, `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-sm)`, `cursor: pointer`.

### Unified interaction states

| State | Effect |
|-------|--------|
| **Transition** | `transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease` |
| **Hover** | `transform: translateY(-2px)`, `box-shadow: var(--shadow-md)` |
| **Active** | `transform: translateY(0) scale(0.98)`, `box-shadow: var(--shadow-sm)` |
| **Focus-visible** | `outline: 3px solid var(--focus-color)`, `outline-offset: 2px` |

### Size variants

| Variant | Class | Alias(es) | Padding / Font |
|---------|-------|-----------|----------------|
| **Large** | `.btn--large` | `.cta--large` | `18px 48px`, `1.2em` |
| **Small** | `.btn--small` | `.profile-contact-btn`, `.provider-btn`, `.toc-mobile-toggle`, `.change-provider-btn`, `.tag-cloud-item` | `8px 16px`, `0.9em` |
| **Icon** | `.btn--icon` | `.carousel-btn`, `.profile-close`, `.share-btn`, `.modal-close`, `.nav-overlay-close`, `.toc-mobile-close`, `.back-to-top` | `10px`, `1.1em` |

### Spacing variants

| Variant | Class | Effect |
|---------|-------|--------|
| **Spaced** | `.btn--spaced` | `margin-left: var(--space-md)` (resets to `margin-top: 12px` on mobile) |
| **Block** | `.btn--block` | `width: 100%`, `box-sizing: border-box` |

### Alias mapping

Existing `.cta*` classes are kept as **aliases** — no HTML changes were required. `.cta` → `.btn-primary`, `.cta--secondary` → `.btn-secondary`, `.cta--large` → `.btn--large`, `.cta--spaced` → `.btn--spaced`. New code should prefer the `.btn*` canonical classes; legacy `.cta*` classes continue to work.

### Brand-mandated exceptions

- **Share buttons** (`.share-btn--teams`, `.share-btn--linkedin`): brand-colored backgrounds with white text — these override the ghost type's transparent bg.
- **Provider selected state** (`.provider-btn.is-selected`): functional border/background highlight, not decorative.

### Responsive

At `max-width: 768px`, `.cta-buttons-row` stacks vertically; `.cta` and `.btn--block` go full-width; `.cta--spaced`/`.btn--spaced` reset margin to `margin-top: 12px`.

### Header (constant across modes)

```
--header-bg:    var(--primary-navy)
--header-text:  var(--primary-azure)
--nav-hover-bg: rgba(255,255,255,0.15)
```

### Frame Accent Colors (constants)

```
--frame-struct:     #2A4D6E
--frame-human:      #B8901E
--frame-political:  #355E3B
--frame-symbol:     #8E0D3C
```

### Brand Colors (constants)

```
--brand-linkedin:       #0a66c2
--brand-linkedin-hover: #084d91
--brand-teams:          #6264A7
--brand-teams-hover:    #5050A0
```

### Semantic Colors (constants)

```
--error-color:       #c62828
--success-color:     #2e7d32
--success-ring:      rgba(46,125,50,0.15)
--success-ring-dark: rgba(102,187,106,0.2)
```

### Background / Surface Colors (raw pairs)

```
--background-color-light: #c0d4e8    Dark mode: --background-color-dark: #121212
--box-background-light:   #ffffff    Dark mode: --box-background-dark:   #1e2a3a
--surface-subtle-light:   rgba(0,0,0,0.04)   Dark mode: --surface-subtle-dark:   rgba(255,255,255,0.06)
--surface-hover-light:    rgba(0,0,0,0.08)   Dark mode: --surface-hover-dark:    rgba(255,255,255,0.12)
```

### Text Colors (raw pairs)

```
--text-color-light: #37474f    Dark mode: --text-color-dark: #ffffff
--link-color-light: var(--primary-navy)   Dark mode: --link-color-dark: var(--primary-azure)
--link-hover-light: #000a1f     Dark mode: --link-hover-dark: #8ab4f8
```

### Footer & Disclaimer (raw pairs)

```
--footer-bg-light:      var(--primary-azure)   Dark mode: --footer-bg-dark:      var(--primary-navy)
--footer-text-light:    var(--primary-navy)    Dark mode: --footer-text-dark:    var(--primary-azure)
--disclaimer-bg-light:  var(--primary-navy)    Dark mode: --disclaimer-bg-dark:  var(--primary-azure)
--disclaimer-text-light: var(--primary-azure)  Dark mode: --disclaimer-text-dark: var(--primary-navy)
```

### Focus & Accent (raw pairs)

```
--focus-color-light:  var(--primary-navy)   Dark mode: --focus-color-dark:  var(--primary-azure)
--accent-color-light: var(--primary-navy)   Dark mode: --accent-color-dark: var(--primary-azure)
```

### Border Colors (color-only, not shorthand)

```
--border-color-light:         rgba(0,0,0,0.1)    Dark mode: --border-color-dark: rgba(255,255,255,0.1)
--border-color-subtle-light:  rgba(0,0,0,0.08)   Dark mode: --border-color-subtle-dark: rgba(255,255,255,0.08)
```

### Shadow Elevation Scale

```
--shadow-xs      0 2px 4px   rgba(0,0,0,0.08)   — cards, small surfaces
--shadow-sm      0 2px 8px   rgba(0,0,0,0.08)   — hover states (light)
--shadow-md      0 8px 20px  rgba(0,0,0,0.12)   — hover states (medium)
--shadow-lg      0 12px 24px rgba(0,0,0,0.12)   — modals, overlays
--shadow-xl      0 20px 60px rgba(0,0,0,0.15)   — large overlays
--shadow-*-dark                                   — dark variants (deeper opacity)
```

### Modal Overlay

```
--overlay-modal-light: rgba(0,0,0,0.6)   — modal backdrop
--overlay-modal-dark:  rgba(0,0,0,0.8)   — booking overlay
```

### Profile Card Components

```
--profile-gradient-start-light: rgba(58,78,88,0.06)   Dark mode: ...-dark: rgba(255,255,255,0.05)
--profile-gradient-end-light:   rgba(58,78,88,0.02)   Dark mode: ...-dark: rgba(255,255,255,0.02)
--profile-image-border-light:   rgba(58,78,88,0.12)   Dark mode: ...-dark: rgba(255,255,255,0.1)
```

### Carousel Buttons

```
--carousel-btn-bg-light:        rgba(255,255,255,0.9)   Dark mode: ...-dark: rgba(30,30,40,0.85)
--carousel-btn-bg-hover-light:  #ffffff                 Dark mode: ...-dark: rgba(50,50,65,0.95)
```

### Hero Text & Overlay

```
--hero-text-light:  var(--primary-navy)   Dark mode: --hero-text-dark: #ffffff
--hero-overlay-light: linear-gradient(to top, var(--primary-navy) 0%, transparent 40%)
--hero-overlay-dark:  linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 40%)
--hero-overlay-opacity-light: 0.5   Dark mode: --hero-overlay-opacity-dark: 0.8
```

### Spacing Scale (4px base)

```
--space-xs   4px    --space-sm   8px    --space-md   16px
--space-lg   24px   --space-xl   32px   --space-2xl  40px
--space-3xl  48px   --space-4xl  64px   --space-5xl  80px
```

### Border Radius

```
--radius-sm  4px    --radius-md  8px    --radius-lg  12px    --radius-xl  16px
```

### Content Widths

```
--content-max: 1100px    --content-narrow: 65ch    --content-wide: 800px
```

### Active Defaults (Light mode)

The unsuffixed active variables are set in `colors.css` `:root` to the light-mode raw pair by default. `styles-dark.css` re-assigns them to the dark-mode raw pair.

```
--text-color:            var(--text-color-light)
--background-color:      var(--background-color-light)
--box-background:        var(--box-background-light)
--link-color:            var(--link-color-light)
--link-hover:            var(--link-hover-light)
--footer-bg:             var(--footer-bg-light)
--footer-text:           var(--footer-text-light)
--disclaimer-bg:         var(--disclaimer-bg-light)
--disclaimer-text:       var(--disclaimer-text-light)
--focus-color:           var(--focus-color-light)
--accent-color:          var(--accent-color-light)
--surface-subtle:        var(--surface-subtle-light)
--surface-hover:         var(--surface-hover-light)
--border-color:          var(--border-color-light)
--border-color-subtle:   var(--border-color-subtle-light)
--overlay-modal:         var(--overlay-modal-light)
--profile-gradient-start: var(--profile-gradient-start-light)
--profile-gradient-end:   var(--profile-gradient-end-light)
--profile-image-border:   var(--profile-image-border-light)
--carousel-btn-bg:        var(--carousel-btn-bg-light)
--carousel-btn-bg-hover:  var(--carousel-btn-bg-hover-light)
--hero-text:              var(--hero-text-light)
--hero-overlay:           var(--hero-overlay-light)
--hero-overlay-opacity:   var(--hero-overlay-opacity-light)
```

## Theme Support (Dark Mode)

Dark mode is implemented entirely through CSS variable assignment — the mode stylesheets re-assign active variables; there is no theme attribute on the document root and no per-component dark-mode selector overrides.

- **Raw pairs** use `--{purpose}-light` / `--{purpose}-dark` suffixes (defined in `colors.css`)
- **Active variables** are unsuffixed (`--text-color`, `--box-background`) and reference the light-mode raw pair by default in `colors.css`
- **`styles-light.css`** is a pure `:root {}` block that re-assigns every active variable to its `-light` raw pair
- **`styles-dark.css`** is a pure `:root {}` block that re-assigns every active variable to its `-dark` raw pair
- **`dark-mode-toggle.js`** toggles the `disabled` attribute on the `#dark-style` / `#light-style` stylesheet links, and adds/removes the `.dark-mode` class on `<body>` (kept for JS feature detection in `animations.js` and `carousel.js`)

New components must follow this pattern: define all themed values as `var(--property)` referencing the **unsuffixed active variables**, which are already set by the mode stylesheets.

## Variable Naming Convention

```
--{purpose}              Constants (never change between modes)
--{purpose}-light        Raw pair — light mode value
--{purpose}-dark         Raw pair — dark mode value
--{purpose}              Active — set by mode stylesheet (references the appropriate raw pair)
```

Examples:
- Constants: `--primary-navy`, `--header-bg`, `--space-md`, `--radius-lg`
- Raw pairs: `--surface-subtle-light` / `--surface-subtle-dark`, `--border-color-light` / `--border-color-dark`, `--box-background-light` / `--box-background-dark`
- Active: `--text-color`, `--box-background`, `--border-color` (set by `styles-light.css` / `styles-dark.css`)

## Conventions

- **Colors**: Always `var(--variable)` — never `#333` or raw hex or rgba
- **Shadows**: Use `var(--shadow-*)` — never raw values
- **Component CSS**: Lives in `assets/css/components/` — `hero.css`, `card.css`
- **Breakpoints**: 599px (mobile), 768px (tablet), 900px (desktop), 1199px/1200px (wide). Never `1024px`.
- **Touch targets**: Minimum 44×44px for interactive elements
- **Font sizes**: Use heading elements (h1–h3) or the typography scale
- **Dark mode**: Variables only — no per-component dark-mode selector overrides in component CSS; those belong in `styles-dark.css`

## Article Content Styling — Structural Selectors

Since IAL (Inline Attribute Lists) and raw HTML divs are **prohibited** in `_pages/*.md`, all article content styling uses CSS structural selectors targeting element position and relationships within `.article-body`.

### List Heading Layout System

The article layout system uses a **heading-level-driven** approach: content sections are wrapped in lists (`ul`/`ol`) whose items contain a heading (`h2`–`h5`). The heading level determines the card layout:

| Heading level | Layout | Image display | Use case |
|---------------|--------|---------------|----------|
| `li h2` | 1-per-row card | Square, floated beside heading (~140px) | Section openers, Hovedelementer |
| `li h3` | 2-per-row grid | Landscape, `aspect-ratio: 16/9`, full card width | Info cards, numbered flow steps |
| `li h4` | 1-per-row card | Square, floated beside heading (~80px) | Challenge cards, sub-sections |
| `li h5` | 2-per-row grid | Landscape, `aspect-ratio: 16/9`, full card width | Sub-section lists |

**Principle:** Content is **rewritten to fit the system** — not the other way around. When a section's content doesn't fit a card layout (e.g., odd-count items, sequential steps), the content is restructured (e.g., `ul`→`ol` for sequential stages) or the heading level is adjusted to match the intended layout.

**List markers:**
- `ol` lists get number badges (CSS counters) — grid cards (h3/h5) place the badge top-left of the card; 1-per-row cards (h2/h4) place it inline beside the heading.
- `ul` lists get bullet markers — grid cards place the bullet top-left; 1-per-row cards place it inline beside the heading.

**Normal heading typography scale** (h1–h5) is defined in `typography.css` — the list-heading selectors only adjust margins/display within cards, not the base font sizes.

**Removed special-case selectors:** The old per-concept selectors (`verdi-`, `metode-t4`, `t4-signal`, `step-`, `frame-`, `challenge-card`) have been removed. All card-like content now uses the generic `:has(> li > hN)` structural selectors.

### Accepted patterns (use freely)

| Pattern | Targets | Example |
|---------|---------|---------|
| `.article-body > h2` | Top-level section headings | All articles |
| `.article-body > blockquote` | Blockquote callout boxes | `om_metode.md` (legal quote) |
| `.article-body > table` | Data tables | `grc.md` (GRC matrix) |
| `ul:has(> li > h3)` | Info card lists (UL with h3 children) | Multiple articles |
| `ul:has(> li > h4)` | Challenge grid lists (UL with h4 children) | Frame perspective pages |
| `.article-body > ol:has(> li > h3)` | Numbered flow steps (OL with h3 children) | `usikkerhet.md` (Kotter 8-step) |
| `:not(li) > p:has(> img:only-child) > img` | Standalone section images | All articles |

### Icon-sized image patterns (by filename)

Small icon images that are part of card-like layouts use filename-based selectors to override the generic standalone image width:

| Pattern | Selector | Example |
|---------|----------|---------|
| Value cards | `img[src*="verdi-"]` | `om_oss.md` (3 values) |
| Ethics icons | `img[src*="metode-t4"]` | `om_metode.md` (4 ethics principles) |

These override the default `max-width: 600px` from the standalone image rule to `60px × 60px` with centered layout, and adjacent heading/paragraph styling via sibling combinators (`img + h3`, `img + h4`).

### Styling approach

Instead of applying class names in markdown, target elements by:
1. **Position**: first/last child, nth-of-type
2. **Content pattern**: `:has()` pseudo-class (e.g., `ul:has(> li > h3)`)
3. **Filename**: `[src*="pattern"]` for images
4. **Adjacency**: `+` combinator for heading-after-icon

### What to avoid

Do NOT add class-based selectors for content-level elements in `.article-body`. Template-level components (CTAs, hero, navigation) in `_includes/` may still use classes.

## Article Element Styling System

The article element styling system defines how individual content elements (headings, blockquotes, tables, cards) are styled within `.article-body`. It complements the structural selector system above.

### Complete heading scale (h1–h5)

Defined in `typography.css`. The full scale:

| Heading | Desktop size | Mobile size | Weight |
|---------|-------------|-------------|--------|
| h1 | 2.5em | 2em | 700 |
| h2 | 2em | 1.5em | 700 |
| h3 | 1.5em | 1.25em | 600 |
| h4 | 1.15em | 1em | 600 |
| h5 | 1em | 0.9em | 600 |

### Section divider

A 1px `border-top` in `var(--border-color)` separates top-level sections. Applied via `h2:not(:first-of-type)` — the **first** h2 on a page gets no divider (it follows the hero/intro, not a preceding section).

### Blockquote

Single definition in `typography.css` — no `article.css` override. Uses `var(--accent-color)` border (navy in light mode, azure in dark mode), `padding: 0 0 0 var(--space-lg)`, no background. Attribution rendered via `blockquote cite` below the quote.

### Table

Zebra striping via `nth-child(even)` + `var(--surface-subtle)`. Caption styling for raw-HTML tables. Horizontal scroll preserved (`display: block; overflow-x: auto; max-width: 100%`).

### Card hover

Cards (all 4 groups: h2/h3/h4/h5) use a subtle shadow transition: base `var(--shadow-xs)` → hover `var(--shadow-sm)`, `transition: box-shadow 0.2s ease`. **No transform/lift** on hover.

### Dead CSS removal

- **`assets/css/metode.css`** — deleted entirely. All selectors were dead (frame-item/founder-card family rendered on zero pages — no page uses `layout: product`).
- **`.info-box` block** — removed from `article.css`. Its only consumer was `metodikk-callout.html`, included only by `_layouts/product.html`, and zero pages use `layout: product`.
- **`metode.css` `<link>`** — removed from `_includes/styles.html`.

### Future cleanup candidates

- `_layouts/product.html` and `_includes/metodikk-callout.html` remain in the repo unused — future cleanup decision.
- The color plan's `--frame-struct/human/political/symbol` variables become unreferenced after the metode.css deletion — left in place (harmless); future cleanup decision.

## Article Element Styling System

The article element styling system defines the visual treatment of headings, blockquotes, tables, and cards within `.article-body`. All rules live in `article.css` and `typography.css` — no per-element overrides in component files.

### Complete heading scale (h1–h5)

| Heading | Desktop size | Mobile size | Weight |
|---------|-------------|-------------|--------|
| h1 | 2.2em | 1.8em | 700 |
| h2 | 1.6em | 1.4em | 700 |
| h3 | 1.3em | 1.2em | 600 |
| h4 | 1.15em | 1em | 600 |
| h5 | 1em | 0.9em | 600 |

h4/h5 were added to the typography scale (2026-09-03) to support the list-heading layout system's sub-section cards.

### Section divider

A 1px `border-top` in `var(--border-color)` is applied to `h2:not(:first-of-type)` — every h2 section after the first gets a thin divider above it. The first h2 on a page (or the first h2 after a paragraph opener) has **no** divider.

### Blockquote

Single definition in `typography.css` — `var(--accent-color)` border (navy in light mode, azure in dark mode), `padding: 0 0 0 var(--space-lg)`, no background. Attribution rendered via `blockquote cite` below the quote. No `article.css` override.

### Table

Zebra striping via `nth-child(even)` + `var(--surface-subtle)` background. Caption styling for raw-HTML tables. Horizontal scroll preserved (`display: block; overflow-x: auto; max-width: 100%`).

### Card hover

Cards (list-heading cards, info cards, challenge cards) use a subtle shadow transition: base `var(--shadow-xs)` → hover `var(--shadow-sm)`, `transition: box-shadow 0.2s ease`. **No transform/lift** on hover.

### Deletions (2026-09-03)

- **`assets/css/metode.css`** removed entirely — all selectors were dead (frame-item/founder-card family rendered on zero pages). The `--frame-struct/human/political/symbol` color variables become unreferenced after this deletion — left in place (harmless); future cleanup decision.
- **`.info-box` block** removed from `article.css` — its only consumer was `metodikk-callout.html`, included only by `_layouts/product.html`, and zero pages use `layout: product`.
- **`metode.css` `<link>`** removed from `_includes/styles.html`.

### Future cleanup candidates

`_layouts/product.html` and `_includes/metodikk-callout.html` remain in the repo unused — future cleanup decision.