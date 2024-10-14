import { IconNames } from '@reapit/elements'

export enum AppNewStepId {
  'applicationTypeStep' = 'applicationTypeStep',
  'webServicesStep' = 'webServicesStep',
  'reapitConnectStep' = 'reapitConnectStep',
  'agencyCloudStep' = 'agencyCloudStep',
  'dataFeedStep' = 'dataFeedStep',
  'serverSideStep' = 'serverSideStep',
  'clientSideStep' = 'clientSideStep',
  'websiteFeedStep' = 'websiteFeedStep',
  'permissionsStep' = 'permissionsStep',
  'externalAppStep' = 'externalAppStep',
  'rcRedirectsStep' = 'rcRedirectsStep',
}

export type AppNewSteps = AppNewStepId[]

export type AppAuthFlow = 'clientCredentials' | 'authorisationCode'

export interface AppNewWizardStep {
  headingText: string
  headerText: string
  iconName: IconNames
  permissions?: string[]
}

export type AppNewWizardSteps = { [key in AppNewStepId]: AppNewWizardStep }

export const appWizardSteps: AppNewWizardSteps = {
  [AppNewStepId.applicationTypeStep]: {
    headingText: 'What do you want to do today?',
    headerText:
      'First tell us about the kind of app or integration you are building to ensure we get you authenticated correctly. By selecting an option, relevant documentation and links will appear on the right hand side of the page before progressing.',
    iconName: 'userInfographic',
  },
  [AppNewStepId.webServicesStep]: {
    headingText: 'What kind of app are you building?',
    headerText:
      'Do you intend your app to be client or server-side authenticated? If you are not sure, select an option for relevant documentation and links on the right hand side of the page.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.reapitConnectStep]: {
    headingText: 'What kind of app are you building?',
    headerText:
      'Do you intend your app to be client or server-side authenticated? If you are not sure, select an option for relevant documentation and links on the right hand side of the page.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.externalAppStep]: {
    headingText: 'What kind of app are you building?',
    headerText:
      'Do you intend your app to be client or server-side authenticated? If you are not sure, select an option for relevant documentation and links on the right hand side of the page.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.agencyCloudStep]: {
    headingText: 'Authentication',
    headerText:
      'Please supply at least one redirect and logout uri. A non-https localhost or dev.reapit uri is acceptable for quick start development.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.dataFeedStep]: {
    headingText: 'Permissions',
    headerText:
      'Please supply relevant read/write, entity specific permissions for your application. You can add or remove these later and for server side apps only, at least one permission is required.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.serverSideStep]: {
    headingText: 'Permissions',
    headerText:
      'Please supply relevant read/write, entity specific permissions for your application. You can add or remove these later and for server side apps only, at least one permission is required.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.clientSideStep]: {
    headingText: 'Authentication',
    headerText:
      'Please supply at least one redirect and logout uri. A non-https localhost or dev.reapit uri is acceptable for quick start development.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.rcRedirectsStep]: {
    headingText: 'Authentication',
    headerText:
      'Please supply at least one redirect and logout uri. A non-https localhost or dev.reapit uri is acceptable for quick start development.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.websiteFeedStep]: {
    headingText: 'Permissions',
    headerText:
      'Please supply relevant read/write, entity specific permissions for your application. You can add or remove these later and for server side apps only, at least one permission is required.',
    iconName: 'userAuthInfographic',
    permissions: ['agencyCloud/properties.read', 'agencyCloud/offices.read', 'agencyCloud/negotiators.read'],
  },
  [AppNewStepId.permissionsStep]: {
    headingText: 'Permissions',
    headerText:
      'Please supply relevant read/write, entity specific permissions for your application. You can add or remove these later and for server side apps only, at least one permission is required.',
    iconName: 'userAuthInfographic',
  },
}

export const initialSteps: AppNewSteps = [AppNewStepId.applicationTypeStep]

export const getAppWizardStep = (appNewStepId: AppNewStepId | null): AppNewWizardStep => {
  return appWizardSteps[appNewStepId ?? AppNewStepId.applicationTypeStep]
}
