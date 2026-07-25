# Components Directory

Direktori ini berisi komponen-komponen antarmuka (UI components) yang dapat digunakan kembali (reusable) di berbagai layout dan halaman.

## Pedoman Pembuatan Komponen
1. **Pola Folder**: Setiap komponen diletakkan di dalam foldernya sendiri (misal: `Navbar/`) dan wajib memiliki:
   - File template Nunjucks (misal: `Navbar.njk`) berisi markup dasar dan variabel Nunjucks.
   - File `README.md` yang menjelaskan props, behavior (misal: event listener Alpine.js), dan cara pakainya.
2. **Desain Modular**: Manfaatkan utilitas TailwindCSS v4 dan state reaktif Alpine.js di dalam file template.
3. **Pemisahan Logika**: Kode JavaScript yang menggerakkan logika komponen terdaftar global di `src/assets/js/app.js` sebagai data-model Alpine.js agar performa runtime tetap cepat.
