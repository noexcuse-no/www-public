# Company Description Brand Audit — Fix Specification

## Purpose / Problem

Design and spec documents contained a company description using consultant-speak — "et norsk konsulentfirma" and "ledelsesmodenhetsanalyse" — that contradicts the brand voice (direct, no bullshit, anti-consultant) and the product's own terminology ("orientering", not "analyse"). These descriptions would propagate into AI prompts sent to users, undermining the brand.

The approved on-brand description is:

> **Bakgrunn:** noexcuse.no hjelper ledergrupper med å få bedre blikk for mennesker, identitet, struktur og påvirkning — basert på Bolman & Deals fire perspektiver. Kjerneproduktet er Ledelse 60:2, en kunnskapsbasert orientering for ledergrupper: 60 diagnostiske spørsmål på 2 timer.

Key corrections:
- ~~"konsulentfirma"~~ → "hjelper ledergrupper" (action, not label)
- ~~"ledelsesmodenhetsanalyse"~~ → "kunnskapsbasert orientering" (product's own language)
- Added Bolman & Deals four frames (core to the methodology)

## Scope

### Audited directories

| Directory | Files checked | Result |
|-----------|---------------|--------|
| `.design/` | 20 `.md` files | 1 file fixed, 1 verified clean |
| `.specs/` | 14 spec directories | 1 file fixed, rest clean |
| `.omo/notepads/` | 2 plan files | 1 file fixed |
| `_data/` | All `.yml` files | Clean — no company descriptions |
| `_products/` | All `.md` files | Clean — no company descriptions |

### Files fixed

| File | What changed |
|------|-------------|
| `.design/review-questions.md` | Prompt template Bakgrunn: replaced old consultant-speak with approved text |
| `.omo/notepads/review-questions/plan.md` | Prompt format Bakgrunn: same replacement |
| `.specs/review-questions/README.md` | Purpose: "bridge from reflection to action" → "reading to reflection" |
| `README.md` | "Management consulting...leadership maturity analysis for management teams" → on-brand description matching approved format |

### Files verified on-brand (no change needed)

| File | Description |
|------|-------------|
| `.design/photography-brief.md` | "No Excuse er et ledelsesrådgivningsselskap..." — user's own wording, on-brand |

## Acceptance Criteria

- [ ] All design docs (`design/*.md`) use on-brand language when describing the company — no "konsulentfirma", "ledelsesmodenhetsanalyse", or similar consultant-speak
- [ ] All specs (`specs/*/README.md`) use consistent on-brand company descriptions
- [ ] All AI prompt templates in design docs and plans use the approved text
- [ ] New content follows the approved text as template

## Design Constraints

- Brand voice: direct, competent, Scandinavian minimal, anti-establishment
- No consultant-speak: avoid "synergi", "verdiskapning", "bærekraftig" (as buzzwords)
- Product's own language: "orientering", not "analyse"; "diagnostiske spørsmål", not "modenhetsvurdering"
- Refer to `.design/brand-perception.md` for full voice guidelines

## Backlog References

Z1
