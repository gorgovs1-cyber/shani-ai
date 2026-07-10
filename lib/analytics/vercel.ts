import type { WebsiteData } from './types';

// Vercel Web Analytics API.
// Docs: https://vercel.com/docs/analytics/web-analytics-api
const BASE = 'https://api.vercel.com/v1/query/web-analytics';

function common(): { token: string; projectId: string; teamId?: string } {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    throw new Error('Missing VERCEL_TOKEN or VERCEL_PROJECT_ID');
  }
  const teamId = process.env.VERCEL_TEAM_ID || undefined;
  return { token, projectId, teamId };
}

async function query<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  const { token, projectId, teamId } = common();
  const qs = new URLSearchParams({ projectId, ...params });
  if (teamId) qs.set('teamId', teamId);
  const res = await fetch(`${BASE}/${endpoint}?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Vercel ${endpoint} failed: ${JSON.stringify(json)}`);
  }
  return json as T;
}

// since/until as YYYY-MM-DD, inclusive window.
export async function fetchWebsite(days = 7): Promise<WebsiteData> {
  const until = new Date().toISOString().slice(0, 10);
  const since = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  // Totals for the window.
  const count = await query<{ data: { pageviews: number; visitors: number } }>(
    'visits/count',
    { since, until },
  );

  // Daily trend.
  const daily = await query<{
    data: { timestamp: string; pageviews: number; visitors: number }[];
  }>('visits/aggregate', { since, until, by: 'day' });

  // Top pages.
  const pages = await query<{
    data: { requestPath: string; pageviews: number; visitors: number }[];
  }>('visits/aggregate', { since, until, by: 'requestPath', limit: '5' });

  // Traffic sources by referrer host. Empty host means direct.
  const refs = await query<{
    data: { referrerHostname: string | null; pageviews: number; visitors: number }[];
  }>('visits/aggregate', { since, until, by: 'referrerHostname', limit: '6' });

  return {
    visitors: count.data?.visitors ?? null,
    pageviews: count.data?.pageviews ?? null,
    bounce_rate: null, // not exposed by the API, shown as ממתין in the UI
    daily: (daily.data ?? []).map((r) => ({
      date: r.timestamp.slice(0, 10),
      visitors: r.visitors,
      pageviews: r.pageviews,
    })),
    top_pages: (pages.data ?? []).map((r) => ({
      path: r.requestPath,
      pageviews: r.pageviews,
      visitors: r.visitors,
    })),
    sources: (refs.data ?? []).map((r) => ({
      name: r.referrerHostname ? sourceName(r.referrerHostname) : 'ישיר',
      visitors: r.visitors,
    })),
  };
}

function sourceName(host: string): string {
  const h = host.toLowerCase();
  if (h.includes('instagram')) return 'אינסטגרם';
  if (h.includes('google')) return 'חיפוש';
  if (h.includes('facebook')) return 'פייסבוק';
  if (h.includes('linkedin')) return 'לינקדאין';
  return host;
}
