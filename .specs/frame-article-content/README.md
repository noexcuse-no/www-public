# N4–N7 — Frame Perspective Article Pages

## Purpose

Build the four frame perspective article pages — `/identitet/`, `/struktur/`, `/mennesker/`, `/påvirkning/`. These pages currently render a hero banner and nothing below (frontmatter only, 108–118 bytes each).

All necessary structured content already exists in `_frames/<frame_id>.md` (intro, elements, challenges, questions, about, cta). All hero banners exist. Section-level images exist but are unused.

This spec covers: (a) wiring `_frames/` data into the pages via `_layouts/perspektiv.html`, (b) generating 16 floating spot illustrations for key argument paragraphs, (c) CSS for the float pattern, and (d) mobile responsiveness.

---

## Spot Illustration Pattern

Small square graphics (~200×200px) placed next to key argument paragraphs, floating left or right, alternating for visual rhythm. Each spot illustration builds visual DNA from the existing `illustrasjon-{frame}-hovedelementer.webp` section image — same per-frame color palette, same abstract geometric language — but focused on one specific element/concept.

### Placement per page

```
[Hero: perspektiv-{frame}.webp]                       ← exists

[Intro text]                                            ← from _frames/{frame}.intro

  ⊞ Spot 1 (float left, element 1 concept)
[Element 1 heading + body + signs]                      ← elements[0]

  ⊞ Spot 2 (float right, element 2 concept)
[Element 2 heading + body + signs]                      ← elements[1]

  ⊞ Spot 3 (float left, element 3 concept)
[Element 3 heading + body + signs]                      ← elements[2]

  ⊞ Spot 4 (float right, leader_value concept)
[Leader value heading + body]                           ← leader_value

[Challenges list]
[About section]
[Questions list]

  [Existing CTA section image — full-width]
[CTA: heading + body + booking link]                    ← cta
```

### CSS

```css
.argument-illustration {
    width: 200px;
    height: 200px;
    border-radius: var(--radius-lg);
    margin: 0.5em 1em 0.5em 0;
    float: left;
    object-fit: cover;
}

.argument-illustration--right {
    float: right;
    margin: 0.5em 0 0.5em 1em;
}

@media (max-width: 599px) {
    .argument-illustration {
        float: none;
        width: 100%;
        aspect-ratio: 1;
        margin: var(--space-lg) 0;
    }
}
```

### Mobile

On ≤599px, images collapse to full-width 1:1, stacked between text sections. No float. Reading flow becomes: text → image → text → image.

---

## Spot Illustration Inventory (16 images total)

Each frame gets 4 spot illustrations, one per element/argument section.

