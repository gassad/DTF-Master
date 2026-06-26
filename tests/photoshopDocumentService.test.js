import assert from 'node:assert/strict';
import test from 'node:test';
import { PhotoshopDocumentService } from '../src/services/PhotoshopDocumentService.js';

const logger = {
  error() {},
  info() {},
  debug() {},
  warn() {},
  child() { return this; }
};

test('PhotoshopDocumentService returns normalized active document info', async () => {
  const service = new PhotoshopDocumentService({
    logger,
    photoshopApi: {
      app: {
        activeDocument: {
          title: 'design.psd',
          width: { value: 1200 },
          height: { value: 900 },
          resolution: 300,
          mode: 'RGBColorMode',
          bitsPerChannel: 8,
          layers: [{}, { layers: [{}] }]
        }
      }
    }
  });

  assert.deepEqual(await service.getDocumentInfo(), {
    fileName: 'design.psd',
    width: 1200,
    height: 900,
    dpi: 300,
    colorMode: 'RGBColorMode',
    bitDepth: 8,
    totalLayers: 3
  });
});

test('PhotoshopDocumentService throws when no document is open', () => {
  const service = new PhotoshopDocumentService({ logger, photoshopApi: { app: { activeDocument: null } } });
  assert.throws(() => service.getActiveDocument(), /No active Photoshop document/);
});
