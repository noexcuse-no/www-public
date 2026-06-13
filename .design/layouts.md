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

CTA-knapper defineres via `cta`-lista i frontmatter (se `.specs/cta-frontmatter/README.md`). Hver komponent rendrer et antall knapper basert på plass:

- Hero: `cta[0]` som `.cta` (Type A)
- Sidebar: `cta[0]` + `cta[1]` som `.cta` + `.cta--secondary`
- Produktkort: Henter `cta` fra produktets frontmatter

```
.cta-buttons
  ├─ a.cta          (primary)
  └─ a.cta--secondary (secondary)
```

## Page Templates (Jekyll layouts)

### `article.html` — Artikler, perspektivsider og produktsider (unified)
```
── hero (if page.hero)
── stat-bridge (if page.stat_bridge)         ← "4 perspektiver · 60 spørsmål · 2 timer"
── .article-layout (CSS grid: pager | body | questions)
    ├── .article-pager                       ← sidebar-toc + share-section (if show_toc != false)
    ├── .article-body                        ← container--wide
    │   ├── {{ content }}
    │   └── cta-buttons (if page.cta, shown on narrow screens)
    └── .article-questions
        ├── questions.html (if page.questions, collapsible sidebar card)
        └── .sidebar-card--product (if page.cta, compact product card with banner + CTA)
── cases-cards (if page.show_cases)
── references (if page.show_references)
```
**Unified layout for `article`-class pages**, including the Ledelse 60:2 product page (class:product, layout:article). The 3-area CSS grid renders: TOC + share in the left pager, content centered, questions + product CTA card in the right sidebar. On narrow screens (<1200px) the grid collapses to block and sidebars hide.

**Control knobs:**
- `stat_bridge:` — renders a stat line (`stat-bridge.html`) between hero and article-layout
- `show_toc: false` — hides the left sidebar TOC (used by Emne page)
- `hero:` — activates the full article layout (without `hero:`, content renders bare)
- `frame_id:` — loads `perspektiv-styles.css`
- `questions:` + `questions_title:` — populate the right sidebar collapsible question section
- `cta:` — CTA button list (consumed by hero, sidebar, and inline sections)

**Mobile:** The `.article-layout` grid collapses to single column. The `.article-pager` and `.article-questions` sidebars are hidden on narrow screens. CTA buttons render inline at the bottom of `.article-body`.

### `product.html` — Orphaned (erstattet av article.html)
```
── (ingen gjenværende sider bruker dette layoutet)
```
Tidligere produktlayout for `class:product`-sider. Den eneste produktsiden (`_pages/ledelse_60-2.md`, `class: product`) bruker nå `layout: article`. `_layouts/product.html` kan fjernes ved neste opprydding.

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
