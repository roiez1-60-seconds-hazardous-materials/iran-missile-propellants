'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Equipment = { id:string; he:string; en:string; desc_he:string; desc_en:string; formula?:string; temp?:string; color:string };

const ostwaldEquip: Equipment[] = [
  { id:'ammonia', he:'מיכל אמוניה (NH₃)', en:'Ammonia Tank (NH₃)', desc_he:'חומר גלם — מיוצר באסלויה (South Pars) או מיובא. תעשיית דשנים. גז דחוס לנוזל ב-10 אטמ\'', desc_en:'Feedstock — produced at Asaluyeh (South Pars) or imported. Compressed to liquid at 10 atm', color:'#3b82f6' },
  { id:'mixer', he:'תא ערבוב אמוניה + אוויר', en:'NH₃ + Air Mixing Chamber', desc_he:'אמוניה מעורבבת עם אוויר מסונן ביחס מדויק של 4:5 (NH₃:O₂). חימום מקדים ל-300°C', desc_en:'Ammonia mixed with filtered air at precise 4:5 ratio (NH₃:O₂). Preheated to 300°C', formula:'4NH₃ + 5O₂', temp:'300°C', color:'#60a5fa' },
  { id:'reactor', he:'כור קטליטי — רשת פלטינה', en:'Catalytic Reactor — Platinum Gauze', desc_he:'לב המפעל! רשתות פלטינה-רודיום (90:10) ב-800-950°C. מגע אלפית שנייה. אקסותרמי: -905.2 kJ/mol. הזרז = צוואר בקבוק — מיוצר בכמה מדינות בלבד', desc_en:'Heart of the plant! Pt-Rh (90:10) gauze at 800-950°C. Millisecond contact. Exothermic: -905.2 kJ/mol', formula:'4NH₃ + 5O₂ → 4NO + 6H₂O', temp:'800-950°C', color:'#f59e0b' },
  { id:'cooler', he:'מגדל קירור + חמצון', en:'Cooling Tower + Oxidation', desc_he:'גזי NO מקוררים ב-heat exchanger ומגיבים עם O₂ נוסף. NO הופך ל-NO₂ — גז חום-אדמדם רעיל מאוד', desc_en:'NO gases cooled in heat exchanger and react with additional O₂. NO becomes NO₂ — highly toxic red-brown gas', formula:'2NO + O₂ → 2NO₂', temp:'~150°C', color:'#f97316' },
  { id:'absorber', he:'מגדל ספיגה (Absorption)', en:'Absorption Tower', desc_he:'מגדל פלדה אל-חלד גבוה 20+ מטר. NO₂ נספג במים הזורמים כלפי מטה. מייצר HNO₃ בריכוז ~68%. ה-NO שנותר חוזר לכור', desc_en:'20+ meter stainless steel tower. NO₂ absorbed in counter-current water flow. Produces ~68% HNO₃. Remaining NO recycled', formula:'3NO₂ + H₂O → 2HNO₃ + NO', color:'#ea580c' },
  { id:'distill', he:'מגדל זיקוק (ריכוז)', en:'Distillation Column', desc_he:'HNO₃ מרוכז מ-68% ל->86% בזיקוק עם חומצה גופרתית (H₂SO₄). צנרת טיטניום/זירקוניום (עמידה לקורוזיה)', desc_en:'HNO₃ concentrated from 68% to >86% by distillation with H₂SO₄. Titanium/Zirconium piping', temp:'>120°C', color:'#dc2626' },
  { id:'irfna', he:'תחנת ייצור IRFNA', en:'IRFNA Production Station', desc_he:'הוספת N₂O₄ (18-27%) + HF (0.6% מעכב קורוזיה) = IRFNA (AK-27) מוכן למילוי מיכלי טילים! מאוחסן במיכלים מיוחדים', desc_en:'Adding N₂O₄ (18-27%) + HF (0.6% corrosion inhibitor) = IRFNA (AK-27) ready for missile tanks!', color:'#b91c1c' },
];

