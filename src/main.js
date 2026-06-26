import { PluginController } from './core/PluginController.js';
import { DEFAULT_CONFIG } from './config/defaultConfig.js';
import { Logger } from './utils/Logger.js';

console.log('BOOTSTRAP 1');

const logger = new Logger({ context: 'Bootstrap' });

console.log('BOOTSTRAP 2');

const controller = new PluginController({ defaultConfig: DEFAULT_CONFIG, logger });

console.log('BOOTSTRAP 3');

controller.bootstrap().catch((error) => {
  console.error(error);
  throw error;
});
