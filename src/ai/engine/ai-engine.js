import { AIQueue } from '../queue/ai-queue.js';

/**
 * AIEngine Class
 */
export class AIEngine {
  /**
   * @param {Object} eventBus Optional EventBus for emitting request signals
   */
  constructor(eventBus = null) {
    this.providers = new Map();
    this.defaultProvider = null;
    this.eventBus = eventBus;
    this.activeRequests = new Set();
  }

  /**
   * Register a new LLM provider
   */
  registerProvider(name, provider) {
    const key = name.toLowerCase();
    this.providers.set(key, provider);
    if (!this.defaultProvider) {
      this.defaultProvider = provider;
    }
  }

  /**
   * Set default active provider
   */
  setDefaultProvider(name) {
    const key = name.toLowerCase();
    const provider = this.providers.get(key);
    if (!provider) {
      throw new Error(`[AI Engine Error] Provider "${name}" is not registered.`);
    }
    this.defaultProvider = provider;
    this.emit('provider.changed', name);
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[AI Engine Event] ${event}:`, ...args);
    }
  }

  /**
   * Generate text using default provider
   */
  async generate(prompt, options = {}) {
    if (!this.defaultProvider) {
      throw new Error('[AI Engine Error] No AI provider registered.');
    }

    const requestId = 'ai_req_' + Math.random().toString(36).substr(2, 9);
    this.activeRequests.add(requestId);
    this.emit('ai.request.started', requestId, this.defaultProvider.name);

    try {
      const result = await this.defaultProvider.generate(prompt, options);
      this.activeRequests.delete(requestId);
      this.emit('ai.request.completed', requestId, result);
      return result;
    } catch (err) {
      this.activeRequests.delete(requestId);
      this.emit('ai.request.failed', requestId, err.message);
      throw err;
    }
  }

  /**
   * Generate multiple prompts in batch
   */
  async generateBatch(prompts, options = {}) {
    const queue = new AIQueue();
    prompts.forEach((prompt) => {
      queue.enqueue(() => this.generate(prompt, options));
    });
    return queue.processAll();
  }

  /**
   * Stream output from default provider
   */
  stream(prompt, options = {}) {
    if (!this.defaultProvider) {
      throw new Error('[AI Engine Error] No AI provider registered.');
    }
    return this.defaultProvider.stream(prompt, options);
  }

  /**
   * Cancel active request
   */
  cancel(requestId) {
    if (this.activeRequests.has(requestId)) {
      this.activeRequests.delete(requestId);
      console.log(`[AI Engine] Cancelled request: ${requestId}`);
    }
  }
}
