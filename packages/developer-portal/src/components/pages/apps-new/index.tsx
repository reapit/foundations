import { PageContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { AppsNew } from './apps-new'
import { AppWizardProvider } from './use-app-wizard'

export const AppsNewPage: FC = () => (
  <AppWizardProvider>
    <PageContainer>
      <AppsNew />
    </PageContainer>
  </AppWizardProvider>
)

export default AppsNewPage
