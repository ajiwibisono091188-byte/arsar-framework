import { AIProviderInterface } from '../interfaces/ai-provider-interface.js';

/**
 * BaseAIProvider Class
 */
export class BaseAIProvider extends AIProviderInterface {
  constructor(name) {
    super();
    this.name = name;
  }

  generate(prompt, options = {}) {
    return Promise.resolve({
      text: `[Mock output from ${this.name}] resolved for: ${prompt.substring(0, 30)}...`,
      usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 }
    });
  }

  stream(prompt, options = {}) {
    console.log(`[${this.name}] Mocking stream channel...`);
    return {
      on: (event, cb) => {
        if (event === 'data') cb({ text: `Mock stream chunk from ${this.name}` });
        if (event === 'end') cb();
      }
    };
  }

  health() {
    return Promise.resolve({ status: 'healthy', latencyMs: 12 });
  }

  metadata() {
    return {
      name: this.name,
      apiVersion: 'v1',
      supportedModes: ['generate', 'stream']
    };
  }
}
