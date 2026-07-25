# ARSAR AI Marketing OS v2.0

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success?logo=lighthouse)](docs/SEO_SPEC.md)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-indigo)](docs/VERSIONING.md)

ARSAR AI Marketing OS v2.0 adalah **enterprise-grade static web framework** berbasis AI yang dioptimalkan khusus untuk kampanye pemasaran digital berkinerja tinggi. Framework ini menghasilkan output berupa HTML statis super cepat untuk meloloskan audit Core Web Vitals dengan skor Lighthouse maksimal.

Framework ini sepenuhnya reusable untuk berbagai macam kebutuhan proyek bisnis seperti agensi *Arsar Digital*, aplikasi *YogaDAI*, portal *BPKB Solusi*, Dealer Mobil, Properti, Asuransi, Klinik, dan sejenisnya.

---

## ⚡ Fitur Utama (Key Features)

- **Zero Hardcoding**: Warna, spacing, border-radius, dan bayangan diatur melalui [Design Tokens](docs/ARCHITECTURE.md#design-layer) JSON yang otomatis dikompilasi menjadi CSS variables untuk TailwindCSS v4.
- **Config Engine**: Satu-satunya gerbang pembacaan setelan ([Config Loader](docs/CONFIG_SPEC.md)) yang mendukung multi-project overrides dan environment variables (Dev/Prod/Preview).
- **Static Page Generator**: Pipa saluran otomatis berbasis Node.js yang merender template Nunjucks dan file tulisan Markdown (.md) menjadi file HTML siap pakai.
- **Interactive Playgrounds**: Dilengkapi dua GUI inspeksi lokal:
  - [Playground Component](/playground): Pratinjau 9 komponen UI reaktif (ala Storybook).
  - [Config Playground](/config-playground): Panel pelacak JSON konfigurasi gabungan secara realtime.
- **Skema SEO Otomatis**: Injeksi meta tags dinamis (OpenGraph/Twitter Cards) dan otomatisasi Schema.org (Organization, LocalBusiness, FAQPage) bawaan.
- **Aksesibilitas (A11y)**: Seluruh komponen dasar ARIA-ready, lolos fokus keyboard ring, dan ramah pembaca layar.

---

## 🏛️ Arsitektur Sistem (System Architecture)

Framework ini disusun menggunakan prinsip **Clean Architecture**:

```text
src/
├── core/                   # Core Layer: Caching Loader & Validators (Logical Core)
├── design/                 # Design Layer: Token JSON, Loader, & Component Macros (UI Core)
├── generator/              # Generator Layer: Static Page Compilers (.js)
├── assets/                 # Asset Layer: Tailwind v4 stylesheet & Vanilla ES Modules
└── dist/                   # Output Layer: Kode produksi HTML/CSS/JS statis siap pakai
```
*Rincian diagram alur data selengkapnya dapat dibaca di [Architecture Guide](docs/ARCHITECTURE.md).*

---

## 🚀 Memulai Cepat (Quick Start)

### 1. Prasyarat (Prerequisites)
Pastikan Node.js (LTS version) telah terpasang di sistem operasi Anda.

### 2. Pasang Dependensi
Jalankan terminal dan jalankan pemasangan paket dependensi:
```bash
npm install
```

### 3. Jalankan Mode Pengembangan
Menjalankan generator awal dan memulai server pengembang lokal (Vite):
```bash
npm run dev
```
Akses server lokal Anda di:
- **Homepage**: `http://localhost:3000`
- **Component Storybook**: `http://localhost:3000/playground`
- **Config Inspector**: `http://localhost:3000/config-playground`

### 4. Build untuk Produksi
Guna meminifikasi stylesheet dan mengekspor seluruh kode statis HTML untuk dideploy:
```bash
npm run build
```

---

## 🛠️ Alur Kerja Pengembangan (Development Workflow)

Proyek ini menggunakan **Conventional Commits** dan model pencabangan Git terstandardisasi:
1. Buat branch baru dari `develop` dengan format `feature/nama-fitur` atau `bugfix/deskripsi-bug`.
2. Tulis kode baru dan jalankan `npm run lint` & `npm run format` untuk merapikan gaya tulisan.
3. Kirim Pull Request (PR) ke branch `develop` dengan mengisi checklist kepatuhan pada [PR Template](.github/PULL_REQUEST_TEMPLATE/pull_request_template.md).

*Panduan lengkap kontribusi dapat dibaca di [Contributing Guide](docs/CONTRIBUTING.md).*

---

## 🗺️ Peta Jalan Proyek (Roadmap)
- **Sprint 2B.0 (Project Governance)** - *Current Release (`v0.4.0`)*
- **Sprint 3 (Content Engine)** - Markdown processing & RSS Feed
- **Sprint 4 (SEO Engine)** - Sitemap & Google Search XML Automation
- **Sprint 11 (Release v1.0)** - Audit Core Web Vitals & Launch
*Lihat peta jalan rinci di [Product Roadmap](docs/ROADMAP.md).*

---

## 📝 Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Hak Cipta &copy; 2026 PT Arsar Digital Indonesia.
