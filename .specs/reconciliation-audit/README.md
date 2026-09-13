# Spec-Impl Consistency Audit — Reconciliation Report

> **Status:** Done
> **Plan:** `.omo/plans/spec-impl-consistency-audit.md`
> **Branch:** `docs/spec-impl-consistency-audit`
> **Base:** `origin/main` (post risk-reduction, mixed-rights, ai-act)
> **Executed:** 2026-09-13

## Purpose / Problem

Documents and code drift apart silently. This audit cross-checked every active spec, design doc, and process rule against the actual tree, after the cleanup-and-hardening effort completed. Every mismatch received one of three treatments: explained (planned-not-implemented), corrected (outdated document), or registered (bug ticket for later work). One owner-decision list closes the report.

## Method

1. Pre-flight gate: risk-reduction completion markers (11/11 pass), sibling-plan markers (2/2 pass), validation baseline recorded.
2. Evidence-base reconciliation: BACKLOG pruned to open work; CHANGELOG consolidated ([Unreleased] first, versions strictly descending, em-dash normalized, duplicates dropped).
3. Implementation inventory: 421 artifacts enumerated; orphan candidates via live-reference scans with planted positive/negative controls (controls detected then removed).
4. Conformance batches A–D: all 41 active specs, 25 design docs, and 13 process/rule docs verified claim-by-claim.
5. Frontmatter schema conformance: 71 renderable sources validated (0 violations).
6. Residual-deletion verification: `check:stale`, `check:docs`, `check:consistency` all green.
7. Dispositions: (b) corrections committed, (a) annotation added, (c) cluster registered.

**Correction note:** several initial batch findings (emne, perspektiv, triader, and 12 of 13 V/P feature specs) were first classified planned-not-implemented, then empirically re-verified and found SHIPPED (via inbound W2–W4, PRs #227/#228, and BU1 renames). The registry below reflects the post-re-verification state; the BACKLOG statuses were reconciled accordingly.

## Results Summary

| Class | Count | IDs |
|-------|-------|-----|
| CLEAN (spec/design/rule) | 66 | — |
| (b) Outdated — corrected | 9 | RA-D001, RA-D002, RA-D003, RA-D021, RA-D022*, RA-D023, + perspektiv/triader/makt stale filenames |
| (a) Planned-not-implemented — annotated | 1 | RA-D005 (i18n, FF2 Blocked) |
| (c) Confirmed orphans — registered | 7 files / 1 cluster | RA-O001…RA-O007 → RA2 |
| Escalations (owner decision) | 3 | RA-E001, RA-E002, RA-E003 |

*RA-D022 was a false positive — `frames.md` was already correct; registry corrected.

## Master Registry (final)

| ID | Surface | Finding | Disposition |
|----|---------|---------|-------------|
| RA-D001 | `.specs/seo/README.md` | Claimed planned; S1–S4/S6 shipped; S5 icons + S7 pending | Status note added ✅ |
| RA-D002 | `.specs/social-previews/README.md` | Claimed planned; R1–R4/R6 shipped, R5 evaluated-not-adopted | Status updated ✅ |
| RA-D003 | `.specs/semantic-metadata/README.md` | Status line contradicted SUPERSEDED banner | Status aligned ✅ |
| RA-D005 | `.specs/i18n/README.md` | FF2 Blocked; substrate scope not built | `## Implementation status` added ✅ |
| RA-D021 | `AGENTS.md` | Duplicate linting row; dead matchers in brand-voice row | Fixed ✅ |
| RA-D023 | `.omo/rules/frontmatter.md`, `brand-voice.md`, `content-management.md` | Dead `_profiles/*`/`_products/*` matchers; stale field names | Fixed ✅ |
| RA-D006/D007 | perspektiv/triader/makt specs | Stale `ledelse_*` filenames in File sections | Repointed ✅ |
| RA-O001–007 | 2 layouts + 5 includes | Zero live references (primary + secondary patterns) | Registered as RA2 ✅ |
| RA-E001 | booking-direct-links | Superseded by bestill-booking-page strategy | Do not implement |
| RA-E002 | brand-trait-reconciliation | Model A vs B undecided | Owner decision |
| RA-E003 | quiz | Conflicts with no-scoring principle | Blocked |

## Coverage Manifest

All 41 active specs, 25 design docs, 13 rules files, AGENTS.md, and `.opencode/lookup.json` audited — every document carries a CLEAN verdict or a registry ID above. Full per-batch tables: `.omo/evidence/task-4…task-11-*.md` (local evidence area).

## Needs-Owner-Decision

1. **RA-E002 (brand traits):** choose Model A (brand-perception.md), Model B (BACKLOG), or hybrid — then reconcile the two documents.
2. **RA-E003 (quiz):** confirm permanent block or unblock Q1–Q5.
3. **RA2 execution:** the 7 orphan templates are registered, not deleted — approve deletion as a follow-up.

## Verification

See task 16 evidence: full test suite green (260/260), Docker build exit 0, route set unchanged, all validator scripts green post-corrections.
