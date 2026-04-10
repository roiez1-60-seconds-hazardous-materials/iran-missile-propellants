import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://dmgxvcvjzgmorfibvezr.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || '';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const h = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    };

    // Try RPC first
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_views`, {
      method: 'POST', headers: h,
      body: JSON.stringify({ app_name: 'iran-missiles' }),
      cache: 'no-store',
    });
    
    // If RPC fails, try direct PATCH
    if (!rpcRes.ok) {
      // Read
      const readRes = await fetch(
        `${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles&select=views`,
        { headers: h, cache: 'no-store' }
      );
      const rows = await readRes.json();
      const current = rows?.[0]?.views || 0;

      // Patch
      await fetch(
        `${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles`,
        { method: 'PATCH', headers: h, body: JSON.stringify({ views: current + 1 }) }
      );
      
      return NextResponse.json({ views: current + 1, method: 'patch' });
    }

    // Read after RPC
    const readRes = await fetch(
      `${SUPABASE_URL}/rest/v1/app_views?app_name=eq.iran-missiles&select=views`,
      { headers: h, cache: 'no-store' }
    );
    const rows = await readRes.json();
    return NextResponse.json({ views: rows?.[0]?.views || 0, method: 'rpc' });
  } catch (e: any) {
    return NextResponse.json({ views: 0, error: e?.message || 'unknown' });
  }
}
