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
  function remember(language: Language) { try { localStorage.setItem('living-line-language', language); } catch {} }
  const menuNotes = lang === 'tr'
    ? ['Hikâyemiz ve yaklaşımımız', 'Ekip ve gönüllüler', 'Birlikte çalışalım']
    : ['Our story and approach', 'Team and volunteers', 'Work with us'];
  return <>
    <a className="skip-link" href="#main">{c.skipNav}</a>
    <header className="site-header route-header">
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
              <div className="index-vision" aria-hidden="true"><span>20.</span><i>→</i><span>25.</span></div>
              <h2 id="index-vision-title">{lang === 'tr' ? '20. yıldan 25. yıl vizyonuna.' : 'From year 20 to our 25th-year vision.'}</h2>
              <p>{lang === 'tr' ? 'Gönüllülükten doğan, deneyimiyle büyüyen ve geleceğe kurumsal bir yapı ile hazırlanan bir gençlik projesi.' : 'A volunteer-led youth project growing through experience and preparing for the future with a stronger institutional structure.'}</p>
            </section>
            <nav className="index-navigation" aria-label={lang === 'tr' ? 'Ana menü' : 'Main navigation'}><a className="index-row" href={`/${lang}`} aria-current={!page ? 'page' : undefined} style={{ '--index-delay': '0ms' } as CSSProperties}><span className="index-number">00</span><span className="index-label"><strong>{c.home}</strong><small>{lang === 'tr' ? 'Hikâyenin başlangıcı' : 'The beginning of the story'}</small></span><ArrowUpRight aria-hidden="true"/></a>{menuPageKeys.map((key, i) => { const copyIndex = pageKeys.indexOf(key); return <a key={key} className="index-row" href={`/${lang}/${key}`} aria-current={page === key ? 'page' : undefined} style={{ '--index-delay': `${(i + 1) * 55}ms` } as CSSProperties}><span className="index-number">0{i+1}</span><span className="index-label"><strong>{c.nav[copyIndex]}</strong><small>{menuNotes[i]}</small></span><ArrowUpRight aria-hidden="true"/></a> })}</nav>
          </div>
          <div className="index-footer"><span>{lang === 'tr' ? '2007 — 25. YIL VİZYONU' : '2007 — 25TH-YEAR VISION'}</span><nav className="route-language" aria-label="Dil / Language">{(['tr', 'en'] as Language[]).map(language => <a key={language} href={`/${language}${page ? `/${page}` : ''}`} onPointerDown={() => remember(language)} hrefLang={language} lang={language} aria-current={lang === language ? 'page' : undefined}>{language.toUpperCase()}</a>)}</nav></div>
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
    { title: 'Dersler', detail: 'Yıl boyunca düzenli öğrenme ve paylaşım buluşmaları.' },
    { title: 'Kamplar', detail: 'Birlikte yaşama, üretme ve dayanışma deneyimi.' },
    { title: 'Hitabet', detail: 'Düşünceyi açık, güçlü ve sorumlu biçimde ifade etme çalışmaları.' },
    { title: 'Türkiye Gezisi', detail: 'Farklı şehirleri, kültürleri ve hikâyeleri yerinde tanıma yolculuğu.' },
  ],
  en: [
    { title: 'Classes', detail: 'Regular learning and exchange sessions throughout the year.' },
    { title: 'Camps', detail: 'An experience of living, creating and sharing together.' },
    { title: 'Public Speaking', detail: 'Learning to express ideas with clarity, confidence and responsibility.' },
    { title: 'Türkiye Journey', detail: 'Discovering different cities, cultures and stories first-hand.' },
  ],
};

function StatsBar({ lang }: { lang: Language }) {
  return <section className="stats-bar" aria-labelledby="stats-title"><div className="stats-heading"><span>01</span><h2 id="stats-title">{lang === 'tr' ? 'Sayılarla Projem' : 'Projem in numbers'}</h2></div><dl><div><dt>{lang === 'tr' ? 'Güncel mezun' : 'Current alumni'}</dt><dd>110</dd></div><div><dt>{lang === 'tr' ? 'Güncel mensup' : 'Current members'}</dt><dd>40</dd></div></dl></section>;
}

