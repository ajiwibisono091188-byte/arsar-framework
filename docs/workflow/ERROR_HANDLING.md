# Workflow Error Handling & Recovery - Workflow Engine

Sistem mengoordinasikan pemulihan kegagalan langkah secara otomatis melalui 4 mekanisme:

---

## 1. Retry Step (Uji Coba Ulang Langkah)
- Pengguna dapat memicu `.retryStep()` di dasbor GUI jika terjadi kegagalan jaringan sementara (seperti API LLM timeout). Runner akan memicu ulang metode `.execute()` pada index langkah yang sama tanpa perlu mengulang dari langkah 1.

---

## 2. Skip Step (Melewati Langkah)
- Untuk langkah non-kritis (seperti penulisan blog cadangan), pengguna dapat menekan `.skipStep()`. Runner menandai status, menaikkan pointer index langkah, dan langsung melanjutkan eksekusi sisa langkah di bawahnya.

---

## 3. Abort & Rollback (Pembatalan & LIFO Rollback)
- Jika langkah kritis (seperti perakitan Nunjucks layout) crash, runner akan mematikan proses sisa langkah, menandai state `failed`, lalu memicu fungsi `.rollback()` pada seluruh langkah sukses sebelumnya dengan urutan terbalik LIFO (Last In First Out) untuk membebaskan memory leaks.
