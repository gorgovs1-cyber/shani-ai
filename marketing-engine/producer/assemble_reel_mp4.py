#!/usr/bin/env python3
"""
assemble_reel_mp4.py — Producer faceless-mode assembly.

Takes the existing Producer visuals (production/visuals/ + visual-timeline.csv), the Cartesia
narration audio, and production/subtitles.srt, and composes production/final-reel.mp4
(1080x1920). The image timeline is rescaled to match the real narration duration (Cartesia's
output rarely matches the script's estimated timing exactly), and subtitles.srt timestamps are
rescaled by the same factor so captions stay in sync.

Where a shot has both a branded overlay and a manual-recording-slot placeholder (screen-recording
shots with no real footage yet), the two are composited (overlay on top, alpha) into one frame —
this is exactly what render_visuals.py already produces them for; nothing is invented here.

Usage:
    python marketing-engine/producer/assemble_reel_mp4.py --package marketing-engine/packages/<slug>
"""
import argparse
import csv
import os
import re
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

REEL_W, REEL_H = 1080, 1920
FONTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
LOUDNORM = "loudnorm=I=-16:TP=-1.5:LRA=11"


def ffmpeg_filter_path(path: str) -> str:
    return path.replace("\\", "/").replace(":", "\\:")


def ffprobe_duration(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def load_timeline(csv_path: str):
    with open(csv_path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_frame_sequence(production_dir: str, timeline_rows, tmp_dir: str):
    groups, order = {}, []
    for row in timeline_rows:
        key = (row["start_seconds"], row["end_seconds"])
        if key not in groups:
            groups[key] = []
            order.append(key)
        groups[key].append(row)

    frames = []  # (start, end, png_path)
    for key in order:
        start, end = float(key[0]), float(key[1])
        if end <= start:
            continue
        by_type = {r["type"]: r for r in groups[key]}
        if "full-screen" in by_type:
            png = os.path.join(production_dir, by_type["full-screen"]["filename_png"])
        elif "overlay" in by_type and "manual-recording-slot" in by_type:
            base = Image.open(os.path.join(production_dir, by_type["manual-recording-slot"]["filename_png"])).convert("RGBA")
            top = Image.open(os.path.join(production_dir, by_type["overlay"]["filename_png"])).convert("RGBA")
            base.alpha_composite(top)
            png = os.path.join(tmp_dir, f"frame_{start:.2f}-{end:.2f}.png")
            base.convert("RGB").save(png)
        else:
            only = next(iter(by_type.values()))
            png = os.path.join(production_dir, only["filename_png"])
        frames.append((start, end, png))
    return frames


def write_concat_file(frames, scale_factor: float, list_path: str, intro_static=None):
    # ffmpeg's concat demuxer resolves relative "file" paths against the list file's own
    # directory, not the process cwd — must be absolute or entries silently fail to open.
    def fmt(path):
        return os.path.abspath(path).replace("\\", "/")

    lines = []
    if intro_static:
        img, dur = intro_static
        lines.append(f"file '{fmt(img)}'")
        lines.append(f"duration {dur:.3f}")
    last_png = None
    for start, end, png in frames:
        seg_dur = (end - start) * scale_factor
        if seg_dur <= 0:
            continue
        lines.append(f"file '{fmt(png)}'")
        lines.append(f"duration {seg_dur:.3f}")
        last_png = png
    if last_png:
        lines.append(f"file '{fmt(last_png)}'")  # ffconcat: last entry needs no duration but must repeat
    with open(list_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


SRT_BLOCK_RE = re.compile(
    r"\d+\s*\n(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*\n(.*?)(?=\n\s*\n|\Z)",
    re.S,
)

ASS_HEADER = """[Script Info]
ScriptType: v4.00+
PlayResX: {w}
PlayResY: {h}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Heebo,56,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,3,1,2,60,60,140,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""


def parse_srt(path: str):
    with open(path, encoding="utf-8") as f:
        content = f.read()
    blocks = []
    for m in SRT_BLOCK_RE.finditer(content):
        h1, mi1, s1, ms1, h2, mi2, s2, ms2, text = m.groups()
        start = int(h1) * 3600 + int(mi1) * 60 + int(s1) + int(ms1) / 1000
        end = int(h2) * 3600 + int(mi2) * 60 + int(s2) + int(ms2) / 1000
        blocks.append((start, end, text.strip()))
    return blocks


def seconds_to_ass_time(t: float) -> str:
    t = max(t, 0)
    h = int(t // 3600); t -= h * 3600
    m = int(t // 60); t -= m * 60
    return f"{h:d}:{m:02d}:{t:05.2f}"


def srt_to_ass(src_path: str, dst_path: str, scale_factor: float, offset_seconds: float):
    # A plain .srt has no resolution info, so ffmpeg's subtitles filter has to guess a script
    # canvas size for it — the guess doesn't match a 1080x1920 reel and throws font size and
    # position off badly. Writing our own .ass with explicit PlayResX/PlayResY sidesteps that.
    blocks = parse_srt(src_path)
    lines = [ASS_HEADER.format(w=REEL_W, h=REEL_H)]
    for start, end, text in blocks:
        s = seconds_to_ass_time(start * scale_factor + offset_seconds)
        e = seconds_to_ass_time(end * scale_factor + offset_seconds)
        ass_text = text.replace("\n", "\\N").replace("{", "").replace("}", "")
        lines.append(f"Dialogue: 0,{s},{e},Default,,0,0,0,,{ass_text}\n")
    with open(dst_path, "w", encoding="utf-8") as f:
        f.write("".join(lines))


def run_ffmpeg(args):
    result = subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"] + args, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {result.stderr[-1500:]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", required=True, help="Path to marketing-engine/packages/<slug>")
    parser.add_argument("--out", default=None, help="Output mp4 path (default: <package>/production/final-reel.mp4)")
    args = parser.parse_args()

    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        print("assemble_reel_mp4: ffmpeg/ffprobe not found on PATH", file=sys.stderr)
        sys.exit(1)

    prod_dir = os.path.join(args.package, "production")
    timeline_csv = os.path.join(prod_dir, "visual-timeline.csv")
    srt_path = os.path.join(prod_dir, "subtitles.srt")

    narration_path = None
    for candidate in ("narration.mp3", "narration.wav"):
        p = os.path.join(prod_dir, candidate)
        if os.path.isfile(p):
            narration_path = p
            break

    for label, path in (("narration audio", narration_path), ("visual-timeline.csv", timeline_csv), ("subtitles.srt", srt_path)):
        if not path or not os.path.isfile(path):
            print(f"assemble_reel_mp4: missing {label} in {prod_dir} — run tts_cartesia.py / render_visuals.py first", file=sys.stderr)
            sys.exit(1)

    out_path = args.out or os.path.join(prod_dir, "final-reel.mp4")
    tmp_dir = tempfile.mkdtemp(prefix="reel_assemble_")

    try:
        narration_duration = ffprobe_duration(narration_path)
        timeline_rows = load_timeline(timeline_csv)
        script_total = max(float(r["end_seconds"]) for r in timeline_rows)
        if script_total <= 0:
            raise RuntimeError("visual-timeline.csv has no positive-duration rows")

        intro_path = os.environ.get("SHANI_INTRO_AUDIO_PATH")
        intro_static, offset = None, 0.0
        if intro_path and os.path.isfile(intro_path):
            intro_duration = ffprobe_duration(intro_path)
            cover_png = os.path.join(prod_dir, "visuals", "png", "cover.png")
            intro_static = (cover_png, intro_duration)
            offset = intro_duration
        else:
            intro_path = None

        scale_factor = narration_duration / script_total
        frames = build_frame_sequence(prod_dir, timeline_rows, tmp_dir)

        list_path = os.path.join(tmp_dir, "frames.txt")
        write_concat_file(frames, scale_factor, list_path, intro_static)

        temp_video = os.path.join(tmp_dir, "video.mp4")
        run_ffmpeg([
            "-f", "concat", "-safe", "0", "-i", list_path,
            "-vf", f"scale={REEL_W}:{REEL_H}:force_original_aspect_ratio=decrease,pad={REEL_W}:{REEL_H}:(ow-iw)/2:(oh-ih)/2,setsar=1",
            "-r", "30", "-pix_fmt", "yuv420p", temp_video,
        ])

        temp_audio = os.path.join(tmp_dir, "audio.m4a")
        if intro_path:
            run_ffmpeg([
                "-i", intro_path, "-i", narration_path,
                "-filter_complex", f"[0:a]{LOUDNORM}[a0];[1:a]{LOUDNORM}[a1];[a0][a1]concat=n=2:v=0:a=1[aout]",
                "-map", "[aout]", "-c:a", "aac", "-b:a", "192k", temp_audio,
            ])
        else:
            run_ffmpeg(["-i", narration_path, "-af", LOUDNORM, "-c:a", "aac", "-b:a", "192k", temp_audio])

        scaled_ass = os.path.join(tmp_dir, "scaled.ass")
        srt_to_ass(srt_path, scaled_ass, scale_factor, offset)

        subtitles_filter = f"subtitles='{ffmpeg_filter_path(scaled_ass)}':fontsdir='{ffmpeg_filter_path(FONTS_DIR)}'"
        run_ffmpeg([
            "-i", temp_video, "-i", temp_audio,
            "-vf", subtitles_filter,
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
            "-shortest", out_path,
        ])
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    print(f"assemble_reel_mp4: wrote {out_path}")


if __name__ == "__main__":
    main()
