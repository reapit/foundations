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
  terminateInstallation = 'terminateInstallation',
  cancelRevision = 'cancelRevision',
  updateMember = 'updateMember',
  inviteMember = 'inviteMember',
  deleteSubscription = 'deleteSubscription',
  createSubscription = 'createSubscription',
  pingWebhook = 'pingWebhook',
  createWebhook = 'createWebhook',
  updateWebhook = 'updateWebhook',
  deleteWebhook = 'deleteWebhook',
  acceptInviteMember = 'acceptInviteMember',
  rejectInviteMember = 'rejectInviteMember',
}

export type UpdateActions = { [key in UpdateActionNames]: UpdateAction }

export const updateActions = (appEnv: AppEnv): UpdateActions => ({
  [UpdateActionNames.updatePipeline]: {
    api: ApiNames(appEnv).pipeline,
    path: PathNames.updatePipeline,
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
  [UpdateActionNames.terminateInstallation]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.terminateInstallation,
    errorMessage: 'Failed to uninstall your app',
    successMessage: 'App successfully uninstalled for customer',
  },
  [UpdateActionNames.cancelRevision]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.cancelRevision,
    errorMessage: 'Failed to cancel pending revision',
    successMessage: 'Successfully cancelled pending revision',
  },
  [UpdateActionNames.updateMember]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.memberById,
    errorMessage: 'Failed to update developer organisation member',
    successMessage: 'Successfully updated developer organisation member',
  },
  [UpdateActionNames.inviteMember]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.getMember,
    errorMessage: 'Failed to invite member, this has been logged. Please try again.',
    successMessage: 'Successfully invited developer orgainisation member',
  },
  [UpdateActionNames.deleteSubscription]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.subscriptionsById,
    errorMessage: 'Failed to cancel subscription, this has been logged. Please try again.',
    successMessage: 'Successfully cancelled subscription',
  },
  [UpdateActionNames.createSubscription]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.subscriptions,
    errorMessage: 'Failed to create subscription, this has been logged. Please try again.',
    successMessage: 'Successfully created subscription',
  },
  [UpdateActionNames.pingWebhook]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhooksPing,
    errorMessage: 'Failed to ping webhook, this has been logged. Please try again.',
    successMessage: 'Successfully pinged webhook',
  },
  [UpdateActionNames.createWebhook]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookSubscriptions,
    errorMessage: 'Failed to create webhook, this has been logged. Please try again.',
    successMessage: 'Successfully created webhook',
  },
  [UpdateActionNames.updateWebhook]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookSubscriptionsId,
    errorMessage: 'Failed to update webhook, this has been logged. Please try again.',
    successMessage: 'Successfully updated webhook',
  },
  [UpdateActionNames.deleteWebhook]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.webhookSubscriptionsId,
    errorMessage: 'Failed to delete webhook, this has been logged. Please try again.',
    successMessage: 'Successfully deleted webhook',
  },
  [UpdateActionNames.acceptInviteMember]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.memberInviteAccept,
    errorMessage: 'Failed to accept invite, this has been logged. Please try again.',
    successMessage: 'Successfully accepted invite',
  },
  [UpdateActionNames.rejectInviteMember]: {
    api: ApiNames(appEnv).platform,
    path: PathNames.memberInviteReject,
    errorMessage: 'Failed to reject invite, this has been logged. Please try again.',
    successMessage: 'Successfully rejected invite',
  },
})
