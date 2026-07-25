# ARSAR Config Engine - Schema Documentation

Direktori ini berisi berkas konfigurasi default (`src/core/config/*.json`) yang digunakan oleh **Config Engine**. Engine ini mendukung penggabungan bertingkat (*multi-project overrides*) dan setelan spesifik lingkungan (Dev/Prod/Preview) tanpa hardcoding.

---

## 1. site.json
- **Purpose**: Konfigurasi global situs web (URL base, locale default, asset version).
- **Schema**:
  - `title`: `String` - Judul situs.
  - `url`: `String` - Base URL web.
  - `language`: `String` - Kode bahasa situs.
  - `country`: `String` - Kode negara situs.
  - `version`: `String` - Versi framework.
  - `assetVersion`: `String` - Query versioning css/js asset.
  - `logo`: `String` - Path file logo situs.
- **Example**:
  ```json
  {
    "title": "YogaDAI Portal",
    "url": "https://yogadai.com",
    "language": "id",
    "country": "ID",
    "version": "2.0.0",
    "assetVersion": "1.0.1",
    "logo": "/assets/images/logo.png"
  }
  ```

---

## 2. company.json
- **Purpose**: Menyimpan informasi badan hukum, kontak utama, dan alamat resmi perusahaan (diperlukan untuk schema generator & footer).
- **Schema**:
  - `name`: `String` - Nama dagang perusahaan.
  - `legalName`: `String` - Nama legal berbadan hukum.
  - `tagline`: `String` - Slogan utama.
  - `email`: `String` - Alamat email resmi.
  - `phone`: `String` - Nomor telepon resmi.
  - `whatsapp`: `String` - Nomor WhatsApp dinamis.
  - `address`: `Object` - Detail alamat.
- **Example**:
  ```json
  {
    "name": "YogaDAI",
    "legalName": "PT YogaDAI Sejahtera Indonesia",
    "tagline": "Asisten Meditasi AI",
    "email": "hello@yogadai.com",
    "phone": "+628111222333",
    "whatsapp": "+628111222333",
    "address": {
      "streetAddress": "Jl. Kuta No. 10",
      "addressLocality": "Badung",
      "addressRegion": "Bali",
      "postalCode": "80361",
      "addressCountry": "ID"
    }
  }
  ```

---

## 3. theme.json
- **Purpose**: Konfigurasi global preferensi tema visual dan branding default.
- **Schema**:
  - `name`: `String` - Nama tema.
  - `primaryColor`: `String` - Kode warna HEX utama.
  - `secondaryColor`: `String` - Kode warna HEX sekunder.
  - `darkMode`: `Boolean` - Mode malam default.
  - `borderRadius`: `String` - Variabel default radius.
  - `fontFamily`: `String` - Font family yang diaktifkan.
- **Example**:
  ```json
  {
    "name": "YogaDAI Blossom Theme",
    "primaryColor": "#ec4899",
    "secondaryColor": "#f43f5e",
    "darkMode": true,
    "borderRadius": "md",
    "fontFamily": "sans"
  }
  ```

---

## 4. navigation.json
- **Purpose**: Mendefinisikan struktur navigasi menu header, footer, dan tautan legal secara modular.
- **Schema**:
  - `header`: `Array<Object>` - Menu navigasi utama.
  - `footer`: `Array<Object>` - Menu tautan kaki halaman.
- **Example**:
  ```json
  {
    "header": [
      { "label": "Home", "path": "/" },
      { "label": "Fitur", "path": "/fitur" }
    ],
    "footer": [
      { "label": "Kontak", "path": "/kontak" }
    ]
  }
  ```

---

## 5. tracking.json
- **Purpose**: Mengatur status aktif dan ID pelacakan iklan / statistik (Google Analytics, GTM, FB Pixel).
- **Schema**:
  - `googleAnalytics`: `Object` - Toggles GA4.
  - `facebookPixel`: `Object` - Toggles FB Pixel.
  - `googleTagManager`: `Object` - Toggles GTM.
- **Example**:
  ```json
  {
    "googleAnalytics": {
      "enabled": true,
      "measurementId": "G-LOKAL9999"
    },
    "facebookPixel": {
      "enabled": false,
      "pixelId": ""
    }
  }
  ```

---

## 6. seo.json
- **Purpose**: Pengaturan fallback meta tag SEO dan perayapan robot perayap Google.
- **Schema**:
  - `defaultTitle`: `String` - Fallback judul halaman.
  - `titleTemplate`: `String` - Pola judul halaman.
  - `defaultDescription`: `String` - Fallback meta deskripsi.
  - `robots`: `String` - Aturan robot index.
  - `charset`: `String` - Tipe charset web.
- **Example**:
  ```json
  {
    "defaultTitle": "YogaDAI - AI Wellness",
    "titleTemplate": "%s | YogaDAI",
    "defaultDescription": "Aplikasi pendamping yoga AI di Indonesia.",
    "robots": "index, follow",
    "charset": "UTF-8"
  }
  ```

