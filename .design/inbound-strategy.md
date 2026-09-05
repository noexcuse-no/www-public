# Inbound Strategy — No Excuse AS

> **Status:** Active — single source of truth for the inbound/commercial website strategy.
> **Source:** 36-message strategy conversation (chatgpt) + user decisions 2026-08-30.
> **Scope:** Website-facing commercial strategy for Ledelse 60:2. P3 (portfolio expansion, delivery scaling, research) is OUT — validation-gated business work.

---

## 1. Commercial Thesis

**Mange relevante innganger. Én tydelig kommersiell konvergens: Ledelse 60:2.**

The site currently explains methodology. It must become a commercial decision engine. The core product is strong — 60 diagnostic questions, two hours, four perspectives, followed by a report and recommendations — but the website undersells it by leading with mechanism instead of outcome.

The strategy keeps broad topical material as acquisition infrastructure (every article is an entrance) while the site owns the entire commercial story: price, fit, privacy, reassurance, and the booking decision. The scheduler (Microsoft Bookings) becomes background infrastructure — the site owns the page where the buying decision happens.

---

## 2. Positioning

Ledelse 60:2 is a **fast leadership-team diagnostic** that should happen before a larger development or consulting intervention.

**Core message:**
> Ikke start et lederutviklingsprogram før dere vet hva dere faktisk trenger å utvikle.

**Product character:** Focused, time-efficient, senior, diagnostic, practical, low-risk to buy. Bounded engagement — not the beginning of an open-ended consulting relationship.

**Differentiation from competitors:**
- Competitors (Compendia, AFF, Execu, Teamwork) offer multi-day, multi-week programs or broad bespoke consulting.
- Ledelse 60:2 is two hours, four perspectives, concrete priorities. It is the *diagnosis before treatment*, not the treatment itself.
- After diagnosis, customers can implement recommendations themselves, hire existing partners, or buy focused follow-up from No Excuse.

---

## 3. Target Segments

### Primary (50–250 employees)

| Buyer | Situation |
|-------|-----------|
| CEO / administrerende direktør | Strategy-execution doubt, new formation, growth |
| HR-director / HR-leder | Organisational friction, team dysfunction |
| Business-unit leader | Scope unclear, roles debated |
| Strategy / transformation leader | Change not landing |
| Quality / risk / governance leader | GRC without cultural embedding |
| Chair or owner (selected contexts) | Board-level visibility into leadership friction |

**Geographic:** National, Oslo/Østlandet focus.

### Secondary

- 20–49 employees (smaller teams, compressed decision cycles)
- 250+ employees (divisions, subsidiaries, regulated units)
- Public sector and regulated industries

### Consultant Channel

Position: "Vi diagnostiserer. Dere kan gjerne hjelpe kunden videre."

No exclusivity, no automatic implementation proposal, customer owns findings, incumbent advisers welcome to work from output. No referral compensation (unresolved — see §Unresolved).

---

## 4. Visitor Intent Model (I0–I6)

Each state has two CTAs: a primary (commercial) and a secondary (engagement).

