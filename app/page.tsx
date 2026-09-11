'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function LanguageEntry() {
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('living-line-language'); } catch {}
    const lang = saved === 'tr' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
    window.location.replace(`/${lang}${window.location.hash}`);
  }, []);
  return <main className="language-entry"><span className="brand-symbol" aria-hidden="true">∿</span><h1>Projem</h1><p>2007 — Bugün / Today</p><nav aria-label="Dil / Language"><Link href="/tr">Türkçe</Link><Link href="/en">English</Link></nav></main>;
}
