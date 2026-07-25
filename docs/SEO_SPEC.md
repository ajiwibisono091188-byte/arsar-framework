# ARSAR AI Marketing OS v2.0 - SEO Specification

Dokumen ini mendefinisikan pedoman optimasi mesin pencari (SEO) yang diimplementasikan secara built-in di dalam framework untuk memastikan skor audit **Lighthouse SEO selalu mencapai 100**.

---

## 1. Spesifikasi Meta Tag Global

Setiap halaman HTML statis wajib menyematkan meta tag berikut di dalam tag `<head>`:

### A. Meta Title
- **Panjang Optimal**: 50–60 karakter.
- **Pola/Template**: `[Judul Halaman] | [Nama Brand/Company]` (diatur otomatis via `seo.json`).
- **A11y**: Wajib memiliki tag `<title>` tunggal yang unik di setiap halaman.

### B. Meta Description
- **Panjang Optimal**: 120–150 karakter.
- **Pola**: Deskripsi ringkas halaman yang mengandung kata kunci utama. Dilarang duplikat di antar halaman.

### C. Canonical Link
- **Format**: `<link rel="canonical" href="https://domain.com/path-halaman">`
- **Tujuan**: Mencegah duplikasi konten, terutama pada halaman SEO target kota (Local SEO) yang memiliki struktur teks mirip.

### D. Robots
- **Format**: `<meta name="robots" content="index, follow">`
- **Tujuan**: Memberi tahu robot perayap Google untuk mengindeks halaman saat ini dan mengikuti seluruh tautan di dalamnya.

---

## 2. Sosial Media Integration (Open Graph & Twitter Card)

Untuk memastikan tautan tampil elegan saat dibagikan di WhatsApp, Telegram, Facebook, dan Twitter:

### Open Graph (Facebook/LinkedIn/WA)
```html
<meta property="og:title" content="Judul Halaman">
<meta property="og:description" content="Deskripsi singkat untuk media sosial">
<meta property="og:type" content="website">
<meta property="og:url" content="https://domain.com/halaman-ini">
<meta property="og:image" content="https://domain.com/assets/images/og-share.jpg">
<meta property="og:site_name" content="Nama Brand">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username_brand">
<meta name="twitter:creator" content="@username_brand">
```

---

## 3. Peta Situs (Sitemap) & Robots.txt
- **Sitemap.xml**: Dihasilkan secara otomatis oleh `seo-generator.js`. Berisi seluruh daftar url halaman aktif lengkap dengan tag `<lastmod>` dan `<priority>` pembantu.
- **Robots.txt**: Mengarahkan crawler secara eksplisit ke url sitemap yang valid (contoh: `Sitemap: https://domain.com/sitemap.xml`).

---

## 4. Skema Data Terstruktur (Structured Data - JSON-LD)

Framework menyuntikkan Schema.org format JSON-LD secara otomatis untuk memicu kemunculan *Rich Snippets* di Google Search:

### A. Organization Schema
Mendaftarkan badan hukum perusahaan, logo resmi, dan url akun sosial media.
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PT Arsar Digital Indonesia",
  "url": "https://arsardigital.com",
  "logo": "https://arsardigital.com/logo.png"
}
```

### B. Local Business Schema
Dihasilkan otomatis per halaman kota (`cities.json`) untuk mendominasi pencarian lokal.
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Arsar Digital Surabaya",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Surabaya",
    "addressCountry": "ID"
  }
}
```

### C. FAQPage Schema
Membantu hasil pencarian Google memunculkan accordion drop-down Q&A secara interaktif di halaman pencarian.
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pertanyaan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jawaban."
      }
    }
  ]
}
```
