'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function EmergencyCard() {
  const { lang } = useLang();
  const h = lang === 'he';
  return (
    <section id="medical" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{h?'פרוטוקול רפואי':'Medical Protocol'}</h2>
        <p className="text-slate-400 text-sm">{h?'טיפול בשני שלבים: מיידי בזירה + מעקב ממושך':'Two-phase treatment: immediate on-scene + prolonged monitoring'}</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="rounded-2xl border border-green-700/40 bg-green-50 backdrop-blur-sm p-6">
          <h3 className="font-bold text-green-600 mb-4 text-lg">{h?'שלב 1 — בזירה':'Phase 1 — On Scene'}</h3>
          {[h?'חילוץ מענן הגז':'Extract from gas cloud',h?'הפשטת בגדים נגועים':'Remove contaminated clothing',h?'שטיפה 15+ דקות מים זורמים':'Flush 15+ min running water',h?'הערכה רפואית לכל חשוף!':'Medical evaluation for ALL exposed!'].map((s,i) => (
            <div key={i} className="flex gap-2 py-2 text-sm text-slate-600"><span className="text-green-600 font-bold">{i+1}.</span>{s}</div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="rounded-2xl border border-red-700/40 bg-red-50/50 backdrop-blur-sm p-6">
          <h3 className="font-bold text-red-600 mb-2 text-lg">{h?'שלב 2 — בצקת ריאות מושהית':'Phase 2 — Delayed Pulmonary Edema'}</h3>
          <div className="rounded-xl bg-red-50 border border-red-800/40 p-3 text-sm text-red-200 mb-4">
            ⚠️ {h?'כל חשוף = אשפוז 24-48 שעות — גם אם מרגיש טוב!':'ALL exposed = hospitalize 24-48 hours — even if feeling fine!'}
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div><b className="text-blue-600">{h?'משתנים (לאסיקס):':'Diuretics (Lasix):'}</b> {h?'מסלקים נוזלים מהריאות':'Remove fluid from lungs'}</div>
            <div><b className="text-blue-600">{h?'חיזוק הלב (דובוטמין):':'Cardiac support (Dobutamine):'}</b> {h?'עוזר ללב לשאוב':'Helps heart pump'}</div>
            <div><b className="text-blue-600">{h?'הרגעה (מורפיום):':'Sedation (Morphine):'}</b> {h?'מפחית תחושת חנק':'Reduces air hunger'}</div>
            <div><b className="text-blue-600">{h?'נוגדי דלקת (סטרואידים):':'Anti-inflammatory (Steroids):'}</b> {h?'מונעים צלקות ריאתיות':'Prevent lung scarring'}</div>
            <div><b className="text-blue-600">{h?'גז ניטריק אוקסיד בשאיפה:':'Inhaled Nitric Oxide:'}</b> {h?'מרחיב כלי דם ריאתיים':'Dilates pulmonary vessels'}</div>
            <div className="pt-2 border-t border-slate-200"><b className="text-purple-600">{h?'הרעלת UDMH:':'UDMH poisoning:'}</b> {h?'ויטמין B6 (פירידוקסין) — נוגדן לעוויתות':'Vitamin B6 (Pyridoxine) — anticonvulsant'}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
