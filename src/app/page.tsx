'use client';
import { useState, useEffect } from 'react';

const P = {
  ink:"#0c1222",navy:"#162040",steel:"#1e293b",gold:"#c8a44e",gL:"#e8d5a0",
  cream:"#f5f0e8",parch:"#faf7f0",red:"#b91c1c",redS:"#fef2f2",
  blue:"#1e40af",blueS:"#eff6ff",amber:"#92400e",amberS:"#fffbeb",
  purple:"#6b21a8",purpleS:"#faf5ff",green:"#166534",greenS:"#f0fdf4",
  muted:"#64748b",border:"#e2e0d8",white:"#fff"
};

const sIDs=["home","timeline","diagram","arsenal","rangemap","propulsion","processes","flowdiagram","chemistry","hazmat","medical","strategic","facilities","glossary","sources"];
const sHe=["ראשי","ציר זמן","אנטומיה","ארסנל","טווחים","הנעה","ייצור","זרימה","דלקים","חומ״ס","רפואי","אסטרטגי","מתקנים","מקרא","מקורות"];
const sEn=["Home","Timeline","Anatomy","Arsenal","Ranges","Propulsion","Production","Flow","Fuels","HazMat","Medical","Strategic","Facilities","Glossary","Sources"];

function ProgressBar(){const[p,setP]=useState(0);useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;setP(h>0?(window.scrollY/h)*100:0);};window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);return<div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:3,background:P.cream}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${P.gold},${P.gL})`,transition:"width 120ms"}}/></div>;}

function Nav({lang,toggle}:{lang:string;toggle:()=>void}){const[open,setOpen]=useState(false);const labels=lang==="he"?sHe:sEn;return<><nav className="nv"><div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div className="mn" style={{width:30,height:30,borderRadius:6,background:P.ink,display:"flex",alignItems:"center",justifyContent:"center",color:P.gold,fontWeight:900,fontSize:11}}>60</div><span style={{fontSize:10,fontWeight:700,color:P.muted}}>60 שניות חומ״ס</span></div><div className="hd-links" style={{display:"flex",gap:2,alignItems:"center"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} style={{padding:"6px 8px",fontSize:10,color:P.muted,textDecoration:"none",borderRadius:4}}>{s}</a>)}<button onClick={toggle} className="mn" style={{padding:"5px 14px",fontSize:11,fontWeight:800,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginInlineStart:8}}>{lang==="he"?"EN":"עב"}</button></div><button className="mob-btn" onClick={()=>setOpen(!open)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer",color:P.muted,fontSize:22}}>☰</button></div></nav>{open&&<div className="mob-menu" style={{position:"fixed",top:51,left:0,right:0,zIndex:89,background:P.white,borderBottom:`1px solid ${P.border}`,padding:8,boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>{labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} onClick={()=>setOpen(false)} style={{display:"block",padding:"10px 16px",fontSize:13,color:P.steel,textDecoration:"none"}}>{s}</a>)}<button onClick={()=>{toggle();setOpen(false);}} style={{display:"block",width:"100%",padding:"10px",fontSize:13,fontWeight:700,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginTop:4}}>{lang==="he"?"English":"עברית"}</button></div>}</>;}

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
  {y:"6/25",h:"מבצע אריה עולה (מלחמת 12 הימים): תקיפת מתקני הגרעין פורדו, נתנז ואספהאן. 14 פצצות GBU-57 חודרות בונקר",e:"Op. Rising Lion (12-Day War): Fordow, Natanz, Isfahan nuclear strikes. 14 GBU-57 bunker busters",r:true},
  {y:"2/26",h:"מבצע שאגת האריה: מתקפה אמריקאית-ישראלית מתואמת. מנהיג עליון חמינאי חוסל. 15,000+ מטרות, 85% הגנ״א מושמדת. יותר מ-5,700 גיחות קרב",e:"Op. Roaring Lion: US-Israel coordinated attack. Supreme Leader Khamenei killed. 15,000+ targets, 85% air defense destroyed. 5,700+ combat sorties",r:true},
  {y:"4/26",h:"תקיפות מתקני אנרגיה ותעשייה כימית, כולל מתקני ייצור חומצה חנקתית. המלחמה נמשכת",e:"Energy & chemical industry strikes including nitric acid plants. War ongoing",r:true},
];return<Sec id="timeline" num="01" title={he?"ציר זמן: תוכנית הטילים":"Timeline: Missile Program"} subtitle={he?"1984 — מסקאד ועד מלחמה פתוחה":"1984 — From Scud to open war"} sidebar={<><SB color="gold" title={he?"נקודות מפנה":"Turning Points"}><p><b>1998</b> — Scud→Shahab (×4 {he?"טווח":"range"})</p><p><b>2008</b> — {he?"נוזלי":"Liquid"}→{he?"מוצק":"Solid"} (Sejjil)</p><p><b>10/2024</b> — {he?"מערבלים פלנטריים":"Planetary mixers"}</p><p><b>6/2025</b> — {he?"מתקני גרעין":"Nuclear facilities"}</p><p><b>2/2026</b> — {he?"מתקפה מלאה":"Full-scale attack"}</p></SB></>}>{ev.map((e,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${P.border}30`}}><div className="mn" style={{flexShrink:0,width:48,fontSize:12,fontWeight:700,color:e.r?P.red:P.gold,textAlign:"center"}}>{e.y}</div><div style={{width:8,height:8,borderRadius:"50%",border:`2px solid ${e.r?P.red:P.gold}`,background:e.r?P.red:"transparent",flexShrink:0,marginTop:5}}/><p style={{fontSize:13,color:e.r?P.red:P.steel,fontWeight:e.r?600:400}}>{he?e.h:e.e}</p></div>)}</Sec>;}

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
return<Sec id="strategic" num="09" title={he?"צוואר הבקבוק הכימי — חומצה חנקתית":"Chemical Chokepoint — Nitric Acid"} dark sidebar={<SB color="red" title={he?"🔑 המשמעות":"🔑 Significance"}><p>{he?"פגיעה במתקן אחד לייצור חומצה חנקתית משתקת בו-זמנית ארבע יכולות נשק שונות. לאיראן אין חומר גלם אחר עם השפעה כה רחבה.":"Hitting a single nitric acid plant simultaneously paralyzes four different weapon capabilities. Iran has no other raw material with such broad impact."}</p></SB>}>
  <div className="cm" style={{padding:24,marginBottom:20}}>
    <h3 className="sf" style={{fontSize:18,fontWeight:800,marginBottom:12}}>{he?"למה HNO₃ הוא המפתח המוחלט?":"Why is HNO₃ the absolute key?"}</h3>
    <p style={{fontSize:13,color:P.steel,lineHeight:1.8,marginBottom:16}}>{he?"חומצה חנקתית (HNO₃) מיוצרת בתהליך אוסטוולד מאמוניה. זהו חומר הגלם הבסיסי ביותר בשרשרת הנשק האיראנית. ממנו מייצרים ארבעה מוצרים קריטיים שונים — ולכן פגיעה במתקן ייצור אחד של חומצה חנקתית משתקת ארבע מערכות נשק בו-זמנית:":"Nitric acid (HNO₃) is produced via the Ostwald process from ammonia. It is the most fundamental precursor in Iran's weapons chain. Four different critical products are derived from it — which is why hitting a single nitric acid production facility paralyzes four weapon systems simultaneously:"}</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
      {[{ic:"💧",t:he?"מחמצן IRFNA":"IRFNA Oxidizer",d:he?"HNO₃ + N₂O₄ + HF → IRFNA. דלק טילים נוזליים: שהאב, גדר, קיאם, עמאד":"HNO₃ + N₂O₄ + HF → IRFNA. Liquid missiles: Shahab, Ghadr, Qiam, Emad",bg:P.blueS,c:P.blue},
        {ic:"🧊",t:he?"מחמצן NTO":"NTO Oxidizer",d:he?"מ-HNO₃ מופק N₂O₄ — מחמצן לטיל ח׳ורמשהר (המדויק ביותר)":"N₂O₄ derived from HNO₃ — oxidizer for Khorramshahr (most accurate)",bg:P.purpleS,c:P.purple},
        {ic:"💣",t:he?"חומרי נפץ":"Explosives",d:he?"HNO₃ + הקסאמין → RDX/HMX (תהליך בכמן). משמשים בראשי קרב ובדלק מוצק":"HNO₃ + hexamine → RDX/HMX (Bachmann). Used in warheads and solid fuel",bg:P.amberS,c:P.amber},
        {ic:"☢️",t:he?"עדשות גרעיניות":"Nuclear Lenses",d:he?"HMX משמש בעדשות קריסה (Implosion Lenses) — מרכיב קריטי בנשק גרעיני":"HMX used in Implosion Lenses — critical nuclear weapon component",bg:P.redS,c:P.red},
      ].map((x,i)=><div key={i} className="cm" style={{padding:16,background:x.bg,textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:6}}>{x.ic}</div>
        <div style={{fontSize:11,fontWeight:800,color:x.c,marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:10,color:P.muted,lineHeight:1.5}}>{x.d}</div>
      </div>)}
    </div>
  </div>
