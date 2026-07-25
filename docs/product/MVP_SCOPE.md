# MVP Scope - ARSAR Studio

Dokumen ini mendefinisikan batasan cakupan produk minimum (**Minimum Viable Product**) menggunakan metode prioritas **MoSCoW**.

---

## Tabel Skala Prioritas MoSCoW

| Prioritas | Fitur Cakupan | Deskripsi Teknis |
| :--- | :--- | :--- |
| **Must Have** | Runtime Kernel | Inti modul manager dan service container (DI). |
| | Config & Theme Loader | Membaca JSON token dan setelan warna hex menjadi CSS Variables. |
| | 9 Komponen Dasar UI | Makro Nunjucks Button, Card, Input, Badge, Modal, Alert, Typography, Loading, IconWrapper. |
| | Schema Registry & Validator | Validasi format email, URL, dan path field salah secara realtime. |
| | Static Compiler (Vite + Tailwind v4) | Mengompilasi dan minifikasi HTML/CSS menjadi folder static `/dist`. |
| **Should Have** | Local SEO Target City Generator | Peta target kota local SEO otomatis (mengacu `cities.json`). |
| | Schema JSON-LD Generator | Injeksi otomatis FAQPage, Organization, LocalBusiness, Breadcrumb. |
| | Deployment Connector | Integrasi deploy otomatis sekali klik ke Cloudflare Pages. |
| | GUI Config & Visual Playground | Simulator viewports responsif dan token inspector untuk visual preview. |
| **Could Have** | AI Copywriter Assistant | Penyusunan draf teks hero, benefits, pricing via prompt. |
| | Web-based Local CMS Dashboard | Dasbor web lokal (Electron / local Node GUI) untuk editing non-dev. |
| | RSS & XML Feed Compiler | Generator otomatis sebaran RSS berita blog. |
| **Won't Have Yet** | Multi-tenant SaaS Cloud Host | Hosting server awan bersama berbayar (ARSAR Cloud SaaS). |
| | Real-time Collaborative Editing | Kolaborasi pengeditan berkas bersamaan antar pengguna. |
| | Drag and Drop Visual Composer | Penyusunan tata letak layout secara seret-lepas (*drag and drop*). |
