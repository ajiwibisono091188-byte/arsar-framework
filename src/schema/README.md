# ARSAR Data Contract Engine

Platform **ARSAR AI Marketing OS v2.0** menerapkan **AI Native Data Contract Engine** di mana struktur data aplikasi dipisahkan secara tegas dari struktur optimasi pencarian (SEO). Ini menjamin keterbacaan data yang bersih untuk model AI, fleksibilitas integrasi, serta kecepatan kompilasi statis.

---

## 1. Perbedaan Utama: Application Schema vs SEO Schema

| Aspek | Application Schema (`src/schema/app/`) | SEO Schema (`src/schema/seo/`) |
| :--- | :--- | :--- |
| **Tujuan** | Mendefinisikan kontrak data konfigurasi web dan seksi marketing (misal: layout, profile company, contact form). | Mendefinisikan struktur data untuk crawler pencarian Google (JSON-LD markup). |
| **Keterbacaan** | Dibaca oleh Core Loader, Validator, dan Nunjucks untuk disajikan ke pengguna. | Dibaca oleh mesin pencari Google (Structured Data). |
| **Format** | JSON Schema standar lengkap dengan metadata versioning (`deprecated`, `compatibleSince`). | Template Nunjucks JSON-LD (misal: `Article.json`, `FAQ.json`). |
| **Output** | Object data internal yang dinormalisasi. | Tag `<script type="application/ld+json">` yang disuntikkan ke `<head>`. |

---

## 2. Struktur Arsitektur Engine

```text
src/schema/
├── app/                    # 18 Application Schema JSON
├── seo/                    # 6 SEO Schema JSON-LD (relocated)
├── registry/               # Modul Registry terpusat
├── compiler/               # Modul Compiler Normalizer
├── migrations/             # Blueprint migrasi versi
├── validators/             # Generic schema validator
├── tests/                  # Unit Test suite (Registry, Validator, Loader)
└── examples/               # File JSON data contoh yang valid
```

---

## 3. Komponen Utama Engine

### A. Schema Registry (`src/schema/registry/schema-registry.js`)
Registry adalah wadah memori tunggal (*single registry*) tempat mendaftarkan skema aktif secara dinamis. Modul ini memindai folder `/app/` secara otomatis saat inisialisasi awal.
```javascript
import { registry } from './src/schema/registry/schema-registry.js';

// Mendaftarkan skema baru
registry.register('custom', customSchemaJSON);

// Mengambil skema
const siteSchema = registry.get('site');
```

### B. Validator Generik (`src/schema/validators/schema-validator.js`)
Validator generik yang ditenagai oleh Registry. Modul ini melakukan audit tipe data, field wajib (*required*), format email/URL, dan pola regex untuk mengembalikan status kevalidan beserta koordinat path yang salah.
```javascript
import { validateAppSchema } from './src/schema/validators/schema-validator.js';

const result = validateAppSchema('site', dataPayload);
if (!result.isValid) {
  console.log(result.errors); // Menampilkan letak path field salah (e.g. "site.url")
}
```

### C. Schema Compiler (`src/schema/compiler/schema-compiler.js`)
Compiler bertugas menyelaraskan (*normalize*) input data sebelum diolah modul lain:
- Menyuntikkan nilai `default` yang didefinisikan skema jika field kosong.
- Melakukan pemotongan spasi teks (*trimming whitespace*) pada string.
- Mengubah tipe data string numeric menjadi tipe `number` sejati.
- Mengubah nilai string `"true"`/`"false"` menjadi boolean sejati.

```javascript
import { SchemaCompiler } from './src/schema/compiler/schema-compiler.js';

const cleanData = SchemaCompiler.compile('site', rawDirtyData);
```

### D. Migration Manager (`src/schema/migrations/migration-manager.js`)
Menyediakan kerangka/blueprint alur transisi data jika terjadi pembaruan versi skema di masa depan (misal: memetakan field usang ke nama field baru dari `v1` &rarr; `v2` &rarr; `v3`).
