# ARSAR AI Marketing OS v2.0 - Contributing Guide

Terima kasih telah berkontribusi untuk mengembangkan **ARSAR AI Marketing OS v2.0**! Dokumen ini memetakan alur kerja langkah-demi-langkah bagi kontributor pengembang.

---

## 1. Alur Kontribusi (Workflow)

```text
Fork Repo & Clone Lokal → Buat Feature Branch → Tulis Kode & Verifikasi Build → Commit & Push → Buka Pull Request (PR) → Code Review & Merge
```

### Langkah 1: Fork dan Clone
1. Lakukan **Fork** pada repositori resmi ARSAR di akun GitHub Anda.
2. Lakukan clone repositori fork tersebut ke komputer lokal Anda:
   ```bash
   git clone https://github.com/USERNAME-ANDA/arsar-framework.git
   ```

### Langkah 2: Membuat Cabang Baru (Feature Branch)
Selalu buat cabang baru dari branch `develop` untuk mengerjakan fitur atau perbaikan bug kustom:
```bash
# Tarik pembaruan develop terbaru
git checkout develop
git pull origin develop

# Buat branch feature baru
git checkout -b feature/nama-fitur-anda
```
*(Lihat aturan penamaan branch di [Coding Standard](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/docs/CODING_STANDARD.md)).*

### Langkah 3: Menulis Kode & Pengecekan Mandiri
Silakan kembangkan fitur Anda. Pastikan untuk menaati kaidah berikut:
- **No Hardcoding**: Seluruh warna/padding wajib menggunakan token CSS variables.
- **Linting & Format**: Jalankan perintah berikut untuk merapikan baris kode:
  ```bash
  npm run lint
  npm run format
  ```
- **Kompilasi Sukses**: Pastikan static generator dapat merender file HTML tanpa kendala:
  ```bash
  npm run build
  ```

### Langkah 4: Commit dan Push
Buat pesan commit mengikuti konvensi **Conventional Commits** lalu lakukan push ke repositori fork Anda:
```bash
git add .
git commit -m "feat(design): tambah parameter dinamis di Button"
git push origin feature/nama-fitur-anda
```

### Langkah 5: Membuka Pull Request (PR)
1. Buka halaman utama repositori resmi ARSAR di GitHub.
2. Klik tombol **New Pull Request** dan bandingkan branch `develop` repositori resmi dengan branch `feature/nama-fitur-anda` milik repositori fork Anda.
3. Berikan deskripsi yang jelas tentang perubahan yang Anda lakukan berdasarkan **Pull Request Template** yang muncul otomatis.
4. Klik **Create Pull Request**.

### Langkah 6: Tinjauan Kode (Code Review) & Merge
- Setidaknya satu reviewer inti (*core maintainer*) harus meninjau dan menyetujui perubahan Anda sebelum PR dapat di-merge.
- Jika ada feedback, perbaiki kode lokal Anda, commit, dan lakukan push ulang. PR akan otomatis ter-update.
- Setelah disetujui dan lulus build otomatis, core maintainer akan melakukan merge ke branch `develop`.
