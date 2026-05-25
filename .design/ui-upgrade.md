# UI Upgrade — Visual Design Specification

## Overview

Visual design upgrade for No Excuse AS article pages. This document describes the visual design aspects: spacing, motion curves, color usage, and exact visual states. For implementation details, see `.specs/ui-upgrade/README.md`.

---

## 1. Animation Design

### Motion Philosophy

Animations are **purposeful and restrained** — they guide attention and communicate state, never distract. They reinforce the Scandinavian minimal brand: clean, functional, no excess.

### Animation Types

| Animation | Trigger | Duration | Easing | Use Case |
|-----------|---------|----------|--------|----------|
| `fadeIn` | viewport entry | 600ms | ease-out | Section containers |
| `fadeInUp` | viewport entry | 600ms | ease-out | Cards, content blocks |
| `slideInLeft` | viewport entry | 500ms | ease-out | Question list items |
| `slideInRight` | viewport entry | 500ms | ease-out | (reserved) |
| Micro-interaction | hover | 200ms | ease | Buttons, links |
| Card lift | hover | 300ms | ease | Benefit cards, case cards |

### Intersection Observer Configuration

```javascript
{
    threshold: 0.15,      // 15% of element visible
    rootMargin: '0px 0px -50px 0px'  // trigger slightly before bottom
}
```

**One-shot behavior:** Animations trigger once and stay in final state. No looping, no repeating.

### Keyframe Definitions

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### Stagger Pattern

Children animate sequentially with CSS variable `--stagger-delay`:
```css
.parent {
    --stagger-delay: 100ms;
}
.child:nth-child(1) { transition-delay: calc(var(--stagger-delay) * 0); }
.child:nth-child(2) { transition-delay: calc(var(--stagger-delay) * 1); }
.child:nth-child(3) { transition-delay: calc(var(--stagger-delay) * 2); }
/* etc. */
```

**Stagger values:**
| Element | `--stagger-delay` |
|---------|-------------------|
| `.frame-challenges` (2-col grid) | 100ms |
| `.frame-questions` (list items) | 80ms |
| `.landing-benefits-grid` | 100ms |
| `.landing-process-steps` | 100ms |
| `.landing-cases-grid` | 100ms |

### Reduced Motion

For users with `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
    .animate-on-scroll {
        animation: none !important;
        transition: none !important;
    }
    .animate-on-scroll.is-visible {
        opacity: 1;
        transform: none;
    }
}
```

---

## 2. Hero Overlay Design

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│                   [IMAGE]                      │
│  ┌─────────────────────────────────────────┐   │
│  │ ← No Excuse AS (breadcrumb)            │   │
│  │                                         │   │
│  │         ARTICLE TITLE                   │   │
│  │                                         │   │
│  │    Introductory paragraph text...        │   │
│  └─────────────────────────────────────────┘   │
│░░░░░░░░░░░░░░░░░░GRADIENT░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────┘
```
░░░░░░ = gradient overlay (dark at bottom, transparent at top)

### Gradient Specifications

**Light mode gradient:**
```css
background: linear-gradient(
    to top,                    /* direction: bottom to top */
    rgba(0, 0, 0, 0.70) 0%,    /* opaque black at bottom */
    rgba(0, 0, 0, 0.50) 40%,   /* semi-transparent */
    transparent 70%            /* fade to transparent */
);
```

**Dark mode gradient:**
```css
background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.80) 0%,   /* more opaque for dark images */
    rgba(0, 0, 0, 0.60) 40%,
    transparent 70%
);
```

### Typography in Overlay

**Desktop (≥600px):**
| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Breadcrumb | Roboto | 0.9em | 400 | `rgba(255,255,255,0.8)` |
| h1 (title) | Roboto | 3.5em | 700 | `#F0FFFF` |
| h1 text-shadow | — | — | — | `0 2px 8px rgba(0,0,0,0.5)` |
| .intro | Roboto | 1.15em | 400 | `rgba(255,255,255,0.9)` |

**Mobile (<600px):**
| Element | Size |
|---------|------|
| Breadcrumb | 0.85em |
| h1 | 2em |
| intro | 1em |

### Spacing

