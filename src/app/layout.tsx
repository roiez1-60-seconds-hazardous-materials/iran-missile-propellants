import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תיק מודיעין: מערך ייצור הטילים והדלקים של איראן | 60 שניות חומ״ס',
  description: 'ניתוח אסטרטגי של תוכנית הטילים האיראנית — טכנולוגיות הנעה, דלקים, חומרי גלם, מתקני ייצור ופרוטוקולי חירום',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
