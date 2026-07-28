/**
 * חתימת הצעת מחיר: ממלא את ה-PDF, משטח אותו, שולח במייל לשני וללקוח, ורושם בסופאבייס.
 *
 * למה זה עובד ככה:
 *  - ה-PDF המקורי (public/proposals/<slug>.pdf) מכיל שדות טופס. כאן אנחנו לא
 *    ממלאים אותם ומשאירים אותם ניתנים לעריכה, אלא מציירים את הטקסט על העמוד
 *    ומוחקים את הטופס. התוצאה היא מסמך סגור שאי אפשר לשנות בקורא PDF רגיל.
 *  - הטקסט עובר דרך toVisual() כדי שעברית תיראה נכון, כי pdf-lib לא מסדר RTL.
 *  - הפונט מוטמע מ-public/fonts, אחרת אין גליפים לעברית.
 */
import { PDFDocument, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { toVisual } from './bidi';
import { supabaseAdmin } from '@/lib/analytics/supabase';

export type SignPayload = {
  slug: string;
  first_name: string;
  business: string;
  vat_id: string;
  email: string;
  date: string;
  signature: string;
  terms: string;
};

export type SignMeta = { ip: string; userAgent: string; origin: string };

/** ההצעות שמותר לחתום עליהן. שומר מפני בקשות לקבצים אחרים באתר. */
export const PROPOSALS: Record<string, { title: string; client: string }> = {
  'gia-hirshhorn': { title: 'הצעה לאתר · GAMA Architects', client: 'גיא הירשהורן' },
  'or-eisenstadt': { title: 'הצעה לאתר · אימון בשיטת סאטיה', client: 'אור איזנשטדט' },
};

const FIELD_ORDER = ['first_name', 'business', 'vat_id', 'email', 'date', 'signature'] as const;

function drawInField(
  page: PDFPage,
  rect: { x: number; y: number; width: number; height: number },
  text: string,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>
) {
  if (!text) return;
  const visual = toVisual(text, 'rtl');
  let s = size;
  let w = font.widthOfTextAtSize(visual, s);
  // אם הטקסט ארוך מהשדה, מקטינים עד שהוא נכנס
  while (w > rect.width - 4 && s > 6) {
    s -= 0.5;
    w = font.widthOfTextAtSize(visual, s);
  }
  page.drawText(visual, {
    x: rect.x + rect.width - w - 2, // יישור לימין
    y: rect.y + 5,
    size: s,
    font,
    color,
  });
}

/** ממלא את ה-PDF ומחזיר קובץ סגור */
export async function buildSignedPdf(
  templateBytes: ArrayBuffer,
  fontBytes: ArrayBuffer,
  data: SignPayload,
  meta: SignMeta,
  signedAt: Date
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(templateBytes);
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(fontBytes, { subset: true });
  const ink = rgb(0.957, 0.929, 0.882); // קרם, מתאים לרקע השחור
  const dim = rgb(0.63, 0.59, 0.53);

  const form = pdf.getForm();
  let sigPage: PDFPage | null = null;
  let lowestY = Number.POSITIVE_INFINITY;

  for (const name of FIELD_ORDER) {
    let field;
    try {
      field = form.getTextField(name);
    } catch {
      continue; // שדה שלא קיים בתבנית — מדלגים
    }
    const widgets = field.acroField.getWidgets();
    for (const w of widgets) {
      const r = w.getRectangle();
      const pageRef = w.P();
      const page =
        pdf.getPages().find((p) => p.ref === pageRef) ?? pdf.getPages()[pdf.getPageCount() - 1];
      sigPage = page;
      if (r.y < lowestY) lowestY = r.y;
      const size = name === 'signature' ? 17 : 12;
      drawInField(page, r, String((data as any)[name] ?? ''), font, size, ink);
    }
  }

  // חותמת אימות מתחת לשדות
  if (sigPage) {
    const stamp =
      `נחתם אלקטרונית · ${signedAt.toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })} · ` +
      `IP ${meta.ip} · ${data.email}`;
    const visual = toVisual(stamp, 'rtl');
    const size = 7.5;
    const w = font.widthOfTextAtSize(visual, size);
    const y = Math.max(lowestY - 22, 30);
    sigPage.drawText(visual, { x: 486 - w, y, size, font, color: dim });
  }

  // מוחקים את הטופס כדי שהמסמך יהיה סגור לעריכה
  try {
    form.flatten();
  } catch {
    // אם ההשטחה נכשלת (חסרות מראות לשדות), מוחקים את ה-AcroForm ידנית
    pdf.catalog.delete((pdf.catalog as any).context.obj('AcroForm').asName?.() ?? ('AcroForm' as any));
  }

  return pdf.save();
}

/** שולח את ההצעה החתומה לשני וללקוח */
export async function sendSignedEmail(args: {
  data: SignPayload;
  pdf: Uint8Array;
  fileName: string;
  signedAt: Date;
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.PROPOSAL_FROM_EMAIL;
  const notify = process.env.SHANI_NOTIFY_EMAIL;
  if (!key || !from || !notify) {
    return { ok: false, error: 'missing RESEND_API_KEY / PROPOSAL_FROM_EMAIL / SHANI_NOTIFY_EMAIL' };
  }

  const { data, pdf, fileName, signedAt } = args;
  const when = signedAt.toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
  const html = `
<div style="background:#0C0C11;padding:28px 16px;font-family:Arial,sans-serif;direction:rtl;text-align:right">
  <div style="max-width:600px;margin:0 auto">
    <div style="text-align:center;margin-bottom:18px">
      <div style="color:#F2622E;font-weight:700;font-size:12px;letter-spacing:3px">SHANI AI CREATOR</div>
    </div>
    <div style="background:#141009;border:1px solid rgba(242,98,46,.35);border-radius:14px;padding:26px 24px">
      <h2 style="color:#F2622E;font-size:18px;margin:0 0 12px">ההצעה נחתמה</h2>
      <p style="color:#e8e0d5;line-height:1.7;margin:0 0 14px">
        ההצעה החתומה מצורפת למייל הזה כקובץ PDF. עותק זהה נשלח לשני ולחותם.
      </p>
      <table style="color:#e8e0d5;font-size:14px;line-height:1.9;border-collapse:collapse">
        <tr><td style="color:#a09688;padding-left:14px">שם פרטי</td><td>${esc(data.first_name)}</td></tr>
        <tr><td style="color:#a09688;padding-left:14px">שם העסק</td><td>${esc(data.business)}</td></tr>
        <tr><td style="color:#a09688;padding-left:14px">מספר עוסק</td><td>${esc(data.vat_id)}</td></tr>
        <tr><td style="color:#a09688;padding-left:14px">אימייל</td><td>${esc(data.email)}</td></tr>
        <tr><td style="color:#a09688;padding-left:14px">חתימה</td><td>${esc(data.signature)}</td></tr>
        <tr><td style="color:#a09688;padding-left:14px">נחתם ב</td><td>${esc(when)}</td></tr>
      </table>
      <p style="color:#a09688;font-size:13px;line-height:1.7;margin:16px 0 0">${esc(data.terms)}</p>
    </div>
    <div style="text-align:center;margin-top:16px;color:#a09688;font-size:13px">
      וואטסאפ: 050-4744815 · <a href="https://shani-ai.com" style="color:#F2622E;text-decoration:none">shani-ai.com</a>
    </div>
  </div>
</div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [notify, data.email].filter(Boolean),
      subject: `הצעה חתומה · ${data.business || data.first_name}`,
      html,
      attachments: [{ filename: fileName, content: Buffer.from(pdf).toString('base64') }],
    }),
  });

  if (!res.ok) return { ok: false, error: `resend ${res.status}: ${await res.text()}` };
  const json = (await res.json()) as { id?: string };
  return { ok: true, id: json.id ?? '' };
}

/** רושם את החתימה. נכשל בשקט — לא מפיל את השליחה. */
export async function recordSignature(args: {
  data: SignPayload;
  meta: SignMeta;
  signedAt: Date;
  emailId: string | null;
  emailError: string | null;
}): Promise<void> {
  try {
    const { data, meta, signedAt, emailId, emailError } = args;
    await supabaseAdmin().from('signed_proposals').insert({
      slug: data.slug,
      first_name: data.first_name,
      business: data.business,
      vat_id: data.vat_id,
      email: data.email,
      signature: data.signature,
      terms: data.terms,
      signed_at: signedAt.toISOString(),
      ip: meta.ip,
      user_agent: meta.userAgent,
      email_id: emailId,
      email_error: emailError,
    });
  } catch {
    /* אין סופאבייס מוגדר, או שהטבלה חסרה — לא עוצרים את הזרימה */
  }
}

function esc(s: string): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}
