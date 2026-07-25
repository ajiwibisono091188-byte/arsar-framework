# Generator Directory

Direktori ini berisi skrip-skrip otomatisasi generator halaman statis berbasis Node.js yang bertugas:
1. Membaca data JSON dan file markdown.
2. Memproses data tersebut dengan menyuntikkannya ke layout dan komponen Nunjucks.
3. Menghasilkan file-file HTML statis yang diletakkan di dalam folder `src/pages/` atau root `src/` agar diproses oleh bundler Vite.

## Skrip Generator
- `landing-generator.js`: Memproses halaman pendaratan (landing pages) untuk target kota (Local SEO).
- `blog-generator.js`: Mengolah berkas markdown di `src/content/` menjadi artikel individual dan meng-update index blog.
- `seo-generator.js`: Menghasilkan sitemap.xml dan berkas optimasi pencarian lainnya.
- `schema-generator.js`: Membuat file JSON-LD schema per halaman secara dinamis.
- `ads-generator.js`: Mengoptimasi dynamic parameters untuk landing page yang diakses lewat tautan iklan (ads).
- `image-generator.js`: Mockup generator untuk pemrosesan/kompresi gambar.
