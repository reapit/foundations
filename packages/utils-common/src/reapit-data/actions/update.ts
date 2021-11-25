import { ApiNames, PathNames } from './api-constants'

export interface UpdateAction {
  api: string
  path: PathNames
  errorMessage?: string
  successMessage?: string
}

export enum UpdateActionNames {
  updatePipeline = 'updatePipeline',
}

export type UpdateActions = { [key in UpdateActionNames]: UpdateAction }

export const updateActions: UpdateActions = {
  [UpdateActionNames.updatePipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.createPipeline,
  },
}
