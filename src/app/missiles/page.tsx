'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const P = {
  ink:"#0c1222",navy:"#162040",steel:"#1e293b",gold:"#c8a44e",gL:"#e8d5a0",
  cream:"#f5f0e8",parch:"#faf7f0",red:"#b91c1c",redS:"#fef2f2",
  blue:"#1e40af",blueS:"#eff6ff",amber:"#92400e",amberS:"#fffbeb",
  purple:"#6b21a8",purpleS:"#faf5ff",green:"#166534",greenS:"#f0fdf4",
  muted:"#64748b",border:"#e2e0d8",white:"#ffffff"
};

const sIDs=["home","timeline","facilities","diagram","arsenal","compare","rangemap","propulsion","processes","flowdiagram","molecular","chemistry","hazmat","medical","strategic","supplychain","infographic","gallery","glossary","sources"];
const sHe=["ראשי","ציר זמן","מתקנים","אנטומיה","ארסנל","השוואה","טווחים","הנעה","ייצור","זרימה","מולקולות","דלקים","חומ״ס","רפואי","אסטרטגי","שרשרת","אינפוגרפיקה","מצגת","מקרא","מקורות"];
const sEn=["Home","Timeline","Facilities","Anatomy","Arsenal","Compare","Ranges","Propulsion","Production","Flow","Molecules","Fuels","HazMat","Medical","Strategic","Supply Chain","Slides","Glossary","Sources"];

function ProgressBar(){const[p,setP]=useState(0);useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;setP(h>0?(window.scrollY/h)*100:0);};window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);return<div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:3,background:P.cream}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${P.gold},${P.gL})`,transition:"width 120ms"}}/></div>;}

function Nav({lang,toggle}:{lang:string;toggle:()=>void}){const[open,setOpen]=useState(false);const labels=lang==="he"?sHe:sEn;return<><nav className="nv"><div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}><span style={{fontSize:16}}>🏠</span><img src="/images/logo-60sec.png" alt="" style={{width:28,height:28,borderRadius:6}}/><span style={{fontSize:10,fontWeight:700,color:P.muted}}>{lang==="he"?"60 שניות חומ\"ס":"60 Sec HazMat"}</span></a><div className="hd-links" style={{display:"flex",gap:2,alignItems:"center"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} style={{padding:"6px 8px",fontSize:10,color:P.muted,textDecoration:"none",borderRadius:4}}>{s}</a>)}<button onClick={toggle} className="mn" style={{padding:"5px 14px",fontSize:11,fontWeight:800,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginInlineStart:8}}>{lang==="he"?"EN":"עב"}</button></div><div style={{display:"flex",alignItems:"center",gap:8}}><button onClick={toggle} className="mn lang-btn" style={{padding:"5px 12px",fontSize:11,fontWeight:800,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer"}}>{lang==="he"?"EN":"עב"}</button><button className="mob-btn" onClick={()=>setOpen(!open)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer",color:P.muted,fontSize:22}}>☰</button></div></div></nav>{open&&<div className="mob-menu" style={{position:"fixed",top:51,left:0,right:0,zIndex:89,background:P.white,borderBottom:`1px solid ${P.border}`,padding:8,boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} onClick={()=>setOpen(false)} style={{display:"block",padding:"10px 16px",fontSize:13,color:P.steel,textDecoration:"none"}}>{s}</a>)}</div>}</>;}

function Hero({lang}:{lang:string}){const he=lang==="he";return<section id="home" className="mh" style={{paddingTop:80,paddingBottom:60,position:"relative"}}><div style={{maxWidth:800,margin:"0 auto",padding:"0 24px",textAlign:"center",position:"relative",zIndex:1}}><div className="mn au" style={{display:"inline-block",border:`1px solid ${P.gold}50`,padding:"3px 16px",borderRadius:2,color:P.gold,fontSize:10,fontWeight:700,letterSpacing:"0.3em",marginBottom:20}}>[ {he?"לא מסווג":"UNCLASSIFIED"} ]</div><p className="au" style={{fontSize:10,letterSpacing:"0.25em",color:`${P.gL}70`,textTransform:"uppercase",marginBottom:16}}>Intelligence Dossier • {he?"אפריל 2026":"April 2026"}</p><h1 className="sf au" style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,color:P.white,lineHeight:1.15,marginBottom:12}}>{he?"מערך ייצור הטילים והדלקים של איראן":"Iran's Missile & Propellant Production Complex"}</h1><h2 className="sf au" style={{fontSize:"clamp(14px,2vw,20px)",fontWeight:400,color:`${P.gL}90`,marginBottom:16}}>{he?"תיק מודיעין טכנולוגי-טקטי":"Tech-Tactical Intelligence Dossier"}</h2><div className="gr au" style={{margin:"0 auto 16px"}}/><p className="au" style={{fontSize:13,color:`${P.white}cc`,maxWidth:560,margin:"0 auto 32px",lineHeight:1.8}}>{he?"ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום":"Strategic analysis: propulsion, fuels, production, facilities, HazMat & emergency protocols"}</p><div className="au" style={{display:"flex",justifyContent:"center",gap:"clamp(16px,5vw,48px)",flexWrap:"wrap",marginBottom:28}}>{[{n:"16",l:he?"סוגי טילים":"Missile Types",c:P.gold},{n:"3,000+",l:he?"טילים (IISS, לפני 2024)":"Est. pre-2024 (IISS)",c:P.gold},{n:"6+",l:he?"מתקנים שהותקפו":"Facilities Struck",c:"#ef4444"},{n:"3",l:he?"תהליכי ייצור":"Critical Processes",c:P.gL}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div className="sf" style={{fontSize:"clamp(22px,3.5vw,36px)",fontWeight:900,color:s.c}}>{s.n}</div><div style={{fontSize:9,color:`${P.white}99`}}>{s.l}</div></div>)}</div><p className="au" style={{fontSize:11,color:`${P.gL}cc`}}>{he?"רועי צוקרמן — מומחה לחומ״ס וטב״ק":"Roie Zukerman — HazMat & CBRN Expert"}</p></div></section>;}

function Sec({id,num,title,subtitle,children,sidebar,dark}:{id:string;num:string;title:string;subtitle?:string;children:React.ReactNode;sidebar?:React.ReactNode;dark?:boolean}){return<section id={id} style={{padding:"48px 20px",background:dark?P.cream:P.parch,borderBottom:`1px solid ${P.border}`,position:"relative"}}><div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}><div className="sf" style={{position:"absolute",top:-14,right:-5,fontSize:80,fontWeight:900,color:`${P.gold}08`,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>{num}</div><div style={{marginBottom:24,position:"relative",zIndex:1}}><div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}><span className="mn" style={{fontSize:11,fontWeight:700,color:P.gold}}>{num}</span><h2 className="sf" style={{fontSize:"clamp(20px,3vw,30px)",fontWeight:800,color:P.ink}}>{title}</h2></div>{subtitle&&<p style={{fontSize:13,color:P.muted,marginTop:2}}>{subtitle}</p>}<div className="gr" style={{marginTop:10}}/></div><div style={{display:"flex",gap:28,flexWrap:"wrap"}}><div style={{flex:"1 1 500px",minWidth:0}}>{children}</div>{sidebar&&<aside style={{flex:"0 1 280px",display:"flex",flexDirection:"column",gap:14}}>{sidebar}</aside>}</div></div></section>;}

function SB({color,title,children}:{color:string;title:string;children:React.ReactNode}){const cs:Record<string,[string,string]>={blue:[P.blueS,P.blue],red:[P.redS,P.red],amber:[P.amberS,P.amber],purple:[P.purpleS,P.purple],green:[P.greenS,P.green],gold:[`${P.gold}10`,P.gold]};const[bg,bc]=cs[color]||cs.blue;return<div className="cm" style={{padding:16,borderRight:`3px solid ${bc}`,background:bg}}><h4 style={{fontSize:10,fontWeight:800,color:bc,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</h4><div style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{children}</div></div>;}

/* ═══ TIMELINE — updated with June 2025 ═══ */
function Timeline({lang}:{lang:string}){const he=lang==="he";const ev=[
  {y:"1984",h:"רכישת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים",e:"20 Scud-B from Libya — program begins"},
  {y:"1988",h:"מלחמת איראן-עירק: שיגור Scud. הנדסה הפוכה סובייטית",e:"Iran-Iraq War: Scud launches, Soviet reverse-engineering"},
  {y:"1998",h:"שהאב-3 — טווח 1,300 ק״מ. מבוסס Nodong צפון-קוריאני",e:"Shahab-3 — 1,300 km. Based on N. Korean Nodong"},
  {y:"2004",h:"גדר-1 (שהאב-3B) — מיכלי דלק מורחבים, טווח 2,000 ק״מ",e:"Ghadr-1 (Shahab-3B) — extended tanks, 2,000 km"},
  {y:"2008",h:"סג׳יל-1 — פריצת דרך: טיל דלק מוצק דו-שלבי ראשון",e:"Sejjil-1 — breakthrough: first two-stage solid fuel missile"},
  {y:"2015",h:"עמאד — הטיל הראשון עם ראש קרב מתמרן (MaRV)",e:"Emad — first missile with Maneuverable Re-entry Vehicle (MaRV)"},
  {y:"2017",h:"ח׳ורמשהר — 2,000 ק״מ, ראש קרב 1,500 ק״ג. דלק NTO+UDMH",e:"Khorramshahr — 2,000 km, 1,500 kg warhead. NTO+UDMH fuel"},
  {y:"2023",h:"פתאח-1 — טענה להיפרסוני (Mach 13). ח׳ייבר שכן פעיל עם MaRV",e:"Fattah-1 — hypersonic claim. Kheibar Shekan active with MaRV"},
  {y:"10/24",h:"מבצע ימי תשובה: ישראל תוקפת פרצ׳ין, ח׳וג׳יר ושאהרוד. 12 מערבלים פלנטריים הושמדו, מתקן טאלקאן 2 נהרס. פגיעה חמורה בייצור דלק מוצק",e:"Op. Days of Repentance: Israel strikes Parchin, Khojir, Shahrud. 12 planetary mixers destroyed, Talaqan-2 destroyed. Severe blow to solid fuel production",r:true},
  {y:"6/25",h:"מבצע עם כלביא (מלחמת 12 הימים): 13-24 ביוני. תקיפת מתקני גרעין, בסיסים צבאיים וחיסולי בכירים. ארה״ב הצטרפה ב-22/6 — פצצות GBU-57 על פורדו, נתנז ואספהאן. 33 הרוגים בישראל מטילים איראניים",e:"Op. Im Kalbia (12-Day War): June 13-24. Nuclear sites, military bases & senior commander assassinations. US joined June 22 — GBU-57 on Fordow, Natanz, Isfahan. 33 killed in Israel by Iranian missiles",r:true},
  {y:"2/26",h:"מבצע שאגת האריה: מתקפה אמריקאית-ישראלית מתואמת. מנהיג עליון חמינאי חוסל. 15,000+ מטרות, 85% הגנ״א מושמדת. יותר מ-5,700 גיחות קרב",e:"Op. Roaring Lion: US-Israel coordinated attack. Supreme Leader Khamenei killed. 15,000+ targets, 85% air defense destroyed. 5,700+ combat sorties",r:true},
  {y:"4/26",h:"תקיפות מתקני אנרגיה ותעשייה כימית, כולל מתקני ייצור חומצה חנקתית. המלחמה נמשכת",e:"Energy & chemical industry strikes including nitric acid plants. War ongoing",r:true},
];return<Sec id="timeline" num="01" title={he?"ציר זמן: תוכנית הטילים":"Timeline: Missile Program"} subtitle={he?"ארבעה עשורים: מ-Scud-B ועד מלחמת 2026":"Four decades: from Scud-B to the 2026 war"} sidebar={<><SB color="gold" title={he?"נקודות מפנה":"Turning Points"}><p><b>1998</b> — {he?<><span dir="ltr">Scud → Shahab</span>{" (טווח ×4)"}</>:"Scud→Shahab (×4 range)"}</p><p><b>2008</b> — {he?"נוזלי ← מוצק":"Liquid→Solid"} (Sejjil)</p><p><b>10/2024</b> — {he?"מערבלים פלנטריים":"Planetary mixers"}</p><p><b>6/2025</b> — {he?"עם כלביא — גרעין":"Im Kalbia — nuclear"}</p><p><b>2/2026</b> — {he?"מתקפה מלאה":"Full-scale attack"}</p></SB></>}>{ev.map((e,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${P.border}30`}}><div className="mn" style={{flexShrink:0,width:48,fontSize:12,fontWeight:700,color:e.r?P.red:P.gold,textAlign:"center"}}>{e.y}</div><div style={{width:8,height:8,borderRadius:"50%",border:`2px solid ${e.r?P.red:P.gold}`,background:e.r?P.red:"transparent",flexShrink:0,marginTop:5}}/><p style={{fontSize:13,color:e.r?P.red:P.steel,fontWeight:e.r?600:400}}>{he?e.h:e.e}</p></div>)}</Sec>;}

/* ═══ COLORED MISSILE DIAGRAM ═══ */
function MissileDiagram({lang}:{lang:string}){const[mode,setMode]=useState("liquid");const[hov,setHov]=useState<string|null>(null);const he=lang==="he";
const liq=[
  {id:"nose",lb:he?"חרטום":"Nosecone",x:2,w:8,d:he?"חרטום אווירודינמי מסגסוגת אלומיניום או קומפוזיט. עמיד לחום חדירת אטמוספירה (>2,000°C). מתפרק בכניסה חוזרת לחשוף ראש קרב.":"Aerodynamic aluminum/composite nosecone. Withstands re-entry heat (>2,000°C). Disintegrates to expose warhead.",c:"#94a3b8",fill:"#b0bec5"},
  {id:"wh",lb:he?"ראש קרב":"Warhead",x:10,w:12,d:he?"מילוי חומרי נפץ HE (TNT/RDX/HMX) במשקל 700-1,500 ק״ג. בטילים מתקדמים (ח׳ייבר שכן, פתאח): ראש קרב מתמרן (MaRV) — משנה מסלול בחדירת אטמוספירה כדי להתחמק מיירוט.":"HE fill (TNT/RDX/HMX) weighing 700-1,500 kg. Advanced missiles (Kheibar Shekan, Fattah): Maneuverable Re-entry Vehicle (MaRV) — changes trajectory during re-entry to evade interception.",c:"#dc2626",fill:"#ef5350"},
  {id:"gui",lb:he?"מערכת הנחיה":"Guidance",x:22,w:8,d:he?"מחשב טיסה + ג׳ירוסקופ אינרציאלי (INS) + תיקון לוויני GPS/GLONASS. בח׳ורמשהר: תיקון מסלול סופי — CEP ~30 מטר (רדיוס שבו 50% מהטילים נופלים).":"Flight computer + Inertial Navigation (INS) + GPS/GLONASS correction. Khorramshahr: terminal guidance — CEP ~30m (radius where 50% of missiles land).",c:"#7c3aed",fill:"#9575cd"},
  {id:"ox",lb:he?"מיכל מחמצן (IRFNA)":"Oxidizer Tank (IRFNA)",x:30,w:20,d:he?"מיכל חומצה חנקתית מעושנת אדומה מעוכבת (AK-27): 73% HNO₃ + 27% N₂O₄ + 0.6% HF כמעכב קורוזיה. נוזל כתום-אדום, צפיפות 1.55 g/cm³. לחץ פנימי 15-25 אטמוספירות.":"Tank of Inhibited Red Fuming Nitric Acid (AK-27): 73% HNO₃ + 27% N₂O₄ + 0.6% HF corrosion inhibitor. Orange-red liquid, density 1.55 g/cm³. Internal pressure 15-25 atm.",c:"#ea580c",fill:"#ff7043"},
  {id:"fu",lb:he?"מיכל דלק (UDMH/TM-185)":"Fuel Tank (UDMH/TM-185)",x:50,w:18,d:he?"שהאב/גדר: קרוסין צבאי TM-185 (סימון סובייטי). ח׳ורמשהר/קיאם: UDMH — נוזל שקוף עם ריח אמוניה/דגים, מסרטן (IARC 2B), חודר עור שלם. שניהם היפרגוליים: מגע עם IRFNA = הצתה ספונטנית מיידית ללא ניצוץ!":"Shahab/Ghadr: TM-185 military kerosene (Soviet designation). Khorramshahr/Qiam: UDMH — clear liquid with ammonia/fishy odor, carcinogenic (IARC 2B), penetrates intact skin. Both hypergolic: contact with IRFNA = instant spontaneous ignition!",c:"#2563eb",fill:"#42a5f5"},
  {id:"eng",lb:he?"מנוע ונחיר":"Engine & Nozzle",x:68,w:16,d:he?"תא בעירה: IRFNA+UDMH מגיבים ב-3,000°C. נחיר De Laval מאיץ גזים למהירות על-קולית. משאבות טורבו מזרימות דלק בלחץ 80 אטמוספירות.":"Combustion chamber: IRFNA+UDMH react at 3,000°C. De Laval nozzle accelerates gases to supersonic speed. Turbopumps deliver fuel at 80 atm.",c:"#b91c1c",fill:"#e53935"},
  {id:"fin",lb:he?"כנפונים":"Stabilizer Fins",x:84,w:14,d:he?"4 כנפונים לייצוב אווירודינמי. בקיאם: הוסרו ונוסף TVC (בקרת וקטור דחף) — הטיית הנחיר עצמו לשינוי כיוון. יתרון: פחות גרר, פרופיל מכ״מ נמוך.":"4 fins for aerodynamic stability. Qiam: removed, replaced by TVC (Thrust Vector Control) — nozzle deflection for steering. Advantage: less drag, lower radar profile.",c:"#475569",fill:"#78909c"},
];
const sol=[
  {id:"nose",lb:he?"חרטום":"Nosecone",x:2,w:8,d:he?"חרטום עמיד לחום חדירה חוזרת. בפתאח-1: צורת שברון ייחודית לטיסה היפרסונית (מעל מאך 5).":"Heat-resistant re-entry cone. Fattah-1: unique chevron shape for hypersonic flight (above Mach 5).",c:"#94a3b8",fill:"#b0bec5"},
  {id:"wh",lb:he?"ראש קרב MaRV":"MaRV Warhead",x:10,w:12,d:he?"מילוי RDX/HMX. בח׳ייבר שכן ופתאח: ראש קרב מתמרן — משנה מסלול בשלב הסופי כדי להתחמק ממערכות יירוט כמו חץ ודויד קלע.":"RDX/HMX fill. Kheibar Shekan & Fattah: maneuverable warhead — changes course in terminal phase to evade Arrow & David's Sling.",c:"#dc2626",fill:"#ef5350"},
  {id:"s2",lb:he?"שלב 2 — מנוע מוצק":"Stage 2 — Solid Motor",x:22,w:20,d:he?"סוללת דלק מוצק: AP(70%)+HTPB(15%)+Al(15%) יצוקה בצורת כוכב (star grain). נשרפת מבפנים החוצה. נחיר עם TVC.":"Solid propellant grain: AP(70%)+HTPB(15%)+Al(15%) cast in star pattern. Burns inside-out. Nozzle with TVC.",c:"#d97706",fill:"#ffa726"},
  {id:"sep",lb:he?"טבעת הפרדה":"Separation Ring",x:42,w:4,d:he?"טבעת פירוטכנית. לאחר שריפת דלק שלב 1 — מנתקת בפיצוץ מבוקר ומפעילה שלב 2.":"Pyrotechnic ring. After Stage 1 burnout — controlled explosive separation activates Stage 2.",c:"#64748b",fill:"#90a4ae"},
  {id:"s1",lb:he?"שלב 1 — מנוע ראשי":"Stage 1 — Main Motor",x:46,w:30,d:he?"הסוללה הגדולה: AP(70%)+HTPB(15%)+Al(15%). יציקה בבורות תת-קרקעיים לאורך 6-10 ימים. דורשת מערבלים פלנטריים שיובאו מסין — הם שהושמדו ב-10/2024.":"Main grain: AP(70%)+HTPB(15%)+Al(15%). Cast in underground pits over 6-10 days. Requires planetary mixers imported from China — those destroyed in 10/2024.",c:"#b45309",fill:"#ff8f00"},
  {id:"nz",lb:he?"נחיר + TVC":"Nozzle + TVC",x:76,w:22,d:he?"נחיר דה-לאבל עם הטיית נחיר גמישה (TVC). טמפרטורת יציאה: 2,800°C. שליטה בכיוון ע״י הטיית זרם הגזים.":"De Laval nozzle with flex-bearing TVC. Exit temperature: 2,800°C. Steering via exhaust gas deflection.",c:"#b91c1c",fill:"#e53935"},
];
const parts=mode==="liquid"?liq:sol;const act=parts.find(p=>p.id===hov);
return<Sec id="diagram" num="03" title={he?"אנטומיה של טיל בליסטי":"Ballistic Missile Anatomy"} subtitle={he?"עמדו על רכיב בטיל לפרטים מלאים":"Hover over a missile component for full details"} dark sidebar={act?<div className="cm" style={{padding:16,borderRight:`3px solid ${act.c}`}}><h4 className="sf" style={{fontSize:15,fontWeight:800,marginBottom:8}}>{act.lb}</h4><p style={{fontSize:12,color:P.steel,lineHeight:1.8}}>{act.d}</p></div>:<SB color="gold" title={he?"👆 אינטראקטיבי":"👆 Interactive"}><p>{he?"עמדו על רכיב בטיל כדי לראות הסבר מפורט על תפקידו, החומרים ממנו עשוי, והפרמטרים הטכניים.":"Hover on a missile component to see its function, materials, and technical parameters."}</p></SB>}>
  <div style={{display:"flex",gap:8,marginBottom:16}}>{([["liquid","🔵",he?"נוזלי (שהאב-3)":"Liquid (Shahab-3)"],["solid","🟠",he?"מוצק (סג׳יל-2)":"Solid (Sejjil-2)"]] as const).map(([m,ic,lb])=><button key={m} onClick={()=>{setMode(m);setHov(null);}} className={mode===m?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{ic} {lb}</button>)}</div>
  <div className="cm" style={{padding:20}}>
    <svg viewBox="0 0 128 32" style={{width:"100%"}}>
      <defs><linearGradient id="bG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0e0e0"/><stop offset="100%" stopColor="#9e9e9e"/></linearGradient></defs>
      {/* Nosecone triangle */}
      <polygon points={`${parts[0].x},16 ${parts[0].x+parts[0].w},11 ${parts[0].x+parts[0].w},21`} fill={hov==="nose"?parts[0].fill:"#bdbdbd"} stroke={hov==="nose"?parts[0].c:"#999"} strokeWidth="0.3" style={{cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={()=>setHov("nose")} onMouseLeave={()=>setHov(null)} onClick={()=>setHov(hov==="nose"?null:"nose")}/>
      {/* Body sections — colored */}
      {parts.slice(1).map(p=><rect key={p.id} x={p.x} y={11} width={p.w} height={10} fill={hov===p.id?p.fill:`${p.fill}90`} stroke={hov===p.id?p.c:`${p.c}50`} strokeWidth={hov===p.id?0.6:0.3} rx="0.3" style={{cursor:"pointer",transition:"all 0.2s"}} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)} onClick={()=>setHov(hov===p.id?null:p.id)}/>)}
      {/* Nozzle exhaust */}
      <path d={mode==="liquid"?"M 98,11 L 100,8 L 100,24 L 98,21":"M 98,11 L 100,9 L 100,23 L 98,21"} fill="#616161" stroke="#424242" strokeWidth="0.2"/>
      {mode==="liquid"&&<><path d="M 90,11 L 87,6 L 94,6 L 98,11" fill="#78909c"/><path d="M 90,21 L 87,26 L 94,26 L 98,21" fill="#78909c"/></>}
      {/* 🔥 Animated exhaust flame */}
      <defs>
        <linearGradient id="flameG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ff6b00"/><stop offset="40%" stopColor="#ff4500"/><stop offset="70%" stopColor="#ff0000" stopOpacity="0.7"/><stop offset="100%" stopColor="#ff0000" stopOpacity="0"/></linearGradient>
        <linearGradient id="flameInner" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ffe066"/><stop offset="50%" stopColor="#ffaa00" stopOpacity="0.8"/><stop offset="100%" stopColor="#ff6600" stopOpacity="0"/></linearGradient>
      </defs>
      {/* Outer flame */}
      <ellipse cx="107" cy="16" rx="8" ry="5" fill="url(#flameG)" style={{animation:"flicker 0.3s ease-in-out infinite",transformOrigin:"100px 16px"}}/>
      {/* Inner bright core */}
      <ellipse cx="104" cy="16" rx="5" ry="3" fill="url(#flameInner)" style={{animation:"flicker 0.2s ease-in-out infinite alternate",transformOrigin:"100px 16px"}}/>
      {/* White-hot center */}
      <ellipse cx="101.5" cy="16" rx="2" ry="1.8" fill="#fff8e1" opacity="0.9" style={{animation:"flicker 0.15s ease-in-out infinite"}}/>
      {/* Smoke/exhaust particles */}
      {[0,1,2,3,4].map(i=><circle key={`smoke${i}`} cx={112+i*3} cy={16+Math.sin(i*1.5)*2} r={0.6+i*0.3} fill="#94a3b8" style={{animation:`exhaustFlow ${0.8+i*0.2}s ease-out infinite`,animationDelay:`${i*0.15}s`,opacity:0.4-i*0.07}}/>)}
      <text x="55" y="30" textAnchor="middle" fill="#9ca3af" fontSize="2.2" fontFamily="monospace">{mode==="liquid"?"~16 m (Shahab-3)":"~17.6 m (Sejjil-2)"}</text>
    </svg>
    <div style={{display:"flex",justifyContent:"space-around",marginTop:8,flexWrap:"wrap",gap:4}}>
      {parts.map(p=><span key={p.id} style={{fontSize:9,color:hov===p.id?p.c:P.muted,fontWeight:hov===p.id?800:400,cursor:"pointer",transition:"all 0.15s",borderBottom:hov===p.id?`2px solid ${p.c}`:"2px solid transparent",padding:"2px 4px"}} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}>{p.lb}</span>)}
    </div>
  </div>
  <p style={{fontSize:11,color:P.muted,marginTop:8,textAlign:"center"}}>{he?"💡 טילים נוזליים הם היפרגוליים: מגע בין הדלק למחמצן = הצתה ספונטנית מיידית ללא ניצוץ. טילים מוצקים: הדלק והמחמצן יצוקים יחד בצורה מוצקה — אין תגובה היפרגולית.":"💡 Liquid missiles are hypergolic: fuel-oxidizer contact = instant spontaneous ignition. Solid missiles: fuel and oxidizer cast together in solid form — no hypergolic reaction."}</p>
</Sec>;}

