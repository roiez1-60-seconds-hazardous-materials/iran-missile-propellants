'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

/* Equipment info */
type Equip = { id:string; he:string; en:string; desc_he:string; desc_en:string };

const ostwaldEquip: Equip[] = [
  { id:'nh3tank', he:'מכל אמוניה (NH₃)', en:'Ammonia Tank (NH₃)', desc_he:'מכל אחסון אמוניה נוזלית תחת לחץ. חומר גלם עיקרי — מיובא או מיוצר באסלויה מגז טבעי', desc_en:'Pressurized liquid ammonia storage tank. Primary feedstock — imported or produced at Asaluyeh from natural gas' },
  { id:'compressor', he:'מדחס אוויר', en:'Air Compressor', desc_he:'דוחס אוויר ל-8-10 אטמוספירות. מספק חמצן לתגובה ביחס 5:4 (O₂:NH₃)', desc_en:'Compresses air to 8-10 atm. Supplies oxygen at 5:4 ratio (O₂:NH₃)' },
  { id:'reactor', he:'כור קטליטי (Pt-Rh)', en:'Catalytic Reactor (Pt-Rh)', desc_he:'רשת פלטינה-רודיום (90:10) ב-850°C. אמוניה עוברת בזרז באלפית שנייה ומתחמצנת ל-NO. תגובה אקסותרמית: -905.2 kJ/mol. הזרז הוא ציוד אסטרטגי — מיוצר בכמה מדינות בלבד', desc_en:'Platinum-Rhodium gauze (90:10) at 850°C. NH₃ passes through catalyst in milliseconds, oxidizing to NO. Exothermic: -905.2 kJ/mol. Catalyst is strategic equipment — produced in few countries' },
  { id:'heatex', he:'מחליף חום / קירור', en:'Heat Exchanger / Cooler', desc_he:'מקרר את גז ה-NO מ-850°C לטמפרטורת סביבה. החום מנוצל לחימום מוקדם של מי ההזנה. קירור הכרחי לשלב הבא', desc_en:'Cools NO gas from 850°C to ambient. Heat recovered for feedwater preheating. Cooling essential for next stage' },
  { id:'oxidizer', he:'תא חמצון', en:'Oxidation Chamber', desc_he:'NO + O₂ → NO₂ (גז חום-אדום רעיל). תגובה איטית יותר, דורשת זמן שהייה. 2NO + O₂ → 2NO₂', desc_en:'NO + O₂ → NO₂ (toxic red-brown gas). Slower reaction requiring residence time. 2NO + O₂ → 2NO₂' },
  { id:'absorber', he:'מגדל ספיגה', en:'Absorption Tower', desc_he:'מגדל גבוה עם מגשים — NO₂ נספג במים הזורמים מלמעלה. 3NO₂ + H₂O → 2HNO₃ + NO. ריכוז ~68%. הגז שנותר (NO) חוזר לתא החמצון', desc_en:'Tall tower with trays — NO₂ absorbed in water flowing from top. 3NO₂ + H₂O → 2HNO₃ + NO. ~68% concentration' },
  { id:'distill', he:'עמודת ריכוז/זיקוק', en:'Concentration Column', desc_he:'ריכוז HNO₃ מ-68% ל->86% באמצעות זיקוק עם חומצה גופרתית. צנרת טיטניום/זירקוניום (עמידה לקורוזיה)', desc_en:'Concentrating HNO₃ from 68% to >86% via distillation with sulfuric acid. Titanium/zirconium piping (corrosion resistant)' },
  { id:'irfna', he:'מיכל ערבוב IRFNA', en:'IRFNA Mixing Vessel', desc_he:'הוספת N₂O₄ (18-27%) + HF (0.6%) לחומצה מרוכזת = IRFNA מוכן לשימוש בטילים. המוצר הסופי — מחמצן היפרגולי', desc_en:'Adding N₂O₄ (18-27%) + HF (0.6%) to concentrated acid = missile-ready IRFNA. Final product — hypergolic oxidizer' },
];

