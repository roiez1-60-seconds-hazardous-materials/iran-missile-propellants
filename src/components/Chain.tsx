'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Equipment = { id:string; he:string; en:string; desc_he:string; desc_en:string; color:string; formula?:string; temp?:string; };

const ostwaldEq: Equipment[] = [
  { id:'feed', he:'מגדל אמוניה', en:'NH₃ Feed', desc_he:'אמוניה גזית (NH₃) ואוויר מסוננים מוזרמים ביחס 4:5. אמוניה מיובאת — חומר גלם זול מתעשיית הדשנים', desc_en:'Gaseous NH₃ and filtered air fed at 4:5 ratio. NH₃ imported — cheap fertilizer feedstock', color:'#3b82f6' },
  { id:'reactor', he:'כור קטליטי Pt-Rh', en:'Pt-Rh Catalytic Reactor', desc_he:'רשתות פלטינה-רודיום (90:10) ב-800-950°C. מגע אלפית שנייה. תגובה אקסותרמית: -905.2 kJ/mol. NO נוצר בזרם חם', desc_en:'Platinum-Rhodium gauzes (90:10) at 800-950°C. Millisecond contact. Exothermic: -905.2 kJ/mol', color:'#f59e0b', formula:'4NH₃ + 5O₂ → 4NO + 6H₂O', temp:'800-950°C' },
  { id:'cooler', he:'מחליף חום / קירור', en:'Heat Exchanger / Cooler', desc_he:'מקרר את תערובת NO מ-900°C. חום ממוחזר לחימום ראשוני של האמוניה', desc_en:'Cools NO mixture from 900°C. Heat recycled for NH₃ preheating', color:'#60a5fa' },
  { id:'oxidizer', he:'מגדל חמצון', en:'Oxidation Tower', desc_he:'NO + חמצן נוסף → NO₂ (גז חום-אדמדם רעיל). לחץ 6-10 אטמוספירות', desc_en:'NO + additional O₂ → NO₂ (toxic red-brown gas). 6-10 atmospheres pressure', color:'#f97316', formula:'2NO + O₂ → 2NO₂' },
  { id:'absorber', he:'מגדל ספיגה', en:'Absorption Column', desc_he:'NO₂ נספג במים לקרנות. ריכוז ~68% HNO₃. גזי זנב (NO) מוחזרים למגדל החמצון', desc_en:'NO₂ absorbed in water on plates. ~68% HNO₃ concentration. Tail gas (NO) recycled to oxidation', color:'#f97316', formula:'3NO₂ + H₂O → 2HNO₃ + NO' },
  { id:'distill', he:'מגדל ריכוז/זיקוק', en:'Concentration Column', desc_he:'זיקוק עם חומצה גופרתית (H₂SO₄) מרכז ל->86%. צנרת טיטניום/זירקוניום עמידה לקורוזיה', desc_en:'Distillation with H₂SO₄ concentrates to >86%. Ti/Zr corrosion-resistant piping', color:'#ef4444' },
  { id:'irfna', he:'תחנת עירבוב IRFNA', en:'IRFNA Blending Station', desc_he:'הוספת N₂O₄ (18-27%) + HF (0.6%) = IRFNA (AK-27) מוכן לטילים. מילוי מכלי טיטניום אטומים', desc_en:'Adding N₂O₄ (18-27%) + HF (0.6%) = IRFNA (AK-27) ready for missiles. Filled into sealed Ti tanks', color:'#dc2626' },
];

