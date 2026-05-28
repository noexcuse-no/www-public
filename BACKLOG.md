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

*Specs created 2026-05-26. Implementation after spec review.*

See `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md`.

**N1 — Triader** ✅ Spec complete
- **New file:** `_pages/ledelse_triader.md`
- **URL:** `/triader/`
- **Source:** Logan, King & Fischer-Wright — *Tribal Leadership* (2011)
- **Spec:** ✅ `.specs/triader/README.md` created
- **Content:** Triads as structural tool, dyad vs. triad stability, formation steps, warning signs
- **Design:** Style 3 (Section Illustration) for inline illustrations, Style 2 for hero
- **Cross-links:** From `/identitet/` and `/usikkerhet/`
- **Images needed:** 1 hero banner (Style 2), 2 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2
- **Status:** Spec complete. **Blocked:** Images + content draft needed.

**N2 — Makt eller tjeneste** ✅ Spec complete
- **New file:** `_pages/ledelse_makt.md`
- **URL:** `/makt/`
- **Source:** Pfeffer (*Power*, 2010) ↔ Blanchard & Barrett (*Lead with LUV*, 2011) — tension pair from synthesis.md
- **Spec:** ✅ `.specs/makt/README.md` created
- **Content:** The central diagnostic tension: power acquisition vs. servant leadership. Pfeffer side + Blanchard side + spectrum. Includes full "The Price of Power" subsection.
- **Design:** Style 2 for hero, Style 3 for section illustrations
- **Cross-links:** To `/påvirkning/` (brief Price of Power there), to `/mennesker/` (servant leadership)
- **Images needed:** 1 hero banner (Style 2), 2-3 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2
- **Status:** Spec complete. **Blocked:** Images + content draft needed.

