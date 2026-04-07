'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

type Node = { id: string; label: string; label_en: string; detail: string; detail_en: string; x: number; y: number; color: string; temp?: string; formula?: string };
type Arrow = { from: string; to: string; label?: string };

const ostwald: { nodes: Node[]; arrows: Arrow[] } = {
  nodes: [
    { id:'nh3', label:'אמוניה (NH₃)', label_en:'Ammonia (NH₃)', detail:'חומר גלם זמין — תעשיית דשנים. מיובא או מיוצר באסלויה', detail_en:'Widely available feedstock from fertilizer industry', x:5, y:40, color:'#3b82f6', formula:'NH₃' },
    { id:'air', label:'אוויר + O₂', label_en:'Air + O₂', detail:'חמצן מהאוויר. יחס 5:4 (O₂:NH₃)', detail_en:'Atmospheric oxygen. 5:4 ratio (O₂:NH₃)', x:5, y:70, color:'#60a5fa' },
    { id:'cat', label:'זרז Pt-Rh\n800-950°C', label_en:'Pt-Rh Catalyst\n800-950°C', detail:'רשת פלטינה-רודיום (90:10). מגע אלפית שנייה. אקסותרמי: -905.2 kJ/mol. הזרז הוא צוואר בקבוק — מיוצר רק בכמה מדינות', detail_en:'Platinum-Rhodium gauze (90:10). Millisecond contact. Exothermic: -905.2 kJ/mol', x:28, y:50, color:'#f59e0b', temp:'800-950°C', formula:'4NH₃ + 5O₂ → 4NO + 6H₂O' },
    { id:'cool', label:'קירור + חמצון', label_en:'Cooling + Oxidation', detail:'NO מתקרר ומגיב עם O₂ נוסף ליצירת NO₂ — גז חום-אדמדם רעיל', detail_en:'NO cools and reacts with additional O₂ to form NO₂ — toxic red-brown gas', x:50, y:50, color:'#f97316', formula:'2NO + O₂ → 2NO₂' },
    { id:'absorb', label:'מגדל ספיגה\n(מים)', label_en:'Absorption Tower\n(Water)', detail:'NO₂ נספג במים. ריכוז ~68%. זיקוק עם H₂SO₄ ל->86%', detail_en:'NO₂ absorbed in water. ~68% concentration. Distill with H₂SO₄ to >86%', x:72, y:50, color:'#f97316', formula:'3NO₂ + H₂O → 2HNO₃ + NO' },
    { id:'hno3', label:'HNO₃\nחומצה חנקתית', label_en:'HNO₃\nNitric Acid', detail:'התוצר הקריטי! ממנו: IRFNA (למחמצן), RDX/HMX (לנפץ), NTO', detail_en:'The critical product! From it: IRFNA (oxidizer), RDX/HMX (explosives), NTO', x:92, y:30, color:'#ef4444' },
    { id:'irfna', label:'IRFNA\n+N₂O₄ +HF', label_en:'IRFNA\n+N₂O₄ +HF', detail:'הוספת 18-27% N₂O₄ + 0.6% HF (מעכב) = מחמצן מוכן לטילים', detail_en:'Add 18-27% N₂O₄ + 0.6% HF (inhibitor) = missile-ready oxidizer', x:92, y:65, color:'#dc2626' },
  ],
  arrows: [
    { from:'nh3', to:'cat' }, { from:'air', to:'cat' },
    { from:'cat', to:'cool', label:'NO' }, { from:'cool', to:'absorb', label:'NO₂' },
    { from:'absorb', to:'hno3', label:'~68%' }, { from:'hno3', to:'irfna', label:'+N₂O₄+HF' },
  ]
};

const raschig: { nodes: Node[]; arrows: Arrow[] } = {
  nodes: [
    { id:'nh3', label:'אמוניה (NH₃)', label_en:'Ammonia (NH₃)', detail:'חומר גלם ראשון', detail_en:'First feedstock', x:5, y:30, color:'#3b82f6' },
    { id:'naocl', label:'נתרן היפוכלוריט\n(NaOCl)', label_en:'Sodium Hypochlorite\n(NaOCl)', detail:'אקונומיקה — חומר ניקוי ביתי. זמין בכל מקום', detail_en:'Bleach — household cleaning product. Universally available', x:5, y:70, color:'#60a5fa' },
    { id:'chlor', label:'יצירת כלוראמין\nטמפ\' נמוכה', label_en:'Chloramine Formation\nLow Temperature', detail:'תגובה בטמפרטורות קרות. כלוראמין (NH₂Cl) = מולקולת ביניים תגובתית', detail_en:'Low temperature reaction. Chloramine (NH₂Cl) = reactive intermediate', x:30, y:50, color:'#a855f7', formula:'NH₃ + NaOCl → NH₂Cl + NaOH' },
    { id:'dma', label:'דימתילאמין\n(CH₃)₂NH', label_en:'Dimethylamine\n(CH₃)₂NH', detail:'חומר כימי תעשייתי. ריח דגים חריף', detail_en:'Industrial chemical. Strong fishy odor', x:55, y:25, color:'#3b82f6' },
    { id:'react', label:'תגובה + זיקוק', label_en:'Reaction + Distillation', detail:'הכלוראמין מגיב עם דימתילאמין. יוצר קשר N-N. זיקוק מסיבי להסרת מים', detail_en:'Chloramine reacts with dimethylamine. Forms N-N bond. Massive distillation to remove water', x:55, y:55, color:'#a855f7', formula:'(CH₃)₂NH + NH₂Cl → (CH₃)₂NNH₂ + HCl' },
    { id:'udmh', label:'UDMH\nדימתילהידראזין', label_en:'UDMH\nDimethylhydrazine', detail:'דלק טילים רעיל ומסרטן. שקוף, ריח אמוניה. CAS 57-14-7', detail_en:'Toxic carcinogenic missile fuel. Colorless, ammonia odor. CAS 57-14-7', x:82, y:50, color:'#7c3aed' },
  ],
  arrows: [
    { from:'nh3', to:'chlor' }, { from:'naocl', to:'chlor' },
    { from:'chlor', to:'react', label:'NH₂Cl' }, { from:'dma', to:'react' },
    { from:'react', to:'udmh', label:'זיקוק' },
  ]
};