---

## 7. ads.json
- **Purpose**: Pemetaan parameter pelacakan iklan untuk dynamic landing pages.
- **Schema**:
  - `adCampaigns`: `Array` - Kampanye iklan aktif.
  - `utmTrackingEnabled`: `Boolean` - Mengaktifkan parameter UTM.
  - `dynamicParameters`: `Object` - Mapping parameter query.
- **Example**:
  ```json
  {
    "adCampaigns": ["brand", "promo_ramadan"],
    "utmTrackingEnabled": true,
    "dynamicParameters": {
      "keyword": "kw",
      "device": "dev"
    }
  }
  ```

---

## 8. blog.json
- **Purpose**: Konfigurasi batasan modul artikel dan kategori blog.
- **Schema**:
  - `postsPerPage`: `Number` - Batas artikel per halaman list.
  - `rssEnabled`: `Boolean` - Aktifkan feed RSS.
  - `authorDefault`: `String` - Nama penulis default.
  - `categories`: `Array<String>` - Daftar kategori resmi blog.
- **Example**:
  ```json
  {
    "postsPerPage": 6,
    "rssEnabled": true,
    "authorDefault": "YogaDAI Editor",
    "categories": ["Yoga", "Meditation", "Wellness", "AI Tech"]
  }
  ```

---

## 9. landing.json
- **Purpose**: Konfigurasi toggle blok/seksi marketing yang ditampilkan di landing page.
- **Schema**:
  - `featuresBlockEnabled`: `Boolean`
  - `testimonialsBlockEnabled`: `Boolean`
  - `faqBlockEnabled`: `Boolean`
  - `ctaBlockEnabled`: `Boolean`
  - `calculatorBlockEnabled`: `Boolean`
- **Example**:
  ```json
  {
    "featuresBlockEnabled": true,
    "testimonialsBlockEnabled": true,
    "faqBlockEnabled": true,
    "ctaBlockEnabled": true,
    "calculatorBlockEnabled": true
  }
  ```

---

## 10. forms.json
- **Purpose**: Konfigurasi endpoint action formulir kontak dan pengirim data.
- **Schema**:
  - `contactForm`: `Object` - Rincian formulir kontak.
- **Example**:
  ```json
  {
    "contactForm": {
      "submitEndpoint": "https://api.yogadai.com/submit",
      "method": "POST",
      "fields": ["name", "email", "message"]
    }
  }
  ```

---

## 11. crm.json
- **Purpose**: Integrasi lead capture langsung ke sistem CRM (Hubspot, Salesforce, dll).
- **Schema**:
  - `integrationEnabled`: `Boolean` - Mengaktifkan webhook CRM.
  - `crmName`: `String` - Nama penyedia CRM.
  - `webhookUrl`: `String` - URL webhook CRM.
- **Example**:
  ```json
  {
    "integrationEnabled": true,
    "crmName": "HubSpot",
    "webhookUrl": "https://hooks.hubspot.com/v1/lead",
    "leadSource": "yogadai_landing"
  }
  ```

---

## 12. deployment.json
- **Purpose**: Setelan folder output target dan provider CDN hosting.
- **Schema**:
  - `provider`: `String` - Penyedia hosting CDN.
  - `buildDir`: `String` - Folder target hasil kompilasi.
  - `cleanUrls`: `Boolean` - Menghapus ekstensi `.html` di URL.
- **Example**:
  ```json
  {
    "provider": "Cloudflare Pages",
    "buildDir": "dist",
    "cleanUrls": true,
    "cacheControlMaxAge": 31536000
  }
  ```

---

## 13. social.json
- **Purpose**: Tautan url profil akun sosial media resmi untuk sinkronisasi ikon & schema.
- **Schema**:
  - `facebook`: `String`
  - `instagram`: `String`
  - `twitter`: `String`
  - `linkedin`: `String`
  - `youtube`: `String`
- **Example**:
  ```json
  {
    "facebook": "https://facebook.com/yogadai",
    "instagram": "https://instagram.com/yogadai",
    "twitter": "https://twitter.com/yogadai",
    "linkedin": "https://linkedin.com/company/yogadai",
    "youtube": "https://youtube.com/@yogadai"
  }
  ```

---

## 14. contact.json
- **Purpose**: Informasi nomor support, email keluhan, dan jam kerja kantor.
- **Schema**:
  - `officePhone`: `String`
  - `supportEmail`: `String`
  - `whatsappNumber`: `String`
  - `businessHours`: `String`
- **Example**:
  ```json
  {
    "officePhone": "+628111222333",
    "supportEmail": "support@yogadai.com",
    "whatsappNumber": "+628111222333",
    "businessHours": "Senin - Jumat, 09:00 - 18:00 WITA"
  }
  ```
