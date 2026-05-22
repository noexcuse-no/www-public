# Navigation — Functional Specification

## Purpose and Scope

Replace the currently empty navbar with a minimal, functional navigation for the site. The navbar sits inside `<header>` (via `_includes/navbar.html`).

## Requirements

- Two links in the navbar:
  - **"Ledelse 60:2"** → `/ledelse-60-2/` (new landing page)
  - **"Om oss"** → `/om-oss/` (new about page)
- Clean, minimal styling (Scandinavian minimal)
- Visible on all pages

## Data Structures

No new collections or frontmatter — navigation links are hardcoded in `_includes/navbar.html`.

## Dependencies

- **Landing page**: `/ledelse-60-2/` — see `.specs/ledelse-60-2/README.md`
- **About page**: `/om-oss/` — see `.specs/om-oss/README.md`
- **CSS**: `assets/css/navbar.css` may need updates
