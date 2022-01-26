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
}

export type GetActions = { [key in GetActionNames]: GetAction }

export const getActions = (appEnv: AppEnv): GetActions => ({
  [GetActionNames.getApps]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong fetching apps - this error has been logged',
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
})
