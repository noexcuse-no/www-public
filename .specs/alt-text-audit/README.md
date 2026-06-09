# Alt Text Audit — Accessibility Fix Specification

## Purpose / Problem

**88 markdown images** across 13 `_pages/*.md` files have empty alt text (`![](path)`) or `![](path "")`, failing WCAG AA requirement that all non-decorative images have descriptive alternative text.

The HTML `<img>` tags in `_includes/` are correctly handled — decorative images use `alt="" aria-hidden="true"`, non-decorative ones pass descriptive alt via include parameters or frontmatter. The problem is exclusively in markdown-rendered images.

### WCAG AA Violation

SC 1.1.1 Non-text Content — All non-decorative images must have a text alternative that serves the equivalent purpose. Each of these images is content-bearing (spot illustrations for sections, challenges, stages) and needs descriptive alt text.

---

## Scope

### Files to Modify (13 files, 88 images)

| File | Image Count | Image Types |
|------|-------------|-------------|
| `_pages/ledelse_usikkerhet.md` | 21 | Logan stages, Kotter steps, culture challenges |
| `_pages/ledelse_generativ-ki.md` | 12 | KI competencies, thinking skills, red flags |
| `_pages/ledelse_forankring.md` | 9 | Decision dimensions, decision pitfalls |
| `_pages/ledelse_triader.md` | 8 | Triad properties, triad archetypes |
| `_pages/ledelse_tillit.md` | 8 | Trust pillars, trust challenges |
| `_pages/om_avtale.md` | 6 | Contract paragraph illustrations |
| `_pages/struktur.md` | 4 | Structure challenges |
| `_pages/mennesker.md` | 4 | People challenges |
| `_pages/påvirkning.md` | 4 | Influence challenges |
| `_pages/identitet.md` | 4 | Identity challenges |
| `_pages/ledelse_perspektiv.md` | 4 | Enrammefeller (single-frame traps) |
| `_pages/om_metode.md` | 4 | Research ethics principles |
| `_pages/om_oss.md` | 3 | Value illustrations |

### Design Constraints

- Alt text must be in Norwegian Bokmål (all content language)
- No "Bilde av" prefix — descriptive text stands alone
- Alt text should describe the **concept/function** of the image, not the literal visual (these are abstract illustrations)
- Max ~15 words per alt text
- Images are abstract spot illustrations — describe what they represent, not what they look like

---

## Image Inventory — Complete with Proposed Alt Text

### `_pages/ledelse_triader.md` (8 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 112 | `![](/assets/images/banners/triader-t3-no-control.webp)` | `Abstrakt illustrasjon av triaderobusthet — tre sammenkoblede noder` |
| 118 | `![](/assets/images/banners/triader-t3-information-flow.webp)` | `Abstrakt illustrasjon av informasjonsflyt i tre baner i en triade` |
| 124 | `![](/assets/images/banners/triader-t3-conflict-resolution.webp)` | `Abstrakt illustrasjon av konfliktløsning gjennom triangulering i en triade` |
| 130 | `![](/assets/images/banners/triader-t3-resilience.webp)` | `Abstrakt illustrasjon av triaderesiliens — relasjon overlever utskifting` |
| 162 | `![](/assets/images/banners/triader-t3-project-triad.webp)` | `Abstrakt illustrasjon av prosjekttriaden: sponsor, leder og ekspert` |
| 168 | `![](/assets/images/banners/triader-t3-mentor-triad.webp)` | `Abstrakt illustrasjon av mentortriaden: mentor, mentee og kollega` |
| 174 | `![](/assets/images/banners/triader-t3-leadership-triad.webp)` | `Abstrakt illustrasjon av ledertriaden: operativ, strategisk og kulturell rolle` |
| 180 | `![](/assets/images/banners/triader-t3-bridge-triad.webp)` | `Abstrakt illustrasjon av overbroende triade som bygger bro mellom siloer` |

