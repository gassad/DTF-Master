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
    panel.style.display = 'grid';
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
    panel.style.gap = '12px';
    panel.style.minHeight = '120px';

    const title = createElement('h1', { textContent: 'DTF MASTER' });
    title.style.margin = '0';
    title.style.color = '#f2f2f2';
    title.style.fontSize = '16px';

    this.#button = createElement('button', {
      className: 'dtf-primary-button',
      textContent: 'Analyze',
      attributes: { type: 'button' }
    });
    this.#button.style.width = '100%';
    this.#button.style.minHeight = '36px';
    this.#button.style.color = '#101010';
    this.#button.style.background = '#35c2a1';
    this.#button.style.border = '1px solid transparent';
    this.#button.style.fontWeight = '650';

    this.#resultNode = createElement('div', { className: 'dtf-document-result' });
    this.#resultNode.style.display = 'grid';
    this.#resultNode.style.gap = '8px';
    this.#resultNode.style.minHeight = '44px';
    this.#resultNode.style.padding = '12px';
    this.#resultNode.style.color = '#a8a8a8';
    this.#resultNode.style.background = '#222';
    this.#resultNode.style.border = '1px solid #3a3a3a';
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

    panel.appendChild(title);
    panel.appendChild(this.#button);
    panel.appendChild(this.#resultNode);
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
      row.style.display = 'grid';
      row.style.gridTemplateColumns = 'minmax(92px, 42%) 1fr';
      row.style.gap = '8px';
      const labelElement = createElement('span', { className: 'dtf-document-label', textContent: label });
      labelElement.style.color = '#a8a8a8';
      const valueElement = createElement('strong', { textContent: String(value) });
      valueElement.style.color = '#f2f2f2';
      row.appendChild(labelElement);
      row.appendChild(valueElement);
      this.#resultNode.appendChild(row);
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
