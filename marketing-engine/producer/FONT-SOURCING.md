# FONT-SOURCING.md — how the real brand fonts got into the Producer

> Companion to `BRAND-GROUNDING.md`. That file documents *what* the fonts should be
> (Heebo + JetBrains Mono, per `app/layout.tsx`). This file documents *how the actual
> font binaries were obtained* for `marketing-engine/producer/fonts/`, since the
> original brand-grounding pass could not find them and fell back to DejaVu/Arial.

## What changed

Fallback fonts (DejaVu Sans / Arial) are no longer the default. `brand.py` now
resolves to real font files at `marketing-engine/producer/fonts/` first. Fallback
logic is still in place (never removed) in case those files are ever missing, and
`BODY_FONT_NAME` / `MONO_FONT_NAME` always self-report which one actually loaded —
so a fallback can never be silently mistaken for the real brand font.

## Heebo-Regular.ttf / Heebo-Bold.ttf

Real Heebo, the same family `app/layout.tsx` imports via `next/font/google`.

1. `npm install @fontsource/heebo` — this succeeded because the npm registry is
   reachable from this sandbox even though direct binary fetches to
   `fonts.gstatic.com` are not (`curl` to the raw font CDN returns a 403 from the
   sandbox's proxy; `npm view`/`npm install` do not). `@fontsource/heebo` is the
   official self-hosting package for Google's Heebo — same source font, just
   distributed a different way.
2. That package ships pre-split by unicode range (`heebo-latin-400-normal.woff2`,
   `heebo-hebrew-400-normal.woff2`, etc., one file per weight per script — this is
   how Google Fonts serves the family so browsers only download what a page uses).
3. Converted the relevant `.woff2` files to `.ttf` with `fontTools` (`TTFont(path)`,
   then `.flavor = None` before `.save()` — no `brotli`-decompress CLI needed once
   the `brotli` package was installed).
4. Merged the `latin-400` + `hebrew-400` subsets into one `Heebo-Regular.ttf`, and
   `latin-700` + `hebrew-700` into `Heebo-Bold.ttf`, using fontTools' `pyftmerge` —
   the standard tool for combining disjoint-unicode-range subsets of the same
   Google Fonts family into a single file.
5. Verified with `fontTools`: both files cover 50 Hebrew codepoints (U+0590–U+05FF),
   58 Latin A–Z/a–z codepoints, and 10 digits. `name` table reports "Heebo"
   Regular/Bold. PIL's `ImageFont.truetype(...).getname()` confirms the same.

## JetBrainsMono-Regular.ttf / JetBrainsMono-Bold.ttf

Real JetBrains Mono (OFL-licensed), copied directly from the `canvas-design` skill's
bundled font pack, which was already present in this environment (used for a
different feature — poster/art generation — but ships the exact same open-source
font family `app/layout.tsx` imports). No conversion needed; these were already
valid `.ttf` files. Verified with PIL: `getname()` reports "JetBrains Mono"
Regular/Bold.

## What did NOT work (for completeness, per the "report clearly" rule)

- Direct `curl`/`web_fetch` to `fonts.gstatic.com` or `fonts.googleapis.com` for the
  raw font files — blocked at the sandbox's network proxy (403 / connection
  failure), consistent with what was already reported in `BRAND-GROUNDING.md`'s
  "font gap" section.
- No `.next/static/media`, no `node_modules`, and no OS-level font cache in this
  environment already contained Heebo or JetBrains Mono — the project's own build
  output isn't present in this sandbox (no `.next` directory exists here), so
  "reuse already-generated build assets" wasn't available as a path; the npm
  registry + the bundled skill font pack were the two paths that actually worked.

## If you run this renderer somewhere else (e.g. your own machine)

The font-resolution chain in `brand.py` still checks `C:/Windows/Fonts/Heebo*.ttf`
and `C:/Windows/Fonts/JetBrainsMono*.ttf` as secondary candidates. If you ever
install Heebo/JetBrains Mono system-wide on your Windows machine, the renderer will
prefer the repo-local copies in `producer/fonts/` regardless (checked first), so
behavior stays identical and reproducible regardless of what's installed on any
given machine running this script.
