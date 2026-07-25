# Changelog - ARSAR AI Marketing OS v2.0

Semua perubahan penting pada proyek **ARSAR AI Marketing OS v2.0** akan didokumentasikan di dalam berkas ini. Format changelog ini merujuk pada standar [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) dan mengikuti aturan penomoran [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-07-25 (Project Governance)
### Added
- Membuat folder `/docs/` berisi 12 dokumen spesifikasi arsitektur, standar coding, spesifikasi komponen, sitemap SEO, roadmap, versi, dan panduan kontribusi.
- Menambahkan folder `.github/ISSUE_TEMPLATE/` berisi 4 template otomasi isu: Bug Report, Feature Request, Documentation, dan Refactor.
- Menambahkan berkas `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md` untuk standardisasi checklist merge.
- Memperbarui [README.md](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/README.md) utama di root proyek menjadi panduan developer professional.

---

## [0.3.0] - 2026-07-25 (Config Engine)
### Added
- Membuat folder core engine di bawah `/src/core/` (config, loaders, helpers, validators).
- Menambahkan 14 berkas konfigurasi default JSON (`site.json`, `company.json`, dll).
- Menambah sistem cached loader `config-loader.js` yang menggabungkan (*merge*) default config dengan project-specific overrides.
- Membuat folder contoh override untuk proyek **YogaDAI** dan **Arsar Digital**.
- Menambahkan validator parameter [config-validator.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/validators/config-validator.js) untuk mengecek format email, URL, dan nomor telepon.
- Membuat GUI Config Playground di `/config-playground` untuk inspeksi visual realtime.

---

## [0.2.0] - 2026-07-25 (Design System)
### Added
- Membuat folder `/src/design/tokens/` berisi 11 berkas token JSON visual (warna, typography, spacing, radius, dll).
- Menambahkan skrip `theme-loader.js` untuk mengompilasi token menjadi CSS Custom Properties di `design-tokens.css`.
- Membuat 9 komponen dasar makro Nunjucks yang ARIA-ready (Button, Card, Input, Badge, Modal, Alert, Typography, Loading, IconWrapper).
- Membuat halaman pratinjau interaktif `/playground` (Storybook-like interface).

---

## [0.1.0] - 2026-07-25 (Foundation)
### Added
- Struktur proyek awal dan inisialisasi folder `/src/`.
- Setup bundler Vite, konfigurasi TailwindCSS v4, PostCSS, ESLint flat config, Prettier, dan EditorConfig.
- Membuat layout dasar Nunjucks (`default.njk`, `landing.njk`, `blog.njk`, dll) dan placeholder aset js/css.
