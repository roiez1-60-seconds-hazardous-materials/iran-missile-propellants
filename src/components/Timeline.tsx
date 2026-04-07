'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const events = [
  { year:'1984', he:'איראן רוכשת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים', en:'Iran acquires 20 Scud-B missiles from Libya — missile program begins' },
  { year:'1988', he:'מלחמת איראן-עירק: שיגור טילי Scud. חסן טהראני מוקדאם מוביל הנדסה הפוכה של טכנולוגיה סובייטית', en:'Iran-Iraq War: Scud launches. Tehrani Moghaddam leads reverse engineering of Soviet technology' },
  { year:'1998', he:'שהאב-3 נחשף — טווח 1,300 ק״מ. מבוסס Nodong צפון-קוריאני. דלק IRFNA+TM-185', en:'Shahab-3 unveiled — 1,300 km range. Based on North Korean Nodong. IRFNA+TM-185 fuel' },
  { year:'2004', he:'שהאב-3B (גדר) — מיכלי דלק מורחבים, טווח 2,000 ק״מ. תוכנית מודרניזציה', en:'Shahab-3B (Ghadr) — extended fuel tanks, 2,000 km range. Modernization program' },
  { year:'2008', he:'סג׳יל-1 נבחן — פריצת דרך בדלק מוצק דו-שלבי. AP+HTPB+Al. שיגור מהיר', en:'Sejjil-1 tested — solid-fuel two-stage breakthrough. AP+HTPB+Al. Rapid launch' },
  { year:'2015', he:'עמאד נחשף — ראשון עם ראש קרב מתמרן (MaRV). דיוק משופר משמעותית', en:'Emad unveiled — first with MaRV. Significantly improved accuracy' },
  { year:'2017', he:'ח׳ורמשהר — טווח 2,000 ק״מ, ראש קרב 1,500 ק״ג. NTO+UDMH. הטיל הנוזלי המדויק ביותר', en:'Khorramshahr — 2,000 km, 1,500 kg warhead. NTO+UDMH. Most accurate liquid missile' },
  { year:'2023', he:'פתאח-1 נחשף — טענה להיפרסוני, Mach 13. ח׳ייבר שכן פעיל עם MaRV', en:'Fattah-1 unveiled — claimed hypersonic, Mach 13. Kheibar Shekan operational with MaRV' },
  { year:'10/2024', he:'ישראל תוקפת פרצ׳ין וח׳וג׳יר — השמדת מערבלים פלנטריים ומתקן טאלקאן 2', en:'Israel strikes Parchin & Khojir — planetary mixers destroyed, Taleghan 2 facility' },
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
        {/* Vertical fuse line */}
        <div className="absolute top-0 bottom-0 right-[60px] md:right-[80px] w-[2px] bg-gradient-to-b from-blue-500/80 via-red-500/60 to-amber-500/80" />

        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="relative flex items-start mb-6 group"
          >
            {/* Year badge - on the line */}
            <div className="flex-shrink-0 w-[55px] md:w-[70px] text-left ml-2 md:ml-4">
              <div className={`inline-block px-2 py-1 rounded-md text-[11px] md:text-xs font-mono font-black ${i >= 8 ? 'bg-red-100 text-red-600 border border-red-700/40' : 'bg-blue-900/50 text-blue-600 border border-blue-700/30'}`}>
                {ev.year}
              </div>
            </div>

            {/* Dot on line */}
            <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 mx-2 border-2 ${i >= 8 ? 'bg-red-500 border-red-400' : 'bg-blue-500 border-blue-400'} group-hover:scale-150 transition-transform`} />

            {/* Content */}
            <div className="flex-1 pr-2">
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">
                {lang === 'he' ? ev.he : ev.en}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
