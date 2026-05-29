# Profile Card User Test Fixes — Fix Specification

## Problem

User testing (P5 brukertest) identified 4 visual issues with profile card behavior. Each has a clear root cause and fix scope.

## Issues

### D12 — Profile image too small in compact view (Fix-260527-08)

- **Problem:** Brukertest funn #4 — profile images are too small in compact card view; difficult to recognize people
- **Scope:** `assets/css/profiles.css`
- **Fix:** Increase image size in `.profile-compact` to minimum 80×80px, adjust layout to prevent overlap

### D13 — Profile image jumps on expand (Fix-260527-09)

- **Problem:** Brukertest funn #5 — profile image changes position when card expands, creating a jarring layout shift
- **Scope:** `assets/css/profiles.css`
- **Fix:** Use consistent image placement regardless of expanded/compact state; eliminate layout shift

### D14 — Contact link styling inconsistent (Fix-260527-10)

- **Problem:** Brukertest funn #8 — phone/email/linkedin links in profile details have inconsistent styling, lack visual hierarchy
- **Scope:** `assets/css/profiles.css`
- **Fix:** Define one link style for all contact points (icon + text, same color, same hover effect)

### D15 — Hero missing rounded bottom corners (Fix-260527-11)

- **Problem:** Brukertest funn #13 — hero banner has sharp bottom edges, breaking the rounded design language used elsewhere
- **Scope:** CSS — `layout.css` or the relevant hero component
- **Fix:** Add `border-radius: 0 0 <value> <value>` to hero banner for consistent visual language

## Backlog References

Fix-260527-08 through Fix-260527-11 (was D12-D15 in old Phase 11)

## Design Constraints

- Touch targets: minimum 44×44px
- Dark mode: all fixes must use CSS variables from `colors.css`
- Profile card behavior (expand/collapse) must remain functional
- Ensure `border-radius` does not break gradient overlay or hero image display

## Acceptance Criteria

- [ ] Profile images are ≥80×80px in compact view
- [ ] No layout shift when expanding/collapsing profile cards
- [ ] All contact links have consistent styling with clear visual hierarchy
- [ ] Hero banner has rounded bottom corners matching the site's design language
- [ ] Dark mode tested for all changes
- [ ] Mobile layout tested
