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

### CSS Classes (F7)

The 4-tier system is implemented via the following CSS classes in `assets/css/components/illustrations.css`:

| Tier | CSS Class | Key Properties |
|------|-----------|----------------|
| T1 | `.hero-image img` | Full-width, `object-fit: cover`, `min-height: 60vh` |
| T2 | `.framework-illustration` | `max-width: 800px`, centered (`margin-inline: auto`), `margin-block: 2rem` |
| T3 | `.section-illustration` | `max-width: 400px`, centered; float variants `--float-left`/`--float-right` |
| T4 | `.micro-illustration` | `width: 80px`, `height: 80px`, inline-block |

The naming convention `{page-id}-{tier}-{concept}.webp` applies uniformly across all page types. All generated images are placed in `assets/images/banners/`.

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
| `banners/hero-perspektiv.webp` | "Four abstract silhouettes in an open Nordic landscape, bright white/light gray background — one figure holds a rock up in their hand, the rock is colored in splashes of deep navy blue, golden yellow, hunter green and deep wine — the other three gather around looking at it — each figure wears glasses tinted in their perspective color: deep navy, golden yellow, hunter green, deep wine — flat vector illustration, minimalist Nordic style, 16:9, no text, no faces visible" |
| `banners/grc-t1-hero.webp` | "Four abstract human silhouettes paused on a mountain ridge in a Nordic landscape, bright white/light gray background — one holds a compass and studies a map (governance), one gazes toward dark clouds gathering ahead with a hand shielding their eyes (risk), one opens a reference book comparing it to the trail (compliance), one stands ready — cool Nordic color palette with azure (#F0FFFF) accent in the light, flat vector illustration, minimalist Nordic style, 16:9, no text, no faces visible" |
| NOTE: Both images were regenerated 2026-06-08 — migrated from Style 2 (abstract geometric) to Style 1 (figurative silhouettes in Nordic landscape). Perspektiv: 3rd generation (4K, style reference from GRC). GRC: 2nd generation (4K). Previous prompts had "high resolution 4K" which triggered photorealism. Current prompts use "flat vector illustration" + "minimalist Nordic style" for consistent vector aesthetic. |

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
| `NOTE: banners/hero-perspektiv.webp and banners/grc-t1-hero.webp were migrated to Style 1 on 2026-06-08 — see Style 1 table above.` |

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
| `banners/grc-t2-four-perspectives-grc.webp` | "Clean minimal infographic showing four perspectives framework mapped to GRC governance domains, a 2x2 grid with four interconnected panels each representing one leadership perspective connected to a GRC dimension, structure to compliance, humans to culture, influence to governance, identity to purpose, Scandinavian design style, azure blue and navy blue color palette, modern corporate illustration, no text, high resolution" |
| `banners/grc-t2-ledelse60-2-grc-enabler.webp` | "Clean minimal infographic showing how leadership assessment enables GRC maturity, a process flow with input from four leadership perspectives feeding into improved governance risk and compliance outcomes, arrows flowing from input to output, Scandinavian design style, azure blue and navy blue color palette, modern corporate illustration, no text, high resolution" |
| `banners/grc-t3-informasjonssikkerhet.webp` | "Clean minimal infographic showing information security and cyber resilience, a shield with layered protection rings surrounded by abstract security elements, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/grc-t3-miljo.webp` | "Clean minimal infographic showing environment sustainability and social responsibility, a leaf shape combined with a globe suggesting environmental governance, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/grc-t3-kvalitet.webp` | "Clean minimal infographic showing quality management and continuous improvement, a gear mechanism combined with a compass suggesting systematic quality and direction, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |

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
| `banners/spot-mennesker-verdier-og-mening.webp` | "Infographic spot illustration, abstract Scandinavian minimal style, golden yellow (#D4A836) and deep blue (#003060) color palette, small icon representing values and meaning — a compass or north star symbol pointing upward, surrounded by subtle radiating lines suggesting guidance and direction, clean lines, flat design style, no text, simple and elegant composition suitable for a small 80x80px spot illustration" |
| `banners/spot-pavirkning-makt.webp` | "Clean minimal infographic showing power and influence dynamics, network connections, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-nettverk.webp` | "Clean minimal infographic showing organizational networks and relationships, connected nodes, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-interesser.webp` | "Clean minimal infographic showing competing interests and agendas, opposing forces in balance, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-pavirkning-hvorfor-pavirkning-betyr-noe.webp` | "Clean minimal infographic showing leadership influence and political landscape awareness, map with highlighted paths, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-verdier.webp` | "Clean minimal infographic showing organizational values, layered shapes building upward, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-ritualer.webp` | "Clean minimal infographic showing workplace rituals and traditions, repeating circular patterns, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-fortelling.webp` | "Clean minimal infographic showing storytelling and organizational narrative, flowing connected shapes, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |
| `banners/spot-identitet-lederverdi.webp` | "Clean minimal infographic showing cultural maturity and identity development, ascending levels, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text" |

### Article Illustrations (Style 3 variant — R16)

**Use for:** Article inline images for Makt and Triader pages, generated as part of R16.

**Documented prompts — Makt (7 images):**

| File | Prompt |
|------|--------|
| `banners/makt-t2-power-service-spectrum.webp` | "Clean minimal infographic showing a horizontal spectrum from power to service in leadership, structured geometric forms on left side transitioning to open welcoming organic forms on right side, balanced central axis, abstract representation of leadership culture spectrum, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/makt-t3-power-side.webp` | "Clean minimal infographic showing power and decision-making capacity in organizations, strong geometric shapes radiating outward suggesting influence and action, centralized authority figure, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/makt-t3-service-side.webp` | "Clean minimal infographic showing servant leadership and service-oriented culture, open hands and supporting shapes suggesting trust and growth, people-centric organizational design, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/makt-t4-time-cost.webp` | "Clean minimal infographic showing time and opportunity cost in organizations, clock face with arrows pointing outward in different directions, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution, square format" |
| `banners/makt-t4-judgment.webp` | "Clean minimal infographic showing corrupted judgment and cognitive bias in leadership, brain shape with distortion lines radiating outward, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution, square format" |
| `banners/makt-t4-psychological.webp` | "Clean minimal infographic showing psychological toll and isolation of leadership, single human figure separated from others by a gap, loneliness metaphor, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution, square format" |
| `banners/makt-t4-relationship.webp` | "Clean minimal infographic showing relationship costs and broken trust in organizations, broken connection line between two abstract shapes, severed relationship, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution, square format" |

**Documented prompts — Triader (13 images):**

| File | Prompt |
|------|--------|
| `banners/triader-t2-dyad-vs-triad.webp` | "Clean minimal infographic comparing dyad versus triad relationship structures in organizations, left side showing two connected nodes with a vulnerability symbol, right side showing three interconnected nodes forming a stable triangle with redundancy arrows, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-no-control.webp` | "Clean minimal infographic showing three interconnected nodes in a stable triangle, each node equally connected to the other two, no single point of control, distributed network, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-information-flow.webp` | "Clean minimal infographic showing information flowing through three different pathways between three connected nodes, arrows moving in multiple directions suggesting redundancy and resilience, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-conflict-resolution.webp` | "Clean minimal infographic showing conflict resolution through third-party perspective in a triad, two opposing arrow shapes with a third balancing circle in center mediating between them, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-resilience.webp` | "Clean minimal infographic showing organizational resilience against employee turnover in a triad, three connected nodes with one fading out while the other two remain solidly connected, stability through redundancy, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-project-triad.webp` | "Clean minimal infographic showing project triad with three distinct organizational roles, sponsor as money node, project leader as coordination node, expert as quality node, all three interconnected in an equilateral triangle, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-mentor-triad.webp` | "Clean minimal infographic showing mentor triad in organizations, mentor figure guiding both mentee and colleague in a shared learning circle, triangular knowledge-sharing relationship, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-leadership-triad.webp` | "Clean minimal infographic showing leadership triad with three complementary roles, operational gear symbol, strategic compass symbol, cultural heart symbol, all three connected in a balanced triangle, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t3-bridge-triad.webp` | "Clean minimal infographic showing bridge-building triad connecting two separate organizational departments, bridge shape spanning between two silos with a third person acting as connector, breaking down silos, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/triader-t4-triangulation.webp` | "Clean minimal infographic showing toxic triangulation in organizations, two connected nodes with a third node excluded outside the connection, broken incomplete triangle, Scandinavian design style, warm gray and white color palette, modern corporate illustration, no text, square format" |
| `banners/triader-t4-ganging-up.webp` | "Clean minimal infographic showing two people aligned against a third in an organization, two solid arrows pointing together at an isolated single figure, exclusion dynamics, Scandinavian design style, warm gray and white color palette, modern corporate illustration, no text, square format" |
| `banners/triader-t4-power-hoarding.webp` | "Clean minimal infographic showing power concentration in a triad, central hub figure controlling all connections with two spokes kept separate from each other, hub and spoke structure, Scandinavian design style, warm gray and white color palette, modern corporate illustration, no text, square format" |
| `banners/triader-t4-no-reciprocity.webp` | "Clean minimal infographic showing imbalanced triad where one person only receives without giving back, two nodes giving energy to third that gives nothing, one-way arrows only, unequal exchange, Scandinavian design style, warm gray and white color palette, modern corporate illustration, no text, square format" |

### Frame Challenge Micros (Style 3 — R17)

**Use for:** T4 (80×80px) micro images for each challenge card on the four frame pages.

**Style signature:**
- "Clean minimal infographic"
- "Scandinavian design style"
- "modern corporate illustration"
- Frame-specific accent color (navy blue / golden yellow / deep wine / hunter green)
- "no text, square format"

**Documented prompts:**

| File | Prompt |
|------|--------|
| `banners/struktur-t4-role-clarification.webp` | "Clean minimal infographic showing role ambiguity in a leadership team, two overlapping circles each with a question mark, organizational structure context, unclear boundaries, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/struktur-t4-goal-conflict.webp` | "Clean minimal infographic showing goal conflict between two departments, two arrows pulling in opposite directions connected to the same central target, misalignment, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/struktur-t4-coordination.webp` | "Clean minimal infographic showing coordination breakdown between teams, three separate gears that don't mesh together, misaligned cogs, organizational friction, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/struktur-t4-bureaucracy.webp` | "Clean minimal infographic showing bureaucratic overhead, stack of paper forms with red tape wrapped around, process burden, administrative weight, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/mennesker-t4-psychological-safety.webp` | "Clean minimal infographic showing psychological safety in teams, a shield with a small plant growing next to it, protected space for vulnerability, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, square format" |
| `banners/mennesker-t4-empty-values.webp` | "Clean minimal infographic showing hollow corporate values, a framed poster on a wall that is blank inside, values that have no real meaning, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, square format" |
| `banners/mennesker-t4-silos.webp` | "Clean minimal infographic showing organizational silos, three vertical columns separated by thick walls, people in each column unable to see each other, isolation, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, square format" |
| `banners/mennesker-t4-meaninglessness.webp` | "Clean minimal infographic showing meaningless work, a conveyor belt with identical gray boxes moving along, worker looking away with disinterest, lack of purpose, Scandinavian design style, golden yellow and white color palette, modern corporate illustration, no text, square format" |
| `banners/identitet-t4-empty-values.webp` | "Clean minimal infographic showing hollow identity, an empty theater stage with a single spotlight on an empty podium, performance without substance, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text, square format" |
| `banners/identitet-t4-individual-dominance.webp` | "Clean minimal infographic showing individual dominance in a team, one oversized star figure towering over smaller identical figures, hero culture, individualism over collaboration, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text, square format" |
| `banners/identitet-t4-storylessness.webp` | "Clean minimal infographic showing absence of organizational stories, an empty bookshelf with no books, blank pages, lack of narrative heritage, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text, square format" |
| `banners/identitet-t4-change-fatigue.webp` | "Clean minimal infographic showing change fatigue, a stack of identical new initiative logos piling up with the most recent one partially torn, exhaustion from repeated change, Scandinavian design style, deep wine and white color palette, modern corporate illustration, no text, square format" |
| `banners/pavirkning-t4-invisible-power.webp` | "Clean minimal infographic showing invisible power in organizations, a decision-making board room table with hands visible under the table pulling strings, unspoken influence, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, square format" |
| `banners/pavirkning-t4-hidden-agendas.webp` | "Clean minimal infographic showing hidden agendas, overlapping circles with a concealed corner in gray, one agenda hidden behind the official one, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, square format" |
| `banners/pavirkning-t4-resource-struggles.webp` | "Clean minimal infographic showing resource struggles in an organization, two teams pulling on opposite ends of a budget pie chart, tug of war over limited resources, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, square format" |
| `banners/pavirkning-t4-too-much-agreement.webp` | "Clean minimal infographic showing excessive agreement in a leadership team, row of identical nodding heads all in sync, groupthink, lack of healthy disagreement, Scandinavian design style, hunter green and white color palette, modern corporate illustration, no text, square format" |

