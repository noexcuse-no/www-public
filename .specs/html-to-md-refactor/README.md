# HTML → MD Content Refactoring

## Purpose

Eliminate all inline HTML from `_pages/*.md` files. Content lives in Markdown body text and YAML frontmatter; HTML templates live exclusively in `_layouts/*.html` and `_includes/*.html`. Templates are DRY — no repeated patterns, shared components for everything.

## Architecture Principle

```
┌─────────────────────────────────────────────────┐
│  _data/*.yml          Structured data           │
│  _pages/*.md          Frontmatter + Markdown    │
│  _topics/*.md         Topic content             │
├─────────────────────────────────────────────────┤
│  _includes/*.html     Reusable HTML components  │
│  _layouts/*.html      Page layouts              │
├─────────────────────────────────────────────────┤
│  assets/css/*.css     Presentation              │
│  assets/scripts/*.js  Behavior                  │
└─────────────────────────────────────────────────┘
```

- `_pages/*.md` body: only Markdown + `{% include %}` calls + `{% comment %}` — **no raw HTML**
- `_pages/*.md` frontmatter: all structured data for the page (hero, sections, questions, etc.)
- `_includes/*.html`: all HTML markup, one component per concern
- `_layouts/*.html`: page structure, content regions, includes wiring

## Current State

### Pages with 0 inline HTML (already clean — 5 pages)

| Page | Layout | Notes |
|------|--------|-------|
| `dagfinn.md` | page | Single profile — all data in frontmatter |
| `identitet.md`, `struktur.md`, `mennesker.md`, `påvirkning.md` | perspektiv | All content in frontmatter, rendered by layout |

These pages prove the model works. Frame pages are the gold standard.

### Pages with inline HTML (19 pages)

| Page | HTML elements | Pattern |
|------|--------------|---------|
| `emne.md` | `section.frame-hero`, `div.tag-cloud`, `section.frame-cta` | Custom hero + tag cloud + CTA |
| `grc.md` | 6+ sections, 4 `div.info-box` with inline `--card-accent`, `table.grc-table`, 3 `section-illustration`, framework-illustration | **Worst offender** — duplicates 4 frame pages |
| `ledelse_60-2.md` | `landing-benefits`, `landing-process`, `landing-story`, `landing-cases` (case cards), `landing-cta` | Landing page sections |
| `ledelse_forankring.md` | info-box × 5, framework-illustration, challenge-grid (4 cards), question-list | Article pattern |
| `ledelse_generativ-ki.md` | info-box × 8, framework-illustration | Article pattern (info-box heavy) |
| `ledelse_makt.md` | framework-illustration, 4 section-wrappers, question-list (5 li), CTA | Article pattern |
| `ledelse_perspektiv.md` | hero-content, 6 info-box, 2 framework-illustration, challenge-grid, 3 sections | Article pattern + custom hero |
| `ledelse_tillit.md` | info-box × 4, framework-illustration, challenge-grid, question-list | Article pattern |
| `ledelse_triader.md` | hero-content, 5 info-box, framework-illustration | Article pattern + custom hero |
| `ledelse_usikkerhet.md` | info-box × 5, framework-illustration, question-list | Article pattern |
| `om_avtale.md` | `section.avtale-page`, 5 `div.avtale-section-header` | Contract sections |
| `om_metode.md` | 2 science-sections, ethics-columns (3), highlights, quotes, divider | Custom science page |
| `om_oss.md` | about-story, about-values (3 value-card), about-legal, about-team, about-cta | About page sections |
| `step-interview.md`, `step-report.md`, `step-talk.md` | section + section-illustration (each) | Minimal — just wrapper |

### Repeated patterns across pages

| Pattern | Used on | Count |
|---------|---------|-------|
| `section.container--wide.animate-on-scroll.fade-in-up` | Every article page | 40+ |
| `div.info-box` + `section-illustration` inside | 6 article pages | 30+ |
| `div.framework-illustration` | 6 article pages | 7 |
| `div.challenge-card` grid | 2 article pages | 8 cards |
| `ul.question-list` | 6 article pages + 4 frame pages | 10 |
| `div.cta-buttons` + booking link | Most pages | 15+ |
| `div.section-illustration` | 10 pages | 20+ |
| `div.avtale-section-header` | `om_avtale.md` | 5 |
| Frame perspective cards (GRC) | `grc.md` only | 4 cards |

## Implementation Plan

### Phase 0: GRC refactoring (foundational)

Before creating generic includes, fix the architectural issue: GRC page's 4 perspective info-boxes duplicate content from `_pages/struktur.md`, `_pages/mennesker.md`, `_pages/påvirkning.md`, `_pages/identitet.md`.

**Changes:**

1. Add `grc_description` field to each frame page's frontmatter:
   ```yaml
   grc_description: "Strukturperspektivet handler om …"
   ```
   Values extracted from current `grc.md` info-box text.

2. Create `_includes/grc-perspective-cards.html`:
   - Loops through `site.pages | where: "class", "frame" | sort: "frame_id"`
   - Renders each frame's `grc_description` in a card with `--card-accent` from frame frontmatter
   - Uses existing `.info-box` CSS classes

3. Replace the 4 hardcoded info-boxes in `grc.md` with:
   ```markdown
   {% include grc-perspective-cards.html %}
   ```

**Files:** `_pages/struktur.md`, `_pages/mennesker.md`, `_pages/påvirkning.md`, `_pages/identitet.md`, `_includes/grc-perspective-cards.html`, `_pages/grc.md`

### Phase 1: New shared includes

Create reusable components for every repeated pattern:

