---
description: Branch naming, commits, PR workflow, changelog management, and version bumping
globs: ["BACKLOG.md", "CHANGELOG.md", "VERSION", ".omo/plans/**", ".omo/todos/**"]
---

# Task Management & Development Workflow

## Files
- `VERSION` — Semver version (e.g. `1.0.0`)
- `BACKLOG.md` — Task tracking and prioritization
- `CHANGELOG.md` — Version history

## Spec File Convention

**Every item added to BACKLOG.md MUST have a corresponding `.specs/` file created at the same time, in the same commit.** This ensures BL stays lean while context accumulates in spec files.

### Naming

| Item type | Spec path | Example |
|-----------|-----------|---------|
| **New feature** (no existing spec dir) | `.specs/<kebab-case-name>/README.md` | `.specs/animated-ctas/README.md` |
| **Issue/bug on existing feature** | `.specs/<feature-name>/issue-YYMMDD-NN.md` | `.specs/cta-design/issue-260529-01.md` |
| **Cross-cutting issue** (multiple features) | `.specs/cross-cutting/<kebab-case>/README.md` | `.specs/cross-cutting/dark-mode-consistency/README.md` |
| **Trivial fix** (< 5 lines, single file, no behavioral change) | No spec required. Mark `—` in BL. | — |

### Minimal spec template

The spec starts small but accumulates context over the item's lifetime:

```markdown
# Title

> Created: YYYY-MM-DD
> Status: Draft | Ready | In Progress | Review | Blocked

## Problem / Goal
One paragraph.

## Scope
Files, modules, dependencies affected.

## Acceptance Criteria
- [ ] Verifiable condition 1
- [ ] Verifiable condition 2

## Lessons Learned
<!-- Populated if item returns to Planning after attempted implementation -->
```

### When to update a spec
- **On BL addition:** Create spec with Problem/Goal + Scope + Acceptance Criteria
- **On starting work:** Update Status → In Progress, add implementation notes
- **On hitting a blocker:** Update Status → Blocked, document what's missing
- **On returning to Planning (abandoned):** Update Status → Ready, add Lessons Learned section with what was attempted and why it didn't work
- **On completion:** Final Status → Done (spec stays as permanent artifact)

### Exception
A spec file is not required ONLY if the item is both trivial AND has no spec-worthy context (e.g., a one-line typo fix with no behavioral change and no cross-file dependencies). The BL spec column shows `—` in this case. Any item that touches more than one file, changes behavior, or requires a decision MUST have a spec.

## Truth Source Hierarchy

When GitHub Projects/Issues (via MCP) and `BACKLOG.md` contain conflicting information about task state:

1. **GitHub Projects/Issues has priority** — GitHub definitions override and force an update of `BACKLOG.md`
2. **BACKLOG.md is master** when: information exists only in BACKLOG, or GitHub MCP is not yet operational, or there is no corresponding entity on GitHub for a given task
3. **Sync points:** Before branch creation, before first commit on a new task, and after PR merge — fetch current state from GitHub and reconcile BACKLOG.md

## On Task Initiation
1. `git fetch origin main --quiet 2>/dev/null` — ensure local main reference is current
2. Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`
3. Read relevant `.design/` and `.specs/` documents
4. Check git branch with `git branch && git log --oneline -3`

## On Task Completion
- `BACKLOG.md`: Remove the completed item (no "Done" section kept)
- `CHANGELOG.md`: Add entry under "[Unreleased]"

## Branch Creation
1. `git checkout -b feature/description`
2. Make all changes within this branch
3. Never commit directly to main branch

## Branch Naming
Format: `<type>/<short-description>`

Types: `feat` (new features/content), `fix` (bug fixes), `docs` (documentation), `style` (CSS/visual), `refactor` (code restructuring), `test` (test additions), `chore` (tooling/maintenance)

## Commit Convention
Format: `<type>(<scope>): <short summary>`

Types: feat, fix, docs, style, refactor, test, chore

Body should explain WHY the change was made, not just WHAT.

**Documentation-only exception:** Changes limited to `.md`, `.specs/`, and `.design/` files may use a single commit regardless of file count. The multi-commit rule applies to code changes where atomic reversibility matters.

**Every commit must include a co-author trailer:**
```
Co-authored-by: Rasmus S. Olsen <rasmus@noexcuse.no>
```

## Merge Strategy
**Always merge, never rebase.** Use `git merge origin/main` to integrate main into your branch. Rebase rewrites commit history (new hashes) — this destroys traceability when multiple developers or AI agents work on the same repository. Merge preserves original commits, hashes, and author attribution. The only cost is cosmetic (merge commits in `git log`), which is negligible with LLM-assisted tooling.

## Pre-Merge Checklist
Before opening a PR, verify locally:
1. `npm run lint` — 0 errors, 0 warnings
2. `npm test` — all tests pass (when test framework is operational)
3. Jekyll build — `bundle exec jekyll build` — exit 0

If any step fails: fix before opening PR. Pre-existing failures outside your changes must be documented in the PR description under "Pre-merge notes".

## PR Preflight

Before any `gh pr create` call, run in parallel:

```bash
GIT_MASTER=1 git fetch origin main
GIT_MASTER=1 git status --porcelain
GIT_MASTER=1 git log --oneline origin/main..HEAD
GIT_MASTER=1 git check-ignore $(git diff --name-only origin/main 2>/dev/null | head -3) 2>/dev/null
```

This reveals: upstream state, dirty files, commits unique to branch, and whether anything staged is gitignored.

## PR Workflow
1. `git fetch origin main && git merge origin/main` — integrate latest main, resolve conflicts if any
2. Push the feature branch to remote: `git push origin feature/branch-name`
3. Open PR against main via GitHub CLI or web
4. PR description **must** include:
   - Reference to backlog item(s) and any related GitHub Issues (`Closes #42`, `Refs #43`)
   - How-to-test section
   - Screenshot of visual changes in both light and dark mode (if applicable)
   - Pre-merge notes (pre-existing lint/test failures outside your changes, if any)
5. Merge method: squash merge — preserve issue references (`Closes #`, `Refs #`) in the squashed commit body
6. Delete branch after merge

## Changelog Flow
- During development: all entries go under "[Unreleased]"
- After merge: move entries from "[Unreleased]" to new numbered version section with date
- Never create numbered version section before PR is merged

## Post-Merge
```bash
git fetch origin main && git log --oneline origin/main | head -5
git checkout main
git merge origin/main --no-edit
git branch -d feature/branch-name
git push origin --delete feature/branch-name
```

## GitHub MCP Integration (When Operational)

When the GitHub MCP server connection is confirmed working:

### Branch → Issue Linking
- Before creating a branch: verify the issue exists on GitHub, note its number
- Branch name should reference the issue: `<type>/<issue-number>-<short-description>`
  Example: `fix/42-correct-profile-card-margin`

### Progress Sync
- On branch creation: move the GitHub Issue to "In Progress"
- On PR creation: link the PR to the issue via `Closes #` / `Refs #` in PR description
- On PR merge: issue is automatically closed via squash commit body

### BACKLOG Reconciliation
- On each sync point (before branch, before first commit, after merge): fetch open issues for the current milestone/project, compare with BACKLOG.md, update BACKLOG.md to match GitHub state
- If GitHub has a status that contradicts BACKLOG.md: **GitHub wins** — update BACKLOG.md

## Version Bumping
- Major (X.0.0): Breaking changes
- Minor (1.X.0): New features
- Patch (1.0.X): Bug fixes
- Timing: After PR is merged, before creating next branch
- Files to update: `VERSION`, `_data/metadata.yml` version field
