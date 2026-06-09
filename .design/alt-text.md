# Alt Text — Design Guidelines for Image Accessibility

## Principle

All non-decorative images on noexcuse.no must have descriptive alt text that serves the equivalent purpose of the image. This follows WCAG AA SC 1.1.1 and is part of the site's commitment to universal accessibility.

## When an Image Needs Alt Text

An image needs descriptive alt text if it conveys information not already present in adjacent text. The images on this site fall into three categories:

### 1. Content Illustrations (need alt text)

Spot illustrations, section images, and concept diagrams that accompany content. These appear as markdown images inline with article text. **This is the category with 88 violations.**

### 2. Decorative / Iconic (mark as decorative)

Micro-icons and small spot images that sit next to a heading or card text. The adjacent text already conveys the information. Use `alt="" aria-hidden="true"`.

### 3. Dynamic Images (need dynamic alt)

Images rendered via includes with alt text passed as a parameter. Already correctly handled across all `_includes/`.

## Alt Text Rules for noexcuse.no

### Language
- All alt text must be in **Norwegian Bokmål**
- Use the same tone as the brand voice: direct, concrete, no consultant-speak

### Structure
- No "Bilde av" prefix — the alt text should stand alone
- Describe the **concept/function** of the image, not the literal visual (these are abstract vector illustrations)
- Example: `Abstrakt illustrasjon av psykologisk trygghet som tillitspilar` — not `Bilde av en sirkel med piler`

### Length
- Aim for 8–15 words
- Must fit within a single line (no line breaks in markdown alt text)

### Pattern for Section Spot Illustrations

```
Abstrakt illustrasjon av [koncept] — [presisering]
```

Example: `Abstrakt illustrasjon av gapet mellom formell og reell beslutningsmakt`

### Pattern for Challenge/T4 Cards

```
Abstrakt illustrasjon av [utfordring] som [kategori]utfordring
```

Example: `Abstrakt illustrasjon av uklar rolleavklaring som strukturutfordring`

### Pattern for Serial/Tiered Illustrations (Logan stages, Kotter steps)

```
Abstrakt illustrasjon av [rammeverk] [steg/stadium] [nummer]: [navn]
```

Example: `Abstrakt illustrasjon av Logans kulturstadium 3: «Jeg er great»`
Example: `Abstrakt illustrasjon av Kotters steg 4: Kommuniser visjonen`

### Pattern for Value Illustrations

```
Abstrakt illustrasjon av kjerneverdien [verdi]
```

Example: `Abstrakt illustrasjon av kjerneverdien ansvarlighet`

## Verification

After implementation, verify with:
```
grep '!\[\](' _pages/*.md
```

Zero matches = done.
