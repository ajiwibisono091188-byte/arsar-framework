# Layouts Directory

Direktori ini berisi layout dasar (Nunjucks templates) yang menentukan struktur HTML global untuk halaman-halaman yang dihasilkan oleh generator.

## Jenis-Jenis Layout
- `default.njk`: Master layout dasar. Menyediakan hook `<head>`, import stylesheet `main.css`, loading JS `app.js`, JSON-LD schema injection, dan script tracking.
- `landing.njk`: Layout yang dioptimalkan untuk performa konversi landing page pemasaran. Menggunakan header sederhana dan footer penuh.
- `blog.njk`: Layout index untuk menampilkan daftar postingan atau modul artikel.
- `service.njk`: Layout khusus untuk halaman detail penawaran jasa/layanan.
- `article.njk`: Layout detail postingan tunggal blog (single post) dengan elemen markup semantik schema `NewsArticle` terstruktur.
