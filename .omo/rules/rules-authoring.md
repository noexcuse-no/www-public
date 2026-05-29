---
description: How to write effective rule files that get discovered and applied by the rules-injector
globs: [".omo/rules/*"]
---

# Rules Authoring Guide

## How Rules Work

The `rules-injector` plugin has two phases:

### Phase 1: Discovery — Directory Walk

When you `Read` a file, the scanner walks **up from the file's directory to project root**, checking each level for rule directories. Files matching extension `.md` or `.mdc` are collected as candidates.

Scanned directories (per level):
- `.omo/rules/` (priority 0 — highest)
- `.claude/rules/`
- `.cursor/rules/`
- `.github/instructions/`
- `.sisyphus/rules/`

So a file at `_includes/header.html` triggers scans at:
1. `_includes/.omo/rules/` (distance=0)
2. `.omo/rules/` (distance=1, when parent directory is checked)

Candidates are sorted by: `isGlobal=false first` → `distance` (lower=closer) → `source priority` → alphabetical.

### Phase 2: Application — Frontmatter Matching

Each candidate then passes through `shouldApplyRule()`, which checks the rule file's YAML frontmatter. Only **4 keys** are recognized:

| Key | Format | Effect |
|-----|--------|--------|
| `alwaysApply` | `true` or `false` | Bypasses all glob matching — rule always fires |
| `globs` | Array of picomatch patterns | Matched against file's relative path and basename |
| `paths` | Array of picomatch patterns | Same as `globs` (merged) |
| `applyTo` | Array of picomatch patterns | Same as `globs` (merged) |
| `description` | String | Informational only — never used for matching |

All other YAML keys (`title`, `tags`, etc.) are parsed from frontmatter but **silently discarded** from metadata.

### Matching Logic

```javascript
pathBases = [
  "relative/path/from/project/root/file.html",  // relative path
  "file.html"                                     // just the basename
]
// picomatch glob against both, any match = applies
```

## Writing Effective Rules

### Frontmatter (only recognized keys)

```yaml
---
description: What this rule covers
alwaysApply: true
# OR
globs: ["**/*.html", "**/*.md"]
---
```

### Body Content Rules
1. **Be specific and actionable** — don't say "be accessible", say "all images need alt text"
2. **Use tables for structured data** (commands, schemas, config files)
3. **Include file paths** when referencing specific files
4. **Reference commands** that should be run

### When Rules Fire
- A rule with `alwaysApply: true` fires on **every** Read — use sparingly for high-consequence rules
- A rule with `globs` fires only when the file being Read matches a glob pattern
- Rules at `.omo/rules/` (project root) are found at distance=0 (same directory) or distance=1+ (subdirectory files)
- The `description` field serves as human-readable label in debugging — `shouldApplyRule` does not read it

### Anti-Patterns
- Don't use `title` or `tags` in frontmatter — they're silently discarded
- Don't put code logic in rules — that belongs in `.opencode/lookup.json`
- Don't duplicate standing directives from `opencode.json > instructions` — instructions are always in system prompt, rules only fire on Read
- Don't use `.json` files — they are invisible (only `.md`/`.mdc` are scanned)
