# HTML Templates

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

- All SEO/social meta tags in `_includes/metadata.html`
- Populated from `_data/metadata.yml`