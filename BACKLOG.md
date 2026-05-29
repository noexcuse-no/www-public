# BACKLOG

All planned tasks and work-in-progress are tracked here.
Design for all tasks shall always follow the .design rules.
Details shall be described under .spec before work initiation.
Completed tasks are tracked in CHANGELOG.md and should not appear here.

---

## Execution Order (Refined 2026-05-26)

Following the design interview and health survey, tasks are grouped into phases that respect dependencies and maximize visible progress.

### Phase 0-3 — Completed

Phase 0 (Health Sprint), Phase 1 (Quick Wins), Phase 2 (Perspektiv Architecture), and Phase 3 (Content Core) are complete. See CHANGELOG.md [1.3.0]–[1.5.0].

---

### Phase 4 — New Articles

*Specs created 2026-05-26. N1 (Triader), N2 (Makt), N3 (Perspektiv) moved to **Blocked** section — waiting on article content from user. See `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md` for specs.*

---

---

### Phase 5 — Existing Article Expansions ✅ COMPLETE

*Completed 2026-05-26. See CHANGELOG.md [1.6.0].*

See relevant spec files for each expansion.

**E1 — AIE Process (Applied Information Economics)**
- **File:** `_pages/ledelse_struktur.md`
- **Location:** New subsection in "Det vitenskapelige grunnlaget" — or standalone section "Målemetodikk"
- **Source:** Hubbard — *How to Measure Anything* (2014)
- **Content:** 7-step AIE process explained in accessible language. Make measurement methodology explicit.
- **Design:** Expand existing structure; no new images required
- **Cross-link:** From `/perspektiv/` for "no scoring" theoretical backing

**E2 — Organisert anarki**
- **Files:** `_pages/ledelse_påvirkning.md` AND `_pages/ledelse_forankring.md`
- **Location:** After "Hva er påvirkningsperspektivet?" in both articles
- **Source:** Cohen, March & Olsen — "garbage can model" (referenced via Pfeffer)
- **Content:** Why rational decision-making fails in organizations. Decisions made by confluence of problems, solutions, participants, and choices — not rational analysis.
- **Norwegian term:** "Organisert anarki" — do not use "Garbage Can Theory"
- **Design:** Text expansion; no new images required
- **Note:** Keep term clinical and neutral — this is a valid organizational phenomenon, not an insult

**E3 — Idiosyncrasy Credits**
- **File:** `_pages/ledelse_påvirkning.md`
- **Location:** In "Usynlig beslutningsmakt" challenge section
- **Source:** Pfeffer Ch.5 — "Creating Resources"
- **Content:** The earned right to deviate from norms earned through prior contributions. Why senior leaders can break rules — they have earned idiosyncrasy credits.
- **Design:** Expand existing challenge block; no new images

**E4 — The Price of Power (split)**
- **Brief mention:** `_pages/ledelse_påvirkning.md`
  - One paragraph in a new "Maktens kostnader" subsection
  - Cross-link: "Les om maktens kostnader i /makt/ →"
- **Full treatment:** `_pages/ledelse_makt.md` (new article N2)
  - Full subsection covering:
    - Trade-offs (time, relationships, authenticity)
    - Corrupting effect (narcissism, overconfidence)
    - Psychological toll (loneliness, distrust)
    - Why awareness matters for leadership culture
- **Design:** Split as specified; no new images for /pávirkning/ expansion

**E5 — Core Values + Noble Cause (deep expansion)**
- **File:** `_pages/ledelse_mennesker.md`
- **Location:** Expand existing "Verdier og mening" section
- **Source:** Logan Ch.4 — "Core Values and Noble Cause" (Tribal Leadership)
- **Content:**
  - Core values = behavioral ground rules (not aspirational posters)
  - Noble cause = why the organization exists beyond profit
  - Distinction: values describe existing behavior; cause inspires new behavior
  - Norwegian examples relevant to SMB context
- **Design:** Expand existing section; no new images required

