# UI Upgrade — Functional Specification

## Purpose and Scope

Upgrade the visual presentation of article pages (`/ledelse-60-2/`, `/om-oss/`, and all perspektiv articles) with:
1. Animated/interactive scroll-driven animations
2. Hero overlay treatment (title text over banner image with gradient)
3. Consistent typography and spacing
4. Polished micro-interactions on interactive elements

This is a pure visual/styling upgrade — no content changes, no structural changes, no new pages.

## Pages in Scope

| Page | Layout | Current Treatment |
|------|--------|------------------|
| `/ledelse-60-2/` | `page` | Hero image + separate content area |
| `/om-oss/` | `page` | Hero image + separate content area |
| `/tillit/` | `page` | Hero image + separate content area |
| `/usikkerhet/` | `page` | Hero image + separate content area |
| `/struktur/` | `page` | Hero image + separate content area |
| `/mennesker/` | `page` | Hero image + separate content area |
| `/påvirkning/` | `page` | Hero image + separate content area |
| `/identitet/` | `page` | Hero image + separate content area |
| `/forankring/` | `page` | Hero image + separate content area |

## Key Changes

### 1. CSS Animation Module (`animations.css`)

New module providing scroll-triggered animations via Intersection Observer.

**Classes:**
- `.animate-on-scroll` — base class that triggers animation when element enters viewport
- `.fade-in` — opacity 0 → 1, duration 0.6s
- `.fade-in-up` — opacity 0 + translateY(30px) → opacity 1 + translateY(0), duration 0.6s
- `.slide-in-left` — opacity 0 + translateX(-30px) → opacity 1 + translateX(0), duration 0.5s
- `.slide-in-right` — opacity 0 + translateX(30px) → opacity 1 + translateX(0), duration 0.5s
- `.stagger` — applies `--stagger-delay` CSS variable for sequenced animations (100ms increments)

**CSS Variables:**
```css
--stagger-delay: 0ms; /* Set per parent to stagger children */
```

**Keyframes:**
```css
@keyframes fadeInUp { ... }
@keyframes fadeIn { ... }
@keyframes slideInLeft { ... }
@keyframes slideInRight { ... }
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
    .animate-on-scroll { animation: none; transition: none; }
}
```

**JavaScript:**
- Intersection Observer in `assets/scripts/animations.js`
- Adds `.is-visible` class when element enters viewport (threshold: 0.15)
- Disconnect after first trigger (one-shot animations)

### 2. Article Hero Overlay

Changes the article hero from separate image + content sections to a single image with overlaid content.

**New Structure:**
```html
<section class="article-hero">
    <div class="article-hero-image">
        <img src="..." alt="...">
    </div>
    <div class="article-hero-overlay">
        <p class="article-breadcrumb"><a href="...">← No Excuse AS</a></p>
        <h1>Article Title</h1>
        <p class="article-intro">Introductory paragraph</p>
    </div>
</section>
```

