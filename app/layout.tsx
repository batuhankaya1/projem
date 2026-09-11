import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '[PROJE ADI] — 2007’den bugüne', description: '2007’den beri devam eden bir gençlik çalışması. A youth initiative active since 2007.', icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" suppressHydrationWarning><body>{children}</body></html>;
}
