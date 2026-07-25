/**
 * WorkflowValidator Class
 * Audits workflow structures and detects circular dependency graph deadlocks
 */
export class WorkflowValidator {
  /**
   * Validate a workflow definition
   * @param {Object} definition 
   * @returns {Object} { isValid: boolean, errors: Array }
   */
  static validate(definition) {
    const errors = [];

    if (!definition || typeof definition !== 'object') {
      errors.push('Workflow definition is empty or invalid.');
      return { isValid: false, errors };
    }

    // 1. Required fields
    const required = ['id', 'name', 'steps'];
    required.forEach((field) => {
      if (!(field in definition) || !definition[field]) {
        errors.push(`Required workflow property "${field}" is missing.`);
      }
    });

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // 2. Validate steps list
    if (!Array.isArray(definition.steps)) {
      errors.push('Property "steps" must be an Array.');
      return { isValid: false, errors };
    }

    // 3. Check for circular dependency loops
    const stepDependencies = definition.dependencies || {}; // e.g. { "stepB": ["stepA"], "stepA": ["stepB"] }
    if (this.detectCircularDependency(stepDependencies)) {
      errors.push('Circular dependency loop detected between steps. Deadlock risk.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * DFS Circular dependency cycle detector
   */
  static detectCircularDependency(graph = {}) {
    const visited = {};
    const recStack = {};

    const dfs = (node) => {
      if (recStack[node]) return true;
      if (visited[node]) return false;

      visited[node] = true;
      recStack[node] = true;

      const neighbors = graph[node] || [];
      for (const neighbor of neighbors) {
        if (dfs(neighbor)) return true;
      }

      recStack[node] = false;
      return false;
    };

    for (const node of Object.keys(graph)) {
      if (dfs(node)) return true;
    }

    return false;
  }
}
