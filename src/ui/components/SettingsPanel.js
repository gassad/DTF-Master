import { createElement } from '../../utils/dom.js';

export class SettingsPanel {
  #settingsService;

  constructor({ settingsService }) {
    console.log('CONSTRUCTOR OK');
    this.#settingsService = settingsService;
  }

  render() {
    console.log('RENDER START');
    const panel = createElement('section', { className: 'dtf-settings' });
    panel.style.display = 'grid';
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
    panel.style.gap = '12px';

    const heading = createElement('h2', { textContent: 'Settings' });
    heading.style.margin = '0';
    heading.style.color = '#f2f2f2';
    heading.style.fontSize = '16px';

    const preserveLayers = createElement('input', { attributes: { type: 'checkbox', name: 'preserveOriginalLayers' } });
    preserveLayers.checked = Boolean(this.#settingsService.get('preserveOriginalLayers'));
    preserveLayers.addEventListener('change', () => this.#settingsService.update('preserveOriginalLayers', preserveLayers.checked));

    const row = createElement('label', { className: 'dtf-setting-row' });
    row.style.display = 'grid';
    row.style.gridTemplateColumns = '1fr auto';
    row.style.alignItems = 'center';
    row.style.gap = '12px';
    row.style.color = '#f2f2f2';
    row.appendChild(createElement('span', { textContent: 'Preserve layers' }));
    row.appendChild(preserveLayers);

    panel.appendChild(heading);
    panel.appendChild(row);
    console.log('RENDER END');
    return panel;
  }
}
