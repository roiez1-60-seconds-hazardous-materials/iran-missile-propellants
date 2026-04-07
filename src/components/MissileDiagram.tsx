'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Part = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string };

const liquidParts: Part[] = [
  { id:'nose', he:'חרטום אווירודינמי', en:'Nose Cone', desc_he:'חרטום מחודד מסגסוגת אלומיניום או קומפוזיט עמיד לחום. מפחית התנגדות אוויר ומגן על הרש״ק בשלב העלייה. מתפרק בכניסה חוזרת', desc_en:'Pointed aluminum alloy or heat-resistant composite nose cone. Reduces drag and protects warhead during ascent. Separates during re-entry', color:'#94a3b8' },
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead', desc_he:'מילוי נפץ 700-1,500 ק״ג (TNT/RDX/HMX). בטילים מתקדמים: ראש קרב מתמרן (MaRV) שמשנה מסלול בחדירה לאטמוספירה ומתחמק מיירוט', desc_en:'700-1,500 kg explosive fill (TNT/RDX/HMX). Advanced missiles: MaRV warhead that changes trajectory during re-entry, evading interception', color:'#ef4444' },
  { id:'guidance', he:'תא הנחיה ואוויוניקה', en:'Guidance & Avionics', desc_he:'מחשב טיסה, ג\'ירוסקופ אינרציאלי (INS), מקלט לוויין (GPS/GLONASS). בטילים מתקדמים — תיקון מסלול סופי המשפר דיוק ל-CEP של 30 מ\'', desc_en:'Flight computer, inertial gyroscope (INS), satellite receiver (GPS/GLONASS). Advanced missiles — terminal correction improving accuracy to 30m CEP', color:'#a855f7' },
  { id:'oxidizer', he:'מיכל מחמצן (IRFNA)', en:'Oxidizer Tank (IRFNA)', desc_he:'מיכל אלומיניום מצופה מבפנים בשכבת פסיבציה (HF). מכיל IRFNA — חומצה חנקתית מעושנת אדומה. צפיפות 1.55, קורוזיבי ורעיל. לחץ פנימי 15-25 אטמוספירות', desc_en:'Aluminum tank with internal passivation layer (HF). Contains IRFNA — Red Fuming Nitric Acid. Density 1.55, corrosive and toxic. Internal pressure 15-25 atm', color:'#f97316' },
  { id:'fuel', he:'מיכל דלק (TM-185 / UDMH)', en:'Fuel Tank (TM-185 / UDMH)', desc_he:'בשהאב: קרוסין TM-185. בח\'ורמשהר: UDMH — שקוף, מסרטן, חודר עור. היפרגולי: מגע עם IRFNA = הצתה ספונטנית מיידית ללא ניצוץ!', desc_en:'Shahab: TM-185 kerosene. Khorramshahr: UDMH — colorless, carcinogenic, skin-penetrating. Hypergolic: contact with IRFNA = instant spontaneous ignition!', color:'#3b82f6' },
  { id:'engine', he:'מנוע רקטי + נחיר', en:'Rocket Engine + Nozzle', desc_he:'תא בעירה: דלק ומחמצן נפגשים בהצתה היפרגולית — 3,000 מעלות. נחיר De Laval (צורת פעמון) מאיץ את הגזים למהירות על-קולית. משאבות טורבו בלחץ 80 אטמוספירות', desc_en:'Combustion chamber: fuel and oxidizer meet in hypergolic ignition — 3,000°C. De Laval nozzle (bell shape) accelerates gases to supersonic. Turbopumps at 80 atm', color:'#dc2626' },
  { id:'fins', he:'כנפוני ייצוב', en:'Stabilization Fins', desc_he:'ארבעה כנפונים לייצוב אווירודינמי. בטילים מתקדמים כמו קיאם הכנפונים הוסרו ונוסף TVC — בקרת וקטור דחף המאפשרת שליטה בכיוון דרך הטיית הנחיר', desc_en:'Four fins for aerodynamic stabilization. Advanced missiles like Qiam removed fins, adding TVC — Thrust Vector Control enabling direction control via nozzle tilting', color:'#64748b' },
];

