# Shared Patterns — Functional Specification

Common patterns used across multiple features. Reusable guidelines for consistent implementation.

---

## Domain knowledge

Look up domain knowledge on the subject matter by starting at .spec/shared/synthesis.md

## Linking Frame Articles

Frame articles are linked from:

1. **Vitenskapelig grunnlag page** (`_pages/om_forskning.md`):
   - 4 frame links in 2×2 grid
   - Use `class="frame-link"` for styled links
   - Permalinks: `/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`

2. **Ledelse 60:2 benefit cards** (on landing page):
   - Each benefit links to relevant frame article
   - Example: "Få kontroll uten byråkrati" links to struktur article

### Link Pattern

```html
<a href="{{ '/struktur/' | relative_url }}" class="frame-link">Les artikkelen →</a>
```

---

## Adding Illustrations

When adding illustrations to a page:

1. **Image file**: Save to `assets/images/` with descriptive Norwegian name (kebab-case)
2. **Alt text**: Required, descriptive, no "Bilde av" prefix
3. **Dark mode**: Test on both themes; use `var(--background-color)` if needed
4. **Aspect ratio**: 16:9 for hero/banner, 4:3 for thumbnails
5. **No text**: Never embed text in images (multilingual site)

### Image Include Pattern

```html
<div class="hero-image">
    <img src="{{ '/assets/images/banners/frame-struktur.png' | relative_url }}" alt="Abstrakt geometrisk illustrasjon av strukturperspektivet">
</div>
```

---

## Dark Mode Checklist

When implementing any new component:

- [ ] All colors via CSS variables from `colors.css`
- [ ] Both light and dark variants defined
- [ ] Tested on both themes (toggle dark mode on/off)
- [ ] Text contrast passes WCAG AA (4.5:1 for body, 3:1 for large)
- [ ] No hardcoded `#ffffff` or `#000000` for backgrounds/text
- [ ] Box shadows use appropriate opacity for theme

### CSS Variable Pattern

```css
.component {
    background-color: var(--box-background-light);
    color: var(--text-color-light);
}

body.dark-mode .component {
    background-color: var(--box-background-dark);
    color: var(--text-color-dark);
}
```

---

## Bibliography Linking

Cite domain knowledge from `.spec/shared/`:

| Article | Primary Source File |
|---------|-------------------|
| Struktur | `pfeffer-2010.md` |
| Mennesker | `blanchard-barrett-2011.md` |
| Påvirknng | `pfeffer-2010.md` |
| Identitet | `logan-2011.md` |

### Bibliography Brief Structure

Each brief in `.spec/shared/` contains:
- Key thesis (1-2 sentences)
- Main conclusions (bullet list)
- Relevance to practice
- Key quotes
- Source quality assessment

### In-Text Citation Pattern

```markdown
Bolman og Deal (2017) beskriver fire rammeverk for å analysere organisasjoner[^1].

[^1]: Bolman, L. G., & Deal, T. E. (2017). *Reframing Organizations* (6th ed.). Jossey-Bass.
```

### Inline Source Link Pattern

For linking to source in body:

```html
Les mer om <a href="https://sourcelink.com" target="_blank" rel="noopener">Pfeffers maktstrategier</a>.
```

---

## SEO Article Pattern

SEO funnel articles follow this structure:

1. **Frontmatter**: `title`, `description`, `permalink`, `json_ld`
2. **Abstract**: 2-3 sentences, no consultant-speak
3. **Hero image**: 16:9, no text, Scandinavian minimal
4. **Body**: ~1500 words, H2/H3 headers, scannable
5. **Bibliography**: Inline citations + sources section
6. **CTA**: Related product or consultation offer

### SEO Article Frontmatter Schema

```yaml
---
layout: page
title: "Article Title"
description: "Description for SEO and social sharing (150-160 chars)"
permalink: /path-to-article/
json_ld:
  type: "Article"
  name: "Article Name"
  description: "Full description"
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Related Topic"
---
```

---

## Accessibility Requirements

All pages must meet WCAG AA:

- **Language**: `lang="no"` on `<html>`
- **Alt text**: Every image has descriptive alt
- **Semantic HTML**: `<header>`, `<main>`, `<footer>`, `<nav>`
- **Color contrast**: Both themes pass AA
- **Touch targets**: 44×44px minimum
- **Focus indicators**: Visible on keyboard navigation