const raschigEquip: Equipment[] = [
  { id:'nh3tank', he:'מיכל אמוניה', en:'Ammonia Tank', desc_he:'חומר גלם ראשון — אמוניה מזוקקת', desc_en:'First feedstock — distilled ammonia', color:'#3b82f6' },
  { id:'bleach', he:'מיכל נתרן היפוכלוריט', en:'Sodium Hypochlorite Tank', desc_he:'אקונומיקה (NaOCl) — חומר ניקוי ביתי. Dual-use: זמין בכמויות ללא חשד', desc_en:'Bleach (NaOCl) — household cleaner. Dual-use: available in bulk without suspicion', color:'#60a5fa' },
  { id:'chlor', he:'כור כלוראמין (טמפ\' נמוכה)', en:'Chloramine Reactor (Low Temp)', desc_he:'תגובה בטמפרטורה נמוכה (~0-5°C) בקירור. מייצר NH₂Cl — מולקולת ביניים רעילה ותגובתית', desc_en:'Low temperature reaction (~0-5°C) with cooling. Produces NH₂Cl — toxic reactive intermediate', formula:'NH₃ + NaOCl → NH₂Cl + NaOH', temp:'0-5°C', color:'#a855f7' },
  { id:'dma', he:'מיכל דימתילאמין', en:'Dimethylamine Tank', desc_he:'(CH₃)₂NH — חומר כימי תעשייתי. ריח דגים חריף. dual-use: תעשיית תרופות/דשנים', desc_en:'(CH₃)₂NH — industrial chemical. Strong fishy odor. Dual-use: pharma/fertilizer industry', color:'#3b82f6' },
  { id:'react2', he:'כור סינתזה UDMH', en:'UDMH Synthesis Reactor', desc_he:'כלוראמין מגיב עם דימתילאמין ליצירת הקשר N-N — הקשר שנותן להידראזינים את האנרגיה שלהם כדלק', desc_en:'Chloramine reacts with dimethylamine forming N-N bond — the bond giving hydrazines their energy as fuel', formula:'(CH₃)₂NH + NH₂Cl → (CH₃)₂NNH₂ + HCl', temp:'50-80°C', color:'#7c3aed' },
  { id:'distill2', he:'מגדלי זיקוק מרובים', en:'Multiple Distillation Columns', desc_he:'זיקוק מסיבי — הסרת מים, HCl, ותוצרי לוואי. דרושות 3-4 עמודות זיקוק עוקבות. UDMH טהור >98%', desc_en:'Massive distillation — removing water, HCl, byproducts. 3-4 sequential columns needed. Pure UDMH >98%', color:'#6d28d9' },
  { id:'udmh', he:'מיכל אחסון UDMH', en:'UDMH Storage Tank', desc_he:'אחסון באטמוספרת חנקן (למניעת חמצון). CAS 57-14-7. רעיל, מסרטן, נקודת הבזק -15°C. דלק מוכן לטילים', desc_en:'Stored under nitrogen atmosphere (preventing oxidation). CAS 57-14-7. Toxic, carcinogenic. Missile fuel ready', color:'#581c87' },
];

