# Layout System - Experience Composer

Layout System mengabstraksikan struktur visual tata letak halaman yang didukung oleh **ARSAR Studio**.

---

## 1. Jenis Layout yang Didukung

- **single-column**: Pemuatan linier memanjang kebawah. Terbaik untuk halaman artikel blog sederhana.
- **split**: Pembagian dua bagian (biasanya 50% kiri teks, 50% kanan gambar/form). Sangat dianjurkan untuk konversi Hero header dan CTA.
- **card-grid**: Grid kartu multi-kolom responsif (2, 3, atau 4 kolom). Terbaik untuk memamerkan manfaat (benefits) atau daftar harga (pricing tiers).
- **alternating**: Selang-seling baris (baris 1: kiri teks kanan gambar, baris 2: kiri gambar kanan teks). Terbaik untuk seksi penjelasan fitur detail.
- **minimal**: Meminimalisir hiasan gambar/layout berlebih untuk kecepatan akses mobile ekstrim.

---

## 2. Hubungan dengan Tailwind v4

Tipe layout yang tertulis di dalam Page Blueprint akan digunakan oleh Generator Renderer untuk memicu kelas grid flexbox Tailwind CSS v4 kustom (seperti `grid grid-cols-1 md:grid-cols-2 gap-8`) pada elemen kontainer seksi.
