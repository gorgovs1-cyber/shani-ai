import { NextResponse } from 'next/server';
import { collectAndStore } from '@/lib/analytics/collect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Daily refresh. Protected by CRON_SECRET so only Vercel Cron (or you) can trigger it.
// Vercel Cron sends Authorization: Bearer <CRON_SECRET> automatically when the env var is set.
export async function GET(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  const url = new URL(req.url);
  const provided = auth?.replace('Bearer ', '') ?? url.searchParams.get('secret');

  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  try {
    const snapshot = await collectAndStore(7);
    return NextResponse.json({
      ok: true,
      captured_at: snapshot.captured_at,
      instagram_views: snapshot.instagram.views,
      website_visitors: snapshot.website.visitors,
    });
  } catch (e) {
    console.error('cron refresh failed:', (e as Error).message);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
