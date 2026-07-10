import { NextResponse } from 'next/server';
import { latestSnapshot } from '@/lib/analytics/collect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Returns the latest stored snapshot as JSON. The dashboard page fetches this.
export async function GET(): Promise<Response> {
  try {
    const snapshot = await latestSnapshot();
    if (!snapshot) {
      return NextResponse.json({ ok: false, error: 'no snapshot yet' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, snapshot });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