const raschigEquip: Equip[] = [
  { id:'nh3tank', he:'מכל אמוניה', en:'Ammonia Tank', desc_he:'אמוניה מהולה במים. חומר גלם זול ונגיש — תעשיית דשנים', desc_en:'Diluted ammonia in water. Cheap accessible feedstock — fertilizer industry' },
  { id:'naocl', he:'מכל נתרן היפוכלוריט', en:'NaOCl Tank (Bleach)', desc_he:'אקונומיקה — נתרן היפוכלוריט (NaOCl). חומר ניקוי ביתי. Dual-Use קלאסי', desc_en:'Bleach — sodium hypochlorite (NaOCl). Household cleaning product. Classic dual-use' },
  { id:'coldreact', he:'כור תגובה מקורר (0°C)', en:'Cooled Reactor (0°C)', desc_he:'אמוניה + NaOCl בטמפרטורה נמוכה → כלוראמין (NH₂Cl). מולקולת ביניים תגובתית מאוד. NH₃ + NaOCl → NH₂Cl + NaOH', desc_en:'NH₃ + NaOCl at low temperature → chloramine (NH₂Cl). Very reactive intermediate. NH₃ + NaOCl → NH₂Cl + NaOH' },
  { id:'dma', he:'מכל דימתילאמין', en:'Dimethylamine Tank', desc_he:'(CH₃)₂NH — חומר כימי תעשייתי. ריח דגים רקובים. מגיב עם כלוראמין ליצירת קשר N-N', desc_en:'(CH₃)₂NH — industrial chemical. Rotten fish odor. Reacts with chloramine to form N-N bond' },
  { id:'mainreact', he:'כור תגובה ראשי', en:'Main Reactor', desc_he:'כלוראמין + דימתילאמין → UDMH + HCl. יצירת הקשר N-N שנותן את האנרגיה לדלק. (CH₃)₂NH + NH₂Cl → (CH₃)₂NNH₂ + HCl', desc_en:'Chloramine + dimethylamine → UDMH + HCl. Forms the N-N bond that provides fuel energy' },
  { id:'distill', he:'עמודת זיקוק מסיבית', en:'Massive Distillation Column', desc_he:'הפרדת UDMH ממים, מלחים ותוצרי לוואי. נקודת רתיחה UDMH: 63°C. זיקוק רב-שלבי לטהרת טילים', desc_en:'Separating UDMH from water, salts and byproducts. UDMH boiling point: 63°C. Multi-stage distillation for missile-grade purity' },
  { id:'storage', he:'מכל אחסון UDMH', en:'UDMH Storage Tank', desc_he:'אחסון תחת אטמוספירת חנקן (למניעת חמצון). נקודת הבזק: -15°C! מסרטן, רעיל, חודר עור. CAS 57-14-7', desc_en:'Stored under nitrogen atmosphere (prevents oxidation). Flash point: -15°C! Carcinogenic, toxic, skin-penetrating' },
];

