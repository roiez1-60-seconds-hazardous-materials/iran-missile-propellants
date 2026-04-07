'use client';
import { useState, useEffect } from 'react';

export function ProgressBar() { return null; }

export function BackToTop() {
 const [show, setShow] = useState(false);
 useEffect(() => {
 const fn = () => setShow(window.scrollY > 500);
 window.addEventListener('scroll', fn);
 return () => window.removeEventListener('scroll', fn);
 }, []);
 if (!show) return null;
 return (
 <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
 className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-blue-800 text-white shadow-lg flex items-center justify-center hover:bg-blue-900 transition-colors">
 ↑
 </button>
 );
}