const bachmann: { nodes: Node[]; arrows: Arrow[] } = {
  nodes: [
    { id:'hex', label:'הקסאמין\n(Hexamine)', label_en:'Hexamine\n(Urotropine)', detail:'חומר פשוט — קוביות הצתה לקמפינג. מולקולת כלוב C₆H₁₂N₄', detail_en:'Simple compound — camping fuel tablets. Cage molecule C₆H₁₂N₄', x:5, y:40, color:'#3b82f6' },
    { id:'hno3', label:'HNO₃ מרוכזת\n(>98%)', label_en:'Conc. HNO₃\n(>98%)', detail:'חומצה חנקתית מרוכזת מתהליך אוסטוולד. הכל חוזר ל-HNO₃!', detail_en:'Concentrated nitric acid from Ostwald process. Everything traces back to HNO₃!', x:5, y:70, color:'#ef4444' },
    { id:'nitr', label:'ניטרציה\n45-75°C', label_en:'Nitrolysis\n45-75°C', detail:'ניטרציה מבוקרת. טמפרטורה חייבת להישמר — אחרת פיצוץ במפעל! + אנהידריד אצטי + אמוניום חנקתי', detail_en:'Controlled nitrolysis. Temperature must be maintained — otherwise factory explosion! + acetic anhydride + ammonium nitrate', x:35, y:50, color:'#dc2626', temp:'45-75°C', formula:'Hexamine + HNO₃ + NH₄NO₃ + Ac₂O → RDX' },
    { id:'rdx', label:'RDX\n(הקסוגן)', label_en:'RDX\n(Hexogen)', detail:'חומר נפץ נהדף. למילוי ראשי קרב ותוסף אנרגטי לדלק מוצק מתקדם', detail_en:'High explosive. For warhead fill and energetic additive in advanced solid fuel', x:65, y:30, color:'#f59e0b' },
    { id:'hmx', label:'HMX\n(אוקטוגן)', label_en:'HMX\n(Octogen)', detail:'חומר נפץ חזק יותר. משמש גם לעדשות נפץ גרעיניות (Implosion Lenses)', detail_en:'More powerful explosive. Also used for nuclear implosion lenses', x:65, y:70, color:'#ef4444' },
    { id:'use1', label:'ראשי קרב', label_en:'Warheads', detail:'מילוי ראשי קרב טילים', detail_en:'Missile warhead fill', x:88, y:20, color:'#f97316' },
    { id:'use2', label:'דלק מוצק +', label_en:'Solid Fuel +', detail:'תוסף אנרגטי בסג׳יל, ח׳ייבר שכן', detail_en:'Energetic additive in Sejjil, Kheibar Shekan', x:88, y:50, color:'#d97706' },
    { id:'use3', label:'עדשות גרעיניות', label_en:'Nuclear Lenses', detail:'Implosion Lenses — הלב של נשק גרעיני', detail_en:'Implosion Lenses — the heart of a nuclear weapon', x:88, y:80, color:'#dc2626' },
  ],
  arrows: [
    { from:'hex', to:'nitr' }, { from:'hno3', to:'nitr' },
    { from:'nitr', to:'rdx' }, { from:'nitr', to:'hmx' },
    { from:'rdx', to:'use1' }, { from:'rdx', to:'use2' },
    { from:'hmx', to:'use3' },
  ]
};

