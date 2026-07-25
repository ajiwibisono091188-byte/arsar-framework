# Experience Composer Specification - ARSAR Studio

Experience Composer bertindak sebagai lapisan orkestrasi (*orchestration layer*) yang menyatukan profil proyek, teori basis data Knowledge Engine, dan instruksi copywriting AI untuk merakit struktur Page Blueprint.

---

## 1. Arsitektur Komponen

### ExperienceComposer (`src/composer/engine/experience-composer.js`)
Lapisan utama yang mengendalikan alur evaluasi, perakitan array seksi, dan audit validator blueprint sebelum dialirkan ke Renderer.

### LayoutRegistry (`src/composer/layouts/layout-registry.js`)
Menampung standardisasi layout visual (`single-column`, `split`, `card-grid`, `alternating`, `minimal`).

### StrategyRegistry (`src/composer/strategies/strategy-registry.js`)
Pusat registrasi taksonomi strategi konversi iklan (Lead Gen, Local Business, Conversion).

### SectionLibrary (`src/composer/sections/section-library.js`)
Katalog metadata seksi global pendukung halaman statis (Hero, Benefits, Testimonials, CTA, Footer).

### RuleEngine (`src/composer/rules/rule-engine.js`)
Pengevaluasi logika pemasaran kondisional dinamis (IF context &rarr; THEN actions).

### BlueprintValidator (`src/composer/validation/blueprint-validator.js`)
Pengaudit kelayakan data blueprint, duplikasi seksi, dan urutan letak prioritas seksi (LIFO/sorting order).

---

## 2. Event Emitter Signal

Composer memancarkan sinyal asinkronus ke EventBus:
- `composer.started`: Dipancarkan saat proses pengolahan komposisi dimulai.
- `composer.strategy.selected`: Dipancarkan sesaat setelah strategi terhitung selesai dipilih.
- `composer.blueprint.created`: Dipancarkan saat perakitan objek blueprint mentah selesai dirangkai.
- `composer.validation.completed`: Dipancarkan setelah status audit validator selesai keluar.
