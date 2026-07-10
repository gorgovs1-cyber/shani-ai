import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-only admin client. Uses the service role key, so never import this into a
// client component. It bypasses RLS, which is why both tables have RLS on with no
// public policies: only this key can touch them.
let cached: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}
