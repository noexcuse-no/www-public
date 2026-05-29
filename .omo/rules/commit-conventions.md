---
description: Commit scope separation — toolchain config in its own commit
globs: [".opencode/opencode.json", ".opencode/lookup.json", ".opencode/.gitignore"]
---

# Commit Conventions

## Scope Separation

Toolchain configuration changes (`.opencode/opencode.json`, `.opencode/lookup.json`, `.opencode/.gitignore`) **must be in their own commit**, separate from feature implementation and content changes.

### Why

| Reason | Consequence of mixing |
|--------|----------------------|
| **Rollback safety** | A mixed commit means you can't revert a config change without reverting unrelated feature work |
| **CI isolation** | Lint failures from toolchain changes shouldn't block feature deployments |
| **Review clarity** | Toolchain changes require different review context than feature logic |

### What counts as "toolchain"

| In scope (separate commit) | Not in scope (normal commit) |
|---------------------------|------------------------------|
| `.opencode/opencode.json` — standing directives | Feature `.specs/` files |
| `.opencode/lookup.json` — action mapping | `.design/` documents |
| `.opencode/.gitignore` — tooling exclusion | Content, CSS, JS, HTML changes |
