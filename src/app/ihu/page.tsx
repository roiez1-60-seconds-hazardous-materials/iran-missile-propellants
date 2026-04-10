'use client';
import { useState } from 'react';

export default function IHUPage() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('he');
  const [menuOpen, setMenuOpen] = useState(false);
  const he = lang === 'he';
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0d1a', display: 'flex', flexDirection: 'column' }}>
      {/* Nav — PIXEL-IDENTICAL to missiles */}
      <nav style={{
        height: 48, flexShrink: 0, zIndex: 100,
        background: 'rgba(250,247,240,0.85)',
        backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        borderBottom: '1px solid rgba(200,164,78,0.12)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
        padding: '0 16px', direction: 'rtl',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Right: home + logo + name */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 16 }}>🏠</span>
          <img src="/images/logo-60sec.png" alt="" style={{ width: 30, height: 30, borderRadius: 6 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', fontFamily: "'Heebo', sans-serif" }}>
            {he ? '60 שניות חומ״ס' : '60 Sec HazMat'}
          </span>
        </a>
        {/* Left: EN + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setLang(l => {
            const next = l === 'he' ? 'en' : 'he';
            const iframe = document.querySelector('iframe');
            if (iframe?.contentWindow) iframe.contentWindow.postMessage({type:'setLang',lang:next},'*');
            return next;
          })} style={{
            padding: '5px 14px', fontSize: 11, fontWeight: 800,
            background: '#0c1222', color: '#c8a44e',
            border: 'none', borderRadius: 4, cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
          }}>{he ? 'EN' : 'עב'}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: 22, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 51, left: 0, right: 0, zIndex: 99,
          background: '#fff', borderBottom: '1px solid #e2e0d8',
          padding: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}>
          <a href="/" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: '#1e293b', textDecoration: 'none' }}>🏠 {he ? 'מסך ראשי' : 'Home'}</a>
          <a href="/missiles" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: '#1e293b', textDecoration: 'none' }}>🚀 {he ? 'טילים ודלקים' : 'Missiles & Propellants'}</a>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ position: 'absolute', inset: 0, top: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, zIndex: 10 }}>
          <div style={{ fontSize: 32, animation: 'spin 1s linear infinite' }}>☠️</div>
          <p style={{ color: '#60a5fa', fontSize: 14, fontFamily: "'Heebo', sans-serif" }}>{he ? 'טוען...' : 'Loading...'}</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* IHU app — hide its navbar by offsetting MORE */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src={`https://ihu-chemical-weapons.vercel.app/?lang=${lang}`}
          style={{
            width: '100%', height: 'calc(100% + 80px)',
            border: 'none', position: 'absolute',
            top: -80,
            opacity: loading ? 0 : 1, transition: 'opacity 0.3s',
          }}
          onLoad={() => setLoading(false)}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
