/**
 * ליד מטופס בדיקת ההתאמה (/audit וגם /en/audit, אותו דף).
 * מחליף את וורקפלואו n8n: שומר את כל התשובות, שולח התראה ותודה.
 * אין כאן הצעת מחיר אוטומטית.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const KEY_RE = /^[\u0590-\u05FFa-zA-Z0-9][\u0590-\u05FFa-zA-Z0-9 ._-]{0,79}$/;

const MAX_FIELDS = 40;
const MAX_FIELD = 4000;

/** התוויות כמו בצומת "בניית שורת ליד" של n8n. להשאיר תואם ל-docs/leads-sheet-apps-script.gs */
const NOTE_EXTRAS: ReadonlyArray<readonly [string, string]> = [
  ['כלים היום', 'כלים'],
  ['מצב אתר', 'אתר'],
  ['רוצה שיקרה לבד', 'שיקרה לבד'],
  ['משימה חוזרת', 'משימה חוזרת'],
  ['יום עבודה', 'יום עבודה'],
  ['שאלות חוזרות', 'שאלות חוזרות'],
  ['אחרי פנייה', 'אחרי פנייה'],
  ['מקור לקוחות', 'מקור לקוחות'],
];

/** שדות שכבר יושבים בעמודה משלהם בגיליון "לידים", ולכן לא חוזרים להערות. */
const LEAD_COLUMN_KEYS = new Set([
  'שם',
  'העסק',
  'אימייל',
  'טלפון',
  'דחיפות',
  'מטרה',
  'הבעיה הכי חשובה',
  'חסר',
  'קישור לאתר',
]);

export type AuditLead = {
  submissionId: string;
  answers: Record<string, string>;
  name: string;
  email: string;
  phone: string;
  business: string;
  notes: string;
};

export function parseAuditLead(
  body: unknown
): { ok: true; lead: AuditLead } | { ok: false; error: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'invalid' };
  }
  const raw = body as Record<string, unknown>;
  const submissionId = typeof raw.submissionId === 'string' ? raw.submissionId.trim() : '';
  if (!UUID_RE.test(submissionId)) return { ok: false, error: 'invalid_submission' };

  const answers: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key === 'submissionId') continue;
    if (!KEY_RE.test(key) || typeof value !== 'string') continue;
    const cleaned = value.replace(/\u0000/g, '').trim().slice(0, MAX_FIELD);
    if (!cleaned) continue;
    answers[key] = cleaned;
    if (Object.keys(answers).length > MAX_FIELDS) return { ok: false, error: 'invalid' };
  }

  const name = oneLine(answers['שם']).slice(0, 200);
  const email = oneLine(answers['אימייל']).slice(0, 320);
  const phone = oneLine(answers['טלפון']).slice(0, 40);
  const business = oneLine(answers['העסק']).slice(0, 500);
  if (!name) return { ok: false, error: 'invalid_name' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'invalid_email' };
  if ((phone.match(/\d/g) || []).length < 8) return { ok: false, error: 'invalid_phone' };
  if (!answers['הסכמה']) return { ok: false, error: 'invalid_consent' };

  answers['שם'] = name;
  answers['אימייל'] = email;
  answers['טלפון'] = phone;
  if (business) answers['העסק'] = business;

  return {
    ok: true,
    lead: {
      submissionId,
      answers,
      name,
      email,
      phone,
      business,
      notes: buildNotes(answers, submissionId),
    },
  };
}

/** הערות הגיליון: השדות בלי עמודה, ואז מזהה השליחה כדי שאפשר יהיה לזהות כפילות. */
export function buildNotes(answers: Record<string, string>, submissionId: string): string {
  const parts: string[] = [];
  const used = new Set<string>();
  for (const [label, key] of NOTE_EXTRAS) {
    used.add(key);
    const value = (answers[key] || '').trim();
    if (value) parts.push(`${label}: ${value}`);
  }
  const rest = Object.keys(answers)
    .filter((key) => !used.has(key) && !LEAD_COLUMN_KEYS.has(key) && (answers[key] || '').trim())
    .sort((a, b) => a.localeCompare(b, 'he'));
  for (const key of rest) parts.push(`${key}: ${answers[key].trim()}`);
  // המזהה בהתחלה, כדי שזיהוי כפילות בגיליון ישרוד גם אם התא נחתך.
  return [`submissionId: ${submissionId}`, ...parts].join(' | ').slice(0, 45000);
}

export function alertSubject(name: string): string {
  return `🔥 ליד חדש מהאבחון: ${oneLine(name)}`;
}

/** גוף ההתראה כמו במייל של n8n. השורה האחרונה מפנה ל-Grok Bot במקום להצעה האוטומטית. */
export function alertText(a: Record<string, string>): string {
  return [
    'נכנס ליד חדש מהאבחון!',
    '',
    `שם: ${oneLine(a['שם'])}`,
    `אימייל: ${oneLine(a['אימייל'])}`,
    `טלפון: ${oneLine(a['טלפון'])}`,
    `עסק: ${oneLine(a['העסק'])}`,
    `מטרה: ${oneLine(a['מטרה'])}`,
    `הכי נשרף זמן: ${oneLine(a['משימה חוזרת'])}`,
    `רוצה שיקרה לבד: ${oneLine(a['שיקרה לבד'])}`,
    `כלים היום: ${oneLine(a['כלים'])}`,
    `מצב אתר: ${oneLine(a['אתר'])} ${oneLine(a['קישור לאתר'])}`,
    `חסר: ${oneLine(a['חסר'])}`,
    `בעיה מרכזית: ${oneLine(a['הבעיה הכי חשובה'])}`,
    `דחיפות: ${oneLine(a['דחיפות'])}`,
    '',
    'הליד נשמר ב-Supabase. אפשר לבקש מ-Grok Bot להכין תדריך והצעה.',
  ].join('\n');
}

