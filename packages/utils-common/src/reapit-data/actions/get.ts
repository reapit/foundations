import { ApiNames, AppEnv, PathNames } from './api-constants'

export interface GetAction {
  api: string
  path: PathNames
  errorMessage?: string
  successMessage?: string
}

export enum GetActionNames {
  getApps = 'getApps',
  getPipeline = 'getPipeline',
  paginatePipeline = 'paginatePipeline',
  getPipelineDeployments = 'getPipelineDeployments',
  getProducts = 'getProducts',
  getSandboxes = 'getSandboxes',
  getAppPermissions = 'getAppPermissions',
  getApiKeysByUserId = 'getApiKeysByUserId',
  getMember = 'getMember',
  deleteApiKey = 'deleteApiKey',
  getBillingDataByMonth = 'getBillingDataByMonth',
  getBillingDataByPeriod = 'getBillingDataByPeriod',
  getInstallations = 'getInstallations',
  getDeveloperMembers = 'getDeveloperMembers',
  getCustomersById = 'getCustomersById',
  getAppById = 'getAppById',
  getAppSecret = 'getAppSecret',
  getDesktopIntegrationTypes = 'getDesktopIntegrationTypes',
  getAppCategories = 'getAppCategories',
  getAppRevisions = 'getAppRevisions',
  getDeveloper = 'getDeveloper',
  getTrafficStats = 'getTrafficStats',
  getSubscriptions = 'getSubscriptions',
  getWebhookSubscriptions = 'getWebhookSubscriptions',
  getWebhookTopics = 'getWebhookTopics',
  getWebhookLogs = 'getWebhookLogs',
  getPipelineEnvironment = 'getPipelineEnvironment',
  getPublicWebhookKey = 'getPublicWebhookKey',
  getRevisionConsents = 'getRevisionConsents',
  getAppMarketAdmin = 'getAppMarketAdmin',
  getAppMarketAdminLive = 'getAppMarketAdminLive',
  postAppMarketAdmin = 'postAppMarketAdmin',
  getPropertyById = 'getPropertyById',
  getProperties = 'getProperties',
  getPayments = 'getPayments',
  getPaymentById = 'getPaymentById',
  getPaymentWithPropertyById = 'getPaymentWithPropertyById',
  getUserInfo = 'getUserInfo',
  getUserById = 'getUserById',
  getCustomers = 'getCustomers',
  getDevelopers = 'getDevelopers',
  getApprovals = 'getApprovals',
  getRevisionById = 'getRevisionById',
  getDwAccounts = 'getDwAccounts',
  getDwAccountById = 'getDwAccountById',
  getDwDataSets = 'getDwDataSets',
  getDwShares = 'getDwShares',
}

export type GetActions = { [key in GetActionNames]: GetAction }

