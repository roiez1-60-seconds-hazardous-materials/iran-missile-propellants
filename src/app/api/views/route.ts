import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Use free counter API — no setup needed
    const res = await fetch(
      'https://api.counterapi.dev/v1/iran-missile-propellants-60sec/visits/up',
      { cache: 'no-store' }
    );
    const data = await res.json();
    return NextResponse.json({ views: data?.count || 0 });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
