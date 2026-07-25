# Screen Flow Map - ARSAR Studio

Dokumen ini menjelaskan peta alur perpindahan antarmuka (*wireflow screen transitions*) di dalam aplikasi **ARSAR Studio**.

---

## Diagram Perpindahan Antarmuka (Screen Transitions Flow)

```mermaid
graph TD
    Login[1. Login / Welcome Screen] -->|Auth Success| Dashboard[2. Main Dashboard]
    
    Dashboard -->|Pilih Proyek| ProjectList[3. Projects List]
    Dashboard -->|Proyek Baru| ProjectCreate[4. Create Project Form]
    
    ProjectList -->|Buka Editor| Editor[5. Project Workspace Editor]
    ProjectCreate -->|Submit| Editor
    
    Editor -->|Edit Profile| CompanyForm[5.1. Company & Theme Form]
    Editor -->|Tanya AI| AIGenerator[5.2. AI Copywriter Panel]
    Editor -->|Kelola Konten| BlogEditor[5.3. Blog Markdown Editor]
    
    CompanyForm -->|Simpan| Preview[6. Real-time Preview Simulator]
    AIGenerator -->|Apply| Preview
    BlogEditor -->|Simpan| Preview
    
    Preview -->|Uji Breakpoint| MobileView[6.1. Mobile/Tablet Viewports]
    Preview -->|Cek Variabel| TokenInspector[6.2. Token Inspector Panel]
    
    Preview -->|Mulai Ekspor| GeneratorRun[7. HTML static generator runner]
    GeneratorRun -->|Build Success| DeployScreen[8. Deployment Screen]
    
    DeployScreen -->|Picu Publish| CloudflareDeploy[8.1. Cloudflare deployment logs]
    CloudflareDeploy -->|Deploy Done| AnalyticsScreen[9. Analytics & Leads Dashboard]
    
    AnalyticsScreen -->|Kembali ke Proyek| Dashboard
```

---

## Deskripsi Fungsional Setiap Antarmuka

1. **Main Dashboard**: Layar selamat datang menampilkan daftar proyek aktif terbaru, statistik kumulatif konversi leads, dan status deployment terakhir.
2. **Project Workspace Editor**: Area kerja utama yang dibagi menjadi tiga sub-panel: editor konfigurasi metadata, panel asisten AI, dan preview render instan.
3. **Real-time Preview Simulator**: Layar simulator responsivitas viewport (Desktop, Tablet, Mobile) yang menyimulasikan layout komponen makro Nunjucks terikat variabel token CSS.
4. **Token Inspector Panel**: Panel inspeksi untuk melihat daftar variabel CSS Custom Properties aktif beserta nilainya.
5. **Deployment Screen**: Menampilkan status build log, visualisasi progress loading bar upload aset ke CDN, dan URL tautan resmi setelah deploy berhasil.
6. **Analytics & Leads Dashboard**: Menampilkan grafik jumlah pengunjung mingguan, rekaman leads formulir kontak masuk, dan klik tombol WhatsApp.