/* ═══ ARSENAL — filter ABOVE table ═══ */
function Arsenal({lang}:{lang:string}){const[fl,setFl]=useState("all");const he=lang==="he";
const ms=[
  {n:"שהאב-1",ne:"Shahab-1",r:"285-330",w:"~1,000",f:"IRFNA+TM-185",cep:"~2,500",note:"Scud-B",t:"l"},
  {n:"שהאב-2",ne:"Shahab-2",r:"~500",w:"~770",f:"IRFNA+TM-185",cep:"~2,000",note:"Scud-C",t:"l"},
  {n:"שהאב-3",ne:"Shahab-3",r:"~1,300",w:"800-1,200",f:"IRFNA(AK-27)+TM-185",cep:"~1,500",note:"Nodong",t:"l"},
  {n:"קיאם-1/2",ne:"Qiam-1/2",r:"800-1,000",w:"~700",f:"IRFNA+UDMH*",cep:"~500",note:he?"ללא כנפונים, TVC":"No fins, TVC",t:"l"},
  {n:"גדר-1/110",ne:"Ghadr-1/110",r:"1,600-2,000",w:"~750",f:"IRFNA+TM-185",cep:"~300",note:he?"שהאב-3 משודרג":"Upgraded Shahab-3",t:"l"},
  {n:"עמאד",ne:"Emad",r:"~1,700",w:"~750",f:"IRFNA+TM-185",cep:"~500",note:he?"ראשון עם MaRV":"First with MaRV",t:"l"},
  {n:"ח׳ורמשהר",ne:"Khorramshahr",r:"~2,000",w:"~1,500",f:"NTO+UDMH",cep:"~30*",note:he?"המדויק ביותר":"Most accurate",t:"l"},
  {n:"פאתח-110",ne:"Fateh-110",r:"200-300",w:"~500",f:"AP+HTPB+Al",cep:"~100",note:"SRBM",t:"s"},
  {n:"זולפקאר",ne:"Zolfaghar",r:"~700",w:"~600",f:"AP+HTPB+Al",cep:"~100",note:he?"נגד תשתיות":"Anti-infra",t:"s"},
  {n:"דזפול",ne:"Dezful",r:"~1,000",w:"~450",f:"AP+HTPB+Al",cep:"~50",note:he?"דו-שלבי":"Two-stage",t:"s"},
  {n:"ח׳ייבר שכן",ne:"Kheibar Shekan",r:"~1,450",w:"~500",f:"AP+HTPB+Al+RDX*",cep:"~30",note:"MaRV",t:"s"},
  {n:"סג׳יל-2",ne:"Sejjil-2",r:"~2,000",w:"650-1,000",f:"AP+HTPB+RDX/HMX",cep:"~50",note:he?"המתקדם ביותר":"Most advanced",t:"s"},
  {n:"פתאח-1",ne:"Fattah-1",r:"~1,400",w:"~500",f:"AP+HTPB+Al",cep:"?",note:he?"טענה להיפרסוני":"Hypersonic claim",t:"s"},
];const fm=fl==="all"?ms:ms.filter(m=>m.t===fl);
const hd=he?["שם","טווח (ק״מ)","ראש קרב (ק״ג)","הנעה","דלק / מחמצן","CEP (מ׳)","הערות"]:["Name","Range (km)","Warhead (kg)","Propulsion","Fuel / Oxidizer","CEP (m)","Notes"];
return<Sec id="arsenal" num="04" title={he?"ארסנל הטילים":"Missile Arsenal"} subtitle={he?"הגדול ביותר במזרח התיכון — 13 מערכות מתועדות":"Largest in the Middle East — 13 documented systems"}>
  {/* FILTER ON TOP */}
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
    <span style={{fontSize:12,fontWeight:700,color:P.muted}}>{he?"סינון:":"Filter:"}</span>
    {([["all",he?"הכל":"All"],["l",he?"🔵 נוזלי":"🔵 Liquid"],["s",he?"🟠 מוצק":"🟠 Solid"]] as const).map(([v,l])=><button key={v} onClick={()=>setFl(v)} className={fl===v?"ta":"ti"} style={{padding:"6px 14px",borderRadius:5,fontSize:12,fontWeight:700,cursor:"pointer"}}>{l}</button>)}
    <span style={{fontSize:11,color:P.muted,marginInlineStart:8}}>({fm.length} {he?"טילים":"missiles"})</span>
  </div>
  <div style={{overflowX:"auto"}}>
    <table className="mt" style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr>{hd.map(h=><th key={h} style={{textAlign:he?"right":"left",whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
      <tbody>{fm.map((m,i)=><tr key={i}>
        <td style={{fontWeight:700,whiteSpace:"nowrap"}}>{he?m.n:m.ne}</td>
        <td className="mn" style={{color:P.muted,fontSize:12}} dir="ltr">{m.r}</td>
        <td className="mn" style={{color:P.muted,fontSize:12}} dir="ltr">{m.w}</td>
        <td><span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:m.t==="l"?P.blueS:P.amberS,color:m.t==="l"?P.blue:P.amber}}>{m.t==="l"?(he?"נוזלי":"Liquid"):(he?"מוצק":"Solid")}</span></td>
        <td style={{fontSize:12,fontWeight:600,color:m.t==="l"?P.blue:P.amber}}>{m.f}</td>
        <td className="mn" style={{color:P.muted,fontSize:12}} dir="ltr">{m.cep}</td>
        <td style={{color:P.muted,fontSize:11}}>{m.note}</td>
      </tr>)}</tbody>
    </table>
  </div>
  <p style={{fontSize:10,color:P.muted,marginTop:12,lineHeight:1.6}}>{he?"* נתון לא מאומת לחלוטין ממקורות פתוחים. CEP, הרכבי דלק וכמויות מבוססים על הערכות מודיעיניות ועשויים להשתנות.":"* Not fully verified from open sources. CEP, fuel compositions and quantities are based on intelligence estimates and may vary."}</p>
</Sec>;}

/* ═══ PROPULSION — expandable cards ═══ */
function Propulsion({lang}:{lang:string}){const[openCard,setOpenCard]=useState<string|null>(null);const he=lang==="he";
const cards=[
  {id:"liquid",ic:"🔵",title:he?"הנעה נוזלית — היפרגולית":"Liquid — Hypergolic",color:P.blue,bg:P.blueS,
   short:he?"מגע דלק + מחמצן = הצתה ספונטנית מיידית":"Fuel + oxidizer contact = instant spontaneous ignition",
   details:he?[
     "דלק: UDMH (דימתילהידראזין בלתי סימטרי) או TM-185 (קרוסין צבאי סובייטי)",
     "מחמצן: IRFNA (חומצה חנקתית מעושנת אדומה מעוכבת, AK-27) או NTO (חנקן טטראוקסיד, N₂O₄)",
     "תגובה היפרגולית: מגע ישיר בין הדלק למחמצן = הצתה ספונטנית ללא ניצוץ, מצת או חום חיצוני",
     "טילים: שהאב-1/2/3, קיאם, גדר, עמאד, ח׳ורמשהר",
     "יתרונות: שליטה מלאה במנוע (אפשר לכבות ולהדליק), דחף סגולי (Isp) גבוה, אחסון בטמפרטורת חדר",
     "חסרונות: תדלוק לוקח שעות — חושף לזיהוי מראש. חומרים רעילים ומסרטנים. דורש תשתית מורכבת",
   ]:[
     "Fuel: UDMH (Unsymmetrical Dimethylhydrazine) or TM-185 (Soviet military kerosene)",
     "Oxidizer: IRFNA (Inhibited Red Fuming Nitric Acid, AK-27) or NTO (Nitrogen Tetroxide, N₂O₄)",
     "Hypergolic reaction: direct fuel-oxidizer contact = spontaneous ignition, no spark needed",
     "Missiles: Shahab-1/2/3, Qiam, Ghadr, Emad, Khorramshahr",
     "Advantages: full engine control (can restart), high specific impulse (Isp), storable at room temp",
     "Disadvantages: hours to fuel — detectable. Toxic and carcinogenic. Complex infrastructure required",
   ]},
  {id:"solid",ic:"🟠",title:he?"הנעה מוצקה — קומפוזיט":"Solid — Composite",color:P.amber,bg:P.amberS,
   short:he?"דלק ומחמצן יצוקים יחד בצורה מוצקה. כוננות מיידית":"Fuel and oxidizer cast together as solid. Instant readiness",
   details:he?[
     "מחמצן: אמוניום פרכלורט (NH₄ClO₄, AP) — כ-70% מהמשקל. משחרר חמצן בחימום",
     "מאגד/דלק: HTPB (פוליבוטאדיאן עם קצוות הידרוקסיל) — פולימר גמיש, כ-15%",
     "מתכת: אבקת אלומיניום (Al) — כ-15%. מעלה טמפרטורת הבעירה ואנרגיה",
     "בחלק מהטילים: תוספת RDX/HMX לייעול ביצועים",
     "טילים: פאתח-110, זולפקאר, דזפול, ח׳ייבר שכן, סג׳יל-2, פתאח-1",
     "יתרונות: שיגור תוך דקות מ-TEL נייד. שרידות גבוהה. קשה לאתר מראש",
     "חסרונות: אין אפשרות לעצור בעירה. ייצור מורכב (מערבלים פלנטריים מסין). יציקה 6-10 ימים",
     "אין תגובה היפרגולית — הדלק והמחמצן כבר מעורבים בצורה מוצקה יציבה",
   ]:[
     "Oxidizer: Ammonium Perchlorate (NH₄ClO₄, AP) — ~70% by weight. Releases oxygen when heated",
     "Binder/Fuel: HTPB (Hydroxyl-Terminated Polybutadiene) — flexible polymer, ~15%",
     "Metal: Aluminum powder (Al) — ~15%. Increases burn temperature and energy",
     "Some missiles add RDX/HMX for enhanced performance",
     "Missiles: Fateh-110, Zolfaghar, Dezful, Kheibar Shekan, Sejjil-2, Fattah-1",
     "Advantages: launch in minutes from mobile TEL. High survivability. Hard to detect",
     "Disadvantages: cannot stop combustion. Complex manufacturing (planetary mixers from China). 6-10 day casting",
     "No hypergolic reaction — fuel and oxidizer already mixed in stable solid form",
   ]},
];
return<Sec id="propulsion" num="07" title={he?"נוזלי מול מוצק":"Liquid vs. Solid"} subtitle={he?"לחצו על כרטיס לפרטים מלאים":"Click a card for full details"} dark>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
    {cards.map(card=><div key={card.id} className="cm" style={{padding:24,borderRight:`3px solid ${card.color}`,background:card.bg,cursor:"pointer",transition:"all 0.2s"}} onClick={()=>setOpenCard(openCard===card.id?null:card.id)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 className="sf" style={{fontSize:18,fontWeight:800,color:card.color}}>{card.ic} {card.title}</h3>
        <span style={{fontSize:18,color:card.color,transition:"transform 0.2s",transform:openCard===card.id?"rotate(180deg)":"rotate(0)"}}>{openCard===card.id?"▲":"▼"}</span>
      </div>
      <p style={{fontSize:13,color:P.steel,marginTop:8}}>{card.short}</p>
      {openCard===card.id&&<div style={{marginTop:16,borderTop:`1px solid ${card.color}30`,paddingTop:12}}>
        {card.details.map((d,i)=><p key={i} style={{fontSize:12,color:P.steel,lineHeight:1.7,marginBottom:6,paddingRight:he?16:0,paddingLeft:he?0:16,borderRight:he?`2px solid ${card.color}20`:"none",borderLeft:he?"none":`2px solid ${card.color}20`}}>{d}</p>)}
      </div>}
    </div>)}
  </div>
</Sec>;}

/* ═══ PROCESSES ═══ */
function Processes({lang}:{lang:string}){const[a,setA]=useState(0);const he=lang==="he";
const pr=[
  {nm:he?"אוסטוולד — חומצה חנקתית (HNO₃)":"Ostwald — Nitric Acid (HNO₃)",ic:"⚗️",or:he?"וילהלם אוסטוולד (1853-1932), כימאי גרמני, פרס נובל 1909. גילה שניתן לחמצן אמוניה על זרז פלטינה ליצירת חומצה חנקתית. התהליך מהווה את הבסיס לייצור דשנים, חומרי נפץ ודלקי טילים.":"Wilhelm Ostwald (1853-1932), German chemist, Nobel Prize 1909. Discovered ammonia can be catalytically oxidized to produce nitric acid. Basis for fertilizers, explosives, and missile fuels.",
   st:he?["אמוניה (NH₃) + אוויר מוזרמים לכור קטליטי","חמצון על רשת זרז פלטינה-רודיום (Pt-Rh 90:10) בטמפרטורה של 850°C ← גז תחמוצת חנקן (NO)","קירור + חמצון נוסף באוויר: NO + O₂ ← NO₂ (גז חום-אדום רעיל)","מגדל ספיגה: NO₂ + מים ← חומצה חנקתית מדוללת (HNO₃ ~68%)","ריכוז באמצעות חומצה גופרתית (H₂SO₄) לריכוז מעל 86%","הוספת N₂O₄ (18-27%) + HF (0.6% כמעכב קורוזיה) ← IRFNA מוכנה לשימוש כמחמצן בטילים"]:["Ammonia (NH₃) + air fed into catalytic reactor","Oxidation on Platinum-Rhodium (Pt-Rh 90:10) catalyst mesh at 850°C → Nitric Oxide gas (NO)","Cooling + further oxidation: NO + O₂ → NO₂ (toxic reddish-brown gas)","Absorption tower: NO₂ + H₂O → dilute Nitric Acid (HNO₃ ~68%)","Concentration using Sulfuric Acid (H₂SO₄) to >86%","Add N₂O₄ (18-27%) + HF (0.6% corrosion inhibitor) → IRFNA ready for missile use"]},
  {nm:he?"רשיג — דלק טילים UDMH":"Raschig — UDMH Missile Fuel",ic:"🟣",or:he?"פרידריך רשיג (1863-1928), כימאי גרמני. פיתח תהליך ליצירת הידראזין מאמוניה והיפוכלוריט. וריאציה שלו (Ketazine Process) משמשת כיום לייצור UDMH — דלק הטילים הנוזלי הנפוץ ביותר בעולם.":"Friedrich Raschig (1863-1928), German chemist. Developed hydrazine synthesis from ammonia and hypochlorite. His variation (Ketazine Process) is used today to produce UDMH — the world's most common liquid missile fuel.",
   st:he?["אמוניה (NH₃) + נתרן היפוכלוריט (אקונומיקה/NaOCl)","תגובה בטמפרטורה נמוכה (0°C) ← כלוראמין (NH₂Cl) — תרכובת ביניים רעילה","כלוראמין + דימתילאמין ((CH₃)₂NH)","תגובה ← UDMH גולמי (לא טהור, מכיל מזהמים)","זיקוק חוזר בטמפרטורת רתיחה 63°C","UDMH טהור — נוזל שקוף, ריח אמוניה/דגים, מסרטן (IARC Group 2B)"]:["Ammonia (NH₃) + Sodium Hypochlorite (NaOCl/bleach)","Low temperature reaction (0°C) → Chloramine (NH₂Cl) — toxic intermediate","Chloramine + Dimethylamine ((CH₃)₂NH)","Reaction → crude UDMH (impure, contains contaminants)","Repeated distillation at boiling point 63°C","Pure UDMH — clear liquid, ammonia/fish odor, carcinogenic (IARC Group 2B)"]},
  {nm:he?"בכמן — חומרי נפץ RDX/HMX":"Bachmann — RDX/HMX Explosives",ic:"💣",or:he?"ורנר בכמן (1901-1951), כימאי אמריקאי מאוניברסיטת מישיגן. במלחמת העולם השנייה פיתח שיטה לייצור המוני של RDX — חומר הנפץ החזק ביותר שהיה זמין. RDX חזק פי 1.6 מ-TNT. HMX (תת-מוצר) חזק עוד יותר ומשמש גם בעדשות קריסה גרעיניות.":"Werner Bachmann (1901-1951), American chemist at University of Michigan. In WWII, developed mass production of RDX — the most powerful explosive available. RDX is 1.6× stronger than TNT. HMX (byproduct) is even stronger and also used in nuclear implosion lenses.",
   st:he?["הקסאמין (C₆H₁₂N₄, קוביות הצתה לקמפינג) + חומצה חנקתית מרוכזת (HNO₃)","ניטרציה מבוקרת בטמפרטורה 45-75°C — עלייה מעבר = פיצוץ! דורש בקרת טמפרטורה מדויקת","שטיפה במים, סינון וייבוש ← RDX (הקסוגן) — גבישים לבנים, חזק פי 1.6 מ-TNT","שינוי תנאי תגובה (ריכוז, זמן) ← HMX (אוקטוגן) — חזק יותר, יקר יותר","שימושים: ראשי קרב טילים + תוספת לדלק מוצק + עדשות קריסה (Implosion Lenses) לנשק גרעיני"]:["Hexamine (C₆H₁₂N₄, camping fuel cubes) + concentrated Nitric Acid (HNO₃)","Controlled nitration at 45-75°C — exceeding = explosion! Requires precise temperature control","Wash, filter, dry → RDX (Hexogen) — white crystals, 1.6× TNT power","Modified conditions (concentration, time) → HMX (Octogen) — more powerful, more expensive","Uses: missile warheads + solid fuel additive + nuclear Implosion Lenses"]},
];const p=pr[a];
return<Sec id="processes" num="08" title={he?"תהליכי ייצור כימיים":"Chemical Production Processes"} subtitle={he?"שלושת התהליכים הקריטיים שנפגעו בתקיפות":"Three critical processes targeted in strikes"} sidebar={<><SB color="purple" title={he?"📜 רקע היסטורי":"📜 Historical Background"}><p style={{fontSize:11,lineHeight:1.8}}>{p.or}</p></SB><SB color="amber" title={he?"⚡ מערבלים פלנטריים":"⚡ Planetary Mixers"}><p>{he?"מכונות ענק (עשרות טונות) לערבוב דלק מוצק. איראן אינה מסוגלת לייצר — מוברחים מסין דרך חברות קש. 12 מערבלים הושמדו באוקטובר 2024.":"Giant machines (tens of tons) for mixing solid fuel. Iran cannot manufacture — smuggled from China via shell companies. 12 mixers destroyed October 2024."}</p></SB></>}>
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{pr.map((x,i)=><button key={i} onClick={()=>setA(i)} className={a===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.nm.split("—")[0]}</button>)}</div>
  <div className="cm" style={{padding:24}}>
    <h3 className="sf" style={{fontSize:18,fontWeight:800,marginBottom:16}}>{p.ic} {p.nm}</h3>
    {p.st.map((s,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}><div style={{width:28,height:28,borderRadius:"50%",background:P.ink,color:P.gold,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div><p style={{fontSize:13,color:P.steel,paddingTop:3,lineHeight:1.7}}>{s}</p></div>)}
  </div>
</Sec>;}

/* ═══ MOLECULAR ANIMATION — SMOOTH 60fps — 3 PROCESSES ═══ */
function lp(a:number,b:number,t:number):number{return a+(b-a)*t;}
function ez(t:number):number{return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function MolecularAnim({lang}:{lang:string}){const he=lang==="he";const[proc,setProc]=useState(0);const[step,setStep]=useState(0);const[pg,setPg]=useState(0);const[au,setAu]=useState(false);const rf=useRef<number>(0);const sr=useRef<number>(0);const DUR=4500;
const At=({x,y,t,op=1}:{x:number;y:number;t:string;op?:number})=>{const cs:any={N:"#4263eb",H:"#dee2e6",O:"#e03131",F:"#2f9e44",C:"#555",Cl:"#f59e0b",Na:"#9333ea"};const rs:any={N:13,H:8,O:12,F:10,C:12,Cl:12,Na:13};const c=cs[t]||"#adb5bd";const r=rs[t]||12;const id=`g${t}${Math.round(x*10)}${Math.round(y*10)}`;return<g style={{opacity:op}}><ellipse cx={x+1} cy={y+r+3} rx={r*0.4} ry={2} fill={`rgba(0,0,0,${0.12*op})`}/><defs><radialGradient id={id} cx="30%" cy="25%" r="70%"><stop offset="0%" stopColor="#fff" stopOpacity="0.9"/><stop offset="30%" stopColor={c} stopOpacity="0.85"/><stop offset="100%" stopColor={c} stopOpacity="0.55"/></radialGradient></defs><circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke={`${c}40`} strokeWidth="0.6" style={{filter:op>0.8?"drop-shadow(1px 1px 2px rgba(0,0,0,0.2))":"none"}}/><ellipse cx={x-r*0.18} cy={y-r*0.2} rx={r*0.3} ry={r*0.17} fill={`rgba(255,255,255,${0.4*op})`} transform={`rotate(-20,${x-r*0.18},${y-r*0.2})`}/><text x={x} y={y+(r>10?4:3)} textAnchor="middle" dominantBaseline="middle" fill={t==="H"?"#555":"#fff"} fontSize={r>10?9:7} fontWeight="800" fontFamily="Inter,system-ui">{t}</text></g>;};
const Bd=({x1,y1,x2,y2,d=false,op=1}:{x1:number;y1:number;x2:number;y2:number;d?:boolean;op?:number})=>{const dx=x2-x1,dy=y2-y1,ln=Math.sqrt(dx*dx+dy*dy)||1;const nx=(-dy/ln)*2.5,ny=(dx/ln)*2.5;return<g style={{opacity:op}}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7a8a9a" strokeWidth={d?1.8:2.5} strokeLinecap="round"/>{d&&<line x1={x1+nx} y1={y1+ny} x2={x2+nx} y2={y2+ny} stroke="#7a8a9a" strokeWidth="1.8" strokeLinecap="round"/>}</g>;};
const procs:any[]=[
{name:he?"אוסטוולד":"Ostwald",icon:"\u2697\uFE0F",product:"IRFNA",color:"#c8a44e",steps:[
{eq:"4NH\u2083 + 5O\u2082 \u2192 4NO + 6H\u2082O",cond:"850\u00B0C | Pt-Rh | 8 atm",title:he?"\u05D7\u05DE\u05E6\u05D5\u05DF \u05E7\u05D8\u05DC\u05D9\u05D8\u05D9":"Catalytic Oxidation",desc:he?"NH\u2083 \u05E0\u05E2 \u05DC\u05E2\u05D1\u05E8 O\u2082 \u05E2\u05DC \u05D6\u05E8\u05D6 Pt-Rh \u05D1-850\u00B0C. \u05E7\u05E9\u05E8\u05D9\u05DD N-H \u05E0\u05E9\u05D1\u05E8\u05D9\u05DD, \u05E0\u05D5\u05E6\u05E8\u05D9\u05DD NO \u05D5-H\u2082O.":"NH\u2083 meets O\u2082 on Pt-Rh at 850\u00B0C. N-H bonds break, NO and H\u2082O form.",cat:true,r:[{t:"N",sx:35,sy:48,ex:100,ey:48},{t:"H",sx:22,sy:34,ex:87,ey:34},{t:"H",sx:48,sy:34,ex:113,ey:34},{t:"H",sx:35,sy:64,ex:100,ey:64},{t:"O",sx:185,sy:46,ex:125,ey:46},{t:"O",sx:210,sy:46,ex:150,ey:46}],rb:[{a:0,b:1},{a:0,b:2},{a:0,b:3},{a:4,b:5,d:true}],p:[{t:"N",sx:112,sy:46,ex:55,ey:46},{t:"O",sx:130,sy:46,ex:80,ey:46},{t:"O",sx:120,sy:50,ex:180,ey:50},{t:"H",sx:110,sy:42,ex:168,ey:38},{t:"H",sx:130,sy:42,ex:192,ey:38}],pb:[{a:0,b:1,d:true},{a:2,b:3},{a:2,b:4}]},
{eq:"2NO + O\u2082 \u2192 2NO\u2082",cond:"< 150\u00B0C",title:he?"\u05D7\u05DE\u05E6\u05D5\u05DF \u05D1\u05E7\u05D9\u05E8\u05D5\u05E8":"Cooling Oxidation",desc:he?"\u05D4\u05D2\u05D6 \u05DE\u05EA\u05E7\u05E8\u05E8. NO \u05E0\u05E2 \u05DC\u05E2\u05D1\u05E8 O\u2082 \u05D5\u05DE\u05EA\u05D7\u05D1\u05E8. \u05E0\u05D5\u05E6\u05E8 NO\u2082 \u2014 \u05D2\u05D6 \u05D7\u05D5\u05DD-\u05D0\u05D3\u05D5\u05DD \u05E8\u05E2\u05D9\u05DC.":"Gas cools. NO approaches O\u2082. NO\u2082 forms \u2014 toxic reddish-brown gas.",cool:true,r:[{t:"N",sx:30,sy:38,ex:90,ey:44},{t:"O",sx:55,sy:38,ex:115,ey:44},{t:"N",sx:30,sy:65,ex:90,ey:60},{t:"O",sx:55,sy:65,ex:115,ey:60},{t:"O",sx:190,sy:48,ex:130,ey:48},{t:"O",sx:215,sy:48,ex:155,ey:48}],rb:[{a:0,b:1,d:true},{a:2,b:3,d:true},{a:4,b:5,d:true}],p:[{t:"N",sx:110,sy:48,ex:55,ey:48},{t:"O",sx:98,sy:36,ex:40,ey:36},{t:"O",sx:122,sy:36,ex:70,ey:36},{t:"N",sx:130,sy:52,ex:185,ey:52},{t:"O",sx:118,sy:40,ex:170,ey:40},{t:"O",sx:142,sy:40,ex:200,ey:40}],pb:[{a:0,b:1,d:true},{a:0,b:2},{a:3,b:4,d:true},{a:3,b:5}]},
{eq:"3NO\u2082 + H\u2082O \u2192 2HNO\u2083 + NO",cond:"50-80\u00B0C",title:he?"\u05E1\u05E4\u05D9\u05D2\u05D4 \u05D1\u05DE\u05D9\u05DD":"Absorption",desc:he?"NO\u2082 \u05E0\u05E1\u05E4\u05D2 \u05D1\u05DE\u05D9\u05DD. \u05E0\u05D5\u05E6\u05E8\u05EA HNO\u2083 \u05D1-68%. \u05D7\u05D5\u05DE\u05E8 \u05D4\u05D2\u05DC\u05DD \u05DC\u05E9\u05E8\u05E9\u05E8\u05EA \u05D4\u05E0\u05E9\u05E7.":"NO\u2082 dissolves in water. HNO\u2083 at ~68%. Weapons chain precursor.",r:[{t:"N",sx:45,sy:48,ex:100,ey:48},{t:"O",sx:30,sy:35,ex:85,ey:35},{t:"O",sx:60,sy:35,ex:115,ey:35},{t:"O",sx:195,sy:48,ex:140,ey:48},{t:"H",sx:182,sy:36,ex:127,ey:36},{t:"H",sx:208,sy:36,ex:153,ey:36}],rb:[{a:0,b:1,d:true},{a:0,b:2},{a:3,b:4},{a:3,b:5}],p:[{t:"N",sx:115,sy:44,ex:115,ey:35},{t:"O",sx:102,sy:32,ex:100,ey:22},{t:"O",sx:128,sy:32,ex:130,ey:22},{t:"O",sx:115,sy:56,ex:115,ey:50},{t:"H",sx:128,sy:64,ex:128,ey:58}],pb:[{a:0,b:1,d:true},{a:0,b:2},{a:0,b:3},{a:3,b:4}],lbl:{text:"HNO\u2083",x:115,y:78,c:"#22c55e"}},
{eq:"HNO\u2083 + N\u2082O\u2084 + HF \u2192 IRFNA",cond:"> 86%",title:he?"\u05D4\u05DB\u05E0\u05EA IRFNA":"IRFNA",desc:he?"HNO\u2083+N\u2082O\u2084+HF \u2192 IRFNA \u2014 \u05DE\u05D7\u05DE\u05E6\u05DF \u05D8\u05D9\u05DC\u05D9 \u05E9\u05D4\u05D0\u05D1, \u05D2\u05D3\u05E8, \u05E7\u05D9\u05D0\u05DD, \u05E2\u05DE\u05D0\u05D3.":"HNO\u2083+N\u2082O\u2084+HF \u2192 IRFNA \u2014 oxidizer for Shahab, Ghadr, Qiam, Emad.",irfna:true,r:[{t:"O",sx:35,sy:45,ex:105,ey:48},{t:"N",sx:120,sy:25,ex:120,ey:42},{t:"F",sx:205,sy:55,ex:135,ey:52}],rb:[],p:[],pb:[]},
]},
{name:he?"\u05E8\u05E9\u05D9\u05D2":"Raschig",icon:"\uD83E\uDDEB",product:"UDMH",color:"#7c3aed",steps:[
{eq:"NH\u2083 + NaOCl \u2192 NH\u2082Cl + NaOH",cond:"130\u00B0C",title:he?"\u05DB\u05DC\u05D5\u05E8\u05D0\u05DE\u05D9\u05DF":"Chloramine",desc:he?"NH\u2083 \u05DE\u05D2\u05D9\u05D1 \u05E2\u05DD NaOCl \u05DC\u05D9\u05E6\u05D9\u05E8\u05EA NH\u2082Cl. \u05E9\u05DC\u05D1 \u05E8\u05D0\u05E9\u05D5\u05DF \u05DC-UDMH.":"NH\u2083 reacts with NaOCl forming NH\u2082Cl. First step to UDMH.",r:[{t:"N",sx:40,sy:48,ex:95,ey:48},{t:"H",sx:25,sy:35,ex:80,ey:35},{t:"H",sx:55,sy:35,ex:110,ey:35},{t:"Na",sx:185,sy:40,ex:135,ey:44},{t:"O",sx:200,sy:52,ex:148,ey:52},{t:"Cl",sx:215,sy:40,ex:160,ey:44}],rb:[{a:0,b:1},{a:0,b:2},{a:3,b:4},{a:4,b:5}],p:[{t:"N",sx:110,sy:44,ex:55,ey:44},{t:"H",sx:100,sy:32,ex:42,ey:32},{t:"Cl",sx:120,sy:32,ex:68,ey:32},{t:"Na",sx:115,sy:58,ex:180,ey:48},{t:"O",sx:125,sy:58,ex:195,ey:48},{t:"H",sx:135,sy:58,ex:210,ey:48}],pb:[{a:0,b:1},{a:0,b:2},{a:3,b:4},{a:4,b:5}],lbl:{text:"NH\u2082Cl",x:55,y:62,c:"#f59e0b"}},
{eq:"NH\u2082Cl + NH\u2083 \u2192 N\u2082H\u2084 + HCl",cond:"170\u00B0C | 30 atm",title:he?"\u05D4\u05D9\u05D3\u05E8\u05D0\u05D6\u05D9\u05DF":"Hydrazine",desc:he?"NH\u2082Cl+NH\u2083 \u2192 \u05D4\u05D9\u05D3\u05E8\u05D0\u05D6\u05D9\u05DF (N\u2082H\u2084). \u05DE\u05D5\u05DC\u05E7\u05D5\u05DC\u05EA \u05D4\u05D1\u05E1\u05D9\u05E1 \u05DC-UDMH.":"NH\u2082Cl+NH\u2083 \u2192 Hydrazine (N\u2082H\u2084). Base molecule for UDMH.",r:[{t:"N",sx:35,sy:42,ex:90,ey:45},{t:"H",sx:22,sy:30,ex:78,ey:33},{t:"Cl",sx:48,sy:30,ex:102,ey:33},{t:"N",sx:190,sy:48,ex:140,ey:48},{t:"H",sx:175,sy:35,ex:125,ey:35},{t:"H",sx:205,sy:35,ex:155,ey:35}],rb:[{a:0,b:1},{a:0,b:2},{a:3,b:4},{a:3,b:5}],p:[{t:"N",sx:110,sy:42,ex:65,ey:42},{t:"N",sx:120,sy:42,ex:85,ey:42},{t:"H",sx:105,sy:30,ex:52,ey:30},{t:"H",sx:125,sy:30,ex:98,ey:30},{t:"H",sx:105,sy:56,ex:52,ey:56},{t:"H",sx:125,sy:56,ex:98,ey:56}],pb:[{a:0,b:1},{a:0,b:2},{a:1,b:3},{a:0,b:4},{a:1,b:5}],lbl:{text:"N\u2082H\u2084",x:75,y:72,c:"#7c3aed"}},
{eq:"N\u2082H\u2084 + (CH\u2083)\u2082NH \u2192 UDMH",cond:"250\u00B0C",title:he?"UDMH \u2014 \u05D3\u05DC\u05E7 \u05D4\u05D9\u05E4\u05E8\u05D2\u05D5\u05DC\u05D9":"UDMH \u2014 Hypergolic Fuel",desc:he?"N\u2082H\u2084+\u05D3\u05D9\u05DE\u05EA\u05D9\u05DC\u05D0\u05DE\u05D9\u05DF \u2192 UDMH. \u05D3\u05DC\u05E7 \u05D8\u05D9\u05DC\u05D9 \u05E9\u05D4\u05D0\u05D1, \u05D2\u05D3\u05E8, \u05E7\u05D9\u05D0\u05DD. \u05DE\u05D2\u05E2 IRFNA = \u05D4\u05E6\u05EA\u05D4 \u05E1\u05E4\u05D5\u05E0\u05D8\u05E0\u05D9\u05EA.":"N\u2082H\u2084+dimethylamine \u2192 UDMH. Fuel for Shahab, Ghadr, Qiam. IRFNA contact = spontaneous ignition.",irfna:true,prodName:"UDMH",prodColor:"#7c3aed",r:[{t:"N",sx:35,sy:42,ex:95,ey:45},{t:"N",sx:55,sy:42,ex:115,ey:45},{t:"C",sx:190,sy:40,ex:140,ey:44},{t:"N",sx:205,sy:52,ex:155,ey:52}],rb:[{a:0,b:1},{a:2,b:3}],p:[],pb:[]},
]},
{name:he?"\u05D1\u05DB\u05DE\u05DF":"Bachmann",icon:"\uD83D\uDCA3",product:"RDX/HMX",color:"#dc2626",steps:[
{eq:"C\u2086H\u2081\u2082N\u2084 + HNO\u2083 \u2192 Nitration",cond:"45-75\u00B0C | \u26A0\uFE0F >75\u00B0C!",title:he?"\u05E0\u05D9\u05D8\u05E8\u05E6\u05D9\u05D4":"Nitration",desc:he?"\u05D4\u05E7\u05E1\u05D0\u05DE\u05D9\u05DF+HNO\u2083. \u05DE\u05E2\u05DC 75\u00B0C = \u05E4\u05D9\u05E6\u05D5\u05E5! \u05E0\u05D3\u05E8\u05E9 \u05E7\u05D9\u05E8\u05D5\u05E8 \u05DE\u05D3\u05D5\u05D9\u05E7.":"Hexamine+HNO\u2083. Above 75\u00B0C = explosion! Precise cooling required.",r:[{t:"C",sx:35,sy:38,ex:85,ey:42},{t:"N",sx:50,sy:50,ex:100,ey:50},{t:"C",sx:35,sy:62,ex:85,ey:58},{t:"O",sx:185,sy:42,ex:140,ey:45},{t:"N",sx:200,sy:50,ex:155,ey:50},{t:"O",sx:215,sy:42,ex:170,ey:45}],rb:[{a:0,b:1},{a:1,b:2},{a:3,b:4},{a:4,b:5}],p:[{t:"C",sx:110,sy:35,ex:55,ey:35},{t:"N",sx:110,sy:48,ex:75,ey:48},{t:"O",sx:110,sy:60,ex:55,ey:60},{t:"N",sx:120,sy:35,ex:175,ey:35},{t:"O",sx:120,sy:48,ex:195,ey:48},{t:"O",sx:120,sy:60,ex:175,ey:60}],pb:[{a:0,b:1},{a:1,b:2},{a:3,b:4},{a:3,b:5}]},
{eq:"+ (CH\u2083CO)\u2082O \u2192 RDX",cond:he?"\u05D0\u05E0\u05D4\u05D9\u05D3\u05E8\u05D9\u05D3 \u05D0\u05E6\u05D8\u05D9":"Acetic anhydride",title:he?"\u05E1\u05D9\u05E0\u05EA\u05D6\u05EA RDX":"RDX Synthesis",desc:he?"\u05EA\u05D5\u05E6\u05E8 \u05D4\u05E0\u05D9\u05D8\u05E8\u05E6\u05D9\u05D4+\u05D0\u05E0\u05D4\u05D9\u05D3\u05E8\u05D9\u05D3 \u05D0\u05E6\u05D8\u05D9 \u2192 RDX (\u05D4\u05E7\u05E1\u05D5\u05D2\u05DF). \u05D7\u05D5\u05DE\u05E8 \u05E0\u05E4\u05E5 \u05DC\u05E8\u05D0\u05E9\u05D9 \u05E7\u05E8\u05D1.":"Nitration product+acetic anhydride \u2192 RDX (hexogen). Warhead explosive.",irfna:true,prodName:"RDX",prodColor:"#dc2626",r:[{t:"C",sx:35,sy:42,ex:90,ey:45},{t:"N",sx:50,sy:55,ex:105,ey:55},{t:"O",sx:35,sy:65,ex:90,ey:65},{t:"C",sx:190,sy:42,ex:140,ey:45},{t:"O",sx:205,sy:55,ex:155,ey:50}],rb:[{a:0,b:1},{a:1,b:2},{a:3,b:4}],p:[],pb:[]},
{eq:"RDX \u2192 HMX",cond:he?"\u05EA\u05E0\u05D0\u05D9\u05DD \u05E7\u05D9\u05E6\u05D5\u05E0\u05D9\u05D9\u05DD":"Extreme conditions",title:he?"HMX \u2014 \u05E2\u05D3\u05E9\u05D5\u05EA \u05D2\u05E8\u05E2\u05D9\u05E0\u05D9\u05D5\u05EA":"HMX \u2014 Nuclear Lenses",desc:he?"\u05D1\u05EA\u05E0\u05D0\u05D9\u05DD \u05E7\u05D9\u05E6\u05D5\u05E0\u05D9\u05D9\u05DD \u05E0\u05D5\u05E6\u05E8 HMX (\u05D0\u05D5\u05E7\u05D8\u05D5\u05D2\u05DF). \u05DE\u05E9\u05DE\u05E9 \u05D1\u05E2\u05D3\u05E9\u05D5\u05EA \u05E7\u05E8\u05D9\u05E1\u05D4 (Implosion Lenses) \u05DC\u05E0\u05E9\u05E7 \u05D2\u05E8\u05E2\u05D9\u05E0\u05D9.":"Under extreme conditions HMX (octogen) forms. Used in Implosion Lenses for nuclear weapons.",irfna:true,prodName:"HMX",prodColor:"#dc2626",r:[{t:"C",sx:40,sy:40,ex:100,ey:42},{t:"N",sx:55,sy:50,ex:112,ey:50},{t:"O",sx:40,sy:60,ex:100,ey:58},{t:"C",sx:195,sy:40,ex:140,ey:42},{t:"N",sx:195,sy:55,ex:140,ey:55}],rb:[{a:0,b:1},{a:1,b:2},{a:3,b:4},{a:0,b:3}],p:[],pb:[]},
]},
];
const pr=procs[proc];const curStep=pr.steps[step>=pr.steps.length?0:step];
const anim=useCallback((ts:number)=>{if(!sr.current)sr.current=ts;const p=Math.min((ts-sr.current)/DUR,1);setPg(p);if(p<1)rf.current=requestAnimationFrame(anim);else if(au)setTimeout(()=>{const maxS=procs[proc].steps.length;if(step<maxS-1)setStep(v=>v+1);else{setStep(0);setProc(v=>(v+1)%3);}},800);},[au,step,proc]);
useEffect(()=>{sr.current=0;setPg(0);rf.current=requestAnimationFrame(anim);return()=>cancelAnimationFrame(rf.current);},[step,proc,anim]);
const replay=()=>{sr.current=0;setPg(0);rf.current=requestAnimationFrame(anim);};
const s=curStep;const p=pg;const rOp=p<0.1?p/0.1:p<0.45?1:p<0.6?1-(p-0.45)/0.15:0;const rMv=p<0.1?0:p<0.5?ez((p-0.1)/0.4):1;const pOp=p<0.55?0:p<0.7?(p-0.55)/0.15:1;const pMv=p<0.6?0:p<1?ez((p-0.6)/0.4):1;
const tmp=s.cool?Math.round(lp(850,120,ez(Math.min(p/0.8,1)))):null;const tc=tmp!==null?(tmp>500?"#ef4444":tmp>200?"#f59e0b":"#06b6d4"):null;
return<Sec id="molecular" num="10" title={he?"תגובות כימיות — שלושת התהליכים":"Chemical Reactions — Three Processes"} subtitle={he?"אנימציות רציפות • אוסטוולד, רשיג ובכמן":"Smooth animations • Ostwald, Raschig & Bachmann"} dark>
  <div style={{display:"flex",gap:6,marginBottom:10,justifyContent:"center"}}>{procs.map((pr2:any,i:number)=><button key={i} onClick={()=>{setProc(i);setStep(0);setAu(false);}} style={{padding:"8px 12px",borderRadius:10,fontSize:11,fontWeight:700,background:proc===i?`${pr2.color}18`:`${P.white}03`,color:proc===i?pr2.color:"#475569",border:proc===i?`1px solid ${pr2.color}30`:"1px solid transparent",cursor:"pointer",fontFamily:"'Heebo',sans-serif"}}>{pr2.icon} {pr2.name}<div style={{fontSize:8,color:"#64748b",marginTop:1}}>{"\u2192"} {pr2.product}</div></button>)}</div>
  <div style={{display:"flex",gap:3,marginBottom:6,justifyContent:"center"}}>{pr.steps.map((_:any,i:number)=><button key={i} onClick={()=>{setStep(i);setAu(false);}} style={{padding:"5px 10px",borderRadius:6,fontSize:10,fontWeight:step===i?700:500,background:step===i?`${pr.color}12`:"transparent",color:step===i?pr.color:"#475569",border:step===i?`1px solid ${pr.color}20`:"1px solid transparent",cursor:"pointer"}}>{i+1}</button>)}</div>
  <h4 style={{textAlign:"center",fontSize:13,fontWeight:700,margin:"2px 0 4px"}}>{s.title}</h4>
  <div style={{padding:"2px 16px 4px",display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:3,borderRadius:2,background:"#1e293b",overflow:"hidden"}}><div style={{width:`${p*100}%`,height:"100%",background:p<0.5?pr.color:p<0.65?"#f59e0b":"#22c55e",borderRadius:2}}/></div><span style={{fontSize:7,color:"#475569",fontFamily:"monospace"}}>{p<0.5?(he?"\u05DE\u05D2\u05D9\u05D1\u05D9\u05DD":"React."):p<0.65?(he?"\u05EA\u05D2\u05D5\u05D1\u05D4":"React!!"):(he?"\u05EA\u05D5\u05E6\u05E8\u05D9\u05DD":"Products")}</span></div>
  <div style={{padding:"0 8px"}}><div style={{background:"linear-gradient(180deg,#0d1225,#111827)",borderRadius:12,border:`1px solid ${P.white}04`,overflow:"hidden"}}>
    <svg viewBox="0 0 245 90" style={{width:"100%",display:"block"}}>
      {tmp!==null&&<g><rect x={6} y={8} width={5} height={50} rx={2.5} fill="#1e293b"/><rect x={6.5} y={8+50-(tmp/850)*48} width={4} height={(tmp/850)*48} rx={2} fill={tc||"#adb5bd"}/><text x={8.5} y={65} textAnchor="middle" fill={tc||"#adb5bd"} fontSize="5" fontFamily="monospace" fontWeight="700">{tmp}{"\u00B0C"}</text></g>}
      {s.cat&&p>0.15&&p<0.7&&<g style={{opacity:Math.min(1,(p-0.15)/0.1)*(p<0.6?1:(0.7-p)/0.1)}}><rect x={55} y={72} width={130} height={4} rx={2} fill="#adb5bd"/><text x={120} y={84} textAnchor="middle" fill="#adb5bd" fontSize="5" fontFamily="monospace">Pt-Rh 850{"\u00B0C"}</text></g>}
      {s.r.map((at:any,i:number)=><At key={`r${i}`} x={lp(at.sx,at.ex,rMv)} y={lp(at.sy,at.ey,rMv)} t={at.t} op={rOp}/>)}
      {s.rb.map((bd:any,i:number)=>{const a=s.r[bd.a],b=s.r[bd.b];return<Bd key={`rb${i}`} x1={lp(a.sx,a.ex,rMv)} y1={lp(a.sy,a.ey,rMv)} x2={lp(b.sx,b.ex,rMv)} y2={lp(b.sy,b.ey,rMv)} d={bd.d} op={rOp}/>;})}
      {!s.irfna&&s.p.map((at:any,i:number)=><At key={`p${i}`} x={lp(at.sx,at.ex,pMv)} y={lp(at.sy,at.ey,pMv)} t={at.t} op={pOp}/>)}
      {!s.irfna&&s.pb.map((bd:any,i:number)=>{const a=s.p[bd.a],b=s.p[bd.b];return<Bd key={`pb${i}`} x1={lp(a.sx,a.ex,pMv)} y1={lp(a.sy,a.ey,pMv)} x2={lp(b.sx,b.ex,pMv)} y2={lp(b.sy,b.ey,pMv)} d={bd.d} op={pOp}/>;})}
      {s.lbl&&pOp>0.5&&<text x={s.lbl.x} y={s.lbl.y} textAnchor="middle" fill={s.lbl.c} fontSize="9" fontWeight="900" fontFamily="monospace" style={{opacity:pOp}}>{s.lbl.text}</text>}
      {s.irfna&&<g style={{opacity:pOp}}><circle cx={120} cy={48} r={lp(3,25,pMv)} fill={`${s.prodColor||"#ff6600"}10`}/><circle cx={120} cy={47} r={lp(2,14,pMv)} fill={s.prodColor||"#ff6600"} style={{filter:pOp>0.5?`drop-shadow(0 0 8px ${s.prodColor||"#ff6600"}70)`:"none"}}/>{pMv>0.5&&<text x={120} y={72} textAnchor="middle" fill={s.prodColor||"#ff8800"} fontSize="11" fontWeight="900" fontFamily="monospace" style={{opacity:pMv}}>{s.prodName||"IRFNA"}</text>}</g>}
    </svg>
  </div></div>
  <div dir="ltr" style={{padding:"8px 14px",margin:"8px 0",background:`${pr.color}06`,borderRadius:8,border:`1px solid ${pr.color}10`,textAlign:"center"}}>
    <div className="mn" style={{fontSize:14,fontWeight:800,color:P.white}}>{s.eq}</div>
    <div className="mn" style={{fontSize:8,color:pr.color,marginTop:2}}>{s.cond}</div>
  </div>
  <p style={{fontSize:12,color:P.muted,lineHeight:1.8,padding:"0 4px"}}>{s.desc}</p>
  <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:10}}>
    <button onClick={replay} className="ta" style={{padding:"6px 12px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer"}}>{"\u21BB"} {he?"שוב":"Replay"}</button>
    <button onClick={()=>setAu(a=>!a)} className={au?"ti":"ta"} style={{padding:"6px 12px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer"}}>{au?(he?"\u23F8 \u05E2\u05E6\u05D5\u05E8":"\u23F8 Stop"):(he?"\u25B6 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9":"\u25B6 Auto")}</button>
    <button onClick={()=>{const maxS=pr.steps.length;if(step<maxS-1)setStep(v=>v+1);else{setStep(0);setProc(v=>(v+1)%3);}setAu(false);}} className="ta" style={{padding:"6px 12px",borderRadius:6,fontSize:10,fontWeight:700,cursor:"pointer"}}>{he?"\u05D4\u05D1\u05D0 \u2190":"Next \u2190"}</button>
  </div>
</Sec>;}



/* ═══ SUPPLY CHAIN ═══ */
function SupplyChain({lang}:{lang:string}){const he=lang==="he";const[hov,setHov]=useState<string|null>(null);
const chain=[
  {id:"raw",icon:"⛏️",n:he?"חומרי גלם":"Raw Materials",items:he?["אמוניה (NH₃)","גופרית","הקסאמין"]:["Ammonia (NH₃)","Sulfur","Hexamine"],c:"#3b82f6",struck:false},
  {id:"proc",icon:"⚗️",n:he?"עיבוד כימי":"Chemical Processing",items:he?["אוסטוולד ← HNO₃","רשיג ← UDMH","בכמן ← RDX/HMX"]:["Ostwald → HNO₃","Raschig → UDMH","Bachmann → RDX/HMX"],c:"#7c3aed",struck:true,strike:he?"מתקני HNO₃ שיראז (2026)":"Shiraz HNO₃ plants (2026)"},
  {id:"fuel",icon:"🧪",n:he?"דלקים ומחמצנים":"Fuels & Oxidizers",items:["IRFNA","UDMH","NTO","AP+HTPB"],c:"#dc2626",struck:true,strike:he?"South Pars — אמוניה (2/2026)":"South Pars — ammonia (2/2026)"},
  {id:"mix",icon:"🔄",n:he?"ערבוב ויציקה":"Mixing & Casting",items:he?["מערבלים פלנטריים (מסין)","בורות יציקה (6-10 ימים)"]:["Planetary mixers (China)","Casting pits (6-10 days)"],c:"#b45309",struck:true,strike:he?"פרצ׳ין + ח׳וג׳יר + שאהרוד (10/2024)":"Parchin + Khojir + Shahrud (10/2024)"},
  {id:"asm",icon:"🔧",n:he?"הרכבת טיל":"Missile Assembly",items:he?["מנוע + ראש קרב","מערכת הנחיה INS+GPS","בדיקות"]:["Engine + warhead","Guidance INS+GPS","Testing"],c:"#059669",struck:true,strike:he?"ח׳וג׳יר SHIG/SBIG (10/2024)":"Khojir SHIG/SBIG (10/2024)"},
  {id:"launch",icon:"🚀",n:he?"פריסה ושיגור":"Deploy & Launch",items:he?["TEL נייד","תדלוק / כוננות","שיגור"]:["Mobile TEL","Fueling / readiness","Launch"],c:"#64748b",struck:true,strike:he?"משגרים ניידים — הושמדו חלקית":"Mobile TELs — partially destroyed"},
];
const nuc={icon:"☢️",n:he?"עדשות גרעיניות":"Nuclear Lenses",c:"#dc2626",strike:he?"פורדו / נתנז / אספהאן (6/2025)":"Fordow / Natanz / Isfahan (6/2025)"};
return<Sec id="supplychain" num="15" title={he?"שרשרת האספקה — מחומר גלם לטיל":"Supply Chain — Raw Material to Missile"} subtitle={he?"💥 = נקודת פגיעה בתקיפות":"💥 = Strike impact point"} dark>
  <div style={{display:"flex",flexDirection:"column",gap:0}}>
    {chain.map((s,i)=><div key={s.id}><div onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)} style={{display:"flex",gap:12,padding:14,borderRadius:12,background:hov===s.id?`${s.c}12`:`${P.white}03`,border:`1px solid ${hov===s.id?s.c+"35":P.white+"06"}`,transition:"all 0.2s",cursor:"pointer",position:"relative"}}>
      <div style={{fontSize:26,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,background:`${s.c}12`,flexShrink:0}}>{s.icon}</div>
      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:800,color:s.c,marginBottom:3}}>{s.n}</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{s.items.map(it=><span key={it} style={{fontSize:10,padding:"2px 8px",borderRadius:4,background:`${P.white}05`,color:P.muted}}>{it}</span>)}</div></div>
      {s.struck&&<div style={{position:"absolute",top:-6,[he?"left":"right"]:10,background:"#ef4444",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 8px",borderRadius:5,boxShadow:"0 2px 8px rgba(239,68,68,0.4)",whiteSpace:"nowrap"}}>💥 {s.strike}</div>}
    </div>
    {i<chain.length-1&&<div style={{display:"flex",justifyContent:"center",padding:"3px 0"}}><div style={{width:0,height:0,borderLeft:"6px solid transparent",borderRight:"6px solid transparent",borderTop:`10px solid ${s.c}40`}}/></div>}
    {s.id==="fuel"&&<div style={{margin:"4px 0 4px 40px",display:"flex",alignItems:"center",gap:8}}><div style={{width:20,height:1,background:"#dc2626",transform:"rotate(45deg)"}}/><div style={{padding:"6px 12px",borderRadius:8,background:"#dc262610",border:"1px solid #dc262625",position:"relative"}}><span style={{fontSize:10,fontWeight:700,color:"#dc2626"}}>{nuc.icon} {nuc.n}</span><div style={{position:"absolute",top:-5,left:8,background:"#ef4444",color:"#fff",fontSize:7,fontWeight:800,padding:"1px 6px",borderRadius:4}}>💥 {nuc.strike}</div></div></div>}
    </div>)}
  </div>
</Sec>;}

/* ═══ CHEMISTRY — after processes, expanded with PubChem data ═══ */
function Chemistry({lang}:{lang:string}){const[tab,setTab]=useState(0);const he=lang==="he";
const ch=[
  {id:"IRFNA",nm:he?"חומצה חנקתית מעושנת אדומה מעוכבת":"Inhibited Red Fuming Nitric Acid",erg:"157",
   ps:[[he?"הרכב":"Composition","HNO₃ ≥70% + N₂O₄ 18-27% + HF 0.6%"],[he?"מראה":"Appearance",he?"נוזל כתום-אדום, אדים צהובים-חומים":"Orange-red liquid, yellow-brown fumes"],[he?"ריח":"Odor",he?"חנקני חריף, חודר ומחניק":"Sharp, penetrating, suffocating nitric odor"],[he?"צפיפות":"Density","1.55 g/cm³"],[he?"נקודת רתיחה":"Boiling Point","64°C"],[he?"נקודת קפאון":"Freezing Point","-52°C"],[he?"לחץ אדים":"Vapor Pressure","~48 mmHg @ 20°C"],[he?"צפיפות אדים":"Vapor Density",he?"~2.2 (כבד מאוויר)":"~2.2 (heavier than air)"]],
   ds:[[he?"עור — גורם לכוויות כימיות חמורות והרס רקמות מיידי":"Skin — causes severe chemical burns and immediate tissue destruction"],[he?"עיניים — עיוורון תוך שניות מחשיפה ישירה":"Eyes — blindness within seconds of direct exposure"],[he?"שאיפה — בצקת ריאות מושהית: 24-48 שעות אחרי חשיפה, הצפת ריאות פתאומית וכשל נשימתי. חשוף שנראה בסדר עלול למות למחרת!":"Inhalation — delayed pulmonary edema: 24-48h after exposure, sudden lung flooding and respiratory failure. Exposed person who looks fine may die the next day!"]]},
  {id:"UDMH",nm:he?"דימתילהידראזין בלתי סימטרי":"Unsymmetrical Dimethylhydrazine (1,1-DMH)",erg:"131",
   ps:[["CAS","57-14-7"],[he?"נוסחה":"Formula","H₂NN(CH₃)₂ — C₂H₈N₂"],[he?"מראה":"Appearance",he?"נוזל שקוף, צהביב עם חשיפה לאוויר":"Clear liquid, turns yellowish on air exposure"],[he?"ריח":"Odor",he?"חריף — דמוי אמוניה ודגים":"Sharp — ammonia-like and fishy"],[he?"נקודת רתיחה":"Boiling Point","63°C"],[he?"נקודת הבזק":"Flash Point","-15°C"],[he?"טווח דליקות":"Flammability Range","2.5% — 95% (!)"], [he?"צפיפות":"Density","0.793 g/cm³"],[he?"מסיסות":"Solubility",he?"מסיס לחלוטין במים, אתנול, קרוסין":"Fully miscible in water, ethanol, kerosene"]],
   ds:[["IDLH: Ca [15 ppm] — IARC Group 2B ("+( he?"מסרטן סביר לאדם":"probably carcinogenic")+")"],[he?"חודר דרך עור שלם! נספג לזרם הדם ללא פצע חיצוני":"Penetrates intact skin! Absorbed into bloodstream without visible wound"],[he?"תוצרי פירוק: NDMA (דימתיל-ניטרוזאמין, מסרטן חזק) + פורמלדהיד + HCN (ציאניד). מזהמים קרקע עד 6 שבועות":"Decomposition: NDMA (strong carcinogen) + formaldehyde + HCN (cyanide). Contaminates soil up to 6 weeks"]]},
  {id:"NTO",nm:he?"חנקן טטראוקסיד — N₂O₄":"Nitrogen Tetroxide — N₂O₄",erg:"124",
   ps:[["CAS","10544-72-6"],[he?"נוסחה":"Formula","N₂O₄ ⇌ 2NO₂"],[he?"מראה":"Appearance",he?"נוזל חום-אדום עם אדים חומים כבדים":"Reddish-brown liquid with heavy brown fumes"],[he?"ריח":"Odor",he?"חריף, חנקני, דומה לכלור":"Sharp, nitric, chlorine-like"],[he?"נקודת רתיחה":"Boiling Point",he?"21.15°C — מתאדה בטמפ׳ החדר!":"21.15°C — evaporates at room temp!"],[he?"צפיפות":"Density","1.448 g/cm³"],[he?"צפיפות אדים":"Vapor Density",he?"3.17 (כבד מאוויר, שוקע)":"3.17 (heavier, sinks)"]],
   ds:[[he?"קטלני בשאיפה! כמו IRFNA — בצקת ריאות מושהית 24-48 שעות":"Lethal by inhalation! Like IRFNA — delayed pulmonary edema 24-48h"],[he?"מגיב עם מים ברקמות הגוף ויוצר חומצה חנקתית (HNO₃) — שורף מבפנים":"Reacts with body tissue water to form nitric acid (HNO₃) — burns from inside"],[he?"משמש כמחמצן בטיל ח׳ורמשהר — המדויק והכבד ביותר בארסנל (CEP ~30 מ׳, 1,500 ק״ג)":"Used as oxidizer in Khorramshahr missile — most accurate and heaviest in arsenal (CEP ~30m, 1,500 kg)"]]},
  {id:"AP/HTPB",nm:he?"דלק מוצק קומפוזיט":"Composite Solid Propellant",erg:"—",
   ps:[[he?"מחמצן":"Oxidizer",he?"אמוניום פרכלורט (NH₄ClO₄) — ~70% מהמשקל":"Ammonium Perchlorate (NH₄ClO₄) — ~70% by weight"],[he?"מאגד/דלק":"Binder/Fuel","HTPB (Hydroxyl-Terminated Polybutadiene) — ~15%"],[he?"מתכת":"Metal Fuel",he?"אבקת אלומיניום (Al) — ~15%. מעלה טמפרטורה ואנרגיה":"Aluminum powder (Al) — ~15%. Raises temperature and energy"],[he?"תוספות":"Additives","RDX/HMX ("+( he?"בטילים מתקדמים":"in advanced missiles")+")"]],
   ds:[[he?"בעירה עצמית — ברגע שמתחילה, בלתי ניתנת לכיבוי! לא ניתן לעצור מנוע מוצק":"Self-sustaining combustion — once started, cannot be extinguished! Cannot stop solid motor"],[he?"תוצרי בעירה: HCl (חומצת מלח) + NOx (תחמוצות חנקן) + CO (פחמן חד-חמצני) + Al₂O₃ (אבק אלומינה)":"Combustion products: HCl + NOx + CO + Al₂O₃"],[he?"אמוניום פרכלורט מזהם מי תהום — בעיה סביבתית חמורה באזורי ייצור ושיגור":"Ammonium perchlorate contaminates groundwater — severe environmental issue near production/launch sites"]]},
];const c=ch[tab];
return<Sec id="chemistry" num="11" title={he?"תכונות פיסיקליות וכימיות של הדלקים":"Fuel Physical & Chemical Properties"} subtitle={he?"מקורות: PubChem, NIOSH, CAMEO":"Sources: PubChem, NIOSH, CAMEO"} sidebar={<><SB color="red" title={he?"⚠️ בצקת ריאות מושהית":"⚠️ Delayed Pulmonary Edema"}><p>{he?"סיכון ייחודי לנפגעי IRFNA ו-NTO: הנפגע עשוי להרגיש בסדר מיד לאחר החשיפה, אך 24-48 שעות מאוחר יותר — הצפת ריאות פתאומית וכשל נשימתי קטלני.":"Unique risk for IRFNA & NTO victims: may feel fine immediately after exposure, but 24-48 hours later — sudden lung flooding and fatal respiratory failure."}</p><p style={{fontWeight:700,marginTop:6}}>{he?"כל חשוף חייב אשפוז מיידי למעקב!":"Every exposed person must be immediately hospitalized for observation!"}</p></SB></>}>
  <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>{ch.map((x,i)=><button key={i} onClick={()=>setTab(i)} className={tab===i?"ta":"ti"} style={{padding:"8px 18px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.id}</button>)}</div>
  <div className="cm" style={{padding:24,overflow:"hidden"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8}}>
      <h3 className="sf" style={{fontSize:18,fontWeight:800}}>{c.id} — {c.nm}</h3>
      {c.erg!=="—"&&<span className="mn" style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:700,background:P.blueS,color:P.blue}}>ERG Guide {c.erg}</span>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>
      <div style={{overflow:"hidden"}}><h4 style={{fontSize:10,fontWeight:800,color:P.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>{he?"תכונות פיסיקליות":"PHYSICAL PROPERTIES"}</h4>{c.ps.map((p,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${P.border}40`,fontSize:13,display:"flex",justifyContent:"space-between",gap:8}}><span style={{color:P.muted,flexShrink:0}}>{p[0]}:</span><span style={{fontWeight:500,textAlign:"left",overflowWrap:"anywhere",minWidth:0}} dir="ltr">{p[1]}</span></div>)}</div>
      <div style={{overflow:"hidden"}}><h4 style={{fontSize:10,fontWeight:800,color:P.red,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>⚠️ {he?"סיכונים":"HAZARDS"}</h4>{c.ds.map((d,i)=><div key={i} style={{padding:"8px",background:`${P.red}06`,borderRadius:4,marginBottom:6,fontSize:12,color:P.red,fontWeight:500,lineHeight:1.6,overflowWrap:"anywhere"}}>{d[0]}</div>)}</div>
    </div>
  </div>
</Sec>;}

/* ═══ HAZMAT + ERG — UNIFIED ═══ */
function HazMat({lang}:{lang:string}){const he=lang==="he";const[sel,setSel]=useState<string|null>(null);const[tab,setTab]=useState("act");
const cards=[
  {id:"irfna",name:"IRFNA",full:he?"חומצה חנקתית מעושנת אדומה מעוכבת":"Inhibited Red Fuming Nitric Acid",erg:"157",un:"2032",c:"#dc2626",
   look:he?"נוזל כתום-אדום, אדים צהובים":"Orange-red liquid, yellow fumes",smell:he?"חנקני חריף":"Sharp nitric",
   iso:{n:"50 מ׳",s:"150 מ׳",f:"800 מ׳"},
   ppe:he?"חליפת מגן רמה A + מנ״פ":"Level A + SCBA",
   act:he?["ספיחת שלולית: חול יבש / ורמיקוליט ← מכל אטום","ענן אדים: ריסוס ערפל מים (לא סילון!) למיהול והפזרה","ניטרול: NaHCO₃ מדורג — לעולם לא בבת אחת! (אקזותרמי)","קירור מכלים: ערפל מים למניעת לחץ יתר","כלים ללא ניצוץ — מגיב עם מתכות"]:["Absorb pool: dry sand / vermiculite → sealed container","Vapor: water fog spray (NOT jet!) to dilute & disperse","Neutralize: NaHCO₃ gradually — never all at once! (exothermic)","Cool containers: water fog to prevent overpressure","Non-sparking tools — reacts with metals"],
   med:he?["הפשטת בגדים (חיתוך!) → שקית אטומה","שטיפה בזרם מים 15+ דקות — עיניים קודם","חמצן 100%","⚠️ בצקת ריאות מושהית 24-48 שעות!","כל חשוף = אשפוז 48 שעות גם אם נראה תקין"]:["Remove clothes (cut!) → sealed bag","Flush 15+ min — eyes first","100% O₂","⚠️ Delayed pulmonary edema 24-48h!","All exposed = hospitalize 48h even if normal"],
   warn:he?"⚡ מגע עם UDMH = הצתה ספונטנית!":"⚡ Contact with UDMH = spontaneous ignition!"},
  {id:"udmh",name:"UDMH",full:he?"דימתילהידראזין בלתי סימטרי":"Unsymmetrical Dimethylhydrazine",erg:"131",un:"1163",c:"#7c3aed",
   look:he?"שקוף, צהביב באוויר":"Clear, yellows in air",smell:he?"אמוניה + דגים":"Ammonia + fish",
   iso:{n:"100 מ׳",s:"300 מ׳",f:"600 מ׳"},
   ppe:he?"חליפת מגן רמה A + מנ״פ":"Level A + SCBA",
   act:he?["ספיחה: חומר סופח + מים בכמות גדולה למיהול","כיבוי: ערפל מים + קצף AR-AFFF","איסוף כפסולת מסוכנת — קרקע מזוהמת עד 6 שבועות","☠️ תוצרי פירוק: NDMA (מסרטן) + פורמלדהיד + HCN","טווח דליקות: 2.5%-95% — כמעט כל ריכוז דליק!"]:["Absorb + large water volume dilution","Suppress: water fog + AR-AFFF foam","Collect as hazardous waste — soil contaminated 6 weeks","☠️ Decomposition: NDMA (carcinogen) + formaldehyde + HCN","Flammability: 2.5%-95% — almost any concentration burns!"],
   med:he?["הפשטת בגדים (חיתוך!) — חודר עור שלם!","שטיפה 15+ דקות","⚠️ נספג לדם דרך עור ללא פצע נראה","💊 נוגדן: ויטמין B6 (פירידוקסין) 25 מ״ג/ק״ג IV","ניטור כבד (רעילות כבדית) + כליות"]:["Remove clothes (cut!) — penetrates intact skin!","Flush 15+ min","⚠️ Absorbed through skin without visible wound","💊 Antidote: Vitamin B6 (Pyridoxine) 25 mg/kg IV","Monitor liver (hepatotoxic) + kidneys"],
   warn:he?"מסרטן IARC 2B | חודר עור שלם | דליק 2.5%-95%":"Carcinogen IARC 2B | Skin penetrant | Flam. 2.5%-95%"},
  {id:"nto",name:"NTO (N₂O₄)",full:he?"חנקן טטראוקסיד":"Nitrogen Tetroxide",erg:"124",un:"1067",c:"#b45309",
   look:he?"חום-אדום, אדים חומים כבדים":"Reddish-brown, heavy fumes",smell:he?"חנקני, דמוי כלור":"Nitric, chlorine-like",
   iso:{n:"100 מ׳",s:"200 מ׳",f:"800 מ׳"},
   ppe:he?"חליפת מגן רמה A + מנ״פ":"Level A + SCBA",
   act:he?["⚠️ רותח ב-21°C — מתאדה בטמפ׳ החדר! כל דליפה = ענן גז מיידי","ספיחה: חול / ורמיקוליט ← מכל אטום","ערפל מים על ענן הגז למיהול","ניטרול: NaHCO₃ מדורג","צפיפות אדים 3.17 — גז שוקע לשטח נמוך!"]:["⚠️ Boils at 21°C — evaporates at room temp! Any leak = instant gas cloud","Absorb: sand / vermiculite → sealed container","Water fog on gas cloud to dilute","Neutralize: NaHCO₃ gradually","Vapor density 3.17 — gas sinks to low ground!"],
   med:he?["שטיפה 15+ דקות","חמצן 100%","⚠️ בצקת ריאות מושהית 24-48 שעות — כמו IRFNA!","מגיב עם מים ברקמות הגוף → יוצר HNO₃ פנימי","כל חשוף = אשפוז 48 שעות"]:["Flush 15+ min","100% O₂","⚠️ Delayed pulmonary edema 24-48h — same as IRFNA!","Reacts with body tissue water → creates internal HNO₃","All exposed = hospitalize 48h"],
   warn:he?"קטלני בשאיפה! רותח 21°C = ענן גז מיידי":"Lethal by inhalation! BP 21°C = instant gas cloud"},
];
const card=sel?cards.find(c=>c.id===sel):null;
return<Sec id="hazmat" num="12" title={he?"מענה חומ״ס — כרטיסי שטח ERG 2024":"HazMat Response — ERG 2024 Field Cards"} subtitle={he?"בידוד, מיגון, ספיחה, ניטרול ורפואי — לחץ על חומר לפרוטוקול":"Isolation, PPE, absorption, neutralization & medical — tap for protocol"} dark>
  <div style={{display:"flex",gap:8,marginBottom:16,justifyContent:"center"}}>
    {cards.map(c=><button key={c.id} onClick={()=>{setSel(c.id);setTab("act");}} style={{flex:1,maxWidth:120,padding:"12px 8px",borderRadius:12,border:sel===c.id?`2px solid ${c.c}`:`2px solid ${P.border}`,background:sel===c.id?`${c.c}15`:P.white,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
      <div style={{fontSize:12,fontWeight:800,color:sel===c.id?c.c:P.muted}}>{c.name}</div>
      <div style={{fontSize:9,color:P.muted,marginTop:2}}>ERG {c.erg} | UN {c.un}</div>
    </button>)}
  </div>
  {card&&<div style={{background:P.ink,borderRadius:14,border:`1px solid ${card.c}40`,overflow:"hidden",maxWidth:"100%"}}>
    {/* Header */}
    <div style={{background:`${card.c}12`,padding:16,borderBottom:`1px solid ${card.c}25`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:20,fontWeight:900,color:card.c}}>{card.name}</span>
        <div style={{display:"flex",gap:6}}>
          <span className="mn" style={{padding:"3px 8px",borderRadius:5,fontSize:10,fontWeight:700,background:`${card.c}20`,color:card.c}}>ERG {card.erg}</span>
          <span className="mn" style={{padding:"3px 8px",borderRadius:5,fontSize:10,fontWeight:700,background:`${P.white}10`,color:`${P.white}70`}}>UN {card.un}</span>
        </div>
      </div>
      <div style={{fontSize:12,color:`${P.white}cc`}}>{card.full}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
        <div style={{background:`${P.white}08`,padding:"7px 10px",borderRadius:6}}><div style={{fontSize:9,color:`${P.white}60`}}>{he?"מראה":"Look"}</div><div style={{fontSize:11,color:`${P.white}cc`}}>{card.look}</div></div>
        <div style={{background:`${P.white}08`,padding:"7px 10px",borderRadius:6}}><div style={{fontSize:9,color:`${P.white}60`}}>{he?"ריח":"Odor"}</div><div style={{fontSize:11,color:`${P.white}cc`}}>{card.smell}</div></div>
      </div>
      <div style={{marginTop:10,padding:"8px 12px",background:"#ef444418",borderRadius:8,border:"1px solid #ef444430",fontSize:12,fontWeight:700,color:"#fca5a5",textAlign:"center"}}>🚨 {card.warn}</div>
    </div>
    {/* Isolation */}
    <div style={{display:"flex",justifyContent:"space-around",padding:"12px",background:`${P.white}04`,borderBottom:`1px solid ${P.white}08`}}>
      {[{l:he?"בידוד":"Isolate",v:card.iso.n,c:"#22c55e"},{l:he?"דליפה":"Spill",v:card.iso.s,c:"#f59e0b"},{l:he?"אש":"Fire",v:card.iso.f,c:"#ef4444"}].map(d=><div key={d.l} style={{textAlign:"center"}}><div className="mn" style={{fontSize:18,fontWeight:900,color:d.c}}>{d.v}</div><div style={{fontSize:9,color:`${P.white}60`}}>{d.l}</div></div>)}
    </div>
    {/* PPE */}
    <div style={{padding:"10px 16px",background:"#7c3aed10",borderBottom:`1px solid ${P.white}08`,fontSize:12,fontWeight:700,color:"#c4b5fd",textAlign:"center"}}>🧑‍🚀 {card.ppe}</div>
    {/* Tabs */}
    <div style={{display:"flex",borderBottom:`1px solid ${P.white}08`}}>
      {[{k:"act",l:he?"🧪 פעולה":"🧪 Action",c:"#22c55e"},{k:"med",l:he?"🏥 רפואי":"🏥 Medical",c:"#ef4444"}].map(t=><button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:11,border:"none",background:tab===t.k?`${t.c}12`:"transparent",color:tab===t.k?t.c:`${P.white}40`,fontSize:13,fontWeight:tab===t.k?800:500,cursor:"pointer",borderBottom:tab===t.k?`2px solid ${t.c}`:"2px solid transparent",fontFamily:"'Heebo',sans-serif"}}>{t.l}</button>)}
    </div>
    {/* Content */}
    <div style={{padding:16}}>
      {(tab==="act"?card.act:card.med).map((item,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"9px 0",borderBottom:i<(tab==="act"?card.act:card.med).length-1?`1px solid ${P.white}06`:"none"}}>
        <div style={{width:22,height:22,borderRadius:"50%",background:tab==="act"?"#22c55e18":"#ef444418",color:tab==="act"?"#22c55e":"#ef4444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,flexShrink:0}}>{i+1}</div>
        <div style={{fontSize:13,color:`${P.white}dd`,lineHeight:1.7,paddingTop:1}}>{item}</div>
      </div>)}
    </div>
  </div>}
  {!card&&<div style={{textAlign:"center",padding:"40px 20px",color:P.muted}}><div style={{fontSize:32,marginBottom:8}}>☝️</div><div style={{fontSize:13}}>{he?"בחר חומר למעלה":"Select a substance above"}</div></div>}
</Sec>;}

/* ═══ MEDICAL — expanded ═══ */
function Medical({lang}:{lang:string}){const he=lang==="he";
return<Sec id="medical" num="13" title={he?"פרוטוקול רפואי":"Medical Protocol"} subtitle={he?"טיפול בנפגעי דלקי טילים":"Treatment for missile fuel casualties"}>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
    <div className="cm" style={{padding:20,borderRight:`3px solid ${P.red}`}}>
      <h4 className="sf" style={{fontWeight:800,fontSize:15,color:P.red,marginBottom:12}}>{he?"שלב 1 — בזירה":"Stage 1 — On Scene"}</h4>
      <div style={{fontSize:13,color:P.steel,lineHeight:1.8}}>
        <p>• {he?"חילוץ מיידי מאזור הענן — במעלה הרוח":"Immediate extraction from cloud zone — upwind"}</p>
        <p>• {he?"הפשטת כל הבגדים (חיתוך, לא משיכה מעל הראש) — בגדים מזוהמים בשקית אטומה":"Remove all clothing (cut off, don't pull over head) — contaminated clothes in sealed bag"}</p>
        <p>• {he?"שטיפה בזרם מים רב (15+ דקות) — עדיפות לעיניים":"Flush with large water stream (15+ minutes) — eyes priority"}</p>
        <p>• {he?"חמצן 100% בשאיפה":"100% oxygen by inhalation"}</p>
        <p style={{fontWeight:700,color:P.red}}>• {he?"גם אם הנפגע נראה תקין — פינוי לאשפוז חובה!":"Even if patient appears normal — hospital transfer mandatory!"}</p>
      </div>
    </div>
    <div className="cm" style={{padding:20,borderRight:`3px solid ${P.purple}`}}>
      <h4 className="sf" style={{fontWeight:800,fontSize:15,color:P.purple,marginBottom:12}}>{he?"שלב 2 — אשפוז (24-48 שעות)":"Stage 2 — Hospital (24-48h)"}</h4>
      <div style={{fontSize:13,color:P.steel,lineHeight:1.8}}>
        <p>• {he?"מעקב רציף — בצקת ריאות עלולה להופיע רק לאחר 24-48 שעות":"Continuous monitoring — pulmonary edema may appear only after 24-48h"}</p>
        <p>• {he?"משתנים (פורוסמיד / לאסיקס) — הפחתת עומס נוזלים":"Diuretics (Furosemide/Lasix) — reduce fluid overload"}</p>
        <p>• {he?"דובוטמין — תמיכה בתפקוד הלב":"Dobutamine — cardiac support"}</p>
        <p>• {he?"קורטיקוסטרואידים — הפחתת דלקת ריאתית":"Corticosteroids — reduce pulmonary inflammation"}</p>
        <p>• {he?"גז NO בשאיפה (iNO) — הרחבת כלי דם ריאתיים":"Inhaled Nitric Oxide (iNO) — pulmonary vasodilation"}</p>
        <p>• {he?"מורפיום — הפחתת חרדה ועומס לבבי":"Morphine — reduce anxiety and cardiac preload"}</p>
      </div>
    </div>
    <div className="cm" style={{padding:20,borderRight:`3px solid ${P.amber}`}}>
      <h4 className="sf" style={{fontWeight:800,fontSize:15,color:P.amber,marginBottom:12}}>{he?"טיפול ייחודי ל-UDMH":"UDMH-Specific Treatment"}</h4>
      <div style={{fontSize:13,color:P.steel,lineHeight:1.8}}>
        <p>• {he?"פירידוקסין (ויטמין B6) — נוגדן ספציפי! UDMH גורם לעוויתות ע״י חסימת B6 בגוף":"Pyridoxine (Vitamin B6) — specific antidote! UDMH causes seizures by blocking B6 in body"}</p>
        <p>• {he?"מינון: 25 מ״ג/ק״ג IV, ניתן לחזור":"Dose: 25 mg/kg IV, may repeat"}</p>
        <p>• {he?"ניטור כבד — UDMH מזיק לכבד (רעילות כבדית)":"Liver monitoring — UDMH is hepatotoxic"}</p>
        <p>• {he?"ניטור כליות — פירוק UDMH מייצר תוצרים רעילים לכליות":"Kidney monitoring — UDMH breakdown produces nephrotoxic products"}</p>
      </div>
    </div>
  </div>
</Sec>;}

/* ═══ STRATEGIC — expanded explanation ═══ */
function Strategic({lang}:{lang:string}){const he=lang==="he";
return<Sec id="strategic" num="14" title={he?"למה HNO₃ הוא חומר מפתח בייצור טילים?":"Why is HNO₃ a Key Material in Missile Production?"} dark sidebar={<SB color="red" title={he?"🔑 המשמעות":"🔑 Significance"}><p>{he?"פגיעה במתקן אחד לייצור חומצה חנקתית משתקת בו-זמנית ארבע יכולות נשק שונות. לאיראן אין חומר גלם אחר עם השפעה כה רחבה.":"Hitting a single nitric acid plant simultaneously paralyzes four different weapon capabilities. Iran has no other raw material with such broad impact."}</p></SB>}>
  <div style={{padding:24,marginBottom:20,background:P.ink,borderRadius:10,border:`1px solid ${P.gold}30`}}>
    <p style={{fontSize:15,color:"#ffffff",lineHeight:2,marginBottom:20,fontWeight:500}}>{he?"חומצה חנקתית (HNO₃) מיוצרת בתהליך אוסטוולד מאמוניה. זהו חומר הגלם הבסיסי ביותר בשרשרת הנשק האיראנית. ממנו מייצרים ארבעה מוצרים קריטיים שונים — ולכן פגיעה במתקן ייצור אחד של חומצה חנקתית משתקת ארבע מערכות נשק בו-זמנית:":"Nitric acid (HNO₃) is produced via the Ostwald process from ammonia. It is the most fundamental precursor in Iran's weapons chain. Four different critical products are derived from it — which is why hitting a single nitric acid production facility paralyzes four weapon systems simultaneously:"}</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
      {[{ic:"💧",t:he?"מחמצן IRFNA":"IRFNA Oxidizer",d:he?"HNO₃ + N₂O₄ + HF ← IRFNA. דלק טילים נוזליים: שהאב, גדר, קיאם, עמאד":"HNO₃ + N₂O₄ + HF ← IRFNA. Liquid missiles: Shahab, Ghadr, Qiam, Emad",bg:P.blueS,c:P.blue},
        {ic:"🧊",t:he?"מחמצן NTO":"NTO Oxidizer",d:he?"מ-HNO₃ מופק N₂O₄ — מחמצן לטיל ח׳ורמשהר (המדויק ביותר)":"N₂O₄ derived from HNO₃ — oxidizer for Khorramshahr (most accurate)",bg:P.purpleS,c:P.purple},
        {ic:"💣",t:he?"חומרי נפץ":"Explosives",d:he?"HNO₃ + הקסאמין ← RDX/HMX (תהליך בכמן). משמשים בראשי קרב ובדלק מוצק":"HNO₃ + hexamine → RDX/HMX (Bachmann). Used in warheads and solid fuel",bg:P.amberS,c:P.amber},
        {ic:"☢️",t:he?"עדשות גרעיניות":"Nuclear Lenses",d:he?"HMX משמש בעדשות קריסה (Implosion Lenses) — מרכיב קריטי בנשק גרעיני":"HMX used in Implosion Lenses — critical nuclear weapon component",bg:P.redS,c:P.red},
      ].map((x,i)=><div key={i} style={{padding:16,background:P.navy,textAlign:"center",borderRadius:10,border:`1px solid ${x.c}40`,boxShadow:`0 2px 12px ${x.c}15`}}>
        <div style={{fontSize:28,marginBottom:6}}>{x.ic}</div>
        <div style={{fontSize:13,fontWeight:800,color:x.c,marginBottom:8}}>{x.t}</div>
        <div style={{fontSize:11,color:"#e2e8f0",lineHeight:1.7,fontWeight:400}}>{x.d}</div>
      </div>)}
    </div>
  </div>
</Sec>;}

/* ═══ FACILITIES — with Google Maps + expandable ═══ */
function Facilities({lang}:{lang:string}){const he=lang==="he";const[openFac,setOpenFac]=useState<string|null>(null);
const fs=[
  {id:"parchin",n:he?"פרצ׳ין":"Parchin",s:he?"אוקטובר 2024":"Oct 2024",coords:"35.5122,51.7714",
   earth:"https://earth.google.com/web/@35.5122,51.7714,1200a,5000d,35y,0h,0t,0r",
   sat:"https://www.pbs.org/newshour/world/satellite-images-show-damage-from-israeli-strikes-at-2-secretive-iranian-military-bases",
   short:he?"PCI — ייצור HNO₃, חומרי נפץ. מתקן טאלקאן 2. 3 מבני ערבוב דלק מוצק הושמדו":"PCI — HNO₃, explosives. Talaqan-2. 3 solid fuel mixing buildings destroyed",
   details:he?["מתחם צבאי ענק ~40 ק״מ דרומית-מזרחית לטהרן","Parchin Chemical Industries (PCI) — ייצור חומצה חנקתית וחומרי נפץ","מתקן טאלקאן 2 — קשר ישיר לתוכנית הגרעין: ניסויי חומרי נפץ לעדשות קריסה","סה״כ לפחות 3 מבנים לערבוב דלק מוצק נהרסו בתקיפה","בדיקות IAEA מצאו עקבות אורניום באתר ב-2015","איראן שיפצה וחפתה חלקים מהמתקן לפני פיקוח בינלאומי"]:["Massive military complex ~40 km SE of Tehran","PCI — nitric acid and explosives production","Talaqan-2 facility — direct nuclear link: explosive lens testing","At least 3 solid fuel mixing buildings destroyed in strike","IAEA found uranium traces at site in 2015","Iran renovated/paved over sections before international inspections"]},
  {id:"khojir",n:he?"ח׳וג׳יר":"Khojir",s:he?"אוקטובר 2024":"Oct 2024",coords:"35.7280,51.5530",
   earth:"https://earth.google.com/web/@35.728,51.553,1200a,5000d,35y,0h,0t,0r",
   sat:"https://www.timesofisrael.com/satellite-images-show-damage-at-two-secretive-iranian-bases-after-israeli-strikes/",
   short:he?"SHIG+SBIG. דלק מוצק, הרכבת טילים. 2 מבני ערבוב + מערבלים פלנטריים":"SHIG+SBIG. Solid fuel, missile assembly. 2 mixing buildings + planetary mixers",
   details:he?["~20 ק״מ ממרכז טהרן. מערכת מנהרות תת-קרקעית","SHIG (Shahid Hemmat) — אחראי על טילים נוזליים","SBIG (Shahid Bakeri) — אחראי על טילים מוצקים","12 מערבלים פלנטריים הושמדו — ציוד ייחודי שאיראן אינה מייצרת","מערבלים יובאו מסין דרך חברות קש בהונג קונג","לוויינים הראו הרחבה משמעותית של המתקן לפני התקיפה"]:["~20 km from central Tehran. Underground tunnel system","SHIG (Shahid Hemmat) — liquid missile division","SBIG (Shahid Bakeri) — solid missile division","12 planetary mixers destroyed — unique equipment Iran cannot manufacture","Mixers imported from China via Hong Kong shell companies","Satellite imagery showed major expansion before strike"]},
  {id:"shahrud",n:he?"שאהרוד":"Shahrud",s:he?"אוקטובר 2024":"Oct 2024",coords:"36.4181,54.9764",
   earth:"https://earth.google.com/web/@36.4181,54.9764,1200a,8000d,35y,0h,0t,0r",
   sat:"https://thedefensepost.com/2024/11/02/israeli-strikes-hurt-iran-escalation-possible/",
   short:he?"ייצור מנועי טילים מוצקים. מערבלים ובורות יציקה":"Solid motor production. Mixers and casting pits",
   details:he?["מרכז ייצור מנועי טילים מוצקים בצפון-מזרח איראן","בורות יציקה תת-קרקעיים ליציקת סוללות דלק גדולות (6-10 ימים)","מערבלים פלנטריים נוספים שהושמדו","אחד משלושת המתקנים שזוהו ע״י IISS כקריטיים לייצור דלק מוצק","התקיפה פגעה בתשתית שלא ניתן לשחזר ללא יבוא חדש מסין"]:["Solid motor manufacturing center in NE Iran","Underground casting pits for large fuel grain casting (6-10 days)","Additional planetary mixers destroyed","One of three facilities identified by IISS as critical for solid fuel","Strike hit infrastructure that cannot be restored without new Chinese imports"]},
  {id:"fordow",n:he?"פורדו / נתנז / אספהאן":"Fordow / Natanz / Isfahan",s:he?"יוני 2025 (עם כלביא)":"Jun 2025 (Im Kalbia)",coords:"34.8854,50.9970",
   earth:"https://earth.google.com/web/@34.8854,50.997,1200a,5000d,35y,0h,0t,0r",
   sat:"https://www.jpost.com/israel-news/article-858449",
   short:he?"מתקני העשרת אורניום. ארה״ב הפציצה עם GBU-57. נזק כבד למרכזות":"Uranium enrichment. US struck with GBU-57. Heavy centrifuge damage",
   details:he?["פורדו — מתקן העשרה תת-קרקעי חפור בהר. מוגן ביותר","נתנז — המתקן הגדול ביותר. אלפי מרכזות IR-6 מתקדמות","אספהאן — המרת אורניום (UCF) + מחקר","ארה״ב הצטרפה למבצע ב-22 ביוני והפציצה עם פצצות GBU-57 חודרות בונקר","כל פצצת GBU-57 שוקלת ~14 טון וחודרת עד 60 מטר בסלע","לפי IAEA — 233 ק״ג אורניום ב-60% העשרה היו באתרים לפני התקיפה"]:["Fordow — underground enrichment in mountain. Most protected","Natanz — largest facility. Thousands of advanced IR-6 centrifuges","Isfahan — Uranium Conversion Facility (UCF) + research","US joined June 22, struck with GBU-57 bunker busters","Each GBU-57 weighs ~14 tons, penetrates up to 60m of rock","Per IAEA — 233 kg of 60% enriched uranium at sites before strike"]},
  {id:"southpars",n:he?"אסלויה / South Pars":"Asaluyeh / South Pars",s:he?"פברואר 2026 (שאגת הארי)":"Feb 2026 (Roaring Lion)",coords:"27.4753,52.6100",
   earth:"https://earth.google.com/web/@27.4753,52.61,500a,15000d,35y,0h,0t,0r",
   sat:"https://www.timesofisrael.com/satellite-images-begin-to-show-damage-wrought-across-the-region-by-iran-war/",
   short:he?"פטרוכימיה — אמוניה + HNO₃. 85% מהייצוא הפטרוכימי":"Petrochemicals — ammonia + HNO₃. 85% of petrochemical exports",
   details:he?["שדה הגז הטבעי הגדול ביותר בעולם (משותף עם קטאר)","מכיל מפעלי פטרוכימיה לייצור אמוניה — חומר הגלם לתהליך אוסטוולד","85% מייצוא הפטרוכימי האיראני מגיע מאזור זה","תקיפה באזור זה פוגעת בו-זמנית ביכולת ייצור דלקי טילים וגם בכלכלה","שריפה גדולה במתקן Phase 14 עצרה ייצור 12 מיליון מ״ק גז"]:["World's largest natural gas field (shared with Qatar)","Contains petrochemical plants producing ammonia — Ostwald process feedstock","85% of Iranian petrochemical exports come from this area","Strike simultaneously hits missile fuel production AND economy","Major fire at Phase 14 halted 12 million m³ gas production"]},
  {id:"shiraz",n:he?"מתקני HNO₃ (כולל שיראז)":"HNO₃ Plants (incl. Shiraz)",s:he?"2026 (מתמשך)":"2026 (ongoing)",coords:"29.5926,52.5836",
   earth:"https://earth.google.com/web/@29.5926,52.5836,1500a,10000d,35y,0h,0t,0r",
   sat:"https://www.bellingcat.com/resources/2026/04/07/tool-damage-assessment-destruction-sentinel-satellite-imagery-iran-us-gulf/",
   short:he?"ייצור חומצה חנקתית — צוואר הבקבוק הכימי של תוכנית הטילים":"Nitric acid production — chemical chokepoint of missile program",
   details:he?["מתקני ייצור חומצה חנקתית (תהליך אוסטוולד) פזורים ברחבי איראן","שיראז — אחד המתקנים האחרונים שנותרו פעילים","חומצה חנקתית = חומר הגלם ל-IRFNA, NTO, RDX/HMX ועדשות גרעיניות","השמדת המתקנים משתקת את כל שרשרת ייצור הנשק","מפעל לייצור טילים בליסטיים בשיראז נפגע כבר במבצע עם כלביא (יוני 2025)"]:["Nitric acid plants (Ostwald process) scattered across Iran","Shiraz — one of last remaining active facilities","Nitric acid = precursor for IRFNA, NTO, RDX/HMX and nuclear lenses","Destroying these plants paralyzes entire weapons production chain","Ballistic missile factory in Shiraz already hit during Im Kalbia (June 2025)"]},
];
return<Sec id="facilities" num="02" title={he?"מתקנים שהותקפו":"Facilities Struck"} subtitle={he?"שלוש גלי תקיפה: 10/2024, 6/2025, 2/2026+":"Three strike waves: 10/2024, 6/2025, 2/2026+"} sidebar={<SB color="amber" title={he?"📦 יבוא מסין":"📦 Chinese Imports"}><p>{he?"חברת הקש Pishgaman Tejarat Rafi Novin רכשה אלפי טונות נתרן פרכלורט מהונג קונג דרך נמל ג׳והאי. כמות ל~800 טילים מוצקים.":"Shell company purchased thousands of tons of sodium perchlorate from HK via Zhuhai. Enough for ~800 solid missiles."}</p></SB>}>
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {fs.map(f=><div key={f.id} className="cm" style={{padding:0,overflow:"hidden",borderRight:`3px solid ${P.red}`}}>
      <div style={{padding:"14px 16px",cursor:"pointer"}} onClick={()=>setOpenFac(openFac===f.id?null:f.id)}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",flex:1}}>
            <h4 style={{fontWeight:800,fontSize:15}}>{f.n}</h4>
            <span className="mn" style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:P.redS,color:P.red}}>{f.s}</span>
            <a href={`https://maps.google.com/?q=${f.coords}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,color:P.blue,textDecoration:"none",fontWeight:600}}>📍 Maps</a>
            <a href={f.earth} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,color:P.green,textDecoration:"none",fontWeight:600}}>🌍 Earth</a>
            <a href={f.sat} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:10,color:P.purple,textDecoration:"none",fontWeight:600}}>🛰️ {he?"לוויין":"Satellite"}</a>
          </div>
          <span style={{fontSize:16,color:P.gold,transition:"transform 0.2s",transform:openFac===f.id?"rotate(180deg)":"rotate(0)"}}>{openFac===f.id?"▲":"▼"}</span>
        </div>
        <p style={{fontSize:13,color:P.muted,marginTop:4,lineHeight:1.5}}>{f.short}</p>
      </div>
      {openFac===f.id&&<div style={{padding:"0 16px 14px",borderTop:`1px solid ${P.border}40`}}>
        {f.details.map((d,i)=><p key={i} style={{fontSize:12,color:P.steel,lineHeight:1.7,padding:"4px 0",paddingRight:12,borderRight:`2px solid ${P.red}15`}}>• {d}</p>)}
      </div>}
    </div>)}
  </div>
</Sec>;}

/* ═══ GLOSSARY — expanded ═══ */
function Glossary({lang}:{lang:string}){const[search,setSearch]=useState('');const[cat,setCat]=useState('all');const he=lang==="he";
const terms=[
  {t:'IRFNA',c:'chem',d:he?'Inhibited Red Fuming Nitric Acid — חומצה חנקתית מעושנת אדומה מעוכבת. הרכב: 70%+ HNO₃ + 18-27% N₂O₄ + 0.6% HF. נוזל כתום-אדום רעיל עם אדים חנקניים. המחמצן העיקרי בטילים נוזליים איראניים (שהאב, גדר, קיאם, עמאד). סימון סובייטי: AK-27.':'Inhibited Red Fuming Nitric Acid. 70%+ HNO₃ + 18-27% N₂O₄ + 0.6% HF. Toxic orange-red liquid with nitric fumes. Primary oxidizer in Iranian liquid missiles.'},
  {t:'UDMH',c:'chem',d:he?'Unsymmetrical Dimethylhydrazine — דימתילהידראזין בלתי סימטרי. נוסחה: H₂NN(CH₃)₂. נוזל שקוף עם ריח חריף של אמוניה ודגים. מסרטן (IARC 2B). חודר דרך עור שלם. רותח ב-63°C. טווח דליקות: 2.5%-95%. דלק הטילים הנפוץ בעולם.':'Clear liquid, ammonia/fish odor. CAS 57-14-7. Carcinogenic (IARC 2B). Penetrates intact skin. BP 63°C. Flammability 2.5%-95%. World\'s most common missile fuel.'},
  {t:'NTO (N₂O₄)',c:'chem',d:he?'Nitrogen Tetroxide — חנקן טטראוקסיד. נוזל חום-אדום עם אדים חומים. רותח בטמפרטורה של 21.15°C בלבד — מה שאומר שבכל דליפה בטמפרטורת חדר הוא מתאדה מיידית ויוצר ענן גז רעיל. משמש כמחמצן בטיל ח׳ורמשהר — הטיל האיראני המדויק ביותר (CEP ~30 מטר) והכבד ביותר (ראש קרב 1,500 ק״ג).':'Reddish-brown liquid with brown fumes. Boils at just 21.15°C — meaning any leak at room temperature instantly evaporates into a toxic gas cloud. Used as oxidizer in Khorramshahr — Iran\'s most accurate (CEP ~30m) and heaviest (1,500 kg warhead) missile.'},
  {t:'AP',c:'chem',d:he?'Ammonium Perchlorate (אמוניום פרכלורט) — NH₄ClO₄. אבקה לבנה גבישית. מהווה כ-70% ממשקל הדלק המוצק. משחרר חמצן בחימום ומאפשר בעירה עצמית ללא אוויר חיצוני. מיובא מסין — איראן אינה מסוגלת לייצר בכמויות מספיקות.':'NH₄ClO₄. White crystalline powder. ~70% of solid fuel by weight. Releases oxygen when heated, enabling self-sustaining combustion without external air. Imported from China.'},
  {t:'HTPB',c:'chem',d:he?'Hydroxyl-Terminated Polybutadiene — פוליבוטאדיאן עם קצוות הידרוקסיל. פולימר גמיש דמוי גומי. משמש כמאגד (מחבר את כל הרכיבים יחד) וגם כדלק — כ-15% מהתערובת המוצקה.':'Flexible rubber-like polymer. Serves as binder (holds all components together) and also as fuel — ~15% of solid mixture.'},
  {t:'HNO₃',c:'chem',d:he?'Nitric Acid — חומצה חנקתית. חומר הגלם הקריטי ביותר: ממנו מייצרים IRFNA (מחמצן טילים נוזליים), NTO (מחמצן ח׳ורמשהר), RDX/HMX (חומרי נפץ לראשי קרב ודלק מוצק), ועדשות קריסה גרעיניות. מיוצרת בתהליך אוסטוולד מאמוניה.':'The most critical precursor: produces IRFNA (liquid oxidizer), NTO (Khorramshahr oxidizer), RDX/HMX (warhead/solid fuel explosives), and nuclear implosion lenses. Produced via Ostwald process from ammonia.'},
  {t:he?'היפרגולי':'Hypergolic',c:'mil',d:he?'תגובה כימית שבה מגע ישיר בין דלק למחמצן גורם להצתה ספונטנית מיידית — ללא ניצוץ, מצת או חום חיצוני. רלוונטי רק לטילים נוזליים (UDMH+IRFNA או UDMH+NTO). בטילים מוצקים הדלק והמחמצן יצוקים יחד בצורה יציבה ואין תגובה היפרגולית.':'Chemical reaction where direct fuel-oxidizer contact causes instant spontaneous ignition — no spark, igniter, or external heat. Relevant only to liquid missiles (UDMH+IRFNA or UDMH+NTO). In solid missiles, fuel and oxidizer are cast together in stable form — no hypergolic reaction.'},
  {t:'MaRV',c:'mil',d:he?'Maneuverable Re-entry Vehicle — ראש קרב מתמרן. בשלב החדירה החוזרת לאטמוספירה, ראש הקרב משנה מסלול כדי להתחמק ממערכות יירוט (חץ, דויד קלע). נמצא בח׳ייבר שכן, עמאד, ח׳ורמשהר ופתאח-1.':'In the re-entry phase, warhead changes course to evade interception systems (Arrow, David\'s Sling). Found in Kheibar Shekan, Emad, Khorramshahr, Fattah-1.'},
  {t:'CEP',c:'mil',d:he?'Circular Error Probable — רדיוס שבתוכו נופלים 50% מהטילים. ח׳ורמשהר: CEP ~30 מטר (מדויק מאוד). שהאב-1: CEP ~2,500 מטר (מדויק מספיק רק לערים).':'Radius within which 50% of missiles land. Khorramshahr: ~30m (very accurate). Shahab-1: ~2,500m (only city-accurate).'},
  {t:'TEL',c:'mil',d:he?'Transporter Erector Launcher — משגר נייד על גבי משאית. מאפשר שיגור תוך דקות מכל מיקום. יתרון מרכזי של טילים מוצקים — כוננות מיידית, קשה לאתר ולהשמיד מראש.':'Mobile truck-mounted launcher. Enables launch within minutes from any location. Key advantage of solid missiles — instant readiness, hard to detect and destroy.'},
  {t:'TVC',c:'mil',d:he?'Thrust Vector Control — בקרת וקטור דחף. במקום כנפונים חיצוניים, הנחיר עצמו מוטה כדי לשנות את כיוון הטיסה. משמש בקיאם (ללא כנפונים) ובמנועים מוצקים. יתרון: פחות גרר אווירודינמי.':'Instead of external fins, the nozzle itself deflects to change flight direction. Used in Qiam (finless) and solid motors. Advantage: less aerodynamic drag.'},
  {t:he?'מנ״פ / SCBA':'SCBA',c:'haz',d:he?'מערכת נשימה פתוחה (Self-Contained Breathing Apparatus). מכילה מיכל אוויר דחוס. חובה בכל אירוע הכולל IRFNA, UDMH או NTO — מסכת גז רגילה אינה מספיקה!':'Self-Contained Breathing Apparatus. Contains compressed air tank. Mandatory in any IRFNA/UDMH/NTO incident — regular gas mask is insufficient!'},
  {t:he?'בצקת ריאות מושהית':'Delayed Pulmonary Edema',c:'haz',d:he?'מצב רפואי מסכן חיים: 24-48 שעות לאחר חשיפה ל-NOx (תחמוצות חנקן, כגון אדי IRFNA או NTO), נוזל מצטבר בריאות ללא אזהרה מוקדמת. הנפגע עשוי להרגיש בסדר ולפתע לחוות כשל נשימתי קטלני. לכן כל חשוף חייב אשפוז 24-48 שעות גם אם נראה תקין.':'Life-threatening condition: 24-48h after exposure to NOx (nitrogen oxides, from IRFNA/NTO fumes), fluid accumulates in lungs without warning. Patient may feel fine then suddenly experience fatal respiratory failure. Therefore all exposed must be hospitalized 24-48h even if appearing normal.'},
];
const cats=[{k:'all',l:he?'הכל':'All'},{k:'chem',l:he?'כימיה':'Chem'},{k:'mil',l:he?'צבאי':'Military'},{k:'haz',l:he?'חומ״ס':'HazMat'}];
const catC:Record<string,[string,string]>={chem:[P.greenS,P.green],mil:[P.blueS,P.blue],haz:[P.redS,P.red]};
const filtered=terms.filter(tm=>(cat==='all'||tm.c===cat)&&(search===''||tm.t.toLowerCase().includes(search.toLowerCase())||tm.d.toLowerCase().includes(search.toLowerCase())));
return<Sec id="glossary" num="18" title={he?"מקרא מונחים":"Glossary"} subtitle={`${terms.length} ${he?'מונחים מורחבים':'expanded terms'}`}>
  <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>{cats.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={cat===c.k?"ta":"ti"} style={{padding:"5px 12px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>{c.l}</button>)}</div>
  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={he?"🔍 חיפוש מונח...":"🔍 Search..."} style={{width:"100%",padding:"10px 14px",borderRadius:8,background:P.white,border:`1px solid ${P.border}`,fontSize:13,marginBottom:16,outline:"none"}}/>
  <div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map((tm,i)=>{const[bg,c]=catC[tm.c]||[P.cream,P.muted];return<div key={i} className="cm" style={{padding:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontWeight:800,color:P.blue,fontSize:14}}>{tm.t}</span><span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:bg,color:c}}>{cats.find(x=>x.k===tm.c)?.l}</span></div><p style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{tm.d}</p></div>;})}</div>
</Sec>;}


/* ═══ MISSILE COMPARISON ═══ */
function MissileCompare({lang}:{lang:string}){const he=lang==="he";const[a,setA]=useState("");const[b,setB]=useState("");
const ms=[
  {n:"שהאב-1",ne:"Shahab-1",r:330,w:1000,f:"IRFNA+TM-185",cep:2500,t:"נוזלי",te:"Liquid",spd:"Mach 5",stg:1,len:"11.2"},
  {n:"שהאב-3",ne:"Shahab-3",r:1300,w:1000,f:"IRFNA+TM-185",cep:1500,t:"נוזלי",te:"Liquid",spd:"Mach 7",stg:1,len:"16"},
  {n:"קיאם-1",ne:"Qiam-1",r:800,w:700,f:"IRFNA+UDMH*",cep:500,t:"נוזלי",te:"Liquid",spd:"Mach 6",stg:1,len:"11.5"},
  {n:"גדר-1",ne:"Ghadr-1",r:1800,w:750,f:"IRFNA+TM-185",cep:300,t:"נוזלי",te:"Liquid",spd:"Mach 8",stg:1,len:"16.5"},
  {n:"עמאד",ne:"Emad",r:1700,w:750,f:"IRFNA+TM-185",cep:500,t:"נוזלי",te:"Liquid",spd:"Mach 7",stg:1,len:"16"},
  {n:"ח׳ורמשהר",ne:"Khorramshahr",r:2000,w:1500,f:"NTO+UDMH",cep:30,t:"נוזלי",te:"Liquid",spd:"Mach 10",stg:1,len:"13"},
  {n:"פאתח-110",ne:"Fateh-110",r:300,w:500,f:"AP+HTPB+Al",cep:100,t:"מוצק",te:"Solid",spd:"Mach 4",stg:1,len:"8.9"},
  {n:"זולפקאר",ne:"Zolfaghar",r:700,w:600,f:"AP+HTPB+Al",cep:100,t:"מוצק",te:"Solid",spd:"Mach 5",stg:1,len:"10.3"},
  {n:"ח׳ייבר שכן",ne:"Kheibar Shekan",r:1450,w:500,f:"AP+HTPB+Al+RDX*",cep:30,t:"מוצק",te:"Solid",spd:"Mach 8",stg:1,len:"13"},
  {n:"סג׳יל-2",ne:"Sejjil-2",r:2000,w:750,f:"AP+HTPB",cep:50,t:"מוצק",te:"Solid",spd:"Mach 12",stg:2,len:"17.6"},
  {n:"פתאח-1",ne:"Fattah-1",r:1400,w:500,f:"AP+HTPB+Al",cep:-1,t:"מוצק",te:"Solid",spd:"Mach 13*",stg:1,len:"12"},
];
const mA=ms.find(m=>m.ne===a);const mB=ms.find(m=>m.ne===b);
const rows=he?[["טווח (ק״מ)","r"],["ראש קרב (ק״ג)","w"],["דלק","f"],["CEP (מ׳)","cep"],["הנעה","t"],["מהירות","spd"],["שלבים","stg"],["אורך (מ׳)","len"]]:
                [["Range (km)","r"],["Warhead (kg)","w"],["Fuel","f"],["CEP (m)","cep"],["Propulsion","te"],["Speed","spd"],["Stages","stg"],["Length (m)","len"]];
const better=(key:string,va:any,vb:any)=>{if(key==="cep")return va<vb&&va>0?"a":vb<va&&vb>0?"b":"";if(key==="r"||key==="w"||key==="spd")return String(va)>String(vb)?"a":"b";return"";};
return<Sec id="compare" num="05" title={he?"השוואת טילים":"Missile Comparison"} subtitle={he?"בחר שני טילים להשוואה זה-מול-זה":"Select two missiles to compare side by side"}>
  <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
    <select value={a} onChange={e=>setA(e.target.value)} style={{flex:1,minWidth:140,padding:"10px 14px",borderRadius:8,border:`1px solid ${P.border}`,fontSize:13,fontFamily:"Heebo",background:P.white}}>
      <option value="">{he?"— טיל ראשון —":"— First missile —"}</option>
      {ms.filter(m=>m.ne!==b).map(m=><option key={m.ne} value={m.ne}>{he?m.n:m.ne}</option>)}
    </select>
    <div style={{display:"flex",alignItems:"center",fontSize:18,color:P.gold,fontWeight:900}}>⚔️</div>
    <select value={b} onChange={e=>setB(e.target.value)} style={{flex:1,minWidth:140,padding:"10px 14px",borderRadius:8,border:`1px solid ${P.border}`,fontSize:13,fontFamily:"Heebo",background:P.white}}>
      <option value="">{he?"— טיל שני —":"— Second missile —"}</option>
      {ms.filter(m=>m.ne!==a).map(m=><option key={m.ne} value={m.ne}>{he?m.n:m.ne}</option>)}
    </select>
  </div>
  {mA&&mB&&<div className="cm" style={{overflow:"hidden"}}>
    {/* Header */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:`2px solid ${P.gold}30`}}>
      <div style={{padding:"14px",textAlign:"center",background:P.blueS,borderLeft:`1px solid ${P.border}30`}}><div className="sf" style={{fontSize:16,fontWeight:800,color:P.blue}}>{he?mA.n:mA.ne}</div><div style={{fontSize:10,color:P.muted}}>{he?mA.t:mA.te}</div></div>
      <div style={{padding:"14px",textAlign:"center",background:P.amberS}}><div className="sf" style={{fontSize:16,fontWeight:800,color:P.amber}}>{he?mB.n:mB.ne}</div><div style={{fontSize:10,color:P.muted}}>{he?mB.t:mB.te}</div></div>
    </div>
    {/* Rows */}
    {rows.map(([label,key],i)=>{const va=(mA as any)[key];const vb=(mB as any)[key];const w=better(key,va,vb);
    return<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",borderBottom:`1px solid ${P.border}30`,alignItems:"center"}}>
      <div style={{padding:"10px 14px",textAlign:"center",fontSize:14,fontWeight:w==="a"?800:400,color:w==="a"?P.blue:P.steel}}>{va===-1?"?":va}</div>
      <div style={{padding:"8px 12px",fontSize:11,fontWeight:700,color:P.muted,background:`${P.gold}08`,whiteSpace:"nowrap"}}>{label}</div>
      <div style={{padding:"10px 14px",textAlign:"center",fontSize:14,fontWeight:w==="b"?800:400,color:w==="b"?P.amber:P.steel}}>{vb===-1?"?":vb}</div>
    </div>;})}
  </div>}
  {(!mA||!mB)&&<div style={{textAlign:"center",padding:"30px",color:P.muted}}><div style={{fontSize:28,marginBottom:8}}>⚔️</div><div style={{fontSize:13}}>{he?"בחר שני טילים מהרשימות":"Select two missiles from the dropdowns"}</div></div>}
</Sec>;}

/* ═══ REAL MAPBOX RANGE MAP ═══ */
function RangeMap({lang}:{lang:string}){
  const he=lang==="he";
  const mapRef=useRef<any>(null);
  const containerRef=useRef<HTMLDivElement>(null);
  const[loaded,setLoaded]=useState(false);
  const[hovMissile,setHovMissile]=useState<string|null>(null);

  const ranges=[
    {name:he?"פאתח-110":"Fateh-110",r:300,color:"#4ade80"},
    {name:he?"זולפקאר":"Zolfaghar",r:700,color:"#facc15"},
    {name:he?"קיאם":"Qiam",r:1000,color:"#fb923c"},
    {name:he?"שהאב-3":"Shahab-3",r:1300,color:"#f97316"},
    {name:he?"ח׳ייבר שכן":"Kheibar Shekan",r:1450,color:"#f87171"},
    {name:he?"גדר / עמאד":"Ghadr / Emad",r:1800,color:"#ef4444"},
    {name:he?"ח׳ורמשהר / סג׳יל":"Khorramshahr / Sejjil",r:2000,color:"#dc2626"},
  ];

  useEffect(()=>{
    if(!containerRef.current||mapRef.current) return;
    const mapboxgl=(window as any).mapboxgl;
    if(!mapboxgl){
      const s=document.createElement('script');
      s.src='https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js';
      s.onload=()=>initMap();
      document.head.appendChild(s);
    } else { initMap(); }

    function initMap(){
      const mb=(window as any).mapboxgl;
      mb.accessToken=process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const map=new mb.Map({container:containerRef.current!,style:'mapbox://styles/mapbox/dark-v11',center:[53.5,32.5],zoom:3.2,attributionControl:false,pitchWithRotate:false});
      mapRef.current=map;
      map.on('load',()=>{
        // Add range circles as GeoJSON sources
        const iranCenter=[53.5,32.5];
        ranges.slice().reverse().forEach((rng,i)=>{
          const circle=createCircle(iranCenter,rng.r);
          map.addSource(`range-${i}`,{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[circle]},properties:{}}});
          map.addLayer({id:`range-fill-${i}`,type:'fill',source:`range-${i}`,paint:{'fill-color':rng.color,'fill-opacity':0.06}});
          map.addLayer({id:`range-line-${i}`,type:'line',source:`range-${i}`,paint:{'line-color':rng.color,'line-width':1.5,'line-opacity':0.7,'line-dasharray':[2,2]}});
        });
        // Iran marker
        new mb.Marker({color:'#c8a44e'}).setLngLat(iranCenter).setPopup(new mb.Popup().setHTML('<b>איראן</b>')).addTo(map);
        // Target cities
        const targets=[
          {name:he?"תל אביב":"Tel Aviv",coords:[34.78,32.08],d:1550},
          {name:he?"ריאד":"Riyadh",coords:[46.72,24.71],d:1200},
          {name:he?"בגדד":"Baghdad",coords:[44.37,33.31],d:700},
          {name:he?"דובאי":"Dubai",coords:[55.27,25.20],d:800},
          {name:he?"אנקרה":"Ankara",coords:[32.87,39.93],d:1800},
          {name:he?"קהיר":"Cairo",coords:[31.24,30.04],d:2000},
          {name:he?"דמשק":"Damascus",coords:[36.29,33.51],d:1200},
          {name:he?"באקו":"Baku",coords:[49.87,40.41],d:600},
          {name:he?"ניו דלהי":"New Delhi",coords:[77.21,28.61],d:2400},
          {name:he?"מוסקבה":"Moscow",coords:[37.62,55.75],d:2600},
        ];
        targets.forEach(t=>{
          const el=document.createElement('div');
          el.style.cssText='width:8px;height:8px;background:#e2e8f0;border-radius:50%;border:1.5px solid #64748b;cursor:pointer;';
          new mb.Marker({element:el}).setLngLat(t.coords).setPopup(new mb.Popup({offset:10}).setHTML(`<div style="text-align:center;font-family:Heebo"><b>${t.name}</b><br/><span style="color:#666">${t.d} km</span></div>`)).addTo(map);
        });
        setLoaded(true);
      });
    }

    function createCircle(center:number[],radiusKm:number,points=64){
      const coords=[];
      for(let i=0;i<=points;i++){
        const angle=(i/points)*360;
        const rad=angle*Math.PI/180;
        const dx=radiusKm*Math.cos(rad);
        const dy=radiusKm*Math.sin(rad);
        const lat=center[1]+dy/111.32;
        const lng=center[0]+dx/(111.32*Math.cos(center[1]*Math.PI/180));
        coords.push([lng,lat]);
      }
      return coords;
    }

    return()=>{if(mapRef.current){mapRef.current.remove();mapRef.current=null;}};
  },[]);

  // Highlight on hover
  useEffect(()=>{
    if(!mapRef.current||!loaded) return;
    const map=mapRef.current;
    ranges.slice().reverse().forEach((rng,i)=>{
      const isHov=hovMissile===rng.name;
      try{
        map.setPaintProperty(`range-fill-${i}`,'fill-opacity',isHov?0.2:0.06);
        map.setPaintProperty(`range-line-${i}`,'line-width',isHov?3:1.5);
        map.setPaintProperty(`range-line-${i}`,'line-opacity',isHov?1:0.7);
      }catch(e){}
    });
  },[hovMissile,loaded]);

  return<Sec id="rangemap" num="06" title={he?"מפת טווחי טילים":"Missile Range Map"} subtitle={he?"רדיוס הגעה ממרכז איראן — מפה אינטראקטיבית":"Reach radius from central Iran — interactive map"} dark>
    <div className="cm" style={{overflow:"hidden",borderRadius:8}}>
      <div ref={containerRef} style={{width:"100%",height:420}}/>
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12,justifyContent:"center"}}>
      {ranges.map(rng=><div key={rng.name} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:4,background:hovMissile===rng.name?`${rng.color}25`:"transparent",cursor:"pointer",transition:"all 0.15s",border:`1px solid ${hovMissile===rng.name?rng.color:'transparent'}`}} onMouseEnter={()=>setHovMissile(rng.name)} onMouseLeave={()=>setHovMissile(null)}>
        <div style={{width:12,height:3,background:rng.color,borderRadius:1}}/>
        <span style={{fontSize:10,color:hovMissile===rng.name?"#e2e8f0":P.muted,fontWeight:hovMissile===rng.name?700:400}}>{rng.name} ({rng.r} km)</span>
      </div>)}
    </div>
  </Sec>;
}

