'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const processes = [
  { id:'ostwald', icon:'⚗️', he:'אוסטוולד — HNO₃', en:'Ostwald — HNO₃',
    descHe:'חמצון קטליטי של אמוניה על זרז פלטינה ליצירת חומצה חנקתית — חומר המוצא לכל שרשרת הנשק',
    descEn:'Catalytic oxidation of ammonia over platinum to produce nitric acid — the precursor for the entire weapons chain',
    steps:[
      { he:'אמוניה (NH₃) + אוויר מוזרמים לכור', en:'Ammonia (NH₃) + air fed into reactor', formula:'Input: NH₃ + O₂', icon:'🏭', temp:'' },
      { he:'זרז פלטינה-רודיום (Pt-Rh 90:10) ב-800-950°C', en:'Pt-Rh catalyst gauze (90:10) at 800-950°C', formula:'4NH₃ + 5O₂ → 4NO + 6H₂O', icon:'🔥', temp:'800-950°C' },
      { he:'קירור + חמצון: NO הופך ל-NO₂ (גז חום-אדום רעיל)', en:'Cooling + oxidation: NO becomes NO₂ (toxic red-brown gas)', formula:'2NO + O₂ → 2NO₂', icon:'❄️', temp:'' },
      { he:'מגדל ספיגה: NO₂ נספג במים. ריכוז ~68%', en:'Absorption tower: NO₂ absorbed in water. ~68% concentration', formula:'3NO₂ + H₂O → 2HNO₃ + NO', icon:'💧', temp:'' },
      { he:'ריכוז עם H₂SO₄ ל->86%. תוצר: HNO₃ מרוכזת', en:'Concentration with H₂SO₄ to >86%. Product: concentrated HNO₃', formula:'→ HNO₃ (>86%)', icon:'⚗️', temp:'' },
      { he:'הוספת N₂O₄ (18-27%) + HF (0.6%) = IRFNA מוכן לטילים!', en:'Add N₂O₄ (18-27%) + HF (0.6%) = IRFNA ready for missiles!', formula:'HNO₃ + N₂O₄ + HF → IRFNA', icon:'🚀', temp:'' },
    ]},
  { id:'raschig', icon:'🟣', he:'רשיג — UDMH', en:'Raschig — UDMH',
    descHe:'ייצור דלק טילים נוזלי UDMH מחומרי גלם ביתיים — אמוניה, אקונומיקה ודימתילאמין',
    descEn:'Producing UDMH liquid missile fuel from household feedstocks — ammonia, bleach and dimethylamine',
    steps:[
      { he:'אמוניה (NH₃) + נתרן היפוכלוריט (אקונומיקה)', en:'Ammonia (NH₃) + sodium hypochlorite (bleach)', formula:'Input: NH₃ + NaOCl', icon:'🧪', temp:'' },
      { he:'תגובה בטמפרטורה נמוכה → כלוראמין (NH₂Cl)', en:'Low temperature reaction → chloramine (NH₂Cl)', formula:'NH₃ + NaOCl → NH₂Cl + NaOH', icon:'❄️', temp:'~0°C' },
      { he:'כלוראמין + דימתילאמין (ריח דגים)', en:'Chloramine + dimethylamine (fishy smell)', formula:'(CH₃)₂NH + NH₂Cl → (CH₃)₂NNH₂ + HCl', icon:'⚗️', temp:'' },
      { he:'זיקוק מסיבי — הפרדת UDMH ממים ומלחים', en:'Massive distillation — separating UDMH from water and salts', formula:'Distillation → pure UDMH', icon:'🔥', temp:'63°C' },
      { he:'תוצר: UDMH טהור — דלק טילים רעיל ומסרטן (CAS 57-14-7)', en:'Product: pure UDMH — toxic carcinogenic missile fuel (CAS 57-14-7)', formula:'→ H₂NN(CH₃)₂', icon:'☠️', temp:'' },
    ]},
  { id:'bachmann', icon:'💣', he:'בכמן — RDX/HMX', en:'Bachmann — RDX/HMX',
    descHe:'ניטרציה של הקסאמין בחומצה חנקתית מרוכזת — ייצור חומרי הנפץ לדלק מוצק, ראשי קרב ועדשות גרעיניות',
    descEn:'Nitrolysis of hexamine in concentrated nitric acid — producing explosives for solid fuel, warheads and nuclear lenses',
    steps:[
      { he:'הקסאמין (קוביות הצתה לקמפינג) + HNO₃ מרוכזת (מתהליך אוסטוולד!)', en:'Hexamine (camping fuel tablets) + concentrated HNO₃ (from Ostwald!)', formula:'Input: C₆H₁₂N₄ + HNO₃', icon:'🧪', temp:'' },
      { he:'ניטרציה מבוקרת: 45-75°C. טמפרטורה עולה = פיצוץ!', en:'Controlled nitrolysis: 45-75°C. Temperature rises = explosion!', formula:'Hexamine + HNO₃ + NH₄NO₃ + Ac₂O', icon:'⚠️', temp:'45-75°C' },
      { he:'שטיפה, סינון, ייבוש → גבישי RDX לבנים', en:'Washing, filtering, drying → white RDX crystals', formula:'→ RDX (C₃H₆N₆O₆)', icon:'⚗️', temp:'' },
      { he:'בתנאים שונים: HMX — חומר נפץ חזק עוד יותר', en:'Under different conditions: HMX — even more powerful explosive', formula:'→ HMX (C₄H₈N₈O₈)', icon:'💣', temp:'' },
      { he:'שימושים: מילוי ראשי קרב + תוסף לדלק מוצק + עדשות גרעיניות!', en:'Uses: warhead fill + solid fuel additive + nuclear implosion lenses!', formula:'→ Warheads + Fuel + Nuclear', icon:'☢️', temp:'' },
    ]},
];

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [pi, setPi] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const proc = processes[pi];

  const play = () => {
    setStep(0); setPlaying(true);
    let i = 0;
    const iv = setInterval(() => {
      i++; if (i >= proc.steps.length) { clearInterval(iv); setPlaying(false); return; }
      setStep(i);
    }, 2500);
  };

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'תהליכי ייצור כימיים' : 'Chemical Production Processes'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על שלב כדי ללמוד עליו, או הפעילו סימולציה' : 'Click a step to learn more, or run the simulation'}</p>
      </motion.div>

      {/* Process selector */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {processes.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setStep(0); setPlaying(false); }}
            className={`px-5 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${pi === i
              ? 'bg-blue-900/40 text-blue-200 border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.2)]'
              : 'bg-slate-800/30 text-slate-500 border-slate-700/30 hover:border-slate-600/50'}`}>
            {p.icon} {h ? p.he : p.en}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-b from-[#0c1425] to-[#0a0f1e] p-6 md:p-8">
            <p className="text-sm text-slate-400 text-center mb-6">{h ? proc.descHe : proc.descEn}</p>

            {/* Factory pipeline visualization */}
            <div className="relative">
              {/* Connection pipes */}
              <div className="absolute top-0 bottom-0 right-8 md:right-12 w-[3px] rounded-full bg-gradient-to-b from-blue-600/50 via-amber-500/40 to-red-500/50" />

              {proc.steps.map((s, i) => {
                const isActive = i === step;
                const isPast = i < step;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => { setStep(i); setPlaying(false); }}
                    className={`relative flex items-start mb-4 cursor-pointer group transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}
                  >
                    {/* Step number node */}
                    <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 mr-4 md:mr-6 z-10
                      ${isActive ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : isPast ? 'bg-green-900/60 border-green-600/50' : 'bg-slate-800 border-slate-600/30'}`}>
                      {isActive ? s.icon : isPast ? '✓' : <span className="text-xs font-bold text-slate-500">{i+1}</span>}
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 rounded-2xl p-4 border transition-all duration-300
                      ${isActive ? 'bg-blue-950/40 border-blue-600/40 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-slate-900/30 border-slate-700/20 hover:bg-slate-800/30 hover:border-slate-600/30'}`}>
                      <p className={`text-sm font-semibold transition-colors ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                        {h ? s.he : s.en}
                      </p>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 space-y-2">
                          <div className="font-mono text-xs text-green-300 bg-slate-950/80 rounded-xl px-4 py-2.5 border border-slate-700/50 inline-block" dir="ltr">
                            {s.formula}
                          </div>
                          {s.temp && <div className="inline-block mr-3 px-3 py-1 rounded-full bg-amber-900/40 text-amber-300 text-xs font-bold border border-amber-700/30">🌡️ {s.temp}</div>}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Play button */}
            <div className="flex justify-center mt-6">
              <button onClick={play}
                className={`px-8 py-3 rounded-2xl font-bold text-sm border-2 transition-all ${playing ? 'bg-slate-700 text-slate-400 border-slate-600' : 'bg-blue-900/40 text-blue-200 border-blue-500/50 hover:bg-blue-800/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]'}`}>
                {playing ? `⏸ ${h ? 'פועל...' : 'Running...'}` : `▶️ ${h ? 'הרצת תהליך' : 'Run Process'}`}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-2xl border-r-4 border-amber-600 bg-amber-950/20 p-5 text-sm text-amber-200 border border-amber-700/30">
        ⚡ <b>{h ? 'מערבלים פלנטריים:' : 'Planetary Mixers:'}</b> {h ? 'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — הברחות מסין. השמדתם = ואקום ייצורי שלא ניתן למלא.' : 'Giant machines for solid fuel mixing. Iran cannot produce them — smuggled from China. Destruction = unfillable production vacuum.'}
      </motion.div>
    </section>
  );
}
