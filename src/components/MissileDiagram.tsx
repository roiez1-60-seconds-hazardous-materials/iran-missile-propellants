'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Part = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string; glow:string };

const liquidParts: Part[] = [
  { id:'nosecone', he:'חרטום (Nose Cone)', en:'Nose Cone', desc_he:'חרטום אווירודינמי מקומפוזיט עמיד לחום. מגן על ראש הקרב בחדירה חוזרת לאטמוספירה ב-Mach 7+. חימום של 2,000°C+', desc_en:'Aerodynamic composite heat-resistant nose cone. Protects warhead during re-entry at Mach 7+. Heating of 2,000°C+', color:'#94a3b8', glow:'rgba(148,163,184,0.3)' },
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead (Payload)', desc_he:'מילוי חומר נפץ HE (TNT/RDX/HMX) במשקל 700-1,500 ק״ג. בטילים מתקדמים — ראש קרב מתמרן (MaRV) עם כנפיות אווירודינמיות לתמרון בשלב החדירה', desc_en:'HE explosive fill (TNT/RDX/HMX) weighing 700-1,500 kg. Advanced missiles — Maneuverable Re-entry Vehicle (MaRV) with aerodynamic fins for terminal maneuvering', color:'#ef4444', glow:'rgba(239,68,68,0.4)' },
  { id:'guidance', he:'תא מכשור והנחיה', en:'Guidance & Avionics', desc_he:'מחשב טיסה + ג\'ירוסקופים (INS) + מקלט GPS/GLONASS. מערכת ניווט אוטונומית שמנווטת את הטיל לאורך כל המסלול. בטילים חדשים — הנחיה סופית', desc_en:'Flight computer + gyroscopes (INS) + GPS/GLONASS receiver. Autonomous navigation system guiding missile throughout trajectory. New missiles — terminal guidance', color:'#a855f7', glow:'rgba(168,85,247,0.4)' },
  { id:'oxidizer', he:'מיכל מחמצן (IRFNA)', en:'Oxidizer Tank (IRFNA)', desc_he:'מיכל מסגסוגת טיטניום/אל-חלד מכיל IRFNA (AK-27): חומצה חנקתית 73% + N₂O₄ 27% + HF 0.6%. צפיפות 1.55 g/cm³. קורוזיבי ורעיל ביותר — דופנות המיכל מצופות שכבת פסיבציה. זמן תדלוק: שעות', desc_en:'Titanium/stainless steel tank containing IRFNA (AK-27): 73% HNO₃ + 27% N₂O₄ + 0.6% HF. Density 1.55 g/cm³. Highly corrosive & toxic — tank walls have passivation layer. Fueling time: hours', color:'#f97316', glow:'rgba(249,115,22,0.4)' },
  { id:'fuel', he:'מיכל דלק (TM-185 / UDMH)', en:'Fuel Tank (TM-185 / UDMH)', desc_he:'מיכל עם קרוסין צבאי TM-185 (בשהאב) או UDMH (בח\'ורמשהר). היפרגולי — מגע עם IRFNA = הצתה ספונטנית מיידית ללא מצת! UDMH: רעיל, מסרטן, חודר עור, נקודת הבזק -15°C', desc_en:'Tank with military kerosene TM-185 (Shahab) or UDMH (Khorramshahr). Hypergolic — IRFNA contact = instant ignition! UDMH: toxic, carcinogenic, skin-penetrating, flash point -15°C', color:'#3b82f6', glow:'rgba(59,130,246,0.4)' },
  { id:'engine', he:'מנוע רקטי + משאבות', en:'Rocket Engine + Turbopumps', desc_he:'תא בעירה מקורר (רגנרטיבי) + נחיר De Laval. משאבות טורבו מזרימות דלק ומחמצן בלחץ 50+ אטמ\'. תגובה היפרגולית: ~3,000°C. דחף סגולי (Isp) 230-270 שניות', desc_en:'Regeneratively cooled combustion chamber + De Laval nozzle. Turbopumps deliver fuel & oxidizer at 50+ atm. Hypergolic reaction: ~3,000°C. Specific impulse (Isp) 230-270 sec', color:'#dc2626', glow:'rgba(220,38,38,0.5)' },
  { id:'fins', he:'כנפוני ייצוב וסנפירים', en:'Stabilization Fins & Control', desc_he:'4 כנפוני ייצוב אווירודינמיים בזנב. בקיאם — הוסרו והוחלפו ב-TVC (בקרת וקטור דחף) = הטיית הנחיר לשליטה בכיוון. פרופיל נמוך יותר, קשה יותר ליירוט', desc_en:'4 aerodynamic stabilization fins at tail. In Qiam — removed, replaced with TVC (Thrust Vector Control) = nozzle gimbaling. Lower profile, harder to intercept', color:'#64748b', glow:'rgba(100,116,139,0.3)' },
];

