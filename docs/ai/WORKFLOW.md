# AI Content Workflow - ARSAR Studio

Alur kerja perakitan konten copywriting oleh **AIEngine** mengikuti jalur pemrosesan teratur:

```text
  1. Ambil Template Markdown (.prompt.md) dari PromptRegistry
                        ↓
  2. Compile template dengan Data Proyek via PromptCompiler
                        ↓
  3. Periksa Cache (AICache) - jika sudah ada, langsung kembalikan respon
                        ↓
  4. Kirim Prompt Terkompilasi ke AI Provider Aktif (AIEngine.generate)
                        ↓
  5. Jalankan Validasi Respon via AIResponseValidator
                        ↓
  6. Simpan hasil valid ke Cache & kembalikan data siap render
```

---

## Pemrosesan Batch (Batching Queue)

Untuk memproses pembuatan puluhan halaman kota (Local SEO) sekaligus:
- Pengguna memicu `generateBatch()`.
- Modul `AIQueue` menumpuk pekerjaan secara asinkronus untuk menghindari kegagalan eksekusi serentak.
