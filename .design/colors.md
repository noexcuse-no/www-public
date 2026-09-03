# Color Palette — No Excuse AS

## Twin Primary Colors

The system uses two colors that are **constant across both modes** (they do not swap roles):

| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#003060` | Primary dark. Header bg (both modes), CTA-2 bg, light mode nav links, logo on azure header |
| Azure | `#F0FFFF` | Primary light. CTA-1 bg, dark mode nav links, logo on navy header |

### Logo Fill

The logo inverts per mode to contrast with the header background:

| Mode | Header bg | Logo fill |
|------|-----------|-----------|
| Light | `#003060` (navy) | `#F0FFFF` (azure) |
| Dark | `#003060` (navy) | `#F0FFFF` (azure) |

The header is **navy in both modes** — there is no header color swap. Controlled via `--logo-fill` CSS variable (constant, set in `colors.css`).

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

## Variable Architecture

`colors.css` is organized into three sections:

1. **Constants** — values that never change between modes (twin primaries, CTA, header, nav hover, frame accents, brand, semantic colors).
2. **Raw Pairs** — `--{purpose}-light` / `--{purpose}-dark` value pairs for every theme-aware property.
3. **Active Defaults** — unsuffixed `--{purpose}` variables that reference the light-mode raw pair by default. The mode stylesheets (`styles-light.css` / `styles-dark.css`) re-assign these active variables to the appropriate raw pair, switching the whole theme.

Components reference only the **unsuffixed active variables** (`--text-color`, `--box-background`, etc.) — never the suffixed raw pairs directly.

## Constants (never change between modes)

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary-navy` | `#003060` | Twin primary dark |
| `--primary-azure` | `#F0FFFF` | Twin primary light |
| `--logo-fill` | `var(--primary-azure)` | Logo fill (azure on navy header) |
| `--cta-primary-bg` | `var(--primary-azure)` | Primary CTA background |
| `--cta-primary-text` | `var(--primary-navy)` | Primary CTA text |
| `--cta-primary-border` | `var(--primary-navy)` | Primary CTA border |
| `--cta-secondary-bg` | `var(--primary-navy)` | Secondary CTA background |
| `--cta-secondary-text` | `var(--primary-azure)` | Secondary CTA text |
| `--cta-secondary-border` | `var(--primary-azure)` | Secondary CTA border |
| `--header-bg` | `var(--primary-navy)` | Header background (navy in both modes) |
| `--header-text` | `var(--primary-azure)` | Header text |
| `--nav-hover-bg` | `rgba(255,255,255,0.15)` | Nav hover background |
| `--frame-struct` | `#2A4D6E` | Struktur frame accent |
| `--frame-human` | `#B8901E` | Mennesker frame accent |
| `--frame-political` | `#355E3B` | Påvirkning frame accent |
| `--frame-symbol` | `#8E0D3C` | Identitet frame accent |
| `--brand-linkedin` | `#0a66c2` | LinkedIn brand color |
| `--brand-linkedin-hover` | `#084d91` | LinkedIn hover |
| `--brand-teams` | `#6264A7` | Teams brand color |
| `--brand-teams-hover` | `#5050A0` | Teams hover |
| `--error-color` | `#c62828` | Error / destructive |
| `--success-color` | `#2e7d32` | Success |
| `--success-ring` | `rgba(46,125,50,0.15)` | Success ring (light) |
| `--success-ring-dark` | `rgba(102,187,106,0.2)` | Success ring (dark) |

## Raw Value Pairs

Theme-aware values are defined as `--{purpose}-light` / `--{purpose}-dark` pairs.

### Background

| Variable | Light | Dark |
|----------|-------|------|
| `--background-color-*` | `#c0d4e8` | `#121212` |
| `--box-background-*` | `#ffffff` | `#1e2a3a` |

### Text & Links

| Variable | Light | Dark |
|----------|-------|------|
| `--text-color-*` | `#37474f` | `#ffffff` |
| `--link-color-*` | `var(--primary-navy)` | `var(--primary-azure)` |
| `--link-hover-*` | `#000a1f` | `#8ab4f8` |

### Footer

| Variable | Light | Dark |
|----------|-------|------|
| `--footer-bg-*` | `var(--primary-azure)` | `var(--primary-navy)` |
| `--footer-text-*` | `var(--primary-navy)` | `var(--primary-azure)` |

### Disclaimer

| Variable | Light | Dark |
|----------|-------|------|
| `--disclaimer-bg-*` | `var(--primary-navy)` | `var(--primary-azure)` |
| `--disclaimer-text-*` | `var(--primary-azure)` | `var(--primary-navy)` |

### Focus & Accent

| Variable | Light | Dark |
|----------|-------|------|
| `--focus-color-*` | `var(--primary-navy)` | `var(--primary-azure)` |
| `--accent-color-*` | `var(--primary-navy)` | `var(--primary-azure)` |

### Shadows

