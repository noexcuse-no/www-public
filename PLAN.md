# No Excuse AS - Website Redesign Project Plan

## Project Overview

**Project:** Best-in-class inbound sales landing page for No Excuse AS
**Goal:** Transform website into high-converting sales landing spot for inbound marketing
**Tone:** No-nonsense, results-driven, anti-corporateSpeak (for SMB leaders who find lattes pretentious)
**Language:** Norwegian (Bokmål)

---

## Git Branch Rule

**STRICT:** Before creating or modifying ANY files:
1. Check current branch: `git branch --show-current`
2. If branch matches pattern `feature/*` or is `main`:
   - Create and checkout new branch FIRST
   - NEVER modify files while on main
3. Pattern `feature/*` triggers branch creation requirement
4. Always create branch before making changes

**Website Redesign Branch:** `features/website-redesign-plan`

---

## Current State Analysis

### Existing Assets
- Logo: `assets/images/noexcuse-logo-azure.png`
- Service: "Ledelse 60:2" (leadership maturity assessment)
- Profile: Dagfinn Bang-Johansen (CEO)
- Basic Jekyll layout with light/dark theme
- Minimal homepage content

### Website Structure
```
www-public/
├── _config.yml           # Collections: profiles, products, cases, partners
├── _data/metadata.yml  # SEO/social metadata
├── _includes/        # HTML partials (header, footer, navbar, etc.)
├── _layouts/default.html
├── _products/        # Service pages
├── _profiles/       # Team member profiles
├── assets/css/       # 13 CSS modules
├── assets/images/   # Logo, profile images
└── index.md       # Homepage (minimal)
```

---

## Research Findings

### Competitor Landscape (Norway)

| Company | Positioning | Tone | Key Differentiator |
|---------|------------|------|------------------|
| Flyt Ledelse (Tønsberg) | Find flyten i folk | Professional, warm | Communication & change |
| Scandinavian Leadership Consulting | Data-driven decisions | Academic, formal | Research-based |
| Strategica | Science-backed | Corporate | 8000+ leaders developed |
| HR Folk | HR for SMB | Practical, service | Flexible, remote |
| Ribert | Culture & communication | Diplomatic | Conflict resolution |
| Norsemen | Org culture | Experienced, solid | Leader groups |
| Kulturkompaniet | Actors + leadership | Creative, theatrical | Train the trainer |
| Kulturhoder | Development | Minimalist | Tight on structure |

### Market Positioning Opportunity
- **Most competitors are polished/corporate** - No Excuse can be direct and real
- **Many use flow/transformation language** - No Excuse can focus on practical results
- **Glossy websites** - No Excuse can be anti-bullshit

---

## Brand Character (Brainstorming Output)

### Brand Personality
- **Direct:** Say what we mean, no consultant-speak
- **Competent:** Proven results, real experience
- **Scandinavian minimal:** Clean, functional, no fluff
- **Anti-establishment:** Question the obvious, challenge conventions

### Brand Perception Target
- "We say what others think but don't say out loud" - slightly rebellious
- "These guys actually get it done"
- "Not another consultancy with fancy words"
- "Practical, not pretentious"
- "They sound like real people"

### Target Audience
- **Industry:** All SMB, focus on logistics
- **Company size:** 5-50 ansatte
- **Roles:** Founders + middle management
- **Geographic:** National, Oslo/Østlandet focus
- **Persona:** Down-to-earth, no-bullshit people who may consider electric bikes and caffe lattes pretentious

### Competitive Differentiation
1. **Method** - Reflection-driven approach (60 diagnostic questions vs surveys)
2. **Language** - Direct, no corporateSpeak
3. **Price** - More accessible
4. **Speed** - 2 hours vs typical 2-week assessment

### Value Proposition Angles
1. Leadership that works in real SMB conditions
2. Culture development without the corporate workshop
3. Communication that addresses risk and opportunity
4. No fluff, measurable outcomes

---

## Design Principles (UI/UX)

### Content Philosophy
- **Minimal text** - Short, punchy headlines only
- **Visual-first** - Icons, graphics, clear hierarchy
- **Direct CTAs** - One action per section
- **Mobile optimized** - Scannable content, large touch targets

### Graphic Approach
- Use icons for service representation
- Minimal illustrations
- Clean data visualization for case studies
- Professional photography (when available)

### Mobile-First Requirements
- 320px minimum breakpoint
- 44px minimum touch targets
- Fast load (<3s)
- Scannable content structure

---

## Services Portfolio

| # | Service | Description | Status |
|---|---------|------------|--------|
| 1 | Ledelse 60:2 | Leadership maturity assessment via 60 diagnostic questions | Existing (refine) |
| 2 | Katalysator | Org development via observation, audits, team diagnostics, continuous feedback - supports leadership, culture, trust, engagement, lean practice | New |

### Service Pages Structure
- Problem statement
- Solution approach
- Proof/case examples
- Clear CTA

---

## Team

| Name | Role | LinkedIn | Status |
|------|------|---------|--------|
| Dagfinn Bang-Johansen | CEO, Leadership + Logistics | linkedin.com/in/bang | Update profile |
| Rasmus Sylvester Olsen | Co-founder (not public) | linkedin.com/in/rso | Not on site |

---

## Case Studies

Placeholder case studies (real examples to be added later):
1. SMB Leadership - Mid-size company leadership assessment
2. Culture Change - Organization improvement
3. Communication - Internal messaging transformation

---

## Execution Phases

### Phase 0: Brainstorming
- [x] Brand positioning research
- [x] Competitor analysis
- [x] Brand character definition
- [x] Differentiation strategy
- [x] Target audience definition

