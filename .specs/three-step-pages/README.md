# Three-Step Pages — Feature Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

The Ledelse 60:2 product page describes a three-step process (kartlegging → analyse → tilbakemelding) but all content for all three steps lives on a single page. To better communicate each phase and allow targeted CTAs, each step should have its own sub-page.

## Decision

- **URL structure:** Sub-pages under `/ledelse-60-2/` — e.g. `/ledelse-60-2/kartlegging/`, `/ledelse-60-2/analyse/`, `/ledelse-60-2/tilbakemelding/`
- **CTA per step:** Each step page has its own call-to-action appropriate for that phase
- Content split from the main product page into the three sub-pages

## Scope

Files to create/modify:

- `_pages/ledelse-60-2/` — new directory with per-step page files
- `_pages/ledelse-60-2.md` — main product page (trimmed — overview + links to steps)
- `_data/ledelse-60-2.yml` — step data (descriptions, CTAs, icons)
- `_includes/ledelse-60-2-steps.html` — step navigation/card component
- CSS for step navigation component

## Acceptance Criteria

- [ ] Each step has its own URL under `/ledelse-60-2/<step>/`
- [ ] Main product page links to all three steps with clear navigation
- [ ] Each step page has a distinct CTA (e.g. "Book kartlegging →", "Se analyseprøve →", "Bestill tilbakemelding →")
- [ ] Breadcrumb or step indicator shows position in the three-step flow
- [ ] Dark mode tested on step pages
- [ ] Mobile layout tested — step navigation works on small screens

## Backlog References

FF5

## Dependencies

- FF6 (multi-product) should be designed first to ensure step-page architecture works generically
