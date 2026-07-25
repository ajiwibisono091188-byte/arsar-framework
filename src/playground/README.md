# Playground Folder

Folder ini berisi visualisasi interaktif dari seluruh komponen yang ada di dalam Design System. Bertindak seperti Storybook lokal, di mana pengembang dapat melakukan pratinjau komponen secara real-time.

## Cara Kerja
1. Jalankan skrip generator [playground-generator.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/playground/playground-generator.js) via Node.js atau melalui perintah `npm run generate`.
2. Generator akan merender file [playground.njk](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/playground/playground.njk) dengan menyuntikkan seluruh makro komponen dan token desain ke dalam format berkas [index.html](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/playground/index.html).
3. Jalankan Vite dev server (`npm run dev`) untuk melihat interaktivitas tombol, form, modal, ulasan produk, dan token inspector di browser Anda pada alamat `/playground`.
