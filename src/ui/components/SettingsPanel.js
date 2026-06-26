import { createElement } from '../../utils/dom.js';

export class SettingsPanel {
  #settingsService;

  constructor({ settingsService }) {
    this.#settingsService = settingsService;
  }

  render() {
    const panel = createElement('section', { className: 'dtf-settings' });
    const heading = createElement('h2', { textContent: 'Settings' });
    const preserveLayers = createElement('input', { attributes: { type: 'checkbox', name: 'preserveOriginalLayers' } });
    preserveLayers.checked = Boolean(this.#settingsService.get('preserveOriginalLayers'));
    preserveLayers.addEventListener('change', () => this.#settingsService.update('preserveOriginalLayers', preserveLayers.checked));
    const row = createElement('label', { className: 'dtf-setting-row' });
    row.append(createElement('span', { textContent: 'Preserve layers' }), preserveLayers);
    panel.append(heading, row);
    return panel;
  }
}
