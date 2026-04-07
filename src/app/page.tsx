'use client';
import { useState, useEffect, useRef } from 'react';

const P = {
  ink:"#0c1222",navy:"#162040",steel:"#1e293b",gold:"#c8a44e",gL:"#e8d5a0",
  cream:"#f5f0e8",parch:"#faf7f0",red:"#b91c1c",redS:"#fef2f2",
  blue:"#1e40af",blueS:"#eff6ff",amber:"#92400e",amberS:"#fffbeb",
  purple:"#6b21a8",purpleS:"#faf5ff",green:"#166534",greenS:"#f0fdf4",
  muted:"#64748b",border:"#e2e0d8",white:"#fff"
};

const sIDs=["home","timeline","facilities","diagram","arsenal","rangemap","propulsion","processes","flowdiagram","chemistry","hazmat","medical","strategic","infographic","gallery","glossary","sources"];
const sHe=["ראשי","ציר זמן","מתקנים","אנטומיה","ארסנל","טווחים","הנעה","ייצור","זרימה","דלקים","חומ״ס","רפואי","אסטרטגי","אינפוגרפיקה","מצגת","מקרא","מקורות"];
const sEn=["Home","Timeline","Facilities","Anatomy","Arsenal","Ranges","Propulsion","Production","Flow","Fuels","HazMat","Medical","Strategic","Infographic","Slides","Glossary","Sources"];