const raschigEq: Equipment[] = [
  { id:'nh3', he:'מאגר אמוניה', en:'NH₃ Storage', desc_he:'אמוניה מעובה בלחץ. חומר גלם ראשון — זמין מתעשיית דשנים', desc_en:'Pressurized liquid ammonia. First feedstock — available from fertilizer industry', color:'#3b82f6' },
  { id:'naocl', he:'מגבל תת-כלורי', en:'Hypochlorite Generator', desc_he:'נתרן היפוכלוריט (NaOCl) — אקונומיקה. מיוצר מכלור + סודה קאוסטית', desc_en:'Sodium hypochlorite (NaOCl) — bleach. Produced from chlorine + caustic soda', color:'#60a5fa' },
  { id:'chloramine', he:'כור כלוראמין', en:'Chloramine Reactor', desc_he:'תגובה בטמפרטורה נמוכה. NH₃ + NaOCl → NH₂Cl. כלוראמין = מולקולת ביניים תגובתית מאוד', desc_en:'Low temperature reaction. NH₃ + NaOCl → NH₂Cl. Chloramine = highly reactive intermediate', color:'#a855f7', formula:'NH₃ + NaOCl → NH₂Cl + NaOH' },
  { id:'dma', he:'מאגר דימתילאמין', en:'DMA Storage', desc_he:'דימתילאמין (CH₃)₂NH — חומר כימי תעשייתי בריח דגים. Dual-use', desc_en:'Dimethylamine (CH₃)₂NH — industrial chemical with fishy odor. Dual-use', color:'#3b82f6' },
  { id:'reactor', he:'כור סינתזה UDMH', en:'UDMH Synthesis Reactor', desc_he:'כלוראמין + דימתילאמין → UDMH. יצירת קשר N-N האנרגטי. תגובה מבוקרת', desc_en:'Chloramine + DMA → UDMH. Energetic N-N bond formation. Controlled reaction', color:'#7c3aed', formula:'(CH₃)₂NH + NH₂Cl → (CH₃)₂NNH₂ + HCl' },
  { id:'distill', he:'מגדלי זיקוק', en:'Distillation Columns', desc_he:'זיקוק מרובה-שלבי להסרת מים ותוצרי לוואי. UDMH טהור ≥98% לדלק טילים', desc_en:'Multi-stage distillation to remove water and byproducts. Pure UDMH ≥98% for missile fuel', color:'#a855f7' },
  { id:'udmh', he:'מילוי UDMH', en:'UDMH Fill', desc_he:'דלק מוכן — CAS 57-14-7. שקוף, ריח אמוניה. רעיל ומסרטן. נקודת הבזק -15°C', desc_en:'Ready fuel — CAS 57-14-7. Colorless, ammonia odor. Toxic & carcinogenic. Flash point -15°C', color:'#dc2626' },
];

const bachmannEq: Equipment[] = [
  { id:'hex', he:'מאגר הקסאמין', en:'Hexamine Storage', desc_he:'הקסאמין (Urotropine) C₆H₁₂N₄. קוביות הצתה לקמפינג — חומר אזרחי לחלוטין', desc_en:'Hexamine (Urotropine) C₆H₁₂N₄. Camping fuel tablets — completely civilian material', color:'#3b82f6' },
  { id:'hno3', he:'מאגר HNO₃ מרוכזת', en:'Conc. HNO₃ Storage', desc_he:'חומצה חנקתית >98% מתהליך אוסטוולד. הכל חוזר ל-HNO₃!', desc_en:'Concentrated nitric acid >98% from Ostwald. Everything traces back to HNO₃!', color:'#ef4444' },
  { id:'nitr', he:'כור ניטרציה', en:'Nitrolysis Reactor', desc_he:'ניטרציה מבוקרת 45-75°C. + אנהידריד אצטי + אמוניום חנקתי. קירור מתמיד — פיצוץ אם הטמפ\' עולה!', desc_en:'Controlled nitrolysis 45-75°C. + acetic anhydride + NH₄NO₃. Constant cooling — explosion if temp rises!', color:'#dc2626', formula:'Hexamine + HNO₃ + NH₄NO₃ + Ac₂O → RDX', temp:'45-75°C' },
  { id:'wash', he:'שטיפה וייבוש', en:'Washing & Drying', desc_he:'שטיפת גבישי RDX במים ואצטון. ייבוש בוואקום. בקרת איכות קפדנית', desc_en:'RDX crystal washing with water & acetone. Vacuum drying. Strict quality control', color:'#f97316' },
  { id:'rdx', he:'RDX (הקסוגן)', en:'RDX (Hexogen)', desc_he:'חומר נפץ נהדף. שימושים: מילוי ראשי קרב + תוסף אנרגטי בדלק מוצק מתקדם (סג\'יל, ח\'ייבר שכן)', desc_en:'High explosive. Uses: warhead fill + energetic additive in advanced solid fuel (Sejjil, Kheibar Shekan)', color:'#f59e0b' },
  { id:'hmx', he:'HMX (אוקטוגן)', en:'HMX (Octogen)', desc_he:'חומר נפץ חזק יותר מ-RDX. שימוש קריטי: עדשות נפץ גרעיניות (Implosion Lenses) — לב הנשק הגרעיני', desc_en:'More powerful than RDX. Critical use: nuclear implosion lenses — heart of a nuclear weapon', color:'#ef4444' },
];

