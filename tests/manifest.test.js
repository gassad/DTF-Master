import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('manifest is configured for Photoshop panel', async () => {
  const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));
  assert.equal(manifest.manifestVersion, 5);
  assert.equal(manifest.host.app, 'PS');
  assert.equal(manifest.main, 'src/index.html');
});
