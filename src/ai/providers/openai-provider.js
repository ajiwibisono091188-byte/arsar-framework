import { BaseAIProvider } from './base-provider.js';

/**
 * OpenAIProvider Mock Implementation
 */
export class OpenAIProvider extends BaseAIProvider {
  constructor() {
    super('OpenAI');
  }

  generate(prompt, options = {}) {
    console.log(`[OpenAI Provider] Processing prompt generation...`);
    
    // Simulate structured copywriting output based on prompt context keywords
    let textResponse = '{"title": "Judul Bawaan", "description": "Deskripsi Bawaan"}';
    
    if (prompt.toLowerCase().includes('hero')) {
      textResponse = JSON.stringify({
        badge: "⚡ AI MARKETING OS",
        title: "Optimasi Pemasaran Statis Dengan AI",
        description: "Website instan berkinerja tinggi bebas overhead database.",
        ctaPrimary: { label: "Mulai Gratis", path: "/contact" }
      });
    } else if (prompt.toLowerCase().includes('faq')) {
      textResponse = JSON.stringify([
        { question: "Bagaimana cara kerjanya?", answer: "AI merelasikan data JSON menjadi file statis." }
      ]);
    }

    return Promise.resolve({
      text: textResponse,
      usage: { promptTokens: 120, completionTokens: 95, totalTokens: 215 }
    });
  }
}
