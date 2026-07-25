# Scoring System - Conversion Knowledge Engine

Scoring System memberikan penilaian kecocokan (skala 0 - 100) antara variabel brief proyek pengguna dengan profil database industri untuk menentukan basis data mana yang paling akurat untuk dilatih.

---

## Bobot Penilaian (Scoring Weights Matrix)

| Komponen | Bobot Skor | Indikator Pencapaian |
| :--- | :--- | :--- |
| **Industry Match** | 40 Poin | Nama industri cocok seutuhnya (e.g. "Automotive Financing"). |
| | 20 Poin | Nama industri cocok sebagian (e.g. "Automotive"). |
| **Audience Match** | 30 Poin | Persona demografi pembaca sejalan dengan database. |
| **Offer Match** | 20 Poin | Jenis promosi/penawaran mengandung irisan kata kunci. |
| **Location Match** | 10 Poin | Wilayah target lokal SEO selaras dengan list keywords. |

---

## Skala Relevansi Hasil
- **Skor 80 - 100**: Sangat Relevan. Pustaka data sangat akurat untuk langsung diolah AI.
- **Skor 40 - 79**: Relevan Sebagian. Membutuhkan penyesuaian manual tambahan di GUI.
- **Skor < 40**: Tidak Relevan.
