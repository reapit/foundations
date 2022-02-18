export type AppEnv = 'local' | 'development' | 'production'

export const ApiNames = (appEnv: AppEnv) => {
  return {
    platform: appEnv !== 'production' ? 'https://platform.dev.paas.reapit.cloud' : 'https://platform.reapit.cloud',
    pipeline: appEnv !== 'production' ? 'https://deployments.dev.paas.reapit.cloud' : '',
    apiKey: appEnv !== 'production' ? 'https://api-key.dev.paas.reapit.cloud/api-key' : '',
  }
}

export enum PathNames {
  apps = '/marketplace/apps',
  appsId = '/marketplace/apps/{appId}',
  installations = '/marketplace/installations',
  getPipeline = '/pipeline/{appId}',
  products = '/marketplace/products',
  sandboxes = '/marketplace/sandboxes',
  createPipeline = '/pipeline',
  getPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  createPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  appPermissions = '/marketplace/scopes',
  getApiKeyByUserId = '/user/{email}',
  createApiKeyByMember = '/user',
  getMember = '/marketplace/developers/{developerId}/members',
  deleteApiKey = '/{apiKeyId}',
  billingDataByMonth = '/trafficevents/billing/{month}/',
  developerById = '/marketplace/developers/{developerId}',
  customersById = '/marketplace/customers/{customerId}',
  developers = '/marketplace/developers',
  appSecretById = '/marketplace/apps/{appId}/secret',
  desktopIntegrationTypes = '/marketplace/desktopIntegrationTypes',
}
