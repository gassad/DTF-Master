import { SidebarPanel } from './components/SidebarPanel.js';
import { DocumentAnalysisPanel } from './components/DocumentAnalysisPanel.js';
import { SettingsPanel } from './components/SettingsPanel.js';

export function createAppShell({ mountNode, config, settingsService, eventBus, logger }) {
  mountNode.innerHTML = '';
  mountNode.classList.add('dtf-master-root');
  const shell = document.createElement('main');
  shell.className = 'dtf-shell';
  const content = document.createElement('section');
  content.className = 'dtf-main-panel';
  const sidebar = new SidebarPanel({ config, eventBus, logger: logger.child('SidebarPanel') });
  const documentAnalysis = new DocumentAnalysisPanel({ eventBus, logger: logger.child('DocumentAnalysisPanel') });
  const settings = new SettingsPanel({ settingsService, eventBus, logger: logger.child('SettingsPanel') });
  content.append(documentAnalysis.render(), settings.render());
  shell.append(sidebar.render(), content);
  mountNode.append(shell);
  return shell;
}
