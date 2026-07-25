/**
 * ARSAR Schema Migration Manager Architecture
 * Blueprint for transitioning configuration versions (e.g., v1 -> v2 -> v3)
 */

export class MigrationManager {
  constructor() {
    this.migrations = new Map();
    this.setupMigrations();
  }

  /**
   * Register migration paths
   */
  setupMigrations() {
    // Transition path: v1 to v2
    this.register('site', '1.0.0', '2.0.0', (oldData) => {
      console.log('[Migration Manager] Migrating "site" schema from v1.0.0 to v2.0.0');
      return {
        ...oldData,
        // Example migration: mapping deprecated field to a new format
        logo: oldData.logoPath || '/assets/images/logo.png',
        version: oldData.version || '2.0.0'
      };
    });

    // Transition path: v2 to v3
    this.register('site', '2.0.0', '3.0.0', (oldData) => {
      console.log('[Migration Manager] Migrating "site" schema from v2.0.0 to v3.0.0');
      return {
        ...oldData,
        assetVersion: oldData.assetVersion || '1.0.0'
      };
    });
  }

  /**
   * Register a migration transition callback
   * @param {String} schemaName 
   * @param {String} fromVersion 
   * @param {String} toVersion 
   * @param {Function} migrationFn 
   */
  register(schemaName, fromVersion, toVersion, migrationFn) {
    const key = `${schemaName.toLowerCase()}_${fromVersion}_to_${toVersion}`;
    this.migrations.set(key, migrationFn);
  }

  /**
   * Run migration for a specific data payload
   * @param {String} schemaName 
   * @param {Object} data Data payload containing a schemaVersion
   * @param {String} targetVersion The desired schemaVersion target
   * @returns {Object} Migrated data payload
   */
  migrate(schemaName, data, targetVersion) {
    let currentVersion = data.schemaVersion || '1.0.0';
    let migratedData = { ...data };

    if (currentVersion === targetVersion) {
      return migratedData;
    }

    console.log(`[Migration Manager] Commencing migration pipeline for "${schemaName}" from v${currentVersion} to v${targetVersion}...`);

    // In a real implementation, we would resolve a path of registered migrations:
    // e.g. 1.0.0 -> 2.0.0 -> 3.0.0
    const transitionKey = `${schemaName.toLowerCase()}_${currentVersion}_to_${targetVersion}`;
    const migrationFn = this.migrations.get(transitionKey);

    if (migrationFn) {
      migratedData = migrationFn(migratedData);
      migratedData.schemaVersion = targetVersion;
    } else {
      console.warn(`[Migration Manager] No direct migration registered for ${transitionKey}. Using data as-is.`);
    }

    return migratedData;
  }
}
