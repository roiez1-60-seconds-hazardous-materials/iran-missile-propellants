'use client';
import { useState, useEffect } from 'react';

const P = {
  ink:"#0c1222",navy:"#162040",steel:"#1e293b",gold:"#c8a44e",gL:"#e8d5a0",
  cream:"#f5f0e8",parch:"#faf7f0",red:"#b91c1c",redS:"#fef2f2",
  blue:"#1e40af",blueS:"#eff6ff",amber:"#92400e",amberS:"#fffbeb",
  purple:"#6b21a8",purpleS:"#faf5ff",green:"#166534",greenS:"#f0fdf4",
  muted:"#64748b",border:"#e2e0d8",white:"#fff"
};

const sIDs=["home","timeline","diagram","arsenal","propulsion","chemistry","processes","strategic","facilities","hazmat","glossary","sources"];
const sHe=["ראשי","ציר זמן","אנטומיה","ארסנל","הנעה","כימיה","ייצור","אסטרטגי","מתקנים","חומ״ס","מקרא","מקורות"];
const sEn=["Home","Timeline","Anatomy","Arsenal","Propulsion","Chemistry","Production","Strategic","Facilities","HazMat","Glossary","Sources"];

function ProgressBar(){
  const[p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;setP(h>0?(window.scrollY/h)*100:0);};window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
  return <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:3,background:P.cream}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${P.gold},${P.gL})`,transition:"width 120ms"}}/></div>;
}

function Nav({lang,toggle}:{lang:string;toggle:()=>void}){
  const[open,setOpen]=useState(false);
  const labels=lang==="he"?sHe:sEn;
  return<><nav className="nv"><div style={{maxWidth:1100,margin:"0 auto",padding:"0 16px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div className="mn" style={{width:30,height:30,borderRadius:6,background:P.ink,display:"flex",alignItems:"center",justifyContent:"center",color:P.gold,fontWeight:900,fontSize:11}}>60</div>
      <span style={{fontSize:10,fontWeight:700,color:P.muted}}>60 שניות חומ״ס</span>
    </div>
    <div className="hd-links" style={{display:"flex",gap:2,alignItems:"center"}}>
      {labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} style={{padding:"6px 8px",fontSize:10,color:P.muted,textDecoration:"none",borderRadius:4}}>{s}</a>)}
      <button onClick={toggle} className="mn" style={{padding:"5px 14px",fontSize:11,fontWeight:800,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginInlineStart:8}}>{lang==="he"?"EN":"עב"}</button>
    </div>
    <button className="mob-btn" onClick={()=>setOpen(!open)} style={{display:"none",alignItems:"center",justifyContent:"center",background:"none",border:"none",cursor:"pointer",color:P.muted,fontSize:22}}>☰</button>
  </div></nav>
  {open&&<div className="mob-menu" style={{position:"fixed",top:51,left:0,right:0,zIndex:89,background:P.white,borderBottom:`1px solid ${P.border}`,padding:8,boxShadow:"0 4px 16px rgba(0,0,0,0.08)"}}>
    {labels.map((s,i)=><a key={i} href={`#${sIDs[i]}`} onClick={()=>setOpen(false)} style={{display:"block",padding:"10px 16px",fontSize:13,color:P.steel,textDecoration:"none",borderRadius:4}}>{s}</a>)}
    <button onClick={()=>{toggle();setOpen(false);}} style={{display:"block",width:"100%",padding:"10px 16px",fontSize:13,fontWeight:700,background:P.ink,color:P.gold,border:"none",borderRadius:4,cursor:"pointer",marginTop:4}}>{lang==="he"?"English":"עברית"}</button>
  </div>}</>;
}

function Hero({lang}:{lang:string}){
  const he=lang==="he";
  return<section id="home" className="mh" style={{paddingTop:80,paddingBottom:60,position:"relative"}}>
    <div style={{maxWidth:800,margin:"0 auto",padding:"0 24px",textAlign:"center",position:"relative",zIndex:1}}>
      <div className="mn au" style={{display:"inline-block",border:`1px solid ${P.gold}50`,padding:"3px 16px",borderRadius:2,color:P.gold,fontSize:10,fontWeight:700,letterSpacing:"0.3em",marginBottom:20}}>[ {he?"לא מסווג":"UNCLASSIFIED"} ]</div>
      <p className="au" style={{fontSize:10,letterSpacing:"0.25em",color:`${P.gL}70`,textTransform:"uppercase",marginBottom:16}}>Intelligence Dossier • {he?"אפריל 2026":"April 2026"}</p>
      <h1 className="sf au" style={{fontSize:"clamp(26px,5vw,50px)",fontWeight:900,color:P.white,lineHeight:1.15,marginBottom:12}}>{he?"מערך ייצור הטילים והדלקים של איראן":"Iran's Missile & Propellant Production Complex"}</h1>
      <h2 className="sf au" style={{fontSize:"clamp(14px,2vw,20px)",fontWeight:400,color:`${P.gL}90`,marginBottom:16}}>{he?"תיק מודיעין טכנולוגי-טקטי":"Tech-Tactical Intelligence Dossier"}</h2>
      <div className="gr au" style={{margin:"0 auto 16px"}}/>
      <p className="au" style={{fontSize:13,color:`${P.white}70`,maxWidth:560,margin:"0 auto 32px",lineHeight:1.8}}>{he?"ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום (ERG 2024)":"Strategic analysis: propulsion technologies, fuels, production processes, facilities, HazMat risks & emergency protocols (ERG 2024)"}</p>
      <div className="au" style={{display:"flex",justifyContent:"center",gap:"clamp(16px,5vw,48px)",flexWrap:"wrap",marginBottom:28}}>
        {[{n:"16",l:he?"סוגי טילים":"Missile Types",c:P.gold},{n:"3,000+",l:he?"טילים (IISS)":"Est. Missiles",c:P.gold},{n:"6",l:he?"מתקנים שהותקפו":"Facilities Struck",c:"#ef4444"},{n:"3",l:he?"תהליכי ייצור":"Critical Processes",c:P.gL}].map((s,i)=>
          <div key={i} style={{textAlign:"center"}}><div className="sf" style={{fontSize:"clamp(22px,3.5vw,36px)",fontWeight:900,color:s.c}}>{s.n}</div><div style={{fontSize:9,color:`${P.white}50`}}>{s.l}</div></div>
        )}
      </div>
      <p className="au" style={{fontSize:11,color:`${P.gL}50`}}>{he?"רועי צוקרמן — מומחה לחומ״ס וטב״ק":"Roei Zukerman — HazMat & CBRN Expert"}</p>
    </div>
  </section>;
}