| Property | Desktop | Mobile |
|----------|---------|--------|
| Overlay padding | 40px | 20px |
| Overlay bottom margin (from image edge) | 0 | 0 |
| Title margin-bottom | 20px | 16px |
| Intro max-width | 700px | 100% |
| Section max-width | 1100px | 100% |

### Animation Sequence (Hero Load)

| Time | Action |
|------|--------|
| 0ms | Page loads, image visible |
| 0ms | Title begins fadeInUp (0.8s duration) |
| 150ms | Intro begins fadeInUp (0.8s duration, 150ms delay) |
| 200ms | Breadcrumb fades in |

---

## 3. Typography System

### Font Stack

```css
font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale

**Desktop:**
```
h1:  3.5em  / 1.15 / #37474F (light) or #FFFFFF (dark)
h2:  2em    / 1.25 / same colors
h3:  1.4em  / 1.3  / same colors
body: 1em   / 1.7  / #37474F (light) or #FFFFFF (dark)
```

**Mobile (≤599px):**
```
h1:  2em    / 1.15
h2:  1.5em  / 1.25
h3:  1.2em  / 1.3
body: 1em   / 1.6
```

### Content Width

- Article body text: `max-width: 65ch` (optimal ~65 characters per line)
- Content sections: `max-width: 800px`
- Hero overlay title: unspecificed width (full-width centered)

### Heading Rules

- `margin: 0` on all headings (no margin)
- `margin-bottom: 0.5em` (consistent spacing below)
- `font-weight: 700` for h1, `600` for h2/h3

---

## 4. Button Styles

### Primary CTA (`.product-cta`)

| State | Background | Color | Transform | Box-shadow |
|-------|------------|-------|-----------|------------|
| Default | `--primary-accent` | `--primary-accent-contrast` | none | none |
| Hover | `--primary-accent` | `--primary-accent-contrast` | translateY(-2px) | `var(--box-shadow-light)` |
| Active | `--primary-accent` | `--primary-accent-contrast` | translateY(0) | subtle |
| Focus | `--primary-accent` | `--primary-accent-contrast` | none | outline |

**Transition:** `transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease`

**Dark mode hover:** `box-shadow: var(--box-shadow-dark)`

### Secondary CTA (`.product-cta--secondary`)

| State | Background | Color | Border |
|-------|------------|-------|--------|
| Default | transparent | `--primary-accent` | 2px solid `--primary-accent` |
| Hover | `--primary-accent` | `--primary-accent-contrast` | 2px solid `--primary-accent` |
| Active | `--primary-accent` | `--primary-accent-contrast` | same |

---

## 5. Card Hover Interactions

### Benefit Card (`.benefit-card`)

| State | Transform | Box-shadow |
|-------|-----------|------------|
| Default | none | `var(--box-shadow-light)` |
| Hover | translateY(-4px) | `0 8px 24px rgba(0,0,0,0.12)` |
| Focus | translateY(-4px) | `0 8px 24px rgba(0,0,0,0.12)` |

**Dark mode:** Box-shadow uses `var(--box-shadow-dark)` on hover.

**Transition:** `transform 0.3s ease, box-shadow 0.3s ease`

### Case Card (`.case-card`)

Same treatment as benefit card.

### Process Step (`.process-step`)

| State | Transform | Box-shadow |
|-------|-----------|------------|
| Default | none | `var(--box-shadow-light)` |
| Hover | translateY(-4px) | `0 8px 24px rgba(0,0,0,0.12)` |

**Dark mode:** Box-shadow uses `var(--box-shadow-dark)` on hover.

---

## 6. Section Animations

### Article Section Entrance (`.frame-section`)

Each section animates in with `fade-in-up`. No stagger (single element).

### Challenge Grid (`.frame-challenges`)

Parent has `--stagger-delay: 100ms`. Each `.frame-challenge` child gets sequential delay.

### Question List (`.frame-questions`)

Parent has `--stagger-delay: 80ms`. Each `li` gets `.slide-in-left` with sequential delay.

### Landing Grid (`.landing-benefits-grid`, etc.)

Parent has `--stagger-delay: 100ms`. Each card gets sequential delay.

---

## 7. Color Usage Summary

### Animation-Specific Colors

| Element | CSS Variable | Hex |
|---------|-------------|-----|
| Link arrow (questions) | `--primary-accent` | `#F0FFFF` |

