# FAQ Component

Komponen tanya-jawab accordion interaktif. Menggunakan state manager Alpine.js untuk transisi buka-tutup panel jawaban secara halus.

## Behavior & Logic
- **State management**: Ditangani reaktif oleh data-model `faqAccordion` (di `src/assets/js/faq.js`).
- **SEO Schema**: Secara otomatis sinkron dengan format schema JSON-LD FAQPage untuk menampilkan Rich Snippet di Google.

## Props/Variabel Nunjucks
- `faq`: Array data berisi list item `{ question, answer }`.
