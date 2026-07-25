# Input Component

Komponen Input dan Kontrol Formulir modular yang mendukung berbagai tipe masukan. Dikendalikan secara visual oleh design tokens (radius, spacing, colors) dengan penanganan focus states yang presisi dan aksen warna hover.

## Types
- `text` / `email` / `number` / `phone`: Input baris tunggal standard.
- `textarea`: Kotak masukan multi-baris.
- `select`: Dropdown pilihan dengan ikon panah custom.
- `checkbox`: Pilihan kotak centang semantik.
- `radio`: Pilihan bundar radio button semantik.
- `toggle`: Switch geser modern (merupakan wrapper checkbox yang ditenagai data-model Alpine.js).

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | `String` | *(Required)* | Nama field input (atribut `name`). |
| `label` | `String` | `""` | Label visual untuk input. |
| `type` | `String` | `"text"` | Tipe input (pilih dari daftar tipe di atas). |
| `value` | `String` | `""` | Nilai default input. |
| `placeholder` | `String` | `""` | Teks placeholder pembimbing. |
| `required` | `Boolean` | `false` | Menandai field sebagai wajib diisi (menampilkan tanda bintang merah). |
| `options` | `Array` | `null` | Kumpulan pilihan `{ value, label }` khusus untuk variant `select`. |
| `error` | `String` | `null` | Pesan galat validasi. Mengubah warna border menjadi merah jika diisi. |
| `id` | `String` | `null` | Id HTML unik (otomatis fallback ke `"input-" + name`). |
| `customClass` | `String` | `""` | Modifikasi layout kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Input/Input.njk" as inp %}

<!-- Email Input -->
{{ inp.Input(name="user_email", label="Email Kerja", type="email", required=true, placeholder="budi@perusahaan.com") }}

<!-- Select Dropdown -->
{{ inp.Input(
  name="service_select",
  label="Pilih Layanan",
  type="select",
  placeholder="Pilih salah satu layanan...",
  options=[
    { value: "ai-os", label: "AI Marketing OS" },
    { value: "seo", label: "SEO Engine" }
  ]
) }}

<!-- Toggle Switch -->
{{ inp.Input(name="promo_opt", label="Saya ingin menerima update promo berkala", type="toggle") }}
```
