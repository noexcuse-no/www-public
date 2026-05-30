# Multi-Product — Architecture Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

The site currently only sells Ledelse 60:2. Adding more products (e.g. Katalysator) requires a flexible product data model and page architecture that doesn't hardcode assumptions about a single product.

## Decision

- **Architecture:** Design for generic multi-product *now*, not later
- Products defined as collection entries with frontmatter-driven content
- Shared layouts, includes, and CTAs that work for any product

## Scope

Files to create/modify:

- `_products/` — Jekyll collection for product entries
- `_layouts/product.html` — generic product page layout
- `_includes/product-card.html` — reusable product card component
- `_includes/product-cta.html` — configurable CTA component
- `_data/products.yml` — product metadata (names, slugs, descriptions)
- `_config.yml` — register `_products` collection
- Existing `_pages/ledelse-60-2.*` — refactor to use the collection-driven layout

## Acceptance Criteria

- [ ] Adding a new product requires only adding a file to `_products/` and an entry in `_data/products.yml`
- [ ] Product pages use a shared layout — no per-product page templates
- [ ] Header/footer navigation picks up new products automatically
- [ ] Product cards render correctly with varying content length
- [ ] Dark mode tested on product pages
- [ ] Mobile layout tested

## Backlog References

FF6

## Dependencies

- Q7 (Katalysator) — not required for architecture design, but the first candidate after Ledelse 60:2
