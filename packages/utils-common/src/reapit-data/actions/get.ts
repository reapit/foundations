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
  getPipelineDeployments = 'getPipelineDeployments',
  getProducts = 'getProducts',
  getSandboxes = 'getSandboxes',
  getAppPermissions = 'getAppPermissions',
  getApiKeysByUserId = 'getApiKeysByUserId',
  getMember = 'getMember',
  deleteApiKey = 'deleteApiKey',
  getBillingDataByMonth = 'getBillingDataByMonth',
  getInstallations = 'getInstallations',
  getDeveloperMembers = 'getDeveloperMembers',
  getCustomersById = 'getCustomersById',
  getAppById = 'getAppById',
  getAppSecret = 'getAppSecret',
  getDesktopIntegrationTypes = 'getDesktopIntegrationTypes',
  getAppCategories = 'getAppCategories',
  getAppRevisions = 'getAppRevisions',
  getDeveloper = 'getDeveloper',
}

export type GetActions = { [key in GetActionNames]: GetAction }

export const getActions = (appEnv: AppEnv): GetActions => ({
  [GetActionNames.getApps]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong fetching apps - this error has been logged',
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
})
