# Modal Component

Komponen dialog pop-up (Modal) serbaguna. Menggunakan mekanisme `caller()` Nunjucks untuk menampung konten HTML masukan secara dinamis dan didukung fungsionalitas reaktif Alpine.js.

## Sizes
- `small`: Maksimal lebar `max-w-sm` (cocok untuk prompt alert / konfirmasi).
- `medium`: Maksimal lebar `max-w-lg` (default).
- `large`: Maksimal lebar `max-w-3xl` (cocok untuk formulir besar / galeri).
- `fullscreen`: Memenuhi layar penuh (`w-full h-full`) dengan sudut siku (no border radius).

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `title` | `String` | *(Required)* | Judul panel modal. |
| `size` | `String` | `"medium"` | `"small"`, `"medium"`, `"large"`, `"fullscreen"` |
| `id` | `String` | *(Required)* | ID unik untuk merujuk event trigger. |

## Mekanisme Pemicu (Trigger)
Modal dapat dibuka dengan mengirimkan event kustom `open-modal-[ID]` ke tingkat window.

Contoh:
```html
<button @click="$dispatch('open-modal-form-kontak')">Buka Formulir</button>
```

## Contoh Penggunaan
```nunjucks
{% import "design/components/Modal/Modal.njk" as mdl %}

{% call mdl.Modal(title="Syarat Ketentuan", size="large", id="syarat-modal") %}
  <p>Berikut adalah syarat dan ketentuan penggunaan platform kami...</p>
  <div class="mt-6 flex justify-end">
    <button @click="open = false" class="px-4 py-2 bg-gray-800 text-white rounded">Saya Mengerti</button>
  </div>
{% endcall %}
```

## Aksesibilitas (A11y)
- Menyematkan atribut `role="dialog"` dan `aria-modal="true"`.
- Mendengarkan tombol **Escape** (`@keydown.escape.window`) untuk menutup otomatis.
- Menutup saat mengetuk bagian di luar modal (backdrop blur mask).
