import React, { FC } from 'react'
import { AppsNew } from './apps-new'
import { AppWizardProvider } from './use-app-wizard'

export const AppsNewPage: FC = () => (
  <AppWizardProvider>
    <AppsNew />
  </AppWizardProvider>
)

export default AppsNewPage
