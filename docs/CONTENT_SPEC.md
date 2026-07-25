# ARSAR AI Marketing OS v2.0 - Content Specification

Dokumen ini mendefinisikan struktur data terstandarisasi untuk bagian halaman (*marketing blocks*) dan konten dinamis. Skema ini digunakan oleh asisten AI maupun penulis konten saat menulis file JSON/Markdown.

---

## 1. Hero Block (`landing.json` / dynamic context)
Struktur untuk komponen banner utama di atas halaman pendaratan.
- **Fields**:
  - `badge`: `String` - Label kecil di atas judul.
  - `title`: `String` - Judul utama (menerima HTML kustom).
  - `description`: `String` - Paragraf ringkasan.
  - `ctaPrimary`: `Object` - `{ label, path }` untuk tombol aksi utama.
  - `ctaSecondary`: `Object` - `{ label, path }` untuk tombol aksi sekunder.

---

## 2. CTA Block (Call to Action)
Struktur penarik konversi pengunjung.
- **Fields**:
  - `title`: `String` - Kalimat ajakan besar.
  - `description`: `String` - Deskripsi ringkas.
  - `whatsappText`: `String` - Pesan default yang dikirim via WhatsApp.
  - `emailEndpoint`: `String` - Endpoint submit cadangan.

---

## 3. Benefit Block
Struktur grid alasan mengapa pengunjung harus memilih layanan/produk.
- **Fields**:
  - `id`: `String` - ID penunjuk indeks.
  - `title`: `String` - Judul benefit.
  - `description`: `String` - Deskripsi detail benefit.
  - `icon`: `String` - ID ikon / emoji.

---

## 4. Feature Block
Struktur list fitur teknis dari layanan/produk (side-by-side icon & text description).
- **Fields**:
  - `title`: `String` - Nama fitur.
  - `description`: `String` - Penjelasan teknis fitur.
  - `icon`: `String` - Nama ikon SVG bawaan.

---

## 5. Pricing Block
Struktur penawaran paket pembiayaan.
- **Fields**:
  - `planName`: `String` - Nama paket (misal: "Pro Plan").
  - `price`: `String` - Harga terformat (misal: "Rp 2.500.000").
  - `priceInterval`: `String` - Periode tagihan (misal: "bulan", "tahun").
  - `description`: `String` - Target pengguna paket.
  - `featuresIncluded`: `Array<String>` - Daftar fitur tercakup.
  - `isPopular`: `Boolean` - Memberikan tanda badge "Terpopuler".

---

## 6. FAQ Block (`faq.json`)
Struktur daftar pertanyaan dan jawaban.
- **Fields**:
  - `question`: `String` - Pertanyaan dari calon pelanggan.
  - `answer`: `String` - Jawaban resmi.

---

## 7. Review Block (`testimonials.json`)
Struktur data social proof kepuasan pelanggan.
- **Fields**:
  - `name`: `String` - Nama lengkap pemberi ulasan.
  - `position`: `String` - Jabatan / perusahaan (misal: "CEO, Tech Corp").
  - `avatar`: `String` - URL foto profil.
  - `content`: `String` - Testimoni ulasan.
  - `rating`: `Number` - Skor rating bintang (1-5).

---

## 8. Article Block (Markdown Front-Matter)
Struktur meta data di bagian atas file artikel `.md` di bawah `/src/content/`.
- **Fields**:
  - `title`: `String` - Judul artikel.
  - `description`: `String` - Deskripsi artikel (untuk meta description).
  - `datePublished`: `String` - Format tanggal `YYYY-MM-DD`.
  - `author`: `String` - Nama penulis artikel.
  - `image`: `String` - URL gambar cover artikel.
  - `category`: `String` - Kategori artikel.

---

## 9. Footer Block (`company.json` & `navigation.json`)
Struktur bagian penutup halaman.
- **Fields**:
  - `legalName`: `String` - Nama hukum perusahaan.
  - `copyrightText`: `String` - Hak cipta tahunan.
  - `socialLinks`: `Object` - Daftar url sosial media.
  - `address`: `Object` - Detail alamat resmi untuk Google Maps schema.

---

## 10. Schema (Structured Data Integration)
Data yang diekstrak secara dinamis oleh generator untuk menyusun Schema JSON-LD.
- **Organization**: Mengambil dari `company.json` untuk data legalitas, logo, dan situs resmi.
- **LocalBusiness**: Mengambil dari `cities.json` + `company.json` untuk memetakan alamat lokal daerah per target kota.
- **FAQPage**: Mengambil dari `faq.json` untuk rich snippet tanya-jawab di hasil pencarian Google.
