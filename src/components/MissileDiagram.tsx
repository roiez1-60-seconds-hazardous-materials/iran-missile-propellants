'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Part = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string; glow:string };

const liquidParts: Part[] = [
  { id:'nose', he:'חרטום אווירודינמי', en:'Aerodynamic Nose Cone', desc_he:'חרטום מחודד המפחית התנגדות אוויר. עשוי סגסוגת אלומיניום או קומפוזיט עמיד לחום. מתפרק בכניסה חוזרת לאטמוספירה', desc_en:'Pointed nose cone reducing drag. Aluminum alloy or heat-resistant composite. Detaches during re-entry', color:'#94a3b8', glow:'rgba(148,163,184,0.3)' },
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead Section', desc_he:'מילוי נפץ HE (TNT/Comp-B/RDX) — 700 עד 1,500 ק״ג. בטילים מתקדמים: רש״ק מתמרן (MaRV) המשנה מסלול בשלב החדירה לאטמוספירה', desc_en:'HE fill (TNT/Comp-B/RDX) — 700 to 1,500 kg. Advanced missiles: MaRV that changes trajectory during re-entry', color:'#ef4444', glow:'rgba(239,68,68,0.3)' },
  { id:'guidance', he:'תא אוויוניקה והנחיה', en:'Avionics & Guidance Bay', desc_he:'מחשב טיסה + ג\'ירוסקופ אינרציאלי (INS) + מקלט GPS/GLONASS. בח׳ורמשהר — תיקון מסלול סופי (CEP ~30 מ\')', desc_en:'Flight computer + inertial gyroscope (INS) + GPS/GLONASS receiver. Khorramshahr — terminal correction (CEP ~30m)', color:'#a855f7', glow:'rgba(168,85,247,0.3)' },
  { id:'oxidizer', he:'מיכל מחמצן — IRFNA', en:'Oxidizer Tank — IRFNA', desc_he:'חומצה חנקתית מעושנת אדומה מעוכבת (AK-27). צפיפות 1.55 g/cm³. נוזל כתום-אדום קורוזיבי ורעיל. מכיל HF כמעכב. לחץ פנימי 15-25 אטמוספירות', desc_en:'Inhibited Red Fuming Nitric Acid (AK-27). Density 1.55. Orange-red corrosive toxic liquid. Contains HF inhibitor. Internal pressure 15-25 atm', color:'#f97316', glow:'rgba(249,115,22,0.3)' },
  { id:'fuel', he:'מיכל דלק — UDMH / TM-185', en:'Fuel Tank — UDMH / TM-185', desc_he:'שהאב: קרוסין צבאי TM-185. ח׳ורמשהר: UDMH (דימתילהידראזין) — שקוף, מסרטן, חודר עור. היפרגולי: מגע עם IRFNA = הצתה מיידית!', desc_en:'Shahab: military kerosene TM-185. Khorramshahr: UDMH — colorless, carcinogenic, skin-penetrating. Hypergolic: contact with IRFNA = instant ignition!', color:'#3b82f6', glow:'rgba(59,130,246,0.3)' },
  { id:'engine', he:'מנוע רקטי + נחיר', en:'Rocket Engine + Nozzle', desc_he:'תא בעירה: IRFNA+UDMH נפגשים → הצתה היפרגולית → 3,000°C. נחיר De Laval מאיץ גזים למהירות על-קולית. משאבות טורבו מזרימות בלחץ 80 אטמוספירות', desc_en:'Combustion chamber: IRFNA+UDMH meet → hypergolic ignition → 3,000°C. De Laval nozzle accelerates gases to supersonic. Turbopumps at 80 atm', color:'#dc2626', glow:'rgba(220,38,38,0.4)' },
  { id:'fins', he:'כנפוני ייצוב', en:'Stabilization Fins', desc_he:'4 כנפונים לייצוב אווירודינמי בשלב העלייה. בטילים מתקדמים (קיאם) — הוסרו ונוסף TVC (בקרת וקטור דחף) לשליטה בכיוון', desc_en:'4 fins for aerodynamic stabilization during ascent. Advanced missiles (Qiam) — removed, TVC (Thrust Vector Control) added', color:'#64748b', glow:'rgba(100,116,139,0.3)' },
];