/* ═══ PRODUCTION FLOW DIAGRAMS — P&ID STYLE ═══ */
function FlowDiagram({lang}:{lang:string}){const[proc,setProc]=useState(0);const he=lang==="he";
// SVG Chemical Engineering Equipment Symbols
const Reactor=({x,y,label,params,rxn}:{x:number;y:number;label:string;params:string;rxn?:string})=>(
  <g>
    <ellipse cx={x+35} cy={y+5} rx={35} ry={5} fill="#dc262615" stroke="#dc2626" strokeWidth="1"/>
    <rect x={x} y={y+5} width={70} height={55} fill="#dc262610" stroke="#dc2626" strokeWidth="1" rx="2"/>
    <ellipse cx={x+35} cy={y+60} rx={35} ry={5} fill="#dc262615" stroke="#dc2626" strokeWidth="1"/>
    {/* Bubbles inside reactor */}
    {[0,1,2,3,4,5].map(i=><circle key={`b${i}`} cx={x+15+i*10} cy={y+45-i*3} r={1.5+Math.random()} fill="#dc262630" style={{animation:`bubble ${1.5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.25}s`}}/>)}
    {/* Agitator shaft */}
    <line x1={x+35} y1={y-8} x2={x+35} y2={y+30} stroke="#dc2626" strokeWidth="1.5"/>
    {/* Animated agitator paddles */}
    <g style={{transformOrigin:`${x+35}px ${y+38}px`,animation:"spin 2s linear infinite"}}>
      <line x1={x+20} y1={y+35} x2={x+50} y2={y+41} stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
      <line x1={x+50} y1={y+35} x2={x+20} y2={y+41} stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
    </g>
    {/* Motor on top */}
    <rect x={x+25} y={y-14} width={20} height={8} fill="#64748b" stroke="#475569" strokeWidth="0.5" rx="2"/>
    {/* Motor vibration indicator */}
    <line x1={x+23} y1={y-10} x2={x+20} y2={y-12} stroke="#64748b" strokeWidth="0.5" style={{animation:"flicker 0.5s infinite"}}/>
    <line x1={x+47} y1={y-10} x2={x+50} y2={y-12} stroke="#64748b" strokeWidth="0.5" style={{animation:"flicker 0.5s infinite",animationDelay:"0.25s"}}/>
    <text x={x+35} y={y+80} textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold" fontFamily="Heebo,sans-serif">{label}</text>
    <text x={x+35} y={y+90} textAnchor="middle" fill="#c8a44e" fontSize="7" fontWeight="bold" fontFamily="monospace">{params}</text>
    {rxn&&<text x={x+35} y={y+100} textAnchor="middle" fill="#059669" fontSize="5.5" fontFamily="monospace" fontWeight="600">{rxn}</text>}
  </g>
);
const Column=({x,y,label,params,h=80}:{x:number;y:number;label:string;params:string;h?:number})=>(
  <g>
    <rect x={x} y={y} width={40} height={h} fill="#7c3aed10" stroke="#7c3aed" strokeWidth="1" rx="4"/>
    {/* Internal plates with liquid dripping */}
    {Array.from({length:Math.floor(h/15)}).map((_,i)=><g key={i}>
      <line x1={x+4} y1={y+12+i*15} x2={x+36} y2={y+12+i*15} stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="2,1"/>
      {/* Dripping drops */}
      <circle cx={x+12+i*8} cy={y+14+i*15} r={0.8} fill="#7c3aed40" style={{animation:`bubble ${2+i*0.4}s ease-in infinite`,animationDelay:`${i*0.5}s`}}/>
    </g>)}
    {/* Vapor rising */}
    {[0,1,2].map(i=><circle key={`v${i}`} cx={x+20+i*5} cy={y+5} r={1} fill="#7c3aed20" style={{animation:`bubble ${1.5+i*0.3}s ease-out infinite reverse`,animationDelay:`${i*0.3}s`}}/>)}
    <text x={x+20} y={y+h+14} textAnchor="middle" fill="#7c3aed" fontSize="7" fontWeight="bold" fontFamily="Heebo,sans-serif">{label}</text>
    <text x={x+20} y={y+h+24} textAnchor="middle" fill="#c8a44e" fontSize="6.5" fontWeight="bold" fontFamily="monospace">{params}</text>
  </g>
);
const Tank=({x,y,label,color="#3b82f6"}:{x:number;y:number;label:string;color?:string})=>(
  <g>
    <rect x={x} y={y+6} width={50} height={35} fill={`${color}10`} stroke={color} strokeWidth="1" rx="2"/>
    <ellipse cx={x+25} cy={y+6} rx={25} ry={6} fill={`${color}15`} stroke={color} strokeWidth="1"/>
    {/* Liquid level with wave */}
    <rect x={x+2} y={y+22} width={46} height={18} fill={`${color}15`} rx="1"/>
    <path d={`M ${x+2} ${y+22} Q ${x+14} ${y+19} ${x+25} ${y+22} Q ${x+36} ${y+25} ${x+48} ${y+22}`} fill={`${color}20`} stroke={color} strokeWidth="0.3" style={{animation:"flicker 3s ease-in-out infinite"}}/>
    <text x={x+25} y={y+55} textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" fontFamily="Heebo,sans-serif">{label}</text>
  </g>
);
const Arrow=({x1,y1,x2,y2}:{x1:number;y1:number;x2:number;y2:number})=>(
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#pah)" strokeDasharray="6,3" className="flow-arrow"/>
);
const RxnLabel=({x,y,text}:{x:number;y:number;text:string})=>(
  <text x={x} y={y} textAnchor="middle" fill="#059669" fontSize="6" fontFamily="monospace" fontWeight="600">{text}</text>
);

const diagrams=[
  {name:he?"אוסטוולד — HNO₃":"Ostwald — HNO₃",ic:"⚗️",
   render:()=><svg viewBox="0 0 620 420" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"אמוניה NH₃":"Ammonia NH₃"} color="#3b82f6"/>
    <Tank x={10} y={100} label={he?"אוויר O₂+N₂":"Air O₂+N₂"} color="#64748b"/>
    <Arrow x1={60} y1={62} x2={130} y2={62}/>
    <Arrow x1={60} y1={170} x2={130} y2={90}/>
    <Reactor x={130} y={30} label={he?"ריאקטור קטליטי":"Catalytic Reactor"} params="850°C, 8 atm" rxn="4NH₃ + 5O₂ → 4NO + 6H₂O"/>
    <text x={165} y={148} textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="monospace">{he?"זרז: Pt-Rh 90:10":"Cat: Pt-Rh 90:10"}</text>
    <Arrow x1={200} y1={70} x2={260} y2={70}/>
    <RxnLabel x={230} y={62} text="NO (gas)"/>
    {/* Cooling + Oxidation */}
    <rect x={260} y={40} width={60} height={50} fill="#f9731610" stroke="#f97316" strokeWidth="1" rx="4"/>
    <text x={290} y={62} textAnchor="middle" fill="#f97316" fontSize="7" fontWeight="bold">{he?"חמצון+קירור":"Oxidation+Cool"}</text>
    <text x={290} y={72} textAnchor="middle" fill="#c8a44e" fontSize="6" fontFamily="monospace">{"<150°C"}</text>
    <text x={290} y={105} textAnchor="middle" fill="#059669" fontSize="5.5" fontFamily="monospace">2NO + O₂ → 2NO₂</text>
    <Arrow x1={320} y1={65} x2={370} y2={65}/>
    <RxnLabel x={345} y={58} text={he?"NO₂ (חום)":"NO₂ (brown)"}/>
    {/* Absorption Tower */}
    <Column x={370} y={15} label={he?"מגדל ספיגה":"Absorption Tower"} params="50-80°C" h={90}/>
    <text x={410} y={125} textAnchor="middle" fill="#059669" fontSize="5.5" fontFamily="monospace">3NO₂ + H₂O → 2HNO₃ + NO</text>
    {/* Water input */}
    <Tank x={440} y={15} label="H₂O" color="#06b6d4"/>
    <Arrow x1={440} y1={40} x2={410} y2={40}/>
    <Arrow x1={390} y1={105} x2={390} y2={150}/>
    {/* Concentrator */}
    <Column x={370} y={155} label={he?"עמוד ריכוז":"Concentrator"} params={he?"+ H₂SO₄":"+ H₂SO₄"} h={60}/>
    <text x={410} y={240} textAnchor="middle" fill="#94a3b8" fontSize="6">HNO₃ {">"}86%</text>
    <Arrow x1={390} y1={230} x2={390} y2={260}/>
    {/* Final IRFNA mixing */}
    <Reactor x={355} y={260} label="IRFNA" params={he?"מחמצן לטילים":"Missile Oxidizer"} rxn="HNO₃ + N₂O₄ + HF"/>
  </svg>},
  {name:he?"רשיג — UDMH":"Raschig — UDMH",ic:"🟣",
   render:()=><svg viewBox="0 0 620 420" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"אמוניה NH₃":"Ammonia NH₃"} color="#3b82f6"/>
    <Tank x={10} y={150} label={he?"היפוכלוריט NaOCl":"Hypochlorite NaOCl"} color="#64748b"/>
    <Arrow x1={60} y1={55} x2={130} y2={55}/>
    <Arrow x1={60} y1={180} x2={130} y2={85}/>
    <Reactor x={130} y={25} label={he?"ריאקטור 1":"Reactor 1"} params="0°C (!)" rxn="NH₃ + NaOCl → NH₂Cl + NaOH"/>
    <text x={165} y={140} textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="bold">{he?"⚠️ כלוראמין רעיל":"⚠️ Toxic Chloramine"}</text>
    <Arrow x1={200} y1={65} x2={260} y2={65}/>
    <RxnLabel x={230} y={58} text="NH₂Cl"/>
    {/* DMA input */}
    <Tank x={260} y={0} label={he?"דימתילאמין":"Dimethylamine"} color="#64748b"/>
    <text x={285} y={60} textAnchor="middle" fill="#64748b" fontSize="5.5" fontFamily="monospace">(CH₃)₂NH</text>
    <Arrow x1={285} y1={42} x2={320} y2={58}/>
    <Reactor x={280} y={30} label={he?"ריאקטור 2":"Reactor 2"} params={he?"לחץ, חום":"Pressure, Heat"} rxn="NH₂Cl + (CH₃)₂NH → UDMH + HCl"/>
    <Arrow x1={350} y1={70} x2={410} y2={70}/>
    <RxnLabel x={380} y={62} text={he?"UDMH גולמי":"Crude UDMH"}/>
    {/* Separator */}
    <rect x={410} y={35} width={50} height={65} fill="#f9731610" stroke="#f97316" strokeWidth="1" rx="4"/>
    <text x={435} y={65} textAnchor="middle" fill="#f97316" fontSize="6.5" fontWeight="bold">{he?"מפריד":"Separator"}</text>
    <text x={435} y={115} textAnchor="middle" fill="#94a3b8" fontSize="5.5">{he?"HCl ← פסולת":"HCl → waste"}</text>
    <Arrow x1={435} y1={100} x2={435} y2={155}/>
    {/* Distillation */}
    <Column x={415} y={155} label={he?"עמוד זיקוק":"Distillation Column"} params="63°C" h={75}/>
    <Arrow x1={435} y1={250} x2={435} y2={280}/>
    {/* Final product */}
    <rect x={400} y={280} width={70} height={40} fill="#9333ea20" stroke="#9333ea" strokeWidth="1.5" rx="6"/>
    <text x={435} y={300} textAnchor="middle" fill="#9333ea" fontSize="9" fontWeight="bold">UDMH</text>
    <text x={435} y={312} textAnchor="middle" fill="#9333ea" fontSize="6">{he?"דלק טילים":"Missile Fuel"}</text>
  </svg>},
  {name:he?"בכמן — RDX/HMX":"Bachmann — RDX/HMX",ic:"💣",
   render:()=><svg viewBox="0 0 620 420" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"הקסאמין":"Hexamine"} color="#3b82f6"/>
    <text x={35} y={75} textAnchor="middle" fill="#3b82f6" fontSize="5.5" fontFamily="monospace">C₆H₁₂N₄</text>
    <Tank x={10} y={150} label={he?"HNO₃ מרוכזת":"Conc. HNO₃"} color="#dc2626"/>
    <text x={35} y={165} textAnchor="middle" fill="#dc2626" fontSize="5.5" fontFamily="monospace">{">"}98%</text>
    <Arrow x1={60} y1={55} x2={130} y2={55}/>
    <Arrow x1={60} y1={180} x2={130} y2={85}/>
    <Reactor x={130} y={25} label={he?"ריאקטור ניטרציה":"Nitration Reactor"} params="45-75°C (!)" rxn={he?"⚠️ מעל 75°C = פיצוץ!":"⚠️ Above 75°C = explosion!"}/>
    <text x={165} y={146} textAnchor="middle" fill="#059669" fontSize="5.5" fontFamily="monospace">C₆H₁₂N₄ + 4HNO₃ → RDX</text>
    <Arrow x1={200} y1={70} x2={260} y2={70}/>
    {/* Wash/Filter */}
    <rect x={260} y={40} width={60} height={55} fill="#64748b10" stroke="#64748b" strokeWidth="1" rx="4"/>
    <text x={290} y={60} textAnchor="middle" fill="#64748b" fontSize="6.5" fontWeight="bold">{he?"שטיפה":"Wash"}</text>
    <text x={290} y={72} textAnchor="middle" fill="#64748b" fontSize="6">{he?"סינון, ייבוש":"Filter, Dry"}</text>
    <text x={290} y={82} textAnchor="middle" fill="#94a3b8" fontSize="5.5">+ H₂O</text>
    <Arrow x1={320} y1={65} x2={380} y2={45}/>
    <Arrow x1={320} y1={70} x2={380} y2={110}/>
    {/* RDX */}
    <rect x={380} y={20} width={70} height={45} fill="#f9731620" stroke="#f97316" strokeWidth="1.5" rx="6"/>
    <text x={415} y={42} textAnchor="middle" fill="#f97316" fontSize="10" fontWeight="bold">RDX</text>
    <text x={415} y={55} textAnchor="middle" fill="#f97316" fontSize="6">{he?"הקסוגן ×1.6 TNT":"Hexogen ×1.6 TNT"}</text>
    {/* HMX */}
    <rect x={380} y={90} width={70} height={45} fill="#dc262620" stroke="#dc2626" strokeWidth="1.5" rx="6"/>
    <text x={415} y={112} textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">HMX</text>
    <text x={415} y={125} textAnchor="middle" fill="#dc2626" fontSize="6">{he?"אוקטוגן (חזק יותר)":"Octogen (stronger)"}</text>
    {/* Uses */}
    <Arrow x1={450} y1={42} x2={500} y2={42}/>
    <Arrow x1={450} y1={112} x2={500} y2={112}/>
    <Arrow x1={450} y1={112} x2={500} y2={160}/>
    <text x={530} y={45} textAnchor="middle" fill="#b91c1c" fontSize="7" fontWeight="bold">{he?"ראשי קרב":"Warheads"}</text>
    <text x={530} y={115} textAnchor="middle" fill="#b45309" fontSize="7" fontWeight="bold">{he?"דלק מוצק":"Solid Fuel"}</text>
    <text x={530} y={165} textAnchor="middle" fill="#7c3aed" fontSize="7" fontWeight="bold">{he?"עדשות גרעיניות":"Nuclear Lenses"}</text>
    <text x={530} y={175} textAnchor="middle" fill="#7c3aed" fontSize="5.5">☢️ Implosion</text>
  </svg>},
];
const d=diagrams[proc];
return<Sec id="flowdiagram" num="09" title={he?"תרשים זרימת ייצור":"Production Flow Diagram"} subtitle={he?"ריאקטורים, מפרידים, עמודי זיקוק — עם טמפרטורות, לחצים ותגובות כימיות":"Reactors, separators, distillation columns — with temperatures, pressures & chemical reactions"}>
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{diagrams.map((x,i)=><button key={i} onClick={()=>setProc(i)} className={proc===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.name.split("—")[0]}</button>)}</div>
  <div className="cm" style={{padding:16,overflow:"auto",background:"#fafaf8"}}>
    {d.render()}
  </div>
