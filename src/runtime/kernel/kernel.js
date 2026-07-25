import { ServiceContainer } from '../container/service-container.js';
import { EventBus } from '../events/event-bus.js';
import { MemoryCache } from '../cache/memory-cache.js';
import { ConsoleLogger } from '../logger/console-logger.js';
import { RuntimeContext } from '../context/runtime-context.js';
import { RuntimeError } from '../errors/custom-errors.js';

/**
 * RuntimeKernel Class
 */
export class RuntimeKernel {
  constructor(options = {}) {
    this.state = 'uninitialized';
    this.container = new ServiceContainer();
    this.context = new RuntimeContext(options);
    this.modules = [];
    this.plugins = new Map();
  }

  /**
   * Boot the kernel and register default core services
   */
  boot() {
    if (this.state !== 'uninitialized' && this.state !== 'stopped') {
      throw new RuntimeError(`Cannot boot kernel from state: "${this.state}"`);
    }

    console.log('[Runtime Kernel] Commencing boot sequence...');
    
    // Register core services to the DI container
    this.container.singleton('events', new EventBus());
    this.container.singleton('cache', new MemoryCache());
    this.container.singleton('logger', new ConsoleLogger());
    this.container.singleton('context', this.context);

    this.state = 'booted';
    console.log('[Runtime Kernel] Boot sequence completed.');
    
    const events = this.container.resolve('events');
    events.emit('kernel:booted');
  }

  /**
   * Register a new module class and initialize it
   * @param {Class} ModuleClass 
   */
  register(ModuleClass) {
    if (this.state === 'uninitialized') {
      throw new RuntimeError('Cannot register modules on uninitialized kernel. Call boot() first.');
    }

    const moduleInstance = new ModuleClass();
    
    // Check duplicates
    if (this.modules.some((mod) => mod.name === moduleInstance.name)) {
      throw new RuntimeError(`Module "${moduleInstance.name}" is already registered.`);
    }

    moduleInstance.initialize(this.context);
    this.modules.push(moduleInstance);

    const events = this.container.resolve('events');
    events.emit('module:registered', moduleInstance.name);
  }

  /**
   * Unregister an existing module by name
   * @param {String} moduleName 
   */
  unregister(moduleName) {
    const index = this.modules.findIndex((mod) => mod.name === moduleName);
    if (index === -1) return;

    const moduleInstance = this.modules[index];
    
    // If running, stop it first
    if (moduleInstance.status === 'running') {
      moduleInstance.stop();
    }
    moduleInstance.destroy();
    
    this.modules.splice(index, 1);
    
    const events = this.container.resolve('events');
    events.emit('module:unregistered', moduleName);
  }

  /**
   * Start the kernel, booting and starting all registered modules
   */
  start() {
    if (this.state !== 'booted') {
      throw new RuntimeError('Kernel must be booted before starting. Call boot() first.');
    }

    console.log('[Runtime Kernel] Starting all registered modules...');
    
    // 1. Boot all modules
    this.modules.forEach((mod) => {
      mod.boot();
    });

    // 2. Start all modules
    this.modules.forEach((mod) => {
      mod.start();
    });

    this.state = 'running';
    console.log('[Runtime Kernel] All modules started. Kernel is running.');
    
    const events = this.container.resolve('events');
    events.emit('kernel:started');
  }

  /**
   * Stop the kernel, stopping modules in LIFO order
   */
  stop() {
    if (this.state !== 'running') {
      return;
    }

    console.log('[Runtime Kernel] Stopping kernel sequence...');
    
    // Stop and destroy modules in reverse order (LIFO)
    const reversedModules = [...this.modules].reverse();
    
    reversedModules.forEach((mod) => {
      mod.stop();
      mod.destroy();
    });

    this.state = 'stopped';
    console.log('[Runtime Kernel] Kernel stopped.');
    
    const events = this.container.resolve('events');
    events.emit('kernel:stopped');
  }

  /**
   * Destroy the kernel, freeing container resources
   */
  destroy() {
    this.stop();
    this.modules = [];
    this.container = new ServiceContainer();
    this.state = 'destroyed';
    console.log('[Runtime Kernel] Kernel destroyed.');
  }

  /**
   * Return the current kernel state status
   * @returns {String}
   */
  status() {
    return this.state;
  }
}
