# Feature: Customer Cases

> Status: Planned | BL: C1-C4

## Purpose and Scope

Define the `_cases` Jekyll collection for case studies and specify the content + integration plan for populating it. Cases serve as **trust signals** — they are the primary way a new company (<1 year old) demonstrates proven results.

Cases appear in two contexts:
1. **Inline on product pages** — filtered by `product_tags` to show relevant social proof
2. **Dedicated section on the front page** — rendered via `_includes/cases.html`

## Gap Analysis Input

From the website gap analysis (April 2026):

- The `_cases` collection exists and is registered in `_config.yml` but contains **zero entries**
- `_includes/cases.html` renders an empty section on the front page
- The company was founded June 2025 — <1 year old with no compensating trust mechanisms published
- All 7 block references to cases/testimonials across the site (`_includes/`, `_layouts/`, pages) need content to anchor on
- Cases are the single highest-impact conversion asset the site currently lacks: they directly address the trust deficit for a new consulting company

## Implementation Plan

### Phase 1: Schema & Infrastructure (existing — complete)

- `_config.yml` registers `cases` collection with `output: true`
- `_includes/cases.html` exists with a basic loop rendering `title`, `description`, `result`, `customer`
- `_data/cases.css` has basic styling (part of product page CSS)

### Phase 2: Content Population (pending)

Create 1–3 case entries in `_cases/`. Each entry should follow the frontmatter schema:

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

**Content requirements:**
- Real cases only (even if anonymized) — no placeholder/lorem ipsum content
- Each case must include a measurable result (`result` field)
- Sign off with customer before publishing
- Norwegian Bokmål

### Phase 3: Visitor Flow Integration

See `.specs/inbound-sales/README.md` — cases appear at the trust-signal stage of the visitor journey, between article reading and booking. Cases are referenced from:
- Forsiden (via `cases.html`)
- Produktsider (tag-filtered)
- Om Oss (lenke til cases-seksjonen)
- Artikkelanbefalinger (hvis relevant)

## Dependencies

- **Phase 2** is blocked on customer sign-off (or anonymization approval)
- **Phase 3** depends on C1 intake having produced at least 1 case

## Acceptance Criteria

- [ ] At least 1 real case exists in `_cases/` with `title`, `description`, `result`
- [ ] `_includes/cases.html` renders content (not empty) on the front page
- [ ] Cases are filtered correctly on product pages via `product_tags`
- [ ] Jekyll build exit 0
