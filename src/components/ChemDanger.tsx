'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const chemicals = [
  { id:'irfna', icon:'⚗️', name:{he:'IRFNA — חומצה חנקתית מעושנת אדומה מעוכבת',en:'IRFNA — Inhibited Red Fuming Nitric Acid'}, color:'border-red-600', nfpa:'H:4 F:0 R:4 OX/COR', erg:'Guide 157',
    props:[
      {k:{he:'הרכב',en:'Composition'}, v:'HNO₃ ≥70% + N₂O₄ 18-27% + HF 0.4-0.7%'},
      {k:{he:'סימון',en:'Designation'}, v:'AK-27I / AK-27P'},
      {k:{he:'מראה',en:'Appearance'}, v:{he:'נוזל כתום-אדום, אדים צהובים רעילים',en:'Orange-red liquid, toxic yellow fumes'}},
      {k:{he:'צפיפות',en:'Density'}, v:'1.55 g/cm³'},
      {k:{he:'רתיחה',en:'Boiling Point'}, v:'64°C'},
      {k:{he:'קפאון',en:'Freezing Point'}, v:'-52°C'},
    ],
    dangers:[
      {k:'MAK', v:'5 mg/m³'},
      {k:'ERPG-2', v:'10 ppm'},
      {k:{he:'עור',en:'Skin'}, v:{he:'הרס מיידי, כוויות כימיות',en:'Immediate tissue destruction, chemical burns'}},
      {k:{he:'עיניים',en:'Eyes'}, v:{he:'עיוורון תוך שניות!',en:'Blindness within seconds!'}},
      {k:{he:'שאיפה',en:'Inhalation'}, v:{he:'בצקת ריאות מושהית 24-48 שעות!',en:'Delayed pulmonary edema 24-48 hours!'}},
      {k:{he:'היפרגולי',en:'Hypergolic'}, v:{he:'נדלק ספונטנית עם UDMH/הידראזין',en:'Spontaneous ignition with UDMH/Hydrazine'}},
    ]},
  { id:'udmh', icon:'☠️', name:{he:'UDMH — דימתילהידראזין בלתי סימטרי',en:'UDMH — Unsymmetrical Dimethylhydrazine'}, color:'border-purple-600', nfpa:'H:4 F:4 R:2', erg:'Guide 131',
    props:[
      {k:{he:'נוסחה',en:'Formula'}, v:'H₂NN(CH₃)₂ — CAS 57-14-7'},
      {k:'MW', v:'60.1 g/mol'},
      {k:{he:'מראה',en:'Appearance'}, v:{he:'שקוף, ריח אמוניה/דגים',en:'Colorless, ammonia/fishy odor'}},
      {k:{he:'רתיחה',en:'BP'}, v:'63°C'},
      {k:{he:'הבזק',en:'Flash'}, v:'-15°C'},
      {k:{he:'דליקות',en:'Flammability'}, v:'2.5%-95%'},
    ],
    dangers:[
      {k:'IDLH', v:{he:'Ca [15 ppm] — מסרטן IARC 2B',en:'Ca [15 ppm] — Carcinogen IARC 2B'}},
      {k:'PEL', v:'NIOSH 0.06 ppm / OSHA 0.5 ppm'},
      {k:{he:'עור',en:'Skin'}, v:{he:'חודר דרך עור שלם ללא חתך!',en:'Penetrates intact skin without cuts!'}},
      {k:{he:'פירוק',en:'Decomposition'}, v:{he:'NDMA (מסרטן), פורמלדהיד, HCN',en:'NDMA (carcinogen), formaldehyde, HCN'}},
      {k:{he:'שרידות',en:'Persistence'}, v:{he:'תוצרי פירוק נשארים 6 שבועות!',en:'Decomposition products persist 6 weeks!'}},
    ]},
  { id:'nto', icon:'🧊', name:{he:'NTO — חנקן טטראוקסיד',en:'NTO — Nitrogen Tetroxide'}, color:'border-blue-600', nfpa:'H:4 F:0 R:3 OX', erg:'Guide 124',
    props:[
      {k:{he:'נוסחה',en:'Formula'}, v:'N₂O₄ — CAS 10544-72-6'},
      {k:{he:'רתיחה',en:'BP'}, v:{he:'21°C — מתאדה בטמפרטורת החדר!',en:'21°C — evaporates at room temperature!'}},
      {k:{he:'צפיפות',en:'Density'}, v:'1.448 g/cm³'},
      {k:{he:'מראה',en:'Appearance'}, v:{he:'נוזל חום-אדום, אדים חומים',en:'Red-brown liquid, brown fumes'}},
    ],
    dangers:[
      {k:{he:'שאיפה',en:'Inhalation'}, v:{he:'קטלני! H330. בצקת ריאות מושהית',en:'Fatal! H330. Delayed pulmonary edema'}},
      {k:{he:'כוויות',en:'Burns'}, v:{he:'H314 — מגיב עם מים ברקמה ליצירת HNO₃',en:'H314 — reacts with tissue moisture to form HNO₃'}},
    ]},
  { id:'ap', icon:'🔩', name:{he:'AP/HTPB/Al — דלק מוצק קומפוזיט',en:'AP/HTPB/Al — Composite Solid Propellant'}, color:'border-amber-600', nfpa:'H:2 F:4 R:3 OX', erg:'—',
    props:[
      {k:{he:'מחמצן',en:'Oxidizer'}, v:'NH₄ClO₄ (AP) ~70%'},
      {k:{he:'מאגד',en:'Binder'}, v:'HTPB ~15%'},
      {k:{he:'מתכת',en:'Metal'}, v:{he:'אבקת אלומיניום ~15%',en:'Aluminum powder ~15%'}},
      {k:{he:'מתקדם',en:'Advanced'}, v:{he:'+RDX/HMX — תלויים ב-HNO₃!',en:'+RDX/HMX — depend on HNO₃!'}},
    ],
    dangers:[
      {k:{he:'בעירה',en:'Combustion'}, v:{he:'עצמית, בלתי ניתנת לכיבוי!',en:'Self-sustaining, cannot be extinguished!'}},
      {k:{he:'תוצרים',en:'Products'}, v:'HCl + NOx + CO + Al₂O₃'},
      {k:{he:'סביבתי',en:'Environmental'}, v:{he:'פרכלורט מזהם מי תהום, פוגע בבלוטת תריס',en:'Perchlorate contaminates groundwater, affects thyroid'}},
    ]},
];