const THANK_YOU_SUBJECT = 'קיבלתי את האבחון שלך';

/** HTML התודה, כמו במייל של n8n. רק השם מוחלף, אחרי בריחה מתווים. */
export function thankYouHtml(name: string): string {
  return `<div style="background:#0C0C11;padding:32px 24px;font-family:Arial,sans-serif;direction:rtl;text-align:right"><div style="max-width:560px;margin:0 auto;background:#141009;border:1px solid rgba(242,98,46,.3);border-radius:14px;padding:28px"><div style="text-align:center;margin-bottom:18px"><img src="https://shani-ai.com/logo-email.png" width="46" height="46" alt="Shani AI" style="display:inline-block"><div style="color:#F2622E;font-weight:700;font-size:12px;letter-spacing:3px;margin-top:6px">SHANI AI CREATOR</div></div><h2 style="color:#F4EDE1;font-size:20px;margin:0 0 12px">תודה שמילאת את האבחון, ${esc(oneLine(name))}</h2><p style="color:#e8e0d5;line-height:1.8;font-size:15px;margin:0 0 12px">אני עוברת עכשיו על העסק שלך ועל מה שכתבת, ואחזור אליכם תוך יום עסקים עם שניים-שלושה כיוונים ראשוניים ושאלה או שתיים.</p><p style="color:#e8e0d5;line-height:1.8;font-size:15px;margin:0 0 12px">בשלב הזה עוד לא תקבלו הצעת מחיר. קודם נדבר כמה דקות, נוודא מה באמת נכון לבנות, ורק אז אכין הצעה מסודרת שמותאמת בדיוק לעסק שלכם.</p><p style="color:#a09688;line-height:1.7;font-size:14px;margin:16px 0 0">דחוף לכם? אפשר לכתוב לי ישירות בוואטסאפ: 050-4744815</p></div></div>`;
}

export function notifyEmail(): string {
  return (process.env.SHANI_NOTIFY_EMAIL || 'shani.creates.ai@gmail.com').trim();
}

type SendResult = { ok: true; id: string } | { ok: false; error: string };

export async function sendAlertEmail(lead: AuditLead): Promise<SendResult> {
  return sendResend({
    to: notifyEmail(),
    subject: alertSubject(lead.name),
    text: alertText(lead.answers),
  });
}

export async function sendThankYouEmail(lead: AuditLead): Promise<SendResult> {
  return sendResend({
    to: lead.email,
    subject: THANK_YOU_SUBJECT,
    html: thankYouHtml(lead.name),
  });
}

/**
 * גיליון הלידים דרך אפליקציית Apps Script. כישלון כאן לא מפיל את הליד.
 * הכתובת ב-LEADS_SHEET_WEBHOOK_URL. אם אין — מדלגים.
 */
export async function postLeadSheet(lead: AuditLead): Promise<boolean> {
  const url = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!url) return false;
  const secret = (process.env.LEADS_SHEET_WEBHOOK_SECRET || '').trim();
  const payload = {
    submissionId: lead.submissionId,
    answers: lead.answers,
    notes: lead.notes,
    ...(secret ? { secret } : {}),
  };
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const res = await postFollowingAppsScriptRedirect(url, payload, ctrl.signal);
    clearTimeout(timer);
    const text = await res.text();
    let leadId = '';
    try {
      const json = JSON.parse(text) as { ok?: boolean; leadId?: string };
      if (json.ok === true && typeof json.leadId === 'string') leadId = json.leadId;
    } catch {
      leadId = '';
    }
    if (!res.ok || !leadId) {
      console.error('[audit-lead] sheet webhook failed', res.status, text.slice(0, 180));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[audit-lead] sheet webhook', err instanceof Error ? err.message : err);
    return false;
  }
}

async function sendResend(args: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = (process.env.PROPOSAL_FROM_EMAIL || '').trim();
  if (!key || !from || !args.to) {
    return { ok: false, error: 'missing RESEND_API_KEY / PROPOSAL_FROM_EMAIL' };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: formatFrom(from),
      to: [args.to],
      subject: args.subject,
      ...(args.html ? { html: args.html } : {}),
      ...(args.text ? { text: args.text } : {}),
    }),
  });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 500);
    return { ok: false, error: `resend ${res.status}: ${detail}` };
  }
  const json = (await res.json()) as { id?: string };
  return { ok: true, id: json.id ?? '' };
}

function formatFrom(from: string): string {
  if (from.includes('<')) return from;
  return `Shani AI <${from}>`;
}

/**
 * כתובת Apps Script מחזירה הפניה, ו-fetch רגיל הופך אותה ל-GET ומאבד את הגוף.
 * שולחים שוב ב-POST לכתובת ההפניה, עם אותו גוף.
 */
async function postFollowingAppsScriptRedirect(
  url: string,
  payload: unknown,
  signal: AbortSignal
): Promise<Response> {
  const init: RequestInit = {
    method: 'POST',
    redirect: 'manual',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  };
  const first = await fetch(url, init);
  if (first.status < 300 || first.status >= 400) return first;
  const location = first.headers.get('location');
  if (!location) return first;
  return fetch(location, { ...init, redirect: 'follow' });
}

function oneLine(value: string | undefined): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim();
}

function esc(s: string): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}
