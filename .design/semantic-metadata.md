# Semantic Metadata — Design Decisions

> Created: 2026-06-03
> See also: `.specs/semantic-metadata/README.md`

---

## Overview

A dual-format semantic metadata layer for noexcuse.no: JSON-LD (site-wide + page-level in `<head>`) and RDFa (inline on content elements). This document covers the visual and implementation design decisions.

---

## Rationale: RDFa + JSON-LD Dual

**Why not just JSON-LD?** JSON-LD is ideal for search engine consumption but does not survive DOM manipulation, copy-paste, or context-aware processing. RDFa attributes on the HTML elements themselves travel with the content.

**Why not just RDFa?** RDFa is poor at expressing multiple entities (an Article *and* 11 ImageObjects *and* a SoftwareSourceCode) without nesting complexity. JSON-LD's `@graph` expresses this cleanly.

**The split:**
- JSON-LD: Bulk structured data — WebSite, Organization, all ImageObjects, SoftwareSourceCode
- RDFa: Content-level semantics — Article wrapper, hero image, profiles

---

## CSS — Collapsebar Process on Om Oss

```css
/* About page — LLM process collapsebar */
.about-llm-process {
    margin-top: 32px;
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: 8px;
    padding: 0;
    overflow: hidden;
}

.about-llm-process[open] {
    padding: 0 0 16px;
}

.about-llm-process summary {
    cursor: pointer;
    padding: 16px 20px;
    font-weight: 600;
    font-size: 1.05em;
    user-select: none;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.about-llm-process summary::-webkit-details-marker {
    display: none;
}

.about-llm-process summary::after {
    content: "+";
    font-size: 1.2em;
    transition: transform 0.2s ease;
}

.about-llm-process[open] summary::after {
    content: "−";
}

.about-llm-process[open] summary {
    border-bottom: 1px solid var(--color-border, #e2e8f0);
    margin-bottom: 16px;
}

.about-llm-process ol {
    padding: 0 20px;
    margin: 0;
}

.about-llm-process li {
    font-size: 0.95em;
    line-height: 1.6;
    margin-bottom: 10px;
}

.about-llm-process p {
    padding: 0 20px;
    font-size: 0.95em;
    line-height: 1.6;
}
```

### Dark mode considerations

`var(--color-border, #e2e8f0)` falls back to slate-200 in light mode. In dark mode, the CSS variable `--color-border` should be set to a darker value (e.g., `#334155`). This is already handled by the existing theme system via `colors.css` — no additional dark mode CSS needed.

---

## CSS — Footer AI Declaration

```css
.footer-ai-disclosure {
    font-size: 0.8em;
    opacity: 0.6;
    margin-top: 8px;
    line-height: 1.5;
}

.footer-ai-disclosure a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
}
```

Placed after the copyright line. Intent: visible if you look for it, not intrusive.

---

## HTML Prefix Declaration

The `prefix` attribute on `<html>` declares all vocabularies used in RDFa throughout the page:

```html
<html lang="no"
      prefix="schema: https://schema.org/
              cc: https://creativecommons.org/ns#
              iptc: http://cv.iptc.org/newscodes/digitalsourcetype/">
```

| Prefix | Namespace URI | Purpose |
|--------|---------------|---------|
| `schema` | `https://schema.org/` | Article, Person, ImageObject, SoftwareSourceCode |
| `cc` | `https://creativecommons.org/ns#` | License declarations |
| `iptc` | `http://cv.iptc.org/newscodes/digitalsourcetype/` | Digital source type |

---

## RDFa on Layouts vs IAL in Markdown

| Where | What RDFa | Why |
|-------|-----------|-----|
| `_layouts/page.html` | `<article typeof="schema:Article">` + provenance/license/url/name meta | Wraps all page content |
| `_layouts/perspektiv.html` | Same — extends page layout | Inherits from page.html |
| `_includes/hero.html` | `<section typeof="schema:ImageObject">` | Hero image provenance |
| `_includes/profiles.html` | `<div typeof="schema:Person">` | Team member semantics |
| `_pages/*.md` IAL `{: ...}` | Overrides for specific elements | Exceptions only |

