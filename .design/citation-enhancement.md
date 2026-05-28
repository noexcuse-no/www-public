# Citation Enhancement — Design Rules

## Overview

Three-layer citation architecture for the No Excuse website.

```
┌──────────────────────────────────────────┐
│  Layer 1: kramdown native footnotes      │  ← Human-readable, authored in Markdown
│  ([^ref] inline, [^ref]: at bottom)      │
├──────────────────────────────────────────┤
│  Layer 2: JSON-LD citation array          │  ← Machine-readable, in frontmatter
│  (citation[] in json_ld block)           │
├──────────────────────────────────────────┤
│  Layer 3: JS enhancer                     │  ← Runtime microdata injection
│  (citation-enhancer.js, reads JSON-LD)   │
└──────────────────────────────────────────┘
```

## Layer 1 — kramdown Footnotes

### Authoring Rules

When adding a citation in an article:

**Inline** (in prose):
```markdown
The four-frame model was first presented in 1984.[^bolman2017]
```

- Place `[^refname]` immediately after the claim being cited, before punctuation
- `refname` should be a short, meaningful key: `[^bolman2017]`, `[^kotter2012]`, `[^logan2009]`, `[^schein2010]`, `[^pfeffer2010]`
- Convention: `[^surnameYYYY]` — lowercase author surname + 4-digit year. If multiple sources from same author+year, append `a`, `b`: `[^pfeffer2010a]`, `[^pfeffer2010b]`

**Footnote definition** (at bottom of page, after all content, before any sections):
```markdown
[^bolman2017]: Bolman, L. G. &amp; Deal, T. E. (2017). *Reframing Organizations* (6th ed.). Wiley. [Wiley →](https://www.wiley.com/en-us/Reframing+Organizations%3A+Artistry%2C+Choice%2C+and+Leadership%2C+6th+Edition-p-9781119281825)
```

### Link Strategy

| Source Type | Anchor Text | Target |
|-------------|-------------|--------|
| Direct publisher link | Publisher name + `→` | `[Wiley →](https://...publisher-url...)` |
| DOI | Publisher name + `→` | `[Wiley →](https://doi.org/10....)` |
| Google Scholar (no direct link) | `Google Scholar →` | `[Google Scholar →](https://scholar.google.com/scholar?q=..."Title"+Author)` |
| Open access / freely available | Publisher name (no `→`) | `[Harvard Business Review](https://hbr.org/...)` |

### Page Number Handling

Page numbers belong in the footnote body text, kramdown renders them as plain text:

```markdown
[^logan2009]: Logan, D., King, J., & Fischer-Wright, W. (2009). *Tribal Leadership*. Harper Business, pp. 38–41. [Google Scholar →](https://scholar.google.com/scholar?q=%22Tribal+Leadership%22+Logan)
```

### Multiple Citations for One Claim

Use separate footnote markers, one per source:

```markdown
The failure rate of change initiatives is well documented.[^kotter2012][^beer2000]
```

### Configuration

In `_config.yml`:
```yaml
kramdown:
  footnote_backlink: "↩"
```

The ↩ backlink appears at the end of each footnote `<li>` and jumps the reader back to the superscript in the article body.

## Layer 2 — JSON-LD Citation Array

### Frontmatter Pattern

Add a `citation` key to the existing `json_ld` block in each page's frontmatter:

```yaml
---
layout: page
title: "Page Title"
permalink: /page/
json_ld:
  type: "Article"
  name: "Page Title"
  description: "SEO description"
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Topic"
  citation:                         # ← NEW
    - "@id": "#fn:bolman2017"
      "@type": "ScholarlyArticle"
      name: "Reframing Organizations: Artistry, Choice, and Leadership"
      author:
        - "@type": "Person"
          name: "Bolman, L. G."
        - "@type": "Person"
          name: "Deal, T. E."
      datePublished: "2017"
      publisher:
        "@type": "Organization"
        name: "Wiley"
      url: "https://www.wiley.com/en-us/Reframing+Organizations%3A+Artistry%2C+Choice%2C+and+Leadership%2C+6th+Edition-p-9781119281825"
      isAccessibleForFree: false
    - "@id": "#fn:logan2009"
      "@type": "ScholarlyArticle"
      name: "Tribal Leadership: Leveraging Natural Groups to Build a Thriving Organization"
      author:
        - "@type": "Person"
          name: "Logan, D."
        - "@type": "Person"
          name: "King, J."
        - "@type": "Person"
          name: "Fischer-Wright, W."
      datePublished: "2009"
      publisher:
        "@type": "Organization"
        name: "Harper Business"
      url: "https://scholar.google.com/scholar?q=%22Tribal+Leadership%22+Logan"
      isAccessibleForFree: true
---
```

### Schema Rules

1. **`@id` MUST match** kramdown's auto-generated footnote anchor: `#fn:bolman2017` for `[^bolman2017]`
2. **Every `[^ref]` in the page body MUST have a corresponding entry** in the `citation` array — missing entries are a bug
3. **`@type` choices:**
   - `ScholarlyArticle` — academic books, journal articles, dissertations
   - `CreativeWork` — reports, standards, legal documents, white papers
   - `SoftwareApplication` — software, tools, platforms
4. **`author` is always an array** even for single authors: `[{"@type": "Person", "name": "Hubbard, D. W."}]`
5. **Date format:** Four-digit year only (`"2017"`) — month/day are not required for citation context

### Rendering

The existing `_includes/metadata.html` template renders `page.json_ld` as:

