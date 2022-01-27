import { ApiNames, AppEnv, PathNames } from './api-constants'

export interface UpdateAction {
  api: string
  path: PathNames
  errorMessage?: string
  successMessage?: string
}

export enum UpdateActionNames {
  updatePipeline = 'updatePipeline',
  createPipelineDeployment = 'createPipelineDeployment',
  createApp = 'createApp',
}

export type UpdateActions = { [key in UpdateActionNames]: UpdateAction }

export const updateActions = (appEnv: AppEnv): UpdateActions => ({
  [UpdateActionNames.updatePipeline]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.createPipeline,
  },
  [UpdateActionNames.createPipelineDeployment]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.createPipelineDeployments,
  },
  [UpdateActionNames.createApp]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong creating your app, please check for errors and resubmit.',
    successMessage: 'Your app has been successfully created',
  },
})
