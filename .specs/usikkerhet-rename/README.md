# `/organisasjonskultur/` → `/usikkerhet/` — Fix Specification

## Problem

`_pages/ledelse_usikkerhet.md` has `permalink: /organisasjonskultur/` — the permalink does not match the page's actual subject (usikkerhet / uncertainty). The `/organisasjonskultur/` URL is misleading and inconsistent with the navigation structure.

Also: 12 open `<sup>` tags in the same file need closing.

## Scope

- `_pages/ledelse_usikkerhet.md` — change `permalink:` to `/usikkerhet/`, fix frontmatter, JSON-LD, close `<sup>` tags
- `_pages/ledelse_60-2.md` — update any cross-reference to `/organisasjonskultur/` → `/usikkerhet/`
- `_products/ledelse-60-2.md` — same cross-reference update
- No redirect needed — site is small and Google will re-index on next build

## Backlog References

Fix-260524-01, Fix-260522-06 (R6)

## Acceptance Criteria

- [ ] `permalink:` changed to `/usikkerhet/`
- [ ] All cross-references in `_pages/ledelse_60-2.md` and `_products/ledelse-60-2.md` updated
- [ ] All 12 open `<sup>` tags closed in `_pages/ledelse_usikkerhet.md`
- [ ] Site builds and renders `/usikkerhet/` correctly
