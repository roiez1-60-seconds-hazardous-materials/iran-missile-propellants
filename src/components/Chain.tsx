'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type EquipNode = { id:string; type:'reactor'|'tower'|'tank'|'hx'|'pump'|'product'; label:string; label_en:string; detail:string; detail_en:string; x:number; y:number; color:string; temp?:string };
type Pipe = { from:string; to:string; label?:string; color?:string };

const ostwaldNodes: EquipNode[] = [
  { id:'nh3tank', type:'tank', label:'מיכל אמוניה', label_en:'NH₃ Tank', detail:'מיכל אחסון אמוניה בלחץ. חומר גלם מתעשיית הדשנים — זמין ובשימוש כפול (dual-use)', detail_en:'Pressurized ammonia storage. Fertilizer industry feedstock — available, dual-use', x:5, y:20, color:'#3b82f6' },
  { id:'air', type:'pump', label:'מדחס אוויר', label_en:'Air Compressor', detail:'דוחס אוויר (O₂) ליחס 5:4 מול עם NH₃. מסנן לחות ואבק', detail_en:'Compresses air (O₂) at 5:4 molar ratio with NH₃. Moisture/dust filtered', x:5, y:65, color:'#60a5fa' },
  { id:'converter', type:'reactor', label:'כור קטליטי\nPt-Rh', label_en:'Catalytic\nConverter', detail:'הלב של התהליך: רשת פלטינה-רודיום (90:10) במגע של אלפית שנייה. 800-950°C, 4-10 bar. תגובה אקסותרמית: -905.2 kJ/mol. 4NH₃+5O₂→4NO+6H₂O. הזרז יקר ביותר — מיוצר רק בכמה מדינות', detail_en:'Process heart: Pt-Rh gauze (90:10) with millisecond contact. 800-950°C, 4-10 bar. Exothermic: -905.2 kJ/mol. Catalyst extremely expensive — few countries produce it', x:28, y:35, color:'#f59e0b', temp:'800-950°C' },
  { id:'cooler', type:'hx', label:'מחליף חום\n+ חמצון', label_en:'Heat Exchanger\n+ Oxidation', detail:'NO מתקרר וחמצן נוסף הופך אותו ל-NO₂ (גז חום-אדמדם רעיל). 2NO+O₂→2NO₂. חום מנוצל לחימום חומרי גלם (רקופרציה)', detail_en:'NO cools, additional O₂ converts to NO₂ (toxic red-brown gas). 2NO+O₂→2NO₂. Heat recovered for feedstock preheating', x:50, y:35, color:'#f97316' },
  { id:'absorber', type:'tower', label:'מגדל ספיגה', label_en:'Absorption\nTower', detail:'מגדל גבוה עם מדפי בועות. NO₂ נספג במים: 3NO₂+H₂O→2HNO₃+NO. ריכוז ~68%. NO שנוצר חוזר לחמצון. צנרת טיטניום/זירקוניום עמידה לחומצה', detail_en:'Tall bubble-tray column. NO₂ absorbed in water: 3NO₂+H₂O→2HNO₃+NO. ~68% concentration. Titanium/Zirconium piping', x:68, y:20, color:'#ea580c' },
  { id:'conc', type:'tower', label:'מגדל ריכוז\n(זיקוק)', label_en:'Concentrator\n(Distillation)', detail:'ריכוז ל->86% באמצעות זיקוק עם חומצה גופרתית (H₂SO₄) כמייבש. צנרת מיוחדת — HNO₃ מרוכזת מאכלת כל מתכת רגילה', detail_en:'Concentration to >86% via distillation with H₂SO₄ as desiccant. Special piping — concentrated HNO₃ corrodes all common metals', x:83, y:20, color:'#dc2626' },
  { id:'hno3', type:'product', label:'HNO₃', label_en:'HNO₃', detail:'חומצה חנקתית מרוכזת (>86%) — חומר הגלם הקריטי ביותר. ממנו מייצרים IRFNA, RDX, HMX, NTO', detail_en:'Concentrated nitric acid (>86%) — most critical feedstock. Used to produce IRFNA, RDX, HMX, NTO', x:83, y:65, color:'#ef4444' },
  { id:'irfna', type:'product', label:'IRFNA\n(+N₂O₄+HF)', label_en:'IRFNA\n(+N₂O₄+HF)', detail:'הוספת 18-27% N₂O₄ + 0.6% HF (מעכב קורוזיה) = מחמצן מוכן לשימוש בטילים נוזליים', detail_en:'Add 18-27% N₂O₄ + 0.6% HF (corrosion inhibitor) = missile-ready liquid oxidizer', x:68, y:70, color:'#dc2626' },
];
const ostwaldPipes: Pipe[] = [
  { from:'nh3tank', to:'converter', label:'NH₃' }, { from:'air', to:'converter', label:'O₂' },
  { from:'converter', to:'cooler', label:'NO (גז)' }, { from:'cooler', to:'absorber', label:'NO₂' },
  { from:'absorber', to:'conc', label:'HNO₃ 68%' }, { from:'conc', to:'hno3', label:'>86%' },
  { from:'hno3', to:'irfna', label:'+N₂O₄+HF' },
];