---

### Product & Process Illustrations (Style 3 — R18)

**Use for:** T2/T3/T4 images across product, methodology, contract, and step pages.

**Style signature:**
- "Clean minimal infographic"
- "Scandinavian design style"
- "modern corporate illustration"
- Product pages: "azure blue and white color palette" / "navy blue and white color palette"
- "no text"

**Documented prompts:**

| File | Prompt |
|------|--------|
| `banners/ledelse-60-2-t2-prosessflyt.webp` | "Clean minimal infographic showing a three-step leadership assessment process, three connected stages arranged in a horizontal flow from left to right, each stage represented by a distinct geometric shape with flowing arrows between them, representing initial conversation, structured interview, and final report, Scandinavian design style, azure blue and navy blue color palette, modern corporate illustration, no text, high resolution" |
| `banners/ledelse-60-2-t4-samtale.webp` | "Clean minimal infographic showing an initial consultation conversation, two abstract shapes facing each other in dialogue, speech bubble shapes suggesting open discussion, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/ledelse-60-2-t4-intervju.webp` | "Clean minimal infographic showing a structured diagnostic interview, organized geometric pattern suggesting systematic questioning, clock face integrated with checklist pattern, Nordic design elements, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/ledelse-60-2-t4-rapport.webp` | "Clean minimal infographic showing a final report with recommendations, document shape emerging from data points into clear insights, arrow pointing upward suggesting improvement, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/metode-t3-teori.webp` | "Clean minimal infographic showing theoretical foundation with four interconnected perspectives, four lens-like shapes arranged in a diamond pattern with overlapping centers, representing Bolman and Deal's four-frame model, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/metode-t3-forskning.webp` | "Clean minimal infographic showing research and knowledge production, data points flowing into a central analytical node, branching outputs suggesting published insights, cyclical knowledge development process, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/metode-t3-hvorfor.webp` | "Clean minimal infographic showing purpose and motivation behind the methodology, a compass shape with Nordic design elements pointing toward true north, surrounded by abstract human figures suggesting leadership development, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/metode-t4-respekt.webp` | "Clean minimal infographic showing respect and dignity in research, a shield shape protecting a small figure, surrounded by a circle of care, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/metode-t4-konsekvenser.webp` | "Clean minimal infographic showing positive impact and beneficial outcomes, a radiating growth pattern with small flourishing shapes emerging outward, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/metode-t4-rettferdighet.webp` | "Clean minimal infographic showing fairness and justice, balanced scales with two equal weights, symmetry and equilibrium in design, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/metode-t4-integritet.webp` | "Clean minimal infographic showing integrity and ethical conduct, a straight unbroken path with a checkpoint marker, suggesting consistent principled behavior, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-1.webp` | "Clean minimal infographic showing contract modification and amendment, two document shapes with an arrow suggesting revision, a pen nib icon next to legal text symbol, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-2.webp` | "Clean minimal infographic showing invoicing and billing, an invoice document with currency symbol and calendar date, clean minimal financial iconography, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-3.webp` | "Clean minimal infographic showing intellectual property and ownership rights, a lightbulb with a copyright symbol, protected creative work, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-4.webp` | "Clean minimal infographic showing confidentiality and security, a locked padlock with a document, protective barrier around sensitive information, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-5.webp` | "Clean minimal infographic showing contract breach and force majeure, a broken chain link with a shield on one side, legal protection against unforeseen events, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/avtale-t4-paragraf-6.webp` | "Clean minimal infographic showing dispute resolution and legal venue, two abstract figures with a mediator between them, a handshake suggesting resolution, Scandinavian design style, navy blue and white color palette, modern corporate illustration, no text, square format" |
| `banners/samtale-t3-samtale.webp` | "Clean minimal infographic showing an initial exploratory conversation between two parties, two abstract human silhouettes in open dialogue with space between them suggesting openness and no commitment, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/intervju-t3-intervju.webp` | "Clean minimal infographic showing a structured diagnostic interview process, an organized grid pattern with a central questioning node, systematic approach suggesting sixty questions in two hours, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, high resolution" |
| `banners/rapport-t3-rapport.webp` | "Clean minimal infographic showing a professional report delivery, document with findings and recommendations emerging from analytical process, a clear insight path from data to actionable advice, Scandinavian design style, azure blue and white color palette, modern corporate illustration, no text, high resolution" |

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

