# ARSAR AI Marketing OS v2.0 - Plugin System Specification

Dokumen ini mendefinisikan rancangan arsitektur sistem plugin (*plug-and-play plugin architecture*). Plugin memungkinkan pengembang untuk memperluas kemampuan Generator Engine tanpa perlu memodifikasi kode inti (*Core Layer*).

---

## 1. Arsitektur Berbasis Kait (Hooks / Lifecycle Architecture)

Generator Engine menyediakan beberapa kait (*lifecycle hooks*) tempat plugin dapat menyisipkan fungsi logika kustom:

```text
Build Commenced (beforeBuild)
      ↓
Data Loaded & Merged
      ↓
Data Normalized (onDataNormalized)
      ↓
SEO & Schemas Compiled (onSchemaGenerated)
      ↓
HTML Rendered (onHtmlRendered)
      ↓
HTML Exported to Filesystem (afterBuild)
```

---

## 2. Kelas Dasar Plugin (Base Plugin Class)

Setiap plugin harus berupa ES Module yang mengekspor class atau object dengan antarmuka (*interface*) berikut:

```javascript
/**
 * Interface Dasar Plugin ARSAR
 */
export class ArsarPlugin {
  constructor(options = {}) {
    this.name = 'arsar-base-plugin';
    this.options = options;
  }

  // Dieksekusi sebelum proses build dimulai
  beforeBuild(config) { return config; }

  // Dieksekusi setelah pembersihan slug / normalisasi data selesai
  onDataNormalized(data) { return data; }

  // Dieksekusi setelah schema JSON-LD selesai dirakit
  onSchemaGenerated(schema, context) { return schema; }

  // Dieksekusi setelah Nunjucks selesai merender HTML, sebelum disimpan ke file
  onHtmlRendered(html, filename) { return html; }

  // Dieksekusi setelah seluruh file HTML statis sukses ditulis
  afterBuild() {}
}
```

---

## 3. Registrasi Plugin (Plugin Register)

Di dalam konfigurasi build (`vite.config.js` atau skrip generator utama), plugin didaftarkan melalui array:

```javascript
import { SEOPlugin } from './plugins/seo-plugin.js';
import { CRMPlugin } from './plugins/crm-plugin.js';

const plugins = [
  new SEOPlugin({ minifyHtml: true }),
  new CRMPlugin({ crmProvider: 'hubspot' })
];

// Loop hooks saat build berjalan:
// plugins.forEach(plugin => plugin.beforeBuild(config));
```

---

## 4. Contoh Implementasi Plugin Kustom

### A. SEO Plugin (Minifier & Alt-Tag Injector)
Menyisipkan tag `alt` otomatis pada gambar yang tidak memiliki alternatif deskripsi untuk meloloskan Accessibility audit.
```javascript
export class SEOPlugin {
  constructor() {
    this.name = 'arsar-seo-plugin';
  }

  onHtmlRendered(html, filename) {
    console.log(`[SEO Plugin] Optimizing image alt tags for ${filename}...`);
    // Cari tag <img> yang tidak memiliki alt dan beri default alt berdasarkan nama file
    return html.replace(/<img((?![^>]*\balt\b)[^>]*)\/?>/g, '<img$1 alt="Gambar Arsar Digital" />');
  }
}
```

### B. CRM Plugin (Lead Routing Integration)
Mengirimkan data lead dari formulir statis ke CRM eksternal saat aksi pengiriman dipicu.
```javascript
export class CRMPlugin {
  constructor(options) {
    this.name = 'arsar-crm-plugin';
    this.webhookUrl = options.webhookUrl;
  }

  afterBuild() {
    console.log(`[CRM Plugin] Webhook integration configured for: ${this.webhookUrl}`);
  }
}
```
