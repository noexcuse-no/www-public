# Graphics Design Rules — No Excuse AS

## Brand Aesthetic

**Scandinavian minimal** — clean lines, generous whitespace, restrained color palette. Think IKEA meets Kinfolk magazine.

**Core principles:**
- Abstract over literal
- Structural over decorative
- Monochromatic with single accent (azure)
- No text in any image (multilingual site)

## Color Palette for Generated Images

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary-accent` | `azure` (#F0FFFF) | Accent elements |
| Background light | `#e2e8f0` | Canvas backgrounds |
| Background dark | `#121212` | Dark mode canvases |
| Text/muted | `#37474f` / `#ffffff` | Abstract shapes |

## Image Types

## Hero Images (16:9)

- **Aspect ratio**: 1920×1080 or proportional
- **Usage**: Page tops, banner sections
- **Style**: Abstract Scandinavian landscape or structural metaphor
- **Content**: No text, no faces, no logos

**Style signature (confirmed working):**
- Bright white/light gray background (not dark)
- Abstract human silhouettes seen from behind
- Forest/nature or architectural motifs
- Azure (#F0FFFF) as accent in light
- Minimalist Nordic style — keep prompts short and descriptive

**Prompt template:**
```
Three abstract human silhouettes seen from behind standing in a forest,
looking toward a distant horizon, bright white/light gray background,
cool Nordic color palette with azure (#F0FFFF) accent in the light,
minimalist Nordic style, 16:9 aspect ratio, no text, no faces visible
```

**Style modifiers to use:**
- `bright white/light gray background`
- `minimalist Nordic style`
- `cool Nordic color palette`
- `azure (#F0FFFF) accent`

**Style modifiers to avoid:**
- `architectural photography style`
- `soft diffused natural light`
- `Minimal Scandinavian forest landscape` (too specific)
- `light birch or pine trees` (too specific)

### Frame Illustrations (16:9)

- **Aspect ratio**: 1920×1080
- **Usage**: Ledelse 60:2 frame articles (struktur, mennesker, påvirkning, identitet)
- **Style**: Abstract conceptual, symbolic representation
- **Content**: No text, no faces, no branding

**Visual metaphors per frame:**
| Frame | Visual Direction |
|-------|------------------|
| Struktur | Interconnected nodes, org chart abstraction, blueprint geometry |
| Mennesker | Circles of trust, overlapping hands, collaborative growth |
| Påvirknng | Power dynamics, influence vectors, stakeholder web |
| Identitet | Cultural artifacts, ritual symbols, tribal markers |

### Banner Images (16:9)

- **Aspect ratio**: 1600×900 or 800×450 minimum
- **Usage**: Benefit cards, process step illustrations
- **Style**: Abstract concept representation, matches hero style
- **Content**: No text

### Thumbnail/Portrait (4:3 or 1:1)

- **Usage**: Profile images, product thumbnails
- **Style**: Clean portrait, single subject, minimal background

## Prompt Engineering

### Pre-Generation Checklist

- [ ] No Norwegian or English words in prompt
- [ ] No specific brand names or logos
- [ ] Aspect ratio specified
- [ ] Style descriptors: "minimal", "Scandinavian", "abstract"
- [ ] Color palette referenced (azure, cool grays)
- [ ] No faces or identifiable people

### Prompt Structure

```
[Subject] + [Style] + [Color palette] + [Composition] + [Technical]
```

**Example:**
```
Abstract geometric architecture, Scandinavian minimal style,
cool gray (#37474f) and azure (#F0FFFF) palette,
dynamic triangular composition, soft directional light,
wide angle, 16:9, editorial photography
```

### Style Modifiers

| Effect | Modifier |
|--------|----------|
| Architectural | `clean geometric forms, blueprint precision` |
| Editorial | `magazine-quality, high contrast` |
| Abstract | `fragmented forms, overlapping planes` |
| Kinetic | `motion blur, dynamic tension` |

## Dark Mode

All images must work on both light and dark backgrounds. Use transparency where appropriate. Avoid pure black or white elements that may clash with theme backgrounds.

## File Naming

```
assets/images/
├── banners/
│   ├── frame-struktur.png
│   ├── frame-mennesker.png
│   ├── frame-påvirkning.png
│   ├── frame-identitet.png
│   └── banner-om-oss.png
├── hero-illustration.png
└── ...
```

- Use Norwegian descriptive names
- kebab-case
- No spaces or special characters beyond ASCII letters/numbers and Norwegian åæø

## Alt Text

Every image requires descriptive alt text. Pattern:

```html
<img src="..." alt="[Descriptive alt text in Norwegian]">
```

**Rules:**
- Describe what is shown, not the concept (unless concept is abstract)
- No "Image of" or "Picture of" prefixes
- Be specific: "geometrisk abstraksjon med blå nyanser" not "abstrakt bilde"