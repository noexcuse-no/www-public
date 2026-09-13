# Semantic Metadata Architecture — No Excuse AS Website

> Created: 2026-06-03
> Status: Draft
> Replaces: `.specs/c2pa-cc0-licensing/README.md` (absorbed into this broader spec)
> SUPERSEDED: the legacy `ai_provenance` vocabulary (`machine_assisted|machine_generated`) and the never-created `_data/licenses.yml`/`provenance.yml`/`creator.yml`/`ai_tools.yml` design are superseded by the `provenance:` frontmatter schema (`creation`, `editorial_review`, `editorial_responsibility`) — see `.specs/mixed-rights-licensing/README.md`. This document is retained as reference only.

---

## Purpose

Define a comprehensive, dual-format metadata architecture that makes noexcuse.no a semantically rich website. Every page, image, and asset carries machine-readable declarations about its content type, provenance, licensing, and AI involvement.

---

## Scope

### Content coverage

| Type | Coverage |
|------|----------|
| Text (articles, pages) | All 16+ pages in `_pages/` |
| Images | All 186 WebP files in `assets/images/` and `assets/images/banners/` |
| Source code (CSS, JS) | All site-originated code (`assets/css/*.css`, `assets/scripts/*.js`) |
| Templates (HTML/Liquid) | `_layouts/`, `_includes/` |

### File coverage

| File | Status |
|------|--------|
| `_data/metadata.yml` | Update — expand with provenance, licensing, creator fields |
| `_data/licenses.yml` | Create — CC0 entry |
| `_data/provenance.yml` | Create — categories, digitalSourceType mappings, defaults |
| `_data/creator.yml` | Create — No Excuse AS org data |
| `_data/ai_tools.yml` | Create — Claude, EvoLink references |
| `_includes/provenance-jsonld.html` | Create — JSON-LD @graph for all assets |
| `_includes/metadata.html` | Update — add `<link rel="license">`, RDFa `prefix` |
| `_layouts/default.html` | Update — add `<html prefix="...">`, `<body itemscope>` |
| `_layouts/page.html` | Update — add `article typeof="Article"` RDFa wrapper |
| `_layouts/perspektiv.html` | Update — add `article typeof="Article"` RDFa wrapper |
| `_includes/hero.html` | Update — add `figure typeof="ImageObject"` RDFa |
| `_includes/profiles.html` | Update — add `div typeof="Person"` RDFa |
| `_includes/footer.html` | Update — add AI declaration line |
| `_pages/om_oss.md` | Update — add LLM section with collapsebar process |
| `scripts/apply-provenance.sh` | Create — exiftool IPTC + CC0 batch script |
| `/.well-known/ai-transparency.json` | Create — AI transparency manifest |
| `package.json` | Update — license: CC0-1.0 |
| `_config.yml` | Update — add license metadata |
| `BACKLOG.md`, `CHANGELOG.md` | Update — track work |
| `.design/semantic-metadata.md` | Create — architecture and design decisions |
| `.design/c2pa-cc0-licensing.md` | Superseded — kept for reference |

---

## Architecture — Dual-Format

### Overview

Two independent metadata layers work together:

```
┌────────────────────────────────────────────────────────────────┐
│  Layer A: JSON-LD (script in <head>)                           │
│  Site-wide + page-level structured data                        │
│  Google, crawlers, AI training dataset indexers                │
├────────────────────────────────────────────────────────────────┤
│  Layer B: RDFa (attributes on HTML elements)                    │
│  Inline semantic markup on content                             │
│  Screen readers, browser extensions, semantic scrapers         │
│  IAL for element-level exceptions                              │
├────────────────────────────────────────────────────────────────┤
│  Layer C: File-level (IPTC XMP via exiftool)                   │
│  Image metadata embedded in WebP files                         │
│  Platforms (Meta, Google Merchant, stock photo APIs)           │
├────────────────────────────────────────────────────────────────┤
│  Layer D: Transparency manifest (/.well-known/)                │
│  AI crawler discovery, future standards                        │
└────────────────────────────────────────────────────────────────┘
```

### Layer A — JSON-LD

**Format:** `<script type="application/ld+json">` injected via `_includes/provenance-jsonld.html`.

**Data sources:**

