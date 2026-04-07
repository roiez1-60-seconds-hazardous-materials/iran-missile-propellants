'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Paradigm() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  return (
    <section id="propulsion" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('propulsion.title')}</h2>
        <p className="text-slate-400 text-sm">{t('propulsion.subtitle')}</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="rounded-2xl border border-blue-700/40 bg-blue-50 backdrop-blur-sm p-6 ">
          <h3 className="text-xl font-black text-blue-600 mb-4 flex items-center gap-2">🔵 {h ? 'הנעה נוזלית — היפרגולית' : 'Liquid Propulsion — Hypergolic'}</h3>
          <p className="text-sm text-slate-500 mb-4">{h ? 'מגע ישיר בין דלק למחמצן = הצתה ספונטנית. ללא מצת.' : 'Direct contact between fuel & oxidizer = spontaneous ignition. No igniter needed.'}</p>
          <div className="space-y-2 text-sm text-slate-500 mb-4">
            <div><b className="text-blue-600">{h ? 'דלק:' : 'Fuel:'}</b> UDMH / {h ? 'הידראזין' : 'Hydrazine'} / {h ? 'קרוסין' : 'Kerosene'} TM-185</div>
            <div><b className="text-blue-600">{h ? 'מחמצן:' : 'Oxidizer:'}</b> IRFNA (AK-27) / NTO (N₂O₄)</div>
          </div>
          <div className="space-y-2 text-sm">
            <div><b className="text-blue-600">{h ? 'טילים:' : 'Missiles:'}</b> <span className="text-slate-500">{h ? 'שהאב-1/2/3, גדר, עמאד, קיאם, ח׳ורמשהר' : 'Shahab-1/2/3, Ghadr, Emad, Qiam, Khorramshahr'}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-green-50 rounded-lg p-3 border border-green-800/30"><div className="text-green-600 text-xs font-bold mb-1">✅</div><div className="text-xs text-slate-500">{h ? 'שליטה במנוע (Throttling) • Isp גבוה • אחסון בטמפ׳ חדר' : 'Throttling • High Isp • Room temp storage'}</div></div>
            <div className="bg-red-50 rounded-lg p-3 border border-red-800/30"><div className="text-red-600 text-xs font-bold mb-1">❌</div><div className="text-xs text-slate-500">{h ? 'תדלוק שעות • חשוף לזיהוי • רעיל קטלני • קורוזיבי' : 'Hours to fuel • Detectable • Lethal toxicity • Corrosive'}</div></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="rounded-2xl border border-amber-700/40 bg-amber-50 backdrop-blur-sm p-6 ">
          <h3 className="text-xl font-black text-amber-600 mb-4 flex items-center gap-2">🟠 {h ? 'הנעה מוצקה — קומפוזיט' : 'Solid Propulsion — Composite'}</h3>
          <p className="text-sm text-slate-500 mb-4">{h ? 'דלק ומחמצן יצוקים יחד בתצורה פולימרית. כוננות מיידית.' : 'Fuel & oxidizer cast together in polymeric form. Immediate readiness.'}</p>
          <div className="space-y-2 text-sm text-slate-500 mb-4">
            <div><b className="text-amber-600">{h ? 'מחמצן:' : 'Oxidizer:'}</b> {h ? 'אמוניום פרכלורט' : 'Ammonium Perchlorate'} (AP) ~70%</div>
            <div><b className="text-amber-600">{h ? 'מאגד/דלק:' : 'Binder/Fuel:'}</b> HTPB ~15% + {h ? 'אבקת אלומיניום' : 'Al powder'} ~15%</div>
          </div>
          <div className="space-y-2 text-sm">
            <div><b className="text-amber-600">{h ? 'טילים:' : 'Missiles:'}</b> <span className="text-slate-500">{h ? 'פאתח, זולפקאר, דזפול, ח׳ייבר שכן, חאג׳ קאסם, סג׳יל, פתאח' : 'Fateh, Zolfaghar, Dezful, Kheibar Shekan, Haj Qasem, Sejjil, Fattah'}</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-green-50 rounded-lg p-3 border border-green-800/30"><div className="text-green-600 text-xs font-bold mb-1">✅</div><div className="text-xs text-slate-500">{h ? 'שיגור מיידי (דקות) • שרידות • TEL ניידים • תחזוקה נמוכה' : 'Instant launch • High survivability • Mobile TELs • Low maintenance'}</div></div>
            <div className="bg-red-50 rounded-lg p-3 border border-red-800/30"><div className="text-red-600 text-xs font-bold mb-1">❌</div><div className="text-xs text-slate-500">{h ? 'אין עצירת בעירה • מערבלים פלנטריים (מסין) • 6-10 ימי יציקה' : 'No burn termination • Planetary mixers (from China) • 6-10 day casting'}</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
