# Production Pipeline MVP Specification - ARSAR Studio

Production Pipeline bertindak sebagai kompilator akhir (*builder core*) untuk merakit website statis pemasaran utuh siap guna secara asinkronus sekuensial.

---

## 1. Arsitektur Komponen

### PipelineEngine (`src/pipeline/engine/pipeline-engine.js`)
Lapisan utama yang mengendalikan alur build (clean &rarr; read config &rarr; compose blueprint &rarr; compile templates &rarr; compile assets &rarr; generate SEO outputs).

### Renderer (`src/pipeline/renderer/renderer.js`)
Penyusun teks makro HTML halaman dengan memuat file layout Nunjucks-like dan melarutkan token copywriting ke dalam placeholder.

### SEOOutputGenerator (`src/pipeline/seo/seo-output-generator.js`)
Menghasilkan berkas penunjuk pencarian crawl Google (`robots.txt`, `sitemap.xml`) dan menyandikan skrip structured metadata `<script type="application/ld+json">`.

### AssetPipeline (`src/pipeline/assets/asset-pipeline.js`)
Menggabungkan stylesheet CSS, menyisipkan visual warna HEX brand, menyalin main script JS, dan memformat file PWA `manifest.json`.

---

## 2. Pipeline Event Signals

Engine memancarkan sinyal asinkronus ke bus peristiwa (`EventBus`):
- `build.started`: Dipancarkan ketika siklus kompilasi baru dipicu.
- `build.completed`: Dipancarkan saat website statis selesai diekspor ke folder `/dist/`.
- `render.started`: Dipancarkan sesaat sebelum layout HTML dirakit.
- `render.completed`: Dipancarkan sesudah rendering file HTML selesai.
- `output.generated`: Dipancarkan saat seluruh aset CSS/JS disalin.