| Source | What | Example |
|--------|------|---------|
| `_data/metadata.yml` | Site-wide Organization info | name, url, logo, foundingDate |
| `_data/creator.yml` | Publisher / creator | name, orgno, url |
| `_data/provenance.yml` | Provenance defaults, category->digitalSourceType mapping | `editorial` → `CompositeWithTrainedAlgorithmicMediaDigitalSource` |
| `_data/licenses.yml` | License references | cc0: { url, name } |
| `page.json_ld` frontmatter | Page-specific JSON-LD data | Article type, author, citation |
| `page.provenance.creation` | Per-page provenance (optional — only when known) | `human-created` | `editorial` | `ai-generated` | `ai-assisted` | `third-party` | `unresolved` |
| Hardcoded in include | Per-type defaults | Images always `TrainedAlgorithmicMediaDigitalSource` |

**Output** — One `@graph` array with entries for all asset types present on the page:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    /* WebSite — from _data/metadata.yml */
    {
      "@type": "WebSite",
      "name": "No Excuse AS",
      "url": "https://noexcuse.no",
      "publisher": { "@type": "Organization", "name": "No Excuse AS" }
    },
    /* WebPage — from page frontmatter + provenance */
    {
      "@type": "WebPage",
      "@id": "https://noexcuse.no/tillit/",
      "name": "Bedre ledelse uten byråkrati",
      "description": "...",
      "license": "https://creativecommons.org/publicdomain/zero/1.0/",
      "digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/CompositeWithTrainedAlgorithmicMediaDigitalSource",
      "mainEntity": {
        "@type": "Article",
        "headline": "...",
        "author": { "@type": "Organization", "name": "No Excuse AS" },
        "digitalSourceType": "..."
      }
    },
    /* ImageObject — one per image, all TrainedAlgorithmicMediaDigitalSource */
    { "@type": "ImageObject", "contentUrl": "...", "digitalSourceType": "...", "license": "..." },
    /* SoftwareSourceCode — site CSS/JS */
    {
      "@type": "SoftwareSourceCode",
      "name": "noexcuse.no CSS",
      "description": "AI-assisted CSS for the noexcuse.no website",
      "digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/CompositeWithTrainedAlgorithmicMediaDigitalSource",
      "license": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    /* BreadcrumbList — from existing breadcrumb-schema.html */
    { "@type": "BreadcrumbList", "itemListElement": [...] }
  ]
}
```

**Where:** Single `<script>` block in `<head>`, last among JSON-LD blocks.

### Layer B — RDFa

**Format:** HTML attributes (`vocab`, `typeof`, `property`, `resource`, `content`, `href`) on elements in layouts and includes.

**Syntax rules:**

| Schema.org type | Value type | RDFa element | Attribute |
|---|---|---|---|
| URI (e.g. `digitalSourceType`, `license`, `url`) | URI | `<link>` or `<meta>` | `property` + `href` (link) or `content` (meta) |
| String (e.g. `headline`, `name`, `description`) | Literal | `<meta>` | `property` + `content` |
| Number/Date (e.g. `foundingDate`) | Literal | `<meta>` | `property` + `content` |

**Decision: use `<meta>` for all values including URIs.** Strict HTML5 reserves `<link>` for `<head>` context, and `<meta property="..." content="...">` is accepted by all RDFa parsers (Google, schema.org, Yandex). This keeps the template code uniform.

#### Template placement

```html
<!-- _layouts/default.html — root <html> prefix -->
<html lang="no"
      prefix="schema: https://schema.org/
              cc: https://creativecommons.org/ns#
              iptc: http://cv.iptc.org/newscodes/digitalsourcetype/">

<!-- _layouts/page.html — article wrapper -->
<article typeof="schema:Article"
         resource="https://noexcuse.no{{ page.url }}"
         class="content">
  <meta property="schema:digitalSourceType"
        content="{{ site.data.provenance.digital_source_types[provenance.category] }}">
  <meta property="schema:license"
        content="{{ site.data.licenses.cc0.url }}">
  <meta property="schema:url"
        content="https://noexcuse.no{{ page.url }}">
  <meta property="schema:name"
        content="{{ page.title }}">
  <meta property="schema:description"
        content="{{ page.description | strip_html }}">

  {{ content }}
</article>

