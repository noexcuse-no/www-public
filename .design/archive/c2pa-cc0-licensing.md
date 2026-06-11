# AI Provenance & CC0 Licensing — Design Decisions

## Overview

A multi-layer system for declaring content provenance, AI generation status, and open licensing across the entire site. Five independent but complementary layers, from minimal CC0 declarations through to EU AI Act Article 50 compliance.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1 — CC0 License Declarations                     │
│  HTML <link>, JSON-LD, _data/metadata.yml, package.json │
├─────────────────────────────────────────────────────────┤
│  Layer 2 — Machine-Readable AI Provenance               │
│  schema.org digitalSourceType in JSON-LD (Liquid include)│
├─────────────────────────────────────────────────────────┤
│  Layer 3 — Image-Level Metadata                         │
│  IPTC Digital Source Type + CC0 XMP via exiftool        │
├─────────────────────────────────────────────────────────┤
│  Layer 4 — EU AI Act Article 50 Compliance              │
│  Assessment + visible labels + editorial documentation  │
├─────────────────────────────────────────────────────────┤
│  Layer 5 — Emerging Standards (future-proofing)         │
│  /.well-known/ai-transparency.json + ai-disclosure attr │
└─────────────────────────────────────────────────────────┘
```

Each layer is independent. Layer 1 is the minimum viable scope. Layers 1+2 cover the most value for least effort.

---

## Layer 1 — CC0 License Declarations

### Rationale

CC0 1.0 Universal (CC0 1.0) is the most permissive Creative Commons license — effectively public domain. It aligns with the site's democratic design philosophy and clarifies reuse rights for all AI-generated content.

### Where CC0 is declared

| Location | Code change |
|----------|-------------|
| `<head>` | `<link rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">` in `_includes/metadata.html` |
| JSON-LD WebPage | `"license": "https://creativecommons.org/publicdomain/zero/1.0/"` in `_includes/provenance-jsonld.html` |
| JSON-LD ImageObject | Same — per-image in the include |
| Image XMP | `XMP-cc:License` + `XMP-dc:rights` via exiftool |
| `_data/metadata.yml` | Add `license: CC0-1.0`, update `copyright_year` |
| `package.json` | `"license": "CC0-1.0"` (replace `"UNLICENSED"`) |
| `_config.yml` | Add to site config for Liquid access |

### Byline / attribution

CC0 does not require attribution, but as best practice, include:
> "No Excuse AS — CC0 1.0 Universal. See https://creativecommons.org/publicdomain/zero/1.0/"

---

## Layer 2 — Machine-Readable AI Provenance

### Schema.org `digitalSourceType` (v30.0+)

A new property in the Schema.org vocabulary (added March 2026). Accepts values from the `IPTCDigitalSourceEnumeration`:

| Value | When to use |
|-------|-------------|
| `TrainedAlgorithmicMediaDigitalSource` | Fully AI-generated content (images, text) |
| `CompositeWithTrainedAlgorithmicMediaDigitalSource` | Human-authored content with AI modifications |
| `AlgorithmicallyEnhancedDigitalSource` | Non-generative algorithmic processing |
| `DigitalCreationDigitalSource` | Human-created (no AI) |

### Liquid include design

```html
{% include provenance-jsonld.html
   digitalSourceType="TrainedAlgorithmicMediaDigitalSource"
%}
```

The include is injected as part of every page's JSON-LD `@graph` array. Default behavior:
- If page frontmatter has `provenance: human` → use `DigitalCreationDigitalSource`
- If `provenance: ai` → use `TrainedAlgorithmicMediaDigitalSource`
- Default → `TrainedAlgorithmicMediaDigitalSource` (safe default for current site)

