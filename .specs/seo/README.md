# SEO Improvements — Functional Specification

## Purpose and Scope

This document describes SEO foundation improvements for the No Excuse AS website. These are technical improvements to ensure search engines can properly index, understand, and rank the site's content.

## Requirements

All improvements must follow existing patterns in `.specs/shared/README.md` and `.design/` documentation.

---

## S1: Comprehensive Sitemap

### Purpose

The current `sitemap.xml` only contains the homepage. This limits search engine discovery of inner pages.

### Requirements

Generate a complete sitemap including:
- All `_pages/` content (12 pages currently)
- All `_products/` entries
- All `_profiles/` entries
- All `_cases/` entries
- All `_partners/` entries

### Implementation

**File:** `sitemap.xml`

**URLs to include:**

| Collection | URLs |
|------------|------|
| Pages | `/`, `/ledelse-60-2/`, `/om-oss/`, `/tillit/`, `/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`, `/usikkerhet/`, `/forankring/`, `/generativ-ki/`, `/metode/` |
| Products | `/products/ledelse-60-2/` |
| Profiles | `/profiles/dagfinn/` |
| Cases | Any cases in `_cases/` |
| Partners | Any partners in `_partners/` |

**Format:** Standard XML sitemap per https://www.sitemaps.org/protocol.html

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://noexcuse.no/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- more entries -->
</urlset>
```

**Priority values:**
- Homepage: 1.0
- Product/Service pages: 0.9
- Content/Article pages: 0.8
- About/Contact pages: 0.7

### Dependencies

- `_config.yml` — collection configuration (already has `output: true`)
- No new files needed

---

## S2: Canonical URLs

### Purpose

Prevent duplicate content issues when search engines index multiple versions of the same page (with/without trailing slash, with query parameters, etc.).

### Requirements

Add `<link rel="canonical">` to all pages pointing to their canonical URL.

### Implementation

**File:** `_includes/metadata.html`

**Change:** Add canonical tag before closing `</head>`

```html
<link rel="canonical" href="{{ page.url | absolute_url }}">
```

The `absolute_url` filter prepends `site.url` to create a full URL.

**Canonical URL calculation:**
- Homepage: `https://noexcuse.no/`
- Pages: `https://noexcuse.no/page-path/`
- Products: `https://noexcuse.no/products/product-name/`

### Dependencies

- `metadata.html` — existing include
- No frontmatter changes needed

---

## S3: Page-Specific Meta Descriptions

### Purpose

Currently `_includes/metadata.html` outputs the same site-wide description for all pages. Pages with unique content should have unique descriptions for better SEO.

### Requirements

Modify `metadata.html` to:
1. Use `page.description` if available in frontmatter
2. Fall back to `site.data.metadata.description` if not

### Implementation

**File:** `_includes/metadata.html`

**Current (line 3):**
```html
<meta name="description" content="{{ site.data.metadata.description }}">
```

**Change to:**
```html
<meta name="description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.data.metadata.description }}{% endif %}">
```

### Frontmatter Usage

Pages that need unique descriptions should add `description` to frontmatter:

```yaml
---
layout: page
title: "Tillit i ledelse"
description: "Lær hvordan du bygger psykologisk trygghet og tillit i organisasjonen. Praktiske metoder basert på forskning."
permalink: /tillit/
---
```

### Dependencies

- `metadata.html` — modify existing
- Existing pages with `description` in frontmatter will automatically benefit

---

## S4: Robots.txt Enhancement

### Purpose

Provide search engine crawlers with proper guidance and reference to the sitemap.

### Requirements

Update `robots.txt` to:
1. Reference sitemap URL
2. Define sitemap content type
3. Keep existing allow-all policy

### Implementation

**File:** `robots.txt`

**Current:**
```
User-agent: *
Disallow:
```

**Change to:**
```
User-agent: *
Disallow:

Sitemap: https://noexcuse.no/sitemap.xml
```

### Dependencies

- `sitemap.xml` — must be updated (S1)
- `robots.txt` — existing file

---

