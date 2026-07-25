# Breadcrumb Component

Komponen penunjuk remah roti (breadcrumb) untuk memudahkan pengguna mengetahui kedalaman halaman saat ini.

## SEO & Accessibility
- **Semantic Structure**: Menggunakan tag `<nav aria-label="Breadcrumb">` dan tag list `<ol>`.
- **Schema Mapping**: Berkolaborasi dengan generator `Breadcrumb.json` untuk menghasilkan markup JSON-LD untuk perayapan search engine.

## Props/Variabel Nunjucks
- `breadcrumbs`: Array berisi list `{ name, url }` untuk setiap kedalaman halaman.
