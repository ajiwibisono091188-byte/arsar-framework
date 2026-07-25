# Workflow Definition Schema - Workflow Engine

Setiap blueprint alur kerja (*Workflow Definition*) didefinisikan dalam berkas terstruktur JSON:

---

## Spesifikasi Skema JSON

- **id**: (String) ID unik pencarian alur (e.g. `build-pipeline`).
- **name**: (String) Nama deskriptif alur kerja.
- **description**: (String) Penjelasan kerja sistem.
- **steps**: (Array) List urutan ID langkah yang akan dijalankan sekuensial.
- **dependencies**: (Object) Relasi dependencies antarlangkah untuk deteksi circular loop (e.g. `{"stepB": ["stepA"]}`).
- **metadata**: (Object) Info penulis dan penomoran versi template.

```json
{
  "id": "build-pipeline",
  "name": "ARSAR Core Build Pipeline",
  "steps": [
    "load_project",
    "load_knowledge",
    "generate_ai_content",
    "compose_blueprint",
    "render",
    "generate_seo",
    "deploy"
  ],
  "dependencies": {
    "generate_ai_content": ["load_knowledge"]
  }
}
```
