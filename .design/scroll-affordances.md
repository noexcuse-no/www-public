# Scroll Affordances — Scroll-Down Indicator & Back-to-Top

> **Status:** Planned | BL: W3
> **Relationship:** Companion to the wide-screen sidebar (`.design/wide-screen-sidebar.md`) — shares the same IntersectionObserver infrastructure.

## Problem

The site has two incomplete scroll affordances:

1. **Back-to-top button:** HTML element exists in `_layouts/default.html` (line 16), full CSS in `layout.css` with `.is-visible` class and dark mode support, but no JavaScript toggles the visible state. The button is permanently hidden at `opacity: 0; pointer-events: none`.

2. **Scroll-down indicator:** Nothing exists. The hero is `calc(100vh - var(--header-height))` — essentially full viewport — and gives users no visual hint that content exists below the fold.

## Design

### Scroll-Down Indicator

A small, animated chevron at the bottom-center of the hero section.

**Specification:**

```
┌──────────────────────────────┐
│                              │
│         HERO IMAGE           │
│                              │
│         Hero Title           │
│         Hero Intro           │
│         [CTA Button]         │
│                              │
│           ▼                  │  ← scroll cue (animated bounce)
│                              │
└──────────────────────────────┘
```

- **Icon:** Downward chevron (SVG, same pattern as existing chevrons in the codebase)
- **Size:** 24×24px visual, 44×44px touch/hit area (transparent padding)
- **Color:** `var(--primary-azure)` (matches hero text contrast)
- **Animation:** Gentle bounce — translateY oscillates 4–6px on a 2s ease-in-out loop
- **Position:** `position: absolute; bottom: var(--space-lg); left: 50%; transform: translateX(-50%)`
- **Accessibility:** `aria-hidden="true"` — visual affordance only, not interactive content
- **Auto-hide:** Disappears on first scroll (or after 10s) via IntersectionObserver or scroll event

**Implementation:** Added to `_includes/hero.html` as a conditional block. Only renders on full-size heroes (not `frame-hero` simple mode). The existing hero section uses `position: relative` implicitly through its layout context — the chevron needs a positioning parent.

### Back-to-Top Button (Fix)

The existing HTML and CSS are correct. Only JavaScript is missing.

**Current markup (correct, no changes needed):**
```html
<a href="#" class="back-to-top" aria-label="Til toppen">↑</a>
```

**Current CSS (correct, no changes needed):**
```css
.back-to-top {
    position: fixed; bottom: var(--space-lg); right: var(--space-lg);
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: var(--primary-navy); color: #fff;
    border-radius: 50%; font-size: 1.25em;
    text-decoration: none;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease; z-index: 100;
}
.back-to-top.is-visible { opacity: 0.85; pointer-events: auto; }
```

**Missing JS:** A scroll listener or IntersectionObserver that adds `.is-visible` when the user has scrolled past approximately 1 viewport height, and removes it when near the top.

### Shared JavaScript

Both affordances can share a single small script or be folded into an existing script (e.g., `animations.js` or the future `sidebar.js` from W1):

```javascript
// Pseudocode for shared scroll observer
const scrollSentinel = document.createElement('div'); // invisible sentinel at 1 viewport height
const heroElement = document.querySelector('.hero');
const scrollCue = document.querySelector('.scroll-indicator');
const backToTop = document.querySelector('.back-to-top');

// Observer 1: Hero visibility → auto-hide scroll cue
if (heroElement && scrollCue) {
  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) scrollCue.classList.add('is-hidden');
  }).observe(heroElement);
}

// Observer 2: Scroll depth → show back-to-top
new IntersectionObserver(([entry]) => {
  backToTop.classList.toggle('is-visible', !entry.isIntersecting);
}).observe(scrollSentinel);
```

This avoids scroll event listeners entirely (performance) and uses the same IntersectionObserver pattern already present in `animations.js`.

## Dependencies

- **W3 (this feature)** is independent of W1/W2 but can share JS infrastructure
- No changes to `_layouts/default.html` needed (markup already exists)
- `_includes/hero.html` needs the scroll cue SVG added
- `assets/scripts/` gets a new small file or extends an existing one

## Acceptance Criteria

- [ ] Scroll-down chevron is visible at bottom of hero on page load
- [ ] Chevron has gentle bounce animation
- [ ] Chevron disappears on first scroll (or after 10s)
- [ ] Chevron has `aria-hidden="true"`
- [ ] Back-to-top button appears after scrolling past ~1 viewport height
- [ ] Back-to-top button disappears when near the top of the page
- [ ] Clicking back-to-top smooth-scrolls to top of page
- [ ] Both elements respect dark mode (existing CSS handles this)
- [ ] Touch targets are minimum 44×44px
- [ ] No scroll listener performance overhead (IntersectionObserver only)
