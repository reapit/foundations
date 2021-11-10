export const ApiNames = {
  platform:
    window.reapit?.config?.appEnv !== 'production'
      ? 'https://platform.dev.paas.reapit.cloud'
      : 'https://platform.reapit.cloud',
}

export enum PathNames {
  apps = '/marketplace/apps',
}
