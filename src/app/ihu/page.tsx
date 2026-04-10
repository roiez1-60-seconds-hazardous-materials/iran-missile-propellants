'use client';
import { useState } from 'react';

export default function IHUPage() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('he');
  const he = lang === 'he';
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0d1a', display: 'flex', flexDirection: 'column' }}>
      {/* Nav — IDENTICAL to missiles */}
      <nav style={{
        height: 48, flexShrink: 0,
        background: 'rgba(250,247,240,0.85)', backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        borderBottom: '1px solid rgba(200,164,78,0.12)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', zIndex: 100, direction: 'rtl',
      }}>
        {/* Right side — logo + name */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 14 }}>🏠</span>
          <img src="/images/logo-60sec.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#64748b', fontFamily: "'Heebo', sans-serif" }}>{he ? '60 שניות חומ״ס' : '60 Sec HazMat'}</span>
        </a>
        {/* Left side — EN button */}
        <button onClick={() => setLang(l => l === 'he' ? 'en' : 'he')} style={{
          padding: '5px 12px', fontSize: 11, fontWeight: 800,
          background: '#0c1222', color: '#c8a44e',
          border: 'none', borderRadius: 4, cursor: 'pointer',
          fontFamily: "'JetBrains Mono', monospace",
        }}>{he ? 'EN' : 'עב'}</button>
      </nav>

      {/* Loading */}
      {loading && (
        <div style={{ position: 'absolute', inset: 0, top: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, zIndex: 10 }}>
          <div style={{ fontSize: 32, animation: 'spin 1s linear infinite' }}>☠️</div>
          <p style={{ color: '#60a5fa', fontSize: 14, fontFamily: "'Heebo', sans-serif" }}>{he ? 'טוען...' : 'Loading...'}</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* IHU app — offset to hide IHU's own navbar */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src="https://ihu-chemical-weapons.vercel.app/"
          style={{
            width: '100%', height: 'calc(100% + 64px)',
            border: 'none', position: 'absolute',
            top: -64,
            opacity: loading ? 0 : 1, transition: 'opacity 0.3s',
          }}
          onLoad={() => setLoading(false)}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
