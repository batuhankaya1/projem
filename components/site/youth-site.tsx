'use client';

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowUpRight, ArrowUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { content, organization, media, pageKeys, type Language, type PageKey, type Copy } from '@/content/site';

function Mark({ className = '' }: { className?: string }) {
  return <svg className={`mark ${className}`} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 33C14 33 6 13 17 13S21 35 30 34 29 11 43 11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></svg>;
}
function BrandLogo({ className = '' }: { className?: string }) {
  return <img className={`brand-logo-image ${className}`} src="/images/projem-main-logo-transparent.png" alt="Projem Lider Gençlik" width="1921" height="819"/>;
}
function PageTransition({ lang }: { lang: Language }) {
  const [phase, setPhase] = useState<'entering' | 'hidden' | 'leaving'>('entering');
  const navigating = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entranceTimer = window.setTimeout(() => setPhase('hidden'), reducedMotion ? 100 : 620);
    const resetAfterHistoryNavigation = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      navigating.current = false;
      setPhase('hidden');
    };
    const handleNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || navigating.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const current = new URL(window.location.href);
      if (destination.pathname === current.pathname && destination.search === current.search) return;

      event.preventDefault();
      navigating.current = true;
      setPhase('leaving');
      window.setTimeout(() => window.location.assign(destination.href), reducedMotion ? 60 : 430);
    };

    document.addEventListener('click', handleNavigation, true);
    window.addEventListener('pageshow', resetAfterHistoryNavigation);
    return () => {
      window.clearTimeout(entranceTimer);
      document.removeEventListener('click', handleNavigation, true);
      window.removeEventListener('pageshow', resetAfterHistoryNavigation);
    };
  }, []);

  return <div className={`page-transition page-transition-${phase}`} aria-hidden="true"><div className="page-transition-inner"><BrandLogo/><div className="page-transition-line"><i/></div><span>{lang === 'tr' ? '2007’den bugüne' : 'From 2007 to today'}</span></div></div>;
}
function InstagramMark() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function XMark() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4.5 19 19.5M19 4.5 5 19.5"/></svg>;
}
function LinkedInMark() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7.25v.25M12 17v-4.1c0-1.8 1.15-2.9 2.65-2.9 1.45 0 2.35.95 2.35 2.9V17M12 10v7"/></svg>;
}
const menuPageKeys: PageKey[] = ['about', 'team', 'contact'];
function Header({ lang, page, c }: { lang: Language; page?: PageKey; c: Copy }) {
  const [menu, setMenu] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [brandVisible, setBrandVisible] = useState(true);
  useEffect(() => {
    let lastY = window.scrollY;
    let direction = 0;
    let travel = 0;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      const nextDirection = delta === 0 ? direction : delta > 0 ? 1 : -1;
      if (nextDirection !== direction) travel = 0;
      travel += Math.abs(delta);
      direction = nextDirection;
      setHasScrolled(y > 40);
      if (y < 90) setBrandVisible(true);
      else if (travel > 18) {
        setBrandVisible(direction < 0);
        travel = 0;
      }
      lastY = y;
    };
    const schedule = () => { if (!raf) raf = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => { window.removeEventListener('scroll', schedule); if (raf) window.cancelAnimationFrame(raf); };
  }, []);
  function remember(language: Language) { try { localStorage.setItem('living-line-language', language); } catch {} }
  const menuNotes = lang === 'tr'
    ? ['Hikâyemiz ve yaklaşımımız', 'Ekip ve gönüllüler', 'Birlikte çalışalım']
    : ['Our story and approach', 'Team and volunteers', 'Work with us'];
  return <>
    <a className="skip-link" href="#main">{c.skipNav}</a>
    <header className={`site-header route-header${hasScrolled ? ' route-header-scrolled' : ''}${brandVisible ? '' : ' route-header-brand-hidden'}`}>
      <a href={`/${lang}`} className="brand route-brand" aria-label={`${c.name} — ${c.home}`}><BrandLogo/></a>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetTrigger asChild><button className="route-menu-trigger" aria-label={c.menu}><span>{lang === 'tr' ? 'Menü' : 'Menu'}</span><span className="route-menu-icon" aria-hidden="true"><i/><i/></span></button></SheetTrigger>
        <SheetContent side="top" className="route-menu-sheet" showCloseButton={false}>
          <div className="route-menu-head"><a href={`/${lang}`} className="brand route-menu-brand" aria-label={`${c.name} — ${c.home}`}><BrandLogo/></a><SheetClose asChild><button className="route-menu-close"><span>{c.close}</span><X/></button></SheetClose></div>
          <SheetTitle className="sr-only">{lang === 'tr' ? 'Kurumsal indeks' : 'Institutional index'}</SheetTitle>
          <SheetDescription className="sr-only">{c.footer}</SheetDescription>
          <div className="corporate-index">
            <section className="index-identity" aria-labelledby="index-vision-title">
              <p className="index-kicker">{lang === 'tr' ? '2007’den beri · Gönüllülük esasıyla' : 'Since 2007 · Powered by volunteers'}</p>
              <div className="index-vision index-vision-anniversary" aria-hidden="true"><span>20.</span><i>/</i><span>{lang === 'tr' ? 'YIL' : 'YEARS'}</span></div>
              <h2 id="index-vision-title">{lang === 'tr' ? '20 yıllık birikim, yaşayan bir gelecek.' : 'Twenty years of experience, carried forward.'}</h2>
              <p>{lang === 'tr' ? 'Gönüllülükten doğan, mezunlarıyla büyüyen ve her kuşakta yeniden güçlenen bir gençlik projesi.' : 'A volunteer-led youth project that grows through its alumni and gains new strength with every generation.'}</p>
            </section>
            <nav className="index-navigation" aria-label={lang === 'tr' ? 'Ana menü' : 'Main navigation'}><a className="index-row" href={`/${lang}`} aria-current={!page ? 'page' : undefined} style={{ '--index-delay': '0ms' } as CSSProperties}><span className="index-number">00</span><span className="index-label"><strong>{c.home}</strong><small>{lang === 'tr' ? 'Hikâyenin başlangıcı' : 'The beginning of the story'}</small></span><ArrowUpRight aria-hidden="true"/></a>{menuPageKeys.map((key, i) => { const copyIndex = pageKeys.indexOf(key); return <a key={key} className="index-row" href={`/${lang}/${key}`} aria-current={page === key ? 'page' : undefined} style={{ '--index-delay': `${(i + 1) * 55}ms` } as CSSProperties}><span className="index-number">0{i+1}</span><span className="index-label"><strong>{c.nav[copyIndex]}</strong><small>{menuNotes[i]}</small></span><ArrowUpRight aria-hidden="true"/></a> })}</nav>
          </div>
          <div className="index-footer"><span>{lang === 'tr' ? '2007 — 20. YIL' : '2007 — 20 YEARS'}</span><nav className="route-language" aria-label="Dil / Language">{(['tr', 'en'] as Language[]).map(language => <a key={language} href={`/${language}${page ? `/${page}` : ''}`} onPointerDown={() => remember(language)} hrefLang={language} lang={language} aria-current={lang === language ? 'page' : undefined}>{language.toUpperCase()}</a>)}</nav></div>
        </SheetContent>
      </Sheet>
    </header>
  </>;
}

