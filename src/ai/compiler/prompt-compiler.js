import { PromptCompilerInterface } from '../interfaces/prompt-compiler-interface.js';

/**
 * PromptCompiler Class
 */
export class PromptCompiler extends PromptCompilerInterface {
  /**
   * Compile template replacing braces with actual values
   * @param {String} template Markdown prompt template
   * @param {Object} data Mapping variables
   * @returns {String} Compiled prompt
   */
  compile(template, data = {}) {
    if (typeof template !== 'string') {
      throw new Error('[Prompt Compiler Error] Template must be a string.');
    }

    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
      if (key in data) {
        return data[key];
      }
      return match; // Leave unmatched placeholders unchanged
    });
  }
}
export const promptCompiler = new PromptCompiler();
