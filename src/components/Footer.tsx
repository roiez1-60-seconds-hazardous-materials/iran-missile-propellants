'use client';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="relative z-10 border-t border-slate-800/60 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/images/logo-60sec.png" alt="60 שניות" className="w-12 h-12 rounded-xl" style={{width:48,height:48,maxWidth:48}} />
          <div className="text-right">
            <div className="text-lg font-black text-blue-400">
              {lang === 'he' ? 'ניתוח 60 שניות של חומ״ס' : '60 Seconds HazMat Analysis'}
            </div>
            <div className="text-xs text-slate-500">60 Seconds HazMat Analysis</div>
          </div>
        </div>
        <p className="text-sm text-slate-400">
          {lang === 'he'
            ? <>פותח על ידי <strong className="text-slate-200">רועי צוקרמן</strong> — מומחה לחומ״ס וטב״ק</>
            : <>Developed by <strong className="text-slate-200">Roei Zukerman</strong> — HazMat & CBRN Expert</>}
        </p>
        <p className="text-sm text-slate-500">
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="mailto:roiez1@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            ✉️ roiez1@gmail.com
          </a>
          <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-900/40 text-green-300 border border-green-700/40 px-4 py-2 rounded-xl hover:bg-green-800/40 transition-colors font-bold text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.32 0-4.47-.767-6.202-2.062l-.433-.33-3.286 1.101 1.101-3.286-.33-.433A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            {lang === 'he' ? 'קבוצת 60 שניות של חומ״ס' : '60 Seconds HazMat Group'}
          </a>
        </div>
        <p className="text-[10px] text-slate-700 mt-4">
          {lang === 'he' ? 'מבוסס מקורות פתוחים בלבד | לא מסווג | אפריל 2026' : 'Open sources only | Unclassified | April 2026'}
        </p>
      </div>
    </footer>
  );
}
