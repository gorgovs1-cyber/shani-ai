#!/usr/bin/env python3
"""
creator_handoff.py — Generates production/CREATOR-HANDOFF.md: a simple Hebrew
filming guide for Shani.

This is the primary final-delivery layer for the Organic Content Team
pipeline. Both run modes end with this guide as the main handoff — not a
technical development report:
  - Conversational Claude run (/producer or /content-run inside a Claude Code
    session): Claude's final chat response displays this guide's content
    directly. Technical details go in a separate, clearly-labeled section
    AFTER the guide, never before it.
  - Headless desktop launcher (worker.mjs --run-now): this file is written to
    disk and opened automatically, before the Recording Studio.

Not a new agent, not an LLM call — a deterministic template renderer, same
category of tool as recording_studio.py. Reuses recording_studio.build_shots()
instead of re-parsing production/ files a second time, so there is exactly one
place that reads the real per-shot data (on-screen-text.csv, voiceover.txt,
visual-manifest.json). Nothing here is invented: every instruction, narration
line and on-screen text is copied verbatim from what Producer already wrote.

Does not touch package.md, content-desk-package.md, review.md, or anything
produced by Researcher/Creator/Reviewer/Content Desk. Read-only against
production/ except for writing CREATOR-HANDOFF.md itself.

Usage:
    python3 creator_handoff.py --package "marketing-engine/packages/<slug>"
"""
import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from recording_studio import build_shots  # noqa: E402  (reuse, don't re-parse)


def fmt_seconds(n):
    n = float(n)
    return f'{int(n)}' if n.is_integer() else f'{n:g}'


def build_guide_markdown(pkg_dir):
    shots, _manifest_total_duration = build_shots(pkg_dir)
    cover = next((s for s in shots if s['id'] == 'cover'), None)
    numbered = sorted((s for s in shots if s['id'] != 'cover'), key=lambda s: s['index'])

    recording_shots = [s for s in numbered if s['kind'] == 'recording']
    ready_shots = [s for s in numbered if s['kind'] == 'ready']

    # One-sentence description — taken verbatim from the real cover hook text,
    # never rewritten or summarized by this script.
    hook_sentence = ''
    if cover and cover.get('onScreenText'):
        hook_sentence = cover['onScreenText'].split(' / ')[0].strip()
    if not hook_sentence:
        hook_sentence = '(לא נמצא טקסט הוק בקאבר — ר\' package.md)'

    total_duration = max((s['end'] for s in numbered), default=0)

    # Contiguous recording shots (each one starts exactly where the previous
    # one ends) -> filmed as ONE continuous take, cut into pieces afterward.
    # Non-contiguous -> genuinely separate recordings.
    continuous = True
    prev_end = None
    for s in recording_shots:
        if prev_end is not None and abs(s['start'] - prev_end) > 0.05:
            continuous = False
        prev_end = s['end']

    L = []
    L.append('# הפוסט מוכן')
    L.append('')
    L.append(hook_sentence)
    L.append('')

    L.append('## מה כבר מוכן')
    L.append('')
    if cover:
        L.append('- קאבר מוכן')
    for s in ready_shots:
        L.append(f'- כרטיס CTA מוכן (שוט {s["index"]})')
    if recording_shots:
        L.append('- overlays מוכנים (שכבת הכיתוב שתונח מעל ההקלטה שלך)')
    L.append('- תסריט מוכן')
    L.append('- כתוביות מוכנות')
    L.append('')

    L.append('## מה נשאר לצלם')
    L.append('')
    if recording_shots:
        n = len(recording_shots)
        first_idx, last_idx = recording_shots[0]['index'], recording_shots[-1]['index']
        if continuous:
            L.append(
                f'{n} רגעים בסרטון (שוטים {first_idx}–{last_idx}) עדיין דורשים הקלטת מסך אמיתית — '
                'אבל בפועל זו **הקלטה אחת רציפה**, לא כמה הקלטות נפרדות. מקליטים ברצף מההתחלה '
                'עד הסוף לפי סדר השוטים למטה, ואחר כך חותכים את ההקלטה לקטעים בעריכה.'
            )
        else:
            L.append(f'{n} הקלטות מסך נפרדות, שוט אחרי שוט, לפי המדריך למטה.')
    else:
        L.append('אין צורך בהקלטת מסך — כל השוטים כבר מוכנים כגרפיקה.')
    L.append('')

    L.append('## לפני שמתחילים')
    L.append('')
    L.append('1. לפתוח את קובץ CLAUDE.md בעורך (הקובץ האמיתי בפרויקט).')
    L.append('2. לפתוח את המדריך הזה לצד העורך, כדי לעקוב שוט אחרי שוט.')
    L.append('3. להתחיל הקלטת מסך.')
    L.append('')

    L.append('## מדריך צילום')
    L.append('')
    for s in numbered:
        start_s, end_s = fmt_seconds(s['start']), fmt_seconds(s['end'])
        dur = fmt_seconds(s['duration'] if s.get('duration') is not None else (s['end'] - s['start']))
        L.append(f'### שוט {s["index"]} — {start_s}–{end_s} שניות')
        L.append('')
        if s['kind'] == 'ready':
            L.append('לא צריך לצלם — הכרטיס כבר מוכן.')
            L.append('')
            if s.get('onScreenText'):
                L.append('טקסט על הכרטיס:')
                L.append(s['onScreenText'])
                L.append('')
            if s.get('voiceoverStatus') == 'present' and s.get('voiceover'):
                L.append('מה לומר (אם מקליטים קריינות):')
                L.append(s['voiceover'])
                L.append('')
        else:
            L.append('מה לצלם:')
            L.append(s.get('recordingInstruction') or '(אין הוראה מפורטת בקובצי ההפקה — לבדוק ב-shot-list.md)')
            L.append('')
            if s.get('voiceoverStatus') == 'present' and s.get('voiceover'):
                L.append('מה לומר:')
                L.append(s['voiceover'])
                L.append('')
            elif s.get('voiceoverStatus') == 'optional':
                L.append('מה לומר: (אין קריינות בשוט הזה — כיתוב בלבד)')
                L.append('')
            L.append('טקסט שיופיע:')
            L.append(s.get('onScreenText') or '(אין)')
            L.append('')
            L.append('משך:')
            L.append(f'{dur} שניות')
        L.append('')

    L.append('## בסיום הצילום')
    L.append('')
    L.append('שמרי את הקלטת המסך בתיקיית production בשם:')
    L.append('')
    L.append('```')
    L.append('claude-md-screen-recording.mp4')
    L.append('```')
    L.append('')

    meta = {
        'shot_count': len(numbered),
        'recording_shots': len(recording_shots),
        'ready_shots': len(ready_shots),
        'total_duration': total_duration,
        'continuous_recording': continuous,
    }
    return '\n'.join(L), meta


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--package', required=True)
    args = ap.parse_args()

    pkg_dir = os.path.abspath(args.package)
    pkg_slug = os.path.basename(os.path.normpath(pkg_dir))

    guide_md, meta = build_guide_markdown(pkg_dir)
    out_path = os.path.join(pkg_dir, 'production', 'CREATOR-HANDOFF.md')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(guide_md)

    print(f'[creator_handoff] package={pkg_slug}')
    print(f'[creator_handoff] shots={meta["shot_count"]} recording={meta["recording_shots"]} ready={meta["ready_shots"]}')
    print(f'[creator_handoff] continuous_recording={meta["continuous_recording"]} total_duration={meta["total_duration"]}s')
    print(f'[creator_handoff] written: {out_path}')


if __name__ == '__main__':
    main()
