# Core Engine Directory

Direktori ini berisi arsitektur dasar dari **Config Engine** ARSAR AI Marketing OS v2.0. Engine ini mengendalikan pembacaan konfigurasi web terpusat, memproses penggabungan (*merging*) untuk multi-project, melacak mode lingkungan (*environment*), dan menjalankan validasi berkas.

## Struktur Subdirektori
- [config/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/config/): Menyimpan 14 berkas konfigurasi default JSON beserta folder sub-proyek overrides (`projects/`).
- [loaders/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/loaders/): Berisi modul [config-loader.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/loaders/config-loader.js) yang mengatur pembacaan berkas sekali saji (memory-cached) dan penggabungan bertingkat.
- [validators/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/validators/): Berisi modul [config-validator.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/validators/config-validator.js) untuk memvalidasi format email, url, dan mencetak peringatan/kesalahan parameter.
- [helpers/](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/helpers/): Berisi modul [config-helpers.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/core/helpers/config-helpers.js) sebagai gerbang accessor bagi komponen web untuk membaca data.
