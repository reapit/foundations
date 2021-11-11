import { ApiNames, PathNames } from './api-constants'

export interface GetAction {
  api: string
  path: PathNames
  errorMessage?: string
  successMessage?: string
}

export enum GetActionNames {
  getApps = 'getApps',
}

export type GetActions = { [key in GetActionNames]: GetAction }

export const getActions: GetActions = {
  [GetActionNames.getApps]: {
    api: ApiNames.platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong fetching apps - this error has been logged',
  },
}
