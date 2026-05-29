# HTML Templates — No Excuse AS

## Include Usage

```liquid
{% include metadata.html %}
{% include styles.html %}
{% include header.html %}
{% for profile in site.profiles %}
  {% include profiles.html %}
{% endfor %}
```

## Metadata

All SEO/social meta tags in `_includes/metadata.html`, populated from `_data/metadata.yml`.

## Prohibited Patterns

| Pattern | Why | Use instead |
|---------|-----|-------------|
| `style="..."` on HTML elements | Breaks CSP, mixes concerns, hard to maintain | CSS classes in proper files under `assets/css/` |
| `onclick="..."`, `onsubmit="..."`, etc. | Inline event handlers are CSP violations, hard to debug | External JS files in `assets/scripts/` with `addEventListener` |
| `<script>...</script>` inside HTML bodies | Blocks rendering, mixes concerns, no caching | External JS files loaded via `_includes/scripts.html` |
