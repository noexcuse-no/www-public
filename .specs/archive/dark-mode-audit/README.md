# Dark Mode Consistency — Feature Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

Dark mode was added for core pages but consistency was never verified across every component and page type. Some components may use hardcoded colors instead of CSS variables, or miss explicit dark mode rules entirely.

## Decision

- **Scope:** Full site audit — every component on every page type is reviewed and fixed

## Scope

**Audit checklist (every component):**
- [ ] Header (logo, navigation links, mobile menu)
- [ ] Hero sections (headings, text, overlays, CTAs)
- [ ] Benefit/feature cards
- [ ] Profile cards
- [ ] Product cards
- [ ] Article content (body text, blockquotes, code blocks, tables)
- [ ] Footer (links, text, dividers)
- [ ] Forms and buttons
- [ ] Section backgrounds and borders
- [ ] Images and SVGs (filter/invert logic)

Files to modify:

- `assets/css/styles-dark.css` — primary dark mode CSS file
- Any component-specific CSS files that hardcode colors instead of using CSS variables
- `_includes/` components that need dark mode aware markup
- HTML templates that may need `data-theme` or class-based dark mode support

## Acceptance Criteria

- [ ] Every page type renders correctly in dark mode
- [ ] No hardcoded light-mode colors remain in components
- [ ] All colors use CSS variables from `colors.css`
- [ ] Dark mode toggle works consistently across all pages
- [ ] No contrast violations (WCAG AA minimum) in dark mode
- [ ] Mobile and desktop both tested

## Backlog References

X2

## Dependencies

None. Independent of other features.
