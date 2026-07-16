# COVER-APPROVAL.md — locked cover composition

> Companion to `BRAND-GROUNDING.md` (brand values) and `FONT-SOURCING.md` (font provenance).
> This file documents the one composition decision Shani approved directly and asked to be
> locked in: the Reel cover. `render_cover()` / `svg_cover()` in `render_visuals.py` are the
> only functions that read the `COVER_*` constants below — every other asset (CTA cards,
> overlays, manual-recording slots, carousel slides) is untouched and keeps using the shared
> `LOGO_CENTER_Y` / `WORDMARK_Y` / `HANDLE`.

## What was approved

Shani attached a reference cover image and asked for it to be reproduced deterministically,
not redesigned. The three concrete differences from the composition used until this point:

1. **Logo lowered safely from the top edge.** The shared header position
   (`LOGO_CENTER_Y=107`) puts the logo's top edge only 40px from the canvas edge. The approved
   reference shows it clearly lower.
2. **Footer reads the domain, not the Instagram handle.** `SHANI-AI.COM` replaces
   `@shani.creates.ai` — cover only, per explicit instruction ("do not use the old Instagram
   handle in future Reel covers").
3. **Headline stays restrained** — same size (84px), same centered/orange-accent treatment as
   the previously-approved render. Not enlarged, not redesigned.

## How the numbers were derived — important caveat

Unlike the reference reel video (`ריל-קלוד-להכנסה-HQ-סאונד.mp4`), which was uploaded as a file
and could be frame-extracted with `ffmpeg` and pixel-sampled with PIL for exact measurements,
**the approved cover reference image was provided inline in chat only — no file was available
in this sandbox to measure pixels from.** The values below are a deliberate, moderate visual
match by proportion, not a measurement. If they don't land close enough, that's a calibration
request, not a redesign request — flag it and the constants below are the only thing that needs
to change.

| Constant | Value | Was (shared header) | Reasoning |
|---|---|---|---|
| `COVER_LOGO_CENTER_Y` | 180 | 107 | Moderate, deliberate drop — logo's top edge moves from 40px to 113px from the canvas edge. Enough to read as "lowered safely," not a dramatic relayout. |
| `COVER_WORDMARK_Y` | 268 | 195 | Same 88px offset below the logo center as the shared header — proportion preserved, not reinvented. |
| `COVER_HEADLINE_ZONE_TOP` | 380 | 300 | The shared headline zone starts at 300, which would now overlap the lowered logo/wordmark (wordmark text ends ~318). Raised only by the minimum needed to clear that overlap. `zone_bottom` is untouched (`out_h-400`), so the headline's centering range — and therefore how close it stays to the previously-approved position — is disturbed as little as the lowered logo allows. |
| `COVER_FOOTER` | `"SHANI-AI.COM"` | `"@shani.creates.ai"` | Explicit instruction, cover-only. |

Net effect: the headline's vertical center moves from ~810px to ~950px (about 140px lower) —
a side effect of giving the logo real breathing room, not an independent design decision.

## What did not change

- Logo geometry (`public/logo.svg` hexagon+dot, same render radius) — untouched.
- Fonts — real Heebo (`marketing-engine/producer/fonts/Heebo-*.ttf`) and real JetBrains Mono,
  see `FONT-SOURCING.md`.
- Colors — same verified palette as `BRAND-GROUNDING.md` (`#F2622E` orange, `#F4EDE1` cream,
  `#141009` dark, `#968F84` dim).
- Background glow technique and position — unchanged.
- `render_headline_card()` / `svg_headline_card()` — untouched, still used by `cta-shot8` exactly
  as before. This cover change cannot leak into any other asset because it lives in its own
  `render_cover()` / `svg_cover()` functions with its own constants.
- Package content/copy — `COVER["lines"]` / `COVER["subtitle"]` text is unchanged, sourced from
  the same approved package as always.

## Files that use this

`marketing-engine/producer/brand.py` (`COVER_*` constants) and
`marketing-engine/producer/render_visuals.py` (`render_cover()`, `svg_cover()`, wired into
`render_reel_package()`'s cover step only).
