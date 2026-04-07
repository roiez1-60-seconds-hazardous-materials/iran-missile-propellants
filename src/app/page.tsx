'use client';
import { LangProvider, useLang } from '@/lib/LanguageContext';
import { useState, useEffect } from 'react';

/* ====== PROGRESS BAR ====== */
function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => setP(document.documentElement.scrollHeight - window.innerHeight > 0 ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0);
    window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100"><div className="h-full bg-blue-800 transition-all duration-150" style={{width:`${p}%`}}/></div>;
}

/* ====== NAVBAR ====== */
function Nav() {
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const links = [
    ['home','ראשי'],['timeline','ציר זמן'],['diagram','טיל'],['arsenal','ארסנל'],
    ['chemistry','כימיה'],['processes','ייצור'],['facilities','מתקנים'],['hazmat','חומ״ס'],
    ['glossary','מקרא'],['gallery','גלריה'],['sources','מקורות']
  ];
  return <>
    <nav className="fixed top-1 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between">
        <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <img src="/images/logo-60sec.png" alt="" className="w-7 h-7 rounded" style={{width:28,height:28}}/>
          <span className="text-[10px] text-gray-400 font-bold hidden sm:block">60 שניות חומ״ס</span>
        </a>
        <div className="hidden md:flex gap-1">{links.map(([id,he])=><a key={id} href={`#${id}`} className="px-2 py-1 text-[11px] text-gray-400 hover:text-blue-800 transition-colors">{he}</a>)}</div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded hover:bg-blue-100">{lang==='he'?'EN':'עב'}</button>
          <button onClick={()=>setOpen(!open)} className="md:hidden text-gray-400"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
      </div>
    </nav>
    {open && <div className="fixed top-12 inset-x-0 z-40 bg-white border-b border-gray-200 shadow-lg md:hidden p-2">
      {links.map(([id,he])=><a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className="block py-2 px-4 text-sm text-gray-600 hover:bg-blue-50 rounded">{he}</a>)}
    </div>}
  </>;
}

/* ====== HERO — Magazine Masthead ====== */
function Hero() {
  const { t } = useLang();
  return (
    <section id="home" className="pt-16 pb-10 px-4 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block px-3 py-0.5 border border-green-600 rounded text-green-700 text-[10px] font-bold tracking-widest mb-4">לא מסווג</div>
        <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase mb-2">Intelligence Dossier • April 2026</p>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">{t('title')}</h1>
        <h2 className="text-base md:text-xl text-gray-500 font-light mb-3">{t('subtitle')}</h2>
        <div className="w-12 h-0.5 bg-blue-900 mx-auto mb-3"/>
        <p className="text-xs text-gray-400 max-w-lg mx-auto mb-6">{t('desc')}</p>
        <div className="flex justify-center gap-10 mb-6">
          {[['16','סוגי טילים','text-blue-900'],['3,000+','טילים (IISS)','text-blue-900'],['6','מתקנים שהותקפו','text-red-800'],['3','תהליכי ייצור','text-amber-800']].map(([n,l,c],i)=>(
            <div key={i} className="text-center"><div className={`text-2xl md:text-3xl font-black ${c}`}>{n}</div><div className="text-[9px] text-gray-400">{l}</div></div>
          ))}
        </div>
        <p className="text-[11px] text-gray-300">רועי צוקרמן — מומחה לחומ״ס וטב״ק</p>
      </div>
    </section>
  );
}

/* ====== SECTION WRAPPER — Magazine article style ====== */
function Section({ id, num, title, subtitle, children, sidebar }: { id:string; num:string; title:string; subtitle?:string; children:React.ReactNode; sidebar?:React.ReactNode }) {
  return (
    <section id={id} className="py-10 px-4 border-b border-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="text-blue-900 font-black text-lg ml-2">{num}.</span>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 inline">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          <div className="w-10 h-0.5 bg-blue-900 mt-2"/>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">{children}</div>
          {sidebar && <aside className="lg:w-72 flex-shrink-0 space-y-4">{sidebar}</aside>}
        </div>
      </div>
    </section>
  );
}

