---
description: Design doc and spec reading/writing discipline, plus spec collapse rules
globs: ["BACKLOG.md", ".design/**", ".specs/**"]
---

# Spec & Design Document Discipline

## Pre-Implementation Reading

Before writing any code, read all relevant design and spec documents:

1. Read `.design/SPEC.md` to discover which feature tag, design docs, and functional specs apply
2. Read every `.design/` document and `.specs/` file referenced by SPEC.md or BACKLOG.md

## Post-Implementation Updates

- Update `.design/` files if visual/UX decisions were changed during implementation
- Update `.specs/` files if requirements, data structures, or acceptance criteria evolved
- **Never modify `.design/` or `.specs/` without user confirmation for proposed changes**

## Spec Collapse Rule

When multiple backlog items affect the **same file or the same logical scope**, create **one spec file** — not N separate ones.

### How it works

| Scenario | Old approach (wrong) | New approach (right) |
|----------|---------------------|---------------------|
| 7 items all needing changes to `metode` article | 7 separate `.specs/metode-*/` directories | 1 `.specs/metode-overhaul/README.md` |
| 4 profile card fixes | 4 separate `.specs/profile-card-*/` directories | 1 `.specs/profile-card-redesign/README.md` |
| Completely unrelated items (different feature, different files) | Still separate specs | Still separate specs — collapse only when scope overlaps |

The spec title and directory should reflect the shared concern. Individual item IDs go in the **Backlog References** section.

### Exception

Items that are genuinely unrelated (different modules, different features, no shared files) still get separate specs. Collapse is for overlapping scope, not for convenience.
