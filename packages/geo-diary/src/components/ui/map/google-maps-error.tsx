import React, { FC } from 'react'
import { MainContainer, PageContainer, PersistentNotification } from '@reapit/elements'

export const GoogleMapsError: FC = () => (
  <MainContainer>
    <PageContainer>
      <PersistentNotification isExpanded isInline isFullWidth intent="danger">
        There was a problem loading Google Maps. Please try refreshing your page
      </PersistentNotification>
    </PageContainer>
  </MainContainer>
)
