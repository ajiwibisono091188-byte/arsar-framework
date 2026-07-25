# Alert Component

Komponen spanduk notifikasi (Alert) untuk memberikan umpan balik visual terkait tindakan pengguna atau status sistem.

## Variants
- `info`: Informasi sistem umum (biru).
- `success`: Keberhasilan aksi (hijau).
- `warning`: Tindakan penting / peringatan (kuning).
- `danger`: Kesalahan kritis / galat (merah).

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `message` | `String` | *(Required)* | Teks isi notifikasi (menerima HTML aman). |
| `variant` | `String` | `"info"` | `"info"`, `"success"`, `"warning"`, `"danger"` |
| `dismissible` | `Boolean` | `true` | Menampilkan tombol silang untuk menutup alert (menggunakan Alpine.js). |
| `id` | `String` | `null` | Id HTML unik. |
| `customClass` | `String` | `""` | Kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/Alert/Alert.njk" as alr %}

<!-- Success Alert -->
{{ alr.Alert(message="Akun Anda berhasil didaftarkan!", variant="success") }}

<!-- Critical Error Alert -->
{{ alr.Alert(message="Koneksi terputus. Silakan coba kembali.", variant="danger", dismissible=false) }}
```
