# Yaşayan Çizgi — gençlik çalışması prototipi

2007’den bugüne uzanan beş sahneli, Türkçe/İngilizce React ve TypeScript web deneyimi. Vinext/Next.js App Router yapısı korunmuştur. Ağır animasyon veya CMS bağımlılığı eklenmemiştir.

## Çalıştırma

- `npm ci` — bağımlılıkları kurar.
- `npm run dev` — yerel geliştirme önizlemesi.
- `npm run build` — Cloudflare Workers uyumlu üretim çıktısı.
- `npx tsc --noEmit` — TypeScript doğrulaması.

## Sayfalar

`/` ilk ziyarette kayıtlı manuel dil seçimini, bu yoksa tarayıcı dilini kullanır. Türkçe dışındaki diller için İngilizce varsayılır. IP tespiti yapılmaz. Açık `/tr` veya `/en` bağlantıları değiştirilmez.

Her iki dilde ana sayfa ve `/about`, `/program`, `/team`, `/trustees`, `/contact` sayfaları bulunur. Dil anahtarı eşdeğer sayfada kalır. Bilinmeyen dil/sayfa yolları 404 verir.

## İçerik değişiklikleri

Bütün kurumsal içerikler `content/site.ts` içindedir:

- `content.tr` ve `content.en`: iki dilde metinler, tarihçe, program, kişi kayıtları, etki alanları ve seçilmiş sosyal paylaşımlar.
- `organization`: iletişim bilgileri ve kurum bağlantıları.
- `media.story`: beş sahneye ait görsel yolları ve iki dilde alt metinler.
- `media.management` / `media.trustees`: kişi portreleri ve iki dilde alt metinler.

Görsel yolları boşken soyut çizgi anlatısı ve açıkça etiketlenmiş portre alanları görünür. Onaylı görselleri `public/images/` klasörüne ekleyip `/images/dosya.webp` şeklinde bağlayın. İlk sahne görseline öncelik verilir, portreler tembel yüklenir. Gerçek logo geldiğinde `Mark` bileşeni ve `public/favicon.svg` değiştirilmelidir. Program sayısının üç ve tarihçe sahne sayısının beş olması bu deneyimin tasarım sözleşmesidir.

### Tamamlanacak içerikler

1. Türkçe ve İngilizce proje adı, resmi logo, slogan ve onaylı kurum tanımı.
2. Üç gerçek kilometre taşı: yıl, kısa başlık, en fazla iki cümle ve onaylı arşiv malzemesi.
3. Beş sahnenin gerçek arşiv fotoğrafları/görselleri ve kullanım izinleri; soyut çizgi tasarımı alternatif olarak korunabilir.
4. Programın doğrulanmış üç bileşeni, katılım koşulları, tarihler ve gerçek program metni.
5. Yönetim ve mütevelli isimleri, görevleri, çok kısa biyografileri ve izinli portreleri.
6. Ulaşılan genç, buluşma/atölye ve ortak üretim sayıları, ölçüm dönemi ve dayanakları. Sayı uydurulmadı; bu alanlarda tire bulunur.
7. Instagram ve X hesapları ile seçilmiş üç paylaşımın metni, görseli ve bağlantısı.
8. Kurumsal e-posta adresi ve fiziksel adres. Adres sağlanınca gerçek `mailto:` bağlantısı açılır; prototipte mesaj gönderimi yoktur.
9. Kurumun yayıma uygun gizlilik açıklaması ve gerekiyorsa harici servis izin kapsamı.

## Hikâye davranışı

- Masaüstünde beş dönem tek bir sabit sahnede anlatılır. Tekerlek ve trackpad doğal sayfa kaydırmasını kullanır; kaydırma miktarı yolun çizilmesini, rota işaretini, yakınlaşmayı ve metinlerin geçişini sürekli olarak belirler.
- Sağ/sol okları ve ekrandaki adım düğmeleri isteğe bağlı dönem kısayollarıdır. Yukarı/aşağı hareketi tarayıcının doğal kaydırmasına bırakılır. Son sahneden ileri gitmek normal içeriğe taşır; Escape hikâyeyi atlar.
- Her an kullanılabilen “Hikâyeyi atla” ve “Doğrudan içeriğe geç” düğmeleri odağı içerik bölümüne taşır.
- Mobilde dikey swipe doğrudan yolculuk ilerlemesine bağlanır ve açık adım düğmeleri korunur. Gövde kaydırması hiçbir noktada kilitlenmez.
- `prefers-reduced-motion: reduce` bütün geçişleri kaldırır. Metinler animasyondan bağımsızdır. Hikâyenin tamamı ayrıca Biz Kimiz sayfasında doğrusal olarak okunur.
- Diyaloglar açıkken hikâye klavye kısayolları durur. Mobil menü ve gizlilik penceresi Radix odak yönetimini kullanır.

## Gizlilik ve sosyal paylaşımlar

Yalnızca `living-line-language` ve `living-line-social` tarayıcı tercihleri saklanır. Depolama engellendiğinde sayfa çalışmaya devam eder. Analitik ve reklam kodu eklenmedi.

Sosyal paylaşımlar varsayılan olarak markalı yedek kartlardır. `url` gerçek paylaşım bağlantısı, `embedUrl` isteğe bağlı gömme adresidir. Desteklenen gömme biçimleri Instagram `/p/ID/embed/` ve X `platform.twitter.com/embed/Tweet.html?id=ID` adresleridir. Gömme yalnızca açık izin ve görünürlük sonrası yüklenir; kaynak alan adları doğrulanır, 8 saniyelik yüklenememe durumunda yedek kart ve kaynak bağlantısı korunur. İzin kaldırıldığında iframe kaldırılır. Gerçek paylaşım adresleri sağlanmadığı için canlı üçüncü taraf gömmesi yayın öncesinde ayrıca test edilmelidir.

## Tasarım

Açık kâğıt zemin, koyu yeşil, kontrollü sıcak turuncu çizgi; büyük sans-serif başlıklar ve editoryal serif vurgular. Yerel sistem fontları, SVG çizgi diyagramları ve CSS geçişleri kullanılır. Harici font, stok fotoğraf, otomatik video veya arka planda sosyal ağ isteği yoktur.