function ProgramsShowcase({ lang }: { lang: Language }) {
  const cards = programCards[lang];
  const cardGroup = (hidden = false) => <div className="program-film-group" aria-hidden={hidden || undefined}>{cards.map((program, i) => <article className="program-card" key={`${hidden ? 'duplicate-' : ''}${program.title}`}><div className={`program-card-image program-image-${i}`} role="img" aria-label={program.title}/><div className="program-card-copy"><div className="program-card-meta"><span>{String(i + 1).padStart(2, '0')}</span><span>{lang === 'tr' ? 'YILLIK PROGRAM' : 'ANNUAL PROGRAMME'}</span></div><h3>{program.title}</h3><p>{program.detail}</p></div></article>)}</div>;
  return <section className="programs-showcase" aria-labelledby="programs-title"><header className="programs-heading"><div><span>02 / 04</span><h2 id="programs-title">{lang === 'tr' ? 'Programlarımız' : 'Our programmes'}</h2></div><p>{lang === 'tr' ? 'Yıl boyunca, birlikte.' : 'Together, throughout the year.'}</p></header><div className="program-film" aria-label={lang === 'tr' ? 'Programlar' : 'Programmes'}><div className="program-film-track">{cardGroup()}{cardGroup(true)}</div></div></section>;
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
    'Projem, 2007’den bu yana gençlerin birlikte öğrenebildiği, sorumluluk alabildiği ve kalıcı bağlar kurabildiği gönüllülük esaslı bir gençlik çalışmasıdır.',
    'Derslerden kamplara, hitabet çalışmalarından Türkiye gezilerine uzanan programlarımız; gençlerin düşünme, ifade etme ve birlikte hareket etme becerilerini destekleyen uzun soluklu bir deneyim oluşturur.',
    'Bugün geçmişten gelen birikimimizi korurken 25. yıl vizyonumuz doğrultusunda daha güçlü bir kurumsal hafıza, sürdürülebilir bir gönüllülük yapısı ve kuşaklar arası bir topluluk inşa ediyoruz.',
  ] : [
    'Since 2007, Projem has been a volunteer-led youth initiative where young people can learn together, take responsibility and build lasting relationships.',
    'From classes and camps to public-speaking sessions and journeys across Türkiye, our programmes create a long-term experience that supports thought, expression and collective action.',
    'Today, while protecting the experience built over the years, we are working toward our 25th-year vision: a stronger institutional memory, sustainable volunteering and an intergenerational community.',
  ];
  return <section className="institutional-page about-page"><InstitutionalIntro index="01" title={c.nav[0]} lead={lang === 'tr' ? 'Birlikte öğrenen, üreten ve sorumluluk alan bir gençlik topluluğu.' : 'A youth community that learns, creates and takes responsibility together.'}/><div className="about-editorial"><div className="about-statement"><span>{lang === 'tr' ? '2007’DEN BUGÜNE' : 'SINCE 2007'}</span><strong>{lang === 'tr' ? 'Bir programdan fazlası; kuşaklar arasında devam eden bir bağ.' : 'More than a programme; a connection carried across generations.'}</strong></div><div className="about-copy">{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="about-principles"><article><span>01</span><h2>{lang === 'tr' ? 'Gönüllülük' : 'Volunteering'}</h2></article><article><span>02</span><h2>{lang === 'tr' ? 'Birlikte öğrenme' : 'Learning together'}</h2></article><article><span>03</span><h2>{lang === 'tr' ? 'Süreklilik' : 'Continuity'}</h2></article></div></section>;
}

function ManagementPage({ c, lang }: { c: Copy; lang: Language }) {
  const departments = lang === 'tr' ? ['Program ve Eğitim', 'Organizasyon ve Kamplar', 'İletişim ve Kurumsal İlişkiler', 'Mezun ve Mensup İlişkileri'] : ['Programme and Education', 'Organisation and Camps', 'Communications and Institutional Relations', 'Alumni and Member Relations'];
  const orbitItems = [lang === 'tr' ? 'Genel Koordinasyon' : 'General Coordination', lang === 'tr' ? 'Yürütme Kurulu' : 'Executive Board', ...departments];
  return <section className="institutional-page management-page"><InstitutionalIntro index="02" title={c.nav[2]} lead={lang === 'tr' ? 'Sorumluluğu paylaşan, programları birlikte yürüten bir yönetim yapısı.' : 'A management structure that shares responsibility and runs programmes together.'}/><div className="org-orbit" aria-label={lang === 'tr' ? 'Dairesel yönetim organizasyon şeması' : 'Circular management organisation chart'}><svg viewBox="0 0 1000 760" fill="none" aria-hidden="true"><ellipse cx="500" cy="380" rx="335" ry="305"/><path d="M500 380V75M500 380 830 225M500 380 800 610M500 380V690M500 380 200 610M500 380 170 225"/></svg><article className="org-circle org-center"><span>01</span><p>{lang === 'tr' ? 'Proje Başkanı' : 'Project Chair'}</p><strong>[{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}]</strong><Mark/></article>{orbitItems.map((item, i) => <article className={`org-circle org-satellite org-position-${i}`} key={item}><span>{String(i + 2).padStart(2, '0')}</span><p>{item}</p><strong>[{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}]</strong></article>)}</div></section>;
}