/* ====== INFO BOX (sidebar) ====== */
function InfoBox({ color, title, children }: { color:'blue'|'red'|'amber'|'purple'|'green'; title:string; children:React.ReactNode }) {
  const c = { blue:'border-r-blue-900 bg-blue-50', red:'border-r-red-800 bg-red-50', amber:'border-r-amber-700 bg-amber-50', purple:'border-r-purple-700 bg-purple-50', green:'border-r-green-700 bg-green-50' };
  const t = { blue:'text-blue-900', red:'text-red-800', amber:'text-amber-800', purple:'text-purple-800', green:'text-green-800' };
  return <div className={`rounded-lg p-4 border-r-[3px] ${c[color]}`}><h4 className={`text-xs font-black mb-2 ${t[color]}`}>{title}</h4><div className="text-xs text-gray-600 leading-relaxed">{children}</div></div>;
}

/* ====== TIMELINE ====== */
function Timeline() {
  const events = [
    {y:'1984',t:'איראן רוכשת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים'},
    {y:'1988',t:'מלחמת איראן-עירק: שיגור טילי Scud. חסן טהראני מוקדאם מוביל הנדסה הפוכה של טכנולוגיה סובייטית'},
    {y:'1998',t:'שהאב-3 נחשף — טווח 1,300 ק״מ. מבוסס Nodong צפון-קוריאני. דלק IRFNA + TM-185'},
    {y:'2004',t:'שהאב-3B (גדר) — מיכלי דלק מורחבים, טווח 2,000 ק״מ'},
    {y:'2008',t:'סג׳יל-1 — פריצת דרך בדלק מוצק דו-שלבי. AP + HTPB + Al'},
    {y:'2015',t:'עמאד — ראשון עם ראש קרב מתמרן (MaRV)'},
    {y:'2017',t:'ח׳ורמשהר — טווח 2,000 ק״מ, ראש קרב 1,500 ק״ג. דלק NTO + UDMH'},
    {y:'2023',t:'פתאח-1 נחשף — טענה להיפרסוני (Mach 13). ח׳ייבר שכן פעיל עם MaRV'},
    {y:'10/24',t:'ישראל תוקפת פרצ׳ין וח׳וג׳יר — השמדת מערבלים פלנטריים', red:true},
    {y:'2/26',t:'מבצע שאגת האריה — תקיפות South Pars, אספהאן. מאות טילים לישראל', red:true},
    {y:'4/26',t:'תקיפת מתקן חומצה חנקתית בשיראז — אחד האחרונים. צוואר הבקבוק הכימי', red:true},
  ];
  return (
    <Section id="timeline" num="01" title="ציר זמן: תוכנית הטילים" subtitle="מסקאד ועד היפרסוני"
      sidebar={<>
        <InfoBox color="blue" title="נקודות מפנה">
          <p>1998 — מעבר מ-Scud לשהאב-3 (טווח ×4)</p>
          <p>2008 — מעבר מנוזלי למוצק (סג׳יל)</p>
          <p>2024 — ישראל תוקפת מתקני ייצור</p>
        </InfoBox>
        <InfoBox color="red" title="⚠️ משמעות">
          <p>תקיפות 2024-2026 פגעו ביכולת הייצור הכימי — לא בטילים עצמם אלא בשרשרת האספקה.</p>
        </InfoBox>
      </>}>
      <div className="space-y-0">
        {events.map((e,i) => (
          <div key={i} className="flex gap-4 items-start py-3 border-b border-gray-50 last:border-0 group hover:bg-gray-50/50 transition-colors rounded">
            <div className={`flex-shrink-0 w-14 text-left font-mono text-xs font-black ${(e as any).red ? 'text-red-700' : 'text-blue-900'}`}>{e.y}</div>
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${(e as any).red ? 'bg-red-500' : 'bg-blue-400'}`}/>
            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{e.t}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== ARSENAL TABLE ====== */
function Arsenal() {
  const [filter, setFilter] = useState('all');
  const missiles = [
    {n:'שהאב-1',r:'285-330',w:'~1,000',p:'נוזלי',f:'IRFNA+TM-185',cep:'~2,500',note:'Scud-B',t:'l'},
    {n:'שהאב-2',r:'~500',w:'~770',p:'נוזלי',f:'IRFNA+TM-185',cep:'~2,000',note:'Scud-C',t:'l'},
    {n:'שהאב-3',r:'~1,300',w:'800-1,200',p:'נוזלי',f:'IRFNA(AK-27)+TM-185',cep:'~1,500',note:'Nodong',t:'l'},
    {n:'קיאם-1/2',r:'800-1,000',w:'~700',p:'נוזלי',f:'IRFNA+UDMH',cep:'~500',note:'TVC, ללא כנפונים',t:'l'},
    {n:'גדר-1/110',r:'1,600-2,000',w:'~750',p:'נוזלי',f:'IRFNA+TM-185',cep:'~300',note:'שהאב-3 משודרג',t:'l'},
    {n:'עמאד',r:'~1,700',w:'~750',p:'נוזלי',f:'IRFNA+TM-185',cep:'~500',note:'ראשון עם MaRV',t:'l'},
    {n:"ח'ורמשהר",r:'~2,000',w:'~1,500',p:'נוזלי',f:'NTO+UDMH',cep:'~30',note:'המדויק ביותר',t:'l'},
    {n:'פאתח-110',r:'200-300',w:'~500',p:'מוצק',f:'AP+HTPB+Al',cep:'~100',note:'SRBM ניידת',t:'s'},
    {n:'זולפקאר',r:'~700',w:'~600',p:'מוצק',f:'AP+HTPB+Al',cep:'~100',note:'נגד תשתיות',t:'s'},
    {n:'דזפול',r:'~1,000',w:'~450',p:'מוצק',f:'AP+HTPB+Al',cep:'~50',note:'דו-שלבי',t:'s'},
    {n:"ח'ייבר שכן",r:'~1,450',w:'~500',p:'מוצק',f:'AP+HTPB+Al+RDX',cep:'~30',note:'MaRV',t:'s'},
    {n:"סג'יל-2",r:'~2,000',w:'650-1,000',p:'מוצק',f:'AP+HTPB+Al+RDX/HMX',cep:'~50',note:'המתקדם ביותר',t:'s'},
    {n:'פתאח-1',r:'~1,400',w:'~500',p:'מוצק',f:'AP+HTPB+Al',cep:'?',note:'היפרסוני (טענה)',t:'s'},
  ];
  const fm = filter==='all' ? missiles : missiles.filter(m=>m.t===filter);
  return (
    <Section id="arsenal" num="02" title="ארסנל הטילים" subtitle="16 מערכות נשק — הגדול ביותר במזרח התיכון"
      sidebar={<>
        <InfoBox color="blue" title="סינון לפי הנעה">
          <div className="flex gap-2 mt-1">
            {[['all','הכל'],['l','נוזלי'],['s','מוצק']].map(([v,l])=>(
              <button key={v} onClick={()=>setFilter(v)} className={`px-3 py-1 rounded text-[11px] font-bold transition-colors ${filter===v?'bg-blue-900 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{l}</button>
            ))}
          </div>
        </InfoBox>
        <InfoBox color="amber" title="💡 הבדל קריטי">
          <p><b>נוזלי:</b> תדלוק שעות, נוזלים רעילים, חשוף לזיהוי מראש</p>
          <p className="mt-1"><b>מוצק:</b> שיגור תוך דקות מ-TEL נייד, קשה לאתר</p>
        </InfoBox>
      </>}>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead><tr className="border-b-2 border-gray-200">
            {['שם','טווח (ק״מ)','ראש קרב','הנעה','דלק / מחמצן','CEP','הערות'].map(h=><th key={h} className="py-2 px-2 text-right text-[11px] font-bold text-gray-400 whitespace-nowrap">{h}</th>)}
          </tr></thead>
          <tbody>{fm.map((m,i)=>(
            <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
              <td className="py-2.5 px-2 font-bold text-gray-800 whitespace-nowrap text-[13px]">{m.n}</td>
              <td className="py-2.5 px-2 text-gray-500 font-mono text-xs" dir="ltr">{m.r}</td>
              <td className="py-2.5 px-2 text-gray-500 font-mono text-xs" dir="ltr">{m.w}</td>
              <td className="py-2.5 px-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.t==='l'?'bg-blue-50 text-blue-800':'bg-amber-50 text-amber-800'}`}>{m.p}</span></td>
              <td className={`py-2.5 px-2 text-xs font-semibold ${m.t==='l'?'text-blue-800':'text-amber-800'}`}>{m.f}</td>
              <td className="py-2.5 px-2 text-gray-400 text-xs font-mono" dir="ltr">{m.cep}</td>
              <td className="py-2.5 px-2 text-gray-400 text-[11px]">{m.note}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Section>
  );
}

/* ====== CHEMISTRY ====== */
function Chemistry() {
  const [tab, setTab] = useState(0);
  const chems = [
    { id:'IRFNA', name:'חומצה חנקתית מעושנת אדומה מעוכבת', erg:'Guide 157',
      props:[['הרכב','HNO₃ ≥70% + N₂O₄ 18-27% + HF 0.6%'],['מראה','נוזל כתום-אדום, אדים צהובים'],['צפיפות','1.55 g/cm³'],['רתיחה','64°C'],['קפאון','-52°C']],
      dangers:[['עור','הרס מיידי, כוויות כימיות'],['עיניים','עיוורון תוך שניות'],['שאיפה','בצקת ריאות מושהית 24-48 שעות!'],['היפרגולי','הצתה ספונטנית עם UDMH']] },
    { id:'UDMH', name:'דימתילהידראזין בלתי סימטרי', erg:'Guide 131',
      props:[['נוסחה','H₂NN(CH₃)₂ — CAS 57-14-7'],['מראה','שקוף, ריח אמוניה/דגים'],['רתיחה','63°C'],['הבזק','-15°C'],['דליקות','2.5%-95%']],
      dangers:[['IDLH','Ca [15 ppm] — מסרטן IARC 2B'],['עור','חודר דרך עור שלם!'],['פירוק','NDMA + פורמלדהיד + HCN — 6 שבועות!']] },
    { id:'NTO', name:'חנקן טטראוקסיד (N₂O₄)', erg:'Guide 124',
      props:[['נוסחה','N₂O₄ — CAS 10544-72-6'],['רתיחה','21°C — מתאדה בטמפ׳ החדר!'],['צפיפות','1.448 g/cm³'],['מראה','חום-אדום, אדים חומים']],
      dangers:[['שאיפה','קטלני! בצקת ריאות מושהית'],['כוויות','מגיב עם מים ברקמה ליצירת HNO₃']] },
    { id:'AP/HTPB', name:'דלק מוצק קומפוזיט', erg:'—',
      props:[['מחמצן','NH₄ClO₄ (AP) ~70%'],['מאגד','HTPB ~15%'],['מתכת','אבקת אלומיניום ~15%']],
      dangers:[['בעירה','עצמית, בלתי ניתנת לכיבוי!'],['תוצרים','HCl + NOx + CO + Al₂O₃'],['סביבתי','פרכלורט מזהם מי תהום']] },
  ];
  const c = chems[tab];
  return (
    <Section id="chemistry" num="03" title="כימיה של הדלקים" subtitle="IRFNA, UDMH, NTO, AP/HTPB — תכונות וסיכונים"
      sidebar={<>
        <InfoBox color="red" title="⚠️ בצקת ריאות מושהית">
          <p>נפגעי IRFNA / NTO עשויים להרגיש בסדר, אך 24-48 שעות לאחר מכן — הצפת ריאות פתאומית וכשל נשימתי קטלני.</p>
          <p className="mt-1 font-bold">כל חשוף = אשפוז מיידי!</p>
        </InfoBox>
        <InfoBox color="purple" title="💡 תגובה היפרגולית">
          <p>מגע ישיר בין דלק (UDMH) למחמצן (IRFNA/NTO) = הצתה ספונטנית מיידית. ללא ניצוץ, ללא חום חיצוני.</p>
        </InfoBox>
      </>}>
      <div className="flex gap-2 mb-6 flex-wrap">
        {chems.map((ch,i)=><button key={i} onClick={()=>setTab(i)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab===i?'bg-blue-900 text-white':'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{ch.id}</button>)}
      </div>
      <div className="bg-gray-50 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-black text-gray-900">{c.id} — {c.name}</h3>
          <span className="px-3 py-1 rounded text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">ERG {c.erg}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">מאפיינים</h4>
            {c.props.map(([k,v],i)=><div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0"><span className="text-sm text-gray-500">{k}</span><span className="text-sm text-gray-800 font-semibold" dir="ltr">{v}</span></div>)}
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-3">⚠️ סיכונים</h4>
            {c.dangers.map(([k,v],i)=><div key={i} className="flex justify-between py-2 border-b border-red-50 last:border-0 bg-red-50/50 -mx-1 px-1 rounded"><span className="text-sm text-gray-500">{k}</span><span className="text-sm text-red-800 font-semibold">{v}</span></div>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ====== FACILITIES ====== */
function Facilities() {
  const facs = [
    {n:"ח'וג'יר",d:'SHIG+SBIG. ייצור דלק מוצק, הרכבת טילים',s:'2024+2026',map:'https://maps.google.com/?q=35.6475,51.5511'},
    {n:'פרצ׳ין',d:'PCI — ייצור HNO₃, חומרי נפץ. מתקן טאלקאן 2',s:'2024+2026',map:'https://maps.google.com/?q=35.5122,51.7714'},
    {n:'שאהרוד',d:'ייצור מנועים. מערבלים פלנטריים ובורות יציקה',s:'מרץ 2026',map:'https://maps.google.com/?q=36.4181,54.9764'},
    {n:'אספהאן',d:'המרת אורניום + כימיקלים דואליים',s:'יוני 2025',map:'https://maps.google.com/?q=32.6167,51.6500'},
    {n:'אסלויה',d:'פטרוכימיה — אמוניה + HNO₃. 85% מייצוא פטרוכימי',s:'אפריל 2026',map:'https://maps.google.com/?q=27.4753,52.6100'},
    {n:'שיראז',d:'ייצור חומצה חנקתית — "אחד האחרונים שנותרו"',s:'אפריל 2026',map:'https://maps.google.com/?q=29.5926,52.5836'},
  ];
  return (
    <Section id="facilities" num="04" title="מתקנים שהותקפו" subtitle="6 מוקדי כוח תעשייתיים"
      sidebar={<>
        <InfoBox color="amber" title="📦 יבוא מסין">
          <p className="font-bold mb-1">עובדות:</p>
          <p>חברת הקש Pishgaman Tejarat Rafi Novin רכשה אלפי טונות נתרן פרכלורט מ-Lion Commodities (הונג קונג) דרך נמל ג׳והאי.</p>
          <p className="mt-1">כמות מספיקה ל~800 טילים מוצקים.</p>
          <p className="font-bold mt-2 mb-1">משמעות:</p>
          <p>איראן תלויה לחלוטין ביבוא סיני. סגירת הערוץ = השבתת ייצור דלק מוצק.</p>
        </InfoBox>
      </>}>
      <div className="space-y-3">
        {facs.map((f,i)=>(
          <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-gray-800">{f.n}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700">{f.s}</span>
              </div>
              <p className="text-sm text-gray-500">{f.d}</p>
            </div>
            <a href={f.map} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-700 hover:text-blue-900 whitespace-nowrap flex-shrink-0">📍 מפה</a>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== HAZMAT ====== */
function HazMat() {
  return (
    <Section id="hazmat" num="05" title="מענה חומ״ס — ERG 2024" subtitle="בידוד, מיגון, כיבוי ופרוטוקול רפואי"
      sidebar={<>
        <InfoBox color="red" title="🏥 פרוטוקול רפואי">
          <p><b>שלב 1 — בזירה:</b> חילוץ מענן, הפשטת בגדים, שטיפה 15+ דקות</p>
          <p className="mt-1"><b>שלב 2 — אשפוז:</b> כל חשוף = 24-48 שעות מעקב</p>
          <p className="mt-1">משתנים (לאסיקס), דובוטמין, סטרואידים, גז NO בשאיפה</p>
          <p className="mt-1"><b>UDMH:</b> ויטמין B6 נוגדן לעוויתות</p>
        </InfoBox>
      </>}>
      <div className="space-y-4">
        {[
          {t:'IRFNA — ERG Guide 157',c:'border-r-red-700',items:['🚧 בידוד: 50 מ׳ | אש: 800 מ׳ | במעלה הרוח','🧑‍🚀 מיגון: חליפת מגן רמה A + מנ״פ בלבד!','🚫 מים: אסור על שלולית! ערפל רק לקירור','🧪 ניטרול: חול → NaHCO₃ מדורג. כלים ללא ניצוץ']},
          {t:'UDMH — ERG Guide 131',c:'border-r-purple-700',items:['🚧 בידוד: 100 מ׳ | דליפה גדולה: 300+ מ׳','🧑‍🚀 חליפת מגן רמה A — חודר עור שלם!','💧 כיבוי: ערפל מים + קצף AR-AFFF','☠️ פירוק: NDMA + פורמלדהיד + HCN — 6 שבועות!']},
          {t:'💥 תגובה היפרגולית',c:'border-r-red-700',items:['מגע דלק + מחמצן = הצתה מיידית ללא ניצוץ!','בשרידי טיל נוזלי: בידוד 800 מ׳, כוחות חומ״ס בלבד']},
        ].map((p,pi)=>(
          <div key={pi} className={`rounded-lg p-4 border-r-[3px] ${p.c} bg-gray-50`}>
            <h4 className="font-bold text-gray-800 mb-3">{p.t}</h4>
            <div className="space-y-2">{p.items.map((it,ii)=><p key={ii} className="text-sm text-gray-600 leading-relaxed">{it}</p>)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ====== SOURCES ====== */
function Sources() {
  const srcs = [
    {n:'CSIS Missile Defense Project',u:'https://missilethreat.csis.org/country/iran/',c:'מחקרי'},
    {n:'Iran Watch — Missile Arsenal',u:'https://www.iranwatch.org/our-publications/weapon-program-background-report/table-irans-missile-arsenal',c:'מחקרי'},
    {n:'USIP — Ballistic Missile Program',u:'https://iranprimer.usip.org/resource/irans-ballistic-missile-program',c:'ממשלתי'},
    {n:'NIOSH/CDC — UDMH Pocket Guide',u:'https://www.cdc.gov/niosh/npg/npgd0227.html',c:'ממשלתי'},
    {n:'NOAA CAMEO — IRFNA',u:'https://cameochemicals.noaa.gov/chemical/4044',c:'ממשלתי'},
    {n:'NOAA CAMEO — NTO',u:'https://cameochemicals.noaa.gov/chemical/4075',c:'ממשלתי'},
    {n:'ERG 2024',u:'https://www.phmsa.dot.gov/hazmat/erg/emergency-response-guidebook-erg',c:'ממשלתי'},
    {n:'NCBI — AEGL Dimethylhydrazine',u:'https://www.ncbi.nlm.nih.gov/books/NBK222415/',c:'אקדמי'},
    {n:'PMC — Delayed Pulmonary Edema',u:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6350573/',c:'אקדמי'},
    {n:'Alma Center — Iran Missiles',u:'https://israel-alma.org/iran-types-of-ballistic-missiles-overview/',c:'מחקרי'},
    {n:'IISS Military Balance',u:'https://www.iiss.org/',c:'מחקרי'},
    {n:'Wikipedia — Iran Missile Program',u:'https://en.wikipedia.org/wiki/Iranian_missile_program',c:'עיון'},
  ];
  const cc:Record<string,string> = {ממשלתי:'bg-green-50 text-green-800',מחקרי:'bg-blue-50 text-blue-800',אקדמי:'bg-purple-50 text-purple-800',עיון:'bg-gray-100 text-gray-600'};
  return (
    <Section id="sources" num="06" title="מקורות ומאמרים">
      <div className="divide-y divide-gray-50">
        {srcs.map((s,i)=><a key={i} href={s.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2.5 text-gray-500 hover:text-blue-800 transition-colors group">
          <span className="text-blue-400 group-hover:text-blue-700">🔗</span>
          <span className="text-sm flex-1">{s.n}</span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${cc[s.c]}`}>{s.c}</span>
        </a>)}
      </div>
    </Section>
  );
}

/* ====== GALLERY ====== */
function Gallery() {
  const [cur, setCur] = useState(0);
  const slides = Array.from({length:13},(_,i)=>`/images/slide-${String(i+1).padStart(2,'0')}.jpg`);
  return (
    <Section id="gallery" num="07" title="גלריה" subtitle="מצגת מודיעינית — 13 שקפים">
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <div className="relative"><img src={slides[cur]} alt="" className="w-full"/>
          <button onClick={()=>setCur(Math.max(0,cur-1))} disabled={cur===0} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-gray-600 flex items-center justify-center disabled:opacity-30">›</button>
          <button onClick={()=>setCur(Math.min(12,cur+1))} disabled={cur===12} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-gray-600 flex items-center justify-center disabled:opacity-30">‹</button>
        </div>
        <div className="flex gap-1 p-2 overflow-x-auto">{slides.map((s,i)=><button key={i} onClick={()=>setCur(i)} className={`flex-shrink-0 w-14 h-9 rounded overflow-hidden border-2 transition-all ${i===cur?'border-blue-500':'border-transparent opacity-50'}`}><img src={s} alt="" className="w-full h-full object-cover"/></button>)}</div>
        <div className="text-center text-xs text-gray-400 py-1">{cur+1} / 13</div>
      </div>
    </Section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-4 bg-gray-50 text-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <img src="/images/logo-60sec.png" alt="" className="w-7 h-7 rounded" style={{width:28,height:28}}/>
        <span className="text-sm font-bold text-blue-900">ניתוח 60 שניות של חומ״ס</span>
      </div>
      <p className="text-sm text-gray-500"><b className="text-gray-700">רועי צוקרמן</b> — מומחה לחומ״ס וטב״ק</p>
      <div className="flex items-center justify-center gap-3 text-sm">
        <a href="mailto:roiez1@gmail.com" className="text-blue-800">✉️ roiez1@gmail.com</a>
        <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" className="text-green-700 bg-green-50 px-3 py-1 rounded text-xs font-bold border border-green-200">WhatsApp</a>
      </div>
      <p className="text-[10px] text-gray-300">מקורות פתוחים בלבד | לא מסווג | אפריל 2026</p>
    </footer>
  );
}

/* ====== MAIN PAGE ====== */
export default function Home() {
  return (
    <LangProvider>
      <ProgressBar/>
      <Nav/>
      <main>
        <Hero/>
        <Timeline/>
        <Arsenal/>
        <Chemistry/>
        <Facilities/>
        <HazMat/>
        <Sources/>
        <Gallery/>
      </main>
      <Footer/>
    </LangProvider>
  );
}