### `_pages/ledelse_forankring.md` (9 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 86 | `![](/assets/images/banners/forankring-t3-formal-vs-real-power.webp)` | `Abstrakt illustrasjon av gapet mellom formell og reell beslutningsmakt` |
| 96 | `![](/assets/images/banners/forankring-t3-interests.webp)` | `Abstrakt illustrasjon av interesser som byggesteiner for forankring` |
| 108 | `![](/assets/images/banners/forankring-t3-bias.webp)` | `Abstrakt illustrasjon av kognitiv bias som påvirker beslutningsvalg` |
| 118 | `![](/assets/images/banners/forankring-t3-conflict.webp)` | `Abstrakt illustrasjon av konflikt og forhandling i beslutningsprosesser` |
| 128 | `![](/assets/images/banners/forankring-t3-culture.webp)` | `Abstrakt illustrasjon av beslutningskultur og groupthink` |
| 140 | `![](/assets/images/banners/forankring-t4-confirmation.webp "")` | `Abstrakt illustrasjon av bekreftelsesbias` |
| 145 | `![](/assets/images/banners/forankring-t4-anchoring.webp "")` | `Abstrakt illustrasjon av ankerfeste som beslutningsfelle` |
| 150 | `![](/assets/images/banners/forankring-t4-sunk-cost.webp "")` | `Abstrakt illustrasjon av sunk cost-fallacy` |
| 155 | `![](/assets/images/banners/forankring-t4-overconfidence.webp "")` | `Abstrakt illustrasjon av overdreven selvtillit som beslutningsfelle` |

### `_pages/ledelse_generativ-ki.md` (12 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 72 | `![](/assets/images/banners/genki-t3-question-formulation.webp)` | `Abstrakt illustrasjon av kompetansen å formulere gode spørsmål til KI` |
| 78 | `![](/assets/images/banners/genki-t3-critical-evaluation.webp)` | `Abstrakt illustrasjon av kompetansen å vurdere KI-utdata kritisk` |
| 84 | `![](/assets/images/banners/genki-t3-human-integration.webp)` | `Abstrakt illustrasjon av å integrere KI i menneskelige arbeidsprosesser` |
| 90 | `![](/assets/images/banners/genki-t3-accountability.webp)` | `Abstrakt illustrasjon av ansvarlighet ved KI-bruk` |
| 98 | `![](/assets/images/banners/genki-t3-epistemic-humility.webp)` | `Abstrakt illustrasjon av epistemisk ydmykhet i KI-bruk` |
| 104 | `![](/assets/images/banners/genki-t3-precision.webp)` | `Abstrakt illustrasjon av presisjon av intensjon i KI-kommunikasjon` |
| 110 | `![](/assets/images/banners/genki-t3-iteration.webp)` | `Abstrakt illustrasjon av iterativ forbedring i KI-dialog` |
| 116 | `![](/assets/images/banners/genki-t3-calibration.webp)` | `Abstrakt illustrasjon av kalibrering — teste KI-selvtillit mot virkelighet` |
| 155 | `![](/assets/images/banners/genki-t4-no-human-review.webp "")` | `Abstrakt illustrasjon av rødt flagg: KI uten menneskelig review` |
| 160 | `![](/assets/images/banners/genki-t4-ki-said-it.webp "")` | `Abstrakt illustrasjon av rødt flagg: «KI sa det» som begrunnelse` |
| 165 | `![](/assets/images/banners/genki-t4-quantity-over-quality.webp "")` | `Abstrakt illustrasjon av rødt flagg: kvantitet over kvalitet i KI-bruk` |
| 170 | `![](/assets/images/banners/genki-t4-faster-less-accurate.webp "")` | `Abstrakt illustrasjon av rødt flagg: raskere men mindre nøyaktig med KI` |

