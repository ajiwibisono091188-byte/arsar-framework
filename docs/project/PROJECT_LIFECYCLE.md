# Project Lifecycle Flow - ARSAR Studio

Siklus hidup pengelolaan proyek pemasaran statis diatur secara dinamis oleh **ProjectManager**:

```text
       [ Start ]
           ↓
      1. create()      ← Membuat folder & template default JSON di disk
           ↓
      2. open()        ← Memvalidasi & memuat data proyek ke memori aktif
           ↓
      3. edit()        ← Mengedit profil company / brand token di GUI
           ↓
      4. validate()    ← Menjalankan audit validasi parameter data
           ↓
      5. save()        ← Menulis ulang data ter-update ke disk ( updatedAt +1 )
           ↓
   6. export/deploy()  ← Mengemas ke ZIP statis / deploy ke Cloudflare
           ↓
      7. close()       ← Melepas penunjuk proyek dari memori aktif
           ↓
        [ End ]
```

---

## Deskripsi Transisi Siklus Hidup

1. **Pembuatan (create)**: Menghasilkan struktur direktori baru dengan ID acak. Tahap ini menulis data awal default agar proyek siap langsung dibuka tanpa kekosongan berkas.
2. **Pemuatan (open)**: ProjectManager memicu `ProjectValidator` untuk meninjau file. Jika lulus audit, loader memuat JSON ke memori `activeProjects` Map dan memancarkan event `project.opened`.
3. **Penyimpanan (save)**: Menulis data dari memori aktif kembali ke berkas JSON fisik di disk dan memperbarui timestamp `updatedAt`.
4. **Penutupan (close)**: Menghapus referensi cache memori aktif sehingga RAM komputer server pengembang tetap ringan dan bersih.
