# StickyCTA Component

Bar CTA melayang (sticky bar) di bagian bawah layar yang khusus aktif di tampilan mobile setelah pengunjung melakukan scroll melewati batas threshold tertentu (>400px).

## Fitur & State
- **Scroll Listeners**: Terintegrasi reaktif menggunakan event listener window scroll pada inisialisasi Alpine.js (`x-init`).
- **Responsive Visibility**: Secara default disembunyikan di layar desktop menggunakan helper `md:hidden` untuk mencegah polusi visual.
