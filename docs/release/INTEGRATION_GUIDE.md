# Integration & Build Guide - Release 0.1

Panduan menjalankan alur kompilasi E2E sekali jalan menggunakan CLI Command Platform.

---

## Alur Eksekusi Perintah CLI

### 1. Inisialisasi Proyek Baru
```bash
node src/commands/bin/arsar.js new "Proyek Kredit" proyek-kredit --dir ./proyek-kredit
```

### 2. Jalankan Build Static Compilation
```bash
node src/commands/bin/arsar.js build ./proyek-kredit --out ./proyek-kredit/dist
```

### 3. Pemicuan Diagnosa Kesehatan Sistem
```bash
node src/commands/bin/arsar.js doctor
```
Doctor akan memindai folder penting, mendeteksi kelayakan schema validator, dan menguji workflow registry.
