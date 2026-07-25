# Google Ads Generator Spec - ARSAR Studio

Google Ads Generator mempermudah pembuatan aset promosi berkinerja tinggi berbasis profil penawaran proyek secara otomatis.

---

## 1. Arsitektur Komponen

### GoogleAdsGenerator (`src/google-ads/engine/google-ads-generator.js`)
Lapisan utama yang mengoordinasikan pembuatan headlines, descriptions, keywords, extensions, and exports.

### HeadlineGenerator (`src/google-ads/headlines/headline-generator.js`)
Menyusun 30 headline dinamis (max 30 karakter) bertema USP, CTA, dan Lokasi.

### DescriptionGenerator (`src/google-ads/descriptions/description-generator.js`)
Menyusun 15 deskripsi persuasif (max 90 karakter) dengan ajakan bertindak (CTA).

### KeywordPlanner (`src/google-ads/keywords/keyword-planner.js`)
Penyedia kata kunci bertarget (Brand, Generic, Commercial, Local) dan usulan negative keywords.

### ExtensionsGenerator (`src/google-ads/extensions/extensions-generator.js`)
Penyedia sitelinks, callouts, dan snippets format Google Ads.

### AdsValidator (`src/google-ads/validator/ads-validator.js`)
Pengaudit duplikasi aset dan batasan karakter Google.

### Exporter (`src/google-ads/export/exporter.js`)
Mengekspor kampanye menjadi file JSON dan CSV.

---

## 2. Struktur Data Masukan (Input)

Generator menerima objek parameter:
- **company**: Nama perusahaan (e.g. `YogaDAI`).
- **offer**: Penawaran utama (e.g. `Gadai BPKB`).
- **usp**: Keunggulan (e.g. `Bunga Rendah`).
- **location**: Target wilayah (e.g. `Surabaya`).
