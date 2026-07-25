# Template Renderer - Production Pipeline

Renderer adalah modul penyusun visual statis yang menggabungkan Page Blueprint dan partial layouts.

---

## 1. Mekanisme Kompilasi Partials

Renderer memuat file template mentah di `/templates/` lalu memotong tag komentar komentar berikut untuk disuntikkan:
- `<!-- INCLUDE_HEAD -->`: Menyisipkan metadata, judul, deskripsi, dan canonical CSS stylesheet.
- `<!-- INCLUDE_HEADER -->`: Menyisipkan navigasi bilah atas.
- `<!-- INCLUDE_SECTIONS -->`: Menyisipkan susunan kontainer seksi visual makro yang diinstruksikan oleh Page Blueprint.
- `<!-- INCLUDE_FOOTER -->`: Menyisipkan info hak cipta dan alamat.

---

## 2. Injeksi Variabel

Seluruh variabel ekspresi kurung kurawal ganda `{{variable}}` di dalam partials digantikan secara realtime menggunakan pemetaan context proyek, di antaranya:
- `{{title}}` &rarr; Meta title dari seo.json.
- `{{company_name}}` &rarr; Nama profil perusahaan dari company.json.
- `{{year}}` &rarr; Tahun penulisan saat build dijalankan.
