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
  createApiKeyByMember = 'createApiKeyByMember',
  updateDeveloper = 'updateDeveloper',
  deleteApp = 'deleteApp',
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
  [UpdateActionNames.deleteApp]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appsId,
    errorMessage: 'Something went wrong deleting your app, please try again.',
    successMessage: 'Your app has been successfully deleted',
  },
  [UpdateActionNames.createApiKeyByMember]: {
    api: ApiNames(appEnv).apiKey,
    path: PathNames.createApiKeyByMember,
  },
  [UpdateActionNames.updateDeveloper]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.developerById,
    errorMessage: 'Developer update failed, please check for errors and try again.',
    successMessage: 'Your developer record has been successfully updated',
  },
})
