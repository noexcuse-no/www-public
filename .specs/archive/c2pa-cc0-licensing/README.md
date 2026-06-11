# AI Provenance & CC0 Licensing — Feature Specification

> Created: 2026-06-03
> Status: Draft

## Purpose / Problem

The site has 186 AI-generated WebP images, AI-generated article text, and AI-generated CSS/JS — none with provenance metadata, license declarations, or machine-readable AI disclosure. Package.json says `"UNLICENSED"`, copyright metadata says `copyright_year: 2025`, and there is no structured data indicating AI generation.

This creates three risks:
1. **EU AI Act non-compliance** — Article 50(4) deployer obligations for AI content labeling effective 2 August 2026
2. **Missing license clarity** — No CC0 declaration on any asset, making reuse/attribution ambiguous
3. **Search engine opacity** — No structured data signals for crawlers to understand content provenance

## Scope

### New files

| File | Purpose |
|------|---------|
| `_includes/provenance-jsonld.html` | Liquid include — injects `digitalSourceType` + `license` into JSON-LD on every page |
| `scripts/apply-provenance.sh` | Build script — applies IPTC + CC0 XMP metadata to all images via exiftool |
| `/.well-known/ai-transparency.json` | AI transparency manifest per emerging standard |
| `.specs/c2pa-cc0-licensing/README.md` | This spec |
| `.design/c2pa-cc0-licensing.md` | Design doc — architecture, pipeline, implementation order |

### Modified files

| File | Change |
|------|--------|
| `_includes/metadata.html` | Add `<link rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">` |
| `_data/metadata.yml` | Add `license: CC0-1.0` field |
| `package.json` | `"license": "CC0-1.0"` (replace `"UNLICENSED"`) |
| `_config.yml` | Add license metadata to site config |
| `_includes/scripts.html` | Add provenance JSON-LD include |
| `_includes/styles.html` | Add provenance JSON-LD include |
| All `.md` page files | Ensure JSON-LD blocks include `digitalSourceType` + `license` |
| `.design/graphics.md` | Add C2PA/IPTC/CC0 as standard pipeline steps |
| `.design/deployment.md` | Document provenance build step |
| `CHANGELOG.md` | Log the feature addition |
| `BACKLOG.md` | Track Z2.1–Z2.6 tasks |

### Image coverage

All 186 WebP files in `assets/images/` and `assets/images/banners/` — batch-processed via exiftool build script.

### Page coverage

Every HTML page on the site:
- JSON-LD `digitalSourceType` + `license` via Liquid include
- `<link rel="license">` in `<head>`
- Visible AI disclosure text where applicable

## Approach

### Layer 1 — CC0 License Declarations (minimum)

Declares all site content as public domain under CC0 1.0 Universal:

- **HTML**: `<link rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">` in `<head>`
- **JSON-LD**: `"license": "https://creativecommons.org/publicdomain/zero/1.0/"` on every `CreativeWork` / `WebPage`
- **Image files**: CC0 XMP metadata embedded via exiftool (`XMP-dc:rights`, `XMP-cc:License`)
- **Metadata files**: `_data/metadata.yml` + `package.json` + `_config.yml`

### Layer 2 — Machine-Readable AI Provenance (structured data)

Uses schema.org `digitalSourceType` (v30.0, March 2026):

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "digitalSourceType": "https://schema.org/TrainedAlgorithmicMediaDigitalSource",
  "license": "https://creativecommons.org/publicdomain/zero/1.0/"
}
```

- **Text content**: `TrainedAlgorithmicMediaDigitalSource` (fully AI-generated) where applicable
- **Images**: Same via `ImageObject` `digitalSourceType`
- **Editorial exception**: Where human review has occurred, `digitalSourceType` may be omitted or set to `CompositeWithTrainedAlgorithmicMediaDigitalSource`

### Layer 3 — Image-Level Metadata (exiftool)

Batch script applies to all WebP files:

```
IPTC Digital Source Type: TrainedAlgorithmicMediaDigitalSource
XMP AI System Used: EvoLink GPT Image 2
XMP AI System Version: latest
XMP AI Prompt Information: (embedded from .design/graphics.md prompt docs)
XMP CC License: https://creativecommons.org/publicdomain/zero/1.0/
XMP Rights: No Excuse AS — CC0 1.0 Universal
```

### Layer 4 — EU AI Act Article 50 Compliance

**Deployer obligations (2 August 2026)**:

- **Images**: No labeling required — abstract illustrations don't qualify as deep fakes (no resemblance to real persons/places/events)
- **Text**: Where human review + editorial responsibility is documented → editorial exception applies
- **Where AI disclosure IS required**: Visible "AI-generert" label at first exposure (above article, in header)

**Provider obligations (2 December 2026)**: EvoLink/OpenAI are the providers — their responsibility, not No Excuse's.

### Layer 5 — Emerging Standards (future-proofing)

- `/.well-known/ai-transparency.json` — zero-dependency manifest
- `ai-disclosure` HTML attribute — add when W3C CG finalizes (expected late 2026)
- SynthID / C2PA — rely on generation tool to apply

## Acceptance Criteria

### CC0 declarations
- [ ] `<link rel="license">` present in `<head>` on all pages
- [ ] JSON-LD `license` property on all `WebPage` / `CreativeWork` structured data blocks
- [ ] `_data/metadata.yml` has `license: CC0-1.0`
- [ ] `package.json` has `"license": "CC0-1.0"`
- [ ] `_config.yml` has license reference

### Image metadata
- [ ] All 186 WebP files have IPTC `DigitalSourceType` set to `trainedAlgorithmicMedia`
- [ ] All 186 WebP files have CC0 XMP license metadata
- [ ] Build script `scripts/apply-provenance.sh` exists and is documented
- [ ] New images generated after this feature must include metadata step in pipeline

### JSON-LD provenance
- [ ] Liquid include `_includes/provenance-jsonld.html` exists
- [ ] Include injects `digitalSourceType` into all existing JSON-LD `@graph` arrays
- [ ] Include respects page-level frontmatter overrides (e.g. `provenance: human`)
- [ ] Include is called from `_includes/scripts.html` or equivalent

### AI transparency manifest
- [ ] `/.well-known/ai-transparency.json` exists with per-route AI content scope
- [ ] Manifest follows emerging schema

### Build pipeline
- [ ] `scripts/apply-provenance.sh` can be run standalone
- [ ] Script skips files that already have metadata (idempotent)
- [ ] Script reports summary (files processed, skipped, errors)
- [ ] Documentation in `.design/c2pa-cc0-licensing.md`

### EU AI Act readiness
- [ ] Assessment documented: which pages/images trigger deep fake / public interest obligations
- [ ] Editorial workflow documented: tool, reviewer, date per article
- [ ] Where AI disclosure is required: visible "AI-generert" label on page
- [ ] Review deadline: 2 August 2026

### Performance
- [ ] Image metadata does not noticeably increase file size
- [ ] JSON-LD include adds <1KB to each page
- [ ] exiftool batch run completes in <30s

## Design Constraints

- Vanilla Jekyll — no plugins that GitHub Pages doesn't support
- Norwegian Bokmål for all user-facing text
- Privacy: no data sent to any server; all declarations are purely informational
- Declarations never interfere with page layout or readability
- Zero dependencies for the static manifest files

## Dependencies

- **exiftool** must be available in the build environment (CI/local)
- Schema.org v30.0+ `digitalSourceType` — requires JSON-LD update
- **No** additional Ruby gems or npm packages

## Backlog References

Z2.1–Z2.6 as defined in BACKLOG.md
