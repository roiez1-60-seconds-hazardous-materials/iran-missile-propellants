'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const stats = [
  { key: 'hero.stat1.num', label: 'hero.stat1.label', icon: '🚀' },
  { key: 'hero.stat2.num', label: 'hero.stat2.label', icon: '💣' },
  { key: 'hero.stat3.num', label: 'hero.stat3.label', icon: '🎯' },
  { key: 'hero.stat4.num', label: 'hero.stat4.label', icon: '🏭' },
];

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* Unclassified stamp */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mb-4 px-5 py-1.5 border-2 border-green-500/60 rounded-lg bg-green-500/10"
      >
        <span className="text-green-400 font-mono font-bold tracking-[0.3em] text-xs">
          {t('hero.classified')}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-3 leading-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-blue-300 to-cyan-400">
          {t('hero.title')}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-lg md:text-2xl text-slate-300 text-center mb-3 font-bold"
      >
        {t('hero.subtitle')}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-slate-400 text-center max-w-2xl mb-2 text-xs md:text-sm leading-relaxed"
      >
        {t('hero.desc')}
      </motion.p>

      {/* Date */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="flex items-center gap-2 mb-8">
        <span className="text-red-500 animate-pulse text-xs">●</span>
        <span className="text-xs text-slate-500 font-mono">{t('hero.date')}</span>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 w-full max-w-2xl">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 + i * 0.1, type: 'spring' }}
            className="text-center px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <div className="text-lg mb-0.5">{s.icon}</div>
            <div className="text-2xl md:text-3xl font-black text-blue-400">{t(s.key)}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{t(s.label)}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
        className="px-6 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-sm hover:bg-blue-600/30 transition-all">
        {t('hero.cta')}
      </motion.button>
    </section>
  );
}