function Sec({id,num,title,subtitle,children,sidebar,dark}:{id:string;num:string;title:string;subtitle?:string;children:React.ReactNode;sidebar?:React.ReactNode;dark?:boolean}){
  return<section id={id} style={{padding:"48px 20px",background:dark?P.cream:P.parch,borderBottom:`1px solid ${P.border}`,position:"relative"}}>
    <div style={{maxWidth:1100,margin:"0 auto",position:"relative"}}>
      <div className="sf" style={{position:"absolute",top:-14,right:-5,fontSize:80,fontWeight:900,color:`${P.gold}08`,lineHeight:1,userSelect:"none",pointerEvents:"none"}}>{num}</div>
      <div style={{marginBottom:24,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:4}}>
          <span className="mn" style={{fontSize:11,fontWeight:700,color:P.gold}}>{num}</span>
          <h2 className="sf" style={{fontSize:"clamp(20px,3vw,30px)",fontWeight:800,color:P.ink}}>{title}</h2>
        </div>
        {subtitle&&<p style={{fontSize:13,color:P.muted,marginTop:2}}>{subtitle}</p>}
        <div className="gr" style={{marginTop:10}}/>
      </div>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 500px",minWidth:0}}>{children}</div>
        {sidebar&&<aside style={{flex:"0 1 280px",display:"flex",flexDirection:"column",gap:14}}>{sidebar}</aside>}
      </div>
    </div>
  </section>;
}

