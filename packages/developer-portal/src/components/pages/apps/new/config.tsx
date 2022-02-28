import { IconNames } from '@reapit/elements'

export enum AppNewStepId {
  'applicationTypeStep' = 'applicationTypeStep',
  'webServicesStep' = 'webServicesStep',
  'reapitConnectStep' = 'reapitConnectStep',
  'otherAppStep' = 'otherAppStep',
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
    headingText: '1. What do you want to do today?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userInfographic',
  },
  [AppNewStepId.webServicesStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.reapitConnectStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.otherAppStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.externalAppStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.agencyCloudStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.dataFeedStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.serverSideStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.clientSideStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.rcRedirectsStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.websiteFeedStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
    permissions: ['agencyCloud/properties.read', 'agencyCloud/applicants.read', 'agencyCloud/images.read'],
  },
  [AppNewStepId.permissionsStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    iconName: 'userAuthInfographic',
  },
}

export const initialSteps: AppNewSteps = [AppNewStepId.applicationTypeStep]

export const getAppWizardStep = (appNewStepId: AppNewStepId | null): AppNewWizardStep => {
  return appWizardSteps[appNewStepId ?? AppNewStepId.applicationTypeStep]
}
