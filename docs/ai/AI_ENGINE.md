# AI Content Engine Specification - ARSAR Studio

AI Content Engine bertindak sebagai orkestrator asisten AI terarah yang bersifat **provider-agnostic** (tidak terikat satu SDK model bahasa tertentu).

---

## 1. Arsitektur Komponen

### AIEngine (`src/ai/engine/ai-engine.js`)
Pusat kendali perutean LLM yang memicu request, melacak antrean batch, membatalkan request, dan menyebarkan sinyal events ke bus utama framework.

### BaseAIProvider & Mock Providers (`src/ai/providers/`)
Kontrak pembungkus (*wrapper*) API LLM. Menyediakan implementasi visual tiruan (OpenAI, Claude, Gemini, Ollama, DeepSeek) untuk mempermudah perakitan data statis tanpa biaya API key berbayar.

### PromptRegistry (`src/ai/prompts/prompt-registry.js`)
Pengelola muatan template markdown `.prompt.md` secara terpusat untuk memisahkan logika system instructions LLM dengan visual layout.

### PromptCompiler (`src/ai/compiler/prompt-compiler.js`)
Parser ekspresi kurung kurawal ganda `{{variable}}` untuk menyuntikkan data USP dan profil perusahaan ke dalam prompt akhir.

### AIResponseValidator (`src/ai/validator/response-validator.js`)
Pengaudit struktur JSON keluaran model AI, memastikan format, panjang karakter minimal, dan ketersediaan properti wajib yang diisyaratkan skema.

---

## 2. Event Broker Signal

Engine memancarkan sinyal asinkronus ke EventBus:
- `ai.request.started`: Dipancarkan sesaat sebelum request terkirim ke provider LLM.
- `ai.request.completed`: Dipancarkan setelah respon sukses dimuat.
- `ai.request.failed`: Dipancarkan apabila koneksi gagal atau respon cacat.
- `provider.changed`: Dipancarkan saat model default LLM dipindahkan.
- `prompt.loaded`: Dipancarkan saat inisialisasi pembacaan markdown berkas selesai.
