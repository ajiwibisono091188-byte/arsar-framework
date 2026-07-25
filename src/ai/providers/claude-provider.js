import { BaseAIProvider } from './base-provider.js';

/**
 * ClaudeProvider Mock Implementation
 */
export class ClaudeProvider extends BaseAIProvider {
  constructor() {
    super('Claude');
  }

  generate(prompt, options = {}) {
    console.log(`[Claude Provider] Processing prompt generation...`);
    let textResponse = '{"title": "Judul Bawaan", "description": "Deskripsi Bawaan"}';
    
    if (prompt.toLowerCase().includes('hero')) {
      textResponse = JSON.stringify({
        badge: "⚡ CLAUDE COPYWRITER",
        title: "Pembuatan Website Pemasaran Cepat",
        description: "Merakit landing page dengan performa Lighthouse 100% instan.",
        ctaPrimary: { label: "Konsultasi Gratis", path: "/contact" }
      });
    }

    return Promise.resolve({
      text: textResponse,
      usage: { promptTokens: 140, completionTokens: 105, totalTokens: 245 }
    });
  }
}
