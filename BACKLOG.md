# BACKLOG

All tasks and work-in-progress are tracked here.

## To Do

### Architecture Refactoring
- [ ] Create `_pages/` collection as Jekyll collection (add to `_config.yml`)
- [ ] Move `ledelse-60-2.md` from root to `_pages/`
- [ ] Move `om-oss.md` from root to `_pages/`
- [ ] Move `vitenskapelig-grunnlag.md` from root to `_pages/`
- [ ] Refactor `_layouts/landing.html` to be generic (remove hard-coded Ledelse 60:2 references)
- [ ] Create `_includes/image.html` partial for consistent image path handling
- [ ] Fix path handling inconsistencies (use `relative_url` consistently)
- [ ] Add `--box-shadow-light` and `--box-shadow-dark` CSS variables to `colors.css`
- [ ] Update `products.css` to use CSS variable for box-shadow
- [ ] Create `.specs/architecture/README.md` — Jekyll patterns, path handling rules, collection schemas
- [ ] Create `.design/architecture.md` — site structure, URL conventions, module organization
- **Spec:** `.specs/architecture/README.md`

### Mini-Hero Banners (Task a)
- [ ] Generate 4 benefit banners (16:9 abstract illustrations) via GPT Image 2
  - "Få kontroll uten byråkrati"
  - "Oppnå målbare gevinster med KI"
  - "Bli forberedt på en usikker fremtid"
  - "Forankre initiativer i ledergruppen"
- [ ] Generate 3 step banners (16:9 abstract illustrations) via GPT Image 2
  - "Uforpliktende samtale"
  - "To timers strukturert intervju"
  - "Rapport og anbefalinger"
- [ ] Update `_products/ledelse-60-2.md` icon paths to banner paths
- [ ] Update `_layouts/landing.html` image class handling for banner dimensions
- [ ] Update `products.css` for banner dimensions
- **Spec:** `.specs/ledelse-60-2/README.md` (banner specifications)

### AI Knowledge Base (Task c)
- [ ] Create `.specs/knowledge-base/README.md` — AI contexts documentation
  - Internal dev AI: .specs/ documentation usage
  - Visitor AI: JSON-LD + page frontmatter
  - Customer AI: Bibliography briefs + customer follow-up resources
- [ ] Add JSON-LD schema to `_pages/ledelse-60-2.md` frontmatter (Product schema)
- [ ] Add JSON-LD schema to `_pages/vitenskapelig-grunnlag.md` frontmatter (Organization + Service + TechArticle)
- [ ] Add JSON-LD links to source `.specs/` files for dev AI
- **Spec:** `.specs/knowledge-base/README.md` (new)

### Dark Mode Fixes (Task e)
- [ ] Update `styles-dark.css` with dark variants for landing sections:
  - `.landing-benefits`, `.landing-process`, `.landing-story`, `.landing-cases`, `.landing-cta`
  - `.benefit-card`, `.process-step`, `.case-card`
- [ ] Create `tests/css-variables.test.js` — validate all required CSS variables defined
- [ ] Update `.design/components.md` — add dark mode testing requirements and checklist
- **Spec:** `.design/components.md` (update)

### Katalysator Full Development (Task d)
- [ ] Iterative research + brainstorming session (POSTPONED — awaiting user input)
- [ ] Create product frontmatter schema
- [ ] Create landing page
- [ ] Generate hero illustration
- [ ] Define benefits and process steps
- [ ] Add to products include
- **blocked:** awaiting user input — iterative research + brainstorming

### Version Update (on completion)
- [ ] Update `BACKLOG.md` — remove completed items
- [ ] Update `CHANGELOG.md` — add entries under "[Unreleased]"
- [ ] Update `VERSION` to `1.4.0`
- [ ] Update `_data/metadata.yml` `version` field to `1.4.0`

## In Progress

## Blocked

### Katalysator Full Development
- **blocked:** awaiting user input — iterative research + brainstorming sessions need to resume
- **blocked:** needs research — mid-market continuous coaching models, competitive landscape
