# A2 — Unified Page Architecture: From Collections to Class-Based Schema

> Status: Draft | Created: 2026-06-01

## Problem

The current Jekyll architecture uses **6 separate collections** (`_pages`, `_products`, `_profiles`, `_cases`, `_partners`, `_topics`) to enforce content types. This creates three structural problems that worsen as the site scales:

### 1. Two-File Problem (Frames)

Frame data lives in two files:
- `_topics/struktur.md` — data (hero, intro, elements, challenges, questions, about, cta)
- `_pages/ledelse_struktur.md` — thin wrapper (`layout: perspektiv`, `frame_id: struktur`, `permalink: /struktur/`)

The `perspektiv` layout does a database-style lookup:
```liquid
{% assign frame = site.topics | where: "category", "frame" | where: "id", frame_id | first %}
```

This pattern will repeat for every product, profile, case, and partner that needs its own page.

### 2. Namespace Lock-In

Collections force URL prefixes:
- `/products/ledelse-60-2/` — product namespace
- `/profiles/dagfinn/` — profile namespace  
- `/topics/struktur.html` — topic namespace (`.html` because no permalink override)

You cannot have a product at `/ledelse-60-2/` without either:
- Moving it to `_pages/` and losing the `site.products` boundary
- Adding `permalink: /ledelse-60-2/` to the product file (which works but is inconsistent)

### 3. Include Complexity

Each collection needs its own include and its own Liquid loop:
```liquid
{% for product in site.products %}
{% for profile in site.profiles %}
{% for case in site.cases %}
{% for topic in site.topics | where: "category", "benefit" %}
```

## Goal

Unify all content into a single **`_pages/` collection** with a **`class` frontmatter property** that declares the entity type. Each entity gets one file with:
- A clean, explicit `permalink`
- A `class` that drives rendering
- All type-specific data in frontmatter
- Page body content (if any) rendered normally

## Proposed Unified Frontmatter Schema

### Common Fields (all classes)

```yaml
---
class: product | profile | case | partner | frame | benefit | step | article
layout: page | perspektiv | landing | home
title: "Human-readable title"
description: "SEO description"
permalink: /clean-url/        # Explicit. No Jekyll namespace magic.
lang: no                      # Already in defaults
published: true               # For draft control
---
```

### Class: `product`

```yaml
class: product
name: "Ledelse 60:2"
short_description: "..."
image: "assets/images/hero-illustration.webp"
cta_a: { text: "...", title: "...", url: "..." }
cta_b: { text: "...", title: "...", url: "..." }
cta_c: { text: "...", title: "...", url: "..." }
benefits:
  - title: "..."
    description: "..."
    banner: "..."
    article_url: "..."
process_steps:
  - title: "..."
    description: "..."
    banner: "..."
story: "..."
```

**Body usage:** Optional extended description, methodology details, pricing.

### Class: `profile`

```yaml
class: profile
name: "Dagfinn Bang-Johansen"
image: "assets/images/dagfinn.webp"
phone: "+4790820258"
email: "dagfinn@noexcuse.no"
linkedin: "..."
booking_url: "..."
tags: "#ledelse #kvalitet"
bio: "..."
```

**Body usage:** Extended bio, publications, speaking topics.

### Class: `frame`

Replaces the two-file pattern. The `perspektiv` layout reads data directly from `page` frontmatter instead of doing a `site.topics` lookup.

```yaml
class: frame
frame_id: struktur
color_accent: "#2A4D6E"
metaphor: "Office is a Factory"
hero:
  banner_image: "assets/images/banners/frame-struktur.webp"
  alt: "..."
  breadcrumb: "← No Excuse"
  intro: "..."
intro:
  heading: "..."
  body: "..."
elements:
  - title: "..."
    body: "..."
    signs:
      positive: "..."
      negative: "..."
challenges:
  - title: "..."
    body: "..."
questions:
  - "..."
about:
  heading: "..."
  body: "..."
cta:
  heading: "..."
  body: "..."
  url: "..."
  button_text: "..."
```

### Class: `benefit` / `step`

```yaml
class: benefit
category: benefit          # For filtering in includes
banner: "assets/images/banners/benefit-ai.webp"
url: "/generativ-ki/"      # Where the card links to
# Body: short page content
```

```yaml
class: step
category: step
step_number: 1
banner: "assets/images/banners/step-talk.webp"
url: "/samtale/"
# Body: short page content
```

### Class: `case`

```yaml
class: case
customer: "..."
result: "..."
image: "..."
# Body: full case study
```

### Class: `partner`

```yaml
class: partner
logo: "..."
url: "..."
# Body: optional partnership description
```

## URL Migration