## S5: Web App Manifest

### Purpose

The current `site.webmanifest` is a template placeholder. Create a proper PWA manifest for No Excuse AS.

### Requirements

Create proper manifest with:
- Company name
- Short name for app launcher
- Theme colors (light/dark)
- Icons
- Display mode (standalone)
- Start URL

### Implementation

**File:** `site.webmanifest`

```json
{
  "name": "No Excuse AS",
  "short_name": "No Excuse",
  "description": "Forbedrer internkultur og kommunikasjon i bedrifter.",
  "start_url": "https://noexcuse.no/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "icons": [
    {
      "src": "/assets/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "lang": "no",
  "dir": "ltr"
}
```

**Theme colors match `colors.css`:**
- Light: `#ffffff`
- Dark: `#0f172a`

### Dependencies

- `assets/images/icon-192.png` — 192x192 icon (may need generation)
- `assets/images/icon-512.png` — 512x512 icon (may need generation)

### Design Guidelines

Per `.design/graphics.md`, icons should be:
- Scandinavian minimal style
- No text embedded
- SVG preferred if possible, fallback to PNG

---

## S6: BreadcrumbList JSON-LD

### Purpose

Add structured data for breadcrumb navigation so search engines understand site hierarchy and can display breadcrumbs in results.

### Requirements

Add `BreadcrumbList` JSON-LD to all pages that are not the homepage.

### Implementation

**Approach:** Add JSON-LD script block to `_includes/metadata.html` or create a new include.

**JSON-LD structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "No Excuse AS",
      "item": "https://noexcuse.no/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Page Name",
      "item": "https://noexcuse.no/page-path/"
    }
  ]
}
```

**Page hierarchy:**
- Homepage (`/`) — no breadcrumbs
- Product pages (`/ledelse-60-2/`) — Home > Ledelse 60:2
- Article pages (`/tillit/`) — Home > Ledelse 60:2 > [Article]
- About pages (`/om-oss/`) — Home > Om oss

### Implementation Location

Best added to `_includes/metadata.html` with conditional logic based on `page.url`.

### Dependencies

- `metadata.html` — modify existing

---

## S7: FAQPage Schema

### Purpose

Add FAQ structured data to content pages that have FAQ content, enabling rich snippets in search results.

### Target Page

`/tillit/` (ledelse_tillit.md) has a "Spør din LLM om tillit" section that could be marked as FAQ.

### Requirements

Add `FAQPage` JSON-LD to relevant pages with FAQ sections.

### Implementation

**File:** `_pages/ledelse_tillit.md`

**Add to frontmatter `json_ld`:**
```yaml
json_ld:
  type: "Article"
  # ... existing fields
  hasFAQPage:
    type: "FAQPage"
    mainEntity:
      - type: "Question"
        name: "Hvor ofte gir du feedback som folk faktisk husker — og bruker?"
        acceptedAnswer:
          type: "Answer"
          text: "This question prompts reflection on feedback effectiveness..."
      # ... more questions
```

### Dependencies

- `_pages/ledelse_tillit.md` — modify frontmatter
- Consider extending to other content pages with FAQ sections

---

## Common Patterns

### JSON-LD General Rules

Per `.specs/shared/README.md`:
- Use `absolute_url` filter for URLs
- Include `lang="no"` context where applicable
- Test structured data with Google's Rich Results Test

### Accessibility

All SEO improvements must maintain WCAG AA compliance:
- Semantic HTML maintained
- No hidden content injected without accessibility consideration
- Focus indicators preserved

### Dark Mode

All visual elements must support both themes per `.design/components.md`.

---

## Dependencies

| Task | Dependencies |
|------|-------------|
| S1 | sitemap.xml, _config.yml |
| S2 | metadata.html |
| S3 | metadata.html, pages with description frontmatter |
| S4 | sitemap.xml (S1), robots.txt |
| S5 | assets/images/icons (may need generation) |
| S6 | metadata.html |
| S7 | ledelse_tillit.md frontmatter |

---

## Version

1.4.1