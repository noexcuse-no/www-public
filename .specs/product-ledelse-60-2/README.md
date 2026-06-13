# Product Page — Ledelse 60:2 Architecture

> Created: 2026-06-12
> Status: Done (implementert, videreutviklet — se PR #181 for layout-migrering)

## Purpose / Problem

`_pages/ledelse_60-2.md` is the primary product page for Ledelse 60:2. It needs to present the product as a selling page while respecting the HTML→MD refactoring rule: no inline HTML in `_pages/*.md` body.

The page uses three visual patterns (signal items, process steps, perspective cards) that previously required inline `<div>`, `<img>`, and `<a>` tags. These are now implemented through structural CSS selectors that style pure Markdown content.

## Scope

- `_pages/ledelse_60-2.md` — frontmatter + pure Markdown body
- `assets/css/products.css` — structural CSS selectors for three content patterns
- `_layouts/article.html` — page layout (hero, stat-bridge, article-layout with pager + body + questions/sidebar)
- `_includes/profiles.html` — profile card at page bottom (via `{% include profiles.html tags="ledelse" %}`)

Files NOT in scope:
- `_includes/products.html` — homepage rendering (data from frontmatter, unchanged)
- `.specs/product-card-frontmatter/README.md` — frontmatter schema (already documented)

## Architecture

### Page Layout (`_layouts/article.html`)

```
{% include hero.html %}              ← from frontmatter hero: block
{% if page.stat_bridge %}
  {% include stat-bridge.html %}     ← "4 perspektiver · 60 spørsmål · 2 timer"
{% endif %}
<div class="article-layout">         ← CSS grid: pager | body | questions (3 columns)
  <aside class="article-pager">
    {% include sidebar-toc.html %}   ← auto-generated TOC (if show_toc != false)
    {% include share-section.html %} ← share buttons
  </aside>
  <div class="article-body">
    {{ content }}                    ← pure Markdown (signaler, steg, perspektivkort)
    {% if page.cta %}
    <div class="cta-section">        ← CTA-knapper synlige på smale skjermer
      ...cta[0] og cta[1]...
    </div>
    {% endif %}
  </div>
  <aside class="article-questions">
    {% if page.questions %}          ← collapsible question card
      {% include questions.html %}
    {% endif %}
    {% if page.cta %}                ← compact product card with banner + CTA
    <div class="sidebar-card sidebar-card--product">
      product image, name, description, cta[0], cta[1]
    </div>
    {% endif %}
  </aside>
</div>
{% include cases-cards.html %}
{% include references.html %}
```

The body (`{{ content }}`) contains only the unique selling content — hero, stat-bridge, questions, CTA, and profile are handled by the layout.

### Body Content Patterns (pure Markdown)

Three repeating patterns form the selling narrative:

#### 1. Signal items — "Kjenner du deg igjen?"

Pain points with T4 signal illustrations. Each signal:

```markdown
![Signal description](/assets/images/banners/ledelse-60-2-t4-signal-*.webp)
#### Heading (the pain point observation)
Body text — one concrete observation.
[Topic link](/topic/), [Topic link](/topic/)
```

Renders as: `p > img` (float left, 80×80) + `h4` + `p` + `p` with topic links.

CSS selectors: `.article-body > p:has(> img[src*="t4-signal"]) + h4 + p + p`

#### 2. Process steps — "Hva er Ledelse 60:2?"

Three steps describing the process. Each step:

```markdown
![Step name](/assets/images/banners/step-*.webp)
### N. Step name
Step description text. [Les mer →](/path/)
```

Renders as: `p > img` (full-width, 16:9) + `h3` + `p`.

CSS selectors: `.article-body > p:has(> img[src*="step-"]) + h3 + p`

#### 3. Perspective cards — "Slik er metoden bygget opp"

Four linked frame perspective cards:

```markdown
[![Frame name](/assets/images/banners/frame-*.webp)](/permalink/)
### Frame name
Description text.
```

Renders as: `p > a > img` (full-width, linked, hover lift) + `h3` + `p`.

CSS selectors: `.article-body > p:has(> a > img[src*="frame-"]) + h3 + p`

### Frontmatter Schema

The following frontmatter fields are used for the page and homepage integration (see `.specs/product-card-frontmatter/README.md`):

| Field | Purpose | Used by |
|-------|---------|---------|
| `benefits` (array) | Benefit cards on homepage | `_includes/products.html` |
| `process_steps` (array) | Process step cards on homepage | `_includes/products.html` |
| `cta` (list of {text, url}) | CTA buttons (hero pager, sidebar, inline) | `_layouts/article.html`, `_includes/products.html` |
| `hero` (block) | Hero section | `_layouts/article.html` via `hero.html` |
| `stat_bridge` | Stat line below hero | `_layouts/article.html` via `stat-bridge.html` |
| `questions` (array) + `questions_title` (string) | Diagnostic questions in sidebar | `_layouts/article.html` via `questions.html` |

### Key Principles

1. **Body is explicit** — all content text is visible in the `.md` source, not hidden in includes or data files
2. **Frontmatter drives homepage** — `benefits` and `process_steps` in frontmatter are the authoritative data source for homepage rendering
3. **Duplication is intentional** — body and homepage may show similar content (e.g., process steps), but body is supplementary layout with richer context
4. **No inline HTML** — all HTML structure comes from CSS structural selectors (`:has()`, `+`, `>`) applied to pure Markdown elements

## CSS Architecture

Structural selectors in `assets/css/products.css` follow the same pattern as `assets/css/article.css`:

- **Target by image URL pattern**: `[src*="t4-signal"]`, `[src*="step-"]`, `[src*="frame-"]`
- **Traverse by adjacency**: `+ h4`, `+ h4 + p`, `+ h3 + p`
- **Override generic `p:has(> img:only-child)`** from article.css with more specific selectors

### Dark Mode

Each pattern has corresponding dark mode overrides using `.dark-mode` prefix selectors.

### Responsive

At ≤599px, signal items collapse from float layout to stacked vertical layout (icon shrinks to 60×60).

## Dependencies

- `.specs/html-to-md-refactor/README.md` — the HTML→MD rule that this architecture follows
- `.specs/product-card-frontmatter/README.md` — frontmatter schema for homepage integration
- `assets/css/article.css` — base structural selectors for `.article-body`
- `assets/css/products.css` — product-specific structural selectors
- `_layouts/article.html` — the active page layout (replaced `_layouts/product.html`)

## Acceptance Criteria

- [ ] `_pages/ledelse_60-2.md` body contains zero inline HTML tags (verified by grep)
- [ ] All 5 T4 signal illustrations render with float-left 80×80 icon layout
- [ ] 3 process steps render with full-width 16:9 images
- [ ] 4 perspective cards render with linked images and hover lift effect
- [ ] `.specs/html-to-md-refactor/README.md` compliance checkbox for `ledelse_60-2.md` can be checked
- [ ] Dark mode: all three patterns have dark mode styling
- [ ] Mobile (≤599px): signal icons stack and shrink to 60×60
- [ ] `benefits` and `process_steps` remain in frontmatter (homepage data source unchanged)
- [ ] `stat_bridge` renders between hero and article-layout
- [ ] 5 diagnostic questions render in the right sidebar (collapsible)
- [ ] Dagfinn profile card renders at page bottom via `{% include profiles.html tags="ledelse" %}`
