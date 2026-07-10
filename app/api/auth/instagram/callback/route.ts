import { NextResponse } from 'next/server';
import { exchangeCodeAndStore } from '@/lib/analytics/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Instagram redirects here with ?code=... after the user approves.
// We exchange it for a long-lived token and store it, then send you to the dashboard.
export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error_description') || url.searchParams.get('error');

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ ok: false, error: 'missing code' }, { status: 400 });
  }

  try {
    await exchangeCodeAndStore(code);
    return NextResponse.redirect(new URL('/dashboard.html?connected=1', url.origin));
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
