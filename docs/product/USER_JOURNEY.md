# User Journey - ARSAR Studio

Dokumen ini memetakan langkah demi langkah perjalanan pengguna saat merakit website pemasaran statis di **ARSAR Studio**.

---

## Alur Utama Perjalanan Pengguna (User Journey Map)

```text
Login / Masuk
      ↓
New Project (Pilih nama & target folder)
      ↓
Isi Company (Profil instansi & setelan theme warna)
      ↓
AI Generate Content (AI menulis copywriting terstruktur)
      ↓
Review (Pratinjau visual & Token Inspector)
      ↓
Generate Landing Page (Kompilasi layout & kota target)
      ↓
SEO Audit (Cek otomatis keselarasan schema & Meta)
      ↓
Deploy (Kirim satu kali klik ke Cloudflare Pages)
      ↓
Analytics (Melacak performa pengunjung & konversi Leads)
```

---

## Rincian Perilaku Tiap Tahapan

### 1. Login & New Project
- **Aksi**: Pengguna masuk ke ARSAR Studio GUI, lalu menekan tombol "Proyek Baru".
- **Sistem**: Menyiapkan folder proyek statis, menyalin default configuration JSON dan tokens design system.

### 2. Pengisian Profil Perusahaan & Branding
- **Aksi**: Mengisi nama badan hukum, kontak, alamat maps, dan memilih warna primer tema.
- **Sistem**: Menulis data secara realtime ke `company.json` dan `theme.json` dan memicu refresh styles.

### 3. Otomatisasi Penulisan Konten (AI Generation)
- **Aksi**: Pengguna menulis brief singkat produk (misal: "Jasa gadai BPKB bunga rendah di Surabaya").
- **Sistem**: AI mengurai brief, merakit data value proposition ke dalam `benefit.json`, `cta.json`, `testimonials.json`, dan `faq.json` sesuai Application Schema kontrak data.

### 4. Review & Visual Playground
- **Aksi**: Beralih ke tab visual preview simulator (tablet/mobile) untuk memeriksa estetika visual.
- **Sistem**: Menampilkan panel Playground Nunjucks dengan inspector token untuk melihat kecocokan CSS variables.

### 5. Static Compilation & SEO Check
- **Aksi**: Menekan tombol "Compile & Audit".
- **Sistem**: Menjalankan validator dinamis, menyusun JSON-LD (FAQPage, LocalBusiness), serta melakukan normalisasi teks (whitespaces trim).

### 6. Deployment & Analytics
- **Aksi**: Mengklik tombol "Publish ke Web".
- **Sistem**: Mengunggah berkas terkompilasi ke Cloudflare Pages CDN gratis, menghubungkan custom domain, serta menyematkan script tracking.