const solidParts: Part[] = [
  { id:'nosecone', he:'חרטום עמיד לחום', en:'Heat-Resistant Nose Cone', desc_he:'חרטום קומפוזיט-קרמי לחדירה חוזרת. בפתאח-1 — חרטום מיוחד להיפרסוני (Mach 13+)', desc_en:'Ceramic-composite nose for re-entry. Fattah-1 — special hypersonic nose (Mach 13+)', color:'#94a3b8', glow:'rgba(148,163,184,0.3)' },
  { id:'warhead', he:'ראש קרב / MaRV', en:'Warhead / MaRV', desc_he:'מילוי RDX/HMX. בח\'ייבר שכן ופתאח — ראש קרב מתמרן (MaRV) שמתנתק ותמרן עצמאית לעבר המטרה. כנפיות+דלק נוזלי קטן ב-MaRV', desc_en:'RDX/HMX fill. Kheibar Shekan & Fattah — MaRV that separates and maneuvers independently to target', color:'#ef4444', glow:'rgba(239,68,68,0.4)' },
  { id:'stage2', he:'שלב 2 — מנוע מוצק', en:'Stage 2 — Solid Motor', desc_he:'סוללת דלק מוצק (AP 70% + HTPB 15% + Al 15%) יצוקה בתוך מעטפת פלדה/קומפוזיט. בעירה מהמרכז כלפי חוץ (Star Grain). כולל נחיר עם TVC', desc_en:'Solid propellant grain (AP 70% + HTPB 15% + Al 15%) cast inside steel/composite casing. Burns from center outward (Star Grain). Includes nozzle with TVC', color:'#f59e0b', glow:'rgba(245,158,11,0.4)' },
  { id:'interstage', he:'טבעת הפרדה בין-שלבית', en:'Interstage Separation Ring', desc_he:'מנגנון הפרדה פירוטכני: מטענים חלולים חותכים את החיבור ודוחפים את שלב 1 לאחור. קריטי — כשל בהפרדה = אובדן הטיל', desc_en:'Pyrotechnic separation: shaped charges sever connection and push Stage 1 away. Critical — separation failure = missile loss', color:'#64748b', glow:'rgba(100,116,139,0.4)' },
  { id:'stage1', he:'שלב 1 — מנוע מוצק ראשי', en:'Stage 1 — Primary Solid Motor', desc_he:'הסוללה הגדולה: AP(70%)+HTPB(15%)+Al(15%) + בטילים מתקדמים RDX/HMX. יצוקה בבורות יציקה תת-קרקעיים (6-10 ימים). מעורבבת במערבלים פלנטריים (מסין). מעטפת מחוזקת סיבי פחמן', desc_en:'The large grain: AP(70%)+HTPB(15%)+Al(15%) + RDX/HMX in advanced missiles. Cast in underground pits (6-10 days). Mixed in planetary mixers (from China). Carbon fiber reinforced casing', color:'#d97706', glow:'rgba(217,119,6,0.4)' },
  { id:'nozzle', he:'נחיר + TVC', en:'Nozzle + TVC', desc_he:'נחיר דה-לאבל מגרפיט/קרמיקה עמיד ל-3,000°C. TVC = הטיית הנחיר ±6° לשליטה בכיוון טיסה. מונע ע״י אקטואטורים הידראוליים', desc_en:'Graphite/ceramic De Laval nozzle resistant to 3,000°C. TVC = ±6° nozzle gimbal for flight control. Hydraulic actuators', color:'#dc2626', glow:'rgba(220,38,38,0.5)' },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [active, setActive] = useState<string|null>(null);
  const parts = mode === 'liquid' ? liquidParts : solidParts;
  const info = parts.find(p => p.id === active);

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על אזור בטיל כדי ללמוד עליו' : 'Click a missile area to learn more'}</p>
      </motion.div>

      <div className="flex justify-center gap-3 mb-6">
        {(['liquid','solid'] as const).map(m => (
          <motion.button key={m} onClick={() => { setMode(m); setActive(null); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${mode === m
              ? m === 'liquid' ? 'bg-gradient-to-r from-blue-900/80 to-blue-800/80 text-blue-200 border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.3)]' : 'bg-gradient-to-r from-amber-900/80 to-amber-800/80 text-amber-200 border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
              : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-700/50'}`}>
            {m === 'liquid' ? `🔵 ${h ? 'טיל נוזלי (שהאב-3)' : 'Liquid (Shahab-3)'}` : `🟠 ${h ? 'טיל מוצק (סג׳יל-2)' : 'Solid (Sejjil-2)'}`}
          </motion.button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-700/40 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1929 0%, #111d2e 40%, #0f1a28 100%)' }}>
        {/* Blueprint grid pattern */}
        <div className="relative p-6 md:p-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>

          {/* The Missile SVG */}
          <svg viewBox="0 0 800 200" className="w-full" style={{ filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.5))' }}>
            <defs>
              {/* Missile body gradient */}
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7a8a9e" />
                <stop offset="30%" stopColor="#556577" />
                <stop offset="70%" stopColor="#3d4f63" />
                <stop offset="100%" stopColor="#2a3a4e" />
              </linearGradient>
              <linearGradient id="bodyShine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a9bb0" />
                <stop offset="100%" stopColor="#5a6b80" />
              </linearGradient>
              <linearGradient id="nozzleGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4a3a2e" />
                <stop offset="100%" stopColor="#2a1a0e" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6b00" />
                <stop offset="40%" stopColor="#ff4400" />
                <stop offset="100%" stopColor="rgba(255,100,0,0)" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="innerShadow"><feOffset dx="0" dy="2" /><feGaussianBlur stdDeviation="2" /><feComposite operator="out" in="SourceGraphic" /><feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer><feComposite operator="atop" in2="SourceGraphic" /></filter>
            </defs>

            {/* Exhaust flame */}
            <ellipse cx="760" cy="100" rx="60" ry="25" fill="url(#flameGrad)" opacity="0.7">
              <animate attributeName="rx" values="55;65;55" dur="0.3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="22;28;22" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="745" cy="100" rx="30" ry="12" fill="#ffcc00" opacity="0.8">
              <animate attributeName="rx" values="28;33;28" dur="0.4s" repeatCount="indefinite" />
            </ellipse>

            {/* MISSILE BODY — realistic shape */}
            {/* Nose cone */}
            <path d="M30,100 Q30,70 80,65 L80,135 Q30,130 30,100Z" fill="url(#noseGrad)" stroke="#8a9bb0" strokeWidth="0.5" />
            <path d="M30,100 Q30,75 80,68 L80,100Z" fill="url(#bodyShine)" opacity="0.3" />

            {/* Main body */}
            <rect x="80" y="62" width="600" height="76" rx="3" fill="url(#bodyGrad)" />
            <rect x="80" y="62" width="600" height="38" rx="3" fill="url(#bodyShine)" opacity="0.2" />

            {/* Body panel lines */}
            {mode === 'liquid' ? (
              <>
                <line x1="170" y1="62" x2="170" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="250" y1="62" x2="250" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="420" y1="62" x2="420" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="530" y1="62" x2="530" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="620" y1="62" x2="620" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
              </>
            ) : (
              <>
                <line x1="170" y1="62" x2="170" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="240" y1="62" x2="240" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="360" y1="62" x2="360" y2="138" stroke="#5a4a3e" strokeWidth="2" />
                <line x1="380" y1="62" x2="380" y2="138" stroke="#5a4a3e" strokeWidth="2" />
                <line x1="620" y1="62" x2="620" y2="138" stroke="#4a5a6e" strokeWidth="1.5" strokeDasharray="3,3" />
              </>
            )}

            {/* Nozzle */}
            <path d="M680,68 L700,55 L720,50 L720,150 L700,145 L680,132Z" fill="url(#nozzleGrad)" stroke="#5a4a3e" strokeWidth="1" />
            <ellipse cx="720" cy="100" rx="8" ry="50" fill="#1a0a00" stroke="#4a3a2e" strokeWidth="1" />

            {/* Fins */}
            <polygon points="660,62 690,20 710,20 680,62" fill="#3d4f63" stroke="#5a6b80" strokeWidth="0.5" />
            <polygon points="660,138 690,180 710,180 680,138" fill="#3d4f63" stroke="#5a6b80" strokeWidth="0.5" />

            {/* Rivets / detail marks */}
            {[100,150,200,300,400,500,600,650].map(x => (
              <g key={x}><circle cx={x} cy="68" r="1.5" fill="#6a7a8e" /><circle cx={x} cy="132" r="1.5" fill="#6a7a8e" /></g>
            ))}

            {/* Clickable zones — transparent overlays */}
            {mode === 'liquid' ? (
              <>
                <rect x="30" y="55" width="50" height="90" rx="4" fill="transparent" stroke={active==='nosecone'?'#94a3b8':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='nosecone'?null:'nosecone')} onMouseEnter={() => !active && setActive('nosecone')} />
                <rect x="80" y="55" width="90" height="90" rx="2" fill={active==='warhead'?'rgba(239,68,68,0.15)':'transparent'} stroke={active==='warhead'?'#ef4444':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='warhead'?null:'warhead')} />
                <rect x="170" y="55" width="80" height="90" rx="2" fill={active==='guidance'?'rgba(168,85,247,0.15)':'transparent'} stroke={active==='guidance'?'#a855f7':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='guidance'?null:'guidance')} />
                <rect x="250" y="55" width="170" height="90" rx="2" fill={active==='oxidizer'?'rgba(249,115,22,0.15)':'transparent'} stroke={active==='oxidizer'?'#f97316':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='oxidizer'?null:'oxidizer')} />
                <rect x="420" y="55" width="110" height="90" rx="2" fill={active==='fuel'?'rgba(59,130,246,0.15)':'transparent'} stroke={active==='fuel'?'#3b82f6':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='fuel'?null:'fuel')} />
                <rect x="530" y="55" width="90" height="90" rx="2" fill={active==='engine'?'rgba(220,38,38,0.15)':'transparent'} stroke={active==='engine'?'#dc2626':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='engine'?null:'engine')} />
                <rect x="620" y="20" width="100" height="165" rx="2" fill={active==='fins'?'rgba(100,116,139,0.15)':'transparent'} stroke={active==='fins'?'#64748b':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='fins'?null:'fins')} />
              </>
            ) : (
              <>
                <rect x="30" y="55" width="50" height="90" rx="4" fill="transparent" stroke={active==='nosecone'?'#94a3b8':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='nosecone'?null:'nosecone')} />
                <rect x="80" y="55" width="90" height="90" rx="2" fill={active==='warhead'?'rgba(239,68,68,0.15)':'transparent'} stroke={active==='warhead'?'#ef4444':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='warhead'?null:'warhead')} />
                <rect x="170" y="55" width="70" height="90" rx="2" fill={active==='stage2'?'rgba(245,158,11,0.15)':'transparent'} stroke={active==='stage2'?'#f59e0b':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='stage2'?null:'stage2')} />
                <rect x="355" y="55" width="30" height="90" rx="2" fill={active==='interstage'?'rgba(100,116,139,0.2)':'transparent'} stroke={active==='interstage'?'#64748b':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='interstage'?null:'interstage')} />
                <rect x="385" y="55" width="235" height="90" rx="2" fill={active==='stage1'?'rgba(217,119,6,0.15)':'transparent'} stroke={active==='stage1'?'#d97706':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='stage1'?null:'stage1')} />
                <rect x="620" y="20" width="100" height="165" rx="2" fill={active==='nozzle'?'rgba(220,38,38,0.15)':'transparent'} stroke={active==='nozzle'?'#dc2626':'transparent'} strokeWidth="2" className="cursor-pointer" onClick={() => setActive(active==='nozzle'?null:'nozzle')} />
              </>
            )}

            {/* Labels with leader lines */}
            {mode === 'liquid' ? (
              <>
                <g opacity={active==='warhead'||!active?1:0.3} className="transition-opacity duration-300">
                  <line x1="125" y1="58" x2="125" y2="35" stroke="#ef4444" strokeWidth="0.8" /><circle cx="125" cy="33" r="2" fill="#ef4444" />
                  <text x="125" y="27" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">{h?'רש״ק':'Warhead'}</text>
                </g>
                <g opacity={active==='guidance'||!active?1:0.3} className="transition-opacity duration-300">
                  <line x1="210" y1="58" x2="210" y2="42" stroke="#a855f7" strokeWidth="0.8" /><circle cx="210" cy="40" r="2" fill="#a855f7" />
                  <text x="210" y="34" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">{h?'הנחיה':'Guidance'}</text>
                </g>
                <g opacity={active==='oxidizer'||!active?1:0.3} className="transition-opacity duration-300">
                  <line x1="335" y1="142" x2="335" y2="165" stroke="#f97316" strokeWidth="0.8" /><circle cx="335" cy="167" r="2" fill="#f97316" />
                  <text x="335" y="180" textAnchor="middle" fill="#fdba74" fontSize="9" fontWeight="bold">IRFNA</text>
                </g>
                <g opacity={active==='fuel'||!active?1:0.3} className="transition-opacity duration-300">
                  <line x1="475" y1="142" x2="475" y2="165" stroke="#3b82f6" strokeWidth="0.8" /><circle cx="475" cy="167" r="2" fill="#3b82f6" />
                  <text x="475" y="180" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">{mode==='liquid'?'TM-185/UDMH':'—'}</text>
                </g>
                <g opacity={active==='engine'||!active?1:0.3} className="transition-opacity duration-300">
                  <line x1="575" y1="58" x2="575" y2="30" stroke="#dc2626" strokeWidth="0.8" /><circle cx="575" cy="28" r="2" fill="#dc2626" />
                  <text x="575" y="22" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">{h?'מנוע':'Engine'}</text>
                </g>
              </>
            ) : (
              <>
                <g opacity={active==='warhead'||!active?1:0.3}><line x1="125" y1="58" x2="125" y2="35" stroke="#ef4444" strokeWidth="0.8" /><circle cx="125" cy="33" r="2" fill="#ef4444" /><text x="125" y="27" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">{h?'רש״ק/MaRV':'Warhead/MaRV'}</text></g>
                <g opacity={active==='stage2'||!active?1:0.3}><line x1="280" y1="58" x2="280" y2="38" stroke="#f59e0b" strokeWidth="0.8" /><circle cx="280" cy="36" r="2" fill="#f59e0b" /><text x="280" y="28" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">{h?'שלב 2':'Stage 2'}</text></g>
                <g opacity={active==='interstage'||!active?1:0.3}><line x1="370" y1="142" x2="370" y2="165" stroke="#64748b" strokeWidth="0.8" /><circle cx="370" cy="167" r="2" fill="#64748b" /><text x="370" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">{h?'הפרדה':'Separation'}</text></g>
                <g opacity={active==='stage1'||!active?1:0.3}><line x1="500" y1="142" x2="500" y2="168" stroke="#d97706" strokeWidth="0.8" /><circle cx="500" cy="170" r="2" fill="#d97706" /><text x="500" y="183" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">{h?'שלב 1 — מנוע ראשי':'Stage 1 — Main Motor'}</text></g>
                <g opacity={active==='nozzle'||!active?1:0.3}><line x1="680" y1="58" x2="680" y2="30" stroke="#dc2626" strokeWidth="0.8" /><circle cx="680" cy="28" r="2" fill="#dc2626" /><text x="680" y="22" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">{h?'נחיר+TVC':'Nozzle+TVC'}</text></g>
              </>
            )}
          </svg>

          {/* Missile name tag */}
          <div className="text-center mt-4">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${mode === 'liquid' ? 'bg-blue-900/40 text-blue-300 border-blue-700/40' : 'bg-amber-900/40 text-amber-300 border-amber-700/40'}`}>
              {mode === 'liquid' ? (h ? 'שהאב-3 / גדר-110 — טווח 1,300-2,000 ק״מ' : 'Shahab-3 / Ghadr-110 — Range 1,300-2,000 km') : (h ? 'סג׳יל-2 — טווח 2,000 ק״מ — דו-שלבי' : 'Sejjil-2 — Range 2,000 km — Two-stage')}
            </span>
          </div>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {info ? (
            <motion.div key={info.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-700/40 p-6" style={{ background: `linear-gradient(135deg, ${info.color}10, transparent)`, boxShadow: `inset 0 1px 30px ${info.glow}` }}>
              <h4 className="font-black text-lg text-slate-100 mb-2">{h ? info.he : info.en}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{h ? info.desc_he : info.desc_en}</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-slate-700/40 p-4 text-center text-sm text-slate-500">
              {h ? '👆 לחצו על אזור בטיל לפרטים טכניים' : '👆 Click a missile area for technical details'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
