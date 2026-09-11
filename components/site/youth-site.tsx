'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { content, organization, media, pageKeys, type Language, type PageKey, type Copy } from '@/content/site';

function Mark({ className = '' }: { className?: string }) {
  return <svg className={`mark ${className}`} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 33C14 33 6 13 17 13S21 35 30 34 29 11 43 11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></svg>;
}
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }
function Header({ lang, page, c }: { lang: Language; page?: PageKey; c: Copy }) {
  const [menu, setMenu] = useState(false);
  function remember(language: Language) { try { localStorage.setItem('living-line-language', language); } catch {} }
  return <>
    <a className="skip-link" href="#main">{c.skipNav}</a>
    <header className="site-header">
      <Link href={`/${lang}`} className="brand" aria-label={`${c.name} — ${c.home}`}><Mark /><span>{c.name}<small>{c.descriptor}</small></span></Link>
      <nav className="desktop-nav" aria-label={lang === 'tr' ? 'Ana menü' : 'Main navigation'}>
        {pageKeys.map((key, i) => <Link key={key} href={`/${lang}/${key}`} aria-current={page === key ? 'page' : undefined}>{c.nav[i]}</Link>)}
      </nav>
      <div className="header-end"><nav className="language-switch" aria-label="Dil / Language">{(['tr', 'en'] as Language[]).map(language => <Link key={language} href={`/${language}${page ? `/${page}` : ''}`} onClick={() => remember(language)} hrefLang={language} lang={language} aria-current={lang === language ? 'true' : undefined}>{language.toUpperCase()}</Link>)}</nav>
        <Sheet open={menu} onOpenChange={setMenu}><SheetTrigger asChild><Button className="menu-toggle" variant="ghost" size="icon" aria-label={c.menu}><Menu /></Button></SheetTrigger><SheetContent className="mobile-sheet" showCloseButton={false}><div className="sheet-top"><Mark /><SheetClose asChild><Button variant="ghost" size="icon" aria-label={c.close}><X /></Button></SheetClose></div><SheetTitle>{c.name}</SheetTitle><SheetDescription>{c.footer}</SheetDescription><nav className="mobile-nav">{pageKeys.map((key, i) => <Link key={key} href={`/${lang}/${key}`} onClick={() => setMenu(false)} aria-current={page === key ? 'page' : undefined}><span>0{i+1}</span>{c.nav[i]}<ArrowUpRight /></Link>)}</nav></SheetContent></Sheet>
      </div>
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
    const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
    const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
    const top = section.getBoundingClientRect().top + window.scrollY - header;
    window.scrollTo({ top: top + travel * (target / 4), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = journey.current;
      const sticky = frame.current;
      if (!section || !sticky) return;
      const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - sticky.offsetHeight);
      const nextProgress = Math.max(0, Math.min(1, (header - rect.top) / travel));
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
      const active = rect.top <= (document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0) + 2 && rect.bottom > window.innerHeight;
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

function Program({ c, expanded = false, lang }: { c: Copy; expanded?: boolean; lang: Language }) {
  const Heading = expanded ? 'h1' : 'h2';
  return <section className={`program-section section-pad ${expanded ? 'expanded-program' : ''}`} aria-labelledby="program-title"><div className="section-heading"><div><Eyebrow>{c.programEyebrow}</Eyebrow><Heading id="program-title">{c.programTitle}</Heading></div>{!expanded && <Link className="text-link" href={`/${lang}/program`}>{c.programMore}<ArrowUpRight size={18}/></Link>}</div>{expanded && <p className="section-intro">{c.programIntro}</p>}<div className="program-grid">{c.programs.map((p,i)=><article className="program-item" key={p.title}><div className="program-meta"><span>0{i+1}</span><span>{p.tag}</span></div><div className={`program-diagram diagram-${i}`} aria-hidden="true"><svg viewBox="0 0 300 100" fill="none">{i===0 ? <><path d="M30 70H270M65 70C80 10 135 10 150 70C165 10 220 10 235 70"/><circle cx="150" cy="70" r="6"/></> : i===1 ? <><path d="M35 50H265M100 15V85M150 15V85M200 15V85"/><circle cx="150" cy="50" r="13"/></> : <><path d="M70 70L150 20L230 70H70L150 20M150 20V80"/><circle cx="70" cy="70" r="6"/><circle cx="150" cy="20" r="6"/><circle cx="230" cy="70" r="6"/></>}</svg></div><h3>{p.title}</h3><p>{expanded ? p.detail : p.text}</p></article>)}</div><p className="draft-note">{c.draft}</p></section>;
}

function Detail({ page, c, lang }: { page: PageKey; c: Copy; lang: Language }) {
  const people = page === 'team' ? c.team : c.trustees;
  const portraits = page === 'team' ? media.management : media.trustees;
  return <div className={`detail-page detail-${page}`}>
    <div className="breadcrumb"><Link href={`/${lang}`}>{c.home}</Link><span>/</span><span>{c.nav[pageKeys.indexOf(page)]}</span></div>
    {page==='program' ? <Program c={c} lang={lang} expanded /> : <>
      <section className="detail-intro section-pad"><Eyebrow>{c.nav[pageKeys.indexOf(page)]}</Eyebrow><h1>{page==='about' ? c.aboutTitle : page==='team' ? c.teamIntro : page==='trustees' ? c.trusteesIntro : c.contactTitle}</h1><p>{page==='about' ? c.aboutBody : page==='contact' ? c.contactText : c.peopleNote}</p></section>
      {page==='about' && <section className="history-section section-pad"><Eyebrow>{c.history}</Eyebrow><div className="history-list">{c.scenes.map((s,i)=><article key={s.period}><span>{i===0 || i===4 ? s.year : `0${i}`}{'placeholder' in s && <small>{s.placeholder}</small>}</span><div><h2>{s.title.join(' ')}</h2><p>{s.body}</p></div></article>)}</div><p className="draft-note">{c.prototype}</p></section>}
      {(page==='team' || page==='trustees') && <section className="people-grid section-pad">{people.map((person,i)=><article key={i}><div className="portrait-placeholder" role="img" aria-label={`${c.portrait} ${i+1}: ${person.name}`}><span>{String(i+1).padStart(2,'0')}</span>{portraits[i]?.src ? <img src={portraits[i].src} alt={portraits[i].alt[lang]} width={400} height={500} loading="lazy" /> : <><Mark /><p>{c.portrait}</p></>}</div><h2>{person.name}</h2><span className="person-role">{person.role}</span><p>{c.biography}</p></article>)}</section>}
      {page==='contact' && <section className="contact-details section-pad"><div><Eyebrow>{c.email}</Eyebrow>{organization.email ? <a className="contact-email" href={`mailto:${organization.email}`}>{organization.email}</a> : <p>{c.emailPending}</p>}</div><div><Eyebrow>{c.address}</Eyebrow><p>{organization.address || c.addressPending}</p></div><p className="draft-note">{c.contactPlaceholder}</p></section>}
    </>}
  </div>;
}
function Footer({ c, lang, page, openPrivacy }: { c: Copy; lang: Language; page?: PageKey; openPrivacy: ()=>void }) {
  return <footer>{page!=='contact' && <div className="contact-strip section-pad"><div><Eyebrow>{c.contactEyebrow}</Eyebrow><h2>{c.contactTitle}</h2></div><Link className="contact-button" href={`/${lang}/contact`}><ArrowUpRight size={34}/><span>{c.contactAction}</span></Link></div>}<div className="footer-main"><Link className="brand" href={`/${lang}`}><Mark/><span>{c.name}<small>{c.footer}</small></span></Link><span className="footer-year">2007 <span>————</span> {new Date().getFullYear()}</span><a href="#top" className="text-link">{c.backTop}<ArrowUp size={16}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {c.name}</span><button onClick={openPrivacy}>{c.privacy}</button><span>{c.descriptor}</span></div></footer>;
}
export function YouthSite({ lang, page }: { lang: Language; page?: PageKey }) {
  const c = content[lang];
  const [allowed,setAllowed]=useState(() => { try { return typeof window !== 'undefined' && localStorage.getItem('living-line-social')==='allowed'; } catch { return false; } }); const [privacy,setPrivacy]=useState(false);
  useEffect(()=> { document.documentElement.lang=lang; },[lang]);
  const toggleConsent=()=>setAllowed(previous=> {const next=!previous; try{localStorage.setItem('living-line-social',next?'allowed':'blocked');}catch{} return next;});
  return <div id="top" className="site-shell"><Header c={c} lang={lang} page={page}/><main id="main" tabIndex={-1}>{page ? <Detail page={page} lang={lang} c={c}/> : <Story c={c} lang={lang}/>}</main>{page && <Footer c={c} lang={lang} page={page} openPrivacy={()=>setPrivacy(true)}/>}<Dialog open={privacy} onOpenChange={setPrivacy}><DialogContent className="privacy-dialog" showCloseButton={false}><div className="privacy-heading"><Mark/><Button variant="ghost" size="icon" aria-label={c.close} onClick={()=>setPrivacy(false)}><X/></Button></div><DialogTitle>{c.privacyTitle}</DialogTitle><DialogDescription>{c.privacyText}</DialogDescription><p role="status" className="privacy-status">{allowed ? c.privacyAllowed : c.privacyBlocked}</p><Button className="primary-action" onClick={toggleConsent}>{allowed ? c.socialRevoke : c.socialConsent}</Button></DialogContent></Dialog></div>;
}
