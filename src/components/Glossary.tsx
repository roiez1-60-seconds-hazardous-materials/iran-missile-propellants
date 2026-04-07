'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const terms = [
  // Chemicals
  {t:'IRFNA',c:'chem',he:'Inhibited Red Fuming Nitric Acid — חומצה חנקתית מעושנת אדומה מעוכבת. נוזל כתום-אדום, קורוזיבי ורעיל. המחמצן העיקרי בטילים נוזליים. הרכב: HNO₃ (70%+) + N₂O₄ (18-27%) + HF (0.6%)',en:'Inhibited Red Fuming Nitric Acid. Orange-red corrosive toxic liquid. Primary oxidizer in liquid missiles. Composition: HNO₃ (70%+) + N₂O₄ (18-27%) + HF (0.6%) as corrosion inhibitor'},
  {t:'UDMH',c:'chem',he:'Unsymmetrical Dimethylhydrazine — דימתילהידראזין בלתי סימטרי. דלק טילים נוזלי שקוף, ריח אמוניה. רעיל ביותר — חודר עור שלם, מסרטן IARC 2B. נקודת הבזק: -15°C. CAS 57-14-7',en:'Unsymmetrical Dimethylhydrazine. Colorless liquid missile fuel with ammonia/fish odor. Extremely toxic — penetrates intact skin, IARC 2B carcinogen. Flash point: -15°C. CAS 57-14-7'},
  {t:'NTO (N₂O₄)',c:'chem',he:'Nitrogen Tetroxide — חנקן טטראוקסיד. מחמצן נוזלי חום-אדום. רותח ב-21°C בלבד — מתאדה בטמפרטורת החדר. משמש בח׳ורמשהר יחד עם UDMH. שאיפת האדים גורמת לבצקת ריאות מושהית',en:'Nitrogen Tetroxide. Red-brown liquid oxidizer. Boils at only 21°C — evaporates at room temperature. Used in Khorramshahr paired with UDMH. Vapor inhalation causes delayed pulmonary edema'},
  {t:'HNO₃',c:'chem',he:'Nitric Acid — חומצה חנקתית. חומר הגלם הקריטי: ממנו מייצרים (1) IRFNA — מחמצן נוזלי, (2) RDX/HMX — חומרי נפץ, (3) NTO. מיוצרת בתהליך אוסטוולד',en:'Nitric Acid. The critical precursor: produces (1) IRFNA — liquid oxidizer, (2) RDX/HMX — explosives, (3) NTO. Produced via Ostwald process'},
  {t:'TM-185',c:'chem',he:'קרוסין צבאי בסימון סובייטי. דלק על בסיס נפט בטילי שהאב וגדר',en:'Soviet-designated military kerosene. Petroleum-based fuel used in Shahab and Ghadr missiles'},
  {t:'AK-27',c:'chem',he:'סימון סובייטי ל-IRFNA: 73% HNO₃ + 27% N₂O₄ + מעכב. הנוסחה שהועברה לאיראן דרך צפון קוריאה',en:'Soviet designation for IRFNA formula: 73% HNO₃ + 27% N₂O₄ + inhibitor. Formula transferred to Iran via North Korea'},
  {t:'AP',c:'chem',he:'Ammonium Perchlorate — אמוניום פרכלורט (NH₄ClO₄). תרכובת גבישית לבנה, ~70% ממשקל הדלק המוצק. משחררת חמצן בחימום — מאפשרת בעירה גם בוואקום',en:'Ammonium Perchlorate (NH₄ClO₄). White crystalline compound, ~70% of solid fuel weight. Releases oxygen when heated — enables combustion even in vacuum'},
  {t:'HTPB',c:'chem',he:'Hydroxyl-Terminated Polybutadiene — פולימר גמיש דמוי גומי. תפקיד כפול בדלק מוצק: מאגד (מדביק הרכיבים) + דלק (בוער עם AP). ~15% מהתערובת',en:'Hydroxyl-Terminated Polybutadiene. Flexible rubber-like polymer. Dual role in solid fuel: binder (holds components) + fuel (burns with AP). ~15% of mixture'},
  {t:'RDX',c:'chem',he:'Research Department Explosive — הקסוגן. חומר נפץ נהדף, חזק פי 1.6 מ-TNT. מיוצר בתהליך בכמן. משמש במילוי ראשי קרב ובדלק מוצק מתקדם',en:'Research Department Explosive (Hexogen). Detonating high explosive, 1.6x more powerful than TNT. Produced via Bachmann process. Used in warheads and advanced solid fuel'},
  {t:'HMX',c:'chem',he:'High Melting Explosive — אוקטוגן. חומר נפץ חזק מ-RDX. משמש גם בעדשות קריסה גרעיניות (Implosion Lenses) — רכיב קריטי בנשק גרעיני',en:'High Melting Explosive (Octogen). More powerful than RDX. Also used in nuclear Implosion Lenses — critical component in nuclear weapons'},
  {t:'NOx',c:'chem',he:'תחמוצות חנקן (NO, NO₂). גזים רעילים חומים-צהובים הנפלטים מ-IRFNA. גורמים לבצקת ריאות מושהית — תסמינים מופיעים רק 24-48 שעות אחרי חשיפה',en:'Nitrogen Oxides (NO, NO₂). Brown-yellow toxic gases emitted from IRFNA. Cause delayed pulmonary edema — symptoms appear only 24-48 hours after exposure'},
  {t:'NDMA',c:'chem',he:'N-Nitrosodimethylamine — תוצר פירוק של UDMH שנוצר בחשיפה לאוויר. מסרטן מוכח. נשאר בקרקע עד 6 שבועות',en:'N-Nitrosodimethylamine. UDMH decomposition product formed on air exposure. Proven carcinogen. Persists in soil up to 6 weeks'},
  {t:'NH₃',c:'chem',he:'אמוניה — גז חריף ריח. חומר גלם לתהליכי אוסטוולד ורשיג. מיוצרת באסלויה בכמויות עצומות',en:'Ammonia. Pungent gas. Feedstock for Ostwald and Raschig processes. Produced in massive quantities at Asaluyeh'},
  {t:'HF',c:'chem',he:'Hydrogen Fluoride — מימן פלואורי. מתווסף ל-IRFNA (0.6%) כמעכב קורוזיה — יוצר שכבת מגן על דפנות מיכל הטיל',en:'Hydrogen Fluoride. Added to IRFNA (0.6%) as corrosion inhibitor — forms protective layer on missile tank walls'},
  {t:'Dual-Use',c:'chem',he:'שימוש כפול — חומר/ציוד אזרחי שניתן להסבה צבאית. דוגמאות: אמוניה (דשנים ← דלק), מערבלים פלנטריים (מזון ← דלק מוצק)',en:'Material or equipment with legitimate civilian use convertible to military. Examples: ammonia (fertilizer to fuel), planetary mixers (food to solid propellant)'},

  // Processes (with historical origin)
  {t:'Ostwald Process',c:'proc',he:'תהליך אוסטוולד — על שם וילהלם אוסטוולד (Wilhelm Ostwald, 1853-1932), כימאי גרמני-לטבי חתן פרס נובל לכימיה 1909. פיתח את השיטה התעשייתית לייצור חומצה חנקתית מאמוניה באמצעות זרז פלטינה. זהו התהליך שמפעיל את כל שרשרת ייצור הטילים',en:'Named after Wilhelm Ostwald (1853-1932), German-Latvian chemist, Nobel Prize in Chemistry 1909. Developed the industrial method for producing nitric acid from ammonia over platinum catalyst. This is the process that powers the entire missile production chain'},
  {t:'Raschig Process',c:'proc',he:'תהליך רשיג — על שם פרידריך רשיג (Friedrich Raschig, 1863-1928), כימאי גרמני. פיתח שיטה לייצור הידראזין מאמוניה ונתרן היפוכלוריט (אקונומיקה) דרך יצירת כלוראמין. העיקרון הורחב לייצור UDMH: כלוראמין + דימתילאמין = UDMH. בספרות נקרא גם Ketazine Process כשמשתמשים באצטון כמתווך',en:'Named after Friedrich Raschig (1863-1928), German chemist. Developed the method for producing hydrazine from ammonia and sodium hypochlorite (bleach) via chloramine intermediate. The principle was extended to produce UDMH: chloramine + dimethylamine = UDMH. Also called Ketazine Process when acetone is used as intermediate'},
  {t:'Bachmann Process',c:'proc',he:'תהליך בכמן — על שם וורנר בכמן (Werner E. Bachmann, 1901-1951), כימאי אמריקאי מאוניברסיטת מישיגן. פיתח את השיטה התעשייתית לייצור RDX במלחמת העולם השנייה כחלק ממאמץ המלחמה האמריקאי. השיטה: ניטרציה של הקסאמין בחומצה חנקתית מרוכזת + אנהידריד אצטי. נקרא גם Bachmann-Hay Process. זו השיטה הסטנדרטית בעולם עד היום',en:'Named after Werner E. Bachmann (1901-1951), American chemist at University of Michigan. Developed the industrial method for producing RDX during WWII as part of the American war effort. Method: nitrolysis of hexamine in concentrated nitric acid + acetic anhydride. Also called Bachmann-Hay Process. Remains the standard worldwide method to this day'},

  // Military
  {t:'היפרגולי',c:'mil',he:'Hypergolic — מגע ישיר בין דלק למחמצן = הצתה ספונטנית. ללא ניצוץ, מצת או חום חיצוני',en:'Hypergolic — direct fuel-oxidizer contact = spontaneous ignition. No spark, igniter or external heat'},
  {t:'MaRV',c:'mil',he:'Maneuverable Re-entry Vehicle — ראש קרב שמשנה מסלול בחדירה לאטמוספירה. מקשה על יירוט',en:'Maneuverable Re-entry Vehicle — warhead that changes trajectory during re-entry. Complicates interception'},
  {t:'CEP',c:'mil',he:'Circular Error Probable — רדיוס שבתוכו נופלים 50% מהטילים. ח׳ורמשהר: ~30 מ׳. שהאב-1: ~2,500 מ׳',en:'Circular Error Probable — radius within which 50% of missiles land. Khorramshahr: ~30m. Shahab-1: ~2,500m'},
  {t:'TEL',c:'mil',he:'Transporter Erector Launcher — משגר נייד על גלגלים. קשה לאתר לפני שיגור',en:'Transporter Erector Launcher — mobile wheeled launcher. Difficult to locate before launch'},
  {t:'TVC',c:'mil',he:'Thrust Vector Control — בקרת וקטור דחף. הטיית נחיר המנוע לשינוי כיוון טיסה. מחליף כנפונים בטילים מתקדמים',en:'Thrust Vector Control — tilting engine nozzle to change flight direction. Replaces fins in advanced missiles'},
  {t:'Isp',c:'mil',he:'Specific Impulse — דחף סגולי. מדד יעילות מנוע רקטי (בשניות). ככל שגבוה יותר — יעיל יותר',en:'Specific Impulse — rocket engine efficiency metric (in seconds). Higher = more efficient'},
  {t:'SRBM',c:'mil',he:'Short-Range Ballistic Missile — טיל בליסטי טווח קצר. עד ~1,000 ק״מ',en:'Short-Range Ballistic Missile — up to ~1,000 km range'},
  {t:'MRBM',c:'mil',he:'Medium-Range Ballistic Missile — טיל בליסטי טווח בינוני. 1,000-3,000 ק״מ',en:'Medium-Range Ballistic Missile — 1,000-3,000 km range'},

  // Organizations
  {t:'MODAFL',c:'org',he:'Ministry of Defense and Armed Forces Logistics — משרד ההגנה האיראני. הגוף העליון שמפקח על תוכנית הטילים',en:'Ministry of Defense and Armed Forces Logistics. Top body overseeing the missile program'},
  {t:'AIO',c:'org',he:'Aerospace Industries Organization — ארגון התעשיות האווירו-חלליות. תחת MODAFL. מתאם ייצור טילים',en:'Aerospace Industries Organization. Under MODAFL. Coordinates missile production'},
  {t:'SHIG',c:'org',he:'Shahid Hemmat Industrial Group — קבוצת שהיד המת. אחראית על פיתוח וייצור טילים נוזליים',en:'Shahid Hemmat Industrial Group. Responsible for liquid missile development and production'},
  {t:'SBIG',c:'org',he:'Shahid Bakeri Industrial Group — קבוצת שהיד באקרי. אחראית על פיתוח וייצור טילים מוצקים',en:'Shahid Bakeri Industrial Group. Responsible for solid missile development and production'},
  {t:'PCI',c:'org',he:'Parchin Chemical Industries — תעשיות כימיקלים פרצ׳ין. ייצור חומצה חנקתית, חומרי נפץ ואבקת שיגור',en:'Parchin Chemical Industries. Production of nitric acid, explosives and propellant powders'},
  {t:'IRGC',c:'org',he:'Islamic Revolutionary Guard Corps — משמרות המהפכה האסלאמית. הכוח הצבאי שמפעיל את תוכנית הטילים',en:'Islamic Revolutionary Guard Corps. Military force operating the missile program'},

  // HazMat
  {t:'מנ״פ',c:'hazmat',he:'מערכת נשימה פתוחה בלחץ חיובי — Self-Contained Breathing Apparatus (SCBA). מספקת אוויר נקי מבלון. חובה באירוע IRFNA/UDMH',en:'Self-Contained Breathing Apparatus (SCBA). Supplies clean air from cylinder. Mandatory for IRFNA/UDMH incidents'},
  {t:'ERG 2024',c:'hazmat',he:'Emergency Response Guidebook — מדריך תגובה לחירום של משרד התחבורה האמריקאי. מהדורה 2024. מכיל הנחיות בידוד, מיגון וכיבוי לכל חומר מסוכן',en:'Emergency Response Guidebook by US DOT. 2024 edition. Contains isolation, PPE and suppression guidelines for all hazardous materials'},
  {t:'IDLH',c:'hazmat',he:'Immediately Dangerous to Life or Health — ריכוז שבו חשיפה של 30 דקות עלולה לגרום למוות או נזק בלתי הפיך',en:'Immediately Dangerous to Life or Health — concentration at which 30-minute exposure may cause death or irreversible damage'},
  {t:'AEGL',c:'hazmat',he:'Acute Exposure Guideline Levels — רמות חשיפה חריפה. AEGL-2 = נזק בלתי הפיך. AEGL-3 = מוות',en:'Acute Exposure Guideline Levels. AEGL-2 = irreversible damage. AEGL-3 = death'},
  {t:'NFPA Diamond',c:'hazmat',he:'יהלום סיכונים של NFPA. ארבעה צבעים: אדום=דליקות, כחול=בריאות, צהוב=תגובתיות, לבן=מיוחד. דירוג 0-4',en:'NFPA Hazard Diamond. Four colors: red=flammability, blue=health, yellow=reactivity, white=special. Rating 0-4'},
  {t:'חליפת מגן רמה A',c:'hazmat',he:'הרמה הגבוהה ביותר של ציוד מגן אישי. חליפה אטומה לחלוטין לגזים + מנ״פ. חובה מוחלטת באירוע IRFNA או UDMH',en:'Highest level of personal protective equipment. Fully gas-tight encapsulated suit + SCBA. Absolutely mandatory for IRFNA or UDMH incidents'},
  {t:'בצקת ריאות מושהית',c:'hazmat',he:'Delayed Pulmonary Edema — הצטברות נוזלים בריאות שמתרחשת 24-48 שעות לאחר חשיפה לגזי NOx. הנפגע מרגיש טוב ואז מתדרדר פתאום. ללא טיפול — קטלני',en:'Delayed Pulmonary Edema — fluid accumulation in lungs occurring 24-48 hours after NOx gas exposure. Casualty feels fine then suddenly deteriorates. Fatal without treatment'},
];

