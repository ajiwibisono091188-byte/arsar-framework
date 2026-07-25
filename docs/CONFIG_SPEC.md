# ARSAR Config Engine - Configuration Schema Specifications

Dokumen ini mendefinisikan spesifikasi skema JSON formal untuk 9 berkas konfigurasi utama **ARSAR Config Engine**.

---

## 1. site.json
Mengatur setelan global aksesibilitas situs.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `title` | `String` | **Required** | Judul situs web utama. |
| `url` | `String` | **Required** | Alamat domain lengkap (wajib format URL valid). |
| `language` | `String` | **Required** | Kode bahasa ISO 639-1 (misal: `"id"`, `"en"`). |
| `version` | `String` | Optional | Versi rilis framework saat ini. |

*Contoh:*
```json
{
  "title": "Arsar Digital",
  "url": "https://arsardigital.com",
  "language": "id",
  "version": "2.0.0"
}
```

---

## 2. company.json
Profil legalitas perusahaan penunjang metadata Schema.org.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | `String` | **Required** | Nama brand utama. |
| `legalName` | `String` | **Required** | Nama resmi berbadan hukum (PT/CV). |
| `email` | `String` | **Required** | Email kontak utama (wajib format email valid). |
| `phone` | `String` | **Required** | Nomor telepon resmi. |
| `address` | `Object` | **Required** | Alamat fisik lengkap (streetAddress, postalCode, dll). |

---

## 3. theme.json
Token penentu skema warna dasar visual global.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `name` | `String` | Optional | Nama identitas tema warna. |
| `primaryColor` | `String` | **Required** | Warna primer dominan format HEX (misal: `"#8b5cf6"`). |
| `secondaryColor` | `String` | **Required** | Warna sekunder aksen format HEX. |
| `darkMode` | `Boolean` | **Required** | Mengaktifkan rendering tema gelap bawaan. |

---

## 4. tracking.json
Konfigurasi pixel pelacak dan analitik pengunjung.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `googleAnalytics.enabled` | `Boolean` | **Required** | Mengaktifkan tracking Google Analytics. |
| `googleAnalytics.measurementId` | `String` | Optional | ID pengukur GA4 (misal: `"G-XXXXXXXXXX"`). |
| `facebookPixel.enabled` | `Boolean` | **Required** | Mengaktifkan tracking Facebook Pixel. |
| `facebookPixel.pixelId` | `String` | Optional | ID pixel iklan Facebook. |

---

## 5. forms.json
Endpoint penangkap data formulir pemasar.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `contactForm.submitEndpoint` | `String` | **Required** | URL target submit formulir kontak (POST). |
| `contactForm.method` | `String` | **Required** | HTTP Method yang digunakan (default: `"POST"`). |
| `contactForm.fields` | `Array` | **Required** | List input name yang divalidasi. |

---

## 6. landing.json
Toggle keaktifan seksi (*marketing sections*) di halaman pendaratan.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `featuresBlockEnabled` | `Boolean` | **Required** | Menampilkan seksi daftar fitur produk. |
| `testimonialsBlockEnabled` | `Boolean` | **Required** | Menampilkan seksi ulasan pelanggan. |
| `faqBlockEnabled` | `Boolean` | **Required** | Menampilkan seksi tanya-jawab (FAQ). |

---

## 7. navigation.json
Susunan data tautan untuk menu interaktif.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `header` | `Array<Object>` | **Required** | Daftar menu bar bagian atas `{ label, path }`. |
| `footer` | `Array<Object>` | **Required** | Daftar menu footer bagian bawah. |

---

## 8. ads.json
Setelan dinamis tracking konversi untuk traffic berbayar (Paid Ads).

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `utmTrackingEnabled` | `Boolean` | **Required** | Mengharuskan parsing parameter UTM di browser. |
| `dynamicParameters` | `Object` | **Required** | Mapping keyword custom dari Google/Facebook Ads. |

---

## 9. deployment.json
Konfigurasi target pipeline rilis static file.

| Properti | Tipe | Status | Deskripsi |
| :--- | :--- | :--- | :--- |
| `provider` | `String` | **Required** | Nama penyedia CDN hosting. |
| `buildDir` | `String` | **Required** | Folder target kompilasi (default: `"dist"`). |
| `cleanUrls` | `Boolean` | **Required** | Menghapus ekstensi file `.html` pada routing situs. |
