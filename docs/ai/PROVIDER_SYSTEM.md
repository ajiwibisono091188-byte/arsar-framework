# Provider System - ARSAR Studio

Sistem provider di dalam **ARSAR Studio** mengabstraksikan berbagai vendor kecerdasan buatan (LLM) di bawah satu antarmuka standardisasi `AIProviderInterface`.

---

## 1. Antarmuka Standardisasi

Setiap provider wajib mengekspos 4 metode:
- `generate(prompt, options)`: Mengirimkan teks prompt terkompilasi dan mengembalikan objek resolusi.
- `stream(prompt, options)`: Memfasilitasi respons bertahap (streaming tokens).
- `health()`: Melakukan cek status latensi koneksi.
- `metadata()`: Mengidentifikasi versi API dan batasan token model.

---

## 2. Vendor yang Didukung (Placeholder / Mock)

Untuk kemudahan pengujian unit dan pengembangan lokal, sistem menyediakan model mock yang mengembalikan JSON terformat:
1. **OpenAIProvider**: Menyediakan simulasi model GPT-4o.
2. **ClaudeProvider**: Menyediakan simulasi model Claude 3.5 Sonnet.
3. **GeminiProvider**: Menyediakan simulasi model Gemini 1.5 Pro.
4. **OllamaProvider**: Simulasi offline lokal LLM (Llama 3).
5. **DeepSeekProvider**: Simulasi model DeepSeek-V3/R1.
