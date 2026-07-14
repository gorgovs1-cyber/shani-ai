# n8n → Supabase handoff contract (Client Research intake bridge, V1)

> Concise contract only. This is **not** a live n8n workflow change — no n8n account is
> configured from this environment. Shani wires this into her existing n8n Cloud workflow
> herself, using the parameters below.

## Where this sits in the flow

```
website /audit form
  → existing /api/audit/intake  (unchanged — already validates + forwards to N8N_AUDIT_WEBHOOK_URL)
  → n8n Cloud                    (existing webhook; ADD one insert step described here)
  → Supabase client_research_jobs (new table — see ../supabase/001_client_research_jobs.sql)
  → local Windows runner          (worker.mjs — polls, does NOT run in n8n)
  → existing Client Research Desk (client-researcher → client-reviewer → research-report.md)
```

`/api/audit/intake` and the existing `audit-intake-workflow.json` (Google Sheets duplicate-check +
append) are **not modified** by this bridge. The insert step below is an *addition* n8n makes
after its existing validation/duplicate-check logic — it should only fire for a genuinely new,
valid submission, exactly like the existing "Google Sheets: Append New Submission" node already
does today.

## What n8n receives (unchanged, already exists)

The exact envelope `/api/audit/intake` forwards to `N8N_AUDIT_WEBHOOK_URL` today:

```json
{
  "submissionId": "AUDIT-mdak3f2l-9x7q2h1w",
  "receivedAt": "2026-07-15T10:32:00.000Z",
  "source": "website-audit",
  "payloadVersion": 1,
  "answers": {
    "העסק": "סטודיו לצילום מוצרים לעסקים קטנים",
    "הבעיה הכי חשובה": "פניות שמתקררות כי אין מענה מהיר",
    "שם": "דמות לדוגמה",
    "אימייל": "example@example.com",
    "מטרה": "להכפיל פניות נכנסות בלי להוסיף שעות עבודה",
    "מיקום עבודה": null,
    "יום עבודה": "בוקר צילומים, אחה\"צ עריכה, ערב מענה ידני",
    "משימה חוזרת": "כתיבת הצעות מחיר ידניות בוואטסאפ",
    "שיקרה לבד": null,
    "מקור לקוחות": "אינסטגרם והמלצות",
    "אחרי פנייה": "מענה ידני, לפעמים אחרי יומיים",
    "שאלות חוזרות": null,
    "כלים": "וואטסאפ, יומן גוגל, קאנבה",
    "כלים נוספים": null,
    "אתר": "יש אתר ישן",
    "קישור לאתר": "https://example.invalid",
    "חסר": "זמן",
    "דחיפות": "גבוהה",
    "קשר נוסף": null
  }
}
```

Required answer fields (already enforced by `/api/audit/intake` before n8n ever sees the
payload): `העסק`, `הבעיה הכי חשובה`, `שם`, `אימייל`. Every other answer field may be `null`.
**n8n must not alter the meaning of any answer** — pass `answers` through byte-for-byte.

## What n8n must insert into Supabase

Add one **HTTP Request** node (or the built-in Supabase node, if preferred) immediately after the
existing "IF: Valid?" → non-duplicate branch, in parallel with (not instead of) the existing
Google Sheets append:

- **Method:** `POST`
- **URL:** `{{SUPABASE_URL}}/rest/v1/client_research_jobs`
- **Headers:**
  - `apikey: {{SUPABASE_SERVICE_ROLE_KEY}}`
  - `Authorization: Bearer {{SUPABASE_SERVICE_ROLE_KEY}}`
  - `Content-Type: application/json`
  - `Prefer: return=minimal`
- **Body** (n8n expression, built from the already-validated item from the "Validate & Normalize"
  node — do **not** re-derive `answers` by hand, forward the original envelope as received):

```json
{
  "submission_json": {
    "submissionId": "={{ $json.submissionId }}",
    "receivedAt": "={{ $json.receivedAt }}",
    "source": "={{ $json.source }}",
    "payloadVersion": "={{ $json.payloadVersion }}",
    "answers": "={{ $json.answers ?? $json }}"
  }
}
```

Everything else is left to its column default:
- `status` → defaults to `pending`
- `source` (the job's intake channel, distinct from `submission_json.source` which is the
  original form envelope's own `"website-audit"` string) → defaults to `'audit-form'`; leave it
  unset unless a second intake channel is ever added
- `attempts` → defaults to `0`
- `shani_status` → defaults to `'pending'`
- `client_id`, `report_path`, `review_status`, `error_code`, `error_message`, `locked_at`,
  `locked_by`, `next_attempt_at` → all `null` until the local runner fills them in

### Response to the website

n8n's existing `Respond: New Submission Stored` / `Respond: Duplicate Submission` nodes are
unchanged — they already return `{ "ok": true, "submissionId": ..., "duplicate": ... }` to
`/api/audit/intake`, which is what the website's `done()` handler expects. **The Supabase insert
must not block or replace that response** — insert, then respond, same as the existing Google
Sheets append already does today.

## What n8n must NOT do (V1, absolute)

- Must not perform any research, analysis, or scoring itself.
- Must not compute or attach pricing.
- Must not generate or send a proposal.
- Must not send anything to the client (email, WhatsApp, SMS).
- Must not call the local Windows machine directly — there is no inbound webhook to it. The
  local runner reaches out to Supabase; Supabase never reaches into the local machine.

## Required n8n credentials (names only, no values)

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side n8n credential/expression only — never in a node that
  could echo it back to the website response, never logged)

These are the same two variable **names** the local runner and the existing Next.js app already
use (see `.env.example` and `ai-company/workers/client-research-inbox/README.md`) — same
Supabase project, same keys, reused rather than duplicated.
