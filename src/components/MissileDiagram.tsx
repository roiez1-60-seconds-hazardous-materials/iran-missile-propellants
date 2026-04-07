'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Part = { id: string; he: string; en: string; desc_he: string; desc_en: string; x: number; y: number; w: number; h: number; color: string };

const liquidParts: Part[] = [
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead', desc_he:'מילוי נפץ HE (TNT/RDX/HMX) או רש״ק מתמרן (MaRV). משקל 700–1,500 ק״ג', desc_en:'HE fill (TNT/RDX/HMX) or MaRV. Weight 700–1,500 kg', x:5, y:25, w:15, h:50, color:'#ef4444' },
  { id:'guidance', he:'מערכת הנחיה', en:'Guidance', desc_he:'INS אינרציאלי + GPS/GLONASS בטילים מתקדמים. מחשב טיסה', desc_en:'Inertial INS + GPS/GLONASS in advanced models. Flight computer', x:20, y:25, w:10, h:50, color:'#a855f7' },
  { id:'oxidizer', he:'מיכל מחמצן (IRFNA)', en:'Oxidizer Tank (IRFNA)', desc_he:'חומצה חנקתית מעושנת אדומה (AK-27). ~1.55 g/cm³. קורוזיבי ורעיל ביותר. מכיל HF כמעכב', desc_en:'Red Fuming Nitric Acid (AK-27). ~1.55 g/cm³. Highly corrosive & toxic. Contains HF inhibitor', x:30, y:15, w:20, h:35, color:'#f97316' },
  { id:'fuel', he:'מיכל דלק (UDMH/TM-185)', en:'Fuel Tank (UDMH/TM-185)', desc_he:'דימתילהידראזין (UDMH) או קרוסין TM-185. היפרגולי — מגע עם IRFNA = הצתה מיידית!', desc_en:'Dimethylhydrazine (UDMH) or TM-185 kerosene. Hypergolic — contact with IRFNA = instant ignition!', x:30, y:52, w:20, h:35, color:'#3b82f6' },
  { id:'pumps', he:'משאבות טורבו', en:'Turbopumps', desc_he:'מזרימות דלק ומחמצן בלחץ גבוה לתא הבעירה. מונעות ע״י גנרטור גז', desc_en:'Pump fuel & oxidizer at high pressure to combustion chamber. Gas generator driven', x:52, y:30, w:10, h:40, color:'#64748b' },
  { id:'chamber', he:'תא בעירה + נחיר', en:'Combustion Chamber + Nozzle', desc_he:'תגובה היפרגולית: IRFNA+UDMH→CO₂+H₂O+N₂. טמפרטורה ~3,000°C. נחיר De Laval מאיץ גזים', desc_en:'Hypergolic reaction: IRFNA+UDMH→CO₂+H₂O+N₂. ~3,000°C. De Laval nozzle accelerates gases', x:62, y:20, w:18, h:60, color:'#dc2626' },
  { id:'fins', he:'כנפוני ייצוב/הטיה', en:'Stabilization Fins', desc_he:'ייצוב אווירודינמי. בטילים מתקדמים (קיאם) — הוסרו ונוסף TVC', desc_en:'Aerodynamic stabilization. Advanced models (Qiam) — removed, TVC added', x:82, y:15, w:13, h:70, color:'#475569' },
];

