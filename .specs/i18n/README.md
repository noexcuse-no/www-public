# i18n Multilingual Support — Feature Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

The site is currently Norwegian-only. To reach non-Norwegian-speaking visitors (international clients, partners), we need multilingual support with a clear, maintainable content structure.

## Decision

- **Content structure:** Separate files per language — e.g. `_pages/en/ledelse-60-2.md`, `_pages/no/ledelse-60-2.md`
- **Language detection:** Browser `Accept-Language` header
- **Fallback:** Norwegian Bokmål
- **Language switcher:** UI component for manual override

## Scope

Files to create/modify:

- Language-specific page directories (e.g. `_pages/no/`, `_pages/en/`)
- `_data/languages.yml` — language configuration
- Language detector logic (Jekyll plugin or include)
- Language switcher component (`_includes/language-switcher.html`)
- SEO hreflang tags in `<head>`
- Existing `_pages/*.md` files — migrate to language subdirectories

Open questions:

- Which pages get translation first? (TBD — likely landing pages and product pages)
- Who provides translations? (TBD — client, partner, or AI-assisted)

## Acceptance Criteria

- [ ] Visitors are redirected to their preferred language based on `Accept-Language`
- [ ] All pages have a fallback to Norwegian Bokmål when translation is missing
- [ ] Language switcher allows manual override and persists the choice
- [ ] hreflang tags are present on every page
- [ ] SEO impact is neutral or positive (no duplicate content penalties)

## Backlog References

FF2

## Dependencies

None. Independent of other features.
