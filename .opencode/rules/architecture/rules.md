# Architecture

- Project type: Jekyll static site for No Excuse AS (Norwegian management consulting company)
- Directory structure: See AGENTS.md for full tree

## Collections

- `profiles` - Team member profiles
- `products` - Service/product pages
- `cases` - Case studies
- `partners` - Partner organizations

## Build/Deploy

- Build: GitHub Pages (automatic on commit)
- Host: noexcuse.no

## Separation of Concerns

Follow the architecture:
- **Function**: `_includes/*.html` (reusable components)
- **Layout**: `_layouts/*.html` (page templates)
- **Data**: `_data/`, `_profiles/`, `_products/`, `_cases/`

No inline styles or inline scripts - use separate files.

## Prohibited Actions

1. **Do not modify** existing configuration files without reading them first
2. **Do not skip** linting or testing
3. **Do not commit** without updating BACKLOG/CHANGELOG
4. **Do not commit** directly to main branch - always use a feature branch
5. **Do not add** external dependencies without approval
6. **Do not use** frameworks (React, Vue, etc.) - keep it vanilla