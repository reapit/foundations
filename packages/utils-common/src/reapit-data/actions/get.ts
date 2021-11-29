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
    errorMessage: 'Something went wrong',
  },
})