</Sec>;}

/* ═══ FACILITIES ═══ */
function Facilities({lang}:{lang:string}){const he=lang==="he";
const fs=[
  {n:he?"פרצ׳ין":"Parchin",d:he?"PCI — ייצור HNO₃, חומרי נפץ. מתקן טאלקאן 2 (קשר גרעיני). 3 מבני ערבוב דלק מוצק":"PCI — HNO₃, explosives. Talaqan-2 (nuclear link). 3 solid fuel mixing buildings",s:he?"אוקטובר 2024":"October 2024"},
  {n:he?"ח׳וג׳יר":"Khojir",d:he?"SHIG+SBIG. ייצור דלק מוצק, הרכבת טילים. 2 מבני ערבוב נהרסו":"SHIG+SBIG. Solid fuel production, missile assembly. 2 mixing buildings destroyed",s:he?"אוקטובר 2024":"October 2024"},
  {n:he?"שאהרוד":"Shahrud",d:he?"ייצור מנועי טילים מוצקים. מערבלים פלנטריים ובורות יציקה":"Solid missile engine production. Planetary mixers and casting pits",s:he?"אוקטובר 2024":"October 2024"},
  {n:he?"אספהאן (פורדו/נתנז)":"Isfahan (Fordow/Natanz)",d:he?"מתקני העשרת אורניום + המרה. 14 פצצות GBU-57 חודרות בונקר":"Uranium enrichment + conversion. 14 GBU-57 bunker busters",s:he?"יוני 2025":"June 2025"},
  {n:he?"אסלויה / South Pars":"Asaluyeh / South Pars",d:he?"פטרוכימיה — ייצור אמוניה + HNO₃. 85% מייצוא הפטרוכימי":"Petrochemicals — ammonia + HNO₃. 85% of petrochemical exports",s:he?"פברואר 2026":"February 2026"},
  {n:he?"מתקני HNO₃ (כולל שיראז)":"HNO₃ plants (incl. Shiraz)",d:he?"ייצור חומצה חנקתית — צוואר הבקבוק. נתקפים במסגרת המלחמה המתמשכת":"Nitric acid production — chokepoint. Targeted in ongoing war",s:he?"2026 (מתמשך)":"2026 (ongoing)"},
];
return<Sec id="facilities" num="10" title={he?"מתקנים שהותקפו":"Facilities Struck"} subtitle={he?"שלוש גלי תקיפה: 10/2024, 6/2025, 2/2026+":"Three strike waves: 10/2024, 6/2025, 2/2026+"} sidebar={<SB color="amber" title={he?"📦 יבוא מסין":"📦 Chinese Imports"}><p>{he?"חברת הקש Pishgaman Tejarat Rafi Novin רכשה אלפי טונות נתרן פרכלורט (מחמצן לדלק מוצק) מהונג קונג דרך נמל ג׳והאי. כמות מספיקה לייצור ~800 טילים מוצקים. סגירת ערוץ זה = השבתת ייצור דלק מוצק.":"Shell company Pishgaman Tejarat Rafi Novin purchased thousands of tons of sodium perchlorate (solid fuel oxidizer) from Hong Kong via Zhuhai port. Enough for ~800 solid missiles. Closing this channel = solid fuel production shutdown."}</p></SB>}>
  {fs.map((f,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 0",borderBottom:`1px solid ${P.border}30`}}><div style={{flex:1}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
      <h4 style={{fontWeight:800,fontSize:15}}>{f.n}</h4>
      <span className="mn" style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:P.redS,color:P.red}}>{f.s}</span>
    </div>
    <p style={{fontSize:13,color:P.muted,lineHeight:1.6}}>{f.d}</p>
  </div></div>)}
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
return<Sec id="glossary" num="11" title={he?"מקרא מונחים":"Glossary"} subtitle={`${terms.length} ${he?'מונחים מורחבים':'expanded terms'}`}>
  <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>{cats.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={cat===c.k?"ta":"ti"} style={{padding:"5px 12px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>{c.l}</button>)}</div>
  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={he?"🔍 חיפוש מונח...":"🔍 Search..."} style={{width:"100%",padding:"10px 14px",borderRadius:8,background:P.white,border:`1px solid ${P.border}`,fontSize:13,marginBottom:16,outline:"none"}}/>
  <div style={{display:"flex",flexDirection:"column",gap:8}}>{filtered.map((tm,i)=>{const[bg,c]=catC[tm.c]||[P.cream,P.muted];return<div key={i} className="cm" style={{padding:14}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontWeight:800,color:P.blue,fontSize:14}}>{tm.t}</span><span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:bg,color:c}}>{cats.find(x=>x.k===tm.c)?.l}</span></div><p style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{tm.d}</p></div>;})}</div>
