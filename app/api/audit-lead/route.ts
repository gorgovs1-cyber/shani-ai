import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/analytics/supabase';
import {
  parseAuditLead,
  postLeadSheet,
  sendAlertEmail,
  sendThankYouEmail,
  type AuditLead,
} from '@/lib/leads/audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const COLUMNS =
  'id, submission_id, name, email, phone, business, answers, notes, alert_email_id, thankyou_email_id, email_error, sheet_ok';

type LeadRow = {
  id: string;
  submission_id: string;
  name: string;
  email: string;
  phone: string;
  business: string | null;
  answers: Record<string, string>;
  notes: string | null;
  alert_email_id: string | null;
  thankyou_email_id: string | null;
  email_error: string | null;
  sheet_ok: boolean;
};

/**
 * קבלת ליד מטופס בדיקת ההתאמה.
 * שומר בסופאבייס, שולח התראה ותודה, ומעדכן גיליון אם הוגדר.
 * כישלון של הגיליון לא מפיל את הבקשה. כפילות לפי submissionId לא שולחת מייל שוב.
 */
export async function POST(req: Request): Promise<Response> {
  const raw = await req.text();
  if (raw.length > 50_000) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  const parsed = parseAuditLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  try {
    const row = await saveLead(parsed.lead);
    const lead = leadFromRow(row, parsed.lead);
    let alertId = row.alert_email_id;
    let thankYouId = row.thankyou_email_id;
    let emailError = row.email_error;
    let sheetOk = row.sheet_ok;

    if (!alertId) {
      const alert = await sendAlertEmail(lead);
      if (alert.ok) {
        alertId = alert.id || 'sent';
        emailError = null;
      } else {
        emailError = alert.error;
        console.error('[audit-lead] alert email failed', alert.error);
      }
    }

    if (alertId && !thankYouId) {
      const thanks = await sendThankYouEmail(lead);
      if (thanks.ok) thankYouId = thanks.id || 'sent';
      else {
        emailError = thanks.error;
        console.error('[audit-lead] thank-you email failed', thanks.error);
      }
    }

    if (!sheetOk) {
      sheetOk = await postLeadSheet(lead);
    }

    const { error: patchError } = await supabaseAdmin()
      .from('leads')
      .update({
        alert_email_id: alertId,
        thankyou_email_id: thankYouId,
        email_error: emailError,
        sheet_ok: sheetOk,
      })
      .eq('id', row.id);
    if (patchError) console.error('[audit-lead] status update failed', patchError.message);

    if (!alertId) {
      return NextResponse.json({ ok: false, error: 'email' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[audit-lead] store failed', err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: 'store' }, { status: 500 });
  }
}

async function saveLead(lead: AuditLead): Promise<LeadRow> {
  const db = supabaseAdmin();
  const insert = {
    submission_id: lead.submissionId,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    business: lead.business || null,
    answers: lead.answers,
    notes: lead.notes,
  };
  const { data, error } = await db.from('leads').insert(insert).select(COLUMNS).single();
  if (!error && data) return data as LeadRow;
  if (!isDuplicate(error)) {
    throw new Error(error?.message || 'insert failed');
  }

  const { data: existing, error: readError } = await db
    .from('leads')
    .select(COLUMNS)
    .eq('submission_id', lead.submissionId)
    .single();
  if (readError || !existing) throw new Error(readError?.message || 'duplicate read failed');
  const current = existing as LeadRow;
  if (current.alert_email_id) return current;

  const { data: updated, error: updateError } = await db
    .from('leads')
    .update({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      business: lead.business || null,
      answers: lead.answers,
      notes: lead.notes,
    })
    .eq('id', current.id)
    .select(COLUMNS)
    .single();
  if (updateError || !updated) throw new Error(updateError?.message || 'update failed');
  return updated as LeadRow;
}

function leadFromRow(row: LeadRow, fallback: AuditLead): AuditLead {
  const answers =
    row.answers && typeof row.answers === 'object' && !Array.isArray(row.answers)
      ? row.answers
      : fallback.answers;
  return {
    submissionId: row.submission_id || fallback.submissionId,
    answers,
    name: row.name || fallback.name,
    email: row.email || fallback.email,
    phone: row.phone || fallback.phone,
    business: row.business || fallback.business,
    notes: row.notes || fallback.notes,
  };
}

function isDuplicate(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === '23505' || /duplicate key/i.test(error.message || '');
}
