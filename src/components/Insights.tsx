'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Insights() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  const cards = [
    { icon:'⚗️', t:h?'צוואר הבקבוק הכימי':'Chemical Chokepoint', d:h?'HNO₃ = מפתח ל-IRFNA + NTO + RDX/HMX + עדשות גרעיניות. השמדת מתקני אוסטוולד ובכמן = פגיעה סימולטנית בטילים נוזליים, מוצקים ובפרויקט הגרעיני.':'HNO₃ = key to IRFNA + NTO + RDX/HMX + nuclear lenses. Destroying Ostwald & Bachmann facilities = simultaneous impact on liquid, solid missiles & nuclear project.', c:'border-red-600/40 bg-red-950/20' },
    { icon:'🇨🇳', t:h?'תלות הרסנית בסין':'Destructive China Dependency', d:h?'יבוא מסיבי של נתרן פרכלורט מג\'והאי. הברחות בספינות דגל. פיצוץ נמל שהיד רג\'אי. סגירת מצר הורמוז הפכה מבעיה איראנית לגלובלית.':'Massive sodium perchlorate imports from Zhuhai. Flag vessel smuggling. Shahid Rajaee port explosion. Hormuz closure became a global problem.', c:'border-amber-600/40 bg-amber-950/20' },
  ];
  return (
    <section id="insights" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('insights.title')}</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className={`rounded-2xl border ${c.c} backdrop-blur-sm p-6`}>
            <div className="text-4xl mb-3">{c.icon}</div>
            <h3 className="font-black text-slate-100 text-lg mb-3">{c.t}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{c.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
