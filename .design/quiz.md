# Quiz — "Hvilket perspektiv leder du fra?"

> Design document for the Bolman & Deal four-frame quiz.
> Created: 2026-06-13

## Purpose

A light-hearted, entertaining 10-question quiz that gives visitors an indication of their dominant leadership perspective (one of Bolman & Deal's four frames). Designed to be shareable, fun, and a gateway into the deeper content on the site.

## UX Flow

```
[Start-knapp] → [Modal: Spørsmål 1] → [Spørsmål 2] → ... → [Spørsmål 10] → [Resultat vises]
```

### Step-by-step

1. **Entrance**: User clicks a "TA TESTEN" / "Hvilket perspektiv leder du fra?" CTA somewhere on the page
2. **Modal opens**: First question shown with illustration, progress bar at top (1/10)
3. **Answer selection**: User selects one of ~6-8 answer options per question
4. **Next question**: Immediately after selection, next question slides in (no "next" button — selection IS the action)
5. **Progress bar**: Updates after each answer. Shows fraction complete.
6. **Result screen**: After 10th answer, modal transitions to result view with infographic
7. **Share**: Social sharing buttons below result

## Visual Design

### Modal
- Full-screen overlay on mobile, centered large modal on desktop (max-width: 680px)
- Dark overlay background (`--overlay-light: rgba(0,0,0,0.6)`)
- White card with `--radius-xl` (16px) corners
- Close button (X) in top-right corner — closes quiz and returns to page

### Progress Bar
- Thin bar at top of modal card
- Light gray track (`--border-color-light`) with navy fill (`--primary-navy`)
- Animates smoothly between steps (0.3s ease width transition)
- Label: "Spørsmål 3 av 10" centered above or beside the bar

### Question Screen
- **Illustration**: Large (240×240px or 160px tall) centered above the question. Entertaining/whimsical spot illustration related to the question scenario.
- **Question text**: Bold, 1.25em, centered, max-width: 90%. Direct language, conversational tone. E.g. "Du skal presentere et forslag for ledergruppa. Hva gjør du?"
- **Answer options**: Vertical stack of button-like cards. Each card has:
  - Radio circle indicator on the left
  - Answer text
  - Hover: subtle background shift
  - Selected: navy border + checkmark
  - Min 44px height for touch targets

### Result Screen
- **Confetti/celebration**: Subtle animated particles or confetti on result reveal (optional, respect `prefers-reduced-motion`)
- **Perspective name**: Large heading with the winning perspective: "Du leder fra **strukturperspektivet**"
- **Perspective icon/illustration**: A dedicated result illustration for each of the 4 frames
- **Score breakdown**: Visual bar chart showing all 4 frames' scores (not just the winner) — horizontal bars with labels
- **Description**: 2-3 sentences describing what this perspective means, with a link to the relevant article
- **Share section**: "Inviter noen andre til å ta testen" with LinkedIn, Teams, and copy-link buttons

### Color Coding Per Perspective

Each frame gets an accent color for the result screen:

| Perspective | Accent Color | Usage |
|------------|-------------|-------|
| Struktur | `--primary-navy` #003060 | Dark blue |
| Mennesker | #2E7D32 | Green |
| Identitet | #E65100 | Orange/amber |
| Påvirkning | #C62828 | Red |

These are result-screen-only colors — not added to the global palette.

## Illustrations

### Question illustrations (10 total for the quiz pool)
- Style: Simple, whimsical line-art or flat vector illustrations in the existing site illustration style (Scandinavian minimal, clean)
- Format: 240×240px WebP, ≤40KB each
- Content: Situational scenes (meeting room, coffee machine, office hallway, etc.) with a humorous or relatable twist
- Naming convention: `quiz-q-{id}.webp` stored in `assets/images/quiz/`

### Result illustrations (4 total)
- One per perspective, showing a symbolic representation of that frame
- Format: 320×240px WebP (OG-friendly aspect ratio), ≤50KB each
- Naming: `quiz-resultat-{struktur|mennesker|identitet|pavirkning}.webp`

### Social share image (1 shared or 4 per result)
- Format: 1200×630px (OG standard), ≤100KB
- Shows perspective name + tagline + No Excuse logo
- Either one per perspective or a dynamic template

## Responsive Behavior

| Breakpoint | Modal size | Layout |
|-----------|-----------|--------|
| < 600px | Full-screen, edge-to-edge | Illustration shrinks to 160×160px, answers stack full-width |
| 600-1024px | Max 680px centered | Standard layout |
| > 1024px | Max 680px centered | Standard layout, no change |

## Animation Patterns

| Transition | Duration | Easing | Notes |
|-----------|----------|--------|-------|
| Question slide-in | 0.3s | ease-out | Current question slides left, new slides in from right |
| Progress bar fill | 0.3s | ease-out | Width animates |
| Result reveal | 0.5s | ease-out | Scale-in with fade |
| Option hover | 0.15s | ease | Background color shift |
| Option select | 0.2s | ease | Border color + subtle scale |

All animations respect `prefers-reduced-motion: reduce` — use `transition: none` / `animation: none` when detected.

## Desktop vs Mobile Quiz CTA

### Placement options (decide during spec review)

The quiz entrance button should be present on:
- **Homepage** — as a hero-area CTA or dedicated section between benefits and profiles
- **Individual frame pages** — as a sidebar card or inline CTA in the article body
- **Perspektiv article** — contextually relevant, as a CTA in the sidebar

The button should be distinct but not competing with the primary product CTA.

## Accessibility

- Full keyboard navigation: Tab through answers, Enter/Space to select, Escape to close modal
- Screen readers: `aria-live="polite"` on question area, `role="progressbar"` on progress bar
- Focus trap within modal when open
- Focus returns to trigger button on modal close
- Results section: proper heading hierarchy (h2 for perspective name)
- Share buttons: `aria-label`, `rel="noopener noreferrer"`
- No auto-play, no flashing content, no time pressure

## Technical Notes

- No external dependencies — vanilla JS, CSS, HTML
- Questions stored as JS data structure (array of objects) — easy to edit
- Answer selections stored in sessionStorage so result survives accidental refresh
- Social sharing: Use existing `.share-btn` patterns from `_includes/share-section.html`
- OG image for result is pre-generated — one per perspective (4 total)
