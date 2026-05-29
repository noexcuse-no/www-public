# Hero Layout Fixes — Fix Specification

## Problems

1. **Full-width hero (Fix-260524-04):** Hero sections are constrained by `max-width` — they should be full-bleed (edge-to-edge) for a more premium visual treatment.
2. **Hero text overlay (Fix-260524-10):** Site title and description on banner images lack proper CSS text overlay for readability — needs gradient overlay styling as specified in `.design/ui-upgrade.md`.

## Scope

- `assets/css/layout.css` or existing hero CSS — remove `max-width` constraint from hero sections
- Hero template or CSS — apply gradient overlay from `.design/ui-upgrade.md` §2 (Hero Overlay Design)
- Ensure full-bleed does not affect other sections (only hero)

## Backlog References

Fix-260524-04, Fix-260524-10 (was D3 in old Phase 11)

## Design Reference

`.design/ui-upgrade.md` — Hero Overlay Design section with gradient specifications for both light and dark modes.

## Acceptance Criteria

- [ ] Hero sections extend full width (no max-width constraint)
- [ ] Text overlay with gradient is applied and readable on all hero images
- [ ] Dark mode gradient overlay matches `.design/ui-upgrade.md` spec
- [ ] Non-hero sections remain constrained to `max-width: 1100px` (existing behavior)
- [ ] Mobile layout tested
