'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Section = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string; hoverColor:string };

const liquidSections: Section[] = [
  { id:'warhead', he:'ראש קרב (רש״ק)', en:'Warhead (HE/MaRV)', desc_he:'מילוי חומרי נפץ (TNT/RDX/HMX) או ראש קרב מתמרן (MaRV). משקל 700–1,500 ק״ג. בטילי עמאד וח׳ורמשהר — ראש קרב מתמרן המשנה מסלול בשלב החדירה לאטמוספירה', desc_en:'HE fill (TNT/RDX/HMX) or MaRV warhead. 700–1,500 kg. Emad & Khorramshahr have maneuvering re-entry vehicles that alter trajectory during atmospheric re-entry', color:'#dc2626', hoverColor:'#ef4444' },
  { id:'guidance', he:'תא אוויוניקה והנחיה', en:'Avionics & Guidance Bay', desc_he:'מחשב טיסה + מערכת ניווט אינרציאלית (INS). בטילים מתקדמים: תיקון GPS/GLONASS. ג׳יירוסקופים ומד תאוצה. מערכות אלו רגישות ביותר ללוחמה אלקטרונית', desc_en:'Flight computer + Inertial Navigation System (INS). Advanced models: GPS/GLONASS correction. Gyroscopes & accelerometers. Highly vulnerable to electronic warfare', color:'#8b5cf6', hoverColor:'#a78bfa' },
  { id:'oxidizer', he:'מיכל מחמצן — IRFNA', en:'Oxidizer Tank — IRFNA', desc_he:'חומצה חנקתית מעושנת אדומה מעוכבת (AK-27). צפיפות 1.55, כתום-אדום, אדים רעילים. מיכל מאלומיניום עם ציפוי פנימי עמיד לחומצה. מכיל 0.6% HF כמעכב קורוזיה. המיכל הגדול ביותר בטיל', desc_en:'Inhibited Red Fuming Nitric Acid (AK-27). Density 1.55, orange-red, toxic fumes. Aluminum tank with acid-resistant inner coating. Contains 0.6% HF corrosion inhibitor. Largest tank in the missile', color:'#ea580c', hoverColor:'#f97316' },
  { id:'fuel', he:'מיכל דלק — TM-185 / UDMH', en:'Fuel Tank — TM-185 / UDMH', desc_he:'קרוסין צבאי TM-185 (שהאב/גדר) או UDMH (קיאם/ח׳ורמשהר). UDMH = היפרגולי: מגע עם IRFNA = הצתה מיידית ללא מצת! רעיל ומסרטן. תדלוק אורך שעות וחושף את המשגר לזיהוי', desc_en:'Military kerosene TM-185 (Shahab/Ghadr) or UDMH (Qiam/Khorramshahr). UDMH = hypergolic: contact with IRFNA = instant ignition without igniter! Toxic & carcinogenic. Fueling takes hours, exposing launcher to detection', color:'#2563eb', hoverColor:'#3b82f6' },
  { id:'engine', he:'מנוע רקטי + משאבות', en:'Rocket Engine + Turbopumps', desc_he:'תא בעירה עם משאבות טורבו (גנרטור גז) שמזרימות דלק ומחמצן בלחץ גבוה. תגובה היפרגולית: IRFNA+UDMH → CO₂+H₂O+N₂ בטמפרטורת ~3,000°C. נחיר De Laval מאיץ את הגזים למהירות על-קולית', desc_en:'Combustion chamber with turbopumps (gas generator) injecting fuel & oxidizer at high pressure. Hypergolic reaction: IRFNA+UDMH → CO₂+H₂O+N₂ at ~3,000°C. De Laval nozzle accelerates gases to supersonic speed', color:'#b91c1c', hoverColor:'#dc2626' },
  { id:'fins', he:'כנפוני ייצוב + מערכות', en:'Stabilization Fins + Systems', desc_he:'כנפונים אווירודינמיים לייצוב טיסה. בטילים מתקדמים (קיאם) — הוסרו והוחלפו ב-TVC (בקרת וקטור דחף) = הטיית הנחיר לשינוי כיוון. חיישני תאוצה ולחץ', desc_en:'Aerodynamic fins for flight stabilization. Advanced models (Qiam) — removed and replaced with TVC (Thrust Vector Control) = nozzle gimbal for direction change', color:'#475569', hoverColor:'#64748b' },
];

