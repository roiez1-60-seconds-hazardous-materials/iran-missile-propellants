import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מעבדות הנשק הכימי של משמרות המהפכה | דו"ח מודיעיני',
  description: 'Anatomy of a Threat: The IRGC Chemical Weapons Laboratories at Imam Hossein University',
};

export default function IHULayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      dir="rtl" 
      className="ihu-root"
      style={{ 
        background: '#0d0d1a', 
        color: '#e2e8f0', 
        minHeight: '100vh',
        fontFamily: 'Heebo, Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .ihu-root, .ihu-root * { box-sizing: border-box; }
        .ihu-root section { max-width: 100vw; overflow-x: hidden; scroll-margin-top: 64px; background: transparent !important; border: none !important; animation: none !important; }
        .ihu-root .cm { background: transparent !important; border: none !important; box-shadow: none !important; }
        .ihu-root .cm:hover { transform: none !important; }
        .ihu-root .nv { display: none !important; }
        .ihu-root ::-webkit-scrollbar { width: 6px; }
        .ihu-root ::-webkit-scrollbar-track { background: #0d0d1a; }
        .ihu-root ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 3px; }
        .ihu-root .sf { font-family: Heebo, Inter, sans-serif !important; }
        .ihu-root .mn { font-family: 'JetBrains Mono', monospace !important; }
        .ihu-root .gr { display: none !important; }
        .ihu-root p, .ihu-root h1, .ihu-root h2, .ihu-root h3, .ihu-root h4 { color: inherit; }
      `}</style>
      {children}
    </div>
  );
}
