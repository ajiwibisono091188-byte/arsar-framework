# ARSAR Design System - Component Specifications

Dokumen ini mendefinisikan spesifikasi detail, props, variasi, aksesibilitas, responsivitas, dan contoh pemanggilan untuk 9 komponen dasar **ARSAR Design System**.

---

## 1. Button

- **Purpose**: Tombol interaktif untuk aksi utama/sekunder pengguna (CTA, formulir submit, dll).
- **Variants**:
  - `primary`: Warna primer ungu solid.
  - `secondary`: Warna sekunder hijau solid.
  - `outline`: Transparan dengan border ungu.
  - `ghost`: Transparan penuh, hover tipis.
  - `success` / `danger` / `warning`: Warna status semantik.
- **Props**:
  - `label` (`String`): Teks tombol.
  - `variant` (`String`): Varian warna (default: `"primary"`).
  - `size` (`String`): `"small"`, `"medium"`, `"large"`.
  - `disabled` (`Boolean`): Menonaktifkan tombol.
  - `loading` (`Boolean`): Menampilkan spinner memuat.
  - `fullWidth` (`Boolean`): Lebar 100%.
  - `icon` (`String`): Markup SVG ikon.
- **Accessibility**:
  - Menggunakan `aria-disabled="true"` saat nonaktif.
  - Menggunakan `aria-busy="true"` saat memuat.
  - Ring fokus terlihat jelas menggunakan `:focus-visible`.
- **Responsive Rules**: Menggunakan `fullWidth` otomatis pada layar mobile (`w-full md:w-auto`).
- **Example**:
  ```nunjucks
  {{ btn.Button(label="Daftar Sekarang", variant="primary", size="large") }}
  ```

---

## 2. Card

- **Purpose**: Kontainer informasi terstruktur untuk layanan, artikel, testimoni, atau paket harga.
- **Variants**: `service`, `blog`, `pricing`, `review`, `image`, `feature`, `glass`.
- **Props**:
  - `title` / `description` (`String`): Judul dan isi.
  - `image` (`String`): URL cover gambar.
  - `price` (`String`): Label harga.
  - `features` (`Array`): Benefit peluru checklist.
  - `rating` (`Number`): Jumlah bintang review.
  - `author` (`String`): Pembuat/peninjau.
- **Accessibility**: Judul menggunakan elemen heading semantik (`h3`/`h4`) dengan tautan jangkar yang memiliki label kontekstual.
- **Responsive Rules**: Tata letak grid pembungkus beralih dari 1 kolom (mobile) ke 3 kolom (desktop).
- **Example**:
  ```nunjucks
  {{ crd.Card(variant="service", title="SEO Engine", description="Optimasi Core Web Vitals.") }}
  ```

---

## 3. Input

- **Purpose**: Menangkap masukan teks, angka, berkas, atau pilihan dari pengguna.
- **Variants**: `text`, `email`, `number`, `phone`, `textarea`, `select`, `checkbox`, `radio`, `toggle`.
- **Props**:
  - `name` / `label` / `type` (`String`): Nama, label, dan tipe input.
  - `required` (`Boolean`): Wajib diisi.
  - `placeholder` / `value` (`String`): Pembimbing input.
  - `options` (`Array`): List `{ value, label }` (khusus select).
  - `error` (`String`): Pesan kesalahan validasi.
- **Accessibility**:
  - Tautan label terikat menggunakan `for="[id]"` dan `id="[id]"`.
  - Input bermasalah ditandai dengan `aria-invalid="true"`.
- **Responsive Rules**: Input mengambil porsi lebar 100% kontainer secara default di semua layar.
- **Example**:
  ```nunjucks
  {{ inp.Input(name="email", label="Email Kantor", type="email", required=true) }}
  ```

---

## 4. Badge

- **Purpose**: Label indikator status singkat, tag, atau kategori meta data.
- **Variants**: `primary`, `secondary`, `outline`, `success`, `danger`, `warning`.
- **Props**:
  - `label` (`String`): Teks di dalam badge.
