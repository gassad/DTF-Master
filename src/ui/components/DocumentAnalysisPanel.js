import { createElement } from '../../utils/dom.js';

/**
 * Temporary document inspection panel for the first UXP integration.
 *
 * The component emits application events and renders responses. It does not
 * import or call Photoshop APIs directly, keeping UI separated from UXP logic.
 */
export class DocumentAnalysisPanel {
  #eventBus;
  #logger;
  #resultNode;
  #button;

  /**
   * @param {object} dependencies
   * @param {import('../../core/EventBus.js').EventBus} dependencies.eventBus
   * @param {import('../../utils/Logger.js').Logger} dependencies.logger
   */
  constructor({ eventBus, logger }) {
    this.#eventBus = eventBus;
    this.#logger = logger;
  }

  /**
   * Renders the panel UI.
   *
   * @returns {HTMLElement}
   */
  render() {
    const panel = createElement('section', { className: 'dtf-document-panel' });
    const heading = createElement('h2', { textContent: 'Document' });

    this.#button = createElement('button', {
      className: 'dtf-primary-button',
      textContent: 'Analyze Document',
      attributes: { type: 'button' }
    });
    this.#resultNode = createElement('div', { className: 'dtf-document-result' });

    this.#button.addEventListener('click', () => {
      this.#logger.info('Document analysis requested.');
      this.#setLoadingState(true);
      this.#renderMessage('Reading active Photoshop document...');
      this.#eventBus.emit('document:analyzeRequested');
    });

    this.#eventBus.on('document:infoLoaded', ({ info }) => {
      this.#setLoadingState(false);
      this.#renderDocumentInfo(info);
    });

    this.#eventBus.on('document:infoFailed', ({ message }) => {
      this.#setLoadingState(false);
      this.#renderError(message);
    });

    panel.append(heading, this.#button, this.#resultNode);
    return panel;
  }

  /**
   * Enables or disables the temporary action button during async work.
   *
   * @param {boolean} loading Current loading state.
   */
  #setLoadingState(loading) {
    this.#button.disabled = loading;
    this.#button.textContent = loading ? 'Analyzing...' : 'Analyze Document';
  }

  /**
   * Renders document information returned by the service.
   *
   * @param {object} info Normalized document info.
   */
  #renderDocumentInfo(info) {
    this.#resultNode.innerHTML = '';
    this.#resultNode.className = 'dtf-document-result';

    const rows = [
      ['File', info.fileName],
      ['Width', info.width],
      ['Height', info.height],
      ['DPI', info.dpi],
      ['Color Mode', info.colorMode],
      ['Bit Depth', info.bitDepth],
      ['Layers', info.totalLayers]
    ];

    rows.forEach(([label, value]) => {
      const row = createElement('div', { className: 'dtf-document-row' });
      row.append(
        createElement('span', { className: 'dtf-document-label', textContent: label }),
        createElement('strong', { textContent: String(value) })
      );
      this.#resultNode.append(row);
    });
  }

  /**
   * Renders a neutral status message.
   *
   * @param {string} message Message to display.
   */
  #renderMessage(message) {
    this.#resultNode.className = 'dtf-document-result';
    this.#resultNode.textContent = message;
  }

  /**
   * Renders a user-facing error message.
   *
   * @param {string} message Error message.
   */
  #renderError(message) {
    this.#resultNode.className = 'dtf-document-result dtf-document-error';
    this.#resultNode.textContent = message;
  }
}
