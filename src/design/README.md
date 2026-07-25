# Design System Folder

Folder ini berisi arsitektur dasar dari **Design System** ARSAR AI Marketing OS v2.0. Sistem ini bertugas menjamin ketiadaan *hardcoding* warna, margin, radius border, bayangan, atau tipografi di seluruh halaman web marketing.

## Struktur Subdirektori
- [tokens/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/tokens/): Menyimpan 11 token konfigurasi dasar berbasis JSON.
- [components/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/): Sub-komponen modular & reusable yang ditulis sebagai makro Nunjucks (.njk).
- [docs/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/docs/): Pedoman standardisasi pemakaian token dan kelas visual global.

## Theme Loader
File [theme-loader.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/theme-loader.js) bertindak sebagai interpreter yang membaca seluruh berkas token JSON dan menyajikannya ke dalam CSS Custom Properties (CSS variables) di bawah `:root` selector serta menggabungkannya ke dalam satu objek untuk Nunjucks.