const procs = [
  { id:'ostwald', eq:ostwaldEq, he:'אוסטוולד — HNO₃', en:'Ostwald — HNO₃', icon:'⚗️', desc_he:'חמצון קטליטי של אמוניה → חומצה חנקתית → IRFNA', desc_en:'Catalytic oxidation of ammonia → nitric acid → IRFNA' },
  { id:'raschig', eq:raschigEq, he:'רשיג — UDMH', en:'Raschig — UDMH', icon:'🟣', desc_he:'אמוניה + כלוראמין + דימתילאמין → דלק טילים', desc_en:'Ammonia + chloramine + dimethylamine → missile fuel' },
  { id:'bachmann', eq:bachmannEq, he:'בכמן — RDX/HMX', en:'Bachmann — RDX/HMX', icon:'💣', desc_he:'ניטרציה של הקסאמין → חומרי נפץ לראשי קרב ועדשות גרעיניות', desc_en:'Hexamine nitrolysis → explosives for warheads & nuclear lenses' },
];

function EquipmentIcon({ type, active, color }: { type: string; active: boolean; color: string }) {
  const s = active ? 1.1 : 1;
  const fill = active ? color + 'cc' : color + '40';
  const stroke = active ? color : color + '80';
  // Different SVG shapes for different equipment types
  if (type.includes('כור') || type.includes('Reactor') || type.includes('Synthesis')) {
    // Reactor vessel - cylinder with dome
    return <svg viewBox="0 0 60 70" className="w-full h-full" style={{ transform: `scale(${s})`, transition: 'transform 0.3s' }}>
      <ellipse cx="30" cy="15" rx="18" ry="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <rect x="12" y="15" width="36" height="40" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <ellipse cx="30" cy="55" rx="18" ry="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <line x1="30" y1="61" x2="30" y2="68" stroke={stroke} strokeWidth="2" />
    </svg>;
  }
  if (type.includes('מגדל') || type.includes('Column') || type.includes('Tower') || type.includes('Absorption')) {
    // Distillation column - tall cylinder with trays
    return <svg viewBox="0 0 40 80" className="w-full h-full" style={{ transform: `scale(${s})`, transition: 'transform 0.3s' }}>
      <rect x="8" y="5" width="24" height="65" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {[15,25,35,45,55].map(y => <line key={y} x1="10" y1={y} x2="30" y2={y} stroke={stroke} strokeWidth="0.8" opacity="0.6" />)}
      <circle cx="20" cy="75" r="4" fill={fill} stroke={stroke} strokeWidth="1" />
    </svg>;
  }
  if (type.includes('מחליף') || type.includes('Heat')) {
    // Heat exchanger - shell and tube
    return <svg viewBox="0 0 60 50" className="w-full h-full" style={{ transform: `scale(${s})`, transition: 'transform 0.3s' }}>
      <rect x="5" y="10" width="50" height="30" rx="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {[18,25,32].map(y => <line key={y} x1="10" y1={y} x2="50" y2={y} stroke={stroke} strokeWidth="0.8" strokeDasharray="3,2" />)}
    </svg>;
  }
  // Default: storage tank
  return <svg viewBox="0 0 50 60" className="w-full h-full" style={{ transform: `scale(${s})`, transition: 'transform 0.3s' }}>
    <rect x="10" y="10" width="30" height="35" rx="3" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <ellipse cx="25" cy="10" rx="15" ry="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
    <rect x="20" y="45" width="10" height="10" fill={fill} stroke={stroke} strokeWidth="1" />
  </svg>;
}

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [pi, setPi] = useState(0);
  const [ai, setAi] = useState<string|null>(null);
  const proc = procs[pi];
  const info = proc.eq.find(e => e.id === ai);

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'תרשימי תהליכי ייצור כימיים' : 'Chemical Production Process Diagrams'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על ציוד כדי ללמוד עליו' : 'Click equipment to learn more'}</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {procs.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setAi(null); }}
            className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${pi===i ? 'bg-blue-900/60 text-blue-200 border-blue-600/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
            {p.icon} {h ? p.he : p.en}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-[#0c1425] overflow-hidden" style={{
            backgroundImage: `linear-gradient(rgba(30,58,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.06) 1px, transparent 1px)`,
            backgroundSize: '25px 25px'
          }}>
            <div className="p-3 border-b border-slate-700/30 text-center">
              <span className="text-xs text-slate-500">{h ? proc.desc_he : proc.desc_en}</span>
            </div>

            {/* Equipment flow - horizontal */}
            <div className="p-6 overflow-x-auto">
              <div className="flex items-center gap-1 min-w-[600px] justify-center">
                {proc.eq.map((eq, i) => (
                  <div key={eq.id} className="flex items-center">
                    {/* Equipment */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      onClick={() => setAi(ai === eq.id ? null : eq.id)}
                      className={`cursor-pointer rounded-xl border-2 p-2 flex flex-col items-center transition-all w-20 md:w-24 ${ai === eq.id ? 'bg-slate-800/80 shadow-lg' : 'bg-slate-900/40 hover:bg-slate-800/40'}`}
                      style={{ borderColor: ai === eq.id ? eq.color : 'transparent' }}>
                      <div className="w-12 h-14 md:w-14 md:h-16 mb-1">
                        <EquipmentIcon type={h ? eq.he : eq.en} active={ai === eq.id} color={eq.color} />
                      </div>
                      <span className="text-[9px] md:text-[10px] text-slate-400 text-center leading-tight font-medium" style={ai === eq.id ? { color: eq.color } : {}}>
                        {(h ? eq.he : eq.en).split('—')[0].split('/')[0].trim().substring(0, 16)}
                      </span>
                      {eq.temp && <span className="text-[8px] text-amber-400/70 font-mono mt-0.5">{eq.temp}</span>}
                    </motion.div>

                    {/* Arrow between equipment */}
                    {i < proc.eq.length - 1 && (
                      <div className="flex-shrink-0 px-1">
                        <svg width="24" height="16" viewBox="0 0 24 16"><path d="M 0,8 L 18,8 M 14,4 L 20,8 L 14,12" fill="none" stroke="#3b82f680" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              {info && (
                <motion.div key={info.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-700/40">
                  <div className="p-5" style={{ backgroundColor: info.color + '08' }}>
                    <h4 className="font-black text-lg mb-1" style={{ color: info.color }}>
                      {h ? info.he : info.en}
                    </h4>
                    {info.formula && (
                      <div className="font-mono text-xs text-green-300 bg-slate-950/80 rounded-lg px-3 py-2 mb-2 border border-slate-700/50 inline-block" dir="ltr">
                        {info.formula}
                      </div>
                    )}
                    <p className="text-sm text-slate-300 leading-relaxed">{h ? info.desc_he : info.desc_en}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-xl border-r-4 border-amber-600 bg-amber-950/30 p-4 text-sm text-amber-200">
        ⚡ <b>{h ? 'מערבלים פלנטריים:' : 'Planetary Mixers:'}</b> {h ? 'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — הברחות מסין. השמדתם = ואקום ייצורי.' : 'Giant solid fuel mixing machines. Iran cannot produce — smuggled from China. Destruction = production vacuum.'}
      </motion.div>
    </section>
  );
}
