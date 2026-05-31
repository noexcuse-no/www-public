---
description: Pre-implementation planning check — consult planning agents when item complexity or cross-cutting risk warrants it
globs: ["BACKLOG.md", ".omo/plans/**", ".omo/todos/**"]
---

# Planning Gate

Before starting implementation on any BL item, evaluate whether a planning step is warranted:

## When to plan

- **Item has dependencies** (non-empty `Depends On` column) — especially if those deps are Planned or Doing, not yet Done
- **Cross-cutting concern** — the item shares files, data models, or UI patterns with another Planned BL item
- **Multi-step work** — 2+ distinct sub-tasks, multiple files, or changes across CSS/HTML/JS layers
- **Spec exists but needs refinement** — `.specs/<item>/README.md` exists but lacks acceptance criteria, scope, or design decisions

## What to do

If any check above flags:

1. **Metis** (`task(subagent_type="metis", ...)`) — for ambiguous requirements or cross-item impact analysis
2. **Plan Agent** (`task(subagent_type="plan", ...)`) — for multi-step work breakdown and parallel execution opportunities
3. **Save the plan** to `.omo/plans/<item-id>-<short-name>.md`
4. If a saved plan already exists at `.omo/plans/`, **Momus** (`task(subagent_type="momus", ...)`) reviews it before execution — pass the plan file path as the sole prompt

## When NOT to plan

- Single-file, single-step changes (typo fix, trivial CSS tweak, text edit)
- Spec is complete and unambiguous, only one file changes, no dependencies involved

## Relationship to specs

- `.specs/` files define *what* and *why*. Planning determines *how* and *in what order*.
- If planning reveals a gap in the spec, update `.specs/<item>/README.md` before implementing.
