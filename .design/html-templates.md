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

## Prohibited Patterns

| Pattern | Why | Use instead |
|---------|-----|-------------|
| `style="..."` on HTML elements | Breaks CSP, mixes concerns, hard to maintain | CSS classes in proper files under `assets/css/` |
| `onclick="..."`, `onsubmit="..."`, etc. | Inline event handlers are CSP violations, hard to debug | External JS files in `assets/scripts/` with `addEventListener` |
| `<script>...</script>` inside HTML bodies | Blocks rendering, mixes concerns, no caching | External JS files loaded via `_includes/scripts.html` |
| `<style>...</style>` in pages | Same as inline styles — CSP + maintainability | Page-specific CSS goes in a dedicated file or utility classes |