### Phase 1: Brand Design
- [x] Create `.design/` folder structure
- [ ] Visual identity rules
- [ ] Color palette specification
- [ ] Typography selection
- [ ] Iconography approach
- [ ] Graphic element standards
- [ ] Brand perception configurations (tone guide)

### Phase 2: UI/UX Design
- [ ] Wireframe layouts for all pages
- [ ] Mobile-first design patterns
- [ ] CTA hierarchy and placement
- [ ] Conversion funnel visualization
- [ ] **Generate graphic drafts for user approval**
- [ ] **Preserve accepted graphics as reference documents in `.design/graphics/`**

### Phase 3: Foundation
- [ ] Update `_config.yml` collections
- [ ] Site architecture (homepage, services, contact)
- [ ] Update metadata/SEO for all page types
- [ ] Microsoft Bookings integration
- [ ] Create page templates

### Phase 3: Foundation
- [ ] Update `_config.yml` collections
- [ ] Site architecture
- [ ] Update metadata/SEO
- [ ] Create page templates

### Phase 4: Content
- [ ] Homepage (hero + value proposition + services + direct booking CTA)
- [ ] Service: Ledelse 60:2 (refine existing)
- [ ] Service: Katalysator (new page)
- [ ] Case Studies (2-3 placeholder templates)
- [ ] Profile: Dagfinn Bang-Johansen (update bio)
- [ ] Configure Microsoft Bookings links

### Phase 5: Design Implementation
- [ ] Mobile-first CSS
- [ ] Touch-friendly CTAs
- [ ] Light/dark theme
- [ ] Graphic elements
- [ ] Test all responsive breakpoints

### Phase 6: Testing
- [ ] Lint HTML/CSS/JS
- [ ] Mobile responsive check
- [ ] Accessibility (WCAG)
- [ ] OG tags verification
- [ ] Link validation

---

## Timeline Estimate

| Phase | Focus | Est. Days |
|-------|-------|----------|
| 0 | Brainstorming + research | 1 |
| 1 | Brand Design | 1 |
| 2 | UI/UX Design | 1 |
| 3 | Foundation | 1 |
| 4 | Content | 2 |
| 5 | Design Implementation | 2 |
| 6 | Testing | 1 |
| **Total** | | **1-2 weeks** |

### Target Completion
**ASAP** - Expedited timeline

---

## Key Constraints

### Prerequisites (Fixed)
- Logo: `noexcuse-logo-azure.png` (use this)
- Company name: No Excuse AS
- Product names: Ledelse 60:2, Katalysator

### Technical Stack
- **Hosting:** GitHub Pages
- **Booking:** Microsoft Bookings (direct integration)
- **Analytics:** Clicky (existing)
- **CMS:** Jekyll (static)

### Design Rules
- Language: Norwegian Bokmål
- Target audience: SMB founders/leaders who find lattes pretentious
- No corporateSpeak - use direct language
- Minimal text, graphics-first
- Mobile-first for all content
- 320px minimum breakpoint
- 44px minimum touch targets

### Conversion Flow
1. **Primary:** Order Ledelse 60:2 directly → select implementation date → confirmation
2. **Secondary:** Download lead magnet / Contact / Newsletter

---

## Design Folder Structure

```
.design/
├── SPEC.md                    # Overall design specification
├── colors.md                 # Color palette (hex codes)
├── typography.md            # Font hierarchy
├── layouts.md             # Page layouts/wireframes
├── components.md         # Reusable components (buttons, cards)
├── graphics/           # Reference graphics (approved by user)
│   ├── homepage-wireframe.png
│   ├── service-card.png
│   ├── cta-button.png
│   └── brand-perception.png
└── brand-perception.md  # Tone guide, voice guidelines

---

## Deliverables

### Content Framework
- Tone guide (anti-corporate)
- Content templates
- SEO strategy

### Service Pages (2)
- Ledelse 60:2
- Katalysator

### Case Studies (2-3)
- Placeholder templates (real data later)

### Homepage
- Hero with clear value proposition
- Service highlights
- Single primary CTA: "Snakk med oss" / "Bestill samtale"

### Design
- Mobile-responsive CSS
- Touch-friendly CTAs (44px minimum)
- Light/dark theme
- Graphic elements

---

## Acceptance Criteria

- [ ] Clear value proposition visible in <3 seconds on mobile
- [ ] Primary CTA (order + date picker) one tap from hero
- [ ] Services understandable without reading paragraphs
- [ ] Mobile-first (content readable on 320px)
- [ ] Tone matches target audience (no fluff)
- [ ] Direct booking with date selection works
- [ ] All pages pass HTML validation
- [ ] Accessibility WCAG compliant
- [ ] Clicky analytics tracking configured

---

## Notes for Future Agents

1. **Workflow:**
   - Phase 1 (Brand Design): Create text-based design specifications
   - Phase 2 (UI/UX Design): Use specifications to generate graphic prompts
   - Approved graphics become reference documents in `.design/graphics/`

2. **Graphic generation:**
   - Use nanobanana graphics generation skills
   - Always generate visual examples for user approval before implementation
   - Save accepted graphics as key reference documents

3. **Mobile-first:** Test all designs at 320px minimum

4. **Minimal text:** Keep headlines under 10 words where possible

5. **Direct language:** No consultant-speak, no corporate fluff

6. **Booking integration:** Microsoft Bookings for direct date selection

7. **Key bookmarks:**
   - Logo: `assets/images/noexcuse-logo-azure.png`
   - Service (Ledelse 60:2): `_products/modenhetsvurdering.md`
   - Profile: `_profiles/dagfinn.md`
   - Metadata: `_data/metadata.yml`
   - Design folder: `.design/`