# Command Bus Pipeline & Middleware - Command Platform

Command Bus mengalirkan pemrosesan perintah melalui urutan middleware pembatas sebelum mengeksekusi logika perintah utama.

---

## 1. Skema Onion Middleware Pipeline

Aliran middleware berjalan berurutan masuk dan keluar secara terbalik:
```text
  Dispatch Command
        │
  ┌─────▼─────────────────────────┐
  │ Logging Middleware            │
  │   ┌───▼─────────────────────┐ │
  │   │ Validation Middleware   │ │
  │   │   ┌───▼─────────────────┐ │ │
  │   │   │ Performance MW      │ │ │
  │   │   │   ┌───▼───────────┐ │ │ │
  │   │   │   │ BaseCommand   │ │ │ │
  │   │   │   │ .execute()    │ │ │ │
  │   │   │   └───┬───────────┘ │ │ │
  │   │   └───────┬─────────────┘ │ │
  │   └───────────┬───────────────┘ │
  └───────────────┬─────────────────┘
        ▼
  Finished Response
```

---

## 2. Registering Middlewares

Developer dapat mendaftarkan filter baru menggunakan metode `.use()`:
```javascript
import { LoggingMiddleware } from '../middleware/logging-middleware.js';
bus.use(new LoggingMiddleware());
```
