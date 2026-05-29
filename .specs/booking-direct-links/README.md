# Booking Direct Links — Fix Specification

## Problem

Booking CTAs open in an iframe modal instead of linking directly to Microsoft Bookings. This adds an unnecessary intermediary step, can cause mobile usability issues, and prevents users from directly bookmarking the booking page.

Affected flows:
- "Velg et tidspunkt" (booking modal)
- "Book en uforpliktende samtale" (CTA)

## Scope

- `_includes/booking-modal.html` or equivalent — replace iframe with direct `<a href>` link
- CTA components (`_includes/cta.html`, `_includes/products.html`) — ensure booking URLs point directly to Microsoft Bookings
- Remove any related iframe JS if it becomes dead code

## Backlog References

Fix-260524-05 (was 10.8/10.9 in old Phase 10)

## Design Constraints

- Microsoft Bookings URL pattern is preserved — only the delivery mechanism changes
- Direct links must open in same tab (unless specified otherwise) to avoid tab fatigue

## Acceptance Criteria

- [ ] All booking CTAs are direct links, not iframe modals
- [ ] Microsoft Bookings opens in the same tab by default
- [ ] Mobile: booking link is tappable (44px minimum touch target — already met by CTA styling)
- [ ] No broken booking flow after change