const raschigNodes: EquipNode[] = [
  { id:'nh3', type:'tank', label:'אמוניה (NH₃)', label_en:'Ammonia (NH₃)', detail:'חומר גלם זמין. תעשיית דשנים וניקוי', detail_en:'Available feedstock. Fertilizer & cleaning industries', x:5, y:25, color:'#3b82f6' },
  { id:'naocl', type:'tank', label:'נתרן היפוכלוריט\n(NaOCl — אקונומיקה)', label_en:'Sodium Hypochlorite\n(NaOCl — Bleach)', detail:'אקונומיקה — חומר ניקוי ביתי. זמין בכמויות תעשייתיות. שימוש כפול מובהק', detail_en:'Bleach — household cleaner. Available in industrial quantities. Clear dual-use', x:5, y:65, color:'#60a5fa' },
  { id:'reactor1', type:'reactor', label:'כור תגובה\n(טמפ\' נמוכה)', label_en:'Reactor\n(Low Temp)', detail:'תגובה בטמפרטורות קרות (5-10°C). NH₃+NaOCl→NH₂Cl+NaOH. כלוראמין — מולקולת ביניים תגובתית ורעילה', detail_en:'Low temperature reaction (5-10°C). NH₃+NaOCl→NH₂Cl+NaOH. Chloramine — reactive toxic intermediate', x:30, y:40, color:'#a855f7', temp:'5-10°C' },
  { id:'dma', type:'tank', label:'דימתילאמין\n(CH₃)₂NH', label_en:'Dimethylamine\n(CH₃)₂NH', detail:'חומר כימי תעשייתי. ריח דגים חריף. שימוש כפול — גם בתעשיית הצבע', detail_en:'Industrial chemical. Strong fishy odor. Dual-use — also in paint industry', x:55, y:15, color:'#3b82f6' },
  { id:'reactor2', type:'reactor', label:'כור תגובה\nראשי', label_en:'Main\nReactor', detail:'NH₂Cl+(CH₃)₂NH→(CH₃)₂NNH₂+HCl. יצירת הקשר N-N שנותן לנוזל את האנרגיה כדלק. תגובה מסוכנת — גזי HCl רעילים', detail_en:'NH₂Cl+(CH₃)₂NH→(CH₃)₂NNH₂+HCl. N-N bond formation gives the fuel its energy. Dangerous — toxic HCl gases', x:55, y:50, color:'#7c3aed' },
  { id:'distill', type:'tower', label:'מגדל זיקוק\n(מרובה)', label_en:'Distillation\nColumn', detail:'זיקוק חוזר ונשנה להסרת מים ולהשגת ריכוז טהור מספיק למנועי טילים. תהליך ארוך ומסוכן', detail_en:'Repeated distillation to remove water and achieve purity sufficient for missile engines. Long & dangerous process', x:78, y:35, color:'#6d28d9' },
  { id:'udmh', type:'product', label:'UDMH', label_en:'UDMH', detail:'דימתילהידראזין בלתי סימטרי. דלק טילים רעיל ומסרטן (IARC 2B). CAS 57-14-7. שקוף, ריח אמוניה/דגים', detail_en:'Unsymmetrical Dimethylhydrazine. Toxic carcinogenic missile fuel (IARC 2B). Colorless, ammonia/fish odor', x:78, y:70, color:'#7c3aed' },
];
const raschigPipes: Pipe[] = [
  { from:'nh3', to:'reactor1' }, { from:'naocl', to:'reactor1' },
  { from:'reactor1', to:'reactor2', label:'NH₂Cl' }, { from:'dma', to:'reactor2' },
  { from:'reactor2', to:'distill', label:'UDMH גולמי' }, { from:'distill', to:'udmh', label:'UDMH טהור' },
];

