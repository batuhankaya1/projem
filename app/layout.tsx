import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Projem — Lider Gençlik', description: '2007’den beri gençleri beş yıllık bir eğitim ve gelişim yolculuğunda buluşturan gönüllülük esaslı gençlik çalışması.', icons: { icon: '/favicon.svg', shortcut: '/favicon.svg', apple: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" suppressHydrationWarning><body>{children}</body></html>;
}
