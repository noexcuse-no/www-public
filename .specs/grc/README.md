# GRC Content Integration Specification

## Purpose and Scope

Integrate GRC (Governance, Risk, Compliance) concepts into existing No Excuse AS website content without replacing or duplicating existing material. GRC is declared in site metadata but not reflected in content — this spec defines how to fix that.

## Background

The site declares `keywords: "ledelse, internkultur, grc"` in `_data/metadata.yml`, yet no content explicitly addresses GRC topics. This creates a misleading impression for visitors who search for GRC-related services.

The existing content already covers relevant territory through the Bolman & Deal four-frame model. GRC integration means explicitly connecting these frames to GRC terminology that Norwegian decision-makers recognize.

## GRC Mapping

### Governance → Ledelse/Påvirkningsperspektivet

**Connection point:** Governance in organizations concerns who has authority to make decisions, how power is distributed, and how accountability is established.

**Existing content:** Påvirkningsperspektivet (ledelse_påvirkning.md) covers:
- Makt og innflytelse
- Interesser og agendaer
- Konflikt og forhandling
- Beslutningsmakt (formell vs. reell)

**Integration approach:** Add 1-2 sentences per relevant section that explicitly link to governance concepts. Example for Påvirkningsperspektivet:

> "God styring handler om å vite hvem som faktisk har makt til å beslutte — ikke hvem som formelt sitter i lederrollen. I norske organisasjoner er avstanden mellom formell og reell beslutningsmakt ofte undervurdert."

### Risk → /usikkerhet/ + Benefit-Future

**Connection point:** Risk management concerns identifying, assessing, and controlling threats. Opportunity management is the positive framing of the same capability.

**Existing content:**
- `/usikkerhet/` (ledelse_usikkerhet.md): Organisasjonskultur og endring — covers how organizations handle uncertainty
- Benefit-future on landing page: "Bli forberedt på en usikker fremtid" — styr unna uønskede hendelser og fang mulighetene

**Integration approach:** Add a brief section or sentences that connect organizational culture to enterprise risk mindset. Example:

> "En moden ledelse forstår at risiko ikke er noe man setter på lista en gang i året — det er en daglig holdning. Organisasjoner som leser signalene tidlig, justerer kurs før krisen er et faktum."

### Compliance → Strukturperspektivet + Om_metode

**Connection point:** Compliance concerns adherence to laws, regulations, and internal policies. It requires clear roles, documented processes, and accountable structures.

**Existing content:**
- Strukturperspektivet (ledelse_struktur.md): Roller, mål, prosesser, koordinering, ansvar
- Om_metode.md: mentions experience with "etterlevelse av ISO-rammeverk, lov- og kundekrav"

**Integration approach:** Add sentences connecting structure/roles to compliance thinking. Example for Strukturperspektivet:

> "Compliance er ikke byråkrati — det er tydelighet. Når roller er definerte og ansvar er dokumentert, unngår man den typen glitter og prakt som fører til at viktige oppgaver faller mellom stoler."

## Execution Guidelines

### General Principles

1. **Extend, don't replace** — Keep existing content intact
2. **Add rather than rewrite** — Insert new sentences that bridge to GRC
3. **Use natural language** — Avoid forcing consultant-speak; maintain No Excuse brand voice
4. **One addition per article** — One or two sentences per target article is enough
5. **No new pages required** — All integration happens in existing articles

### Target Articles and Insertion Points

| Article | Primary GRC Connection | Insertion Point |
|---------|----------------------|-----------------|
| `ledelse_påvirkning.md` | Governance | Section "Hva er påvirkningsperspektivet?" — after first paragraph |
| `ledelse_usikkerhet.md` | Risk | Section "Hvorfor endring er så vanskelig" — expand with risk framing |
| `ledelse_struktur.md` | Compliance | Section "Prosesser og regler" — add compliance bridge |
| `ledelse_tillit.md` | Governance/Risk | Section "De tre pilarene for tillitsbasert ledelse" — add governance note |
| `ledelse_forankring.md` | Governance | Section "Hvorfor ledere ofte tar dårlige beslutninger" — add GRC framing |
| `ledelse_identitet.md` | Risk/Compliance | Section "Hvorfor identitetsperspektivet betyr noe for ledergruppen" |
| `ledelse_mennesker.md` | Governance | Section "Hvorfor menneskeperspektivet betyr noe" — governance tie |

### Sentence Templates

Use these as starting points, adapt to each article's voice:

**Governance:**
> "God styring handler om å vite hvem som faktisk har makt til å beslutte — ikke hvem som formelt sitter i lederrollen."
> "Ansvar uten autoritet er en teoretisk øvelse. Autoritet uten ansvar er en risikofaktor."

**Risk:**
> "En moden ledelse forstår at risiko ikke er noe man setter på lista en gang i året — det er en daglig holdning."
> "Muligheter og risikoer hører sammen. De som bare ser risiko, misser mulighetene. De som bare ser muligheter, ender i brann."

**Compliance:**
> "Compliance er ikke byråkrati — det er tydelighet."
> "Gode rutiner og klare roller er ikke det motsatte av tillitsbasert ledelse — de er forutsetningen for at den skal fungere."

## Brand Voice Compliance

All GRC additions must:
- Be direct, not corporate
- Reference practical organizational situations, not abstract frameworks
- Connect to existing article themes naturally
- Avoid "bærekraftig", "verdiøking", "helhetlig" consultant-speak
- Maintain Scandinavian minimal tone

## Dependencies

- No new files required
- Changes are edits to existing articles only
- Follow existing content patterns and structure
- No images or assets required for Phase A

## Acceptance Criteria

- [ ] At least one GRC connection added per target article (7 articles)
- [ ] No replacement of existing content — only additions
- [ ] Brand voice consistent across all additions
- [ ] No new pages or assets created
- [ ] All additions read as natural extensions of existing content