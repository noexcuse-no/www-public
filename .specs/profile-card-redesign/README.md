# Profile Card Redesign — Fix Specification

## Problem

Profile card images have incorrect sizing and proportions in both compact and expanded views. Images appear too small in compact mode and proportions are inconsistent when expanded, creating a fragmented visual experience.

## Scope

- `assets/css/profiles.css` — adjust `.profile-image` and `.profile-image-large` dimensions, aspect ratios, and layout spacing
- Ensure the profile card layout accommodates different image aspect ratios without distortion

## Backlog References

Fix-260524-02 (was 10.5 in old Phase 10)

## Design Constraints

- Touch targets: minimum 44×44px
- Dark mode: use CSS variables from `colors.css` for all backgrounds and borders
- Profile images aspect ratio: 1:1 (square) as specified in `.design/graphics.md`

## Acceptance Criteria

- [ ] Profile images display at consistent size in compact view (≥80×80px)
- [ ] Large profile image in expanded view maintains aspect ratio without distortion
- [ ] Layout does not jump or shift when expanding/collapsing
- [ ] Dark mode tested
- [ ] Mobile layout tested
