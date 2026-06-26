export class ConfigManager {
  #config;
  #logger;

  constructor({ defaultConfig, logger }) {
    this.#config = structuredClone(defaultConfig);
    this.#logger = logger;
  }

  async load() {
    this.#logger.info('Configuration loaded.');
    return this.snapshot();
  }

  get(path, fallback = undefined) {
    return path.split('.').reduce((value, key) => {
      if (value === undefined || value === null) return fallback;
      return Object.hasOwn(value, key) ? value[key] : fallback;
    }, this.#config);
  }

  set(path, value) {
    const keys = path.split('.');
    const targetKey = keys.pop();
    const target = keys.reduce((current, key) => {
      current[key] = current[key] ?? {};
      return current[key];
    }, this.#config);
    target[targetKey] = value;
  }

  snapshot() {
    return structuredClone(this.#config);
  }
}
