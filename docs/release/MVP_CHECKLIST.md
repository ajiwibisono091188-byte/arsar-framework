# MVP Compliance Checklist - Release 0.1

Daftar parameter kelayakan MVP ARSAR Studio:

---

## 1. CLI Commands Verification

- [x] **`arsar new`**: Berhasil menginisialisasi berkas proyek kosong.
- [x] **`arsar open`**: Sukses memverifikasi format data json config.
- [x] **`arsar generate`**: Sukses memicu content writing dan blueprint composer.
- [x] **`arsar preview`**: Sukses memvalidasi kelayakan index.html visual.
- [x] **`arsar build`**: Sukses mengekspor web statis ke folder `/dist/`.
- [x] **`arsar doctor`**: Sukses mendiagnosis status folder & plugin.

---

## 2. Output Folder Completeness (`/dist/`)

- [x] **`index.html`**: Halaman siap di-render di browser.
- [x] **`robots.txt`**: Aturan Google crawler.
- [x] **`sitemap.xml`**: Indeks halaman situs.
- [x] **`manifest.json`**: PWA metadata dan branding colors.
- [x] **`assets/css/style.css`**: CSS variables HEX warna brand.
- [x] **`assets/js/main.js`**: File Javascript dasar.
