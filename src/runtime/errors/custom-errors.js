/**
 * Custom Error Definitions for ARSAR Runtime
 */

export class RuntimeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RuntimeError';
  }
}

export class ConfigError extends RuntimeError {
  constructor(message) {
    super(message);
    this.name = 'ConfigError';
  }
}

export class SchemaError extends RuntimeError {
  constructor(message) {
    super(message);
    this.name = 'SchemaError';
  }
}

export class PluginError extends RuntimeError {
  constructor(message) {
    super(message);
    this.name = 'PluginError';
  }
}

export class ValidationError extends RuntimeError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
