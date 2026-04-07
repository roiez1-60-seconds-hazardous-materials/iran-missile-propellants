'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function NetworkGraph() {
  const { lang } = useLang();
  const h = lang === 'he';
  const targets = [
    { icon:'💧', t:h?'מחמצן IRFNA':'IRFNA Oxidizer', d:h?'שהאב, גדר, קיאם, ח\'ורמשהר':'Shahab, Ghadr, Qiam, Khorramshahr', c:'text-blue-300 border-blue-600/40 bg-blue-950/30' },
    { icon:'🧊', t:h?'רכיב NTO':'NTO Component', d:h?'N₂O₄ מאותו תהליך אוסטוולד':'N₂O₄ from same Ostwald process', c:'text-purple-300 border-purple-600/40 bg-purple-950/30' },
    { icon:'💣', t:h?'RDX/HMX (בכמן)':'RDX/HMX (Bachmann)', d:h?'מרכיב אנרגטי בדלק מוצק מתקדם':'Energetic additive in advanced solid fuel', c:'text-amber-300 border-amber-600/40 bg-amber-950/30' },
    { icon:'☢️', t:h?'עדשות גרעיניות':'Nuclear Lenses', d:h?'HMX = חומר נפץ בעדשות קריסה (Implosion Lenses)':'HMX = explosive in Implosion Lenses', c:'text-red-300 border-red-600/40 bg-red-950/30' },
  ];
  return (
    <section id="strategic" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-red-300 to-red-500 mb-2">{h?'צוואר הבקבוק הכימי':'The Chemical Chokepoint'}</h2>
        <p className="text-slate-400 text-sm">HNO₃ — {h?'המפתח המוחלט':'The Master Key'}</p>
      </motion.div>
      {/* Central HNO3 */}
      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring' }}
          className="inline-block px-8 py-4 rounded-2xl bg-red-950/40 border-2 border-red-600/60 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <div className="text-4xl mb-1">⚗️</div>
          <div className="text-2xl font-black text-red-300">HNO₃</div>
          <div className="text-xs text-red-400">{h?'חומצה חנקתית':'Nitric Acid'}</div>
        </motion.div>
      </div>
      <div className="text-center text-2xl text-slate-600 mb-6">↓ ↓ ↓ ↓</div>
      <div className="grid md:grid-cols-4 gap-4">
        {targets.map((t2, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className={`rounded-xl border p-5 text-center ${t2.c}`}>
            <div className="text-3xl mb-2">{t2.icon}</div>
            <div className={`font-bold text-sm mb-1`}>{t2.t}</div>
            <div className="text-xs text-slate-400">{t2.d}</div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 text-center text-sm text-slate-300 font-bold bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
        {h?'השמדת מתקני אוסטוולד ובכמן = פגיעה סימולטנית בטילים נוזליים + מוצקים + פרויקט גרעיני':'Destroying Ostwald & Bachmann facilities = simultaneous impact on liquid missiles + solid missiles + nuclear project'}
      </motion.div>
    </section>
  );
}
