import { YouthSite } from '@/components/site/youth-site';
import type { Language } from '@/content/site';
export default async function Home({ params }: { params: Promise<{lang: Language}> }) {
  const { lang } = await params;
  return <YouthSite lang={lang} />;
}
