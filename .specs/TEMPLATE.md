# Spec Template

Use this template when creating a new `.specs/<feature-name>/README.md`.  
Every spec must include the **Required** sections. Add **Optional** sections as needed.

---

## Required Sections

### 1. Title

```
# <Kebab-case name> — <Fix|Feature|Chore> Specification
```

### 2. Purpose / Problem

**For fixes:** Describe the problem. What's broken, where, and why it matters.

**For features:** Describe the goal. What will this enable, and why does it belong here?

### 3. Scope

List the files and directories that will be changed. Be specific — include file paths, CSS classes, or functions when relevant.

### 4. Acceptance Criteria

Bulleted checklist of verifiable outcomes. Each item must be testable by an agent or human reviewer.

```
## Acceptance Criteria

- [ ] First verifiable outcome
- [ ] Second verifiable outcome
- [ ] Dark mode tested (if UI change)
- [ ] Mobile layout tested (if UI change)
```

---

## Optional Sections

### Backlog References

Map spec to backlog item IDs. Helps trace work across documents.

```
## Backlog References

Fix-260524-01, Fix-260524-02
```

### Design Constraints

Brand rules, accessibility minimums, or technical invariants the implementation must respect.

```
## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css` for all colors
```

### Dependencies

Items that must be completed before this one can start.

```
## Dependencies

- Fix-260524-01 must be done first (shared file scope)
```

---

## Conventions

- One file per feature or fix group. If multiple BL items affect the same file, use one spec — do not create N separate spec directories.
- Required: `## Purpose / Problem`, `## Scope`, `## Acceptance Criteria`
- Optional: `## Backlog References`, `## Design Constraints`, `## Dependencies`
- Reference `.design/` doc paths when a design decision already exists (e.g., `.design/colors.md` for color rules).
- For features that require generated images, add a subsection:

```
### Image Assets Required

| Image | Style | Description |
|-------|-------|-------------|
| Hero banner | Style 2 | ... |
| Section 1 | Style 3 | ... |

See `.design/graphics.md` for prompt templates and style guidelines.
```
