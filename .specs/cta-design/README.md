# CTA Design System — Functional Specification

## Purpose and Scope

Define the visual design rules for Call-to-Action buttons across the No Excuse website. This spec covers the Type A/B button system, placement conventions, hover/active states, and dark mode behavior.

**Backlog references:** D2 (CTA hover effects), C4 (visitor flow / CTA-designsystem), .design/components.md, .design/colors.md

---

## Type A / Type B System

There are exactly **two CTA button styles**, used in strict alternation depending on position.

### Type A — Primary (venstre)

| Property | Value |
|----------|-------|
| Background | `#F0FFFF` (azure) |
| Text color | `#003060` (navy) |
| Border | 2px solid `#003060` (navy) |
| Hover bg | `#003060` (navy) |
| Hover text | `#F0FFFF` (azure) |
| Hover border | 2px solid `#F0FFFF` (azure) |
| Transition | `background-color 0.2s ease, color 0.2s ease` |
| Border-radius | 4px |
| Min height | 44px |
| Font weight | 600 (semi-bold) |

### Type B — Secondary (høyre)

| Property | Value |
|----------|-------|
| Background | `#003060` (navy) |
| Text color | `#F0FFFF` (azure) |
| Border | 2px solid `#F0FFFF` (azure) |
| Hover bg | `#F0FFFF` (azure) |
| Hover text | `#003060` (navy) |
| Hover border | 2px solid `#003060` (navy) |
| Transition | `background-color 0.2s ease, color 0.2s ease` |
| Border-radius | 4px |
| Min height | 44px |
| Font weight | 600 (semi-bold) |

### DARK MODE — Identisk

CTA-fargene er de samme i begge temaer. Twin-primary-systemet sikrer kontrast mot alle bakgrunner — 2px solid border av motsatt twin-primary garanterer lesbarhet.

---

## Plasseringsregler

### Par-regel

Når to CTA-knapper vises sammen:

```
[Type A (primær)]  [Type B (sekundær)]
    venstre             høyre
```

- **Maks 2 CTA-knapper per rad.** Ingen unntak.
- Type A er alltid til venstre (eller øverst på mobil).
- Type B er alltid til høyre (eller nederst på mobil).
- Hold avstand: minimum `--space-md` (16px) mellom knappene.

### Enkeltstående CTA

Når kun én CTA vises (f.eks. bunn av side):

- Bruk **Type A** — den primære handlingen.
- Sentrer knappen i seksjonen.
- Bredde: auto (minst 200px) på desktop, `100%` på mobil (<600px).

### Mobil (≤599px)

- CTA-knapper tar **full bredde** (`width: 100%`).
- Stables vertikalt: Type A på topp, Type B under.
- Touch targets: minimum 44×44px (oppfylt via full bredde + 44px min height).

---

## CSS-klasser

```css
/* Base CTA — shared by both types */
.product-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0.5em 1.5em;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    border: 2px solid;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

/* Type A — Primary */
.product-cta {
    background-color: #F0FFFF;
    color: #003060;
    border-color: #003060;
}
.product-cta:hover {
    background-color: #003060;
    color: #F0FFFF;
    border-color: #F0FFFF;
}

/* Type B — Secondary */
.product-cta--secondary {
    background-color: #003060;
    color: #F0FFFF;
    border-color: #F0FFFF;
}
.product-cta--secondary:hover {
    background-color: #F0FFFF;
    color: #003060;
    border-color: #003060;
}
```

---

## Forbudt

- **`opacity` på hover.** Aldri bruk `opacity`-overganger på CTA-knapper. Bruk fargeoverganger (se Type A/B ovenfor).
- **`translateY` på hover.** Ingen sveve-effekter som flytter knappen.
- **Mere enn 2 CTA-knapper i samme rad.** Hvis en tredje handling trengs, plasser den i en egen seksjon nedenfor.

---

## Integrasjon med eksisterende komponenter

| Komponent | CTA-bruk | Klasser |
|-----------|----------|---------|
| `_includes/cta.html` | To knapper: booking + les mer | `.product-cta` + `.product-cta--secondary` |
| `_includes/products.html` | `cta_a` (Type A), `cta_b` (Type B), `cta_c` (Type A) | `.product-cta`, `.product-cta--spaced` |
| Article CTA (perspektiv) | Enkeltstående booking | `.product-cta` (Type A) |

---

## Dependencies

- **C4 (Visitor Flow):** Definerer hvor CTA-knapper plasseres i besøksstrømmen.
- **Twin-primary color system:** `.design/colors.md` — CTA-fargene er avledet fra twin-primary-prinsippet.
- **Layout system:** `.design/layouts.md` — section spacing, container widths for CTA-plassering.
- **Ikke blokkert.** Kan implementeres uavhengig av C1-C4.

---

## Testing Checklist

- [ ] Type A og Type B har korrekte farger (azure/navy per spec)
- [ ] Hover bytter bg + text + border korrekt
- [ ] Alle CTA-knapper har `transition: background-color 0.2s ease, color 0.2s ease`
- [ ] Ingen `opacity`- eller `translateY`-hover på noen CTA
- [ ] Maks 2 CTA-knapper per rad
- [ ] Mobil: full bredde, stablet vertikalt, 44px min touch target
- [ ] Dark mode: CTA-farger er identiske med light mode
- [ ] WCAG AA: kontrastforhold 4.5:1 for all tekst
