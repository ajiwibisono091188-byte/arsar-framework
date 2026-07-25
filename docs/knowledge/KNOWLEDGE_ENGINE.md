# Conversion Knowledge Engine Specification - ARSAR Studio

Conversion Knowledge Engine bertindak sebagai otak penyedia teori, struktur konversi, dan parameter segmentasi industri pemasaran untuk memandu kecerdasan AI Content Engine.

---

## 1. Arsitektur Komponen

### KnowledgeEngine (`src/knowledge/engine/knowledge-engine.js`)
Pusat kendali muat database industri (.json), ekstraksi list parameter (painpoints, benefits, offers), dan emitter sinyal event.

### FrameworkLibrary (`src/knowledge/frameworks/framework-library.js`)
Mengelola data terstruktur 10 kerangka kerja penulisan naskah iklan/landing page konversi tinggi.

### KnowledgeSearch (`src/knowledge/engine/knowledge-engine.js`)
Helper pencarian parameter data industri berdasarkan query (kata kunci, painpoint, dll).

### KnowledgeScorer (`src/knowledge/scoring/knowledge-scorer.js`)
Mengalkulasikan keselarasan relevansi (nilai 0 - 100) antara brief proyek pengguna dengan profile database industri.

### KnowledgeValidator (`src/knowledge/validation/knowledge-validator.js`)
Pengaudit format keutuhan berkas JSON industri, memastikan integritas id unik, kelengkapan kolom wajib, dan validasi silang kode framework.

---

## 2. Event Broker Signal

Engine memancarkan sinyal asinkronus ke EventBus:
- `knowledge.loaded`: Dipancarkan setelah folder `/industry/` berhasil dipindai dan dimuat ke memori.
- `knowledge.searched`: Dipancarkan setelah kueri pencarian database dijalankan.
