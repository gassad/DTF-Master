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
    const title = createElement('h1', { textContent: this.#config.appName });
    const nav = createElement('nav', { className: 'dtf-workflow' });
    WORKFLOW_ITEMS.forEach((label) => {
      const button = createElement('button', { className: 'dtf-workflow-button', textContent: label, attributes: { type: 'button' } });
      button.addEventListener('click', () => {
        this.#logger.info('Workflow selected.', { label });
        this.#eventBus.emit('workflow:selected', { label });
      });
      nav.append(button);
    });
    panel.append(title, nav);
    console.log('RENDER END');
    return panel;
  }
}
