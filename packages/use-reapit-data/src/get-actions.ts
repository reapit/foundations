import { ApiNames, PathNames } from './api-constants'

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
  getUsers = 'getUsers',
  getUserAuthenticators = 'getUserAuthenticators',
  getReferralTypes = 'getReferralTypes',
  getGroupsByOrgId = 'getGroupsByOrgId',
  getPaymentsClientConfig = 'getPaymentsClientConfig',
  getUserGroups = 'getUserGroups',
  getUserSuppressionList = 'getUserSuppressionList',
  getOrgs = 'getOrgs',
  getOrgConfig = 'getOrgConfig',
  getIps = 'getIps',
  getRules = 'getRules',
  getDwCustomers = 'getDwCustomers',
  getPipelineDnsConfig = 'getPipelineDnsConfig',
}

export type GetActions = { [key in GetActionNames]: GetAction }

export const getActions = {
  [GetActionNames.getApps]: {
    api: ApiNames.platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong fetching apps - this error has been logged',
  },
  [GetActionNames.getDwAccounts]: {
    api: ApiNames.platform,
    path: PathNames.dwAccounts,
    errorMessage: 'Something went wrong fetching accounts - this error has been logged',
  },
  [GetActionNames.getDwDataSets]: {
    api: ApiNames.platform,
    path: PathNames.dwDataSets,
    errorMessage: 'Something went wrong fetching data sets - this error has been logged',
  },
  [GetActionNames.getDwShares]: {
    api: ApiNames.platform,
    path: PathNames.dwShares,
    errorMessage: 'Something went wrong fetching shares - this error has been logged',
  },
  [GetActionNames.getDwAccountById]: {
    api: ApiNames.platform,
    path: PathNames.dwAccountsId,
    errorMessage: 'Something went wrong fetching account - this error has been logged',
  },
  [GetActionNames.getAppMarketAdmin]: {
    api: ApiNames.appMarketCms,
    path: PathNames.cmsConfig,
    errorMessage: 'Something went wrong fetching config - this error has been logged',
  },
  [GetActionNames.getAppMarketAdminLive]: {
    api: ApiNames.appMarketCms,
    path: PathNames.cmsConfigLive,
    errorMessage: 'Something went wrong fetching config - this error has been logged',
  },
  [GetActionNames.postAppMarketAdmin]: {
    api: ApiNames.appMarketCms,
    path: PathNames.cmsConfigPost,
    errorMessage: 'Something went wrong updating config - this error has been logged',
  },
  [GetActionNames.getAppById]: {
    api: ApiNames.platform,
    path: PathNames.appsId,
    errorMessage: 'Something went wrong fetching app details',
  },
  [GetActionNames.getPipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.getPipeline,
  },
  [GetActionNames.getPipelineDeployments]: {
    api: ApiNames.pipeline,
    path: PathNames.getPipelineDeployments,
  },
  [GetActionNames.getProducts]: {
    api: ApiNames.platform,
    path: PathNames.products,
    errorMessage: 'Something went wrong fetching products',
  },
  [GetActionNames.getSandboxes]: {
    api: ApiNames.platform,
    path: PathNames.sandboxes,
    errorMessage: 'Something went wrong fetching sandboxes',
  },
  [GetActionNames.getAppPermissions]: {
    api: ApiNames.platform,
    path: PathNames.appPermissions,
    errorMessage: 'Something went wrong fetching app permissions',
  },
  [GetActionNames.getApiKeysByUserId]: {
    api: ApiNames.apiKey,
    path: PathNames.getApiKeyByUserId,
  },
  [GetActionNames.getMember]: {
    api: ApiNames.platform,
    path: PathNames.getMember,
  },
  [GetActionNames.deleteApiKey]: {
    api: ApiNames.apiKey,
    path: PathNames.deleteApiKey,
  },
  [GetActionNames.getBillingDataByMonth]: {
    api: ApiNames.platform,
    path: PathNames.billingDataByMonth,
    errorMessage: 'Something went wrong fetching billing data',
  },
  [GetActionNames.getBillingDataByPeriod]: {
    api: ApiNames.platform,
    path: PathNames.getBillingDataByPeriod,
    errorMessage: 'Something went wrong fetching billing data',
  },
  [GetActionNames.getInstallations]: {
    api: ApiNames.platform,
    path: PathNames.installations,
    errorMessage: 'Something went wrong fetching installations',
  },
  [GetActionNames.getDeveloperMembers]: {
    api: ApiNames.platform,
    path: PathNames.getMember,
    errorMessage: 'Something went wrong fetching developer org members',
  },
  [GetActionNames.getDeveloper]: {
    api: ApiNames.platform,
    path: PathNames.developerById,
    errorMessage: 'Something went wrong fetching developer org',
  },
  [GetActionNames.getCustomersById]: {
    api: ApiNames.platform,
    path: PathNames.customersById,
    errorMessage: 'Something went wrong fetching your customer information',
  },
  [GetActionNames.getAppSecret]: {
    api: ApiNames.platform,
    path: PathNames.appSecretById,
    errorMessage: 'Something went wrong fetching your client secret',
  },
  [GetActionNames.getDesktopIntegrationTypes]: {
    api: ApiNames.platform,
    path: PathNames.desktopIntegrationTypes,
    errorMessage: 'Something went wrong fetching the desktop integration options',
  },
  [GetActionNames.getAppCategories]: {
    api: ApiNames.platform,
    path: PathNames.appCategories,
    errorMessage: 'Something went wrong fetching the category options',
  },
  [GetActionNames.getAppRevisions]: {
    api: ApiNames.platform,
    path: PathNames.appRevisions,
    errorMessage: 'Something went wrong fetching app revisions',
  },
  [GetActionNames.paginatePipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.paginatePipeline,
    errorMessage: 'Something went wrong fetching pipelines',
  },
  [GetActionNames.getTrafficStats]: {
    api: ApiNames.platform,
    path: PathNames.trafficStatistics,
    errorMessage: 'Something went wrong fetching API calls data',
  },
  [GetActionNames.getSubscriptions]: {
    api: ApiNames.platform,
    path: PathNames.subscriptions,
    errorMessage: 'Something went wrong fetching subscriptions',
  },
  [GetActionNames.getWebhookSubscriptions]: {
    api: ApiNames.platform,
    path: PathNames.webhookSubscriptions,
    errorMessage: 'Something went wrong fetching webhook subscriptions',
  },
  [GetActionNames.getWebhookTopics]: {
    api: ApiNames.platform,
    path: PathNames.webhookTopics,
    errorMessage: 'Something went wrong fetching webhook topics',
  },
  [GetActionNames.getWebhookLogs]: {
    api: ApiNames.platform,
    path: PathNames.webhookLogs,
    errorMessage: 'Something went wrong fetching webhook logs',
  },
  [GetActionNames.getPipelineEnvironment]: {
    api: ApiNames.pipeline,
    path: PathNames.getPipelineEnvironment,
  },
  [GetActionNames.getPublicWebhookKey]: {
    api: ApiNames.platform,
    path: PathNames.publicWebhookKey,
  },
  [GetActionNames.getRevisionConsents]: {
    api: ApiNames.platform,
    path: PathNames.appConsents,
    errorMessage: 'Failed to fetch app revision consents',
  },
  [GetActionNames.getPropertyById]: {
    api: ApiNames.platform,
    path: PathNames.propertyById,
    errorMessage: 'Failed to fetch property, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getProperties]: {
    api: ApiNames.platform,
    path: PathNames.properties,
    errorMessage: 'Failed to fetch properties, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPayments]: {
    api: ApiNames.platform,
    path: PathNames.payments,
    errorMessage: 'Failed to fetch payments, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPaymentById]: {
    api: ApiNames.platform,
    path: PathNames.paymentById,
    errorMessage: 'Failed to fetch payment, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getPaymentWithPropertyById]: {
    api: ApiNames.payments,
    path: PathNames.paymentById,
    errorMessage: 'Failed to fetch payment, this has been logged. Please try refreshing the page.',
  },
  [GetActionNames.getUserInfo]: {
    api: ApiNames.platform,
    path: PathNames.userInfo,
    errorMessage: 'Failed to fetch user info, this has been logged.',
  },
  [GetActionNames.getUserById]: {
    api: ApiNames.platform,
    path: PathNames.userById,
    errorMessage: 'Failed to fetch user info, this has been logged.',
  },
  [GetActionNames.getCustomers]: {
    api: ApiNames.platform,
    path: PathNames.customers,
    errorMessage: 'Failed to fetch customers, this has been logged.',
  },
  [GetActionNames.getDevelopers]: {
    api: ApiNames.platform,
    path: PathNames.developers,
    errorMessage: 'Failed to fetch developers, this has been logged.',
  },
  [GetActionNames.getApprovals]: {
    api: ApiNames.platform,
    path: PathNames.approvals,
    errorMessage: 'Failed to fetch approvals, this has been logged.',
  },
  [GetActionNames.getRevisionById]: {
    api: ApiNames.platform,
    path: PathNames.revisionById,
    errorMessage: 'Failed to fetch revision, this has been logged.',
  },
  [GetActionNames.getUsers]: {
    api: ApiNames.platform,
    path: PathNames.users,
    errorMessage: 'Failed to fetch users, this has been logged.',
  },
  [GetActionNames.getUserAuthenticators]: {
    api: ApiNames.platform,
    path: PathNames.userAuthenticators,
    errorMessage: 'Failed to fetch authenticators, this has been logged.',
  },
  [GetActionNames.getReferralTypes]: {
    api: ApiNames.platform,
    path: PathNames.referralTypes,
    errorMessage: 'Failed to fetch referrals, this has been logged.',
  },
  [GetActionNames.getGroupsByOrgId]: {
    api: ApiNames.platform,
    path: PathNames.orgGroups,
    errorMessage: 'Failed to fetch groups, this has been logged.',
  },
  [GetActionNames.getPaymentsClientConfig]: {
    api: ApiNames.payments,
    path: PathNames.paymentsConfigPrivate,
    errorMessage: 'Failed to fetch client config this has been logged.',
  },
  [GetActionNames.getUserGroups]: {
    api: ApiNames.platform,
    path: PathNames.userGroups,
    errorMessage: 'Failed to fetch groups, this has been logged.',
  },
  [GetActionNames.getUserSuppressionList]: {
    api: ApiNames.platform,
    path: PathNames.userEmailSuppressions,
    errorMessage: 'Failed to fetch email suppression list, this has been logged.',
  },
  [GetActionNames.getOrgs]: {
    api: ApiNames.platform,
    path: PathNames.orgs,
    errorMessage: 'Failed to fetch orgs list, this has been logged.',
  },
  [GetActionNames.getOrgConfig]: {
    api: ApiNames.platform,
    path: PathNames.getOrgConfig,
    errorMessage: 'Failed to fetch org config, this has been logged.',
  },
  [GetActionNames.getIps]: {
    api: ApiNames.platform,
    path: PathNames.dwIps,
    errorMessage: 'Failed to fetch ips for this rule, this has been logged.',
  },
  [GetActionNames.getRules]: {
    api: ApiNames.platform,
    path: PathNames.dwRules,
    errorMessage: 'Failed to fetch network rules, this has been logged.',
  },
  [GetActionNames.getDwCustomers]: {
    api: ApiNames.platform,
    path: PathNames.dwCustomers,
    errorMessage: 'Failed to fetch customers, this has been logged.',
  },
  [GetActionNames.getPipelineDnsConfig]: {
    api: ApiNames.pipeline,
    path: PathNames.getPipelineDnsConfig,
    errorMessages: 'Failed to obtain certificate details',
  },
}
