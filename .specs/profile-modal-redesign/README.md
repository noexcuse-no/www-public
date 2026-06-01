# Profile Modal Redesign — Fix Specification

> Created: 2026-06-01
> Status: Draft

## Problem / Goal

Profile cards (`_includes/profiles.html`) currently use a simple overlay pattern when expanded — a full-screen fixed overlay with backdrop blur. The transition from compact view (click "Les mer") to expanded modal is abrupt: the overlay fades in with no animation, the modal content appears immediately, and the overall visual treatment feels generic rather than on-brand. The card layout itself is sparse and lacks the visual polish expected from the No Excuse brand.

Goal: Redesign the compact → expanded profile card flow with smooth animations, on-brand styling, and a layout hierarchy that makes profile information scannable at a glance.

---

## Scope

### Files to modify

| File | Change |
|------|--------|
| `_includes/profiles.html` | Restructure compact card layout, add animation hooks, refine expanded modal content hierarchy |
| `assets/css/profiles.css` | Redesign compact card, expanded modal, and transition animation styles |
| `assets/css/animations.css` | Add modal transition keyframes (scale + opacity entrance, slide-up overlay) |
| `assets/css/colors.css` | Add any new CSS variables needed for modal surfaces |

### Files unchanged

- `_profiles/*.md` — frontmatter schema stays the same
- `_layouts/` — no layout changes
- Other CSS modules — no cross-module impact
- Other includes — profiles are included via `{% include profiles.html %}` in `om_oss.md` and `_layouts/home.html`; the include API (optional `tags` filter) stays the same

---

## Design Constraints

- **Touch targets**: minimum 44×44px for all interactive elements (close button, expand trigger, contact links)
- **Dark mode**: all colors via CSS variables from `colors.css`; test both themes
- **Animation**: respect `prefers-reduced-motion` — no transform/opacity animations when reduced motion is preferred
- **Keyboard accessibility**: modal must trap focus when open, close on Escape key
- **Body scroll**: prevent background scroll when modal is open (currently uses `document.body.style.overflow = 'hidden'` — preserve this behavior)
- **Brand voice**: Norwegian Bokmål, no consultant-speak
- **CSS architecture**: use existing variable patterns from `colors.css`; variables for new surfaces must follow `--*-light` / `--*-dark` convention

---

## Proposed Design Direction

### Compact card (before expansion)

- Avatar image larger and more prominent (≥120×120px, circular)
- Name, phone, and email visible at a glance
- Tags shown as inline chips below contact info
- "Les mer" trigger styled as a subtle CTA button (not an underlined link)
- Subtle hover state: slight lift (`translateY(-2px)`) + shadow depth increase
- Card border or accent strip at top in brand accent color

### Expanded modal (after click)

- Slides up from bottom on mobile (bottom sheet style), centered overlay on desktop
- Scale + fade entrance animation (0.95→1, 0→1 opacity) over ~300ms
- Header section with large avatar, name, title/tags, and close button
- Bio in readable type (1.05em, comfortable line-height)
- Contact grid with phone/email/LinkedIn as visually distinct pill buttons
- Booking CTA as primary accent button
- Optional details section (from `{{ profile.content }}`) collapsed by default if long
- Close on overlay click + Escape key (as currently implemented)

### Animation details

1. **Overlay background**: fade in (0→0.6 opacity) over 200ms
2. **Modal content**: scale up (0.95→1) + fade in (0→1) over 300ms, with slight `ease-out` curve
3. **On close**: reverse — fade overlay + scale down modal over 200ms before removing from DOM/display
4. **Reduced motion**: skip all transform/opacity transitions and use `display: flex` immediately

---

## Acceptance Criteria

### Layout & visual
- [ ] Compact card shows avatar, name, phone, email, tags — all within one card without overflow
- [ ] Expanded modal has clear visual hierarchy: header → bio → contact → booking CTA → details
- [ ] Modal animation is smooth on mobile and desktop (no jank, no layout shift)
- [ ] Dark mode tested — both compact and expanded states look correct
- [ ] Mobile layout tested — modal opens as bottom sheet on ≤599px width
- [ ] Compact cards in a grid do not shift or jump when one is expanded

### Interaction
- [ ] Clicking "Les mer" opens modal with animation
- [ ] Clicking overlay background closes modal
- [ ] Clicking close button closes modal
- [ ] Escape key closes modal
- [ ] Body scroll is prevented when modal is open, restored on close
- [ ] Focus is trapped inside modal when open (Tab cycles within modal)
- [ ] Touch targets ≥44×44px on all interactive elements

### Animations
- [ ] Overlay fades in over ~200ms
- [ ] Modal content scales + fades in over ~300ms with ease-out curve
- [ ] Close animation reverses entrance over ~200ms
- [ ] `prefers-reduced-motion` disables all animations — modal appears/disappears instantly
- [ ] Responsive: animation works at all viewport widths

### Code quality
- [ ] `git diff` shows no changes outside specified files
- [ ] No inline styles — all styling via CSS classes and CSS variables
- [ ] No `as any`, `@ts-ignore`, or type suppressions
- [ ] All new CSS variables follow `--*-light` / `--*-dark` naming

---

## Backlog References

| ID | Title | Status |
|----|-------|--------|
| R3 | Profile card modal redesign — on-brand compact → expanded flow | Planned |

---

## Dependencies

- None — this is a self-contained redesign of `_includes/profiles.html` and `assets/css/profiles.css`
- No dependency on A1 (architecture cleanup) or any other BL item
