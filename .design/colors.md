# Color Palette — No Excuse AS

## Twin Primary Colors

The system uses two colors that swap roles between light and dark mode:

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#003060` | Primary dark. Light mode header bg, CTA-2 bg, dark mode nav links, logo on azure header |
| Azure | `#F0FFFF` | Primary light. Dark mode header bg, CTA-1 bg, light mode nav links, logo on navy header |

### Logo Fill

The logo inverts per mode to contrast with the header background:

| Mode | Header bg | Logo fill |
|------|-----------|-----------|
| Light | `#003060` (navy) | `#F0FFFF` (azure) |
| Dark | `#F0FFFF` (azure) | `#003060` (navy) |

Controlled via `--logo-fill` CSS variable — set by mode stylesheets on `.header`.

### CTA System (identical in both modes)

CTAs always carry a 2px solid border of the opposite twin primary for guaranteed contrast against any page background.

| Element | Background | Text | Border (2px solid) |
|---------|------------|------|---------------------|
| `.cta` (primary) | `#F0FFFF` (azure) | `#003060` (navy) | `#003060` |
| `.cta--secondary` | `#003060` (navy) | `#F0FFFF` (azure) | `#F0FFFF` |

### CTA Variables

| Variable | Value |
|----------|-------|
| `--cta-primary-bg` | `var(--primary-azure)` |
| `--cta-primary-text` | `var(--primary-navy)` |
| `--cta-primary-border` | `var(--primary-navy)` |
| `--cta-secondary-bg` | `var(--primary-navy)` |
| `--cta-secondary-text` | `var(--primary-azure)` |
| `--cta-secondary-border` | `var(--primary-azure)` |

---

## Theme Color Convention

All theme-aware variables use a `-light` / `-dark` suffix pair. Light mode values have the `-light` suffix, dark mode values have the `-dark` suffix. Components reference variables without the suffix ambiguity — `styles-dark.css` overrides swap which value is active.

## Light Mode

| Element | Variable | Value |
|---------|----------|-------|
| Page Background | `--background-color-light` | `#c0d4e8` |
| Neutral Background | `--bg-neutral-light` | `#e2e8f0` |
| Text | `--text-color-light` | `#37474F` |
| Header/Banner Background | `--banner-background-light` | `var(--primary-navy)` → `#003060` |
| Header/Banner Text | `--banner-text-light` | `var(--primary-azure)` → `#F0FFFF` |
| Card/Box | `--box-background-light` | `#FFFFFF` |
| Page Link | `--link-color-light` | `var(--primary-navy)` → `#003060` |
| Page Link Hover | `--link-hover-light` | `#000A1F` |
| Nav Link | `--nav-link-color-light` | `var(--primary-azure)` → `#F0FFFF` |
| Footer Background | `--footer-background-light` | `var(--primary-azure)` → `#F0FFFF` |
| Footer Text | `--footer-text-light` | `var(--primary-navy)` → `#003060` |

## Dark Mode

| Element | Variable | Value |
|---------|----------|-------|
| Page Background | `--background-color-dark` | `#121212` |
| Text | `--text-color-dark` | `#FFFFFF` |
| Header/Banner Background | `--banner-background-dark` | `var(--primary-azure)` → `#F0FFFF` |
| Header/Banner Text | `--banner-text-dark` | `var(--primary-navy)` → `#003060` |
| Card/Box | `--box-background-dark` | `#333333` |
| Page Link | `--link-color-dark` | `var(--primary-azure)` → `#F0FFFF` |
| Page Link Hover | `--link-hover-dark` | `#8AB4F8` |
| Nav Link | `--nav-link-color-dark` | `var(--primary-navy)` → `#003060` |
| Footer Background | `--footer-background-dark` | `var(--primary-navy)` → `#003060` |
| Footer Text | `--footer-text-dark` | `var(--primary-azure)` → `#F0FFFF` |

## Surface Colors (Subtle Backgrounds)

Used for tag badges, profile contact items, hover states, and other secondary surface treatments.