| Include | Purpose | Replaces |
|---------|---------|----------|
| `_includes/section.html` | Generic section wrapper: `section.container--wide.animate-on-scroll.fade-in-up` with optional heading, illustration, custom class | The 40+ manual section openings |
| `_includes/section-illustration.html` | `div.section-illustration` with image + optional float direction | 20+ illustration wrappers |
| `_includes/info-box.html` | `div.info-box` with optional section-illustration inside, optional `--card-accent` | 30+ info-boxes |
| `_includes/framework-illustration.html` | `section` with framework image | 7 framework sections |
| `_includes/challenge-card.html` | Single challenge card in grid | 8 challenge cards |
| `_includes/challenge-grid.html` | Grid of challenge cards from frontmatter array | 2 challenge sections |
| `_includes/question-list.html` | Staged question list (bridge to Y1 — will be replaced by `questions.html` later) | 6 hardcoded lists |
| `_includes/cta-section.html` | CTA with heading, body, booking link | 10+ CTAs |
| `_includes/tag-cloud.html` | Tag cloud from `site.tags` | `emne.md` custom tag cloud |
| `_includes/avtale-section.html` | Contract section with `.avtale-section-header` + body | 5 avtale headers |
| `_includes/science-section.html` | Metode page science wrapper | 2 science sections |
| `_includes/about-values.html` | Value cards from frontmatter | 3 om_oss value cards |
| `_includes/hero-simple.html` | Simple hero for emne-like pages (not full `hero.html` layout) | `emne.md` custom hero |

### Phase 2: Strip inline HTML from all 19 pages

For each page, replace inline HTML with include calls and frontmatter data.

**Pattern:** Article pages (ledelse_forankring.md, ledelse_generativ-ki.md, etc.)

```markdown
<!-- BEFORE -->
<section class="section container--wide animate-on-scroll fade-in-up">
    <h2>Seksjonstittel</h2>
    <div class="framework-illustration animate-on-scroll fade-in-up">
        <img src="..." alt="...">
    </div>
    <div class="info-box animate-on-scroll fade-in-up">
        <div class="section-illustration animate-on-scroll fade-in-up">
            <img src="..." alt="..." class="section-illustration--float-left">
        </div>
        <h3>Punkt 1</h3>
        <p>Brødtekst</p>
    </div>
</section>

<!-- AFTER -->
## Seksjonstittel

{% include framework-illustration.html image="..." alt="..." %}

{% include info-box.html
   heading="Punkt 1"
   body="Brødtekst"
   illustration="..."
   illustration_alt="..."
   float="left"
%}
```

**Pattern:** GRC page

```markdown
<!-- BEFORE: 50+ lines of HTML -->
<section class="section container--wide animate-on-scroll fade-in-up">
    <h2>Fire perspektiver</h2>
    <p>Introduksjonstekst...</p>
</section>

<section class="section container--wide animate-on-scroll fade-in-up">
    <div class="info-box animate-on-scroll fade-in-up" style="--card-accent: #2A4D6E; ...">
        ...struktur innhold...
    </div>
    <!-- × 4 -->
</section>

<!-- AFTER -->
## Fire perspektiver

Introduksjonstekst...

{% include grc-perspective-cards.html %}
```

**Pattern:** om_metode.md

This page has unique content structure (science sections, ethics columns, quotes). Some inline HTML may be justified if the structure is genuinely one-off, but we should attempt to create `science-section.html` and `ethics-columns.html` includes first.

**Pattern:** emne.md

```markdown
<!-- BEFORE: 25 lines of HTML hero + tag cloud + CTA -->

<!-- AFTER -->
{% include hero-simple.html title="Emneoversikt" intro="..." %}
{% include tag-cloud.html %}
{% include cta-section.html %}
```

### Phase 3: Consolidate duplicate includes

Check existing `_includes/` for overlap:

| Current includes | Potential consolidation |
|-----------------|----------------------|
| `hero.html` (general), `hero-simple.html` (new) | Could merge, but hero.html is designed for layout-level use with frontmatter fallback, while hero-simple is page-body use with explicit params |
| `cta.html` (generic CTA), `cta-section.html` (new) | Check if cta.html is flexible enough or if cta-section.html replaces it |
| `card.html` (topic cards), `grc-perspective-cards.html` | Different purposes — card.html is for topic collections, grc is for frame cross-reference |

Rename or merge for consistency where it makes sense.

### Phase 4: Verify

- [ ] `grep -n '<div\|<section\|<table\|<a href\|<img\|class="' _pages/*.md` returns only false positives (code in backticks, frontmatter, or valid `{% include %}` params)
- [ ] `grep -n '<style' _pages/*.md` returns nothing
- [ ] Site builds cleanly with `jekyll build`
- [ ] Visual diff shows no layout changes (same CSS classes, same DOM structure)

## Dependencies

- Y1–Y9 (Review Questions) is independent and should proceed alongside this refactor — it already follows the HTML-in-MD principle
- The GRC `grc_description` frontmatter on frame pages needs to be written from current GRC content — requires content decisions per frame

## Edge Cases

| Case | Approach |
|------|----------|
| **Unique layouts** (om_metode.md science sections) | Create dedicated includes even if used once — keeps `.md` clean |
| **Inline `--card-accent` styles** | Move to frontmatter: `accent_color: "#2A4D6E"` on each frame, rendered by include |
| **Custom classes on sections** | `section.html` include accepts `class` parameter, appended to base classes |
| **Pages with wrap-only HTML** (step-*.md) | Minimal change — just `section.html` include |
| **Existing `cta.html` include** (not used consistently) | Phase 3 consolidation will standardize to one CTA include |
