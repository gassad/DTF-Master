export const DEFAULT_CONFIG = Object.freeze({
  appName: 'DTF MASTER',
  version: '0.1.0',
  environment: 'production',
  logging: {
    level: 'info'
  },
  ui: {
    panelId: 'dtf-master-panel',
    theme: 'system'
  },
  settings: {
    autoAnalyzeDocument: false,
    preserveOriginalLayers: true,
    defaultExportFormat: 'png',
    workingColorMode: 'document'
  }
});
