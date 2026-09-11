import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { content, languages, type Language } from '@/content/site';
export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  if (!languages.includes(lang as Language)) return {};
  const c = content[lang as Language];
  return { title: { default: `${c.name} — ${c.title}`, template: `%s | ${c.name}` }, description: c.description, alternates: { languages: { tr: '/tr', en: '/en' } }, openGraph: { title: `${c.name} — ${c.title}`, description: c.description, locale: lang === 'tr' ? 'tr_TR' : 'en_GB' } };
}
export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!languages.includes(lang as Language)) notFound();
  return <div lang={lang}>{children}</div>;
}
