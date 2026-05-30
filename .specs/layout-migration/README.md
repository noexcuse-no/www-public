# Layout Migration — Chore Specification

> Created: 2026-05-30
> Status: Ready

## Purpose / Problem

The article pages under `_pages/ledelse_*.md` currently use inline HTML and arbitrary class combinations rather than the project's layout system (`.container`, `.section`, `.grid`, `.flex-*`). This makes them inconsistent and harder to maintain.

## Decision

- **Approach:** Full redesign pass — convert all article pages at once, not incrementally

## Scope

Files to modify:

- All `_pages/ledelse_*.md` files — rewrite markup to use layout system classes
- CSS — verify all layout classes used are defined; add missing ones if needed
- `_layouts/page.html` or `_layouts/article.html` — ensure layout templates support the classes

Existing design reference: `.design/layouts.md`

## Acceptance Criteria

- [ ] All `_pages/ledelse_*.md` files use `.container`, `.section`, `.grid`, and `.flex-*` classes consistently
- [ ] Visual appearance is preserved (no regressions in spacing, alignment, or proportions)
- [ ] Dark mode works on every converted page
- [ ] Mobile layout works on every converted page
- [ ] Diff shows only structural class changes — content text is unchanged

## Backlog References

P5

## Dependencies

None. Independent of other features.
