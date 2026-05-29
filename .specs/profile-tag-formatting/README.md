# Profile Tag Formatting — Fix Specification

## Problem

`{{ profile.tags }}` in the profiles include renders as raw frontmatter text without spacing or formatting. Tags from `_profiles/*.md` frontmatter (e.g., `#struktur #mennesker`) need proper visual rendering.

## Scope

- `_includes/profiles.html` — apply Liquid filters (`split`, `join`, or loop) to render tags with proper spacing
- CSS in `assets/css/profiles.css` — optional: style tag display (inline-block, badges, etc.)

## Backlog References

Fix-260524-11 (was D4 in old Phase 11)

## Design Constraints

- Tags should be visually scannable
- No JavaScript for tag rendering — Liquid only
- Preserve existing tag data structure in frontmatter (`tags: "#tag1 #tag2"`)

## Acceptance Criteria

- [ ] Tags render with proper spacing between each tag
- [ ] Each tag is visually distinct (not a single blob of text)
- [ ] Dark mode: tag styling is consistent
- [ ] Mobile: tags wrap gracefully on small screens
