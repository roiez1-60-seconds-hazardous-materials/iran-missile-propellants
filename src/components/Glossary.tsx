'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const terms = [
  {t:'IRFNA',c:'chem',he:'Inhibited Red Fuming Nitric Acid — חומצה חנקתית מעושנת אדומה מעוכבת. נוזל כתום-אדום, קורוזיבי ורעיל. המחמצן העיקרי בטילים נוזליים איראניים',en:'Inhibited Red Fuming Nitric Acid — orange-red, corrosive, toxic liquid. Primary oxidizer in Iranian liquid missiles'},
  {t:'UDMH',c:'chem',he:'Unsymmetrical Dimethylhydrazine — דימתילהידראזין בלתי סימטרי. דלק טילים נוזלי שקוף עם ריח אמוניה. רעיל ביותר, מסרטן, חודר עור שלם',en:'Unsymmetrical Dimethylhydrazine — colorless liquid missile fuel with ammonia odor. Extremely toxic, carcinogenic, penetrates intact skin'},
  {t:'NTO (N₂O₄)',c:'chem',he:'Nitrogen Tetroxide — חנקן טטראוקסיד. מחמצן נוזלי חום-אדום. רותח ב-21 מעלות בלבד — מתאדה בכל מזג אוויר. משמש בטיל ח׳ורמשהר. רעיל ביותר — גורם לבצקת ריאות מושהית',en:'Nitrogen Tetroxide — red-brown liquid oxidizer. Boils at only 21°C — evaporates in any weather. Used in Khorramshahr. Extremely toxic — causes delayed pulmonary edema'},
  {t:'HNO₃',c:'chem',he:'חומצה חנקתית — חומר הגלם הקריטי ביותר. ממנו מייצרים: IRFNA (מחמצן לטילים), RDX/HMX (חומרי נפץ), NTO (מחמצן נוסף). מיוצרת בתהליך אוסטוולד',en:'Nitric Acid — the most critical raw material. Used to produce: IRFNA (missile oxidizer), RDX/HMX (explosives), NTO (additional oxidizer). Produced via Ostwald process'},
  {t:'TM-185',c:'chem',he:'קרוסין צבאי בסימון סובייטי. דלק על בסיס נפט המשמש בטילי שהאב וגדר, יחד עם מחמצן IRFNA',en:'Soviet-designated military kerosene. Petroleum-based fuel used in Shahab and Ghadr missiles, paired with IRFNA oxidizer'},
  {t:'AK-27',c:'chem',he:'סימון סובייטי לנוסחת IRFNA: 73% חומצה חנקתית + 27% חנקן טטראוקסיד + מעכב קורוזיה. הנוסחה שהועברה לאיראן דרך צפון קוריאה',en:'Soviet designation for IRFNA formula: 73% nitric acid + 27% nitrogen tetroxide + corrosion inhibitor. Formula transferred to Iran via North Korea'},
  {t:'AP',c:'chem',he:'Ammonium Perchlorate — אמוניום פרכלורט. תרכובת גבישית לבנה שמהווה כ-70% מהדלק המוצק. משחררת חמצן בחימום — מאפשרת בעירה גם בוואקום',en:'Ammonium Perchlorate — white crystalline compound comprising ~70% of solid fuel. Releases oxygen when heated — enables combustion even in vacuum'},
  {t:'HTPB',c:'chem',he:'Hydroxyl-Terminated Polybutadiene — פולימר גמיש דמוי גומי. משמש בדלק מוצק כמאגד (מדביק הרכיבים) וכדלק (בוער עם ה-AP). כ-15% מהתערובת',en:'Hydroxyl-Terminated Polybutadiene — flexible rubber-like polymer. Solid fuel binder (holds components together) and fuel (burns with AP). ~15% of mixture'},
  {t:'RDX',c:'chem',he:'Research Department Explosive — הקסוגן. חומר נפץ נהדף, חזק פי 1.6 מ-TNT. מיוצר מהקסאמין וחומצה חנקתית בתהליך בכמן',en:'Research Department Explosive — Hexogen. Detonating explosive, 1.6x more powerful than TNT. Produced from hexamine and nitric acid via Bachmann process'},
  {t:'HMX',c:'chem',he:'High Melting Explosive — אוקטוגן. חומר נפץ חזק יותר מ-RDX. משמש גם כחומר הנפץ בעדשות קריסה של נשק גרעיני (Implosion Lenses)',en:'High Melting Explosive — Octogen. More powerful than RDX. Also used as explosive in nuclear implosion lenses'},
  {t:'NOx',c:'chem',he:'תחמוצות חנקן — גזים רעילים (NO, NO₂) הנפלטים מ-IRFNA. צבע חום-צהוב, ריח חריף. גורמים לבצקת ריאות מושהית: תסמינים מופיעים רק 24-48 שעות אחרי חשיפה',en:'Nitrogen Oxides — toxic gases (NO, NO₂) emitted from IRFNA. Brown-yellow, sharp odor. Cause delayed pulmonary edema: symptoms appear 24-48 hours after exposure'},
  {t:'NDMA',c:'chem',he:'N-Nitrosodimethylamine — תוצר פירוק של UDMH שנוצר כשהדלק מתחמצן באוויר. מסרטן מוכח. נשאר בקרקע ובאוויר עד 6 שבועות',en:'N-Nitrosodimethylamine — UDMH decomposition product formed when fuel oxidizes in air. Proven carcinogen. Persists in soil and air up to 6 weeks'},
  {t:'NH₃',c:'chem',he:'אמוניה — גז חריף (או נוזל תחת לחץ). חומר גלם עיקרי לתהליך אוסטוולד ולתהליך רשיג. שימוש כפול: גם דשנים וגם דלק טילים',en:'Ammonia — pungent gas (or pressurized liquid). Primary feedstock for Ostwald and Raschig processes. Dual-use: fertilizers and missile fuel'},
  {t:'HF',c:'chem',he:'Hydrogen Fluoride — מימן פלואורי. מתווסף ל-IRFNA בריכוז 0.6% כדי ליצור שכבת מגן על דפנות המיכל ולמנוע את החומצה מלאכול את המתכת',en:'Hydrogen Fluoride — added to IRFNA at 0.6% to create protective layer on tank walls, preventing acid from corroding the metal'},
  {t:'Dual-Use',c:'chem',he:'שימוש כפול — חומר בעל שימוש אזרחי שניתן להסב לצבאי. דוגמאות: אמוניה (דשנים ← דלק), מערבלים פלנטריים (מזון ← דלק מוצק)',en:'Dual-Use — material with civilian use convertible to military. Examples: ammonia (fertilizer → fuel), planetary mixers (food → solid fuel)'},
  {t:'היפרגולי',c:'mil',he:'תגובה היפרגולית — כשדלק ומחמצן נדלקים ספונטנית ברגע שהם נוגעים זה בזה. ללא ניצוץ, ללא מצת. דוגמה: UDMH + IRFNA = אש מיידית',en:'Hypergolic — fuel and oxidizer ignite spontaneously on contact. No spark, no igniter. Example: UDMH + IRFNA = instant fire'},
  {t:'MaRV',c:'mil',he:'Maneuverable Re-entry Vehicle — ראש קרב מתמרן. ראש הטיל משנה כיוון בשלב החדירה לאטמוספירה, מה שמקשה מאוד על יירוט',en:'Maneuverable Re-entry Vehicle — warhead changes direction during re-entry, making interception very difficult'},
  {t:'CEP',c:'mil',he:'Circular Error Probable — מעגל שגיאה. הרדיוס שבתוכו נופלים 50% מהטילים. מספר קטן = דיוק גבוה. ח׳ורמשהר: 30 מ׳, שהאב-1: 2,500 מ׳',en:'Circular Error Probable — radius within which 50% of missiles land. Small number = high accuracy. Khorramshahr: 30m, Shahab-1: 2,500m'},
  {t:'TEL',c:'mil',he:'Transporter Erector Launcher — משגר נייד. משאית שנושאת טיל, מזדקפת ומשגרת. יתרון: קשה לאתר לפני שיגור',en:'Transporter Erector Launcher — mobile launcher truck. Carries, erects and launches missile. Advantage: hard to locate before launch'},
  {t:'TVC',c:'mil',he:'Thrust Vector Control — בקרת וקטור דחף. מנגנון שמטה את נחיר המנוע כדי לשנות כיוון טיסה. מחליף כנפונים בטילים מתקדמים',en:'Thrust Vector Control — mechanism tilting engine nozzle to change flight direction. Replaces fins in advanced missiles'},
  {t:'Isp',c:'mil',he:'Specific Impulse — דחף סגולי. מדד ליעילות מנוע רקטי, נמדד בשניות. מספר גבוה = יותר דחף מכל קילוגרם דלק',en:'Specific Impulse — rocket engine efficiency measure in seconds. Higher = more thrust per kg of fuel'},
  {t:'INS',c:'mil',he:'Inertial Navigation System — מערכת ניווט אינרציאלית. ג\'ירוסקופים ומדי תאוצה שמחשבים מיקום ללא GPS. כל טילי איראן מצוידים בה',en:'Inertial Navigation System — gyroscopes and accelerometers calculating position without GPS. All Iranian missiles equipped'},
  {t:'SHIG',c:'org',he:'Shahid Hemmat Industrial Group — קבוצת שהיד המת. חטיבת פיתוח וייצור הטילים הנוזליים של איראן',en:'Shahid Hemmat Industrial Group — Iran liquid missile development and production division'},
  {t:'SBIG',c:'org',he:'Shahid Bakeri Industrial Group — קבוצת שהיד באקרי. חטיבת פיתוח וייצור הטילים המוצקים',en:'Shahid Bakeri Industrial Group — solid missile development and production division'},
  {t:'PCI',c:'org',he:'Parchin Chemical Industries — מפעלי פרצ\'ין. ייצור חומצה חנקתית, חומרי נפץ ורכיבי דלק. הותקף 2024 ו-2026',en:'Parchin Chemical Industries — nitric acid, explosives and fuel component production. Struck in 2024 and 2026'},
  {t:'MODAFL',c:'org',he:'Ministry of Defense and Armed Forces Logistics — משרד ההגנה האיראני. גוף העל המפקח על כל תעשיות הנשק',en:'Ministry of Defense and Armed Forces Logistics — Iranian defense ministry overseeing all weapons industries'},
  {t:'AIO',c:'org',he:'Aerospace Industries Organization — ארגון התעשיות האווירו-חלליות. תחת MODAFL. מפקח על SHIG ו-SBIG',en:'Aerospace Industries Organization — under MODAFL. Oversees SHIG and SBIG'},
  {t:'מנ״פ',c:'hazmat',he:'מערכת נשימה פתוחה (בלחץ חיובי). מכילה בלון אוויר דחוס ומסכה אטומה. חובה באירוע חומ״ס עם דלקי טילים',en:'Self-Contained Breathing Apparatus (SCBA). Contains compressed air cylinder and sealed mask. Mandatory in missile fuel HazMat events'},
  {t:'ERG',c:'hazmat',he:'Emergency Response Guidebook — מדריך תגובה לחירום (מהדורת 2024). מפרט פרוטוקולי בידוד, מיגון וכיבוי לכל חומר מסוכן לפי מספר UN',en:'Emergency Response Guidebook (2024 edition). Details isolation, PPE and suppression protocols for each hazardous material by UN number'},
  {t:'IDLH',c:'hazmat',he:'Immediately Dangerous to Life or Health — ריכוז שמהווה סכנה מיידית לחיים. מעל רמה זו — חובה מנ״פ',en:'Immediately Dangerous to Life or Health — concentration posing immediate danger. Above this level — SCBA mandatory'},
  {t:'חליפת מגן רמה A',c:'hazmat',he:'הרמה הגבוהה ביותר של ציוד מגן. חליפה אטומה לחלוטין לגזים ונוזלים + מנ״פ. חובה באירועי IRFNA ו-UDMH',en:'Highest protection level. Fully gas and liquid tight suit + SCBA. Mandatory for IRFNA and UDMH incidents'},
  {t:'ARDS',c:'hazmat',he:'Acute Respiratory Distress Syndrome — תסמונת מצוקה נשימתית חריפה. בצקת ריאות חמורה. מתפתחת 24-48 שעות אחרי חשיפה ל-NOx או IRFNA',en:'Acute Respiratory Distress Syndrome — severe pulmonary edema. Develops 24-48 hours after NOx or IRFNA exposure'},
  {t:'מערבל פלנטרי',c:'hazmat',he:'Planetary Mixer — מכונה תעשייתית ענקית לערבוב אחיד של רכיבי דלק מוצק (AP+HTPB+Al). איראן אינה מייצרת ומסתמכת על הברחות מסין',en:'Planetary Mixer — giant industrial machine for uniform mixing of solid fuel components. Iran cannot produce and relies on smuggling from China'},
];

