export class SettingsService {
  #configManager;
  #eventBus;
  #logger;
  #settings = {};

  constructor({ configManager, eventBus, logger }) {
    this.#configManager = configManager;
    this.#eventBus = eventBus;
    this.#logger = logger;
  }

  async load() {
    this.#settings = this.#configManager.get('settings', {});
    this.#logger.info('Settings loaded.');
    return this.snapshot();
  }

  get(key, fallback = undefined) {
    return Object.hasOwn(this.#settings, key) ? this.#settings[key] : fallback;
  }

  update(key, value) {
    this.#settings[key] = value;
    this.#configManager.set('settings.' + key, value);
    this.#eventBus.emit('settings:changed', { key, value, settings: this.snapshot() });
  }

  snapshot() {
    return structuredClone(this.#settings);
  }
}
