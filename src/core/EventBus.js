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

  once(eventName, listener) {
    const unsubscribe = this.on(eventName, (payload) => {
      unsubscribe();
      listener(payload);
    });

    return unsubscribe;
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
        console.error(error);
        throw error;
      }
    });
  }
}
