# Project Engine Spec - ARSAR Studio

Project Engine mengendalikan pengelolaan data proyek, pembuatan folder terstruktur, I/O filesystem (load/save), dan pelacakan versi berkas proyek.

---

## 1. Komponen Project Engine

### ProjectManager (`src/project/core/project-manager.js`)
Pusat pengendali memori aktif (*active workspace manager*). Menyimpan referensi proyek yang sedang dibuka di GUI dan memancarkan sinyal peristiwa (events).

### ProjectFactory (`src/project/core/project-factory.js`)
Kelas pembuat (*builder*) struktur disk fisik proyek statis baru dengan menuliskan 7 berkas konfigurasi default dan 3 folder subdirektori.

### ProjectLoader & ProjectSaver (`src/project/storage/`)
Modul penanggung jawab serialisasi dan pembacaan berkas JSON konfigurasi dari disk.

### ProjectValidator (`src/project/validation/project-validator.js`)
Melakukan peninjauan format penulisan slug, nama proyek, validasi parameter, dan mendeteksi jika ada berkas wajib proyek yang hilang.

### ProjectVersionManager (`src/project/versioning/version-manager.js`)
Mencatat riwayat log perubahan revisi konfigurasi ke folder `/logs/revisions/` untuk persiapan rollback.

---

## 2. Event Emitter Signal

ProjectManager memancarkan sinyal asinkronus ke bus peristiwa (`EventBus`) pada siklus berikut:
- `project.created`: Dipancarkan setelah proyek sukses dibuat di disk.
- `project.opened`: Dipancarkan setelah proyek berhasil dimuat ke memori aktif.
- `project.saved`: Dipancarkan setelah proses penyimpanan berkas konfigurasi selesai.
- `project.closed`: Dipancarkan saat proyek dilepas dari memori aktif.
- `project.deleted`: Dipancarkan setelah folder fisik proyek dihapus dari disk.
