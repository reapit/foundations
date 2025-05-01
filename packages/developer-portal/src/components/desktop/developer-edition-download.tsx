import React, { FC, useEffect } from 'react'
import { PageContainer, PersistentNotification, Title } from '@reapit/elements'
import { handleDownload } from './developer-edition-modal'

export const DeveloperEditionDownload: FC = () => {
  useEffect(handleDownload, [])

  return (
    <PageContainer>
      <Title>Reapit CRM Developer Edition</Title>
      <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
        Your developer edition download has started.
      </PersistentNotification>
    </PageContainer>
  )
}

export default DeveloperEditionDownload