| Variable | Light | Dark |
|----------|-------|------|
| `--surface-subtle-*` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.06)` |
| `--surface-hover-*` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.12)` |
| `--surface-raised-*` | `rgba(0,0,0,0.03)` | `rgba(255,255,255,0.05)` |
| `--surface-raised-hover-*` | `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.10)` |
| `--surface-tag-bg-dark` | — | `rgba(255,255,255,0.08)` |

## Border Colors

Color-only variables (not `border` shorthand — use with `border-*-color` properties).

| Variable | Light | Dark |
|----------|-------|------|
| `--border-color-*` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` |
| `--border-color-subtle-light` | `rgba(0,0,0,0.08)` | — |

Shorthand border variables: `--border-light`, `--border-medium`, `--border-dark` in `colors.css`.

## Overlays & Modals

| Variable | Value | Usage |
|----------|-------|-------|
| `--overlay-light` | `rgba(0,0,0,0.6)` | Profile expanded backdrop |
| `--overlay-dark` | `rgba(0,0,0,0.8)` | Booking overlay |
| `--close-bg-light` | `rgba(255,255,255,0.95)` | Profile close button |
| `--close-bg-hover-light` | `#ffffff` | Profile close button hover |
| `--close-bg-dark` | `rgba(255,255,255,0.9)` | Close buttons in dark mode |

## Profile Card Components

| Variable | Light | Dark |
|----------|-------|------|
| `--profile-gradient-start-*` | `rgba(58,78,88,0.06)` | `rgba(255,255,255,0.05)` |
| `--profile-gradient-end-*` | `rgba(58,78,88,0.02)` | `rgba(255,255,255,0.02)` |
| `--profile-image-border-*` | `rgba(58,78,88,0.12)` | `rgba(255,255,255,0.1)` |

## Nav Hover

| Variable | Value |
|----------|-------|
| `--nav-hover-bg-light` | `rgba(255,255,255,0.15)` |
| `--nav-hover-bg-dark` | `rgba(0,0,0,0.1)` |

## Component Aliases

These exist so component CSS references semantic names instead of direct variable names, making it possible to swap the underlying variable without touching component CSS.

| Alias | Maps To |
|-------|---------|
| `--navbar-background-light` | `var(--box-background-light)` |
| `--navbar-background-dark` | `var(--box-background-dark)` |
| `--button-background-light` | `var(--primary-accent)` |
| `--button-background-dark` | `var(--box-background-dark)` |
| `--button-text-color-light` | `var(--primary-accent-contrast)` |
| `--button-text-color-dark` | `var(--text-color-light)` |

## Legacy Aliases (backward compatibility)

| Alias | Maps to |
|-------|---------|
| `--primary-accent` | `var(--primary-azure)` |
| `--primary-accent-contrast` | `var(--primary-navy)` |

These aliases ensure components using the old variable names still work.

## Contrast Requirements

- All text must pass WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Both light and dark themes must meet accessibility standards
- CTA borders (2px solid) ensure contrast regardless of page background

## Usage Guidelines

- Use CSS custom properties (`var(--property)`) for all colors — never hardcode hex values in component CSS
- Twin primaries swap roles between modes: navy header in light, azure header in dark
- CTAs always carry a 2px solid border of the opposite twin primary
- Nav links use the inverted twin primary to contrast with the header background
- Logo fill swaps via `--logo-fill` CSS variable — controlled by mode stylesheets on `.header`
- Page link colors (`--link-color-light`/`--link-color-dark`) are for content links only; nav links use `--nav-link-*` variables
- Surface colors are for secondary interactive backgrounds only — use `--box-background-*` for card-level surfaces

### Color Intensity Levels

Color is used sparingly — the brand is primarily typography and whitespace. There are two levels of color application:

| Level | Application | Examples |
|-------|-------------|---------|
| **Full background** | Key navigational and structural elements only | Header, CTA buttons |
| **Accent** (sparingly) | Interactive and highlight elements | Links on hover, small decorative accents, icons |

Rule of thumb: if an element isn't structural (navigation) or a primary action (CTA), it should not use a full background color. Accent-level usage (text color, small highlights) is preferred for everything else.
