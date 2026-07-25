import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PromptRegistryInterface } from '../interfaces/prompt-registry-interface.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * PromptRegistry Class
 */
export class PromptRegistry extends PromptRegistryInterface {
  constructor() {
    super();
    this.prompts = new Map();
    this.load();
  }

  load() {
    this.prompts.clear();
    const promptDir = __dirname;
    
    try {
      const files = fs.readdirSync(promptDir);
      files.forEach((file) => {
        if (file.endsWith('.prompt.md')) {
          const name = file.replace('.prompt.md', '');
          const content = fs.readFileSync(path.join(promptDir, file), 'utf8');
          this.prompts.set(name, content);
        }
      });
      console.log(`[Prompt Registry] Loaded ${this.prompts.size} prompts from disk.`);
    } catch (err) {
      console.warn(`[Prompt Registry Warning] Failed to scan prompts dir, using mock templates: ${err.message}`);
      // Fallbacks for testing
      this.prompts.set('hero', '# Hero template for {{company}}');
      this.prompts.set('faq', '# FAQ template for {{company}}');
    }
  }

  get(name) {
    const template = this.prompts.get(name);
    if (!template) {
      throw new Error(`[Prompt Registry] Prompt template "${name}" not found.`);
    }
    return template;
  }

  list() {
    return Array.from(this.prompts.keys());
  }

  reload() {
    this.load();
  }
}
export const promptRegistry = new PromptRegistry();
