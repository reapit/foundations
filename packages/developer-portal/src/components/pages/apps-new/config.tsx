import React, { ReactNode } from 'react'
import { IconNames } from '@reapit/elements'

export enum AppNewStepId {
  'whatUserStep' = 'whatUserStep',
  'existingCustomerStep' = 'existingCustomerStep',
  'thirdPartyDevStep' = 'thirdPartyDevStep',
  'webServicesStep' = 'webServicesStep',
  'reapitConnectStep' = 'reapitConnectStep',
  'otherAppStep' = 'otherAppStep',
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
    iconName: 'customerInfographic',
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
    iconName: 'customerInfographic',
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
    iconName: 'customerInfographic',
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
    iconName: 'customerInfographic',
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
    iconName: 'customerInfographic',
  },
}

export const initialSteps: AppNewSteps = [AppNewStepId.whatUserStep]

export const getAppWizardStep = (appNewStepId: AppNewStepId): AppNewWizardStep => {
  return appWizardSteps[appNewStepId]
}
