'use client';
import { useEffect } from 'react';
export default function LanguageEntry() {
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('living-line-language'); } catch {}
    const lang = saved === 'tr' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en';
    window.location.replace(`/${lang}${window.location.hash}`);
  }, []);
  return <main className="language-entry"><span className="brand-symbol" aria-hidden="true">∿</span><h1>[PROJE ADI]</h1><p>2007 — Bugün / Today</p><nav aria-label="Dil / Language"><a href="/tr">Türkçe</a><a href="/en">English</a></nav></main>;
}