</Sec>;}

/* ═══ MISSILE RANGE MAP ═══ */
function RangeMap({lang}:{lang:string}){const he=lang==="he";
const[hovMissile,setHovMissile]=useState<string|null>(null);
// Iran center approx: 32.5°N, 53.5°E. SVG centered on Iran.
// Scale: ~1 degree ≈ 111 km. Map shows ~40° wide (4,400 km radius coverage)
const cx=250,cy=180; // Iran center in SVG coords
const scale=0.09; // degrees to SVG pixels (approx)
const ranges=[
  {name:he?"פאתח-110":"Fateh-110",r:300,color:"#86efac",dash:""},
  {name:he?"זולפקאר":"Zolfaghar",r:700,color:"#fde047",dash:""},
  {name:he?"קיאם":"Qiam",r:1000,color:"#fdba74",dash:""},
  {name:he?"שהאב-3":"Shahab-3",r:1300,color:"#fb923c",dash:""},
  {name:he?"ח׳ייבר שכן":"Kheibar Shekan",r:1450,color:"#f87171",dash:""},
  {name:he?"גדר / עמאד":"Ghadr / Emad",r:1800,color:"#ef4444",dash:""},
  {name:he?"ח׳ורמשהר / סג׳יל":"Khorramshahr / Sejjil",r:2000,color:"#dc2626",dash:"4,2"},
];
const targets=[
  {name:he?"תל אביב":"Tel Aviv",dist:1550,angle:250},
  {name:he?"ריאד":"Riyadh",dist:1200,angle:215},
  {name:he?"אנקרה":"Ankara",dist:1800,angle:300},
  {name:he?"ניו דלהי":"New Delhi",dist:2400,angle:110},
  {name:he?"קהיר":"Cairo",dist:2000,angle:245},
  {name:he?"בגדד":"Baghdad",dist:700,angle:260},
  {name:he?"דובאי":"Dubai",dist:800,angle:170},
  {name:he?"דמשק":"Damascus",dist:1200,angle:260},
  {name:he?"באקו":"Baku",dist:600,angle:345},
];
const kmToR=(km:number)=>km*scale;
const angleToXY=(dist:number,angleDeg:number)=>{const rad=(angleDeg-90)*Math.PI/180;return{x:cx+kmToR(dist)*Math.cos(rad),y:cy+kmToR(dist)*Math.sin(rad)};};
return<Sec id="rangemap" num="03½" title={he?"מפת טווחי טילים":"Missile Range Map"} subtitle={he?"רדיוס הגעה ממרכז איראן":"Reach radius from central Iran"} dark>
  <div className="cm" style={{padding:16,overflow:"hidden"}}>
    <svg viewBox="0 0 500 360" style={{width:"100%",background:"#0f172a",borderRadius:8}}>
      <defs>
        <radialGradient id="irG" cx="50%" cy="50%"><stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#0f172a"/></radialGradient>
      </defs>
      <rect width="500" height="360" fill="url(#irG)"/>
      {/* Grid lines */}
      {[500,1000,1500,2000].map(km=><circle key={km} cx={cx} cy={cy} r={kmToR(km)} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,4"/>)}
      {[500,1000,1500,2000].map(km=><text key={km} x={cx+kmToR(km)+2} y={cy-3} fill="#475569" fontSize="6" fontFamily="monospace">{km} km</text>)}
      {/* Range circles */}
      {ranges.slice().reverse().map(rng=><circle key={rng.name} cx={cx} cy={cy} r={kmToR(rng.r)} fill={hovMissile===rng.name?`${rng.color}20`:"none"} stroke={rng.color} strokeWidth={hovMissile===rng.name?1.5:0.8} strokeDasharray={rng.dash} strokeOpacity={hovMissile===rng.name?1:0.5} style={{transition:"all 0.2s",cursor:"pointer"}} onMouseEnter={()=>setHovMissile(rng.name)} onMouseLeave={()=>setHovMissile(null)}/>)}
      {/* Iran marker */}
      <circle cx={cx} cy={cy} r={4} fill="#c8a44e" stroke="#fff" strokeWidth="0.5"/>
      <text x={cx} y={cy-8} textAnchor="middle" fill="#c8a44e" fontSize="7" fontWeight="bold" fontFamily="sans-serif">{he?"איראן":"IRAN"}</text>
      {/* Target cities */}
      {targets.map(t=>{const p=angleToXY(t.dist,t.angle);return<g key={t.name}><circle cx={p.x} cy={p.y} r={2} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.3"/><text x={p.x} y={p.y-5} textAnchor="middle" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">{t.name}</text><text x={p.x} y={p.y+8} textAnchor="middle" fill="#64748b" fontSize="4" fontFamily="monospace">{t.dist} km</text></g>;})}
    </svg>
    {/* Legend */}
    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12,justifyContent:"center"}}>
      {ranges.map(rng=><div key={rng.name} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:4,background:hovMissile===rng.name?`${rng.color}20`:"transparent",cursor:"pointer",transition:"all 0.15s"}} onMouseEnter={()=>setHovMissile(rng.name)} onMouseLeave={()=>setHovMissile(null)}>
        <div style={{width:10,height:3,background:rng.color,borderRadius:1}}/>
        <span style={{fontSize:9,color:hovMissile===rng.name?"#e2e8f0":"#94a3b8",fontWeight:hovMissile===rng.name?700:400}}>{rng.name} ({rng.r} km)</span>
      </div>)}
    </div>
  </div>
