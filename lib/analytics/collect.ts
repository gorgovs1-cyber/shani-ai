import { supabaseAdmin } from './supabase';
import { fetchInstagram } from './instagram';
import { fetchWebsite } from './vercel';
import type { Snapshot, InstagramData, WebsiteData, Narrative } from './types';

// Runs the daily collection: pull both sources, carry the latest narrative forward
// (the Claude agent updates it separately), and insert one snapshot row.
// Each source is isolated so a failure on one side does not lose the other.
export async function collectAndStore(days = 7): Promise<Snapshot> {
  const until = new Date().toISOString().slice(0, 10);
  const since = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  let instagram: InstagramData;
  try {
    instagram = await fetchInstagram(days);
  } catch (e) {
    console.error('Instagram fetch failed:', (e as Error).message);
    instagram = emptyInstagram();
  }

  let website: WebsiteData;
  try {
    website = await fetchWebsite(days);
  } catch (e) {
    console.error('Vercel fetch failed:', (e as Error).message);
    website = emptyWebsite();
  }

  const narrative = await latestNarrative();

  const snapshot: Snapshot = {
    captured_at: new Date().toISOString(),
    since,
    until,
    instagram,
    website,
    narrative,
  };

  const db = supabaseAdmin();
  const { error } = await db.from('analytics_snapshots').insert({
    captured_at: snapshot.captured_at,
    since,
    until,
    instagram,
    website,
    narrative,
  });
  if (error) throw new Error(`Inserting snapshot failed: ${error.message}`);

  return snapshot;
}

export async function latestSnapshot(): Promise<Snapshot | null> {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from('analytics_snapshots')
    .select('captured_at, since, until, instagram, website, narrative')
    .order('captured_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(`Reading latest snapshot failed: ${error.message}`);
  return (data as Snapshot) ?? null;
}

async function latestNarrative(): Promise<Narrative | null> {
  const prev = await latestSnapshot();
  return prev?.narrative ?? null;
}

function emptyInstagram(): InstagramData {
  return {
    followers: null,
    views: null,
    reach: null,
    interactions: null,
    saves: null,
    shares: null,
    comments: null,
    daily_reach: [],
    top_posts: [],
  };
}

function emptyWebsite(): WebsiteData {
  return {
    visitors: null,
    pageviews: null,
    bounce_rate: null,
    daily: [],
    top_pages: [],
    sources: [],
  };
}
