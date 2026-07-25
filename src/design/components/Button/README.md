# Button Component

Komponen Button modular yang dikendalikan oleh design tokens untuk memelihara visual yang konsisten tanpa hardcoding kelas warna/ukuran.

## Props
| Nama | Tipe | Default | Pilihan / Deskripsi |
| :--- | :--- | :--- | :--- |
| `label` | `String` | *(Required)* | Teks tombol. |
| `variant` | `String` | `"primary"` | `"primary"`, `"secondary"`, `"ghost"`, `"outline"`, `"success"`, `"danger"`, `"warning"` |
| `size` | `String` | `"medium"` | `"small"`, `"medium"`, `"large"` |
| `disabled` | `Boolean` | `false` | Menonaktifkan tombol secara visual & fungsional. |
| `loading` | `Boolean` | `false` | Mengubah tombol menjadi status pemuatan (busy state). |
| `fullWidth` | `Boolean` | `false` | Lebar tombol 100% dari kontainer. |
| `icon` | `String` | `null` | String markup HTML SVG untuk disisipkan. |
| `id` | `String` | `null` | Id HTML unik. |
| `type` | `String` | `"button"` | `"button"`, `"submit"`, `"reset"` |
| `customClass` | `String` | `""` | Kelas CSS tambahan jika diperlukan. |

## Contoh Penggunaan (Nunjucks Macro)

```nunjucks
{% import "design/components/Button/Button.njk" as btn %}

<!-- Primary Button -->
{{ btn.Button(label="Mulai Sekarang", variant="primary") }}

<!-- Disabled Button with Icon -->
{{ btn.Button(label="Simpan Data", variant="success", disabled=true) }}

<!-- Loading Full Width Button -->
{{ btn.Button(label="Kirim Formulir", variant="danger", loading=true, fullWidth=true) }}
```

## Aksesibilitas (A11y)
- Menggunakan `aria-disabled="true"` saat dinonaktifkan.
- Menggunakan `aria-busy="true"` saat memuat data.
- Dilengkapi ring fokus yang terlihat (`focus:ring-2`) untuk navigasi keyboard.
