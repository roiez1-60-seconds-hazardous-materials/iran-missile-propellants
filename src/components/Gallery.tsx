'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const SLIDE_COUNT = 13;
const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => ({
  src: `/images/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  caption: { he: `שקף ${i + 1} מתוך ${SLIDE_COUNT}`, en: `Slide ${i + 1} of ${SLIDE_COUNT}` },
}));

export default function Gallery() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  const [selected, setSelected] = useState<number | null>(null);
  const [showInfographic, setShowInfographic] = useState(false);

  return (
    <section id="gallery" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('gallery.title')}</h2>
      </motion.div>

      {/* Infographic */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-8 cursor-pointer" onClick={() => setShowInfographic(true)}>
        <div className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-4 hover:border-blue-500/40 transition-all">
          <h3 className="font-bold text-blue-300 mb-3 text-center">🖼️ {h ? 'אינפוגרפיקה: טכנולוגיית ייצור טילים בליסטיים' : 'Infographic: Ballistic Missile Production Technology'}</h3>
          <img src="/images/infographic.png" alt="infographic" className="w-full max-h-64 object-cover object-top rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
          <p className="text-xs text-slate-400 mt-2 text-center">{h ? 'לחצו להגדלה' : 'Click to enlarge'}</p>
        </div>
      </motion.div>

      {/* Presentation slides */}
      <h3 className="font-bold text-slate-300 mb-4 text-center">{h ? `מצגת מודיעינית — ${SLIDE_COUNT} שקפים` : `Intelligence Presentation — ${SLIDE_COUNT} slides`}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {slides.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="cursor-pointer rounded-lg overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105"
            onClick={() => setSelected(i)}>
            <img src={s.src} alt={`slide ${i + 1}`} className="w-full aspect-video object-cover" loading="lazy" />
            <div className="text-[10px] text-slate-500 text-center py-1 bg-slate-900/80">{i + 1}</div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {(selected !== null || showInfographic) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => { setSelected(null); setShowInfographic(false); }}>
            <div className="relative max-w-[95vw] max-h-[95vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => { setSelected(null); setShowInfographic(false); }}
                className="absolute top-2 left-2 z-10 bg-slate-900/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-slate-700 transition-colors">✕</button>
              {showInfographic ? (
                <img src="/images/infographic.png" alt="infographic" className="max-w-full max-h-[90vh] rounded-xl" />
              ) : selected !== null && (
                <>
                  <img src={slides[selected].src} alt={`slide ${selected + 1}`} className="max-w-full max-h-[85vh] rounded-xl" />
                  <div className="flex justify-between items-center mt-3">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(Math.max(0, selected - 1)); }}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700" disabled={selected === 0}>
                      {h ? '→ הקודם' : '← Previous'}
                    </button>
                    <span className="text-slate-400 text-sm">{selected + 1} / {SLIDE_COUNT}</span>
                    <button onClick={(e) => { e.stopPropagation(); setSelected(Math.min(SLIDE_COUNT - 1, selected + 1)); }}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700" disabled={selected === SLIDE_COUNT - 1}>
                      {h ? 'הבא ←' : 'Next →'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
