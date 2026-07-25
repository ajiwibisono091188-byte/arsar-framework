# Event System - Workflow Engine

Workflow Engine memancarkan sinyal asinkronus ke bus peristiwa (`EventBus`) di setiap transisi pipa untuk didengar dasbor GUI.

---

## Daftar Sinyal Event

- **workflow.started**: Dipancarkan ketika alur kerja resmi dipicu. Mengirimkan parameter ID.
- **workflow.completed**: Dipancarkan setelah seluruh langkah sekuensial sukses dieksekusi.
- **workflow.failed**: Dipancarkan saat runner menyerah akibat kegagalan fatal dan memicu rollback.
- **step.started**: Dipancarkan sesaat sebelum melangkah ke baris index aksi baru.
- **step.completed**: Dipancarkan sesudah metode `.execute()` langkah sukses mengembalikan context data ter-update.
- **step.failed**: Dipancarkan saat aksi melempar exception crash.