const processes = [
  { id:'ostwald', data:ostwald, label:{he:'אוסטוולד — HNO₃',en:'Ostwald — HNO₃'}, icon:'⚗️', desc:{he:'חמצון קטליטי של אמוניה לייצור חומצה חנקתית',en:'Catalytic oxidation of ammonia to produce nitric acid'} },
  { id:'raschig', data:raschig, label:{he:'רשיג — UDMH',en:'Raschig — UDMH'}, icon:'🟣', desc:{he:'ייצור דלק טילים נוזלי מאמוניה וכלוראמין',en:'Producing liquid missile fuel from ammonia & chloramine'} },
  { id:'bachmann', data:bachmann, label:{he:'בכמן — RDX/HMX',en:'Bachmann — RDX/HMX'}, icon:'💣', desc:{he:'ניטרציה של הקסאמין לייצור חומרי נפץ',en:'Nitrolysis of hexamine to produce explosives'} },
];

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [activeProc, setActiveProc] = useState(0);
  const [activeNode, setActiveNode] = useState<string|null>(null);
  const proc = processes[activeProc];
  const { nodes, arrows } = proc.data;
  const node = nodes.find(n => n.id === activeNode);

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'תרשימי תהליכי ייצור כימיים' : 'Chemical Production Process Diagrams'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על צומת כדי לראות פרטים' : 'Click a node for details'}</p>
      </motion.div>

      {/* Process selector */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {processes.map((p, i) => (
          <button key={i} onClick={() => { setActiveProc(i); setActiveNode(null); }}
            className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${activeProc === i ? 'bg-blue-800/60 text-blue-200 border-blue-600/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>
            {p.icon} {h ? p.label.he : p.label.en}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeProc} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-4 md:p-6">
            <p className="text-sm text-slate-400 text-center mb-4">{h ? proc.desc.he : proc.desc.en}</p>
            
            {/* SVG Flow Diagram */}
            <div className="relative w-full" style={{ paddingBottom: '35%', minHeight: 250 }}>
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#60a5fa" /></marker>
                </defs>
                
                {/* Arrows */}
                {arrows.map((a, i) => {
                  const f = nodes.find(n => n.id === a.from)!;
                  const t = nodes.find(n => n.id === a.to)!;
                  const fw = f.id === activeNode || t.id === activeNode ? '0.8' : '0.4';
                  return (
                    <g key={i}>
                      <line x1={f.x + 8} y1={f.y + 5} x2={t.x} y2={t.y + 5}
                        stroke="#60a5fa" strokeWidth={fw} markerEnd="url(#arrowhead)" opacity={0.6} />
                      {a.label && <text x={(f.x + t.x) / 2 + 4} y={(f.y + t.y) / 2 + 2}
                        fill="#94a3b8" fontSize="2.2" textAnchor="middle" className="select-none">{a.label}</text>}
                    </g>
                  );
                })}

                {/* Nodes */}
                {nodes.map(n => (
                  <g key={n.id} className="cursor-pointer" onClick={() => setActiveNode(activeNode === n.id ? null : n.id)}>
                    <rect x={n.x - 1} y={n.y - 1} width={16} height={14} rx="2"
                      fill={activeNode === n.id ? n.color + 'cc' : n.color + '40'}
                      stroke={n.color} strokeWidth={activeNode === n.id ? '0.8' : '0.3'} />
                    <text x={n.x + 7} y={n.y + 5} textAnchor="middle" dominantBaseline="middle"
                      fill={activeNode === n.id ? '#fff' : '#e2e8f0'}
                      fontSize="2" fontWeight="bold" className="select-none pointer-events-none">
                      {(h ? n.label : n.label_en).split('\n')[0].substring(0, 18)}
                    </text>
                    {(h ? n.label : n.label_en).split('\n')[1] && (
                      <text x={n.x + 7} y={n.y + 8.5} textAnchor="middle" dominantBaseline="middle"
                        fill="#94a3b8" fontSize="1.8" className="select-none pointer-events-none">
                        {(h ? n.label : n.label_en).split('\n')[1].substring(0, 18)}
                      </text>
                    )}
                    {n.temp && <text x={n.x + 7} y={n.y + 12} textAnchor="middle" fill="#f59e0b" fontSize="1.5" className="select-none pointer-events-none">{n.temp}</text>}
                  </g>
                ))}
              </svg>
            </div>

            {/* Node info */}
            <AnimatePresence mode="wait">
              {node ? (
                <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl p-5 border" style={{ borderColor: node.color + '60', backgroundColor: node.color + '10' }}>
                  <h4 className="font-black text-lg text-slate-100 mb-1">{h ? node.label.replace('\n',' ') : node.label_en.replace('\n',' ')}</h4>
                  {node.formula && <div className="font-mono text-xs text-green-300 bg-slate-950/80 rounded-lg px-3 py-2 mb-2 border border-slate-700/50" dir="ltr">{node.formula}</div>}
                  <p className="text-sm text-slate-300 leading-relaxed">{h ? node.detail : node.detail_en}</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center text-sm text-slate-500 py-4">
                  {h ? '👆 לחצו על צומת בתרשים כדי לראות פרטים ומשוואות' : '👆 Click a node to see details & equations'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Chokepoint warning */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-xl border-r-4 border-amber-600 bg-amber-950/30 p-4 text-sm text-amber-200">
        ⚡ <b>{h ? 'מערבלים פלנטריים (Planetary Mixers):' : 'Planetary Mixers:'}</b> {h ? 'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — הברחות מסין. השמדתם = ואקום ייצורי.' : 'Giant machines for mixing solid fuel. Iran cannot produce — smuggled from China. Destruction = production vacuum.'}
      </motion.div>
    </section>
  );
}