- **Accessibility**: Menyediakan kontras warna teks dan latar belakang minimal 4.5:1 agar mudah dibaca oleh pembaca layar.
- **Responsive Rules**: Menggunakan ukuran font caption kecil (`text-xs`) statis di semua ukuran layar.
- **Example**:
  ```nunjucks
  {{ bdg.Badge(label="Promo Ramadan", variant="success") }}
  ```

---

## 5. Modal

- **Purpose**: Pop-up dialog mengambang untuk konfirmasi penting, formulir terpisah, atau panduan detail.
- **Variants**: `small`, `medium`, `large`, `fullscreen`.
- **Props**:
  - `title` (`String`): Judul modal.
  - `id` (`String`): ID penunjuk event pemicu (trigger).
- **Accessibility**:
  - Menyertakan atribut `role="dialog"` dan `aria-modal="true"`.
  - Fokus di-trap di dalam modal, tombol Escape menutup modal.
- **Responsive Rules**: Modal otomatis memenuhi layar penuh (`fullscreen` style) saat berada di layar mobile.
- **Example**:
  ```nunjucks
  {% call mdl.Modal(title="Formulir Lead", id="modal-lead") %}
    {{ inp.Input(name="user", label="Nama") }}
  {% endcall %}
  ```

---

## 6. Alert

- **Purpose**: Spanduk informasi atau umpan balik status tindakan (sukses/galat).
- **Variants**: `info`, `success`, `warning`, `danger`.
- **Props**:
  - `message` (`String`): Konten informasi notifikasi.
  - `dismissible` (`Boolean`): Menampilkan tombol X tutup.
- **Accessibility**: Menyertakan `role="alert"` agar langsung dibacakan oleh screen reader ketika muncul.
- **Responsive Rules**: Fleksibel menyesuaikan lebar kontainer pembungkusnya.
- **Example**:
  ```nunjucks
  {{ alr.Alert(message="Pesan Anda berhasil terkirim!", variant="success") }}
  ```

---

## 7. Typography

- **Purpose**: Menstandarkan ukuran font, tinggi baris, dan ketebalan huruf di seluruh halaman.
- **Variants**: `displayXl`, `displayLg`, `displayMd`, `h1`, `h2`, `h3`, `h4`, `h5`, `body`, `small`, `caption`.
- **Props**:
  - `text` (`String`): Konten teks.
  - `element` (`String`): Tag HTML kustom (misal: `"span"`).
  - `weight` (`String`): `"normal"`, `"medium"`, `"semibold"`, `"bold"`.
- **Accessibility**: Memelihara hierarki tag heading (`h1` s.d `h5`) yang terstruktur untuk indeksibilitas crawler.
- **Responsive Rules**: Menggunakan ukuran cairan fluid typography (misal: `text-4xl md:text-7xl` via token CSS variables).
- **Example**:
  ```nunjucks
  {{ typ.Typography(text="Konsultasi AI Gratis", variant="h2", weight="bold") }}
  ```

---

## 8. Loading

- **Purpose**: Penunjuk visual saat aset halaman dimuat atau data sedang dikirim.
- **Variants**: `spinner`, `dots`, `skeleton`.
- **Props**:
  - `size` (`String`): `"small"`, `"medium"`, `"large"` (khusus spinner).
- **Accessibility**: Menyertakan label bantu pembaca layar `aria-label="Memuat data..."`.
- **Responsive Rules**: Skala tetap di mobile/desktop untuk mencegah pergeseran layout.
- **Example**:
  ```nunjucks
  {{ ld.Loading(variant="dots") }}
  ```

---

## 9. Icon Wrapper

- **Purpose**: Pembungkus terstandar untuk ornamen visual / ikon SVG.
- **Variants**: `square`, `circle`, `glass`.
- **Props**:
  - `size` (`String`): `"small"`, `"medium"`, `"large"`.
- **Accessibility**: Ikon di dalam pembungkus disembunyikan menggunakan `aria-hidden="true"` karena bersifat dekoratif.
- **Responsive Rules**: Ukuran tetap (fixed aspect ratio) di seluruh breakpoint.
- **Example**:
  ```nunjucks
  {% call wrp.IconWrapper(variant="circle") %}
    ⚡
  {% endcall %}
  ```
