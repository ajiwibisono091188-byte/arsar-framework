# Navbar Component

Komponen navigasi header yang responsif, dilengkapi menu drawer untuk tampilan mobile, dropdown bersarang (nested menu), dan toggle switch tema gelap/terang.

## Fitur & State
- **Sticky Blur**: Menggunakan filter `backdrop-blur` dan mengubah bayangan saat di-scroll ke bawah (terintegrasi dengan `src/assets/js/navigation.js`).
- **Alpine.js State**: Menggunakan data-model `mobileMenu` untuk kontrol toggle menu mobile secara reaktif.
- **Theme Toggle**: Switch class `.dark` pada level HTML tag dengan sinkronisasi local storage.

## Props/Variabel Nunjucks
- `navigation.header`: Array berisikan menu utama dan submenu (dropdown).
