# B0–B4 — Benefit Article Improvements: Frame Argument Integration + Layout Fix

> Created: 2026-05-31
> Status: Draft

## Problem / Goal

The four benefit articles (`/tillit/`, `/generativ-ki/`, `/usikkerhet/`, `/forankring/`) describe each benefit of Ledelse 60:2 in isolation. They miss key arguments from the four frame perspectives, which weakens cross-linking and makes the content less authoritative. Additionally, the `.frame-section` CSS class lacks centering, causing left-aligned content on all four pages.

Goal: Weave relevant frame arguments into each benefit article to create a cohesive content ecosystem, and fix the layout bug.

---

## Scope

### Files to modify

| File | Change |
|------|--------|
| `assets/css/typography.css` | Add `margin-inline: auto` to `.frame-section` — fixes left-aligned content on all 4 benefit pages |
| `_pages/ledelse_tillit.md` | Add frame arguments from Mennesker (autonomi, utvikling) + Struktur (compliance ≠ byråkrati) |
| `_pages/ledelse_generativ-ki.md` | Add frame arguments from Identitet (kulturstadier) + Påvirkning (KI-makt) |
| `_pages/ledelse_usikkerhet.md` | Add frame arguments from Identitet (teatermetafor) + Påvirkning (maktvakuum) + Struktur (målkonflikter) |
| `_pages/ledelse_forankring.md` | Add frame arguments from Påvirkning (interesser) + Mennesker (tillit) + Struktur (eierskap) |
| `BACKLOG.md` | Add B0–B4 items |
| `CHANGELOG.md` | Add entries under [Unreleased] |

### Files unchanged

- `_frames/*.md` — not touched
- All other `_pages/*.md` — unaffected
- `_layouts/` — no layout changes needed

---

## Implementation

### B0 — Layout fix (1 line)

**File:** `assets/css/typography.css`, line 52

```css
.frame-section {
    max-width: 65ch;
    margin-inline: auto;   /* ← add this */
}
```

This is the only line of code in the entire PR.

### B1 – Tillit (Bedre ledelse uten byråkrati)

**Current weakness:** Treats trust as purely interpersonal. Misses that *autonomy* (Mennesker-frame) is the mechanism that makes trust reduce bureaucracy, and that *clarity* (Struktur-frame) supports trust rather than undermines it.

**Changes to `_pages/ledelse_tillit.md`:**

1. **Add a fourth pillar** after "De tre pilarene for tillitsbasert ledelse" → rename to "Fire pilarene" and add:
   > **4. Autonomi som tillitsdriver**
   > Mennesker er motiverte når de opplever mestring, tilhørighet og mening. Ytre motivatorer (bonus, straff) kan drive kortvarig atferd, men varig engasjement krever indre motivasjon: autonomi, mestring og tilhørighet. Når ledere stoler på at ansatte kan bruke sunn fornuft, blir kontroll unødvendig — og byråkratiet mister sin begrunnelse.
   >
   > Autonomi er ikke frihet fra struktur — det er frihet *innenfor* struktur. Tydelige roller og forventninger muliggjør tillit, de svekker den ikke.

   Source: Mennesker-frame element 2 (Motivasjon og engasjement), Struktur-frame element 3 (Prosesser og regler)

2. **Strengthen "Tillit som system" pillar** with one sentence referencing the Struktur-frame:
   > Compliance er ikke byråkrati — det er tydelighet. Når roller er definerte og ansvar er dokumentert, unngår man den typen uklarhet som fører til at oppgaver faller mellom stoler og tillit blir satt på prøve.

   Source: Struktur-frame element 3

### B2 – GenKI (Målbare gevinster med GenKI)

**Current weakness:** Describes KI-ledelse as individual skills and process. Misses that *cultural maturity* (Identitet-frame) determines whether KI-adopsjon actually works, and that *power dynamics* (Påvirkning-frame) determine who controls it.

**Changes to `_pages/ledelse_generativ-ki.md`:**

