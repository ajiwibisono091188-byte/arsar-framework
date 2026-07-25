import { BaseStep } from '../steps/base-step.js';

/**
 * LoadProjectStep Mock
 */
export class LoadProjectStep extends BaseStep {
  constructor() { super('load_project', 'Load Project Action'); }
  execute(ctx) {
    console.log('[Action Mock] Loaded project config into workflow context.');
    ctx.project = { id: 'proj_yogadai', name: 'YogaDAI' };
    return Promise.resolve(ctx);
  }
}

/**
 * LoadKnowledgeStep Mock
 */
export class LoadKnowledgeStep extends BaseStep {
  constructor() { super('load_knowledge', 'Load Knowledge Action'); }
  execute(ctx) {
    console.log('[Action Mock] Loaded automotive-financing knowledge base.');
    ctx.knowledge = { industry: 'Automotive Financing', keywords: ['bpkb'] };
    return Promise.resolve(ctx);
  }
}

/**
 * GenerateAIContentStep Mock
 */
export class GenerateAIContentStep extends BaseStep {
  constructor() { super('generate_ai_content', 'Generate AI Content Action'); }
  execute(ctx) {
    console.log('[Action Mock] LLM generated Hero & FAQ text.');
    ctx.content = { heroTitle: 'Cicil Mobil Surabaya Cepat', faqList: [] };
    return Promise.resolve(ctx);
  }
}

/**
 * ComposeBlueprintStep Mock
 */
export class ComposeBlueprintStep extends BaseStep {
  constructor() { super('compose_blueprint', 'Compose Blueprint Action'); }
  execute(ctx) {
    console.log('[Action Mock] Experience Composer compiled page blueprint.');
    ctx.blueprint = { pageType: 'landing', layout: 'split', sections: ['hero', 'footer'] };
    return Promise.resolve(ctx);
  }
}

/**
 * RenderStep Mock
 */
export class RenderStep extends BaseStep {
  constructor() { super('render', 'Render HTML/CSS Action'); }
  execute(ctx) {
    console.log('[Action Mock] Nunjucks & Tailwind v4 compiled HTML folder.');
    ctx.renderedDir = '/dist';
    return Promise.resolve(ctx);
  }
}

/**
 * GenerateSEOStep Mock
 */
export class GenerateSEOStep extends BaseStep {
  constructor() { super('generate_seo', 'Generate SEO JSON-LD Action'); }
  execute(ctx) {
    console.log('[Action Mock] Dynamic LocalBusiness JSON-LD injected.');
    ctx.seoScript = '<script type="application/ld+json">...</script>';
    return Promise.resolve(ctx);
  }
}

/**
 * DeployStep Mock
 */
export class DeployStep extends BaseStep {
  constructor() { super('deploy', 'Deploy static Cloudflare Action'); }
  execute(ctx) {
    console.log('[Action Mock] Files uploaded successfully to Cloudflare Pages.');
    ctx.liveUrl = 'https://yogadai.pages.dev';
    return Promise.resolve(ctx);
  }
}
