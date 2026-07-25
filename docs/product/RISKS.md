# Risk Management - ARSAR Studio

Identifikasi risiko teknis, produk, bisnis, dan skalabilitas di dalam pengembangan **ARSAR Studio** beserta rencana mitigasinya.

---

## 1. Risiko Teknis (Technical Risks)
- **Risiko**: Terjadi kegagalan build/kompilasi ketika memproses input schema JSON-LD bertingkat yang kompleks.
- **Mitigasi**: Menerapkan validator generik ketat pada level Schema Registry yang membatalkan build dan memberikan koordinat error path yang jelas sebelum merender template HTML.

---

## 2. Risiko Produk (Product Risks)
- **Risiko**: Pengguna non-developer merasa kesulitan menggunakan CLI terminal untuk menjalankan generator atau mengubah file JSON.
- **Mitigasi**: Membangun local GUI CMS Dashboard (berbasis desktop Electron / local web server) sebagai prioritas utama Should Have / Could Have sebelum merilis v1.0 stabil.

---

## 3. Risiko Bisnis (Business Risks)
- **Risiko**: Kompetitor (SaaS website builder dinamis raksasa) menawarkan kemudahan kustomisasi visual drag-and-drop yang instan.
- **Mitigasi**: Menekankan diferensiasi keunggulan zero-hosting cost selamanya dan performa kecepatan load page instan yang tidak dapat ditandingi oleh SaaS database-driven.

---

## 4. Risiko Skalabilitas (Scalability Risks)
- **Risiko**: Kompilasi ribuan halaman target kota (Local SEO) sekaligus memakan waktu build lama dan membebani memori I/O komputer lokal.
- **Mitigasi**: Mengoptimalkan generator menggunakan teknik stream writer dan caching memori (MemoryCache) sehingga file static yang tidak mengalami perubahan konten tidak perlu dikompilasi ulang (*incremental build*).