**E6 — "No scoring" theoretical backing (per frame)**
- **Files:** All four perspektiv articles
- **Location:** "Det vitenskapelige grunnlaget" section in each
- **Source:** Bolman & Deal (no frame is universally correct) + Hubbard (measurement = uncertainty reduction) + Logan (stages are descriptive)
- **Content per frame:**

| Frame article | Source | Backing sentence |
|---------------|--------|-----------------|
| `/struktur/` | Hubbard | "Hubbard argumenterer for at all måling reduserer usikkerhet — ikke eliminerer den. Ledelse 60:2 hevder ikke presise scorer, bare perspektiver." |
| `/mennesker/` | Blanchard & Barrett | "Blanchard og Barrett viser at det ikke finnes én fasit på god ledelse — kontekst bestemmer hva som fungerer. Ledelse 60:2 диагностицирует orientering, ikke korrekthet." |
| `/påvirkning/` | Pfeffer | "Pfeffer dokumenterer at makt er kontekstavhengig. Ledelse 60:2 kartlegger maktfordeling, ikke rettferdighet." |
| `/identitet/` | Logan | "Logan beskriver kulturstadier som beskrivende — ikke normative. Ledelse 60:2 identifiserer hvor organisasjonen er, ikke hvor den bør være." |

---

### Phase 6 — Regression Fixes ✅ COMPLETE

*All items completed 2026-05-29. See commit history on `fix/phase6-regressions-usikkerhet-rename` branch.*

**R1** — Gjenopprettet CTA-seksjon i `_pages/ledelse_forankring.md` (fra commit `d1d6ac5^`). Alle 6 `<sup>` lukket.

**R2** — Utført som del av 10.1 (usikkerhet-rename). Alle 12 `<sup>` lukket.

**R3** — `_pages/ledelse_tillit.md`: 5 nestede `<sup>` separert, alle 11 lukket.

**R4** — `_pages/ledelse_generativ-ki.md`: `</sup>` lagt til på linje 90.

**R5** — Systematisk gjennomgang: 0 uavsluttede `<sup>` i noen `_pages/ledelse_*.md`-fil.

**R6** — Kryssreferanser oppdatert i `_pages/ledelse_60-2.md` og `_products/ledelse-60-2.md`.

---

### Phase 7 — Assets & Performance ✅ COMPLETE

*Completed 2026-05-26. See CHANGELOG.md [1.6.0].*

**Image Optimization** ✅ All tasks complete

**SEO Foundation** ✅ All tasks complete

---

### Phase 8 — Architecture Debt

