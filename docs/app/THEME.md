# Theme System - Application Shell

Theme System memfasilitasi penyesuaian visual antarmuka pengembang studio demi kenyamanan durasi kerja.

---

## 1. Mode yang Didukung

- **light**: Mode terang bersih.
- **dark**: Mode gelap hemat energi (mengurangi lelah mata).
- **system**: Menyelaraskan secara otomatis dengan setelan sistem operasi komputer pengguna (Windows/macOS dark-mode settings) menggunakan media query browser `(prefers-color-scheme: dark)`.

---

## 2. Integrasi DOM Class Mutation

Ketika preferensi dirubah, ThemeManager memutasi atribut class root HTML:
```html
<!-- Jika mode Gelap diaktifkan -->
<html class="dark">
```
Variabel Tailwind CSS v4 kustom akan secara otomatis mendeteksi selektor `.dark` untuk merubah warna background dan font teks seluruh panel studio secara instan.
