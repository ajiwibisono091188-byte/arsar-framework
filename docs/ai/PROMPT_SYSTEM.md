# Prompt System - ARSAR Studio

Prompt System memisahkan instruksi copywriting sistem (*system templates*) dari data dinamis proyek.

---

## 1. Penyimpanan Berkas Template

Template disimpan sebagai file Markdown terpisah di bawah `/src/ai/prompts/` agar mudah disunting oleh Copywriter/PM tanpa menyentuh kode pemrograman:
- `hero.prompt.md`: Menyusun copywriting seksi Hero.
- `faq.prompt.md`: Menyusun 3 tanya jawab kustom lokal.
- `ads.prompt.md`: Membuat copywriting Google Search Ads.
- `seo.prompt.md`: Menghasilkan meta title & description teroptimasi.
- `landing.prompt.md`: Panduan blueprint blok seksi landing page.

---

## 2. Kompilasi Placeholder

PromptCompiler memindai parameter kurung kurawal ganda dan menyuntikkan data proyek:
- `{{company}}` &rarr; Nama Profil Perusahaan (e.g. "Arsar Digital")
- `{{usp}}` &rarr; Deskripsi keunikan layanan
- `{{audience}}` &rarr; Target demografi pembaca
- `{{location}}` &rarr; Target kota (Local SEO)
- `{{cta}}` &rarr; Label tombol tindakan
