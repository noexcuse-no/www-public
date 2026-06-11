# Mobile Header — Burger Menu Reposition

> **Backlog References:** R28
> **Created:** 2026-06-09
> **Status:** Draft
> **Depends on:** R24.7 (mobile hamburger menu already redesigned as full-screen modal)

## Problem / Goal

R24.7 redesigned the mobile hamburger menu as a full-screen modal overlay, but the burger toggle button remains on the **left side** of the mobile header, next to the logo. This creates a cluttered header on mobile where the logo and burger compete for space, forcing the header to wrap to two lines.

Goal: Move the burger menu toggle button to the right of the logo on mobile viewports so the header stays on a single line with the logo left-aligned and the menu toggle right-aligned.

## Scope

### Files to modify

| File | Change |
|------|--------|
| `_includes/navbar.html` | Move `.nav-toggle` element after the logo in DOM order for mobile layout |
| `assets/css/components/navbar.css` | Update mobile layout: flexbox `justify-content: space-between`, logo left, toggle right |

### Design constraints

- Desktop header layout must not change
- The `.nav-featured` CTA pill (Ledelse 60:2) should remain positioned correctly in both viewports
- The full-screen modal overlay (from R24.7) behavior must be preserved exactly
- Touch target for burger menu must remain ≥44×44px
- `aria-expanded` toggle and all accessibility attributes must be preserved

### Visual spec (mobile, ≤768px)

```
┌─────────────────────────────────────┐
│ [Logo]                     [☰]     │  ← single line
├─────────────────────────────────────┤
│                                     │
│ (full-screen overlay on toggle)     │
│                                     │
└─────────────────────────────────────┘
```

## Acceptance Criteria

- [ ] Mobile header is single line (logo left, toggle right)
- [ ] Desktop header (≥769px) is unchanged
- [ ] `.nav-toggle` touch target ≥44×44px
- [ ] Full-screen overlay opens/closes correctly
- [ ] `aria-expanded`, `aria-controls`, `aria-label` attributes preserved
- [ ] Dark mode toggle still visible and functional
- [ ] No horizontal scroll on mobile
- [ ] `npm run lint:css` passes
