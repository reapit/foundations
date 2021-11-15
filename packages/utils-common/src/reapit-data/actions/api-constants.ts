export const ApiNames = {
  platform:
    globalThis.reapit?.config?.appEnv !== 'production'
      ? 'https://platform.dev.paas.reapit.cloud'
      : 'https://platform.reapit.cloud',
  pipeline:
    globalThis.reapit?.config?.appEnv !== 'production'
      ? 'https://f504fbivda.execute-api.eu-west-2.amazonaws.com/dev'
      : '',
}

export enum PathNames {
  apps = '/marketplace/apps',
  installations = '/marketplace/installations',
  pipeline = '/pipeline/{appId}',
}
