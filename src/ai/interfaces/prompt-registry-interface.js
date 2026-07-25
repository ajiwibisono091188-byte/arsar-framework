/**
 * Prompt Registry Interface
 */
export class PromptRegistryInterface {
  load() {
    throw new Error('Method "load()" must be implemented.');
  }

  get(name) {
    throw new Error('Method "get()" must be implemented.');
  }

  list() {
    throw new Error('Method "list()" must be implemented.');
  }

  reload() {
    throw new Error('Method "reload()" must be implemented.');
  }
}
