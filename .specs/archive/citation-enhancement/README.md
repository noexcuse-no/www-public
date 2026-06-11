# Citation Enhancement — Functional Specification

## Purpose and Scope

Replace the current ad-hoc citation system (raw `<sup class="citation">` HTML + orphan `[^ref]:` definitions) with a three-layer citation architecture:

1. **kramdown native footnotes** for human-readable inline references and auto-generated footnote lists
2. **JSON-LD `citation` array** in page frontmatter for machine-readable structured data
3. **JavaScript enhancer** that reads the JSON-LD citation block at runtime and injects microdata (`itemprop`, `itemscope`) into kramdown's auto-generated footnote HTML

The result is a citation system that is:
- Authorable in clean Markdown (`[^ref]` syntax)
- Machine-readable for search engines, AI tools, and academic crawlers
- Semantically enriched in the rendered DOM for JS-enabled browsers
- Linkable to original sources (publisher direct link where available, Google Scholar as fallback)

## Pages in Scope

All existing and future pages that cite academic or professional sources:

| Page | Current Citation Method | Change Required |
|------|------------------------|-----------------|
| `/struktur/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/mennesker/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/påvirkning/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/identitet/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/usikkerhet/` | Orphan `[^ref]:` definitions + `<sup class="citation">` | Full conversion |
| `/forankring/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/tillit/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/metode/` | Hand-written `<ul>` reference list | Full conversion |
| `/ledelse-60-2/` | Hand-written reference list + some `<sup>` | Full conversion |
| `/perspektiv/` | No citations (future) | Schema ready |
| `/triader/` | No citations (future) | Schema ready |
| `/makt/` | No citations (future) | Schema ready |
| /generativ-ki/ | Hand-written reference list | Full conversion |

## Requirements

### R1 — kramdown native footnotes

**Inline citation syntax** (in page body):

```markdown
... as described by Bolman & Deal.[^bolman2017]
```

**Footnote definition** (at bottom of page, before any sections or footnotes area):

```markdown
[^bolman2017]: Bolman, L. G. &amp; Deal, T. E. (2017). *Reframing Organizations* (6th ed.). Wiley. [Wiley →](https://www.wiley.com/...)
```

**Link strategy:**
- If a freely accessible direct link exists (publisher, DOI, open access repository): use the **publisher's name** as anchor text, e.g. `[Wiley →](https://www.wiley.com/...)`, `[Harvard Business Review →](https://hbr.org/...)`, `[Harper Business →](https://www.harperbusiness.com/...)`
- If no direct link exists: use `[Google Scholar →](https://scholar.google.com/scholar?q=...)` as fallback
- Multi-source footnotes (e.g. a claim supported by two references) should use separate `[^ref]` markers, not be combined

**kramdown configuration** (in `_config.yml`):

```yaml
kramdown:
  footnote_backlink: "↩"
```

This adds a clickable ↩ backlink from each footnote to its citation point in the text.

**CSS styling** (in `assets/css/article.css` or `assets/css/citations.css`):

```css
.footnotes {
  margin-top: 3rem;
  padding-top: 1.5rem;
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

.footnotes li:target {
  background: var(--highlight-bg, rgba(0, 48, 96, 0.05));
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.footnote-backlink {
  margin-left: 0.25rem;
  text-decoration: none;
  opacity: 0.5;
  font-size: 0.85em;
}

.footnote-backlink:hover {
  opacity: 1;
}

.dark-mode .footnotes {
  border-top-color: var(--border-color-dark);
}

.dark-mode .footnotes li:target {
  background: rgba(240, 255, 255, 0.08);
}
```

**Reduced motion:** No animation on footnote backlinks.

### R2 — JSON-LD citation array in frontmatter

Each page with citations adds a `citation` key to its existing `json_ld` frontmatter block.

**Schema:**

```yaml
json_ld:
  type: "Article"                    # or "TechArticle", "ScholarlyArticle"
  # ... existing fields ...
  citation:
    - "@id": "#fn:refname"          # must match kramdown's auto-generated anchor
      "@type": "ScholarlyArticle"
      name: "Full Title of Work"
      author:
        - "@type": "Person"
          name: "AuthorLastName, FirstInitial"
      datePublished: "YYYY"
      publisher:
        "@type": "Organization"
        name: "Wiley"
      url: "https://..."             # direct link or Google Scholar
      sameAs: "https://doi.org/..."  # DOI when available (optional)
      isAccessibleForFree: true      # true if direct link is freely available
```