const journeyPath = 'M -90 760 C 165 760 130 470 355 470 C 585 470 430 830 720 760 C 965 700 770 255 1010 215 C 1205 182 1215 540 1375 380 C 1510 245 1400 72 1690 58';
const journeyNodes = [[-35,760],[355,470],[720,760],[1010,215],[1375,380],[1645,66]];
const visualPositions = [
  { left: 59, top: 10, rotate: -5 },
  { left: 76, top: 49, rotate: 4 },
  { left: 48, top: 63, rotate: -3 },
  { left: 80, top: 9, rotate: 5 },
  { left: 62, top: 35, rotate: -4 },
];

function LivingLine({ step, progress, c, lang }: { step: number; progress: number; c: Copy; lang: Language }) {
  const scene = c.scenes[step];
  const pathRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<SVGGElement>(null);
  const rawStep = progress * 4;
  useEffect(() => {
    const path = pathRef.current;
    const vehicle = vehicleRef.current;
    if (!path || !vehicle) return;
    const length = path.getTotalLength();
    const distance = Math.max(0, Math.min(1, progress)) * length;
    const point = path.getPointAtLength(distance);
    const next = path.getPointAtLength(Math.min(length, distance + 2));
    const angle = Math.atan2(next.y - point.y, next.x - point.x) * 180 / Math.PI;
    vehicle.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`);
  }, [progress]);
  return <div className={`living-art art-step-${step}`} style={{ '--journey-progress': progress } as CSSProperties} role="img" aria-label={`${c.graphic} ${scene.period}`}>
    <div className="art-years" aria-hidden="true">{c.scenes.map((item, i) => { const opacity = Math.max(0, 1 - Math.abs(rawStep - i) * 1.7); return <span key={i} className={`art-year ${i === 4 ? 'art-year-today' : ''}`} style={{ opacity, filter: `blur(${(1-opacity) * 3}px)`, transform: `translate3d(${(i - rawStep) * 22}px, ${(i - rawStep) * 12}px, 0) scale(${1 + progress * .06})` }}>{item.year}</span> })}</div>
    <div className="journey-visuals" aria-hidden="true">{media.story.map((item, i) => {
      const delta = i - rawStep;
      const distance = Math.abs(delta);
      const reveal = Math.max(0, Math.min(1, progress * 11));
      const opacity = reveal * Math.max(0, 1 - distance * .52);
      const position = visualPositions[i];
      return <div key={i} className={`journey-visual journey-visual-${i}`} style={{ left: `${position.left}%`, top: `${position.top}%`, opacity, transform: `translate3d(${delta * 27}vw, ${delta * -4}vh, 0) rotate(${position.rotate + delta * 2}deg) scale(${.82 + Math.max(0, 1 - distance) * .18})` }}>
        {item.src ? <img src={item.src} alt={item.alt[lang]} width={520} height={680} loading={i === 0 ? 'eager' : 'lazy'} /> : <svg viewBox="0 0 320 420" fill="none"><path d={i % 2 ? 'M-30 325C72 218 98 462 204 320S334 120 375 58' : 'M-35 352C54 350 49 155 137 154S190 335 286 250 290 61 362 44'} /><circle cx={i % 2 ? 102 : 237} cy={i % 2 ? 152 : 116} r={i % 2 ? 52 : 68} /><path d="M34 42H286M34 378H286" /></svg>}
      </div>;
    })}</div>
    <svg className="line-diagram" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
      <path d="M0 770H1600M355 35V865M1010 35V865M1375 35V865" className="construction-line" />
      <path d={journeyPath} className="route-base" />
      <path ref={pathRef} d={journeyPath} pathLength="1" className="living-path" style={{ strokeDashoffset: 1 - progress }} />
      <g className="network-lines" style={{ opacity: Math.max(0, (progress - .18) * 1.5) }}><path d="M355 470L1010 215M720 760L1375 380M355 470L720 760L1010 215L1375 380M720 760L1645 66M-35 760L1010 215L1645 66" /></g>
      {journeyNodes.map(([x,y],i)=><g key={i} className="route-node" style={{ opacity: Math.max(.16, Math.min(1, progress * 5 - i * .72)) }}><circle cx={x} cy={y} r="17" fill="var(--art-bg)"/><circle cx={x} cy={y} r="8" fill="var(--orange)"/></g>)}
      <g ref={vehicleRef} className="journey-vehicle"><circle r="14"/><path d="M-5-6 7 0-5 6Z" /></g>
      <path d="M1285 224C1360 224 1285 122 1360 122S1400 255 1470 245 1460 112 1545 112" className="final-mark" style={{ opacity: Math.max(0, (progress - .82) * 5.5) }} />
    </svg>
  </div>;
}

function Story({ c, lang }: { c: Copy; lang: Language }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const journey = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  useEffect(() => { progressRef.current = progress; }, [progress]);
  const scrollToStep = (target: number) => {
    const section = journey.current;
    const sticky = frame.current;
    if (!section || !sticky) return;
    const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + travel * (target / 4), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = journey.current;
      const sticky = frame.current;
      if (!section || !sticky) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const nextProgress = Math.max(0, Math.min(1, -rect.top / travel));
      setProgress(nextProgress);
      setStep(Math.max(0, Math.min(4, Math.round(nextProgress * 4))));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (raf) cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const section = journey.current;
      if (!section || document.querySelector('[role="dialog"]') || event.altKey || event.metaKey || event.ctrlKey) return;
      const rect = section.getBoundingClientRect();
      const active = rect.top <= 2 && rect.bottom > window.innerHeight;
      if (!active) return;
      const dir = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      event.preventDefault();
      const current = Math.round(progressRef.current * 4);
      scrollToStep(Math.max(0, Math.min(4, current + dir)));
    };
    window.addEventListener('keydown',key);
    return () => window.removeEventListener('keydown',key);
  }, []);
  const rawStep = progress * 4;
  return <section ref={journey} className="story-journey" aria-label={c.storyLabel}>
    <div ref={frame} className="story story-frame" style={{ '--journey-progress': progress } as CSSProperties}>
      <div className="story-stage">
        <div className="story-copy-stack">{c.scenes.map((scene, i) => { const opacity = Math.max(0, 1 - Math.abs(rawStep - i) * 1.7); return <div className="story-copy" key={i} aria-hidden={i !== step} style={{ opacity, filter: `blur(${(1-opacity) * 3}px)`, transform: `translate3d(0, ${(i - rawStep) * 34}px, 0) scale(${.97 + opacity * .03})`, pointerEvents: i === step ? 'auto' : 'none' }}>
          <p className="scene-period"><span>{String(i+1).padStart(2,'0')}</span> {scene.period}</p>
          <div aria-live={i === step ? 'polite' : 'off'} aria-atomic="true"><h1>{scene.title.map((line,lineIndex) => <span key={lineIndex} className={lineIndex === 2 ? 'last-line' : ''}>{line}</span>)}</h1><p className="story-body">{scene.body}</p></div>
        </div>})}</div>
        <LivingLine step={step} progress={progress} c={c} lang={lang}/>
      </div>
    </div>
    <div className="story-transcript">{c.scenes.map((scene,i)=><article key={i}><p className="scene-period"><span>{String(i+1).padStart(2,'0')}</span> {scene.period}</p><h2>{scene.title.join(' ')}</h2><p>{scene.body}</p></article>)}</div>
  </section>;
}

const programCards = {
  tr: [
    { title: 'Dersler', detail: 'Beş yıla yayılan; düşünce, kültür, liderlik ve proje üretimini birlikte ele alan eğitim çizgisi.' },
    { title: 'Kamplar', detail: 'Hazırlık, yoğunlaşma ve değerlendirme dönemlerini birlikte yaşama deneyimiyle buluşturan kamplar.' },
    { title: 'Hitabet', detail: 'Düşünceyi açık, güçlü ve sorumlu biçimde ifade etmeye odaklanan uygulamalı çalışmalar.' },
    { title: 'Türkiye Gezisi', detail: 'Şehirleri, kültürel mirası ve farklı hayatları yerinde tanımaya açılan öğrenme rotaları.' },
  ],
  en: [
    { title: 'Classes', detail: 'A five-year learning path connecting thought, culture, leadership and project development.' },
    { title: 'Camps', detail: 'Preparation, intensive learning and evaluation periods combined with the experience of living together.' },
    { title: 'Public Speaking', detail: 'Practical work focused on expressing ideas with clarity, confidence and responsibility.' },
    { title: 'Türkiye Journey', detail: 'Learning routes that encounter cities, cultural heritage and different lives first-hand.' },
  ],
};

function WhoWeAre({ lang }: { lang: Language }) {
  return <section className="home-about" aria-labelledby="home-about-title">
    <header className="home-about-heading">
      <span>01 / {lang === 'tr' ? 'BİZ KİMİZ' : 'WHO WE ARE'}</span>
      <p>{lang === 'tr' ? 'Gönüllülükle başlayan, kuşaklar boyunca devam eden bir eğitim yolculuğu.' : 'An educational journey founded on volunteering and carried forward across generations.'}</p>
    </header>
    <div className="home-about-body">
      <div className="home-about-title-wrap">
        <p>{lang === 'tr' ? '2007’DEN BUGÜNE' : 'SINCE 2007'}</p>
        <h2 id="home-about-title">{lang === 'tr' ? <>Bir okul,<br/>bir ekol.</> : <>A school,<br/>a tradition.</>}</h2>
      </div>
      <div className="home-about-copy">
        <p>{lang === 'tr' ? 'Projem; Türkiye’nin köklü liselerinde öğrenim gören gençleri, gönüllülük esaslı beş yıllık bir eğitim ve gelişim yolculuğunda buluşturan bir gençlik çalışmasıdır.' : 'Projem is a volunteer-led youth initiative that brings students from Türkiye’s established high schools together through a five-year education and development journey.'}</p>
        <p>{lang === 'tr' ? 'Akademik ve entelektüel gelişimi millî ve manevi değerlerle bir araya getirir. Mezunların yeni kuşaklara rehberlik ettiği bu model, Projem’i bir programdan öte yaşayan bir topluluğa dönüştürür.' : 'It connects academic and intellectual development with shared values. With alumni guiding each new generation, Projem grows beyond a programme into a living community.'}</p>
        <div className="home-about-principles" aria-label={lang === 'tr' ? 'Temel yaklaşımımız' : 'Our core approach'}>
          <span>{lang === 'tr' ? 'Çift kanatlı eğitim' : 'Whole-person education'}</span>
          <span>{lang === 'tr' ? 'Gençlerin öncülüğü' : 'Youth leadership'}</span>
          <span>{lang === 'tr' ? 'Mezunlarla süreklilik' : 'Alumni continuity'}</span>
        </div>
        <a className="home-about-link" href={`/${lang}/about`}><span>{lang === 'tr' ? 'Hikâyemizi keşfedin' : 'Discover our story'}</span><i/><ArrowUpRight/></a>
      </div>
    </div>
  </section>;
}

function StatsBar({ lang }: { lang: Language }) {
  const impact = lang === 'tr' ? [
    { value: '10.000+', label: 'İstanbul ve Türkiye genelinde 15 köklü lisede ulaşılan genç' },
    { value: 'Binlerce', label: 'Seçkin üniversitelerde öğrenim gören veya mezun genç' },
    { value: 'Binlerce', label: 'Türkiye’de ve dünyada kariyer sahibi profesyonel' },
  ] : [
    { value: '10,000+', label: 'Young people reached across 15 established high schools in Istanbul and Türkiye' },
    { value: 'Thousands', label: 'Students and alumni at leading universities' },
    { value: 'Thousands', label: 'Professionals working across Türkiye and the world' },
  ];
  return <section className="stats-bar" aria-labelledby="stats-title"><header className="stats-heading"><span>02</span><div><h2 id="stats-title">{lang === 'tr' ? 'Sayılarla Projem' : 'Projem in numbers'}</h2><p>{lang === 'tr' ? '20. yıl sunumunda yer alan öğrenci, mezun ve etki verileri.' : 'Student, alumni and impact figures from the 20th-year presentation.'}</p></div></header><div className="stats-grid"><dl className="stats-current"><div><dd>75</dd><dt>{lang === 'tr' ? 'Projem lise öğrencisi' : 'Projem high-school students'}</dt></div><div><dd>108</dd><dt>{lang === 'tr' ? 'Projem mezunu' : 'Projem alumni'}</dt><p>{lang === 'tr' ? 'Mühendislik %69 · Sağlık %12 · Sosyal Bilimler %8 · Diğer %11' : 'Engineering 69% · Health 12% · Social Sciences 8% · Other 11%'}</p></div><div><dd>12</dd><dt>{lang === 'tr' ? 'Her yıl ortalama mezun' : 'Average graduates each year'}</dt><p>{lang === 'tr' ? 'Programı tamamlayarak üniversite ve yönetim ekibine dâhil olan mezunlar' : 'Graduates completing the programme and joining university and the management team'}</p></div><div><dd>200+</dd><dt>{lang === 'tr' ? 'X10 ile her yıl ulaşılan genç' : 'Young people reached by X10 each year'}</dt><p>{lang === 'tr' ? 'Projem öğrencilerinin dışında ulaşılan gençler' : 'Young people reached beyond Projem’s own students'}</p></div></dl><div className="stats-impact"><header><span>{lang === 'tr' ? 'ETKİ VE FAALİYET ALANIMIZ' : 'OUR IMPACT AND REACH'}</span></header><dl className="stats-evidence">{impact.map(fact => <div key={fact.label}><dd>{fact.value}</dd><dt>{fact.label}</dt></div>)}</dl></div></div></section>;
}

function ProgramsShowcase({ lang }: { lang: Language }) {
  const cards = programCards[lang];
  const cardGroup = (hidden = false) => <div className="program-film-group" aria-hidden={hidden || undefined}>{cards.map((program, i) => <article className="program-card" key={`${hidden ? 'duplicate-' : ''}${program.title}`}><div className={`program-card-image program-image-${i}`} role="img" aria-label={program.title}/><div className="program-card-copy"><div className="program-card-meta"><span>{String(i + 1).padStart(2, '0')}</span><span>{lang === 'tr' ? 'YILLIK PROGRAM' : 'ANNUAL PROGRAMME'}</span></div><h3>{program.title}</h3><p>{program.detail}</p></div></article>)}</div>;
  return <section className="programs-showcase" aria-labelledby="programs-title"><header className="programs-heading"><div><span>03 / 04</span><h2 id="programs-title">{lang === 'tr' ? 'Programlarımız' : 'Our programmes'}</h2></div><p>{lang === 'tr' ? 'Yıl boyunca, birlikte.' : 'Together, throughout the year.'}</p></header><div className="program-film" aria-label={lang === 'tr' ? 'Programlar' : 'Programmes'}><div className="program-film-track">{cardGroup()}{cardGroup(true)}</div></div></section>;
}

function Detail({ page, c, lang }: { page: PageKey; c: Copy; lang: Language }) {
  const copyIndex = pageKeys.indexOf(page);
  const menuIndex = Math.max(0, menuPageKeys.indexOf(page));
  if (page === 'about') return <AboutPage c={c} lang={lang}/>;
  if (page === 'team') return <ManagementPage c={c} lang={lang}/>;
  if (page === 'contact') return <ContactPage c={c} lang={lang}/>;
  return <section className={`blank-detail blank-detail-${page}`} aria-labelledby="detail-title"><div className="blank-detail-grid" aria-hidden="true"><i/><i/><i/><i/></div><div className="blank-detail-heading"><span>{String(menuIndex + 1).padStart(2, '0')}</span><h1 id="detail-title">{c.nav[copyIndex]}</h1></div><svg className="blank-detail-line" viewBox="0 0 1600 760" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true"><path d="M-80 620C170 620 160 290 410 290S565 660 830 550 920 115 1175 155 1245 515 1660 250"/><circle cx="410" cy="290" r="13"/><circle cx="830" cy="550" r="13"/><circle cx="1175" cy="155" r="13"/></svg><a className="blank-detail-home" href={`/${lang}`}><span>{c.home}</span><ArrowUpRight/></a></section>;
}

function InstitutionalIntro({ index, title, lead }: { index: string; title: string; lead: string }) {
  return <header className="institutional-intro"><span>{index}</span><div><h1>{title}</h1><p>{lead}</p></div></header>;
}

function AboutPage({ c, lang }: { c: Copy; lang: Language }) {
  const paragraphs = lang === 'tr' ? [
    'Projem, 2007’den bu yana Türkiye’nin köklü liselerinde öğrenim gören gençleri beş yıllık bir eğitim ve gelişim yolculuğunda buluşturan gönüllülük esaslı bir gençlik çalışmasıdır.',
    'Akademik ve entelektüel gelişimi milli ve manevi değerlerle birlikte ele alan program; derslerden kitap okumalarına, hitabetten proje yönetimine, kamplardan şehir ve kültür gezilerine uzanan bütünlüklü bir deneyim sunar.',
    'Modelin sürekliliğini mezunların yeni kuşaklara rehberlik etmesi sağlar. Böylece Projem yalnızca bir eğitim programı değil; öğrencilerin sorumluluk aldığı, mezunların deneyimini aktardığı ve kuşaklar arasında büyüyen bir topluluk hâline gelir.',
  ] : [
    'Since 2007, Projem has brought students from Türkiye’s established high schools together through a volunteer-led, five-year education and development journey.',
    'The programme connects academic and intellectual development with shared values through classes, guided reading, public speaking, project management, camps and journeys focused on cities and culture.',
    'Its continuity comes from alumni guiding new generations. Projem therefore grows beyond an education programme into an intergenerational community where students take responsibility and graduates pass on their experience.',
  ];
  const initiatives = lang === 'tr' ? [
    { name: 'Projem Akademi', text: 'Köklü liselerdeki gençler için beş yıllık, uzun soluklu eğitim ve gelişim programı.' },
    { name: 'X10', text: 'Öğrenci ve mezunların öncülüğünde, farklı süre ve yoğunluklarda programlara katılım sağlayan esnek gençlik ağı.' },
    { name: 'Halka', text: 'Okuma, sohbet ve kültür çalışmalarını öğrencilerin kendi okullarında yönettiği katılımcı model.' },
  ] : [
    { name: 'Projem Academy', text: 'A long-term, five-year education and development programme for students at established high schools.' },
    { name: 'X10', text: 'A flexible youth network led by students and alumni, offering programmes at different lengths and levels of intensity.' },
    { name: 'Halka', text: 'A participatory model in which students run reading, discussion and cultural circles in their own schools.' },
  ];
  const years = lang === 'tr' ? [
    ['01', 'Temel', 'İnanç, metin okuma, şehir ve medeniyet üzerine güçlü bir başlangıç.'],
    ['02', 'Derinleşme', 'Hadis, fıkıh, dinler ve Kur’an çalışmalarıyla düşünsel zemini genişletme.'],
    ['03', 'Sorumluluk', 'Liderlik, hitabet, düşünce tarihi ve toplumsal hareketler üzerine çalışma.'],
    ['04', 'Üretim', 'Proje yönetimi, felsefe ve coğrafya üzerinden fikri uygulamaya dönüştürme.'],
    ['05', 'Ufuk', 'Sosyoloji, dünya coğrafyası ve örnek şahsiyetlerle daha geniş bir bakış kurma.'],
  ] : [
    ['01', 'Foundations', 'A strong beginning through belief, close reading, cities and civilisation.'],
    ['02', 'Deepening', 'Broadening the intellectual ground through hadith, jurisprudence, religions and Qur’anic studies.'],
    ['03', 'Responsibility', 'Work on leadership, public speaking, intellectual history and social movements.'],
    ['04', 'Creation', 'Turning ideas into practice through project management, philosophy and geography.'],
    ['05', 'Perspective', 'Building a wider outlook through sociology, world geography and exemplary figures.'],
  ];
  const methods = lang === 'tr' ? ['Yıllık 28 kitaplık okuma seçkisi', 'Yazı atölyeleri', 'Hitabet ve sunumlar', 'Vize ve final sınavları', 'Kamplar ve Türkiye gezileri', 'Performans ve gelişim takibi'] : ['An annual selection of 28 books', 'Writing workshops', 'Public speaking and presentations', 'Midterm and final assessments', 'Camps and journeys across Türkiye', 'Performance and development tracking'];
  return <section className="institutional-page about-page"><InstitutionalIntro index="01" title={c.nav[0]} lead={lang === 'tr' ? 'Köklü liselerden başlayan, mezunlarla kuşaklar boyunca devam eden bir eğitim ve gelişim topluluğu.' : 'An education and development community that begins in established high schools and continues across generations through its alumni.'}/><div className="about-editorial"><div className="about-statement"><span>{lang === 'tr' ? '2007’DEN BUGÜNE' : 'SINCE 2007'}</span><strong>{lang === 'tr' ? 'Bir programdan fazlası; kuşaklar arasında devam eden bir bağ.' : 'More than a programme; a connection carried across generations.'}</strong></div><div className="about-copy">{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="about-principles"><article><span>01</span><h2>{lang === 'tr' ? 'Çift kanatlı eğitim' : 'Whole-person education'}</h2></article><article><span>02</span><h2>{lang === 'tr' ? 'Gençlerin öncülüğü' : 'Youth leadership'}</h2></article><article><span>03</span><h2>{lang === 'tr' ? 'Mezunlarla süreklilik' : 'Alumni continuity'}</h2></article></div><section className="about-model" aria-labelledby="model-title"><header><span>02</span><div><p>{lang === 'tr' ? 'ORGANİZASYON MODELİ' : 'ORGANISATION MODEL'}</p><h2 id="model-title">{lang === 'tr' ? 'Üç yapı, ortak bir hedef.' : 'Three structures, one shared purpose.'}</h2></div></header><div>{initiatives.map((initiative, index) => <article key={initiative.name}><span>0{index + 1}</span><h3>{initiative.name}</h3><p>{initiative.text}</p></article>)}</div></section><section className="about-curriculum" aria-labelledby="curriculum-title"><header><span>03</span><div><p>{lang === 'tr' ? 'EĞİTİM MODELİ' : 'EDUCATION MODEL'}</p><h2 id="curriculum-title">{lang === 'tr' ? 'Beş yıllık gelişim çizgisi.' : 'A five-year development path.'}</h2></div></header><div className="curriculum-years">{years.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="curriculum-methods">{methods.map(method => <span key={method}>{method}</span>)}</div></section></section>;
}

function ManagementPage({ c, lang }: { c: Copy; lang: Language }) {
  const leadership = [
    { name: 'Abdulkadir Taşkın', role: lang === 'tr' ? 'Genel Koordinatör / Kurucu' : 'General Coordinator / Founder', image: 'abdulkadir-taskin.jpg' },
    { name: 'Yusuf Ekrem Çakıroğlu', role: lang === 'tr' ? 'Projem Akademi Koordinatörü' : 'Projem Academy Coordinator', image: 'yusuf-ekrem-cakiroglu.jpg' },
    { name: 'Muhammed Furkan Çoban', role: lang === 'tr' ? 'X10 Gençlik Koordinatörü' : 'X10 Youth Coordinator', image: 'muhammed-furkan-coban.jpg' },
  ];
  const coordinators = [
    { name: 'Mustafa Tayyip Erdem', role: lang === 'tr' ? 'Projem Genel Sekreteri' : 'Projem General Secretary', image: 'mustafa-tayyip-erdem.jpg' },
    { name: 'Şehmus Saygın', role: lang === 'tr' ? 'Eğitim Koordinatörü' : 'Education Coordinator', image: 'sehmus-saygin.jpg' },
    { name: 'Cemil Sefa Kaplan', role: lang === 'tr' ? 'EKOP Koordinatörü' : 'EKOP Coordinator', image: 'cemil-sefa-kaplan.jpg' },
    { name: 'Enes Bushi', role: lang === 'tr' ? 'SSKF Koordinatörü' : 'SSKF Coordinator', image: 'enes-bushi.jpg' },
    { name: 'Enes Faruk Türköz', role: lang === 'tr' ? 'Tanıtım ve Medya Koordinatörü' : 'Communications and Media Coordinator', image: 'enes-faruk-turkoz.jpg' },
    { name: 'Abdullah Kömürcü', role: lang === 'tr' ? 'İdari ve Mali İşler Koordinatörü' : 'Administrative and Financial Affairs Coordinator', image: 'abdullah-komurcu.jpg' },
    { name: 'Ahmet Taha Elmas', role: lang === 'tr' ? 'Sınavlara Hazırlık Koordinatörü' : 'Exam Preparation Coordinator', image: 'ahmet-taha-elmas.jpg' },
    { name: 'Akif Akkaya', role: lang === 'tr' ? 'Mezun Çalışmaları Koordinatörü' : 'Alumni Programme Coordinator', image: 'akif-akkaya.jpg' },
  ];
  const groupLeaders = [
    { name: 'Muhammed Furkan Çoban', role: lang === 'tr' ? '12. Sınıflar Grup Lideri' : 'Grade 12 Group Leader', image: 'muhammed-furkan-coban.jpg' },
    { name: 'Necmettin Bora Çalık', role: lang === 'tr' ? '11. Sınıflar Grup Lideri' : 'Grade 11 Group Leader', image: 'necmettin-bora-calik.jpg' },
    { name: 'Muhammed Denli', role: lang === 'tr' ? '10. Sınıflar Grup Lideri' : 'Grade 10 Group Leader', image: 'muhammed-denli.jpg' },
    { name: 'Muhammed Mansur Kurt', role: lang === 'tr' ? '9. Sınıflar Grup Lideri' : 'Grade 9 Group Leader', image: 'muhammed-mansur-kurt.jpg' },
    { name: 'Osman Efe Kaleli', role: lang === 'tr' ? 'Hazırlık Sınıfları Grup Lideri' : 'Preparatory Class Group Leader', image: 'osman-efe-kaleli.jpg' },
  ];
  const person = (item: typeof leadership[number], index: number) => <article className="management-person" key={`${item.name}-${item.role}`}><div className="management-portrait"><img src={`/images/team/${item.image}`} alt="" width="512" height="512"/></div><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.name}</h3><p>{item.role}</p></article>;
  return <section className="institutional-page management-page"><InstitutionalIntro index="02" title={c.nav[2]} lead={lang === 'tr' ? 'Programı yürüten koordinatörler ve öğrencilerle birlikte büyüyen bir sorumluluk ağı.' : 'A network of responsibility that grows through coordinators and student leaders running the programme together.'}/><div className="management-edition"><div><span>{lang === 'tr' ? '20. YIL SUNUMU' : '20TH-YEAR PRESENTATION'}</span><p>{lang === 'tr' ? 'Broşürde yer alan yönetim kadrosu' : 'Management team listed in the institutional booklet'}</p></div><strong>75<small>{lang === 'tr' ? 'kişilik yönetim ekibi' : 'people in the management team'}</small></strong></div><section className="management-leadership" aria-labelledby="leadership-title"><header><span>01</span><h2 id="leadership-title">{lang === 'tr' ? 'Genel koordinasyon' : 'General coordination'}</h2></header><div className="management-leadership-map"><svg viewBox="0 0 1000 500" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M500 185V250M500 250H245V310M500 250H755V310"/></svg>{leadership.map((item, index) => <div className={`management-lead management-lead-${index}`} key={item.name}>{person(item, index)}</div>)}</div></section><section className="management-roster" aria-labelledby="coordinators-title"><header><span>02</span><div><h2 id="coordinators-title">{lang === 'tr' ? 'Koordinatörler' : 'Coordinators'}</h2><p>{String(coordinators.length).padStart(2, '0')}</p></div></header><div className="management-person-grid coordinators-grid">{coordinators.map(person)}</div></section><section className="management-roster" aria-labelledby="leaders-title"><header><span>03</span><div><h2 id="leaders-title">{lang === 'tr' ? 'Grup liderleri' : 'Group leaders'}</h2><p>{String(groupLeaders.length).padStart(2, '0')}</p></div></header><div className="management-person-grid leaders-grid">{groupLeaders.map(person)}</div></section></section>;
}

function ContactPage({ c, lang }: { c: Copy; lang: Language }) {
  const [status, setStatus] = useState('');
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setStatus(lang === 'tr' ? 'Teşekkür ederiz. Mesajınız alındı.' : 'Thank you. We have received your message.'); }
  return <section className="institutional-page contact-page"><InstitutionalIntro index="03" title={c.nav[4]} lead={lang === 'tr' ? 'Tanışmak, bir fikir paylaşmak veya iş birliği için bize ulaşın.' : 'Reach us to meet, share an idea or explore a collaboration.'}/><div className="contact-layout"><aside><span>{lang === 'tr' ? 'İLETİŞİM FORMU' : 'CONTACT FORM'}</span><h2>{lang === 'tr' ? 'Bir merhaba, yeni bir çizginin başlangıcı olabilir.' : 'A simple hello can begin a new line.'}</h2><Mark/></aside><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label><span>{lang === 'tr' ? 'İsim' : 'First name'}</span><input name="firstName" autoComplete="given-name" required/></label><label><span>{lang === 'tr' ? 'Soyisim' : 'Last name'}</span><input name="lastName" autoComplete="family-name" required/></label></div><label><span>{lang === 'tr' ? 'E-posta' : 'Email'}</span><input type="email" name="email" autoComplete="email" required/></label><label><span>{lang === 'tr' ? 'Konu' : 'Subject'}</span><select name="subject" defaultValue="" required><option value="" disabled>{lang === 'tr' ? 'Bir konu seçin' : 'Select a subject'}</option><option value="membership">{lang === 'tr' ? 'Katılım ve mensupluk' : 'Participation and membership'}</option><option value="collaboration">{lang === 'tr' ? 'İş birliği' : 'Collaboration'}</option><option value="general">{lang === 'tr' ? 'Genel iletişim' : 'General enquiry'}</option></select></label><label><span>{lang === 'tr' ? 'Mesajınız' : 'Your message'}</span><textarea name="message" rows={6} required/></label><div className="form-action"><button type="submit">{lang === 'tr' ? 'Mesajı gönder' : 'Send message'}<ArrowUpRight/></button></div>{status && <p className="form-status" role="status">{status}</p>}</form></div></section>;
}

function Footer({ c, lang, openPrivacy }: { c: Copy; lang: Language; openPrivacy: ()=>void }) {
  const socials = [{ label: 'Instagram', url: organization.instagram, icon: <InstagramMark/> }, { label: 'X', url: organization.x, icon: <XMark/> }, { label: 'LinkedIn', url: organization.linkedin, icon: <LinkedInMark/> }];
  return <footer className="site-footer"><div className="footer-vision"><a className="brand footer-brand" href={`/${lang}`} aria-label={`${c.name} — ${c.home}`}><BrandLogo/></a><p>2007 <i/> {lang === 'tr' ? '20. YIL' : '20 YEARS'}</p></div><div className="footer-connect"><a className="footer-contact-link" href={`/${lang}/contact`}><small>{lang === 'tr' ? '03 / İLETİŞİM' : '03 / CONTACT'}</small><strong>{lang === 'tr' ? 'Birlikte yeni bir çizgi açalım.' : 'Let’s begin a new line together.'}</strong><span aria-hidden="true"><i/><ArrowUpRight/></span></a><div className="footer-social-compact"><p>{lang === 'tr' ? 'Bizi takip edin' : 'Follow us'}</p><div aria-label={lang === 'tr' ? 'Sosyal medya' : 'Social media'}>{socials.map(item => item.url ? <a className="footer-social-chip" key={item.label} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label}><span>{item.icon}</span><b>{item.label}</b></a> : <span className="footer-social-chip is-disabled" key={item.label} aria-disabled="true"><span>{item.icon}</span><b>{item.label}</b></span>)}</div></div></div><div className="footer-floor"><span>© {new Date().getFullYear()} {c.name}</span><button onClick={openPrivacy}>{c.privacy}</button><a href="#top">{c.backTop}<ArrowUp size={15}/></a></div></footer>;
}
export function YouthSite({ lang, page }: { lang: Language; page?: PageKey }) {
  const c = content[lang];
  const [allowed,setAllowed]=useState(() => { try { return typeof window !== 'undefined' && localStorage.getItem('living-line-social')==='allowed'; } catch { return false; } }); const [privacy,setPrivacy]=useState(false);
  useEffect(()=> { document.documentElement.lang=lang; try { localStorage.setItem('living-line-language', lang); } catch {} },[lang]);
  const toggleConsent=()=>setAllowed(previous=> {const next=!previous; try{localStorage.setItem('living-line-social',next?'allowed':'blocked');}catch{} return next;});
  return <div id="top" className="site-shell"><PageTransition lang={lang}/><Header c={c} lang={lang} page={page}/><main id="main" tabIndex={-1}>{page ? <Detail page={page} lang={lang} c={c}/> : <><Story c={c} lang={lang}/><WhoWeAre lang={lang}/><StatsBar lang={lang}/><ProgramsShowcase lang={lang}/></>}</main><Footer c={c} lang={lang} openPrivacy={()=>setPrivacy(true)}/><Dialog open={privacy} onOpenChange={setPrivacy}><DialogContent className="privacy-dialog" showCloseButton={false}><div className="privacy-heading"><Mark/><Button variant="ghost" size="icon" aria-label={c.close} onClick={()=>setPrivacy(false)}><X/></Button></div><DialogTitle>{c.privacyTitle}</DialogTitle><DialogDescription>{c.privacyText}</DialogDescription><p role="status" className="privacy-status">{allowed ? c.privacyAllowed : c.privacyBlocked}</p><Button className="primary-action" onClick={toggleConsent}>{allowed ? c.socialRevoke : c.socialConsent}</Button></DialogContent></Dialog></div>;
}
