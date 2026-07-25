# ARSAR AI Marketing OS v2.0 - Versioning Specification

Platform **ARSAR AI Marketing OS v2.0** mengikuti spesifikasi **Semantic Versioning 2.0.0 (SemVer)** untuk mengatur penomoran rilis dan pembaruan framework.

---

## 1. Format Penomoran Versi

Versi diidentifikasi menggunakan tiga angka yang dipisahkan titik dengan format:
```text
MAJOR.MINOR.PATCH
```

- **MAJOR**: Kenaikan angka ketika ada perubahan besar yang tidak kompatibel dengan versi sebelumnya (*breaking changes* pada Core API/layout).
- **MINOR**: Kenaikan angka ketika ada penambahan fitur baru yang kompatibel ke belakang (*backward-compatible features*, misal: menambah komponen baru atau plugin baru).
- **PATCH**: Kenaikan angka ketika ada perbaikan bug atau optimasi kecil yang kompatibel ke belakang (*backward-compatible bug fixes*).

---

## 2. Kriteria Kenaikan Angka Versi

| Tipe Perubahan | Deskripsi Teknis | Contoh Aksi | Increment |
| :--- | :--- | :--- | :--- |
| **Patch Release** | Perbaikan bug minor, pembersihan format, atau optimasi Lighthouse kecil. | Perbaikan bug toggle menu mobile di `navigation.js`. | `0.1.0` &rarr; `0.1.1` |
| **Minor Release** | Menambahkan komponen Nunjucks baru ke design system, memperbarui validator, menambah generator baru. | Penambahan komponen `Calculator` baru di Sprint 6. | `0.1.1` &rarr; `0.2.0` |
| **Major Release** | Perubahan restrukturisasi folder inti, perubahan skema konfigurasi wajib yang menyebabkan build lama gagal. | Migrasi ke bundler baru atau perubahan struktur CSS Tailwind v4. | `0.2.0` &rarr; `1.0.0` |

---

## 3. Prarilis & Meta Tag Versi

Untuk rilis uji coba atau prarilis, tag tambahan disematkan menggunakan tanda hubung `-` setelah nomor patch:
- **Alpha**: Rilis pengembangan awal internal (contoh: `2.0.0-alpha.1`).
- **Beta**: Rilis uji coba publik sebelum versi stabil (contoh: `2.0.0-beta.3`).
- **Release Candidate (RC)**: Versi stabil potensial yang siap diluncurkan jika tidak ditemukan kendala baru (contoh: `2.0.0-rc.1`).
