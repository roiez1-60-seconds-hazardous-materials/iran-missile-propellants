import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://dmgxvcvjzgmorfibvezr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';
const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Step 1: Read current count
    const readRes = await fetch(
      `${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles&select=views`,
      { headers, cache: 'no-store' }
    );
    const rows = await readRes.json();
    const current = rows?.[0]?.views || 0;

    // Step 2: Increment
    const newCount = current + 1;
    await fetch(
      `${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ views: newCount }),
      }
    );

    return NextResponse.json({ views: newCount });
  } catch (e) {
    return NextResponse.json({ views: 0 });
  }
}
