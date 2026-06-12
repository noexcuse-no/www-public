# Architecture Specification — No Excuse AS Website

## Purpose

This document describes the architectural patterns, site structure, and development conventions for the No Excuse AS Jekyll website. It serves as a reference for:
- Internal dev AI agents working on the codebase
- Developers onboarding to the project
- Ensuring consistency across contributions

## Site Structure

```
www-public/
├── _pages/                    # All content pages (unified collection)
│   ├── ledelse-60-2.md       # Product page (class: product)
│   ├── dagfinn.md            # Profile page (class: profile)
│   ├── struktur.md           # Frame page (class: frame)
│   ├── generativ-ki.md       # Article page (class: benefit)
│   ├── om-oss.md             # Article page (class: article)
│   ├── samtale.md            # Process step (class: step, layout: article)
│   ├── intervju.md           # Process step (class: step, layout: article)
│   └── rapport.md            # Process step (class: step, layout: article)
├── _layouts/                  # Layout templates
│   ├── default.html          # Standard page layout
│   └── perspektiv.html       # Frame perspective layout
├── _includes/                 # Reusable HTML partials
├── _cases/                    # Case studies (future: migrate to _pages/)
├── _partners/                 # Partner organizations (future: migrate to _pages/)
├── _tags/                     # Tag index pages
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

All content lives in the unified `_pages/` collection with a `class` frontmatter property that declares the entity type:

```yaml
collections:
  pages:
    output: true
    permalink: /:path/
  cases:
    output: true
  partners:
    output: true
  tags:
    output: true
    permalink: /emne/:path/
```

### URL Patterns

All URLs are flat and explicit, set via `permalink` in each file:

| Page Type | File | URL | Class |
|-----------|------|-----|-------|
| Product | `_pages/ledelse-60-2.md` | `/ledelse-60-2/` | `product` |
| Profile | `_pages/dagfinn.md` | `/dagfinn/` | `profile` |
| Frame | `_pages/struktur.md` | `/struktur/` | `frame` |
| Article | `_pages/om-oss.md` | `/om-oss/` | `article` |
| Benefit | `_pages/generativ-ki.md` | `/generativ-ki/` | `benefit` |
| Step (samtale) | `_pages/samtale.md` | `/samtale/` | `step` |
| Step (intervju) | `_pages/intervju.md` | `/intervju/` | `step` |
| Step (rapport) | `_pages/rapport.md` | `/rapport/` | `step` |
| Tag | `_tags/ledelse.md` | `/emne/ledelse/` | `tag` |

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

## Content Types (Class-Based)

All content lives in `_pages/*.md` with a `class` frontmatter property. Use `site.pages | where: "class", "..."` to filter.

### `class: product`

Product landing pages with hero, benefits, process steps, and CTAs.

| Required | Optional |
|----------|----------|
| `name` | `benefits`, `process_steps` |
| `short_description` | `cta_a/b/c`, `story` |
| `permalink` | `image`, `tags` |

### `class: profile`

Team member profiles with contact information and bio.

| Required | Optional |
|----------|----------|
| `name` | `linkedin`, `booking_url` |
| `image` | `tags`, `bio` |
| `phone`, `email` | |
| `permalink` | |

### `class: frame`

Frame perspective pages (struktur, mennesker, påvirkning, identitet).

| Required | Optional |
|----------|----------|
| `frame_id` | `challenges`, `questions` |
| `hero`, `intro` | `about`, `cta` |
| `elements` | `color_accent` |
| `permalink` | |

### `class: article`

Standard article pages (om-oss, om-metode, makt, triader, perspektiv, etc.).

| Required | Optional |
|----------|----------|
| `title` | `tags`, `json_ld` |
| `permalink` | `citation`, `hero_effect` |

### `class: benefit`

Benefit article pages that also appear as cards on the product page.

| Required | Optional |
|----------|----------|
| `category: benefit` | `title`, `description` |
| `banner` | |
| `url` | |

### `class: step`

Process step pages that appear as cards on the product page. Uses `layout: article` for rendering (unified with other content pages).

**Note:** Step pages use `layout: article` + `class: step`. The `class: step` is used for collection filtering (product page cards), while the `article` layout provides the full page chrome (hero, sidebar, CTA). This avoids maintaining a separate `product` layout.

| Required | Optional |
|----------|----------|
| `category: step` | `title`, `description` |
| `step_number` | |
| `banner` | |
| `url` | |

### `class: case` / `class: partner`

Future content types. When content is added, place in `_pages/` with the appropriate class. Empty `_cases/` and `_partners/` collections remain in `_config.yml` for backward compatibility. See `.specs/a2-unified-pages-architecture/README.md` for migration plan.

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

All schemas are for `_pages/*.md` files. Use `class` to declare the entity type.

### Product (`class: product`)

```yaml
---
class: product
name: "Ledelse 60:2"
short_description: "..."
permalink: /ledelse-60-2/
image: "assets/images/hero.png"
tags: "#tag1 #tag2"
cta_a: { text: "...", title: "...", url: "..." }
benefits:
  - title: "Benefit title"
    description: "..."
    banner: "assets/images/banners/benefit.png"
    article_url: "/article/"
process_steps:
  - title: "1. Step title"
    description: "..."
    banner: "assets/images/banners/step.png"
story: "Product story..."
---
```

See `.specs/ledelse-60-2/README.md` for full product schema.

### Profile (`class: profile`)

```yaml
---
class: profile
name: "Full Name"
permalink: /profile-name/
image: "assets/images/profile.png"
phone: "+4799999999"
email: "name@noexcuse.no"
linkedin: "https://..."
booking_url: "https://..."
tags: "#tag1 #tag2"
bio: "Biography text..."
---
```

### Frame (`class: frame`)

```yaml
---
class: frame
frame_id: "struktur"
permalink: /struktur/
title: "Strukturperspektivet i ledelse"
hero:
  banner_image: "assets/images/banners/frame.webp"
  alt: "..."
  breadcrumb: "← No Excuse"
  intro: "..."
intro:
  heading: "..."
  body: "..."
elements:
  - title: "..."
    body: "..."
    signs:
      positive: "..."
      negative: "..."
color_accent: "#2A4D6E"
---
```

### Article (`class: article`)

```yaml
---
class: article
layout: page
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

## Profile Frontmatter

Members of `_pages/*.md` with `class: profile`:

```yaml
---
class: profile
name: "Full Name"
permalink: /profile-name/
image: "assets/images/profile.png"
phone: "+4799999999"
email: "name@noexcuse.no"
linkedin: "https://linkedin.com/in/..."
booking_url: "https://..."
tags: "#tag1 #tag2"
bio: "Biography text..."
---
```

## Page JSON-LD

Pages in `_pages/*.md` should include structured data:

```yaml
json_ld:
  type: "Article"         # or "Organization", "WebPage", etc.
  name: "Page Title"
  description: "SEO description"
```

For organization pages (`om_oss`):

```yaml
json_ld:
  type: "Organization"
  name: "No Excuse AS"
  url: "https://noexcuse.no"
  logo: "https://noexcuse.no/assets/images/noexcuse-logo-azure.webp"
```

## Permalink Convention

- Use kebab-case: `/page-slug/` not `/page_slug/` or `/pageSlug/`
- Trailing slash required
- Must match the filename convention (underscore → hyphen mapping is handled by Jekyll)

## Build Checks

Before pushing, run locally:

```bash
bundle exec jekyll build
```

Check for:
- Liquid syntax errors
- Missing `{% include %}` references
- New collections render at expected URLs
- All `_config.yml` entries are valid