const solidSections: Section[] = [
  { id:'warhead', he:'ראש קרב (רש״ק) + MaRV', en:'Warhead (HE) + MaRV', desc_he:'מילוי RDX/HMX. בח׳ייבר שכן ופתאח — ראש קרב מתמרן (MaRV) עם כנפוני שליטה. מסוגל לתמרן בשלב החדירה כדי לחמוק מהגנה אווירית', desc_en:'RDX/HMX fill. Kheibar Shekan & Fattah have MaRV with control surfaces. Capable of maneuvering during re-entry to evade missile defense', color:'#dc2626', hoverColor:'#ef4444' },
  { id:'guidance', he:'תא הנחיה + TVC', en:'Guidance Bay + TVC', desc_he:'INS + GPS. בסג׳יל — מערכת TVC (הטיית נחיר) בשלב 2 למסלול סופי מדויק. מאפשר שליטה גם לאחר כיבוי מנוע שלב 1', desc_en:'INS + GPS. Sejjil has Stage 2 TVC (nozzle gimbal) for precise terminal trajectory. Enables control even after Stage 1 burnout', color:'#8b5cf6', hoverColor:'#a78bfa' },
  { id:'stage2', he:'שלב 2 — מנוע מוצק', en:'Stage 2 — Solid Motor', desc_he:'סוללת דלק מוצק (AP 70% + HTPB 15% + Al 15%) יצוקה בתוך מעטפת המנוע. בעירה אחידה ויציבה. כולל נחיר עם TVC. מופעל לאחר הפרדה משלב 1 בגובה ~100 ק״מ', desc_en:'Solid propellant grain (AP 70% + HTPB 15% + Al 15%) cast inside motor casing. Uniform, stable burn. Includes nozzle with TVC. Ignites after Stage 1 separation at ~100 km altitude', color:'#d97706', hoverColor:'#f59e0b' },
  { id:'interstage', he:'חיבור בין-שלבי', en:'Interstage Section', desc_he:'מנגנון הפרדה פירוטכני — חומר נפץ בצורת טבעת שמנתק את שלב 1 בתום הבעירה. ברגע ההפרדה — שלב 2 מצית את המנוע שלו', desc_en:'Pyrotechnic separation mechanism — ring-shaped explosive that detaches Stage 1 after burnout. At separation moment — Stage 2 ignites its motor', color:'#64748b', hoverColor:'#94a3b8' },
  { id:'stage1', he:'שלב 1 — מנוע מוצק ראשי', en:'Stage 1 — Primary Solid Motor', desc_he:'סוללת הדלק הגדולה ביותר. AP(70%)+HTPB(15%)+Al(15%), בטילים מתקדמים +RDX/HMX. יצוקה בבורות יציקה תת-קרקעיים (6-10 ימים) באמצעות מערבלים פלנטריים. המערבלים — צוואר הבקבוק הקריטי', desc_en:'Largest propellant grain. AP(70%)+HTPB(15%)+Al(15%), advanced models +RDX/HMX. Cast in underground casting pits (6-10 days) using planetary mixers — the critical bottleneck', color:'#b45309', hoverColor:'#d97706' },
  { id:'nozzle', he:'נחיר + TVC ראשי', en:'Primary Nozzle + TVC', desc_he:'נחיר דה-לאבל עמיד לחום (גרפיט/קרמיקה). בקרת וקטור דחף (TVC) = הטיית נחיר הידראולית לשליטה בכיוון. תוצרי בעירה: Al₂O₃ (עשן לבן) + HCl + CO + NOx', desc_en:'Heat-resistant De Laval nozzle (graphite/ceramic). TVC = hydraulic nozzle gimbal for direction control. Combustion products: Al₂O₃ (white smoke) + HCl + CO + NOx', color:'#b91c1c', hoverColor:'#dc2626' },
];

