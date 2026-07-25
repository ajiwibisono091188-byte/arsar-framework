# Google Ads Campaign Model - Google Ads Generator

Setiap kampanye yang dihasilkan dirakit menggunakan skema terstruktur siap saji berikut:

---

## Spesifikasi Model Kampanye (Output)

- **campaignName**: Nama kampanye resmi (e.g. `SEM_Search_ID_[Company]_[Offer]_[Location]`).
- **adGroups**: Pembagian grup iklan (e.g. `AdGroup_[Offer]_Brand`, `AdGroup_[Offer]_Local`).
- **headlines**: Array berisi 30 string judul iklan (maksimal 30 karakter).
- **descriptions**: Array berisi 15 string deskripsi iklan (maksimal 90 karakter).
- **keywords**: Daftar kata kunci target gabungan Local & Commercial Intent.
- **negativeKeywords**: Kata kunci negatif untuk mencegah salah target iklan.
- **sitelinks**: Tautan situs tambahan berisi judul, deskripsi, dan URL.
- **callouts**: Kalimat keunggulan ringkas penarik perhatian.
- **structuredSnippets**: Header kategori layanan beserta daftar jenis jasa.
