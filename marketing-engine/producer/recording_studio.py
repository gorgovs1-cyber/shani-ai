#!/usr/bin/env python3
"""
recording_studio.py — Production Recording Studio generator.

Reads the REAL, already-produced files inside a package's production/ folder
(visual-manifest.json, on-screen-text.csv, voiceover.txt, shot-list.md,
screen-recording-checklist.md, MANUAL-ACTIONS.md, visuals/) and writes one
self-contained, offline HTML file: production/RECORDING-STUDIO.html.

Nothing is invented: every shot's on-screen text, voiceover line, and
recording instruction is copied verbatim from the files above (or explicitly
left blank if a file doesn't have that field). No content is rewritten, no
screenshots are fabricated. Does not touch package.md, content-desk-package.md,
review.md, or anything produced by Researcher/Creator/Reviewer/Content Desk.

The output HTML embeds the real finished PNGs (cover + CTA/Outro cards) and
the real overlay preview PNGs as base64 data URIs, plus the real Heebo/
JetBrains Mono brand fonts (also base64) — so it opens correctly by double-
click, fully offline, with no CDN and no server, and keeps working even if
someone copies just this one file out of the folder.

Usage:
    python3 recording_studio.py --package "marketing-engine/packages/<slug>"

Reused, not rebuilt: brand colors/fonts come from brand.py (this directory) —
the same single source of truth render_visuals.py uses. No new brand values
are invented here.
"""
import argparse
import base64
import csv
import json
import mimetypes
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import brand  # noqa: E402  (same directory — single source of truth for colors/fonts)


def read_text(path):
    if not path or not os.path.exists(path):
        return ''
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


def b64_data_uri(path):
    if not path or not os.path.exists(path):
        return None
    mime, _ = mimetypes.guess_type(path)
    mime = mime or 'application/octet-stream'
    with open(path, 'rb') as f:
        data = base64.b64encode(f.read()).decode('ascii')
    return f'data:{mime};base64,{data}'


def parse_ts(s):
    """'00:03.5' or '00:35' -> seconds (float). Minutes:seconds, seconds may have a decimal."""
    s = s.strip()
    parts = s.split(':')
    if len(parts) == 2:
        mm, ss = parts
        return int(mm) * 60 + float(ss)
    return float(s)


def parse_on_screen_text_csv(path):
    rows = []
    if not path or not os.path.exists(path):
        return rows
    with open(path, 'r', encoding='utf-8-sig', newline='') as f:
        for row in csv.DictReader(f):
            try:
                rows.append({
                    'index': int(row['index']),
                    'start': float(row['start_seconds']),
                    'end': float(row['end_seconds']),
                    'text': row['text'],
                })
            except (KeyError, ValueError):
                continue
    return rows


VOICEOVER_LINE_RE = re.compile(r'^\[([0-9:.]+)-([0-9:.]+)\]\s*(.*)$')


def parse_voiceover_txt(path):
    """Returns a list of {start, end, text, has_narration}. A line whose text
    is wrapped in parentheses (e.g. "(בלי קריינות — רק הנדל על המסך)") is a
    note that there is NO spoken narration for that window, not a line to
    read aloud — flagged has_narration=False, exactly as the file states."""
    out = []
    raw = read_text(path)
    for line in raw.splitlines():
        m = VOICEOVER_LINE_RE.match(line.strip())
        if not m:
            continue
        start_raw, end_raw, text = m.groups()
        try:
            start, end = parse_ts(start_raw), parse_ts(end_raw)
        except ValueError:
            continue
        text = text.strip()
        has_narration = not (text.startswith('(') and text.endswith(')'))
        out.append({
            'start': start, 'end': end,
            'text': text if has_narration else text.strip('()').strip(),
            'has_narration': has_narration,
        })
    return out


SHOT_NUM_RE = re.compile(r'shot-?(\d+)', re.IGNORECASE)


def shot_number_from_filename(filename):
    m = SHOT_NUM_RE.search(filename or '')
    return int(m.group(1)) if m else None


def find_voiceover_for(voiceover_rows, start, end, tol=0.05):
    for row in voiceover_rows:
        if abs(row['start'] - start) <= tol and abs(row['end'] - end) <= tol:
            return row
    return None


