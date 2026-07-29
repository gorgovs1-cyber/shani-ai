# PENDING-COMMAND-UPDATES

`.claude/commands/` files can't be edited directly by Claude inside this Cowork session (that
directory is blocked here). This folder holds the exact replacement content for Shani to copy
in manually — same pattern as the earlier `producer.md`/`content-run.md` staging.

## What's here now

**`producer.md`** → replace `.claude/commands/producer.md` with this file, in full.

What changed vs. the current one: added a new "שלב 3" section (after the existing visual-render
step) that runs `marketing-engine/producer/recording_studio.py --package <slug>` right after a
successful render, so `/producer` also builds `production/RECORDING-STUDIO.html` in the same run.
Nothing else in the file changed — same entry conditions, same file list, same iron rules. A
Recording Studio build failure is explicitly non-fatal to the rest of Producer (logged to
MANUAL-ACTIONS.md, never invents a replacement).

## How to apply

```powershell
Copy-Item "PENDING-COMMAND-UPDATES\producer.md" ".claude\commands\producer.md" -Force
```

Then delete this folder (or just the file) once applied — same as before.

## Why this matters for the worker

`worker.mjs`'s automated pipeline calls `render_visuals.py` and `recording_studio.py` directly
(bypassing `/producer` itself), so the worker already builds the Recording Studio on every
approved run without this change. This staged `producer.md` update is only needed to keep the
**interactive** `/producer` slash command (run by hand, not through the worker) consistent with
what the worker does automatically.