1. **Add a subsection under "Organisasjonens rolle"** (after line 107):
   > **Kultur som forutsetning for KI-adopsjon**
   > Dave Logan beskriver fem kulturstadier — fra "livet suger" til "livet er fantastisk." De fleste organisasjoner befinner seg på stadium 3: "Jeg er flink" (individualisme). På dette stadiet hamstres kunnskap i stedet for å deles. KI-adopsjon som krever samarbeid på tvers, forutsetter minimum stadium 4: "Vi er flinke."
   >
   > Spørsmålet er ikke om organisasjonen har KI-verktøy — det er om kulturen er moden for å bruke dem.
   >
   > **KI som maktspørsmål**
   > KI-verktøy kontrolleres sjelden av alle. Én avdeling eller enkeltpersoner kan få uforholdsmessig innflytelse ved å eie KI-budsjettet eller KI-kompetansen. Uten åpen diskusjon om hvem som styrer KI, risikerer organisasjonen at teknologiens gevinster konsentreres hos få.
   >
   > Den som kontrollerer KI, former retningen. Det er et spørsmål om makt, ikke bare om teknologi.

   Sources: Identitet-frame element 1 (Kultur og språk/Logan), Påvirkning-frame element 1 (Makt og innflytelse)

2. **Strengthen Hubbard reference** in the OKR/KPI section — connect measurement of KI output to his broader framework:
   > Hubbard viser at all måling reduserer usikkerhet — den eliminerer den ikke. Formålet med å måle KI-output er ikke perfeksjon, men å vite om man beveger seg i riktig retning.
   
   Source: Struktur-frame about section

### B3 – Usikkerhet (Bli forberedt på en usikker fremtid)

**Current weakness:** Already covers Schein, Logan, Kotter comprehensively but treats culture as *given structure* rather than *performed identity*. Missing the power-vacuum dynamic.

**Changes to `_pages/ledelse_usikkerhet.md`:**

1. **Add a paragraph after the Schein section** (around line 47):
   > **Teateret i usikkerhet**
   > En organisasjonskultur er ikke bare noe man *har* — det er noe man *fremfører*. I usikre tider sprekker fasaden: det som var "hvordan vi gjør ting her" avsløres som overflate når presset kommer. Ritualer og historier som fungerte i stabile perioder, mister sin kraft når ingen lenger tror på dem.
   >
   > Spørsmålet ledergrupper bør stille seg i usikre tider er ikke "hva er kulturen vår?" — det er "hvilken kultur kommer til syne når vi ikke lenger har kontroll?"

   Source: Identitet-frame element 3 (Ritualer og identitet) + element 1 (Kultur og språk)

2. **Add a paragraph under "Hvorfor endring er så vanskelig"** (around line 88):
   > **Usikkerhet skaper maktvakuum**
   > Når usikkerhet oppstår, oppstår også maktkamper. De som griper muligheten i uklare situasjoner, former retningen — uavhengig av om de har formell autoritet. Ledergrupper som ikke er bevisst på dette, oppdager for sent at vegvalg er tatt av dem som handlet raskest, ikke av dem som hadde best innsikt.

   Source: Påvirkning-frame element 1 (Makt og innflytelse) + challenge 1 (Usynlig beslutningsmakt)

3. **Add a challenge under "Vanlige kulturutfordringer"** (after line 211):
   > **Strukturell usikkerhet**
   > Mål i ulike avdelinger som motvirker hverandre. Koordinering som skulle vært automatisk, krever stadige møter. Det oppleves som kulturproblem, men er egentlig strukturproblem — målene er ikke samordnet, og ingen har sett på om de henger sammen.

   Source: Struktur-frame element 2 (Mål og koordinering) + challenge 2 (Målkonflikter)

### B4 – Forankring (Forankre initiativer i ledergruppen)

**Current weakness:** Focuses on makt/bias as obstacles. Misses that forankring also requires *understanding legitimate interests* (Påvirkning-frame), *relational trust* (Mennesker-frame), and *structural ownership* (Struktur-frame).

**Changes to `_pages/ledelse_forankring.md`:**

1. **Add a bridge between dimension 1 (Formell vs reell makt) and dimension 2 (Kognitiv bias)**: a new dimension or subsection:
   > **Interesser som forankringens byggesteiner**
   > Hver leder og hver avdeling har sine interesser. Ikke nødvendigvis egoistiske — de kan være faglige, strategiske eller personlige. Forankring handler først og fremst om å forstå disse interessene og hvordan de samhandler.
   >
   > En initiativtaker som kartlegger interesser før hun presenterer løsningen, har langt større gjennomføringskraft enn den som antar at alle ser saken fra samme ståsted.
   >
   > **Tegn på god interessekartlegging:** Ulike standpunkter er kjent og anerkjent. Forhandling handler om å forene interesser, ikke om å vinne en argumentasjon.
   > **Tegn på manglende interessekartlegging:** Initiativer presenteres som "åpenbart riktige" — og møtes med taus motstand.

   Source: Påvirkning-frame element 2 (Interesser og agendaer)