export default function ChemDanger() {
  const { t, lang } = useLang();
  const [active, setActive] = useState('irfna');
  const h = lang === 'he';
  const g = (v: any) => typeof v === 'string' ? v : v[lang];
  const chem = chemicals.find(c => c.id === active)!;

  return (
    <section id="chemistry" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('chemistry.title')}</h2>
        <p className="text-slate-400 text-sm">{t('chemistry.subtitle')}</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {chemicals.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${active === c.id ? `bg-slate-800 text-white ${c.color} border-2` : 'bg-slate-900/50 text-slate-400 border-slate-700/30 hover:bg-slate-800/50'}`}>
            {c.icon} {c.id.toUpperCase()}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          <div className="rounded-2xl bg-slate-800/40 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h3 className="text-xl font-black text-slate-100">{chem.icon} {g(chem.name)}</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-slate-300 border border-slate-600">{chem.nfpa}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-300 border border-blue-700/50">ERG {chem.erg}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-blue-300 mb-3">{h ? 'מאפיינים פיסיקליים' : 'Physical Properties'}</h4>
                {chem.props.map((p, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-slate-800/20 last:border-0 gap-3">
                    <span className="text-slate-400 text-sm">{g(p.k)}</span>
                    <span className="text-sm text-slate-100 font-semibold text-left" dir="ltr">{g(p.v)}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-300 mb-3">⚠️ {h ? 'סיכונים ורעילות' : 'Hazards & Toxicity'}</h4>
                {chem.dangers.map((d, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-slate-800/20 last:border-0 gap-3 bg-red-950/10 -mx-2 px-2 rounded">
                    <span className="text-slate-400 text-sm">{g(d.k)}</span>
                    <span className="text-sm text-red-300 font-semibold text-left" dir="ltr">{g(d.v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hypergolic warning */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-xl border-r-4 border-red-600 bg-red-950/30 p-4 text-sm text-red-200">
        ⚠️ <b>{h ? 'בצקת ריאות מושהית:' : 'Delayed Pulmonary Edema:'}</b> {h ? 'נפגעי IRFNA/NTO עשויים להרגיש הקלה, אך 24-48 שעות לאחר מכן — הצפת ריאות פתאומית וכשל נשימתי קטלני!' : 'IRFNA/NTO casualties may feel relief, but 24-48 hours later — sudden lung flooding and fatal respiratory failure!'}
      </motion.div>
    </section>
  );
}
