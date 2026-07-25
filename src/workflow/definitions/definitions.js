/**
 * Default Workflow Templates Definitions
 */
export const workflowDefinitions = {
  "build-pipeline": {
    id: "build-pipeline",
    name: "ARSAR Core Build Pipeline",
    description: "Orkestrasi ujung-ke-ujung pemuatan proyek, penulisan konten, perakitan layout, dan deployment.",
    steps: [
      "load_project",
      "load_knowledge",
      "generate_ai_content",
      "compose_blueprint",
      "render",
      "generate_seo",
      "deploy"
    ],
    conditions: {
      requireProjectLoaded: true
    },
    metadata: {
      author: "Principal Architect",
      version: "1.0.0"
    }
  }
};
