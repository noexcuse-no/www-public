# Wide-Screen Sidebar — Article & Homepage

> **Status:** Planned | BL: W1, W2
> **Design approach:** Auto-generated TOC from `<h2>`/`<h3>` in `.article-body` (zero-maintenance, exclusion attribute available later if needed)

## Problem

On wide screens (≥1200px viewport width), the article layout uses `--content-wide: 800px` max-width, leaving approximately 500–560px of unused space on each side at 1920px. This space can be used for navigation and conversion elements that currently sit at the bottom of the page.

## Article Page Layout (W1)

### Grid Structure

Replace the current single-column container with a CSS grid on wide screens:

```
.article-layout {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 800px) 320px 1fr;
  grid-template-areas: ". content sidebar .";
}
```

- **Center column:** The existing `.article-body` content (unchanged — same max-width, same background, same padding)
- **Right column (320px):** The sidebar panel
- **Left/outer columns:** 1fr each for balanced whitespace

### Sidebar Panel

**Position:** `position: sticky; top: calc(var(--header-height) + var(--space-md)); align-self: start`

**Stacked content, top to bottom:**

```
┌──────────────────────┐
│  PAGE INDEX          │
│  ──────────────────  │
│  • H2 heading 1     │ ← current section (highlighted)
│    • H3 subheading  │
│  • H2 heading 2     │
│  ...                │
│                      │
│ ──── divider ────   │
│                      │
│  QUESTIONS           │
│  ──────────────────  │
│  [Question 1]        │ ← same interactive modal behavior
│  [Question 2]        │
│  [Question 3]        │
│  ...                 │
│                      │
│ ──── divider ────   │
│                      │
│  CTA SECTION         │
│  ──────────────────  │
│  [Book samtale]      │ ← same content as cta-section.html
│  [Les mer →]         │
└──────────────────────┘
```

**Styling:**
- Background: `var(--box-background-light)` / `var(--box-background-dark)` — matches `.article-body`
- Border-radius: `var(--radius-xl)` — matches `.article-body`
- Box-shadow: `var(--shadow-sm)` / `var(--shadow-sm-dark)` — matches `.article-body`
- Padding: `var(--space-lg)`
- Dividers between sections: `1px solid var(--border-color-light/dark)`

### Page Index (TOC)

- Auto-generated from all `<h2>` and `<h3>` elements inside `.article-body`
- `<h2>` items are top-level, `<h3>` items are indented under their parent `<h2>`
- IntersectionObserver tracks which heading is currently in/above the viewport
- Active heading gets a distinct style (accent color left border, bold text)
- Clicking an item smooth-scrolls to the heading
- Collapse behavior: on mobile/tablet, becomes a collapsible "På denne siden" toggle at the top of the article

### Questions Section

- Renders the same `{% include questions.html %}` content, but in the sidebar instead of at the bottom of `.article-body`
- Same interactive modal behavior (click → AI provider → clipboard)
- On wide screens: the questions section in the article body is hidden; the sidebar questions are shown
- On mobile/tablet: questions return to bottom-of-page (current behavior)

### CTA Section

- Same content as `_includes/cta-section.html` (heading, body, two buttons)
- On wide screens: hidden from bottom of article body, shown in sidebar
- On mobile/tablet: returns to bottom-of-page

### Hero-Aware Visibility

The entire sidebar panel is hidden until the hero banner scrolls out of view:

```javascript
const hero = document.querySelector('.hero');
const sidebar = document.querySelector('.article-sidebar');
const observer = new IntersectionObserver(([entry]) => {
  sidebar.classList.toggle('sidebar-visible', !entry.isIntersecting);
});
observer.observe(hero);
```

- Initial state: `opacity: 0; pointer-events: none`
- Visible state: `opacity: 1; pointer-events: auto`
- Transition: `opacity 0.3s ease`

### Collapse on Mobile/Tablet

Breakpoint: `max-width: 1199px` — the sidebar panel disappears entirely. The article returns to the current single-column layout, with questions and CTA at the bottom of the page as they are today. The TOC becomes a collapsible section at the top of the article body:

```
▼ På denne siden          ← collapsible toggle
  • H2 heading 1
  • H2 heading 2
    • H3 subheading
```

## Homepage Layout (W2)

The homepage uses a completely different layout structure (`_layouts/home.html`):

```
{{ content }}
{% include products.html %}
{% include profiles.html %}
{% include cta-section.html %}
{% include partners.html %}
```

There is no central `.article-body` content card. Instead, the homepage has a hero-intro section, then products, profiles, CTA, and partners in sequence.

**Approach:** A wider panel on the right side showing:

1. **Featured articles** — 3–4 recent/promoted articles (title + brief), linking into the content hub
2. **Newsletter signup** — inline email capture (same as F4a)
3. **CTA** — book a conversation

**Layout:**
```
.home-layout {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 900px) 300px 1fr;
  grid-template-areas: ". content sidebar .";
}
```

Each homepage section (hero-intro, products, profiles, CTA, partners) spans the full content column. The sidebar sticks alongside.

**Visibility:** Appears after the hero-intro section scrolls past (same IntersectionObserver pattern).

## Implementation Order

1. `assets/css/sidebar.css` — grid layout, panel styling, scroll-spy indicators, responsive collapse
2. `assets/scripts/sidebar.js` — IntersectionObserver for hero visibility + heading highlighting
3. `_layouts/article.html` — wrap content in new grid, conditionally render sidebar (includes TOC + questions + CTA)
4. `_includes/sidebar-toc.html` — new include for auto-generated TOC
5. `_layouts/home.html` — separate grid wrapper + sidebar include
6. `_includes/sidebar-home.html` — new include for homepage sidebar content

## Dependencies

- W1 (article pages) and W2 (homepage) can be developed independently
- Both depend on existing IntersectionObserver in `assets/scripts/` (or reuse the animation.js observer)
- No JavaScript framework changes needed — vanilla JS

## Open Questions

- Should the TOC include `<h3>` as indented sub-items, or only `<h2>`? (Design decision: include `<h3>` but at a smaller/indented size)
- Should the sidebar have a maximum height with internal scroll, or should it grow with the page? (Design decision: `max-height: calc(100vh - header-height - 2rem); overflow-y: auto`)
