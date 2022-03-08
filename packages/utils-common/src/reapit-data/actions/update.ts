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
  updateCustomer = 'updateCustomer',
  createDeveloper = 'createDeveloper',
  deleteApp = 'deleteApp',
  createAppRevsion = 'createAppRevsion',
  deleteOfficeGroup = 'deleteOfficeGroup',
  deletePipeline = 'deletePipeline',
  fileUpload = 'fileUpload',
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
  [UpdateActionNames.updateCustomer]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.customersById,
    errorMessage: 'Update to terms failed, please try again',
  },
  [UpdateActionNames.createDeveloper]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.developers,
    errorMessage: 'Failed to create developer organisation, please try again',
    successMessage: 'Your developer account has been successfully created',
  },
  [UpdateActionNames.createAppRevsion]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.appRevision,
    errorMessage: 'Failed to create an app revision, please check for errors and try again',
    successMessage: 'App revision created successfully',
  },
  [UpdateActionNames.deleteOfficeGroup]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.officeGroupId,
    errorMessage: 'Failed to delete this office group, please try again',
    successMessage: 'Successfully deleted office group',
  },
  [UpdateActionNames.deletePipeline]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.getPipeline,
    errorMessage: 'Failed to delete Pipeline',
    successMessage: 'Pipeline deleting',
  },
  [UpdateActionNames.fileUpload]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.fileUpload,
    errorMessage: 'Failed to upload one of your files',
  },
})
