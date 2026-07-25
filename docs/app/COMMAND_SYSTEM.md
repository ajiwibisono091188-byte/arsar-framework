# Command Palette System - Application Shell

Command Palette memfasilitasi pengeksekusian instruksi pengoperasian studio secara cepat melalui kolom input teks.

---

## 1. Mendaftarkan Perintah

Developer dapat menambahkan perintah baru secara dinamis menggunakan API:
```javascript
shell.commands.registerCommand('save-project', () => {
  // Callback simpan
}, 'Simpan Proyek Aktif');
```

---

## 2. Default Shortcuts Key Mappings

Pintasan keyboard global yang otomatis didaftarkan saat inisialisasi:
- **`Ctrl+K`**: Memicu instruksi `open-command-palette`.
- **`Ctrl+N`**: Memicu instruksi `new-project`.
- **`Ctrl+S`**: Memicu instruksi `save-project`.
