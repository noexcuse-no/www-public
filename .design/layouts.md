# Page Layouts — No Excuse AS

## Content Width System

Siden har tre innholdsbredder:

| Bredde | Token | Bruk |
|--------|-------|------|
| **1100px** | `--content-max` | Standard sidebredde (hero, header, produkter) |
| **800px** | `--content-wide` | Artikkelseksjoner, perspektiv-sider |
| **65ch** | `--content-narrow` | Brødtekst (artikkel-body, om-oss-tekst) |

**Regel:** Hver side har én `<main>` som enten er full bredde (full-bleed hero) eller sentrert max-width. Alle innholdsseksjoner inni main bruker én av de tre breddene.

**Implementasjon:** Én `.container`-klasse med modifiers:
- `.container` → `--content-max` (default)
- `.container--wide` → `--content-wide`
- `.container--narrow` → `--content-narrow`
- `.container--full` → `100%` (full-bleed bilde/bakgrunn)

## Section Vertical Rhythm

Seksjoner har **konsekvent vertikal spacing**. Standard padding blokk (top/bottom) er `--space-2xl`.

| Modifier | Spacing | Bruk |
|----------|---------|------|
| (default) | `--space-2xl` | Standard seksjon |
| `--hero` | `--space-3xl` | Hero-seksjoner (stort vertikalt rom) |
| `--compact` | `--space-lg` | Tette seksjoner (partnere, tags) |
| `--spacious` | `--space-4xl` | CTA, bunn av side |
| `--bleed` | `0` | Full-bleed bilder/bakgrunn |

Bredde og spacing kombineres som uavhengige modifiers:
```html
<section class="section--hero container">      <!-- Hero: stor padding, max-width -->
<section class="section container--wide">      <!-- Standard padding, smalere innhold -->
<section class="section--compact container--narrow">  <!-- Tett, smal -->
```

## Grid System

2 og 3 kolonner, ingen overflødig 12-kolonne-oppsett.

| Modifier | Oppførsel |
|----------|-----------|
| `.grid` | `display: grid; gap: --space-lg` |
| `.grid--2` | `1fr 1fr` |
| `.grid--3` | `1fr 1fr 1fr` |
| `.grid--auto` | `auto-fill, minmax(280px, 1fr)` |

**Mobile:** Alle grids → 1 kolonne (≤599px). Unntak ved eksplisitt `.grid--tablet` for tablet-bevaring.

## Flex Layout Utilities

| Klasse | Oppførsel |
|--------|-----------|
| `.flex-row` | `flex-direction: row` |
| `.flex-col` | `flex-direction: column` |
| `.flex-center` | `align-items: center; justify-content: center` |
| `.flex-between` | `justify-content: space-between` |
| `.flex-wrap` | `flex-wrap: wrap` |
| `.flex-gap` | `gap: --space-md` |

## Seksjonstyper (sammensatte patterns)

### Hero Section
```
[full-bleed bilde eller gradientbakgrunn]
  └─ container
       ├─ breadcrumb (link)
       ├─ h1
       └─ intro (p, max 2 setninger)
```

### Standard innholdsseksjon
```
section (section--hero | section)
  └─ container (container--wide | container--narrow)
       ├─ h2
       └─ innhold (prose / p)
```

### Grid-seksjon
```
section
  └─ container
       └─ .grid (grid--2 | grid--3)
            ├─ kort / rad
            ├─ kort / rad
            └─ kort / rad
```

### CTA-seksjon
```
section.section--spacious
  └─ container.container--narrow
       ├─ h2 (stor)
       ├─ p (intro)
       └─ a (knapp)
```

## Page Templates (Jekyll layouts)

### `page.html` — Standard side
```
── main
    └─ {{ content }}  ← Markdown eller includes
```
*Denne endres ikke. Innholdet definerer sin egen struktur via HTML/markdown.*

### `perspektiv.html` — Perspektivartikkel
Gitt dagens struktur bør den kunne forenkles fra custom CSS til:
```
section.section--hero.container           → hero (breadcrumb, h1, intro)
  for hver innholdsblokk:
    section.section.container--wide       → brødtekst
    section.section.container--wide .grid → elementer/utfordringer
    section.section--spacious.container   → CTA
```

### `home.html` — Forside
```
for hver seksjon (produkter, profiler, podcast, cases, partnere):
  section.section.container
    → inkluderer component
```

## Eksisterende Breakpoints

| Bredde | Navn | Endring |
|--------|------|---------|
| 599px | Mobil break | Alt grid → 1 kolonne |
| 600px | Tablet break | Innhold får mer padding |
| 1024px | Desktop break | Full bredde |

## Hva dette erstatter

Layout-systemet konsoliderer dagens mønster hvor ~10 komponenter hver definerer:
```css
.component-section { max-width: Xpx; margin: 0 auto; padding: 40px 20px; }
```

...til én definisjon i `layout.css`. Hver komponent fjerner sin egen max-width/padding-deklarasjon og bruker `.section .container`-klassene i stedet.

## Konvensjoner

1. **En section, én container.** En seksjon har alltid nøyaktig ett container-barn.
2. **Spacing modifier på section, ikke container.** Section styrer vertikalt rom, container styrer horisontal bredde.
3. **Modifiers komponeres via CSS-klasser, ikke nye deklarasjoner.** Ingen custom grid eller spacing per komponent.
4. **Grid modifier spesifiserer kolonner, ikke innhold.** Grid--2 sier "to kolonner", ikke "benefits-grid".