const bachmannEquip: Equip[] = [
  { id:'hex', he:'משפך הזנת הקסאמין', en:'Hexamine Feed Hopper', desc_he:'הקסאמין (C₆H₁₂N₄) — אותן קוביות הצתה לבנות מחנויות קמפינג. מולקולת כלוב. מוזן לכור בכמויות מדודות', desc_en:'Hexamine (C₆H₁₂N₄) — those white camping fuel tablets. Cage molecule. Fed into reactor in measured quantities' },
  { id:'hno3', he:'הזנת HNO₃ מרוכזת', en:'Conc. HNO₃ Feed', desc_he:'חומצה חנקתית מרוכזת (>98%) — מגיעה ישירות ממתקן אוסטוולד! זו הנקודה שבה שרשרת הייצור מתחברת', desc_en:'Concentrated nitric acid (>98%) — comes directly from Ostwald facility! This is where the production chains connect' },
  { id:'nitreact', he:'כור ניטרציה מבוקר (45-75°C)', en:'Controlled Nitration Reactor (45-75°C)', desc_he:'הקסאמין + HNO₃ + אנהידריד אצטי + NH₄NO₃. טמפרטורה 45-75°C — קריטי! עלייה = פיצוץ. מערכת קירור כפולה ומגני פיצוץ. Hexamine + HNO₃ → RDX', desc_en:'Hexamine + HNO₃ + acetic anhydride + NH₄NO₃. Temperature 45-75°C — critical! Rise = explosion. Dual cooling and blast shields' },
  { id:'wash', he:'מערכת שטיפה וסינון', en:'Washing & Filtering System', desc_he:'שטיפת גבישי RDX ממים חומציים, סינון וואקום, שטיפות חוזרות במים מזוקקים. הסרת עודפי חומצה', desc_en:'Washing RDX crystals from acidic water, vacuum filtration, repeated washes in distilled water. Removing excess acid' },
  { id:'dryer', he:'מייבש וואקום', en:'Vacuum Dryer', desc_he:'ייבוש זהיר בוואקום — RDX לח הוא מסוכן! טמפרטורה מבוקרת, ללא ניצוצות. תוצר: גבישים לבנים', desc_en:'Careful vacuum drying — wet RDX is dangerous! Controlled temperature, no sparks. Product: white crystals' },
  { id:'product', he:'RDX/HMX — תוצר סופי', en:'RDX/HMX — Final Product', desc_he:'שלושה שימושים: (1) מילוי ראשי קרב טילים (2) תוסף אנרגטי בדלק מוצק מתקדם — סג\'יל, ח\'ייבר שכן (3) עדשות קריסה גרעיניות (Implosion Lenses)', desc_en:'Three uses: (1) missile warhead fill (2) energetic additive in advanced solid fuel — Sejjil, Kheibar Shekan (3) nuclear implosion lenses' },
];

const PROCS = [
  { id:'ostwald', icon:'⚗️', he:'אוסטוולד — HNO₃', en:'Ostwald — HNO₃', equip:ostwaldEquip,
    descHe:'מפעל חומצה חנקתית — הלב של שרשרת הייצור', descEn:'Nitric acid plant — the heart of the production chain' },
  { id:'raschig', icon:'🟣', he:'רשיג — UDMH', en:'Raschig — UDMH', equip:raschigEquip,
    descHe:'מתקן ייצור דלק טילים נוזלי', descEn:'Liquid missile fuel production facility' },
  { id:'bachmann', icon:'💣', he:'בכמן — RDX/HMX', en:'Bachmann — RDX/HMX', equip:bachmannEquip,
    descHe:'מפעל חומרי נפץ — מהקסאמין לעדשות גרעיניות', descEn:'Explosives plant — from hexamine to nuclear lenses' },
];

/* SVG equipment shapes */
function Tank({ x, y, w, h, fill, label, active, onClick }: any) {
  return <g onClick={onClick} className="cursor-pointer">
    <rect x={x} y={y} width={w} height={h} rx={w/4} fill={active ? fill : fill+'60'} stroke={active?'#fff':fill} strokeWidth={active?0.6:0.3}
      className="transition-all duration-300" style={active?{filter:`drop-shadow(0 0 4px ${fill})`}:{}} />
    <ellipse cx={x+w/2} cy={y} rx={w/2} ry={w/6} fill={active ? fill : fill+'80'} stroke={active?'#fff':fill} strokeWidth={0.3} />
    <text x={x+w/2} y={y+h/2+1} textAnchor="middle" fill="#fff" fontSize="1.8" fontWeight="bold" className="pointer-events-none select-none">{label}</text>
  </g>;
}

function Reactor({ x, y, r, fill, label, active, onClick, temp }: any) {
  return <g onClick={onClick} className="cursor-pointer">
    <circle cx={x} cy={y} r={r} fill={active ? fill : fill+'50'} stroke={active?'#fff':fill} strokeWidth={active?0.6:0.3}
      className="transition-all duration-300" style={active?{filter:`drop-shadow(0 0 6px ${fill})`}:{}} />
    {active && <circle cx={x} cy={y} r={r+1} fill="none" stroke={fill} strokeWidth="0.2" opacity="0.4">
      <animate attributeName="r" values={`${r+1};${r+3};${r+1}`} dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
    </circle>}
    <text x={x} y={y-0.5} textAnchor="middle" fill="#fff" fontSize="1.8" fontWeight="bold" className="pointer-events-none select-none">{label}</text>
    {temp && <text x={x} y={y+2.5} textAnchor="middle" fill="#fbbf24" fontSize="1.4" className="pointer-events-none select-none">{temp}</text>}
  </g>;
}

