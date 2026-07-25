# Release Notes: ARSAR Studio OS v2.0 (Release 0.1)

Rilis **Release 0.1 (MVP Integration)** sukses menyatukan seluruh sub-sistem utama menjadi rantai pipa eksekusi tunggal berkinerja tinggi.

---

## Fitur Utama MVP

- **One-Click Generate**: Pembuatan landing page HTML utuh dengan satu panggilan `.generate()`.
- **Google Karakter Compliance**: Batasan penulisan judul (Headline &le; 30) dan deskripsi (Description &le; 90) Google Ads.
- **PWA Ready**: Otomatis menghasilkan berkas `manifest.json` dan caching parameter.
- **SEO Ready**: Mengoptimalkan indexing melalui sitemaps generator (`sitemap.xml`) dan rules crawler (`robots.txt`).

---

## Penerimaan Acceptance Criteria

✓ Perintah `arsar new` & `arsar build` terintegrasi dengan engine riil.
✓ Pengujian E2E integrasi diselesaikan 100% sukses.
✓ Folder `/dist/` resmi dihasilkan dengan aset CSS warna branding yang ter-inject.
