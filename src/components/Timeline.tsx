'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const events = [
  { year: '1984', he: 'איראן רוכשת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים', en: 'Iran acquires 20 Scud-B missiles from Libya — missile program begins', icon: '📦' },
  { year: '1988', he: 'מלחמת איראן-עירק: שיגור טילי Scud. חסן טהראני מוקדאם מוביל הנדסה הפוכה של טכנולוגיה סובייטית', en: 'Iran-Iraq War: Scud launches. Tehrani Moghaddam leads reverse engineering of Soviet technology', icon: '💥' },
  { year: '1998', he: 'שהאב-3 נחשף — טווח 1,300 ק״מ. מבוסס Nodong צפון-קוריאני. דלק IRFNA+TM-185', en: 'Shahab-3 unveiled — 1,300 km range. Based on North Korean Nodong. IRFNA+TM-185 fuel', icon: '🚀' },
  { year: '2004', he: 'שהאב-3B (גדר) — מיכלי דלק מורחבים, טווח 2,000 ק״מ. תוכנית מודרניזציה', en: 'Shahab-3B (Ghadr) — extended fuel tanks, 2,000 km range. Modernization program', icon: '⚙️' },
  { year: '2008', he: 'סג׳יל-1 נבחן — פריצת דרך בדלק מוצק דו-שלבי. AP+HTPB+Al. שיגור מהיר', en: 'Sejjil-1 tested — solid-fuel two-stage breakthrough. AP+HTPB+Al. Rapid launch capability', icon: '🔩' },
  { year: '2015', he: 'עמאד נחשף — ראשון עם ראש קרב מתמרן (MaRV). דיוק משופר משמעותית', en: 'Emad unveiled — first with Maneuverable Re-entry Vehicle (MaRV). Significantly improved accuracy', icon: '🎯' },
  { year: '2017', he: 'ח׳ורמשהר — טווח 2,000 ק״מ, ראש קרב 1,500 ק״ג. NTO+UDMH. הטיל הנוזלי המדויק ביותר', en: 'Khorramshahr — 2,000 km, 1,500 kg warhead. NTO+UDMH. Most accurate liquid missile', icon: '💣' },
  { year: '2023', he: 'פתאח-1 נחשף — טענה להיפרסוני, Mach 13. ח׳ייבר שכן פעיל עם MaRV', en: 'Fattah-1 unveiled — claimed hypersonic, Mach 13. Kheibar Shekan operational with MaRV', icon: '⚡' },
  { year: '10/2024', he: 'ישראל תוקפת פרצ׳ין וח׳וג׳יר — השמדת מערבלים פלנטריים ומתקן טאלקאן 2 (עמאד)', en: 'Israel strikes Parchin & Khojir — planetary mixers destroyed, Taleghan 2 facility (AMAD)', icon: '🎯' },
  { year: '2/2026', he: 'מבצע שאגת האריה — תקיפות South Pars, אספהאן. איראן משגרת מאות טילים לישראל', en: 'Operation Roaring Lion — South Pars, Isfahan strikes. Iran launches hundreds of missiles at Israel', icon: '🔥' },
  { year: '4/2026', he: 'תקיפת מתקן חומצה חנקתית בשיראז — אחד האחרונים שנותרו. צוואר הבקבוק הכימי', en: 'Shiraz nitric acid facility struck — one of the last remaining. The chemical chokepoint', icon: '⚗️' },
];

export default function Timeline() {
  const { t, lang } = useLang();
  return (
    <section id="timeline" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('timeline.title')}</h2>
        <p className="text-slate-400 text-sm">{t('timeline.subtitle')}</p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 right-1/2 md:right-1/2 w-px bg-gradient-to-b from-blue-500/60 via-red-500/40 to-amber-500/60" />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative flex items-start mb-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Center dot */}
            <div className="absolute right-1/2 md:right-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500/60 flex items-center justify-center text-lg z-10">
              {ev.icon}
            </div>

            {/* Content card */}
            <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:mr-auto md:pl-8' : 'md:ml-auto md:pr-8'} pr-14 md:pr-0 pl-0 md:pl-0`}>
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm p-4 hover:border-blue-500/30 transition-all">
                <div className="text-xs font-mono text-blue-400 mb-1 font-bold">{ev.year}</div>
                <p className="text-sm text-slate-300 leading-relaxed">{lang === 'he' ? ev.he : ev.en}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
