import { PluginController } from './core/PluginController.js';
import { DEFAULT_CONFIG } from './config/defaultConfig.js';
import { Logger } from './utils/Logger.js';

const logger = new Logger({ context: 'Bootstrap' });
const controller = new PluginController({ defaultConfig: DEFAULT_CONFIG, logger });

controller.bootstrap().catch((error) => {
  logger.error('Failed to bootstrap DTF MASTER.', { error });
});
