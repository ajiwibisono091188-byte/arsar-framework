# Workflow Engine Specification - ARSAR Studio

Workflow Engine bertindak sebagai pengendali orkestrasi puncak (*top-level orchestrator*) di dalam **ARSAR Studio** untuk merangkai langkah teratur pemrosesan website pemasaran statis.

---

## 1. Arsitektur Komponen

### WorkflowEngine (`src/workflow/engine/workflow-engine.js`)
Lapisan utama pendaftar template workflow (.json) dan pembuat runner instansi aktif.

### WorkflowRunner (`src/workflow/runner/workflow-runner.js`)
Pengendali eksekusi langkah sekuensial. Mendukung fungsi jeda (`pause`), jalan (`resume`), batal (`cancel`), lewati (`skip`), dan rollback LIFO jika error terdeteksi.

### WorkflowState (`src/workflow/state/workflow-state.js`)
Pencatat progress persentase loading, letak index langkah aktif saat ini, dan status transisi mesin state.

### WorkflowValidator (`src/workflow/validation/workflow-validator.js`)
Pengaudit data definisi workflow, mendeteksi ketergantungan melingkar (*circular dependencies*) pada diagram graf langkah.

---

## 2. Abstraksi Langkah (Steps Map)

Setiap aksi dibungkus menjadi kelas langkah mandiri:
1. **load_project**: Memuat konfigurasi `project.json` awal.
2. **load_knowledge**: Memuat teori penulisan basis data industri.
3. **generate_ai_content**: Membuka LLM menulis teks promo.
4. **compose_blueprint**: Menyusun blueprint visual makro seksi.
5. **render**: Melakukan compile visual static page.
6. **generate_seo**: Menyuntikkan JSON-LD Rich Snippets.
7. **deploy**: Mengunggah ke hosting CDN Cloudflare Pages.
