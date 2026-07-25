# Landing Generator Spec - ARSAR Studio

Landing Generator bertindak sebagai konduktor utama yang mengorkestrasi seluruh modul ARSAR Studio di bawah satu alur terpadu sekali klik (*One Click Generate*).

---

## 1. Abstraksi Kelas (LandingGenerator)

LandingGenerator tidak memuat logika bisnis internal, melainkan murni mengekstrak instansi engine yang diperlukan dari Service Container:
- `generate(projectPath, outDir)`: Memicu kompilasi E2E sekuensial penuh.
- `generateLanding(projectPath, outDir)`: Khusus merender halaman visual.
- `generateSEO(projectPath, outDir)`: Menghasilkan `sitemap.xml`, `robots.txt`, dan JSON-LD.
- `generateAds(projectPath, outDir)`: Menghasilkan copywriting iklan Google Search.
- `generateMeta(projectPath, outDir)`: Merakit berkas manifest.json.
- `generateAssets(projectPath, outDir)`: Menghasilkan styles brand HEX.

---

## 2. Pemasaran Event Signals

Sinyal dipancarkan asinkronus ke EventBus:
- `generator.started`: Dipancarkan saat build sekali klik dijalankan.
- `generator.progress`: Melacak kemajuan proses (skala 0% s.d 100%).
- `generator.completed`: Dipancarkan setelah folder `/dist/` lengkap terbit.
- `generator.failed`: Dipancarkan apabila salah satu modul melempar exception crash.