const solidParts: Part[] = [
  { id:'nose', he:'חרטום אווירודינמי', en:'Aerodynamic Nose Cone', desc_he:'חרטום מעוצב לחדירה מחדש לאטמוספירה. בפתאח-1: צורת שברון היפרסונית', desc_en:'Re-entry shaped nose cone. Fattah-1: hypersonic chevron shape', color:'#94a3b8', glow:'rgba(148,163,184,0.3)' },
  { id:'warhead', he:'ראש קרב מתמרן (MaRV)', en:'Maneuvering Warhead (MaRV)', desc_he:'מילוי RDX/HMX. בח׳ייבר שכן ופתאח: ראש קרב מתמרן המשנה מסלול — מתחמק מיירוט! כנפוני שליטה קטנים', desc_en:'RDX/HMX fill. Kheibar Shekan & Fattah: maneuvering warhead that changes trajectory — evades interception!', color:'#ef4444', glow:'rgba(239,68,68,0.3)' },
  { id:'stage2', he:'שלב 2 — מנוע מוצק עליון', en:'Stage 2 — Upper Solid Motor', desc_he:'סוללת דלק AP+HTPB+Al יצוקה בתוך מעטפת מנוע פלדה/קומפוזיט. בעירה מבפנים החוצה (star grain). נחיר עם TVC', desc_en:'AP+HTPB+Al propellant grain cast inside steel/composite casing. Internal burning (star grain). Nozzle with TVC', color:'#f59e0b', glow:'rgba(245,158,11,0.3)' },
  { id:'inter', he:'מנגנון הפרדה בין-שלבי', en:'Interstage Separation', desc_he:'טבעת פירוטכנית שמנתקת שלב 1 לאחר שריפת כל הדלק. מאפשרת הצתת שלב 2 בוואקום', desc_en:'Pyrotechnic ring that detaches Stage 1 after burnout. Enables Stage 2 ignition in vacuum', color:'#64748b', glow:'rgba(100,116,139,0.3)' },
  { id:'stage1', he:'שלב 1 — מנוע מוצק ראשי', en:'Stage 1 — Primary Solid Motor', desc_he:'הסוללה הגדולה: AP(70%)+HTPB(15%)+Al(15%). יציקה בבורות תת-קרקעיים 6-10 ימים. מערבלים פלנטריים מסין. בסג׳יל: קוטר 1.25 מ\', אורך 6 מ\'', desc_en:'Main grain: AP(70%)+HTPB(15%)+Al(15%). Cast in underground pits 6-10 days. Planetary mixers from China. Sejjil: 1.25m diameter, 6m length', color:'#d97706', glow:'rgba(217,119,6,0.3)' },
  { id:'nozzle', he:'נחיר + TVC', en:'Nozzle + TVC', desc_he:'נחיר דה-לאבל עם הטיית נחיר גמישה (Flex Bearing TVC). שליטה בכיוון טיסה בשלב העלייה. טמפרטורת יציאה: ~2,800°C', desc_en:'De Laval nozzle with flex bearing TVC. Flight direction control during ascent. Exit temperature: ~2,800°C', color:'#dc2626', glow:'rgba(220,38,38,0.4)' },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [active, setActive] = useState<string|null>(null);
  const parts = mode === 'liquid' ? liquidParts : solidParts;
  const info = parts.find(p => p.id === active);

  // Missile proportions
  const zones = mode === 'liquid' ? [
    { id:'nose', x1:2, x2:8 },
    { id:'warhead', x1:8, x2:22 },
    { id:'guidance', x1:22, x2:30 },
    { id:'oxidizer', x1:30, x2:52 },
    { id:'fuel', x1:52, x2:72 },
    { id:'engine', x1:72, x2:90 },
    { id:'fins', x1:85, x2:98 },
  ] : [
    { id:'nose', x1:2, x2:8 },
    { id:'warhead', x1:8, x2:20 },
    { id:'stage2', x1:20, x2:42 },
    { id:'inter', x1:42, x2:46 },
    { id:'stage1', x1:46, x2:88 },
    { id:'nozzle', x1:88, x2:98 },
  ];

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'העבירו את העכבר / לחצו על אזור כדי ללמוד עליו' : 'Hover or tap a section to learn more'}</p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-6">
        {(['liquid','solid'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setActive(null); }}
            className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${mode === m
              ? m === 'liquid'
                ? 'bg-blue-900/40 text-blue-200 border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.25)]'
                : 'bg-amber-900/40 text-amber-200 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.25)]'
              : 'bg-slate-800/30 text-slate-500 border-slate-700/30 hover:border-slate-600/50'}`}>
            {m === 'liquid' ? `🔵 ${h ? 'טיל נוזלי (שהאב-3)' : 'Liquid (Shahab-3)'}` : `🟠 ${h ? 'טיל מוצק (סג׳יל-2)' : 'Solid (Sejjil-2)'}`}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-b from-[#0c1425] to-[#0a0f1e] p-6 md:p-8 overflow-hidden">
        {/* Blueprint grid background */}
        <div className="relative">
          <svg viewBox="0 0 100 40" className="w-full" style={{ filter:'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}>
            {/* Blueprint grid */}
            <defs>
              <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="0.1"/>
              </pattern>
              <linearGradient id="bodyMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a5568"/>
                <stop offset="30%" stopColor="#6b7280"/>
                <stop offset="50%" stopColor="#9ca3af"/>
                <stop offset="70%" stopColor="#6b7280"/>
                <stop offset="100%" stopColor="#374151"/>
              </linearGradient>
              <linearGradient id="bodyDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#374151"/>
                <stop offset="50%" stopColor="#4b5563"/>
                <stop offset="100%" stopColor="#1f2937"/>
              </linearGradient>
              <linearGradient id="flame1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fbbf24"/>
                <stop offset="30%" stopColor="#f97316"/>
                <stop offset="60%" stopColor="#ef4444"/>
                <stop offset="100%" stopColor="#ef444400"/>
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            <rect width="100" height="40" fill="url(#grid)"/>

            {/* === MISSILE BODY === */}
            {/* Nose cone */}
            <path d={`M 8,20 Q 2,20 2,20 L 8,14 L 8,26 Z`} fill="url(#bodyMain)" stroke="#6b7280" strokeWidth="0.2"/>
            {/* Nose tip highlight */}
            <path d="M 3,19.5 Q 5,17 8,15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3"/>

            {/* Main body cylinder */}
            <rect x="8" y="14" width="82" height="12" rx="0.5" fill="url(#bodyMain)" stroke="#4b5563" strokeWidth="0.15"/>
            {/* Body highlight stripe */}
            <rect x="8" y="17.5" width="82" height="1" fill="rgba(255,255,255,0.08)" rx="0.5"/>
            {/* Body panel lines */}
            {zones.map(z => <line key={z.id+'line'} x1={z.x2} y1="14" x2={z.x2} y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="0.15" strokeDasharray="0.5,0.5"/>)}

            {/* Nozzle / engine bell */}
            <path d="M 90,15 L 90,25 L 97,28 L 97,12 Z" fill="url(#bodyDark)" stroke="#4b5563" strokeWidth="0.2"/>
            <ellipse cx="97" cy="20" rx="1" ry="8" fill="#1f2937" stroke="#374151" strokeWidth="0.2"/>

            {/* Exhaust flame */}
            <path d="M 97,14 Q 100,17 98.5,20 Q 100,23 97,26" fill="none" stroke="#fbbf24" strokeWidth="0.3" opacity="0.6"/>
            <ellipse cx="99" cy="20" rx="2.5" ry="5" fill="url(#flame1)" opacity="0.4">
              <animate attributeName="rx" values="2;3;2" dur="0.3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.5;0.3" dur="0.5s" repeatCount="indefinite"/>
            </ellipse>

            {/* Fins (liquid mode) */}
            {mode === 'liquid' && <>
              <path d="M 87,14 L 85,8 L 92,8 L 90,14" fill="#475569" stroke="#6b7280" strokeWidth="0.15"/>
              <path d="M 87,26 L 85,32 L 92,32 L 90,26" fill="#475569" stroke="#6b7280" strokeWidth="0.15"/>
            </>}

            {/* Interstage ring (solid mode) */}
            {mode === 'solid' && <rect x="42" y="13.5" width="4" height="13" rx="0.3" fill="#1f2937" stroke="#475569" strokeWidth="0.2"/>}

            {/* === INTERACTIVE HOVER ZONES === */}
            {zones.map(z => {
              const part = parts.find(p => p.id === z.id);
              if (!part) return null;
              const isActive = active === z.id;
              return (
                <g key={z.id}>
                  <rect
                    x={z.x1} y={isActive ? 11 : 13} width={z.x2 - z.x1} height={isActive ? 18 : 14}
                    rx="1" fill={isActive ? part.color + '35' : 'transparent'}
                    stroke={isActive ? part.color : 'transparent'} strokeWidth={isActive ? '0.5' : '0'}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActive(z.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(active === z.id ? null : z.id)}
                    style={isActive ? { filter:`drop-shadow(0 0 3px ${part.glow})` } : {}}
                  />
                  {/* Label line + text below missile */}
                  {isActive && <>
                    <line x1={(z.x1+z.x2)/2} y1="26" x2={(z.x1+z.x2)/2} y2="32" stroke={part.color} strokeWidth="0.3" opacity="0.6"/>
                    <text x={(z.x1+z.x2)/2} y="35" textAnchor="middle" fill={part.color} fontSize="2.2" fontWeight="bold" className="select-none pointer-events-none">
                      {(h ? part.he : part.en).substring(0,20)}
                    </text>
                  </>}
                </g>
              );
            })}

            {/* Dimension line */}
            <line x1="2" y1="37" x2="97" y2="37" stroke="rgba(148,163,184,0.3)" strokeWidth="0.1" markerStart="url(#dimArrow)" markerEnd="url(#dimArrow)"/>
            <text x="50" y="39" textAnchor="middle" fill="rgba(148,163,184,0.4)" fontSize="1.8" className="select-none">
              {mode === 'liquid' ? '~16 m (Shahab-3)' : '~17.6 m (Sejjil-2)'}
            </text>
          </svg>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {info ? (
            <motion.div key={info.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl p-5 border backdrop-blur-sm" style={{ borderColor: info.color + '40', backgroundColor: info.color + '08', boxShadow: `0 0 30px ${info.glow}` }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                <h4 className="font-black text-lg text-slate-100">{h ? info.he : info.en}</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{h ? info.desc_he : info.desc_en}</p>
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-slate-600 text-sm py-4">
              {h ? '👆 העבירו את העכבר מעל חלק בטיל' : '👆 Hover over a missile section'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
