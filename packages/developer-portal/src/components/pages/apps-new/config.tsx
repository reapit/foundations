import React, { ReactNode } from 'react'
import { IconNames } from '@reapit/elements'

export enum AppNewStepId {
  'whatUserStep' = 'whatUserStep',
  'existingCustomerStep' = 'existingCustomerStep',
  'thirdPartyDevStep' = 'thirdPartyDevStep',
  'webServicesStep' = 'webServicesStep',
  'reapitConnectStep' = 'reapitConnectStep',
  'otherAppStep' = 'otherAppStep',
  'agencyCloudStep' = 'agencyCloudStep',
  'agencyCloudReplacementStep' = 'agencyCloudReplacementStep',
  'dataFeedStep' = 'dataFeedStep',
  'reportingStep' = 'reportingStep',
  'serverSideStep' = 'serverSideStep',
  'clientSideStep' = 'clientSideStep',
  'websiteFeedStep' = 'websiteFeedStep',
  'permissionsStep' = 'permissionsStep',
}

export type AppNewSteps = AppNewStepId[]

export interface AppNewWizardStep {
  headingText: string
  headerText: string
  helperPageHeadingText: string
  helperPage: ReactNode
  iconName: IconNames
}

export type AppNewWizardSteps = { [key in AppNewStepId]: AppNewWizardStep }

export const appWizardSteps: AppNewWizardSteps = {
  [AppNewStepId.whatUserStep]: {
    headingText: '1. What kind of user am I?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Users',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userInfographic',
  },
  [AppNewStepId.existingCustomerStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Apps',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.thirdPartyDevStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Apps',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.webServicesStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Apps',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.reapitConnectStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Apps',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.otherAppStep]: {
    headingText: '2. What kind of app am I building?',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Apps',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userDeviceInfographic',
  },
  [AppNewStepId.agencyCloudStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Authentication',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.agencyCloudReplacementStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Authentication',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.dataFeedStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Permissions',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.reportingStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Permissions',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.serverSideStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Permissions',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.clientSideStep]: {
    headingText: '3. Authentication',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Authentication',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.websiteFeedStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Permissions',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
  [AppNewStepId.permissionsStep]: {
    headingText: '3. Permissions',
    headerText:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente quam neque impedit dolor doloribus corrupti quaerat sint veritatis, temporibus in illo hic dicta similique! Eius, commodi consectetur! Id, fugit exercitationem.',
    helperPageHeadingText: 'About Permissions',
    helperPage: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis omnis veritatis itaque molestias perferendis, hic
        maiores debitis voluptate nesciunt, voluptas laudantium mollitia nemo possimus aut rem voluptatum ipsam quia
        quae?
      </div>
    ),
    iconName: 'userAuthInfographic',
  },
}

export const initialSteps: AppNewSteps = [AppNewStepId.whatUserStep]

export const getAppWizardStep = (appNewStepId: AppNewStepId | null): AppNewWizardStep => {
  return appWizardSteps[appNewStepId ?? AppNewStepId.whatUserStep]
}
