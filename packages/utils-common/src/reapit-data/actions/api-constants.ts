export type AppEnv = 'local' | 'development' | 'production'

export const ApiNames = (appEnv: AppEnv) => {
  return {
    platform: appEnv !== 'production' ? 'https://platform.dev.paas.reapit.cloud' : 'https://platform.reapit.cloud',
    pipeline:
      appEnv !== 'production'
        ? 'https://deployments.dev.paas.reapit.cloud'
        : 'https://deployments.prod.paas.reapit.cloud',
    apiKey:
      appEnv !== 'production'
        ? 'https://api-key.dev.paas.reapit.cloud/api-key'
        : 'https://api-key.prod.paas.reapit.cloud/api-key',
    iaas: `${appEnv !== 'production' ? '.dev' : 'prod'}.paas.reapit.cloud`,
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
  updatePipeline = '/pipeline/{pipelineId}',
  getPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  createPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  appPermissions = '/marketplace/scopes',
  getApiKeyByUserId = '/user/{email}',
  createApiKeyByMember = '/user',
  getMember = '/marketplace/developers/{developerId}/members',
  deleteApiKey = '/{apiKeyId}',
  billingDataByMonth = '/trafficevents/billing/{month}/',
  getBillingDataByPeriod = '/trafficevents/billing/',
  developerById = '/marketplace/developers/{developerId}',
  customersById = '/marketplace/customers/{customerId}',
  developers = '/marketplace/developers',
  appSecretById = '/marketplace/apps/{appId}/secret',
  desktopIntegrationTypes = '/marketplace/desktopIntegrationTypes',
  appCategories = '/marketplace/categories',
  appRevision = '/marketplace/apps/{appId}/revisions',
  officeGroupId = '/organisations/organisations/{orgId}/officegroups/{groupId}',
  fileUpload = '/fileUpload',
  terminateInstallation = '/marketplace/installations/{installationId}/terminate',
  appRevisions = '/marketplace/apps/{appId}/revisions',
  cancelRevision = '/marketplace/apps/{appId}/revisions/{revisionId}/reject',
  paginatePipeline = '/pipeline',
  trafficStatistics = '/trafficevents/trafficStatistics',
  memberById = '/marketplace/developers/{developerId}/members/{memberId}',
  subscriptions = '/marketplace/subscriptions',
  subscriptionsById = '/marketplace/subscriptions/{subscriptionId}',
  webhooksPing = '/webhooks/subscriptions/{subscriptionId}/ping',
  webhookSubscriptions = '/webhooks/subscriptions',
  webhookSubscriptionsId = '/webhooks/subscriptions/{webhookId}',
  webhookTopics = '/webhooks/topics',
  webhookLogs = '/webhooks/logs',
  memberInviteAccept = '/marketplace/developers/{developerId}/members/{memberId}/accept',
  memberInviteReject = '/marketplace/developers/{developerId}/members/{memberId}/reject',
  getPipelineEnvironment = '/pipeline/{pipelineId}/parameter',
  upsertPipelineEnvironment = '/pipeline/{pipelineId}/parameter',
  publicWebhookKey = '/webhooks/signing',
  appConsents = '/marketplace/apps/{appId}/revisions/{revisionId}/consents',
  appConsentResend = '/marketplace/apps/{appId}/revisions/{revisionId}/consents/{consentId}/resend',
}