</Sec>;}

/* ═══ PRODUCTION FLOW DIAGRAMS ═══ */
function FlowDiagram({lang}:{lang:string}){const[proc,setProc]=useState(0);const he=lang==="he";
const diagrams=[
  {name:he?"אוסטוולד — HNO₃":"Ostwald — HNO₃",ic:"⚗️",nodes:[
    {id:"nh3",x:30,y:30,w:100,h:50,label:he?"אמוניה":"Ammonia",sub:"NH₃",color:"#3b82f6",params:he?"גז, 25°C":"Gas, 25°C"},
    {id:"air",x:30,y:110,w:100,h:40,label:he?"אוויר":"Air",sub:"O₂ + N₂",color:"#64748b",params:""},
    {id:"reactor",x:200,y:50,w:120,h:60,label:he?"כור קטליטי":"Catalytic Reactor",sub:"Pt-Rh 90:10",color:"#dc2626",params:"850°C, 8 atm"},
    {id:"no",x:390,y:55,w:80,h:40,label:"NO",sub:he?"תחמוצת חנקן":"Nitric Oxide",color:"#f97316",params:he?"גז חם":"Hot gas"},
    {id:"cool",x:390,y:130,w:80,h:50,label:"NO₂",sub:he?"חמצון + קירור":"Oxidation + Cool",color:"#ea580c",params:he?"גז חום-אדום":"Brown-red gas"},
    {id:"tower",x:250,y:200,w:120,h:60,label:he?"מגדל ספיגה":"Absorption Tower",sub:"NO₂ + H₂O",color:"#7c3aed",params:"50-80°C"},
    {id:"hno3",x:250,y:300,w:120,h:50,label:"HNO₃ 68%",sub:he?"חומצה חנקתית":"Nitric Acid",color:"#059669",params:he?"נוזל שקוף":"Clear liquid"},
    {id:"conc",x:60,y:300,w:120,h:50,label:he?"ריכוז":"Concentration",sub:"+ H₂SO₄",color:"#b91c1c",params:">86%"},
    {id:"irfna",x:60,y:390,w:120,h:55,label:"IRFNA",sub:"+ N₂O₄ + HF",color:"#dc2626",params:he?"מחמצן לטילים":"Missile Oxidizer"},
  ],arrows:[
    [130,55,200,65],[130,130,200,90],[320,75,390,75],[430,95,430,130],[430,180,370,210],[310,260,310,300],[250,325,180,325],[120,350,120,390]
  ]},
  {name:he?"רשיג — UDMH":"Raschig — UDMH",ic:"🟣",nodes:[
    {id:"nh3",x:30,y:30,w:110,h:50,label:he?"אמוניה":"Ammonia",sub:"NH₃",color:"#3b82f6",params:he?"גז / נוזל":"Gas / Liquid"},
    {id:"naocl",x:30,y:120,w:110,h:50,label:he?"היפוכלוריט":"Hypochlorite",sub:"NaOCl",color:"#64748b",params:he?"אקונומיקה":"Bleach"},
    {id:"react1",x:220,y:60,w:120,h:60,label:he?"תגובה 1":"Reaction 1",sub:"NH₃ + NaOCl",color:"#7c3aed",params:"0°C (!)"},
    {id:"cl",x:420,y:65,w:80,h:45,label:he?"כלוראמין":"Chloramine",sub:"NH₂Cl",color:"#dc2626",params:he?"רעיל!":"Toxic!"},
    {id:"dma",x:420,y:150,w:80,h:45,label:"DMA",sub:"(CH₃)₂NH",color:"#64748b",params:he?"דימתילאמין":"Dimethylamine"},
    {id:"react2",x:280,y:220,w:130,h:60,label:he?"תגובה 2":"Reaction 2",sub:"NH₂Cl + DMA",color:"#7c3aed",params:he?"לחץ, חום":"Pressure, Heat"},
    {id:"crude",x:280,y:320,w:130,h:50,label:he?"UDMH גולמי":"Crude UDMH",sub:he?"+ מזהמים":"+ contaminants",color:"#f97316",params:""},
    {id:"dist",x:120,y:320,w:100,h:50,label:he?"זיקוק":"Distillation",sub:"",color:"#b91c1c",params:"63°C"},
    {id:"udmh",x:120,y:410,w:100,h:55,label:"UDMH",sub:"H₂NN(CH₃)₂",color:"#9333ea",params:he?"דלק טילים":"Missile Fuel"},
  ],arrows:[
    [140,55,220,75],[140,145,220,100],[340,90,420,87],[460,110,460,150],[460,195,410,230],[345,280,345,320],[280,345,220,345],[170,370,170,410]
  ]},
  {name:he?"בכמן — RDX":"Bachmann — RDX",ic:"💣",nodes:[
    {id:"hex",x:30,y:40,w:120,h:50,label:he?"הקסאמין":"Hexamine",sub:"C₆H₁₂N₄",color:"#3b82f6",params:he?"קוביות קמפינג":"Camping cubes"},
    {id:"hno3",x:30,y:130,w:120,h:50,label:he?"חומצה חנקתית":"Nitric Acid",sub:"HNO₃ (מרוכזת / conc.)",color:"#dc2626",params:">98%"},
    {id:"react",x:230,y:70,w:140,h:70,label:he?"ניטרציה מבוקרת":"Controlled Nitration",sub:he?"סכנת פיצוץ!":"Explosion risk!",color:"#dc2626",params:"45-75°C (!)"},
    {id:"wash",x:430,y:75,w:80,h:50,label:he?"שטיפה":"Wash",sub:he?"סינון, ייבוש":"Filter, Dry",color:"#64748b",params:"H₂O"},
    {id:"rdx",x:430,y:180,w:80,h:55,label:"RDX",sub:he?"הקסוגן":"Hexogen",color:"#f97316",params:"×1.6 TNT"},
    {id:"hmx",x:430,y:280,w:80,h:55,label:"HMX",sub:he?"אוקטוגן":"Octogen",color:"#dc2626",params:he?"חזק יותר":"Stronger"},
    {id:"use1",x:220,y:200,w:140,h:40,label:he?"ראשי קרב טילים":"Missile Warheads",sub:"",color:"#b91c1c",params:""},
    {id:"use2",x:220,y:270,w:140,h:40,label:he?"תוספת לדלק מוצק":"Solid Fuel Additive",sub:"",color:"#b45309",params:""},
    {id:"use3",x:220,y:340,w:140,h:40,label:he?"עדשות גרעיניות":"Nuclear Lenses",sub:"Implosion",color:"#7c3aed",params:"☢️"},
  ],arrows:[
    [150,65,230,90],[150,155,230,120],[370,105,430,100],[470,125,470,180],[470,235,470,280],[430,207,360,220],[430,207,360,290],[470,335,360,360]
  ]},
];
const d=diagrams[proc];
return<Sec id="flowdiagram" num="05½" title={he?"תרשים זרימת ייצור":"Production Flow Diagram"} subtitle={he?"מחומר גלם ועד מוצר סופי — טמפרטורות, לחצים ותגובות":"From raw material to final product — temperatures, pressures & reactions"}>
  <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>{diagrams.map((x,i)=><button key={i} onClick={()=>setProc(i)} className={proc===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.name.split("—")[0]}</button>)}</div>
  <div className="cm" style={{padding:16,overflow:"hidden"}}>
    <svg viewBox="0 0 540 460" style={{width:"100%",minHeight:300}}>
      <defs><marker id="ah" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8"/></marker></defs>
      {/* Arrows */}
      {d.arrows.map((a,i)=><line key={i} x1={a[0]} y1={a[1]} x2={a[2]} y2={a[3]} stroke="#94a3b8" strokeWidth="1.2" markerEnd="url(#ah)" strokeDasharray="4,2"/>)}
      {/* Nodes */}
      {d.nodes.map(n=><g key={n.id}>
        <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill={`${n.color}15`} stroke={n.color} strokeWidth="1.2"/>
        <text x={n.x+n.w/2} y={n.y+18} textAnchor="middle" fill={n.color} fontSize="9" fontWeight="bold" fontFamily="'Heebo',sans-serif">{n.label}</text>
        {n.sub&&<text x={n.x+n.w/2} y={n.y+30} textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">{n.sub}</text>}
        {n.params&&<text x={n.x+n.w/2} y={n.y+n.h-8} textAnchor="middle" fill={`${n.color}cc`} fontSize="7" fontWeight="600" fontFamily="monospace">{n.params}</text>}
      </g>)}
      {/* Title */}
      <text x="270" y="450" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="'Heebo',sans-serif">{d.ic} {d.name}</text>
    </svg>
  </div>
</Sec>;}

/* ═══ SOURCES ═══ */
function Sources({lang}:{lang:string}){const he=lang==="he";const sr=[{n:"CSIS Missile Defense Project",c:he?"מחקרי":"Research"},{n:"Iran Watch — Missile Arsenal",c:he?"מחקרי":"Research"},{n:"USIP — Ballistic Missile Program",c:he?"ממשלתי":"Govt"},{n:"NIOSH/CDC — UDMH Pocket Guide",c:he?"ממשלתי":"Govt"},{n:"PubChem — Chemical Properties",c:he?"ממשלתי":"Govt"},{n:"NOAA CAMEO — IRFNA & NTO",c:he?"ממשלתי":"Govt"},{n:"ERG 2024 — PHMSA/DOT",c:he?"ממשלתי":"Govt"},{n:"NCBI — AEGL Dimethylhydrazine",c:he?"אקדמי":"Academic"},{n:"PMC — Delayed Pulmonary Edema",c:he?"אקדמי":"Academic"},{n:"Alma Center — Iran Missiles",c:he?"מחקרי":"Research"},{n:"IISS Military Balance",c:he?"מחקרי":"Research"},{n:"Critical Threats — Israeli Strikes",c:he?"מחקרי":"Research"}];const cc:Record<string,[string,string]>={[he?"ממשלתי":"Govt"]:[P.greenS,P.green],[he?"מחקרי":"Research"]:[P.blueS,P.blue],[he?"אקדמי":"Academic"]:[P.purpleS,P.purple]};return<Sec id="sources" num="12" title={he?"מקורות":"Sources"}>{sr.map((s,i)=>{const[bg,c]=cc[s.c]||[P.cream,P.muted];return<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}><span style={{color:P.gold}}>🔗</span><span style={{flex:1,fontSize:13,color:P.steel}}>{s.n}</span><span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:bg,color:c}}>{s.c}</span></div>;})}</Sec>;}

