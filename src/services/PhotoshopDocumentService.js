/**
 * Read-only adapter for the Adobe Photoshop UXP API.
 *
 * This service is the only module in this feature that talks directly to
 * Photoshop. UI components request document data through application events;
 * they never access the Adobe API themselves.
 */
export class PhotoshopDocumentService {
  #photoshopApi;
  #logger;

  /**
   * @param {object} dependencies
   * @param {object} [dependencies.photoshopApi] Optional Photoshop API instance for tests.
   * @param {import('../utils/Logger.js').Logger} dependencies.logger Scoped logger.
   */
  constructor({ photoshopApi = null, logger }) {
    this.#photoshopApi = photoshopApi;
    this.#logger = logger;
  }

  /**
   * Returns the active Photoshop document without changing it.
   *
   * Adobe UXP exposes Photoshop through the built-in photoshop module. In the
   * plugin runtime, require('photoshop').app.activeDocument points to the open
   * document currently targeted by Photoshop.
   *
   * @returns {object} Active Photoshop document.
   * @throws {Error} When Photoshop API is unavailable or no document is open.
   */
  getActiveDocument() {
    const app = this.#getPhotoshopApp();
    const document = app.activeDocument;

    if (!document) {
      throw new Error('No Photoshop document is open. Open a document and try again.');
    }

    return document;
  }

  /**
   * Reads a normalized, UI-safe document information object.
   *
   * @returns {Promise<PhotoshopDocumentInfo>}
   */
  async getDocumentInfo() {
    const document = this.getActiveDocument();
    const canvasSize = this.getCanvasSize(document);

    return {
      fileName: this.#readFileName(document),
      width: canvasSize.width,
      height: canvasSize.height,
      dpi: this.getResolution(document),
      colorMode: this.getColorMode(document),
      bitDepth: this.getBitDepth(document),
      totalLayers: this.getLayerCount(document)
    };
  }

  /**
   * Counts all top-level and nested layers available on the document object.
   *
   * @param {object} [document=this.getActiveDocument()] Photoshop document.
   * @returns {number}
   */
  getLayerCount(document = this.getActiveDocument()) {
    return this.#countLayers(document.layers ?? []);
  }

  /**
   * Reads the Photoshop document resolution in DPI/PPI.
   *
   * @param {object} [document=this.getActiveDocument()] Photoshop document.
   * @returns {number}
   */
  getResolution(document = this.getActiveDocument()) {
    return this.#toNumber(document.resolution);
  }

  /**
   * Reads the Photoshop document color mode as a display-safe string.
   *
   * @param {object} [document=this.getActiveDocument()] Photoshop document.
   * @returns {string}
   */
  getColorMode(document = this.getActiveDocument()) {
    return String(this.#toDisplayValue(document.mode ?? document.colorMode ?? 'unknown'));
  }

  /**
   * Reads the Photoshop document bit depth as a display-safe string or number.
   *
   * @param {object} [document=this.getActiveDocument()] Photoshop document.
   * @returns {string|number}
   */
  getBitDepth(document = this.getActiveDocument()) {
    return this.#toDisplayValue(document.bitsPerChannel ?? document.bitDepth ?? 'unknown');
  }

  /**
   * Reads the Photoshop canvas size without changing units or resizing content.
   *
   * @param {object} [document=this.getActiveDocument()] Photoshop document.
   * @returns {{ width: number, height: number }}
   */
  getCanvasSize(document = this.getActiveDocument()) {
    return {
      width: this.#toNumber(document.width),
      height: this.#toNumber(document.height)
    };
  }

  /**
   * Resolves the Photoshop application object from UXP or injected test API.
   *
   * @returns {object}
   */
  #getPhotoshopApp() {
    if (!this.#photoshopApi) {
      const photoshopRequire = globalThis.require ?? (typeof require === 'function' ? require : null);
      this.#photoshopApi = photoshopRequire?.('photoshop') ?? null;
    }

    const app = this.#photoshopApi?.app;

    if (!app) {
      this.#logger.error('Adobe Photoshop UXP API is unavailable.');
      throw new Error('Photoshop is not available. Open the plugin inside Photoshop and try again.');
    }

    return app;
  }

  /**
   * Reads the most stable file name-like property exposed by the document.
   *
   * @param {object} document Photoshop document.
   * @returns {string}
   */
  #readFileName(document) {
    return String(document.title ?? document.name ?? document.fileName ?? 'Untitled');
  }

  /**
   * Counts nested Photoshop layers, including groups when their children exist.
   *
   * @param {Array|object} layers Photoshop layer collection.
   * @returns {number}
   */
  #countLayers(layers) {
    const layerList = Array.from(layers ?? []);

    return layerList.reduce((total, layer) => {
      const childLayers = layer.layers ?? layer.children ?? [];
      return total + 1 + this.#countLayers(childLayers);
    }, 0);
  }

  /**
   * Converts UXP numeric wrappers and unit values into plain numbers.
   *
   * @param {unknown} value Photoshop value.
   * @returns {number}
   */
  #toNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value?.value === 'number') return value.value;

    const parsed = Number.parseFloat(String(value ?? 0));
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Converts Photoshop enum-like values into plain strings where needed.
   *
   * @param {unknown} value Photoshop value.
   * @returns {string|number}
   */
  #toDisplayValue(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return value;
    if (value?.name) return String(value.name);
    if (value?.value) return this.#toDisplayValue(value.value);
    return String(value ?? 'unknown');
  }
}

/**
 * @typedef {object} PhotoshopDocumentInfo
 * @property {string} fileName
 * @property {number} width
 * @property {number} height
 * @property {number} dpi
 * @property {string} colorMode
 * @property {string|number} bitDepth
 * @property {number} totalLayers
 */
