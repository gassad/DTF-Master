console.log('APPSHELL START');

import { SidebarPanel } from './components/SidebarPanel.js';
import { DocumentAnalysisPanel } from './components/DocumentAnalysisPanel.js';
import { SettingsPanel } from './components/SettingsPanel.js';

export function createAppShell({ mountNode, config, settingsService, eventBus, logger }) {
  if (!mountNode) {
    throw new Error('DTF MASTER mount node was not found.');
  }

  mountNode.innerHTML = '';
  mountNode.classList.add('dtf-master-root');
  mountNode.style.display = 'block';
  mountNode.style.visibility = 'visible';
  mountNode.style.opacity = '1';
  mountNode.style.minWidth = '320px';
  mountNode.style.minHeight = '240px';

  const shell = document.createElement('main');
  shell.className = 'dtf-shell';
  shell.style.display = 'grid';
  shell.style.gridTemplateColumns = 'minmax(128px, 38%) minmax(180px, 1fr)';
  shell.style.minWidth = '320px';
  shell.style.minHeight = '240px';
  shell.style.color = '#f2f2f2';
  shell.style.background = '#171717';

  const content = document.createElement('section');
  content.className = 'dtf-main-panel';
  content.style.display = 'grid';
  content.style.alignContent = 'start';
  content.style.gap = '24px';
  content.style.padding = '16px';
  content.style.minHeight = '160px';

  const sidebar = new SidebarPanel({
    config,
    eventBus,
    logger: logger.child('SidebarPanel')
  });
  console.log('SIDEBAR CREATED');

  const documentAnalysis = new DocumentAnalysisPanel({
    eventBus,
    logger: logger.child('DocumentAnalysisPanel')
  });
  console.log('DOCUMENT PANEL CREATED');

  const settings = new SettingsPanel({
    settingsService,
    eventBus,
    logger: logger.child('SettingsPanel')
  });
  console.log('SETTINGS PANEL CREATED');

  console.log('RENDER SIDEBAR');
  const sidebarElement = sidebar.render();
  assertHTMLElement(sidebarElement, 'SidebarPanel.render()');

  console.log('RENDER DOCUMENT');
  const documentElement = documentAnalysis.render();
  assertHTMLElement(documentElement, 'DocumentAnalysisPanel.render()');

  console.log('RENDER SETTINGS');
  const settingsElement = settings.render();
  assertHTMLElement(settingsElement, 'SettingsPanel.render()');

  content.appendChild(documentElement);
  content.appendChild(settingsElement);
  shell.appendChild(sidebarElement);
  shell.appendChild(content);
  mountNode.appendChild(shell);

  console.log('APPENDED');
  inspectRenderedDom(mountNode, shell);

  return shell;
}

function assertHTMLElement(element, source) {
  if (!element || typeof element !== 'object' || typeof element.appendChild !== 'function') {
    throw new Error(source + ' did not return an HTMLElement.');
  }
}

function inspectRenderedDom(mountNode, shell) {
  const inspect = () => {
    const app = document.getElementById('dtf-master-app');
    const computed = typeof getComputedStyle === 'function' ? getComputedStyle : null;
    const nodes = [
      ['#dtf-master-app', app],
      ['.dtf-shell', shell],
      ['.dtf-sidebar', shell.querySelector?.('.dtf-sidebar')],
      ['.dtf-main-panel', shell.querySelector?.('.dtf-main-panel')],
      ['.dtf-document-panel', shell.querySelector?.('.dtf-document-panel')],
      ['.dtf-settings', shell.querySelector?.('.dtf-settings')]
    ];

    console.log('DOM INSPECT #dtf-master-app innerHTML', app?.innerHTML ?? null);
    console.log('DOM INSPECT #dtf-master-app childElementCount', app?.children?.length ?? 0);
    console.log('DOM INSPECT .dtf-shell childElementCount', shell?.children?.length ?? 0);

    nodes.forEach(([name, node]) => {
      if (!node) {
        console.log('DOM INSPECT MISSING', name);
        return;
      }

      const rect = typeof node.getBoundingClientRect === 'function'
        ? node.getBoundingClientRect()
        : { width: node.offsetWidth ?? null, height: node.offsetHeight ?? null };
      const style = computed ? computed(node) : null;

      console.log('DOM INSPECT NODE', name, {
        connected: Boolean(node.isConnected),
        childElementCount: node.children?.length ?? 0,
        width: rect.width,
        height: rect.height,
        display: style?.display ?? node.style?.display ?? null,
        visibility: style?.visibility ?? node.style?.visibility ?? null,
        opacity: style?.opacity ?? node.style?.opacity ?? null,
        text: node.textContent
      });
    });
  };

  inspect();
  setTimeout(inspect, 0);
}