const cats = [
  {k:'all',he:'הכל',en:'All'},
  {k:'chem',he:'חומרים כימיים',en:'Chemicals'},
  {k:'proc',he:'תהליכי ייצור',en:'Processes'},
  {k:'mil',he:'צבאי וטכני',en:'Military'},
  {k:'org',he:'ארגונים',en:'Organizations'},
  {k:'hazmat',he:'חומ״ס וחירום',en:'HazMat'},
];

export default function Glossary() {
  const { t: tr, lang } = useLang();
  const h = lang === 'he';
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const filtered = terms.filter(tm =>
    (cat === 'all' || tm.c === cat) &&
    (search === '' || tm.t.toLowerCase().includes(search.toLowerCase()) || tm[lang].toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="glossary" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">{tr('glossary.title')}</h2>
        <p className="text-slate-400 text-sm">{h ? `${terms.length} מונחים מקצועיים` : `${terms.length} professional terms`}</p>
      </motion.div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {cats.map(c => (
          <button key={c.k} onClick={() => setCat(c.k)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${cat === c.k ? 'bg-blue-800/60 text-blue-200 border-blue-600/50' : 'bg-slate-800/50 text-slate-400 border-slate-700/30 hover:bg-slate-700/40'}`}>
            {h ? c.he : c.en} {cat === c.k && `(${filtered.length})`}
          </button>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder={h ? 'חיפוש מונח...' : 'Search term...'}
        className="w-full mb-6 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/50 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-blue-500/50 transition-colors" />

      {/* Terms list */}
      <div className="space-y-3">
        {filtered.map((tm, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="rounded-2xl bg-slate-800/30 backdrop-blur-sm p-5 hover:border-blue-500/20 transition-all">
            <div className="flex items-start justify-between gap-4 mb-2">
              <span className="font-black text-blue-300 text-base">{tm.t}</span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                tm.c === 'chem' ? 'text-green-400 border-green-700/40 bg-green-950/30' :
                tm.c === 'proc' ? 'text-purple-400 border-purple-700/40 bg-purple-950/30' :
                tm.c === 'mil' ? 'text-blue-400 border-blue-700/40 bg-blue-950/30' :
                tm.c === 'org' ? 'text-amber-400 border-amber-700/40 bg-amber-950/30' :
                'text-red-400 border-red-700/40 bg-red-950/30'
              }`}>
                {cats.find(c => c.k === tm.c)?.[lang] || tm.c}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{tm[lang]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