### Gradient Overlay Colors

| Element | Light Mode | Dark Mode |
|---------|-----------|----------|
| Overlay start | `rgba(0,0,0,0.70)` | `rgba(0,0,0,0.80)` |
| Overlay mid | `rgba(0,0,0,0.50)` | `rgba(0,0,0,0.60)` |
| Title text | `#F0FFFF` | `#F0FFFF` |
| Intro text | `rgba(255,255,255,0.9)` | `rgba(255,255,255,0.9)` |
| Breadcrumb | `rgba(255,255,255,0.8)` | `rgba(255,255,255,0.8)` |

---

## 8. Dark Mode Visual States

All new components follow the dual-theme pattern. Dark mode variants:

```css
/* Cards in dark mode */
.dark-mode .benefit-card,
.dark-mode .case-card,
.dark-mode .process-step {
    background-color: var(--box-background-dark);
    box-shadow: var(--box-shadow-dark);
}
.dark-mode .benefit-card:hover,
.dark-mode .case-card:hover,
.dark-mode .process-step:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

/* Hero overlay in dark mode */
.dark-mode .article-hero-overlay {
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.80) 0%,
        rgba(0, 0, 0, 0.60) 40%,
        transparent 70%
    );
}

/* Frame elements in dark mode */
.dark-mode .frame-element,
.dark-mode .frame-challenge,
.dark-mode .frame-cta {
    background: var(--box-background-dark);
}
```

---

## 9. Accessibility

### Focus States

All interactive elements have visible focus indicators:
```css
.product-cta:focus,
.benefit-card:focus {
    outline: 2px solid var(--primary-accent);
    outline-offset: 2px;
}
```

### Color Contrast

- All text on gradient overlay: minimum 4.5:1 contrast ratio (white on dark gradient)
- Azure (#F0FFFF) on dark backgrounds: passes WCAG AA for large text (18.5px+)
- Link hover colors: use `--link-hover-light/dark` variables

### Motion Safety

`prefers-reduced-motion: reduce` media query disables all animations.

### Screen Reader Considerations

- `.is-visible` class added via JS; does not affect screen readers
- Animations are purely visual (no information conveyed only via animation)
- Hero images: `alt` text already present; overlay does not add semantic content

---

## 10. Component States Matrix

| Component | Default | Hover | Focus | Dark Mode |
|-----------|---------|-------|-------|-----------|
| Hero Overlay | gradient 70% | n/a | n/a | gradient 80% |
| Title (h1) | text-shadow | n/a | n/a | same |
| Benefit Card | shadow-light | lift-4px | lift-4px | shadow-dark + hover dark |
| Case Card | shadow-light | lift-4px | lift-4px | shadow-dark + hover dark |
| Process Step | shadow-light | lift-4px | lift-4px | shadow-dark + hover dark |
| Primary CTA | azure bg | lift-2px | outline | same + hover dark |
| Secondary CTA | transparent | filled | outline | same |

---

## 11. File Structure

```
assets/
├── css/
│   ├── animations.css        (new)
│   ├── article.css          (update: hero overlay)
│   ├── typography.css       (update: complete scale)
│   ├── products.css        (update: hero gradient, hover)
│   ├── about.css           (update: hero gradient)
│   ├── styles-dark.css     (update: dark variants)
│   └── ...
└── scripts/
    └── animations.js        (new)
```

---

## 12. Breakpoints

| Breakpoint | Range | Key Changes |
|------------|-------|-------------|
| Mobile | ≤599px | h1 2em, overlay padding 20px, single column grids |
| Tablet | 600-1023px | h1 3em, overlay padding 30px |
| Desktop | ≥1024px | full scale, 40px overlay padding |

---

## 13. Animation Performance

- Use `transform` and `opacity` only (GPU-accelerated)
- No layout-triggering properties (width, height, margin, padding)
- `will-change: transform, opacity` on `.animate-on-scroll` elements
- Intersection Observer for efficient scroll detection
- One-shot animations (no `animation-iteration-count` looping)