def build_shots(pkg_dir):
    prod_dir = os.path.join(pkg_dir, 'production')
    manifest_path = os.path.join(prod_dir, 'visual-manifest.json')
    if not os.path.exists(manifest_path):
        raise SystemExit(f'ERROR: no visual-manifest.json in {prod_dir} — run Producer first, this tool never invents visuals.')

    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    assets = manifest.get('assets', [])

    onscreen_rows = parse_on_screen_text_csv(os.path.join(prod_dir, 'on-screen-text.csv'))
    voiceover_rows = parse_voiceover_txt(os.path.join(prod_dir, 'voiceover.txt'))

    # Group manifest assets by shot number extracted from filename. Assets
    # with no shot number in the filename (the cover / thumbnail) form their
    # own group under the key None.
    groups = {}
    for a in assets:
        num = shot_number_from_filename(a.get('filename_png', ''))
        groups.setdefault(num, []).append(a)

    shots = []

    # Cover / thumbnail first, if present — always a ready visual, not part
    # of the numbered 1..N shot timeline (start=end=0 in the real manifest).
    cover_group = groups.pop(None, [])
    for a in cover_group:
        png_path = os.path.join(prod_dir, a['filename_png'])
        shots.append({
            'id': 'cover',
            'index': 0,
            'label': 'קאבר (Thumbnail) — לא חלק מציר 35 השניות',
            'kind': 'ready',
            'start': a.get('start_time', 0),
            'end': a.get('end_time', 0),
            'duration': 0,
            'onScreenText': a.get('source_text', ''),
            'voiceover': None,
            'voiceoverStatus': 'none',
            'recordingInstruction': None,
            'readyImage': b64_data_uri(png_path),
            'previewImage': None,
            'purpose': a.get('purpose', ''),
        })

    for num in sorted(groups.keys()):
        group = groups[num]
        full_screen = next((a for a in group if a.get('type') == 'full-screen'), None)
        overlay = next((a for a in group if a.get('type') == 'overlay'), None)
        slot = next((a for a in group if a.get('type') == 'manual-recording-slot'), None)

        primary = full_screen or overlay or slot
        start = primary.get('start_time', 0)
        end = primary.get('end_time', 0)
        duration = round(end - start, 3)

        vo = find_voiceover_for(voiceover_rows, start, end)
        if vo is None:
            voiceover_text, voiceover_status = None, 'none'
        elif vo['has_narration']:
            voiceover_text, voiceover_status = vo['text'], 'present'
        else:
            voiceover_text, voiceover_status = vo['text'], 'optional'

        onscreen = next((r['text'] for r in onscreen_rows if abs(r['start'] - start) <= 0.05 and abs(r['end'] - end) <= 0.05), None)
        if onscreen is None:
            onscreen = (full_screen or overlay or {}).get('source_text', '')

        if full_screen is not None:
            kind = 'ready'
            ready_png = os.path.join(prod_dir, full_screen['filename_png'])
            shots.append({
                'id': f'shot{num}', 'index': num, 'label': f'שוט {num}', 'kind': kind,
                'start': start, 'end': end, 'duration': duration,
                'onScreenText': onscreen, 'voiceover': voiceover_text, 'voiceoverStatus': voiceover_status,
                'recordingInstruction': None,
                'readyImage': b64_data_uri(ready_png), 'previewImage': None,
                'purpose': full_screen.get('purpose', ''),
            })
        else:
            # Recording-required shot: overlay + manual-recording-slot pair.
            # Prefer the flattened human-viewing preview (overlay composited
            # on a neutral background) — never the opaque placeholder slot
            # asset as if it were a finished shot.
            preview_name = None
            if overlay is not None:
                base = os.path.splitext(os.path.basename(overlay['filename_png']))[0]
                candidate = os.path.join(prod_dir, 'visuals', 'previews', f'{base}-preview.png')
                preview_name = candidate if os.path.exists(candidate) else os.path.join(prod_dir, overlay['filename_png'])
            instruction = (slot or {}).get('source_text', '')
            shots.append({
                'id': f'shot{num}', 'index': num, 'label': f'שוט {num}', 'kind': 'recording',
                'start': start, 'end': end, 'duration': duration,
                'onScreenText': onscreen, 'voiceover': voiceover_text, 'voiceoverStatus': voiceover_status,
                'recordingInstruction': instruction,
                'readyImage': None, 'previewImage': b64_data_uri(preview_name) if preview_name else None,
                'purpose': (overlay or slot or {}).get('purpose', ''),
            })

    total_duration = max((s['end'] for s in shots), default=0)
    return shots, total_duration