| Variable | Light | Dark |
|----------|-------|------|
| `--shadow-xs` | `0 2px 4px rgba(0,0,0,0.08)` | `0 2px 4px rgba(0,0,0,0.25)` |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.08)` | `0 2px 8px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 8px 20px rgba(0,0,0,0.12)` | `0 8px 20px rgba(0,0,0,0.35)` |
| `--shadow-lg` | `0 12px 24px rgba(0,0,0,0.12)` | `0 12px 24px rgba(0,0,0,0.35)` |
| `--shadow-xl` | `0 20px 60px rgba(0,0,0,0.15)` | `0 20px 60px rgba(0,0,0,0.4)` |

### Surfaces

| Variable | Light | Dark |
|----------|-------|------|
| `--surface-subtle-*` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,0.06)` |
| `--surface-hover-*` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.12)` |

### Border Colors

Color-only variables (not `border` shorthand — use with `border-*-color` properties).

| Variable | Light | Dark |
|----------|-------|------|
| `--border-color-*` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` |
| `--border-color-subtle-*` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` |

### Modal Overlay

| Variable | Light | Dark |
|----------|-------|------|
| `--overlay-modal-*` | `rgba(0,0,0,0.6)` | `rgba(0,0,0,0.8)` |

### Profile Card

| Variable | Light | Dark |
|----------|-------|------|
| `--profile-gradient-start-*` | `rgba(58,78,88,0.06)` | `rgba(255,255,255,0.05)` |
| `--profile-gradient-end-*` | `rgba(58,78,88,0.02)` | `rgba(255,255,255,0.02)` |
| `--profile-image-border-*` | `rgba(58,78,88,0.12)` | `rgba(255,255,255,0.1)` |

### Carousel Buttons

| Variable | Light | Dark |
|----------|-------|------|
| `--carousel-btn-bg-*` | `rgba(255,255,255,0.9)` | `rgba(30,30,40,0.85)` |
| `--carousel-btn-bg-hover-*` | `#ffffff` | `rgba(50,50,65,0.95)` |

### Hero Text & Overlay

| Variable | Light | Dark |
|----------|-------|------|
| `--hero-text-*` | `var(--primary-navy)` | `#ffffff` |
| `--hero-overlay-*` | `linear-gradient(to top, var(--primary-navy) 0%, transparent 40%)` | `linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 40%)` |
| `--hero-overlay-opacity-*` | `0.5` | `0.8` |

## Active Defaults (Light mode)

The unsuffixed active variables are set in `colors.css` `:root` to the light-mode raw pair by default. `styles-dark.css` re-assigns them to the dark-mode raw pair.

| Active Variable | Default (Light) |
|-----------------|-----------------|
| `--text-color` | `var(--text-color-light)` |
| `--background-color` | `var(--background-color-light)` |
| `--box-background` | `var(--box-background-light)` |
| `--link-color` | `var(--link-color-light)` |
| `--link-hover` | `var(--link-hover-light)` |
| `--footer-bg` | `var(--footer-bg-light)` |
| `--footer-text` | `var(--footer-text-light)` |
| `--disclaimer-bg` | `var(--disclaimer-bg-light)` |
| `--disclaimer-text` | `var(--disclaimer-text-light)` |
| `--focus-color` | `var(--focus-color-light)` |
| `--accent-color` | `var(--accent-color-light)` |
| `--surface-subtle` | `var(--surface-subtle-light)` |
| `--surface-hover` | `var(--surface-hover-light)` |
| `--border-color` | `var(--border-color-light)` |
| `--border-color-subtle` | `var(--border-color-subtle-light)` |
| `--overlay-modal` | `var(--overlay-modal-light)` |
| `--profile-gradient-start` | `var(--profile-gradient-start-light)` |
| `--profile-gradient-end` | `var(--profile-gradient-end-light)` |
| `--profile-image-border` | `var(--profile-image-border-light)` |
| `--carousel-btn-bg` | `var(--carousel-btn-bg-light)` |
| `--carousel-btn-bg-hover` | `var(--carousel-btn-bg-hover-light)` |
| `--hero-text` | `var(--hero-text-light)` |
| `--hero-overlay` | `var(--hero-overlay-light)` |
| `--hero-overlay-opacity` | `var(--hero-overlay-opacity-light)` |

## Contrast Requirements

- All text must pass WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Both light and dark themes must meet accessibility standards
- CTA borders (2px solid) ensure contrast regardless of page background
- The color refactor fixed 7 contrast issues: focus outline navy on white (≥3:1), back-to-top navy on azure (≥4.5:1), stat-bridge text in dark mode (≥4.5:1), blockquote border navy on white (≥3:1), gold accent `#B8901E` on white (≥3:1), dark-mode button text contrast, and dark card background `#1e2a3a`

## Usage Guidelines

- Use CSS custom properties (`var(--property)`) for all colors — never hardcode hex values in component CSS
- Components reference **unsuffixed active variables** (`--text-color`, `--box-background`) — never the suffixed raw pairs directly
- Twin primaries are constant across modes: navy header in both modes, azure CTA-1, navy CTA-2
- CTAs always carry a 2px solid border of the opposite twin primary
- Nav links use the inverted twin primary to contrast with the header background
- Logo fill is constant (`--logo-fill: var(--primary-azure)`) — the header is navy in both modes
- Page link colors (`--link-color`) are for content links only; nav links use `--nav-hover-bg` for hover states
- Surface colors are for secondary interactive backgrounds only — use `--box-background` for card-level surfaces

### Color Intensity Levels

Color is used sparingly — the brand is primarily typography and whitespace. There are two levels of color application:

| Level | Application | Examples |
|-------|-------------|---------|
| **Full background** | Key navigational and structural elements only | Header, CTA buttons |
| **Accent** (sparingly) | Interactive and highlight elements | Links on hover, small decorative accents, icons |

Rule of thumb: if an element isn't structural (navigation) or a primary action (CTA), it should not use a full background color. Accent-level usage (text color, small highlights) is preferred for everything else.