---
description: Publicability — what may and must not be committed to this public repo
globs: ["**/*.md", "**/*.html", "**/*.yml", "**/*.yaml", "**/*.json", "**/*.js", "**/*.css"]
---

# Publicability

The always-loaded may/must-not-commit split lives in `AGENTS.md` / `.opencode/opencode.json` (instructions array) — this file is the supporting detail.

## May be committed
- Current implementation
- Current normative spec/design

## Must not be committed
- Temporary reasoning, prompt seeds, commercial analysis, negotiation material, research scratchpads, internal assessments, customer-pipeline material, obsolete plans

## Where temporary work lives
- `.omo/` is the gitignored agent-working area — use it for temporary planning where compatible with conventions
- Intentionally-tracked `!.omo/rules/*` files are preserved; do not let the gitignore hide required source

## No-copy constraint
Commercially sensitive info must not be copied into commit messages, CHANGELOG entries, source comments, test fixtures, generated files, CI output, or permanent issue/PR templates created by the repo.

## History
Obsolete reasoning need not be preserved in HEAD for history — git history is the record.