**Required fields per citation entry:**
| Field | Required | Notes |
|-------|----------|-------|
| `@id` | **Yes** | Must match `#fn:refname` from kramdown |
| `@type` | **Yes** | `"ScholarlyArticle"` for academic works, `"CreativeWork"` for reports/standards |
| `name` | **Yes** | Full title |
| `author` | **Yes** | Array of `{"@type": "Person", "name": "..."}` |
| `datePublished` | **Yes** | Four-digit year |
| `publisher` | Recommended | `{"@type": "Organization", "name": "..."}` |
| `url` | **Yes** | Direct link or Google Scholar fallback |
| `isAccessibleForFree` | Recommended | Boolean |

**Generation rule:** Every `[^ref]` in the page body MUST have a corresponding entry in the `citation` array, and its `@id` MUST match `#fn:refname`.

### R3 — JavaScript enhancer module

**File:** `assets/scripts/citation-enhancer.js`

**Behavior:**
1. On `DOMContentLoaded`, read the page's `<script type="application/ld+json">` block
2. Extract the `citation` array
3. For each citation with `@id` matching `#fn:refname`:
   - Find kramdown's auto-generated `<li id="fn:refname">` in the `.footnotes` list
   - Inject `itemscope` + `itemtype="https://schema.org/ScholarlyArticle"` on the `<li>`
   - Inject a nested `<script type="application/ld+json">` inside the `<li>` with the full citation data (microdata + embedded JSON-LD coexist per Schema.org)
   - Find the corresponding `<sup id="fnref:refname">` in the article body
   - Inject `itemprop="citation"` and `itemid="#fn:refname"` on the `<sup>`
4. No-op if no `citation` array exists

**Edge cases:**
- Multiple `[^ref]` markers to the same footnote (`[^logan2009]` used 5 times in a page) → all `<sup id="fnref:logan2009">` get the same `itemprop` injection (kramdown creates unique IDs via appended counter)
- No JSON-LD on page → module does nothing, no console errors
- Missing citation entry for a footnote → silent skip, no crash

**Loading:** Include via `<script src="/assets/scripts/citation-enhancer.js" defer></script>` in `_includes/scripts.html`.

### R4 — Footnote backlink styling

kramdown's `footnote_backlink: "↩"` generates a backlink from each footnote list item to its citation point. Style the backlink with:
- Subtle opacity (0.5) with hover → full opacity
- Small font size (0.85em)
- No underline on the link itself

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `.specs/citation-enhancement/README.md` | **Create** | This document |
| `.design/citation-enhancement.md` | **Create** | Design rules for citation JSON-LD, microdata, CSS, and JS |
| `_config.yml` | **Update** | Add `kramdown.footnote_backlink: "↩"` |
| `assets/css/article.css` | **Update** | or create `assets/css/citations.css` — footnote list styling |
| `assets/css/styles-dark.css` | **Update** | Dark mode footnote styles |
| `assets/scripts/citation-enhancer.js` | **Create** | JS microdata injection module |
| `_includes/scripts.html` | **Update** | Include `citation-enhancer.js` |
| `_includes/metadata.html` | **Update** | Verify JSON-LD `citation` array renders (likely already works) |
| All article `_pages/*.md` | **Update** | Replace `<sup class="citation">` + orphan `[^ref]:` with kramdown native footnotes + frontmatter citation entries |

## Dependencies

- No external libraries (vanilla JS)
- kramdown is Jekyll's default Markdown processor — no gem changes needed
- Frontmatter `json_ld` blocks already render via `_includes/metadata.html` — no template changes needed for JSON-LD output

## Testing Checklist

- [ ] `[^ref]` syntax renders as superscript linked to footnote definition
- [ ] Footnote backlink (↩) appears on each footnote and scrolls to citation point
- [ ] Clicking superscript scrolls to footnote definition
- [ ] JSON-LD `citation` array appears in compiled HTML `<script type="application/ld+json">`
- [ ] Google Structured Data Testing Tool validates `citation` entries
- [ ] JS enhancer injects `itemprop` and `itemscope` into footnote DOM
- [ ] JS enhancer handles missing JSON-LD gracefully (no errors)
- [ ] Dark mode footnote styles render correctly
- [ ] Reduced motion: no animation on footnotes
- [ ] Mobile: footnote list readable at all breakpoints
- [ ] No regressions in existing page layout or content