### `_pages/ledelse_usikkerhet.md` (21 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 96 | `![](/assets/images/banners/usikkerhet-t3-stage-1.webp)` | `Abstrakt illustrasjon av Logans kulturstadium 1: «Livet suger»` |
| 102 | `![](/assets/images/banners/usikkerhet-t3-stage-2.webp)` | `Abstrakt illustrasjon av Logans kulturstadium 2: «Mitt liv suger»` |
| 108 | `![](/assets/images/banners/usikkerhet-t3-stage-3.webp)` | `Abstrakt illustrasjon av Logans kulturstadium 3: «Jeg er great»` |
| 114 | `![](/assets/images/banners/usikkerhet-t3-stage-4.webp)` | `Abstrakt illustrasjon av Logans kulturstadium 4: «Vi er great»` |
| 120 | `![](/assets/images/banners/usikkerhet-t3-stage-5.webp)` | `Abstrakt illustrasjon av Logans kulturstadium 5: «Livet er great»` |
| 147 | `![](/assets/images/banners/usikkerhet-t3-kotter-1.webp "")` | `Abstrakt illustrasjon av Kotters steg 1: Skap nødvendighet` |
| 153 | `![](/assets/images/banners/usikkerhet-t3-kotter-2.webp "")` | `Abstrakt illustrasjon av Kotters steg 2: Bygg en sterk koalisjon` |
| 159 | `![](/assets/images/banners/usikkerhet-t3-kotter-3.webp "")` | `Abstrakt illustrasjon av Kotters steg 3: Formuler en visjon` |
| 165 | `![](/assets/images/banners/usikkerhet-t3-kotter-4.webp "")` | `Abstrakt illustrasjon av Kotters steg 4: Kommuniser visjonen` |
| 171 | `![](/assets/images/banners/usikkerhet-t3-kotter-5.webp "")` | `Abstrakt illustrasjon av Kotters steg 5: Fjern hindringer` |
| 177 | `![](/assets/images/banners/usikkerhet-t3-kotter-6.webp "")` | `Abstrakt illustrasjon av Kotters steg 6: Skap kortsiktige seiere` |
| 183 | `![](/assets/images/banners/usikkerhet-t3-kotter-7.webp "")` | `Abstrakt illustrasjon av Kotters steg 7: Bygg videre på endringen` |
| 189 | `![](/assets/images/banners/usikkerhet-t3-kotter-8.webp "")` | `Abstrakt illustrasjon av Kotters steg 8: Forankre i kulturen` |
| 212 | `![](/assets/images/banners/usikkerhet-t4-values-practice.webp "")` | `Abstrakt illustrasjon av uoverensstemmelse mellom verdier og praksis` |
| 217 | `![](/assets/images/banners/usikkerhet-t4-tacit-knowledge.webp "")` | `Abstrakt illustrasjon av taus kunnskap som ikke deles` |
| 222 | `![](/assets/images/banners/usikkerhet-t4-silo-thinking.webp "")` | `Abstrakt illustrasjon av silotenkning i organisasjoner` |
| 227 | `![](/assets/images/banners/usikkerhet-t4-always-done.webp "")` | `Abstrakt illustrasjon av «alltid sånn her»-mentalitet` |
| 232 | `![](/assets/images/banners/usikkerhet-t4-structural-uncertainty.webp "")` | `Abstrakt illustrasjon av strukturell usikkerhet` |

### `_pages/ledelse_tillit.md` (8 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 117 | `![](/assets/images/banners/tillit-t3-psychological-safety.webp)` | `Abstrakt illustrasjon av psykologisk trygghet som tillitspilar` |
| 127 | `![](/assets/images/banners/tillit-t3-servant-leadership.webp)` | `Abstrakt illustrasjon av tjenende lederskap som tillitspilar` |
| 137 | `![](/assets/images/banners/tillit-t3-trust-system.webp)` | `Abstrakt illustrasjon av tillit som system` |
| 147 | `![](/assets/images/banners/tillit-t3-autonomy.webp)` | `Abstrakt illustrasjon av autonomi som tillitsdriver` |
| 167 | `![](/assets/images/banners/tillit-t4-hierarchical-blindness.webp "")` | `Abstrakt illustrasjon av hierarkisk blindhet som tillitsutfordring` |
| 172 | `![](/assets/images/banners/tillit-t4-info-asymmetry.webp "")` | `Abstrakt illustrasjon av informasjonsasymmetri som tillitsutfordring` |
| 177 | `![](/assets/images/banners/tillit-t4-historical-baggage.webp "")` | `Abstrakt illustrasjon av historisk bagasje som tillitsutfordring` |
| 182 | `![](/assets/images/banners/tillit-t4-inconsistent-followup.webp "")` | `Abstrakt illustrasjon av inkonsekvent oppfølging som tillitsutfordring` |

### `_pages/ledelse_perspektiv.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 104 | `![](/assets/images/banners/perspektiv-t3-strukturfellen.webp)` | `Abstrakt illustrasjon av strukturfellen — når struktur blir tvangstrøye` |
| 110 | `![](/assets/images/banners/perspektiv-t3-menneskefellen.webp)` | `Abstrakt illustrasjon av menneskefellen — når mennesker blir overfladisk` |
| 116 | `![](/assets/images/banners/perspektiv-t3-politisk-felle.webp)` | `Abstrakt illustrasjon av politisk felle — når politikk blir kynisme` |
| 122 | `![](/assets/images/banners/perspektiv-t3-symbolfellen.webp)` | `Abstrakt illustrasjon av symbolfellen — når symbolikk blir tom` |

