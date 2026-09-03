# HTML Templates — No Excuse AS

## Include Usage

```liquid
{% include metadata.html %}
{% include styles.html %}
{% include header.html %}
{% include hero.html %}
{% include card.html topic=site.topic %}
{% include profiles.html %}
{% include scripts.html %}
```

## Core Includes

### `hero.html` — Page Hero

Two invocation patterns:

**1. From page frontmatter (standard pages):**
```liquid
{% include hero.html %}
```
Renders from `page.hero.image`, `page.hero.title`, `page.hero.breadcrumb`, `page.hero_effect`.

**2. With parameters (layout-driven):**
```liquid
{% include hero.html image=frame.hero.image title=frame.title breadcrumb="Perspektiv" %}
```
Parameters override frontmatter values. Used by `_layouts/perspektiv.html` to pass topic data.

### `card.html` — Topic Card

Renders a single topic item:
```liquid
{% assign topics = site.topics | where: "category", "frame" | sort: "weight" %}
{% for topic in topics %}
  {% include card.html topic=topic %}
{% endfor %}
```

Uses `topic.image`, `topic.title`, `topic.description`, `topic.cta` from the topic's frontmatter. Styled via CSS classes on `.card` (`.card--frame`, `.card--benefit`, `.card--numbered`).

### `profiles.html` — Team Profiles

Iterates `site.profiles`:
```liquid
{% include profiles.html %}
```
Optional `tags` parameter for filtering:
```liquid
{% include profiles.html tags="ledelse" %}
```

### `styles.html` — CSS Includes

Lists all stylesheets in order:
```
colors.css → typography.css → layout.css → utilities.css → animations.css
components/hero.css → components/card.css
article.css → about.css → products.css → profiles.css → avtale.css ...
header.css → navbar.css → footer.css
styles-light.css → styles-dark.css
perspektiv-styles.css → cases.css → partners.css → podcast.css
```

### `scripts.html` — JavaScript Includes

Lists all scripts. Currently: `dark-mode-toggle.js`, `profile-card.js`, `animations.js`.

### `metadata.html` — SEO Meta Tags

Populated from `_data/metadata.yml`. Includes:
- Dynamic `og:title`, `og:description`, `og:url` per page
- Canonical URL
- BreadcrumbList JSON-LD
- FAQPage schema (where applicable)

## HTML Structure Pattern

```html
<body>
  {% include header.html %}
  <main>
    {% include hero.html %}
    {{ content }}
    {% include profiles.html %}
  </main>
  {% include footer.html %}
  {% include scripts.html %}
</body>
```

## Button Usage Patterns

All interactive elements use the **unified button system** (see `.design/css-architecture.md` → Unified Button System). Three types, each with a canonical class and legacy aliases:

| Type | Canonical class | Legacy alias | When to use |
|------|-----------------|--------------|-------------|
| **Primary** | `.btn-primary` | `.cta` | The main action on a page/section — the one thing you want the visitor to do (e.g. "Bestill", "Les mer") |
| **Secondary** | `.btn-secondary` | `.cta--secondary` | A supporting action that complements the primary (e.g. "Se priser" next to "Bestill") |
| **Ghost** | `.btn-ghost` | `.card-link`, `.carousel-btn`, etc. | Text-only links styled as buttons — navigation, icon buttons, toggles, close buttons, tag-cloud items |

**Size variants:** `.btn--large` (hero CTAs), `.btn--small` (compact actions), `.btn--icon` (icon-only buttons). **Spacing variants:** `.btn--spaced` (margin-left), `.btn--block` (full-width).

**Alias system:** Existing `.cta*` classes still work — `.cta` → `.btn-primary`, `.cta--secondary` → `.btn-secondary`, `.cta--large` → `.btn--large`, `.cta--spaced` → `.btn--spaced`. New code should prefer the canonical `.btn*` classes.

**Example:**
```html
<a class="btn-primary" href="/bestill/">Bestill</a>
<a class="btn-secondary" href="/priser/">Se priser</a>
<a class="btn-ghost" href="/metodikk/">Les om metodikken</a>
```

## External Link Policy

All external URLs (links leaving `noexcuse.no`) **must** include `rel="noopener" target="_blank"`:

```html
<a href="https://external.example.com" rel="noopener" target="_blank">External link</a>
```

This prevents tab-nabbing (the external page cannot access `window.opener`) and opens the link in a new tab so the visitor keeps the site open. Internal links (same-site permalinks) use plain `<a href="...">` without `target="_blank"`.

## Prohibited Patterns

| Pattern | Why | Use instead |
|---------|-----|-------------|
| `style="..."` on HTML elements | Breaks CSP, mixes concerns, hard to maintain | CSS classes in proper files under `assets/css/` |
| `onclick="..."`, `onsubmit="..."`, etc. | Inline event handlers are CSP violations, hard to debug | External JS files in `assets/scripts/` with `addEventListener` |
| `<script>...</script>` inside HTML bodies | Blocks rendering, mixes concerns, no caching | External JS files loaded via `_includes/scripts.html` |
| `<style>...</style>` in pages | Same as inline styles — CSP + maintainability | Page-specific CSS goes in a dedicated file or utility classes |
| `{: .class-name }` IAL in Markdown | Inline Attribute Lists couple presentation to content; fragile when content moves | CSS structural selectors targeting element position/content patterns in `.article-body` |
| `<div>`, `<span>`, `<p>` or any HTML tags in `_pages/*.md` | Mixes markup into content layer; prevents clean previews; difficult to maintain | Pure kramdown markdown. Complex patterns (cards, grids, hero) rendered via `_includes/` in templates, not in page content. |

**Critical rule: Zero IAL, zero HTML tags in `_pages/*.md` files.** All styling must come from CSS structural selectors in `.article-body`. The only exceptions are:
- `{% include ... %}` tags for component injection (frame-cards.html, profiles.html, cta-section.html)
- Heading anchor IDs where necessary for intra-page links (minimize)
