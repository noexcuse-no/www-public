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

- **A1 (Architecture cleanup) — prerequisite**: A1 stabilizes the CSS class system (hero unification, card extraction, color variables, file reorganization). P5 converts article pages to use these classes — doing P5 before A1 would target a moving class system.
- **N1–N3, N4–N7, B0–B4 — recommended sequencing**: P5 rewrites markup in all `_pages/ledelse_*.md` files. N1–N3 create new articles, N4–N7 add new perspective pages, B0–B4 edit existing benefit articles. Running P5 after all content changes are settled means one migration pass across the complete file set rather than returning for stragglers.

## Implementation Order

After A1 completes. Prefer running after N1–N7 content and B0–B4 edits are finalized.
