# BRAND-GROUNDING.md — Producer visual layer, source of truth

> Minimum grounding file for `render_visuals.py` only. Not a strategy doc. Every value below is
> traced to a real, found asset — nothing here is invented. See "gaps" at the bottom for the one
> thing that could not be sourced exactly.

## What was inspected

- `public/logo.svg` + `components/Logo.tsx` — the real Shani AI logo (hexagon + inner hexagon +
  center dot, orange, no wordmark baked in).
- `app/globals.css` `:root` — the live CSS custom properties actually rendering on shani-ai.com
  (most authoritative color source; wins over `tailwind.config.ts`, see "discrepancy" below).
- `app/layout.tsx` — confirms the real brand fonts: Heebo, Playfair Display, Inter, JetBrains Mono
  (`next/font/google`).
- `carousels/carousel1..9/*.png` + `carousels/gen_v6.py` — proven rendered brand output (logo mark,
  header wordmark, corner brackets, glow background, footer pill) — but **publish status of every
  carousel is unconfirmed** (`marketing-engine/knowledge/topics-covered.md` marks all as "?"), and
  `marketing-engine/library/ledger.md` shows **zero packages published** ("פורסם" = "לא" for all
  three). So the carousels are proven *rendered* brand style, not a confirmed *published* one.
- **`ריל-קלוד-להכנסה-HQ-סאונד.mp4`** — a real reel Shani uploaded directly into this session
  (1080×1920, 30s, 30 real frames extracted via ffmpeg). This is the actual "last reel" reference
  the task asked for — it was not findable anywhere in the repo itself (no local video/export
  existed), only via this direct upload. All layout numbers below are pixel-measured from this file.

## Confirmed brand values

| Element | Value | Source |
|---|---|---|
| Accent orange | `#F2622E` (242,98,46) | `public/logo.svg` stroke, `globals.css --acc`, pixel-sampled from reel frame 1 (241,97,46 avg — compression noise only) |
| Cream/text | `#F4EDE1` (244,237,225) | `globals.css --dtext`, pixel-sampled from reel (243,235,224 avg) |
| Dark background | `#141009` (20,16,9) | `globals.css --dark`, matches `marketing-engine/brand/visual.md` |
| Dim/subtitle gray | `~#968F84` (150,143,132) | **Recalibrated** — pixel-sampled directly from the reel's subtitle text; measurably darker than the previously-used (160,152,144) and than `globals.css --dmuted` (#b1a48f). Reel pixels are ground truth for this task, used as-is. |
| Logo | Real hexagon+dot geometry from `public/logo.svg` (outer hex r=43, inner hex r=23, center dot r=6.5, on a 100×100 viewBox), reproduced at render size — not a redrawn/invented mark | `public/logo.svg` (exact path data) |
| Wordmark text | "Shani AI Creator" (mixed case, not all-caps) | Read directly off the reel's header, present in every sampled frame |
| Fonts | Heebo (body/headline), JetBrains Mono (handle/tags) | `app/layout.tsx` `next/font/google` imports — see **font gap** below |

## Layout, pixel-measured from the reel (1080×1920 canvas)

- Logo mark: centered top, ~y=40–175 (outer radius ≈67px at render scale), wordmark directly below, ~y=185–215.
- Caption/headline zone: ~y=350–650, **center-aligned** (not right-aligned like the carousels).
- Screen-recording window: full-bleed edge to edge (x=0–1080), y=699–1278, thin ~3px solid orange
  top border line, nothing else drawn inside it (real footage fills it).
- CTA button (ending frame): **solid filled orange** rounded-rect, x=90–990 (900 wide, matches the
  existing 90px safe margin), white text inside (not cream) — two lines: bold headline + smaller
  regular subtext, both white.
- Footer handle: plain centered text, dim gray, monospace, no background pill (the carousel's pill
  footer does **not** appear on the reel — different chrome per format, confirmed from the frames).
- Background: warm radial glow, brightest upper-right, fading to near-black by ~y=800 — same glow
  ellipse technique already proven in `carousels/gen_v6.py`'s `base()` (`[W-500,-200,W+150,450]`,
  color (38,22,10), blended 0.55), reused here scaled to the taller canvas.
- No corner-bracket accents on the reel (that motif is carousel-specific, confirmed absent from all
  30 sampled reel frames — not ported into the Reel renderer).

## Known discrepancy (flagged, not silently resolved)

`tailwind.config.ts` defines `signal: "#ff6a3d"` — a brighter red-orange that does **not** match the
logo file, `globals.css`, or the reel pixels (all agree on `#f2622e`). Treated as stale/legacy
config, not used. If this was actually intentional, that's a decision for Shani, not guessed here.

## Font gap (reported per the task's explicit rule)

Real Heebo/JetBrains Mono font **files** are not obtainable in this sandbox: no internet access for
binary downloads, and neither font is installed locally (checked `fc-list`, checked for a bundled
copy anywhere on disk — none found; also confirmed against `carousels/HEBREW_RTL_NOTES.md`, which
documents that Shani's own Windows machine doesn't have Heebo installed either, only DejaVu-less
Arial). Per the task's rule ("if the exact font file is unavailable but the reference reel is
available, match it visually as closely as possible and report that clearly"): the renderer keeps
searching for real Heebo/JetBrains Mono files first (same fallback chain as before), and falls back
to DejaVu Sans (Linux) / Arial (Windows) — the same substitution already used, unavoidably, for
every asset this system has ever rendered, including (most likely) the carousels themselves, since
`gen_v6.py` has never had a Heebo-specific code path either. This is not a new gap introduced by
this task — it's the pre-existing state, now made explicit instead of implicit.

## Files that use this grounding

`marketing-engine/producer/brand.py` — machine-readable constants imported by `render_visuals.py`.