function ContactPage({ c, lang }: { c: Copy; lang: Language }) {
  const [status, setStatus] = useState('');
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setStatus(lang === 'tr' ? 'Form tasarımı hazır. Gönderim kanalı tanımlandığında bu alan aktifleşecek.' : 'The form is ready. Submission will be enabled when a delivery channel is configured.'); }
  return <section className="institutional-page contact-page"><InstitutionalIntro index="03" title={c.nav[4]} lead={lang === 'tr' ? 'Tanışmak, bir fikir paylaşmak veya iş birliği için bize ulaşın.' : 'Reach us to meet, share an idea or explore a collaboration.'}/><div className="contact-layout"><aside><span>{lang === 'tr' ? 'İLETİŞİM FORMU' : 'CONTACT FORM'}</span><h2>{lang === 'tr' ? 'Bir merhaba, yeni bir çizginin başlangıcı olabilir.' : 'A simple hello can begin a new line.'}</h2><Mark/></aside><form className="contact-form" onSubmit={handleSubmit}><div className="form-row"><label><span>{lang === 'tr' ? 'İsim' : 'First name'}</span><input name="firstName" autoComplete="given-name" required/></label><label><span>{lang === 'tr' ? 'Soyisim' : 'Last name'}</span><input name="lastName" autoComplete="family-name" required/></label></div><label><span>{lang === 'tr' ? 'E-posta' : 'Email'}</span><input type="email" name="email" autoComplete="email" required/></label><label><span>{lang === 'tr' ? 'Konu' : 'Subject'}</span><select name="subject" defaultValue="" required><option value="" disabled>{lang === 'tr' ? 'Bir konu seçin' : 'Select a subject'}</option><option value="membership">{lang === 'tr' ? 'Katılım ve mensupluk' : 'Participation and membership'}</option><option value="collaboration">{lang === 'tr' ? 'İş birliği' : 'Collaboration'}</option><option value="general">{lang === 'tr' ? 'Genel iletişim' : 'General enquiry'}</option></select></label><label><span>{lang === 'tr' ? 'Mesajınız' : 'Your message'}</span><textarea name="message" rows={6} required/></label><div className="form-action"><button type="submit">{lang === 'tr' ? 'Mesajı gönder' : 'Send message'}<ArrowUpRight/></button><p>{lang === 'tr' ? 'Gönderim altyapısı sonraki aşamada bağlanacaktır.' : 'The delivery channel will be connected in the next phase.'}</p></div>{status && <p className="form-status" role="status">{status}</p>}</form></div></section>;
}

function Footer({ c, lang, openPrivacy }: { c: Copy; lang: Language; openPrivacy: ()=>void }) {
  const socials = [{ label: 'Instagram', url: organization.instagram, icon: <InstagramMark/> }, { label: 'X', url: organization.x, icon: <XMark/> }, { label: 'LinkedIn', url: organization.linkedin, icon: <LinkedInMark/> }];
  return <footer className="site-footer"><div className="footer-vision"><a className="brand footer-brand" href={`/${lang}`} aria-label={`${c.name} — ${c.home}`}><BrandLogo/></a><p>2007 <i/> {lang === 'tr' ? '25. YIL VİZYONU' : '25TH-YEAR VISION'}</p></div><div className="footer-socials" aria-label={lang === 'tr' ? 'Sosyal medya' : 'Social media'}>{socials.map(item => item.url ? <a key={item.label} href={item.url} target="_blank" rel="noreferrer"><span>{item.icon}</span>{item.label}<ArrowUpRight/></a> : <span className="social-placeholder" key={item.label} aria-disabled="true"><span>{item.icon}</span>{item.label}</span>)}</div><div className="footer-floor"><span>© {new Date().getFullYear()} {c.name}</span><button onClick={openPrivacy}>{c.privacy}</button><a href="#top">{c.backTop}<ArrowUp size={15}/></a></div></footer>;
}
export function YouthSite({ lang, page }: { lang: Language; page?: PageKey }) {
  const c = content[lang];
  const [allowed,setAllowed]=useState(() => { try { return typeof window !== 'undefined' && localStorage.getItem('living-line-social')==='allowed'; } catch { return false; } }); const [privacy,setPrivacy]=useState(false);
  useEffect(()=> { document.documentElement.lang=lang; try { localStorage.setItem('living-line-language', lang); } catch {} },[lang]);
  const toggleConsent=()=>setAllowed(previous=> {const next=!previous; try{localStorage.setItem('living-line-social',next?'allowed':'blocked');}catch{} return next;});
  return <div id="top" className="site-shell"><Header c={c} lang={lang} page={page}/><main id="main" tabIndex={-1}>{page ? <Detail page={page} lang={lang} c={c}/> : <><Story c={c} lang={lang}/><StatsBar lang={lang}/><ProgramsShowcase lang={lang}/></>}</main><Footer c={c} lang={lang} openPrivacy={()=>setPrivacy(true)}/><Dialog open={privacy} onOpenChange={setPrivacy}><DialogContent className="privacy-dialog" showCloseButton={false}><div className="privacy-heading"><Mark/><Button variant="ghost" size="icon" aria-label={c.close} onClick={()=>setPrivacy(false)}><X/></Button></div><DialogTitle>{c.privacyTitle}</DialogTitle><DialogDescription>{c.privacyText}</DialogDescription><p role="status" className="privacy-status">{allowed ? c.privacyAllowed : c.privacyBlocked}</p><Button className="primary-action" onClick={toggleConsent}>{allowed ? c.socialRevoke : c.socialConsent}</Button></DialogContent></Dialog></div>;
}