| State | Description | CTA 1 (Primary) | CTA 2 (Secondary) |
|-------|-------------|------------------|--------------------|
| **I0** | Unaware — browsing leadership content, no purchase intent | Learn (article/topic) | — |
| **I1** | Problem-aware — recognises symptoms but hasn't named them | "Utforsk dette privat med din KI" (AI reflection) | "Se hvordan 60:2 kan avdekke dette" |
| **I2** | Solution-aware — knows diagnostics exist, evaluating fit | "Se om 60:2 passer" (→ /ledelse-60-2/#passer) | AI reflection |
| **I3** | Product-aware — knows Ledelse 60:2, comparing | "Bestill Ledelse 60:2" (→ /bestill/) | "Book 20 min avklaring" |
| **I4** | Ready to buy — decided, needs logistics | "Bestill" (→ /bestill/ Route A) | — |
| **I5** | Post-engagement — has completed 60:2 | Follow-up / referral | — |
| **I6** | Consultant / partner — diagnosing for their client | "Vi diagnostiserer" (→ /om-oss/) | "Se om 60:2 passer" |

---

## 5. Purchase Routes

### Route A: Bestill Ledelse 60:2

For visitors who know what they want. Direct path from product page or /bestill/ → shared MS Bookings page (time selection) → the site owns the decision page, Bookings picks time.

### Route B: Book 20 min avklaring

For visitors who are interested but not sure. Free 20-minute conversation ("Gratis. Vi finner ut om 60:2 passer. Hvis ikke, sier vi det.") → shared MS Bookings page (avklaring service).

**Route B prerequisite:** User creates a "20 min avklaring" service in MS Bookings (business-ops action, outside this repo). Site Route B CTA links to the shared Bookings page. Staging mechanism: frontmatter flag `route_b_live: false` on relevant pages until the service is verified live.

**Both routes lead to the same shared MS Bookings page.** Personal BookWithMe links are eliminated. The site never sends visitors straight to the scheduler — it owns the commercial context first.

---

## 6. Price Rules

### Figure

**kr 14 850,- eks. mva** ("veiledende", inkl. oppmøte Oslo+omegn, 2 timer).

### Presentation

- Framing: "Avgrenset oppdrag. Fast pris. Ingen binding til videre arbeid."
- Not "cheap" — positioned as transparent, bounded, predictable.
- Extras (travel outside Oslo-omegn, special adaptation, >5 participants → avklaring) stated beside the price.

### Four Placement Points (identical figure)

1. **Product-page commercial card** — price + inclusions + Bestill CTA + "Usikker? Book 20 min avklaring →"
2. **JSON-LD Offer.price** — injected via `_includes/json-ld.html` from `_data/commercial.yml` (single source)
3. **/bestill/ Route A price card** — same figure via shared include
4. **Homepage commercial-info section** — brief price mention

All rendering from ONE data source: `_data/commercial.yml`. Never hardcoded in page content.

### Anti-Anchor Strategy

Stale low-price anchors may exist from indexed external content. The JSON-LD Offer carries the real price to counter these. Framing consistently as "Avgrenset oppdrag. Fast pris."

---

## 7. /bestill/ Architecture

The `/bestill/ledelse-60-2/` page is a **checkout-like decision page**, not a scheduler page.

### Structure

1. Price + ✓-inclusions checklist:
   - 60 diagnostiske spørsmål
   - Inntil fem ledere
   - To timer
   - Analyse
   - Prioriterte funn og anbefalinger
   - Rapport innen én uke
2. "Ingen binding til videre rådgivning."
3. Three steps:
   - 1. Velg tidspunkt → link/embed to shared Bookings page
   - 2. Kontaktinformasjon
   - 3. Bekreft
4. "Ikke sikker ennå? Book en gratis 20-minutters avklaring"
5. "Hva skjer etter bestilling? Dagfinn tar kontakt for å bekrefte deltakere og praktiske forhold."
6. Practitioner module (Dagfinn)
7. Privacy link
8. Extras note

**Key principle:** The buyer should never discover a different price or new mandatory cost after clicking Book.

---

## 8. AI Private Reflection Model

### Concept

"Spør din KI" is a deliberate conversion layer on diagnostic/problem pages, not a generic footer widget. It gives visitors a low-friction, privacy-preserving way to explore leadership topics through their own AI — before they ever talk to No Excuse.

### Conversation Topics

Each topical page carries 3 conversation topics in frontmatter:

```yaml
conversation_topics:
  - conversation_label: "Uklare beslutningsroller"
    opening_question: "I vår ledergruppe er det ikke alltid tydelig hvem som avgjør hva. Kan du hjelpe meg med å kartlegge dette?"
    source_url: /struktur/
    sixty_two_url: /ledelse-60-2/
```

### Shared Meta-Prompt (Critical Reflection)

The meta-prompt is a private interviewer, one question at a time:

1. One question at a time
2. Ask for concrete recent examples
3. Distinguish evidence / observation / interpretation / assumption
4. Challenge premature conclusions
5. Apply four perspectives (Struktur, Mennesker, Påvirkning, Identitet)
6. Suggest alternative hypotheses
7. NO scoring, diagnosing, names, sensitive data, or vendor recommendation
8. End by explaining origin + optional return path to noexcuse.no

### Return Loop

Copied prompt ends with:
- Origin explanation: "Denne refleksjonen er startet fra noexcuse.no — en nettside for ledelsesdiagnostikk."
- Optional return link: `https://noexcuse.no<path>/?ref=ai-retur#etter-refleksjon`
- Attribution-only params (NEVER answers, hypotheses, or org names)

Return pages have `#etter-refleksjon` anchor sections with 2–4 related follow-up topics + "Se hvordan 60:2 undersøker dette" CTA.

### Providers (7)

ChatGPT, Claude, Gemini, DeepSeek, Perplexity, Copilot, Grok. Remember preference via cookie `noexcuse_ai_provider` (365d).

### Wording

- UI: "din egen KI" (not "din LLM")
- Privacy note: "Ingen data sendes til våre servere"

### Two-CTA Pattern

- **Primary:** "Utforsk dette privat med din KI" → topic panel
- **Secondary:** "Se hvordan 60:2 kan avdekke dette" → /ledelse-60-2/

On commercial pages (product, /bestill/), the hierarchy reverses — 60:2 is primary, AI is secondary.

---

## 9. Privacy (3 Layers)

### Layer 1 — Signature

Beside every AI CTA:
> "Vi stiller spørsmålene. Du beholder svarene."

### Layer 2 — Three-Box Table

| No Excuse ser | No Excuse ser ikke | KI-tjenesten din |
|---------------|-------------------|------------------|
| Sidebruk (side, tidspunkt) | Samtalen med KI-en | Hele samtalen |
| Valgt tema | Svarene dine | Dine svar og resonnering |
| At promptet er kopiert | Personopplysninger du velger å dele | Eventuelle personopplysninger du deler |
| Retur til noexcuse.no | Forretningshemmeligheter | — |

### Layer 3 — Transparency Page

`/personvern-ki/` — plain language before legal:
1. What the button does
2. What leaves noexcuse.no
3. What No Excuse logs
4. What No Excuse never receives
5. What the AI supplier may receive
6. Analytics (cookie-free)
7. Research (separate explicit opt-in, default none, no raw transcripts)
8. Contact / privacy rights

### Wording Rule

**"Samtalen deles ikke med No Excuse"** — never "Samtalen er privat."

AI answers are never stored, never analyzed, never fed into analytics. Events are metadata-only (event name + source page, no conversation content).

---

## 10. Analytics

### Event Model (15 events)

**12 site-side events** via Simple Analytics Events API (cookie-free):

| Event | Fires when |
|-------|-----------|
| `topic_landing_view` | Topical article page loads |
| `problem_page_view` | Buying-situation page loads |
| `ai_topic_selected` | Visitor clicks a conversation topic |
| `ai_prompt_copied` | Visitor copies the AI reflection prompt |
| `ai_return` | Visitor returns via `?ref=ai-retur` URL |
| `related_topic_opened` | Visitor clicks a related-topic link |
| `product_view` | /ledelse-60-2/ loads |
| `fit_view` | Fit section (#passer) enters viewport |
| `price_view` | Price section enters viewport |
| `method_view` | Method section enters viewport |
| `booking_click` | Visitor clicks bestill step link |
| `referral_source` | Visitor arrives with utm_source param |

**3 off-site conventions** (documented, not implemented — booking completes on external Bookings page):

| Event | When |
|-------|------|
| `booking_complete` | Bookings form submitted (external) |
| `sale_qualified` | Conversation leads to qualified opportunity |
| `sale_won` | Engagement booked and delivered |

### North Star

**60:2 sales per 1,000 relevant entry sessions** (visitors from high-intent acquisition channels).

### Session Classification

Sessions classified by highest meaningful intent. No lead scoring — this is about understanding funnel behavior, not predicting individual buyers.

### Acquisition Categories

Search · Podcast/media · Conference · Contributed article · LinkedIn · Consultant referral · Customer referral · Direct/branded · Other.

---

## 11. Design Principles

1. **Lead with the buyer's problem, not our terminology.** Don't assume visitors search for "kunnskapsbasert orientering" or "fire perspektiver." Lead with symptoms they recognise.

2. **Distinguish outcome from mechanism.** Problem → desired outcome → Ledelse 60:2 → how it works. Never lead with "60 questions in two hours."

3. **Write for an executive buyer.** Direct, commercially credible, specific, mature, low on consulting jargon, confident without overclaiming.

4. **Preserve the product's simplicity.** Ledelse 60:2 should feel focused, time-efficient, senior, diagnostic, practical, low-risk to buy.

5. **Use one primary commercial idea repeatedly.** "Finn ut hva ledergruppen faktisk trenger å utvikle før dere starter utviklingsarbeidet." Variants: "Diagnose før tiltak." "To timer for å finne ut hvor ledergruppen bør sette inn innsatsen."

6. **Many entrances, one convergence.** Topical breadth is acquisition infrastructure — keep it. But every path should eventually lead to the commercial decision point the site owns.

7. **Site owns the commercial story.** Price, fit, privacy, reassurance — all on-site. Scheduler is background infrastructure.

8. **Privacy as product proposition.** The AI reflection tool's privacy posture is a competitive advantage, not a compliance burden. Surface it.

9. **Recognition before pitch.** Help the buyer recognise their situation before introducing the product. "Kjenner du deg igjen?" before "Se hvordan 60:2 fungerer."

10. **Norwegian Bokmål, always.** All content in Norwegian. Multilingual substrate for future expansion — website owns commercial copy per language.

11. **Observable, not performative.** Design for what visitors can verify: clear price, clear scope, clear deliverables, clear privacy. Not "trust us."

---

## 12. Publicity → Topic Mapping

Podcasts, conference appearances, and contributed articles are distributed entrances into the No Excuse funnel.

### Strategy

- Each public appearance maps to one or more topical pages on the site.
- Appearances are source-specific landing pages with memorable spoken URLs and QR codes.
- The Foredrag og media page serves as the hub for organizers and media.
- Vanity URLs (e.g., /go/pavirkning/) carry attribution params for QR/print tracking.

### Bookable Propositions

1. Diagnose før lederutvikling
2. Hvem bestemmer egentlig?
3. Når GRC blir papirarbeid
4. KI-ledelse handler ikke om prompting
5. Fire forklaringer på samme lederproblem

---

## 13. Multilingual Principle

- Website owns commercial copy, pricing, VAT, and privacy per language.
- Scheduler (Bookings) sits beneath — it handles language at the form level.
- URL convention: /no/bestill/…, /en/book/… (future, substrate only).
- No translations in this plan. Substrate: hreflang guard, per-language dir convention documented.
- Commercial-copy ownership separation: website writes it, scheduler renders it.

---

## 14. Product-Family Table

| Product | Description | Boundary |
|---------|-------------|----------|
| **Ledelse 60:2** | 60 diagnostic questions, 2 hours, ≤5 leaders, report + recommendations | Core product, this plan |
| Specialist 60:2 variants | Vertical-specific versions (healthcare, public sector, etc.) | P3 — validation-gated, not built here |
| Catalyst | Productized follow-up implementation package | P3 — depends on market validation |

**Boundary rule:** Ledelse 60:2 is the front door. After diagnosis, customers choose their own path (self-implement, hire partner, buy follow-up). No Excuse does not lock in post-diagnosis revenue.

---

## 15. Market Context

- ~4,600 Norwegian private enterprises with 50+ employees (SSB 2024).
- Competitors (AFF, Execu, Compendia, Teamwork) all map-before-develop in their positioning.
- "Effect" questionnaire profile is the established assessment category in the market.
- The "Ask your AI" feature is a differentiated lead-in — particularly strong in a European privacy context (data stays on the visitor's machine, no public questionnaire).

---

## Intentionally Unresolved

These items are explicitly out of scope for this plan but noted for future calibration:

| Item | Why unresolved |
|------|---------------|
| Scheduler replacement | MS Bookings stays as time-selection backend; replacement depends on permissions architecture and is a separate work stream |
| Referral compensation | Consultant channel positioning is set, but compensation model needs business decision |
| 5-person limit test (H-MARKET-01) | Does the limit suppress conversion for larger teams? Record disqualified team sizes, test later |
| Delivery capacity | Dagfinn's capacity constrains growth; not a website question |
| Research partner | Academic research program needs a partner; not a website question |
| Lead magnets / 12-question diagnostic | Deferred to G4 stream; AI reflection partially covers this opportunity |
| Customer cases / proof (C1–C4) | Separate work stream; currently Doing in BACKLOG |
