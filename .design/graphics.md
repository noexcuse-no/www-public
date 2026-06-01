# Graphics Design Rules — No Excuse AS

## Brand Aesthetic

**Scandinavian minimal / Nordic** — clean lines, generous whitespace, restrained color palette. Think IKEA meets Kinfolk magazine with Apple.com's confident minimalism.

**Democratic design** — accessible to everyone, clear and open, no elitism. The minimalism serves *clarity and function*, not just aesthetics. If a visual choice makes something harder to understand, it's wrong regardless of how good it looks.

**Core principles:**
- Abstract over literal
- Structural over decorative
- Monochromatic with single accent (azure)
- No text in any image (multilingual site)
- Premium, not pretentious — confidence through restraint

**Visual reference:** Apple.com (see `brand-perception.md` for details). Borrow the confidence in whitespace and typography-driven hierarchy, not the layout or interaction patterns.

## Color Palette for Generated Images

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary-accent` | `azure` (#F0FFFF) | Accent elements |
| Background light | `#e2e8f0` | Canvas backgrounds |
| Background dark | `#121212` | Dark mode canvases |
| Text/muted | `#37474f` / `#ffffff` | Abstract shapes |

## Image Types & Style Guidelines

## Illustration Tier System

All pages use a **uniform 4-tier taxonomy** for inline images. This applies to articles, frames, benefits, products, steps, and future page types.

| Tier | Size | Purpose | Style | File Size Target |
|------|------|---------|-------|-----------------|
| **T1** | 3840×2160 (4K) | Hero banners, page entry | Style 1 or 2 (atmospheric) | ≤500KB |
| **T2** | ~800px wide | Framework overviews, multi-element models | Style 3 (infographic, relational) | ≤150KB |
| **T3** | ~400px wide | Section spots, individual elements | Style 3 (single concept) | ≤80KB |
| **T4** | ~80px square | Challenge cards, list items, micro concepts | Style 3 iconic variant | ≤30KB |

**Naming convention:** `{page-id}-{tier}-{concept}.webp`

Example: `tillit-t2-four-pillars.webp`, `usikkerhet-t4-silo-thinking.webp`

**File placement:** All images in `assets/images/banners/`

See `.specs/illustration-system/README.md` for per-page inventory and CSS treatment.

---

## Image Types & Style Guidelines

There are **4 distinct illustration styles** in the No Excuse image library. Each has a specific template and use case.

---

### Style 1: Hero Illustrations (Landscape)

**Use for:** Hero banners on landing pages, page tops

