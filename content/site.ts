export type Language = 'tr' | 'en';
export type PageKey = 'about' | 'program' | 'team' | 'trustees' | 'contact';
export const languages: Language[] = ['tr', 'en'];
export const pageKeys: PageKey[] = ['about', 'program', 'team', 'trustees', 'contact'];
export const organization = {
  name: 'Projem', foundingYear: 2007,
  email: '', address: '', instagram: '', x: '',
};
// Use approved local images (for example /images/archive-2007.webp) and meaningful alt text.
// Empty sources intentionally render the abstract narrative or labelled portrait space.
const emptyImage = () => ({ src: '', alt: { tr: '', en: '' } });
export const media = {
  story: Array.from({ length: 5 }, emptyImage),
  management: Array.from({ length: 3 }, emptyImage),
  trustees: Array.from({ length: 3 }, emptyImage),
};
export const content = {
  tr: {
    name: 'Projem', descriptor: 'BİR GENÇLİK HİKÂYESİ',
    title: '2007’den bugüne, birlikte.', description: '2007’den beri devam eden bir gençlik çalışması. Geçmişten bugüne hikâyemizi ve programımızı keşfedin.',
    nav: ['Biz Kimiz', 'Programımız', 'Yönetim', 'Mütevelli Heyeti', 'İletişim'],
    menu: 'Menüyü aç', close: 'Kapat', home: 'Ana sayfa', skipNav: 'Ana içeriğe geç',
    since: '2007’DEN BERİ', journey: 'BİR FİKİRDEN, BİR GELECEĞE',
    discover: 'Hikâyeyi keşfet', skip: 'Doğrudan içeriğe geç', skipStory: 'Hikâyeyi atla',
    previous: 'Önceki sahne', next: 'Sonraki sahne', today: 'Bugünü keşfet',
    storyLabel: '2007’den bugüne hikâyemiz', sceneLabel: 'Sahne', graphic: '2007’de tek bir noktadan başlayıp bir topluluk ağına dönüşen çizgi.',
    archive: 'YAŞAYAN ARŞİV', visualNote: 'SOYUT ANLATI / ARŞİV GÖRSELLERİ BEKLENİYOR',
    origin: 'İlk adım', future: 'Birlikte, ileriye',
    scenes: [
      { year: '2007', period: 'BAŞLANGIÇ', title: ['Bir çizgiyle', 'başladı.', 'Birlikte sürüyor.'], body: '2007’de başlayan bir gençlik hikâyesi. Birlikte öğrenmek, üretmek ve geleceğe iz bırakmak için.', label: 'Başlangıç', note: 'Her hikâye,\nbir buluşmayla başlar.', stamp: 'İLK ADIM' },
      { year: '01', period: 'İLK BULUŞMALAR', title: ['Yollar kesişti.', 'Bir fikir', 'çoğaldı.'], body: 'Birbirimizi dinlediğimiz yerde yeni yollar açılır. Hikâyenin ilk dönüm noktası burada yerini alacak.', label: 'Buluşma', note: 'Bir araya gelince,\nihtimaller çoğalır.', stamp: 'BULUŞMA', placeholder: '[KİLOMETRE TAŞI 1 · YIL]' },
      { year: '02', period: 'BİRLİKTE ÜRETMEK', title: ['Birlikte', 'öğrendik.', 'Birlikte ürettik.'], body: 'Merak, paylaşıldıkça ortak bir üretime dönüşür. İkinci dönüm noktasının gerçek hikâyesi burada anlatılacak.', label: 'Üretim', note: 'Bir fikir,\nbir başka fikre yol açar.', stamp: 'ORTAK ÜRETİM', placeholder: '[KİLOMETRE TAŞI 2 · YIL]' },
      { year: '03', period: 'BÜYÜYEN TOPLULUK', title: ['Bir bağ kurduk.', 'Birbirimizden', 'güç aldık.'], body: 'Her karşılaşma, hikâyeye yeni bir ses katar. Topluluğun üçüncü dönüm noktası burada yerini alacak.', label: 'Topluluk', note: 'Aynı yolda,\nfarklı hikâyeler.', stamp: 'TOPLULUK', placeholder: '[KİLOMETRE TAŞI 3 · YIL]' },
      { year: 'Bugün', period: 'HİKÂYE DEVAM EDİYOR', title: ['Gelecek,', 'birlikte', 'çizdiğimiz yer.'], body: '2007’den bugüne uzanan bu çizgi hâlâ açık. Yeni fikirler, yeni karşılaşmalar ve birlikte atılacak adımlar için.', label: 'Bugün', note: 'Sıradaki çizgiyi,\nbirlikte çizelim.', stamp: 'DEVAM EDİYOR' },
    ],
    aboutEyebrow: 'BİZ KİMİZ?', aboutTitle: 'Gençlerle.\nGençler için.\nBirlikte.',
    aboutBody: 'Projem, 2007’den beri devam eden bir gençlik çalışmasıdır. Gençlerin öğrenmesine, birlikte üretmesine ve topluluk içinde yer bulmasına odaklanan bir deneyim için çalışır.',
    aboutMore: 'Bizi daha yakından tanı', draft: 'Örnek anlatım · Kurumsal içerikle güncellenecek',
    programEyebrow: 'PROGRAMIMIZ', programTitle: 'Meraktan harekete.', programIntro: 'Birbirini besleyen üç alan. Gençlerin kendi yolunu bulmasına açılan bir program.', programMore: 'Programı keşfet',
    programs: [
      { title: 'Birlikte öğren', text: 'Sorulara yer açan buluşmalar, atölyeler ve paylaşımlar.', detail: 'Gençlerin ilgi alanlarından yola çıkan atölyeler ve karşılıklı öğrenme buluşmaları. Takvim, katılım koşulları ve gerçek program içeriği eklenecek.', tag: 'MERAK & KEŞİF' },
      { title: 'Birlikte üret', text: 'Fikirleri denemeye, geliştirmeye ve hayata geçirmeye alan.', detail: 'Fikir geliştirme ve ortak üretim için bir çalışma alanı. Uygulanan projeler, destek biçimi ve başvuru bilgileri kurum tarafından eklenecek.', tag: 'FİKİR & DENEYİM' },
      { title: 'Bağ kur', text: 'Farklı deneyimleri aynı çizgide buluşturan bir topluluk.', detail: 'Deneyimlerin paylaşıldığı, karşılaşmaların yeni iş birliklerine dönüştüğü buluşmalar. Gerçek etkinlik ve topluluk bilgileri eklenecek.', tag: 'KARŞILAŞMA & TOPLULUK' },
    ],
    impactEyebrow: 'ÇİZGİNİN BIRAKTIĞI İZ', impactTitle: 'Birlikte, yıllar içinde.',
    metrics: [{ value: '2007', label: 'Başladığımız yıl', note: 'Hikâyenin ilk noktası' }, { value: '—', label: 'Ulaşılan genç', note: 'Doğrulanmış veri bekleniyor' }, { value: '—', label: 'Buluşma & atölye', note: 'Doğrulanmış veri bekleniyor' }, { value: '—', label: 'Ortak üretim', note: 'Doğrulanmış veri bekleniyor' }],
    socialEyebrow: 'TOPLULUKTAN NOTLAR', socialTitle: 'Çizginin öteki ucunda.', socialIntro: 'Buluşmalardan, fikirlerden ve birlikte ürettiklerimizden küçük bir seçki.',
    social: [{ platform: 'Instagram', title: 'Bir buluşmadan\ngeriye kalan.', body: 'Etkinlikten seçilecek fotoğraf ve kısa not burada yer alacak.', url: '', embedUrl: '' }, { platform: 'X', title: 'Bir soru,\nyeni bir başlangıç.', body: 'Topluluktan seçilecek paylaşım burada yer alacak.', url: '', embedUrl: '' }, { platform: 'Instagram', title: 'Birlikte üretmenin\nizleri.', body: 'Ortak üretimden seçilecek paylaşım burada yer alacak.', url: '', embedUrl: '' }],
    samplePost: 'ÖRNEK SEÇKİ', postPending: 'Paylaşım eklenecek', viewPost: 'Paylaşımı aç', embedFail: 'İçerik yüklenemedi. Paylaşımı kaynağında açabilirsiniz.', socialConsent: 'Sosyal medya içeriklerine izin ver', socialRevoke: 'Sosyal medya iznini kaldır', socialPrivacy: 'Harici içerikler yalnızca izninizle ve bu alana geldiğinizde yüklenir.',
    contactEyebrow: 'İLETİŞİM', contactTitle: 'Yeni bir çizgi,\nbir merhabayla başlar.', contactText: 'Tanışmak, bir fikir paylaşmak ya da birlikte bir adım atmak için.', contactAction: 'İletişime geç', email: 'E-posta', address: 'Adres', emailPending: 'İletişim e-posta adresi eklenecek.', addressPending: 'Kurumun adres bilgisi eklenecek.',
    footer: '2007’den bugüne, birlikte.', privacy: 'Gizlilik tercihleri', backTop: 'Başa dön',
    teamIntro: 'Bu çizgiye emek verenler.', trusteesIntro: 'Geleceğe birlikte yön verenler.', peopleNote: 'İsimler, görevler, kısa biyografiler ve izinli portreler kurum tarafından eklenecek.', portrait: 'Portre alanı', biography: 'Kişinin deneyimini ve projedeki katkısını anlatan kısa biyografi eklenecek.',
    team: [{ name: '[AD SOYAD]', role: '[YÖNETİM GÖREVİ]' }, { name: '[AD SOYAD]', role: '[YÖNETİM GÖREVİ]' }, { name: '[AD SOYAD]', role: '[YÖNETİM GÖREVİ]' }],
    trustees: [{ name: '[AD SOYAD]', role: '[MÜTEVELLİ GÖREVİ]' }, { name: '[AD SOYAD]', role: '[MÜTEVELLİ GÖREVİ]' }, { name: '[AD SOYAD]', role: '[MÜTEVELLİ GÖREVİ]' }],
    history: 'Hikâyeyi bir bakışta oku', prototype: 'İçerik notu: Bu deneyim bir prototiptir. 2007 başlangıç yılı dışında tarihçe, program ve kişi içerikleri doğrulama bekleyen yer tutuculardır.',
    contactPlaceholder: 'İletişim bilgileri henüz sağlanmadığı için bu prototipte mesaj gönderimi açık değildir.',
    privacyTitle: 'Gizlilik tercihleriniz', privacyText: 'Dil seçiminiz ve sosyal medya izniniz yalnızca bu tarayıcıda saklanır. Analitik veya reklam çerezi kullanılmaz. Sosyal içeriklere izin verdiğinizde Instagram ve X kendi gizlilik politikaları kapsamında veri işleyebilir.', privacyAllowed: 'Harici sosyal içerikler: açık', privacyBlocked: 'Harici sosyal içerikler: kapalı',
  },
  en: {
    name: 'Projem', descriptor: 'A YOUTH STORY',
    title: 'Together, since 2007.', description: 'A youth initiative active since 2007. Discover our story, our community and our programme.',
    nav: ['About Us', 'Our Programme', 'Management', 'Board of Trustees', 'Contact'],
    menu: 'Open menu', close: 'Close', home: 'Home', skipNav: 'Skip to main content',
    since: 'SINCE 2007', journey: 'FROM AN IDEA TO A FUTURE', discover: 'Explore the story', skip: 'Go straight to content', skipStory: 'Skip the story',
    previous: 'Previous scene', next: 'Next scene', today: 'Explore today',
    storyLabel: 'Our story, from 2007 to today', sceneLabel: 'Scene', graphic: 'A line starting at a single point in 2007 and becoming a community network.',
    archive: 'A LIVING ARCHIVE', visualNote: 'ABSTRACT NARRATIVE / ARCHIVE IMAGES TO FOLLOW', origin: 'The first step', future: 'Forward, together',
    scenes: [
      { year: '2007', period: 'THE BEGINNING', title: ['It began', 'with a line.', 'We carry it on.'], body: 'A youth story that began in 2007. Learning, creating and leaving a mark on the future, together.', label: 'Beginning', note: 'Every story begins\nwith a meeting.', stamp: 'FIRST STEP' },
      { year: '01', period: 'FIRST ENCOUNTERS', title: ['Paths crossed.', 'One idea', 'became many.'], body: 'Listening to each other opens new paths. Our first milestone will find its place here.', label: 'Meeting', note: 'When we come together,\npossibilities grow.', stamp: 'ENCOUNTER', placeholder: '[MILESTONE 1 · YEAR]' },
      { year: '02', period: 'CREATING TOGETHER', title: ['We learned.', 'We tried.', 'We made it real.'], body: 'Shared curiosity turns into collective creation. The real story of our second milestone will be told here.', label: 'Creating', note: 'One idea makes room\nfor another.', stamp: 'CO-CREATION', placeholder: '[MILESTONE 2 · YEAR]' },
      { year: '03', period: 'A GROWING COMMUNITY', title: ['We connected.', 'And found', 'strength in it.'], body: 'Every encounter brings another voice to the story. Our third community milestone will find its place here.', label: 'Community', note: 'Different stories.\nA shared path.', stamp: 'COMMUNITY', placeholder: '[MILESTONE 3 · YEAR]' },
      { year: 'Today', period: 'THE STORY CONTINUES', title: ['The future', 'is a line', 'we draw together.'], body: 'The line we started in 2007 is still open. For fresh ideas, new encounters and the steps we will take together.', label: 'Today', note: 'Let’s draw\nthe next line together.', stamp: 'TO BE CONTINUED' },
    ],
    aboutEyebrow: 'WHO ARE WE?', aboutTitle: 'With young people.\nFor young people.\nTogether.', aboutBody: 'Projem is a youth initiative active since 2007. We work towards an experience where young people can learn, create together and find their place in a community.', aboutMore: 'Get to know us', draft: 'Sample copy · To be updated with approved content',
    programEyebrow: 'OUR PROGRAMME', programTitle: 'From curiosity to action.', programIntro: 'Three connected areas. A programme that makes room for young people to find their own path.', programMore: 'Explore the programme',
    programs: [
      { title: 'Learn together', text: 'Encounters, workshops and exchanges that welcome questions.', detail: 'Workshops and shared learning shaped around young people’s interests. Dates, eligibility and approved programme details will be added.', tag: 'CURIOSITY & DISCOVERY' },
      { title: 'Create together', text: 'Space to test ideas, develop them and bring them to life.', detail: 'A space for developing ideas and creating together. Actual projects, available support and application details will be supplied by the organisation.', tag: 'IDEAS & EXPERIENCE' },
      { title: 'Make connections', text: 'A community bringing different experiences onto one shared line.', detail: 'Encounters that turn shared experience into collaboration. Verified event and community information will be added.', tag: 'ENCOUNTERS & COMMUNITY' },
    ],
    impactEyebrow: 'THE MARK WE MAKE', impactTitle: 'Together, through the years.', metrics: [{ value: '2007', label: 'Our founding year', note: 'The first point in our story' }, { value: '—', label: 'Young people reached', note: 'Verified figure to follow' }, { value: '—', label: 'Meetings & workshops', note: 'Verified figure to follow' }, { value: '—', label: 'Collaborative projects', note: 'Verified figure to follow' }],
    socialEyebrow: 'COMMUNITY NOTES', socialTitle: 'At the other end of the line.', socialIntro: 'A small selection of encounters, ideas and things we create together.',
    social: [{ platform: 'Instagram', title: 'What stays\nafter we meet.', body: 'A selected event photograph and a short note will appear here.', url: '', embedUrl: '' }, { platform: 'X', title: 'One question.\nA new beginning.', body: 'A selected community post will appear here.', url: '', embedUrl: '' }, { platform: 'Instagram', title: 'Traces of\ncreating together.', body: 'A selected post about a joint project will appear here.', url: '', embedUrl: '' }],
    samplePost: 'SAMPLE SELECTION', postPending: 'Post to follow', viewPost: 'Open post', embedFail: 'Content could not be loaded. You can open the original post.', socialConsent: 'Allow social media content', socialRevoke: 'Revoke social media permission', socialPrivacy: 'External content loads only with your permission and when this area is visible.',
    contactEyebrow: 'CONTACT', contactTitle: 'A new line starts\nwith a hello.', contactText: 'To meet, share an idea or take the next step together.', contactAction: 'Get in touch', email: 'Email', address: 'Address', emailPending: 'Contact email address to follow.', addressPending: 'Organisation address to follow.', footer: 'Together, since 2007.', privacy: 'Privacy preferences', backTop: 'Back to top',
    teamIntro: 'The people behind the line.', trusteesIntro: 'Shaping the future together.', peopleNote: 'Names, roles, short biographies and approved portraits will be supplied by the organisation.', portrait: 'Portrait placeholder', biography: 'A short biography describing this person’s experience and contribution will be added.',
    team: [{ name: '[FULL NAME]', role: '[MANAGEMENT ROLE]' }, { name: '[FULL NAME]', role: '[MANAGEMENT ROLE]' }, { name: '[FULL NAME]', role: '[MANAGEMENT ROLE]' }],
    trustees: [{ name: '[FULL NAME]', role: '[TRUSTEE ROLE]' }, { name: '[FULL NAME]', role: '[TRUSTEE ROLE]' }, { name: '[FULL NAME]', role: '[TRUSTEE ROLE]' }],
    history: 'Read the story at a glance', prototype: 'Content note: This is a prototype. Apart from the 2007 founding year, the history, programme and people content is placeholder copy awaiting verification.', contactPlaceholder: 'Contact details have not yet been provided, so messaging is not available in this prototype.',
    privacyTitle: 'Your privacy preferences', privacyText: 'Your language and social media preferences are stored only in this browser. No analytics or advertising cookies are used. When you allow social media content, Instagram and X may process data under their own privacy policies.', privacyAllowed: 'External social content: on', privacyBlocked: 'External social content: off',
  },
};
export type Copy = (typeof content)[Language];