export default function MissileDiagram() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [mode, setMode] = useState<'liquid'|'solid'>('liquid');
  const [active, setActive] = useState<string|null>(null);
  const sections = mode === 'liquid' ? liquidSections : solidSections;
  const sel = sections.find(s => s.id === active);

  // Positions for each section (percentages of total width)
  const liquidPos = { warhead:[0,12], guidance:[12,20], oxidizer:[20,45], fuel:[45,65], engine:[65,88], fins:[88,100] };
  const solidPos = { warhead:[0,10], guidance:[10,18], stage2:[18,40], interstage:[40,45], stage1:[45,85], nozzle:[85,100] };
  const pos = mode === 'liquid' ? liquidPos : solidPos;

  return (
    <section id="diagram" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'אנטומיה של טיל בליסטי' : 'Anatomy of a Ballistic Missile'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על אזור בטיל לפרטים מלאים' : 'Click a missile section for full details'}</p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button onClick={() => { setMode('liquid'); setActive(null); }}
          className={`px-6 py-3 rounded-xl font-bold border transition-all text-sm ${mode === 'liquid' ? 'bg-blue-900/60 text-blue-200 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
          🔵 {h ? 'טיל נוזלי (שהאב-3)' : 'Liquid (Shahab-3)'}
        </button>
        <button onClick={() => { setMode('solid'); setActive(null); }}
          className={`px-6 py-3 rounded-xl font-bold border transition-all text-sm ${mode === 'solid' ? 'bg-amber-900/60 text-amber-200 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
          🟠 {h ? 'טיל מוצק (סג׳יל-2)' : 'Solid (Sejjil-2)'}
        </button>
      </div>

      {/* Missile Visualization */}
      <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-sm overflow-hidden">
        {/* Blueprint grid background */}
        <div className="relative p-4 md:p-8" style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          {/* Missile SVG */}
          <svg viewBox="0 0 1000 200" className="w-full" style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}>
            <defs>
              <linearGradient id="bodyTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4b5563" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
              <linearGradient id="bodyBot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {/* Missile body outline - realistic shape */}
            {/* Nose cone */}
            <path d={mode === 'liquid' 
              ? "M 120,100 Q 60,100 20,100 Q 0,100 0,100 L 20,70 Q 40,45 80,35 L 120,30"
              : "M 100,100 Q 50,100 15,100 L 30,65 Q 50,40 75,32 L 100,28"
            } fill="url(#bodyTop)" stroke="#6b7280" strokeWidth="1" />
            <path d={mode === 'liquid'
              ? "M 120,100 Q 60,100 20,100 Q 0,100 0,100 L 20,130 Q 40,155 80,165 L 120,170"
              : "M 100,100 Q 50,100 15,100 L 30,135 Q 50,160 75,168 L 100,172"
            } fill="url(#bodyBot)" stroke="#6b7280" strokeWidth="1" />
            
            {/* Main body */}
            <rect x={mode==='liquid'?120:100} y="28" width={mode==='liquid'?750:770} height="144" rx="3" fill="url(#bodyTop)" stroke="#6b7280" strokeWidth="1" />
            
            {/* Nozzle */}
            <path d={mode==='liquid'
              ? "M 870,28 L 870,172 L 920,180 Q 960,185 980,160 L 1000,100 L 980,40 Q 960,15 920,20 L 870,28"
              : "M 870,28 L 870,172 L 910,178 Q 950,182 975,155 L 1000,100 L 975,45 Q 950,18 910,22 L 870,28"
            } fill="#1a1a2e" stroke="#6b7280" strokeWidth="1" />
            {/* Nozzle exit */}
            <ellipse cx="998" cy="100" rx="5" ry="50" fill="#0f0f1f" stroke="#4b5563" strokeWidth="1" />

            {/* Internal section dividers */}
            {sections.map((sec) => {
              const p = (pos as any)[sec.id] as number[];
              if (!p) return null;
              const x1 = mode==='liquid' ? 120 + p[0] * 7.5 : 100 + p[0] * 7.7;
              const x2 = mode==='liquid' ? 120 + p[1] * 7.5 : 100 + p[1] * 7.7;
              const isActive = active === sec.id;
              return (
                <g key={sec.id} className="cursor-pointer" onClick={() => setActive(active === sec.id ? null : sec.id)} onMouseEnter={() => setActive(sec.id)}>
                  <rect x={x1} y="30" width={x2 - x1} height="140" rx="1"
                    fill={isActive ? sec.hoverColor + '35' : sec.color + '12'}
                    stroke={isActive ? sec.hoverColor : sec.color + '60'}
                    strokeWidth={isActive ? '2' : '0.5'}
                    strokeDasharray={isActive ? '' : '4,2'}
                  />
                  {/* Section label */}
                  <text x={(x1 + x2) / 2} y="105" textAnchor="middle" dominantBaseline="middle"
                    fill={isActive ? '#fff' : '#9ca3af'} fontSize={isActive ? '12' : '10'} fontWeight="bold"
                    className="pointer-events-none select-none">
                    {(h ? sec.he : sec.en).split('—')[0].split('(')[0].trim().substring(0, 14)}
                  </text>
                  {/* Vertical divider line */}
                  {x1 > (mode==='liquid'?125:105) && <line x1={x1} y1="30" x2={x1} y2="170" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="3,3" className="pointer-events-none" />}
                </g>
              );
            })}

            {/* Dimension lines */}
            <line x1="0" y1="190" x2="1000" y2="190" stroke="#4b556380" strokeWidth="0.5" />
            <text x="500" y="198" textAnchor="middle" fill="#64748b" fontSize="9">
              {mode==='liquid' ? (h?'אורך כולל: ~15.8 מ׳':'Total Length: ~15.8m') : (h?'אורך כולל: ~17.5 מ׳':'Total Length: ~17.5m')}
            </text>
          </svg>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          {sel ? (
            <motion.div key={sel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="border-t border-slate-700/40 p-5 md:p-6" style={{ backgroundColor: sel.color + '08' }}>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: sel.hoverColor }} />
                <div>
                  <h4 className="font-black text-lg text-slate-100 mb-2">{h ? sel.he : sel.en}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{h ? sel.desc_he : sel.desc_en}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="border-t border-slate-700/40 p-5 text-center text-sm text-slate-500">
              {h ? '👆 לחצו על אזור בטיל או העבירו עכבר כדי לראות פרטים' : '👆 Click or hover a section to see details'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
