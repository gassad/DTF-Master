console.log('APPSHELL START');

export async function createAppShell({ mountNode, config, settingsService, eventBus, logger }) {
  const [{ SidebarPanel }, { DocumentAnalysisPanel }, { SettingsPanel }] = await Promise.all([
    import('./components/SidebarPanel.js'),
    import('./components/DocumentAnalysisPanel.js'),
    import('./components/SettingsPanel.js')
  ]);

  mountNode.innerHTML = '';
  mountNode.classList.add('dtf-master-root');

  const shell = document.createElement('main');
  shell.className = 'dtf-shell';

  const content = document.createElement('section');
  content.className = 'dtf-main-panel';

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
  console.log('RENDER DOCUMENT');
  const documentElement = documentAnalysis.render();
  console.log('RENDER SETTINGS');
  const settingsElement = settings.render();

  content.append(documentElement, settingsElement);
  shell.append(sidebarElement, content);
  mountNode.append(shell);
  console.log('APPENDED');

  return shell;
}