</Sec>;}

/* ═══ INFOGRAPHIC ═══ */
function Infographic({lang}:{lang:string}){const he=lang==="he";const[zoom,setZoom]=useState(false);
return<Sec id="infographic" num="16" title={he?"אינפוגרפיקה":"Infographic"} subtitle={he?"טכנולוגיית ייצור טילים בליסטיים":"Ballistic Missile Production Technology"} dark>
  <div onClick={()=>setZoom(!zoom)} style={{cursor:"pointer",overflow:"hidden",borderRadius:8,border:`1px solid ${P.border}40`}}>
    <img src="/images/infographic.png" alt={he?"אינפוגרפיקה":"Infographic"} style={{width:"100%",borderRadius:6,transition:"transform 0.3s",transform:zoom?"scale(1.8)":"scale(1)",transformOrigin:"top center"}}/>
  </div>
  <p style={{textAlign:"center",fontSize:11,color:P.muted,marginTop:8}}>{he?"💡 לחצו על התמונה להגדלה / הקטנה":"💡 Click to zoom in/out"}</p>
</Sec>;}

/* ═══ PRESENTATION GALLERY ═══ */
function Gallery({lang}:{lang:string}){const he=lang==="he";const[cur,setCur]=useState(0);const[fs,setFs]=useState(false);
const slides=Array.from({length:13},(_,i)=>`/images/slide-${String(i+1).padStart(2,'0')}.jpg`);
const prev=()=>setCur(c=>Math.max(0,c-1));const next=()=>setCur(c=>Math.min(12,c+1));
return<Sec id="gallery" num="17" title={he?"מצגת מודיעינית":"Intelligence Presentation"} subtitle={`13 ${he?"שקפים":"slides"}`}>
  {/* Main slide */}
  <div className="cm" style={{overflow:"hidden",position:"relative"}}>
    <img src={slides[cur]} alt={`Slide ${cur+1}`} style={{width:"100%",display:"block",cursor:"pointer"}} onClick={()=>setFs(true)}/>
    <button onClick={prev} disabled={cur===0} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.85)",border:"none",fontSize:18,cursor:"pointer",opacity:cur===0?0.3:1,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>›</button>
    <button onClick={next} disabled={cur===12} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.85)",border:"none",fontSize:18,cursor:"pointer",opacity:cur===12?0.3:1,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>‹</button>
    <div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.6)",color:"#fff",padding:"3px 10px",borderRadius:12,fontSize:11,fontFamily:"monospace"}}>{cur+1} / 13</div>
  </div>
  {/* Thumbnails */}
  <div style={{display:"flex",gap:4,marginTop:8,overflowX:"auto",padding:"4px 0"}}>
    {slides.map((s,i)=><button key={i} onClick={()=>setCur(i)} style={{flexShrink:0,width:56,height:36,borderRadius:4,overflow:"hidden",border:i===cur?`2px solid ${P.gold}`:"2px solid transparent",opacity:i===cur?1:0.5,cursor:"pointer",padding:0,transition:"all 0.2s"}}><img src={s} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></button>)}
  </div>
  {/* Fullscreen overlay */}
  {fs&&<div onClick={()=>setFs(false)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
    <img src={slides[cur]} alt="" style={{maxWidth:"95vw",maxHeight:"90vh",objectFit:"contain"}}/>
    <button onClick={(e)=>{e.stopPropagation();prev();}} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:22,cursor:"pointer"}}>›</button>
    <button onClick={(e)=>{e.stopPropagation();next();}} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:22,cursor:"pointer"}}>‹</button>
    <button onClick={()=>setFs(false)} style={{position:"absolute",top:16,right:16,width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:20,cursor:"pointer"}}>✕</button>
    <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",color:"#fff",fontSize:13,fontFamily:"monospace"}}>{cur+1} / 13</div>
  </div>}