**Style signature:**
- "minimalist Nordic style" (explicit style anchor)
- Abstract human silhouettes
- Clean white/light gray background
- Azure (#F0FFFF) accent

**Prompt template:**
```
Three abstract human silhouettes seen from behind [setting],
bright white/light gray background, cool Nordic color palette with
azure (#F0FFFF) accent in the light, minimalist Nordic style,
16:9 aspect ratio, high resolution 4K, no text, no faces visible
```

**Documented prompts:**

| File | Prompt |
|------|--------|
| `hero-illustration.png` | "A professional hero illustration for a Norwegian management consulting company. Scandinavian minimal style, clean white background, subtle azure/blue accent color. An abstract representation of leadership maturity — a compass or map guiding a team upward. Simple shapes, clean lines, professional. No text. Suitable for a landing page hero section." |
| `banner-om-oss.png` | "Three abstract human silhouettes seen from behind standing in a forest, looking toward a distant horizon, bright white/light gray background, cool Nordic color palette with azure (#F0FFFF) accent in the light, minimalist Nordic style, 16:9 aspect ratio, no text, no faces visible" |
| `science-foundation.png` | "Three abstract human silhouettes seen from behind in a forest, one figure kneeling and tending to a young slender tree with four distinct branches, the other two figures standing and observing, bright white/light gray background, cool Nordic color palette with azure (#F0FFFF) accent in the light, minimalist Nordic style, 16:9 aspect ratio, no text, no faces visible" |

---

### Style 2: Professional Abstract (Landscape)

**Use for:** Benefit banners, frame hero banners, process step illustrations

**Style signature:**
- "clean minimal Scandinavian style" (explicit style anchor)
- Geometric shapes
- "simple shapes, clean lines"
- Frame color + neutral tones
- "symbolic imagery only" / "abstract representation"
- 16:9 horizontal format

**Prompt template:**
```
Professional abstract illustration for [type], clean minimal Scandinavian style,
showing [subject], simple shapes, clean lines, geometric shapes, [color] and
neutral tones, clean white background, symbolic imagery only, no text,
16:9 horizontal format, high resolution 4K
```

**Documented prompts:**

| File | Prompt |
|------|--------|
| `banner-verdier.webp` | "Professional abstract illustration for core values infographic, clean minimal Scandinavian style, showing three geometric shapes — ansvarlighet, tillit and ærlighet — interlocking forms suggesting stability and trust, azure (#F0FFFF) and navy (#003060) color palette, neutral off-white background, symbolic imagery only, no text, 16:9 horizontal format" |
| `benefit-control.png` | "Professional abstract illustration for leadership banner, clean minimal Scandinavian style, showing abstract representation of trust-based leadership vs rigid bureaucracy, featuring geometric shapes in azure blue and neutral grays, no text, symbolic imagery only, 16:9 horizontal format" |
| `benefit-ai.png` | "Professional abstract illustration for leadership banner, clean minimal Scandinavian style, showing abstract representation of human and AI collaboration in leadership, geometric shapes representing synergy between human creativity and machine precision, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `benefit-future.png` | "Professional abstract illustration for leadership banner, clean minimal Scandinavian style, showing abstract representation of forward-looking leadership prepared for an uncertain future, geometric shapes suggesting vision, planning and foresight, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `benefit-anchoring.png` | "Professional abstract illustration for leadership banner, clean minimal Scandinavian style, showing abstract representation of leadership group alignment and collaborative initiative, geometric shapes suggesting unity and shared direction, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `step-talk.png` | "Professional abstract illustration for process step banner, clean minimal Scandinavian style, showing abstract representation of initial consultation dialogue, two geometric shapes in conversation representing discussion and exploration, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `step-interview.png` | "Professional abstract illustration for process step banner, clean minimal Scandinavian style, showing abstract representation of structured two-hour diagnostic interview, geometric shapes arranged in organized pattern suggesting systematic questioning and focused dialogue, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `step-report.png` | "Professional abstract illustration for process step banner, clean minimal Scandinavian style, showing abstract representation of insights delivery and actionable recommendations, geometric shapes suggesting transformation from data to clarity, azure blue and neutral tones, no text, symbolic imagery only, 16:9 horizontal format" |
| `hero-triade.webp` | "Professional abstract illustration for leadership article about triangular relationships and team dynamics, clean minimal Scandinavian style, showing three interlocking geometric nodes connected by flowing lines suggesting resilience and structural stability, azure blue (#F0FFFF) and neutral gray tones, clean white background, symbolic imagery only, no text, 16:9 horizontal format, high resolution 4K" |
| `hero-makt.webp` | "Professional abstract illustration for leadership article about power and service balance, clean minimal Scandinavian style, showing two opposing forces in dynamic equilibrium, a structured geometric form and an open welcoming form balanced on a central axis, azure blue (#F0FFFF) and neutral gray tones, clean white background, symbolic imagery only, no text, 16:9 horizontal format, high resolution 4K" |
| `hero-perspektiv.webp` | "Professional abstract illustration for leadership article about multiframe thinking and multiple perspectives, clean minimal Scandinavian style, showing four overlapping transparent geometric lenses or prisms splitting a single beam of light into multiple paths, azure blue (#F0FFFF) and neutral gray tones, clean white background, symbolic imagery only, no text, 16:9 horizontal format, high resolution 4K" |

---

### Style 3: Section Illustrations (Landscape)

**Use for:** Frame article section images (hovedelementer, utfordringer), inline content illustrations

**Style signature:**
- "Clean minimal infographic" (different opener)
- "Scandinavian design [style]" — "style" is optional
- Frame color with "palette" or just "tones"
- "modern corporate illustration" or "professional illustration"

**Prompt template:**
```
Clean minimal infographic showing [subject], Scandinavian design [style],
[color] [palette/tones], [modern corporate/professional] illustration, no text,
high resolution
```

**Documented prompts:**

| File | Prompt |
|------|--------|
| `illustrasjon-mennesker-hovedelementer.png` | "Clean minimal infographic showing human connections, trust and collaboration in organizations, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text" |
| `illustrasjon-påvirkning-utfordringer.png` | "Clean minimal infographic showing political challenges in organizations - hidden agendas, conflicts, power struggles, Scandinavian design, hunter green tones, professional illustration, no text" |
| `illustrasjon-påvirking-hovedelementer.png` | "Clean minimal infographic showing power dynamics and influence in organizations, connected networks, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `illustrasjon-mennesker-utfordringer.png` | "Clean minimal infographic showing human challenges in workplace - communication barriers, silos, burnout, Scandinavian design, golden yellow tones, professional illustration, no text" |
| `illustrasjon-identitet-utfordringer.png` | "Clean minimal infographic showing cultural challenges in organizations - misaligned values, weak rituals, identity conflicts, Scandinavian design, deep wine tones, professional illustration, no text" |
| `illustrasjon-identitet-elementer.png` | "Clean minimal infographic showing cultural elements in organizations - symbols, rituals, shared values, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |

**Frame color assignments:**

| Frame | Color terms |
|-------|-------------|
| Struktur | "navy blue and white" |
| Mennesker | "golden yellow and white" / "golden yellow tones" |
| Påvirknng | "hunter green and white" / "hunter green tones" |
| Identitet | "deep wine and white" / "deep wine tones" |

### Spot Illustrations (Square — Style 3 variant)

**Use for:** Floating paragraph-level spot illustrations in frame perspective articles

**Style signature:**
- Same Style 3 template (Clean minimal infographic)
- Per-frame color palette
- Square 1:1 format
- No text

**Documented prompts:**

| File | Prompt |
|------|--------|
| `banners/spot-struktur-roller.webp` | "Clean minimal infographic showing roles and responsibilities in an organization, clear boxes with connecting lines, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text" |
| `banners/spot-struktur-mal-og-koordinering.webp` | "Clean minimal infographic showing goal alignment and coordination across departments, arrows pointing in same direction, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text" |
| `banners/spot-struktur-prosesser-og-regler.webp` | "Clean minimal infographic showing process flows and rules, structured workflow diagram, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text" |
| `banners/spot-struktur-hvorfor-struktur-betyr-noe.webp` | "Clean minimal infographic showing structural measurement and clarity, organized framework with metrics, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text" |
| `banners/spot-mennesker-tilhorighet.webp` | "Clean minimal infographic showing belonging and connection in a team, circle of figures, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text" |
| `banners/spot-mennesker-mestring.webp` | "Clean minimal infographic showing mastery and growth, upward trajectory, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text" |
| `banners/spot-mennesker-autonomi.webp` | "Clean minimal infographic showing autonomy and independence, person standing free, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text" |
| `banners/spot-mennesker-hvorfor-mennesker-betyr-noe.webp` | "Clean minimal infographic showing people-centric leadership, heart and team symbols, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-makt.webp` | "Clean minimal infographic showing power and influence dynamics, network connections, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-nettverk.webp` | "Clean minimal infographic showing organizational networks and relationships, connected nodes, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-interesser.webp` | "Clean minimal infographic showing competing interests and agendas, opposing forces in balance, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-hvorfor-pavirkning-betyr-noe.webp` | "Clean minimal infographic showing leadership influence and political landscape awareness, map with highlighted paths, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-verdier.webp` | "Clean minimal infographic showing organizational values, layered shapes building upward, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-ritualer.webp` | "Clean minimal infographic showing workplace rituals and traditions, repeating circular patterns, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-fortelling.webp` | "Clean minimal infographic showing storytelling and organizational narrative, flowing connected shapes, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-lederverdi.webp` | "Clean minimal infographic showing cultural maturity and identity development, ascending levels, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |

---

### Style 4: CTA Illustrations (Landscape)

**Use for:** Call-to-action sections at bottom of frame articles

**Style signature:**
- "Clean minimal infographic"
- "clipboard with checkmarks" (specific imagery)
- "professional Scandinavian style"
- Multi-color: "blue green amber purple tones"
- "corporate illustration"

**Prompt template:**
```
Clean minimal infographic showing leadership assessment and mapping process,
clipboard with checkmarks, professional Scandinavian style,
blue green amber purple tones, corporate illustration, no text
```

**Documented prompt:**

| File | Prompt |
|------|--------|
| `illustrasjon-*.cta.png` | "Clean minimal infographic showing leadership assessment and mapping process, clipboard with checkmarks, professional Scandinavian style, blue green amber purple tones, corporate illustration, no text" |

---

## Photography Guidelines

While illustrations form the primary visual language, real photography is used selectively to add human warmth and credibility.

### Where to Use Photos

| Context | Use Photography | Why |
|---------|----------------|-----|
| Team profiles (`_profiles/*.md`) | ✅ Always | Real faces build trust |
| Case studies (`_cases/*.md`) | ✅ Recommended | Real clients / settings ground the stories |
| Hero sections | ❌ Use illustrations | Abstract illustrations support the brand better |
| Benefit banners | ❌ Use illustrations | Illustrations communicate concepts cleaner |

### Photo Style

- **Natural light, not studio** — authentic, not corporate
- **Candid over posed** — real moments, not stiff handshakes
- **Environmental portraits** — show the person in their context (office, meeting room, not a white backdrop)
- **Desaturated color palette** — tone down saturation to ~70% to harmonize with the muted illustration palette
- **No staged business photos** — no fake phone calls, no whiteboard pointing, no crossed-arms-in-suit

### Technical Requirements

- Minimum resolution: 1200×1200px for full-width use
- Format: WebP (converted from original PNG/JPEG)
- Aspect ratio 1:1 for profile cards (displayed 100×100px)
- Aspect ratio 16:9 for case study hero images
- All photos must have descriptive `alt` text in Norwegian (see Alt Text section)

### Examples

✅ Good:

> A person in a sweater sits at a wooden meeting table, mid-laugh, natural window light from the side. Desaturated colors, muted background.

❌ Avoid:

> A person in a suit shakes hands with another person in a suit in front of a gradient backdrop. Over-lit, over-saturated, corporate stock photo energy.

---

## Frame Metaphor Framework

Each frame maps to a discipline and a workplace metaphor. All scenarios place the metaphor inside an office setting.

| Frame | Discipline | Workplace Metaphor | Color Accent |
|-------|-----------|-------------------|--------------|
| **Structure** | Economy | Office is a Factory | Navy |
| **Humans** | Psychology | Office is a Family | Golden Yellow |
| **Influence** | Politics | Office is a Jungle | Hunter Green |
| **Identity** | Cultural Anthropology | Office is a Theater | Deep Wine |

---

## Frame Hero Banners

**Files:**
| Frame | File | Usage |
|-------|------|-------|
| Struktur | `frame-struktur.png` | Frame article hero + vitenskapelig grunnlag card |
| Mennesker | `frame-mennesker.png` | Frame article hero + vitenskapelig grunnlag card |
| Påvirknng | `frame-påvirkning.png` | Frame article hero + vitenskapelig grunnlag card |
| Identitet | `frame-identitet.png` | Frame article hero + vitenskapelig grunnlag card |

**Style:** Professional abstract illustration (Style 2)

**Frame accent colors (color-blind accessible):**
| Frame | Color Name | Hex |
|-------|-----------|-----|
| Struktur | Navy Blue | #2A4D6E |
| Mennesker | Golden Yellow | #D4A836 |
| Påvirknng | Hunter Green | #355E3B |
| Identitet | Deep Wine | #8E0D3C |

---

## Prompt Engineering

### Pre-Generation Checklist

- [ ] No Norwegian or English words in prompt
- [ ] No specific brand names or logos
- [ ] Aspect ratio specified (16:9 for landscape)
- [ ] Style descriptor matches illustration type (see Style guidelines above)
- [ ] Color palette referenced correctly
- [ ] "no text" included

### Style Selection Guide

| If image is... | Use style... |
|----------------|--------------|
| Landing page hero with forest/nature | Style 1: Hero Illustrations |
| Benefit banner, frame hero, process step | Style 2: Professional Abstract |
| Frame section (hovedelementer/utfordringer) | Style 3: Section Illustrations |
| CTA section at bottom of frame page | Style 4: CTA Illustrations |

---

## Dark Mode

All images must work on both light and dark backgrounds. Use transparency where appropriate. Avoid pure black or white elements that may clash with theme backgrounds.

---

## File Naming

```
assets/images/
├── banners/
│   ├── benefit-*.png
│   ├── frame-*.png
│   ├── illustrasjon-*.png
│   ├── step-*.png
│   ├── banner-om-oss.png
│   └── banner-verdier.webp
├── hero-illustration.png
└── science-foundation.png
```

- Use Norwegian descriptive names
- kebab-case
- No spaces or special characters beyond ASCII letters/numbers and Norwegian åæø

---

## Prompt Documentation Rule

**All generated images must have their prompts documented in this file before the task is considered complete.**

Required fields:
- **File**: Relative path from `assets/images/`
- **Prompt**: Full prompt used (copy-paste, no summarization)
- **Reference**: Optional reference image URL if used

This enables future agents to reproduce styles and iterate consistently.

---

## Alt Text

Every image requires descriptive alt text. Pattern:

```html
<img src="..." alt="[Descriptive alt text in Norwegian]">
```

**Rules:**
- Describe what is shown, not the concept (unless concept is abstract)
- No "Image of" or "Picture of" prefixes
- Be specific: "geometrisk abstraksjon med blå nyanser" not "abstrakt bilde"

---

## Image Resize Guidelines

When optimizing images for web delivery, follow these dimensions and quality settings.

### Resize Dimensions by Category

| Category | Path Pattern | Max Dimensions | Quality | Notes |
|----------|--------------|-----------------|---------|-------|
| Hero banners | `assets/images/hero-*.png` | 3840×2160 | 85 | Viewport-filling heroes, 4K for retina/ultrawide |
| Frame/benefit/step banners | `assets/images/banners/*.png` | 1920×1080 | 85 | 16:9 landscape format, non-viewport-filling |
| Icons | `assets/images/icons/*.png` | 512×512 | 85 | Small UI elements |
| Logos | `assets/images/*logo*.png` | 400×400 | 85 | Fixed display size 100×100px |
| Profile photos | `assets/images/*.png` (profile) | 400×400 | 85 | Displayed at 100×100px |
| OG images | `assets/images/og-image.png` | 1920×1080 | 85 | Social sharing cards |

### Conversion: PNG → WebP

**Tool:** ImageMagick (`magick` command)

**Command pattern:**
```bash
magick mogrify -resize {max_dims}> -quality 85 -format webp {path}
```

The `>` modifier ensures images **smaller** than target remain unchanged (no upscaling).

**Quality 85 rationale:** Good balance between file size (~70% reduction vs PNG) and visual quality for illustrations and photos.

### Original File Preservation

All original PNG files must be copied to `.design/graphics/originals/` before conversion:

```
.design/graphics/
└── originals/
    ├── banners/          (32 files)
    ├── icons/            (9 files)
    ├── noexcuse-logo-horizontal.png
    ├── noexcuse-logo-azure.png
    ├── dagfinn.png
    ├── hero-illustration.png
    └── og-image.png
```

**Why preserve originals:**
- Future format migrations (AVIF, WebP v2)
- Regeneration at higher resolution if needed
- Audit trail of source assets
- Recovery from conversion errors

### Rollback Procedure

If conversion issues occur:

```bash
# Restore from originals
cp .design/graphics/originals/banners/*.png assets/images/banners/
cp .design/graphics/originals/icons/*.png assets/images/icons/
cp .design/graphics/originals/*.png assets/images/
rm assets/images/*.webp
```

### Post-Conversion HTML Updates

After conversion, update any hardcoded `.png` references in HTML:

| File | Reference | Change Required |
|------|-----------|-----------------|
| `_includes/header.html` | `noexcuse-logo-azure.png` | → `.webp` |

Search for remaining references:
```bash
grep -r "\.png" _includes/ _layouts/ *.html --include="*.html"
```

### Verification Checklist

- [ ] All 44 PNG files converted to WebP
- [ ] Originals preserved in `.design/graphics/originals/`
- [ ] No PNG files remain in `assets/images/` (except backup)
- [ ] All HTML references updated to `.webp`
- [ ] Site passes `npm run lint`
- [ ] Tested locally with `jekyll serve`

## Design Evolution

### Pivot: Line-art icons → Mini-hero banners (16:9)

**Planlagt (originalt):** 7 line-art icons i azure, 1:1 format, plassert i `assets/images/icons/`.

**Valgt (implementert):** Mini-hero-bannere i 16:9-format, abstrakte illustrasjoner som matcher hero-stilen. Plassert i `assets/images/banners/`.

**Bakgrunn:** Under innholdsarbeidet viste det seg at 1:1-ikoner ga for lite visuelt uttrykk per benefit/step. Bannere i 16:9 gir mer kontekst og matcher den skandinavisk minimale illustrasjonsstilen bedre. Ikonene eksisterer fortsatt som `.webp` i `assets/images/icons/` for eldre referanser.

### CSS Display Considerations

No CSS changes needed for WebP — browser handles format automatically when `src` points to `.webp` file. Original CSS dimensions are preserved:

```css
/* These work with WebP without changes */
width: 100px;    /* logo display */
height: 40px;    /* icon display */
max-width: 1100px; /* banner container */
```