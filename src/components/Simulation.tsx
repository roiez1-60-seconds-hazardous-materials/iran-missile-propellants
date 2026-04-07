'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const scenarios = [
  { id:'irfna', icon:'🧪', t:{he:'שפך IRFNA',en:'IRFNA Spill'}, c:'red',
    phases:[
      {t:'0s',e:{he:'שלולית כתומה על הקרקע',en:'Orange pool on ground'},d:{he:'צפיפות 1.55 — שוקע לתעלות ומרתפים',en:'Density 1.55 — sinks to drains/basements'},ic:'💧',sev:2},
      {t:'30s',e:{he:'ענן NOx צהוב-חום עולה',en:'Yellow-brown NOx cloud rises'},d:{he:'רותח ב-64°C, בחום ישראלי מתאדה מהר',en:'Boils at 64°C, evaporates fast in Israeli heat'},ic:'🌫️',sev:3},
      {t:'5m',e:{he:'ענן מתפזר בכיוון הרוח',en:'Cloud disperses downwind'},d:{he:'גזים כבדים מהאוויר — צונחים לאזורים נמוכים',en:'Heavier than air — descend to low areas'},ic:'💨',sev:4},
      {t:'30m',e:{he:'חומצה + מתכות = H₂ דליק!',en:'Acid + metals = flammable H₂!'},d:{he:'סכנת פיצוץ משני ממגע עם ברזל/אלומיניום',en:'Secondary explosion risk from iron/aluminum contact'},ic:'⚡',sev:5},
      {t:'24-48h',e:{he:'בצקת ריאות מושהית!',en:'Delayed pulmonary edema!'},d:{he:'חשופים שהרגישו בסדר — הצפת ריאות פתאומית',en:'Exposed who felt fine — sudden lung flooding'},ic:'🏥',sev:5},
    ],
    resp:{he:'בידוד 50 מ\' | חליפת מגן רמה A + מנ״פ | אין מים על שלולית! | ניטרול NaHCO₃',en:'50m isolation | Level A + SCBA | No water on pool! | NaHCO₃ neutralization'}
  },
  { id:'udmh', icon:'☠️', t:{he:'דליפת UDMH',en:'UDMH Leak'}, c:'purple',
    phases:[
      {t:'0s',e:{he:'נוזל שקוף, ריח אמוניה/דגים',en:'Colorless liquid, ammonia/fish odor'},d:{he:'קל ממים (0.79), מתערבב לחלוטין',en:'Lighter than water (0.79), fully miscible'},ic:'💧',sev:2},
      {t:'15s',e:{he:'אדים דליקים — הבזק מינוס 15°C!',en:'Flammable vapors — flash point -15°C!'},d:{he:'גבולות דליקות 2.5%-95% — כמעט תמיד דליק!',en:'Flammability 2.5%-95% — almost always flammable!'},ic:'🔥',sev:4},
      {t:'2m',e:{he:'חדירה דרך עור שלם!',en:'Penetrates intact skin!'},d:{he:'UDMH חודר כפפות רגילות ובגדים. 5 ppm = סכנה',en:'Penetrates regular gloves and clothing. 5 ppm = danger'},ic:'🫁',sev:5},
      {t:'10m',e:{he:'NDMA מסרטן נוצר באוויר',en:'Carcinogenic NDMA forms in air'},d:{he:'פורמלדהיד, HCN. נשאר 6 שבועות בסביבה!',en:'Formaldehyde, HCN. Persists 6 weeks!'},ic:'☣️',sev:4},
      {t:'hrs',e:{he:'עוויתות, כשל כבד וכליות',en:'Seizures, liver/kidney failure'},d:{he:'מסרטן IARC 2B. טיפול: ויטמין B6',en:'IARC 2B carcinogen. Treatment: Vitamin B6'},ic:'🏥',sev:5},
    ],
    resp:{he:'בידוד 100 מ\' | חליפת מגן רמה A | ערפל מים | קצף AR-AFFF | B6 לנפגעים',en:'100m isolation | Level A suit | Water fog | AR-AFFF foam | B6 for casualties'}
  },
  { id:'hyper', icon:'💥', t:{he:'תגובה היפרגולית',en:'Hypergolic Reaction'}, c:'red',
    phases:[
      {t:'0ms',e:{he:'מגע דלק + מחמצן = הצתה מיידית!',en:'Fuel + oxidizer contact = instant ignition!'},d:{he:'ללא ניצוץ, ללא חום — מגע פיזי בלבד!',en:'No spark, no heat — physical contact only!'},ic:'💥',sev:5},
      {t:'2s',e:{he:'כדור אש + התזות כימיות',en:'Fireball + chemical splashes'},d:{he:'טמפרטורה מעל 2,000°C',en:'Temperature exceeds 2,000°C'},ic:'🔥',sev:5},
      {t:'30s',e:{he:'ענן רעיל: NOx + HCN + NDMA',en:'Toxic cloud: NOx + HCN + NDMA'},d:{he:'עשן שחור-חום, גזים רעילים מרובים',en:'Black-brown smoke, multiple toxic gases'},ic:'☁️',sev:5},
      {t:'10m',e:{he:'שריפות משניות',en:'Secondary fires'},d:{he:'IRFNA מצית כל חומר אורגני',en:'IRFNA ignites any organic material'},ic:'🔥',sev:4},
      {t:'hrs',e:{he:'זיהום ממושך',en:'Persistent contamination'},d:{he:'NDMA + חומצה. האזור מסוכן שבועות',en:'NDMA + acid. Area dangerous for weeks'},ic:'☣️',sev:3},
    ],
    resp:{he:'בידוד 800 מ\'! | פינוי מלא | חליפת מגן רמה A | כוחות חומ״ס בלבד',en:'800m isolation! | Full evacuation | Level A suit | HazMat teams only'}
  },
  { id:'solid', icon:'🔩', t:{he:'בעירת דלק מוצק',en:'Solid Fuel Fire'}, c:'amber',
    phases:[
      {t:'0s',e:{he:'בעירה עצמית — בלתי ניתנת לכיבוי!',en:'Self-sustaining — cannot be extinguished!'},d:{he:'AP מספק חמצן, HTPB דלק, Al מעלה טמפרטורה',en:'AP provides O₂, HTPB fuel, Al raises temperature'},ic:'🔥',sev:5},
      {t:'10s',e:{he:'להבה לבנה מעל 2,000°C',en:'White flame exceeding 2,000°C'},d:{he:'אבקת אלומיניום בוערת. ניצוצות מתכתיים',en:'Aluminum powder burns. Metal sparks fly'},ic:'⚪',sev:5},
      {t:'2m',e:{he:'ענן HCl + NOx + CO',en:'HCl + NOx + CO cloud'},d:{he:'HCl צורב ריאות! עשן סמיך',en:'HCl burns lungs! Dense smoke'},ic:'☁️',sev:5},
      {t:'15m',e:{he:'בעירה עד תום הדלק',en:'Burns until fuel exhausted'},d:{he:'רק קירור סביבה ומניעת התפשטות',en:'Only cool surroundings, prevent spread'},ic:'🔥',sev:4},
      {t:'end',e:{he:'פרכלורט מזהם מי תהום',en:'Perchlorate contaminates groundwater'},d:{he:'פגיעה בבלוטת תריס. ניקוי ממושך',en:'Thyroid damage. Prolonged cleanup'},ic:'⚠️',sev:3},
    ],
    resp:{he:'בידוד 500 מ\' | מנ״פ + מגן חום | קירור מים רב — לא לכבות! | ניטור HCl',en:'500m isolation | SCBA + heat shield | Lots of cooling water — don\'t extinguish! | Monitor HCl'}
  },
];

