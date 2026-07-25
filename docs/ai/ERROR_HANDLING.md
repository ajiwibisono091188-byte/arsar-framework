# AI Error Handling & Recovery - ARSAR Studio

Pengelolaan kegagalan jaringan, timeout, rate limit, dan output LLM yang cacat dikendalikan secara tangguh oleh **RetryManager**.

---

## 1. Jenis Kegagalan yang Ditangani

- **JSON Cacat**: LLM kadang menyertakan markdown ticks (```json ... ```) yang merusak parsing JSON parser.
- **Timeout**: Koneksi lambat ke vendor cloud AI.
- **Rate Limit (HTTP 429)**: Melebihi kuota request per menit (RPM).

---

## 2. Pemulihan Exponential Backoff

Sistem mengalkulasikan delay bertingkat di setiap kegagalan untuk memberi waktu pendinginan bagi server vendor AI:
- Percobaan 1: Gagal &rarr; Tunggu `2^1 * 50ms` (100ms)
- Percobaan 2: Gagal &rarr; Tunggu `2^2 * 50ms` (200ms)
- Percobaan 3: Gagal &rarr; Tunggu `2^3 * 50ms` (400ms)
- Percobaan 4: Gagal &rarr; Throw error final jika masih gagal.
