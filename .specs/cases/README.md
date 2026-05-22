# Cases — Functional Specification

## Purpose and Scope

Define the `cases` Jekyll collection for case studies and testimonials. Cases appear in two contexts:

1. **Inline on product pages** — filtered by `product_tags` to show relevant social proof
2. **Dedicated section on the front page** — rendered via `_includes/cases.html`

## Requirements

### Front-page section

- Renders in `_includes/cases.html` within `<main>` (already included in `default.html`)
- Horizontal/flex layout (existing CSS `.cases` uses flexbox)
- Shows `title`, `description`, and optional `result` + `customer`

### Product-page filtering

- Product pages reference cases via a shared tag system (`product_tags` in case matches `tags` in product frontmatter)
- Only matching cases render in the "Kundesitater / cases" section of a product page

## Data Structures

### Case frontmatter (`_cases/*.md`)

```yaml
---
title: "Effektivisering av logistikkflyten"   # required
description: "Kort beskrivelse av caset"       # required
image: "assets/images/case-bilde.png"          # optional
result: "30% reduksjon i sykefravær"           # optional
customer: "Kundenavn AS"                       # optional
product_tags: "#ledelse"                       # optional — tag matching product.tags
---
```

## Dependencies

- **Collection**: Already declared in `_config.yml` (`cases: output: true`)
- **Template**: `_includes/cases.html` exists with basic loop
- **CSS**: `assets/css/cases.css` exists with basic styling
- **Integration**: Product page needs tag-based filtering logic
