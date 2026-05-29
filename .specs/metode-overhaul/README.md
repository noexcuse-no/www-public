# `/metode/` Overhaul — Fix Specification

## Problem

The `/metode/` page (`_pages/om_metode.md`) has multiple content and layout issues identified during user testing and regression checking. All affect the same file and should be done in a single pass to avoid merge conflicts.

## Scope (Single file: `_pages/om_metode.md`)

| ID | Change |
|----|--------|
| Fix-260527-01 | New title, description, and introductory paragraph |
| Fix-260527-02 | Remove "Vi fremhever fire prinsipper:" line (line ~113) |
| Fix-260527-03 | Remove ", utvikling" from Mennesker frame-card tag list (line ~62) |
| Fix-260527-04 | Cut "Symbolsk"-starting sentence from all four frame-card descriptions (lines ~54, 63, 74, 83) |
| Fix-260527-05 | Fix syntax errors in the file |
| Fix-260527-06 (R7) | Restore missing `</sup>` tags for footnotes |
| Fix-260527-07 (R8) | Restore truncated CTA section (missing `</section>`, booking links) |

## Backlog References

Fix-260527-01 through Fix-260527-07 (was D7-D11 + R7-R8 in old Phase 11)

## Dependencies

All items share the same file. Must be done in a single edit pass, ordered:
1. Fix-260527-01 first (structural: title/description changes)
2. Remaining edits are independent but on same file — apply together

## Acceptance Criteria

- [ ] `/metode/` has new title, description, and introductory paragraph
- [ ] "Vi fremhever fire prinsipper:" line removed
- [ ] "utvikling" tag removed from Mennesker frame-card
- [ ] "Symbolsk" sentences removed from all four frame-card descriptions
- [ ] No syntax errors in the file
- [ ] All `<sup>` tags properly closed
- [ ] CTA section is complete with `</section>` and booking links
- [ ] Page renders correctly in both light and dark mode
- [ ] Mobile layout tested
