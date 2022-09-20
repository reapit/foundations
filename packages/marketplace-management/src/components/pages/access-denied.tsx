import { PageContainer, Title, PersistentNotification, ButtonGroup, Button, elMb11 } from '@reapit/elements'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const onMarketplaceButtonClick = () => {
  window.open(`${window.reapit.config.marketplaceUrl}/installed`, '_self')
}

export const onLogoutButtonClick = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

const AccessDenied: FC = () => (
  <PageContainer>
    <Title>Reapit Connect Management</Title>
    <PersistentNotification className={elMb11} isFullWidth isExpanded isInline intent="danger">
      It looks like the user account you have logged in with, does not have the required permissions to access this app.
      Please contact your Organisation Administrator.
    </PersistentNotification>
    <ButtonGroup alignment="center">
      <Button intent="secondary" onClick={onMarketplaceButtonClick}>
        Marketplace
      </Button>
      <Button intent="critical" onClick={onLogoutButtonClick}>
        Logout
      </Button>
    </ButtonGroup>
  </PageContainer>
)

export default AccessDenied
