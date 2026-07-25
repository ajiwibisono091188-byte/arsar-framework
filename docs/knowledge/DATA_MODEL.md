# Data Model Schema - Conversion Knowledge Engine

Setiap berkas database industri di bawah `/src/knowledge/industry/*.json` harus patuh terhadap struktur schema berikut:

---

## Properti Root Database

- **industry**: (String) Nama industri unik (e.g. "Automotive Financing").
- **audiences**: (Array) List persona target audiens beserta rentang umur dan keluhan spesifik.
- **painPoints**: (Array) List keluhan terdalam konsumen beserta ID pengenal unik.
- **benefits**: (Array) List manfaat emosional/solutif penawaran untuk meng-counter painPoints.
- **offers**: (Array) Rincian format judul penawaran promosi/launching.
- **objections**: (Array) Pertanyaan keraguan calon pembeli beserta jawaban sanggahan (*rebuttal*).
- **cta**: (Array) Label tombol tindakan konversi.
- **keywords**: (Array) List kata kunci penargetan lokal SEO.
- **faq**: (Array) Tanya jawab dasar.
- **frameworkRecommendations**: (Array) Rekomendasi kerangka kerja penulisan (e.g. `["pas", "aida"]`).
- **seoIntent**: (String) Tipe maksud pencarian Google (e.g. `transactional`, `commercial`).
