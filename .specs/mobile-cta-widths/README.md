# Mobile CTA Width Consistency — Fix Specification

## Problem

On mobile, "Bestill Ledelse 60:2" and "Book en uforpliktende samtale" CTAs have different widths. This creates visual inconsistency and a less polished appearance on the primary conversion buttons.

## Scope

- `assets/css/products.css` or relevant CTA CSS — ensure all CTAs at mobile breakpoint have consistent width behavior
- Multiple CTA instances in `_includes/products.html`, `_includes/cta.html` may be affected

## Backlog References

Fix-260524-06 (was 10.10 in old Phase 10)

## Design Constraints

- Mobile (≤599px): all CTAs take `width: 100%` (per `.specs/cta-design/README.md`)
- Touch targets: minimum 44×44px
- Padding should be consistent across all CTA types

## Acceptance Criteria

- [ ] All CTAs have the same width at mobile breakpoint
- [ ] Consistent padding across all CTA types
- [ ] Text does not overflow or get clipped
- [ ] Desktop widths remain unchanged (auto width, minimum 200px)
