# Services Component

Komponen kartu grid untuk menampilkan daftar layanan unggulan perusahaan.

## Fitur & Struktur
- **Dynamic Loops**: Merender daftar layanan secara dinamis dari file data `services.json`.
- **Feature Checkmarks**: Dilengkapi peluru list ikon checklist warna hijau (`text-emerald-400`) untuk merangkum kelebihan layanan secara visual.

## Props/Variabel Nunjucks
- `services`: Array data layanan berisi objek `{ title, shortDescription, icon, features, slug }`.
