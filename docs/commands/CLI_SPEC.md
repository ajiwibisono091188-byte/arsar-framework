# CLI Specification - Command Platform

CLI Platform menyediakan 9 perintah utama default untuk mengendalikan proyek pemasaran statis secara modular.

---

## 9 Perintah Core Bawaan

1. **`new`**: Membuat proyek baru.
   - Contoh: `arsar new my-spa --desc "Marketing Site"`
2. **`open`**: Membuka proyek aktif.
   - Contoh: `arsar open my-spa`
3. **`generate`**: Memanggil LLM menulis teks promo.
   - Contoh: `arsar generate --project my-spa`
4. **`build`**: Mengompilasi visual HTML & CSS.
   - Contoh: `arsar build --clean`
5. **`preview`**: Membuka preview visual lokal.
   - Contoh: `arsar preview --port 3000`
6. **`deploy`**: Mengunggah ke CDN Cloudflare Pages.
   - Contoh: `arsar deploy --prod`
7. **`doctor`**: Mendiagnosis status kesehatan data.
   - Contoh: `arsar doctor`
8. **`version`**: Menampilkan nomor versi framework.
   - Contoh: `arsar version`
9. **`help`**: Menampilkan panduan teks instruksi command.
   - Contoh: `arsar help`
