'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
type Lang = 'he'|'en';
const T: Record<string,Record<Lang,string>> = {
  'title': { he:'תיק מודיעין טקטי', en:'Tactical Intelligence Dossier' },
  'subtitle': { he:'מערך ייצור הטילים והדלקים של איראן', en:"Iran's Missile & Propellant Production Complex" },
  'desc': { he:'ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום (ERG 2024)', en:'Strategic analysis: propulsion, fuels, production, facilities, HazMat risks & ERG 2024 protocols' },
};
const Ctx = createContext<{lang:Lang;t:(k:string)=>string;toggle:()=>void}>({ lang:'he', t:k=>k, toggle:()=>{} });
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');
  const toggle = useCallback(() => setLang(p => p==='he'?'en':'he'), []);
  const t = useCallback((k: string) => T[k]?.[lang] ?? k, [lang]);
  return <Ctx.Provider value={{ lang, t, toggle }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
