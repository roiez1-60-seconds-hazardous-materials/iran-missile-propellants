import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תיק מודיעין טקטי: מערך ייצור הטילים והדלקים של איראן | 60 שניות חומ״ס',
  description: 'ניתוח אסטרטגי: טכנולוגיות הנעה, דלקים, תהליכי ייצור, מתקנים, סיכוני חומ״ס ופרוטוקולי חירום',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-white text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
