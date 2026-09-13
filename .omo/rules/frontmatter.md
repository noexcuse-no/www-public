---
description: Quick reference — see .specs/architecture/README.md for full frontmatter schemas
globs: ["_pages/dagfinn.md", "_pages/ledelse-60-2.md"]
---

# Frontmatter Schemas

Full spec: `.specs/architecture/README.md`

Profile fields (`_pages/dagfinn.md`): `display_name`, `image`, `tags`, `bio` — all required. No `phone`/`email` in frontmatter (personal data removed per R53); conditional rendering handles absence.

Product fields (`_pages/ledelse-60-2.md`): `display_name`, `short_description`, `permalink`, `image`, `benefits`, `process_steps` — see `.specs/product-card-frontmatter/README.md` for the card data contract.

Note: the `name:` key is shadowed by Jekyll::Page's built-in on native pages — use `display_name` (A5).
