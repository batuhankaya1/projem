'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function LanguageEntry() {
  function remember(language: 'tr' | 'en') { try { localStorage.setItem('living-line-language', language); } catch {} }
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('living-line-language'); } catch {}
    const lang = saved === 'tr' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
    window.location.replace(`/${lang}${window.location.hash}`);
  }, []);
  return <main className="language-entry"><img className="language-entry-logo" src="/images/projem-main-logo.png" alt="Projem Lider Gençlik" width="800" height="341"/><p>2007 — Bugün / Today</p><nav aria-label="Dil / Language"><Link href="/tr" onClick={() => remember('tr')}>Türkçe</Link><Link href="/en" onClick={() => remember('en')}>English</Link></nav></main>;
}
