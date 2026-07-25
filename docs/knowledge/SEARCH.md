# Search System - Conversion Knowledge Engine

KnowledgeSearch memfasilitasi pencarian taksonomi dan kueri relasional lintas industri pemasaran di dalam **ARSAR Studio**.

---

## 1. Parameter Kueri Pencarian

Pencarian dilakukan secara case-insensitive menggunakan properti:
- **industry**: Mencari kecocokan nama kategori industri (e.g. `automotive`).
- **keyword**: Mencari kata kunci lokal SEO (e.g. `bpkb`).
- **painpoint**: Mencari keluhan spesifik di database.
- **offer**: Mencari promo yang sesuai.
- **framework**: Menyaring industri yang direkomendasikan memakai framework tertentu (e.g. `pas`).

---

## 2. Contoh Pemanggilan API

```javascript
import { KnowledgeEngine } from './src/knowledge/engine/knowledge-engine.js';

const engine = new KnowledgeEngine();

// Mencari industri yang merekomendasikan kerangka "PAS"
const matches = engine.search({ framework: 'pas' });
```