| BL ID | Frame | Metaphor | Color | Spot 1 | Spot 2 | Spot 3 | Spot 4 |
|-------|-------|----------|-------|--------|--------|--------|--------|
| N5 | Struktur | Office is a Factory | Navy (#2A4D6E) | Roller og ansvar | Mål og koordinering | Prosesser og regler | Hvorfor struktur betyr noe |
| N6 | Mennesker | Office is a Family | Golden yellow (#D4A836) | Tilhørighet | Mestring | Autonomi | Hvorfor mennesker betyr noe |
| N7 | Påvirkning | Office is a Jungle | Hunter green (#355E3B) | Makt | Nettverk | Interesser | Hvorfor påvirkning betyr noe |
| N4 | Identitet | Office is a Theater | Deep wine (#8E0D3C) | Verdier | Ritualer | Fortelling | Lederverdi |

### Style reference

All spot illustrations follow **Style 3: Section Illustrations** from `.design/graphics.md`:

```
Clean minimal infographic showing [concept], Scandinavian design style,
[frame color] and white color palette, modern corporate illustration,
square format, no text
```

### File naming

```
assets/images/banners/spot-{frame}-{concept}.webp
```

Examples: `spot-struktur-roller.webp`, `spot-identitet-verdier.webp`

### Prompting rules

- All 4 spots for a given frame share the same color palette and visual language
- Each spot focuses on ONE concept (not the entire frame)
- Square format (1:1), not 16:9
- "no text" in every prompt
- Norwegian forbudt i prompts (English-only for GPT Image 2)
- Log all prompts in `.design/graphics.md` under Style 3

---

## Content Source

Article body text is **not** written as original prose. It is rendered from `_frames/<frame_id>.md` structured data via a rewritten `_layouts/perspektiv.html`.

### Field mapping

| Source field | Renders as |
|-------------|-----------|
| `intro.heading` + `intro.body` | First section after hero |
| `elements[0..2].title` + `.body` + `.signs` | Element sections with spot illustration |
| `leader_value.heading` + `.body` | Leader value section with spot illustration |
| `challenges[0..3].title` + `.body` | Challenge list (no spots) |
| `about.heading` + `.body` + `.link` | Academic grounding section |
| `questions[]` | Diagnostic question list |
| `cta.heading` + `.body` + `booking_url` + CTA illustration | Bottom CTA |

### Existing section images (retained)

Each frame already has 3 section images:

```
illustrasjon-{frame}-hovedelementer.webp   → section break for elements
illustrasjon-{frame}-utfordringer.webp     → section break for challenges
illustrasjon-{frame}-cta.webp              → CTA section
```

These remain as full-width section break images (`.section-illustration` pattern). The new spot illustrations are complementary — smaller, floating, paragraph-level.

---

## Implementation Plan by File

| File | Change |
|------|--------|
| `_layouts/perspektiv.html` | Rewrite to read `frame_id` from page frontmatter and render `_frames/<frame_id>.md` data. Insert spot illustrations at element and leader_value positions. Include existing section images. |
| `_pages/ledelse_{frame}.md` | Minimal — keep `layout: perspektiv` + `frame_id`. Body comes from layout. |
| `assets/css/perspektiv-styles.css` | Add `.argument-illustration` + `--right` variant + mobile reset. |
| `_frames/*.md` | No changes needed. |
| `assets/images/banners/spot-*.webp` | 16 new files from GPT Image 2. |
| `.design/graphics.md` | Log all 16 prompts under Style 3. |

### Pages unaffected
- `/tillit/`, `/usikkerhet/`, `/forankring/`, `/generativ-ki/` — use `layout: page`, not `layout: perspektiv`
- `/metode/` — `_frames/` data unchanged, card grid unaffected

---

## Acceptance Criteria

### Content (all 4 pages)
- [ ] `/struktur/` renders elements, leader_value, challenges, about, questions, CTA from `_frames/struktur.md`
- [ ] `/mennesker/` renders from `_frames/mennesker.md`
- [ ] `/identitet/` renders from `_frames/identitet.md`
- [ ] `/pavirkning/` renders from `_frames/påvirkning.md`
- [ ] Each page shows 4 spot illustrations at correct paragraph positions
- [ ] Each page shows existing hovedelementer, utfordringer, and cta section images
- [ ] All text in Norwegian Bokmål with correct brand voice

### Spot illustrations (16 images)
- [ ] 16 new files in `assets/images/banners/spot-{frame}-{concept}.webp`
- [ ] Every prompt documented in `.design/graphics.md`
- [ ] Each uses correct per-frame color palette
- [ ] Square format (1:1), no text, abstract geometric style
- [ ] Visual DNA matches existing `illustrasjon-{frame}-hovedelementer.webp`

### CSS
- [ ] `.argument-illustration` floats left
- [ ] `.argument-illustration--right` floats right
- [ ] Alternating pattern: elements[0] left, elements[1] right, elements[2] left, leader_value right
- [ ] ≤599px: float none, width 100%, 1:1, margin var(--space-lg) 0

### Build
- [ ] `bundle exec jekyll build` exits 0
- [ ] Existing pages (`/tillit/`, `/usikkerhet/`, `/forankring/`, `/generativ-ki/`) unaffected
- [ ] `/metode/` frame card grid unaffected

---

## Implementation Order

| Step | ID | Scope |
|------|----|-------|
| 1 | N5 | Struktur: layout wiring + 4 spot illustrations + CSS |
| 2 | N6 | Mennesker: layout wiring + 4 spot illustrations |
| 3 | N7 | Påvirkning: layout wiring + 4 spot illustrations |
| 4 | N4 | Identitet: layout wiring + 4 spot illustrations |

All four are independent. Order follows Bolman & Deal: Struktur, Mennesker, Politisk/Påvirkning, Symbolsk/Identitet.

---

## Dependencies

- **A1** (architecture cleanup) — recommended prerequisite. If `_frames/` is migrated to `_topics/` under A1, the layout lookup changes from `site.frames` to `site.topics where category == "frame"`.
- N4–N7 are independent of each other.
