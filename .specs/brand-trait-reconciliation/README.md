# Brand Trait Reconciliation

> **Status:** Draft — task not yet scheduled
> **Related:** D1 in merge-conflict resolution (feature/plan-outdate-fixes)
> **Created:** 2026-05-29

## Problem Statement

There are two competing 5-trait brand personality models documented across the codebase, and neither has been formally decided as the canonical version.

### Model A — Design Interview (PR #51)

Source: `.design/brand-perception.md` (current file on main and this branch)

| Trait | Descriptor |
|-------|------------|
| Direct & Clear | Say what we mean, no consultant-speak |
| Competent | Proven results, real experience |
| Nordic (Scandinavian minimal) | Clean, functional, no fluff |
| Rebellious / Anti-establishment | Question the obvious |
| Practical | Down-to-earth, no bullshit |

Context: Came from the design interview harmonization PR (#51), authored by the design-interview branch. Format: English bullet list, no Norwegian labels, no evolution trace.

### Model B — Plan-Outdate-Fixes (our branch)

Source: `BACKLOG.md § Design Decisions` (line 383) and the original 722ce3e commit

| Trait | Norwegian | Description |
|-------|-----------|-------------|
| Rebellious | Opprørsk | Utfordrer etablerte sannheter, tar upopulære standpunkt |
| Clear | Tydelig | Komplekse ideer gjort enkle, null konsulentspråk |
| Nordic | Nordisk | Demokratisk design, ærlig, intim, jordnær |
| Trustworthy | Troverdig | Faglig tyngde, forskningsbasert, transparent |
| Bold | Modig | Tydelige standpunkt, visuelt mot, upretensiøs selvsikkerhet |

Context: Written during the plan-outdate-fixes analysis. Format: Norwegian-labeled table, includes evolution note from the original 4-trait model (Direct, Competent, Scandinavian minimal, Anti-establishment → mapped to new traits).

### Key Differences

| Dimension | Model A (design-interview) | Model B (plan-outdate-fixes) |
|-----------|---------------------------|------------------------------|
| **"Practical" vs "Bold"** | A fifth of being down-to-earth, no-nonsense | A fifth of visual/verbal courage |
| **"Competent" vs "Trustworthy"** | Proven results/experience | Factual authority, research-based |
| **Language** | English only | Norwegian trait labels + English descriptions |
| **Format** | Flat bullet list | Table with mapping from old 4 traits |
| **Evolution trace** | None | Explicit 4→5 mapping |
| **BACKLOG.md § Design Decisions** | Not updated | References Model B traits |
| **brand-perception.md** | References Model A traits | — |

### Current Inconsistency

On this branch right now:

- `BACKLOG.md` line 383 references **Model B** (Rebellious — Clear — Nordic — Trustworthy — Bold)
- `.design/brand-perception.md` contains **Model A** (Direct & Clear, Competent, Nordic, Rebellious/Anti-establishment, Practical)

These must be reconciled into one canonical model.

## Resolution Options

### Option 1: Adopt Model B (Norwegian-labeled, with Bold)

**Rationale:** BACKLOG.md already uses this model. It has Norwegian labels which aligns with the site's Norwegian Bokmål content language. The "Bold" trait captures the visual/verbal courage that's a differentiator from traditional consulting blandness. The evolution trace helps future agents understand the history.

**Changes needed:**
- Rewrite `.design/brand-perception.md` to use Model B's table format and Norwegian labels
- Move the evolution note to an appendix or keep it inline
- Ensure all content examples and voice guidelines still align with the new trait set

### Option 2: Adopt Model A (English, with Practical)

**Rationale:** This was reviewed and merged in PR #51. The "Practical" trait connects to the "folk som synes latte er pretensiøst" audience alignment — a strong differentiator. The "Competent" trait is more concrete than "Trustworthy".

**Changes needed:**
- Update `BACKLOG.md` § Design Decisions to match Model A
- Could add Norwegian translations as a secondary column

### Option 3: Hybrid

Combine elements from both. E.g.:
- Keep "Practical" (strong audience hook) but add "Bold" as a sub-trait or dimension
- Keep "Trustworthy" (research foundation is real) but keep "Competent" as execution side
- Norwegian labels + English descriptions

## Dependencies

- **None** — purely a documentation decision. No code or content changes depend on this.
- Should be resolved before any new visual design work (F6, F7, X2) to ensure consistent language.

## Acceptance Criteria

- [ ] One canonical 5-trait model is documented in both `BACKLOG.md` and `.design/brand-perception.md`
- [ ] The other model is either replaced or moved to a history/appendix section
- [ ] No contradictory references remain in the codebase
- [ ] All trait descriptions are in Norwegian Bokmål (matching site language)
- [ ] Evolution from 4-trait model is documented for future agent context
