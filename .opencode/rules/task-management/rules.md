# Task Management

## Files

- `VERSION` - Semver version (e.g., `1.0.0`)
- `BACKLOG.md` - Task tracking and prioritization
- `CHANGELOG.md` - Version history

## Rules

1. **On task initiation**: Read `BACKLOG.md`, `CHANGELOG.md`, `VERSION`
2. **On task completion**: Update:
   - `BACKLOG.md` - Move task to completed
   - `CHANGELOG.md` - Add entry under "[Unreleased]"
3. **Branch creation**: Before making any code modifications:
   - Create a new git branch for changes: `git checkout -b feature/description`
   - Make all changes within this branch
   - Do NOT commit directly to main branch

## Version Bumping

- **Major** (X.0.0): Breaking changes
- **Minor** (1.X.0): New features
- **Patch** (1.0.X): Bug fixes

Update `VERSION` file accordingly.