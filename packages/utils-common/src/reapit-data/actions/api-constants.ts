export type AppEnv = 'local' | 'development' | 'production'

export const ApiNames = (appEnv: AppEnv) => {
  return {
    platform: appEnv !== 'production' ? 'https://platform.dev.paas.reapit.cloud' : 'https://platform.reapit.cloud',
    pipeline: appEnv !== 'production' ? 'https://deployments.dev.paas.reapit.cloud' : '',
    apiKey: appEnv !== 'production' ? 'https://api-keys.dev.paas.reapit.cloud' : '',
  }
}

export enum PathNames {
  apps = '/marketplace/apps',
  installations = '/marketplace/installations',
  getPipeline = '/pipeline/{appId}',
  products = '/marketplace/products',
  sandboxes = '/marketplace/sandboxes',
  createPipeline = '/pipeline',
  getPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  createPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  appPermissions = '/marketplace/scopes',
  getApiKeyByUserId = '/user/{userId}',
}
