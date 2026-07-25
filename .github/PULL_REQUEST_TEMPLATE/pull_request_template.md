## Deskripsi Perubahan
Jelaskan perubahan apa yang dilakukan dan apa tujuannya.

## Issue Terkait
Tuliskan nomor isu yang diselesaikan oleh PR ini (contoh: `#12`).

## Tipe Perubahan
Pilih tipe perubahan yang sesuai:
- [ ] Bug fix (perbaikan bug non-breaking)
- [ ] Feature (fitur baru non-breaking)
- [ ] Refactor (perubahan kode internal non-breaking)
- [ ] Documentation (penambahan/perbaikan dokumen)
- [ ] Breaking change (perubahan besar yang menyebabkan build lama gagal)

## Checklist Kepatuhan Standar

### Architecture
- [ ] Struktur folder sesuai dengan Clean Architecture.
- [ ] Tidak ada impor langsung berkas JSON di dalam komponen Nunjucks.

### Coding Standard
- [ ] Penamaan file, folder, dan variabel mematuhi [Coding Standard](docs/CODING_STANDARD.md).
- [ ] Format penulisan commit menggunakan Conventional Commits.
- [ ] Jalankan `npm run lint` dan lolos tanpa error.
- [ ] Jalankan `npm run format` untuk merapikan baris kode.

### Documentation
- [ ] Berkas `README.md` pada sub-folder terkait sudah dibuat/diperbarui.
- [ ] Props, variant, dan contoh pemanggilan komponen sudah didokumentasikan di `docs/`.

### Testing
- [ ] Seluruh pengujian lokal (Playwright/Jest) berjalan sukses tanpa kegagalan.

### Build
- [ ] Jalankan `npm run build` dan berhasil mengekspor HTML statis tanpa anomali.
