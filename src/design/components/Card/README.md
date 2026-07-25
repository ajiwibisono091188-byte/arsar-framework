# Card Component

Komponen Kartu modular dengan 7 variasi siap pakai untuk berbagai tipe penyajian data pemasaran. Seluruh padding, radius, bayangan, dan transisi terikat langsung ke design tokens.

## Variants
- `service`: Menampilkan judul layanan, penjelasan ringkas, ikon layanan, dan checklist fitur.
- `blog`: Menampilkan kategori blog, judul tautan, penjelasan singkat, cover gambar (jika ada), dan penulis.
- `pricing`: Menampilkan paket penawaran, harga bulanan besar, ringkasan, dan list benefit/layanan yang tercakup.
- `review`: Menampilkan ulasan/testimoni lengkap dengan rating bintang dan inisial profil penulis.
- `image`: Menampilkan kartu bersampul penuh dengan label/badge mengambang.
- `feature`: Menampilkan grid list fitur (side-by-side icon & text description).
- `glass`: Kartu transparan bergaya modern (glassmorphism) dengan backdrop blur reaktif.

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `variant` | `String` | `"service"` | `"service"`, `"blog"`, `"pricing"`, `"review"`, `"image"`, `"feature"`, `"glass"` |
| `title` | `String` | `""` | Judul kartu. |
| `description` | `String` | `""` | Deskripsi atau konten teks. |
| `image` | `String` | `null` | URL path ke cover gambar (khusus variant `image` & `blog`). |
| `price` | `String` | `null` | Harga terformat (khusus variant `pricing`). |
| `features` | `Array` | `null` | Daftar benefit (khusus variant `service` & `pricing`). |
| `rating` | `Number` | `null` | Rating bintang 1-5 (khusus variant `review`). |
| `author` | `String` | `null` | Nama pembuat/peninjau (khusus variant `blog` & `review`). |
| `category` | `String` | `null` | Tag kategori blog (khusus variant `blog`). |
| `tag` | `String` | `null` | Badge melayang di atas gambar (khusus variant `image`). |
| `customClass` | `String` | `""` | Modifikasi layout kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Card/Card.njk" as c %}

<!-- Pricing Card -->
{{ c.Card(
  variant="pricing",
  title="Enterprise Plan",
  price="Rp 4.500.000",
  description="Untuk kebutuhan agensi besar skala nasional.",
  features=["Integrasi AI OS Penuh", "SLA Dukungan 24/7", "Domain Kustom", "100 Halaman Kota"]
) }}

<!-- Review Card -->
{{ c.Card(
  variant="review",
  description="Framework tercepat yang pernah kami pakai. Konversi iklan naik pesat!",
  rating=5,
  author="Hendra Wijaya"
) }}
```
