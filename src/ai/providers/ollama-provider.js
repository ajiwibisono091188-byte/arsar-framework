import { BaseAIProvider } from './base-provider.js';

/**
 * OllamaProvider Mock Implementation (Local LLM)
 */
export class OllamaProvider extends BaseAIProvider {
  constructor() {
    super('Ollama');
  }

  generate(prompt, options = {}) {
    console.log(`[Ollama Provider] Processing local offline prompt generation...`);
    let textResponse = '{"title": "Judul Bawaan", "description": "Deskripsi Bawaan"}';
    
    if (prompt.toLowerCase().includes('hero')) {
      textResponse = JSON.stringify({
        badge: "⚡ OLLAMA LOCAL",
        title: "Pemasaran Statis Cepat Tanpa Internet",
        description: "Merakit layout murni di local environment pengembang.",
        ctaPrimary: { label: "Local Test", path: "/test" }
      });
    }

    return Promise.resolve({
      text: textResponse,
      usage: { promptTokens: 70, completionTokens: 60, totalTokens: 130 }
    });
  }
}
