'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Zone = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string; path:string; labelX:number; labelY:number };

const liquidZones: Zone[] = [
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead (HE/MaRV)', desc_he:'מילוי נפץ TNT/RDX/HMX או ראש קרב מתמרן (MaRV). 700–1,500 ק״ג. בעמאד וח׳ורמשהר — MaRV עם שליטה אווירודינמית', desc_en:'HE fill TNT/RDX/HMX or MaRV warhead. 700–1,500 kg. Emad & Khorramshahr — MaRV with aerodynamic control', color:'#ef4444', path:'M 40,50 L 80,30 L 80,70 Z', labelX:55, labelY:50 },
  { id:'guidance', he:'בקרה והנחיה', en:'Guidance & Control', desc_he:'מערכת INS אינרציאלית + GPS/GLONASS (בגדר, עמאד). מחשב טיסה, ג׳ירוסקופים, מד תאוצה', desc_en:'INS inertial + GPS/GLONASS (Ghadr, Emad). Flight computer, gyroscopes, accelerometer', color:'#a855f7', path:'M 80,30 L 120,30 L 120,70 L 80,70 Z', labelX:100, labelY:50 },
  { id:'oxidizer', he:'מיכל מחמצן — IRFNA', en:'Oxidizer Tank — IRFNA', desc_he:'חומצה חנקתית מעושנת אדומה (AK-27). 73% HNO₃ + 27% N₂O₄ + 0.6% HF. צפיפות 1.55. קורוזיבי — מיכל טיטניום/אל-חלד', desc_en:'Red Fuming Nitric Acid (AK-27). 73% HNO₃ + 27% N₂O₄ + 0.6% HF. 1.55 density. Corrosive — Ti/SS tank', color:'#f97316', path:'M 120,28 L 220,28 L 220,48 L 120,48 Z', labelX:170, labelY:38 },
  { id:'fuel', he:'מיכל דלק — TM-185/UDMH', en:'Fuel Tank — TM-185/UDMH', desc_he:'קרוסין TM-185 (שהאב) או UDMH (ח׳ורמשהר). היפרגולי — מגע עם IRFNA = הצתה מיידית ללא ניצוץ!', desc_en:'TM-185 kerosene (Shahab) or UDMH (Khorramshahr). Hypergolic — IRFNA contact = instant ignition!', color:'#3b82f6', path:'M 120,52 L 220,52 L 220,72 L 120,72 Z', labelX:170, labelY:62 },
  { id:'pumps', he:'משאבות טורבו', en:'Turbopumps', desc_he:'מזרימות דלק ומחמצן בלחץ של עשרות אטמוספירות. גנרטור גז מניע טורבינה', desc_en:'Pump fuel & oxidizer at tens of atmospheres. Gas generator drives turbine', color:'#64748b', path:'M 220,35 L 245,35 L 245,65 L 220,65 Z', labelX:232, labelY:50 },
  { id:'engine', he:'תא בעירה + נחיר', en:'Combustion Chamber + Nozzle', desc_he:'תגובה היפרגולית: ~3,000°C. נחיר De Laval ממיר לחץ למהירות על-קולית. כוח דחף ~13 טון', desc_en:'Hypergolic reaction: ~3,000°C. De Laval nozzle converts pressure to supersonic velocity. ~13 ton thrust', color:'#dc2626', path:'M 245,32 L 275,32 L 290,20 L 290,80 L 275,68 L 245,68 Z', labelX:267, labelY:50 },
  { id:'fins', he:'כנפוני ייצוב', en:'Stabilizer Fins', desc_he:'4 כנפונים אווירודינמיים. בקיאם — הוסרו ונוסף TVC (שליטת וקטור דחף). מפחית חתך רדאר', desc_en:'4 aerodynamic fins. Qiam — removed, TVC added. Reduces radar cross-section', color:'#475569', path:'M 275,15 L 290,8 L 290,20 L 275,32 Z M 275,68 L 290,80 L 290,92 L 275,85 Z', labelX:282, labelY:10 },
];

