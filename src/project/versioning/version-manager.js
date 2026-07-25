import fs from 'fs';
import path from 'path';

/**
 * ProjectVersionManager Class
 * Keeps revision histories and provides rollbacks for configurations
 */
export class ProjectVersionManager {
  /**
   * Commit a new snapshot revision
   * @param {String} projectPath 
   * @param {String} message Commit description
   * @param {Object} currentConfigs Active configs dictionary
   */
  static commitRevision(projectPath, message, currentConfigs) {
    const historyDir = path.join(projectPath, 'logs', 'revisions');
    if (!fs.existsSync(historyDir)) {
      fs.mkdirSync(historyDir, { recursive: true });
    }

    const revisionId = 'rev_' + Date.now();
    const manifest = {
      id: revisionId,
      timestamp: new Date().toISOString(),
      message,
      configs: currentConfigs
    };

    fs.writeFileSync(
      path.join(historyDir, `${revisionId}.json`),
      JSON.stringify(manifest, null, 2),
      'utf8'
    );

    console.log(`[Version Manager] Committed revision: ${revisionId} - "${message}"`);
    return revisionId;
  }

  /**
   * List all committed revisions
   * @param {String} projectPath 
   * @returns {Array} List of revision metadata
   */
  static listRevisions(projectPath) {
    const historyDir = path.join(projectPath, 'logs', 'revisions');
    if (!fs.existsSync(historyDir)) return [];

    try {
      const files = fs.readdirSync(historyDir);
      return files
        .filter((file) => file.endsWith('.json'))
        .map((file) => {
          const content = fs.readFileSync(path.join(historyDir, file), 'utf8');
          const data = JSON.parse(content);
          return {
            id: data.id,
            timestamp: data.timestamp,
            message: data.message
          };
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (e) {
      console.error('[Version Manager Error] Failed to read revisions:', e.message);
      return [];
    }
  }
}
