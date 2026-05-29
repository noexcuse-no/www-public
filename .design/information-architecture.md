# Information Architecture — Cross-Link Map

## Purpose

Documents all cross-references between content pages on noexcuse.no. When adding or modifying pages, update this map to keep cross-links consistent.

## Cross-Reference Map

| From | To | Link Text |
|------|----|-----------|
| `/påvirkning/` → "Maktens kostnader" brief paragraph | `/makt/` | "Les om maktens kostnader →" |
| `/struktur/` → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om multiframe-tenkning →" |
| `/mennesker/` → "Verdier og mening" (Noble Cause → servant leadership) | `/makt/` | Noble cause connects to servant leadership |
| `/identitet/` → tribal stages (Logan) | `/triader/` | "Hvordan bygge triader →" |
| `/usikkerhet/` → Kotter section | `/triader/` | "Verktøy for kulturendring: triader →" |
| All 4 frame articles → "Det vitenskapelige grunnlaget" | `/perspektiv/` | "Les om hvorfor vi ikke scorer →" |

## Rules

1. Every cross-link must be bidirectional — if page A links to page B, verify B has a relevant context or return link.
2. Link text should be action-oriented ("Les om ..."), not generic ("Klikk her").
3. When a page is renamed or removed, update all incoming cross-links.
4. This map lives in `.design/` as reference for content work — the actual links are hardcoded in `_pages/*.md`.
