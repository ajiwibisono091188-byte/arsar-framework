# ARSAR AI MARKETING OS v2.0 - Foundation Framework

ARSAR AI Marketing OS v2.0 adalah enterprise-grade static website framework berbasis AI yang dioptimalkan khusus untuk pemasaran digital berkinerja tinggi. Framework ini menghasilkan output berupa HTML statis super cepat dengan target skor audit Lighthouse yang maksimal (Performance >=98, SEO 100, Accessibility >=95, Best Practice 100).

Framework ini dirancang agar dapat digunakan kembali (reusable) untuk berbagai relung proyek pemasaran seperti *Arsar Digital*, *YogaDAI*, Dealer Mobil, Properti, Asuransi, Klinik, dan niche bisnis lainnya.

## Tech Stack
- **Runtime**: Node.js LTS
- **Build System**: Vite & PostCSS
- **Styling**: TailwindCSS v4
- **Client Scripting**: Alpine.js (reactive state engine)
- **Templating**: Nunjucks (.njk)
- **Content Engine**: Markdown (.md) + gray-matter + markdown-it
- **Standards**: ES Modules, ESLint, Prettier

---

## Struktur Folder Proyek
```text
arsar-framework/
├── README.md               # Dokumentasi utama proyek
├── package.json            # Konfigurasi package, scripts, & dependencies
├── vite.config.js          # Konfigurasi bundler Vite (ESM)
├── tailwind.config.js      # Placeholder kompatibilitas Tailwind CSS v4
├── postcss.config.js       # Konfigurasi modul PostCSS
├── eslint.config.js        # Konfigurasi ESLint Flat Config modern
├── .prettierrc             # Aturan kode formatting Prettier
├── .editorconfig           # Aturan editor pengkodean global
├── .gitignore              # Daftar file yang dikecualikan dari Git
├── .env.example            # Template berkas environment variables
└── src/
    ├── components/         # Komponen UI modular & reusable Nunjucks (.njk)
    ├── layouts/            # Master layout halaman (default, landing, blog, dll)
    ├── templates/          # Fragmen Nunjucks tambahan / partials
    ├── pages/              # Halaman HTML statis hasil kompilasi generator
    ├── content/            # File artikel/sumber halaman dalam format Markdown
    ├── config/             # Data konfigurasi JSON (tema, sosial, seo, tracking)
    ├── data/               # Dataset JSON (faq, testimoni, layanan, kota)
    ├── schema/             # Cetak biru Schema.org JSON-LD (LocalBusiness, Org, dll)
    ├── generator/          # Skrip Node.js static site generator
    ├── scripts/            # Skrip pembantu khusus (deployment/CI)
    ├── assets/             # Aset web (css, js, images, fonts, icons, videos)
    ├── public/             # File statis yang langsung disalin ke folder dist
    └── dist/               # Hasil build kompilasi akhir (HTML/CSS/JS statis)
```

---

## Cara Instalasi & Penggunaan

### 1. Prasyarat (Prerequisites)
Pastikan Node.js (LTS version) telah terpasang di sistem Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal Anda untuk memasang seluruh dependensi framework:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Development Mode)
Menjalankan generator lokal untuk merender berkas HTML pertama kali, kemudian memulai Vite dev server lokal pada port `3000` dengan fitur Hot Module Replacement (HMR):
```bash
npm run dev
```

### 4. Melakukan Build Produksi (Production Build)
Menjalankan kompilasi static site generator, meminifikasi stylesheet, dan mem-bundle JavaScript menggunakan Vite ke dalam folder `src/dist/`:
```bash
npm run build
```

### 5. Memeriksa Hasil Build (Preview Mode)
Menjalankan local server untuk melihat performa static site hasil build produksi sebelum diunggah ke hosting:
```bash
npm run preview
```

### 6. Linting & Formatting
Memeriksa dan merapikan style pengkodean:
```bash
# Linting kode JS
npm run lint

# Auto-format berkas js, css, json, njk, md, html
npm run format
```

---

## Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Hak cipta &copy; 2026 PT Arsar Digital Indonesia.