**N3 — Fire perspektiver** ✅ Spec complete
- **New file:** `_pages/ledelse_perspektiv.md`
- **URL:** `/perspektiv/`
- **Source:** Bolman & Deal Ch.16 — "Integrating the Frames"
- **Spec:** ✅ `.specs/perspektiv/README.md` created
- **Content:** Multiframe thinking as the actual leadership skill. Why single-frame thinking fails. "No scoring" philosophical backing grounded in Bolman + Hubbard + Logan.
- **Design:** Style 2 for hero, Style 3 for section illustrations
- **Cross-links:** To all four perspektiv articles ("no scoring" backing in each frame's reference section)
- **Images needed:** 1 hero banner (Style 2), 1-2 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2
- **Status:** Spec complete. **Blocked:** Images + content draft needed.

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

### Phase 6 — Regression Fixes

*Content regressions introduced during Phase 7 scroll-animation and SEO work.*

**R1 — `_pages/ledelse_forankring.md` trunkert**
- **Problem:** CTA-seksjonen er kuttet midt i `<h2>` — mangler brødtekst, to CTA-knapper, avsluttende `</section>`, og 4 fotnotereferanser
- **Årsak:** Commit `d1d6ac5` — filen gikk fra 315 → 106 linjer
- **Fix:** Gjenopprett CTA-innhold fra historisk commit, legg til fotnoter, lukk åpne `<sup>`-tagger

**R2 — `_pages/ledelse_usikkerhet.md` feil permalink og navn**
- **Problem:** `permalink: /organisasjonskultur/` skal være `/usikkerhet/`
- **Scope:** Permalink, frontmatter, JSON-LD, 12 åpne `<sup>`-tagger
- **Kryssreferanser:** `_products/ledelse-60-2.md:32`, `_pages/ledelse_60-2.md:78`

**R3 — `_pages/ledelse_tillit.md` nestede `<sup>`-tagger**
- **Problem:** Linje 115: 5 `<sup>` nestet uten `</sup>`
- **Årsak:** Commit `90f39cc`
- **Fix:** Separer til korrekt `<sup>...</sup>` per sitat, lukk alle 11 åpne `<sup>`

**R4 — `_pages/ledelse_generativ-ki.md` mangler `</sup>`**
- **Problem:** Én åpen `<sup>` på linje 90 (Hubbard-sitat)
- **Fix:** Legg til `</sup>`

**R5 — Alle `<sup class="citation">` mangler `</sup>`**
- **Gjennomgående problem:** Ingen `</sup>` finnes — etterfølgende tekst blir hevet skrift
- **Scope:** Alle `_pages/ledelse_*.md`-filer

**R6 — Kryssreferanser til `/organisasjonskultur/`**
- **Scope:** `_pages/ledelse_60-2.md`, `_products/ledelse-60-2.md`
- **Fix:** Oppdater til `/usikkerhet/`

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

**P4 — Phase 4: Future-Proofing**
- [ ] P4.1: Multi-product support
- [ ] P4.2: JSON Schema validation

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

**10.1 — Rename `/organisasjonskultur/` → `/usikkerhet/`**
- **Action:** Update permalink in `_pages/ledelse_usikkerhet.md`, cross-references in `_pages/ledelse_60-2.md` and `_products/ledelse-60-2.md`
- **Scope:** Content fix — URL change + cross-link updates
- **No blockers**

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

---

### Phase 11 — Design Polish (P5 User Testing Findings)

*Brukertestfunn fra P5 som ble dokumentert i forrige sesjon. Krever ingen nye designbeslutninger — avklaringene er allerede gjort.*

**D1 — Header-bakgrunn skal være konstant**
- **Problem:** Header-bakgrunn endrer seg med tema. I dark mode blir logoen usynlig
- **Vedtak:** Header alltid `#003060` (mørk marine) i begge tema. Logo alltid `#F0FFFF` (azur)
- **Scope:** `assets/css/colors.css`, `assets/css/styles-light.css`, `assets/css/styles-dark.css`, `assets/css/header.css`

**D2 — CTA hover-effekter: opacity → fargeoverganger**
- **Problem:** CTA-knapper bruker `opacity` + `translateY` for hover — skal bruke fargeoverganger (type A/B)
- **Vedtak:** Type A (azur på marine + azur outline), Type B (marine på azur + marine outline). Hover: bytt bakgrunns- og tekstfarge
- **Scope:** `assets/css/products.css`, `assets/css/article.css`, `_includes/cta.html`

**D3 — Hero text overlay på bannerbilder**
- **Problem:** Site title + description mangler CSS text overlay med bakgrunnsstyling for lesbarhet på bannerbilder
- **Scope:** CSS i layout-systemet + eventuell template-endring

**D4 — Profil-tagger formatering**
- **Problem:** `{{ profile.tags }}` rendres som rå tekst uten spacing
- **Fix:** Bruk Liquid `| split` + `| join` eller loop med proper spacing
- **Scope:** `_includes/profiles.html`

**D5 — Dagfinn mangler `title`-felt**
- **Problem:** `_profiles/dagfinn.md` mangler `title: "Daglig leder"`, vises ikke på profil-kort
- **Scope:** `_profiles/dagfinn.md`, `_includes/profiles.html`

**D6 — Profildetaljer: unødvendig scrollbar**
- **Problem:** Scrollbar vises ved første lass i profildetalj-visning
- **Scope:** `assets/css/profiles.css`

---

## Design Decisions

### Brand & Visual (2026-05-25)

- **Brand Personality:** Rebellious, Clear, Nordic
- **Visual Reference:** Apple.com (premium minimal, confident whitespace)
- **Scandinavian Minimal:** Democratic design — accessible to everyone, clear and open, no elitism
- **Media Mix:** Mostly illustrations + real photos for team/cases
- **Animation:** Expressive and memorable (page transitions, bold micro-interactions)
- **Color Usage:** Sparingly — accent color for buttons, links, small highlights only

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
| `.specs/organisasjonskultur/README.md` | **Rename to usikkerhet** | Organisasjonskultur → Usikkerhet. Add Kotter 8-step + "organisert anarki" | Ready |
| `.specs/grc/README.md` | **Update** | Confirm E1-E6 integration points | Ready |
| `.specs/ledelse-60-2/README.md` | **Update** | Reflect N1-N3 additions, E1-E6 expansions | Ready |
| `.specs/emne/README.md` | **Create** | Tag lookup page `/emne/` — purpose, scope, requirements | Future feature |
| `.specs/i18n/README.md` | **Create** | i18n multilingual support — approach, scope, constraints | Future feature |

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

| PR | Branch | Status | What |
|----|--------|--------|------|
| [#42](https://github.com/noexcuse-no/www-public/pull/42) | `fix/perspektiv-frame-lookup` | ✅ **Merged** | Explicit `frame_id` frontmatter for perspektiv pages |
| [#43](https://github.com/noexcuse-no/www-public/pull/43) | `refactor/architecture-debt` | ✅ **Merged** | Phase 8 P1-P3 + Phase 9 rules restructuring |
| [#44](https://github.com/noexcuse-no/www-public/pull/44) | `refactor/architecture-debt` | ✅ **Merged** | Layout refactor, testing/deploy rules, design docs |
| [#46](https://github.com/noexcuse-no/www-public/pull/46) | `feature/layout-system` | 🟡 **Open** | P5 layout system, Fix 7/8/13, logo dark mode |
| [#47](https://github.com/noexcuse-no/www-public/pull/47) | `feature/layout-system` | 🟡 **Open** | Twin-primary color system, inline SVG logo |

## In Progress

### P5 — Layout System (`feature/layout-system`)
- [x] P5.1: Design document — `.design/layouts.md`
- [x] P5.2: CSS implementation — `.container`, `.section`, `.grid`, `.flex-*` i `layout.css`
- [x] P5.3: Template migration — perspektiv.html, products.html, profiles.html
- [x] P5.4: Cleanup — fjern dupliserte `max-width`/`padding` fra komponent-CSS
- [ ] **Outstanding:** Migrer `_pages/ledelse_*.md` artiklene fra `frame-`-klasser til layout-systemet (Phase 6 R1-R5, Phase 11 D1-D6 må løses først)

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
- **Status:** Specs complete. **Blocked on:** images + content draft needed
- **Reference:** `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md`

## Blocked

- **Q7 — Katalysator:** Behold som planlagt funksjon. **blocked:** Deferred to June 2026. Iterative research + brainstorming session required before any implementation.
  - **Reference:** `.specs/shared/product-katalysator.txt`
  - **Dependencies:** User availability for brainstorming, product positioning decision