const cats = [{k:'all',he:'הכל',en:'All'},{k:'chem',he:'כימיה',en:'Chemistry'},{k:'mil',he:'צבאי',en:'Military'},{k:'org',he:'ארגונים',en:'Organizations'},{k:'hazmat',he:'חומ״ס',en:'HazMat'}];

export default function Glossary() {
  const { t, lang } = useLang();
  const h = lang === 'he';
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = terms.filter(tm => (cat === 'all' || tm.c === cat) && (search === '' || tm.t.toLowerCase().includes(search.toLowerCase()) || tm[lang].toLowerCase().includes(search.toLowerCase())));

  return (
    <section id="glossary" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-3">{t('glossary.title')}</h2>
        <p className="text-slate-400 text-sm">{h ? 'כל המונחים המקצועיים המופיעים בדוח' : 'All professional terms appearing in this report'}</p>
      </motion.div>
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {cats.map(c => <button key={c.k} onClick={() => setCat(c.k)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${cat===c.k?'bg-blue-800/60 text-blue-200 border-blue-600/50':'bg-slate-800/50 text-slate-400 border-slate-700/30'}`}>{h?c.he:c.en}</button>)}
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder={h?'חיפוש מונח...':'Search term...'} className="w-full mb-6 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-blue-500/50" />
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/70 backdrop-blur-sm overflow-hidden">
        {filtered.map((tm, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-5 border-b border-slate-700/20 last:border-0 hover:bg-slate-700/20 transition-colors">
            <span className="font-bold text-blue-300 text-sm flex-shrink-0 min-w-[120px]">{tm.t}</span>
            <span className="text-sm text-slate-400 leading-relaxed" dir="auto">{tm[lang]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
