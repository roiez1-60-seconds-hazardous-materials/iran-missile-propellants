'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const events = [
  { year:'1984', he:'איראן רוכשת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים', en:'Iran acquires 20 Scud-B missiles from Libya — missile program begins' },
  { year:'1988', he:'מלחמת איראן-עירק: שיגור טילי Scud. חסן טהראני מוקדאם מוביל הנדסה הפוכה של טכנולוגיה סובייטית', en:'Iran-Iraq War: Scud launches. Tehrani Moghaddam leads reverse engineering of Soviet technology' },
  { year:'1998', he:'שהאב-3 נחשף — טווח 1,300 ק״מ. מבוסס Nodong צפון-קוריאני. דלק IRFNA+TM-185', en:'Shahab-3 unveiled — 1,300km range. Based on North Korean Nodong. IRFNA+TM-185 fuel' },
  { year:'2004', he:'שהאב-3B (גדר) — מיכלי דלק מורחבים, טווח 2,000 ק״מ. תוכנית מודרניזציה', en:'Shahab-3B (Ghadr) — extended fuel tanks, 2,000km range. Modernization program' },
  { year:'2008', he:'סג׳יל-1 נבחן — פריצת דרך בדלק מוצק דו-שלבי. AP+HTPB+Al. שיגור מהיר', en:'Sejjil-1 tested — solid-fuel two-stage breakthrough. AP+HTPB+Al. Rapid launch' },
  { year:'2015', he:'עמאד נחשף — ראשון עם ראש קרב מתמרן (MaRV). דיוק משופר משמעותית', en:'Emad unveiled — first with MaRV. Significantly improved accuracy' },
  { year:'2017', he:'ח׳ורמשהר — טווח 2,000 ק״מ, ראש קרב 1,500 ק״ג. NTO+UDMH. המדויק ביותר', en:'Khorramshahr — 2,000km, 1,500kg warhead. NTO+UDMH. Most accurate liquid missile' },
  { year:'2023', he:'פתאח-1 נחשף — טענה להיפרסוני, Mach 13. ח׳ייבר שכן פעיל עם MaRV', en:'Fattah-1 unveiled — claimed hypersonic Mach 13. Kheibar Shekan operational with MaRV' },
  { year:'10/2024', he:'ישראל תוקפת פרצ׳ין וח׳וג׳יר — השמדת מערבלים פלנטריים ומתקן טאלקאן 2', en:'Israel strikes Parchin & Khojir — planetary mixers & Taleghan 2 destroyed' },
  { year:'2/2026', he:'מבצע שאגת האריה — תקיפות South Pars, אספהאן. איראן משגרת מאות טילים', en:'Operation Roaring Lion — South Pars, Isfahan strikes. Iran launches hundreds of missiles' },
  { year:'4/2026', he:'תקיפת מתקן חומצה חנקתית בשיראז — אחד האחרונים שנותרו. צוואר הבקבוק הכימי', en:'Shiraz nitric acid facility struck — one of the last remaining. The chemical chokepoint' },
];

export default function Timeline() {
  const { t, lang } = useLang();
  return (
    <section id="timeline" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{t('timeline.title')}</h2>
        <p className="text-slate-400 text-sm">{t('timeline.subtitle')}</p>
      </motion.div>

      <div className="relative">
        {/* Vertical line — right side for RTL */}
        <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-gradient-to-b from-blue-500/60 via-red-500/40 to-amber-500/60" />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="relative mb-6 pr-16"
          >
            {/* Year badge on the line */}
            <div className="absolute right-0 top-1 w-12 h-7 rounded-lg bg-blue-900/80 border border-blue-600/50 flex items-center justify-center z-10">
              <span className="text-[10px] font-mono font-bold text-blue-300 leading-none">{ev.year}</span>
            </div>

            {/* Content card */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/60 backdrop-blur-sm p-4 hover:border-blue-500/30 hover:bg-slate-800/80 transition-all cursor-default">
              <p className="text-sm text-slate-300 leading-relaxed">{lang === 'he' ? ev.he : ev.en}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