```html
<script type="application/ld+json">
{{ page.json_ld | jsonify }}
</script>
```

This already handles the `citation` array correctly — no template changes needed. Verify the compiled output includes the citation array.

## Layer 3 — JavaScript Enhancer

### Module Architecture

```
citation-enhancer.js
├── getCitations()        → Reads JSON-LD block, returns citation[]
├── enhanceFootnote(li, citation)
│   ├── Sets itemscope + itemtype on <li>
│   └── Injects nested <script type="application/ld+json"> with full citation
├── enhanceSupers(citations[])
│   └── Sets itemprop="citation" + itemid on <sup id="fnref:...">
└── init()
    └── Calls getCitations() → forEach citation → enhanceFootnote() + enhanceSupers()
```

### DOM Targets

kramdown generates this HTML from `[^bolman2017]`:

```html
<!-- Inline superscript in article body -->
<sup id="fnref:bolman2017"><a href="#fn:bolman2017" class="footnote">[1]</a></sup>

<!-- In the footnotes list at bottom -->
<li id="fn:bolman2017">
  <p>Bolman, L. G. &amp; Deal, T. E. (2017). <em>Reframing Organizations</em> (6th ed.). Wiley. <a href="https://...">Wiley →</a>&nbsp;<a href="#fnref:bolman2017" aria-label="Back to content">↩</a></p>
</li>
```

### After JS Enhancer Runs

```html
<sup id="fnref:bolman2017" itemprop="citation" itemid="#fn:bolman2017">
  <a href="#fn:bolman2017" class="footnote">[1]</a>
</sup>

<li id="fn:bolman2017" itemscope itemtype="https://schema.org/ScholarlyArticle" itemid="#fn:bolman2017">
  <script type="application/ld+json">
    {"@id": "#fn:bolman2017", "@type": "ScholarlyArticle", "name": "Reframing Organizations", ...}
  </script>
  <p>Bolman, L. G. &amp; Deal, T. E. (2017). <em>Reframing Organizations</em> (6th ed.). Wiley. <a href="...">Wiley →</a> <a href="#fnref:bolman2017" aria-label="Back to content">↩</a></p>
</li>
```

### Implementation Rules

- **No dependencies** — vanilla JS, no DOM libraries
- **Defer loading** — `defer` attribute in `<script>` tag ensures DOM is ready before execution
- **Graceful degradation** — if no JSON-LD citation array exists, the module is a no-op (check `if (!citations.length) return;`)
- **Idempotent** — running the enhancer multiple times on the same page should not duplicate attributes (check before setting)
- **Console-free in production** — no `console.log` calls unless debugging

### CSS for Footnotes

Styles should be in a dedicated `assets/css/citations.css` (or merged into `article.css`):

```css
/* --- Citation / Footnote Styles --- */

.footnotes {
  margin-top: var(--space-xl, 3rem);
  padding-top: var(--space-md, 1.5rem);
  border-top: 1px solid var(--border-color-light);
  font-size: 0.875em;
}

.footnotes ol {
  padding-left: 1.25rem;
}

.footnotes li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* Highlight the target footnote when navigated to via anchor */
.footnotes li:target {
  background: var(--highlight-bg, rgba(0, 48, 96, 0.05));
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm, 4px);
  transition: background 0.3s ease;
}

/* Backlink ↩ */
.footnote-backlink {
  margin-left: 0.25rem;
  text-decoration: none;
  opacity: 0.5;
  font-size: 0.85em;
  transition: opacity 0.2s ease;
}

.footnote-backlink:hover {
  opacity: 1;
}

/* Inline footnote reference numbers */
sup .footnote {
  color: var(--primary-accent);
  text-decoration: none;
  font-weight: 500;
}

sup .footnote:hover {
  text-decoration: underline;
}

/* Dark mode overrides */
.dark-mode .footnotes {
  border-top-color: var(--border-color-dark);
}

.dark-mode .footnotes li:target {
  background: rgba(240, 255, 255, 0.08);
}
```

### Accessibility

- kramdown's auto-generated backlink includes `aria-label="Back to content"` — verify this in compiled output
- Footnote superscript numbers should have sufficient color contrast against body text (WCAG AA)
- The `:target` highlight on footnote list items helps users orient after clicking a backlink
- No auto-scroll animations (respects reduced motion)

## Authoring Workflow

When creating a new article that cites sources:

1. **Write** — Use `[^surnameYYYY]` inline citations during drafting
2. **Define** — Add `[^surnameYYYY]: Full citation + link` at page bottom
3. **Declare** — Add `citation:` key to frontmatter `json_ld` block with matching `@id`
4. **Verify** — Check that compiled HTML includes both the footnotes list and the JSON-LD citation array
5. **Test** — Click a footnote superscript → scrolls to definition; click ↩ → scrolls back

## Anti-Patterns

| Anti-Pattern | Why | Instead |
|--------------|-----|---------|
| Combining multiple sources in one `[^ref]` | Breaks link between footnote and individual JSON-LD entry | Use separate `[^ref]` markers per source |
| Using HTML `<sup>` instead of `[^ref]` | kramdown won't process the inline/footnote relationship | Always use `[^ref]` Markdown syntax |
| Omitting `url` from JSON-LD citation | Reduces usefulness for search engines and users | Always include a link (publisher or Google Scholar) |
| Putting footnotes inside a `<section>` | May break kramdown's footnote placement | Put `[^ref]:` definitions at the very bottom of the file, outside any sections |
| Inconsistent author name format in JSON-LD | Confuses search engines | Always use `"LastName, FirstInitial"` format |
