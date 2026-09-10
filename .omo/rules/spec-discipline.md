---
description: Design doc and spec reading/writing discipline, plus spec collapse rules
globs: ["BACKLOG.md", ".design/**", ".specs/**"]
---

# Spec & Design Document Discipline

## Pre-Implementation Reading

Before writing any code, read all relevant design and spec documents:

1. Read `.design/architecture.md` for site structure, URL conventions, and collection schemas
2. Read the design docs covering the changed area as applicable: `.design/brand-perception.md` (tone/voice), `.design/information-architecture.md` (cross-link map), `.design/components.md`, `.design/colors.md`, `.design/typography.md`, `.design/css-architecture.md`, `.design/graphics.md`, `.design/deployment.md`
3. Read every `.specs/` file referenced by those design docs, by the relevant BACKLOG.md rows, or by the files being changed

## Post-Implementation Updates

- Update `.design/` files if visual/UX decisions were changed during implementation
- Update `.specs/` files if requirements, data structures, or acceptance criteria evolved
- **Never modify `.design/` or `.specs/` without user confirmation for proposed changes**

## Spec Collapse Rule

When multiple backlog items affect the **same file or the same logical scope**, create **one spec file** — not N separate ones.

### How it works

| Scenario | Old approach (wrong) | New approach (right) |
|----------|---------------------|---------------------|
| 5 quiz feature items (BL Q1–Q5) | 5 separate `.specs/quiz-*/` directories | 1 `.specs/quiz/README.md` |
| 2 booking CTA fixes | 2 separate `.specs/booking-*/` directories | 1 `.specs/booking-direct-links/README.md` |
| Completely unrelated items (different feature, different files) | Still separate specs | Still separate specs — collapse only when scope overlaps |

The spec title and directory should reflect the shared concern. Individual item IDs go in the **Backlog References** section.

### Exception

Items that are genuinely unrelated (different modules, different features, no shared files) still get separate specs. Collapse is for overlapping scope, not for convenience.