function Column({ x, y, w, h, fill, label, active, onClick }: any) {
  return <g onClick={onClick} className="cursor-pointer">
    <rect x={x} y={y} width={w} height={h} rx={1} fill={active ? fill : fill+'50'} stroke={active?'#fff':fill} strokeWidth={active?0.6:0.3}
      className="transition-all duration-300" style={active?{filter:`drop-shadow(0 0 4px ${fill})`}:{}} />
    {/* Tray lines inside column */}
    {[...Array(4)].map((_,i) => <line key={i} x1={x+0.5} y1={y+h*0.2+i*(h*0.18)} x2={x+w-0.5} y2={y+h*0.2+i*(h*0.18)} stroke="#ffffff30" strokeWidth="0.2"/>)}
    <text x={x+w/2} y={y+h/2+1} textAnchor="middle" fill="#fff" fontSize="1.5" fontWeight="bold" className="pointer-events-none select-none" writingMode="vertical-rl">{label}</text>
  </g>;
}

function Pipe({ x1, y1, x2, y2, animated }: any) {
  return <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
    <polygon points={`${x2-1},${y2-0.8} ${x2+0.5},${y2} ${x2-1},${y2+0.8}`} fill="#60a5fa" opacity="0.6"
      transform={`rotate(${Math.atan2(y2-y1,x2-x1)*180/Math.PI},${x2},${y2})`} />
    {animated && <circle r="0.6" fill="#60a5fa" opacity="0.8">
      <animateMotion dur="2s" repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`}/>
    </circle>}
  </g>;
}

export default function ProcessDiagrams() {
  const { lang } = useLang();
  const h = lang === 'he';
  const [pi, setPi] = useState(0);
  const [active, setActive] = useState<string|null>(null);
  const proc = PROCS[pi];
  const info = proc.equip.find(e => e.id === active);

  return (
    <section id="processes" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500 mb-2">
          {h ? 'תרשימי מתקני ייצור כימיים' : 'Chemical Production Facility Diagrams'}
        </h2>
        <p className="text-slate-400 text-sm">{h ? 'לחצו על מתקן כדי ללמוד עליו' : 'Click equipment to learn more'}</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {PROCS.map((p, i) => (
          <button key={i} onClick={() => { setPi(i); setActive(null); }}
            className={`px-5 py-3 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${pi === i
              ? 'bg-blue-900/40 text-blue-200 border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.2)]'
              : 'bg-slate-800/30 text-slate-500 border-slate-700/30 hover:border-slate-600/50'}`}>
            {p.icon} {h ? p.he : p.en}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={pi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-b from-[#0c1425] to-[#0a0f1e] p-4 md:p-6 overflow-hidden">
            <p className="text-sm text-slate-400 text-center mb-4">{h ? proc.descHe : proc.descEn}</p>

            {/* P&ID SVG */}
            <svg viewBox="0 0 100 55" className="w-full" style={{ filter:'drop-shadow(0 2px 10px rgba(0,0,0,0.3))' }}>
              {/* Background grid */}
              <defs>
                <pattern id="factoryGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth="0.1"/>
                </pattern>
              </defs>
              <rect width="100" height="55" fill="url(#factoryGrid)"/>
              {/* Ground line */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(100,116,139,0.2)" strokeWidth="0.2" strokeDasharray="1,1"/>

              {pi === 0 && /* OSTWALD */ <>
                <Tank x={2} y={15} w={8} h={18} fill="#3b82f6" label="NH₃" active={active==='nh3tank'} onClick={() => setActive(active==='nh3tank'?null:'nh3tank')} />
                <Pipe x1={10} y1={24} x2={18} y2={24} animated />
                <Reactor x={15} y={38} r={5} fill="#64748b" label="🌀" active={active==='compressor'} onClick={() => setActive(active==='compressor'?null:'compressor')} />
                <Pipe x1={15} y1={33} x2={15} y2={28} animated />
                <Pipe x1={18} y1={24} x2={28} y2={24} animated />
                <Reactor x={32} y={24} r={7} fill="#dc2626" label="⚗️" active={active==='reactor'} onClick={() => setActive(active==='reactor'?null:'reactor')} temp="850°C" />
                <Pipe x1={39} y1={24} x2={48} y2={24} animated />
                <Reactor x={52} y={24} r={5} fill="#0ea5e9" label="❄️" active={active==='heatex'} onClick={() => setActive(active==='heatex'?null:'heatex')} />
                <Pipe x1={57} y1={24} x2={63} y2={24} animated />
                <Tank x={62} y={15} w={7} h={18} fill="#f97316" label="NO₂" active={active==='oxidizer'} onClick={() => setActive(active==='oxidizer'?null:'oxidizer')} />
                <Pipe x1={69} y1={24} x2={75} y2={24} animated />
                <Column x={74} y={8} w={7} h={35} fill="#8b5cf6" label="ספיגה" active={active==='absorber'} onClick={() => setActive(active==='absorber'?null:'absorber')} />
                <Pipe x1={81} y1={24} x2={86} y2={18} animated />
                <Column x={85} y={10} w={5} h={28} fill="#d946ef" label="ריכוז" active={active==='distill'} onClick={() => setActive(active==='distill'?null:'distill')} />
                <Pipe x1={90} y1={24} x2={95} y2={24} animated />
                <Tank x={93} y={15} w={6} h={18} fill="#ef4444" label="IRFNA" active={active==='irfna'} onClick={() => setActive(active==='irfna'?null:'irfna')} />
                {/* Labels below */}
                <text x={6} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'אמוניה':'Ammonia'}</text>
                <text x={15} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'מדחס':'Compressor'}</text>
                <text x={32} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'כור Pt-Rh':'Pt-Rh Reactor'}</text>
                <text x={52} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'קירור':'Cooling'}</text>
                <text x={65} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'חמצון':'Oxidation'}</text>
                <text x={77} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'ספיגה':'Absorption'}</text>
                <text x={87} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'ריכוז':'Conc.'}</text>
                <text x={96} y={53} textAnchor="middle" fill="#ef4444" fontSize="1.5" fontWeight="bold">IRFNA</text>
              </>}

              {pi === 1 && /* RASCHIG */ <>
                <Tank x={2} y={12} w={8} h={16} fill="#3b82f6" label="NH₃" active={active==='nh3tank'} onClick={() => setActive(active==='nh3tank'?null:'nh3tank')} />
                <Tank x={2} y={32} w={8} h={14} fill="#10b981" label="NaOCl" active={active==='naocl'} onClick={() => setActive(active==='naocl'?null:'naocl')} />
                <Pipe x1={10} y1={20} x2={22} y2={24} animated />
                <Pipe x1={10} y1={39} x2={22} y2={28} animated />
                <Reactor x={28} y={26} r={7} fill="#0ea5e9" label="❄️ 0°C" active={active==='coldreact'} onClick={() => setActive(active==='coldreact'?null:'coldreact')} temp="0°C" />
                <Pipe x1={35} y1={26} x2={45} y2={26} animated />
                <Tank x={40} y={10} w={7} h={12} fill="#8b5cf6" label="DMA" active={active==='dma'} onClick={() => setActive(active==='dma'?null:'dma')} />
                <Pipe x1={47} y1={16} x2={52} y2={22} animated />
                <Reactor x={55} y={26} r={7} fill="#f97316" label="⚗️" active={active==='mainreact'} onClick={() => setActive(active==='mainreact'?null:'mainreact')} />
                <Pipe x1={62} y1={26} x2={72} y2={26} animated />
                <Column x={71} y={8} w={7} h={35} fill="#d946ef" label="זיקוק" active={active==='distill'} onClick={() => setActive(active==='distill'?null:'distill')} />
                <Pipe x1={78} y1={26} x2={87} y2={26} animated />
                <Tank x={85} y={15} w={10} h={20} fill="#7c3aed" label="UDMH" active={active==='storage'} onClick={() => setActive(active==='storage'?null:'storage')} />
                <text x={6} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'אמוניה':'NH₃'}</text>
                <text x={6} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.2">{h?'אמוניה + אקונומיקה':'NH₃ + Bleach'}</text>
                <text x={28} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'כור קר':'Cold Reactor'}</text>
                <text x={43} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">DMA</text>
                <text x={55} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'כור ראשי':'Main Reactor'}</text>
                <text x={74} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'זיקוק':'Distillation'}</text>
                <text x={90} y={53} textAnchor="middle" fill="#7c3aed" fontSize="1.5" fontWeight="bold">UDMH</text>
              </>}

              {pi === 2 && /* BACHMANN */ <>
                <Tank x={2} y={10} w={8} h={15} fill="#64748b" label="Hex" active={active==='hex'} onClick={() => setActive(active==='hex'?null:'hex')} />
                <Tank x={2} y={30} w={8} h={15} fill="#ef4444" label="HNO₃" active={active==='hno3'} onClick={() => setActive(active==='hno3'?null:'hno3')} />
                <Pipe x1={10} y1={18} x2={25} y2={24} animated />
                <Pipe x1={10} y1={37} x2={25} y2={28} animated />
                <Reactor x={32} y={26} r={8} fill="#dc2626" label="⚠️" active={active==='nitreact'} onClick={() => setActive(active==='nitreact'?null:'nitreact')} temp="45-75°C" />
                {/* Cooling jacket around reactor */}
                <circle cx={32} cy={26} r={10} fill="none" stroke="#0ea5e9" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.4"/>
                <Pipe x1={40} y1={26} x2={52} y2={26} animated />
                <Tank x={50} y={16} w={10} h={20} fill="#0ea5e9" label="💧" active={active==='wash'} onClick={() => setActive(active==='wash'?null:'wash')} />
                <Pipe x1={60} y1={26} x2={70} y2={26} animated />
                <Reactor x={74} y={26} r={6} fill="#f59e0b" label="🔥" active={active==='dryer'} onClick={() => setActive(active==='dryer'?null:'dryer')} />
                <Pipe x1={80} y1={26} x2={88} y2={26} animated />
                <Tank x={86} y={14} w={10} h={24} fill="#f59e0b" label="RDX" active={active==='product'} onClick={() => setActive(active==='product'?null:'product')} />
                <text x={6} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'הקסאמין + HNO₃':'Hexamine + HNO₃'}</text>
                <text x={32} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'כור ניטרציה':'Nitration Reactor'}</text>
                <text x={55} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'שטיפה':'Washing'}</text>
                <text x={74} y={53} textAnchor="middle" fill="#94a3b8" fontSize="1.5">{h?'ייבוש':'Drying'}</text>
                <text x={91} y={53} textAnchor="middle" fill="#f59e0b" fontSize="1.5" fontWeight="bold">RDX/HMX</text>
              </>}
            </svg>

            {/* Info panel */}
            <AnimatePresence mode="wait">
              {info ? (
                <motion.div key={info.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-6 rounded-2xl p-5 border border-blue-600/30 bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <h4 className="font-black text-lg text-slate-100 mb-2">{h ? info.he : info.en}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{h ? info.desc_he : info.desc_en}</p>
                </motion.div>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-slate-600 text-sm py-3">
                  {h ? '👆 לחצו על מתקן בתרשים כדי לראות מידע מפורט' : '👆 Click equipment in the diagram for details'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="mt-6 rounded-2xl border-r-4 border-amber-600 bg-amber-950/20 p-5 text-sm text-amber-200 border border-amber-700/30">
        ⚡ <b>{h ? 'מערבלים פלנטריים:' : 'Planetary Mixers:'}</b> {h ? 'מכונות ענק לערבוב דלק מוצק. איראן לא מייצרת — הברחות מסין. השמדתם = ואקום ייצורי.' : 'Giant machines for solid fuel mixing. Iran cannot produce — smuggled from China. Destruction = production vacuum.'}
      </motion.div>
    </section>
  );
}
