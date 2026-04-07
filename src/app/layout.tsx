import './globals.css';
export const metadata = { title: 'תיק מודיעין טקטי — מערך ייצור הטילים והדלקים של איראן', description: 'ניתוח 60 שניות חומ״ס' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="he" dir="rtl"><body className="bg-white text-gray-800 antialiased leading-relaxed">{children}</body></html>;
}
