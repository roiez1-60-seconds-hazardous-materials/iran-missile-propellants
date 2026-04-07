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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* Unclassified stamp */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="mb-6 px-6 py-2 border-2 border-green-500/60 rounded-lg bg-green-500/10"
      >
        <span className="text-green-400 font-mono font-bold tracking-[0.3em] text-sm">
          {t('hero.classified')}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-4 leading-tight"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-blue-300 to-cyan-400">
          {t('hero.title')}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xl md:text-3xl text-slate-300 text-center mb-4 font-bold"
      >
        {t('hero.subtitle')}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-slate-400 text-center max-w-3xl mb-2 text-sm md:text-base leading-relaxed"
      >
        {t('hero.desc')}
      </motion.p>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-2 mb-10"
      >
        <span className="text-red-500 animate-pulse">●</span>
        <span className="text-sm text-slate-500 font-mono">{t('hero.date')}</span>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4 + i * 0.15, type: 'spring' }}
            className="text-center px-6 py-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-3xl md:text-4xl font-black text-blue-400">{t(s.key)}</div>
            <div className="text-xs text-slate-500 mt-1">{t(s.label)}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
        className="px-8 py-3 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-sm hover:bg-blue-600/30 transition-all"
      >
        {t('hero.cta')}
      </motion.button>
    </section>
  );
}
