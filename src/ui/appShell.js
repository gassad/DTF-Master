import { DocumentAnalysisPanel } from './components/DocumentAnalysisPanel.js';

export function createAppShell({ mountNode, eventBus, logger }) {
  mountNode.innerHTML = '';
  mountNode.classList.add('dtf-master-root');

  const shell = document.createElement('main');
  shell.className = 'dtf-shell';

  const documentAnalysis = new DocumentAnalysisPanel({
    eventBus,
    logger: logger.child('DocumentAnalysisPanel')
  });

  shell.append(documentAnalysis.render());
  mountNode.append(shell);

  return shell;
}
