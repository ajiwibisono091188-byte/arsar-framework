# Page Blueprint Schema - Experience Composer

Page Blueprint adalah kontrak keluaran terstruktur murni dari Experience Composer yang memuat data siap saji untuk mesin Renderer.

---

## Spesifikasi Kolom Blueprint JSON

- **pageType**: (String) Jenis halaman (e.g. `landing`, `homepage`, `pricing`).
- **goal**: (String) Sasaran konversi proyek (e.g. `Lead Generation`).
- **strategy**: (String) Strategi pemasaran terpilih (e.g. `conversion`).
- **layout**: (String) Kerangka tata letak visual (e.g. `split`).
- **sections**: (Array) List urutan ID seksi yang dipasang (e.g. `["hero", "benefits", "cta", "footer"]`).
- **metadata**: (Object) Memuat title halaman dan timestamp waktu perakitan.
- **dependencies**: (Array) Dependensi eksternal (e.g. `["tailwind-v4"]`).

```json
{
  "pageType": "landing",
  "goal": "Lead Generation",
  "strategy": "conversion",
  "layout": "split",
  "sections": ["hero", "benefits", "cta", "footer"],
  "metadata": {
    "title": "Gadai BPKB Surabaya",
    "timestamp": "2026-07-25T13:20:00Z"
  },
  "dependencies": ["tailwind-v4"]
}
```
