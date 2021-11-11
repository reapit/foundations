export const ApiNames = {
  platform:
    globalThis.reapit?.config?.appEnv !== 'production'
      ? 'https://platform.dev.paas.reapit.cloud'
      : 'https://platform.reapit.cloud',
}

export enum PathNames {
  apps = '/marketplace/apps',
  installations = '/marketplace/installations',
}
