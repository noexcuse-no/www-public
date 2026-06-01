# CSS Architecture — No Excuse AS

## Module Structure (21 files, ~2572 total lines)

| Category | Files |
|----------|-------|
| **Base** | `colors.css` (166), `typography.css` (73), `layout.css` (133) |
| **Utilities** | `utilities.css` (49), `animations.css` (151) |
| **Components** | `assets/css/components/hero.css` (91), `assets/css/components/card.css` (164) |
| **Pages** | `article.css` (285), `about.css` (122), `products.css` (356), `profiles.css` (280), `avtale.css` (107), `perspektiv-styles.css` (118), `cases.css` (16), `partners.css` (45), `podcast.css` (13) |
| **Layout** | `header.css` (46), `navbar.css` (38), `footer.css` (6) |
| **Themes** | `styles-light.css` (50), `styles-dark.css` (263) |

Component-specific CSS lives in `assets/css/components/`. Page-level CSS lives in the root `assets/css/` directory. This separation prevents component styles from being mixed with page layout rules.

## Design Tokens

All design tokens defined in `colors.css`:

### Core Colors

```
--primary-navy:   #003060    Twin primary dark
--primary-azure:  #F0FFFF    Twin primary light
```

### Background / Surface Colors

```
--background-color-light: #c0d4e8    Dark mode: --background-color-dark: #121212
--box-background-light:   #ffffff    Dark mode: --box-background-dark:   #333333
--surface-subtle-light:   rgba(0,0,0,0.04)   Dark mode: --surface-subtle-dark:   rgba(255,255,255,0.06)
--surface-raised-light:   rgba(0,0,0,0.03)   Dark mode: --surface-raised-dark:   rgba(255,255,255,0.05)
--surface-raised-hover-light: rgba(0,0,0,0.06)  Dark mode: --surface-raised-hover-dark: rgba(255,255,255,0.10)
--surface-hover-light:    rgba(0,0,0,0.08)   Dark mode: --surface-hover-dark:    rgba(255,255,255,0.12)
--surface-tag-bg-dark:    rgba(255,255,255,0.08)
```

### Text Colors

```
--text-color-light: #37474f    Dark mode: --text-color-dark: #ffffff
--link-color-light: var(--primary-navy)   Dark mode: --link-color-dark: var(--primary-azure)
--link-hover-light: #000a1f     Dark mode: --link-hover-dark: #8ab4f8
```

### Border Colors (color-only, not shorthand)

```
--border-color-light:         rgba(0,0,0,0.1)    Dark mode: --border-color-dark: rgba(255,255,255,0.1)
--border-color-subtle-light:  rgba(0,0,0,0.08)
```

### Border Shorthand

```
--border-light:   1px solid rgba(0,0,0,0.08)
--border-medium:  1px solid rgba(0,0,0,0.1)
--border-dark:    1px solid rgba(255,255,255,0.1)
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

### Overlays & Modals

```
--overlay-light:      rgba(0,0,0,0.6)   — profile modal backdrop
--overlay-dark:       rgba(0,0,0,0.8)   — booking overlay
--close-bg-light:     rgba(255,255,255,0.95)   Dark mode: --close-bg-dark: rgba(255,255,255,0.9)
--close-bg-hover-light: #ffffff
```

### Profile Card Components

```
--profile-gradient-start-light: rgba(58,78,88,0.06)   Dark mode: ...-dark: rgba(255,255,255,0.05)
--profile-gradient-end-light:   rgba(58,78,88,0.02)   Dark mode: ...-dark: rgba(255,255,255,0.02)
--profile-image-border-light:   rgba(58,78,88,0.12)   Dark mode: ...-dark: rgba(255,255,255,0.1)
```

### Component Aliases

```
--navbar-background-light:  var(--box-background-light)   Dark mode: ...-dark
--button-background-light:  var(--primary-accent)          Dark mode: ...-dark
--button-text-color-light:  var(--primary-accent-contrast) Dark mode: ...-dark
--nav-hover-bg-light:       rgba(255,255,255,0.15)         Dark mode: --nav-hover-bg-dark: rgba(0,0,0,0.1)
```

### Legacy Aliases

```
--primary-accent:             var(--primary-azure)
--primary-accent-contrast:    var(--primary-navy)
--box-shadow-light:           var(--shadow-sm)
--box-shadow-hover-light:     var(--shadow-md)
--box-shadow-dark:            var(--shadow-sm-dark)
--box-shadow-hover-dark:      var(--shadow-md-dark)
```

## Theme Support (Dark Mode)

Dark mode is implemented entirely through CSS variable overrides — no component re-selection.

- Light mode variables use `--*-light` suffix
- Dark mode variables use `--*-dark` suffix
- JavaScript toggles `[data-theme="dark"]` on `<html>`
- `styles-dark.css` contains dark mode overrides that are enabled/disabled via stylesheet `disabled` attribute

New components must follow this pattern: define all themed values as `var(--property)` referencing `colors.css`, which already has both `-light` and `-dark` variants.

## Variable Naming Convention

```
--{purpose}-{modifier}-{light|dark}
```

Examples:
- `--surface-subtle-light` / `--surface-subtle-dark`
- `--border-color-light` / `--border-color-dark`
- `--box-background-light` / `--box-background-dark`

Constants (no theme pair): omit the suffix.
- `--primary-navy`, `--space-md`, `--radius-lg`

## Conventions

- **Colors**: Always `var(--variable)` — never `#333` or raw hex or rgba
- **Shadows**: Use `var(--shadow-*)` — never raw values
- **Component CSS**: Lives in `assets/css/components/` — `hero.css`, `card.css`
- **Breakpoints**: 599px (mobile), 1024px (tablet). Never `768px`.
- **Touch targets**: Minimum 44×44px for interactive elements
- **Font sizes**: Use heading elements (h1–h3) or the typography scale
- **Dark mode**: Variables only — no `[data-theme="dark"]` selector overrides in component CSS; those belong in `styles-dark.css`
