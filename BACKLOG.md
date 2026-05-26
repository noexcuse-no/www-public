# BACKLOG

All planned tasks and work-in-progress are tracked here.
Design for all tasks shall always follow the .design rules.
Details shall be described under .spec before work initiation.
Completed tasks are tracked in CHANGELOG.md and should not appear here.

---

## Execution Order (Refined 2026-05-25)

Following the design interview and health survey, tasks are grouped into phases that respect dependencies and maximize visible progress.

### Phase 0 — Health & Quality Sprint

*Prerequisite for all other work. Fixes broken tooling and immediate quality issues.*

- [ ] **H1:** Restore missing lint/test tooling (`npm install`)
- [ ] **H2:** Fix eslint error (add newline to `dark-mode-toggle.js`)
- [ ] **H3:** Add `<meta name="description">` to `_layouts/default.html` with page-specific fallback
- [ ] **H4:** Create `/avtale/` landing page or redirect (currently links to raw PDF)
- [ ] **H5:** Run full lint suite after H1 to catch any hidden issues

### Phase 1 — Quick Wins (Language & Quality)

*Immediate gratification. No specs needed, low risk, high polish.*

- [ ] **Q1:** Fiks "høy fleksibel" → "høye fleksible"
  - **File:** `_pages/om_metode.md:37`
- [ ] **Q2:** Fiks "stimulus" → "stimulere"
  - **File:** `_pages/ledelse_struktur.md:59`
- [ ] **Q3:** Erstatt "maser" med "proklamerer"
  - **Files:** `_pages/ledelse-60-2.md:66`, `_pages/ledelse_60-2.md:66`
- [ ] **Q4:** Fjern duplikat JSON-LD description
  - **File:** `_pages/om_oss.md`
  - **Keep:** Line 8. **Remove:** Line 15.
- [ ] **Q5:** Legg til sitering for Logan-prosentandelene
  - **File:** `_pages/ledelse_usikkerhet.md:56-71`
- [ ] **Q6:** Myk opp "forskning" → "kunnskapsproduksjon"
  - **File:** `_pages/om_metode.md`

### Phase 2 — Foundation (Architecture)

*Must happen before new articles to avoid double work.*

**PA1 — Perspektiv Articles Architecture**

See `.specs/ledelse-60-2/perspektiv-articles.md` for full specification.

- [ ] **PA1.1:** Create `_frames/` collection with frontmatter for all 4 perspektiv articles
- [ ] **PA1.2:** Create `_layouts/perspektiv.html` layout rendering all sections from frontmatter
- [ ] **PA1.3:** Extract embedded CSS → `_includes/perspektiv-styles.css`
- [ ] **PA1.4:** Rewrite 4 article pages as lightweight content files using new layout
- [ ] **PA1.5:** Rename images `frame-X.png` → `perspektiv-X.png`
- [ ] **PA1.6:** Update CSS class names `.frame-*` → `.perspektiv-*`
- [ ] **PA1.7:** Update all internal cross-references (links, image paths, class names)
- [ ] **PA1.8:** Update `.specs/ledelse-60-2/README.md` Frame Articles section to reflect new architecture

---

### Phase 3 — Content Core (Critical Rewrites)

*Specs exist, ready for implementation.*

See `.specs/grc/README.md`, `.specs/generativ-ki/README.md`, `.specs/organisasjonskultur/README.md` for full specifications.

- [ ] **C1:** Veve GRC inn i eksisterende artikler
  - **Spec:** `.specs/grc/README.md`
  - **Approach:** Extend, don't replace. 1-2 sentences per article.
  - **Target:** `/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`, `/tillit/`, `/forankring/`
  - **GRC mapping:**
    - Governance → Påvirkningsperspektivet (maktfordeling, beslutningsautoritet)
    - Risk → `/usikkerhet/` + benefit-future
    - Compliance → Strukturperspektivet (roller, ansvar, regler, ISO-erfaring)

- [ ] **C2:** Skriv om `/generativ-ki/` til AI-ledelse + OKR/KPI
  - **Spec:** `.specs/generativ-ki/README.md`
  - **File:** `_pages/ledelse_generativ-ki.md`
  - **Keep URL:** `/generativ-ki/`
  - **Direction:** AI leadership skills + OKR/KPI for measuring AI-assisted work

- [ ] **C3:** Legg til Kotter 8-stegs endringsmodell i `/usikkerhet/`
  - **Spec:** `.specs/organisasjonskultur/README.md`
  - **File:** `_pages/ledelse_usikkerhet.md`
  - **Start:** Detailed (shorten later)

---

### Phase 4 — New Articles

*Specs to be created tomorrow (2026-05-26). Implementation after spec review.*

See `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md` (to be created).

