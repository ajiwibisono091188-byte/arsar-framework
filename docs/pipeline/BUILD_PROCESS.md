# Build Process Workflow - Production Pipeline

Alur kerja perakitan website statis dari penulisan brief di editor hingga menjadi aset web siap deploy:

```text
  1. Trigger Build (PipelineEngine.build)
             ↓
  2. Bersihkan file build lama (clean)
             ↓
  3. Muat berkas JSON dari Project Engine (ProjectLoader.load)
             ↓
  4. Susun cetak biru halaman via Experience Composer (composer.compose)
             ↓
  5. Compile HTML layouts & inject sections via Renderer
             ↓
  6. Generate robots.txt, sitemap.xml, & script JSON-LD via SEO generator
             ↓
  7. Compile & salin CSS, JS, manifest.json via Asset Pipeline
             ↓
  8. Verifikasi kelengkapan output (validate)
             ↓
  [ Website Tayang /dist/ ]
```
