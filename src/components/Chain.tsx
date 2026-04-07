'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function Chain() {
  const { lang } = useLang();
  const h = lang === 'he';
  const steps = [
    { icon: '⚗️', t: h?'תהליך אוסטוולד':'Ostwald Process', d: h?'4NH₃ + 5O₂ → 4NO → NO₂ → HNO₃ (חומצה חנקתית). זרז פלטינה-רודיום, 800-950°C':'4NH₃ + 5O₂ → 4NO → NO₂ → HNO₃. Pt-Rh catalyst, 800-950°C' },
    { icon: '🔴', t: h?'ייצור IRFNA':'IRFNA Production', d: h?'HNO₃ + N₂O₄ (18-27%) + HF (0.6%) = מחמצן לטילים נוזליים':'HNO₃ + N₂O₄ (18-27%) + HF (0.6%) = liquid missile oxidizer' },
    { icon: '🟣', t: h?'תהליך רשיג':'Raschig Process', d: h?'אמוניה + כלוראמין + דימתילאמין → UDMH (דלק נוזלי רעיל)':'Ammonia + chloramine + dimethylamine → UDMH (toxic liquid fuel)' },
    { icon: '🔴', t: h?'תהליך בכמן':'Bachmann Process', d: h?'הקסאמין + HNO₃ מרוכזת → RDX/HMX (חומרי נפץ לדלק מוצק + ראשי קרב + עדשות גרעיניות)':'Hexamine + conc. HNO₃ → RDX/HMX (explosives for solid fuel + warheads + nuclear lenses)' },
  ];
  return (
    <section id="processes" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{h?'תהליכי ייצור כימיים':'Chemical Production Processes'}</h2>
        <p className="text-slate-400 text-sm">{h?'אוסטוולד, רשיג ובכמן — שלושת התהליכים שנפגעו':'Ostwald, Raschig & Bachmann — the three disrupted processes'}</p>
      </motion.div>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="flex gap-4 items-start rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm p-5 hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-900/60 border border-blue-600/40 flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
            <div>
              <h3 className="font-bold text-slate-100 mb-1">{s.t}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
            </div>
            {i < steps.length - 1 && <div className="hidden md:block text-blue-500/40 text-2xl mr-auto">↓</div>}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-xl border-r-4 border-amber-600 bg-amber-950/30 p-4 text-sm text-amber-200">
        ⚡ <b>{h?'מערבלים פלנטריים (Planetary Mixers):':'Planetary Mixers:'}</b> {h?'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — הברחות מסין. השמדתם = ואקום ייצורי בלתי ניתן למילוי.':'Giant machines for solid fuel mixing. Iran cannot produce them — smuggled from China. Their destruction = unfillable production vacuum.'}
      </motion.div>
    </section>
  );
}
