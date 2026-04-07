'use client';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const facilities = [
  { name:{he:"ח'וג'יר (Khojir)",en:"Khojir"}, desc:{he:"SHIG+SBIG. ייצור דלק מוצק, הרכבת טילים, מחסנים תת-קרקעיים",en:"SHIG+SBIG. Solid fuel, missile assembly, underground storage"}, status:{he:"הותקף 2024+2026",en:"Struck 2024+2026"}, c:"red", map:"https://maps.google.com/?q=35.6475,51.5511" },
  { name:{he:"פרצ'ין (Parchin)",en:"Parchin"}, desc:{he:"PCI — ייצור HNO₃, חומרי נפץ. מתקן טאלקאן 2 (פרויקט עמאד הגרעיני)",en:"PCI — HNO₃, explosives. Taleghan 2 (AMAD nuclear project)"}, status:{he:"הותקף 2024+2026",en:"Struck 2024+2026"}, c:"red", map:"https://maps.google.com/?q=35.5122,51.7714" },
  { name:{he:"שאהרוד (Shahrud)",en:"Shahrud"}, desc:{he:"בית ייצור מנועים של משמרות המהפכה. מערבלים פלנטריים ובורות יציקה",en:"IRGC engine manufacturing. Planetary mixers and casting pits"}, status:{he:"הותקף מרץ 2026",en:"Struck March 2026"}, c:"red", map:"https://maps.google.com/?q=36.4181,54.9764" },
  { name:{he:"אספהאן (Isfahan - ENTC)",en:"Isfahan (ENTC)"}, desc:{he:"המרת אורניום + כימיקלים דואליים (פלואורידים). מפעלי Seventh of Tir",en:"Uranium conversion + dual-use chemicals (fluorides). Seventh of Tir"}, status:{he:"נפגע יוני 2025",en:"Damaged June 2025"}, c:"amber", map:"https://maps.google.com/?q=32.6167,51.6500" },
  { name:{he:"אסלויה (South Pars)",en:"Asaluyeh (South Pars)"}, desc:{he:"מתקן הפטרוכימיה הגדול ביותר. אמוניה + HNO₃. 85% מהייצוא הפטרוכימי",en:"Largest petrochemical. NH₃ + HNO₃. 85% of petrochemical exports"}, status:{he:"הותקף אפריל 2026",en:"Struck April 2026"}, c:"red", map:"https://maps.google.com/?q=27.4753,52.6100" },
  { name:{he:"שיראז + מאהשהר",en:"Shiraz + Mahshahr"}, desc:{he:"\"אחד האחרונים שנותרו\" (צה\"ל 7.4.26). ייצור חומצה חנקתית",en:"\"One of the last remaining\" (IDF 7.4.26). Nitric acid production"}, status:{he:"הותקף אפריל 2026",en:"Struck April 2026"}, c:"red", map:"https://maps.google.com/?q=29.5926,52.5836" },
];

export default function Strikes() {
  const { lang } = useLang();
  const h = lang === 'he';
  const g = (v: any) => typeof v === 'string' ? v : v[lang];
  return (
    <section id="facilities" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{h?'מוקדי כוח תעשייתיים':'Industrial Power Centers'}</h2>
        <p className="text-slate-400 text-sm">MODAFL → AIO → SHIG + SBIG + PCI</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        {facilities.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border-r-4 ${f.c === 'red' ? 'border-r-red-600' : 'border-r-amber-600'} border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm p-5 hover:bg-slate-800/90 transition-all`}>
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h4 className="font-black text-slate-100">{g(f.name)}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${f.c === 'red' ? 'bg-red-900/60 text-red-300 border-red-700/50' : 'bg-amber-900/60 text-amber-300 border-amber-700/50'}`}>{g(f.status)}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">{g(f.desc)}</p>
            <a href={f.map} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-950/30 px-3 py-1.5 rounded-lg border border-blue-800/30 hover:border-blue-600/40">
              📍 {h ? 'פתח במפות Google' : 'Open in Google Maps'}
            </a>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-2xl border border-amber-700/40 bg-amber-950/20 p-5">
        <h3 className="font-bold text-amber-300 mb-2">📦 {h?'יבוא מסין':'Chinese Imports'}</h3>
        <p className="text-sm text-slate-300">{h?'חברות קש (Pishgaman Tejarat Rafi Novin) — אלפי טונות נתרן פרכלורט מ-Lion Commodities (הונג קונג) דרך נמל ג\'והאי. ~800 טילים. פיצוץ קטלני בנמל שהיד רג\'אי — טיפול רשלני במכולות דלק טילים.':'Shell companies (Pishgaman Tejarat Rafi Novin) — thousands of tons sodium perchlorate from Lion Commodities (Hong Kong) via Zhuhai. ~800 missiles. Fatal explosion at Shahid Rajaee port.'}</p>
      </motion.div>
    </section>
  );
}
