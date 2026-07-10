import { NextResponse } from 'next/server';
import { authorizeUrl } from '@/lib/analytics/instagram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Start the Instagram OAuth flow. Open /api/auth/instagram in a browser once to connect.
export async function GET(): Promise<Response> {
  try {
    return NextResponse.redirect(authorizeUrl());
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
