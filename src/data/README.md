# Data Directory

Direktori ini digunakan untuk menyimpan dataset dinamis dalam format JSON. Data dari direktori ini akan diekstrak oleh generator halaman (`landing-generator.js`, `blog-generator.js`, dll.) untuk merender data berulang ke dalam template HTML statis.

## Isi Berkas Data
- `cities.json`: Daftar kota target untuk pembuatan halaman SEO lokal secara otomatis.
- `services.json`: Berisi daftar layanan utama beserta deskripsi dan fitur unggulan.
- `faq.json`: Daftar FAQ default yang siap dipetakan ke komponen FAQ dan JSON-LD Schema.
- `vehicles.json`: Contoh dataset produk spesifik (mobil) untuk kebutuhan template Dealer/Sales.
- `testimonials.json`: Review dan feedback dari pelanggan untuk ditampilkan pada komponen testimonial.