const solidParts: Part[] = [
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead', desc_he:'מילוי RDX/HMX או רש״ק מתמרן (MaRV). ח׳ייבר שכן ופתאח — ראש קרב מתמרן', desc_en:'RDX/HMX fill or MaRV warhead. Kheibar Shekan & Fattah — maneuvering warhead', x:5, y:25, w:12, h:50, color:'#ef4444' },
  { id:'guidance', he:'מערכת הנחיה', en:'Guidance', desc_he:'INS + GPS. בסג׳יל — מערכת הנחיה סופית TVC בשלב 2', desc_en:'INS + GPS. Sejjil — terminal guidance with Stage 2 TVC', x:17, y:25, w:8, h:50, color:'#a855f7' },
  { id:'stage2', he:'שלב 2 — מנוע מוצק', en:'Stage 2 — Solid Motor', desc_he:'AP+HTPB+Al יצוק בתוך מעטפת המנוע. בעירה אחידה. כולל נחיר עם TVC', desc_en:'AP+HTPB+Al cast inside motor casing. Uniform burn. Includes nozzle with TVC', x:25, y:15, w:22, h:70, color:'#f59e0b' },
  { id:'interstage', he:'חיבור בין-שלבי', en:'Interstage', desc_he:'מנגנון הפרדה פירוטכני. מנתק שלב 1 לאחר שריפת הדלק', desc_en:'Pyrotechnic separation mechanism. Detaches Stage 1 after burnout', x:47, y:35, w:5, h:30, color:'#64748b' },
  { id:'stage1', he:'שלב 1 — מנוע מוצק ראשי', en:'Stage 1 — Primary Solid Motor', desc_he:'סוללת דלק מוצק AP(70%)+HTPB(15%)+Al(15%). יציקה בבורות תת-קרקעיים (6-10 ימים). מערבלים פלנטריים', desc_en:'Solid propellant grain AP(70%)+HTPB(15%)+Al(15%). Cast in underground pits (6-10 days). Planetary mixers', x:52, y:10, w:28, h:80, color:'#d97706' },
  { id:'nozzle', he:'נחיר + TVC', en:'Nozzle + TVC', desc_he:'נחיר דה-לאבל עם הטיית נחיר (Thrust Vector Control) לשליטה בכיוון הטיסה', desc_en:'De Laval nozzle with Thrust Vector Control for flight direction', x:80, y:25, w:15, h:50, color:'#dc2626' },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [hover, setHover] = useState<string|null>(null);
  const parts = mode === 'liquid' ? liquidParts : solidParts;
  const active = parts.find(p => p.id === hover);

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על חלק כדי ללמוד עליו' : 'Click a section to learn more'}</p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => { setMode('liquid'); setHover(null); }}
          className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${mode === 'liquid' ? 'bg-blue-800/60 text-blue-200 border-blue-600/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
          🔵 {h ? 'טיל נוזלי (שהאב-3)' : 'Liquid Missile (Shahab-3)'}
        </button>
        <button onClick={() => { setMode('solid'); setHover(null); }}
          className={`px-6 py-3 rounded-xl text-sm font-bold border transition-all ${mode === 'solid' ? 'bg-amber-800/60 text-amber-200 border-amber-600/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
          🟠 {h ? 'טיל מוצק (סג׳יל-2)' : 'Solid Missile (Sejjil-2)'}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-4 md:p-6">
        {/* SVG Diagram */}
        <div className="relative w-full" style={{ paddingBottom: '30%' }}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Missile body outline */}
            <defs>
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
            </defs>
            {/* Main body */}
            <rect x="3" y="20" width="92" height="60" rx="4" fill="url(#bodyGrad)" stroke="#4b5563" strokeWidth="0.5" />
            {/* Nose cone */}
            <polygon points="3,50 0,35 0,65" fill="#374151" stroke="#4b5563" strokeWidth="0.3" />
            {/* Nozzle */}
            <polygon points="95,30 100,20 100,80 95,70" fill="#1f2937" stroke="#4b5563" strokeWidth="0.3" />

            {/* Interactive sections */}
            {parts.map(p => (
              <g key={p.id}>
                <rect
                  x={p.x} y={p.y} width={p.w} height={p.h} rx="2"
                  fill={hover === p.id ? p.color + '60' : p.color + '25'}
                  stroke={hover === p.id ? p.color : p.color + '80'}
                  strokeWidth={hover === p.id ? '1' : '0.4'}
                  strokeDasharray={hover === p.id ? '' : '2,1'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHover(p.id)}
                  onClick={() => setHover(hover === p.id ? null : p.id)}
                />
                <text
                  x={p.x + p.w / 2} y={p.y + p.h / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={hover === p.id ? '#fff' : '#9ca3af'}
                  fontSize="2.5" fontWeight="bold"
                  className="pointer-events-none select-none"
                >
                  {h ? p.he.split('(')[0].trim().substring(0, 12) : p.en.split('(')[0].trim().substring(0, 12)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-4 rounded-xl p-5 border" style={{ borderColor: active.color + '60', backgroundColor: active.color + '10' }}>
              <h4 className="font-black text-lg text-slate-100 mb-2">{h ? active.he : active.en}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{h ? active.desc_he : active.desc_en}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-slate-500 py-6">
              {h ? '👆 לחצו על חלק בטיל כדי לראות פרטים' : '👆 Click a missile section to see details'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
