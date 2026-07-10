import { supabaseAdmin } from './supabase';
import type { InstagramData, TopPost } from './types';

// Instagram API with Instagram Login. All data and token calls go to graph.instagram.com;
// the OAuth authorize and code-exchange calls go to api.instagram.com.
const GRAPH = 'https://graph.instagram.com';
const OAUTH = 'https://api.instagram.com';

// ---- OAuth helpers (used by the auth routes) ----

export function authorizeUrl(): string {
  const appId = requireEnv('INSTAGRAM_APP_ID');
  const redirect = requireEnv('INSTAGRAM_REDIRECT_URI');
  const scope = 'instagram_business_basic,instagram_business_manage_insights';
  const p = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirect,
    response_type: 'code',
    scope,
  });
  return `${OAUTH}/oauth/authorize?${p.toString()}`;
}

// Exchange the one-time code for a short-lived token, then upgrade to a 60-day token
// and store it. Called once from the OAuth callback.
export async function exchangeCodeAndStore(code: string): Promise<void> {
  const appId = requireEnv('INSTAGRAM_APP_ID');
  const secret = requireEnv('INSTAGRAM_APP_SECRET');
  const redirect = requireEnv('INSTAGRAM_REDIRECT_URI');

  const form = new URLSearchParams({
    client_id: appId,
    client_secret: secret,
    grant_type: 'authorization_code',
    redirect_uri: redirect,
    code,
  });
  const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  const shortJson = await shortRes.json();
  if (!shortRes.ok || !shortJson.access_token) {
    throw new Error(`IG code exchange failed: ${JSON.stringify(shortJson)}`);
  }

  const longUrl =
    `${GRAPH}/access_token?grant_type=ig_exchange_token` +
    `&client_secret=${encodeURIComponent(secret)}` +
    `&access_token=${encodeURIComponent(shortJson.access_token)}`;
  const longRes = await fetch(longUrl);
  const longJson = await longRes.json();
  if (!longRes.ok || !longJson.access_token) {
    throw new Error(`IG long-lived exchange failed: ${JSON.stringify(longJson)}`);
  }

  await storeToken(longJson.access_token, longJson.token_type, longJson.expires_in);
}

// Returns a valid long-lived token, refreshing it if it expires within 7 days.
export async function getValidToken(): Promise<string> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('ig_tokens')
    .select('access_token, expires_at')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw new Error(`Reading ig_tokens failed: ${error.message}`);
  if (!data?.access_token) {
    throw new Error('No Instagram token stored. Connect the account at /api/auth/instagram first.');
  }

  const expiresAt = data.expires_at ? new Date(data.expires_at).getTime() : 0;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  if (expiresAt - Date.now() < sevenDays) {
    const url = `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(data.access_token)}`;
    const res = await fetch(url);
    const json = await res.json();
    if (res.ok && json.access_token) {
      await storeToken(json.access_token, json.token_type, json.expires_in);
      return json.access_token;
    }
    // Refresh failed (for example token already expired). Fall back to the stored one
    // so a single bad day does not blank the dashboard, and surface it in logs.
    console.error('IG token refresh failed:', JSON.stringify(json));
  }
  return data.access_token;
}

