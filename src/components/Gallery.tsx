'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const SLIDE_COUNT = 13;
const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => `/images/slide-${String(i + 1).padStart(2, '0')}.jpg`);

export default function Gallery() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showInfographic, setShowInfographic] = useState(false);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(SLIDE_COUNT - 1, c + 1));

  return (
    <section id="gallery" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('gallery.title')}</h2>
      </motion.div>

      {/* Presentation viewer — hero slide with navigation */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-slate-700/40 flex items-center justify-between">
          <h3 className="font-bold text-slate-300 text-sm">{h ? 'מצגת מודיעינית — תיק מודיעין טקטי' : 'Intelligence Presentation — Tactical Dossier'}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{current + 1} / {SLIDE_COUNT}</span>
            <button onClick={() => setFullscreen(true)} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all text-xs font-bold">
              {h ? '🔍 מסך מלא' : '🔍 Fullscreen'}
            </button>
          </div>
        </div>

        {/* Main slide */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slides[current]}
              alt={`Slide ${current + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full cursor-pointer"
              onClick={() => setFullscreen(true)}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          <button onClick={prev} disabled={current === 0}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all disabled:opacity-30 text-lg font-bold">
            ›
          </button>
          <button onClick={next} disabled={current === SLIDE_COUNT - 1}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all disabled:opacity-30 text-lg font-bold">
            ‹
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="p-3 flex gap-2 overflow-x-auto bg-slate-950/50">
          {slides.map((s, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-10 rounded-md overflow-hidden border-2 transition-all ${i === current ? 'border-blue-500 ring-1 ring-blue-400/50' : 'border-transparent opacity-50 hover:opacity-80'}`}>
              <img src={s} alt={`${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Infographic */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="cursor-pointer" onClick={() => setShowInfographic(true)}>
        <div className="rounded-2xl border border-blue-700/40 bg-blue-950/20 p-4 hover:border-blue-500/40 transition-all">
          <h3 className="font-bold text-blue-300 mb-3 text-center">🖼️ {h ? 'אינפוגרפיקה: טכנולוגיית ייצור טילים בליסטיים' : 'Infographic: Ballistic Missile Production'}</h3>
          <img src="/images/infographic.png" alt="infographic" className="w-full max-h-64 object-cover object-top rounded-lg opacity-80 hover:opacity-100 transition-opacity" />
          <p className="text-xs text-slate-400 mt-2 text-center">{h ? 'לחצו להגדלה' : 'Click to enlarge'}</p>
        </div>
      </motion.div>

      {/* Fullscreen */}
      <AnimatePresence>
        {(fullscreen || showInfographic) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => { setFullscreen(false); setShowInfographic(false); }}>
            <div className="relative max-w-[95vw] max-h-[95vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => { setFullscreen(false); setShowInfographic(false); }}
                className="absolute top-2 left-2 z-10 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black/90">✕</button>
              {showInfographic ? (
                <img src="/images/infographic.png" alt="infographic" className="max-w-full max-h-[90vh] rounded-xl" />
              ) : (
                <>
                  <img src={slides[current]} alt={`Slide ${current + 1}`} className="max-w-full max-h-[85vh] rounded-xl" />
                  <div className="flex justify-between items-center mt-3 px-4">
                    <button onClick={(e) => { e.stopPropagation(); prev(); }}
                      className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30" disabled={current === 0}>
                      {h ? '→ הקודם' : '← Prev'}
                    </button>
                    <span className="text-slate-400 font-mono">{current + 1} / {SLIDE_COUNT}</span>
                    <button onClick={(e) => { e.stopPropagation(); next(); }}
                      className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30" disabled={current === SLIDE_COUNT - 1}>
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
