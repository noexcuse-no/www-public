# Image Optimization Specification

## Overview

Convert all PNG images in `assets/images/` to WebP format with appropriate resizing for web performance. Original PNG files are preserved in `.design/graphics/originals/` for backup and future reference.

## Scope

**Total images:** 44 PNG files

| Category | Path | Count | Max Dimensions | Rationale |
|----------|------|-------|----------------|-----------|
| Banners | `assets/images/banners/` | 32 | 1920×1080 | 16:9 landscape illustrations, CSS max-width 1100px + 2x for retina |
| Article heroes | `assets/images/banners/hero-*.webp` | 3 | 3840×2160 | Viewport-filling heroes (100vh), 4K for retina/ultrawide |
| Icons | `assets/images/icons/` | 9 | 512×512 | Small UI icons, displayed at 40×40px in CSS |
| Logos | `assets/images/` (noexcuse-logo-*.png) | 2 | 400×400 | Fixed display at 100×100px |
| Hero | `assets/images/hero-illustration.png` | 1 | 3840×2160 | Large hero banner, 4K for viewport-filling display |
| Profile | `assets/images/dagfinn.png` | 1 | 400×400 | Profile photo, displayed at 100×100px |

## Image Inventory

### Banners (32 files)

```
assets/images/banners/
├── benefit-anchoring.png      (1920×1080)
├── benefit-ai.png            (1920×1080)
├── benefit-control.png       (1920×1080)
├── benefit-future.png        (1920×1080)
├── frame-human.png           (1920×1080)
├── frame-identitet.png       (1920×1080)
├── frame-political.png       (1920×1080)
├── frame-struktur.png        (1920×1080)
├── frame-symbol.png          (1920×1080)
├── illustrasjon-cta.png      (1920×1080)
├── illustrasjon-identitet-cta.png    (1920×1080)
├── illustrasjon-identitet-hovedelementer.png  (1920×1080)
├── illustrasjon-identitet-utfordringer.png   (1920×1080)
├── illustrasjon-mennesker-cta.png         (1920×1080)
├── illustrasjon-mennesker-hovedelementer.png   (1920×1080)
├── illustrasjon-mennesker-utfordringer.png    (1920×1080)
├── illustrasjon-påvirkning-cta.png        (1920×1080)
├── illustrasjon-påvirkning-hovedelementer.png (1920×1080)
├── illustrasjon-påvirkning-utfordringer.png  (1920×1080)
├── illustrasjon-struktur-cta.png         (1920×1080)
├── illustrasjon-struktur-hovedelementer.png  (1920×1080)
├── illustrasjon-struktur-utfordringer.png   (1920×1080)
├── science-foundation.png    (1920×1080)
├── science-research.png      (1920×1080)
├── step-interview.png        (1920×1080)
├── step-report.png          (1920×1080)
├── step-talk.png            (1920×1080)
└── banner-om-oss.png        (1920×1080)
```

### Icons (9 files)

```
assets/images/icons/
├── benefit-anchoring.png     (512×512)
├── benefit-ai.png           (512×512)
├── benefit-control.png      (512×512)
├── benefit-future.png       (512×512)
├── step-interview.png       (512×512)
├── step-report.png         (512×512)
└── step-talk.png           (512×512)
```

### Logos (2 files)

```
assets/images/
├── noexcuse-logo-horizontal.png  (400×400)
└── noexcuse-logo-azure.png       (400×400)
```

### Other (2 files)

```
assets/images/
├── dagfinn.png              (400×400) — profile photo
└── hero-illustration.png    (1920×1080) — hero illustration
```

## Technical Specification

### Tool: ImageMagick (magick)

**Why ImageMagick:** Available on the system, supports batch processing via `mogrify`, handles resize + format conversion in one step.

### Conversion Commands

```bash
# Step 1: Banners — 1920px max width, preserve aspect ratio, quality 85
magick mogrify -resize 1920x1080 -quality 85 -format webp assets/images/banners/*.png

# Step 2: Icons — 512px max, quality 85
magick mogrify -resize 512x512 -quality 85 -format webp assets/images/icons/*.png

# Step 3: Hero illustration — 3840px max width (4K for viewport-filling heroes)
magick mogrify -resize 3840x2160 -quality 85 -format webp assets/images/hero-illustration.png

# Step 4: Logos — 400px max, quality 85
magick mogrify -resize 400x400 -quality 85 -format webp assets/images/noexcuse-logo-*.png

# Step 5: Profile photo — 400px max, quality 85
magick mogrify -resize 400x400 -quality 85 -format webp assets/images/dagfinn.png

# Step 6: OG image — 1920px max width
magick mogrify -resize 1920x1080 -quality 85 -format webp assets/images/og-image.png
```

### Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `-resize` | Category-specific max | Prevent memory issues, maintain reasonable file size |
| `-quality` | 85 | Good balance between file size and visual quality for photos/illustrations |
| `-format webp` | webp | Modern format with superior compression, browser support >95% |

### Resize Behavior

