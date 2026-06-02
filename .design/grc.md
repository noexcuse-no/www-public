# GRC Page — Design Document

## Purpose

Create a dedicated landing page at `/grc/` that positions Ledelse 60:2 as the key enabler for meaningful GRC (Governance, Risk, Compliance) work. The page bridges between the regulatory/standards world that Norwegian decision-makers recognise and the practical leadership perspective that No Excuse delivers.

## Strategic Objective

Convert visitors searching for GRC/ISO/regulatory compliance solutions into Ledelse 60:2 prospects. The page does not compete with dedicated GRC consultancies — it frames GRC as a *leadership problem* that requires cultural embedding, not just checkbox compliance.

## Brand Positioning

**Anti-consultant stance**: GRC is drowning in frameworks, certifications, and box-ticking. Most organisations achieve certification without embedding the underlying principles. No Excuse's angle: real GRC starts with how leadership thinks about risk, governance, and quality.

**Key message**: You cannot delegate GRC to a compliance officer or an ISO manual. It lives in the four perspectives — structure, people, influence, identity — and Ledelse 60:2 measures whether those perspectives are actually functioning.

## Page Structure

### 1. Hero Section
- Full-width banner (T1 image)
- Title: "Virksomhets- og risikostyring og samsvarshåndtering"
- Subtitle: "Governance, Risk and Compliance"
- Intro paragraph connecting GRC to leadership maturity

### 2. What Is GRC — The No Excuse View
- Brief, direct definition: GRC is not a department, it's how leadership thinks about risk, accountability, and improvement
- Contrast: checkbox compliance vs. embedded principles
- Lead-in: the four perspectives give you a language for GRC that actually works

### 3. The Four Perspectives on GRC
Visual framework (T2) showing how each Bolman & Deal frame maps to a GRC domain:

| Perspective | GRC Domain | What It Covers |
|-------------|-----------|----------------|
| Struktur | Compliance & Control | Roles, processes, documented responsibilities, audit trails |
| Mennesker | Culture & Ethics | Psychological safety, whistleblowing, value alignment |
| Påvirkning | Governance & Power | Decision authority, board dynamics, stakeholder management |
| Identitet | Purpose & Commitment | Organisational identity, values-based compliance, long-term integrity |

This section positions GRC as a *whole-system* challenge that single-framework approaches miss.

### 4. Domain Sections

Each section follows the same pattern:
- T3 spot image
- Heading: the domain
- Body: what it means, relevant frameworks, why leadership matters
- Inline CTA toward a relevant article or Ledelse 60:2

#### 4a. Informasjonssikkerhet og cyberresiliens
Cover: ISO 27001, DORA, NIS2, NORMEN, NSM Grunnprinsipper, GDPR
Angle: Security is not an IT problem — it's a leadership culture problem. The four perspectives reveal where security culture breaks down.

#### 4b. Miljø, helse og samfunnsansvar
Cover: Miljøfyrtårn, ISO 45001, relevant legislation, UN Global Compact
Angle: Sustainability reporting without cultural embedding is greenwashing. Real environmental governance requires identity-level commitment.

#### 4c. Kvalitetsledelse
Cover: ISO 9001, relevant legislation, contractual obligations
Angle: Quality management and profitability are the same conversation. A leadership team that doesn't understand quality as a system will treat it as an inspection burden.

### 5. How Ledelse 60:2 Strengthens Your GRC Work

Structured overview — could be a table, a stepped diagram, or a visual framework (T2). Key points:

| GRC Challenge | Ledelse 60:2 Contribution |
|---------------|---------------------------|
| Governance accountability | Measures gap between formal/reell authority |
| Risk culture | Assesses psychological safety for raising concerns |
| Compliance ownership | Evaluates role clarity and process discipline |
| Quality improvement | Identifies where structure vs. culture blocks quality |
| Sustainability integration | Maps organisational identity to stated values |

### 6. CTA Section(s)

- CTA after the Ledelse 60:2 overview (booking link)
- Soft CTAs early in the page ("Vil du vite mer?") leading to Ledelse 60:2 product page
- Inline cross-links to relevant articles throughout
- Bottom-of-page CTA with booking link

## Visual Strategy

### Image Tier Plan

| Image | Tier | Description |
|-------|------|-------------|
| Hero banner | T1 | Abstract — four overlapping frames/lenses converging on a target, azure accent on navy (Style 2) |
| Four perspectives on GRC | T2 | Framework diagram — 4-panel grid mapping perspectives to GRC domains (Style 3) |
| Security section | T3 | Single concept — shield/lock abstract (Style 3) |
| Environment section | T3 | Single concept — leaf/globe abstract (Style 3) |
| Quality section | T3 | Single concept — gear/compass abstract (Style 3) |
| Ledelse 60:2 = GRC enabler | T2 | Process flow — how L60:2 feeds into GRC maturity (Style 3) |

### Styling

- Follow existing benefit/article page patterns
- Use `.section.container--wide` for content sections
- Use `.info-box` for framework deep-dives
- Use existing CTA button classes (`.product-cta`, `.product-cta--secondary`)
- No new CSS needed — all patterns exist in the codebase
- Dark mode: images designed for light bg, test on dark mode

## Navigation Impact

- Remove "Forside" from `_data/navigation.yml`
- Add entry: `- title: GRC / url: /grc/` between "Perspektiv" and "Om oss"
- No other navigation changes

## Content Principles

1. **Direct language**: "ISO-sertifisering uten kulturell forankring er dyrebar pynt." Not "verdiskapende samsvarshåndtering."
2. **Specific, not abstract**: Name the frameworks, name the regulations, show you know the territory
3. **Always connect to leadership**: Every section ends with "and this is why leadership maturity matters"
4. **Conversion-aware**: Each domain section includes a natural bridge to Ledelse 60:2
5. **Cross-link naturally**: Link to existing articles where they provide depth
6. **Avoid checklist overload**: Mention frameworks as context, not as a specification to implement

## Relationship to Existing GRC Work

The existing `.specs/grc/README.md` defines GRC sentence inserts in existing articles. This page is a complement, not a replacement:
- The dedicated `/grc/` page is the entry point and conversion funnel
- The article inserts provide depth reinforcement when visitors read related content
- Both use the same GRC→four-perspectives mapping

## Decisions Made (User-Confirmed)

| Decision | Choice |
|----------|--------|
| Page class | `article` (education-first, content-forward) |
| Image scope | Full 6-image set in first pass |
| Navigation | Remove "Forside", add "GRC" between "Perspektiv" and "Om oss" |

## Title Strategy

Primary title: "GRC — Governance, Risk and Compliance" (short, scannable)
Subtitle/dek: "Virksomhets- og risikostyring og samsvarshåndtering" (full Norwegian expansion)
Hero title: "GRC" with intro explaining the scope