</Sec>;}

/* ═══ SOURCES ═══ */
function Sources({lang}:{lang:string}){const he=lang==="he";const sr=[{n:"CSIS Missile Defense Project",c:he?"מחקרי":"Research"},{n:"Iran Watch — Missile Arsenal",c:he?"מחקרי":"Research"},{n:"USIP — Ballistic Missile Program",c:he?"ממשלתי":"Govt"},{n:"NIOSH/CDC — UDMH Pocket Guide",c:he?"ממשלתי":"Govt"},{n:"PubChem — Chemical Properties",c:he?"ממשלתי":"Govt"},{n:"NOAA CAMEO — IRFNA & NTO",c:he?"ממשלתי":"Govt"},{n:"ERG 2024 — PHMSA/DOT",c:he?"ממשלתי":"Govt"},{n:"NCBI — AEGL Dimethylhydrazine",c:he?"אקדמי":"Academic"},{n:"PMC — Delayed Pulmonary Edema",c:he?"אקדמי":"Academic"},{n:"Alma Center — Iran Missiles",c:he?"מחקרי":"Research"},{n:"IISS Military Balance",c:he?"מחקרי":"Research"},{n:"Critical Threats — Israeli Strikes",c:he?"מחקרי":"Research"}];const cc:Record<string,[string,string]>={[he?"ממשלתי":"Govt"]:[P.greenS,P.green],[he?"מחקרי":"Research"]:[P.blueS,P.blue],[he?"אקדמי":"Academic"]:[P.purpleS,P.purple]};return<Sec id="sources" num="19" title={he?"מקורות":"Sources"}>{sr.map((s,i)=>{const[bg,c]=cc[s.c]||[P.cream,P.muted];return<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}><span style={{color:P.gold}}>🔗</span><span style={{flex:1,fontSize:13,color:P.steel}}>{s.n}</span><span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:bg,color:c}}>{s.c}</span></div>;})}</Sec>;}

