# Reusable Components — No Excuse AS

## Hero Component

The hero is rendered via `_includes/hero.html` and styled by `assets/css/components/hero.css`.

### Dual-Source Data Pattern

The hero accepts data from two sources, with include params taking priority:

1. **Page frontmatter** — `page.hero.image`, `page.hero.title`, `page.hero.breadcrumb`, `page.hero_effect`
2. **Include parameters** — `{% include hero.html image="..." title="..." %}`

This enables the `perspektiv` layout to pass frame topic data without duplicating it in each article's frontmatter:
```liquid
{% include hero.html image=frame.hero.image title=frame.title breadcrumb="Perspektiv" %}
```

### CSS

Single `.hero` class set in `assets/css/components/hero.css`. Replaces 4 old hero implementations:
- `.landing-hero` (was in `products.css`)
- `.science-hero` (was in `products.css`)
- `.about-hero` (was in `about.css`)
- `.frame-hero` / `.perspektiv-hero` (was in `article.css`)

### Markup Structure

```html
<div class="hero">
  <div class="hero-image" role="img" aria-label="...">
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <nav class="hero-breadcrumb">...</nav>
    <h1 class="hero-title">...</h1>
    <p class="hero-intro">...</p>
  </div>
</div>
```

### Dark Mode

Controlled entirely via CSS variables — `.hero` uses `var(--banner-background-*)`, `var(--banner-text-*)`, `var(--primary-*)` from `colors.css`.

### Hero Effects

Optional scroll-driven effects activated by `hero_effect` frontmatter field:
- `parallax-fade` — image translates up 40px on scroll (0–300px), title/intro fade out with translateY

Handled by `HeroEffects` dispatcher in `animations.js`. The JS selector `.hero-image` drives the parallax.

---

## Card Component

Cards are rendered via `_includes/card.html` and styled by `assets/css/components/card.css`.

### Data Source

Cards iterate `site.topics` filtered by category:
```liquid
{% assign frame_topics = site.topics | where: "category", "frame" | sort: "weight" %}
{% for topic in frame_topics %}
  {% include card.html topic=topic %}
{% endfor %}
```

### Card Variants

Controlled by CSS modifier classes (not separate includes):

| Class | Usage | Features |
|-------|-------|----------|
| `.card--frame` | Frame perspective cards | Accent border, hover lift |
| `.card--benefit` | Benefit cards | Icon/illustration + description |
| `.card--numbered` | Process step cards | Step number badge, ordered layout |

### Per-Topic Accent

Each topic card gets a `data-topic-id` attribute matching the topic's slug. The `--card-accent` custom property enables per-topic accent colors via CSS:
```css
.card[data-topic-id="struktur"] { --card-accent: #...; }
```

### CSS Structure

```css
.card-grid          — Grid container (2/3 col, responsive)
.card               — Base card component
.card--frame        — Frame variant
.card--benefit      — Benefit variant  
.card--numbered     — Numbered step variant
.card-image         — Card illustration
.card-content       — Text container
.card-step-badge    — Step number display
.card-subtitle      — Subtitle text
.card-detail        — Detail/description text
.card-link          — CTA link within card
.card-link--cta     — Primary CTA link variant
```

---

## Buttons / CTAs

### Primary CTA Button
- **Height:** 44px minimum
- **Background:** `var(--cta-primary-bg)` (azure)
- **Text:** `var(--cta-primary-text)` (navy)
- **Border:** 2px solid `var(--cta-primary-border)` (navy)
- **States:** Default, Hover (translateY lift), Active, Disabled

### Secondary Button
- **Background:** `var(--cta-secondary-bg)` (navy)
- **Text:** `var(--cta-secondary-text)` (azure)
- **Border:** 2px solid `var(--cta-secondary-border)` (azure)

---

## Profile Card

- Photo (rounded, 120×120px)
- Name
- Contact links (phone, email) — pill-style with subtle background
- Expand button → modal with biography, tags, booking CTA
- Background: `var(--box-background-light/dark)`
- Modal backdrop: `var(--overlay-light)`

Styled by `assets/css/profiles.css`.

---

## Navigation

### Header
- Logo (inline SVG with `--logo-fill`)
- Navigation links
- Dark mode toggle

### Navbar
- Horizontal flex layout, centered
- Links use `--nav-link-color-light` (azure on navy bg in light mode) / `--nav-link-color-dark` (navy on azure bg in dark mode)
- Hover: `background: var(--nav-hover-bg-light/dark)`

Styled by `assets/css/header.css` and `assets/css/navbar.css`.

---

## Tags / Emne System

### Tag Cloud
Displayed on tag landing pages (`/emne/:tag/`):
- `.tag-cloud` — flex-wrap container of `.tag-cloud-item` links
- `.tag-name` — tag display name
- `.tag-count` — pill badge with accent background and `--primary-accent-contrast` text
- `.tag-badge` — inline tag badges on article list pages

Styled in `assets/css/article.css`.

---

## Form Elements
- Input fields (44px height minimum)
- Date picker (Microsoft Bookings)
- Submit buttons

---

## Theme Support

Light and dark mode are handled through CSS variable pairs. All components reference `var(--*-light)` / `var(--*-dark)` from `colors.css`. The active value is determined by `styles-dark.css` being enabled and the `[data-theme="dark"]` attribute on `<html>`.

**Never** use `.dark-mode` class selectors — the project migrated from that pattern to `[data-theme="dark"]` and `styles-dark.css`.

### Required Dark Mode Variables

Each component must use these variables for theme-aware styling:

| Purpose | Light Variable | Dark Variable |
|---------|---------------|---------------|
| Background | `--background-color-light` | `--background-color-dark` |
| Text | `--text-color-light` | `--text-color-dark` |
| Box background | `--box-background-light` | `--box-background-dark` |
| Box shadow | `--box-shadow-light` | `--box-shadow-dark` |
| Link | `--link-color-light` | `--link-color-dark` |
| Link hover | `--link-hover-light` | `--link-hover-dark` |
| Surface (subtle) | `--surface-subtle-light` | `--surface-subtle-dark` |
| Surface (hover) | `--surface-hover-light` | `--surface-hover-dark` |
| Border color | `--border-color-light` | `--border-color-dark` |

### New Components Checklist

Before merging any PR with new components, verify:
- [ ] All colors use CSS variables, not hardcoded values
- [ ] Light/dark variable pairs exist in `colors.css`
- [ ] Component uses `var(--property)` referencing `colors.css` — no `[data-theme="dark"]` overrides in component CSS
- [ ] Dark mode tested on all page sections
- [ ] No color contrast violations (WCAG AA minimum 4.5:1 for text)
- [ ] Touch targets minimum 44×44px
- [ ] Component CSS added via `_includes/styles.html` if new file
