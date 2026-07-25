/**
 * AI Provider Interface
 */
export class AIProviderInterface {
  generate(prompt, options) {
    throw new Error('Method "generate()" must be implemented.');
  }

  stream(prompt, options) {
    throw new Error('Method "stream()" must be implemented.');
  }

  health() {
    throw new Error('Method "health()" must be implemented.');
  }

  metadata() {
    throw new Error('Method "metadata()" must be implemented.');
  }
}
