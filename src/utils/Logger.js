const LEVELS = Object.freeze({ debug: 10, info: 20, warn: 30, error: 40 });

export class Logger {
  #context;
  #level;

  constructor({ context = 'DTF MASTER', level = 'info' } = {}) {
    this.#context = context;
    this.#level = level;
  }

  child(scope) {
    return new Logger({ context: this.#context + ':' + scope, level: this.#level });
  }

  debug(message, meta = {}) {
    this.#write('debug', message, meta);
  }

  info(message, meta = {}) {
    this.#write('info', message, meta);
  }

  warn(message, meta = {}) {
    this.#write('warn', message, meta);
  }

  error(message, meta = {}) {
    this.#write('error', message, meta);
  }

  #write(level, message, meta) {
    if (LEVELS[level] < LEVELS[this.#level]) return;
    console[level === 'debug' ? 'log' : level]('[' + this.#context + '] ' + message, meta);
  }
}