2. **Add a paragraph to the introduction** (after line 30):
   > Forankring uten relasjonell tillit er seremoniell. Folk nikker i møter og gjør noe annet etterpå. Grunnmuren i all forankring er psykologisk trygghet — tilliten til at man kan si hva man faktisk mener uten negative konsekvenser.

   Source: Mennesker-frame element 1 (Tillit og trygghet)

3. **Add a sentence to dimension 1 (Formell vs reell beslutningsmakt)** — connecting structure to forankring:
   > Et initiativ uten tydelig eierskap er ikke forankret — det er bare kommunisert. Når roller er uklare, oppstår ansvarsskyvning, og forankringen blir illusorisk.

   Source: Struktur-frame element 1 (Roller og ansvar)

---

## Cross-Cutting Patterns

Three frame arguments appear across multiple benefits. When editing, ensure consistent phrasing:

| Argument | Appears in | Suggested phrasing anchor |
|----------|-----------|--------------------------|
| Hubbard — måling reduserer usikkerhet | B2 (OKR-seksjon), B3 (nytt avsnitt) | "All måling reduserer usikkerhet — den eliminerer den ikke" |
| Logan — kulturstadier | B2 (Organisasjonens rolle), B3 (allerede dekt) | "De fleste organisasjoner befinner seg på stadium 3: 'Jeg er flink'" |
| Psykologisk trygghet som fundament | B1 (autonomi-pillar), B4 (introduksjon) | "Grunnmuren i alle relasjoner er psykologisk trygghet" |

---

## Acceptance Criteria

### Layout
- [ ] `.frame-section` has `margin-inline: auto` in typography.css
- [ ] All four benefit pages show centered content at all viewport widths

### Content — Tillit (B1)
- [ ] Autonomy added as fourth pillar with Mennesker-frame argument (indre motivasjon)
- [ ] Cline about compliance ≠ byråkrati added to "Tillit som system" pillar
- [ ] Title updated to "Fire pilarene" (was Tre)

### Content — GenKI (B2)
- [ ] Kulturstadier section added under "Organisasjonens rolle" with Logan reference
- [ ] KI som maktspørsmål paragraph added
- [ ] Hubbard connection strengthened in OKR section

### Content — Usikkerhet (B3)
- [ ] Teatermetafor paragraph added after Schein section
- [ ] Maktvakuum paragraph added under "Hvorfor endring er så vanskelig"
- [ ] Strukturell usikkerhet added as fifth challenge

### Content — Forankring (B4)
- [ ] Interessekartlegging subsection added as new dimension
- [ ] Psykologisk trygghet paragraph added to introduction
- [ ] Eierskap sentence added to dimension 1

### Quality
- [ ] All additions in Norwegian Bokmål with correct brand voice
- [ ] Frame references are natural, not salesy — method as evidence, not subject
- [ ] No duplication across benefit pages of the same argument (exceptions noted in cross-cutting patterns)
- [ ] `git diff` shows no changes outside specified files

---

## Backlog References

| ID | Title | Status | Depends On |
|----|-------|--------|------------|
| B0 | Benefit layout fix: center `.frame-section` content | Planned | — |
| B1 | Tillit: add autonomy pillar + compliance clarity (from Mennesker/Struktur frames) | Planned | — |
| B2 | GenKI: add cultural maturity + power dynamics (from Identitet/Påvirkning frames) | Planned | — |
| B3 | Usikkerhet: add theater metaphor + power vacuum (from Identitet/Påvirkning frames) | Planned | — |
| B4 | Forankring: add interests + trust + ownership (from Påvirkning/Mennesker/Struktur frames) | Planned | — |

---

## Dependencies

- B0 is independent — trivial CSS fix
- B1–B4 are independent of each other (different files)
- No dependency on A1 (architecture cleanup) — these changes use existing `frame-section` classes