**CSS (`article.css`):**
- `.article-hero` — relative positioning, max-width 1100px, margin auto
- `.article-hero-image` — width 100%, aspect-ratio 16/9, object-fit cover
- `.article-hero-image img` — width 100%, height auto, display block
- `.article-hero-overlay` — absolute positioning, inset 0, flex column justify-end
- Gradient background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)`
- `.article-hero-content` — padding 40px, text-align center (desktop)
- `.article-breadcrumb` — small, subtle, positioned above overlay gradient
- `h1` — color: `var(--banner-text-light)`, text-shadow for legibility
- `.article-intro` — color rgba(255,255,255,0.9), opacity 0.9

**Dark Mode:**
- `.dark-mode .article-hero-overlay` — background gradient adjusts for dark theme
- Text color remains `var(--banner-text-dark)` which is azure (#F0FFFF)

**Animation:**
- Title fades in with `fadeInUp` (0.8s ease-out)
- Intro paragraph fades in with `fadeInUp` (0.8s ease-out, 0.15s delay)

**Mobile:**
- Overlay padding reduces to 20px
- Font sizes scale down via typography.css

### 3. Typography Unification

Update `typography.css` to complete the TBD values and establish consistent scale.

**Font Scale (Desktop):**
| Element | Size | Line Height | Margin Bottom |
|---------|------|-------------|---------------|
| h1 | 3.5em | 1.15 | 0.5em |
| h2 | 2em | 1.25 | 0.5em |
| h3 | 1.4em | 1.3 | 0.5em |
| body | 1em (16px) | 1.7 | 1em |
| Small | 0.875em | 1.5 | — |

**Font Scale (Mobile ≤599px):**
| Element | Size |
|---------|------|
| h1 | 2em |
| h2 | 1.5em |
| h3 | 1.2em |
| body | 1em / 1.6 |

**Reading Width:**
- Article body text: `max-width: 65ch` (optimal for readability)
- Content sections: `max-width: 800px`

### 4. Scroll-Triggered Content Animations

**Article Sections:**
- All `.frame-section` elements get `.animate-on-scroll.fade-in-up`
- Staggered entrance for card groups within sections

**Cards Animation (`.frame-element`, `.frame-challenge`):**
- Parent `.frame-challenges` gets `--stagger-delay: 100ms`
- Each `.frame-challenge` gets `.animate-on-scroll.fade-in-up.stagger`
- Animation delay calculated via `--stagger-delay * index`

**Question List Animation (`.frame-questions`):**
- Each `li` gets `.animate-on-scroll.slide-in-left.stagger`
- `--stagger-delay: 80ms`

**Landing Page Grids:**
- `.landing-benefits-grid` parent gets `--stagger-delay: 100ms`
- Each `.benefit-card` gets `.animate-on-scroll.fade-in-up.stagger`
- Same pattern for `.landing-process-steps`, `.landing-cases-grid`

### 5. Landing Page Hero Gradient Overlay

Add a gradient overlay to landing page heroes for visual polish.

**Products.css (`.landing-hero-image`):**
```css
.landing-hero-image {
    position: relative;
}
.landing-hero-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 70%, var(--background-color-light) 100%);
    pointer-events: none;
}
```

**About.css (`.about-hero-image`):**
Same treatment for `/om-oss/` hero.

**Dark mode:** Gradient adjusts to use dark background variable.

### 6. Button and Card Micro-Interactions

**Button Hover:**
```css
.product-cta, .about-cta-button, .frame-cta .product-cta {
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}
.product-cta:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-light);
    opacity: 0.9;
}
```

**Card Hover:**
```css
.benefit-card, .case-card, .process-step {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.dark-mode .benefit-card:hover {
    box-shadow: var(--box-shadow-dark);
}
```

## File Changes

| File | Action | Purpose |
|------|--------|---------|
| `assets/css/animations.css` | **Create** | Animation keyframes, classes, Intersection Observer JS |
| `assets/css/article.css` | **Update** | Hero overlay styles, animation classes |
| `assets/css/typography.css` | **Update** | Complete font scale, reading width |
| `assets/css/products.css` | **Update** | Hero gradient overlay, hover interactions |
| `assets/css/about.css` | **Update** | Hero gradient overlay |
| `assets/css/styles-dark.css` | **Update** | Dark mode for overlay elements |
| `assets/scripts/animations.js` | **Create** | Scroll animation controller |
| `_includes/scripts.html` | **Update** | Include animations.js |

## CSS Architecture Compliance

Per `.opencode/rules/css/rules.md`:
- All colors use CSS custom properties (no hardcoded values)
- Dark mode variants for all new components
- Mobile-first responsive approach
- Minimum touch target: 44px

## Dependencies

- No external libraries (vanilla JS)
- No changes to frontmatter schemas
- No changes to JSON-LD
- No new images required (uses existing banners)
- No changes to content (HTML structure changes are visual only)

## Testing Checklist

- [ ] Scroll animations trigger correctly on all article pages
- [ ] Hero overlay renders correctly with banner images
- [ ] Typography scale consistent across all pages
- [ ] Dark mode renders correctly (all new components)
- [ ] Reduced motion: animations disabled via media query
- [ ] All interactive elements hover states work
- [ ] Mobile breakpoints render correctly
- [ ] No color contrast violations (WCAG AA)
- [ ] No regressions in existing pages not in scope