function ProgressBar(){const[p,setP]=useState(0);useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;setP(h>0?(window.scrollY/h)*100:0);};window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);return<div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:3,background:P.cream}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${P.gold},${P.gL})`,transition:"width 120ms"}}/></div>;}

function Nav({lang,toggle}:{lang:string;toggle:()=>void}){const[open,setOpen]=useState(false);const labels=lang==="he"?sHe:sEn;return<><nav className="nv"><div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}><a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}><img src="/images/logo-60sec.png" alt="60 שניות חומ״ס" style={{width:30,height:30,borderRadius:6}}/><span style={{fontSize:10,fontWeight:700,color:P.muted}}>60 שניות חומ״ס</span></a><div className="hd-links" style={{display:"flex",gap:2,alignItems:"center"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} style={{padding:"6px 8px",fontSize:10,color:P.muted,textDecoration:"none",borderRadius:4}}>{s}</a>)}<button onClick={toggle} className="mn" style={{padding:"5px 14px",fontSize:11,fontWeight:800,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginInlineStart:8}}>{lang==="he"?"EN":"עב"}</button></div><button className="mob-btn" onClick={()=>setOpen(!open)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer",color:P.muted,fontSize:22}}>☰</button></div></nav>{open&&<div className="mob-menu" style={{position:"fixed",top:51,left:0,right:0,zIndex:89,background:P.white,borderBottom:`1px solid ${P.border}`,padding:8,boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} onClick={()=>setOpen(false)} style={{display:"block",padding:"10px 16px",fontSize:13,color:P.steel,textDecoration:"none"}}>{s}</a>)}<button onClick={()=>{toggle();setOpen(false);}} style={{display:"block",width:"100%",padding:"10px",fontSize:13,fontWeight:700,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginTop:4}}>{lang==="he"?"English":"עברית"}</button></div>}</>;}

function Hero({lang}:{lang:string}){const he=lang==="he";return<section id="home" className="mh" style={{paddingTop:80,paddingBottom:60,position:"relative"}}><div style={{maxWidth:800,margin:"0 auto",padding:"0 24px",textAlign:"center",position:"relative",zIndex:1}}><div className="mn au" style={{display:"inline-block",border:`1px solid ${P.gold}50`,padding:"3px 16px",borderRadius:2,color:P.gold,fontSize:10,fontWeight:700,letterSpacing:"0.3em",marginBottom:20}}>[ {he?"לא מסווג":"UNCLASSIFIED"} ]</div><p className="au" style={{fontSize:10,letterSpacing:"0.25em",color:`${P.gL}70`,textTransform:"uppercase",marginBottom:16}}>Intelligence Dossier • {he?"אפריל 2026":"April 2026"}</p><h1 className="sf au" style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,color:P.white,lineHeight:1.15,marginBottom:12}}>{he?"מערך ייצור הטילים והדלקים של איראן":"Iran's Missile & Propellant Production Complex"}</h1><h2 className="sf au" style={{fontSize:"clamp(14px,2vw,20px)",fontWeight:400,color:`${P.gL}90`,marginBottom:16}}>{he?"תיק מודיעין טכנולוגי-טקטי":"Tech-Tactical Intelligence Dossier"}</h2><div className="gr au" style={{margin:"0 auto 16px"}}/><p className="au" style={{fontSize:13,color:`${P.white}70`,maxWidth:560,margin:"0 auto 32px",lineHeight:1.8}}>{he?"ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום":"Strategic analysis: propulsion, fuels, production, facilities, HazMat & emergency protocols"}</p><div className="au" style={{display:"flex",justifyContent:"center",gap:"clamp(16px,5vw,48px)",flexWrap:"wrap",marginBottom:28}}>{[{n:"16",l:he?"סוגי טילים":"Missile Types",c:P.gold},{n:"3,000+",l:he?"טילים (IISS)":"Est. Missiles",c:P.gold},{n:"6+",l:he?"מתקנים שהותקפו":"Facilities Struck",c:"#ef4444"},{n:"3",l:he?"תהליכי ייצור":"Critical Processes",c:P.gL}].map((s,i)=><div key={i} style={{textAlign:"center"}}><div className="sf" style={{fontSize:"clamp(22px,3.5vw,36px)",fontWeight:900,color:s.c}}>{s.n}</div><div style={{fontSize:9,color:`${P.white}50`}}>{s.l}</div></div>)}</div><p className="au" style={{fontSize:11,color:`${P.gL}50`}}>{he?"רועי צוקרמן — מומחה לחומ״ס וטב״ק":"Roei Zukerman — HazMat & CBRN Expert"}</p></div></section>;}

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
];return<Sec id="timeline" num="01" title={he?"ציר זמן: תוכנית הטילים":"Timeline: Missile Program"} subtitle={he?"1984 — מסקאד ועד מלחמה פתוחה":"1984 — From Scud to open war"} sidebar={<><SB color="gold" title={he?"נקודות מפנה":"Turning Points"}><p><b>1998</b> — Scud→Shahab (×4 {he?"טווח":"range"})</p><p><b>2008</b> — {he?"נוזלי":"Liquid"}→{he?"מוצק":"Solid"} (Sejjil)</p><p><b>10/2024</b> — {he?"מערבלים פלנטריים":"Planetary mixers"}</p><p><b>6/2025</b> — {he?"עם כלביא — גרעין":"Im Kalbia — nuclear"}</p><p><b>2/2026</b> — {he?"מתקפה מלאה":"Full-scale attack"}</p></SB></>}>{ev.map((e,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${P.border}30`}}><div className="mn" style={{flexShrink:0,width:48,fontSize:12,fontWeight:700,color:e.r?P.red:P.gold,textAlign:"center"}}>{e.y}</div><div style={{width:8,height:8,borderRadius:"50%",border:`2px solid ${e.r?P.red:P.gold}`,background:e.r?P.red:"transparent",flexShrink:0,marginTop:5}}/><p style={{fontSize:13,color:e.r?P.red:P.steel,fontWeight:e.r?600:400}}>{he?e.h:e.e}</p></div>)}</Sec>;}

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
return<Sec id="diagram" num="02" title={he?"אנטומיה של טיל בליסטי":"Ballistic Missile Anatomy"} subtitle={he?"עמדו על רכיב בטיל לפרטים מלאים":"Hover over a missile component for full details"} dark sidebar={act?<div className="cm" style={{padding:16,borderRight:`3px solid ${act.c}`}}><h4 className="sf" style={{fontSize:15,fontWeight:800,marginBottom:8}}>{act.lb}</h4><p style={{fontSize:12,color:P.steel,lineHeight:1.8}}>{act.d}</p></div>:<SB color="gold" title={he?"👆 אינטראקטיבי":"👆 Interactive"}><p>{he?"עמדו על רכיב בטיל כדי לראות הסבר מפורט על תפקידו, החומרים ממנו עשוי, והפרמטרים הטכניים.":"Hover on a missile component to see its function, materials, and technical parameters."}</p></SB>}>
  <div style={{display:"flex",gap:8,marginBottom:16}}>{([["liquid","🔵",he?"נוזלי (שהאב-3)":"Liquid (Shahab-3)"],["solid","🟠",he?"מוצק (סג׳יל-2)":"Solid (Sejjil-2)"]] as const).map(([m,ic,lb])=><button key={m} onClick={()=>{setMode(m);setHov(null);}} className={mode===m?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{ic} {lb}</button>)}</div>
  <div className="cm" style={{padding:20}}>
    <svg viewBox="0 0 100 32" style={{width:"100%"}}>
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
      <text x="50" y="30" textAnchor="middle" fill="#9ca3af" fontSize="2.2" fontFamily="monospace">{mode==="liquid"?"~16 m (Shahab-3)":"~17.6 m (Sejjil-2)"}</text>
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
  {n:"קיאם-1/2",ne:"Qiam-1/2",r:"800-1,000",w:"~700",f:"IRFNA+UDMH",cep:"~500",note:he?"ללא כנפונים, TVC":"No fins, TVC",t:"l"},
  {n:"גדר-1/110",ne:"Ghadr-1/110",r:"1,600-2,000",w:"~750",f:"IRFNA+TM-185",cep:"~300",note:he?"שהאב-3 משודרג":"Upgraded Shahab-3",t:"l"},
  {n:"עמאד",ne:"Emad",r:"~1,700",w:"~750",f:"IRFNA+TM-185",cep:"~500",note:he?"ראשון עם MaRV":"First with MaRV",t:"l"},
  {n:"ח׳ורמשהר",ne:"Khorramshahr",r:"~2,000",w:"~1,500",f:"NTO+UDMH",cep:"~30",note:he?"המדויק ביותר":"Most accurate",t:"l"},
  {n:"פאתח-110",ne:"Fateh-110",r:"200-300",w:"~500",f:"AP+HTPB+Al",cep:"~100",note:"SRBM",t:"s"},
  {n:"זולפקאר",ne:"Zolfaghar",r:"~700",w:"~600",f:"AP+HTPB+Al",cep:"~100",note:he?"נגד תשתיות":"Anti-infra",t:"s"},
  {n:"דזפול",ne:"Dezful",r:"~1,000",w:"~450",f:"AP+HTPB+Al",cep:"~50",note:he?"דו-שלבי":"Two-stage",t:"s"},
  {n:"ח׳ייבר שכן",ne:"Kheibar Shekan",r:"~1,450",w:"~500",f:"AP+HTPB+Al+RDX",cep:"~30",note:"MaRV",t:"s"},
  {n:"סג׳יל-2",ne:"Sejjil-2",r:"~2,000",w:"650-1,000",f:"AP+HTPB+RDX/HMX",cep:"~50",note:he?"המתקדם ביותר":"Most advanced",t:"s"},
  {n:"פתאח-1",ne:"Fattah-1",r:"~1,400",w:"~500",f:"AP+HTPB+Al",cep:"?",note:he?"טענה להיפרסוני":"Hypersonic claim",t:"s"},
];const fm=fl==="all"?ms:ms.filter(m=>m.t===fl);
const hd=he?["שם","טווח (ק״מ)","ראש קרב (ק״ג)","הנעה","דלק / מחמצן","CEP (מ׳)","הערות"]:["Name","Range (km)","Warhead (kg)","Propulsion","Fuel / Oxidizer","CEP (m)","Notes"];
return<Sec id="arsenal" num="03" title={he?"ארסנל הטילים":"Missile Arsenal"} subtitle={he?"הגדול ביותר במזרח התיכון — 13 מערכות מתועדות":"Largest in the Middle East — 13 documented systems"}>
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
return<Sec id="propulsion" num="04" title={he?"נוזלי מול מוצק":"Liquid vs. Solid"} subtitle={he?"לחצו על כרטיס לפרטים מלאים":"Click a card for full details"} dark>
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
   st:he?["אמוניה (NH₃) + אוויר מוזרמים לכור קטליטי","חמצון על רשת זרז פלטינה-רודיום (Pt-Rh 90:10) בטמפרטורה של 850°C → גז תחמוצת חנקן (NO)","קירור + חמצון נוסף באוויר: NO + O₂ → NO₂ (גז חום-אדום רעיל)","מגדל ספיגה: NO₂ + מים → חומצה חנקתית מדוללת (HNO₃ ~68%)","ריכוז באמצעות חומצה גופרתית (H₂SO₄) לריכוז מעל 86%","הוספת N₂O₄ (18-27%) + HF (0.6% כמעכב קורוזיה) → IRFNA מוכנה לשימוש כמחמצן בטילים"]:["Ammonia (NH₃) + air fed into catalytic reactor","Oxidation on Platinum-Rhodium (Pt-Rh 90:10) catalyst mesh at 850°C → Nitric Oxide gas (NO)","Cooling + further oxidation: NO + O₂ → NO₂ (toxic reddish-brown gas)","Absorption tower: NO₂ + H₂O → dilute Nitric Acid (HNO₃ ~68%)","Concentration using Sulfuric Acid (H₂SO₄) to >86%","Add N₂O₄ (18-27%) + HF (0.6% corrosion inhibitor) → IRFNA ready for missile use"]},
  {nm:he?"רשיג — דלק טילים UDMH":"Raschig — UDMH Missile Fuel",ic:"🟣",or:he?"פרידריך רשיג (1863-1928), כימאי גרמני. פיתח תהליך ליצירת הידראזין מאמוניה והיפוכלוריט. וריאציה שלו (Ketazine Process) משמשת כיום לייצור UDMH — דלק הטילים הנוזלי הנפוץ ביותר בעולם.":"Friedrich Raschig (1863-1928), German chemist. Developed hydrazine synthesis from ammonia and hypochlorite. His variation (Ketazine Process) is used today to produce UDMH — the world's most common liquid missile fuel.",
   st:he?["אמוניה (NH₃) + נתרן היפוכלוריט (אקונומיקה/NaOCl)","תגובה בטמפרטורה נמוכה (0°C) → כלוראמין (NH₂Cl) — תרכובת ביניים רעילה","כלוראמין + דימתילאמין ((CH₃)₂NH)","תגובה → UDMH גולמי (לא טהור, מכיל מזהמים)","זיקוק חוזר בטמפרטורת רתיחה 63°C","UDMH טהור — נוזל שקוף, ריח אמוניה/דגים, מסרטן (IARC Group 2B)"]:["Ammonia (NH₃) + Sodium Hypochlorite (NaOCl/bleach)","Low temperature reaction (0°C) → Chloramine (NH₂Cl) — toxic intermediate","Chloramine + Dimethylamine ((CH₃)₂NH)","Reaction → crude UDMH (impure, contains contaminants)","Repeated distillation at boiling point 63°C","Pure UDMH — clear liquid, ammonia/fish odor, carcinogenic (IARC Group 2B)"]},
  {nm:he?"בכמן — חומרי נפץ RDX/HMX":"Bachmann — RDX/HMX Explosives",ic:"💣",or:he?"ורנר בכמן (1901-1951), כימאי אמריקאי מאוניברסיטת מישיגן. במלחמת העולם השנייה פיתח שיטה לייצור המוני של RDX — חומר הנפץ החזק ביותר שהיה זמין. RDX חזק פי 1.6 מ-TNT. HMX (תת-מוצר) חזק עוד יותר ומשמש גם בעדשות קריסה גרעיניות.":"Werner Bachmann (1901-1951), American chemist at University of Michigan. In WWII, developed mass production of RDX — the most powerful explosive available. RDX is 1.6× stronger than TNT. HMX (byproduct) is even stronger and also used in nuclear implosion lenses.",
   st:he?["הקסאמין (C₆H₁₂N₄, קוביות הצתה לקמפינג) + חומצה חנקתית מרוכזת (HNO₃)","ניטרציה מבוקרת בטמפרטורה 45-75°C — עלייה מעבר = פיצוץ! דורש בקרת טמפרטורה מדויקת","שטיפה במים, סינון וייבוש → RDX (הקסוגן) — גבישים לבנים, חזק פי 1.6 מ-TNT","שינוי תנאי תגובה (ריכוז, זמן) → HMX (אוקטוגן) — חזק יותר, יקר יותר","שימושים: ראשי קרב טילים + תוספת לדלק מוצק + עדשות קריסה (Implosion Lenses) לנשק גרעיני"]:["Hexamine (C₆H₁₂N₄, camping fuel cubes) + concentrated Nitric Acid (HNO₃)","Controlled nitration at 45-75°C — exceeding = explosion! Requires precise temperature control","Wash, filter, dry → RDX (Hexogen) — white crystals, 1.6× TNT power","Modified conditions (concentration, time) → HMX (Octogen) — more powerful, more expensive","Uses: missile warheads + solid fuel additive + nuclear Implosion Lenses"]},
];const p=pr[a];
return<Sec id="processes" num="05" title={he?"תהליכי ייצור כימיים":"Chemical Production Processes"} subtitle={he?"שלושת התהליכים הקריטיים שנפגעו בתקיפות":"Three critical processes targeted in strikes"} sidebar={<><SB color="purple" title={he?"📜 רקע היסטורי":"📜 Historical Background"}><p style={{fontSize:11,lineHeight:1.8}}>{p.or}</p></SB><SB color="amber" title={he?"⚡ מערבלים פלנטריים":"⚡ Planetary Mixers"}><p>{he?"מכונות ענק (עשרות טונות) לערבוב דלק מוצק. איראן אינה מסוגלת לייצר — מוברחים מסין דרך חברות קש. 12 מערבלים הושמדו באוקטובר 2024.":"Giant machines (tens of tons) for mixing solid fuel. Iran cannot manufacture — smuggled from China via shell companies. 12 mixers destroyed October 2024."}</p></SB></>}>
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{pr.map((x,i)=><button key={i} onClick={()=>setA(i)} className={a===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.nm.split("—")[0]}</button>)}</div>
  <div className="cm" style={{padding:24}}>
    <h3 className="sf" style={{fontSize:18,fontWeight:800,marginBottom:16}}>{p.ic} {p.nm}</h3>
    {p.st.map((s,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}><div style={{width:28,height:28,borderRadius:"50%",background:P.ink,color:P.gold,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div><p style={{fontSize:13,color:P.steel,paddingTop:3,lineHeight:1.7}}>{s}</p></div>)}
  </div>
</Sec>;}

/* ═══ CHEMISTRY — after processes, expanded with PubChem data ═══ */
function Chemistry({lang}:{lang:string}){const[tab,setTab]=useState(0);const he=lang==="he";
const ch=[
  {id:"IRFNA",nm:he?"חומצה חנקתית מעושנת אדומה מעוכבת":"Inhibited Red Fuming Nitric Acid",erg:"157",
   ps:[[he?"הרכב":"Composition","HNO₃ ≥70% + N₂O₄ 18-27% + HF 0.6%"],[he?"מראה":"Appearance",he?"נוזל כתום-אדום, אדים צהובים-חומים":"Orange-red liquid, yellow-brown fumes"],[he?"ריח":"Odor",he?"חנקני חריף, חודר ומחניק":"Sharp, penetrating, suffocating nitric odor"],[he?"צפיפות":"Density","1.55 g/cm³"],[he?"נקודת רתיחה":"Boiling Point","64°C"],[he?"נקודת קפאון":"Freezing Point","-52°C"],[he?"לחץ אדים":"Vapor Pressure","~48 mmHg @ 20°C"],[he?"צפיפות אדים":"Vapor Density","~2.2 (כבד מאוויר / heavier than air)"]],
   ds:[[he?"עור — גורם לכוויות כימיות חמורות והרס רקמות מיידי":"Skin — causes severe chemical burns and immediate tissue destruction"],[he?"עיניים — עיוורון תוך שניות מחשיפה ישירה":"Eyes — blindness within seconds of direct exposure"],[he?"שאיפה — בצקת ריאות מושהית: 24-48 שעות אחרי חשיפה, הצפת ריאות פתאומית וכשל נשימתי. חשוף שנראה בסדר עלול למות למחרת!":"Inhalation — delayed pulmonary edema: 24-48h after exposure, sudden lung flooding and respiratory failure. Exposed person who looks fine may die the next day!"]]},
  {id:"UDMH",nm:he?"דימתילהידראזין בלתי סימטרי":"Unsymmetrical Dimethylhydrazine (1,1-DMH)",erg:"131",
   ps:[["CAS","57-14-7"],[he?"נוסחה":"Formula","H₂NN(CH₃)₂ — C₂H₈N₂"],[he?"מראה":"Appearance",he?"נוזל שקוף, צהביב עם חשיפה לאוויר":"Clear liquid, turns yellowish on air exposure"],[he?"ריח":"Odor",he?"חריף — דמוי אמוניה ודגים":"Sharp — ammonia-like and fishy"],[he?"נקודת רתיחה":"Boiling Point","63°C"],[he?"נקודת הבזק":"Flash Point","-15°C"],[he?"טווח דליקות":"Flammability Range","2.5% — 95% (!)"], [he?"צפיפות":"Density","0.793 g/cm³"],[he?"מסיסות":"Solubility",he?"מסיס לחלוטין במים, אתנול, קרוסין":"Fully miscible in water, ethanol, kerosene"]],
   ds:[["IDLH: Ca [15 ppm] — IARC Group 2B ("+( he?"מסרטן סביר לאדם":"probably carcinogenic")+")"],[he?"חודר דרך עור שלם! נספג לזרם הדם ללא פצע חיצוני":"Penetrates intact skin! Absorbed into bloodstream without visible wound"],[he?"תוצרי פירוק: NDMA (דימתיל-ניטרוזאמין, מסרטן חזק) + פורמלדהיד + HCN (ציאניד). מזהמים קרקע עד 6 שבועות":"Decomposition: NDMA (strong carcinogen) + formaldehyde + HCN (cyanide). Contaminates soil up to 6 weeks"]]},
  {id:"NTO",nm:he?"חנקן טטראוקסיד — N₂O₄":"Nitrogen Tetroxide — N₂O₄",erg:"124",
   ps:[["CAS","10544-72-6"],[he?"נוסחה":"Formula","N₂O₄ ⇌ 2NO₂"],[he?"מראה":"Appearance",he?"נוזל חום-אדום עם אדים חומים כבדים":"Reddish-brown liquid with heavy brown fumes"],[he?"ריח":"Odor",he?"חריף, חנקני, דומה לכלור":"Sharp, nitric, chlorine-like"],[he?"נקודת רתיחה":"Boiling Point",he?"21.15°C — כלומר מתאדה בטמפרטורת החדר! בכל דליפה נוצרת ענן גז רעיל מיידית":"21.15°C — evaporates at room temperature! Any leak instantly creates toxic gas cloud"],[he?"צפיפות":"Density","1.448 g/cm³"],[he?"צפיפות אדים":"Vapor Density",he?"3.17 (כבד מאוויר — שוקע)":"3.17 (heavier than air — sinks)"]],
   ds:[[he?"קטלני בשאיפה! כמו IRFNA — בצקת ריאות מושהית 24-48 שעות":"Lethal by inhalation! Like IRFNA — delayed pulmonary edema 24-48h"],[he?"מגיב עם מים ברקמות הגוף ויוצר חומצה חנקתית (HNO₃) — שורף מבפנים":"Reacts with body tissue water to form nitric acid (HNO₃) — burns from inside"],[he?"משמש כמחמצן בטיל ח׳ורמשהר — המדויק והכבד ביותר בארסנל (CEP ~30 מ׳, 1,500 ק״ג)":"Used as oxidizer in Khorramshahr missile — most accurate and heaviest in arsenal (CEP ~30m, 1,500 kg)"]]},
  {id:"AP/HTPB",nm:he?"דלק מוצק קומפוזיט":"Composite Solid Propellant",erg:"—",
   ps:[[he?"מחמצן":"Oxidizer",he?"אמוניום פרכלורט (NH₄ClO₄) — ~70% מהמשקל":"Ammonium Perchlorate (NH₄ClO₄) — ~70% by weight"],[he?"מאגד/דלק":"Binder/Fuel","HTPB (Hydroxyl-Terminated Polybutadiene) — ~15%"],[he?"מתכת":"Metal Fuel",he?"אבקת אלומיניום (Al) — ~15%. מעלה טמפרטורה ואנרגיה":"Aluminum powder (Al) — ~15%. Raises temperature and energy"],[he?"תוספות":"Additives","RDX/HMX ("+( he?"בטילים מתקדמים":"in advanced missiles")+")"]],
   ds:[[he?"בעירה עצמית — ברגע שמתחילה, בלתי ניתנת לכיבוי! לא ניתן לעצור מנוע מוצק":"Self-sustaining combustion — once started, cannot be extinguished! Cannot stop solid motor"],[he?"תוצרי בעירה: HCl (חומצת מלח) + NOx (תחמוצות חנקן) + CO (פחמן חד-חמצני) + Al₂O₃ (אבק אלומינה)":"Combustion products: HCl + NOx + CO + Al₂O₃"],[he?"אמוניום פרכלורט מזהם מי תהום — בעיה סביבתית חמורה באזורי ייצור ושיגור":"Ammonium perchlorate contaminates groundwater — severe environmental issue near production/launch sites"]]},
];const c=ch[tab];
return<Sec id="chemistry" num="06" title={he?"תכונות פיסיקליות וכימיות של הדלקים":"Fuel Physical & Chemical Properties"} subtitle={he?"מקורות: PubChem, NIOSH, CAMEO":"Sources: PubChem, NIOSH, CAMEO"} sidebar={<><SB color="red" title={he?"⚠️ בצקת ריאות מושהית":"⚠️ Delayed Pulmonary Edema"}><p>{he?"סיכון ייחודי לנפגעי IRFNA ו-NTO: הנפגע עשוי להרגיש בסדר מיד לאחר החשיפה, אך 24-48 שעות מאוחר יותר — הצפת ריאות פתאומית וכשל נשימתי קטלני.":"Unique risk for IRFNA & NTO victims: may feel fine immediately after exposure, but 24-48 hours later — sudden lung flooding and fatal respiratory failure."}</p><p style={{fontWeight:700,marginTop:6}}>{he?"כל חשוף חייב אשפוז מיידי למעקב!":"Every exposed person must be immediately hospitalized for observation!"}</p></SB></>}>
  <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>{ch.map((x,i)=><button key={i} onClick={()=>setTab(i)} className={tab===i?"ta":"ti"} style={{padding:"8px 18px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.id}</button>)}</div>
  <div className="cm" style={{padding:24}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8}}>
      <h3 className="sf" style={{fontSize:18,fontWeight:800}}>{c.id} — {c.nm}</h3>
      {c.erg!=="—"&&<span className="mn" style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:700,background:P.blueS,color:P.blue}}>ERG Guide {c.erg}</span>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
      <div><h4 style={{fontSize:10,fontWeight:800,color:P.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>{he?"תכונות פיסיקליות":"PHYSICAL PROPERTIES"}</h4>{c.ps.map((p,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${P.border}40`,fontSize:13,display:"flex",justifyContent:"space-between",gap:8}}><span style={{color:P.muted,flexShrink:0}}>{p[0]}:</span><span style={{fontWeight:500,textAlign:"left"}} dir="ltr">{p[1]}</span></div>)}</div>
      <div><h4 style={{fontSize:10,fontWeight:800,color:P.red,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>⚠️ {he?"סיכונים":"HAZARDS"}</h4>{c.ds.map((d,i)=><div key={i} style={{padding:"8px",background:`${P.red}06`,borderRadius:4,marginBottom:6,fontSize:12,color:P.red,fontWeight:500,lineHeight:1.6}}>{d[0]}</div>)}</div>
    </div>
  </div>
</Sec>;}

/* ═══ HAZMAT — positive instructions, after chemistry ═══ */
function HazMat({lang}:{lang:string}){const he=lang==="he";
const pr=[
  {t:"IRFNA — ERG Guide 157",c:P.red,it:he?[
    "🚧 בידוד: רדיוס מינימלי 50 מטר. אירוע אש: 800 מטר. תמיד במעלה הרוח!",
    "🧑‍🚀 מיגון: חליפת מגן רמה A (אטומה לגזים) + מנ״פ (מערכת נשימה עצמית) — ללא חלופה!",
    "🧪 ספיכת שלולית: חול יבש או חומר ספיגה אינרטי (ורמיקוליט). לאסוף למכל אטום לסילוק",
    "💧 ענן אדים: ריסוס ערפל מים (לא סילון!) על ענן הגז — מוהל ומפזר את הגזים הרעילים",
    "⚗️ ניטרול: NaHCO₃ (סודה לשתיה) מדורג — לעולם לא בבת אחת! תגובה אקזותרמית",
    "🌡️ קירור: ערפל מים על מכלים חשופים למניעת לחץ יתר"
  ]:["🚧 Isolate: 50m minimum. Fire: 800m. Always upwind!","🧑‍🚀 PPE: Level A encapsulated suit + SCBA — no alternative!","🧪 Pool: dry sand or inert absorbent (vermiculite). Collect in sealed container","💧 Vapor: water fog spray (not jet!) on gas cloud — dilutes and disperses","⚗️ Neutralize: NaHCO₃ gradually — never all at once! Exothermic reaction","🌡️ Cool: water fog on exposed containers to prevent overpressure"]},
  {t:"UDMH — ERG Guide 131",c:P.purple,it:he?[
    "🚧 בידוד: 100 מטר. דליפה גדולה: 300+ מטר. תמיד במעלה הרוח!",
    "🧑‍🚀 חליפת מגן רמה A — UDMH חודר עור שלם! כל חשיפה עורית = פינוי לאשפוז",
    "💧 כיבוי שריפה: ערפל מים + קצף AR-AFFF (עמיד לאלכוהול). לא מים בסילון!",
    "🧪 ספיכה: חומר סופח + מים בכמות גדולה למיהול. איסוף לסילוק כפסולת מסוכנת",
    "☠️ זהירות מתוצרי פירוק: NDMA (מסרטן) + פורמלדהיד + HCN (ציאניד). קרקע מזוהמת עד 6 שבועות!",
    "💊 חשוף ל-UDMH: ויטמין B6 (פירידוקסין) — נוגדן לעוויתות שנגרמות מ-UDMH"
  ]:["🚧 Isolate: 100m. Large spill: 300+m. Always upwind!","🧑‍🚀 Level A suit — UDMH penetrates intact skin! Any skin exposure = hospital","💧 Fire: water fog + AR-AFFF foam. Never water jet!","🧪 Absorb: absorbent + large volume water dilution. Collect as hazardous waste","☠️ Decomposition warning: NDMA (carcinogen) + formaldehyde + HCN. Soil contaminated 6 weeks!","💊 UDMH exposure: Vitamin B6 (Pyridoxine) — anti-convulsant for UDMH seizures"]},
];
return<Sec id="hazmat" num="07" title={he?"מענה חומ״ס — ERG 2024":"HazMat Response — ERG 2024"} subtitle={he?"פרוטוקולי בידוד, מיגון, ספיכה וניטרול":"Isolation, PPE, absorption & neutralization protocols"}>
  <div style={{display:"flex",flexDirection:"column",gap:12}}>
    {pr.map((p,i)=><div key={i} className="cm" style={{padding:20,borderRight:`3px solid ${p.c}`}}>
      <h4 className="sf" style={{fontWeight:800,fontSize:15,marginBottom:12}}>{p.t}</h4>
      {p.it.map((x,j)=><p key={j} style={{fontSize:13,color:P.steel,lineHeight:1.8,marginBottom:6}}>{x}</p>)}
    </div>)}
  </div>
</Sec>;}

/* ═══ MEDICAL — expanded ═══ */
function Medical({lang}:{lang:string}){const he=lang==="he";
return<Sec id="medical" num="08" title={he?"פרוטוקול רפואי":"Medical Protocol"} subtitle={he?"טיפול בנפגעי דלקי טילים":"Treatment for missile fuel casualties"}>
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
return<Sec id="strategic" num="09" title={he?"למה HNO₃ הוא חומר מפתח בייצור טילים?":"Why is HNO₃ a Key Material in Missile Production?"} dark sidebar={<SB color="red" title={he?"🔑 המשמעות":"🔑 Significance"}><p>{he?"פגיעה במתקן אחד לייצור חומצה חנקתית משתקת בו-זמנית ארבע יכולות נשק שונות. לאיראן אין חומר גלם אחר עם השפעה כה רחבה.":"Hitting a single nitric acid plant simultaneously paralyzes four different weapon capabilities. Iran has no other raw material with such broad impact."}</p></SB>}>
  <div className="cm" style={{padding:24,marginBottom:20}}>
    <p style={{fontSize:14,color:P.ink,lineHeight:1.9,marginBottom:16,fontWeight:500}}>{he?"חומצה חנקתית (HNO₃) מיוצרת בתהליך אוסטוולד מאמוניה. זהו חומר הגלם הבסיסי ביותר בשרשרת הנשק האיראנית. ממנו מייצרים ארבעה מוצרים קריטיים שונים — ולכן פגיעה במתקן ייצור אחד של חומצה חנקתית משתקת ארבע מערכות נשק בו-זמנית:":"Nitric acid (HNO₃) is produced via the Ostwald process from ammonia. It is the most fundamental precursor in Iran's weapons chain. Four different critical products are derived from it — which is why hitting a single nitric acid production facility paralyzes four weapon systems simultaneously:"}</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
      {[{ic:"💧",t:he?"מחמצן IRFNA":"IRFNA Oxidizer",d:he?"HNO₃ + N₂O₄ + HF → IRFNA. דלק טילים נוזליים: שהאב, גדר, קיאם, עמאד":"HNO₃ + N₂O₄ + HF → IRFNA. Liquid missiles: Shahab, Ghadr, Qiam, Emad",bg:P.blueS,c:P.blue},
        {ic:"🧊",t:he?"מחמצן NTO":"NTO Oxidizer",d:he?"מ-HNO₃ מופק N₂O₄ — מחמצן לטיל ח׳ורמשהר (המדויק ביותר)":"N₂O₄ derived from HNO₃ — oxidizer for Khorramshahr (most accurate)",bg:P.purpleS,c:P.purple},
        {ic:"💣",t:he?"חומרי נפץ":"Explosives",d:he?"HNO₃ + הקסאמין → RDX/HMX (תהליך בכמן). משמשים בראשי קרב ובדלק מוצק":"HNO₃ + hexamine → RDX/HMX (Bachmann). Used in warheads and solid fuel",bg:P.amberS,c:P.amber},
        {ic:"☢️",t:he?"עדשות גרעיניות":"Nuclear Lenses",d:he?"HMX משמש בעדשות קריסה (Implosion Lenses) — מרכיב קריטי בנשק גרעיני":"HMX used in Implosion Lenses — critical nuclear weapon component",bg:P.redS,c:P.red},
      ].map((x,i)=><div key={i} className="cm" style={{padding:16,background:x.bg,textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:6}}>{x.ic}</div>
        <div style={{fontSize:12,fontWeight:800,color:x.c,marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11,color:P.ink,lineHeight:1.6,fontWeight:500}}>{x.d}</div>
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
   details:he?["פורדו — מתקן העשרה תת-קרקעי חפור בהר. מוגן ביותר","נתנז — המתקן הגדול ביותר. אלפי מרכזות IR-6 מתקדמות","אספהאן — המרת אורניום (UCF) + מחקר","ארה״ב הצטרפה למבצע ב-22 ביוני והפציצה עם 14 פצצות GBU-57 חודרות בונקר","כל פצצת GBU-57 שוקלת ~14 טון וחודרת עד 60 מטר בסלע","לפי IAEA — 233 ק״ג אורניום ב-60% העשרה היו באתרים לפני התקיפה"]:["Fordow — underground enrichment in mountain. Most protected","Natanz — largest facility. Thousands of advanced IR-6 centrifuges","Isfahan — Uranium Conversion Facility (UCF) + research","US joined June 22, struck with 14 GBU-57 bunker busters","Each GBU-57 weighs ~14 tons, penetrates up to 60m of rock","Per IAEA — 233 kg of 60% enriched uranium at sites before strike"]},
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
return<Sec id="glossary" num="13" title={he?"מקרא מונחים":"Glossary"} subtitle={`${terms.length} ${he?'מונחים מורחבים':'expanded terms'}`}>
  <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>{cats.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={cat===c.k?"ta":"ti"} style={{padding:"5px 12px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>{c.l}</button>)}</div>
  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={he?"🔍 חיפוש מונח...":"🔍 Search..."} style={{width:"100%",padding:"10px 14px",borderRadius:8,background:P.white,border:`1px solid ${P.border}`,fontSize:13,marginBottom:16,outline:"none"}}/>
  <div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map((tm,i)=>{const[bg,c]=catC[tm.c]||[P.cream,P.muted];return<div key={i} className="cm" style={{padding:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontWeight:800,color:P.blue,fontSize:14}}>{tm.t}</span><span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:bg,color:c}}>{cats.find(x=>x.k===tm.c)?.l}</span></div><p style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{tm.d}</p></div>;})}</div>
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

  return<Sec id="rangemap" num="03½" title={he?"מפת טווחי טילים":"Missile Range Map"} subtitle={he?"רדיוס הגעה ממרכז איראן — מפה אינטראקטיבית":"Reach radius from central Iran — interactive map"} dark>
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
   render:()=><svg viewBox="0 0 560 340" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"אמוניה NH₃":"Ammonia NH₃"} color="#3b82f6"/>
    <Tank x={10} y={100} label={he?"אוויר O₂+N₂":"Air O₂+N₂"} color="#64748b"/>
    <Arrow x1={60} y1={62} x2={130} y2={62}/>
    <Arrow x1={60} y1={130} x2={130} y2={85}/>
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
    <text x={410} y={240} textAnchor="middle" fill="#94a3b8" fontSize="6">HNO₃ → {">"}86%</text>
    <Arrow x1={390} y1={230} x2={390} y2={260}/>
    {/* Final IRFNA mixing */}
    <Reactor x={355} y={260} label="IRFNA" params={he?"מחמצן לטילים":"Missile Oxidizer"} rxn="HNO₃ + N₂O₄ + HF"/>
  </svg>},
  {name:he?"רשיג — UDMH":"Raschig — UDMH",ic:"🟣",
   render:()=><svg viewBox="0 0 560 340" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"אמוניה NH₃":"Ammonia NH₃"} color="#3b82f6"/>
    <Tank x={10} y={110} label={he?"היפוכלוריט NaOCl":"Hypochlorite NaOCl"} color="#64748b"/>
    <Arrow x1={60} y1={55} x2={130} y2={55}/>
    <Arrow x1={60} y1={140} x2={130} y2={80}/>
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
    <text x={435} y={115} textAnchor="middle" fill="#94a3b8" fontSize="5.5">{he?"HCl → פסולת":"HCl → waste"}</text>
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
   render:()=><svg viewBox="0 0 560 340" style={{width:"100%"}}>
    <defs><marker id="pah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
    <Tank x={10} y={20} label={he?"הקסאמין":"Hexamine"} color="#3b82f6"/>
    <text x={35} y={75} textAnchor="middle" fill="#3b82f6" fontSize="5.5" fontFamily="monospace">C₆H₁₂N₄</text>
    <Tank x={10} y={110} label={he?"HNO₃ מרוכזת":"Conc. HNO₃"} color="#dc2626"/>
    <text x={35} y={165} textAnchor="middle" fill="#dc2626" fontSize="5.5" fontFamily="monospace">{">"}98%</text>
    <Arrow x1={60} y1={55} x2={130} y2={55}/>
    <Arrow x1={60} y1={140} x2={130} y2={80}/>
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
return<Sec id="flowdiagram" num="05½" title={he?"תרשים זרימת ייצור":"Production Flow Diagram"} subtitle={he?"ריאקטורים, מפרידים, עמודי זיקוק — עם טמפרטורות, לחצים ותגובות כימיות":"Reactors, separators, distillation columns — with temperatures, pressures & chemical reactions"}>
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{diagrams.map((x,i)=><button key={i} onClick={()=>setProc(i)} className={proc===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.name.split("—")[0]}</button>)}</div>
  <div className="cm" style={{padding:16,overflow:"auto",background:"#fafaf8"}}>
    {d.render()}
  </div>
</Sec>;}

/* ═══ INFOGRAPHIC ═══ */
function Infographic({lang}:{lang:string}){const he=lang==="he";const[zoom,setZoom]=useState(false);
return<Sec id="infographic" num="11" title={he?"אינפוגרפיקה":"Infographic"} subtitle={he?"טכנולוגיית ייצור טילים בליסטיים":"Ballistic Missile Production Technology"} dark>
  <div className="cm" style={{padding:8,cursor:"pointer",overflow:"hidden"}} onClick={()=>setZoom(!zoom)}>
    <img src="/images/infographic.png" alt={he?"אינפוגרפיקה":"Infographic"} style={{width:"100%",borderRadius:6,transition:"transform 0.3s",transform:zoom?"scale(1.8)":"scale(1)",transformOrigin:"top center"}}/>
  </div>
  <p style={{fontSize:11,color:P.muted,marginTop:8,textAlign:"center"}}>{he?"💡 לחצו על התמונה להגדלה / הקטנה":"💡 Click to zoom in/out"}</p>
</Sec>;}

/* ═══ PRESENTATION GALLERY ═══ */
function Gallery({lang}:{lang:string}){const he=lang==="he";const[cur,setCur]=useState(0);const[fs,setFs]=useState(false);
const slides=Array.from({length:13},(_,i)=>`/images/slide-${String(i+1).padStart(2,'0')}.jpg`);
const prev=()=>setCur(c=>Math.max(0,c-1));const next=()=>setCur(c=>Math.min(12,c+1));
return<Sec id="gallery" num="12" title={he?"מצגת מודיעינית":"Intelligence Presentation"} subtitle={`13 ${he?"שקפים":"slides"}`}>
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
function Sources({lang}:{lang:string}){const he=lang==="he";const sr=[{n:"CSIS Missile Defense Project",c:he?"מחקרי":"Research"},{n:"Iran Watch — Missile Arsenal",c:he?"מחקרי":"Research"},{n:"USIP — Ballistic Missile Program",c:he?"ממשלתי":"Govt"},{n:"NIOSH/CDC — UDMH Pocket Guide",c:he?"ממשלתי":"Govt"},{n:"PubChem — Chemical Properties",c:he?"ממשלתי":"Govt"},{n:"NOAA CAMEO — IRFNA & NTO",c:he?"ממשלתי":"Govt"},{n:"ERG 2024 — PHMSA/DOT",c:he?"ממשלתי":"Govt"},{n:"NCBI — AEGL Dimethylhydrazine",c:he?"אקדמי":"Academic"},{n:"PMC — Delayed Pulmonary Edema",c:he?"אקדמי":"Academic"},{n:"Alma Center — Iran Missiles",c:he?"מחקרי":"Research"},{n:"IISS Military Balance",c:he?"מחקרי":"Research"},{n:"Critical Threats — Israeli Strikes",c:he?"מחקרי":"Research"}];const cc:Record<string,[string,string]>={[he?"ממשלתי":"Govt"]:[P.greenS,P.green],[he?"מחקרי":"Research"]:[P.blueS,P.blue],[he?"אקדמי":"Academic"]:[P.purpleS,P.purple]};return<Sec id="sources" num="14" title={he?"מקורות":"Sources"}>{sr.map((s,i)=>{const[bg,c]=cc[s.c]||[P.cream,P.muted];return<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}><span style={{color:P.gold}}>🔗</span><span style={{flex:1,fontSize:13,color:P.steel}}>{s.n}</span><span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:bg,color:c}}>{s.c}</span></div>;})}</Sec>;}

/* ═══ FOOTER ═══ */
function Footer({lang}:{lang:string}){const he=lang==="he";return<footer style={{borderTop:`1px solid ${P.gold}40`,padding:"36px 20px",background:P.ink,textAlign:"center"}}><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}><img src="/images/logo-60sec.png" alt="" style={{width:32,height:32,borderRadius:6}}/><span style={{fontSize:14,fontWeight:700,color:P.gold}}>{he?"ניתוח 60 שניות של חומ״ס":"60 Seconds HazMat"}</span></div><p style={{fontSize:13,color:`${P.white}80`,marginBottom:10}}><b style={{color:P.white}}>{he?"רועי צוקרמן":"Roei Zukerman"}</b> — {he?"מומחה לחומ״ס וטב״ק":"HazMat & CBRN Expert"}</p><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14,flexWrap:"wrap"}}><a href="mailto:roiez1@gmail.com" style={{fontSize:12,color:P.gold,textDecoration:"none"}}>✉️ roiez1@gmail.com</a><a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" style={{fontSize:11,fontWeight:700,color:"#22c55e",background:"rgba(34,197,94,0.1)",padding:"5px 14px",borderRadius:6,textDecoration:"none",border:"1px solid rgba(34,197,94,0.25)"}}>💬 WhatsApp</a></div><div style={{height:1,maxWidth:300,margin:"0 auto 10px",background:`linear-gradient(90deg,transparent,${P.gold}60,transparent)`}}/><p style={{fontSize:10,color:`${P.white}25`}}>{he?"מקורות פתוחים | לא מסווג":"Open sources | Unclassified"} | {he?"אפריל 2026":"April 2026"}</p><p style={{fontSize:9,color:`${P.white}15`,marginTop:6}}>© 2026 {he?"רועי צוקרמן — מומחה לחומ״ס וטב״ק | כל הזכויות שמורות":"Roei Zukerman — HazMat & CBRN Expert | All rights reserved"}</p></footer>;}

/* ═══ MAIN ═══ */
export default function Home(){const[lang,setLang]=useState("he");return<div dir={lang==="he"?"rtl":"ltr"}><ProgressBar/><Nav lang={lang} toggle={()=>setLang(l=>l==="he"?"en":"he")}/><Hero lang={lang}/><Timeline lang={lang}/><Facilities lang={lang}/><MissileDiagram lang={lang}/><Arsenal lang={lang}/><RangeMap lang={lang}/><Propulsion lang={lang}/><Processes lang={lang}/><FlowDiagram lang={lang}/><Chemistry lang={lang}/><HazMat lang={lang}/><Medical lang={lang}/><Strategic lang={lang}/><Infographic lang={lang}/><Gallery lang={lang}/><Glossary lang={lang}/><Sources lang={lang}/><Footer lang={lang}/></div>;}
