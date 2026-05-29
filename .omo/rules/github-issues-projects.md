---
description: Workflow and conventions for GitHub Issues and Projects management via MCP tools
globs: ["BACKLOG.md", ".github/**", "**/ISSUES.md", "**/PROJECTS.md"]
---

# GitHub Issues & Projects

> **⚠️ Status: Not yet operational**
> The GitHub MCP server connection is not fully set up yet. The tools described in this file (`github_issues_*`, `github_projects_*`, etc.) are currently unavailable. Do not attempt to use them until the connection is confirmed working. This file documents the intended workflow for when the MCP is ready.

## Guardrails (ALWAYS apply)

### 1. Read-only by default
All GitHub Issues and Projects operations are **read-only unless explicitly instructed otherwise** by the user. Never create, update, close, reassign, relabel, add comments, or modify project fields without an explicit user request.

### 2. Scope: noexcuse-no/www-public only
All Issue and Project operations are **scoped exclusively to `noexcuse-no/www-public`**. Never read, write, or modify Issues or Projects in any other repository, organization, or project — even if asked in a way that implies cross-repo context.

### 3. Confirm before writing
Before any write operation (create, update, close, comment, reassign, modify project status):
- Stop and list exactly what will change
- Ask the user for confirmation
- Wait for explicit approval before proceeding

### 4. No autonomous issue management
Do not create issues, move project items, or update status as a side effect of implementation work. These are deliberate project management actions that require user intent.

## Overview

Use the configured GitHub MCP server (`github` in `.opencode/opencode.json`) for all GitHub Issues and Projects operations. The MCP exposes tools prefixed with `github_issues_*`, `github_projects_*`, and `github_search_issues`.

## Issue Management

### Creating Issues

```typescript
// Use github_issues_create with:
// - owner/repo from project context
// - title (required, concise)
// - body (required, markdown with background/acceptance/tasks)
// - labels (match existing labels: "bug", "enhancement", "design", "content", etc.)
// - assignees (only if explicitly given)
```

- **Title**: Imperative mood, 50 char max. E.g. "Fix dark mode contrast on profile cards"
- **Labels**: Reuse existing labels. Don't create new ones without good reason.
- **Project**: Attach to the correct GitHub Project (v2) via project item tools.
- **Body structure**:
  - Background / motivation (1-2 sentences)
  - Acceptance criteria (bullet list)
  - Tasks (checklist for multi-step items)
  - References to related issues/PRs

### Searching Issues

```typescript
// Use github_search_issues for finding existing work:
// - By label: "label:bug"
// - By status: "is:open is:issue"
// - By milestone: "milestone:\"v1.0\""
// - Cross-repo when needed: include "repo:owner/name" in query
```

### Updating Issues

- Use `github_issues_update` to change title, body, state, milestone
- Use `github_issues_add_assignees` / `github_issues_remove_assignees` for assignment
- Use `github_issues_set_labels` to replace labels

### Comments

- Use `github_issue_comment_create` for updates on issue progress
- Keep comments factual and concise. Avoid "bumping" or "+1" comments.

## Project Management (GitHub Projects v2)

### Projects Overview

GitHub Projects (v2) are the source of truth for task tracking. The MCP exposes:
- `github_projects_list` — list projects in an org or repo
- `github_projects_get` — get project details by project number
- `github_project_items_add` — add an issue/PR to a project
- `github_project_items_update` — update status/fields of a project item

### Status Fields

Projects use standard status fields. When updating items:
- Use `github_project_items_update` with explicit field names and values
- Common status values: "Todo", "In Progress", "Done", "Backlog"
- Map field names from the project's configured fields (fetch via get first)

### Linking Issues to Projects

Always attach newly created issues to the relevant project:
1. Create the issue first via `github_issues_create`
2. Add it to the project via `github_project_items_add`
3. Set initial status via `github_project_items_update`

## Workflow

### Task Discovery
1. `github_search_issues` to find open issues for the current milestone/project
2. Read BACKLOG.md for local context on priorities
3. Cross-reference with project board status

### Progress Tracking
- When starting work on an issue: move it to "In Progress"
- When completing work: move to "Done" and close the issue
- Update linked PRs in issue comments

### Issue Lifecycle
`Backlog (unscheduled)` → `Todo (scheduled)` → `In Progress (active)` → `Done (completed)`

## MCP Tool Reference

| Operation | MCP Tool | Notes |
|---|----|-------|
| List issues | `github_issues_list` | Per-repo, with state/label filters |
| Get issue | `github_issues_get` | By issue number |
| Create issue | `github_issues_create` | Requires owner, repo, title, body |
| Update issue | `github_issues_update` | State, title, body, milestone |
| Search issues | `github_search_issues` | Full query syntax |
| Add comment | `github_issue_comment_create` | By issue number |
| List projects | `github_projects_list` | Filter by org or repo |
| Get project | `github_projects_get` | By project number |
| Add item to project | `github_project_items_add` | Links issue/PR to project |
| Update project item | `github_project_items_update` | Set status/field values |
