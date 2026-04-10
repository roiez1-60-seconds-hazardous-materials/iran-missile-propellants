import './globals.css';
import { Analytics } from '@vercel/analytics/react';
export const metadata = { title: 'תיק מודיעין טקטי — מערך הטילים והדלקים של איראן', description: 'ניתוח 60 שניות חומ״ס — רועי צוקרמן' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="he"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Heebo:wght@300;400;500;700;800;900&family=JetBrains+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/><link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet"/></head><body>{children}<Analytics/></body></html>;
}
