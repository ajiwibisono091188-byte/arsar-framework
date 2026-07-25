/**
 * Plugin Interface Definition
 */
export class PluginInterface {
  install(kernel) {
    throw new Error('Method "install()" must be implemented.');
  }

  uninstall(kernel) {
    throw new Error('Method "uninstall()" must be implemented.');
  }

  metadata() {
    throw new Error('Method "metadata()" must be implemented.');
  }
}
