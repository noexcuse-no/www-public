# Architecture Specification — No Excuse AS Website

## Purpose

This document describes the architectural patterns, site structure, and development conventions for the No Excuse AS Jekyll website. It serves as a reference for:
- Internal dev AI agents working on the codebase
- Developers onboarding to the project
- Ensuring consistency across contributions

## Site Structure

```
www-public/
├── _pages/                    # Page content collection
│   ├── ledelse-60-2.md       # Product landing page
│   ├── om-oss.md             # Company page
│   └── vitenskapelig-grunnlag.md  # Methodology page
├── _layouts/                  # Layout templates
│   ├── default.html          # Standard page layout
│   └── landing.html          # Generic landing page layout
├── _includes/                 # Reusable HTML partials
├── _products/                 # Product data (frontmatter)
├── _profiles/                 # Team member profiles
├── _cases/                    # Case studies
├── _partners/                 # Partner organizations
├── _data/                     # Site-wide data (metadata.yml)
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   ├── images/               # Images and graphics
│   │   ├── icons/            # Icon assets
│   │   └── banners/          # Banner graphics
│   └── scripts/              # JavaScript files
├── .specs/                    # Functional specifications
├── .design/                   # Design documentation
└── tests/                     # Test files
```

## Jekyll Configuration

### Collections

Collections are defined in `_config.yml` and output as static pages:

```yaml
collections:
  profiles:
    output: true
  products:
    output: true
  cases:
    output: true
  partners:
    output: true
  pages:                      # Pages collection (custom)
    output: true
    permalink: /:path/
```

### URL Patterns

| Collection | URL Pattern | Example |
|------------|-------------|---------|
| `_pages/` | `/:filename/` | `/ledelse-60-2/` |
| `_products/` | `/products/:name/` | `/products/ledelse-60-2/` |
| `_profiles/` | `/profiles/:name/` | `/profiles/dagfinn/` |
| `_cases/` | `/cases/:title/` | `/cases/teknologiselskap/` |
| `_partners/` | `/partners/:name/` | `/partners/egene/` |

## Path Handling Rules

### Always Use `relative_url` Filter

For all asset paths, **always use** the `relative_url` filter to ensure correct paths regardless of site configuration:

```liquid
<!-- Correct -->
<img src="{{ '/assets/images/logo.png' | relative_url }}" alt="Logo">

<!-- Incorrect -->
<img src="{{ site.baseurl }}/assets/images/logo.png" alt="Logo">
<img src="/assets/images/logo.png" alt="Logo">
```

### Why?

- `site.baseurl` may be empty in development or set to a subdirectory in production
- The `relative_url` filter handles both cases correctly
- GitHub Pages may serve from a subdirectory; the filter handles this transparently

### The `relative_url` Filter

Jekyll's `relative_url` filter prepends `site.baseurl` to the given path:

```liquid
{{ '/assets/css/styles.css' | relative_url }}
<!-- Without baseurl: /assets/css/styles.css -->
<!-- With baseurl /subdir: /subdir/assets/css/styles.css -->
```

### Image Partial

Use `_includes/image.html` for consistent image rendering:

```liquid
{% include image.html src="/assets/images/photo.png" alt="Description" class="my-class" %}
```

## Layouts

### default.html

Standard page layout including:
- Header with navbar
- Main content area
- Products section
- Profiles section
- Cases section
- Partners section
- Footer
- Scripts

### landing.html

Generic landing page layout for product/company pages:
- Header
- Hero section (via `{{ content }}` with frontmatter)
- Custom content sections
- Partners section
- Footer

**Note:** Landing layout should NOT hard-code product names or specific content. All content must come from page frontmatter or collections.

## Collections

### _pages/ Collection

Pages are standalone content pages (not tied to a data collection).

| File | Purpose | Layout |
|------|---------|--------|
| `ledelse-60-2.md` | Product landing page | landing |
| `om-oss.md` | Company page | default |
| `vitenskapelig-grunnlag.md` | Scientific methodology page | default |

### _products/ Collection

Product data files with structured frontmatter for use in both inline sections and landing pages.

### _profiles/ Collection

Team member profiles with contact information.

### _cases/ Collection

Case studies with results and customer attribution.

### _partners/ Collection

Partner organizations with logos and links.

## Modules

### CSS Modules

CSS is organized into modular files:

| File | Purpose |
|------|---------|
| `colors.css` | CSS custom properties (variables) |
| `typography.css` | Font and text styles |
| `layout.css` | Basic layout styles |
| `utilities.css` | Utility classes |
| `header.css` | Header styles |
| `navbar.css` | Navigation bar styles |
| `footer.css` | Footer styles |
| `profiles.css` | Profile card styles |
| `products.css` | Product section styles |
| `cases.css` | Case study styles |
| `podcast.css` | Podcast section styles |
| `about.css` | About page styles |
| `partners.css` | Partner section styles |
| `styles-light.css` | Light mode theme |
| `styles-dark.css` | Dark mode theme |

### CSS Variables

All colors must use CSS custom properties from `colors.css`:

```css
/* Light mode */
background-color: var(--background-color-light);
color: var(--text-color-light);
box-shadow: var(--box-shadow-light);

/* Dark mode */
.dark-mode {
    background-color: var(--background-color-dark);
    color: var(--text-color-dark);
    box-shadow: var(--box-shadow-dark);
}
```

## Frontmatter Schemas

### Product (`_products/*.md`)

```yaml
---
name: "Product Name"
short_description: "Brief description"
description: "<p>HTML description...</p>"
booking_url: "https://..."
image: "assets/images/hero.png"
tags: "#tag1 #tag2"
benefits:
  - title: "Benefit title"
    description: "Benefit description"
    icon: "assets/images/banners/benefit.png"
process_steps:
  - title: "1. Step title"
    description: "Step description"
    icon: "assets/images/banners/step.png"
story: "Product story..."
---
```

See `.specs/ledelse-60-2/README.md` for full product schema.

### Page (`_pages/*.md`)

```yaml
---
layout: landing
title: "Page Title"
permalink: /path/
---
```

## Accessibility Requirements

All pages must meet WCAG AA standards:

1. **Language attribute**: `lang="no"` on `<html>`
2. **Alt text**: All images require descriptive `alt` attribute
3. **Semantic HTML**: Use proper `<header>`, `<main>`, `<footer>`, `<nav>`
4. **Color contrast**: Both light and dark themes must pass contrast checks
5. **Dark mode support**: All new components must have light/dark variants

## Performance Considerations

- Use `relative_url` for all asset paths
- Optimize images before adding to `/assets/images/`
- Minimize CSS file size by module organization
- No external CDN dependencies for core assets

## Dependencies

- **Hosting**: GitHub Pages (automatic build on commit)
- **CMS**: Jekyll (static site generator)
- **Testing**: Vitest, htmlhint, stylelint, eslint