const bachmannEquip: Equipment[] = [
  { id:'hex', he:'מיכל הקסאמין', en:'Hexamine Tank', desc_he:'C₆H₁₂N₄ — חומר פשוט: קוביות הצתה לקמפינג. מולקולת כלוב עם חנקן. Dual-use', desc_en:'C₆H₁₂N₄ — simple compound: camping fuel tablets. Cage molecule with nitrogen', color:'#3b82f6' },
  { id:'acid', he:'מיכל HNO₃ מרוכזת (>98%)', en:'Concentrated HNO₃ Tank (>98%)', desc_he:'חומצה חנקתית מרוכזת — התוצר של תהליך אוסטוולד! הכל חוזר ל-HNO₃. מאוחסנת בטמפרטורה מבוקרת', desc_en:'Concentrated nitric acid — the product of Ostwald process! Everything traces back to HNO₃', color:'#ef4444' },
  { id:'nitr', he:'כור ניטרציה (מבוקר טמפרטורה)', en:'Nitrolysis Reactor (Temp Controlled)', desc_he:'התגובה הקריטית! ניטרציה ב-45-75°C עם קירור מתמיד. חומצה + אנהידריד אצטי + אמוניום חנקתי מחליפים H ב-NO₂. אם הטמפרטורה עולה — פיצוץ!', desc_en:'The critical reaction! Nitrolysis at 45-75°C with constant cooling. If temperature rises — EXPLOSION!', formula:'Hexamine + HNO₃ + NH₄NO₃ + Ac₂O → RDX', temp:'45-75°C', color:'#dc2626' },
  { id:'wash', he:'תחנת שטיפה וייבוש', en:'Wash & Drying Station', desc_he:'RDX/HMX נשטפים בזהירות להסרת שאריות חומצה. ייבוש בטמפרטורה נמוכה — החומר רגיש לזעזועים!', desc_en:'RDX/HMX carefully washed to remove acid residue. Low-temperature drying — material is shock-sensitive!', temp:'<60°C', color:'#f59e0b' },
  { id:'rdx', he:'RDX (הקסוגן) — מוצר', en:'RDX (Hexogen) — Product', desc_he:'חומר נפץ נהדף. יעדים: מילוי ראשי קרב + תוסף אנרגטי לדלק מוצק מתקדם (סג׳יל, ח\'ייבר שכן)', desc_en:'High explosive. Uses: warhead fill + energetic additive for advanced solid fuel', color:'#d97706' },
  { id:'hmx', he:'HMX (אוקטוגן) — מוצר', en:'HMX (Octogen) — Product', desc_he:'חומר נפץ חזק יותר מ-RDX. יעד קריטי: עדשות נפץ גרעיניות (Implosion Lenses) = לב הנשק הגרעיני', desc_en:'More powerful than RDX. Critical use: nuclear implosion lenses = heart of nuclear weapon', color:'#b91c1c' },
];

const procs = [
  { id:'ostwald', equip:ostwaldEquip, he:'אוסטוולד — ייצור HNO₃', en:'Ostwald — HNO₃ Production', icon:'⚗️', bg:'from-blue-950/30 to-slate-900/50', desc_he:'חמצון קטליטי של אמוניה על זרז פלטינה ליצירת חומצה חנקתית — חומר הגלם לכל שרשרת הנשק', desc_en:'Catalytic oxidation of ammonia on platinum catalyst to produce nitric acid — the feedstock for the entire weapons chain' },
  { id:'raschig', equip:raschigEquip, he:'רשיג — ייצור UDMH', en:'Raschig — UDMH Production', icon:'🟣', bg:'from-purple-950/30 to-slate-900/50', desc_he:'ייצור דלק טילים נוזלי מחומרי גלם אזרחיים (Dual-Use)', desc_en:'Producing liquid missile fuel from civilian feedstocks (Dual-Use)' },
  { id:'bachmann', equip:bachmannEquip, he:'בכמן — ייצור RDX/HMX', en:'Bachmann — RDX/HMX Production', icon:'💣', bg:'from-red-950/30 to-slate-900/50', desc_he:'ניטרציה של הקסאמין ליצירת חומרי נפץ — לראשי קרב, דלק מוצק ועדשות גרעיניות', desc_en:'Nitrolysis of hexamine to produce explosives — for warheads, solid fuel and nuclear lenses' },
];

