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
import { PhotoshopDocumentService } from '../services/PhotoshopDocumentService.js';
import { createAppShell } from '../ui/appShell.js';

export class PluginController {
  #configManager;
  #eventBus;
  #settingsService;
  #documentService;
  #logger;
  #engines;

  constructor({ defaultConfig, logger }) {
    this.#logger = logger.child('PluginController');
    this.#eventBus = new EventBus({ logger: this.#logger.child('EventBus') });
    this.#configManager = new ConfigManager({ defaultConfig, logger: this.#logger.child('ConfigManager') });
    this.#settingsService = new SettingsService({ configManager: this.#configManager, eventBus: this.#eventBus, logger: this.#logger.child('SettingsService') });
    this.#documentService = new PhotoshopDocumentService({ logger: this.#logger.child('PhotoshopDocumentService') });
    this.#engines = this.#createEngines();
  }

  async bootstrap() {
    console.log('BOOTSTRAP START');
    await this.#configManager.load();
    console.log('CONFIG LOADED');
    await this.#settingsService.load();
    console.log('SETTINGS LOADED');
    this.#registerDocumentEvents();
    const mountNode = document.getElementById('dtf-master-app') ?? document.body;
    console.log('CREATING APP SHELL');
    await createAppShell({ mountNode, config: this.#configManager.snapshot(), settingsService: this.#settingsService, eventBus: this.#eventBus, logger: this.#logger.child('UI') });
    console.log('APP SHELL CREATED');
    this.#eventBus.emit('plugin:ready', { engines: Object.keys(this.#engines) });
  }

  #registerDocumentEvents() {
    this.#eventBus.on('document:analyzeRequested', async () => {
      try {
        const info = await this.#documentService.getDocumentInfo();
        this.#eventBus.emit('document:infoLoaded', { info });
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
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
