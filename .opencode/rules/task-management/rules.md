# Task Management

> **Activation:** Read this file if you are going to committe endringer, opprette ny side/artikkel, or administrere oppgaver.

## Files

- `VERSION` - Semver version (e.g., `1.0.0`)
- `BACKLOG.md` - Task tracking and prioritization
- `CHANGELOG.md` - Version history

## Task Initiation

On task initiation: Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`, relevant `.design/` and `.specs/` documents.

## Task Completion

On task completion:
- Update `BACKLOG.md` - Remove the completed item (no "Done" section kept)
- Update `CHANGELOG.md` - Add entry under "[Unreleased]"
- Push changes to remote

## Branch Creation

Before making any modifications:
1. Ensure local `main` is current with remote:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a new git branch from updated main: `git checkout -b feature/description`
3. Make all changes within this branch
4. Never commit directly to main branch

## Branch Naming Convention

Format: `<type>/<short-description>`

| Type | Use for |
|------|---------|
| `feat/` | New features, content articles |
| `fix/` | Bug fixes, typos, broken links |
| `docs/` | Documentation, specs, design files |
| `style/` | CSS, formatting, visual polish |
| `refactor/` | Code restructuring without behavior change |
| `test/` | Test additions or updates |
| `chore/` | Tooling, dependencies, maintenance |

Examples: `feat/grc-content-rewrite`, `fix/dark-mode-contrast`, `docs/triader-spec`

## Frequent Commits

Commit often with clear, descriptive messages. Small, focused commits are easier to review and rollback if needed.

## Commit Message Convention

Format: `<type>(<scope>): <short summary>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
Scope: optional module or file name

Examples:
- `feat(grc): add governance references to struktur article`
- `fix(css): resolve dark mode contrast on benefit cards`
- `docs(triader): create functional specification`
- `style(hero): add gradient overlay to article banners`

Body (optional): Explain WHY the change was made, not just WHAT.

## Main Branch Protection

Do NOT make any code changes while on main branch. Always create a feature branch first.

## Pull Request Workflow

Every non-trivial change requires a PR. Trivial changes (single-line typos, minor CSS tweaks) may be committed directly to a feature branch without a PR, but must still go through a branch.

### Opening a PR

1. Ensure all pre-merge checks pass locally
2. Push the feature branch to remote
3. Open PR against `main`
4. PR description must include:
   - Reference to backlog item(s) addressed
   - "How to test" section for reviewer verification
   - Screenshot or description of visual changes (if applicable)
   - Self-review checklist completed

### Self-Review Checklist

Before requesting review or merging:
- [ ] `npm run lint` passes with zero errors
- [ ] `npm test` passes (if tests exist for modified code)
- [ ] Dark mode checked for all visual changes
- [ ] Mobile viewport checked (max-width 375px)
- [ ] No console errors in browser dev tools
- [ ] Cross-links verified (if links added or modified)
- [ ] Meta descriptions present (if new pages added)
- [ ] Accessibility: alt text on images, semantic HTML, color contrast

### Merge Requirements

- All CI checks must pass
- At least one review required (self-review acceptable for solo work)
- Use **squash merge** for feature branches — keeps `main` history clean
- Preserve commit history for large refactor branches only
- Delete feature branch after merge

## Blocked Items

Items that are blocked (waiting for user input, external information, or dependencies) should be marked with `blocked: reason` in the backlog and skipped when sequentially working through tasks.

**Strategy for blocked items:**
- Move blocked items to the bottom of "To Do"
- Continue with next unblocked item
- Periodically check if blocked items become unblocked

**Types of blocking:**
- `blocked: awaiting user input` — waiting for user to provide information
- `blocked: awaiting external` — waiting on external dependency
- `blocked: needs research` — needs research before proceeding (use Kaggle datasets)

## Research Preferences

When doing research:
- **Prefer Kaggle datasets** over web searches when available
- For knowledge queries (e.g., organization development, leadership theory), use the **Wikipedia dataset on Kaggle** instead of web search
- Fall back to web search only when Kaggle datasets don't contain the needed information

Example: Instead of searching Google/Wikipedia web, search Kaggle for "Wikipedia" dataset and query locally.

## CHANGELOG Release Flow

CHANGELOG entries follow a strict two-phase lifecycle:

1. **During development / while PR is open:**
   - ALL entries go under `[Unreleased]`
   - NEVER create a numbered version section (e.g., `[1.5.0]`) before merge
   - Example commit message: `docs(changelog): add entry under [Unreleased]`

2. **After PR is merged to main:**
   - Move entries from `[Unreleased]` to the new numbered version section
   - Add release date: `[1.5.0] - 2026-05-26`
   - This is done as the FINAL step after user confirms merge

ANTI-PATTERN (do NOT do this):
- Creating `[1.5.0]` section while PR is still open
- Moving entries out of `[Unreleased]` before `main` is updated

## Post-Merge Workflow

When user confirms "PR accepted/merged":

1. **Verify merge:**
   ```bash
   git fetch origin main
   git log --oneline origin/main | head -5
   # Confirm merge commit is present
   ```

2. **Switch to main (MANDATORY):**
   ```bash
   git checkout main
   ```

3. **Update main without losing local work:**
   ```bash
   git stash          # if there are uncommitted local changes
   git merge origin/main --no-edit
   git stash pop      # restore local changes if any
   ```

4. **Delete feature branch:**
   ```bash
   git branch -d feat/branch-name          # local
   git push origin --delete feat/branch-name   # remote
   ```

5. **Confirm clean state:**
   ```bash
   git status      # should show "nothing to commit, working tree clean"
   git branch      # should NOT show the deleted feature branch
   ```

WARNING: Never use `git reset --hard` to update main — user may have local work.

## Version Bumping

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.0.X): Bug fixes

**Timing:** Bump version AFTER PR is merged, before creating next branch.

Correct sequence:
1. Complete all work on feature branch
2. Create PR
3. PR gets merged
4. Switch to main, pull
5. Bump VERSION and metadata.yml
6. Commit directly to main: `chore(release): bump version to X.Y.Z`

When updating `VERSION`, also update `_data/metadata.yml` `version` field to match.