### `_pages/struktur.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 101 | `![](/assets/images/banners/struktur-t4-role-clarification.webp "")` | `Abstrakt illustrasjon av uklar rolleavklaring som strukturutfordring` |
| 106 | `![](/assets/images/banners/struktur-t4-goal-conflict.webp "")` | `Abstrakt illustrasjon av målkonflikter som strukturutfordring` |
| 111 | `![](/assets/images/banners/struktur-t4-coordination.webp "")` | `Abstrakt illustrasjon av koordineringsproblemer som strukturutfordring` |
| 116 | `![](/assets/images/banners/struktur-t4-bureaucracy.webp "")` | `Abstrakt illustrasjon av byråkratisk byrde som strukturutfordring` |

### `_pages/mennesker.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 115 | `![](/assets/images/banners/mennesker-t4-psychological-safety.webp "")` | `Abstrakt illustrasjon av manglende psykologisk trygghet` |
| 120 | `![](/assets/images/banners/mennesker-t4-empty-values.webp "")` | `Abstrakt illustrasjon av tomme verdier som ikke etterleves` |
| 125 | `![](/assets/images/banners/mennesker-t4-silos.webp "")` | `Abstrakt illustrasjon av siloer og manglende samarbeid` |
| 130 | `![](/assets/images/banners/mennesker-t4-meaninglessness.webp "")` | `Abstrakt illustrasjon av for mye volum og for lite mening` |

### `_pages/påvirkning.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 103 | `![](/assets/images/banners/pavirkning-t4-invisible-power.webp "")` | `Abstrakt illustrasjon av usynlig beslutningsmakt` |
| 108 | `![](/assets/images/banners/pavirkning-t4-hidden-agendas.webp "")` | `Abstrakt illustrasjon av skjulte agendaer` |
| 113 | `![](/assets/images/banners/pavirkning-t4-resource-struggles.webp "")` | `Abstrakt illustrasjon av ressurskamper som maskeres som rasjonelle` |
| 118 | `![](/assets/images/banners/pavirkning-t4-too-much-agreement.webp "")` | `Abstrakt illustrasjon av for mye enighet i ledergruppen` |

### `_pages/identitet.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 101 | `![](/assets/images/banners/identitet-t4-empty-values.webp "")` | `Abstrakt illustrasjon av tomme verdier som ikke er forankret` |
| 106 | `![](/assets/images/banners/identitet-t4-individual-dominance.webp "")` | `Abstrakt illustrasjon av individuell dominans i organisasjonskultur` |
| 111 | `![](/assets/images/banners/identitet-t4-storylessness.webp "")` | `Abstrakt illustrasjon av historieløs organisasjon uten fortellinger` |
| 116 | `![](/assets/images/banners/identitet-t4-change-fatigue.webp "")` | `Abstrakt illustrasjon av forandringstretthet i organisasjonen` |

### `_pages/om_avtale.md` (6 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 20 | `![](/assets/images/banners/avtale-t4-paragraf-1.webp)` | `Abstrakt illustrasjon av avtalevilkår §1 endring og erstatning` |
| 32 | `![](/assets/images/banners/avtale-t4-paragraf-2.webp)` | `Abstrakt illustrasjon av avtalevilkår §2 fakturering og reise` |
| 42 | `![](/assets/images/banners/avtale-t4-paragraf-3.webp)` | `Abstrakt illustrasjon av avtalevilkår §3 rettigheter` |
| 54 | `![](/assets/images/banners/avtale-t4-paragraf-4.webp)` | `Abstrakt illustrasjon av avtalevilkår §4 taushetsplikt og sikkerhet` |
| 60 | `![](/assets/images/banners/avtale-t4-paragraf-5.webp)` | `Abstrakt illustrasjon av avtalevilkår §5 mislighold og force majeur` |
| 66 | `![](/assets/images/banners/avtale-t4-paragraf-6.webp)` | `Abstrakt illustrasjon av avtalevilkår §6 tvister og verneting` |

### `_pages/om_metode.md` (4 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 75 | `![](/assets/images/banners/metode-t4-respekt.webp)` | `Abstrakt illustrasjon av forskningsetisk prinsipp: respekt` |
| 79 | `![](/assets/images/banners/metode-t4-konsekvenser.webp)` | `Abstrakt illustrasjon av forskningsetisk prinsipp: gode konsekvenser` |
| 83 | `![](/assets/images/banners/metode-t4-rettferdighet.webp)` | `Abstrakt illustrasjon av forskningsetisk prinsipp: rettferdighet` |
| 87 | `![](/assets/images/banners/metode-t4-integritet.webp)` | `Abstrakt illustrasjon av forskningsetisk prinsipp: integritet` |

