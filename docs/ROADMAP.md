# ARSAR AI Marketing OS v2.0 - Product Roadmap

Dokumen ini memetakan peta jalan (*roadmap*) pengembangan proyek dari fondasi awal hingga rilis stabil versi **v1.0.0 (Production Ready)**.

---

## Ringkasan Milestone & Status Sprint

| Milestone / Sprint | Scope Kerja | Status | Target Versi |
| :--- | :--- | :--- | :--- |
| **Sprint 1: Foundation** | Setup Vite, Tailwind v4, Nunjucks, folder structure. | **COMPLETED** | `v0.1.0` |
| **Sprint 2A: Design System** | Token atomik JSON, Theme Loader, 9 komponen dasar. | **COMPLETED** | `v0.2.0` |
| **Sprint 2B: Config Engine** | 14 default JSON, validator, cached loader, overrides. | **COMPLETED** | `v0.3.0` |
| **Sprint 2B.0: Governance** | Dokumentasi arsitektur, standar coding, template GitHub. | **IN PROGRESS** | `v0.4.0` |
| **Sprint 3: Content Engine** | Integrasi parser Markdown, front-matter, & RSS feed. | **BACKLOG** | `v0.5.0` |
| **Sprint 4: SEO Engine** | Otomatisasi sitemap, robot, local SEO multi-city. | **BACKLOG** | `v0.6.0` |
| **Sprint 5: Generator Engine** | Pipeline build kustom, hot-reloading templates. | **BACKLOG** | `v0.7.0` |
| **Sprint 6: Component Library** | Penambahan 18 komponen marketing (Timeline, FAQ, dll). | **BACKLOG** | `v0.8.0` |
| **Sprint 7: Landing Composer** | AI-Composer untuk otomatisasi perakitan landing page. | **BACKLOG** | `v0.9.0` |
| **Sprint 8: Dashboard & CMS** | GUI web lokal untuk pengisian konten non-developer. | **BACKLOG** | `v0.9.5` |
| **Sprint 9: Deployment** | Integrasi CI/CD Cloudflare Pages & Vercel. | **BACKLOG** | `v0.9.8` |
| **Sprint 10: Testing & QA** | E2E Playwright tests, Lighthouse audits optimization. | **BACKLOG** | `v0.9.9` |
| **Sprint 11: Release v1.0** | Stabilisasi final, dokumentasi API, rilis produksi. | **BACKLOG** | `v1.0.0` |

---

## Detail Ekspektasi Setiap Sprint

### 1. Sprint Foundation (`v0.1.0`)
Membangun fondasi dasar kerangka kerja static web dengan Vite, TailwindCSS v4, Alpine.js, dan folder modular Nunjucks.

### 2. Sprint Design System (`v0.2.0`)
Mengekstrak seluruh parameter visual (warna, margin, radius, font) ke dalam 11 Design Tokens JSON dan menyajikannya secara aman ke CSS variables.

### 3. Sprint Config Engine (`v0.3.0`)
Membangun cached config loader yang mendukung deep merging default configurations, project-specific overrides, dan environment values.

### 4. Sprint Governance (`v0.4.0`)
Menyusun pedoman kontribusi, standar penamaan file/commit, pull request templates, dan panduan arsitektur Mermaid.

### 5. Sprint Content Engine (`v0.5.0`)
Memproses dynamic markdown untuk halaman blog, mengintegrasikan parser metadata YAML (front-matter), dan membuat generator RSS feed XML otomatis.

### 6. Sprint SEO Engine (`v0.6.0`)
Otomatisasi indexing meta tags dan kompilasi template Schema.org JSON-LD (LocalBusiness, Organization, Breadcrumb, Article) secara presisi.

### 7. Sprint Release v1.0 (`v1.0.0`)
Menjalankan audit akhir Core Web Vitals untuk menjamin performa Lighthouse di atas target minimum (Performance >=98, SEO 100).
