# Emne/Tag — Feature Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

Visitors need a way to browse content by topic. Currently articles have frontmatter tags but there's no `/emne/` page to discover them — tags are invisible to users and offer no navigation value.

## Decision

- **Generation:** Server-generated Jekyll pages (one page per tag)
- **Tag source:** Free-form — any string in an article's `tags` frontmatter array automatically becomes a page
- **Scope:** Articles only (not profiles, products, or frame pages)

## Scope

Files to create/modify:

- `.specs/emne/README.md` — this spec
- `_pages/emne.md` — the `/emne/` landing page (list of tags with counts)
- `_layouts/tag.html` — layout for individual `/emne/<tag>/` pages
- `_config.yml` — register the tag collection or generator plugin

## Acceptance Criteria

- [ ] `/emne/` shows all unique tags across articles, each with a count of matching articles
- [ ] Each tag name links to `/emne/<tag>/` showing a list of articles with that tag
- [ ] Tags with zero articles never appear
- [ ] Tag pages use the standard site layout (header/footer)
- [ ] Dark mode tested on both `/emme/` and `/emne/<tag>/` pages
- [ ] Mobile layout tested — tag cloud and article lists are readable on small screens

## Backlog References

FF1

## Dependencies

None. Independent of other features.
