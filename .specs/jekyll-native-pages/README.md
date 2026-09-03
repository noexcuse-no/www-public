# Jekyll Native Pages

> Created: 2026-08-31
> Status: Done

## Problem / Goal

The `pages` collection in `_config.yml` shadows Jekyll's built-in `site.pages` (SiteDrop prioritizes collection keys), so root pages referenced via `site.pages` in Liquid templates are silently excluded or mis-scoped. Convert the `_pages` directory to native Jekyll pages loaded via `include`, so page lists and the sitemap can no longer drop or mis-scope pages.

A second, probe-discovered collision: on native pages `page.name` is Jekyll::Page's built-in FILENAME attribute and shadows frontmatter. The `name:` frontmatter key must be renamed to `display_name:` to keep `{{ product.name }}` / `{{ profile.name }}` rendering the intended strings.

## Scope

- `_config.yml` page-loading mechanism: delete the `pages:` collection block, add `include: ["_pages"]`; `defaults:` stays byte-identical (`published: true` is load-bearing for `where: "published", true` filters).
- `name` → `display_name` collision fix: renaming `_pages/ledelse_60-2.md` and `_pages/dagfinn.md` frontmatter, plus 12 template references.
- Deterministic `sort: "title"` on three class-filtered lists (`_layouts/tag.html`, `_includes/benefit-cards.html`, `_includes/article-feed.html`).
- Structural regression test `tests/config-structure.test.js` (Vitest + `node:fs`, zero new dependencies).
- Docker build parity over the full route set (baseline vs candidate).
- Stale doc/rule reconciliation in `.specs/architecture/README.md`, `.design/architecture.md`, `.omo/rules/jekyll.md`, `.omo/rules/deploy.md`, `.omo/rules/task-management.md`.

## Acceptance Criteria

- [ ] `diff routes-baseline.txt routes-candidate.txt` empty — 54 routes, none added/removed.
- [ ] `diff sitemap-locs-baseline.txt sitemap-locs-candidate.txt` empty — 53 locs, no duplicates.
- [ ] Every route's HTML byte-identical except whitelisted `/emne/<tag>/` article order; those pages show identical article href sets.
- [ ] `npm run lint` exits 0 (chained gate includes all Vitest suites); mutation check proves the structural test can fail.
- [ ] No `pages` collection; `_pages` in `include:`; defaults block intact; `permalink:` + `layout:` on every `_pages/*.md`; no `name:` key.
- [ ] `_pages/*.md` diffs limited to the two sanctioned one-line `display_name` renames; zero visual change.

## Lessons Learned

<!-- Populated if item returns to Planning after attempted implementation -->