const solidZones: Zone[] = [
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead', desc_he:'מילוי RDX/HMX. בח׳ייבר שכן ופתאח — MaRV מתמרן עם כנפוני בקרה', desc_en:'RDX/HMX fill. Kheibar Shekan & Fattah — MaRV with control surfaces', color:'#ef4444', path:'M 40,50 L 75,32 L 75,68 Z', labelX:55, labelY:50 },
  { id:'guidance', he:'בקרה והנחיה', en:'Guidance', desc_he:'INS + GPS. סג׳יל: הנחיה סופית TVC בשלב 2', desc_en:'INS + GPS. Sejjil: terminal TVC guidance in Stage 2', color:'#a855f7', path:'M 75,32 L 100,32 L 100,68 L 75,68 Z', labelX:87, labelY:50 },
  { id:'stage2', he:'שלב 2 — מנוע מוצק', en:'Stage 2 — Solid Motor', desc_he:'סוללת AP(70%)+HTPB(15%)+Al(15%) יצוקה בתוך מעטפת פלדה. בעירה אחידה עד סיום הדלק. נחיר עם TVC', desc_en:'AP(70%)+HTPB(15%)+Al(15%) grain cast inside steel casing. Burns uniformly. Nozzle with TVC', color:'#f59e0b', path:'M 100,30 L 170,30 L 170,70 L 100,70 Z', labelX:135, labelY:50 },
  { id:'inter', he:'מנגנון הפרדה', en:'Stage Separation', desc_he:'טבעת פירוטכנית. מנתקת שלב 1 לאחר שריפתו. קפיצים דוחפים החוצה', desc_en:'Pyrotechnic ring. Detaches Stage 1 after burnout. Springs push apart', color:'#64748b', path:'M 170,35 L 180,35 L 180,65 L 170,65 Z', labelX:175, labelY:50 },
  { id:'stage1', he:'שלב 1 — מנוע ראשי', en:'Stage 1 — Main Motor', desc_he:'סוללת דלק מוצק ענקית. ייצור: ערבוב במערבלים פלנטריים (מסין!), יציקה בבורות תת-קרקעיים 6-10 ימים', desc_en:'Giant solid propellant grain. Production: planetary mixer blending (from China!), cast in underground pits 6-10 days', color:'#d97706', path:'M 180,25 L 268,25 L 268,75 L 180,75 Z', labelX:224, labelY:50 },
  { id:'nozzle', he:'נחיר + TVC', en:'Nozzle + TVC', desc_he:'נחיר דה-לאבל עם הטיית נחיר (Thrust Vector Control). שליטה בכיוון ע״י שינוי זווית הנחיר', desc_en:'De Laval nozzle with Thrust Vector Control. Direction by nozzle angle change', color:'#dc2626', path:'M 268,25 L 290,15 L 290,85 L 268,75 Z', labelX:279, labelY:50 },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [active, setActive] = useState<string|null>(null);
  const zones = mode === 'liquid' ? liquidZones : solidZones;
  const info = zones.find(z => z.id === active);

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על מרכיב כדי ללמוד עליו' : 'Click a component to learn more'}</p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-6">
        {[{m:'liquid' as const, l:h?'טיל נוזלי (שהאב-3)':'Liquid (Shahab-3)', c:'blue', e:'🔵'},
          {m:'solid' as const, l:h?'טיל מוצק (סג׳יל-2)':'Solid (Sejjil-2)', c:'amber', e:'🟠'}].map(b => (
          <button key={b.m} onClick={() => { setMode(b.m); setActive(null); }}
            className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${mode===b.m
              ? (b.c==='blue' ? 'bg-blue-900/60 text-blue-200 border-blue-600/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-amber-900/60 text-amber-200 border-amber-600/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]')
              : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-700/50'}`}>
            {b.e} {b.l}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-[#0c1425] backdrop-blur-sm overflow-hidden">
            {/* Blueprint-style background */}
            <div className="relative p-4 md:p-6" style={{
              backgroundImage: `
                linear-gradient(rgba(30,58,138,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(30,58,138,0.08) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}>
              {/* SVG missile */}
              <svg viewBox="20 0 290 100" className="w-full" style={{ maxHeight: 280 }} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="missileBody" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4a5568" />
                    <stop offset="30%" stopColor="#2d3748" />
                    <stop offset="70%" stopColor="#1a202c" />
                    <stop offset="100%" stopColor="#2d3748" />
                  </linearGradient>
                  <linearGradient id="noseCone" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#718096" />
                    <stop offset="100%" stopColor="#4a5568" />
                  </linearGradient>
                  <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2d3748" />
                    <stop offset="100%" stopColor="#1a202c" />
                  </linearGradient>
                  <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
                </defs>

                {/* Missile body - realistic shape */}
                {/* Nose cone */}
                <path d="M 40,50 Q 50,30 80,30 L 80,70 Q 50,70 40,50" fill="url(#noseCone)" stroke="#4a5568" strokeWidth="0.5" />
                {/* Main body cylinder */}
                <rect x="80" y="28" width="190" height="44" rx="2" fill="url(#missileBody)" stroke="#4a5568" strokeWidth="0.5" />
                {/* Body highlight strip */}
                <rect x="80" y="38" width="190" height="2" fill="#4a556830" />
                <rect x="80" y="58" width="190" height="2" fill="#4a556830" />
                {/* Nozzle */}
                <path d="M 270,28 L 270,72 L 290,18 L 290,82 Z" fill="url(#nozzleGrad)" stroke="#4a5568" strokeWidth="0.5" />
                {/* Nozzle inner */}
                <ellipse cx="290" cy="50" rx="3" ry="30" fill="#1a202c" stroke="#4a5568" strokeWidth="0.3" />
                {/* Fins */}
                <path d="M 260,28 L 280,8 L 290,8 L 275,28" fill="#2d3748" stroke="#4a5568" strokeWidth="0.4" />
                <path d="M 260,72 L 280,92 L 290,92 L 275,72" fill="#2d3748" stroke="#4a5568" strokeWidth="0.4" />
                {/* Section lines */}
                {mode === 'liquid' ? (
                  <>
                    <line x1="80" y1="26" x2="80" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="120" y1="26" x2="120" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="220" y1="26" x2="220" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="245" y1="26" x2="245" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="120" y1="50" x2="220" y2="50" stroke="#ffffff15" strokeWidth="0.3" strokeDasharray="2,2" />
                  </>
                ) : (
                  <>
                    <line x1="75" y1="26" x2="75" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="100" y1="26" x2="100" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="170" y1="26" x2="170" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="180" y1="26" x2="180" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line x1="268" y1="26" x2="268" y2="74" stroke="#ffffff20" strokeWidth="0.3" strokeDasharray="2,2" />
                  </>
                )}

                {/* Interactive hover zones */}
                {zones.map(z => (
                  <g key={z.id} className="cursor-pointer"
                    onMouseEnter={() => setActive(z.id)}
                    onClick={() => setActive(active === z.id ? null : z.id)}>
                    <path d={z.path} fill={active === z.id ? z.color + '45' : 'transparent'}
                      stroke={active === z.id ? z.color : 'transparent'} strokeWidth={active === z.id ? '1.2' : '0'}
                      filter={active === z.id ? 'url(#glow)' : ''} className="transition-all duration-300" />
                  </g>
                ))}

                {/* Dimension line */}
                <line x1="40" y1="95" x2="290" y2="95" stroke="#60a5fa40" strokeWidth="0.3" />
                <line x1="40" y1="93" x2="40" y2="97" stroke="#60a5fa40" strokeWidth="0.3" />
                <line x1="290" y1="93" x2="290" y2="97" stroke="#60a5fa40" strokeWidth="0.3" />
                <text x="165" y="99" textAnchor="middle" fill="#60a5fa60" fontSize="3" fontFamily="monospace">
                  {mode === 'liquid' ? '~16m (Shahab-3)' : '~18m (Sejjil-2)'}
                </text>
              </svg>

              {/* Labels under diagram */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {zones.map(z => (
                  <button key={z.id} onClick={() => setActive(active === z.id ? null : z.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${active === z.id ? 'text-white border-opacity-60' : 'text-slate-400 border-slate-700/30 bg-slate-800/30 hover:bg-slate-700/30'}`}
                    style={active === z.id ? { borderColor: z.color, backgroundColor: z.color + '25', color: z.color } : {}}>
                    {h ? z.he.split('—')[0].split('(')[0].trim() : z.en.split('—')[0].split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              {info && (
                <motion.div key={info.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-700/40">
                  <div className="p-5" style={{ backgroundColor: info.color + '08' }}>
                    <h4 className="font-black text-lg mb-2" style={{ color: info.color }}>{h ? info.he : info.en}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{h ? info.desc_he : info.desc_en}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
