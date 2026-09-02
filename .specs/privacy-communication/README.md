# privacy-communication — Feature Specification

> Status: Ready
> Strategy source: `.design/inbound-strategy.md` §9, §11
> Backlog: P0/P1 (todos 12, 17)

## Purpose / Problem

The AI-reflection feature raises privacy questions that must be communicated clearly and honestly. The strategy defines a 3-layer privacy communication model: signature lines beside AI CTAs (L1), a three-box expandable panel (L2), and a plain-language transparency page at /personvern-ki/ (L3). The wording must never overclaim privacy — the conversation happens in the visitor's own AI, and No Excuse does not see it.

## Scope

- L1: signature lines beside AI CTAs in `_includes/questions.html` modal + rail card
- L2: three-box expandable panel near AI CTAs
- L3: new page `_pages/personvern_ki.md` (permalink /personvern-ki/)
- Wording rule enforced sitewide

## Acceptance Criteria

- [ ] L1 signature lines: "Vi stiller spørsmålene. Du beholder svarene." + "No Excuse får ikke se samtalen med KI-en."
- [ ] L2 three-box table: No Excuse ser / No Excuse ser ikke / KI-tjenesten din
- [ ] L2 "ser"-box lists EXACTLY what analytics records post-todo-20: sidebruk, valgt tema, prompt kopiert, retur — no more
- [ ] L2 guidance line: "Bruk virksomhetens godkjente KI-tjeneste. Ikke del personopplysninger, forretningshemmeligheter eller annen informasjon dere ikke ville delt med den tjenesten ellers."
- [ ] L3 /personvern-ki/ page in plain language: what the button does → what leaves noexcuse.no → what No Excuse logs → never receives → what the AI supplier may receive → analytics → research → contact/privacy rights
- [ ] Legal text links beneath, not instead
- [ ] Wording rule enforced sitewide: "Samtalen deles ikke med No Excuse" (never "samtalen er privat")
- [ ] Research = separate explicit opt-in, default none, no raw transcripts, not marketed until real partner
- [ ] Dark mode tested
- [ ] Mobile layout tested

## The Three Layers

| Layer | Where | Content |
|-------|-------|---------|
| L1 | Signature lines beside AI CTAs | "Vi stiller spørsmålene. Du beholder svarene." + "No Excuse får ikke se samtalen med KI-en." |
| L2 | Three-box expandable panel near AI CTAs | No Excuse ser / ser ikke / KI-tjenesten din |
| L3 | /personvern-ki/ page | Plain-language transparency |

## L2 Three-Box Table

| No Excuse ser | No Excuse ser ikke | KI-tjenesten din |
|---------------|--------------------|------------------|
| sidebruk, valgt tema, prompt kopiert, retur | samtale, svar, organisasjonsinfo | leverandørens vilkår |

The "ser"-box MUST list exactly what analytics records post-todo-20 (sidebruk, valgt tema, prompt kopiert, retur) — no more.

## Wording Rule

Never claim "samtalen er privat". The exact wording is **"Samtalen deles ikke med No Excuse"** — the conversation happens in the visitor's own AI (their supplier's terms apply), and No Excuse does not see it.

## Design Constraints

- Touch targets: minimum 44×44px
- Use CSS variables from `colors.css`
- Both themes
- Norwegian Bokmål
- Plain language (accessibility)
- No legalistic GDPR wall as primary content
- No claim of universal privacy

## Dependencies

- `.specs/ai-private-reflection/README.md` (feature surface)
- `.specs/analytics-events/README.md` (what analytics records)
- `.specs/privacy/README.md` (privacy invariants)
- `.design/inbound-strategy.md` (strategy)
