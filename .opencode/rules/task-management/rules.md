# Task Management

## Files

- `VERSION` - Semver version (e.g., `1.0.0`)
- `BACKLOG.md` - Task tracking and prioritization
- `CHANGELOG.md` - Version history

## Task Initiation

On task initiation: Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`

## Task Completion

On task completion:
- Update `BACKLOG.md` - Move task to completed
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

## Version Bumping

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.0.X): Bug fixes

When updating `VERSION`, also update `_data/metadata.yml` `version` field to match.