export const getActions = (appEnv: AppEnv): GetActions => ({
  [GetActionNames.getApps]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong fetching apps - this error has been logged',
  },
  [GetActionNames.getDwAccounts]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.dwAccounts,
    errorMessage: 'Something went wrong fetching accounts - this error has been logged',
  },
  [GetActionNames.getDwDataSets]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.dwDataSets,
    errorMessage: 'Something went wrong fetching data sets - this error has been logged',
  },
  [GetActionNames.getDwShares]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.dwShares,
    errorMessage: 'Something went wrong fetching shares - this error has been logged',
  },
  [GetActionNames.getDwAccountById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.dwAccountsId,
    errorMessage: 'Something went wrong fetching account - this error has been logged',
  },
  [GetActionNames.getAppMarketAdmin]: {
    api: ApiNames(appEnv).appMarketCms,
    path: PathNames.cmsConfig,
    errorMessage: 'Something went wrong fetching config - this error has been logged',
  },
  [GetActionNames.getAppMarketAdminLive]: {
    api: ApiNames(appEnv).appMarketCms,
    path: PathNames.cmsConfigLive,
    errorMessage: 'Something went wrong fetching config - this error has been logged',
  },
  [GetActionNames.postAppMarketAdmin]: {
    api: ApiNames(appEnv).appMarketCms,
    path: PathNames.cmsConfigPost,
    errorMessage: 'Something went wrong updating config - this error has been logged',
  },
  [GetActionNames.getAppById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appsId,
    errorMessage: 'Something went wrong fetching app details',
  },
  [GetActionNames.getPipeline]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.getPipeline,
  },
  [GetActionNames.getPipelineDeployments]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.getPipelineDeployments,
  },
  [GetActionNames.getProducts]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.products,
    errorMessage: 'Something went wrong fetching products',
  },
  [GetActionNames.getSandboxes]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.sandboxes,
    errorMessage: 'Something went wrong fetching sandboxes',
  },
  [GetActionNames.getAppPermissions]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appPermissions,
    errorMessage: 'Something went wrong fetching app permissions',
  },
  [GetActionNames.getApiKeysByUserId]: {
    api: ApiNames(appEnv).apiKey,
    path: PathNames.getApiKeyByUserId,
  },
  [GetActionNames.getMember]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.getMember,
  },
  [GetActionNames.deleteApiKey]: {
    api: ApiNames(appEnv).apiKey,
    path: PathNames.deleteApiKey,
  },
  [GetActionNames.getBillingDataByMonth]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.billingDataByMonth,
    errorMessage: 'Something went wrong fetching billing data',
  },
  [GetActionNames.getBillingDataByPeriod]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.getBillingDataByPeriod,
    errorMessage: 'Something went wrong fetching billing data',
  },
  [GetActionNames.getInstallations]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.installations,
    errorMessage: 'Something went wrong fetching installations',
  },
  [GetActionNames.getDeveloperMembers]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.getMember,
    errorMessage: 'Something went wrong fetching developer org members',
  },
  [GetActionNames.getDeveloper]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.developerById,
    errorMessage: 'Something went wrong fetching developer org',
  },
  [GetActionNames.getCustomersById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.customersById,
    errorMessage: 'Something went wrong fetching your customer information',
  },
  [GetActionNames.getAppSecret]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appSecretById,
    errorMessage: 'Something went wrong fetching your client secret',
  },
  [GetActionNames.getDesktopIntegrationTypes]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.desktopIntegrationTypes,
    errorMessage: 'Something went wrong fetching the desktop integration options',
  },
  [GetActionNames.getAppCategories]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appCategories,
    errorMessage: 'Something went wrong fetching the category options',
  },
  [GetActionNames.getAppRevisions]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appRevisions,
    errorMessage: 'Something went wrong fetching app revisions',
  },
  [GetActionNames.paginatePipeline]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.paginatePipeline,
    errorMessage: 'Something went wrong fetching pipelines',
  },
  [GetActionNames.getTrafficStats]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.trafficStatistics,
    errorMessage: 'Something went wrong fetching API calls data',
  },
  [GetActionNames.getSubscriptions]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.subscriptions,
    errorMessage: 'Something went wrong fetching subscriptions',
  },
  [GetActionNames.getWebhookSubscriptions]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookSubscriptions,
    errorMessage: 'Something went wrong fetching webhook subscriptions',
  },
  [GetActionNames.getWebhookTopics]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookTopics,
    errorMessage: 'Something went wrong fetching webhook topics',
  },
  [GetActionNames.getWebhookLogs]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookLogs,
    errorMessage: 'Something went wrong fetching webhook logs',
  },
  [GetActionNames.getPipelineEnvironment]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.getPipelineEnvironment,
  },
  [GetActionNames.getPublicWebhookKey]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.publicWebhookKey,
  },
  [GetActionNames.getRevisionConsents]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appConsents,
    errorMessage: 'Failed to fetch app revision consents',
  },
  [GetActionNames.getPropertyById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.propertyById,
    errorMessage: 'Failed to fetch property, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getProperties]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.properties,
    errorMessage: 'Failed to fetch properties, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPayments]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.payments,
    errorMessage: 'Failed to fetch payments, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPaymentById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.paymentById,
    errorMessage: 'Failed to fetch payment, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPaymentWithPropertyById]: {
    api: ApiNames(appEnv).payments,
    path: PathNames.paymentById,
    errorMessage: 'Failed to fetch payment, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getUserInfo]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.userInfo,
    errorMessage: 'Failed to fetch user info, this has been logged.',
  },
  [GetActionNames.getUserById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.userById,
    errorMessage: 'Failed to fetch user info, this has been logged.',
  },
  [GetActionNames.getCustomers]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.customers,
    errorMessage: 'Failed to fetch customers, this has been logged.',
  },
  [GetActionNames.getDevelopers]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.developers,
    errorMessage: 'Failed to fetch developers, this has been logged.',
  },
  [GetActionNames.getApprovals]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.approvals,
    errorMessage: 'Failed to fetch approvals, this has been logged.',
  },
  [GetActionNames.getRevisionById]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.revisionById,
    errorMessage: 'Failed to fetch revision, this has been logged.',
  },
})
