# Ledelse 60:2 — UI/UX Improvements

> Created: 2026-06-08
> Status: Ready
> Backlog References: U1–U10

## Problem / Goal

The `/ledelse-60-2/` product page has several structural and visual issues that hurt conversion and user experience: no primary CTA in the hero, unstyled CTAs in the body, missing section headers between card grids, redundant CTA sections, thin footer navigation, and weak visual hierarchy for the process steps. These 10 items address the full set of layout, interaction, and information hierarchy problems identified in an audit.

## Scope

- `_pages/ledelse_60-2.md` — hero frontmatter, content sections, CTAs, image alt text
- `_layouts/product.html` — layout-level changes for sticky CTA, hero CTA slot, section structure
- `_includes/hero.html` — optional CTA slot in hero overlay
- `assets/css/products.css` — hero CTA, stat bridge, sticky bar, step timeline styles
- `assets/css/footer.css` — footer nav link styles
- `_data/navigation.yml` — footer nav entries (or `_data/footer.yml`)
- `_includes/footer.html` — nav links in footer

## Acceptance Criteria

### U1 — Hero primary CTA
- [ ] A `.product-cta` button appears in the hero overlay on `/ledelse-60-2/`
- [ ] Button text: "Bestill uforpliktende samtale"
- [ ] Button links to the same Bookings URL as the existing CTA
- [ ] Styled consistently with other primary CTAs on the site (azure bg, white text, hover state)
- [ ] Responsive: stacks below hero text on mobile

### U2 — Plain text CTAs to styled buttons
- [ ] The two links in the first paragraph of `article-body` ("Bestill Ledelse 60:2" and "Hvordan fungerer det? ↓") are rendered as `.product-cta` buttons
- [ ] Buttons have appropriate spacing between them (flex/gap, not inline text)
- [ ] No change to the underlying URLs

### U3 — Section headers between card grids
- [ ] A visible `<h2>` heading ("Fordeler med Ledelse 60:2") appears above the benefit card grid
- [ ] A visible `<h2>` heading ("Slik fungerer det") appears above the step card grid
- [ ] Headings match site typography scale (h2: 2em, `--space-4xl` top margin)

### U4 — Visual section separation
- [ ] The step card grid section has a subtle background (e.g. `var(--surface-subtle)`) to distinguish it visually from the benefit grid above
- [ ] Section has top/bottom padding matching site rhythm (`--section-padding` or similar)
- [ ] Works in both light and dark mode

### U5 — Redundant CTA consolidation
- [ ] The inline CTA paragraph at the bottom of the article body is removed (the one duplicating the final `cta-section`)
- [ ] The final `cta-section` is preserved as-is
- [ ] Content flow reads naturally after removal

### U6 — Dedicated "Om metodikk" callout
- [ ] The `/metode/` link is extracted from the story paragraph into a dedicated callout card or info-box after the process image
- [ ] Callout has a brief heading (e.g. "Vitenskapelig fundament") and a short descriptive sentence
- [ ] Callout uses existing `.info-box` or a new subtle card style with a "Les mer om metoden →" link
- [ ] The inline `/metode/` link in the story paragraph is removed (no duplicate linking)

### U9 — Footer navigation links
- [ ] Footer contains a row of site navigation links: Perspektiv, GRC, Om oss (matching the navbar links)
- [ ] Links are styled as a horizontal row with adequate spacing
- [ ] Footer retains existing company info (org nr, email, location)
- [ ] Works on mobile (wraps gracefully)

### U10 — Process image alt text
- [ ] The T2 process flow image (`ledelse-60-2-t2-prosessflyt.webp`) alt text is updated to describe the three steps shown (e.g. "Trinn 1: Uforpliktende samtale → Trinn 2: Strukturert intervju → Trinn 3: Rapport og anbefalinger")
- [ ] Alt text is concise and descriptive, follows existing site patterns

### U11 — Sticky CTA bar on scroll
- [ ] A slim, persistent CTA bar appears at the bottom of the viewport after the user scrolls past the hero
- [ ] Bar contains: "Ledelse 60:2 — 60 spørsmål på 2 timer" text + "Bestill samtale" button
- [ ] Bar uses `position: fixed; bottom: 0` with a subtle shadow/separator
- [ ] Bar disappears when the user reaches the final CTA section at the bottom of the page
- [ ] Has a close/dismiss button
- [ ] Dark mode compatible
- [ ] Does not overlap the footer content (disappears or is pushed down on footer overlap using IntersectionObserver or margin tricks)
- [ ] Mobile: reduced height, smaller text, button still tappable (min 44px)

### U12 — Hero → card bridge (stat row)
- [ ] A single-line stat row appears between the hero and the benefit grid: "4 perspektiver · 60 spørsmål · 2 timer"
- [ ] Text is centered, larger than body copy (1.1–1.2em), subtle muted color or accent
- [ ] Has adequate vertical spacing above and below
- [ ] Responsive: wraps or scales down on mobile

### U13 — Step cards as numbered timeline
- [ ] The 3 step cards are visually connected as a sequence (horizontal line or chevron connector between them)
- [ ] On desktop: the default card grid layout is replaced with a horizontal stepper/timeline (connector line between cards, numbers more prominent)
- [ ] On mobile: cards stack vertically but retain a connecting line on the left side (vertical timeline)
- [ ] Numbered badges ("1", "2", "3") are more prominent — larger, circular, accent-colored
- [ ] Connector lines use `var(--border-color)` in light mode and `var(--border-color-dark)` in dark mode
- [ ] Animation: cards can stagger-in on scroll matching the existing `stagger-parent` pattern

## Implementation Notes

- Items U1 and U2 both add CTAs — ensure button styles are consistent (reuse `.product-cta` class, not custom button CSS)
- U3 and U4 are closely related (section headers and section background go together per section)
- U5 touches the markdown content — verify the article body content is still coherent after removing the inline CTA
- U11 (sticky bar) is the most involved — needs JS for scroll detection, IntersectionObserver for footer overlap, and CSS for fixed positioning
- U13 (timeline) involves the most layout restructuring for the card grid

## Open Decisions

- U11: Should the sticky bar use a CSS-only approach (simple `position: sticky` on a wrapper) or JS with IntersectionObserver? JS gives more control over dismissal timing. Recommend JS.
- U13: Should the step cards remain as a `<div class="card-grid">` with modified CSS, or should a separate `_includes/process-timeline.html` be created? Recommend modifying card grid CSS with a new variant class.
