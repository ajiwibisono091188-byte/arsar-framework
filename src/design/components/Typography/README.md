# Typography Component

Komponen Tipografi terstandarisasi untuk merender teks di seluruh halaman web. Menjamin konsistensi ukuran huruf, tinggi baris (`line-height`), jenis font (`font-family`), dan ketebalan huruf (`font-weight`) langsung berdasarkan token tipografi.

## Variants (Sizes)
- `displayXl`: Sangat besar (`4.5rem`), cocok untuk tulisan hero banner utama (landing page display).
- `displayLg`: Besar (`3.75rem`), digunakan untuk heading landing section utama.
- `displayMd`: Sedang (`3.0rem`).
- `h1`: Heading tingkat 1 (`2.25rem`).
- `h2`: Heading tingkat 2 (`1.875rem`).
- `h3`: Heading tingkat 3 (`1.5rem`).
- `h4`: Heading tingkat 4 (`1.25rem`).
- `h5`: Heading tingkat 5 (`1.125rem`).
- `body`: Teks konten standard (`1.0rem`).
- `small`: Teks konten berukuran kecil (`0.875rem`).
- `caption`: Teks keterangan atau label kecil (`0.75rem`).

## Props
| Nama | Tipe | Default | Pilihan / Deskripsi |
| :--- | :--- | :--- | :--- |
| `text` | `String` | *(Required)* | Teks / HTML konten yang akan dirender. |
| `variant` | `String` | `"body"` | Pilihan tipe variant di atas. |
| `element` | `String` | `null` | Kustomisasi tag HTML penutup (misal: `"h3"`, `"span"`, `"p"`). Jika kosong, otomatis terpilih berdasarkan variant. |
| `weight` | `String` | `"normal"` | `"normal"`, `"medium"`, `"semibold"`, `"bold"`, `"extrabold"`, `"black"` |
| `customClass` | `String` | `""` | Kelas CSS tambahan. |
| `customStyle` | `String` | `""` | Inline style khusus. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Typography/Typography.njk" as t %}

<!-- Display Heading -->
{{ t.Typography(text="Transformasi Iklan Anda", variant="displayXl", weight="extrabold") }}

<!-- Custom Element H3 -->
{{ t.Typography(text="Fitur AI Chat", variant="h3", element="span", weight="bold") }}
```
