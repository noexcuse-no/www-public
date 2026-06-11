# Broken Link Fixes

> **Backlog References:** R31
> **Created:** 2026-06-09
> **Status:** Draft

## Problem / Goal

The production site has at least one confirmed broken link: `https://noexcuse.no/triader/` does not resolve to the correct page. There may be additional broken links from the HTML→MD refactor or content migrations.

Goal: Identify and fix all broken internal links on the production site.

## Scope

### Known issues

| Broken URL | Expected Target | Likely Cause |
|---|---|---|
| `https://noexcuse.no/triader/` (or any link referencing `/triader/`) | `/triader/` | The page exists at `_pages/ledelse_triader.md` with `url: /triader/` — verify the link syntax is correct |

### Investigation

1. Scan all `_pages/*.md` files for markdown links referencing `/triader/` and verify the syntax
2. Test `bundle exec jekyll build` and check if the triader page generates at the expected URL
3. Check all cross-links added in R24.5 to ensure no other broken references
4. Check the information architecture map (`.design/information-architecture.md`) for any stale URLs

### Files to check

- `_pages/ledelse_triader.md` — frontmatter `url:` field
- `_pages/*.md` — all files referencing `/triader/` or `triader`
- `_includes/*.html` — any includes referencing triader
- `.design/information-architecture.md` — verify URL entries

## Acceptance Criteria

- [ ] `/triader/` resolves correctly in production build
- [ ] All internal markdown links to triader are correct
- [ ] No other broken internal links found (all pages in IA map resolve)
- [ ] `bundle exec jekyll build` exit 0
- [ ] PR description includes what was broken and the fix
