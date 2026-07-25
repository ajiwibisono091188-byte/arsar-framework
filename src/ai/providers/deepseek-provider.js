import { BaseAIProvider } from './base-provider.js';

/**
 * DeepSeekProvider Mock Implementation
 */
export class DeepSeekProvider extends BaseAIProvider {
  constructor() {
    super('DeepSeek');
  }

  generate(prompt, options = {}) {
    console.log(`[DeepSeek Provider] Processing prompt generation...`);
    let textResponse = '{"title": "Judul Bawaan", "description": "Deskripsi Bawaan"}';
    
    if (prompt.toLowerCase().includes('hero')) {
      textResponse = JSON.stringify({
        badge: "⚡ DEEPSEEK REASONER",
        title: "Pembuatan Website Pemasaran Cepat",
        description: "Optimasi static website super cepat.",
        ctaPrimary: { label: "Mulai Sekarang", path: "/contact" }
      });
    }

    return Promise.resolve({
      text: textResponse,
      usage: { promptTokens: 110, completionTokens: 100, totalTokens: 210 }
    });
  }
}