async function storeToken(token: string, tokenType?: string, expiresIn?: number): Promise<void> {
  const db = supabaseAdmin();
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000).toISOString() : null;
  const { error } = await db.from('ig_tokens').upsert({
    id: 1,
    access_token: token,
    token_type: tokenType ?? null,
    expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Storing ig_token failed: ${error.message}`);
}

// ---- Data fetch ----

type IgMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  timestamp?: string;
  permalink?: string;
  like_count?: number;
  comments_count?: number;
};

// Pulls recent media (default last 7 days), reads per-media insights, and aggregates
// them into the headline numbers. Followers come from the account node. Account-level
// insight metric names change between API versions, so we derive totals from media
// insights instead, which is far more stable.
export async function fetchInstagram(days = 7): Promise<InstagramData> {
  const token = await getValidToken();

  const me = await ig<{ id?: string; user_id?: string; followers_count?: number }>(
    `/me`,
    { fields: 'id,username,followers_count,media_count,account_type', access_token: token },
  );
  const igId = me.id ?? me.user_id;

  const mediaList = await ig<{ data: IgMedia[] }>(`/${igId}/media`, {
    fields: 'id,caption,media_type,media_product_type,timestamp,permalink,like_count,comments_count',
    limit: '25',
    access_token: token,
  });

  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const recent = (mediaList.data ?? []).filter(
    (m) => m.timestamp && new Date(m.timestamp).getTime() >= cutoff,
  );

  let views = 0,
    reach = 0,
    saves = 0,
    shares = 0,
    comments = 0,
    interactions = 0;
  const dailyReachMap = new Map<string, number>();
  const posts: TopPost[] = [];

  for (const m of recent) {
    const ins = await mediaInsights(m.id, token);
    const mReach = ins.reach ?? 0;
    const mViews = ins.views ?? 0;
    const mSaves = ins.saved ?? 0;
    const mShares = ins.shares ?? 0;
    const mComments = m.comments_count ?? ins.comments ?? 0;

    views += mViews;
    reach += mReach;
    saves += mSaves;
    shares += mShares;
    comments += mComments;
    interactions += ins.total_interactions ?? (m.like_count ?? 0) + mComments + mSaves + mShares;

    if (m.timestamp) {
      const day = m.timestamp.slice(0, 10);
      dailyReachMap.set(day, (dailyReachMap.get(day) ?? 0) + mReach);
    }

    posts.push({
      title: cleanCaption(m.caption),
      type: postType(m),
      views: ins.views ?? null,
      saves: ins.saved ?? null,
      shares: ins.shares ?? null,
      comments: mComments,
      reach: ins.reach ?? null,
      permalink: m.permalink,
    });
  }

  const daily_reach = fillDays(days, dailyReachMap);
  const top_posts = posts
    .sort((a, b) => (b.reach ?? 0) - (a.reach ?? 0))
    .slice(0, 3);

  return {
    followers: me.followers_count ?? null,
    views: recent.length ? views : null,
    reach: recent.length ? reach : null,
    interactions: recent.length ? interactions : null,
    saves: recent.length ? saves : null,
    shares: recent.length ? shares : null,
    comments: recent.length ? comments : null,
    daily_reach,
    top_posts,
  };
}

type MediaInsight = {
  reach?: number;
  views?: number;
  saved?: number;
  shares?: number;
  comments?: number;
  total_interactions?: number;
};

// Requests a superset of metrics. Some do not exist for every media type or version,
// so on error we retry with a smaller, safe set rather than failing the whole run.
async function mediaInsights(mediaId: string, token: string): Promise<MediaInsight> {
  const primary = 'reach,views,saved,shares,total_interactions,comments';
  const fallback = 'reach,saved,shares';
  for (const metric of [primary, fallback]) {
    try {
      const res = await ig<{ data: { name: string; values?: { value: number }[]; total_value?: { value: number } }[] }>(
        `/${mediaId}/insights`,
        { metric, access_token: token },
      );
      const out: MediaInsight = {};
      for (const row of res.data ?? []) {
        const v = row.total_value?.value ?? row.values?.[0]?.value ?? 0;
        (out as Record<string, number>)[row.name] = v;
      }
      return out;
    } catch (e) {
      if (metric === fallback) {
        console.error(`media insights failed for ${mediaId}:`, (e as Error).message);
        return {};
      }
    }
  }
  return {};
}

// ---- small helpers ----

async function ig<T>(path: string, params: Record<string, string>): Promise<T> {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${GRAPH}${path}?${qs}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`IG ${path} failed: ${JSON.stringify(json)}`);
  }
  return json as T;
}

function postType(m: IgMedia): string {
  const t = (m.media_product_type || m.media_type || '').toUpperCase();
  if (t.includes('REEL')) return 'רייל';
  if (t.includes('CAROUSEL')) return 'קרוסלה';
  return 'פוסט';
}

function cleanCaption(caption?: string): string {
  if (!caption) return 'ללא כיתוב';
  const firstLine = caption.split('\n')[0].trim();
  return firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine || 'ללא כיתוב';
}

function fillDays(days: number, map: Map<string, number>): { date: string; reach: number }[] {
  const out: { date: string; reach: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    out.push({ date: d, reach: map.get(d) ?? 0 });
  }
  return out;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}