const bachmannNodes: EquipNode[] = [
  { id:'hex', type:'tank', label:'הקסאמין\n(Hexamine)', label_en:'Hexamine\n(Urotropine)', detail:'מולקולת כלוב C₆H₁₂N₄. חומר פשוט — קוביות הצתה לקמפינג. זמין בשוק הפתוח', detail_en:'Cage molecule C₆H₁₂N₄. Simple compound — camping ignition tablets. Commercially available', x:5, y:25, color:'#3b82f6' },
  { id:'hno3', type:'tank', label:'HNO₃ מרוכזת\n(מאוסטוולד)', label_en:'Conc. HNO₃\n(from Ostwald)', detail:'חומצה חנקתית >98% מתהליך אוסטוולד. הכל חוזר ל-HNO₃!', detail_en:'Nitric acid >98% from Ostwald process. Everything traces back to HNO₃!', x:5, y:65, color:'#ef4444' },
  { id:'nitr', type:'reactor', label:'כור ניטרציה\n(מבוקר)', label_en:'Nitrolysis\nReactor', detail:'ניטרציה מבוקרת ב-45-75°C. הוספת אנהידריד אצטי + אמוניום חנקתי. קירור מתמיד — אם הטמפרטורה עולה = פיצוץ במפעל! תהליך מסוכן ביותר', detail_en:'Controlled nitrolysis at 45-75°C. Adding acetic anhydride + ammonium nitrate. Constant cooling — if temperature rises = factory explosion! Extremely dangerous', x:35, y:40, color:'#dc2626', temp:'45-75°C' },
  { id:'wash', type:'tower', label:'שטיפה\nוניקוי', label_en:'Washing\n& Purification', detail:'שטיפת התוצר בסודיום ביקרבונט לנטרול חומצה שיורית. סינון וייבוש', detail_en:'Product washing with sodium bicarbonate to neutralize residual acid. Filtering & drying', x:58, y:40, color:'#f97316' },
  { id:'rdx', type:'product', label:'RDX\n(הקסוגן)', label_en:'RDX\n(Hexogen)', detail:'חומר נפץ נהדף (High Explosive). מילוי ראשי קרב טילים + תוסף אנרגטי לדלק מוצק מתקדם (סג׳יל, ח׳ייבר שכן)', detail_en:'High Explosive. Missile warhead fill + energetic additive for advanced solid fuel (Sejjil, Kheibar Shekan)', x:80, y:20, color:'#f59e0b' },
  { id:'hmx', type:'product', label:'HMX\n(אוקטוגן)', label_en:'HMX\n(Octogen)', detail:'חומר נפץ חזק יותר מ-RDX. שימוש קריטי: עדשות נפץ גרעיניות (Implosion Lenses) — הלב של נשק גרעיני', detail_en:'More powerful than RDX. Critical use: nuclear Implosion Lenses — the heart of a nuclear weapon', x:80, y:65, color:'#ef4444' },
];
const bachmannPipes: Pipe[] = [
  { from:'hex', to:'nitr' }, { from:'hno3', to:'nitr' },
  { from:'nitr', to:'wash' }, { from:'wash', to:'rdx' }, { from:'wash', to:'hmx' },
];