**N1 — Triader**
- **New file:** `_pages/ledelse_triader.md`
- **URL:** `/triader/`
- **Source:** Logan, King & Fischer-Wright — *Tribal Leadership* (2011)
- **Spec:** Create `.specs/triader/README.md`
- **Content:** Triads as structural tool, dyad vs. triad stability, formation steps, warning signs
- **Design:** Style 3 (Section Illustration) for inline illustrations, Style 2 for hero
- **Cross-links:** From `/identitet/` and `/usikkerhet/`
- **Images needed:** 1 hero banner (Style 2), 2 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2

**N2 — Makt eller tjeneste**
- **New file:** `_pages/ledelse_makt.md`
- **URL:** `/makt/`
- **Source:** Pfeffer (*Power*, 2010) ↔ Blanchard & Barrett (*Lead with LUV*, 2011) — tension pair from synthesis.md
- **Spec:** Create `.specs/makt/README.md`
- **Content:** The central diagnostic tension: power acquisition vs. servant leadership. Pfeffer side + Blanchard side + spectrum. Includes full "The Price of Power" subsection.
- **Design:** Style 2 for hero, Style 3 for section illustrations
- **Cross-links:** To `/påvirkning/` (brief Price of Power there), to `/mennesker/` (servant leadership)
- **Images needed:** 1 hero banner (Style 2), 2-3 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2