<!-- _includes/hero.html — hero image -->
<!-- All images are AI-generated — digitalSourceType is always TrainedAlgorithmicMediaDigitalSource -->
<section class="hero" typeof="schema:ImageObject">
  <meta property="schema:digitalSourceType"
        content="http://cv.iptc.org/newscodes/digitalsourcetype/TrainedAlgorithmicMediaDigitalSource">
  <meta property="schema:license"
        content="{{ site.data.licenses.cc0.url }}">
  <img property="schema:contentUrl"
       src="{{ hero_image | relative_url }}"
       alt="{{ hero_alt }}">
  ...
</section>

<!-- _includes/profiles.html — team member -->
<div class="profile" typeof="schema:Person">
  <meta property="schema:name" content="{{ profile.name }}">
  <meta property="schema:telephone" content="{{ profile.phone }}">
  <meta property="schema:email" content="{{ profile.email }}">
  <link property="schema:sameAs"
        href="{{ profile.linkedin }}">
  ...
</div>
```

#### Provenance classification in RDFa

Uses `page.ai_provenance.category` frontmatter — **only renders when explicitly set**. No default value.

```liquid
{% if page.ai_provenance.category %}
  {% assign src_type = site.data.provenance.digital_source_types[page.ai_provenance.category] %}
  <meta property="schema:digitalSourceType" content="{{ src_type }}">
{% endif %}
```

### Layer C — File-Level Metadata (exiftool)

Applied via `scripts/apply-provenance.sh`. Idempotent (`-if 'not $DigitalSourceType'` guard).

```bash
exiftool -overwrite_original \
  -if 'not $DigitalSourceType' \
  -XMP-iptcExt:DigitalSourceType="TrainedAlgorithmicMediaDigitalSource" \
  -XMP-iptcExt:AISystemUsed="EvoLink GPT Image 2" \
  -XMP-cc:License="https://creativecommons.org/publicdomain/zero/1.0/" \
  -XMP-dc:rights="No Excuse AS — CC0 1.0 Universal" \
  -XMP-dc:creator="No Excuse AS" \
  "assets/images/"*.webp "assets/images/banners/"*.webp