### `_pages/om_oss.md` (3 images)

| Line | Current | Proposed Alt Text |
|------|---------|-------------------|
| 39 | `![](/assets/images/banners/verdi-ansvarlighet.webp)` | `Abstrakt illustrasjon av kjerneverdien ansvarlighet` |
| 43 | `![](/assets/images/banners/verdi-tillit.webp)` | `Abstrakt illustrasjon av kjerneverdien tillit` |
| 47 | `![](/assets/images/banners/verdi-aerlighet.webp)` | `Abstrakt illustrasjon av kjerneverdien ærlighet` |

---

## Search Methodology

Used `grep` for `!\[\]\(` pattern across all `.md` files (`_pages/`, `_includes/`, `_layouts/`). Verified results manually by reading each page's image context. Also searched for `<img` tags in HTML files missing `alt` attribute — all HTML includes were confirmed to be correctly handled (decorative images use `alt="" aria-hidden="true"`, non-decorative ones use dynamic alt via `{{ include.alt }}`).

### Exclusions

The following are intentionally decorative and correctly handled:

- `_includes/challenge-card.html` — `alt="" aria-hidden="true"` (T4 spot next to title + body)
- `_includes/ethics-columns.html` — `alt="" aria-hidden="true"` (icon next to heading)
- `_includes/about-values.html` — `alt="" aria-hidden="true"` (value icons next to headings)
- `_includes/avtale-section.html` — `alt="" aria-hidden="true"` (decorative paragraph marker)
- `_includes/cases.html` — `alt="" aria-hidden="true"` (decorative case image)
- `_includes/card.html` — uses `alt="{{ topic.title }}"` (dynamic, correct)
- `_includes/hero.html` — uses `alt="{{ hero_alt }}"` (dynamic, correct)
- `_includes/framework-illustration.html` — uses `alt="{{ include.alt }}"` (dynamic, correct)
- `_includes/section-illustration.html` — uses `alt="{{ include.alt }}"` (dynamic, correct)
- `_includes/section-wrapper.html` — uses `alt="{{ sec_illustration_alt }}"` / `alt="{{ sec_framework_alt }}"` (dynamic, correct)
- `_includes/profiles.html` — uses `alt="{{ profile.name }}s profilbilde"` (dynamic, correct)
- `_includes/products.html` — uses `alt="{{ product.name }} — illustrasjon"` / `alt="{{ benefit.title }}"` (dynamic, correct)
- `_includes/partners.html` — uses `alt="{{ partner.name }}"` (dynamic, correct)

---

## Acceptance Criteria

- [ ] All 88 images across 13 files have descriptive alt text in Norwegian Bokmål
- [ ] Each alt text describes the concept represented, matching the section heading and body context
- [ ] No "Bilde av" prefix used — descriptive text stands alone
- [ ] All alt texts are ≤15 words
- [ ] Dark mode tested (visual only, no alt text impact)
- [ ] Build passes after all changes
- [ ] Verify with `grep '!\[\](' _pages/*.md` — zero matches

---

## Implementation Notes

All changes are one-line edits per image — replace `![](path)` with `![Alt text](path)` and `![](path "")` with `![Alt text](path "")`. The `""` signifies kramdown title attribute and should be preserved when present.

Implementation order recommendation (by complexity):
1. `_pages/om_oss.md` — 3 images, simplest
2. `_pages/om_metode.md` — 4 images, simple
3. `_pages/om_avtale.md` — 6 images, formulaic pattern
4. `_pages/struktur.md`, `mennesker.md`, `påvirkning.md`, `identitet.md` — 4 each, same T4 pattern
5. `_pages/ledelse_perspektiv.md` — 4 images, enrammefeller pattern
6. `_pages/ledelse_tillit.md` — 8 images, both T3 and T4
7. `_pages/ledelse_triader.md` — 8 images, consistent pattern
8. `_pages/ledelse_forankring.md` — 9 images
9. `_pages/ledelse_generativ-ki.md` — 12 images
10. `_pages/ledelse_usikkerhet.md` — 21 images, most complex

---

## Backlog References

A4 — Alt Text Accessibility Fix
