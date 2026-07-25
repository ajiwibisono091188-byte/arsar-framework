# Loading Component

Komponen layar pemuatan (loading screen overlay) global.

## Mekanisme
- **Page Load Listener**: Menggunakan listener event `load` di Alpine.js (`x-init`) untuk menutup layar loading setelah seluruh aset HTML/CSS/JS selesai dimuat oleh browser.
- **Spinning Keyframe**: Menggunakan class animasi spinner bawaan TailwindCSS (`animate-spin`) pada border spinner melingkar.
