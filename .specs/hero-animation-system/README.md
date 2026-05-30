# Hero Animation System

> Created: 2026-05-30
> Status: Ready
> Backlog References: 10.3, 10.4

## Problem / Goal

Hero sections across the site lack scroll-based effects. Currently they appear static after the brand entrance animation (F6). Users scrolling down a page experience no visual connection between the hero and the content below.

## Scope

- `assets/css/animations.css` — parallax-fade CSS (single file, keep animations together)
- `assets/scripts/animations.js` — dispatcher + parallax-fade handler (single controller)
- Page frontmatter — new `hero_effect` field (e.g. `hero_effect: parallax-fade`)
- Hero section HTML — add `data-hero-effect="{{ page.hero_effect }}"` attribute

## Design

### 10.3 — Framework (dispatcher)
- JS reads `data-hero-effect` from the hero section element
- Dispatches to registered effect handlers
- Extensible: new effects register via `HeroEffects.register(name, handler)`
- Runs once on page load, attaches scroll listener if needed

### 10.4 — Parallax-fade (first effect)
- As user scrolls down: hero image translates up slower than scroll (parallax)
- Hero content (title, intro) fades out with `opacity` + `translateY`
- Hero section background transitions toward navy (`#003060`) to blend with page
- Effect completes at ~300px scroll
- Respects `prefers-reduced-motion: reduce`

### Frontmatter field
```
hero_effect: parallax-fade
```
Default (absent): no effect applied.

## Acceptance Criteria

- [ ] Pages with `hero_effect: parallax-fade` exhibit parallax scroll + fade on the hero
- [ ] Pages without the frontmatter field are unaffected
- [ ] Reduced motion disables the effect
- [ ] Framework supports registering additional effects without modifying the dispatcher
