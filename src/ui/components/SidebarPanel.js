import { createElement } from '../../utils/dom.js';

const WORKFLOW_ITEMS = Object.freeze(['Analyze', 'Clean', 'Sharpen', 'Color', 'White Ink', 'Halftone', 'Trap', 'Export']);

export class SidebarPanel {
  #config;
  #eventBus;
  #logger;

  constructor({ config, eventBus, logger }) {
    console.log('CONSTRUCTOR OK');
    this.#config = config;
    this.#eventBus = eventBus;
    this.#logger = logger;
  }

  render() {
    console.log('RENDER START');
    const panel = createElement('section', { className: 'dtf-sidebar' });
    panel.style.display = 'block';
    panel.style.visibility = 'visible';
    panel.style.opacity = '1';
    panel.style.minHeight = '160px';
    panel.style.padding = '16px';
    panel.style.background = '#222';
    panel.style.borderRight = '1px solid #3a3a3a';

    const title = createElement('h1', { textContent: this.#config.appName });
    title.style.margin = '0';
    title.style.color = '#f2f2f2';
    title.style.fontSize = '16px';

    const nav = createElement('nav', { className: 'dtf-workflow' });
    nav.style.display = 'grid';
    nav.style.gap = '8px';
    nav.style.marginTop = '24px';

    WORKFLOW_ITEMS.forEach((label) => {
      const button = createElement('button', { className: 'dtf-workflow-button', textContent: label, attributes: { type: 'button' } });
      button.style.minHeight = '32px';
      button.style.color = '#f2f2f2';
      button.style.background = 'transparent';
      button.style.border = '1px solid transparent';
      button.style.textAlign = 'left';
      button.addEventListener('click', () => {
        this.#logger.info('Workflow selected.', { label });
        this.#eventBus.emit('workflow:selected', { label });
      });
      nav.appendChild(button);
    });

    panel.appendChild(title);
    panel.appendChild(nav);
    console.log('RENDER END');
    return panel;
  }
}
