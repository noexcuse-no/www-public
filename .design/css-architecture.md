# CSS Architecture — No Excuse AS

## Module Structure (21 files, ~2100 lines)

| Category | Files |
|----------|-------|
| **Base** | `colors.css` (78), `typography.css` (72), `layout.css` (25) |
| **Utilities** | `utilities.css` (49), `animations.css` (64) |
| **Components** | `article.css` (290), `about.css` (129), `avtale.css` (107), `cases.css` (17), `partners.css` (44), `podcast.css` (13), `products.css` (426), `profiles.css` (260) |
| **Layout** | `header.css` (43), `navbar.css` (38), `footer.css` (6) |
| **Themes** | `styles-light.css` (49), `styles-dark.css` (315) |
| **Overrides** | `perspektiv-styles.css` (79) — unique overrides only |

## Design Tokens

All defined in `colors.css`:

```
--primary-accent: azure;
--primary-accent-contrast: #000a14;

/* Shadow elevation scale */
--shadow-sm      0 2px 8px  rgba(0,0,0,0.08)   — cards, small surfaces
--shadow-md      0 8px 20px rgba(0,0,0,0.12)   — hover states
--shadow-lg      0 12px 24px rgba(0,0,0,0.12)  — modals, overlays
--shadow-xl      0 20px 60px rgba(0,0,0,0.15)  — large overlays
--shadow-*-dark                                   — dark variants

/* Spacing scale (4px base) */
--space-xs   4px     --space-sm   8px
--space-md   16px    --space-lg   24px
--space-xl   32px    --space-2xl  40px    --space-3xl  48px

/* Border radius */
--radius-sm  4px     --radius-md  8px     --radius-lg  12px    --radius-xl  16px

/* Content widths */
--content-max: 1100px;   --content-narrow: 65ch;   --content-wide: 800px;

/* Legacy aliases */
--box-shadow-light: var(--shadow-sm);
--box-shadow-hover-light: var(--shadow-md);
```

## Theme Support (Dark Mode)

Consolidated pattern: ALL dark mode styles live in `styles-dark.css` with plain selectors (no `.dark-mode` prefix). Zero `.dark-mode` selectors remain in any component CSS file.

JavaScript toggles both the stylesheet `disabled` attribute and `document.body.classList` synchronously.

## Component Alias Pattern

Shared component patterns use comma-separated selectors:

```css
.perspektiv-hero,
.frame-hero { ... }
```

The `perspektiv-styles.css` file contains only genuinely unique overrides (markers, decorations, extended hover effects) — slimmed from 303→79 lines.

## Conventions

- **Colors**: Always `var(--text-color-*)` / `var(--box-background-*)` — never `#333` or raw hex
- **Shadows**: Use `var(--shadow-*)` — never raw values
- **Breakpoints**: 599px (mobile), 1024px (tablet). Never `768px`.
- **Touch targets**: Minimum 44x44px for interactive elements
- **Font sizes**: Use heading elements (h1-h3) or the typography scale
