import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Audit intake endpoint.
 *
 * Receives the JSON payload produced by collect() in public/audit/index.html,
 * validates and normalizes it deterministically, and forwards it to the
 * server-only n8n webhook configured via N8N_AUDIT_WEBHOOK_URL.
 *
 * No AI analysis, pricing, recommendation, proposal, agent, or workflow logic
 * lives here — this endpoint only validates, normalizes, and forwards.
 * No database. No persistence.
 */

// Field keys must match exactly what collect() emits in public/audit/index.html.
// Do not add fields here that are not real inputs on that form.
const REQUIRED_FIELDS = ['העסק', 'הבעיה הכי חשובה', 'שם', 'אימייל'] as const;

const OPTIONAL_FIELDS = [
  'מטרה',
  'מיקום עבודה',
  'יום עבודה',
  'משימה חוזרת',
  'שיקרה לבד',
  'מקור לקוחות',
  'אחרי פנייה',
  'שאלות חוזרות',
  'כלים',
  'כלים נוספים',
  'אתר',
  'קישור לאתר',
  'חסר',
  'דחיפות',
  'קשר נוסף',
] as const;

const KNOWN_FIELDS = new Set<string>([...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]);

const MAX_FIELD_LENGTH = 4000;
const MAX_BODY_BYTES = 50_000;
const FETCH_TIMEOUT_MS = 8000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Trims leading/trailing whitespace only. Internal newlines and Hebrew
// content (e.g. multiline "יום עבודה" answers) are preserved untouched.
function trimOuter(value: string): string {
  return value.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');
}

function fail(status: number, error: string): Response {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request): Promise<Response> {
  const contentType = (req.headers.get('content-type') || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    return fail(415, 'unsupported_content_type');
  }

  const contentLength = Number(req.headers.get('content-length') || '0');
  if (contentLength > MAX_BODY_BYTES) {
    return fail(413, 'payload_too_large');
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail(400, 'malformed_json');
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return fail(400, 'malformed_payload');
  }

  const input = raw as Record<string, unknown>;

  // Reject anything outside the real form schema instead of silently dropping it.
  for (const key of Object.keys(input)) {
    if (!KNOWN_FIELDS.has(key)) {
      return fail(400, 'unknown_field');
    }
  }

  // Normalize into a fixed shape: every known field is either a trimmed
  // non-empty string or null (consistent representation for "empty").
  const answers: Record<string, string | null> = {};

  for (const key of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
    const value = input[key];

    if (value === undefined || value === null) {
      answers[key] = null;
      continue;
    }
    if (typeof value !== 'string') {
      return fail(400, 'invalid_field_type');
    }

    const trimmed = trimOuter(value);
    if (trimmed.length > MAX_FIELD_LENGTH) {
      return fail(413, 'field_too_long');
    }
    answers[key] = trimmed.length > 0 ? trimmed : null;
  }

  for (const key of REQUIRED_FIELDS) {
    if (!answers[key]) {
      return fail(400, 'missing_required_field');
    }
  }

  const email = answers['אימייל'] as string;
  if (!EMAIL_RE.test(email)) {
    return fail(400, 'invalid_email');
  }

  const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('audit intake: N8N_AUDIT_WEBHOOK_URL is not configured');
    return fail(503, 'service_unavailable');
  }

  const submissionId = `AUDIT-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  const receivedAt = new Date().toISOString();

  const envelope = {
    submissionId,
    receivedAt,
    source: 'website-audit',
    payloadVersion: 1,
    answers,
  };

  const controller = new AbortController();
  const timeoutHandle = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(envelope),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      // Never forward upstream response bodies/headers to the client.
      console.error('audit intake: upstream non-2xx response', {
        submissionId,
        status: upstream.status,
      });
      return fail(502, 'submission_failed');
    }
  } catch (e) {
    const isTimeout = e instanceof Error && e.name === 'AbortError';
    console.error('audit intake: forward failed', {
      submissionId,
      reason: isTimeout ? 'timeout' : 'network_error',
    });
    return fail(isTimeout ? 504 : 502, 'submission_failed');
  } finally {
    clearTimeout(timeoutHandle);
  }

  return NextResponse.json({ ok: true, submissionId }, { status: 200 });
}
