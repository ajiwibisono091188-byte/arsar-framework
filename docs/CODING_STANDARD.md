# ARSAR AI Marketing OS v2.0 - Coding Standard

Dokumen ini mendefinisikan aturan gaya penulisan kode, penamaan berkas/folder, struktur pesan commit, dan tata kelola percabangan (*branching*) di Git untuk memastikan seluruh pengembang menulis kode dengan konsisten.

---

## 1. Konvensi Penamaan (Naming Conventions)

### A. Folder & File
- **Folder Umum & Aset**: Menggunakan format `kebab-case` (contoh: `src/design/tokens/`, `assets/css/`).
- **Folder Komponen**: Menggunakan format `PascalCase` (contoh: `src/components/Navbar/`, `src/components/ContactForm/`).
- **File Komponen Nunjucks**: Menggunakan format `PascalCase` berakhiran `.njk` (contoh: `Navbar.njk`).
- **File Script JavaScript**: Menggunakan format `kebab-case` (contoh: `landing-generator.js`, `theme-loader.js`), kecuali file index utama `app.js`.

### B. JavaScript (Functions, Variables, Classes)
- **Functions**: Menggunakan format `camelCase` diawali kata kerja (contoh: `loadConfig()`, `getWhatsAppUrl()`, `isValidEmail()`).
- **Variables**: Menggunakan format `camelCase` yang deskriptif (contoh: `cachedConfig`, `isMobileOpen`).
- **Classes**: Menggunakan format `PascalCase` (contoh: `ConfigLoader`, `ThemeManager`).

### C. JSON & Config Keys
- **JSON Files**: Menggunakan format `kebab-case` atau `camelCase` (contoh: `theme.json`, `company.json`).
- **JSON Keys**: Menggunakan format `camelCase` (contoh: `primaryColor`, `legalName`, `measurementId`).

### D. CSS & Stylesheets
- **CSS Files**: Menggunakan format `kebab-case` (contoh: `design-tokens.css`, `main.css`).
- **CSS Classes**: Menggunakan format `kebab-case` diawali namespace jika kustom (contoh: `form-input-custom`, `glow-card`, `btn-primary`).

---

## 2. Aturan Commit Git (Conventional Commits)

Seluruh pesan commit wajib mengikuti spesifikasi **Conventional Commits**:
```text
<type>(<scope>): <description>

[body]

[footer]
```

### Types yang Diizinkan:
- `feat`: Fitur baru (contoh: `feat(design): tambah komponen Button`)
- `fix`: Perbaikan bug (contoh: `fix(core): perbaiki validasi email salah`)
- `docs`: Pembaruan dokumentasi (contoh: `docs(arch): tambah diagram dataflow`)
- `style`: Perubahan visual / formatting kode tanpa mengubah logika (Prettier)
- `refactor`: Restrukturisasi kode tanpa menambah fitur / perbaikan bug
- `test`: Menambahkan atau memperbaiki pengujian (Playwright/Jest)
- `chore`: Pembaruan konfigurasi build, tooling, atau library dependency

---

## 3. Tata Kelola Branch & Pull Request

### A. Struktur Branch Git
- `main`: Branch produksi yang stabil. Hanya menerima merge dari `develop` melalui Pull Request.
- `develop`: Branch integrasi pengembangan utama.
- `feature/[nama-fitur]`: Untuk pembuatan fitur baru (contoh: `feature/content-engine`). Dibuat dari `develop`.
- `bugfix/[deskripsi-bug]`: Untuk perbaikan bug pada develop.
- `hotfix/[deskripsi-hotfix]`: Untuk perbaikan kritis langsung pada `main`.

### B. Aturan Pull Request (PR Rules)
Sebelum mengajukan PR ke branch `develop` atau `main`, pengembang wajib memastikan:
1. **Linting & Formatting Passed**: Jalankan `npm run lint` dan `npm run format` tanpa error.
2. **Build Success**: Jalankan `npm run build` untuk memverifikasi file HTML statis terkompilasi dengan lancar.
3. **No Hardcoding**: Memastikan tidak ada hex warna atau spacing pixel yang ditulis langsung (harus merujuk ke token CSS variables).
4. **Documentation**: Melampirkan/memperbarui file `README.md` pada komponen atau modul yang dimodifikasi.
