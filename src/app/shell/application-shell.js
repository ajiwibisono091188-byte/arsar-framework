import { CommandManager } from '../command/command-manager.js';
import { ThemeManager } from '../theme/theme-manager.js';
import { ShellRouter } from '../router/shell-router.js';
import { NotificationManager } from '../notifications/notification-manager.js';
import { ShortcutManager } from '../shortcuts/shortcut-manager.js';
import { LayoutManager } from '../layout/layout-manager.js';
import { navigationMenus } from '../navigation/nav-manager.js';

/**
 * ApplicationShell Class
 */
export class ApplicationShell {
  /**
   * @param {Object} eventBus Optional EventBus for notifications
   */
  constructor(eventBus = null) {
    this.eventBus = eventBus;
    this.commands = new CommandManager();
    this.theme = new ThemeManager();
    this.router = new ShellRouter();
    this.notifications = new NotificationManager();
    this.shortcuts = new ShortcutManager();
    this.layout = new LayoutManager();
    this.modules = new Map();
  }

  /**
   * Helper to emit event signals
   */
  emit(event, ...args) {
    if (this.eventBus) {
      this.eventBus.emit(event, ...args);
    } else {
      console.log(`[Application Shell Event] ${event}:`, ...args);
    }
  }

  /**
   * Initialize layout system parameters
   */
  initialize() {
    console.log('[Application Shell] Initializing core modules...');

    // 1. Register global menus to router
    navigationMenus.forEach((menu) => {
      this.router.addRoute(menu.path, menu.id);
    });

    // 2. Bind default hotkeys
    this.shortcuts.bind('ctrl+k', () => this.executeCommand('open-command-palette'));
    this.shortcuts.bind('ctrl+n', () => this.executeCommand('new-project'));
    this.shortcuts.bind('ctrl+s', () => this.executeCommand('save-project'));

    // 3. Register default commands
    this.commands.registerCommand('open-command-palette', () => {
      console.log('[Shell Command] Opened Command Palette.');
    }, 'Open Command Palette Window');

    this.commands.registerCommand('new-project', () => {
      this.notifications.success('Membuat proyek baru...');
    }, 'Create New Project Folder');

    this.commands.registerCommand('save-project', () => {
      this.notifications.info('Proyek berhasil disimpan.');
    }, 'Save Active Workspace Config');

    this.emit('shell.initialized');
    console.log('[Application Shell] Initialization completed.');
  }

  /**
   * Mount layout grid to visual DOM target element
   */
  mount(element = null) {
    console.log('[Application Shell] Mounting visual grid framework...');
    const config = this.layout.getGridConfig();
    if (element) {
      element.innerHTML = `<div class="arsar-shell-wrapper">Visual grid loaded. sidebar: ${config.columns}</div>`;
    }
  }

  /**
   * Register a new workspace view module
   */
  registerModule(name, moduleObject) {
    this.modules.set(name.toLowerCase(), moduleObject);
    if (moduleObject.path) {
      this.router.addRoute(moduleObject.path, name);
    }
  }

  /**
   * Open active module path in Main Workspace
   */
  openWorkspace(moduleName) {
    const key = moduleName.toLowerCase();
    const mod = this.modules.get(key);
    if (!mod) {
      throw new Error(`[Application Shell Error] Module "${moduleName}" is not registered.`);
    }

    if (mod.path) {
      this.router.navigateTo(mod.path);
    }
    this.emit('module.opened', moduleName);
    return mod;
  }

  /**
   * Run command wrapper
   */
  executeCommand(id, ...args) {
    const res = this.commands.execute(id, ...args);
    this.emit('command.executed', id);
    return res;
  }

  /**
   * Destroy global event listeners
   */
  destroy() {
    console.log('[Application Shell] Destroying shell instance...');
    this.modules.clear();
    this.commands = new CommandManager();
  }
}