**N3 — Fired perspektiver**
- **New file:** `_pages/ledelse_perspektiv.md`
- **URL:** `/perspektiv/`
- **Source:** Bolman & Deal Ch.16 — "Integrating the Frames"
- **Spec:** Create `.specs/perspektiv/README.md`
- **Content:** Multiframe thinking as the actual leadership skill. Why single-frame thinking fails. "No scoring" philosophical backing grounded in Bolman + Hubbard + Logan.
- **Design:** Style 2 for hero, Style 3 for section illustrations
- **Cross-links:** To all four perspektiv articles ("no scoring" backing in each frame's reference section)
- **Images needed:** 1 hero banner (Style 2), 1-2 section illustrations (Style 3)
- **CTA:** Links to Ledelse 60:2

---

### Phase 5 — Existing Article Expansions

*Depends on N1-N3 existing. Order: E1 → E2/E3 → E4 → E5 → E6.*

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
- **Design:** Split as specified; no new images for /påvirkning/ expansion

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
| `/identitet/` | Logan | "Logan beskriver kulturstadier som beskrivende — ikke normative. Ledelse 60:2 identifiserer где organisasjonen er, ikke hvor den bør være." |

---

### Phase 6 — UI Upgrade

*Specs and design docs already exist. Implementation after content is stable.*

See `.specs/ui-upgrade/README.md` (functional), `.design/ui-upgrade.md` (visual).

**U1 — CSS Animation Architecture**
- **Spec:** `.specs/ui-upgrade/README.md` §1
- **Design:** `.design/ui-upgrade.md` §1
- **Files:** `assets/css/animations.css`, `assets/scripts/animations.js`
- **Content:** Scroll-triggered fadeInUp/slideInLeft via Intersection Observer, stagger pattern, reduced-motion support

**U2 — Article Hero Overlay**
- **Spec:** `.specs/ui-upgrade/README.md` §2
- **Design:** `.design/ui-upgrade.md` §2
- **Files:** `assets/css/article.css`
- **Content:** Title text overlaid on banner image with gradient overlay, breadcrumb above gradient
- **Target pages:** `/ledelse-60-2/`, `/om-oss/`, `/tillit/`, `/usikkerhet/`, `/struktur/`, `/mennesker/`, `/påvirkning/`, `/identitet/`, `/forankring/`

**U3 — Typography Unification**
- **Spec:** `.specs/ui-upgrade/README.md` §3
- **Design:** `.design/ui-upgrade.md` §3
- **Files:** `assets/css/typography.css`
- **Content:** Complete h2/h3 sizes, body line-height 1.7, reading width 65ch, consistent heading margins

**U4 — Landing Page Hero Gradient**
- **Spec:** `.specs/ui-upgrade/README.md` §4
- **Design:** `.design/ui-upgrade.md` §4
- **Files:** `assets/css/products.css`, `assets/css/about.css`
- **Content:** Bottom gradient on hero images transitioning to background color

**U5 — Button & Card Micro-interactions**
- **Spec:** `.specs/ui-upgrade/README.md` §5
- **Design:** `.design/ui-upgrade.md` §5
- **Files:** `assets/css/products.css`, `assets/css/article.css`
- **Content:** translateY(-2px) lift + shadow on hover for CTAs, translateY(-4px) for cards

**U6 — Scroll-Triggered Content Animations**
- **Spec:** `.specs/ui-upgrade/README.md` §6
- **Design:** `.design/ui-upgrade.md` §6
- **Content:** Staggered entrance for .frame-section, .frame-challenges, .frame-questions, landing grids

**U7 — Dark Mode Finalization**
- **Spec:** `.specs/ui-upgrade/README.md` §7
- **Design:** `.design/ui-upgrade.md` §8
- **Files:** `assets/css/styles-dark.css`
- **Content:** Dark variants for all new overlay and card components

---

### Phase 7 — Assets & Performance

*Batch operations after all content and UI work is done.*

**Image Optimization**

See `.specs/image-optimization/README.md` and `.design/graphics.md` §Image Resize Guidelines.

Convert all PNG images to WebP format with appropriate resizing for web performance.

- [ ] **IMG1:** Create `.design/graphics/originals/` directory structure
- [ ] **IMG2:** Copy all 44 PNG files to `.design/graphics/originals/` preserving folder structure
- [ ] **IMG3:** Convert banners (32 files) — 1920×1080 max, quality 85
- [ ] **IMG4:** Convert icons (9 files) — 512×512 max, quality 85
- [ ] **IMG5:** Convert hero/illustration images — 1920×1080 max, quality 85
- [ ] **IMG6:** Convert logo files (2 files) — 400×400 max, quality 85
- [ ] **IMG7:** Convert profile photos (1 file) — 400×400 max, quality 85
- [ ] **IMG8:** Delete original PNG files from `assets/images/`
- [ ] **IMG9:** Update `.design/graphics.md` with resize guidelines section

**SEO Foundation**

See `.specs/seo/README.md` for full specification.

- [ ] **S1:** Generate comprehensive sitemap.xml with all pages, products, profiles
- [ ] **S2:** Add canonical URLs to metadata.html
- [ ] **S3:** Implement page-specific meta description fallback
- [ ] **S4:** Update robots.txt with sitemap reference
- [ ] **S5:** Create site.webmanifest (PWA manifest)
- [ ] **S6:** Add BreadcrumbList JSON-LD to all pages
- [ ] **S7:** Add FAQPage schema to /tillit/ and relevant content pages

---

### Phase 8 — Architecture Debt

*Cleanup and component extraction. Lower priority than visible content.*

**P1 — Phase 1: Cleanup & Foundation**
- [ ] P1.1: Dead code removal
- [ ] P1.2: CSS variable unification
- [ ] P1.3: Frontmatter defaults

**P2 — Phase 2: Component Extraction**
- [ ] P2.1: Navigation from data
- [ ] P2.2: Extract inline CSS/JS
- [ ] P2.3: Image include adoption

**P3 — Phase 3: Architecture Improvements**
- [ ] P3.1: Plugin integration
- [ ] P3.2: Layout conditional includes
- [ ] P3.3: Reusable CTA component
- [ ] P3.4: Profile JS consolidation

**P4 — Phase 4: Future-Proofing**
- [ ] P4.1: Multi-product support
- [ ] P4.2: JSON Schema validation

---

## Blocked

- **Q7 — Katalysator:** Behold som planlagt funksjon. **blocked:** Deferred to June 2026. Iterative research + brainstorming session required before any implementation.
  - **Reference:** `.specs/shared/product-katalysator.txt`
  - **Dependencies:** User availability for brainstorming, product positioning decision

- **N1-N3 Specs:** `.specs/triader/README.md`, `.specs/makt/README.md`, `.specs/perspektiv/README.md` creation **blocked:** Deferred to tomorrow (2026-05-26). Requires focused spec-writing session before implementation can begin.

---

## Design Decisions (2026-05-25)

Results from design interview for future reference:

- **Brand Personality:** Rebellious, Clear, Nordic
- **Visual Reference:** Apple.com (premium minimal, confident whitespace)
- **Scandinavian Minimal:** Democratic design — accessible to everyone, clear and open, no elitism
- **Media Mix:** Mostly illustrations + real photos for team/cases
- **Animation:** Expressive and memorable (page transitions, bold micro-interactions)
- **Color Usage:** Sparingly — accent color for buttons, links, small highlights only

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
| `/usikkerhet/` → Kotter | `/triader/` | "Verktøy for kulturendring: triader →" | After Kotter section |
| All 4 frame articles → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om hvorfor vi ikke scorer →" | Per-frame "no scoring" sentence |

---

## Spec Files to Create/Update

| Spec file | Action | Purpose | Status |
|-----------|--------|---------|--------|
| `.specs/triader/README.md` | **Create** | Triader article: concept, mechanics, formation, cross-links | **Blocked: tomorrow** |
| `.specs/makt/README.md` | **Create** | Makt article: Pfeffer vs. Blanchard tension, Price of Power full | **Blocked: tomorrow** |
| `.specs/perspektiv/README.md` | **Create** | Perspektiv article: multiframe thinking, "no scoring" backing | **Blocked: tomorrow** |
| `.specs/organisasjonskultur/README.md` | **Update** | Add Kotter 8-step + "organisert anarki" integration | Ready |
| `.specs/grc/README.md` | **Update** | Confirm E1-E6 integration points | Ready |
| `.specs/ledelse-60-2/README.md` | **Update** | Reflect N1-N3 additions, E1-E6 expansions | Ready |

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

## In Progress

## Completed

Do not add completed work here, add them to CHANGELOG.md
