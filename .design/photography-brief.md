# Fotografbrief — No Excuse AS

## Om oss

No Excuse er et ledelsesrådgivningsselskap som hjelper ledergrupper med å bli bedre — uten byråkrati. Vi er forskningsbasert, uavhengige og bevisst ukorporative.

Vår visuelle identitet er **skandinavisk minimal**: ren, funksjonell, uten staffasje. Vi bruker illustrasjoner som primært visuelt språk, men fotografi brukes selektivt for å gi menneskelig varme og troverdighet.

---

## Brand Personality (5 trekk)

Alle bilder må kommunisere disse personlighetstrekkene:

| Trekk | Betyr i praksis |
|-------|----------------|
| **Rebellious** | Utfordrer etablerte sannheter, upretensiøs, ikke «corporate» |
| **Clear** | Komplekse ideer gjort enkle, null konsulentspråk |
| **Nordic** | Demokratisk design, ærlig, intim, jordnær |
| **Trustworthy** | Faglig tyngde, transparent, ekte |
| **Bold** | Tydelige standpunkt, visuelt mot |

---

## Picture Style

### Natural light, not studio

Bruk tilgjengelig lys — vinduslys, rombelysning, utendørs dagslys. Unngå blits eller studiolyssetting som gir et polert «corporate»-uttrykk. Bildene skal føles **ekte**, ikke produsert.

### Candid over posed

Personen skal ikke se ut som om de blir fotografert. Fang øyeblikk av:
- Uformell samtale ved et bord
- En latter, en tankefull pause
- Naturlig bevegelse i rommet

Styr unna:
- Stive positurer med armene i kors
- Falske telefonsamtaler
- Pekefinger på whiteboard

### Environmental portraits

Vis personen i sin naturlige kontekst:
- Møterom med trebord og dagslys
- Ved kaffebaren, i gangen, i en uformell samtale
- Aldri foran hvit bakgrunn eller i studio

### Desaturated color palette

Fargemetningen skal tones ned til omtrent **70%** for å harmonere med den dempede illustrasjonspaletten. Bildene skal ikke være grå eller flate, men de skal heller ikke sprike i mettet farge.

Tenk:
- Dempede jordtoner
- Myk kontrast
- Rolig, avstemt fargetemperatur
- Naturlig hudtone uten over-redigering

---

## Tekniske krav

| Spesifikasjon | Krav |
|--------------|------|
| Minste oppløsning | 1200 × 1200 px (full bredde) |
| Beskjæring, profilbilder | 1:1 (kvadratisk) |
| Beskjæring, case-studier | 16:9 (landskap) |
| Leveranseformat | JPEG eller PNG (høy kvalitet) |
| Videre konvertering | WebP (vi gjør dette internt) |
| Fargerom | sRGB |

---

## Eksempler

### 👍 Dette fungerer

> En person i genser sitter ved et trebord i møterom, midt i en latter, naturlig vinduslys fra siden. Dempede farger, myk bakgrunn.

### 👎 Dette unngår vi

> En person i dress håndhilser på en annen person i dress foran en gradientbakgrunn. Overlyst, overmettet, corporate stockfoto-energi.

---

## Spesifikke behov

### 1. Profilbilder (team)

- **Format:** 1:1 kvadratisk
- **Størrelse:** Vises 100×100 px på nettsiden, men vi trenger minimum 400×400 px for skalering
- **Stil:** Halvfigur eller brystbilde, naturlig lys, personen ser avslappet og tilgjengelig ut
- **Bakgrunn:** Uskarpt kontormiljø eller nøytral vegg — aldri hvit greenscreen eller studio

### 2. Case-bilder (kunder)

- **Format:** 16:9 landskap
- **Størrelse:** Minimum 1200×675 px
- **Stil:** Miljøbilder som viser kunden i deres egen kontekst — møterom, produksjon, kontorlandskap
- **Personer:** Kan inkludere mennesker, men ansikter trenger samtykke. Unngå iscenesatte «teamwork»-bilder.

### 3. Ledergruppe-kontekst (50–250 ansatte)

- **Format:** 16:9 landskap / 1:1 kvadratisk
- **Størrelse:** Minimum 1200×675 px
- **Stil:** Miljøbilder som viser en ledergruppe (5–8 personer) i møte — trebord, dagslys, uformell samtale. Skal kommunisere den primære målgruppen (50–250 ansatte, CEO/MD-buyer) og den diagnostiske, ubyråkratiske arbeidsformen.
- **Personer:** Kan inkludere mennesker, men ansikter trenger samtykke. Unngå stive «boardroom»-positurer.

---

## Leveranse

- **Antall:** 1–3 profilbilder + eventuelle case-bilder
- **Filstruktur:** Vi sorterer bildene i `assets/images/` på prosjektet
- **Originalfiler:** Behold originaler — vi konverterer til WebP og lagrer kopier i `.design/graphics/originals/`

---

## Originaler vs. offentlige derivater

Originalbilder i høy oppløsning ligger i `.design/graphics/originals/` (versjonsstyrt). Disse er sannhetskilden — de serveres **ikke** av Jekyll og er aldri lenket fra sider.

Offentlige derivater ligger i `assets/images/` (WebP) og `assets/images/icons/` (PNG/WebP). Det er disse Jekyll pakker og nettlesere laster ned.

| Sti | Innhold | Servert |
|-----|---------|---------|
| `.design/graphics/originals/` | PNG-bannere, SVG-logotyper, ikonkilder | Nei |
| `assets/images/` | WebP-spot-/bannerillustrasjoner | Ja |
| `assets/images/icons/` | Små ikon-PNG/WebP | Ja |
| `assets/*.pdf` | Offentlige dokumentvedlegg | Ja (lenket fra sider) |

**Regel:** rediger originaler, generer deretter derivater — server aldri originaler direkte.

### Metadata-hygiene

Alle bilder og PDF-er i det offentlige treet sjekkes av to skript:

- **`scripts/sanitize-metadata.sh`** (`npm run sanitize:media`): fjerner personvernsensitiv metadata fra bilder — GPS, kamera-/serienummer, maker notes, innebygde kommentarer, skaperattribusjon og Photoshop-redigeringshistorikk. Bevarer bevisst rettigheter (rettighetshaver, opphavsrett, `XMP-xmpRights:WebStatement`) og AI-proveniens (`DigitalSourceType`, C2PA content credentials).
- **`scripts/inspect-doc-metadata.sh`** (`npm run inspect:docs`): inspiserer PDF-dokumentegenskaper (forfatter, oppretter, produsent, tittel) og flagger personnavn, programvareidentitet og interne filnavn/stier. Strip-modus fjerner flaggede verdier uten å ødelegge innholdet.

Nye bilder/PDF-er skal kjøres gjennom skriptene før de legges til i det offentlige treet.

---

## Kontakt

Ved spørsmål om briefen, kontakt No Excuse AS på firmapost@noexcuse.no.
