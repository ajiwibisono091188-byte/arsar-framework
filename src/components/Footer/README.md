# Footer Component

Komponen penutup halaman (footer) terstruktur. Berisi empat kolom yang menyajikan profil singkat agensi, navigasi tautan penting, menu layanan, informasi alamat lengkap, dan tautan kebijakan privasi serta hak cipta.

## Fitur & SEO
- **Semantic Tag**: Menggunakan tag semantic HTML5 `<footer>` untuk meningkatkan skor Accessibility dan SEO.
- **Dynamic Context**: Membaca data sosial media dan informasi alamat langsung dari file config perusahaan (`company.json`).

## Props/Variabel Nunjucks
- `company`: Informasi data perusahaan.
- `navigation.footer`: Daftar navigasi footer (quick links, services, legal).
