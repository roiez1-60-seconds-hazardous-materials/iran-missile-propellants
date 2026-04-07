'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const protocols = [
  { t:{he:'IRFNA — ERG 157',en:'IRFNA — ERG Guide 157'}, c:'border-r-red-600', items:[
    {i:'🚧',l:{he:'בידוד',en:'Isolation'},x:{he:'50 מ\' | אש: 800 מ\' | במעלה הרוח ובמקום גבוה | אדים כבדים מהאוויר',en:'50m | Fire: 800m | Upwind+Uphill | Vapors heavier than air'}},
    {i:'🧑‍🚀',l:{he:'מיגון',en:'PPE'},x:{he:'חליפת מגן רמה A + מנ״פ בלבד! ציוד כיבוי סטנדרטי לא מגן',en:'Level A suit + SCBA only! Standard firefighting gear does NOT protect'}},
    {i:'🚫',l:{he:'איסור מים!',en:'No Water!'},x:{he:'אסור על שלולית חומצה! רתיחה + NOx. ערפל מים רק לקירור דפנות',en:'Never on acid pool! Boiling + NOx. Water fog only for cooling walls'}},
    {i:'🧪',l:{he:'ניטרול',en:'Neutralize'},x:{he:'סכירת חול → פלסטיק → סודיום ביקרבונט/סיד מדורג. כלים ללא ניצוץ!',en:'Sand dam → plastic → gradual NaHCO₃/lime. Non-sparking tools only!'}},
  ]},
  { t:{he:'UDMH — ERG 131',en:'UDMH — ERG Guide 131'}, c:'border-r-purple-600', items:[
    {i:'🚧',l:{he:'בידוד',en:'Isolation'},x:{he:'100 מ\' | דליפה גדולה: 300+ מ\' | שריפה: 800 מ\'',en:'100m | Large spill: 300m+ | Fire: 800m'}},
    {i:'🧑‍🚀',l:{he:'מיגון',en:'PPE'},x:{he:'חליפת מגן רמה A — חדירת עור ללא חתך!',en:'Level A suit — penetrates intact skin!'}},
    {i:'💧',l:{he:'כיבוי',en:'Suppression'},x:{he:'ערפל מים. קצף AR-AFFF לדליקות קטנות',en:'Water fog. AR-AFFF for small fires'}},
    {i:'☠️',l:{he:'תוצרי פירוק',en:'Decomposition'},x:{he:'NDMA + פורמלדהיד + HCN — נשארים 6 שבועות!',en:'NDMA + formaldehyde + HCN — persist 6 weeks!'}},
  ]},
  { t:{he:'💥 תגובה היפרגולית',en:'💥 Hypergolic Reaction'}, c:'border-r-red-600', items:[
    {i:'💥',l:{he:'קריטי',en:'Critical'},x:{he:'מגע דלק (UDMH) + מחמצן (IRFNA/NTO) = הצתה ספונטנית מיידית ללא ניצוץ! בשרידי טיל נוזלי = פיצוץ!',en:'Fuel (UDMH) + oxidizer (IRFNA/NTO) contact = instant spontaneous ignition without spark! In liquid missile debris = explosion!'}},
  ]},
];

export default function HazMat() {
  const { t, lang } = useLang();
  const g = (v: any) => typeof v === 'string' ? v : v[lang];
  return (
    <section id="hazmat" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('hazmat.title')}</h2>
        <p className="text-slate-400 text-sm">{t('hazmat.subtitle')}</p>
      </motion.div>
      <div className="space-y-4">
        {protocols.map((p, pi) => (
          <motion.div key={pi} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`rounded-2xl border-r-4 ${p.c} border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm p-6`}>
            <h3 className="text-lg font-black text-slate-100 mb-4">{g(p.t)}</h3>
            <div className="space-y-3">
              {p.items.map((it, ii) => (
                <div key={ii} className="flex gap-3 items-start bg-slate-900/50 rounded-xl p-3">
                  <span className="text-xl flex-shrink-0">{it.i}</span>
                  <div><b className="text-sm text-slate-200">{g(it.l)}: </b><span className="text-sm text-slate-400">{g(it.x)}</span></div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