### JSON-LD structure

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "{{ page.title }}",
      "url": "{{ page.url | absolute_url }}",
      "description": "{{ page.description }}",
      "license": "https://creativecommons.org/publicdomain/zero/1.0/",
      "digitalSourceType": "https://schema.org/{{ digitalSourceType }}",
      "mainEntity": {
        "@type": "Article",
        "digitalSourceType": "https://schema.org/{{ digitalSourceType }}",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/"
      }
    }
  ]
}
```

Note: The include appends these fields to the *existing* JSON-LD on the page. It does not replace the full page JSON-LD — it merges via the `@graph` array.

### Merging strategy

Each page currently has its own JSON-LD in page frontmatter or in the layout. The approach is:

1. Add a Liquid `capture` in the `<head>` or before `</script>` in existing JSON-LD blocks
2. Or: create a post-processing include that appends provenance fields

Simplest approach: `_includes/provenance-jsonld.html` is called from `_includes/scripts.html` (after all other JSON-LD), adding a separate `<script type="application/ld+json">` block with just the provenance + license fields. Search engines merge multiple JSON-LD blocks on the same page.

---

## Layer 3 — Image-Level Metadata

### Pipeline

```
EvoLink GPT Image 2 → 1024×1024 PNG
  → sharp convert + resize → WebP
  → exiftool apply metadata → WebP with IPTC + CC0 + C2PA sidecar
```

### exiftool command

```bash
exiftool -overwrite_original \
  -XMP-iptcExt:DigitalSourceType="https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" \
  -XMP-iptcExt:AISystemUsed="EvoLink GPT Image 2" \
  -XMP-iptcExt:AIPromptWriterName="No Excuse" \
  -XMP-cc:License="https://creativecommons.org/publicdomain/zero/1.0/" \
  -XMP-dc:rights="No Excuse AS — CC0 1.0 Universal" \
  -XMP-dc:creator="No Excuse AS" \
  "assets/images/banners/*.webp"
```

### Batch script

`scripts/apply-provenance.sh`:

```bash
#!/bin/bash
# Apply IPTC + CC0 metadata to all AI-generated WebP images
# Idempotent: skips files that already have DigitalSourceType

SRC_DIR="assets/images"