### Post-Conversion: exiftool Metadata

After WebP conversion, apply IPTC Digital Source Type and CC0 XMP metadata to all AI-generated images:

```bash
bash scripts/apply-provenance.sh
```

**Triggers:**

| Scenario | Run command | Når |
|---|---|---|
| First-time setup | `bash scripts/apply-provenance.sh` | Én gang — metadata-merker alle 186 eksisterende bilder |
| Per batch at generation | `bash scripts/apply-provenance.sh` | Hver gang nye bilder genereres — etter sharp-konvertering, før git commit |

Scriptet er idempotent (`-if 'not $DigitalSourceType'` guard) — trygt å kjøre flere ganger.

### AI Transparency Manifest

The image provenance metadata is part of a three-layer AI content disclosure system:

| Layer | File | Scope |
|-------|------|-------|
| JSON-LD per page | `_includes/provenance-jsonld.html` | Per-page `digitalSourceType` + CC0 license in `<head>` |
| Image EXIF metadata | `scripts/apply-provenance.sh` | IPTC/XMP on every WebP image file |
| Route manifest | `/.well-known/ai-transparency.json` | All 22 site routes with tool attribution + editorial review status |

The manifest at `/.well-known/ai-transparency.json` covers text, images, code, and styles — with per-tool attribution (Claude/GPT-4, EvoLink GPT Image 2) and human editorial review assertions. It's served as a static file by GitHub Pages at the standard `.well-known` path for automated discovery.

### Verification Checklist

- [ ] All 44 PNG files converted to WebP
- [ ] Originals preserved in `.design/graphics/originals/`
- [ ] No PNG files remain in `assets/images/` (except backup)
- [ ] All HTML references updated to `.webp`
- [ ] All images have IPTC DigitalSourceType + CC0 XMP (verify: `exiftool -DigitalSourceType -cc:License assets/images/banners/example.webp`)
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