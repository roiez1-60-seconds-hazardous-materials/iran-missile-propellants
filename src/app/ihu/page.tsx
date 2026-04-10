'use client';
import { useState } from 'react';

export default function IHUPage() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0d1a', display: 'flex', flexDirection: 'column' }}>
      {/* Nav bar — matching missiles style */}
      <nav style={{
        height: 48, flexShrink: 0,
        background: 'rgba(13,13,26,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(200,164,78,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} dir="rtl">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontSize: 16 }}>🏠</span>
            <img src="/images/logo-60sec.png" alt="" style={{ width: 28, height: 28, borderRadius: 6 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', fontFamily: 'Heebo, sans-serif' }}>60 שניות חומ״ס</span>
          </a>
        </div>
      </nav>

      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, top: 48, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12, zIndex: 10,
        }}>
          <div style={{ fontSize: 32, animation: 'spin 1s linear infinite' }}>☠️</div>
          <p style={{ color: '#60a5fa', fontSize: 14, fontFamily: 'Heebo, sans-serif' }}>טוען...</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Original IHU app */}
      <iframe
        src="https://ihu-chemical-weapons.vercel.app/"
        style={{
          flex: 1, width: '100%', border: 'none',
          opacity: loading ? 0 : 1, transition: 'opacity 0.3s',
        }}
        onLoad={() => setLoading(false)}
        allow="fullscreen"
      />
    </div>
  );
}
