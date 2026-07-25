# Project Structure Guide - ARSAR Studio

Setiap folder proyek pemasaran di dalam **ARSAR Studio** wajib memiliki susunan berkas berikut untuk lolos audit peninjauan **ProjectValidator**:

---

## 1. Berkas Konfigurasi JSON (Core Configs)

### A. project.json
Menyimpan metadata dasar proyek (ID, nama, slug, timestamp, dan penomoran versi).
```json
{
  "id": "proj_abc123",
  "name": "YogaDAI",
  "slug": "yogadai",
  "version": "1.0.0",
  "frameworkVersion": "2.0.0"
}
```

### B. company.json
Menyimpan profil kontak legalitas instansi (nama badan hukum, nomor telepon, email, alamat).

### C. brand.json
Menyimpan token visual kustom branding proyek (warna HEX primer/sekunder, radius, font).

### D. landing.json
Mengatur toggles keaktifan seksi pemasaran yang ditampilkan di halaman pendaratan.

### E. seo.json
Mengatur judul fallback meta tag, canonical link, dan Schema.org JSON-LD target.

### F. ads.json
Mengatur dynamic keywords parameter iklan berbayar (Paid Ads) dan UTM links.

### G. deploy.json
Mengatur setelan target pipeline hosting CDN.

---

## 2. Direktori Proyek

- **assets/**: Tempat menyimpan gambar ulasan, cover artikel blog, dan ornamen logo klien.
- **output/**: Direktori target penyimpanan ekspor file statis kasar HTML lokal.
- **logs/**: Menyimpan log error build generator dan riwayat komit revisi (`logs/revisions/*.json`).
