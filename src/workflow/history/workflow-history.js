/**
 * WorkflowHistory Class
 */
export class WorkflowHistory {
  constructor() {
    this.records = [];
  }

  saveRecord(record) {
    this.records.push({
      ...record,
      savedAt: new Date().toISOString()
    });
  }

  list() {
    return this.records;
  }
}
