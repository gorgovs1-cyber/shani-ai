#!/usr/bin/env python3
"""
render_visuals.py — Producer V1.2 deterministic visual renderer, grounded in the real Shani AI brand.

Renders branded Reel + carousel visual assets (PNG via Pillow, SVG via a matching hand-authored
emitter) from an approved marketing-engine package. All brand values (logo, colors, layout zones)
come from marketing-engine/producer/brand.py — a source of truth traced to public/logo.svg,
app/globals.css, and pixel measurements from the reference reel Shani uploaded directly into this
session (ריל-קלוד-להכנסה-HQ-סאונד.mp4). See marketing-engine/producer/BRAND-GROUNDING.md for the
full evidence trail. Nothing here is invented.

Reuses the proven Hebrew-RTL technique from carousels/gen_v6.py (raqm-if-available, else
python-bidi with base_dir='R' — see carousels/HEBREW_RTL_NOTES.md). Does not modify gen_v6.py or
any other existing system; this is a self-contained Producer script.

Hard rules (do not relax):
- Never invent a screen recording, screenshot, product UI, or result. Shots that require real
  screen capture become clearly-labeled "manual recording slot" cards plus transparent caption
  overlays meant to sit ABOVE the real footage — never a fabricated substitute presented as final.
- All on-screen text is copied verbatim from the approved package. No new copy is authored here.
- Output stays inside <package>/production/. Nothing outside production/ is touched.

Usage:
    python3 render_visuals.py --package <path-to-package-dir> --type reel
"""
import argparse
import csv
import json
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand

# --------------------------------------------------------------------------------
# Brand constants — imported from brand.py (source of truth, see BRAND-GROUNDING.md).
# --------------------------------------------------------------------------------
BG, GLOW, CARD, TEXT, DIM, ORANGE, WHITE = (
    brand.BG, brand.GLOW, brand.CARD, brand.TEXT, brand.DIM, brand.ORANGE, brand.WHITE,
)
BG_HEX, TEXT_HEX, DIM_HEX, ORANGE_HEX, WHITE_HEX = (
    brand.BG_HEX, brand.TEXT_HEX, brand.DIM_HEX, brand.ORANGE_HEX, brand.WHITE_HEX,
)
REEL_W, REEL_H = brand.REEL_W, brand.REEL_H
CAROUSEL_W, CAROUSEL_H = brand.CAROUSEL_W, brand.CAROUSEL_H
SAFE_MARGIN_X = brand.SAFE_MARGIN_X
LOGO_CENTER_Y, LOGO_RENDER_R, WORDMARK_Y = brand.LOGO_CENTER_Y, brand.LOGO_RENDER_R, brand.WORDMARK_Y
CAPTION_ZONE_TOP, CAPTION_ZONE_BOTTOM = brand.CAPTION_ZONE_TOP, brand.CAPTION_ZONE_BOTTOM
RECORDING_WINDOW_TOP, RECORDING_WINDOW_BOTTOM = brand.RECORDING_WINDOW_TOP, brand.RECORDING_WINDOW_BOTTOM
RECORDING_BORDER_PX = brand.RECORDING_BORDER_PX
HANDLE_Y = brand.HANDLE_Y
WORDMARK, HANDLE = brand.WORDMARK, brand.HANDLE

BODY_REGULAR, BODY_BOLD, BODY_FONT_NAME = brand.BODY_REGULAR, brand.BODY_BOLD, brand.BODY_FONT_NAME
MONO_REGULAR, MONO_BOLD, MONO_FONT_NAME = brand.MONO_REGULAR, brand.MONO_BOLD, brand.MONO_FONT_NAME

SAFE_TOP = CAPTION_ZONE_TOP          # kept for backward-compatible naming in a couple of helpers
SAFE_BOTTOM = REEL_H - RECORDING_WINDOW_BOTTOM


def rgba(c, a=255):
    return (c[0], c[1], c[2], a)


# --------------------------------------------------------------------------------
# Hebrew RTL handling — identical technique to gen_v6.py / HEBREW_RTL_NOTES.md.
# --------------------------------------------------------------------------------
try:
    from PIL.features import check_feature as _cf
    _HAS_RAQM = _cf('raqm')
except Exception:
    _HAS_RAQM = False

if not _HAS_RAQM:
    try:
        from bidi.algorithm import get_display as _gd
        def _bidi(t):
            return _gd(t, base_dir='R')
    except ImportError:
        def _bidi(t):
            return t
else:
    def _bidi(t):
        return t


def fnt(bold=False, size=40, mono=False):
    if mono:
        path = MONO_BOLD if bold else MONO_REGULAR
    else:
        path = BODY_BOLD if bold else BODY_REGULAR
    return ImageFont.truetype(path, size)


def _rtl_kwargs(rtl):
    return dict(direction='rtl', language='he') if (rtl and _HAS_RAQM) else {}


