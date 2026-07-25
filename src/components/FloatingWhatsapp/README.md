# FloatingWhatsapp Component

Tombol melayang WhatsApp (floating action button) di sudut kanan bawah halaman.

## Mekanisme
- **Dynamic URL Building**: Menggunakan javascript dari `src/assets/js/whatsapp.js` untuk secara dinamis menghasilkan pesan WhatsApp dengan append detail URL halaman saat ini dan UTM tracking parameters (`utm_source`, `utm_medium`, `utm_campaign`).
- ** Bounce Animation**: Memakai class animasi bounce bawaan TailwindCSS v4 agar menarik perhatian secara visual.
