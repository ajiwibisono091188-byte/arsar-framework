# E2E Error Handling - Landing Generator

Landing Generator menyebarkan penanganan kegagalan secara bertahap untuk menjaga stabilitas siklus build:

---

## 1. Kegagalan API AI (Model Timeout)
- **Tindakan**: Memicu retry otomatis via `RetryManager` dengan delay exponential backoff. Jika tetap gagal setelah batas maksimal percobaan, generator menangkap kegagalan dan melempar exception bersandi `generator.failed`.

---

## 2. Kegagalan Validasi Skema (Schema Validation Failure)
- **Tindakan**: Jika file `company.json` atau `project.json` dirusak di tengah proses, `ProjectValidator` membatalkan rendering HTML untuk mencegah kerusakan tampilan visual website statis.

---

## 3. Log Penyimpanan (Build logs)
- Seluruh rincian peringatan (*warnings*) compile styles Tailwind v4 dan kegagalan loading berkas ditulis secara asinkronus ke folder `/logs/` proyek untuk mempermudah audit investigasi pengembang.
