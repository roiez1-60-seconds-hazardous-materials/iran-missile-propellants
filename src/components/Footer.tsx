'use client';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
 const { lang } = useLang();
 const h = lang === 'he';
 return (
 <footer className="border-t border-gray-200 py-10 px-4 bg-gray-50">
 <div className="max-w-3xl mx-auto text-center space-y-3">
 <div className="flex items-center justify-center gap-3">
 <img src="/images/logo-60sec.png" alt="60s" className="w-8 h-8 rounded-md" style={{width:32,height:32}} />
 <span className="text-sm font-bold text-blue-800">{h ? 'ניתוח 60 שניות של חומ״ס' : '60 Seconds HazMat Analysis'}</span>
 </div>
 <p className="text-sm text-gray-500">
 {h ? <>פותח על ידי <b className="text-gray-700">רועי צוקרמן</b> — מומחה לחומ״ס וטב״ק</> : <>By <b>Roei Zukerman</b> — HazMat & CBRN Expert</>}
 </p>
 <div className="flex items-center justify-center gap-4 text-sm">
 <a href="mailto:roiez1@gmail.com" className="text-blue-700 hover:text-blue-900">✉️ roiez1@gmail.com</a>
 <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer"
 className="text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-100 border border-green-200">
 WhatsApp — 60 שניות חומ״ס
 </a>
 </div>
 <p className="text-[10px] text-gray-300">{h ? 'מבוסס מקורות פתוחים בלבד | לא מסווג | אפריל 2026' : 'Open sources only | Unclassified | April 2026'}</p>
 </div>
 </footer>
 );
}