const allProcs = [
  { id:'ostwald', nodes:ostwaldNodes, pipes:ostwaldPipes, label:{he:'⚗️ אוסטוולד — HNO₃',en:'⚗️ Ostwald — HNO₃'}, desc:{he:'חמצון קטליטי של אמוניה לייצור חומצה חנקתית — חומר הגלם הקריטי ביותר',en:'Catalytic oxidation of ammonia — the most critical feedstock'} },
  { id:'raschig', nodes:raschigNodes, pipes:raschigPipes, label:{he:'🟣 רשיג — UDMH',en:'🟣 Raschig — UDMH'}, desc:{he:'ייצור דלק טילים נוזלי רעיל מחומרי גלם ביתיים',en:'Producing toxic liquid missile fuel from household chemicals'} },
  { id:'bachmann', nodes:bachmannNodes, pipes:bachmannPipes, label:{he:'💣 בכמן — RDX/HMX',en:'💣 Bachmann — RDX/HMX'}, desc:{he:'ניטרציה מסוכנת לייצור חומרי נפץ לראשי קרב ועדשות גרעיניות',en:'Dangerous nitrolysis to produce warhead explosives & nuclear lenses'} },
];

const equipShapes: Record<string, (x:number,y:number,color:string,active:boolean)=>React.ReactNode> = {
  reactor: (x,y,c,a) => <><circle cx={x+6} cy={y+8} r="7" fill={a?c+'44':c+'18'} stroke={c} strokeWidth={a?'1.5':'0.6'} /><line x1={x+3} y1={y+4} x2={x+9} y2={y+4} stroke={c} strokeWidth="0.5" /><line x1={x+6} y1={y+1} x2={x+6} y2={y+4} stroke={c} strokeWidth="0.5" /></>,
  tower: (x,y,c,a) => <><rect x={x+2} y={y} width="8" height="16" rx="2" fill={a?c+'44':c+'18'} stroke={c} strokeWidth={a?'1.5':'0.6'} />{[3,6,9,12].map(dy=><line key={dy} x1={x+3} y1={y+dy} x2={x+9} y2={y+dy} stroke={c+'80'} strokeWidth="0.3" />)}</>,
  tank: (x,y,c,a) => <><rect x={x+1} y={y+2} width="10" height="12" rx="4" fill={a?c+'44':c+'18'} stroke={c} strokeWidth={a?'1.5':'0.6'} /><ellipse cx={x+6} cy={y+3} rx="5" ry="1.5" fill={c+'30'} stroke={c} strokeWidth="0.4" /></>,
  hx: (x,y,c,a) => <><rect x={x+1} y={y+1} width="10" height="14" rx="1" fill={a?c+'44':c+'18'} stroke={c} strokeWidth={a?'1.5':'0.6'} />{[4,7,10].map(dy=><><line key={'a'+dy} x1={x+2} y1={y+dy} x2={x+10} y2={y+dy} stroke={c+'60'} strokeWidth="0.4" /><line key={'b'+dy} x1={x+2} y1={y+dy+1} x2={x+10} y2={y+dy+1} stroke={c+'40'} strokeWidth="0.3" /></>)}</>,
  pump: (x,y,c,a) => <><circle cx={x+6} cy={y+8} r="5" fill={a?c+'44':c+'18'} stroke={c} strokeWidth={a?'1.5':'0.6'} /><polygon points={`${x+4},${y+6} ${x+8},${y+8} ${x+4},${y+10}`} fill={c+'60'} /></>,
  product: (x,y,c,a) => <><rect x={x+1} y={y+2} width="10" height="12" rx="2" fill={a?c+'55':c+'25'} stroke={c} strokeWidth={a?'2':'0.8'} /><text x={x+6} y={y+9} textAnchor="middle" fill="#fff" fontSize="4" fontWeight="bold" className="pointer-events-none select-none">★</text></>,
};

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [pi, setPi] = useState(0);
  const [activeNode, setActiveNode] = useState<string|null>(null);
  const proc = allProcs[pi];
  const node = proc.nodes.find(n => n.id === activeNode);

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'תרשימי תהליכי ייצור כימיים' : 'Chemical Production Process Diagrams'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על ציוד במפעל כדי לראות פרטים ומשוואות' : 'Click equipment in the plant for details & equations'}</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {allProcs.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setActiveNode(null); }}
            className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${pi === i ? 'bg-blue-900/60 text-blue-200 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
            {h ? p.label.he : p.label.en}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-sm overflow-hidden">
            <div className="p-3 border-b border-slate-700/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-amber-500" /><div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-slate-500 mr-2">P&ID — {h ? proc.desc.he : proc.desc.en}</span>
            </div>

            {/* Plant diagram */}
            <div className="relative p-4" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
              <svg viewBox="0 0 100 85" className="w-full" style={{ minHeight: 300 }}>
                <defs>
                  <marker id="pipeArrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
                    <polygon points="0 0, 5 2, 0 4" fill="#60a5fa" />
                  </marker>
                </defs>

                {/* Pipes */}
                {proc.pipes.map((pipe, i) => {
                  const f = proc.nodes.find(n => n.id === pipe.from)!;
                  const t = proc.nodes.find(n => n.id === pipe.to)!;
                  const fx = f.x + 6, fy = f.y + 8, tx = t.x + 6, ty = t.y + 8;
                  const mx = (fx + tx) / 2, my = (fy + ty) / 2;
                  const highlighted = activeNode === pipe.from || activeNode === pipe.to;
                  return (
                    <g key={i}>
                      <line x1={fx} y1={fy} x2={tx} y2={ty}
                        stroke={highlighted ? '#60a5fa' : '#334155'} strokeWidth={highlighted ? '0.8' : '0.4'}
                        markerEnd="url(#pipeArrow)" strokeDasharray={highlighted ? '' : '2,1'} />
                      {pipe.label && <text x={mx} y={my - 1.5} textAnchor="middle" fill="#94a3b8" fontSize="2.3" className="select-none">{pipe.label}</text>}
                    </g>
                  );
                })}

                {/* Equipment */}
                {proc.nodes.map(n => {
                  const isActive = activeNode === n.id;
                  const shape = equipShapes[n.type];
                  return (
                    <g key={n.id} className="cursor-pointer" onClick={() => setActiveNode(activeNode === n.id ? null : n.id)} onMouseEnter={() => setActiveNode(n.id)}>
                      {shape && shape(n.x, n.y, n.color, isActive)}
                      <text x={n.x + 6} y={n.y + 20} textAnchor="middle" fill={isActive ? '#fff' : '#94a3b8'} fontSize="2.2" fontWeight="bold" className="pointer-events-none select-none">
                        {(h ? n.label : n.label_en).split('\n')[0].substring(0, 16)}
                      </text>
                      {(h ? n.label : n.label_en).split('\n')[1] && (
                        <text x={n.x + 6} y={n.y + 23} textAnchor="middle" fill="#64748b" fontSize="2" className="pointer-events-none select-none">
                          {(h ? n.label : n.label_en).split('\n')[1].substring(0, 18)}
                        </text>
                      )}
                      {n.temp && <text x={n.x + 6} y={n.y - 1} textAnchor="middle" fill="#f59e0b" fontSize="2" fontWeight="bold" className="pointer-events-none select-none">{n.temp}</text>}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              {node ? (
                <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="border-t border-slate-700/30 p-5" style={{ backgroundColor: node.color + '08' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: node.color }} />
                    <div>
                      <h4 className="font-black text-lg text-slate-100 mb-1">{(h ? node.label : node.label_en).replace('\n', ' ')}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{h ? node.detail : node.detail_en}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div className="border-t border-slate-700/30 p-4 text-center text-sm text-slate-500">
                  {h ? '👆 לחצו על ציוד במפעל — כור, מגדל, מיכל — לפרטים טכניים' : '👆 Click plant equipment — reactor, tower, tank — for technical details'}
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