const solidParts: Part[] = [
  { id:'nose', he:'חרטום + כיפת הגנה', en:'Nose Cone + Heat Shield', desc_he:'חרטום מעוצב לחדירה מחדש לאטמוספירה. בפתאח-1: צורה היפרסונית מיוחדת (שברון). כיפה אבלטיבית סופגת חום', desc_en:'Shaped for atmospheric re-entry. Fattah-1: special hypersonic shape (chevron). Ablative heat shield absorbs heat', color:'#94a3b8' },
  { id:'warhead', he:'ראש קרב מתמרן (MaRV)', en:'Maneuvering Warhead (MaRV)', desc_he:'מילוי RDX/HMX. בח\'ייבר שכן ופתאח — ראש קרב מתמרן עם כנפוני שליטה קטנים, משנה מסלול ומתחמק ממערכות יירוט', desc_en:'RDX/HMX fill. Kheibar Shekan and Fattah — maneuvering warhead with small control fins, changes trajectory evading interception systems', color:'#ef4444' },
  { id:'stage2', he:'שלב 2 — מנוע מוצק עליון', en:'Stage 2 — Upper Solid Motor', desc_he:'סוללת דלק AP+HTPB+Al יצוקה בתוך מעטפת מנוע. בעירה מבפנים החוצה (חתך כוכב). נחיר עם TVC לשליטה בכיוון', desc_en:'AP+HTPB+Al propellant grain cast inside motor casing. Burns from inside out (star cross-section). Nozzle with TVC for direction control', color:'#f59e0b' },
  { id:'inter', he:'חיבור בין-שלבי', en:'Interstage Section', desc_he:'טבעת הפרדה פירוטכנית. מנתקת את שלב 1 לאחר שריפת הדלק ומאפשרת הצתת שלב 2', desc_en:'Pyrotechnic separation ring. Detaches Stage 1 after burnout and enables Stage 2 ignition', color:'#64748b' },
  { id:'stage1', he:'שלב 1 — מנוע מוצק ראשי', en:'Stage 1 — Primary Solid Motor', desc_he:'הסוללה הגדולה ביותר: AP (70%) + HTPB (15%) + אלומיניום (15%). יציקה בבורות תת-קרקעיים במשך 6-10 ימים. דורש מערבלים פלנטריים — מיובאים מסין', desc_en:'Largest grain: AP (70%) + HTPB (15%) + Aluminum (15%). Cast in underground pits over 6-10 days. Requires planetary mixers — imported from China', color:'#d97706' },
  { id:'nozzle', he:'נחיר + TVC', en:'Nozzle + TVC', desc_he:'נחיר דה-לאבל (צורת פעמון) עם הטיית נחיר גמישה. טמפרטורת גזי יציאה כ-2,800 מעלות. שליטה בכיוון טיסה בשלב העלייה', desc_en:'De Laval nozzle (bell shape) with flexible nozzle tilting. Exit gas temperature ~2,800°C. Flight direction control during ascent', color:'#dc2626' },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [active, setActive] = useState<string|null>(null);
  const parts = mode === 'liquid' ? liquidParts : solidParts;
  const info = parts.find(p => p.id === active);

  const zones = mode === 'liquid' ? [
    { id:'nose', x1:0, x2:12 },
    { id:'warhead', x1:12, x2:25 },
    { id:'guidance', x1:25, x2:33 },
    { id:'oxidizer', x1:33, x2:53 },
    { id:'fuel', x1:53, x2:73 },
    { id:'engine', x1:73, x2:88 },
    { id:'fins', x1:82, x2:95 },
  ] : [
    { id:'nose', x1:0, x2:10 },
    { id:'warhead', x1:10, x2:22 },
    { id:'stage2', x1:22, x2:44 },
    { id:'inter', x1:44, x2:48 },
    { id:'stage1', x1:48, x2:86 },
    { id:'nozzle', x1:86, x2:98 },
  ];

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-3">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'העבירו את העכבר או לחצו על אזור כדי ללמוד עליו' : 'Hover or tap a section to learn more'}</p>
      </motion.div>

      <div className="flex justify-center gap-3 mb-8">
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

      <div className="rounded-3xl bg-gradient-to-b from-[#0c1425] to-[#0a0f1e] p-6 md:p-10 overflow-hidden">
        <svg viewBox="0 0 200 70" className="w-full" preserveAspectRatio="xMidYMid meet" style={{ filter:'drop-shadow(0 4px 15px rgba(0,0,0,0.5))' }}>
          <defs>
            <pattern id="bp" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth="0.15"/>
            </pattern>
            <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b7280"/>
              <stop offset="25%" stopColor="#9ca3af"/>
              <stop offset="50%" stopColor="#d1d5db"/>
              <stop offset="75%" stopColor="#9ca3af"/>
              <stop offset="100%" stopColor="#4b5563"/>
            </linearGradient>
            <linearGradient id="noseG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ca3af"/>
              <stop offset="100%" stopColor="#6b7280"/>
            </linearGradient>
            <linearGradient id="flameG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef3c7"/>
              <stop offset="15%" stopColor="#fbbf24"/>
              <stop offset="35%" stopColor="#f97316"/>
              <stop offset="60%" stopColor="#ef4444"/>
              <stop offset="100%" stopColor="#ef444400"/>
            </linearGradient>
            <linearGradient id="nozzleG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78716c"/>
              <stop offset="50%" stopColor="#44403c"/>
              <stop offset="100%" stopColor="#1c1917"/>
            </linearGradient>
            <radialGradient id="glowR"><stop offset="0%" stopColor="#fbbf2440"/><stop offset="100%" stopColor="#fbbf2400"/></radialGradient>
          </defs>
          <rect width="200" height="70" fill="url(#bp)"/>

          {/* ====== MISSILE BODY ====== */}
          {/* Pointed nose cone - proper triangle/ogive */}
          <path d="M 4,35 C 8,35 15,28 24,28 L 24,42 C 15,42 8,35 4,35 Z" fill="url(#noseG)" stroke="#9ca3af" strokeWidth="0.3"/>
          {/* Nose tip highlight */}
          <path d="M 5,34.5 C 9,33 14,29.5 20,28.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>

          {/* Main cylindrical body */}
          <rect x="24" y="28" width="142" height="14" fill="url(#bodyG)" stroke="#6b7280" strokeWidth="0.2"/>
          {/* Body center highlight */}
          <rect x="24" y="33" width="142" height="2" fill="rgba(255,255,255,0.08)" rx="1"/>
          {/* Body panel seams */}
          {zones.map(z => {
            const x = z.x2 * 1.7 + 5;
            return x > 24 && x < 166 ? <line key={z.id+'s'} x1={x} y1="28" x2={x} y2="42" stroke="rgba(255,255,255,0.12)" strokeWidth="0.2"/> : null;
          })}

          {/* Engine section - tapered */}
          <path d="M 166,28 L 170,26 L 170,44 L 166,42" fill="#57534e" stroke="#78716c" strokeWidth="0.2"/>

          {/* Nozzle - proper bell shape */}
          <path d="M 170,27 C 172,27 174,24 178,22 L 178,48 C 174,46 172,43 170,43 Z" fill="url(#nozzleG)" stroke="#78716c" strokeWidth="0.25"/>
          {/* Nozzle interior */}
          <path d="M 171,29 C 173,29 175,26 177,24 L 177,46 C 175,44 173,41 171,41 Z" fill="#1c1917" opacity="0.6"/>
          {/* Nozzle rim */}
          <ellipse cx="178" cy="35" rx="0.8" ry="13" fill="none" stroke="#78716c" strokeWidth="0.3"/>

          {/* Exhaust flame - realistic shape */}
          <path d="M 178,25 Q 185,30 183,35 Q 185,40 178,45" fill="url(#flameG)" opacity="0.5">
            <animate attributeName="d" values="M 178,25 Q 185,30 183,35 Q 185,40 178,45;M 178,26 Q 188,31 186,35 Q 188,39 178,44;M 178,25 Q 185,30 183,35 Q 185,40 178,45" dur="0.4s" repeatCount="indefinite"/>
          </path>
          <ellipse cx="182" cy="35" rx="3" ry="6" fill="url(#glowR)" opacity="0.6">
            <animate attributeName="rx" values="3;5;3" dur="0.3s" repeatCount="indefinite"/>
          </ellipse>
          {/* Inner flame (white-hot) */}
          <path d="M 178,30 Q 181,33 180,35 Q 181,37 178,40" fill="#fef3c7" opacity="0.4">
            <animate attributeName="opacity" values="0.3;0.5;0.3" dur="0.25s" repeatCount="indefinite"/>
          </path>

          {/* Fins (liquid mode) */}
          {mode === 'liquid' && <>
            <path d="M 160,28 L 155,18 L 168,18 L 166,28" fill="#475569" stroke="#6b7280" strokeWidth="0.2"/>
            <path d="M 160,42 L 155,52 L 168,52 L 166,42" fill="#475569" stroke="#6b7280" strokeWidth="0.2"/>
            {/* Fin detail lines */}
            <line x1="158" y1="20" x2="165" y2="28" stroke="rgba(255,255,255,0.1)" strokeWidth="0.15"/>
            <line x1="158" y1="50" x2="165" y2="42" stroke="rgba(255,255,255,0.1)" strokeWidth="0.15"/>
          </>}

          {/* Interstage ring (solid mode) */}
          {mode === 'solid' && <>
            <rect x="79" y="27" width="4" height="16" fill="#292524" stroke="#57534e" strokeWidth="0.3"/>
            <line x1="79" y1="27" x2="83" y2="27" stroke="#78716c" strokeWidth="0.3"/>
            <line x1="79" y1="43" x2="83" y2="43" stroke="#78716c" strokeWidth="0.3"/>
          </>}

          {/* ====== INTERACTIVE ZONES ====== */}
          {zones.map(z => {
            const part = parts.find(p => p.id === z.id);
            if (!part) return null;
            const isActive = active === z.id;
            const x = z.x1 * 1.7 + 5;
            const w = (z.x2 - z.x1) * 1.7;
            return (
              <g key={z.id}>
                <rect x={x} y={isActive ? 20 : 26} width={w} height={isActive ? 30 : 18} rx="1.5"
                  fill={isActive ? part.color + '30' : 'transparent'}
                  stroke={isActive ? part.color : 'transparent'}
                  strokeWidth={isActive ? '0.6' : '0'}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setActive(z.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(active === z.id ? null : z.id)}
                />
                {isActive && <>
                  <line x1={x + w/2} y1="42" x2={x + w/2} y2="52" stroke={part.color} strokeWidth="0.3" opacity="0.7"/>
                  <circle cx={x + w/2} cy="52" r="1" fill={part.color} opacity="0.5"/>
                  <text x={x + w/2} y="57" textAnchor="middle" fill={part.color} fontSize="3.5" fontWeight="bold" className="select-none pointer-events-none">
                    {(h ? part.he : part.en).substring(0,18)}
                  </text>
                </>}
              </g>
            );
          })}

          {/* Dimension line */}
          <line x1="4" y1="64" x2="178" y2="64" stroke="rgba(148,163,184,0.25)" strokeWidth="0.15"/>
          <line x1="4" y1="62" x2="4" y2="66" stroke="rgba(148,163,184,0.25)" strokeWidth="0.15"/>
          <line x1="178" y1="62" x2="178" y2="66" stroke="rgba(148,163,184,0.25)" strokeWidth="0.15"/>
          <text x="91" y="68" textAnchor="middle" fill="rgba(148,163,184,0.35)" fontSize="3" className="select-none">
            {mode === 'liquid' ? '~16 m (Shahab-3)' : '~17.6 m (Sejjil-2)'}
          </text>
        </svg>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {info ? (
            <motion.div key={info.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="mt-8 rounded-2xl p-6 border backdrop-blur-sm" style={{ borderColor: info.color + '40', backgroundColor: info.color + '08', boxShadow: `0 0 30px ${info.color}15` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: info.color }} />
                <h4 className="font-black text-lg text-slate-100">{h ? info.he : info.en}</h4>
              </div>
              <p className="text-sm text-slate-300 leading-7">{h ? info.desc_he : info.desc_en}</p>
            </motion.div>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-slate-600 text-sm py-4">
              {h ? '👆 העבירו את העכבר על חלק בטיל או לחצו עליו' : '👆 Hover over or tap a missile section'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
