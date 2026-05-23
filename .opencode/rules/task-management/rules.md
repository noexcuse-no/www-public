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

## Frequent Commits

Commit often with clear, descriptive messages. Small, focused commits are easier to review and rollback if needed.

## Main Branch Protection

Do NOT make any code changes while on main branch. Always create a feature branch first.

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