HTML_TEMPLATE = r"""<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__ — Shani AI Recording Studio</title>
<style>
@font-face { font-family: 'Heebo'; src: url(__HEEBO_REGULAR__) format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Heebo'; src: url(__HEEBO_BOLD__) format('truetype'); font-weight: 700; font-display: swap; }
@font-face { font-family: 'JetBrains Mono'; src: url(__MONO_REGULAR__) format('truetype'); font-weight: 400; font-display: swap; }

:root {
  --bg: __BG__;
  --card: __CARD__;
  --text: __TEXT__;
  --dim: __DIM__;
  --orange: __ORANGE__;
  --ready: #3ea86b;
  --recording: __ORANGE__;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Heebo', 'Segoe UI', sans-serif;
  min-height: 100vh;
  direction: rtl;
}
.mono { font-family: 'JetBrains Mono', monospace; direction: ltr; unicode-bidi: plaintext; }

header {
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(244,237,225,0.12);
}
header h1 { font-size: 17px; margin: 0; font-weight: 700; }
header .sub { color: var(--dim); font-size: 12px; margin-top: 2px; }
header .brand-footer { color: var(--dim); font-size: 11px; letter-spacing: 0.06em; }

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 20px 60px;
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
}
@media (max-width: 860px) { .wrap { grid-template-columns: 1fr; } }

.preview-col { display: flex; flex-direction: column; gap: 14px; }
.stage {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: var(--card);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(244,237,225,0.14);
  display: flex; align-items: center; justify-content: center;
}
.stage img { width: 100%; height: 100%; object-fit: contain; display: block; }
.stage .empty { color: var(--dim); font-size: 13px; padding: 20px; text-align: center; }
.badge {
  position: absolute; top: 12px; inset-inline-start: 12px;
  padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700;
  backdrop-filter: blur(4px);
}
.badge.ready { background: rgba(62,168,107,0.9); color: #08150d; }
.badge.recording { background: rgba(242,98,46,0.92); color: #1a0a04; }
.badge.voiceover-optional {
  position: absolute; top: 12px; inset-inline-end: 12px;
  background: rgba(244,237,225,0.16); color: var(--text);
  padding: 6px 12px; border-radius: 999px; font-size: 11px; font-weight: 700;
}

.controls-row { display: flex; gap: 8px; }
button {
  font-family: inherit; cursor: pointer; border: 1px solid rgba(244,237,225,0.2);
  background: var(--card); color: var(--text); border-radius: 10px;
  padding: 10px 14px; font-size: 13px; font-weight: 600; transition: background .15s;
}
button:hover { background: rgba(244,237,225,0.08); }
button:disabled { opacity: 0.35; cursor: not-allowed; }
button.primary { background: var(--orange); color: #1a0a04; border-color: transparent; }
button.primary:hover { filter: brightness(1.08); }
button.completed-btn.is-done { background: var(--ready); color: #08150d; border-color: transparent; }
button.wide { flex: 1; }

.progress-shell { background: var(--card); border-radius: 10px; overflow: hidden; height: 8px; border: 1px solid rgba(244,237,225,0.12); }
.progress-fill { height: 100%; background: var(--orange); width: 0%; transition: width .2s; }
.progress-label { font-size: 12px; color: var(--dim); display: flex; justify-content: space-between; }

.shot-nav { display: flex; flex-wrap: wrap; gap: 6px; }
.shot-dot {
  width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; cursor: pointer; background: var(--card);
  border: 1px solid rgba(244,237,225,0.16); color: var(--dim);
}
.shot-dot.current { border-color: var(--orange); color: var(--text); }
.shot-dot.done { background: var(--ready); color: #08150d; border-color: transparent; }

.info-col { display: flex; flex-direction: column; gap: 16px; }
.panel { background: var(--card); border: 1px solid rgba(244,237,225,0.14); border-radius: 14px; padding: 18px 20px; }
.panel h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--dim); margin: 0 0 10px; }
.panel .big { font-size: 20px; font-weight: 700; line-height: 1.5; }
.panel .meta { display: flex; gap: 18px; margin-top: 10px; font-size: 13px; color: var(--dim); }
.panel .meta b { color: var(--text); }
.instruction { border-inline-start: 3px solid var(--orange); padding-inline-start: 12px; margin-top: 6px; line-height: 1.6; }
.note { color: var(--dim); font-size: 12px; margin-top: 8px; }
details { margin-top: 4px; }
details summary { cursor: pointer; color: var(--dim); font-size: 12px; padding: 4px 0; }
details .content { white-space: pre-wrap; font-size: 12px; line-height: 1.7; color: var(--text); opacity: 0.9; max-height: 260px; overflow: auto; margin-top: 6px; }

/* Guided Recording mode */
#guided {
  display: none;
  position: fixed; inset: 0; background: #05040300; z-index: 999;
  background: #050403; color: #fdf6ee;
  flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 40px;
}
#guided.active { display: flex; }
#guided .countdown { font-size: 120px; font-weight: 700; color: var(--orange); }
#guided .g-shotlabel { color: var(--dim); font-size: 16px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 18px; }
#guided .g-script { font-size: 44px; font-weight: 700; max-width: 900px; line-height: 1.4; }
#guided .g-onscreen { font-size: 18px; color: var(--dim); margin-top: 18px; }
#guided .g-instruction { font-size: 16px; color: var(--orange); margin-top: 22px; max-width: 760px; }
#guided .g-timer { font-size: 54px; margin-top: 30px; }
#guided .g-hint { position: absolute; bottom: 24px; color: var(--dim); font-size: 12px; }
#guided .g-exit { position: absolute; top: 20px; inset-inline-end: 20px; }
</style>
</head>
<body>

<header>
  <div>
    <h1>Shani AI — Recording Studio</h1>
    <div class="sub">__TITLE__</div>
  </div>
  <div class="brand-footer">SHANI-AI.COM</div>
</header>

<div class="wrap">
  <div class="preview-col">
    <div class="stage" id="stage">
      <img id="stageImg" alt="" />
      <div class="empty" id="stageEmpty" style="display:none">אין תצוגה זמינה לשוט הזה</div>
      <div class="badge" id="kindBadge"></div>
      <div class="badge voiceover-optional" id="voBadge" style="display:none">קריינות אופציונלית</div>
    </div>

    <div class="progress-label">
      <span id="progressText">0 / 0 הושלמו</span>
      <span id="totalDuration"></span>
    </div>
    <div class="progress-shell"><div class="progress-fill" id="progressFill"></div></div>

    <div class="controls-row">
      <button id="prevBtn" class="wide">◀ הקודם</button>
      <button id="nextBtn" class="wide primary">הבא ▶</button>
    </div>
    <div class="controls-row">
      <button id="completeBtn" class="completed-btn wide">✓ סמן כהושלם</button>
    </div>
    <div class="controls-row">
      <button id="guidedBtn" class="wide">🎬 מצב הקלטה מודרך</button>
      <button id="fullscreenBtn">⛶ מסך מלא</button>
    </div>
    <div class="controls-row">
      <button id="restartBtn" class="wide">↺ איפוס התקדמות</button>
      <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--dim);white-space:nowrap;">
        <input type="checkbox" id="autoplayToggle"> נגן אוטומטית שוטים מוכנים
      </label>
    </div>

    <div class="shot-nav" id="shotNav"></div>
  </div>

  <div class="info-col">
    <div class="panel">
      <h2 id="shotHeader">שוט</h2>
      <div class="meta">
        <span>התחלה: <b class="mono" id="startTime"></b></span>
        <span>סיום: <b class="mono" id="endTime"></b></span>
        <span>משך: <b class="mono" id="durTime"></b></span>
      </div>
    </div>

    <div class="panel">
      <h2>טקסט קריינות / תסריט</h2>
      <div class="big" id="voiceoverText">—</div>
      <div class="note" id="voiceoverNote"></div>
    </div>

    <div class="panel">
      <h2>טקסט על המסך</h2>
      <div id="onscreenText" style="font-size:16px;line-height:1.6;">—</div>
    </div>

    <div class="panel" id="instructionPanel" style="display:none">
      <h2>מה להקליט בפועל</h2>
      <div class="instruction" id="instructionText"></div>
    </div>

    <div class="panel">
      <details>
        <summary>Checklist הקלטת מסך המלא (screen-recording-checklist.md)</summary>
        <div class="content">__CHECKLIST_TEXT__</div>
      </details>
      <details>
        <summary>מה נשאר לשני (MANUAL-ACTIONS.md)</summary>
        <div class="content">__MANUAL_ACTIONS_TEXT__</div>
      </details>
    </div>
  </div>
</div>

<div id="guided">
  <button class="g-exit" id="guidedExit">✕ יציאה (Esc)</button>
  <div class="g-shotlabel" id="gShotLabel"></div>
  <div class="countdown" id="gCountdown" style="display:none"></div>
  <div id="gBody" style="display:none">
    <div class="g-script" id="gScript"></div>
    <div class="g-onscreen" id="gOnscreen"></div>
    <div class="g-instruction" id="gInstruction"></div>
    <div class="g-timer mono" id="gTimer">00:00 / 00:00</div>
  </div>
  <div class="g-hint">→ הבא · ← הקודם · Space התחלה/השהיה · C הושלם · F מסך מלא · Esc יציאה</div>
</div>

<script id="studio-data" type="application/json">__SHOT_DATA_JSON__</script>
<script>
(function () {
  var DATA = JSON.parse(document.getElementById('studio-data').textContent);
  var shots = DATA.shots;
  var pkg = DATA.package;
  var storageKey = 'shani-recording-studio:' + pkg + ':completed';
  var idxKey = 'shani-recording-studio:' + pkg + ':index';

  function loadCompleted() {
    try {
      var raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function saveCompleted(arr) {
    try { localStorage.setItem(storageKey, JSON.stringify(arr)); } catch (e) { /* ignore, e.g. file:// restrictions */ }
  }
  function loadIndex() {
    try {
      var v = parseInt(localStorage.getItem(idxKey), 10);
      return (isFinite(v) && v >= 0 && v < shots.length) ? v : 0;
    } catch (e) { return 0; }
  }
  function saveIndex(i) {
    try { localStorage.setItem(idxKey, String(i)); } catch (e) { /* ignore */ }
  }

  var completed = loadCompleted();
  var current = loadIndex();

  function fmtTime(sec) {
    sec = Math.max(0, sec || 0);
    var m = Math.floor(sec / 60);
    var s = (sec - m * 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s.toFixed(1).replace(/\.0$/, '');
  }

  function buildShotNav() {
    var nav = document.getElementById('shotNav');
    nav.innerHTML = '';
    shots.forEach(function (s, i) {
      var dot = document.createElement('div');
      dot.className = 'shot-dot' + (i === current ? ' current' : '') + (completed.indexOf(s.id) !== -1 ? ' done' : '');
      dot.textContent = s.index;
      dot.title = s.label;
      dot.addEventListener('click', function () { goTo(i); });
      nav.appendChild(dot);
    });
  }

  function render() {
    var s = shots[current];
    document.getElementById('shotHeader').textContent = s.label + '  (' + (current + 1) + ' / ' + shots.length + ')';
    document.getElementById('startTime').textContent = fmtTime(s.start);
    document.getElementById('endTime').textContent = fmtTime(s.end);
    document.getElementById('durTime').textContent = fmtTime(s.duration);

    var img = document.getElementById('stageImg');
    var empty = document.getElementById('stageEmpty');
    var src = s.kind === 'ready' ? s.readyImage : s.previewImage;
    if (src) { img.src = src; img.style.display = 'block'; empty.style.display = 'none'; }
    else { img.style.display = 'none'; empty.style.display = 'flex'; }

    var badge = document.getElementById('kindBadge');
    if (s.kind === 'ready') { badge.textContent = 'READY VISUAL — נכס סופי מוכן'; badge.className = 'badge ready'; }
    else { badge.textContent = 'REAL SCREEN RECORDING REQUIRED — נדרשת הקלטה אמיתית'; badge.className = 'badge recording'; }

    var voBadge = document.getElementById('voBadge');
    voBadge.style.display = s.voiceoverStatus === 'optional' ? 'block' : 'none';

    var voText = document.getElementById('voiceoverText');
    var voNote = document.getElementById('voiceoverNote');
    if (s.voiceoverStatus === 'present') { voText.textContent = '"' + s.voiceover + '"'; voNote.textContent = ''; }
    else if (s.voiceoverStatus === 'optional') { voText.textContent = '— אין קריינות מדוברת בשוט זה —'; voNote.textContent = 'הערה מקורית: ' + s.voiceover; }
    else { voText.textContent = '—'; voNote.textContent = 'אין שורת קריינות רשומה לשוט זה.'; }

    document.getElementById('onscreenText').textContent = s.onScreenText || '—';

    var instPanel = document.getElementById('instructionPanel');
    if (s.kind === 'recording' && s.recordingInstruction) {
      instPanel.style.display = 'block';
      document.getElementById('instructionText').textContent = s.recordingInstruction;
    } else {
      instPanel.style.display = 'none';
    }

    document.getElementById('prevBtn').disabled = current === 0;
    document.getElementById('nextBtn').disabled = current === shots.length - 1;

    var doneCount = completed.length;
    document.getElementById('progressText').textContent = doneCount + ' / ' + shots.length + ' הושלמו';
    document.getElementById('progressFill').style.width = Math.round(100 * doneCount / shots.length) + '%';
    document.getElementById('totalDuration').textContent = 'סה"כ ' + fmtTime(DATA.totalDuration);

    var completeBtn = document.getElementById('completeBtn');
    var isDone = completed.indexOf(s.id) !== -1;
    completeBtn.textContent = isDone ? '✓ הושלם' : '✓ סמן כהושלם';
    completeBtn.classList.toggle('is-done', isDone);

    buildShotNav();
    renderGuided();
  }

  function goTo(i) {
    if (i < 0 || i >= shots.length) return;
    current = i;
    saveIndex(current);
    stopTimer();
    render();
  }

  function toggleComplete() {
    var s = shots[current];
    var i = completed.indexOf(s.id);
    if (i === -1) completed.push(s.id); else completed.splice(i, 1);
    saveCompleted(completed);
    render();
    if (autoplayOn() && completed.indexOf(s.id) !== -1 && s.kind === 'ready' && current < shots.length - 1) {
      setTimeout(function () { goTo(current + 1); }, Math.max(600, (s.duration || 1.5) * 1000));
    }
  }

  function autoplayOn() { return document.getElementById('autoplayToggle').checked; }

  document.getElementById('prevBtn').addEventListener('click', function () { goTo(current - 1); });
  document.getElementById('nextBtn').addEventListener('click', function () { goTo(current + 1); });
  document.getElementById('completeBtn').addEventListener('click', toggleComplete);
  document.getElementById('restartBtn').addEventListener('click', function () {
    if (!confirm('לאפס את כל ההתקדמות שסומנה כהושלמה?')) return;
    completed = []; saveCompleted(completed); goTo(0);
  });
  document.getElementById('fullscreenBtn').addEventListener('click', function () {
    var el = document.getElementById('stage');
    if (el.requestFullscreen) el.requestFullscreen();
  });

  // ---- Guided Recording mode ----
  var guidedEl = document.getElementById('guided');
  var guidedActive = false;
  var timerInterval = null, timerElapsed = 0, timerRunning = false;

  function enterGuided() {
    guidedActive = true;
    guidedEl.classList.add('active');
    runCountdown();
  }
  function exitGuided() {
    guidedActive = false;
    guidedEl.classList.remove('active');
    stopTimer();
  }
  document.getElementById('guidedBtn').addEventListener('click', enterGuided);
  document.getElementById('guidedExit').addEventListener('click', exitGuided);

  function runCountdown() {
    stopTimer();
    var cd = document.getElementById('gCountdown');
    var body = document.getElementById('gBody');
    body.style.display = 'none';
    cd.style.display = 'block';
    var n = 3;
    cd.textContent = n;
    var iv = setInterval(function () {
      n -= 1;
      if (n <= 0) {
        clearInterval(iv);
        cd.style.display = 'none';
        body.style.display = 'block';
        renderGuided();
      } else {
        cd.textContent = n;
      }
    }, 1000);
  }

  function renderGuided() {
    if (!guidedActive) return;
    var s = shots[current];
    document.getElementById('gShotLabel').textContent = s.label + ' — ' + (s.kind === 'ready' ? 'READY VISUAL' : 'REAL SCREEN RECORDING REQUIRED');
    document.getElementById('gScript').textContent = s.voiceoverStatus === 'present' ? ('"' + s.voiceover + '"') : (s.voiceoverStatus === 'optional' ? 'אין קריינות מדוברת בשוט זה' : '—');
    document.getElementById('gOnscreen').textContent = s.onScreenText ? ('על המסך: ' + s.onScreenText) : '';
    document.getElementById('gInstruction').textContent = s.recordingInstruction ? ('להקליט: ' + s.recordingInstruction) : '';
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    var s = shots[current];
    document.getElementById('gTimer').textContent = fmtTime(timerElapsed) + ' / ' + fmtTime(s.duration || 0);
  }
  function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    timerInterval = setInterval(function () {
      timerElapsed += 0.1;
      updateTimerDisplay();
    }, 100);
  }
  function pauseTimer() { timerRunning = false; if (timerInterval) clearInterval(timerInterval); }
  function stopTimer() { pauseTimer(); timerElapsed = 0; }

  function guidedNext() { stopTimer(); goTo(current + 1); if (guidedActive) runCountdown(); }
  function guidedPrev() { stopTimer(); goTo(current - 1); if (guidedActive) runCountdown(); }

  // ---- Keyboard controls (active in both modes for nav/fullscreen/complete;
  //      Space timer control is most meaningful inside Guided Recording) ----
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); guidedActive ? guidedNext() : goTo(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); guidedActive ? guidedPrev() : goTo(current - 1); }
    else if (e.code === 'Space') { e.preventDefault(); if (timerRunning) pauseTimer(); else startTimer(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); var el = guidedActive ? guidedEl : document.getElementById('stage'); if (el.requestFullscreen) el.requestFullscreen(); }
    else if (e.key === 'c' || e.key === 'C') { e.preventDefault(); toggleComplete(); }
    else if (e.key === 'Escape' && guidedActive) { exitGuided(); }
  });

  render();
})();
</script>
</body>
</html>
"""


