# Spec-Impl Consistency Audit — Reconciliation Audit

> **Status:** In Progress
> **Plan:** `.omo/plans/spec-impl-consistency-audit.md`
> **Branch:** `docs/spec-impl-consistency-audit`
> **Base:** `origin/main` (merged through risk-reduction, mixed-rights, ai-act)

## Purpose / Problem

Documents and code drift apart silently. This audit performs a full cross-check between the project's rule, spec, and design documents and the actual website implementation, run once the big cleanup-and-hardening effort has finished. Every mismatch gets one of three treatments: explained (the work is planned but not built yet), corrected (the document was outdated), or filed as a bug ticket for a later agent to fix. The output is one report listing every mismatch found, what was done about it, and the short list of cases only the owner can rule on.

## Scope

### Must Have

- **Pre-flight gate**: Verify risk-reduction-cleanup completion markers, sibling plan landing status, validation-stack baseline
- **Evidence-base reconciliation**: BACKLOG.md and CHANGELOG.md brought into conformance with their own rules; BL↔spec cross-reference matrix
- **Fresh inventories**: Doc inventory and implementation inventory generated from the ACTUAL post-precursor tree
- **Doc-driven conformance**: Every active `.specs/` doc, `.design/` doc, and process/rules layer checked claim-by-claim against the tree
- **Implementation-driven sweep**: Orphan candidates via live-reference counts, frontmatter schema conformance, aux-tree staleness, residual-deletion verification
- **Consolidation**: Master registry + coverage manifest + classification QA rules + owner-escalation list
- **Dispositions**: Surgical corrections to outdated docs; accurate per-spec Status + Implementation status annotations; bug registration
- **Central report**: `.specs/reconciliation-audit/README.md` — summary, master registry, coverage manifest, Needs-owner-decision list, orphan inventory, evidence-base summary
- **Verification**: Full validation stack == baseline, `_site` page-facing diff empty, registry spot re-audit, rule-conformance re-checks

### Must NOT Have

- Fixing ANY registered implementation bug
- Deleting ANY pre-existing file, code, CSS, JS, or asset (except audit-created control artifacts)
- Rewriting page `.md` content bodies
- New permanent tooling
- Substantive rewrites of any doc (>20% of content or new design decisions)
- Editing `.opencode/opencode.json` standing directives
- Rule edits that would change classification semantics mid-pass

## Acceptance Criteria

- [ ] Pre-flight gate passes (all risk-reduction markers verified, sibling plans landed, baseline recorded)
- [ ] BACKLOG.md contains no `Done` rows and maps 100% to live specs
- [ ] CHANGELOG.md has `[Unreleased]` first, then strictly descending versions, no duplicates
- [ ] Doc inventory and implementation inventory generated from actual tree
- [ ] Conformance tables exist for every active spec/design/process doc with coverage-manifest verdict
- [ ] Every deviation classified with cited evidence (planned-not-implemented / outdated-doc / implementation-bug / escalation)
- [ ] Master registry row count reconciles with source findings
- [ ] Coverage manifest row count == doc inventory count
- [ ] Zero unclassified rows in registry
- [ ] Surgical corrections applied for all (b) rows with post-edit re-verification
- [ ] All (a) rows have accurate Status + Implementation status annotations
- [ ] All (c) rows mapped to issue specs with BACKLOG rows (RA2+)
- [ ] Central report assembled with all required sections
- [ ] Verification: validation stack matches baseline, `_site` page-facing diff empty, 10-entry spot re-audit passes

## Dependencies

- risk-reduction-cleanup complete (T10 + T23) — **VERIFIED**
- mixed-rights-licensing-provenance landed — **VERIFIED** (REUSE.toml + LICENSES/ exist)
- ai-act-alignment landed — **VERIFIED** (/om-store-sprakmodeller/ route exists)

## Backlog References

- BACKLOG.md item RA1 → Doing
- CHANGELOG.md [Unreleased] entry (to be added on completion)

## Pre-flight Gate Evidence (2026-09-13)

### Primary Gate Markers (risk-reduction-cleanup)

| Marker | Command | Result |
|--------|---------|--------|
| `.research/` deleted | `test ! -d .research` | ✅ PASS |
| `.design/SPEC.md` deleted | `test ! -f .design/SPEC.md` | ✅ PASS |
| `.design/codebase-integrity.md` deleted | `test ! -f .design/codebase-integrity.md` | ✅ PASS |
| `.design/website-gaps-overview.md` deleted | `test ! -f .design/website-gaps-overview.md` | ✅ PASS |
| `.design/archive/` deleted | `test ! -d .design/archive` | ✅ PASS |
| `.specs/archive/` deleted | `test ! -d .specs/archive` | ✅ PASS |
| `chatgpt-strategy-conversation.json` deleted | `test ! -f chatgpt-strategy-conversation.json` | ✅ PASS |
| `chatgpt-strategy-conversation-full.json` deleted | `test ! -f chatgpt-strategy-conversation-full.json` | ✅ PASS |
| `.github/SECURITY.md` exists | `test -f .github/SECURITY.md` | ✅ PASS |
| `/.well-known/security.txt` exists | `test -f .well-known/security.txt` | ✅ PASS |
| `.github/dependabot.yml` exists | `test -f .github/dependabot.yml` | ✅ PASS |

### Sibling Plan Markers

| Plan | Marker | Result |
|------|--------|--------|
| mixed-rights-licensing | `REUSE.toml` + `LICENSES/` exist | ✅ PASS |
| ai-act-alignment | `/om-store-sprakmodeller/` route exists | ✅ PASS |

### Validation Stack Baseline

| Check | Command | Result |
|-------|---------|--------|
| Docker Jekyll build | `docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/srv/jekyll" -w /srv/jekyll -e JEKYLL_ENV=production jekyll/jekyll jekyll build` | ✅ PASS (exit 0, 18.7s) |
| Route count | `find _site -mindepth 1 -maxdepth 1 -type d | grep -vE 'assets|...' | wc -l` | 42 dir routes + 22 tag routes + root + 404.html |

**Note**: npm-based validation (lint, test, scanners) not run due to environment npm cache issues; Docker build is the canonical build mechanism per `.omo/plans/jekyll-native-pages.md:48`. Baseline recorded for task 16 comparison.