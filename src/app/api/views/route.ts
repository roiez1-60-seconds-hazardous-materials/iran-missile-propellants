import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://dmgxvcvjzgmorfibvezr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';

export async function GET() {
  try {
    // Increment view count
    const { data } = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_views`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ app_name: 'iran-missiles' }),
    }).then(r => r.json()).catch(() => ({ data: null }));

    // Get current count
    const res = await fetch(`${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles&select=views`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    const rows = await res.json();
    const views = rows?.[0]?.views || 0;
    return NextResponse.json({ views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
