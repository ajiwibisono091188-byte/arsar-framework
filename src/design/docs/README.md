# ARSAR Design System - Documentation Guidelines

Selamat datang di Dokumentasi Design System **ARSAR AI MARKETING OS v2.0**.

Sistem ini disusun menggunakan prinsip-prinsip Clean Architecture, DRY, dan KISS. Untuk memastikan tidak ada kebocoran desain (*design leakage*) dan menjamin skalabilitas, framework ini melarang keras *hardcoding* warna, radius border, bayangan (*shadow*), atau ketebalan huruf.

---

## 1. Desain Sistem Token (Design Tokens)
Token disimpan di dalam file JSON di folder `src/design/tokens/` dan dikompilasi oleh [theme-loader.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/theme-loader.js) menjadi CSS Custom Properties di [design-tokens.css](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/assets/css/design-tokens.css).

Berikut adalah pemetaan variabel CSS yang dihasilkan secara otomatis:
- **Warna**: `--color-[palette]-[shade]` (contoh: `--color-primary-600`, `--color-dark-background`)
- **Spacing**: `--spacing-[scale]` (contoh: `--spacing-md`, `--spacing-xl`)
- **Radius**: `--radius-[scale]` (contoh: `--radius-md`, `--radius-full`)
- **Shadow**: `--shadow-[scale]` (contoh: `--shadow-lg`, `--shadow-inner`)
- **Z-Index**: `--zindex-[layer]` (contoh: `--zindex-modal`, `--zindex-dropdown`)
- **Opacity**: `--opacity-[level]` (contoh: `--opacity-disabled`, `--opacity-glass`)
- **Typography Sizes**: `--font-size-[variant]` & `--line-height-[variant]` (contoh: `--font-size-displayXl`, `--font-size-body`)

---

## 2. Struktur Komponen (Nunjucks Macros)
Setiap komponen terletak di folder `src/design/components/` dan bertindak sebagai makro terisolasi. Mereka membaca variabel CSS Custom Properties di atas daripada menggunakan ad-hoc kelas utility hardcoded.

### Daftar Komponen
1. **Button**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Button/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Button/Button.njk)
2. **Card**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Card/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Card/Card.njk)
3. **Input**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Input/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Input/Input.njk)
4. **Typography**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Typography/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Typography/Typography.njk)
5. **Badge**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Badge/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Badge/Badge.njk)
6. **Alert**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Alert/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Alert/Alert.njk)
7. **Modal**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Modal/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Modal/Modal.njk)
8. **Loading**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Loading/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/Loading/Loading.njk)
9. **IconWrapper**: [README](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/IconWrapper/README.md) & [Template](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/design/components/IconWrapper/IconWrapper.njk)

---

## 3. Playground Komponen
Untuk melihat visualisasi dan berinteraksi dengan seluruh komponen di atas secara reaktif, Anda dapat mengakses halaman `/playground` setelah menjalankan server pengembangan atau melakukan build produksi.
- **Generator**: [playground-generator.js](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/playground/playground-generator.js)
- **Halaman Preview**: [playground/index.html](file:///c:/Users/aryo/Documents/Arsardigital/arsar-framework/src/playground/index.html)
