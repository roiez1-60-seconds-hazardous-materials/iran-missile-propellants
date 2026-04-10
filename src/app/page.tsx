'use client';
import { useState, useEffect } from 'react';

export default function Hub() {
  const [lang, setLang] = useState('he');
  const [views, setViews] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const he = lang === 'he';

  useEffect(() => { setMounted(true); fetch('https://api.counterapi.dev/v1/iran-missiles-60sec/visits/up',{cache:'no-store'}).then(r=>r.json()).then(d=>setViews(d.count||0)).catch(() => {}); }, []);

  const modules = [
    {
      id: 'missiles',icon: '🚀',
      title: he ? 'מערך ייצור הטילים והדלקים של איראן' : "Iran's Missile & Propellant Production",
      subtitle: he ? 'תיק מודיעין טכנולוגי-טקטי' : 'Tech-Tactical Intelligence Dossier',
      stats: he ? '18 סעיפים • 13 טילים • 6 מתקנים • ERG שטח' : '18 sections • 13 missiles • 6 facilities • ERG',
      href: '/missiles',
      gradient: 'linear-gradient(135deg, #0c1222 0%, #162040 50%, #1e3a5f 100%)',
      accent: '#c8a44e',
      tags: he ? ['טילים בליסטיים', 'דלקי טילים', 'חומ״ס', 'ERG 2024'] : ['Ballistic Missiles', 'Propellants', 'HazMat', 'ERG 2024'],
    },
    {
      id: 'ihu',icon: '☠️',
      title: he ? 'תוכנית הנשק הכימי של איראן — IHU' : "Iran's Chemical Weapons Program — IHU",
      subtitle: he ? 'מעבדות הנשק הכימי של משמרות המהפכה' : "IRGC Chemical Weapons Laboratories",
      stats: he ? '15 סעיפים • PBA/פנטניל • סימולציה • כרטיס חירום' : '15 sections • PBA/Fentanyl • Simulation • Emergency Card',
      href: '/ihu',
      gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1020 50%, #3b1530 100%)',
      accent: '#ef4444',
      tags: he ? ['חומרים מבוססי תרופות', 'פנטניל', 'קרפנטניל', 'טב״ק'] : ['Pharmaceutical Agents', 'Fentanyl', 'Carfentanil', 'CBRN'],
    },
  ];

  return (
    <div dir={he ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#060a14', position: 'relative', overflow: 'hidden' }}>
      {/* Background effects */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,164,78,0.06) 0%, transparent 70%)', filter: 'blur(60px)', animation: mounted ? 'float 8s ease-in-out infinite' : 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)', filter: 'blur(60px)', animation: mounted ? 'float 10s ease-in-out infinite reverse' : 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,164,78,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,78,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
          <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer"><img src="/images/logo-60sec.png" alt="" style={{ width: 36, height: 36, borderRadius: 8 }} /></a>
          <button onClick={() => setLang(l => l === 'he' ? 'en' : 'he')} style={{ padding: '6px 16px', fontSize: 12, fontWeight: 800, background: 'rgba(200,164,78,0.15)', color: '#c8a44e', border: '1px solid rgba(200,164,78,0.3)', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace' }}>{he ? 'EN' : 'עב'}</button>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
          <div style={{ display: 'inline-block', border: '1px solid rgba(200,164,78,0.3)', padding: '3px 18px', borderRadius: 2, color: '#c8a44e', fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', marginBottom: 16, fontFamily: 'monospace' }}>[ {he ? 'לא מסווג' : 'UNCLASSIFIED'} ]</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>{he ? '60 שניות של חומ״ס' : '60 Seconds HazMat'}</h1>
          <h2 style={{ fontSize: 'clamp(13px, 2.5vw, 18px)', fontWeight: 400, color: 'rgba(200,164,78,0.8)', marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>{he ? 'איומי הנשק של איראן: טילים, דלקים ונשק כימי' : "Iran's Weapon Threats: Missiles, Propellants & Chemical Weapons"}</h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', maxWidth: 400, margin: '0 auto 8px', lineHeight: 1.7 }}>{he ? 'רועי צוקרמן — מומחה לחומ״ס וטב״ק' : 'Roie Zukerman — HazMat & CBRN Expert'}</p>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #c8a44e, #e8d5a0)', margin: '0 auto', boxShadow: '0 0 10px rgba(200,164,78,0.3)' }} />
        </div>

        {/* Module cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 0 40px' }}>
          {modules.map((m, i) => (
            <a key={m.id} href={m.href} className="mod-card" style={{
              display: 'block', textDecoration: 'none', borderRadius: 16,
              background: m.gradient, border: `1px solid ${m.accent}30`,
              padding: 24, position: 'relative', overflow: 'hidden',
              boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 ${m.accent}20`,
              transition: 'all 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 150}ms`,
            }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle, ${m.accent}10 0%, transparent 70%)` }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 32, flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#ffffff', lineHeight: 1.3, marginBottom: 4, fontFamily: "'Heebo', sans-serif" }}>{m.title}</h3>
                    <p style={{ fontSize: 12, color: `${m.accent}cc`, fontWeight: 500 }}>{m.subtitle}</p>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontFamily: 'monospace' }}>{m.stats}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {m.tags.map(t => (<span key={t} style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: `${m.accent}12`, color: `${m.accent}bb`, border: `1px solid ${m.accent}20` }}>{t}</span>))}
                </div>
                <div style={{ position: 'absolute', bottom: 0, [he ? 'left' : 'right']: 0, fontSize: 20, color: `${m.accent}50` }}>{he ? '←' : '→'}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px 0 40px', borderTop: '1px solid rgba(200,164,78,0.1)' }}>
          {views !== null && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }}><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>👁️</span><span style={{ fontSize: 13, fontWeight: 700, color: '#c8a44e', fontFamily: 'monospace' }}>{views.toLocaleString()}</span><span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{he ? 'צפיות' : 'views'}</span></div>}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}><img src="/images/logo-60sec.png" alt="" style={{ width: 24, height: 24, borderRadius: 4 }} /><span style={{ fontSize: 12, fontWeight: 700, color: '#c8a44e' }}>60 {he ? 'שניות חומ״ס' : 'Seconds HazMat'}</span></div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}><b style={{ color: 'rgba(255,255,255,0.6)' }}>{he ? 'רועי צוקרמן' : 'Roie Zukerman'}</b> — {he ? 'מומחה לחומ״ס וטב״ק' : 'HazMat & CBRN Expert'}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 12 }}><a href="mailto:roiez1@gmail.com" style={{ fontSize: 11, color: '#c8a44e', textDecoration: 'none' }}>✉️ roiez1@gmail.com</a><a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#22c55e', textDecoration: 'none' }}>💬 WhatsApp</a></div>
          <div style={{ maxWidth: 350, margin: '0 auto', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 9, color: '#c8a44e', fontWeight: 700, marginBottom: 3 }}>© 2026 {he ? 'רועי צוקרמן — מומחה לחומ״ס וטב״ק' : 'Roie Zukerman — HazMat & CBRN Expert'}</p>
            <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{he ? 'כל הזכויות שמורות. מבוסס על מקורות פתוחים בלבד. למטרות מקצועיות והדרכתיות. אין להשתמש ללא אישור בכתב.' : 'All rights reserved. Open sources only. Professional & educational use. Written permission required.'}</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .mod-card:hover { transform: translateY(-4px) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1) !important; }
      `}</style>
    </div>
  );
}
