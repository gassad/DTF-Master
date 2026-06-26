import { createElement } from '../../utils/dom.js';

/**
 * Main MVP panel for reading the active Photoshop document.
 *
 * The component only emits UI intent and renders results. Photoshop access stays
 * isolated in PhotoshopDocumentService through the application controller.
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
    console.log('CONSTRUCTOR OK');
    this.#eventBus = eventBus;
    this.#logger = logger;
  }

  /**
   * Renders the MVP panel UI.
   *
   * @returns {HTMLElement}
   */
  render() {
    console.log('RENDER START');
    const panel = createElement('section', { className: 'dtf-document-panel' });
    const title = createElement('h1', { textContent: 'DTF MASTER' });

    this.#button = createElement('button', {
      className: 'dtf-primary-button',
      textContent: 'Analyze',
      attributes: { type: 'button' }
    });
    this.#resultNode = createElement('div', { className: 'dtf-document-result' });
    this.#renderMessage('Open a Photoshop document and click Analyze.');

    this.#button.addEventListener('click', () => {
      this.#logger.info('Document analysis requested.');
      this.#setLoadingState(true);
      this.#renderMessage('Reading the active Photoshop document...');
      this.#eventBus.emit('document:analyzeRequested');
    });

    this.#eventBus.on('document:infoLoaded', ({ info }) => {
      this.#setLoadingState(false);
      this.#renderDocumentInfo(info);
    });

    this.#eventBus.on('document:infoFailed', ({ message }) => {
      this.#setLoadingState(false);
      this.#renderError(message || 'No Photoshop document is open. Open a document and try again.');
    });

    panel.append(title, this.#button, this.#resultNode);
    console.log('RENDER END');
    return panel;
  }

  /**
   * Updates the Analyze button while Photoshop metadata is being read.
   *
   * @param {boolean} loading Current loading state.
   */
  #setLoadingState(loading) {
    this.#button.disabled = loading;
    this.#button.textContent = loading ? 'Analyzing...' : 'Analyze';
  }

  /**
   * Renders document information returned by PhotoshopDocumentService.
   *
   * @param {object} info Normalized document info.
   */
  #renderDocumentInfo(info) {
    this.#resultNode.innerHTML = '';
    this.#resultNode.className = 'dtf-document-result';

    const rows = [
      ['File Name', info.fileName],
      ['Width', info.width],
      ['Height', info.height],
      ['Resolution (DPI)', info.dpi],
      ['Color Mode', info.colorMode],
      ['Bit Depth', info.bitDepth],
      ['Layer Count', info.totalLayers]
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
   * Renders a friendly user-facing error message.
   *
   * @param {string} message Error message.
   */
  #renderError(message) {
    this.#resultNode.className = 'dtf-document-result dtf-document-error';
    this.#resultNode.textContent = message;
  }
}
