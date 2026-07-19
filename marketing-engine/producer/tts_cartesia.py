#!/usr/bin/env python3
"""
tts_cartesia.py — Producer faceless-mode narration: voiceover.txt -> Cartesia TTS -> narration audio.

Reads <package>/production/voiceover.txt (timestamped Hebrew lines), strips the [MM:SS-MM:SS]
prefixes, applies a small Hebrew gender-ambiguity normalization pass, and calls the Cartesia
TTS API directly (not HeyGen/Higgsfield/ElevenLabs) to synthesize narration.mp3 in the cloned
voice. Never logs the API key.

Usage:
    python marketing-engine/producer/tts_cartesia.py --package marketing-engine/packages/<slug>
"""
import argparse
import os
import re
import sys

import requests

VOICE_ID = "9d23779c-8d37-4ee1-9aa2-c0fb762bb9d3"
MODEL_ID = "sonic-3.5"
LANGUAGE = "he"
SPEED = 1.0
SAMPLE_RATE = 44100
CARTESIA_URL = "https://api.cartesia.ai/tts/bytes"
CARTESIA_VERSION = "2025-04-16"

TIMESTAMP_RE = re.compile(r"^\[\d{1,2}:\d{2}-\d{1,2}:\d{2}\]\s*")

# ponytail: a fixed small pair-list, not a general NLP normalizer — covers the ambiguous
# first-person forms called out in the brief. Extend the list if new ones show up in scripts.
AMBIGUOUS_REPLACEMENTS = [
    (re.compile(r"אני רוצה להראות"), "אראה"),
    (re.compile(r"אני רוצה"), "המטרה כאן"),
    (re.compile(r"אני עושה"), "מתבצע כאן"),
    (re.compile(r"אני מראה"), "אראה"),
]

FORBIDDEN_WORDS_RE = re.compile(r"\b(שני|SHANI)\b", re.IGNORECASE)


def normalize_hebrew(text: str) -> str:
    for pattern, replacement in AMBIGUOUS_REPLACEMENTS:
        text = pattern.sub(replacement, text)
    if FORBIDDEN_WORDS_RE.search(text):
        print("tts_cartesia: warning — removing 'שני'/'SHANI' from narration text (brand appears in visuals/cover only)", file=sys.stderr)
        text = FORBIDDEN_WORDS_RE.sub("", text)
        text = re.sub(r"\s{2,}", " ", text).strip()
    return text


def load_transcript(voiceover_path: str) -> str:
    lines = []
    with open(voiceover_path, "r", encoding="utf-8") as f:
        for raw_line in f:
            line = raw_line.strip()
            if not line:
                continue
            line = TIMESTAMP_RE.sub("", line)
            if line:
                lines.append(line)
    if not lines:
        raise ValueError(f"No narration lines found in {voiceover_path}")
    return normalize_hebrew(" ".join(lines))


def synthesize(transcript: str, api_key: str) -> bytes:
    headers = {
        "X-API-Key": api_key,
        "Cartesia-Version": CARTESIA_VERSION,
        "Content-Type": "application/json",
    }
    payload = {
        "model_id": MODEL_ID,
        "transcript": transcript,
        "voice": {"mode": "id", "id": VOICE_ID},
        "language": LANGUAGE,
        "speed": SPEED,
        "output_format": {
            "container": "mp3",
            "bit_rate": 128000,
            "sample_rate": SAMPLE_RATE,
        },
    }
    try:
        resp = requests.post(CARTESIA_URL, headers=headers, json=payload, timeout=60)
    except requests.exceptions.Timeout:
        raise RuntimeError("Cartesia API request timed out after 60s")
    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"Cartesia API request failed: {type(e).__name__}")
    if resp.status_code != 200:
        # Cartesia error bodies are JSON with a `message` field — safe to surface, never the key.
        detail = resp.text[:300]
        raise RuntimeError(f"Cartesia API error {resp.status_code}: {detail}")
    return resp.content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--package", required=True, help="Path to marketing-engine/packages/<slug>")
    parser.add_argument("--out", default=None, help="Output audio path (default: <package>/production/narration.mp3)")
    args = parser.parse_args()

    voiceover_path = os.path.join(args.package, "production", "voiceover.txt")
    if not os.path.isfile(voiceover_path):
        print(f"tts_cartesia: missing {voiceover_path}", file=sys.stderr)
        sys.exit(1)

    api_key = os.environ.get("CARTESIA_API_KEY")
    if not api_key:
        print(
            "tts_cartesia: CARTESIA_API_KEY is not set. Add it to a local .env "
            "(see .env.example) or export it in your shell, then re-run.",
            file=sys.stderr,
        )
        sys.exit(1)

    transcript = load_transcript(voiceover_path)
    out_path = args.out or os.path.join(args.package, "production", "narration.mp3")

    try:
        audio_bytes = synthesize(transcript, api_key)
    except RuntimeError as e:
        print(f"tts_cartesia: {e}", file=sys.stderr)
        sys.exit(1)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(audio_bytes)

    print(f"tts_cartesia: wrote {out_path} ({len(audio_bytes)} bytes)")


if __name__ == "__main__":
    main()