| Current URL | New URL | File | Change |
|-------------|---------|------|--------|
| `/products/ledelse-60-2/` | `/ledelse-60-2/` | `_pages/ledelse-60-2.md` | Move from `_products/`, add `class: product`, keep `permalink` |
| `/profiles/dagfinn/` | `/dagfinn/` or `/team/dagfinn/` | `_pages/dagfinn.md` or `_pages/team/dagfinn.md` | **QUESTION** |
| `/cases/*` | `/case/*` or `/cases/*` | `_pages/case-*.md` | **QUESTION** |
| `/partners/*` | `/partner/*` or `/partners/*` | `_pages/partner-*.md` | **QUESTION** |
| `/topics/benefit-ai.html` | `/generativ-ki/` or `/tema/benefit-ai/` | `_pages/generativ-ki.md` | Already exists; topic file is extra |
| `/topics/step-talk.html` | `/samtale/` or `/tema/step-talk/` | `_pages/samtale.md` | Already exists; topic file is extra |
| `/topics/struktur.html` | `/struktur/` | `_pages/struktur.md` | Merge `_topics/struktur.md` + `_pages/ledelse_struktur.md` |
| `/topics/mennesker.html` | `/mennesker/` | `_pages/mennesker.md` | Merge |
| `/topics/påvirkning.html` | `/påvirkning/` | `_pages/påvirkning.md` | Merge |
| `/topics/identitet.html` | `/identitet/` | `_pages/identitet.md` | Merge |
| `/emne/*` | `/emne/*` | `_pages/emne-*.md` | No change (tag pages stay) |

## Jekyll Config Changes

```yaml
# _config.yml — after

collections:
  pages:
    output: true
    permalink: /:path/
  tags:
    output: true
    permalink: /emne/:path/

defaults:
  - scope:
      path: ""
      type: pages
    values:
      layout: page
      lang: no
      published: true
```

Remove: `profiles`, `products`, `cases`, `partners`, `topics` collections and their defaults blocks.

## Liquid Refactoring

### Product Include

Before:
```liquid
{% for product in site.products %}
```

After:
```liquid
{% assign products = site.pages | where: "class", "product" | where: "published", true %}
{% for product in products %}
```

### Frame Layout (perspektiv.html)

Before (two-file lookup):
```liquid
{% assign frame_id = page.frame_id %}
{% assign frame = site.topics | where: "category", "frame" | where: "id", frame_id | first %}
```

After (single file, read from page):
```liquid
{% assign frame = page %}  {# All data is in page frontmatter #}
```

The layout still works the same — `frame.hero.banner_image`, `frame.elements`, etc. — but `frame` is `page`.

### Card Include

Before:
```liquid
{% assign benefits = site.topics | where: "category", "benefit" %}
{% for topic in benefits %}
    {% include card.html topic=topic %}
{% endfor %}
```

After:
```liquid
{% assign benefits = site.pages | where: "class", "benefit" | where: "published", true %}
{% for page in benefits %}
    {% include card.html page=page %}
{% endfor %}
```

### Tag Cloud (`_pages/emne.md`)

Before:
```liquid
{% for p in site.pages %}
    {% if p.tags and p.tags.size > 0 %}
```

After (filter out non-article classes):
```liquid
{% assign articles = site.pages | where: "class", "article" | where: "published", true %}
{% for p in articles %}
    {% if p.tags and p.tags.size > 0 %}
```

### Sitemap

Before:
```liquid
{% for page in site.pages %}
{% for product in site.products %}
{% for profile in site.profiles %}
```

After:
```liquid
{% for page in site.pages %}
    {% if page.permalink and page.permalink != "/sitemap.xml" %}
```

One loop. All published pages with a permalink.

## File Migration Plan

### Phase 1: Merge Frame Two-File Pattern (4 files)

1. For each frame (struktur, mennesker, påvirkning, identitet):
   - Move `_topics/{id}.md` → `_pages/{id}.md`
   - Add `class: frame`, `layout: perspektiv`, `permalink: /{id}/`
   - Delete `_pages/ledelse_{id}.md` wrapper
   - Update `perspektiv.html` to use `page` directly

### Phase 2: Migrate Products (1 file)

1. Move `_products/ledelse-60-2.md` → `_pages/ledelse-60-2.md`
2. Add `class: product`
3. Keep `permalink: /ledelse-60-2/` (already set)
4. Update `_includes/products.html` to filter by `class: product`

### Phase 3: Migrate Profiles (1 file)

1. Move `_profiles/dagfinn.md` → `_pages/dagfinn.md` or `_pages/team/dagfinn.md`
2. Add `class: profile`
3. Update `_includes/profiles.html`

### Phase 4: Migrate Benefits + Steps (7 files)

