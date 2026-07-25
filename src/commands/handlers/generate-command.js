import { BaseCommand } from '../core/base-command.js';
import { ServiceContainer } from '../../runtime/container/service-container.js';
import { EventBus } from '../../runtime/events/event-bus.js';
import { ProjectManager } from '../../project/core/project-manager.js';
import { KnowledgeEngine } from '../../knowledge/engine/knowledge-engine.js';
import { AIEngine } from '../../ai/engine/ai-engine.js';
import { GeminiProvider } from '../../ai/providers/gemini-provider.js';
import { PipelineEngine } from '../../pipeline/engine/pipeline-engine.js';
import { LandingGenerator } from '../../generator/engine/landing-generator.js';
import path from 'path';

export class GenerateCommand extends BaseCommand {
  constructor() {
    super('generate', 'Generate Landing', 'Orchestrate AI and Compose Blueprint for landing page.');
  }

  async execute(context) {
    const start = Date.now();
    const projectPath = this.args[0] || process.cwd();
    const outDir = this.options.out || path.join(projectPath, 'dist');

    console.log(`[CLI] Running landing generator for: ${projectPath}`);

    // Create Service Container
    const container = new ServiceContainer();
    const events = new EventBus();
    container.singleton('events', events);
    container.singleton('project-manager', new ProjectManager(events));
    container.singleton('knowledge-engine', new KnowledgeEngine(events));
    const ai = new AIEngine(events);
    ai.registerProvider('gemini', new GeminiProvider());
    container.singleton('ai-engine', ai);
    container.singleton('pipeline-engine', new PipelineEngine(events));

    const generator = new LandingGenerator(container);
    await generator.generate(projectPath, outDir);

    const duration = Date.now() - start;
    console.log(`[Benchmark] E2E generation pipeline completed in ${duration}ms`);
    return { success: true, message: `Output generated successfully at: ${outDir}` };
  }

  validate(args = [], options = {}) {
    const errors = [];
    if (args.length === 0) {
      errors.push('Project directory path argument is required.');
    }
    return { isValid: errors.length === 0, errors };
  }
}