function EquipmentIcon({ type, size = 50 }: { type: string; size?: number }) {
  const s = size;
  // Factory equipment SVG icons
  switch (type) {
    case 'ammonia': case 'nh3tank': case 'bleach': case 'dma': case 'acid': case 'hex':
      // Storage tank with dome
      return <svg width={s} height={s} viewBox="0 0 50 50"><ellipse cx="25" cy="12" rx="14" ry="6" fill="#374151" stroke="#6b7280" strokeWidth="1"/><rect x="11" y="12" width="28" height="28" rx="2" fill="#1f2937" stroke="#6b7280" strokeWidth="1"/><ellipse cx="25" cy="40" rx="14" ry="4" fill="#374151" stroke="#6b7280" strokeWidth="1"/><rect x="20" y="5" width="2" height="7" fill="#6b7280"/><circle cx="21" cy="4" r="2" fill="#ef4444" opacity="0.6"/><rect x="15" y="22" width="20" height="1" fill="#4b5563"/><rect x="15" y="30" width="20" height="1" fill="#4b5563"/></svg>;
    case 'reactor': case 'nitr': case 'react2': case 'chlor':
      // Reactor vessel with pipes
      return <svg width={s} height={s} viewBox="0 0 50 50"><rect x="10" y="8" width="30" height="34" rx="15" fill="#1f2937" stroke="#f59e0b" strokeWidth="1.5"/><rect x="18" y="3" width="3" height="8" fill="#6b7280"/><rect x="29" y="3" width="3" height="8" fill="#6b7280"/><circle cx="25" cy="25" r="8" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2,2"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="4s" repeatCount="indefinite"/></circle><circle cx="25" cy="25" r="3" fill="#f59e0b" opacity="0.3"><animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/></circle><rect x="5" y="20" width="6" height="3" fill="#6b7280" rx="1"/><rect x="39" y="20" width="6" height="3" fill="#6b7280" rx="1"/><rect x="5" y="28" width="6" height="3" fill="#6b7280" rx="1"/><rect x="39" y="28" width="6" height="3" fill="#6b7280" rx="1"/></svg>;
    case 'absorber': case 'distill': case 'distill2':
      // Distillation column
      return <svg width={s} height={s} viewBox="0 0 50 50"><rect x="17" y="2" width="16" height="46" rx="8" fill="#1f2937" stroke="#6b7280" strokeWidth="1"/>{[10,18,26,34].map(y => <rect key={y} x="17" y={y} width="16" height="1" fill="#4b5563"/>)}<rect x="5" y="8" width="13" height="2" fill="#6b7280" rx="1"/><rect x="5" y="38" width="13" height="2" fill="#6b7280" rx="1"/><rect x="32" y="15" width="13" height="2" fill="#6b7280" rx="1"/><circle cx="25" cy="7" r="3" fill="#3b82f6" opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/></circle></svg>;
    case 'mixer':
      // Mixing chamber
      return <svg width={s} height={s} viewBox="0 0 50 50"><circle cx="25" cy="25" r="18" fill="#1f2937" stroke="#60a5fa" strokeWidth="1"/><line x1="25" y1="10" x2="25" y2="40" stroke="#60a5fa" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/></line><line x1="15" y1="20" x2="35" y2="30" stroke="#60a5fa" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/></line><rect x="5" y="22" width="8" height="3" fill="#6b7280" rx="1"/><rect x="37" y="22" width="8" height="3" fill="#6b7280" rx="1"/></svg>;
    case 'cooler':
      // Heat exchanger
      return <svg width={s} height={s} viewBox="0 0 50 50"><rect x="10" y="8" width="30" height="34" rx="3" fill="#1f2937" stroke="#f97316" strokeWidth="1"/>{[14,20,26,32,38].map(y => <path key={y} d={`M14,${y} Q20,${y-3} 25,${y} Q30,${y+3} 36,${y}`} fill="none" stroke="#f97316" strokeWidth="0.8" opacity="0.5"/>)}<rect x="3" y="12" width="8" height="3" fill="#3b82f6" rx="1"/><rect x="39" y="12" width="8" height="3" fill="#ef4444" rx="1"/></svg>;
    case 'wash':
      return <svg width={s} height={s} viewBox="0 0 50 50"><rect x="12" y="10" width="26" height="30" rx="3" fill="#1f2937" stroke="#f59e0b" strokeWidth="1"/><path d="M18,35 Q25,25 32,35" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5"><animate attributeName="d" values="M18,35 Q25,25 32,35;M18,35 Q25,30 32,35;M18,35 Q25,25 32,35" dur="2s" repeatCount="indefinite"/></path><rect x="22" y="5" width="3" height="7" fill="#6b7280"/></svg>;
    default:
      // Product container
      return <svg width={s} height={s} viewBox="0 0 50 50"><rect x="12" y="12" width="26" height="26" rx="4" fill="#1f2937" stroke={type.includes('hmx') ? '#b91c1c' : '#d97706'} strokeWidth="1.5"/><text x="25" y="28" textAnchor="middle" fill={type.includes('hmx') ? '#fca5a5' : '#fcd34d'} fontSize="8" fontWeight="bold">{type.includes('hmx') ? 'HMX' : type.includes('udmh') ? 'UDMH' : 'RDX'}</text><polygon points="25,5 30,12 20,12" fill={type.includes('hmx') ? '#ef4444' : '#f59e0b'} opacity="0.6"/></svg>;
  }
}

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [pi, setPi] = useState(0);
  const [active, setActive] = useState<string|null>(null);
  const proc = procs[pi];
  const eq = proc.equip.find(e => e.id === active);

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'מפעלי הייצור הכימיים' : 'Chemical Production Plants'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על ציוד במפעל לפרטים טכניים' : 'Click equipment for technical details'}</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {procs.map((p, i) => (
          <motion.button key={i} onClick={() => { setPi(i); setActive(null); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-5 py-3 rounded-2xl text-sm font-bold border transition-all ${pi === i ? 'bg-slate-700 text-white border-slate-500 shadow-lg' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
            {p.icon} {h ? p.he : p.en}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className={`rounded-3xl border border-slate-700/40 overflow-hidden bg-gradient-to-br ${proc.bg}`}
            style={{ backgroundImage: 'radial-gradient(circle at 50% 80%, rgba(30,40,60,0.5), transparent 70%)' }}>
            
            {/* Factory floor header */}
            <div className="px-6 pt-5 pb-3 border-b border-slate-700/30">
              <p className="text-sm text-slate-400 text-center">{h ? proc.desc_he : proc.desc_en}</p>
            </div>

            {/* Equipment flow - horizontal scroll on mobile */}
            <div className="p-6 overflow-x-auto">
              <div className="flex items-center gap-3 min-w-max justify-center">
                {proc.equip.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {/* Equipment card */}
                    <motion.div
                      whileHover={{ scale: 1.08, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActive(active === item.id ? null : item.id)}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer transition-all border-2 min-w-[90px] ${active === item.id ? 'border-white/40 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-slate-700/30 bg-slate-900/40 hover:border-slate-500/40'}`}
                    >
                      <EquipmentIcon type={item.id} size={48} />
                      <span className="text-[10px] text-slate-400 text-center leading-tight font-medium max-w-[80px]">
                        {(h ? item.he : item.en).split('(')[0].trim().substring(0, 20)}
                      </span>
                      {item.temp && (
                        <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-900/80 text-amber-300 text-[8px] font-bold border border-amber-700/50">
                          {item.temp}
                        </span>
                      )}
                    </motion.div>

                    {/* Arrow between equipment */}
                    {i < proc.equip.length - 1 && (
                      <div className="flex-shrink-0 text-slate-600">
                        <svg width="24" height="16" viewBox="0 0 24 16"><path d="M0,8 L18,8 M14,3 L20,8 L14,13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              {eq ? (
                <motion.div key={eq.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-700/30 p-6" style={{ background: `linear-gradient(135deg, ${eq.color}15, transparent)` }}>
                  <h4 className="font-black text-lg text-slate-100 mb-2">{h ? eq.he : eq.en}</h4>
                  {eq.formula && (
                    <div className="font-mono text-sm text-green-300 bg-slate-950/80 rounded-lg px-4 py-2.5 mb-3 border border-slate-700/50 inline-block" dir="ltr">
                      {eq.formula}
                    </div>
                  )}
                  <p className="text-sm text-slate-300 leading-relaxed">{h ? eq.desc_he : eq.desc_en}</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="border-t border-slate-700/30 p-4 text-center text-sm text-slate-500">
                  {h ? '👆 לחצו על ציוד במפעל כדי לראות פרטים ומשוואות' : '👆 Click equipment for details & equations'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-xl border-r-4 border-amber-600 bg-amber-950/30 p-4 text-sm text-amber-200">
        ⚡ <b>{h ? 'מערבלים פלנטריים:' : 'Planetary Mixers:'}</b> {h ? 'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — מוברחים מסין. השמדתם יוצרת ואקום ייצורי.' : 'Giant machines for solid fuel mixing. Iran cannot produce — smuggled from China. Destruction creates production vacuum.'}
      </motion.div>
    </section>
  );
}
