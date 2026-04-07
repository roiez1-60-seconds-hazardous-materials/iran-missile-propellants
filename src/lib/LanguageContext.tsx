'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Lang = 'he' | 'en';

interface LangCtx {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
  toggle: () => void;
}

// Export both names for compatibility
export const useLanguage = () => useContext(LangContext);
export const useLang = () => useContext(LangContext);

const dict: Record<string, Record<Lang, string>> = {
  'nav.title': { he: 'תיק מודיעין | מערך הטילים והדלקים של איראן', en: 'Intelligence Dossier | Iran Missile & Propellant Complex' },
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.timeline': { he: 'ציר זמן', en: 'Timeline' },
  'nav.diagram': { he: 'חתך טיל', en: 'Missile X-Ray' },
  'nav.arsenal': { he: 'ארסנל', en: 'Arsenal' },
  'nav.propulsion': { he: 'הנעה', en: 'Propulsion' },
  'nav.chemistry': { he: 'כימיה', en: 'Chemistry' },
  'nav.processes': { he: 'ייצור', en: 'Production' },
  'nav.facilities': { he: 'מתקנים', en: 'Facilities' },
  'nav.strategic': { he: 'אסטרטגי', en: 'Strategic' },
  'nav.hazmat': { he: 'חומ״ס', en: 'HazMat' },
  'nav.glossary': { he: 'מקרא', en: 'Glossary' },
  'nav.gallery': { he: 'גלריה', en: 'Gallery' },
  'nav.sources': { he: 'מקורות', en: 'Sources' },
  'nav.lang': { he: 'EN', en: 'עב' },

  'hero.classified': { he: '[ לא מסווג ]', en: '[ UNCLASSIFIED ]' },
  'hero.title': { he: 'תיק מודיעין טקטי', en: 'Tech-Tactical Intelligence Dossier' },
  'hero.subtitle': { he: 'מערך ייצור הטילים והדלקים של איראן', en: "Iran's Missile & Propellant Production Complex" },
  'hero.desc': { he: 'ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום (ERG 2024)', en: "Strategic analysis: propulsion technologies, fuels, production processes, facilities, HazMat risks & emergency protocols (ERG 2024)" },
  'hero.date': { he: 'אפריל 2026', en: 'April 2026' },
  'hero.cta': { he: 'לדו"ח המלא ↓', en: 'Full Report ↓' },
  'hero.stat1.num': { he: '16', en: '16' },
  'hero.stat1.label': { he: 'סוגי טילים', en: 'Missile Types' },
  'hero.stat2.num': { he: '3,000+', en: '3,000+' },
  'hero.stat2.label': { he: 'טילים בליסטיים (IISS)', en: 'Ballistic Missiles (IISS)' },
  'hero.stat3.num': { he: '6', en: '6' },
  'hero.stat3.label': { he: 'מתקנים שהותקפו', en: 'Facilities Struck' },
  'hero.stat4.num': { he: '3', en: '3' },
  'hero.stat4.label': { he: 'תהליכי ייצור קריטיים', en: 'Critical Processes' },

  'summary.title': { he: 'תקציר מנהלים', en: 'Executive Summary' },
  'summary.p1': { he: 'תוכנית הטילים האיראנית — הגדולה והמגוונת ביותר במזרח התיכון — נשענת על שני צירים: הנעה נוזלית (מורשת סקאד) והנעה מוצקה (הדור החדש). חומצה חנקתית (HNO₃) מהווה צוואר בקבוק קריטי לשתי המערכות.', en: "Iran's missile program — the largest and most diverse in the Middle East — relies on two axes: liquid propulsion (Scud legacy) and solid propulsion (new generation). Nitric acid (HNO₃) is a critical bottleneck for both systems." },
  'summary.p2': { he: 'סדרת תקיפות ישראליות (2024-2026) פגעה במתקני מפתח: פרצ׳ין, ח׳וג׳יר, שאהרוד, אסלויה ושיראז — והשביתה את יכולת הייצור הכימי של איראן, כולל מערבלים פלנטריים, מגדלי זיקוק ובורות יציקה.', en: "Israeli strikes (2024-2026) hit key facilities: Parchin, Khojir, Shahrud, Asaluyeh and Shiraz — disabling Iran's chemical production capability including planetary mixers, distillation towers and casting pits." },
  'summary.p3': { he: 'דוח זה מנתח את סוגי הדלקים (IRFNA, UDMH, NTO, AP/HTPB), תהליכי הייצור (אוסטוולד, רשיג, בכמן), ומספק פרוטוקולי חירום מפורטים לאירועי חומ״ס הכוללים חומרים אלו.', en: "This report analyzes fuel types (IRFNA, UDMH, NTO, AP/HTPB), production processes (Ostwald, Raschig, Bachmann), and provides detailed emergency protocols for HazMat incidents involving these materials." },

  'timeline.title': { he: 'ציר זמן: תוכנית הטילים', en: 'Timeline: The Missile Program' },
  'timeline.subtitle': { he: 'מסקאד ועד היפרסוני', en: 'From Scud to Hypersonic' },
  'arsenal.title': { he: 'ארסנל הטילים', en: 'Missile Arsenal' },
  'arsenal.subtitle': { he: 'משפחות, טווחים, דלקים ויכולות', en: 'Families, Ranges, Fuels & Capabilities' },
  'propulsion.title': { he: 'טכנולוגיות הנעה', en: 'Propulsion Technologies' },
  'propulsion.subtitle': { he: 'נוזלי מול מוצק — מוכנות, ביצועים ומורכבות', en: 'Liquid vs Solid — Readiness, Performance & Complexity' },
  'chemistry.title': { he: 'כימיה של הדלקים', en: 'Fuel Chemistry' },
  'chemistry.subtitle': { he: 'IRFNA, UDMH, NTO, AP/HTPB — תכונות וסיכונים', en: 'IRFNA, UDMH, NTO, AP/HTPB — Properties & Hazards' },
  'processes.title': { he: 'תהליכי ייצור', en: 'Production Processes' },
  'processes.subtitle': { he: 'אוסטוולד, רשיג ובכמן — שלושת התהליכים שנפגעו', en: 'Ostwald, Raschig & Bachmann — The Three Disrupted Processes' },
  'facilities.title': { he: 'מוקדי כוח תעשייתיים', en: 'Industrial Power Centers' },
  'facilities.subtitle': { he: 'מפרצ׳ין ועד שיראז', en: 'From Parchin to Shiraz' },
  'strategic.title': { he: 'צוואר הבקבוק הכימי', en: 'The Chemical Chokepoint' },
  'strategic.subtitle': { he: 'HNO₃ — המפתח המוחלט', en: 'HNO₃ — The Master Key' },
  'hazmat.title': { he: 'מענה חומ״ס — ERG 2024', en: 'HazMat Response — ERG 2024' },
  'hazmat.subtitle': { he: 'בידוד, מיגון, כיבוי ופרוטוקול רפואי', en: 'Isolation, PPE, Suppression & Medical Protocol' },
  'simulation.title': { he: 'סימולציות תרחישי אירוע', en: 'Event Scenario Simulations' },
  'simulation.subtitle': { he: 'שפך, דליפה, שריפה ותגובה היפרגולית', en: 'Spill, Leak, Fire & Hypergolic Reaction' },
  'glossary.title': { he: 'מקרא מונחים', en: 'Glossary' },
  'gallery.title': { he: 'גלריה', en: 'Gallery' },
  'sources.title': { he: 'מקורות ומאמרים', en: 'Sources & References' },
  'insights.title': { he: 'סיכום: הפגיעה הסינרגטית', en: 'Summary: The Synergistic Impact' },
};

const LangContext = createContext<LangCtx>({
  lang: 'he', dir: 'rtl', t: (k) => k, toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');

  const toggle = useCallback(() => {
    setLang(prev => {
      const next = prev === 'he' ? 'en' : 'he';
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'he' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);
  const dir = lang === 'he' ? 'rtl' as const : 'ltr' as const;

  return (
    <LangContext.Provider value={{ lang, dir, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}
