# Information Architecture — Cross-Link Map

## Purpose

Documents all cross-references between content pages on noexcuse.no. When adding or modifying pages, update this map to keep cross-links consistent.

## Content Pages

| URL | File | Topic |
|-----|------|-------|
| `/` | `index.md` | Frontpage |
| `/ledelse-60-2/` | `_pages/ledelse_60-2.md` | Product landing — Ledelse 60:2 |
| `/om-oss/` | `_pages/om_oss.md` | About the company |
| `/om-metode/` | `_pages/om_metode.md` | Method overview with 4 frames, 4 benefits, 3 steps |
| `/perspektiv/` | `_pages/ledelse_perspektiv.md` | Scientific background: multiframe thinking |
| `/triader/` | `_pages/ledelse_triader.md` | Triads concept |
| `/struktur/` | `_pages/struktur.md` | Frame: Structure (roller, mål, prosesser) |
| `/mennesker/` | `_pages/mennesker.md` | Frame: People (tilhørighet, mestring, autonomi) |
| `/identitet/` | `_pages/identitet.md` | Frame: Identity (verdier, ritualer, fortelling) |
| `/pavirkning/` | `_pages/pavirkning.md` | Frame: Influence (makt, nettverk, interesser) |
| `/forankring/` | `_pages/ledelse_forankring.md` | Benefit: Anchoring |
| `/tillit/` | `_pages/ledelse_tillit.md` | Benefit: Trust |
| `/makt/` | `_pages/ledelse_makt.md` | Benefit: Power dynamics |
| `/generativ-ki/` | `_pages/ledelse_generativ-ki.md` | Benefit: Generative AI |
| `/usikkerhet/` | `_pages/ledelse_usikkerhet.md` | Benefit: Uncertainty |
| `/grc/` | `_pages/grc.md` | GRC — Governance, Risk, Compliance |

## Tag Pages

Generated from `_tags/` collection at `/emne/:tag/`. Current tags: `beslutningstaking`, `digital-transformasjon`, `endringsledelse`, `forankring`, `kunstig-intelligens`, `ledelse`, `makt`, `organisasjonskultur`, `psykologisk-trygghet`, `servant-leadership`, `tillit`, `usikkerhet`.

## Cross-Reference Map

| From | To | Link Text |
|------|----|-----------|
| `/pavirkning/` → "Maktens kostnader" brief paragraph | `/makt/` | "Les om maktens kostnader →" |
| `/struktur/` → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om multiframe-tenkning →" |
| `/mennesker/` → "Verdier og mening" (Noble Cause → servant leadership) | `/makt/` | Noble cause connects to servant leadership |
| `/identitet/` → tribal stages (Logan) | `/triader/` | "Hvordan bygge triader →" |
| `/usikkerhet/` → Kotter section | `/triader/` | "Verktøy for kulturendring: triader →" |
| All 4 frame articles → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om hvorfor vi ikke scorer →" |
| `/om-metode/` → frame/benefit/step cards | Each content page | Card CTAs link to respective pages |
| Tag cloud on `/emne/:tag/` | Tagged articles | Article links from tag landing |
| `/grc/` → Cybersecurity section | `/usikkerhet/` | "Les om usikkerhetshåndtering →" |
| `/grc/` → Environment section | `/identitet/` | "Les om identitetsperspektivet →" |
| `/grc/` → Quality section | `/struktur/` | "Les om strukturperspektivet →" |
| `/grc/` → Governance section | `/forankring/` | "Les om beslutningsforankring →" |
| `/grc/` → Ledelse 60:2 overview | `/ledelse-60-2/` | "Les mer om Ledelse 60:2 →" |
| `/grc/` → Four perspectives | `/perspektiv/` | "Forstå de fire perspektivene →" |

## Rules

1. Every cross-link should be bidirectional — if page A links to page B, verify B has a relevant context or return link.
2. Link text should be action-oriented ("Les om ..."), not generic ("Klikk her").
3. When a page is renamed or removed, update all incoming cross-links.
4. This map lives in `.design/` as reference for content work — the actual links are hardcoded in `_pages/*.md`.
5. Topic card CTAs in `_includes/card.html` are driven by topic frontmatter — update the topic file, not the include.