The layout provides defaults. IAL is only needed when a specific element differs from the page default.

---

## No Visible AI Label

The editorial exception (Article 50(4) of EU AI Act) applies to `machine_assisted` content — no visual label needed. For `machine_generated` content, the metadata (JSON-LD + RDFa + IPTC) is sufficient. No visible "AI-generert" warning is shown on any page.

---

## Image Metadata — Pipeline

```
EvoLink GPT Image 2 → 1024×1024 PNG
  → sharp convert + resize → WebP
  → exiftool apply metadata → WebP with IPTC + CC0 XMP
```

The exiftool script is idempotent, runnable standalone. It skips files that already have `DigitalSourceType` set.

---

## File: Layout Changes Summary

### `_layouts/default.html` — Add prefix to `<html>`

```html
<html lang="no"
      prefix="schema: https://schema.org/
              cc: https://creativecommons.org/ns#
              iptc: http://cv.iptc.org/newscodes/digitalsourcetype/">
```

### `_layouts/page.html` — Article RDFa wrapper

```html
<article typeof="schema:Article"
         resource="https://noexcuse.no{{ page.url }}"
         class="content">
  {% if page.ai_provenance.category %}
  {% assign src_type = site.data.provenance.digital_source_types[page.ai_provenance.category] %}
  <meta property="schema:digitalSourceType" content="{{ src_type }}">
  {% endif %}
  <meta property="schema:license" content="{{ site.data.licenses.cc0.url }}">
  <meta property="schema:url" content="https://noexcuse.no{{ page.url }}">
  <meta property="schema:name" content="{{ page.title }}">
  <meta property="schema:description" content="{{ page.description | strip_html }}">
  {{ content }}
</article>
```

### `_includes/hero.html` — ImageObject RDFa

```html
<section class="hero" typeof="schema:ImageObject"
         {% if hero_effect %}data-hero-effect="{{ hero_effect }}"{% endif %}>
  <!-- All images are AI-generated — digitalSourceType is always trainedAlgorithmicMedia -->
  <meta property="schema:digitalSourceType"
        content="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia">
  <meta property="schema:license"
        content="{{ site.data.licenses.cc0.url }}">
  <div class="hero-image">
    <img property="schema:contentUrl"
         src="{{ hero_image | relative_url }}"
         alt="{{ hero_alt }}">
  </div>
  ...
</section>
```

### `_includes/profiles.html` — Person RDFa

```html
<div class="profile" typeof="schema:Person">
  <meta property="schema:name" content="{{ profile.name }}">
  <meta property="schema:telephone" content="{{ profile.phone }}">
  <meta property="schema:email" content="{{ profile.email }}">
  <link property="schema:sameAs" href="{{ profile.linkedin }}">
  ...
</div>
```

---

## File: JSON-LD Include Design

`_includes/provenance-jsonld.html` generates a complete `@graph` array. Design principles:

1. **Reads from `_data/*.yml`** — never hardcodes values
2. **Uses `page.ai_provenance.category`** for text digitalSourceType
3. **Hardcodes image digitalSourceType** — all 186 WebP images are `trainedAlgorithmicMedia`
4. **Generates ImageObject entries dynamically** — iterates images on the page (stretch goal: may require manual listing in frontmatter for MVP)
5. **Includes SoftwareSourceCode** — one entry for CSS, one for JS
6. **Appends to existing JSON-LD** — separate `<script>` block, parsers merge by `@id`

Simplified for MVP: hardcode the 3 ImageObject entries for hero + og-image + banner, add a note for future dynamic iteration.

---

## Implementation Notes

### New `_data/*.yml` files

These are simple data sources. No collector needed. Files are accessed via `site.data.licenses.cc0.url`, `site.data.provenance.digital_source_types.machine_assisted`, etc.

### No visual regression expected

RDFa attributes (`typeof`, `property`) have zero CSS/visual impact. `<meta>` and `<link>` inside `<article>` are invisible. The collapsebar and footer line are the only user-facing visual changes.

### Build

No new build steps beyond the exiftool script. JSON-LD and RDFa are generated at template level during Jekyll build — zero JavaScript runtime impact. The exiftool script runs pre-build to embed metadata in image files.
