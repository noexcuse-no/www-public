# i18n Multilingual Support — Specification (Future Feature)

## Purpose and Scope

Add multilingual support to the site, allowing visitors to view content in their preferred language.

## Status

**Future feature — not yet spec'd or scheduled.** This document is a placeholder for when the feature is prioritized.

## Approach (Decided)

- Language selection by browser `Accept-Language` header
- Fallback language: Norwegian Bokmål
- Logic handled in code (not webserver), per Jekyll best practices
- Content structure TBD (separate files per language vs. frontmatter-based)

## Requirements (TBD)

- Language switcher UI component
- SEO handling (hreflang tags)
- Content management strategy for translations

## Dependencies

- None. Independent of other features.