/* ═══ VIEW COUNTER ═══ */
function ViewCounter({lang}:{lang:string}){const he=lang==="he";const[v,setV]=useState<number|null>(null);useEffect(()=>{fetch('https://api.counterapi.dev/v1/iran-missiles-60sec/visits/up',{cache:'no-store'}).then(r=>r.json()).then(d=>setV(d.count||0)).catch(()=>{});},[]);if(v===null)return null;return<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:10}}><span style={{fontSize:11,color:`#ffffff60`}}>👁️</span><span className="mn" style={{fontSize:12,fontWeight:700,color:P.gold}}>{v.toLocaleString()}</span><span style={{fontSize:10,color:`#ffffff50`}}>{he?"צפיות":"views"}</span></div>;}

/* ═══ FOOTER ═══ */
function Footer({lang}:{lang:string}){const he=lang==="he";return<footer style={{borderTop:`1px solid ${P.gold}40`,padding:"36px 20px",background:P.ink,textAlign:"center"}}>
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}><img src="/images/logo-60sec.png" alt="" style={{width:32,height:32,borderRadius:6}}/><span style={{fontSize:14,fontWeight:700,color:P.gold}}>{he?"ניתוח 60 שניות של חומ״ס":"60 Seconds HazMat"}</span></div>
  <p style={{fontSize:13,color:`${P.white}cc`,marginBottom:10}}><b style={{color:P.white}}>{he?"רועי צוקרמן":"Roie Zukerman"}</b> — {he?"מומחה לחומ״ס וטב״ק":"HazMat & CBRN Expert"}</p>
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14,flexWrap:"wrap"}}><a href="mailto:roiez1@gmail.com" style={{fontSize:12,color:P.gold,textDecoration:"none"}}>✉️ roiez1@gmail.com</a><a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{fontSize:11,fontWeight:700,color:"#22c55e",background:"rgba(34,197,94,0.1)",padding:"5px 14px",borderRadius:6,textDecoration:"none",border:"1px solid rgba(34,197,94,0.25)"}}>💬 WhatsApp</a></div>
  <div style={{height:1,maxWidth:300,margin:"0 auto 12px",background:`linear-gradient(90deg,transparent,${P.gold}60,transparent)`}}/>
  <ViewCounter lang={lang}/>
  <p style={{fontSize:10,color:`${P.white}90`,marginBottom:8}}>{he?"מקורות פתוחים בלבד | לא מסווג":"Open sources only | Unclassified"} | {he?"אפריל 2026":"April 2026"}</p>
  <div style={{maxWidth:400,margin:"0 auto",padding:"12px 16px",background:`${P.white}08`,borderRadius:8,border:`1px solid ${P.white}15`}}>
    <p style={{fontSize:10,color:P.gold,fontWeight:700,marginBottom:4}}>© 2026 {he?"רועי צוקרמן — מומחה לחומ״ס וטב״ק":"Roie Zukerman — HazMat & CBRN Expert"}</p>
    <p style={{fontSize:9,color:`${P.white}80`,lineHeight:1.6}}>{he?"כל הזכויות שמורות. מבוסס על מקורות פתוחים בלבד. למטרות מקצועיות והדרכתיות. אין להשתמש ללא אישור בכתב.":"All rights reserved. Open sources only. Professional & educational use. Written permission required."}</p>
  </div>
</footer>;}

/* ═══ MAIN ═══ */
export default function Home(){const[lang,setLang]=useState("he");return<div dir={lang==="he"?"rtl":"ltr"}><ProgressBar/><Nav lang={lang} toggle={()=>setLang(l=>l==="he"?"en":"he")}/><Hero lang={lang}/><Timeline lang={lang}/><Facilities lang={lang}/><MissileDiagram lang={lang}/><Arsenal lang={lang}/><MissileCompare lang={lang}/><RangeMap lang={lang}/><Propulsion lang={lang}/><Processes lang={lang}/><FlowDiagram lang={lang}/><MolecularAnim lang={lang}/><Chemistry lang={lang}/><HazMat lang={lang}/><Medical lang={lang}/><Strategic lang={lang}/><SupplyChain lang={lang}/><Infographic lang={lang}/><Gallery lang={lang}/><Glossary lang={lang}/><Sources lang={lang}/><Footer lang={lang}/></div>;}
