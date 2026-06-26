import { SidebarPanel } from './components/SidebarPanel.js';
import { SettingsPanel } from './components/SettingsPanel.js';

export function createAppShell({ mountNode, config, settingsService, eventBus, logger }) {
  mountNode.innerHTML = '';
  mountNode.classList.add('dtf-master-root');
  const shell = document.createElement('main');
  shell.className = 'dtf-shell';
  const sidebar = new SidebarPanel({ config, eventBus, logger: logger.child('SidebarPanel') });
  const settings = new SettingsPanel({ settingsService, eventBus, logger: logger.child('SettingsPanel') });
  shell.append(sidebar.render(), settings.render());
  mountNode.append(shell);
  return shell;
}