1. For each `_topics/benefit-*.md` and `_topics/step-*.md`:
   - Move → `_pages/{clean-url}.md` (or keep as data-only if no standalone page needed)
   - Add `class: benefit` / `class: step`
   - Add body content (if they are to be standalone pages)
2. Update `_pages/ledelse_60-2.md` card loops
3. Update `_pages/om_metode.md` frame card loop

### Phase 5: Migrate Cases + Partners (when content exists)

Currently `_cases/` and `_partners/` are empty. When content is added:
- Move to `_pages/` with `class: case` / `class: partner`
- Update `_includes/cases.html` and `_includes/partners.html`

### Phase 6: Cleanup

1. Remove `_products/`, `_profiles/`, `_topics/`, `_cases/`, `_partners/` directories
2. Remove collection registrations from `_config.yml`
3. Remove collection defaults from `_config.yml`
4. Update `.specs/architecture/README.md`
5. Update `sitemap.xml`

## Schema Enforcement

Jekyll does not validate frontmatter. To prevent drift, maintain a **schema reference** in `.specs/architecture/frontmatter-schemas.md`:

| Class | Required Fields | Optional Fields | Layout |
|-------|----------------|-----------------|--------|
| `product` | `name`, `short_description` | `benefits`, `process_steps`, `cta_a/b/c`, `story` | `landing` |
| `profile` | `name`, `image`, `phone`, `email` | `linkedin`, `booking_url`, `tags`, `bio` | `page` |
| `frame` | `frame_id`, `hero`, `intro`, `elements` | `challenges`, `questions`, `about`, `cta` | `perspektiv` |
| `benefit` | `category`, `banner`, `url` | `title`, `description` | `page` |
| `step` | `category`, `step_number`, `banner`, `url` | `title`, `description` | `page` |
| `article` | `title` | `tags`, `json_ld`, `citation` | `page` |

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| URL breakage | Preserve every existing `permalink`. No URL changes in Phase 1–4 unless explicitly requested. |
| Tag cloud pollution | Filter `site.pages` by `class: article` (or equivalent) before extracting tags. |
| Layout complexity | `perspektiv` layout stays; it just reads from `page` instead of doing a lookup. |
| Missing schema fields | Document schema in `.specs/`. Add validation script if needed (optional). |
| Git history loss | Use `git mv` for file moves to preserve history. |
| Build performance | `site.pages` is slightly slower to filter than `site.products`, but negligible at this scale (<100 files). |

## Acceptance Criteria

- [ ] All 6 collections removed from `_config.yml`
- [ ] All content lives in `_pages/` with explicit `class` and `permalink`
- [ ] No 404s — every existing URL still resolves
- [ ] `perspektiv` layout reads frame data from `page` frontmatter (no `site.topics` lookup)
- [ ] `_includes/products.html`, `_includes/profiles.html` filter by `class`
- [ ] Tag cloud (`_pages/emne.md`) excludes non-article pages
- [ ] Sitemap uses single `site.pages` loop
- [ ] `.specs/architecture/README.md` updated
- [ ] All frontmatter schemas documented

## Decisions

### Q1: Profile URLs — `/dagfinn/` (flat)

**Decision:** Flat URL. Profile page will be `_pages/dagfinn.md` with `permalink: /dagfinn/`.

### Q2: Product page body — move content from include into page body

**Decision:** The current `_pages/ledelse_60-2.md` body content (hero, benefits loop, steps loop, story, CTA) moves into the unified product file. The home page `_includes/products.html` will render a **summary card** from frontmatter only. The product page renders its full body.

**Implication:** `_includes/products.html` becomes a card renderer, not a full product detail renderer.

### Q3: Benefits and steps — merge card data into article pages

**Decision:** B. Each article page (`_pages/ledelse_generativ-ki.md`, etc.) gets `class: benefit` or `class: step` plus card frontmatter (`banner`, `url`, etc.). No separate topic files. The card include reads from `site.pages | where: "class", "benefit"`.

### Q4: Frame pages — keep flat URLs

**Decision:** `/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/` remain flat.

### Q5: Empty collections — leave in config, document in spec

**Decision:** Keep `_cases` and `_partners` collections in `_config.yml` for now. Document in this spec that future content should use `_pages/` with `class: case` / `class: partner`.

## Implementation Order

1. **Phase 1:** Merge frame two-file pattern (4 files)
2. **Phase 2:** Migrate product + merge page body
3. **Phase 3:** Migrate profile
4. **Phase 4:** Merge benefit/step topic data into article pages
5. **Phase 5:** Update includes (products, profiles, card)
6. **Phase 6:** Update layouts (perspektiv, tag)
7. **Phase 7:** Update _config.yml, sitemap.xml, emne.md
8. **Phase 8:** Update .specs/architecture/README.md
9. **Phase 9:** Cleanup, verify, commit, PR
