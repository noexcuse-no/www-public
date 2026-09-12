# Feature: Customer Cases

> Status: Planned | BL: C1-C4

## Purpose and Scope

Define the page-class model for customer cases (`class: case`) and the content
and integration contract for populating it. Cases document proven results from
real customer engagements.

Cases appear in two contexts:
1. **Product pages** — filtered by `product_tags` to show relevant cases
2. **Article pages** — full case list rendered below the article body
3. **Front page** — rendered via `_includes/cases-cards.html`

## Data Model

- Page-class model: `site.pages where: "class", "case"` — no `_config.yml` collection
- New cases are `_pages/*.md` with `class: case`

## Frontmatter Schema

For `_pages/<case-slug>.md`:

```yaml
---
class: case
published: true
title: "Tittel"                          # required
description: "Kort beskrivelse"          # required
image: "assets/images/case-bilde.webp"  # optional
result: "30 % reduksjon i sykefravær"    # optional
customer: "Kundenavn AS"                 # optional
product_tags:                            # optional — product-page filtering
  - ledelse-60-2
---
```

## Rendering

`_includes/cases-cards.html`:

- Queries `site.pages | where: "class", "case" | where: "published", true`
- Accepts an optional `product_tag` parameter. When provided, only cases whose
  `product_tags` array contains the matching value are rendered.
- Renders nothing unless at least one published case page exists.
- Output: `<h2 class="landing-cases">Kundecaser</h2>` and a
  `.landing-cases-grid` of `.case-card` elements with `title`, `description`,
  and optional `result` (`.case-result`) and `customer` (`.case-customer`).

Inclusion points:

- `_layouts/product.html` line 19 — `{% include cases-cards.html product_tag=page.product_tag %}`
- `_layouts/article.html` line 122 — `{% include cases-cards.html %}`

## Styling

CSS classes live in `assets/css/products.css`:
`.landing-cases`, `.landing-cases-grid`, `.case-card`, `.case-result`, `.case-customer`.

## Content Requirements

- Real cases only (even if anonymized) — no placeholder/lorem ipsum content
- Each case must include a measurable result (`result` field)
- Sign off with customer before publishing
- Norwegian Bokmål

## Accessibility

- Images require descriptive `alt` text; no text embedded in images
- Site-wide WCAG AA rules apply (see `.specs/accessibility/README.md`)

## Visitor Flow Integration

Cases appear as trust signals in the visitor journey, between article reading and booking. Cases are referenced from:
- Forsiden (via `cases-cards.html`)
- Produktsider (tag-filtered)
- Om Oss (lenke til cases-seksjonen)
- Artikkelanbefalinger (hvis relevant)

## Acceptance Criteria

- [ ] At least 1 real case exists in `_pages/` with `class: case`, `title`, `description`, `result`
- [ ] `_includes/cases-cards.html` renders case content on article pages
- [ ] Cases are filtered correctly on product pages via `product_tags`
- [ ] Cases render on front page
- [ ] Jekyll build exit 0