- ImageMagick resize with `>` modifier ensures images **larger** than target are shrunk
- Images **smaller** than target remain unchanged (preserves icon quality)
- Aspect ratio is preserved via `1920x1080` geometry (width × height as upper bounds)
- Use `1920x1080>` syntax to only shrink images that exceed dimensions

**Actual command pattern:**
```bash
magick mogrify -resize 1920x1080> -quality 85 -format webp ...
```

The `>` after dimensions means "only resize if image exceeds these dimensions."

## File Preservation

### Directory Structure

```
.design/graphics/
└── originals/
    ├── banners/
    │   ├── benefit-anchoring.png
    │   └── ... (32 files)
    ├── icons/
    │   ├── benefit-anchoring.png
    │   └── ... (9 files)
    ├── noexcuse-logo-horizontal.png
    ├── noexcuse-logo-azure.png
    ├── dagfinn.png
    ├── hero-illustration.png
    └── og-image.png
```

### Copy Commands (before conversion)

```bash
# Create directory structure
mkdir -p .design/graphics/originals/banners
mkdir -p .design/graphics/originals/icons

# Copy files preserving structure
cp assets/images/banners/*.png .design/graphics/originals/banners/
cp assets/images/icons/*.png .design/graphics/originals/icons/
cp assets/images/noexcuse-logo-*.png .design/graphics/originals/
cp assets/images/dagfinn.png .design/graphics/originals/
cp assets/images/hero-illustration.png .design/graphics/originals/
cp assets/images/og-image.png .design/graphics/originals/
```

## Post-Conversion Steps

### Delete Original PNG Files

After successful conversion and backup verification:

```bash
rm assets/images/banners/*.png
rm assets/images/icons/*.png
rm assets/images/noexcuse-logo-horizontal.png
rm assets/images/noexcuse-logo-azure.png
rm assets/images/dagfinn.png
rm assets/images/hero-illustration.png
rm assets/images/og-image.png
```

### Verification

1. Confirm all .webp files exist in `assets/images/`
2. Confirm no .png files remain in `assets/images/` (except in `.design/graphics/originals/`)
3. Run `npm run lint` to verify no broken references
4. Test site locally with `jekyll serve`

## HTML References

The site uses Liquid includes for images, no hardcoded PNG extensions in templates:

- `_includes/header.html` — `noexcuse-logo-azure.png` → needs `.webp` extension update
- `_includes/image.html` — generic include, no hardcoded extension

**Action:** Update any direct `.png` references in HTML to `.webp` after conversion.

### Manual Reference Updates

| File | Reference | Change |
|------|-----------|--------|
| `_includes/header.html:4` | `noexcuse-logo-azure.png` | → `.webp` |

Search for any other hardcoded PNG references:
```bash
grep -r "\.png" _includes/ _layouts/ *.html --include="*.html"
```

## Rollback Plan

If issues occur:

1. All originals preserved in `.design/graphics/originals/`
2. Restore by copying from originals:
   ```bash
   cp .design/graphics/originals/banners/*.png assets/images/banners/
   cp .design/graphics/originals/icons/*.png assets/images/icons/
   cp .design/graphics/originals/*.png assets/images/
   rm assets/images/*.webp
   ```

## Acceptance Criteria

1. All 44 PNG files converted to WebP format
2. Original PNG files preserved in `.design/graphics/originals/`
3. Banners resized to max 1920×1080 (only if larger)
4. Article hero images generated at 3840×2160 (4K) for viewport-filling display
5. Icons resized to max 512×512 (only if larger)
6. Logos resized to max 400×400 (only if larger)
7. Profile photo resized to max 400×400 (only if larger)
8. Quality setting: 85 for all conversions
9. No PNG files remain in `assets/images/` (except in backup)
10. Direct `.png` references in HTML updated to `.webp`
11. Site passes `npm run lint` after conversion
12. `.design/graphics.md` updated with resize guidelines

## Dependencies

- ImageMagick (magick command)
- Jekyll for local testing

## 4K Resolution Requirement for Viewport-Filling Heroes

Article hero images (e.g., `hero-triade.webp`, `hero-makt.webp`, `hero-perspektiv.webp`) are displayed at **full viewport height** (`100vh`) via `assets/css/components/hero.css`. The old 1920×1080 specification is insufficient for:
- 4K displays (3840px wide)
- Ultrawide monitors (3440px, 5120px)
- Retina/HiDPI screens (e.g., 27" 5K = 5120px)

**Rule:** All viewport-filling hero images must be generated at **minimum 3840×2160px** (4K UHD) before WebP conversion. This applies to:
- `assets/images/banners/hero-*.webp`
- `assets/images/hero-illustration.webp`

**Generation workflow:**
1. Generate original at 3840×2160 (PNG or source format)
2. Copy to `.design/graphics/originals/`
3. Convert to WebP with `magick mogrify -resize 3840x2160> -quality 85 -format webp`

## Related Documents

- `.design/graphics.md` — Image style guidelines, prompt documentation rules
- `.design/architecture.md` — Asset directory structure
- `.specs/architecture/README.md` — Jekyll patterns, path handling