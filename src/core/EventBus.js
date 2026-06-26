export class EventBus {
  #listeners = new Map();
  #logger;

  constructor({ logger }) {
    this.#logger = logger;
  }

  on(eventName, listener) {
    const listeners = this.#listeners.get(eventName) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(eventName, listeners);
    return () => this.off(eventName, listener);
  }

  off(eventName, listener) {
    this.#listeners.get(eventName)?.delete(listener);
  }

  emit(eventName, payload = {}) {
    const listeners = this.#listeners.get(eventName);
    if (!listeners?.size) return;
    listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        this.#logger.error('Event listener failed.', { eventName, error });
      }
    });
  }
}
