'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const missiles = [
  {n:"שהאב-1",ne:"Shahab-1",r:"285-330",w:"~1,000",p:"נוזלי",pe:"Liquid",f:"IRFNA+TM-185",c:"~2,500",s:true,t:"l",note:"Scud-B",notee:"Scud-B"},
  {n:"שהאב-2",ne:"Shahab-2",r:"~500",w:"~770",p:"נוזלי",pe:"Liquid",f:"IRFNA+TM-185",c:"~2,000",s:true,t:"l",note:"Scud-C",notee:"Scud-C"},
  {n:"שהאב-3",ne:"Shahab-3",r:"~1,300",w:"800-1,200",p:"נוזלי",pe:"Liquid",f:"IRFNA(AK-27)+TM-185",c:"~1,500",s:true,t:"l",note:"מנוע Nodong",notee:"Nodong engine"},
  {n:"קיאם-1/2",ne:"Qiam-1/2",r:"800-1,000",w:"~700",p:"נוזלי",pe:"Liquid",f:"IRFNA+UDMH",c:"~500",s:true,t:"l",note:"TVC, ללא כנפונים",notee:"TVC, no fins"},
  {n:"גדר-1/110",ne:"Ghadr-1/110",r:"1,600-2,000",w:"~750",p:"נוזלי",pe:"Liquid",f:"IRFNA+TM-185",c:"~300",s:true,t:"l",note:"שהאב-3 משודרג",notee:"Upgraded Shahab-3"},
  {n:"עמאד",ne:"Emad",r:"~1,700",w:"~750",p:"נוזלי",pe:"Liquid",f:"IRFNA+TM-185",c:"~500",s:true,t:"l",note:"ראשון עם MaRV",notee:"First MaRV"},
  {n:"ח'ורמשהר",ne:"Khorramshahr",r:"~2,000",w:"~1,500",p:"נוזלי",pe:"Liquid",f:"NTO+UDMH",c:"~30",s:true,t:"l",note:"המדויק ביותר (נוזלי)",notee:"Most accurate (liquid)"},
  {n:"פאתח-110",ne:"Fateh-110",r:"200-300",w:"~500",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al",c:"~100",s:true,t:"s",note:"SRBM ניידת",notee:"Mobile SRBM"},
  {n:"פאתח-313",ne:"Fateh-313",r:"~500",w:"~450",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al",c:"~30",s:true,t:"s",note:"מונחה",notee:"Guided"},
  {n:"זולפקאר",ne:"Zolfaghar",r:"~700",w:"~600",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al",c:"~100",s:true,t:"s",note:"נגד תשתיות",notee:"Anti-infrastructure"},
  {n:"דזפול",ne:"Dezful",r:"~1,000",w:"~450",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al",c:"~50",s:true,t:"s",note:"דו-שלבי",notee:"Two-stage"},
  {n:"ח'ייבר שכן",ne:"Kheibar Shekan",r:"~1,450",w:"~500",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al+RDX",c:"~30",s:true,t:"s",note:"MaRV, הטיית נחיר",notee:"MaRV, nozzle gimbal"},
  {n:"חאג' קאסם",ne:"Haj Qasem",r:"~1,400",w:"~500",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al",c:"~30",s:true,t:"s",note:"דו-שלבי",notee:"Two-stage"},
  {n:"סג'יל-2",ne:"Sejjil-2",r:"~2,000",w:"650-1,000",p:"מוצק",pe:"Solid",f:"AP+HTPB+Al+RDX/HMX",c:"~50",s:true,t:"s",note:"המתקדם, TEL",notee:"Most advanced, TEL"},
  {n:"פתאח-1",ne:"Fattah-1",r:"~1,400",w:"~500",p:"מוצק+MaRV",pe:"Solid+MaRV",f:"AP+HTPB+Al",c:"גבוה",s:false,t:"s",note:"היפרסוני (טענה)",notee:"Hypersonic (claimed)"},
];

export default function Platforms() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [filter, setFilter] = useState('all');
  const fm = filter === 'all' ? missiles : missiles.filter(m => m.t === (filter === 'l' ? 'l' : 's'));

  return (
    <section id="arsenal" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{h?'ארסנל הטילים':'Missile Arsenal'}</h2>
        <p className="text-slate-400 text-sm">{h?'16 מערכות נשק — הגדול ביותר במזרח התיכון':'16 weapon systems — largest in the Middle East'}</p>
      </motion.div>
      <div className="flex gap-2 justify-center mb-6">
        {[['all',h?'הכל':'All'],['l',h?'🔵 נוזלי':'🔵 Liquid'],['s',h?'🟠 מוצק':'🟠 Solid']].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${filter===v?'bg-blue-800/60 text-blue-200 border-blue-600/50':'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>{l}</button>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="rounded-2xl bg-slate-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-900/30">
              {[h?'שם':'Name',h?'טווח (ק״מ)':'Range (km)',h?'ראש קרב (ק״ג)':'Warhead (kg)',h?'הנעה':'Propulsion',h?'דלק / מחמצן':'Fuel / Oxidizer','CEP (m)',h?'מצב':'Status',h?'הערות':'Notes'].map(hd => (
                <th key={hd} className="py-3 px-3 text-right text-xs font-bold text-slate-400 whitespace-nowrap">{hd}</th>
              ))}
            </tr></thead>
            <tbody>{fm.map((m,i) => (
              <tr key={i} className={`hover:bg-slate-800/40 transition-colors ${m.t==='l'?'bg-blue-950/5':'bg-amber-950/5'}`}>
                <td className="py-2.5 px-3 font-bold text-slate-100 whitespace-nowrap">{h?m.n:m.ne}</td>
                <td className="py-2.5 px-3 text-slate-300 font-mono text-xs" dir="ltr">{m.r}</td>
                <td className="py-2.5 px-3 text-slate-300 font-mono text-xs" dir="ltr">{m.w}</td>
                <td className="py-2.5 px-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${m.t==='l'?'bg-blue-900/60 text-blue-300 border-blue-700/50':'bg-amber-900/60 text-amber-300 border-amber-700/50'}`}>{h?m.p:m.pe}</span></td>
                <td className={`py-2.5 px-3 text-xs font-semibold ${m.t==='l'?'text-cyan-300':'text-amber-300'}`}>{m.f}</td>
                <td className="py-2.5 px-3 text-slate-400 text-xs font-mono" dir="ltr">{m.c}</td>
                <td className="py-2.5 px-3"><span className={`inline-block w-2 h-2 rounded-full ${m.s?'bg-green-400':'bg-yellow-400'} ml-1`}/><span className="text-xs text-slate-400 mr-1">{m.s?(h?'פעיל':'Active'):(h?'טרום':'Pre-op')}</span></td>
                <td className="py-2.5 px-3 text-slate-500 text-xs">{h?m.note:m.notee}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
