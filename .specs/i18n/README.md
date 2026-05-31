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
- **Translation scope:** All articles — full site content translation in one pass
- **Translation method:** AI-assisted — drafts produced by AI, reviewed and approved by domain expert (Rasmus)

## Scope

Files to create/modify:

- Language-specific page directories (e.g. `_pages/no/`, `_pages/en/`)
- `_data/languages.yml` — language configuration
- Language detector logic (Jekyll plugin or include)
- Language switcher component (`_includes/language-switcher.html`)
- SEO hreflang tags in `<head>`
- Existing `_pages/*.md` files — migrate to language subdirectories

## Implementation Notes

### Translation workflow

1. Infrastructure first: language detector, switcher, hreflang tags, directory structure
2. Content migration: move existing Norwegian pages to `_pages/no/`
3. Translation pass (AI-assisted): one article at a time, starting with landing/product pages, then articles
4. Review pass: domain expert (Rasmus) reviews each translated article
5. Polish: language switcher UX, edge cases (partial translations, fallback behavior)

### First target language

Default assumption is English (en). Additional languages can be added per the same pattern.

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