*Cleanup and component extraction. All work on `refactor/architecture-debt` branch (PR #43).*

**P1 — Phase 1: Cleanup & Foundation** ✅ Complete
- [x] P1.1: Dead code removal — `styles.css.old`, `profile-card.js`, `_includes/image.html` deleted
- [x] P1.2: CSS variable unification
- [x] P1.3: Frontmatter defaults — added to `_config.yml` for all collections

**P2 — Phase 2: Component Extraction**
- [x] P2.1: Navigation from data — `_data/navigation.yml` created, navbar reads from `site.data.navigation`
- [x] P2.2: Extract inline CSS/JS — 287 lines from `profiles.html` → `assets/css/profiles.css`
- [x] P2.3: Image include adoption — Cancelled. `_includes/image.html` was dead code; project convention is direct `<img>` with `relative_url`. No dedicated include needed.

**P3 — Phase 3: Architecture Improvements**
- [x] P3.1: Plugin integration — Cancelled. GitHub Pages restricts plugins; custom SEO/sitemap implementations already serve the purpose.
- [x] P3.2: Layout conditional includes — `_layouts/default.html` created as base template, `page.html` and `home.html` inherit from it
- [x] P3.3: Reusable CTA component — `_includes/cta.html` with configurable heading, body, booking URL
- [x] P3.4: Profile JS consolidation — `profile-card.js` deleted (functionality consolidated)

**P4 — Phase 4: Future-Proofing** *(moved to Future Features — too vague, no spec)*
- [ ] P4.1 → FF6: Multi-product support
- [ ] P4.2 → FF7: JSON Schema validation

**P5 — Layout System** *(active on `feature/layout-system`)*
- [x] P5.1: Design document — `.design/layouts.md` med content width system, section rhythm, grid, flex utilities, page template specs
- [x] P5.2: CSS implementation — `.container`, `.section`, `.grid`, `.flex-*` klasser i `layout.css`
- [x] P5.3: Template migration — oppdater `perspektiv.html`, `products.html`, `profiles.html` til nye klasser
- [x] P5.4: Cleanup — fjern dupliserte `max-width`/`padding` fra komponent-CSS

---

### Phase 9 — Rules Restructuring ✅ Complete

*All work on `refactor/architecture-debt` branch (PR #43).*

- [x] AGENTS.md — replaced prose activation tree with REQUIRED directive to parse `opencode.json` before every decision
- [x] All 10 `.opencode/rules/*/rules.md` — English activation headers added to all rule files
- [x] `.opencode/rules/triggers.json` — created with 8 trigger definitions, 14 operation lifecycle hooks, then deleted and inlined as `instructions[0]`
- [x] Root `opencode.json` — now delegates to `.opencode/opencode.json` as single instruction source
- [x] `.opencode/rules.json` — deleted (content integrated into triggers, now inline)
- [x] `.opencode/opencode.json` → `instructions` array: `instructions[0]` = inline triggers/operations, `instructions[1..5]` = `$ref` to concrete-constraint JSON files (frontmatter, accessibility, privacy, linting, task-management)
- [x] 6 architecture/design JSON rule files (architecture, naming, css, js, html, frontmatter) — architecture content migrated from JSON to `.design/*.md`; frontmatter kept as JSON (concrete schema constraint)
- [x] New `.design/*.md` files: naming.md, css-architecture.md, js-patterns.md, html-templates.md
- [x] `.opencode/rules/architecture/`, `naming/`, `css/`, `js/`, `html/` — directories deleted (empty after migration)
- [x] Remaining `.opencode/rules/`: frontmatter, accessibility, privacy, linting, task-management (5 concrete-constraint JSON files)

---

### Phase 10 — Site Review Fixes & Animations ✅

*Color system (superseding 10.2) committed in PR #47. Remaining items still pending.*

**10.1 — Rename `/organisasjonskultur/` → `/usikkerhet/` ✅ COMPLETE**
- Completed 2026-05-29 on `fix/phase6-regressions-usikkerhet-rename` branch
- Permalink endret, frontmatter/JSON-LD oppdatert, alle 12 `<sup>` lukket
- Kryssreferanser i `_pages/ledelse_60-2.md` og `_products/ledelse-60-2.md` oppdatert
- Informatikkarkitektur `.design/information-architecture.md` var allerede korrekt

**[10.2] — ✅ COMPLETE (PR #47)**
- Superseded by full twin-primary color system: Navy #003060 / Azure #F0FFFF
- Header bg swaps per mode, inline SVG logo, CTA borders, nav link colors
- See `.design/colors.md` for full spec

**10.3 — Hero animation system (frontmatter-driven)**
- **Action:** Build framework where hero effects (parallax-fade, ken-burns, etc.) are selected per page via frontmatter; create `hero-effects.js` dispatcher
- **Scope:** JS architecture + CSS
- **Dependency:** None, but 10.4 uses this system

**10.4 — Parallax-fade hero effect**
- **Action:** Implement parallax-fade as first effect in the new animation system
- **Scope:** CSS + JS — fade to `var(--background-color)`
- **Depends on:** 10.3 (needs the dispatcher)

**10.5 — Profile card redesign**
- **Action:** Redesign profile cards with better image sizing/proportions
- **Scope:** CSS — `profiles.css`
- **No blockers**

**10.6 — Frontpage profile filter**
- **Action:** Show relevant profiles on frontpage based on page context with Liquid filter
- **Scope:** Liquid + includes
- **No blockers**

**10.7 — Full-width hero**
- **Action:** Remove max-width constraint on hero sections for full-bleed layout
- **Scope:** CSS — hero section width adjustments
- **No blockers**

**10.8 — "Velg et tidspunkt" — ikke i iframe**
- **Problem:** Booking-modal åpnes i iframe, bør være direkte lenke
- **Scope:** Booking modal / CTA-knapper
- **No blockers**

**10.9 — "Book en uforpliktende samtale" — ikke i iframe**
- **Problem:** Samme som 10.8 — CTA åpnes i iframe
- **Scope:** CTA-knapper
- **No blockers**

**10.10 — Mobil: konsistente CTA-bredder**
- **Problem:** "Bestill Ledelse 60:2" og "Book en uforpliktende samtale" har ulik bredde på mobil
- **Scope:** CSS for CTA-knapper på mobilbreakpoint

---

### Phase 11 — Design Polish & /metode/ Overhaul

*D4, D5, D7–D11, R7, R8 completed 2026-05-29 on `fix/phase6-regressions-usikkerhet-rename` branch. Remaining items not yet started.*

**✅ Completed on this branch:**

**D4** — Profil-tagger: `_includes/profiles.html` — bruker Liquid split/loop med `<span class="profile-tag">`

**D5** — `_profiles/dagfinn.md`: lagt til `title: "Daglig leder"`

**D7–D11** — `/metode/` overhaul: tittel endret til "Om metodikk", frontmatter/JSON-LD oppdatert, "Vi fremhever fire prinsipper:" slettet, "utvikling" fjernet fra Mennesker frame-desc, 4 "Symbolsk"-setninger kuttet, korrupt CSS på slutten ryddet, syntaksfeil fikset

**R7** — `/metode/`: ingen `<sup>`-feil fant — R7 var falsk alarm (filen hadde aldri fotnoter)

**R8** — `/metode/`: korrupsjonen var duplisert `</style>`-blokk, ikke trunkert CTA — filen har aldri hatt CTA-seksjon. Fikset.

**⏳ Remaining (not started):**

**D1** — Header alltid `#003060` uavhengig av tema (CSS: colors.css, header.css, styles-light.css, styles-dark.css)

**D2** — CTA hover: opacity → fargeoverganger type A/B (CSS: products.css, article.css; spec: `.specs/cta-design/README.md`)

**D3** — Hero text overlay for lesbarhet på bannerbilder (layout-systemet)

**D6** — Profil scrollbar vises ved første lass (profiles.css)

**D12** — Profile image for liten i kompakt-visning — 80×80px minimum (profiles.css)

**D13** — Profile image "hopp" ved ekspandering (profiles.css + profile-card.js)

**D14** — Kontaktlenker inkonsistent styling (profiles.css)

**D15** — Hero mangler `border-radius` i bunn (layout.css)

---

### Phase 12 — Broader Improvements

*Items that don't fit existing phases — cross-cutting design and asset work.*

**X1 — Infografikk: tre kjerneverdier under "Oppdrag og verdier"**
- **Problem:** Trenger en enkel infografisk illustrasjon av de tre kjerneverdiene
- **Scope:** Ny banner/illustrasjon på `/om-oss/` eller aktuell side
- **Design:** Følg `.design/graphics.md` retningslinjer — ingen tekst, skandinavisk minimal
- **No blockers**

**X2 — Dark mode consistency pass**
- **Scope:** Alle sider — cards, frames, seksjoner, bakgrunner
- **Problem:** Dark mode har harde hvite bakgrunner enkelte steder. Ser dårlig ut i nattmodus.
- **Prosess:** (1) Oppdater `.design/` med definitive dark mode-regler → (2) Oppdater `.specs/` → (3) Gjennomgå implementering for regresjoner
- **Avhengighet:** Bør gjøres etter at andre designoppdateringer er ferdige

---

### Phase 12 — Design Alignment (Post-Interview)

*Tasks identified from design interview conflict resolution and documentation harmonization.*

**F5 — Bildegenerering (oppdatert design) → moved to Blocked**
- *F5 is blocked waiting on N1-N3 article content (must be drafted and approved before image generation, per Image Generation Context Requirements). See Blocked section.*

**F6 — Animasjonsimplementering (layered approach)**
- **Scope:** Implement the layered animation system from updated `.design/ui-upgrade.md`
- **Brand layer:** `heroReveal`, `heroImageReveal`, `pageTransition` keyframes + CSS classes + JS trigger
- **UI layer:** Existing scroll-triggered animations stay (fadeInUp, slideInLeft, etc.)
- **Reduced motion:** Extended to cover brand animation classes
- **Spec:** `.design/ui-upgrade.md` + `.specs/ui-upgrade/README.md`
- **Status:** Ready for implementation

**F7 — Fotograf-retningslinjer (profilbilder)**
- **Scope:** Write a human-readable, concrete photographer brief based on the new photography guidelines in `.design/graphics.md` (Photography Guidelines section)
- **Deliverable:** Separate document (`.design/photography-brief.md`) written in Norwegian, targeted at a professional portrait photographer
- **Content must include:** Light style (natural, desaturated), composition (environmental portraits, candid), technical specs (WebP, 1:1 aspect ratio), mood references, examples of good/bad, and the brand personality context (rebellious/nordic/democratic)
- **Status:** Spec complete, deliverable pending

---

### Phase 13 — Customer Cases (Inbound Sales)

*C1-C4 moved to **Blocked** section — all require user input or dependency completion before work can start.*

---

## Design Decisions

### Brand & Visual (2026-05-25, expanded 2026-05-28)

- **Brand Personality (5 traits):** Rebellious — Clear — Nordic — Trustworthy — Bold
  - *Rebellious:* Utfordrer etablerte sannheter, tar upopulære standpunkt
  - *Clear:* Komplekse ideer gjort enkle, null konsulentspråk
  - *Nordic:* Demokratisk design, ærlig, intim, jordnær
  - *Trustworthy:* Faglig tyngde, forskningsbasert, transparent
  - *Bold:* Tydelige standpunkt, visuelt mot, uprettensiøs selvsikkerhet
- **Visual Reference:** Apple.com (premium minimal, confident whitespace)
- **Scandinavian Minimal:** Democratic design — accessible to everyone, clear and open, no elitism
- **Media Mix:** Mostly illustrations (GPT Image 2 — Style 2 hero, Style 3 section, Style 1 abstract) + real photos for team/cases
- **Animation (layered framework):**
  - *Layer 1 — Page transitions:* View transitions API for seamless sidebytte (eksisterende)
  - *Layer 2 — Scroll-triggered reveals:* Intersection Observer for fade-in/glide-in ved scrolling
  - *Layer 3 — Micro-interactions:* Hover, focus, active states med `transition` — aldri `opacity` alene for CTA
- **Color Usage:** Sparingly — twin-primary system (hovedakcent + sekundærakcent). Farge for knapper, linker, små highlights kun. Dark mode med egne variabler.
- **GPT Image 2 guidelines:** 16:9, ingen tekst i bildet, skandinavisk minimal, Style 1-3 per bruksområde (`.design/graphics.md`)

### Technical & Documentation (2026-05-26)

- **Design documentation format:** Hybrid JSON + Markdown. Structure (triggers, operations, references) in JSON, prose/templates in Markdown referenced via `$ref`.
- **JSON include mechanism:** `$ref` standard (JSON Reference spec) — e.g. `"$ref": ".design/graphics.json#/prompts"`.
- **opencode.json structure:** `instructions` array with `instructions[0]` = inline triggers/operations (the activation tree), `instructions[1..N]` = `$ref` objects to domain rule files.
- **Trigger location:** Triggers live inline in `instructions[0]` of `.opencode/opencode.json`, not in a separate file. Removes one level of indirection — agents immediately see the activation tree without resolving a `$ref`.
- **GitHub Pages build status:** Was experiencing "Partially Degraded Service" (45min+ build queue). Now recovered — builds complete in ~50s.

## Image Generation Context Requirements

When generating images for N1-N3 and future content, ensure maximum context is known:
- Article content is drafted and approved
- Cross-links and CTAs are finalized
- Design references (`.design/graphics.md`) are current
- Norwegian descriptive alt text is prepared in advance
- Prompts documented in `.design/graphics.md`

---

## Cross-Link Map

| From | To | Text | Context |
|------|----|------|---------|
| `/påvirkning/` → "Maktens kostnader" | `/makt/` | "Les om maktens kostnader →" | Brief paragraph in /påvirkning/ |
| `/struktur/` → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om multiframe-tenkning →" | "No scoring" backing |
| `/mennesker/` → "Verdier og mening" | `/makt/` | Noble cause connects to servant leadership | Core Values expansion |
| `/identitet/` → tribal stages | `/triader/` | "Hvordan bygge triader →" | After Logan's stages |
| `/usikkerhet/` (fremtidig) → Kotter | `/triader/` | "Verktøy for kulturendring: triader →" | After Kotter section |
| All 4 frame articles → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om hvorfor vi ikke scorer →" | Per-frame "no scoring" sentence |

---

## Spec Files to Create/Update

| Spec file | Action | Purpose | Status |
|-----------|--------|---------|--------|
| `.specs/triader/README.md` | ✅ **Created** | Triader article | **Ready for review** |
| `.specs/makt/README.md` | ✅ **Created** | Makt article | **Ready for review** |
| `.specs/perspektiv/README.md` | ✅ **Created** | Perspektiv article | **Ready for review** |
| `.specs/usikkerhet/README.md` | ✅ **Renamed + implemented** | Organisasjonskultur → Usikkerhet. Permalink, frontmatter, cross-refs updated | **Complete** |
| `.specs/grc/README.md` | **Update** | Confirm E1-E6 integration points | Ready |
| `.specs/ledelse-60-2/README.md` | **Update** | Reflect N1-N3 additions, E1-E6 expansions | Ready |
| `.specs/emne/README.md` | **Create** | Tag lookup page `/emne/` — purpose, scope, requirements | Future feature |
| `.specs/i18n/README.md` | **Create** | i18n multilingual support — approach, scope, constraints | Future feature |
| `.specs/inbound-sales/README.md` | ✅ **Created** | Visitor flow mapping, UTM conventions, funnel definitions, event structure | **Ready for review** |
| `.specs/citation-enhancement/README.md` | ✅ **Created** | kramdown footnotes + JSON-LD citations + JS enhancer | Future feature (FF4) |

---

## Image Assets Required

| New article | Image | Style | Notes |
|-------------|-------|-------|-------|
| `/triader/` | Hero banner | Style 2 | Triad concept illustration |
| `/triader/` | Section illustration | Style 3 | Dyad vs. triad stability |
| `/makt/` | Hero banner | Style 2 | Power vs. service tension |
| `/makt/` | Section illustration | Style 3 | Servant vs. self-serving leader |
| `/makt/` | Section illustration | Style 3 | Price of Power continuum |
| `/perspektiv/` | Hero banner | Style 2 | Multiframe thinking |
| `/perspektiv/` | Section illustration | Style 3 | Four frames in use |

All new images must follow `.design/graphics.md` prompt rules:
- No text
- 16:9 aspect ratio
- Scandinavian minimal style
- Norwegian descriptive alt text
- Document prompts in `.design/graphics.md`

---

## Open PRs

No open pull requests. All work to date has been merged.

**Recent merged PRs (most recent first):**

| PR | Branch | What |
|----|--------|------|
| [#52](https://github.com/noexcuse-no/www-public/pull/52) | `feature/backlog-dependency-refinement` | Reorganize backlog by dependency + citation enhancement docs |
| [#51](https://github.com/noexcuse-no/www-public/pull/51) | `feature/design-interview-harmonization` | Design docs: brand personality, twin-primary color, GPT Image 2, layered animation, graphics guide |
| [#50](https://github.com/noexcuse-no/www-public/pull/50) | `feature/layout-system` | Backlog refinement: Phase 6 regressions, Phase 11 design polish, Phase 12, future features |
| [#49](https://github.com/noexcuse-no/www-public/pull/49) | `feature/layout-system` | Fix clanker bug, layout system merge |
| [#48](https://github.com/noexcuse-no/www-public/pull/48) | `main` | Cleanup on all five |
| [#47](https://github.com/noexcuse-no/www-public/pull/47) | `feature/layout-system` | Twin-primary color system, inline SVG logo |
| [#46](https://github.com/noexcuse-no/www-public/pull/46) | `feature/layout-system` | P5 Layout System + Site Review Fixes |

## In Progress

**Current work:** `fix/phase6-regressions-usikkerhet-rename` branch — Phase 6 regressions (✅), 10.1 (✅), Phase 11 D4-D5 (✅), D7-D11+R7-R8 (✅). Uncommitted changes pending PR.

### Phase 11 Remaining (not started)
- **D1, D2, D3** — CSS fixes (header, CTA hover, hero overlay)
- **D6** — Profile scrollbar CSS fix
- **D12-D15** — Profile card redesign (brukertestfunn)
- **page_d.id-002:** `profiles.html` har to `<article>`-elementer uten `data-order`

### Phase 10 Remaining (not started)
- **10.3-10.4** — Hero animation system + parallax-fade
- **10.5** — Profile card redesign (overlapper D12-D15)
- **10.6** — Frontpage profile filter
- **10.7** — Full-width hero
- **10.8-10.10** — Booking direct links, mobil CTA-bredder

### Phase 8 Outstanding
- **P5 Outstanding** — Migrer `_pages/ledelse_*.md` til layout-systemet (avhengig av arkitekturbeslutning)

### Phase 12
- **F6** — Animasjonsimplementering
- **F7** — Fotograf-retningslinjer
- **X1** — Infografikk
- **X2** — Dark mode consistency pass

## Completed

Do not add completed work here, add them to CHANGELOG.md

---

## Future Features (Deferred)

*Features that are acknowledged but not yet scheduled. Requires specification sprint before implementation.*

**FF1 — Tag lookup side `/emne/`**
- **Purpose:** Filtering/search across articles by tag
- **Status:** Future feature, not yet spec'd
- **Dependencies:** None

**FF2 — i18n flerspråklig støtte**
- **Status:** Future feature, not yet spec'd
- **Approach:** Language selection by browser `Accept-Language`, fallback Norwegian, handled in code (not webserver), per Jekyll best practices
- **Dependencies:** None

**FF3 — Nye artikler (Triader, Makt, Perspektiv)**
- **Status:** Moved to **Blocked** section — N1/N2/N3 waiting on article content from user.
- **Reference:** See N1, N2, N3 under Blocked section.

**FF4 — Citation Enhancement (kramdown footnotes + JSON-LD + JS enhancer)**
- **Status:** Spec'd in `.specs/citation-enhancement/README.md`. Design in `.design/citation-enhancement.md`. Not yet scheduled.
- **Dependencies:** Must be implemented across all existing article pages. Best done as part of a content pass.
- **Reference:** `.specs/citation-enhancement/README.md`, `.design/citation-enhancement.md`

**FF4 — Sitatshenvisning / Citation Enhancement**
- **Purpose:** Kramdown native footnotes (`[^ref]`) med JSON-LD `citation`-array i frontmatter, JS-enhancer som injiserer `itemprop`/`itemscope` i kramdowns genererte DOM
- **Status:** Spec + design complete. **Ready for implementation** when prioritized.
- **Dependencies:** Ingen — frittstående arkitektonisk forbedring
- **Reference:** `.specs/citation-enhancement/README.md`, `.design/citation-enhancement.md`

**FF5 — Tre steg-sider for Ledelse 60:2**
- **Purpose:** Separate detail pages for hvert av de tre stegene i Ledelse 60:2 (kartlegging → analyse → tilbakemelding) med egen URL, innhold og CTA. Kan erstatte eller supplere dagens én-side-visning.
- **Status:** Concept only — ikke spec'd. Avventer prioritering.
- **Dependencies:** Ingen, men bør koordineres med CTA-designsystem (se C4)

**FF6 — Multi-product support (moved from Phase 8 P4.1)**
- **Purpose:** Support multiple products beyond Ledelse 60:2
- **Status:** Too vague to spec — needs product positioning decisions first. Avventer Q7 (Katalysator) avklaring.
- **Dependencies:** Q7 Katalysator product positioning

**FF7 — JSON Schema validation (moved from Phase 8 P4.2)**
- **Purpose:** Validate frontmatter/data YAML against JSON Schema
- **Status:** Too vague to spec — needs concrete validation requirements and tooling decisions
- **Dependencies:** None explicit, but needs spec sprint

## Blocked

*Items that cannot proceed without user input or dependency completion. Each entry defines its unblock condition.*

### N1 — Triader (article content)
- **Goal:** Write `_pages/ledelse_triader.md` — triads as structural tool for resilient teams
- **Spec:** ✅ `.specs/triader/README.md` complete
- **Images needed:** 1 hero banner (Style 2), 2 section illustrations (Style 3)
- **Unblock condition:** User provides/dictates article content. Images (F5) are downstream of content.
- **Reference:** `.specs/triader/README.md`

### N2 — Makt eller tjeneste (article content)
- **Goal:** Write `_pages/ledelse_makt.md` — power vs. servant leadership spectrum
- **Spec:** ✅ `.specs/makt/README.md` complete
- **Images needed:** 1 hero banner (Style 2), 2-3 section illustrations (Style 3)
- **Unblock condition:** User provides/dictates article content. Images (F5) are downstream of content.
- **Reference:** `.specs/makt/README.md`

### N3 — Fire perspektiver (article content)
- **Goal:** Write `_pages/ledelse_perspektiv.md` — multiframe thinking as leadership skill
- **Spec:** ✅ `.specs/perspektiv/README.md` complete
- **Images needed:** 1 hero banner (Style 2), 1-2 section illustrations (Style 3)
- **Unblock condition:** User provides/dictates article content. Images (F5) are downstream of content.
- **Reference:** `.specs/perspektiv/README.md`

### F5 — Bildegenerering (image generation)
- **Goal:** Generate N1-N3 images using updated `.design/graphics.md` guidelines
- **Dependency:** N1, N2, N3 article content must be drafted and approved first (per Image Generation Context Requirements: «Article content is drafted and approved»)
- **Unblock condition:** N1, N2, N3 content complete and approved.
- **Reference:** `.design/graphics.md` (Style 2/3 guidelines, prompt templates)

### C1 — Customer Case Planning & Discovery
- **Goal:** Define what makes a compelling case for target audience. Update `.specs/cases/README.md`
- **Unblock condition:** Brainstorm session with user — what questions must a case answer? What objections must it overcome?
- **Blocks:** C2, C3, C4 downstream.

### C2 — Customer Case Intake Form
- **Goal:** Write `.design/case-intake-form.md` — human-facing form for consultants to gather case data
- **Dependency:** C1 must complete first to define case structure and required data fields
- **Unblock condition:** C1 completed (case structure defined), then spec work can proceed.

### C3 — Case Presentation Design
- **Goal:** Design case layout, typography, photo placement, quote treatment. Update `.design/components.md`
- **Dependency:** C1 (content structure) + C2 (what data exists)
- **Unblock condition:** C1 and C2 completed.

### C4 — Visitor Flow / Inbound Sales Journey
- **Goal:** Map entry points → case exposure → CTA progression.
- **Dependency:** Cases are placed at specific journey stages — needs C1-C3 foundations first.
- **Unblock condition:** C1, C2, C3 completed.
- **Reference:** `.specs/inbound-sales/README.md`, `.specs/cta-design/README.md`

### Q7 — Katalysator (product)
- **Goal:** Define and build Katalysator product positioning
- **Unblock condition:** Deferred to June 2026. User availability for iterative research + brainstorming session. Product positioning decision.
- **Reference:** `.specs/shared/product-katalysator.txt`