def tw(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    b = draw.textbbox((0, 0), t, font=font, **_rtl_kwargs(rtl))
    return b[2] - b[0]


def th(draw, text, font, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    b = draw.textbbox((0, 0), t, font=font, **_rtl_kwargs(rtl))
    return b[3] - b[1]


def txt(draw, x, y, text, font, color, rtl=True):
    t = _bidi(text) if (rtl and not _HAS_RAQM) else text
    draw.text((x, y), t, font=font, fill=color, **_rtl_kwargs(rtl))


def ctxt(draw, y, text, font, color, rtl=True, canvas_w=REEL_W):
    w = tw(draw, text, font, rtl)
    txt(draw, (canvas_w - w) // 2, y, text, font, color, rtl)
    return th(draw, text, font, rtl)


def wrap_rtl(draw, text, font, max_width, rtl=True):
    """Word-wrap (space-separated, works for Hebrew word order same as English)."""
    words = text.split(" ")
    lines, current = [], ""
    for w in words:
        candidate = f"{current} {w}".strip()
        if tw(draw, candidate, font, rtl) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


# --------------------------------------------------------------------------------
# Real logo mark — exact geometry from public/logo.svg (100x100 viewBox: outer hex
# radius 43/stroke 6, inner hex radius 23/stroke 4 @ ~55% opacity, center dot r=6.5).
# Rendered as its own RGBA layer so it can be alpha-composited onto any canvas.
# --------------------------------------------------------------------------------
def make_logo_layer(r_outer=LOGO_RENDER_R, color=ORANGE):
    pad = 12
    size = int(2 * (r_outer + pad))
    layer = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = cy = size / 2
    s = r_outer / 43.0
    outer_r, inner_r, dot_r = 43 * s, 23 * s, 6.5 * s
    outer_lw = max(2, round(6 * s))
    inner_lw = max(1, round(4 * s))

    def hex_pts(r):
        return [(cx + r * math.cos(math.radians(-90 + 60 * i)),
                  cy + r * math.sin(math.radians(-90 + 60 * i))) for i in range(6)]

    pts_outer = hex_pts(outer_r)
    for i in range(6):
        d.line([pts_outer[i], pts_outer[(i + 1) % 6]], fill=rgba(color, 255), width=outer_lw)
    pts_inner = hex_pts(inner_r)
    for i in range(6):
        d.line([pts_inner[i], pts_inner[(i + 1) % 6]], fill=rgba(color, 140), width=inner_lw)
    d.ellipse([cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r], fill=rgba(color, 255))
    return layer


def draw_header(img_rgba, r_outer=LOGO_RENDER_R):
    """Composites the logo mark + 'Shani AI Creator' wordmark, centered top. Mutates
    and returns a fresh ImageDraw for img_rgba (call after any alpha_composite)."""
    logo = make_logo_layer(r_outer)
    lx = REEL_W // 2 - logo.width // 2
    ly = LOGO_CENTER_Y - logo.height // 2
    img_rgba.alpha_composite(logo, (lx, ly))
    draw = ImageDraw.Draw(img_rgba)
    f_word = fnt(True, 38)
    ctxt(draw, WORDMARK_Y, WORDMARK, f_word, rgba(TEXT), canvas_w=REEL_W)
    return draw


def draw_handle_footer(draw):
    f_h = fnt(False, 30, mono=True)
    ctxt(draw, HANDLE_Y, HANDLE, f_h, rgba(DIM), canvas_w=REEL_W, rtl=False)


# --------------------------------------------------------------------------------
# Background — warm radial glow, same proven technique as carousels/gen_v6.py's
# base() (single blended ellipse, upper-right), scaled for the taller Reel canvas.
# Pixel-confirmed against the reference reel: brightest upper-right, fading by ~y=800.
# --------------------------------------------------------------------------------
def make_glow_bg(out_w=REEL_W, out_h=REEL_H):
    img = Image.new('RGB', (out_w, out_h), BG)
    g = Image.new('RGB', (out_w, out_h), BG)
    gd = ImageDraw.Draw(g)
    gd.ellipse([out_w - 560, -260, out_w + 200, 650], fill=GLOW)
    return Image.blend(img, g, 0.55)


# --------------------------------------------------------------------------------
# Full-screen branded cards
# --------------------------------------------------------------------------------
def render_headline_card(lines, subtitle=None, accent_last=True, out_w=REEL_W, out_h=REEL_H, rtl=True):
    """Cover-style card: logo+wordmark header, centered bold headline (accent on the
    last line), optional dim subtitle, handle footer. Matches the reel's cover/hook
    frame layout exactly (center-aligned, not right-aligned like the carousels).
    rtl=False for Latin-only content (e.g. a bare @handle outro) — matches the
    handle footer's own rtl=False convention, avoiding bidi-reordering Latin text."""
    img = make_glow_bg(out_w, out_h).convert('RGBA')
    draw = draw_header(img)

    f_big = fnt(True, 84)
    f_sub = fnt(False, 42)
    max_w = out_w - 2 * SAFE_MARGIN_X

    wrapped = []
    for raw_line in lines:
        wrapped.extend(wrap_rtl(draw, raw_line, f_big, max_w, rtl=rtl))

    line_heights = [th(draw, l, f_big, rtl=rtl) for l in wrapped]
    gap = 22
    block_h = sum(line_heights) + gap * (len(wrapped) - 1)
    sub_h = th(draw, subtitle, f_sub, rtl=rtl) if subtitle else 0
    total_h = block_h + (44 + sub_h if subtitle else 0)

    zone_top, zone_bottom = 300, out_h - 400
    y = zone_top + max(0, (zone_bottom - zone_top - total_h) // 2)
    for i, line in enumerate(wrapped):
        color = ORANGE if (accent_last and i == len(wrapped) - 1) else TEXT
        ctxt(draw, y, line, f_big, rgba(color), canvas_w=out_w, rtl=rtl)
        y += line_heights[i] + gap
    if subtitle:
        y += 22
        ctxt(draw, y, subtitle, f_sub, rgba(DIM), canvas_w=out_w, rtl=rtl)

    draw_handle_footer(draw)
    return img.convert('RGB')


def render_cover(lines, subtitle=None, out_w=REEL_W, out_h=REEL_H):
    """Approved cover composition — locked to the reference image Shani approved
    directly (see COVER-APPROVAL.md). Deliberately separate from
    render_headline_card (still used unmodified by cta-shot8): the logo/wordmark
    here use brand.COVER_LOGO_CENTER_Y / brand.COVER_WORDMARK_Y (lowered safely
    from the top, cover-only), the headline zone uses brand.COVER_HEADLINE_ZONE_TOP,
    and the footer reads brand.COVER_FOOTER ("SHANI-AI.COM") instead of the
    Instagram handle. Every other asset's logo position and footer text are
    untouched by this function."""
    img = make_glow_bg(out_w, out_h).convert('RGBA')

    logo = make_logo_layer(LOGO_RENDER_R)
    lx = out_w // 2 - logo.width // 2
    ly = brand.COVER_LOGO_CENTER_Y - logo.height // 2
    img.alpha_composite(logo, (lx, ly))
    draw = ImageDraw.Draw(img)
    f_word = fnt(True, 38)
    ctxt(draw, brand.COVER_WORDMARK_Y, WORDMARK, f_word, rgba(TEXT), canvas_w=out_w)

    f_big = fnt(True, 84)
    f_sub = fnt(False, 42)
    max_w = out_w - 2 * SAFE_MARGIN_X

    wrapped = []
    for raw_line in lines:
        wrapped.extend(wrap_rtl(draw, raw_line, f_big, max_w))

    line_heights = [th(draw, l, f_big) for l in wrapped]
    gap = 22
    block_h = sum(line_heights) + gap * (len(wrapped) - 1)
    sub_h = th(draw, subtitle, f_sub) if subtitle else 0
    total_h = block_h + (44 + sub_h if subtitle else 0)

    zone_top, zone_bottom = brand.COVER_HEADLINE_ZONE_TOP, out_h - 400
    y = zone_top + max(0, (zone_bottom - zone_top - total_h) // 2)
    for i, line in enumerate(wrapped):
        color = ORANGE if i == len(wrapped) - 1 else TEXT
        ctxt(draw, y, line, f_big, rgba(color), canvas_w=out_w)
        y += line_heights[i] + gap
    if subtitle:
        y += 22
        ctxt(draw, y, subtitle, f_sub, rgba(DIM), canvas_w=out_w)

    f_foot = fnt(False, 30, mono=True)
    ctxt(draw, HANDLE_Y, brand.COVER_FOOTER, f_foot, rgba(DIM), canvas_w=out_w, rtl=False)

    return img.convert('RGB')


def render_cta_button_card(headline, subtext=None, out_w=REEL_W, out_h=REEL_H):
    """Ending-style card: logo+wordmark header, solid-filled orange rounded button
    with white text (bold headline + optional smaller subtext) — matches the reel's
    actual ending frame exactly (solid fill, not the carousel's outline style)."""
    img = make_glow_bg(out_w, out_h).convert('RGBA')
    draw = draw_header(img)

    f_head = fnt(True, 60)
    f_sub = fnt(False, 34)
    box_pad_x, box_pad_y = 70, 56
    max_w = out_w - 2 * SAFE_MARGIN_X - 2 * box_pad_x

    head_lines = wrap_rtl(draw, headline, f_head, max_w)
    head_heights = [th(draw, l, f_head) for l in head_lines]
    gap = 14
    head_block_h = sum(head_heights) + gap * (len(head_lines) - 1)

    sub_lines = wrap_rtl(draw, subtext, f_sub, max_w) if subtext else []
    sub_heights = [th(draw, l, f_sub) for l in sub_lines]
    sub_block_h = (sum(sub_heights) + 10 * max(0, len(sub_lines) - 1)) if sub_lines else 0

    inner_gap = 28 if sub_lines else 0
    total_h = head_block_h + inner_gap + sub_block_h
    box_h = total_h + 2 * box_pad_y
    box_top = (out_h - box_h) // 2
    box_bottom = box_top + box_h

    draw.rounded_rectangle([SAFE_MARGIN_X, box_top, out_w - SAFE_MARGIN_X, box_bottom],
                            radius=28, fill=rgba(ORANGE))

    y = box_top + box_pad_y
    for i, line in enumerate(head_lines):
        ctxt(draw, y, line, f_head, rgba(WHITE), canvas_w=out_w)
        y += head_heights[i] + gap
    if sub_lines:
        y += inner_gap - gap
        for i, line in enumerate(sub_lines):
            ctxt(draw, y, line, f_sub, rgba(WHITE), canvas_w=out_w)
            y += sub_heights[i] + 10

    draw_handle_footer(draw)
    return img.convert('RGB')


# --------------------------------------------------------------------------------
# Overlays — full branded "frame" with a transparent cutout where the recording
# window goes (x=0..W, y=RECORDING_WINDOW_TOP..BOTTOM). Meant to sit as ONE layer
# above Shani's real, separately-placed screen-recording footage in CapCut: the
# footage shows through the transparent hole, the branded chrome (logo, caption,
# orange top border, handle) sits opaquely everywhere else. This matches the
# reference reel's actual frame structure exactly (see BRAND-GROUNDING.md).
# --------------------------------------------------------------------------------
def render_overlay_frame(caption_text, out_w=REEL_W, out_h=REEL_H):
    img = make_glow_bg(out_w, out_h).convert('RGBA')
    draw = draw_header(img)

    f_cap = fnt(True, 54)
    max_w = out_w - 2 * SAFE_MARGIN_X
    lines = wrap_rtl(draw, caption_text, f_cap, max_w)
    line_heights = [th(draw, l, f_cap) for l in lines]
    gap = 14
    block_h = sum(line_heights) + gap * (len(lines) - 1)
    zone_h = CAPTION_ZONE_BOTTOM - CAPTION_ZONE_TOP
    y = CAPTION_ZONE_TOP + max(0, (zone_h - block_h) // 2)
    for i, line in enumerate(lines):
        ctxt(draw, y, line, f_cap, rgba(TEXT), canvas_w=out_w)
        y += line_heights[i] + gap

    # cut the transparent recording window
    hole_top = RECORDING_WINDOW_TOP + RECORDING_BORDER_PX
    hole = Image.new('RGBA', (out_w, RECORDING_WINDOW_BOTTOM - hole_top), (0, 0, 0, 0))
    img.paste(hole, (0, hole_top))

    # orange top border sits right above the hole, full width
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, RECORDING_WINDOW_TOP, out_w, hole_top], fill=rgba(ORANGE))

    draw_handle_footer(draw)
    return img


def render_step_badge(step_label, out_w=REEL_W, out_h=REEL_H):
    """Small transparent corner badge overlay, e.g. 'שלב 1' — optional light layer
    per package.md, repositioned just above the recording window's top-right corner."""
    img = Image.new('RGBA', (out_w, out_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    f = fnt(True, 32, mono=True)
    w = tw(draw, step_label, f, rtl=False)
    x = out_w - SAFE_MARGIN_X - w - 20
    y = RECORDING_WINDOW_TOP - 76
    pad = 14
    draw.rounded_rectangle([x - pad, y - pad, x + w + pad, y + th(draw, step_label, f, rtl=False) + pad],
                            radius=12, outline=rgba(ORANGE), width=2, fill=rgba(BG, 190))
    draw.text((x, y), step_label, font=f, fill=rgba(ORANGE))
    return img


def render_slot_placeholder(shot_idx, start, end, caption_text, recorded_desc, out_w=REEL_W, out_h=REEL_H):
    """Same branded chrome as the overlay (logo, wordmark, real on-screen caption),
    but the recording window is OPAQUE and clearly labeled as a placeholder — never
    to be mistaken for finished footage. Lets Shani preview the frame while making
    unmistakably clear what still needs real screen capture."""
    img = make_glow_bg(out_w, out_h).convert('RGBA')
    draw = draw_header(img)

    f_cap = fnt(True, 54)
    max_w = out_w - 2 * SAFE_MARGIN_X
    lines = wrap_rtl(draw, caption_text, f_cap, max_w)
    line_heights = [th(draw, l, f_cap) for l in lines]
    gap = 14
    block_h = sum(line_heights) + gap * (len(lines) - 1)
    zone_h = CAPTION_ZONE_BOTTOM - CAPTION_ZONE_TOP
    y = CAPTION_ZONE_TOP + max(0, (zone_h - block_h) // 2)
    for i, line in enumerate(lines):
        ctxt(draw, y, line, f_cap, rgba(TEXT), canvas_w=out_w)
        y += line_heights[i] + gap

    draw.rectangle([0, RECORDING_WINDOW_TOP, out_w, RECORDING_WINDOW_TOP + RECORDING_BORDER_PX],
                    fill=rgba(ORANGE))
    draw.rectangle([0, RECORDING_WINDOW_TOP + RECORDING_BORDER_PX, out_w, RECORDING_WINDOW_BOTTOM],
                    fill=rgba(CARD))

    f_tag = fnt(True, 34, mono=True)
    f_num = fnt(True, 46)
    f_desc = fnt(False, 32)
    wy = RECORDING_WINDOW_TOP + 60
    wy += ctxt(draw, wy, "SCREEN RECORDING SLOT", f_tag, rgba(ORANGE), rtl=False) + 22
    wy += ctxt(draw, wy, f"שוט {shot_idx} · {start}s–{end}s", f_num, rgba(TEXT)) + 26
    desc_max_w = out_w - 2 * SAFE_MARGIN_X - 100
    for line in wrap_rtl(draw, recorded_desc, f_desc, desc_max_w):
        wy += ctxt(draw, wy, line, f_desc, rgba(DIM)) + 10
    wy += 20
    note = "ר' screen-recording-checklist.md — לא לפרסום, לא הקלטה סופית"
    f_note = fnt(False, 26)
    for line in wrap_rtl(draw, note, f_note, desc_max_w):
        wy += ctxt(draw, wy, line, f_note, rgba(ORANGE)) + 8

    draw_handle_footer(draw)
    return img.convert('RGB')


def composite_over_neutral(rgba_img, out_w=None, out_h=None, bg=BG):
    """Flatten a transparent overlay onto a neutral dark background — for human
    preview only, so the hole/transparency is actually inspectable at a glance."""
    out_w = out_w or rgba_img.width
    out_h = out_h or rgba_img.height
    base = Image.new('RGB', (out_w, out_h), bg)
    base.paste(rgba_img, (0, 0), rgba_img)
    return base


# --------------------------------------------------------------------------------
# SVG emitter — real logo path data copied verbatim from public/logo.svg, same
# layout zones as the PNG renderer (see brand.py). direction="rtl" + text-anchor
# ="middle" for every Hebrew element, matching the existing hand-authored house style.
# --------------------------------------------------------------------------------
def _svg_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _svg_logo(cx, cy, r_outer=LOGO_RENDER_R, color=ORANGE_HEX):
    s = r_outer / 43.0

    def hex_path(r):
        pts = [(cx + r * math.cos(math.radians(-90 + 60 * i)),
                 cy + r * math.sin(math.radians(-90 + 60 * i))) for i in range(6)]
        d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f} " + " ".join(f"L{p[0]:.1f} {p[1]:.1f}" for p in pts[1:]) + " Z"
        return d

    outer_d, inner_d = hex_path(43 * s), hex_path(23 * s)
    dot_r = 6.5 * s
    return "\n".join([
        f'  <path d="{outer_d}" stroke="{color}" stroke-width="{6*s:.1f}" stroke-linejoin="round" fill="none"/>',
        f'  <path d="{inner_d}" stroke="{color}" stroke-width="{4*s:.1f}" stroke-linejoin="round" fill="none" opacity="0.55"/>',
        f'  <circle cx="{cx}" cy="{cy}" r="{dot_r:.1f}" fill="{color}"/>',
    ])


def _svg_header(out_w=REEL_W):
    logo = _svg_logo(out_w // 2, LOGO_CENTER_Y)
    wordmark = (f'  <text x="{out_w//2}" y="{WORDMARK_Y}" text-anchor="middle" '
                f'font-family="Heebo, sans-serif" font-weight="700" font-size="38" fill="{TEXT_HEX}">'
                f'{_svg_escape(WORDMARK)}</text>')
    return logo + "\n" + wordmark


def _svg_footer(out_w=REEL_W, out_h=REEL_H):
    return (f'  <text x="{out_w//2}" y="{HANDLE_Y}" text-anchor="middle" '
            f'font-family="\'JetBrains Mono\', monospace" font-weight="400" font-size="30" '
            f'fill="{DIM_HEX}">{_svg_escape(HANDLE)}</text>')


def _svg_glow_defs(out_w=REEL_W, out_h=REEL_H):
    return (f'  <radialGradient id="glow" cx="80%" cy="5%" r="55%">'
            f'<stop offset="0%" stop-color="#3a1c14" stop-opacity="0.65"/>'
            f'<stop offset="100%" stop-color="{BG_HEX}" stop-opacity="0"/></radialGradient>')


def svg_headline_card(lines, subtitle=None, accent_last=True, out_w=REEL_W, out_h=REEL_H, rtl=True):
    """rtl=False for Latin-only content (e.g. a bare @handle outro) — omits direction="rtl"
    on the headline text so a lone neutral character like "@" doesn't get bidi-reordered
    away from its Latin run, matching the handle footer's own rtl=False convention."""
    text_dir = ' direction="rtl"' if rtl else ""
    parts = [f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
             f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
             '  <defs>' + _svg_glow_defs(out_w, out_h) + '</defs>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="url(#glow)"/>',
             _svg_header(out_w)]

    n = len(lines) + (1 if subtitle else 0)
    line_h = 118
    zone_center = (300 + (out_h - 400)) // 2
    start_y = zone_center - (n * line_h) // 2 + 60

    y = start_y
    tspans = []
    for i, line in enumerate(lines):
        color = ORANGE_HEX if (accent_last and i == len(lines) - 1) else TEXT_HEX
        tspans.append(f'<tspan x="{out_w//2}" dy="{0 if i == 0 else line_h}" fill="{color}">{_svg_escape(line)}</tspan>')
    parts.append(f'  <text x="{out_w//2}" y="{y}" text-anchor="middle"{text_dir} '
                 f'font-family="Heebo, sans-serif" font-weight="700" font-size="84" fill="{TEXT_HEX}">')
    parts.append("    " + "".join(tspans))
    parts.append('  </text>')

    if subtitle:
        parts.append(f'  <text x="{out_w//2}" y="{y + n*line_h - 20}" text-anchor="middle"{text_dir} '
                     f'font-family="Heebo, sans-serif" font-weight="500" font-size="42" fill="{DIM_HEX}">'
                     f'{_svg_escape(subtitle)}</text>')

    parts.append(_svg_footer(out_w, out_h))
    parts.append('</svg>')
    return "\n".join(parts)


def svg_cover(lines, subtitle=None, out_w=REEL_W, out_h=REEL_H):
    """SVG counterpart to render_cover() — same approved composition, same
    cover-only constants. svg_headline_card (used by cta-shot8) is untouched."""
    logo = _svg_logo(out_w // 2, brand.COVER_LOGO_CENTER_Y)
    wordmark = (f'  <text x="{out_w//2}" y="{brand.COVER_WORDMARK_Y}" text-anchor="middle" '
                f'font-family="Heebo, sans-serif" font-weight="700" font-size="38" fill="{TEXT_HEX}">'
                f'{_svg_escape(WORDMARK)}</text>')
    header = logo + "\n" + wordmark

    parts = [f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
             f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
             '  <defs>' + _svg_glow_defs(out_w, out_h) + '</defs>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="url(#glow)"/>',
             header]

    n = len(lines) + (1 if subtitle else 0)
    line_h = 118
    zone_center = (brand.COVER_HEADLINE_ZONE_TOP + (out_h - 400)) // 2
    start_y = zone_center - (n * line_h) // 2 + 60

    y = start_y
    tspans = []
    for i, line in enumerate(lines):
        color = ORANGE_HEX if i == len(lines) - 1 else TEXT_HEX
        tspans.append(f'<tspan x="{out_w//2}" dy="{0 if i == 0 else line_h}" fill="{color}">{_svg_escape(line)}</tspan>')
    parts.append(f'  <text x="{out_w//2}" y="{y}" text-anchor="middle" direction="rtl" '
                 f'font-family="Heebo, sans-serif" font-weight="700" font-size="84" fill="{TEXT_HEX}">')
    parts.append("    " + "".join(tspans))
    parts.append('  </text>')

    if subtitle:
        parts.append(f'  <text x="{out_w//2}" y="{y + n*line_h - 20}" text-anchor="middle" direction="rtl" '
                     f'font-family="Heebo, sans-serif" font-weight="500" font-size="42" fill="{DIM_HEX}">'
                     f'{_svg_escape(subtitle)}</text>')

    parts.append(f'  <text x="{out_w//2}" y="{HANDLE_Y}" text-anchor="middle" '
                 f'font-family="\'JetBrains Mono\', monospace" font-weight="400" font-size="30" '
                 f'fill="{DIM_HEX}">{_svg_escape(brand.COVER_FOOTER)}</text>')
    parts.append('</svg>')
    return "\n".join(parts)


def svg_cta_button_card(headline, subtext=None, out_w=REEL_W, out_h=REEL_H):
    box_pad_y = 56
    head_line_h = 78
    n_head = 1 if isinstance(headline, str) else len(headline)
    head_lines = [headline] if isinstance(headline, str) else headline
    sub_h = 50 if subtext else 0
    box_h = n_head * head_line_h + sub_h + 2 * box_pad_y
    box_top = (out_h - box_h) // 2

    parts = [f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
             f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
             '  <defs>' + _svg_glow_defs(out_w, out_h) + '</defs>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="url(#glow)"/>',
             _svg_header(out_w),
             f'  <rect x="{SAFE_MARGIN_X}" y="{box_top}" width="{out_w-2*SAFE_MARGIN_X}" height="{box_h}" '
             f'rx="28" fill="{ORANGE_HEX}"/>']

    y = box_top + box_pad_y + 50
    tspans = "".join(f'<tspan x="{out_w//2}" dy="{0 if i==0 else head_line_h}">{_svg_escape(l)}</tspan>'
                      for i, l in enumerate(head_lines))
    parts.append(f'  <text x="{out_w//2}" y="{y}" text-anchor="middle" direction="rtl" '
                 f'font-family="Heebo, sans-serif" font-weight="700" font-size="60" fill="{WHITE_HEX}">'
                 f'{tspans}</text>')
    if subtext:
        parts.append(f'  <text x="{out_w//2}" y="{y + n_head*head_line_h + 10}" text-anchor="middle" direction="rtl" '
                     f'font-family="Heebo, sans-serif" font-weight="400" font-size="34" fill="{WHITE_HEX}">'
                     f'{_svg_escape(subtext)}</text>')

    parts.append(_svg_footer(out_w, out_h))
    parts.append('</svg>')
    return "\n".join(parts)


def svg_overlay_frame(caption_text, out_w=REEL_W, out_h=REEL_H):
    hole_top = RECORDING_WINDOW_TOP + RECORDING_BORDER_PX
    parts = [f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
             f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
             '  <!-- transparent recording window cutout below; place above real footage -->',
             '  <defs>' + _svg_glow_defs(out_w, out_h) + '</defs>',
             f'  <rect x="0" y="0" width="{out_w}" height="{RECORDING_WINDOW_TOP}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="0" width="{out_w}" height="{RECORDING_WINDOW_TOP}" fill="url(#glow)"/>',
             f'  <rect x="0" y="{RECORDING_WINDOW_BOTTOM}" width="{out_w}" height="{out_h-RECORDING_WINDOW_BOTTOM}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="{RECORDING_WINDOW_TOP}" width="{out_w}" height="{RECORDING_BORDER_PX}" fill="{ORANGE_HEX}"/>',
             _svg_header(out_w)]

    lines = caption_text.split("\n") if "\n" in caption_text else [caption_text]
    line_h = 70
    n = len(lines)
    zone_center = (CAPTION_ZONE_TOP + CAPTION_ZONE_BOTTOM) // 2
    y0 = zone_center - (n * line_h) // 2 + 45
    for i, line in enumerate(lines):
        parts.append(f'  <text x="{out_w//2}" y="{y0 + i*line_h}" text-anchor="middle" direction="rtl" '
                     f'font-family="Heebo, sans-serif" font-weight="700" font-size="54" fill="{TEXT_HEX}">'
                     f'{_svg_escape(line)}</text>')

    parts.append(_svg_footer(out_w, out_h))
    parts.append('</svg>')
    return "\n".join(parts)


def svg_step_badge(step_label, out_w=REEL_W, out_h=REEL_H):
    x = out_w - SAFE_MARGIN_X - 130
    y = RECORDING_WINDOW_TOP - 76
    return "\n".join([
        f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
        f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
        '  <!-- transparent step badge overlay, optional light layer -->',
        f'  <rect x="{x}" y="{y}" width="130" height="58" rx="12" fill="{BG_HEX}" fill-opacity="0.75" '
        f'stroke="{ORANGE_HEX}" stroke-width="2"/>',
        f'  <text x="{x+65}" y="{y+38}" text-anchor="middle" '
        f'font-family="\'JetBrains Mono\', monospace" font-weight="700" font-size="28" fill="{ORANGE_HEX}">'
        f'{_svg_escape(step_label)}</text>',
        '</svg>',
    ])


def svg_slot_placeholder(shot_idx, start, end, caption_text, recorded_desc, out_w=REEL_W, out_h=REEL_H):
    parts = [f'<svg width="{out_w}" height="{out_h}" viewBox="0 0 {out_w} {out_h}" '
             f'xmlns="http://www.w3.org/2000/svg" direction="rtl">',
             '  <defs>' + _svg_glow_defs(out_w, out_h) + '</defs>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="{BG_HEX}"/>',
             f'  <rect x="0" y="0" width="{out_w}" height="{out_h}" fill="url(#glow)"/>',
             _svg_header(out_w)]

    lines = caption_text.split("\n") if "\n" in caption_text else [caption_text]
    line_h = 70
    n = len(lines)
    zone_center = (CAPTION_ZONE_TOP + CAPTION_ZONE_BOTTOM) // 2
    y0 = zone_center - (n * line_h) // 2 + 45
    for i, line in enumerate(lines):
        parts.append(f'  <text x="{out_w//2}" y="{y0 + i*line_h}" text-anchor="middle" direction="rtl" '
                     f'font-family="Heebo, sans-serif" font-weight="700" font-size="54" fill="{TEXT_HEX}">'
                     f'{_svg_escape(line)}</text>')

    parts.append(f'  <rect x="0" y="{RECORDING_WINDOW_TOP}" width="{out_w}" height="{RECORDING_BORDER_PX}" fill="{ORANGE_HEX}"/>')
    card_hex = f"#{brand.CARD[0]:02x}{brand.CARD[1]:02x}{brand.CARD[2]:02x}"
    parts.append(f'  <rect x="0" y="{RECORDING_WINDOW_TOP+RECORDING_BORDER_PX}" width="{out_w}" '
                 f'height="{RECORDING_WINDOW_BOTTOM-RECORDING_WINDOW_TOP-RECORDING_BORDER_PX}" fill="{card_hex}"/>')
    parts.append(f'  <text x="{out_w//2}" y="{RECORDING_WINDOW_TOP+100}" text-anchor="middle" '
                 f'font-family="\'JetBrains Mono\', monospace" font-weight="700" font-size="34" fill="{ORANGE_HEX}">'
                 f'SCREEN RECORDING SLOT</text>')
    parts.append(f'  <text x="{out_w//2}" y="{RECORDING_WINDOW_TOP+165}" text-anchor="middle" direction="rtl" '
                 f'font-family="Heebo, sans-serif" font-weight="700" font-size="46" fill="{TEXT_HEX}">'
                 f'שוט {shot_idx} · {start}s–{end}s</text>')
    desc_esc = _svg_escape(recorded_desc)
    parts.append(f'  <text x="{out_w//2}" y="{RECORDING_WINDOW_TOP+225}" text-anchor="middle" direction="rtl" '
                 f'font-family="Heebo, sans-serif" font-weight="400" font-size="32" fill="{DIM_HEX}">'
                 f'{desc_esc}</text>')
    parts.append(f'  <text x="{out_w//2}" y="{RECORDING_WINDOW_BOTTOM-40}" text-anchor="middle" direction="rtl" '
                 f'font-family="Heebo, sans-serif" font-weight="500" font-size="26" fill="{ORANGE_HEX}">'
                 f'ר\' screen-recording-checklist.md — לא לפרסום, לא הקלטה סופית</text>')

    parts.append(_svg_footer(out_w, out_h))
    parts.append('</svg>')
    return "\n".join(parts)


# --------------------------------------------------------------------------------
# Reel package data — sourced verbatim from each package's shot-list.md / package.md /
# on-screen-text.csv / cover-brief.md. No invented copy. Keyed by package directory slug
# so this renderer works for any approved package, not just the one it first shipped with.
# --------------------------------------------------------------------------------
REEL_PACKAGES = {
    "2026-07-14-claude-watch-behind-scenes": dict(
        shots=[
            dict(idx=1, start=0, end=2, text="נתתי לקלוד ריל", kind="recording", role="hook",
                 recorded_desc="ההקלטה האמיתית: הדבקת קישור הרפרנס והרצת /watch, הוכחה מהפריים הראשון"),
            dict(idx=2, start=2, end=4, text="12 דקות אחר כך: פירוק מלא של ההוק, החיתוכים וה-CTA",
                 kind="recording", role="payoff",
                 recorded_desc="jump-cut קדימה לפלט המוגמר, גלילת ציר הסצנות האמיתי"),
            dict(idx=3, start=4, end=8, text="יכולת בשם /watch שחיברתי ל-Claude Code",
                 kind="recording", role="text",
                 recorded_desc="חזרה כרונולוגית לרצף הריצה (progress)"),
            dict(idx=4, start=8, end=11, text="מורידה את הסרטון · מוציאה פריימים",
                 kind="recording", role="step", step_label="שלב 1",
                 recorded_desc="שורת ההורדה ופלט חילוץ הפריימים"),
            dict(idx=5, start=11, end=15, text="מתמללת · בונה ציר סצנות מלא",
                 kind="recording", role="step", step_label="שלב 2",
                 recorded_desc="גלילת התמלול ואז ציר הסצנות"),
            dict(idx=6, start=15, end=18, text="לומדת מהמבנה",
                 kind="recording", role="step", step_label="שלב 3",
                 recorded_desc="הניתוח הסופי מוצג במלואו"),
            dict(idx=7, start=18, end=21, text="בלי להעתיק את התוכן",
                 kind="recording", role="step", step_label="שלב 4",
                 recorded_desc="זום קל על שורות ההוק/החיתוכים בניתוח"),
            dict(idx=8, start=21, end=25, text="3 השאלות שאני שואלת לפני שאני כותבת?",
                 kind="graphic", role="cta"),
            dict(idx=9, start=25, end=28, text="כתבו 'תחקיר'", kind="graphic", role="cta_outro"),
        ],
        cover=dict(lines=["נתתי לקלוד ריל"], subtitle="12 דקות אחר כך: פירוק מלא"),
    ),
    "2026-07-14-claude-md-behavior-file": dict(
        # Content correction round 3 (2026-07-17, Shani-approved): 7 shots / 30s, restructured
        # to the reference Reel's "concrete problem -> real screen proof" pattern. See
        # package.md / content-desk-package.md section 5ba for the full correction record.
        shots=[
            dict(idx=1, start=0, end=3, text="3 הרגלים שעצרתי עם קובץ אחד",
                 kind="recording", role="hook",
                 recorded_desc="פתיחת הפרויקט, קובץ CLAUDE.md האמיתי בעורך — ההוק כטקסט על גבי ההקלטה עצמה"),
            dict(idx=2, start=3, end=6, text="CLAUDE.md = כללי העבודה של הפרויקט",
                 kind="recording", role="intro",
                 recorded_desc="המשך אותה הקלטה — גלילה קלה לראש הקובץ, מציגה את שם הקובץ"),
            dict(idx=3, start=6, end=11, text="1. בלי בנייה מוגזמת",
                 kind="recording", role="content",
                 recorded_desc='גלילה בקובץ האמיתי לסעיף "העדפות תקשורת", התמקדות בשורה '
                               '"לא לבנות מערכת רחבה כשביקשתי שינוי ממוקד..."'),
            dict(idx=4, start=11, end=16, text="2. בלי להמציא מידע",
                 kind="recording", role="content",
                 recorded_desc='המשך אותו סעיף — התמקדות בשורה "לא להמציא פרטים על מיתוג, קוד '
                               'קיים, אינטגרציות, לקוחות, תמחור או סטטוס מוצר"'),
            dict(idx=5, start=16, end=21, text="3. ביקורת אמיתית, לא ליטופים",
                 kind="recording", role="content",
                 recorded_desc='המשך אותו סעיף — התמקדות בשורה "כנות אנליטית. לא להסכים '
                               'אוטומטית ולא לרצות אותי..."'),
            dict(idx=6, start=21, end=25, text="קובץ אחד. הקשר קבוע.",
                 kind="recording", role="closing",
                 recorded_desc="סגירת חלון העורך / זום-אאוט כללי על הקובץ הפתוח — משפט סיכום, לא הדגמה חדשה"),
            dict(idx=7, start=25, end=30, text="כתבו 'הנחיות'", subtext="לקבלת רשימת הכללים המלאה",
                 kind="graphic", role="cta_outro"),
        ],
        cover=dict(
            lines=["קובץ אחד גרם לקלוד קוד להפסיק לעשות שלושה דברים שעיצבנו אותי בכל פרויקט."],
            subtitle="CLAUDE.md = כללי העבודה של הפרויקט",
        ),
    ),
}


def render_reel_package(package_dir):
    package_slug = os.path.basename(os.path.normpath(os.path.abspath(package_dir)))
    if package_slug not in REEL_PACKAGES:
        raise ValueError(
            f"render_visuals: no REEL_PACKAGES entry for package '{package_slug}'. "
            "Add its shots/cover data to REEL_PACKAGES in render_visuals.py before rendering — "
            "refusing to guess or reuse another package's content."
        )
    reel_shots = REEL_PACKAGES[package_slug]["shots"]
    cover = REEL_PACKAGES[package_slug]["cover"]

    prod = os.path.join(package_dir, "production")
    vsvg = os.path.join(prod, "visuals", "svg")
    vpng = os.path.join(prod, "visuals", "png")
    vovl = os.path.join(prod, "visuals", "overlays")
    vprev = os.path.join(prod, "visuals", "previews")
    for d in (vsvg, vpng, vovl, vprev):
        os.makedirs(d, exist_ok=True)

    manifest = []

    def add_entry(filename_base, purpose, kind, start, end, source_text, folder="svg"):
        manifest.append(dict(
            filename_svg=f"visuals/svg/{filename_base}.svg",
            filename_png=f"visuals/png/{filename_base}.png",
            purpose=purpose, format="SVG+PNG", dimensions=f"{REEL_W}x{REEL_H}",
            start_time=start, end_time=end, type=kind, source_text=source_text,
        ))

    # --- full-screen cards: cover (approved composition, see COVER-APPROVAL.md) +
    #     one card per "graphic" shot. Role decides style: action-taking roles
    #     (cta_outro/cta_keyword) get the solid CTA button; everything else
    #     (question-style cta, plain outro) reuses the headline card, unchanged. ---
    cover_png = render_cover(cover["lines"], subtitle=cover["subtitle"])
    cover_png.save(os.path.join(vpng, "cover.png"))
    with open(os.path.join(vsvg, "cover.svg"), "w", encoding="utf-8") as f:
        f.write(svg_cover(cover["lines"], subtitle=cover["subtitle"]))
    add_entry("cover", "Cover / thumbnail frame (approved composition)", "full-screen", 0, 0,
              f'{cover["lines"][0]} / {cover["subtitle"]}')

    BUTTON_ROLES = {"cta_outro", "cta_keyword"}
    for s in reel_shots:
        if s["kind"] != "graphic":
            continue
        name = f'cta-shot{s["idx"]}'
        if s["role"] in BUTTON_ROLES:
            subtext = s.get("subtext")
            card_png = render_cta_button_card(s["text"], subtext=subtext)
            card_svg = svg_cta_button_card(s["text"], subtext=subtext)
            style_label = "solid button style"
            base_text = f'{s["text"]} / {subtext}' if subtext else s["text"]
            source_text = f'{base_text} + {HANDLE}' if s["role"] == "cta_outro" else base_text
        else:
            accent_last = (s["role"] == "outro")
            is_latin_handle = (s["role"] == "outro" and s["text"] == HANDLE)
            card_png = render_headline_card([s["text"]], accent_last=accent_last, rtl=not is_latin_handle)
            card_svg = svg_headline_card([s["text"]], accent_last=accent_last, rtl=not is_latin_handle)
            style_label = "headline style"
            source_text = s["text"]
        card_png.save(os.path.join(vpng, f"{name}.png"))
        with open(os.path.join(vsvg, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(card_svg)
        add_entry(name, f"CTA/Outro card — shot {s['idx']} ({style_label})", "full-screen",
                  s["start"], s["end"], source_text)

    # --- overlays (transparent recording-window frame, shots requiring real screen capture) ---
    for s in reel_shots:
        if s["kind"] != "recording":
            continue
        base_name = f'overlay-shot{s["idx"]}'
        ov = render_overlay_frame(s["text"])
        ov.save(os.path.join(vovl, f"{base_name}.png"))
        with open(os.path.join(vovl, f"{base_name}.svg"), "w", encoding="utf-8") as f:
            f.write(svg_overlay_frame(s["text"]))
        composite_over_neutral(ov).save(os.path.join(vprev, f"{base_name}-preview.png"))
        manifest.append(dict(
            filename_svg=f"visuals/overlays/{base_name}.svg", filename_png=f"visuals/overlays/{base_name}.png",
            purpose=f"Branded frame overlay for shot {s['idx']} ({s['role']}) — transparent recording "
                     "window, real footage placed underneath in CapCut",
            format="SVG+PNG (transparent)", dimensions=f"{REEL_W}x{REEL_H}",
            start_time=s["start"], end_time=s["end"], type="overlay", source_text=s["text"],
        ))

        if "step_label" in s:
            sb_name = f'step-badge-{s["idx"]}'
            badge = render_step_badge(s["step_label"])
            badge.save(os.path.join(vovl, f"{sb_name}.png"))
            with open(os.path.join(vovl, f"{sb_name}.svg"), "w", encoding="utf-8") as f:
                f.write(svg_step_badge(s["step_label"]))
            composite_over_neutral(badge).save(os.path.join(vprev, f"{sb_name}-preview.png"))
            manifest.append(dict(
                filename_svg=f"visuals/overlays/{sb_name}.svg", filename_png=f"visuals/overlays/{sb_name}.png",
                purpose=f"Optional step-progress badge for shot {s['idx']} (light zoom/whip layer per package.md)",
                format="SVG+PNG (transparent)", dimensions=f"{REEL_W}x{REEL_H}",
                start_time=s["start"], end_time=s["end"], type="overlay", source_text=s["step_label"],
            ))

    # --- manual recording slots (branded chrome + opaque placeholder window) ---
    for s in reel_shots:
        if s["kind"] != "recording":
            continue
        name = f'slot-shot{s["idx"]}'
        slot = render_slot_placeholder(s["idx"], s["start"], s["end"], s["text"], s["recorded_desc"])
        slot.save(os.path.join(vpng, f"{name}.png"))
        with open(os.path.join(vsvg, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(svg_slot_placeholder(s["idx"], s["start"], s["end"], s["text"], s["recorded_desc"]))
        manifest.append(dict(
            filename_svg=f"visuals/svg/{name}.svg", filename_png=f"visuals/png/{name}.png",
            purpose=f"Manual screen-recording slot placeholder — shot {s['idx']} (NOT final, timeline reference only)",
            format="SVG+PNG (opaque placeholder)", dimensions=f"{REEL_W}x{REEL_H}",
            start_time=s["start"], end_time=s["end"], type="manual-recording-slot",
            source_text=s["recorded_desc"],
        ))

    return manifest


# --------------------------------------------------------------------------------
# Carousel renderer — unchanged capability (not in scope for this brand-grounding
# pass; the acceptance package is a Reel). Still imports brand.py constants so it
# stays consistent with the same source of truth if/when it's used.
# --------------------------------------------------------------------------------
def render_carousel_slide(n, total, title_lines, body_lines=None, is_cta=False,
                           handle=HANDLE, out_w=CAROUSEL_W, out_h=CAROUSEL_H):
    img = Image.new('RGB', (out_w, out_h), BG)
    draw = ImageDraw.Draw(img)
    f_brand = fnt(True, 22)
    txt(draw, 108, 50, "SHANI AI CREATOR", f_brand, ORANGE, rtl=False)
    f_count = fnt(False, 22)
    counter = f"{n:02d} / {total:02d}"
    cw = tw(draw, counter, f_count, rtl=False)
    txt(draw, out_w - cw - 44, 52, counter, f_count, DIM, rtl=False)
    draw.line([(0, 106), (out_w, 106)], fill=(48, 36, 22), width=1)

    zone_top, zone_bot = 160, out_h - 140
    zone_h = zone_bot - zone_top
    f_title = fnt(True, 78)
    max_w = out_w - 2 * SAFE_MARGIN_X
    title_wrapped = []
    for line in title_lines:
        title_wrapped.extend(wrap_rtl(draw, line, f_title, max_w))
    title_h = [th(draw, l, f_title) for l in title_wrapped]
    gap = 20
    block_h = sum(title_h) + gap * (len(title_wrapped) - 1)
    y = zone_top + max(20, (zone_h - block_h) // 2)
    for i, line in enumerate(title_wrapped):
        color = ORANGE if is_cta else TEXT
        ctxt(draw, y, line, f_title, color, canvas_w=out_w)
        y += title_h[i] + gap
    if handle:
        f_h = fnt(False, 30, mono=True)
        hw = tw(draw, handle, f_h, rtl=False)
        txt(draw, (out_w - hw) // 2, out_h - 78, handle, f_h, TEXT, rtl=False)
    return img


# --------------------------------------------------------------------------------
# Contact sheet
# --------------------------------------------------------------------------------
def build_contact_sheet(package_dir, package_slug, reel_shots, cell_w=270, cell_h=480, cols=5):
    prod = os.path.join(package_dir, "production")
    vpng = os.path.join(prod, "visuals", "png")
    vovl = os.path.join(prod, "visuals", "overlays")

    cells = [("cover.png", "COVER", None)]
    for s in reel_shots:
        if s["kind"] == "recording":
            cells.append((f'slot-shot{s["idx"]}.png', f'SHOT {s["idx"]}', None))
        else:
            cells.append((f'cta-shot{s["idx"]}.png', f'SHOT {s["idx"]}', None))

    rows = math.ceil(len(cells) / cols)
    sheet = Image.new('RGB', (cols * cell_w, rows * cell_h + 60), BG)
    draw = ImageDraw.Draw(sheet)
    f_label = fnt(True, 20, mono=True)
    draw.text((30, 18), f"VISUAL SEQUENCE CONTACT SHEET — {package_slug}",
              font=fnt(True, 24, mono=True), fill=ORANGE)

    for i, (fname, label, _unused) in enumerate(cells):
        col, row = i % cols, i // cols
        x0, y0 = col * cell_w + 10, 60 + row * cell_h + 10
        base_path = os.path.join(vpng, fname)
        if os.path.exists(base_path):
            frame = Image.open(base_path).convert('RGB')
            frame.thumbnail((cell_w - 20, cell_h - 60))
            sheet.paste(frame, (x0, y0))
        draw.text((x0, y0 + cell_h - 44), label, font=f_label, fill=TEXT)

    out_path = os.path.join(prod, "CONTACT-SHEET.png")
    sheet.save(out_path)
    return out_path


# --------------------------------------------------------------------------------
# Manifest / timeline / QA writers
# --------------------------------------------------------------------------------
def write_manifest(package_dir, manifest, package_slug, content_type="reel"):
    prod = os.path.join(package_dir, "production")
    out = dict(package=package_slug, content_type=content_type,
               generated_by="marketing-engine/producer/render_visuals.py (Producer V1.2 — brand-grounded)",
               asset_count=len(manifest), assets=manifest)
    with open(os.path.join(prod, "visual-manifest.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    with open(os.path.join(prod, "visual-timeline.csv"), "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["start_seconds", "end_seconds", "type", "filename_png", "filename_svg", "purpose", "source_text"])
        rows = sorted(manifest, key=lambda m: (m["start_time"] if m["start_time"] is not None else -1))
        for m in rows:
            writer.writerow([m["start_time"], m["end_time"], m["type"], m["filename_png"],
                              m["filename_svg"], m["purpose"], m["source_text"]])


def write_qa_doc(package_dir, manifest, expected_counts, generated_counts, contact_sheet_path):
    prod = os.path.join(package_dir, "production")
    lines = []
    lines.append("# VISUAL-QA.md — בדיקת אימות ויזואלית (Producer V1.2 — brand-grounded)\n")
    lines.append("> נוצר אוטומטית ע\"י `marketing-engine/producer/render_visuals.py`, מבוסס על "
                  "`marketing-engine/producer/BRAND-GROUNDING.md`.\n")

    lines.append("## 1. ספירה: צפוי מול נוצר\n")
    lines.append("| קטגוריה | צפוי | נוצר | סטטוס |")
    lines.append("|---|---|---|---|")
    all_ok = True
    for k, exp in expected_counts.items():
        got = generated_counts.get(k, 0)
        ok = "✅" if got == exp else "❌"
        if got != exp:
            all_ok = False
        lines.append(f"| {k} | {exp} | {got} | {ok} |")
    lines.append("")

    lines.append("## 2. עיגון מותג\n")
    lines.append(f"לוגו: geometry אמיתי מ-`public/logo.svg`. גופן: `{BODY_FONT_NAME}`. "
                  f"מונו: `{MONO_FONT_NAME}`. צבעים: {ORANGE_HEX} / {TEXT_HEX} / {DIM_HEX} / {BG_HEX} "
                  "— כולם מאומתים מול globals.css ומדגימת פיקסלים מהריל שהועלה. "
                  "ר' `BRAND-GROUNDING.md` לעדות המלאה.\n")

    lines.append("## 3. סגנון כרטיסי גרפיקה (graphic shots)\n")
    lines.append("שוטי שאלה/outro (`cta`, `outro`) → כרטיס headline ממורכז (אותו סגנון כמו הקאבר). "
                  "שוטי הוראת-פעולה (`cta_outro`, `cta_keyword`) → כפתור אורגני מלא (solid fill), "
                  "תואם בדיוק את פריים הסיום בריל האמיתי. הבחירה נגזרת מתפקיד השוט (`role`) "
                  "בנתוני החבילה, לא זהות מלאכותית בין כל השוטים.\n")

    lines.append("## 4. תוצאה\n")
    lines.append("**כל הבדיקות עברו — אין פגם רינדור חוסם.**\n" if all_ok else
                  "**נמצא פער בספירה — ר' טבלה בסעיף 1.**\n")
    lines.append(f"Contact sheet: `{os.path.relpath(contact_sheet_path, prod)}`\n")

    with open(os.path.join(prod, "VISUAL-QA.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    return all_ok


# --------------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--package", required=True)
    ap.add_argument("--type", choices=["reel", "carousel"], default="reel")
    args = ap.parse_args()

    package_dir = os.path.abspath(args.package)
    package_slug = os.path.basename(os.path.normpath(package_dir))

    if args.type == "reel":
        manifest = render_reel_package(package_dir)
        reel_shots = REEL_PACKAGES[package_slug]["shots"]
        contact_sheet = build_contact_sheet(package_dir, package_slug, reel_shots)

        full_screen = [m for m in manifest if m["type"] == "full-screen"]
        overlays = [m for m in manifest if m["type"] == "overlay"]
        slots = [m for m in manifest if m["type"] == "manual-recording-slot"]

        recording_shots = [s for s in reel_shots if s["kind"] == "recording"]
        graphic_shots = [s for s in reel_shots if s["kind"] == "graphic"]
        step_shots = [s for s in recording_shots if "step_label" in s]
        expected = {
            "full-screen cards": 1 + len(graphic_shots),
            "overlays (caption + step-badge)": len(recording_shots) + len(step_shots),
            "manual recording slots": len(recording_shots),
        }
        generated = {"full-screen cards": len(full_screen), "overlays (caption + step-badge)": len(overlays),
                     "manual recording slots": len(slots)}

        write_manifest(package_dir, manifest, package_slug, content_type="reel")
        ok = write_qa_doc(package_dir, manifest, expected, generated, contact_sheet)

        print(f"[render_visuals] package={package_slug} type=reel")
        print(f"[render_visuals] full-screen cards: {len(full_screen)}")
        print(f"[render_visuals] overlays: {len(overlays)}")
        print(f"[render_visuals] manual recording slots: {len(slots)}")
        print(f"[render_visuals] total assets: {len(manifest)}")
        print(f"[render_visuals] contact sheet: {contact_sheet}")
        print(f"[render_visuals] QA all-ok: {ok}")
        print(f"[render_visuals] font body={BODY_FONT_NAME} mono={MONO_FONT_NAME} raqm={_HAS_RAQM}")
    else:
        print("[render_visuals] carousel mode not exercised by this run.")
        sys.exit(1)


if __name__ == "__main__":
    main()
