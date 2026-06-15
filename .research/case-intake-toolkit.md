# Case Intake Toolkit

> **Purpose:** Practical tools for the No Excuse team to identify, interview, write, and publish customer cases.
> **Status:** Ready for use
> **Created:** 2026-06-13
> **BL:** C1

---

## 1. Customer Scorecard — Who to Approach

Rate potential case customers on a scale of 1–5 for each criterion. Target score ≥ 12 to proceed.

| Criterion | 1 | 2 | 3 | 4 | 5 |
|-----------|---|---|---|---|---|
| **Impact** — clear before/after | Vague improvement | Some metrics | Specific KPIs improved | Quantified 20%+ improvement | Transformational (2x+ improvement) |
| **Attribution** — change came from No Excuse | Many other factors | Some connection | Direct link to intervention | One of main drivers | Clearly the catalyst |
| **Willingness** — customer will speak/publish | Not interested | Maybe with heavy anonymity | Willing, some conditions | Eager, minor edits | Wants to co-publish |
| **Relatability** — audience will see themselves | Niche industry | Unfamiliar context | Some parallels | Recognizable situation | "That's us" reaction |

**Priority order:** Highest score first. Break ties by recency.

---

## 2. Interview Script — Customer Conversation

### Before the Interview

- [ ] Confirm meeting time (30 min recommended)
- [ ] Send one-liner: "We'd love to hear your honest experience so we can help others like you"
- [ ] Review any notes from the engagement
- [ ] Open with: no obligation to publish, we'll draft everything, you approve before anything goes live

### Interview Questions

**Opening (2 min)**
1. "Kan du kort fortelle hva din rolle var da vi begynte samarbeidet?"
2. "Hva var situasjonen hos dere før vi startet — hva var den største utfordringen?"

**Probing for specifics (10 min)**
3. "Hva konkret var det som ikke fungerte? Kan du gi et eksempel?"
   - Follow-up: "Hvor lenge hadde det pågått?"
4. "Hva prøvde dere før, og hvorfor fungerte ikke det?"
5. "Hva fikk deg til å kontakte oss / si ja til et møte?"

**The intervention (5 min)**
6. "Hvordan opplevde du prosessen — hva skjedde i møtene/samtalene?"
7. "Var det noe som overrasket deg underveis?"

**Results (8 min) — get specific here**
8. "Hva ble annerledes etterpå — helt konkret?"
   - _Dig for numbers:_ "Hvor mye raskere?", "Hvor mange prosent?", "Hva måler dere på?"
   - _Dig for stories:_ "Kan du gi et eksempel på en situasjon som ble løst annerledes?"
9. "Hva ville du sagt til en annen leder som vurderer å gjøre det samme?"

**Permission (3 min)**
10. "Føler du deg komfortabel med at vi deler denne historien?"
    - _If yes:_ "Vi sender deg et utkast — du har fullt veto."
    - _If hesitant:_ "Vi kan anonymisere — fjerne navn, bransje, eller begge deler."

**Closing (2 min)**
11. "Er det noe vi ikke har snakket om som du synes er viktig?"
12. "Takk for tiden — du hører fra oss innen en uke med et utkast."

### After the Interview

- [ ] Transcribe or summarize within 24 hours
- [ ] Flag any measurable result claims immediately
- [ ] Note anonymization preferences
- [ ] Send thank-you message within 48 hours
- [ ] Draft case within 5 working days

---

## 3. Case Writing Template

### Structure

```
Tittel: [Verb] + [substantiv] hos [kunde]
        Alternativ: Slik [resultat] med [metode]

Situation (2–3 setninger)
  → Hvem var kunden, hva var konteksten, hvor lenge hadde utfordringen pågått?

Challenge (2–3 setninger)
  → Hva var den konkrete utfordringen? Hvorfor var den vanskelig? Hva hadde de prøvd før?

Solution (3–4 setninger)
  → Hva gjorde No Excuse? Hvilken rammeverk/metode ble brukt? Hvordan opplevde kunden prosessen?

Result (2–3 setninger)
  → Hva ble målbart annerledes? Helst et tall (prosent, kroner, timer). Hva sier kunden selv?

Sitat (1 setning)
  → Direkte sitat fra kundeintervjuet. Kort, konkret, helst med et følelsesmessig element.
```

### Title formulas

| Situation | Formula | Example |
|-----------|---------|---------|
| Efficiency | "Effektivisering av [område] hos [kunde]" | "Effektivisering av beslutningsprosesser hos Kommunekraft AS" |
| Conflict | "Løsning av [utfordring] i [team/avdeling]" | "Løsning av rollekonflikt i ledergruppen hos Viken Helse" |
| Growth | "Slik [resultat] med [metode]" | "Slik reduserte de sykefraværet med 30 % med Ledelse 60:2" |
| Transformation | "Fra [gammelt] til [nytt] hos [kunde]" | "Fra silotenkning til samhandling hos NorData" |

### Frontmatter (for `_pages/<slug>.md`)

```yaml
---
class: case
published: true
title: "Tittel på caset"
description: "Kort beskrivelse, maks 150 tegn"
image: "assets/images/cases/<slug>-t2.webp"
result: "30 % reduksjon i sykefravær"
customer: "Kundenavn AS"
product_tags:
  - ledelse-60-2
anonymized: false
---
```

### Quality checklist

Before sending to customer for review:

- [ ] Result field contains a single, specific, measurable outcome
- [ ] Description is under 150 characters
- [ ] Title uses one of the four formulas
- [ ] No confidential information (customer names, financial details unless approved)
- [ ] Fits brand voice: direct, concrete, no consultant-speak
- [ ] Norwegian Bokmål, no English where Norwegian works
- [ ] Sitat feels like something a real person would say

---

## 4. Approval Workflow

```
┌──────────────┐
│  INTERVJU    │  ← 30 min med kunde
└──────┬───────┘
       ▼
┌──────────────┐
│  UTKAST      │  ← Internt utkast (5 virkedager)
└──────┬───────┘
       ▼
┌──────────────┐
│  INTERN REVIEW │  ← No Excuse internt: fagsjekk + språkvask
└──────┬───────┘
       ▼
┌──────────────┐
│  KUNDE REVIEW │  ← Sendes kunde med 1 ukes frist
│  + SIGN-OFF   │
└──────┬───────┘
       ▼
┌──────────────┐
│  PUBLISER    │  ← Merk published: true, deploy
└──────────────┘
```

### Sign-off form template

Send this exact text to the customer contact:

```
Hei [navn],

Takk for at du delte historien deres. Her er utkastet til caset vi vil publisere
på noexcuse.no. Du har full kontroll:

✅ Les gjennom og se om alt stemmer
✅ Godkjenn eller foreslå endringer
❌ Du kan trekke deg når som helst, uten begrunnelse

Svar på denne mailen med:
  "Jeg godkjenner publisering av dette caset"
  ELLER
  "Jeg ønsker følgende endringer: [beskriv]"

Har du ikke svart innen 7 dager, ringer jeg for å avklare.

Mvh,
[Navn]
```

### Anonymization options

| Level | What changes | Use when |
|-------|-------------|----------|
| Full | Company name → pseudonym, industry → generalized, no identifiable details | Customer hesitant but willing |
| Partial | Company name kept, but specific人名 → roles ("lederen", "teamet") | Customer ok with company but not individuals |
| Named | Everything public, customer co-brands | Customer wants to co-publish |
