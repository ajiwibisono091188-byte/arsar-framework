# JavaScript Directory

Direktori ini berisi modul JavaScript modern (ES Modules) untuk menangani interaktivitas sisi klien (client-side) menggunakan Alpine.js, visualisasi animasi, tracking, dan kalkulasi.

## Struktur Berkas JS
- `app.js`: Entrypoint utama aplikasi. Mengimpor Alpine.js, mendaftarkan komponen state reactive, dan menginisialisasi fitur global.
- `theme.js`: Pengendalian preferensi tema gelap (dark mode) dan terang (light mode) berbasis LocalStorage dan deteksi sistem operasi.
- `navigation.js`: Logika interaktivitas menu navigasi mobile dan scroll-behavior.
- `faq.js`: State manager untuk accordion FAQ.
- `tracking.js`: Script loader analytics (Google Analytics, Facebook Pixel) dan modul event tracker custom.
- `animation.js`: Modul scroll-animations berbasis Intersection Observer dan logic dynamic glow card.
- `calculator.js`: Logika simulasi pembiayaan/kalkulator marketing (kredit/angsuran bulanan).
- `whatsapp.js`: Generator dynamic WhatsApp redirect URL yang secara otomatis memetakan UTM parameter, url, dan judul halaman saat ini.
- `utils.js`: Helper functions (debounce, formatting Rupiah, dll).
