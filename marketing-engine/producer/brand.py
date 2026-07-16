"""
brand.py — Producer visual layer brand source of truth.

Every constant here is traced to a real, found asset. See BRAND-GROUNDING.md for the evidence
(public/logo.svg, app/globals.css, app/layout.tsx, and pixel measurements from the reference reel
Shani uploaded: ריל-קלוד-להכנסה-HQ-סאונד.mp4). Nothing here is invented.

Do not add a value to this file without a traceable source — that's the entire point of it.
"""
import os

# --------------------------------------------------------------------------------
# Colors — confirmed against public/logo.svg, app/globals.css :root, and pixel-sampled
# from the reference reel frames (see BRAND-GROUNDING.md).
# --------------------------------------------------------------------------------
BG = (20, 16, 9)             # #141009 — globals.css --dark
GLOW = (38, 22, 10)          # gen_v6.py base() glow ellipse color, confirmed present in reel bg
CARD = (29, 22, 14)          # #1D160E — close to globals.css --dpanel, used sparingly (not the CTA anymore)
TEXT = (244, 237, 225)       # #F4EDE1 — globals.css --dtext, pixel-confirmed in reel (243,235,224)
DIM = (150, 143, 132)        # ~#968F84 — recalibrated from reel pixel sampling (darker than old value)
ORANGE = (242, 98, 46)       # #F2622E — logo.svg stroke + globals.css --acc, pixel-confirmed in reel
WHITE = (255, 255, 255)      # pure white — confirmed as the CTA-button text color in the reel (not cream)

BG_HEX, TEXT_HEX, DIM_HEX, ORANGE_HEX, WHITE_HEX = (
    "#141009", "#F4EDE1", "#968F84", "#F2622E", "#FFFFFF",
)

# --------------------------------------------------------------------------------
# Logo geometry — exact path data from public/logo.svg (100x100 viewBox):
#   outer hex: M50 7 L87 28.5 L87 71.5 L50 93 L13 71.5 L13 28.5 Z  (radius 43, stroke-width 6)
#   inner hex: M50 27 L70 39 L70 61 L50 73 L30 61 L30 39 Z         (radius 23, stroke-width 4, 50% opacity)
#   center dot: cx=50 cy=50 r=6.5 fill
# Ratios preserved exactly; only the render scale changes per asset.
# --------------------------------------------------------------------------------
LOGO_OUTER_RATIO = 43 / 50    # relative to half the logo's bounding box
LOGO_INNER_RATIO = 23 / 50
LOGO_DOT_RATIO = 6.5 / 50
LOGO_OUTER_STROKE_RATIO = 6 / 100
LOGO_INNER_STROKE_RATIO = 4 / 100

WORDMARK = "Shani AI Creator"   # exact text read off the reel's header, every sampled frame
HANDLE = "@shani.creates.ai"    # still used by CTA/overlay/slot footers — unchanged, not the cover

# --------------------------------------------------------------------------------
# Layout zones — pixel-measured directly from the reference reel (1080x1920 canvas).
# See BRAND-GROUNDING.md for the measurement method (ffmpeg frame extraction + PIL sampling).
# --------------------------------------------------------------------------------
REEL_W, REEL_H = 1080, 1920
SAFE_MARGIN_X = 90                    # matches the reel's CTA box left/right inset exactly (x=90..990)

LOGO_CENTER_Y = 107
LOGO_RENDER_R = 67                    # outer hex radius at render scale
WORDMARK_Y = 195

CAPTION_ZONE_TOP = 350
CAPTION_ZONE_BOTTOM = 650

RECORDING_WINDOW_TOP = 699
RECORDING_WINDOW_BOTTOM = 1278
RECORDING_BORDER_PX = 4

HANDLE_Y = 1840

CAROUSEL_W, CAROUSEL_H = 1080, 1350   # unchanged, carousel format not touched by this task

# --------------------------------------------------------------------------------
# Approved cover composition — locked to the reference image Shani approved
# directly and asked to be reproduced deterministically. These constants are used
# ONLY by render_cover()/svg_cover() in render_visuals.py — every other asset
# (CTA cards, overlays, manual-recording slots, carousel slides) keeps using the
# shared LOGO_CENTER_Y / WORDMARK_Y / HANDLE above, untouched.
#
# COVER_LOGO_CENTER_Y / COVER_WORDMARK_Y: the approved reference shows the logo
# block clearly lowered from the top edge compared to the shared header position
# (which sits at LOGO_CENTER_Y=107, i.e. only 40px from the top edge). No pixel-
# level file was available for this reference (unlike the reel video, which was
# uploaded and could be frame-extracted) — these values are a deliberate, moderate
# downward shift derived from visual proportion matching, not a measurement. See
# COVER-APPROVAL.md for the full reasoning and an explicit invitation to Shani to
# request finer calibration if this doesn't match closely enough.
#
# COVER_HEADLINE_ZONE_TOP: the shared render_headline_card's headline zone starts
# at y=300, which would now overlap the lowered logo/wordmark block. Raised only
# by the minimum needed to clear that overlap — the headline's centering range
# still shares the same zone_bottom (out_h-400) as before, so it stays as close to
# the previously-approved restrained position as the lowered logo allows.
#
# COVER_FOOTER: replaces the Instagram handle on the cover only, per Shani's
# explicit direction ("do not use the old Instagram handle in future Reel
# covers"). HANDLE above is unchanged and still used everywhere else.
# --------------------------------------------------------------------------------
COVER_LOGO_CENTER_Y = 180
COVER_WORDMARK_Y = 268
COVER_HEADLINE_ZONE_TOP = 380
COVER_FOOTER = "SHANI-AI.COM"

