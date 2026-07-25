/**
 * WorkflowScheduler Class (Mock Abstraction)
 */
export class WorkflowScheduler {
  constructor() {
    this.schedules = [];
  }

  schedule(runner, cronTime) {
    console.log(`[Workflow Scheduler] Scheduled runner for: "${runner.definition.name}" on pattern: "${cronTime}"`);
    this.schedules.push({ runner, cronTime });
  }
}
