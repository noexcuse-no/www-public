# Partners — Functional Specification

## Purpose and Scope

Define the `partners` Jekyll collection for partner organizations. Collection is declared but currently has no content files or rendering template.

## Requirements

- Simple listing of partner logos/names with links
- Tags for categorization (future filtering)

## Data Structures

### Partner frontmatter (`_partners/*.md`)

```yaml
---
name: "Partner Name"               # required
url: "https://partner.no"          # required
image: "assets/images/partner-logo.png"  # required
tags: "#samarbeid #teknologi"      # optional
---
```

## Dependencies

- **Collection**: Already declared in `_config.yml` (`partners: output: true`)
- **Template**: Needs `_includes/partners.html` creation
- **CSS**: Needs `partners.css` creation (or inclusion in `products.css`)
- **Include**: Needs to be added to `_layouts/default.html` `<main>`
