'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ArrowLeft, ArrowUp, Menu, X, MoveDown } from 'lucide-react';
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

const journeyPath = 'M 28 420 C 96 420 72 278 132 272 C 207 264 151 478 266 443 C 365 413 275 198 367 157 C 432 128 435 261 479 222 C 525 181 478 65 558 64';

function LivingLine({ step, progress, c, lang }: { step: number; progress: number; c: Copy; lang: Language }) {
  const scene = c.scenes[step];
  const asset = media.story[step];
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
  return <div className={`living-art art-step-${step}`} style={{ '--journey-progress': progress } as CSSProperties} role="img" aria-label={asset.src ? asset.alt[lang] : `${c.graphic} ${scene.period}`}>
    {asset.src && <img className="archive-photo" src={asset.src} alt="" width={600} height={560} fetchPriority={step === 0 ? "high" : "auto"} />}
    <div className="art-years" aria-hidden="true">{c.scenes.map((item, i) => { const opacity = Math.max(0, 1 - Math.abs(rawStep - i) * 1.7); return <span key={i} className={`art-year ${i === 4 ? 'art-year-today' : ''}`} style={{ opacity, filter: `blur(${(1-opacity) * 3}px)`, transform: `translate3d(${(i - rawStep) * 22}px, ${(i - rawStep) * 12}px, 0) scale(${1 + progress * .06})` }}>{item.year}</span> })}</div>
    <svg className="line-diagram" viewBox="0 0 600 510" fill="none" aria-hidden="true">
      <path d="M28 410H565M132 35V468M367 35V468" className="construction-line" />
      <path d={journeyPath} className="route-base" />
      <path ref={pathRef} d={journeyPath} pathLength="1" className="living-path" style={{ strokeDashoffset: 1 - progress }} />
      <g className="network-lines" style={{ opacity: Math.max(0, (progress - .18) * 1.5) }}><path d="M132 272L367 157M266 443L479 222M132 272L266 443L367 157L479 222M266 443L558 64M28 420L367 157L558 64" /></g>
      {[[28,420],[132,272],[266,443],[367,157],[479,222],[558,64]].map(([x,y],i)=><g key={i} className="route-node" style={{ opacity: Math.max(.16, Math.min(1, progress * 5 - i * .72)) }}><circle cx={x} cy={y} r="10" fill="var(--art-bg)"/><circle cx={x} cy={y} r="5" fill="var(--orange)"/></g>)}
      <g ref={vehicleRef} className="journey-vehicle"><circle r="14"/><path d="M-5-6 7 0-5 6Z" /></g>
      <path d="M235 243C269 243 236 185 270 185S288 260 321 255 317 180 358 180" className="final-mark" style={{ opacity: Math.max(0, (progress - .82) * 5.5) }} />
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
      <div className="story-bottom"><div className="scroll-hint"><MoveDown size={22}/><span>{c.scrollHint}</span></div><nav className="story-progress" aria-label={c.storyLabel}>{c.scenes.map((s,i)=><button key={i} aria-label={`${c.sceneLabel} ${i+1}: ${s.label}`} aria-current={step === i ? 'step' : undefined} onClick={()=>scrollToStep(i)}><span className="step-line"><span style={{ transform: `scaleX(${Math.max(0, Math.min(1, rawStep - i))})` }} /></span><span className="step-year">{i === 0 ? '2007' : i === 4 ? s.year : `0${i}`}</span></button>)}</nav><div className="step-controls"><Button variant="ghost" className="round-button" size="icon" disabled={step === 0} onClick={()=>scrollToStep(step-1)} aria-label={c.previous}><ArrowLeft /></Button><Button variant="ghost" className="round-button" size="icon" disabled={step === 4} onClick={()=>scrollToStep(step+1)} aria-label={c.next}><ArrowRight /></Button></div></div>
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
