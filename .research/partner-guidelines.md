# Partner Guidelines — Conversation Flow

> **Purpose:** A practical guide for the No Excuse team when talking to potential partners.
> **Status:** Ready for use
> **Created:** 2026-06-13
> **BL:** P6
> **Based on decisions:** All five partner types · Combination funnel · Full page depth · 1–3 handcrafted partners

---

## 1. What We Tell Partners About Our Product & Methodology

### The One-Liner

> "Vi hjelper ledergrupper med å forstå sin egen organisasjon gjennom fire perspektiver — struktur, mennesker, identitet og påvirkning — basert på Bolman & Deals rammeverk. Hovedproduktet vårt er *Ledelse 60:2*: 60 diagnostiske spørsmål på 2 timer."

### Key Points to Cover

| Topic | What to say |
|-------|-------------|
| **The problem we solve** | Ledergrupper opererer ofte med blindsoner — de ser organisasjonen fra bare ett eller to perspektiver. Ledelse 60:2 avdekker disse blindsonene på 2 timer. |
| **What makes us different** | Vi er anti-konsulent — ingen tungrapport, ingen langvarig prosess. Tidseffektiv, kunnskapsbasert, direkte. |
| **Evidence base** | Bolman & Deal (1991, 2021) — 30+ år med forskning på organisasjonsrammeverk. Fire perspektiver er validert på tvers av bransjer og kulturer. |
| **Format** | 60 spørsmål fordelt på fire perspektiver, besvares av ledergruppen individuelt, scores og diskuteres i fellesskap. |
| **Typical outcome** | Felles språk, identifiserte blindsoner, konkrete handlinger for å balansere perspektivene. |

### What to avoid

- Don't oversell — it's a 2-hour orientation, not a full transformation
- Don't use consultant-speak ("helhetlig", "verdiøkende", "bærekraftig" — these trigger skepticism)
- Don't promise specific results ("30 % reduksjon i..." — that depends on the partner's follow-up)

---

## 2. What Partners Need to Provide

### For Their Partner Page on noexcuse.no

| Asset | Format | Deadline |
|-------|--------|----------|
| Logo | SVG preferred, min 400×400px PNG fallback, transparent background | Before launch |
| Company description | 150–200 words: who they are, what they do, who they serve | Before launch |
| Services list | 3–5 bullet points: what they offer clients | Before launch |
| Industries | 3–5 industries they specialize in | Before launch |
| Methodology note | 100–150 words on how they use / plan to use the four frames | Before launch |
| Case studies (optional) | 1–2 co-branded case studies (follow template from `.research/case-intake-toolkit.md`) | Within 3 months |
| UTM parameters | `?utm_source=partner-{name}&utm_medium=referral` for all tracked links | Before launch |

### For Redirecting Visitors Back

| Channel | What partner provides | Where it goes |
|---------|----------------------|---------------|
| Newsletter | Brief mention + link | Partner-specific landing page on noexcuse.no |
| Social media | Post about collaboration | Partner-specific landing page or article |
| Client meetings | Mention Ledelse 60:2 as tool | Direct booking link: `/ledelse-60-2/#booking` |
| Website | Logo + link in partner section | Partner's page on noexcuse.no (which then links back) |

### Co-Branded Materials

For implementation partners who want co-branded materials:
- Slide deck template with both logos
- One-pager with joint value proposition
- Case study template with co-branded header
- LEDelse 60:2 discount code for partner's clients

---

## 3. How Partners Redirect Visitors Back to noexcuse.no

### Default UTM Convention

All outbound links from noexcuse.no to partner sites use:
```
?utm_source=noexcuse&utm_medium=partner&utm_campaign={partner_slug}
```

All inbound links from partner sites to noexcuse.no should use:
```
?utm_source={partner_slug}&utm_medium=partner-referral
```

### Funnel Entry Points

| Partner type | Primary funnel route | How it works |
|-------------|---------------------|--------------|
| **Implementation** | Booking link → demo → sale | Partner sends qualified leads directly to booking |
| **Referral** | Article link → awareness → booking | Partner shares relevant article → reader explores → books |
| **Technology** | Integration page → mutual customers | Partner lists integration on their marketplace → leads find us |
| **Reseller** | White-label → their brand → backend | Reseller sells under their name, fulfillment via No Excuse |
| **Alliance** | Co-branded landing page → joint webinar → both funnels | Shared content drives leads to both parties |

### Tracking

- Use UTM parameters on all tracked links
- Log partner-driven inquiries in the CRM with partner name
- Monthly check-in: how many leads came from this partner, conversion rate

---

## 4. Commercial Terms Overview

> These are guidelines, not a binding contract. All terms must be formalized in a partner agreement.

### Commission & Revenue Share

| Partner type | Model | Typical range |
|-------------|-------|---------------|
| Implementation | Per-booking commission | 15–25 % of Ledelse 60:2 fee |
| Referral | Fixed referral fee per closed lead | NOK 5,000–15,000 per booking |
| Reseller | Wholesale discount on list price | 30–50 % discount |
| Alliance | Revenue share on joint deals | 50/50 on co-sold engagements |

### Pricing

- Standard Ledelse 60:2 list price: [set by No Excuse]
- Partner discount: [negotiated per partner]
- Volume tiers: [if applicable]

### Payment Terms

- Net 30 from invoice date
- Commission paid within 15 days of client payment
- Disputed amounts held until resolved

---

## 5. Legal & Contractual Requirements

### Partner Agreement Must Cover

- [ ] Scope of partnership (which type, which services)
- [ ] Term and termination (min 6 months, 30-day notice)
- [ ] Commission / fee structure
- [ ] Payment terms
- [ ] IP ownership (No Excuse retains all IP for Ledelse 60:2 methodology)
- [ ] Brand usage guidelines (how partner can use No Excuse logo)
- [ ] Confidentiality
- [ ] Non-compete (partner won't offer competing diagnostics)
- [ ] Data protection (GDPR compliance for shared leads)
- [ ] Liability and indemnification

### Brand Usage Rules

- Partner may use "No Excuse Partner" badge (provide SVG)
- Partner may not modify No Excuse logo
- Partner may not claim ownership of the four-frames methodology
- All co-branded materials require No Excuse approval before publication
- Partner must include "Basert på Bolman & Deals fire perspektiver" attribution

### Approval Workflow

```
Initial conversation → Share one-pager → Partner expresses interest
    → Send partner agreement → Signed → Create partner page
    → Kick-off meeting → Ongoing
```

### Partner Checklist (per new partner)

- [ ] Partner type confirmed and logged
- [ ] Funnel roles agreed
- [ ] Logo and assets received
- [ ] Partner page created in `_pages/`
- [ ] UTM conventions documented
- [ ] Partner agreement signed
- [ ] Commission structure documented
- [ ] Kick-off meeting completed
- [ ] Joint case study plan (if applicable)
