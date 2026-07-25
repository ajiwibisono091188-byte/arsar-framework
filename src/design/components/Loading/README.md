# Loading Component

Komponen animasi pemuatan data (Loading Indicator) dengan variasi spinner, bounce dots, dan skeleton card placeholder.

## Variants
- `spinner`: Lingkaran berputar terus menerus (spinning SVG ring). Cocok untuk tombol submit atau pemuatan modal.
- `dots`: Tiga buah titik berjatuhan/memantul secara ritmik dengan delay. Cocok untuk loading chat / pengetikan AI.
- `skeleton`: Blok abu-abu berdenyut (pulse animation) menyerupai bentuk kartu tulisan/berita. Cocok untuk skeleton screens saat halaman sedang di-fetch.

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `variant` | `String` | `"spinner"` | `"spinner"`, `"dots"`, `"skeleton"` |
| `size` | `String` | `"medium"` | `"small"`, `"medium"`, `"large"` (hanya berpengaruh pada variant `spinner`). |
| `customClass` | `String` | `""` | Kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Loading/Loading.njk" as ld %}

<!-- Large Spinner -->
{{ ld.Loading(variant="spinner", size="large") }}

<!-- Typing Dots -->
{{ ld.Loading(variant="dots") }}

<!-- Skeleton Screen -->
{{ ld.Loading(variant="skeleton") }}
```
