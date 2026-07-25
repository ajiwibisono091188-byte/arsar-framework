# Rule Engine - Experience Composer

Rule Engine memisahkan logika pemasaran kondisional dari alur program utama untuk mempermudah pemeliharaan rekomendasi strategi layout.

---

## 1. Mekanisme Kerja

Aturan didefinisikan sebagai objek dengan parameter:
- **name**: Label identitas aturan.
- **condition**: Fungsi penilai (mengembalikan `boolean`).
- **action**: Fungsi penyusun rekomendasi data layout dan seksi (mengembalikan payload `Object`).

---

## 2. Aturan Bawaan (Default Rules)

### A. Gadai BPKB / Automotive Financing Rule
- **Kondisi**: `industry === "Gadai BPKB"` ATAU `industry === "Automotive Financing"` DAN `goal === "Lead Generation"`.
- **Aksi**: Menerapkan strategi `conversion`, layout `split` (dua kolom mobile-friendly), dan mengaktifkan urutan seksi: Hero, Benefits, Testimonials, CTA, FAQ, Footer.

### B. Wellness Spa Local Business Rule
- **Kondisi**: `industry === "Wellness Spa"` DAN `pageType === "landing"`.
- **Aksi**: Menerapkan strategi `local-business`, layout `alternating` (selang-seling teks-gambar), dan mengaktifkan seksi: Hero, Benefits, Gallery, Testimonials, CTA, Footer.