function SB({color,title,children}:{color:string;title:string;children:React.ReactNode}){
  const cs:Record<string,[string,string]>={blue:[P.blueS,P.blue],red:[P.redS,P.red],amber:[P.amberS,P.amber],purple:[P.purpleS,P.purple],green:[P.greenS,P.green],gold:[`${P.gold}10`,P.gold]};
  const[bg,bc]=cs[color]||cs.blue;
  return<div className="cm" style={{padding:16,borderRight:`3px solid ${bc}`,background:bg}}><h4 style={{fontSize:10,fontWeight:800,color:bc,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</h4><div style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{children}</div></div>;
}

function Timeline({lang}:{lang:string}){
  const he=lang==="he";
  const ev=[
    {y:"1984",h:"רכישת 20 טילי Scud-B מלוב — תחילת תוכנית הטילים",e:"20 Scud-B missiles from Libya — program begins"},
    {y:"1988",h:"מלחמת איראן-עירק: שיגור Scud. הנדסה הפוכה סובייטית",e:"Iran-Iraq War: Scud launches. Soviet reverse-engineering"},
    {y:"1998",h:"שהאב-3 — טווח 1,300 ק״מ. מבוסס Nodong",e:"Shahab-3 — 1,300 km. Based on Nodong"},
    {y:"2004",h:"גדר — מיכלי דלק מורחבים, טווח 2,000 ק״מ",e:"Ghadr — extended tanks, 2,000 km"},
    {y:"2008",h:"סג׳יל-1 — פריצת דרך בדלק מוצק דו-שלבי",e:"Sejjil-1 — solid fuel breakthrough"},
    {y:"2015",h:"עמאד — ראשון עם MaRV",e:"Emad — first with MaRV"},
    {y:"2017",h:"ח׳ורמשהר — 2,000 ק״מ, 1,500 ק״ג",e:"Khorramshahr — 2,000 km, 1,500 kg"},
    {y:"2023",h:"פתאח-1 היפרסוני. ח׳ייבר שכן עם MaRV",e:"Fattah-1 hypersonic. Kheibar Shekan w/ MaRV"},
    {y:"10/24",h:"תקיפת פרצ׳ין וח׳וג׳יר — השמדת מערבלים",e:"Parchin & Khojir — mixers destroyed",r:true},
    {y:"2/26",h:"מבצע שאגת האריה — South Pars, אספהאן",e:"Op. Roar of the Lion — South Pars, Isfahan",r:true},
    {y:"4/26",h:"תקיפת מתקן HNO₃ בשיראז",e:"Shiraz HNO₃ plant struck",r:true},
  ];
  return<Sec id="timeline" num="01" title={he?"ציר זמן: תוכנית הטילים":"Timeline"} subtitle={he?"מסקאד ועד היפרסוני":"Scud to Hypersonic"}
    sidebar={<><SB color="gold" title={he?"נקודות מפנה":"Turning Points"}><p><b>1998</b> — Scud→Shahab (×4)</p><p><b>2008</b> — Liquid→Solid</p><p><b>2024</b> — Production strikes</p></SB><SB color="red" title="⚠️"><p>{he?"תקיפות 2024-2026 פגעו בשרשרת האספקה הכימית.":"2024-2026 strikes hit the chemical supply chain."}</p></SB></>}>
    {ev.map((e,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"12px 0",borderBottom:`1px solid ${P.border}30`}}>
      <div className="mn" style={{flexShrink:0,width:48,fontSize:12,fontWeight:700,color:e.r?P.red:P.gold,textAlign:"center"}}>{e.y}</div>
      <div style={{width:8,height:8,borderRadius:"50%",border:`2px solid ${e.r?P.red:P.gold}`,background:e.r?P.red:"transparent",flexShrink:0,marginTop:5}}/>
      <p style={{fontSize:13,color:e.r?P.red:P.steel,fontWeight:e.r?600:400}}>{he?e.h:e.e}</p>
    </div>)}
  </Sec>;
}

function MissileDiagram({lang}:{lang:string}){
  const[mode,setMode]=useState("liquid");
  const[hov,setHov]=useState<string|null>(null);
  const he=lang==="he";
  const liq=[
    {id:"nose",lb:he?"חרטום":"Nose",x:2,w:6,d:he?"חרטום אווירודינמי. סגסוגת אלומיניום.":"Aerodynamic nosecone.",c:"#94a3b8"},
    {id:"wh",lb:he?"ראש קרב":"Warhead",x:8,w:14,d:he?"TNT/RDX — 700-1,500 ק״ג. MaRV.":"TNT/RDX — 700-1,500 kg. MaRV.",c:"#dc2626"},
    {id:"gui",lb:he?"הנחיה":"Guidance",x:22,w:8,d:he?"INS + GPS/GLONASS.":"INS + GPS/GLONASS.",c:"#7c3aed"},
    {id:"ox",lb:"IRFNA",x:30,w:22,d:he?"חומצה חנקתית AK-27. צפיפות 1.55.":"Nitric acid AK-27. Density 1.55.",c:"#ea580c"},
    {id:"fu",lb:"UDMH/TM-185",x:52,w:20,d:he?"שהאב: TM-185. ח׳ורמשהר: UDMH — היפרגולי!":"Shahab: TM-185. Khorramshahr: UDMH — hypergolic!",c:"#2563eb"},
    {id:"eng",lb:he?"מנוע":"Engine",x:72,w:18,d:he?"3,000°C. נחיר De Laval. 80 אטמ׳.":"3,000°C. De Laval. 80 atm.",c:"#b91c1c"},
    {id:"fin",lb:he?"כנפונים":"Fins",x:85,w:13,d:he?"4 כנפונים. קיאם: TVC.":"4 fins. Qiam: TVC.",c:"#475569"},
  ];
  const sol=[
    {id:"nose",lb:he?"חרטום":"Nose",x:2,w:6,d:he?"פתאח-1: שברון היפרסוני.":"Fattah-1: hypersonic chevron.",c:"#94a3b8"},
    {id:"wh",lb:"MaRV",x:8,w:12,d:he?"RDX/HMX. מתמרן.":"RDX/HMX. Maneuverable.",c:"#dc2626"},
    {id:"s2",lb:he?"שלב 2":"Stage 2",x:20,w:22,d:he?"AP+HTPB+Al. בעירה מבפנים.":"AP+HTPB+Al. Burns inside-out.",c:"#d97706"},
    {id:"sep",lb:he?"הפרדה":"Sep",x:42,w:4,d:he?"טבעת פירוטכנית.":"Pyrotechnic ring.",c:"#64748b"},
    {id:"s1",lb:he?"שלב 1":"Stage 1",x:46,w:32,d:he?"AP 70% + HTPB 15% + Al 15%. 6-10 ימים.":"AP 70%+HTPB 15%+Al 15%. 6-10 days.",c:"#b45309"},
    {id:"nz",lb:he?"נחיר":"Nozzle",x:78,w:15,d:he?"דה-לאבל + TVC. 2,800°C.":"De Laval + TVC. 2,800°C.",c:"#b91c1c"},
  ];
  const parts=mode==="liquid"?liq:sol;
  const act=parts.find(p=>p.id===hov);
  return<Sec id="diagram" num="02" title={he?"אנטומיה של טיל בליסטי":"Missile Anatomy"} subtitle={he?"לחצו על חלק":"Click a section"} dark
    sidebar={act?<div className="cm" style={{padding:16,borderRight:`3px solid ${act.c}`}}><h4 style={{fontSize:13,fontWeight:800,marginBottom:6}}>{act.lb}</h4><p style={{fontSize:12,color:P.steel,lineHeight:1.7}}>{act.d}</p></div>:<SB color="gold" title={he?"👆 אינטראקטיבי":"👆 Interactive"}><p>{he?"העבירו עכבר על חלק בטיל":"Hover a missile part"}</p></SB>}>
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      {([["liquid","🔵",he?"נוזלי (שהאב-3)":"Liquid"],["solid","🟠",he?"מוצק (סג׳יל)":"Solid"]] as const).map(([m,ic,lb])=>
        <button key={m} onClick={()=>{setMode(m);setHov(null);}} className={mode===m?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{ic} {lb}</button>
      )}
    </div>
    <div className="cm" style={{padding:20}}>
      <svg viewBox="0 0 100 30" style={{width:"100%"}}>
        <defs><linearGradient id="mG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9ca3af"/><stop offset="50%" stopColor="#d1d5db"/><stop offset="100%" stopColor="#6b7280"/></linearGradient></defs>
        <path d="M 8,15 Q 2,15 2,15 L 8,10 L 8,20 Z" fill="url(#mG)"/>
        <rect x="8" y="10" width="82" height="10" rx="0.5" fill="url(#mG)"/>
        <path d="M 90,10.5 L 95,8 L 95,22 L 90,19.5" fill="#4b5563"/>
        {mode==="liquid"&&<><path d="M 87,10 L 84,5 L 92,5 L 90,10" fill="#64748b"/><path d="M 87,20 L 84,25 L 92,25 L 90,20" fill="#64748b"/></>}
        {mode==="solid"&&<rect x="42" y="9.5" width="4" height="11" rx="0.3" fill="#374151"/>}
        {parts.map(p=><rect key={p.id} x={p.x} y={hov===p.id?7:9} width={p.w} height={hov===p.id?16:12} rx="1" fill={hov===p.id?p.c+"40":"transparent"} stroke={hov===p.id?p.c:"transparent"} strokeWidth={hov===p.id?0.5:0} style={{cursor:"pointer",transition:"all 0.15s"}} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)} onClick={()=>setHov(hov===p.id?null:p.id)}/>)}
        <text x="50" y="29" textAnchor="middle" fill="#9ca3af" fontSize="2">{mode==="liquid"?"~16 m (Shahab-3)":"~17.6 m (Sejjil-2)"}</text>
      </svg>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
        {parts.map(p=><span key={p.id} style={{fontSize:8,color:hov===p.id?P.ink:P.muted,fontWeight:hov===p.id?700:400,cursor:"pointer"}} onMouseEnter={()=>setHov(p.id)} onMouseLeave={()=>setHov(null)}>{p.lb}</span>)}
      </div>
    </div>
  </Sec>;
}

