'use client';
import { useLang } from '@/lib/LanguageContext';

export default function Hero() {
 const { t } = useLang();
 return (
 <section id="home" className="pt-20 pb-12 px-4 border-b border-gray-100">
 <div className="max-w-3xl mx-auto text-center">
 <div className="inline-block px-4 py-1 border border-green-600 rounded text-green-700 text-[10px] font-bold tracking-[0.2em] mb-6">
 {t('hero.classified')}
 </div>
 <p className="text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-3">Intelligence Dossier • April 2026</p>
 <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
 {t('hero.title')}
 </h1>
 <h2 className="text-lg md:text-xl text-gray-500 mb-4 font-light">
 {t('hero.subtitle')}
 </h2>
 <div className="w-16 h-[2px] bg-blue-800 mx-auto mb-4" />
 <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
 {t('hero.desc')}
 </p>

 {/* Stats row */}
 <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
 {[
 { n: t('hero.stat1.num'), l: t('hero.stat1.label'), c: 'text-blue-800' },
 { n: t('hero.stat2.num'), l: t('hero.stat2.label'), c: 'text-blue-800' },
 { n: t('hero.stat3.num'), l: t('hero.stat3.label'), c: 'text-red-700' },
 { n: t('hero.stat4.num'), l: t('hero.stat4.label'), c: 'text-amber-700' },
 ].map((s, i) => (
 <div key={i} className="text-center">
 <div className={`text-3xl md:text-4xl font-black ${s.c}`}>{s.n}</div>
 <div className="text-[10px] text-gray-400 mt-1">{s.l}</div>
 </div>
 ))}
 </div>

 <p className="text-xs text-gray-300 mt-8">רועי צוקרמן — מומחה לחומ״ס וטב״ק</p>
 </div>
 </section>
 );
}
