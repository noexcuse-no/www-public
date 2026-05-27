# Color Palette - No Excuse AS

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
| CTA-1 (primary) | `#F0FFFF` (azure) | `#003060` (navy) | `#003060` |
| CTA-2 (secondary) | `#003060` (navy) | `#F0FFFF` (azure) | `#F0FFFF` |

---

## Light Mode

| Element | Variable | Value |
|---------|----------|-------|
| Page Background | `--background-color-light` | `#c0d4e8` |
| Stashed (old bg) | `--bg-neutral-light` | `#e2e8f0` |
| Text | `--text-color-light` | `#37474F` |
| Header/Banner Background | `--banner-background-light` | `var(--primary-navy)` -> `#003060` |
| Header/Banner Text | `--banner-text-light` | `var(--primary-azure)` -> `#F0FFFF` |
| Card/Box | `--box-background-light` | `#FFFFFF` |
| Page Link | `--link-color-light` | `#000A14` |
| Page Link Hover | `--link-hover-light` | `#000A1F` |
| Nav Link | `--nav-link-color-light` | `var(--primary-azure)` -> `#F0FFFF` |
| Footer Background | `--footer-background-light` | `#FFFFFF` |
| Footer Text | `--footer-text-light` | `#000A14` |

## Dark Mode

| Element | Variable | Value |
|---------|----------|-------|
| Page Background | `--background-color-dark` | `#121212` |
| Text | `--text-color-dark` | `#FFFFFF` |
| Header/Banner Background | `--banner-background-dark` | `var(--primary-azure)` -> `#F0FFFF` |
| Header/Banner Text | `--banner-text-dark` | `var(--primary-navy)` -> `#003060` |
| Card/Box | `--box-background-dark` | `#333333` |
| Page Link | `--link-color-dark` | `#F0FFFF` |
| Page Link Hover | `--link-hover-dark` | `#8AB4F8` |
| Nav Link | `--nav-link-color-dark` | `var(--primary-navy)` -> `#003060` |
| Footer Background | `--footer-background-dark` | `#222222` |
| Footer Text | `--footer-text-dark` | `#F0FFFF` |

## CSS Variables Added

| Variable | Value | Purpose |
|----------|-------|---------|
| `--primary-navy` | `#003060` | Twin primary dark |
| `--primary-azure` | `#F0FFFF` | Twin primary light |
| `--logo-fill` | `var(--primary-azure)` | Logo color (overridden on `.header` in dark mode) |
| `--nav-link-color-light` | `var(--primary-azure)` | Nav link on navy header (light mode) |
| `--nav-link-color-dark` | `var(--primary-navy)` | Nav link on azure header (dark mode) |
| `--cta-primary-bg` | `var(--primary-azure)` | CTA-1 background |
| `--cta-primary-text` | `var(--primary-navy)` | CTA-1 text |
| `--cta-primary-border` | `var(--primary-navy)` | CTA-1 border (2px solid) |
| `--cta-secondary-bg` | `var(--primary-navy)` | CTA-2 background |
| `--cta-secondary-text` | `var(--primary-azure)` | CTA-2 text |
| `--cta-secondary-border` | `var(--primary-azure)` | CTA-2 border (2px solid) |
| `--bg-neutral-light` | `#e2e8f0` | Stashed old light page bg |

## Legacy Aliases (backward compatibility)

| Alias | Maps to | Old value |
|-------|---------|-----------|
| `--primary-accent` | `var(--primary-azure)` | `azure` |
| `--primary-accent-contrast` | `var(--primary-navy)` | `#000A14` |

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