```

Targets WebP files. Covers both IPTC Digital Source Type and CC0 XMP metadata.

### Layer D — Transparency Manifest

`/.well-known/ai-transparency.json` — per emerging standard. Declares site-level AI content policy, license, and EU AI Act compliance posture. Served as a static file from the repository root.

---

## Data Files (`_data/*.yml`)

### `_data/metadata.yml` (updated)

```yaml
# Site-wide metadata
title: "No Excuse AS"
description: "Forbedrer internkultur og kommunikasjon i bedrifter."
tagline: "no excuse"
keywords: "ledelse, internkultur, grc"

# Open Graph / Twitter
og_title: "No Excuse AS"
og_description: "Forbedrer internkultur og kommunikasjon i bedrifter."
og_image: "https://noexcuse.no/assets/images/og-image.png"
og_url: "https://noexcuse.no/"
og_type: "website"
og_locale: "nb_NO"
twitter_card: "summary_large_image"
twitter_title: "No Excuse AS"
twitter_description: "Forbedrer internkultur og kommunikasjon i bedrifter."
twitter_image: "https://noexcuse.no/assets/images/og-image.png"
twitter_url: "https://noexcuse.no/"

# Version / build
version: "1.7.0"

# Organization
org:
  name: "No Excuse AS"
  orgnr: "935 794 420"
  email: "firmapost@noexcuse.no"
  url: "https://noexcuse.no"
  founding_date: "2025-06"
  founding_location: "Norge"
  area_served: "Norge"

# Impressum
impressum:
  copyright_year: 2025
```

### `_data/provenance.yml` (new)

```yaml
# AI provenance classification — see .specs/semantic-metadata/README.md
# Categories: human-created, editorial, ai-generated, ai-assisted, third-party, unresolved
# No default category — digitalSourceType is only rendered when explicitly set

digital_source_types:
  human-created: "http://cv.iptc.org/newscodes/digitalsourcetype/digitalCreation"
  editorial: "http://cv.iptc.org/newscodes/digitalsourcetype/CompositeWithTrainedAlgorithmicMediaDigitalSource"
  ai-generated: "http://cv.iptc.org/newscodes/digitalsourcetype/TrainedAlgorithmicMediaDigitalSource"
  ai-assisted: "http://cv.iptc.org/newscodes/digitalsourcetype/CompositeWithTrainedAlgorithmicMediaDigitalSource"
  third-party: "http://cv.iptc.org/newscodes/digitalsourcetype/ThirdParty"
  # unresolved: no digitalSourceType

categories:
  human-created:
    name: "Menneskeskapt"
    description: "Menneske har skapt innholdet uten AI-hjelp"
    applies_to:
      - text
      - code
  editorial:
    name: "Redaksjonelt formet"
    description: "Menneske har formet output — i loop under skapelsen, signerer på resultatet"
    applies_to:
      - text
      - code
  ai-generated:
    name: "AI-generert"
    description: "Kun innledende menneskelig input (prompt), output ikke formet av menneske"
    applies_to:
      - text
      - images
  ai-assisted:
    name: "AI-assistert"
    description: "Menneske har brukt AI som verktøy, men har formet output"
    applies_to:
      - text
      - code
  third-party:
    name: "Tredjepart"
    description: "Opprinnelig innhold fra tredjepart"
    applies_to:
      - text
      - images
      - code
```

### `_data/licenses.yml` (new)

```yaml
cc0:
  name: "CC0 1.0 Universal"
  url: "https://creativecommons.org/publicdomain/zero/1.0/"
  jurisdiction: "Universal"
  description: "Public domain dedication — no rights reserved"
```

### `_data/creator.yml` (new)

```yaml
name: "No Excuse AS"
orgnr: "935 794 420"
url: "https://noexcuse.no"
email: "firmapost@noexcuse.no"
```

### `_data/ai_tools.yml` (new)

```yaml
claude:
  name: "Claude"
  provider: "Anthropic"
  model: "Claude 3.5 Sonnet"
  purpose: "Text drafting, ideation, analysis"
  version: "claude-3-5-sonnet-20241022"

evolink:
  name: "EvoLink GPT Image 2"
  provider: "OpenAI via EvoLink"
  model: "GPT Image 2"
  purpose: "Abstract illustrations for articles"
```

---

## Provenance Classification

Two mutually exclusive categories for AI-involved content:

| Category | Kriterium | digitalSourceType | AI Act status |
|---|---|---|---|
| `human-created` | Menneske har skapt innholdet uten AI-hjelp | `DigitalCreation` | Unntak (Art 50(4) — editorial exception) |
| `editorial` | Menneske har formet output — i loop under skapelsen, signerer på resultatet | `CompositeWithTrainedAlgorithmicMediaDigitalSource` | Unntak (Art 50(4) — editorial exception) |
| `ai-generated` | Kun innledende menneskelig input (prompt), output **ikke** formet av menneske | `TrainedAlgorithmicMediaDigitalSource` | Merking kreves (metadata, ingen visuell label) |
| `ai-assisted` | Menneske har brukt AI som verktøy, men har formet output | `CompositeWithTrainedAlgorithmicMediaDigitalSource` | Unntak (Art 50(4) — editorial exception) |
| `third-party` | Opprinnelig innhold fra tredjepart | Opphavsrettighetshaverens type | Opphavsrettighetshaverens lisens |
| `unresolved` | Opprinnelse usikker — rapporteres, aldri gjetet | — | Rapporteres åpent |

### Kriteriet for "forming"

Mennesket må ha gjort mer enn å godkjenne eller avvise:
- ✅ Omskriving av avsnitt
- ✅ Omstrukturering av argumentasjon
- ✅ Faktasjekk med korrigering
- ✅ Tilføying/fjerning av innhold basert på fagkunnskap
- ✅ Språklig bearbeiding
- ❌ Kun prompt/formulering av spørsmål
- ❌ Kun skumlesing uten endringer
- ❌ Kun formateringsjusteringer

### Frontmatter schema

```yaml
provenance:
  creation: editorial          # required when known; human-created|editorial|ai-generated|ai-assisted|third-party|unresolved
  editorial_review: human      # required — always human
  editorial_responsibility: No Excuse AS  # required — always No Excuse AS
```

**Rules:**
- `creation` utelates helt hvis klassifisering ikke er kjent — ingen default-verdi
- `editorial_review: human` og `editorial_responsibility: No Excuse AS` er konstant på publiserbare sider
- `digitalSourceType` rendres **kun** når `creation` er eksplisitt satt i frontmatter

---

## Markdown Authoring — IAL for Exceptions

Kramdown Inline Attribute Lists (IAL) `{: ... }` are used for element-level metadata exceptions.

**Syntax:**

```markdown
Dette avsnittet har normal provenance (arver fra layout).
{: property="description"}

Dette avsnittet er et unntak med annen digitalSourceType.
{: property="description"}
<meta property="digitalSourceType"
      content="http://cv.iptc.org/newscodes/digitalsourcetype/TrainedAlgorithmicMediaDigitalSource">
```

**Rules:**

1. Default provenance arves fra `<article typeof="Article">` på layout-nivå
2. IAL brukes **kun** for unntak — aldri for å gjenta default-verdier
3. `<meta property="..." content="...">` i IAL kan overstyre `digitalSourceType` for et enkelt element
4. Rå HTML (`<meta>`) i Markdown er akseptabelt for unntak — det er unntak, ikke normalen

---

## Process Summary — Om Oss Section (Collapsebar)

Placed under `#llm-retningslinjer` on `/om-oss/`. Initially collapsed `<details>` element.

```html
<details class="about-llm-process">
    <summary>Prosess for KI-assistert innhold</summary>
    <p>Vi bruker generative språkmodeller som hjelpeverktøy i produksjonen av innhold på
    noexcuse.no. Slik gjør vi det:</p>
    <ol>
        <li><strong>Mennesket styrer:</strong> En bruker definerer tema, vinkling og kilder.</li>
        <li><strong>KI genererer utkast:</strong> Modellen produserer et førsteutkast basert
        på menneskelige instrukser.</li>
        <li><strong>Mennesket former:</strong> Brukeren omskriver, omstrukturerer,
        faktasjekker og tilpasser innholdet.</li>
        <li><strong>Godkjenning:</strong> Brukeren signerer på sluttresultatet.</li>
        <li><strong>Klassifisering:</strong> Har mennesket formet output? → Maskinassistert.
        Ble output brukt uendret? → Maskingenert (merkes i metadata).</li>
        <li><strong>Dokumentasjon:</strong> Verktøy, kategori og ansvarlig registreres i
        sidens frontmatter.</li>
        <li><strong>Publisering:</strong> Metadata følger med i strukturerte data (JSON-LD)
        og bildefiler (IPTC XMP).</li>
    </ol>
    <p>Alt innhold på noexcuse.no er publisert under
    <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0 Universal</a>
    (public domain) med mindre annet er oppgitt.</p>
</details>
```

See `.design/semantic-metadata.md` for CSS styling.

---

## Footer Declaration

```html
<footer class="footer">
    <p>&copy; ...</p>
    <p class="footer-ai-disclosure">
        Vi har brukt generative store språkmodeller under menneskelig styring
        som hjelpeverktøy for innhold på
        <a href="/om-oss/#llm-retningslinjer">denne siden</a>.
    </p>
</footer>
```

Single line in footer, low opacity (0.6), small font (0.8em), linking to Om Oss section `#llm-retningslinjer`.

---

## Acceptance Criteria

### RDFa
- [ ] `<html prefix="schema: https://schema.org/ cc: https://creativecommons.org/ns# ...">` on all pages
- [ ] `<article typeof="schema:Article">` wraps content on all pages
- [ ] `digitalSourceType` and `license` `<meta>` tags inside article element
- [ ] All hero images have `<figure typeof="schema:ImageObject">` with provenance meta
- [ ] All profile cards have `<div typeof="schema:Person">` with name, telephone, email
- [ ] RDFa validates with W3C RDFa validator

### JSON-LD
- [ ] `_includes/provenance-jsonld.html` exists and is included in `<head>`
- [ ] JSON-LD `@graph` contains WebSite, WebPage, all ImageObject(er), SoftwareSourceCode
- [ ] `digitalSourceType` reflects `page.ai_provenance.category` for text
- [ ] All images use `TrainedAlgorithmicMediaDigitalSource` digitalSourceType
- [ ] JSON-LD validates with schema.org validator

### Data files
- [ ] `_data/provenance.yml` exists with all category mappings
- [ ] `_data/licenses.yml` exists with CC0 entry
- [ ] `_data/creator.yml` exists
- [ ] `_data/ai_tools.yml` exists
- [ ] `_data/metadata.yml` updated with org fields

### Provenance frontmatter
- [ ] `provenance.creation` set **only** when classification is known — never guessed or defaulted
- [ ] `human-created`, `editorial`, `ai-generated`, `ai-assisted`, `third-party`, `unresolved` are the only valid values
- [ ] `editorial_review` (human) and `editorial_responsibility` (No Excuse AS) required when creation is set
- [ ] Tools referenced exist in `_data/ai_tools.yml`
- [ ] `digitalSourceType` is omitted from RDFa/JSON-LD when no `provenance.creation` is set

### CC0 declarations
- [ ] `<link rel="license">` in `<head>` on all pages
- [ ] `package.json` license set to `CC0-1.0`
- [ ] JSON-LD `license` property on all assets

### Image metadata
- [ ] All 186 WebP files have IPTC `DigitalSourceType` set to `TrainedAlgorithmicMediaDigitalSource`
- [ ] All 186 WebP files have CC0 XMP license metadata
- [ ] `scripts/apply-provenance.sh` exists and is idempotent

### Om Oss
- [ ] LLM section `#llm-retningslinjer` exists on `/om-oss/`
- [ ] Collapsebar `<details>` with 7-step process (uses "bruker")
- [ ] Footer links to `/om-oss/#llm-retningslinjer`

### Performance
- [ ] JSON-LD include adds <1KB per page
- [ ] exiftool batch runs in <30s
- [ ] Image metadata does not increase file size measurably

---

## Implementation Order

| Step | What | Effort | Dependencies |
|------|------|--------|-------------|
| 1 | Create `_data/licenses.yml`, `_data/provenance.yml`, `_data/creator.yml`, `_data/ai_tools.yml` | 15min | — |
| 2 | Update `_data/metadata.yml` with org fields | 5min | — |
| 3 | Add `<html prefix="...">` to `_layouts/default.html` | 5min | — |
| 4 | Add `<article typeof="schema:Article">` wrapper to `_layouts/page.html` | 10min | Step 1 |
| 5 | Add `<figure typeof="schema:ImageObject">` to `_includes/hero.html` | 10min | Step 1 |
| 6 | Add `<div typeof="schema:Person">` to `_includes/profiles.html` | 15min | — |
| 7 | Create `_includes/provenance-jsonld.html` | 30min | Step 1, 2 |
| 8 | Wire provenance-jsonld.html into `_includes/scripts.html` | 5min | Step 7 |
| 9 | Add `<link rel="license">` to `_includes/metadata.html` | 5min | Step 1 |
| 10 | Add `ai_provenance` frontmatter to all `_pages/*.md` | 1h | Step 1 |
| 11 | Create Om Oss LLM section with collapsebar process | 30min | — |
| 12 | Add footer declaration with link | 10min | Step 11 |
| 13 | Create `scripts/apply-provenance.sh` + run on images | 30min | — |
| 14 | Create `/.well-known/ai-transparency.json` | 15min | — |
| 15 | Update `package.json` license | 2min | — |
| 16 | Update CHANGELOG, BACKLOG | 10min | All above |
| — | **Total** | **~3.5 timer** | |

---

## Existing Standards — Mapping

| Standard | Our `human-created` | Our `editorial` | Our `ai-generated` | Our `ai-assisted` |
|---|---|---|---|---|
| IPTC Digital Source Type | `DigitalCreation` | `CompositeWithTrainedAlgorithmicMedia` | `TrainedAlgorithmicMedia` | `CompositeWithTrainedAlgorithmicMedia` |
| EU AI Act Code of Practice (1st draft) | "Human-authored" | "AI-assisted" | "Fully AI-generated" | "AI-assisted" |
| W3C AI Disclosure CG | `ai-assisted` | `ai-assisted` | `ai-generated` | `ai-assisted` |
| schema.org `digitalSourceType` | DigitalCreation URI | Composite URI | TrainedAlgorithmicMedia URI | Composite URI |
| declare-ai.org | `non-creative` | `non-creative` | `total` | `non-creative` |

Our framework is stricter than all existing standards: we require active *shaping* of output, not just review or oversight.
