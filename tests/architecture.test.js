import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';

const files = [
  '../src/core/PluginController.js',
  '../src/core/ConfigManager.js',
  '../src/core/EventBus.js',
  '../src/core/SettingsService.js',
  '../src/engine/ImageAnalyzer.js',
  '../src/engine/Cleaner.js',
  '../src/engine/Sharpen.js',
  '../src/engine/ColorEngine.js',
  '../src/engine/WhiteInk.js',
  '../src/engine/HalftoneEngine.js',
  '../src/engine/TrapEngine.js',
  '../src/engine/ExportEngine.js'
];

test('required files exist', async () => {
  await Promise.all(files.map((file) => access(new URL(file, import.meta.url))));
  assert.equal(files.length, 12);
});