/* ═══ FOOTER ═══ */
function Footer({lang}:{lang:string}){const he=lang==="he";return<footer style={{borderTop:`1px solid ${P.gold}40`,padding:"36px 20px",background:P.ink,textAlign:"center"}}><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}><div className="mn" style={{width:30,height:30,borderRadius:6,background:P.gold,display:"flex",alignItems:"center",justifyContent:"center",color:P.ink,fontWeight:900,fontSize:11}}>60</div><span style={{fontSize:14,fontWeight:700,color:P.gold}}>{he?"ניתוח 60 שניות של חומ״ס":"60 Seconds HazMat"}</span></div><p style={{fontSize:13,color:`${P.white}80`,marginBottom:10}}><b style={{color:P.white}}>{he?"רועי צוקרמן":"Roei Zukerman"}</b> — {he?"מומחה לחומ״ס וטב״ק":"HazMat & CBRN Expert"}</p><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14}}><span style={{fontSize:12,color:P.gold}}>✉️ roiez1@gmail.com</span></div><div style={{height:1,maxWidth:300,margin:"0 auto 10px",background:`linear-gradient(90deg,transparent,${P.gold}60,transparent)`}}/><p style={{fontSize:10,color:`${P.white}25`}}>{he?"מקורות פתוחים | לא מסווג":"Open sources | Unclassified"} | {he?"אפריל 2026":"April 2026"}</p></footer>;}

/* ═══ MAIN ═══ */
export default function Home(){const[lang,setLang]=useState("he");return<div dir={lang==="he"?"rtl":"ltr"}><ProgressBar/><Nav lang={lang} toggle={()=>setLang(l=>l==="he"?"en":"he")}/><Hero lang={lang}/><Timeline lang={lang}/><MissileDiagram lang={lang}/><Arsenal lang={lang}/><RangeMap lang={lang}/><Propulsion lang={lang}/><Processes lang={lang}/><FlowDiagram lang={lang}/><Chemistry lang={lang}/><HazMat lang={lang}/><Medical lang={lang}/><Strategic lang={lang}/><Facilities lang={lang}/><Glossary lang={lang}/><Sources lang={lang}/><Footer lang={lang}/></div>;}
