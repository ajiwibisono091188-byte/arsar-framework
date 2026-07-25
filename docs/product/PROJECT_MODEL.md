# Project Model - ARSAR Studio

Dokumen ini mendefinisikan silsilah struktur hierarki data penyimpanan proyek pemasaran di dalam **ARSAR Studio**.

---

## Hierarki Model Data Proyek (Data Model Tree)

```text
[Project Root] (arsar.project.json)
    ├── [Company Profile] (company.json)
    │     ├── Name & Legal Name
    │     ├── Contacts (Phone, WA, Email)
    │     └── Address Details
    ├── [Visual Theme] (theme.json)
    │     ├── Colors (Primary & Secondary Hex)
    │     ├── Border Radius & Spacings
    │     └── Font Families
    ├── [Landing Pages] (landing.json)
    │     ├── Marketing Block Toggles
    │     ├── Dynamic Hero Settings
    │     └── Call-to-Action Mappings
    ├── [SEO Configuration] (seo.json)
    │     ├── Metadata Fallbacks
    │     ├── Sitemaps Targets
    │     └── Schema JSON-LD Bindings
    ├── [Ads Campaign Mappings] (ads.json)
    │     ├── Active UTM Parameters
    │     └── Dynamic Keywords
    └── [Deployment Targets] (deployment.json)
          ├── CDN Hosting Provider (e.g. Cloudflare Pages)
          └── Build Clean URLs Routing Rules
```

---

## Parameter Hubungan Antar Model

### 1. Project Root
- Bertindak sebagai jangkar identitas unik proyek. Memuat informasi versi framework, kecocokan skema data (`schemaVersion`), dan timestamp waktu modifikasi terakhir.

### 2. Company Profile & Local Target
- Menjadi landasan utama untuk data terstruktur SEO Local Business. Jika proyek memiliki target wilayah perkotaan dinamis (`cities.json`), data Company Profile akan dikombinasikan dengan data koordinat lintang/bujur kota untuk menyusun peta kaya Rich Snippets.

### 3. Visual Theme & UI Components
- Parameter visual dari `theme.json` dioper ke dalam Theme Loader, mendaftarkan CSS Custom Properties, yang secara instan merombak warna tombol, radius kartu, dan jenis teks seluruh komponen UI makro Nunjucks.

### 4. Ads Tracking & Analytics
- Mengontrol penyuntikan tag analytics GA4/Pixel Iklan secara terpusat tanpa menyentuh kode template HTML.
