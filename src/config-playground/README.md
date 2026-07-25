# Config Playground Directory

Direktori ini berisi halaman pratinjau interaktif untuk menginspeksi nilai konfigurasi hasil gabungan (merged JSON) secara real-time.

## Cara Kerja
1. Jalankan skrip generator [playground-generator.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/config-playground/playground-generator.js) via Node.js atau melalui perintah `npm run generate`.
2. Generator membaca konfigurasi aktif melalui **Config Loader** dan merender file [playground.njk](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/config-playground/playground.njk) ke dalam [index.html](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/config-playground/index.html).
3. Jalankan Vite server (`npm run dev`) lalu akses URL `/config-playground` untuk memverifikasi properties, keys, dan isi raw JSON-nya.
