# CSS Architecture

## Module Structure (13 files)

| Category | Files |
|----------|-------|
| Base | `colors.css`, `typography.css`, `layout.css` |
| Components | `profiles.css`, `products.css`, `cases.css`, `podcast.css` |
| Layout | `header.css`, `footer.css`, `navbar.css` |
| Themes | `styles-light.css`, `styles-dark.css` |
| Utilities | `utilities.css` |

## CSS Custom Properties

Defined in `colors.css`:
- Light mode: `--background-color-light`, `--text-color-light`, etc.
- Dark mode: `--background-color-dark`, `--text-color-dark`, etc.
- Accent: `--primary-accent`, `--primary-accent-contrast`

## Theme Support

Light/dark mode via CSS variable switching:
- Light theme: `styles-light.css`
- Dark theme: `styles-dark.css`
- Use `var(--property)` for all colors