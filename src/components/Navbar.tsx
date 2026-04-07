'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';

export default function Navbar() {
 const { t, lang, toggle } = useLang();
 const [progress, setProgress] = useState(0);
 const [open, setOpen] = useState(false);

 useEffect(() => {
 const onScroll = () => {
 const h = document.documentElement.scrollHeight - window.innerHeight;
 setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
 };
 window.addEventListener('scroll', onScroll);
 return () => window.removeEventListener('scroll', onScroll);
 }, []);

 const sections = [
 { id:'home', he:'ראשי', en:'Home' },
 { id:'timeline', he:'ציר זמן', en:'Timeline' },
 { id:'diagram', he:'חתך טיל', en:'Missile' },
 { id:'arsenal', he:'ארסנל', en:'Arsenal' },
 { id:'propulsion', he:'הנעה', en:'Propulsion' },
 { id:'chemistry', he:'כימיה', en:'Chemistry' },
 { id:'processes', he:'ייצור', en:'Production' },
 { id:'strategic', he:'אסטרטגי', en:'Strategic' },
 { id:'facilities', he:'מתקנים', en:'Facilities' },
 { id:'hazmat', he:'חומ״ס', en:'HazMat' },
 { id:'glossary', he:'מקרא', en:'Glossary' },
 { id:'gallery', he:'גלריה', en:'Gallery' },
 { id:'sources', he:'מקורות', en:'Sources' },
 ];

 return (
 <>
 {/* Progress bar */}
 <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gray-100">
 <div className="h-full bg-gradient-to-l from-blue-800 to-blue-500 transition-all duration-150" style={{ width: `${progress}%` }} />
 </div>

 {/* Navbar */}
 <nav className="fixed top-[3px] left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
 <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
 <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
 <img src="/images/logo-60sec.png" alt="60s" className="w-7 h-7 rounded-md" style={{width:28,height:28,maxWidth:28}} />
 <span className="text-[11px] font-bold text-gray-400 hidden sm:block">60 שניות חומ״ס</span>
 </a>

 <div className="hidden lg:flex items-center gap-1">
 {sections.map(s => (
 <a key={s.id} href={`#${s.id}`} className="px-2 py-1 text-[11px] text-gray-400 hover:text-blue-700 transition-colors">
 {lang === 'he' ? s.he : s.en}
 </a>
 ))}
 </div>

 <div className="flex items-center gap-2">
 <button onClick={toggle} className="text-[11px] font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100">
 {lang === 'he' ? 'EN' : 'עב'}
 </button>
 <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-400 p-1">
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
 </button>
 </div>
 </div>
 </nav>

 {/* Mobile menu */}
 {open && (
 <div className="fixed top-[51px] left-0 right-0 z-40 bg-white border-b border-gray-200 lg:hidden shadow-lg">
 <div className="flex flex-col p-3 gap-0.5">
 {sections.map(s => (
 <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}
 className="py-2.5 px-4 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg">
 {lang === 'he' ? s.he : s.en}
 </a>
 ))}
 </div>
 </div>
 )}
 </>
 );
}