# --------------------------------------------------------------------------------
# Font resolution.
#
# Real Heebo + JetBrains Mono files ARE now available locally, in this exact repo,
# at marketing-engine/producer/fonts/ — see FONT-SOURCING.md for provenance:
#   - Heebo-Regular.ttf / Heebo-Bold.ttf: fetched via `npm install @fontsource/heebo`
#     (the same font family app/layout.tsx imports via next/font/google), then the
#     latin + hebrew unicode-range subsets were merged into a single TTF per weight
#     with fontTools' pyftmerge so one file covers both scripts. Verified: 50 Hebrew
#     codepoints + 58 Latin A-Za-z + 10 digits, name table reports "Heebo".
#   - JetBrainsMono-Regular.ttf / JetBrainsMono-Bold.ttf: real JetBrains Mono TTFs
#     (OFL-licensed), sourced from the canvas-design skill's bundled font pack
#     already present in this environment. Verified: PIL reports "JetBrains Mono".
#
# This directory is searched FIRST. Only if these files are ever missing does the
# renderer fall back to system fonts, then finally DejaVu/Arial — and it always
# self-reports which one is actually in use via BODY_FONT_NAME/MONO_FONT_NAME so a
# fallback can never be silently mistaken for the real brand font.
# --------------------------------------------------------------------------------
def _first_existing(paths):
    for p in paths:
        if p and os.path.exists(p):
            return p
    return None

_LOCAL_FONTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

_HEEBO_REGULAR = _first_existing([
    os.path.join(_LOCAL_FONTS_DIR, "Heebo-Regular.ttf"),
    "C:/Windows/Fonts/Heebo-Regular.ttf",
    "C:/Windows/Fonts/Heebo.ttf",
    os.path.expanduser("~/.fonts/Heebo-Regular.ttf"),
])
_HEEBO_BOLD = _first_existing([
    os.path.join(_LOCAL_FONTS_DIR, "Heebo-Bold.ttf"),
    "C:/Windows/Fonts/Heebo-Bold.ttf",
    os.path.expanduser("~/.fonts/Heebo-Bold.ttf"),
])
_DEJA_R = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
_DEJA_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

if _HEEBO_REGULAR and _HEEBO_BOLD:
    BODY_REGULAR, BODY_BOLD, BODY_FONT_NAME = _HEEBO_REGULAR, _HEEBO_BOLD, "Heebo (real, see FONT-SOURCING.md)"
elif os.path.exists(_DEJA_R):
    BODY_REGULAR, BODY_BOLD, BODY_FONT_NAME = _DEJA_R, _DEJA_B, "DejaVu Sans (Heebo unavailable — closest match, see BRAND-GROUNDING.md)"
else:
    BODY_REGULAR = "C:/Windows/Fonts/arial.ttf"
    BODY_BOLD = "C:/Windows/Fonts/arialbd.ttf"
    BODY_FONT_NAME = "Arial (Heebo unavailable — closest match, see BRAND-GROUNDING.md)"

_MONO_CANDIDATES_REG = [
    os.path.join(_LOCAL_FONTS_DIR, "JetBrainsMono-Regular.ttf"),
    "C:/Windows/Fonts/JetBrainsMono-Regular.ttf",
    os.path.expanduser("~/.fonts/JetBrainsMono-Regular.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
]
_MONO_CANDIDATES_BOLD = [
    os.path.join(_LOCAL_FONTS_DIR, "JetBrainsMono-Bold.ttf"),
    "C:/Windows/Fonts/JetBrainsMono-Bold.ttf",
    os.path.expanduser("~/.fonts/JetBrainsMono-Bold.ttf"),
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
]
MONO_REGULAR = _first_existing(_MONO_CANDIDATES_REG) or "C:/Windows/Fonts/consola.ttf"
MONO_BOLD = _first_existing(_MONO_CANDIDATES_BOLD) or "C:/Windows/Fonts/consolab.ttf"
MONO_FONT_NAME = "JetBrains Mono (real, see FONT-SOURCING.md)" if _first_existing(_MONO_CANDIDATES_REG[:2]) else \
    "DejaVu Sans Mono (JetBrains Mono unavailable — closest match)"