exiftool -overwrite_original \
  -if 'not $DigitalSourceType' \
  -XMP-iptcExt:DigitalSourceType="https://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" \
  -XMP-iptcExt:AISystemUsed="EvoLink GPT Image 2" \
  -XMP-cc:License="https://creativecommons.org/publicdomain/zero/1.0/" \
  -XMP-dc:rights="No Excuse AS — CC0 1.0 Universal" \
  "$SRC_DIR"/*.webp "$SRC_DIR"/banners/*.webp

echo "Done. Check: exiftool -DigitalSourceType -cc:License $SRC_DIR/banners/example.webp"
```

The `-if 'not $DigitalSourceType'` guard makes it idempotent — files already processed on a previous run are skipped.

### GitHub Actions integration

Add a build step (optional, post-Jekyll-build):

```yaml
- name: Apply provenance metadata
  run: bash scripts/apply-provenance.sh
  working-directory: ./
```

**Note**: The `_site/` output directory must be targeted, not the source `assets/`. Or: apply before Jekyll build so the metadata carries into `_site/`.

---

## Layer 4 — EU AI Act Article 50 Compliance

### Assessment

| Content type | Deep fake? | Public interest text? | Editorial exception? | Label required? |
|---|---|---|---|---|
| Abstract illustrations (Style 1–4) | No — no resemblance to real persons/places/events | N/A | N/A | **No** |
| Article text (with human review) | N/A | Yes — leadership/management topics | Yes — if review is documented and editorial responsibility assigned | **No** |
| Article text (no human review) | N/A | Yes | No | **Yes** — "AI-generert" |
| Generated code (CSS/JS) | N/A | N/A | N/A | Not in scope of Article 50(4) |

### Visible label design

Where disclosure is required, place at top of article:

```html
<div class="ai-disclosure">
  <span class="ai-disclosure-icon"><!-- "AI" badge --></span>
  Denne teksten er generert med kunstig intelligens.
</div>
```

Styled as a small notice banner — not invisible, not intrusive. Following the Code of Practice interim icon pattern: high-contrast, at first exposure.

### Editorial documentation

For the editorial exception to apply, maintain per-article records:

| Field | Example |
|-------|---------|
| Article | `_pages/ledelse_tillit.md` |
| AI tool | Claude 3.5 Sonnet |
| Reviewer | Rasmus S. Olsen |
| Review date | 2026-06-01 |
| Changes made | Structural edits, fact-checking, sources verified |

This can be as simple as a comment block in the page frontmatter:

```yaml
---
title: Tillit i ledergrupper
ai_provenance:
  tool: Claude 3.5 Sonnet
  reviewer: Rasmus S. Olsen
  review_date: 2026-06-01
  changes: "Structural edits, fact-checking, sources verified"
---
```

### Non-retroactivity

Article 50(4) applies to content generated or modified **on or after 2 August 2026**. Existing content is not subject to labeling requirements unless republished with substantial modifications after that date. This gives flexibility to implement progressively.

---

## Layer 5 — Emerging Standards

### `/.well-known/ai-transparency.json`

```json
{
  "$schema": "https://ai-transparency-protocol.org/schema/v1.0.json",
  "site": {
    "name": "No Excuse AS",
    "url": "https://noexcuse.no",
    "license": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  "contact": {
    "email": "post@noexcuse.no"
  },
  "ai_content_policy": {
    "images": "All images are generated using AI (EvoLink GPT Image 2). Style: abstract Scandinavian minimal. No images depict real persons, places, or events.",
    "text": "All article text is drafted with AI assistance and undergoes human editorial review before publication.",
    "code": "CSS and JavaScript are generated with AI assistance and reviewed before deployment."
  },
  "compliance": {
    "eu_ai_act_article_50": "Compliant as of 2026-08-02",
    "digital_source_type": "https://schema.org/TrainedAlgorithmicMediaDigitalSource"
  }
}
```

### `ai-disclosure` HTML attribute

Once the W3C Community Group finalizes the attribute (expected late 2026), add to templates:

```html
<article ai-disclosure="ai-generated">
  <p>...</p>
</article>
```

This requires no build tooling — just template updates.

---

## Implementation Order

| Step | What | Effort | Depends on |
|------|------|--------|------------|
| 1 | `_includes/provenance-jsonld.html` — Liquid include for `digitalSourceType` + `license` | 1h | — |
| 2 | `<link rel="license">` in `_includes/metadata.html` | 10min | — |
| 3 | Update `_data/metadata.yml`, `package.json`, `_config.yml` with CC0 | 10min | — |
| 4 | Wire provenance-jsonld.html into pages via `_includes/scripts.html` | 30min | Step 1 |
| 5 | `scripts/apply-provenance.sh` — exiftool batch script | 30min | — |
| 6 | Run script on all 186 images | 10min | Step 5 |
| 7 | `/.well-known/ai-transparency.json` | 20min | — |
| 8 | AI Act compliance documentation in page frontmatter | 1h | — |
| 9 | Update `.design/graphics.md` and `.design/deployment.md` | 30min | All above |
| 10 | CHANGELOG.md + BACKLOG.md update | 15min | All above |

**Total effort:** ~4 hours

---

## File Inventory

### Images to process (186 files)

Source: `assets/images/` (root) + `assets/images/banners/`

All 186 are WebP files. All are AI-generated via EvoLink GPT Image 2. None have provenance or license metadata.

### Pages to update

All pages get the JSON-LD provenance include automatically — it's wired into `_includes/scripts.html`. No per-page changes needed beyond optional frontmatter `provenance:` overrides.

---

## Rationale

### Why five independent layers?

Not all consumers need all layers. Search engines use JSON-LD. Platforms (Meta, Google Merchant) read IPTC metadata. EU regulators look for visible labels. `/.well-known/` files target AI crawlers. Separating them keeps each layer simple and independently maintainable.

### Why not C2PA for images?

C2PA requires cryptographic signing certificates (X.509) and has limited WebP support. The IPTC + schema.org approach covers the same ground without the infrastructure overhead. C2PA is a provider-side obligation (OpenAI/EvoLink), not a deployer one.

### Why CC0 over other Creative Commons licenses?

CC0 is the simplest — no attribution requirements, no NC/ND restrictions, pure public domain dedication. For a small consultancy promoting open knowledge about leadership, this is the philosophically correct choice. It also avoids the complexity of tracking attribution across reuse.

### Why no visible label by default?

No Excuse's abstract illustrations fall outside the deep fake definition (they don't resemble real persons/places/events). Most article text goes through human editorial review, qualifying for the editorial exception in Article 50(4). Where exceptions don't apply, visible labels are added with specific per-page decisions documented in frontmatter.
