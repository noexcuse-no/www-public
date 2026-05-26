# Task Management

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
- Create a new git branch: `git checkout -b feature/description`
- Make all changes within this branch
- Never commit directly to main branch

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

## Version Bumping

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.0.X): Bug fixes

When updating `VERSION`, also update `_data/metadata.yml` `version` field to match.