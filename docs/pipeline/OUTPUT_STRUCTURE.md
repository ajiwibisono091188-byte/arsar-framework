# Output Directory Structure - Production Pipeline

Keluaran akhir dari proses build tersimpan di folder `/dist/` dengan struktur clean static pages berikut:

```text
dist/
├── index.html            # Halaman statis utama terkompilasi
├── robots.txt            # Panduan crawling bot search engine
├── sitemap.xml           # Indeks peta halaman situs
├── manifest.json         # Manifest konfigurasi PWA & theme colors
└── assets/               # Aset pendukung halaman
      ├── css/
      │     └── style.css # Stylesheet ter-compile (primary/secondary colors)
      ├── js/
      │     └── main.js   # Script logika Javascript dasar
      └── images/         # Folder tempat menyimpan aset gambar
```