def render_html(pkg_dir, pkg_slug, shots, total_duration):
    checklist_text = read_text(os.path.join(pkg_dir, 'production', 'screen-recording-checklist.md')) or '(הקובץ לא נמצא)'
    manual_actions_text = read_text(os.path.join(pkg_dir, 'production', 'MANUAL-ACTIONS.md')) or '(הקובץ לא נמצא)'

    heebo_regular = b64_data_uri(brand._HEEBO_REGULAR) or ''
    heebo_bold = b64_data_uri(brand._HEEBO_BOLD) or ''
    mono_regular = b64_data_uri(brand.MONO_REGULAR) or ''

    payload = {
        'package': pkg_slug,
        'totalDuration': total_duration,
        'shots': shots,
    }

    html = HTML_TEMPLATE
    html = html.replace('__TITLE__', pkg_slug)
    html = html.replace('__BG__', brand.BG_HEX)
    html = html.replace('__CARD__', '#1D160E')
    html = html.replace('__TEXT__', brand.TEXT_HEX)
    html = html.replace('__DIM__', brand.DIM_HEX)
    html = html.replace('__ORANGE__', brand.ORANGE_HEX)
    html = html.replace('__HEEBO_REGULAR__', heebo_regular)
    html = html.replace('__HEEBO_BOLD__', heebo_bold)
    html = html.replace('__MONO_REGULAR__', mono_regular)
    html = html.replace('__CHECKLIST_TEXT__', _esc_html(checklist_text))
    html = html.replace('__MANUAL_ACTIONS_TEXT__', _esc_html(manual_actions_text))
    html = html.replace('__SHOT_DATA_JSON__', _esc_script_json(payload))
    return html


def _esc_html(text):
    return (text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))


def _esc_script_json(payload):
    # Inside a <script type="application/json"> block, only "</script" needs
    # neutralizing so the HTML parser can't be confused into ending the tag
    # early if any embedded text happened to contain it.
    raw = json.dumps(payload, ensure_ascii=False)
    return raw.replace('</script', '<\\/script')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--package', required=True, help='Path to marketing-engine/packages/<slug>')
    args = ap.parse_args()

    pkg_dir = args.package.rstrip('/\\')
    pkg_slug = os.path.basename(pkg_dir)

    shots, total_duration = build_shots(pkg_dir)
    html = render_html(pkg_dir, pkg_slug, shots, total_duration)

    out_path = os.path.join(pkg_dir, 'production', 'RECORDING-STUDIO.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)

    ready = sum(1 for s in shots if s['kind'] == 'ready')
    recording = sum(1 for s in shots if s['kind'] == 'recording')
    print(f'RECORDING-STUDIO written: {out_path}')
    print(f'Shots: {len(shots)} total ({ready} ready visuals, {recording} real-screen-recording shots)')


if __name__ == '__main__':
    main()
