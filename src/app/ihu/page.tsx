'use client';
import { useState } from 'react';

export default function IHUPage() {
  const [loading, setLoading] = useState(true);
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0d0d1a' }}>
      {/* Back to hub button */}
      <a href="/" style={{
        position: 'fixed', top: 12, left: 12, zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 10,
        background: 'rgba(13,13,26,0.9)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(59,130,246,0.3)',
        color: '#60a5fa', fontSize: 12, fontWeight: 700,
        textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        transition: 'all 0.2s',
      }}>
        🏠 חזרה
      </a>

      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12, zIndex: 10,
        }}>
          <div style={{ fontSize: 32, animation: 'spin 1s linear infinite' }}>☠️</div>
          <p style={{ color: '#60a5fa', fontSize: 14 }}>טוען מודול IHU...</p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Original IHU app in iframe */}
      <iframe
        src="https://ihu-chemical-weapons.vercel.app/"
        style={{
          width: '100%', height: '100%', border: 'none',
          opacity: loading ? 0 : 1, transition: 'opacity 0.3s',
        }}
        onLoad={() => setLoading(false)}
        allow="fullscreen"
      />
    </div>
  );
}
