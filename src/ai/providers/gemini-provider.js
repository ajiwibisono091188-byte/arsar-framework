import { BaseAIProvider } from './base-provider.js';

/**
 * GeminiProvider Mock Implementation
 */
export class GeminiProvider extends BaseAIProvider {
  constructor() {
    super('Gemini');
  }

  generate(prompt, options = {}) {
    console.log(`[Gemini Provider] Processing prompt generation...`);
    let textResponse = '{"title": "Judul Bawaan", "description": "Deskripsi Bawaan"}';
    
    if (prompt.toLowerCase().includes('hero')) {
      textResponse = JSON.stringify({
        badge: "⚡ GEMINI ENGINE",
        title: "Optimasi Pemasaran Statis Dengan AI",
        description: "Halaman static ultra-fast untuk skor SEO maksimal.",
        ctaPrimary: { label: "Hubungi", path: "/hubungi" }
      });
    }

    return Promise.resolve({
      text: textResponse,
      usage: { promptTokens: 90, completionTokens: 80, totalTokens: 170 }
    });
  }
}