function Arsenal({lang}:{lang:string}){
  const[fl,setFl]=useState("all");
  const he=lang==="he";
  const ms=[
    {n:"שהאב-1",ne:"Shahab-1",r:"285-330",w:"~1,000",f:"IRFNA+TM-185",cep:"~2,500",note:"Scud-B",t:"l"},
    {n:"שהאב-2",ne:"Shahab-2",r:"~500",w:"~770",f:"IRFNA+TM-185",cep:"~2,000",note:"Scud-C",t:"l"},
    {n:"שהאב-3",ne:"Shahab-3",r:"~1,300",w:"800-1,200",f:"IRFNA+TM-185",cep:"~1,500",note:"Nodong",t:"l"},
    {n:"קיאם",ne:"Qiam",r:"800-1,000",w:"~700",f:"IRFNA+UDMH",cep:"~500",note:"TVC",t:"l"},
    {n:"גדר",ne:"Ghadr",r:"1,600-2,000",w:"~750",f:"IRFNA+TM-185",cep:"~300",note:he?"שהאב+":"Shahab+",t:"l"},
    {n:"עמאד",ne:"Emad",r:"~1,700",w:"~750",f:"IRFNA+TM-185",cep:"~500",note:"MaRV",t:"l"},
    {n:"ח׳ורמשהר",ne:"Khorramshahr",r:"~2,000",w:"~1,500",f:"NTO+UDMH",cep:"~30",note:he?"מדויק":"Accurate",t:"l"},
    {n:"פאתח-110",ne:"Fateh-110",r:"200-300",w:"~500",f:"AP+HTPB+Al",cep:"~100",note:"SRBM",t:"s"},
    {n:"זולפקאר",ne:"Zolfaghar",r:"~700",w:"~600",f:"AP+HTPB+Al",cep:"~100",note:he?"תשתיות":"Infra",t:"s"},
    {n:"דזפול",ne:"Dezful",r:"~1,000",w:"~450",f:"AP+HTPB+Al",cep:"~50",note:he?"דו-שלבי":"2-stage",t:"s"},
    {n:"ח׳ייבר שכן",ne:"Kheibar Shekan",r:"~1,450",w:"~500",f:"AP+HTPB+Al+RDX",cep:"~30",note:"MaRV",t:"s"},
    {n:"סג׳יל-2",ne:"Sejjil-2",r:"~2,000",w:"650-1,000",f:"AP+HTPB+RDX/HMX",cep:"~50",note:he?"מתקדם":"Advanced",t:"s"},
    {n:"פתאח-1",ne:"Fattah-1",r:"~1,400",w:"~500",f:"AP+HTPB+Al",cep:"?",note:he?"היפרסוני":"Hypersonic",t:"s"},
  ];
  const fm=fl==="all"?ms:ms.filter(m=>m.t===fl);
  const hd=he?["שם","טווח","רש״ק","הנעה","דלק","CEP","הערה"]:["Name","Range","Warhead","Type","Fuel","CEP","Note"];
  return<Sec id="arsenal" num="03" title={he?"ארסנל הטילים":"Missile Arsenal"} subtitle={he?"הגדול במזרח התיכון":"Largest in Middle East"}
    sidebar={<><SB color="gold" title={he?"סינון":"Filter"}><div style={{display:"flex",gap:6,marginTop:6}}>{([["all",he?"הכל":"All"],["l",he?"נוזלי":"Liquid"],["s",he?"מוצק":"Solid"]] as const).map(([v,l])=><button key={v} onClick={()=>setFl(v)} className={fl===v?"ta":"ti"} style={{padding:"5px 14px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>{l}</button>)}</div></SB><SB color="amber" title={he?"💡 הבדל":"💡 Key"}><p><b>{he?"נוזלי:":"Liquid:"}</b> {he?"תדלוק שעות":"Hours to fuel"}</p><p><b>{he?"מוצק:":"Solid:"}</b> {he?"שיגור מיידי":"Instant launch"}</p></SB></>}>
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
  </Sec>;
}

function Propulsion({lang}:{lang:string}){
  const he=lang==="he";
  return<Sec id="propulsion" num="04" title={he?"נוזלי מול מוצק":"Liquid vs Solid"} subtitle={he?"שתי פילוסופיות":"Two philosophies"} dark>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
      <div className="cm" style={{padding:24,borderRight:`3px solid ${P.blue}`,background:P.blueS}}>
        <h3 className="sf" style={{fontSize:18,fontWeight:800,color:P.blue,marginBottom:12}}>🔵 {he?"נוזלי — היפרגולי":"Liquid — Hypergolic"}</h3>
        <p style={{fontSize:13,color:P.steel,marginBottom:12}}>{he?"מגע דלק + מחמצן = הצתה ספונטנית":"Fuel+oxidizer = spontaneous ignition"}</p>
        <div style={{fontSize:13,color:P.steel,lineHeight:2,marginBottom:12}}>
          <p><b style={{color:P.blue}}>{he?"דלק:":"Fuel:"}</b> UDMH / TM-185</p>
          <p><b style={{color:P.blue}}>{he?"מחמצן:":"Oxidizer:"}</b> IRFNA / NTO</p>
          <p><b style={{color:P.blue}}>{he?"טילים:":"Missiles:"}</b> {he?"שהאב, גדר, עמאד, ח׳ורמשהר":"Shahab, Ghadr, Emad, Khorramshahr"}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{background:P.greenS,borderRadius:6,padding:8,fontSize:11}}>✅ {he?"שליטה, Isp":"Control, Isp"}</div>
          <div style={{background:P.redS,borderRadius:6,padding:8,fontSize:11}}>❌ {he?"שעות, רעיל":"Hours, toxic"}</div>
        </div>
      </div>
      <div className="cm" style={{padding:24,borderRight:`3px solid ${P.amber}`,background:P.amberS}}>
        <h3 className="sf" style={{fontSize:18,fontWeight:800,color:P.amber,marginBottom:12}}>🟠 {he?"מוצק — קומפוזיט":"Solid — Composite"}</h3>
        <p style={{fontSize:13,color:P.steel,marginBottom:12}}>{he?"יצוק יחד. כוננות מיידית":"Cast together. Instant readiness"}</p>
        <div style={{fontSize:13,color:P.steel,lineHeight:2,marginBottom:12}}>
          <p><b style={{color:P.amber}}>{he?"מחמצן:":"Ox:"}</b> AP ~70%</p>
          <p><b style={{color:P.amber}}>{he?"מאגד:":"Binder:"}</b> HTPB+Al ~30%</p>
          <p><b style={{color:P.amber}}>{he?"טילים:":"Missiles:"}</b> {he?"פאתח, זולפקאר, סג׳יל, פתאח":"Fateh, Zolfaghar, Sejjil, Fattah"}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div style={{background:P.greenS,borderRadius:6,padding:8,fontSize:11}}>✅ {he?"מיידי":"Instant"}</div>
          <div style={{background:P.redS,borderRadius:6,padding:8,fontSize:11}}>❌ {he?"תלות סין":"China dep."}</div>
        </div>
      </div>
    </div>
  </Sec>;
}

function Chemistry({lang}:{lang:string}){
  const[tab,setTab]=useState(0);
  const he=lang==="he";
  const ch=[
    {id:"IRFNA",nm:he?"חומצה חנקתית מעושנת":"Red Fuming Nitric Acid",erg:"157",ps:[["HNO₃ ≥70% + N₂O₄ + HF"],[he?"צפיפות":"Density","1.55"],["BP","64°C"],["FP","-52°C"]],ds:[[he?"עור — הרס מיידי":"Skin — destruction"],[he?"עיניים — עיוורון":"Eyes — blindness"],[he?"שאיפה — בצקת ריאות 24-48h!":"Inhalation — pulmonary edema 24-48h!"],[he?"היפרגולי עם UDMH":"Hypergolic w/ UDMH"]]},
    {id:"UDMH",nm:he?"דימתילהידראזין":"Dimethylhydrazine",erg:"131",ps:[["CAS 57-14-7"],["BP","63°C"],["Flash","-15°C"],[he?"דליקות":"Flam.","2.5-95%"]],ds:[["IDLH 15 ppm — IARC 2B"],[he?"חודר עור שלם!":"Penetrates skin!"],[he?"פירוק: NDMA+HCN — 6 שבועות":"Decomp: NDMA+HCN — 6 weeks"]]},
    {id:"NTO",nm:"N₂O₄",erg:"124",ps:[["CAS 10544-72-6"],["BP","21°C (!)"],[he?"צפיפות":"Density","1.448"]],ds:[[he?"קטלני! בצקת ריאות":"Lethal! Pulmonary edema"],[he?"מגיב עם מים ברקמה → HNO₃":"Reacts w/ tissue water → HNO₃"]]},
    {id:"AP/HTPB",nm:he?"דלק מוצק":"Composite Solid",erg:"—",ps:[["AP ~70%"],["HTPB ~15%"],["Al ~15%"]],ds:[[he?"בעירה עצמית — לא ניתנת לכיבוי!":"Self-sustaining — cannot extinguish!"],["HCl + NOx + CO + Al₂O₃"],[he?"פרכלורט מזהם מי תהום":"Perchlorate contaminates water"]]},
  ];
  const c=ch[tab];
  return<Sec id="chemistry" num="05" title={he?"כימיה של הדלקים":"Fuel Chemistry"} subtitle="IRFNA · UDMH · NTO · AP/HTPB"
    sidebar={<><SB color="red" title={he?"⚠️ בצקת ריאות":"⚠️ Pulmonary Edema"}><p>{he?"24-48 שעות אחרי: הצפת ריאות קטלנית.":"24-48h later: lethal lung flooding."}</p><p style={{fontWeight:700,marginTop:6}}>{he?"כל חשוף = אשפוז!":"All exposed = hospitalize!"}</p></SB><SB color="purple" title={he?"💡 היפרגולי":"💡 Hypergolic"}><p>{he?"UDMH + IRFNA = הצתה ספונטנית.":"UDMH + IRFNA = instant ignition."}</p></SB></>}>
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
      {ch.map((x,i)=><button key={i} onClick={()=>setTab(i)} className={tab===i?"ta":"ti"} style={{padding:"8px 18px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.id}</button>)}
    </div>
    <div className="cm" style={{padding:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:8}}>
        <h3 className="sf" style={{fontSize:18,fontWeight:800}}>{c.id} — {c.nm}</h3>
        <span className="mn" style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:700,background:P.blueS,color:P.blue}}>ERG {c.erg}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
        <div>{c.ps.map((p,i)=><div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${P.border}40`,fontSize:13}}>{p.length===2?<><span style={{color:P.muted}}>{p[0]}: </span><span className="mn" style={{fontWeight:500}} dir="ltr">{p[1]}</span></>:<span className="mn" style={{fontSize:12}} dir="ltr">{p[0]}</span>}</div>)}</div>
        <div><h4 style={{fontSize:10,fontWeight:800,color:P.red,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>⚠️ {he?"סיכונים":"HAZARDS"}</h4>{c.ds.map((d,i)=><div key={i} style={{padding:"7px 8px",background:`${P.red}06`,borderRadius:4,marginBottom:4,fontSize:12,color:P.red,fontWeight:500}}>{d[0]}</div>)}</div>
      </div>
    </div>
  </Sec>;
}

function Processes({lang}:{lang:string}){
  const[a,setA]=useState(0);
  const he=lang==="he";
  const pr=[
    {nm:he?"אוסטוולד — HNO₃":"Ostwald — HNO₃",ic:"⚗️",or:"Wilhelm Ostwald, Nobel 1909",st:he?["NH₃ + אוויר → כור","זרז Pt-Rh 850°C → NO","NO → NO₂","NO₂ + מים → HNO₃ 68%","ריכוז ל-86%+","N₂O₄ + HF → IRFNA"]:["NH₃ + air → reactor","Pt-Rh 850°C → NO","NO → NO₂","NO₂ + H₂O → HNO₃ 68%","Concentrate >86%","N₂O₄ + HF → IRFNA"]},
    {nm:he?"רשיג — UDMH":"Raschig — UDMH",ic:"🟣",or:"Friedrich Raschig (1863-1928)",st:he?["אמוניה + היפוכלוריט","0°C → כלוראמין","+ דימתילאמין","→ UDMH גולמי","זיקוק 63°C","UDMH טהור"]:["Ammonia + hypochlorite","0°C → chloramine","+ dimethylamine","→ crude UDMH","Distillation 63°C","Pure UDMH"]},
    {nm:he?"בכמן — RDX/HMX":"Bachmann — RDX/HMX",ic:"💣",or:"Werner Bachmann (1901-1951)",st:he?["הקסאמין + HNO₃","ניטרציה 45-75°C","→ RDX","תנאים שונים → HMX","ראשי קרב + דלק + גרעיני"]:["Hexamine + HNO₃","Nitration 45-75°C","→ RDX","Different conditions → HMX","Warheads + fuel + nuclear"]},
  ];
  const p=pr[a];
  return<Sec id="processes" num="06" title={he?"תהליכי ייצור":"Production Processes"} subtitle={he?"3 תהליכים שנפגעו":"3 targeted processes"}
    sidebar={<><SB color="purple" title={he?"📜 מקור":"📜 Origin"}><p style={{fontWeight:700}}>{p.nm}</p><p style={{marginTop:4}}>{p.or}</p></SB><SB color="amber" title={he?"⚡ מערבלים":"⚡ Mixers"}><p>{he?"מכונות ענק מסין. השמדתם = ואקום.":"Giant machines from China. Destroyed = vacuum."}</p></SB></>}>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      {pr.map((x,i)=><button key={i} onClick={()=>setA(i)} className={a===i?"ta":"ti"} style={{padding:"8px 16px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>{x.ic} {x.nm.split("—")[0]}</button>)}
    </div>
    <div className="cm" style={{padding:24}}>
      <h3 className="sf" style={{fontSize:18,fontWeight:800,marginBottom:16}}>{p.ic} {p.nm}</h3>
      {p.st.map((s,i)=><div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}>
        <div style={{width:26,height:26,borderRadius:"50%",background:P.ink,color:P.gold,fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
        <p style={{fontSize:13,color:P.steel,paddingTop:3}}>{s}</p>
      </div>)}
    </div>
  </Sec>;
}

function Strategic({lang}:{lang:string}){
  const he=lang==="he";
  return<Sec id="strategic" num="07" title={he?"צוואר הבקבוק":"Chemical Chokepoint"} subtitle={he?"HNO₃ — המפתח":"HNO₃ — Master Key"} dark
    sidebar={<SB color="red" title={he?"🔑 מסקנה":"🔑 Conclusion"}><p>{he?"חומצה חנקתית מחברת הכל: טילים, דלק, נפץ, גרעין.":"Nitric acid connects everything: missiles, fuel, explosives, nuclear."}</p></SB>}>
    <div className="pq">{he?"מתקן HNO₃ אחד = ארבע יכולות נשק. אין leverage כזה.":"One HNO₃ plant = four weapon capabilities. Unmatched leverage."}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
      {[{ic:"💧",t:"IRFNA",d:he?"שהאב, גדר":"Shahab, Ghadr",bg:P.blueS,c:P.blue},{ic:"🧊",t:"NTO",d:"N₂O₄",bg:P.purpleS,c:P.purple},{ic:"💣",t:"RDX/HMX",d:he?"נפץ":"Explosives",bg:P.amberS,c:P.amber},{ic:"☢️",t:he?"גרעיני":"Nuclear",d:"Implosion",bg:P.redS,c:P.red}].map((x,i)=>
        <div key={i} className="cm" style={{padding:16,textAlign:"center",background:x.bg}}>
          <div style={{fontSize:28,marginBottom:6}}>{x.ic}</div>
          <div style={{fontSize:11,fontWeight:800,color:x.c}}>{x.t}</div>
          <div style={{fontSize:10,color:P.muted,marginTop:4}}>{x.d}</div>
        </div>
      )}
    </div>
  </Sec>;
}

function Facilities({lang}:{lang:string}){
  const he=lang==="he";
  const fs=[
    {n:he?"ח׳וג׳יר":"Khojir",d:he?"SHIG+SBIG. דלק מוצק":"SHIG+SBIG. Solid fuel",s:"2024+2026"},
    {n:he?"פרצ׳ין":"Parchin",d:he?"PCI — HNO₃, נפץ, טאלקאן 2":"PCI — HNO₃, explosives",s:"2024+2026"},
    {n:he?"שאהרוד":"Shahrud",d:he?"מנועים, מערבלים":"Engines, mixers",s:"3/2026"},
    {n:he?"אספהאן":"Isfahan",d:he?"אורניום + דואלי":"Uranium + dual-use",s:"6/2025"},
    {n:he?"אסלויה":"Asaluyeh",d:he?"פטרוכימיה — NH₃ + HNO₃":"Petrochemicals",s:"4/2026"},
    {n:he?"שיראז":"Shiraz",d:he?"HNO₃ — \"אחד האחרונים\"":"HNO₃ — \"last remaining\"",s:"4/2026"},
  ];
  return<Sec id="facilities" num="08" title={he?"מתקנים שהותקפו":"Facilities Struck"} subtitle={he?"6 מוקדים":"6 targets"}
    sidebar={<SB color="amber" title={he?"📦 סין":"📦 China"}><p>{he?"אלפי טונות נתרן פרכלורט מהונג קונג. ל~800 טילים.":"Thousands of tons from HK. ~800 missiles."}</p></SB>}>
    {fs.map((f,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:14,padding:"12px 0",borderBottom:`1px solid ${P.border}30`}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <h4 style={{fontWeight:800,fontSize:15}}>{f.n}</h4>
          <span className="mn" style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:P.redS,color:P.red}}>{f.s}</span>
        </div>
        <p style={{fontSize:13,color:P.muted}}>{f.d}</p>
      </div>
    </div>)}
  </Sec>;
}

function HazMat({lang}:{lang:string}){
  const he=lang==="he";
  const pr=[
    {t:"IRFNA — ERG 157",c:P.red,it:he?["🚧 בידוד: 50 מ׳ | אש: 800 מ׳","🧑‍🚀 חליפת A + מנ״פ","🚫 אסור מים על שלולית","🧪 חול → NaHCO₃"]:["🚧 Isolate: 50m | Fire: 800m","🧑‍🚀 Level A + SCBA","🚫 No water on pool","🧪 Sand → NaHCO₃"]},
    {t:"UDMH — ERG 131",c:P.purple,it:he?["🚧 בידוד: 100 מ׳ | דליפה: 300+","🧑‍🚀 חליפת A — חודר עור!","💧 ערפל + AR-AFFF","☠️ NDMA+HCN — 6 שבועות"]:["🚧 Isolate: 100m | Large: 300+","🧑‍🚀 Level A — penetrates skin!","💧 Fog + AR-AFFF","☠️ NDMA+HCN — 6 weeks"]},
    {t:he?"💥 היפרגולי":"💥 Hypergolic",c:P.red,it:he?["מגע = הצתה מיידית","שרידי טיל: 800 מ׳, חומ״ס בלבד"]:["Contact = instant ignition","Debris: 800m, HazMat only"]},
  ];
  return<Sec id="hazmat" num="09" title={he?"מענה חומ״ס — ERG 2024":"HazMat — ERG 2024"}
    sidebar={<SB color="red" title={he?"🏥 רפואי":"🏥 Medical"}><p><b>{he?"בזירה:":"Scene:"}</b> {he?"חילוץ, הפשטה, שטיפה 15+":"Extract, decon, 15+ min"}</p><p><b>{he?"אשפוז:":"Hospital:"}</b> {he?"24-48h. לאסיקס, דובוטמין, iNO":"24-48h. Lasix, dobutamine, iNO"}</p><p><b>UDMH:</b> B6</p></SB>}>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {pr.map((p,i)=><div key={i} className="cm" style={{padding:20,borderRight:`3px solid ${p.c}`}}>
        <h4 className="sf" style={{fontWeight:800,fontSize:15,marginBottom:10}}>{p.t}</h4>
        {p.it.map((x,j)=><p key={j} style={{fontSize:13,color:P.steel,lineHeight:1.7,marginBottom:4}}>{x}</p>)}
      </div>)}
    </div>
  </Sec>;
}

function Glossary({lang}:{lang:string}){
  const[search,setSearch]=useState('');
  const[cat,setCat]=useState('all');
  const he=lang==="he";
  const terms=[
    {t:'IRFNA',c:'chem',d:he?'חומצה חנקתית מעושנת אדומה מעוכבת. HNO₃ + N₂O₄ + HF':'Inhibited Red Fuming Nitric Acid. HNO₃ + N₂O₄ + HF'},
    {t:'UDMH',c:'chem',d:he?'דלק טילים שקוף, מסרטן, חודר עור. CAS 57-14-7':'Clear missile fuel, carcinogenic. CAS 57-14-7'},
    {t:'NTO',c:'chem',d:he?'N₂O₄ — רותח ב-21°C. משמש בח׳ורמשהר':'N₂O₄ — boils at 21°C. Used in Khorramshahr'},
    {t:'AP',c:'chem',d:he?'אמוניום פרכלורט — ~70% מדלק מוצק':'Ammonium perchlorate — ~70% of solid fuel'},
    {t:'HTPB',c:'chem',d:he?'מאגד פולימרי + דלק בדלק מוצק':'Polymer binder + fuel in solid propellant'},
    {t:'RDX/HMX',c:'chem',d:he?'חומרי נפץ. בכמן. גם בעדשות גרעיניות':'Explosives. Bachmann process. Also nuclear lenses'},
    {t:'HNO₃',c:'chem',d:he?'חומצה חנקתית — חומר גלם קריטי לכל שרשרת הנשק':'Nitric acid — critical precursor for entire weapons chain'},
    {t:'Ostwald',c:'proc',d:he?'חמצון NH₃ על Pt-Rh → HNO₃':'NH₃ oxidation on Pt-Rh → HNO₃'},
    {t:'Raschig',c:'proc',d:he?'NH₃ + NaOCl → כלוראמין + DMA → UDMH':'NH₃ + NaOCl → chloramine + DMA → UDMH'},
    {t:'Bachmann',c:'proc',d:he?'הקסאמין + HNO₃ → RDX':'Hexamine + HNO₃ → RDX'},
    {t:'MaRV',c:'mil',d:he?'ראש קרב מתמרן — מקשה על יירוט':'Maneuverable Re-entry Vehicle'},
    {t:'CEP',c:'mil',d:he?'רדיוס 50% פגיעה. ח׳ורמשהר: ~30 מ׳':'Circular Error Probable. Khorramshahr: ~30m'},
    {t:'TEL',c:'mil',d:he?'משגר נייד — שיגור תוך דקות':'Mobile launcher — launch in minutes'},
    {t:'TVC',c:'mil',d:he?'הטיית נחיר לשינוי כיוון':'Thrust Vector Control'},
    {t:'SHIG',c:'org',d:he?'טילים נוזליים':'Liquid missile org'},
    {t:'SBIG',c:'org',d:he?'טילים מוצקים':'Solid missile org'},
    {t:'PCI',c:'org',d:he?'תעשיות כימיקלים פרצ׳ין':'Parchin Chemical Industries'},
    {t:'מנ״פ',c:'haz',d:he?'מערכת נשימה פתוחה — SCBA':'Self-Contained Breathing Apparatus'},
    {t:'ERG 2024',c:'haz',d:he?'מדריך תגובה לחירום':'Emergency Response Guidebook'},
    {t:'IDLH',c:'haz',d:he?'ריכוז מסוכן לחיים. UDMH: 15 ppm':'Immediately Dangerous to Life. UDMH: 15 ppm'},
  ];
  const cats=[{k:'all',l:he?'הכל':'All'},{k:'chem',l:he?'כימיה':'Chem'},{k:'proc',l:he?'תהליכים':'Process'},{k:'mil',l:he?'צבאי':'Military'},{k:'org',l:he?'ארגונים':'Orgs'},{k:'haz',l:he?'חומ״ס':'HazMat'}];
  const catC:Record<string,[string,string]>={chem:[P.greenS,P.green],proc:[P.purpleS,P.purple],mil:[P.blueS,P.blue],org:[P.amberS,P.amber],haz:[P.redS,P.red]};
  const filtered=terms.filter(tm=>(cat==='all'||tm.c===cat)&&(search===''||tm.t.toLowerCase().includes(search.toLowerCase())||tm.d.toLowerCase().includes(search.toLowerCase())));
  return<Sec id="glossary" num="10" title={he?"מקרא מונחים":"Glossary"} subtitle={`${terms.length} ${he?'מונחים':'terms'}`}>
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      {cats.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={cat===c.k?"ta":"ti"} style={{padding:"5px 12px",borderRadius:5,fontSize:11,fontWeight:700,cursor:"pointer"}}>{c.l}</button>)}
    </div>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={he?"🔍 חיפוש מונח...":"🔍 Search..."} style={{width:"100%",padding:"10px 14px",borderRadius:8,background:P.white,border:`1px solid ${P.border}`,fontSize:13,marginBottom:16,outline:"none"}}/>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map((tm,i)=>{const[bg,c]=catC[tm.c]||[P.cream,P.muted];return<div key={i} className="cm" style={{padding:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{fontWeight:800,color:P.blue}}>{tm.t}</span>
          <span style={{fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:3,background:bg,color:c}}>{cats.find(x=>x.k===tm.c)?.l}</span>
        </div>
        <p style={{fontSize:12,color:P.steel,lineHeight:1.6}}>{tm.d}</p>
      </div>;})}
    </div>
  </Sec>;
}

function Sources({lang}:{lang:string}){
  const he=lang==="he";
  const sr=[
    {n:"CSIS Missile Defense Project",c:he?"מחקרי":"Research"},{n:"Iran Watch — Missile Arsenal",c:he?"מחקרי":"Research"},
    {n:"USIP — Ballistic Missile Program",c:he?"ממשלתי":"Govt"},{n:"NIOSH/CDC — UDMH",c:he?"ממשלתי":"Govt"},
    {n:"NOAA CAMEO — IRFNA & NTO",c:he?"ממשלתי":"Govt"},{n:"ERG 2024 — PHMSA",c:he?"ממשלתי":"Govt"},
    {n:"NCBI — AEGL Dimethylhydrazine",c:he?"אקדמי":"Academic"},{n:"PMC — Delayed Pulmonary Edema",c:he?"אקדמי":"Academic"},
    {n:"Alma Center — Iran Missiles",c:he?"מחקרי":"Research"},{n:"IISS Military Balance",c:he?"מחקרי":"Research"},
  ];
  const cc:Record<string,[string,string]>={[he?"ממשלתי":"Govt"]:[P.greenS,P.green],[he?"מחקרי":"Research"]:[P.blueS,P.blue],[he?"אקדמי":"Academic"]:[P.purpleS,P.purple]};
  return<Sec id="sources" num="11" title={he?"מקורות":"Sources"}>
    {sr.map((s,i)=>{const[bg,c]=cc[s.c]||[P.cream,P.muted];return<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${P.border}30`}}>
      <span style={{color:P.gold}}>🔗</span><span style={{flex:1,fontSize:13,color:P.steel}}>{s.n}</span><span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:bg,color:c}}>{s.c}</span>
    </div>;})}
  </Sec>;
}

function Insights({lang}:{lang:string}){
  const he=lang==="he";
  return<Sec id="insights" num="12" title={he?"הפגיעה הסינרגטית":"Synergistic Impact"}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
      {[{ic:"⚗️",t:he?"צוואר הבקבוק":"Chokepoint",d:he?"HNO₃ = מפתח לכל.":"HNO₃ = key to all.",bg:P.redS,bc:P.red},
        {ic:"🇨🇳",t:he?"תלות סין":"China Dep.",d:he?"נתרן פרכלורט — נתיב יחיד.":"Perchlorate — single route.",bg:P.amberS,bc:P.amber},
        {ic:"🎯",t:he?"מצטבר":"Cumulative",d:he?"6 תקיפות, 18 חודשים.":"6 strikes, 18 months.",bg:P.blueS,bc:P.blue},
      ].map((x,i)=><div key={i} className="cm" style={{padding:24,borderRight:`3px solid ${x.bc}`,background:x.bg}}>
        <div style={{fontSize:28,marginBottom:8}}>{x.ic}</div>
        <h3 className="sf" style={{fontWeight:800,fontSize:16,marginBottom:6}}>{x.t}</h3>
        <p style={{fontSize:13,color:P.steel,lineHeight:1.7}}>{x.d}</p>
      </div>)}
    </div>
  </Sec>;
}

function Footer({lang}:{lang:string}){
  const he=lang==="he";
  return<footer style={{borderTop:`1px solid ${P.gold}40`,padding:"36px 20px",background:P.ink,textAlign:"center"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:10}}>
      <div className="mn" style={{width:30,height:30,borderRadius:6,background:P.gold,display:"flex",alignItems:"center",justifyContent:"center",color:P.ink,fontWeight:900,fontSize:11}}>60</div>
      <span style={{fontSize:14,fontWeight:700,color:P.gold}}>{he?"ניתוח 60 שניות של חומ״ס":"60 Seconds HazMat"}</span>
    </div>
    <p style={{fontSize:13,color:`${P.white}80`,marginBottom:10}}><b style={{color:P.white}}>{he?"רועי צוקרמן":"Roei Zukerman"}</b> — {he?"מומחה לחומ״ס וטב״ק":"HazMat & CBRN Expert"}</p>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:14}}>
      <span style={{fontSize:12,color:P.gold}}>✉️ roiez1@gmail.com</span>
    </div>
    <div style={{height:1,maxWidth:300,margin:"0 auto 10px",background:`linear-gradient(90deg,transparent,${P.gold}60,transparent)`}}/>
    <p style={{fontSize:10,color:`${P.white}25`}}>{he?"מקורות פתוחים | לא מסווג":"Open sources | Unclassified"} | {he?"אפריל 2026":"April 2026"}</p>
  </footer>;
}

export default function Home(){
  const[lang,setLang]=useState("he");
  return<div dir={lang==="he"?"rtl":"ltr"}>
    <ProgressBar/>
    <Nav lang={lang} toggle={()=>setLang(l=>l==="he"?"en":"he")}/>
    <Hero lang={lang}/>
    <Timeline lang={lang}/>
    <MissileDiagram lang={lang}/>
    <Arsenal lang={lang}/>
    <Propulsion lang={lang}/>
    <Chemistry lang={lang}/>
    <Processes lang={lang}/>
    <Strategic lang={lang}/>
    <Facilities lang={lang}/>
    <HazMat lang={lang}/>
    <Glossary lang={lang}/>
    <Sources lang={lang}/>
    <Insights lang={lang}/>
    <Footer lang={lang}/>
  </div>;
}
