# Badge Component

Komponen label penunjuk (Badge) berukuran kecil untuk metadata, status, atau sub-heading visual.

## Variants
- `primary`: Aksen warna primary ungu tipis (violet glow).
- `secondary`: Aksen warna secondary hijau daun tipis.
- `outline`: Border abu-abu transparan dengan teks terang.
- `success`: Aksen status sukses (hijau).
- `danger`: Aksen status bahaya / error (merah).
- `warning`: Aksen status peringatan (kuning).

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `label` | `String` | *(Required)* | Teks badge. |
| `variant` | `String` | `"primary"` | `"primary"`, `"secondary"`, `"outline"`, `"success"`, `"danger"`, `"warning"` |
| `customClass` | `String` | `""` | Kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Badge/Badge.njk" as bdg %}

<!-- Success Status Badge -->
{{ bdg.Badge(label="Lunas", variant="success") }}

<!-- Hot Badge -->
{{ bdg.Badge(label="Terlaris", variant="primary", customClass="animate-pulse") }}
```
