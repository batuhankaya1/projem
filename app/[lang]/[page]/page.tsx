import { notFound } from 'next/navigation';
import { YouthSite } from '@/components/site/youth-site';
import { content, pageKeys, type PageKey, type Language } from '@/content/site';
export async function generateMetadata({ params }: { params: Promise<{lang: Language; page: string}> }) {
  const { lang, page } = await params;
  const key = pageKeys.indexOf(page as PageKey);
  if (!content[lang] || key === -1) return {};
  return { title: content[lang].nav[key], alternates: { languages: { tr: `/tr/${page}`, en: `/en/${page}` } } };
}
export default async function DetailPage({ params }: { params: Promise<{lang: Language; page: string}> }) {
  const { lang, page } = await params;
  if (!pageKeys.includes(page as PageKey)) notFound();
  return <YouthSite lang={lang} page={page as PageKey} />;
}
