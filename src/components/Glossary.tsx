'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const terms = [
  {t:'IRFNA',c:'chem',he:'Inhibited Red Fuming Nitric Acid — חומצה חנקתית מעושנת אדומה מעוכבת. המחמצן העיקרי לטילים נוזליים',en:'Inhibited Red Fuming Nitric Acid — primary oxidizer for liquid missiles'},
  {t:'UDMH',c:'chem',he:'Unsymmetrical Dimethylhydrazine — דימתילהידראזין. דלק נוזלי רעיל ומסרטן (CAS 57-14-7)',en:'Unsymmetrical Dimethylhydrazine — toxic carcinogenic liquid fuel (CAS 57-14-7)'},
  {t:'NTO / N₂O₄',c:'chem',he:'Nitrogen Tetroxide — חנקן טטראוקסיד. מחמצן נוזלי, רותח ב-21°C',en:'Nitrogen Tetroxide — liquid oxidizer, boils at 21°C'},
  {t:'HNO₃',c:'chem',he:'חומצה חנקתית — חומר מוצא ל-IRFNA, NTO, RDX, HMX',en:'Nitric Acid — precursor for IRFNA, NTO, RDX, HMX'},
  {t:'TM-185',c:'chem',he:'קרוסין צבאי (סימון סובייטי). דלק בטילי Scud/שהאב',en:'Military kerosene (Soviet designation). Scud/Shahab fuel'},
  {t:'AK-27',c:'chem',he:'סימון סובייטי ל-IRFNA: 73% HNO₃ + 27% N₂O₄ + מעכב',en:'Soviet designation for IRFNA: 73% HNO₃ + 27% N₂O₄ + inhibitor'},
  {t:'AP',c:'chem',he:'Ammonium Perchlorate — אמוניום פרכלורט (NH₄ClO₄). מחמצן בדלק מוצק (~70%)',en:'Ammonium Perchlorate (NH₄ClO₄). Solid fuel oxidizer (~70%)'},
  {t:'HTPB',c:'chem',he:'Hydroxyl-Terminated Polybutadiene — מאגד/דלק בדלק מוצק',en:'Hydroxyl-Terminated Polybutadiene — solid fuel binder/fuel'},
  {t:'RDX',c:'chem',he:'הקסוגן — חומר נפץ נהדף. מיוצר מ-HNO₃ בתהליך בכמן',en:'Hexogen — high explosive. Produced from HNO₃ via Bachmann process'},
  {t:'HMX',c:'chem',he:'אוקטוגן — חומר נפץ + עדשות קריסה גרעיניות (Implosion Lenses)',en:'Octogen — explosive + nuclear implosion lenses'},
  {t:'NOx',c:'chem',he:'תחמוצות חנקן — גזים רעילים מ-IRFNA. גורמים לבצקת ריאות',en:'Nitrogen oxides — toxic gases from IRFNA. Cause pulmonary edema'},
  {t:'NDMA',c:'chem',he:'N-Nitrosodimethylamine — תוצר פירוק UDMH מסרטן. נשאר שבועות',en:'N-Nitrosodimethylamine — carcinogenic UDMH decomposition product'},
  {t:'היפרגולי',c:'mil',he:'מגע ישיר דלק+מחמצן = הצתה ספונטנית ללא מצת',en:'Hypergolic — direct contact fuel+oxidizer = spontaneous ignition'},
  {t:'MaRV',c:'mil',he:'Maneuverable Re-entry Vehicle — ראש קרב מתמרן בחדירה',en:'Maneuverable Re-entry Vehicle — warhead maneuvers during re-entry'},
  {t:'CEP',c:'mil',he:'Circular Error Probable — 50% מהטילים נופלים ברדיוס זה',en:'Circular Error Probable — 50% of missiles land within this radius'},
  {t:'TEL',c:'mil',he:'Transporter Erector Launcher — משגר נייד על גלגלים',en:'Transporter Erector Launcher — mobile launch platform'},
  {t:'SHIG',c:'org',he:'Shahid Hemmat Industrial Group — אחראית על טילים נוזליים',en:'Shahid Hemmat Industrial Group — liquid missile production'},
  {t:'SBIG',c:'org',he:'Shahid Bakeri Industrial Group — אחראית על טילים מוצקים',en:'Shahid Bakeri Industrial Group — solid missile production'},
  {t:'PCI',c:'org',he:'Parchin Chemical Industries — ייצור HNO₃, חומרי נפץ',en:'Parchin Chemical Industries — HNO₃, explosives production'},
  {t:'מנ״פ',c:'hazmat',he:'מערכת נשימה פתוחה בלחץ חיובי (SCBA)',en:'Self-Contained Breathing Apparatus (SCBA)'},
  {t:'ERG',c:'hazmat',he:'Emergency Response Guidebook — מדריך תגובה לחירום 2024',en:'Emergency Response Guidebook 2024'},
  {t:'IDLH',c:'hazmat',he:'Immediately Dangerous to Life or Health — סכנה מיידית לחיים',en:'Immediately Dangerous to Life or Health'},
  {t:'חליפת מגן רמה A',c:'hazmat',he:'חליפה אטומה לגזים + מנ״פ — הרמה הגבוהה ביותר',en:'Gas-tight encapsulated suit + SCBA — highest protection level'},
];

const cats = [{k:'all',he:'הכל',en:'All'},{k:'chem',he:'כימיה',en:'Chemistry'},{k:'mil',he:'צבאי',en:'Military'},{k:'org',he:'ארגונים',en:'Organizations'},{k:'hazmat',he:'חומ״ס',en:'HazMat'}];

export default function Glossary() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = terms.filter(tm => (cat === 'all' || tm.c === cat) && (search === '' || tm.t.toLowerCase().includes(search.toLowerCase()) || tm[lang].toLowerCase().includes(search.toLowerCase())));

  return (
    <section id="glossary" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('glossary.title')}</h2>
      </motion.div>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {cats.map(c => <button key={c.k} onClick={() => setCat(c.k)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${cat===c.k?'bg-blue-800/60 text-blue-200 border-blue-600/50':'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>{h?c.he:c.en}</button>)}
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder={h?'חיפוש...':'Search...'} className="w-full mb-6 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-blue-500/50" />
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm overflow-hidden divide-y divide-slate-700/30">
        {filtered.map((tm, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex justify-between items-start p-4 gap-4 hover:bg-slate-700/20 transition-colors">
            <span className="font-bold text-blue-300 text-sm flex-shrink-0 min-w-[100px]">{tm.t}</span>
            <span className="text-sm text-slate-400 text-left" dir="auto">{tm[lang]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
