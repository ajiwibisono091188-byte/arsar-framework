# Calculator Component

Komponen kalkulator simulasi angsuran pembiayaan produk atau layanan (sangat berguna untuk niche properti, sales mobil, maupun pembiayaan jasa enterprise).

## Cara Kerja & Integrasi
- **Alpine.js Bindings**: Terikat dengan data-model `loanCalculator` (di `src/assets/js/calculator.js`).
- **Reactive Updates**: Mengubah slider `Harga`, `DP %`, `Tenor`, dan `Bunga` akan menghitung ulang jumlah uang muka, pokok pinjaman, dan cicilan bulanan secara instan tanpa re-render halaman.
- **Intl Formatter**: Menggunakan API browser `Intl.NumberFormat` untuk merender rupiah yang rapi.
