# Frontpage Profile Filter — Fix Specification

## Problem

The frontpage (`index.md`) shows all team profiles regardless of context. Profiles should be filterable based on page context using a Liquid filter, so relevant profiles appear on relevant pages.

## Scope

- `_includes/profiles.html` — add Liquid context filter logic (e.g., `where` filter or tag-based matching)
- `index.md` or relevant frontmatter — define which profiles to show per page context
- `_profiles/*.md` — ensure frontmatter tags are parseable for filtering

## Backlog References

Fix-260524-03 (was 10.6 in old Phase 10)

## Design Constraints

- Vanilla Liquid — no JavaScript for filtering
- Existing template structure should be preserved
- Fallback: if no filter context is provided, show all profiles (current behavior)

## Acceptance Criteria

- [ ] Frontpage shows only profiles matching page context
- [ ] Fallback shows all profiles when no filter is defined
- [ ] All profiles still render via their dedicated profile pages
- [ ] Site builds without Liquid errors
