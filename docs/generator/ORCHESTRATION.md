# Orchestration Layer - Landing Generator

Landing Generator memanfaatkan pola **Dependency Injection (DI)** untuk membebaskan kopling antar modul engine.

---

## 1. Resolusi Dependency Container

LandingGenerator dilarang keras membuat instansi kelas (`new AIEngine()`) secara manual. Seluruh pemanggilan diselesaikan menggunakan referensi kontainer:

```javascript
// Resolusi instansi terdaftar dari Service Container
const ai = this.container.resolve('ai-engine');
const pipeline = this.container.resolve('pipeline-engine');
```

---

## 2. Keuntungan Pola DI

- **Modular**: Mempermudah penggantian implementasi (misal mengganti `PipelineEngine` dengan `WebpackCompilerEngine` di masa depan).
- **Testable**: Membantu perakitan Mock Test (menyuplai mock engine palsu saat unit testing berjalan).
