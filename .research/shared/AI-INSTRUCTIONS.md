# AI Knowledge Base — No Excuse AS Website

## Purpose

This document describes how AI agents should interact with the No Excuse AS website knowledge base for three distinct use cases.

## Three AI Contexts

### 1. Internal Dev AI

**Who:** AI agents working on the website codebase (modifying, extending, debugging).

**How to use:**
- Read `.specs/` documents for functional specifications
- Read `.design/` documents for design guidelines
- Reference frontmatter schemas in product/profile/case files
- Follow patterns in `_includes/` for reusable components
- Check `.specs/architecture/README.md` for path handling rules

**Key files:**
- `.specs/ledelse-60-2/README.md` — Product schema and requirements
- `.specs/architecture/README.md` — Path handling, collections, URL patterns
- `.specs/knowledge-base/README.md` — This document
- `.design/components.md` — Component specifications
- `assets/bibliography/briefs/*.md` — Source material for content

### 2. Visitor AI (Web Crawlers/Discovery)

**Who:** AI agents visiting noexcuse.no to discover, understand, and categorize the company's offerings.

**How to use:**
- Parse page frontmatter for JSON-LD structured data
- Follow links to `/vitenskapelig-grunnlag/` for methodology
- Reference bibliography for scientific grounding
- Use `sitemap.xml` for site structure overview

**JSON-LD Schemas:**
- `Organization` — No Excuse AS company information
- `Service` — Ledelse 60:2 service offering
- `TechArticle` — Scientific methodology documentation

**Key endpoints:**
- `/ledelse-60-2/` — Product landing page
- `/vitenskapelig-grunnlag/` — Scientific foundation
- `/om-oss/` — Company information

### 3. Customer AI (Report Follow-up)

**Who:** AI agents accompanying customer reports from Ledelse 60:2 engagements, following up on improvement recommendations.

**How to use:**
- Read bibliography briefs for theoretical context
- Reference specific sources mentioned in report findings
- Explore related concepts for deeper understanding
- Link to further development points on noexcuse.no

**Bibliography briefs:**
- `assets/bibliography/briefs/bolman-deal-2017.md` — Four-frame model (core framework)
- `assets/bibliography/briefs/pfeffer-2010.md` — Power dynamics (political frame)
- `assets/bibliography/briefs/blanchard-barrett-2011.md` — Servant leadership (HR frame)
- `assets/bibliography/briefs/logan-2011.md` — Tribal stages (symbolic frame)
- `assets/bibliography/briefs/hubbard-2014.md` — Measurement methodology (structural frame)
- `assets/bibliography/briefs/synthesis.md` — Integrated overview

**Key links for Customer AI:**
- `/vitenskapelig-grunnlag/` — Full methodology explanation
- `/ledelse-60-2/` — Product offering for continued engagement

## Knowledge Base Structure

```
.internal/
  Dev AI specifications and schemas
  
.public/
  JSON-LD data embedded in pages
  
.bibliography/
  Source material briefs for Customer AI reference
```

## JSON-LD Implementation

JSON-LD is embedded in page frontmatter using a `json_ld` key. Pages parse this into `<script type="application/ld+json">` tags in the head.

Example frontmatter:

```yaml
---
layout: default
title: "Ledelse 60:2 — Modenhetsanalyse for ledergruppen"
json_ld:
  type: "Service"
  name: "Ledelse 60:2"
  description: "Tidseffektiv modenhetsanalyse for ledergruppen"
  provider:
    type: "Organization"
    name: "No Excuse AS"
  url: "https://noexcuse.no/ledelse-60-2/"
  areaServed: "NO"
  serviceType: "Leadership Assessment"
---
```

## Development vs Production

| Aspect | Dev AI (.specs/) | Visitor AI (JSON-LD) | Customer AI (briefs) |
|--------|-------------------|----------------------|---------------------|
| Location | `.specs/` directory | Page frontmatter | `assets/bibliography/` |
| Format | Markdown documentation | JSON-LD in HTML | Markdown briefs |
| Purpose | Implementation guidance | Discovery and categorization | Follow-up research |
| Audience | Website developers | Web crawlers, AI agents | Report readers |

## Maintenance

When updating:
- **Products**: Update both `.specs/` (for dev) and frontmatter JSON-LD (for visitors)
- **Methodology**: Update both `_pages/` page content and bibliography briefs
- **Design**: Update `.design/` documentation

## Dependencies

- Bibliography briefs in `assets/bibliography/briefs/`
- JSON-LD parsing via Jekyll plugins or preprocessing
- Site地图 at `/sitemap.xml` for structure overview