const sevColors = ['','','bg-yellow-500','bg-orange-500','bg-orange-500','bg-red-500'];
const sevLabels = {he:['','','בינוני','גבוה','גבוה','קריטי'],en:['','','Medium','High','High','Critical']};
const phIcons = [['💧','🌫️','💨','⚡','🏥'],['💧','🔥','🫁','☣️','🏥'],['💥','🔥','☁️','🔥','☣️'],['🔥','⚪','☁️','🔥','⚠️']];

export default function Simulation() {
  const { lang } = useLang();
  const h = lang === 'he';
  const g = (v: any) => typeof v === 'string' ? v : v[lang];
  const [si, setSi] = useState(0);
  const [pi, setPi] = useState(0);
  const [play, setPlay] = useState(false);
  const sc = scenarios[si];
  const ph = sc.phases[pi];

  useEffect(() => {
    if (!play) return;
    const t = setInterval(() => setPi(p => { if (p >= sc.phases.length-1) { setPlay(false); return p; } return p+1; }), 3500);
    return () => clearInterval(t);
  }, [play, si, sc.phases.length]);

  return (
    <section id="simulation" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{h?'סימולציות תרחישי אירוע':'Event Scenario Simulations'}</h2>
        <p className="text-slate-400 text-sm">{h?'שפך, דליפה, שריפה ותגובה היפרגולית':'Spill, leak, fire & hypergolic reaction'}</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {scenarios.map((s,i) => (
          <button key={i} onClick={() => {setSi(i);setPi(0);setPlay(false);}}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${si===i ? 'bg-slate-700 text-white border-slate-500' : 'bg-slate-900/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/50'}`}>
            {s.icon} {g(s.t)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={si} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className={`rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm p-6 border-r-4 ${sc.c==='red'?'border-r-red-600':sc.c==='purple'?'border-r-purple-600':'border-r-amber-600'}`}>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Display area */}
            <div>
              <div className={`rounded-xl p-8 text-center border ${sc.c==='red'?'border-red-700/40 bg-red-950/20':sc.c==='purple'?'border-purple-700/40 bg-purple-950/20':'border-amber-700/40 bg-amber-950/20'}`}>
                <div className="text-6xl mb-3">{phIcons[si]?.[pi] || ph.ic}</div>
                <div className="text-xs font-mono text-slate-500 mb-2 bg-slate-900/60 inline-block px-3 py-1 rounded-full">{ph.t}</div>
                <div className={`text-lg font-black mb-2 ${sc.c==='red'?'text-red-300':sc.c==='purple'?'text-purple-300':'text-amber-300'}`}>{g(ph.e)}</div>
                <p className="text-sm text-slate-400">{g(ph.d)}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="flex gap-1">{[...Array(5)].map((_,i) => <div key={i} className={`w-2.5 h-6 rounded-sm transition-all duration-500 ${i < ph.sev ? sevColors[ph.sev] : 'bg-slate-700/50'}`} />)}</div>
                  <span className={`text-xs font-bold ${ph.sev >= 4 ? 'text-red-400' : 'text-amber-400'}`}>{sevLabels[lang][ph.sev]}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => {setPi(0);setPlay(true);}} className={`flex-1 py-2.5 rounded-xl font-bold text-sm border ${play?'bg-slate-700 text-slate-400 border-slate-600':'bg-blue-900/60 text-blue-200 border-blue-600/50'}`}>
                  {play ? '⏸' : '▶️'} {h?play?'פועל...':'הפעל סימולציה':play?'Running...':'Run Simulation'}
                </button>
                {sc.phases.map((_,i) => <button key={i} onClick={() => {setPi(i);setPlay(false);}} className={`w-9 h-9 rounded-lg text-xs font-bold ${pi===i?'bg-blue-800/80 text-blue-200':'bg-slate-800/60 text-slate-500'}`}>{i+1}</button>)}
              </div>
            </div>

            {/* Phase list */}
            <div className="space-y-2">
              {sc.phases.map((p,i) => (
                <div key={i} onClick={() => {setPi(i);setPlay(false);}}
                  className={`p-3 rounded-xl cursor-pointer border transition-all ${pi===i ? `border-slate-500 bg-slate-700/50` : 'border-slate-700/20 bg-slate-900/30 hover:bg-slate-800/40'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${pi===i?'bg-blue-800 text-blue-200':'bg-slate-700 text-slate-400'}`}>{i+1}</div>
                    <div>
                      <div className="flex items-center gap-2"><span className="text-[10px] font-mono text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded">{p.t}</span><span className={`text-sm font-bold ${pi===i?'text-slate-100':'text-slate-300'}`}>{g(p.e)}</span></div>
                      {pi===i && <motion.p initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="text-xs text-slate-400 mt-1">{g(p.d)}</motion.p>}
                    </div>
                  </div>
                </div>
              ))}
              <div className={`p-3 rounded-xl ${sc.c==='red'?'bg-red-950/30 border-red-700/40':sc.c==='purple'?'bg-purple-950/30 border-purple-700/40':'bg-amber-950/30 border-amber-700/40'} border`}>
                <div className={`text-xs font-bold mb-1 ${sc.c==='red'?'text-red-300':sc.c==='purple'?'text-purple-300':'text-amber-300'}`}>🛡️ {h?'מענה נדרש:':'Required Response:'}</div>
                <div className="text-xs text-slate-400">{g(sc.resp)}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
