import { ConfigManager } from './ConfigManager.js';
import { EventBus } from './EventBus.js';
import { SettingsService } from './SettingsService.js';
import { ImageAnalyzer } from '../engine/ImageAnalyzer.js';
import { Cleaner } from '../engine/Cleaner.js';
import { Sharpen } from '../engine/Sharpen.js';
import { ColorEngine } from '../engine/ColorEngine.js';
import { WhiteInk } from '../engine/WhiteInk.js';
import { HalftoneEngine } from '../engine/HalftoneEngine.js';
import { TrapEngine } from '../engine/TrapEngine.js';
import { ExportEngine } from '../engine/ExportEngine.js';
import { createAppShell } from '../ui/appShell.js';

export class PluginController {
  #configManager;
  #eventBus;
  #settingsService;
  #logger;
  #engines;

  constructor({ defaultConfig, logger }) {
    this.#logger = logger.child('PluginController');
    this.#eventBus = new EventBus({ logger: this.#logger.child('EventBus') });
    this.#configManager = new ConfigManager({ defaultConfig, logger: this.#logger.child('ConfigManager') });
    this.#settingsService = new SettingsService({ configManager: this.#configManager, eventBus: this.#eventBus, logger: this.#logger.child('SettingsService') });
    this.#engines = this.#createEngines();
  }

  async bootstrap() {
    await this.#configManager.load();
    await this.#settingsService.load();
    const mountNode = document.getElementById('dtf-master-app') ?? document.body;
    createAppShell({ mountNode, config: this.#configManager.snapshot(), settingsService: this.#settingsService, eventBus: this.#eventBus, logger: this.#logger.child('UI') });
    this.#eventBus.emit('plugin:ready', { engines: Object.keys(this.#engines) });
  }

  #createEngines() {
    const dependencies = { eventBus: this.#eventBus, configManager: this.#configManager, logger: this.#logger };
    return {
      imageAnalyzer: new ImageAnalyzer(dependencies),
      cleaner: new Cleaner(dependencies),
      sharpen: new Sharpen(dependencies),
      colorEngine: new ColorEngine(dependencies),
      whiteInk: new WhiteInk(dependencies),
      halftoneEngine: new HalftoneEngine(dependencies),
      trapEngine: new TrapEngine(dependencies),
      exportEngine: new ExportEngine(dependencies)
    };
  }
}
