console.log('BOOTSTRAP 1');

try {
  const [{ PluginController }, { DEFAULT_CONFIG }, { Logger }] = await Promise.all([
    import('./core/PluginController.js'),
    import('./config/defaultConfig.js'),
    import('./utils/Logger.js')
  ]);

  console.log('BOOTSTRAP 2');

  const logger = new Logger({ context: 'Bootstrap' });
  const controller = new PluginController({ defaultConfig: DEFAULT_CONFIG, logger });

  console.log('BOOTSTRAP 3');

  await controller.bootstrap();
} catch (error) {
  console.error(error);
  throw error;
}
