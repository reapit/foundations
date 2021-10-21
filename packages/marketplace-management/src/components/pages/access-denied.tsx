import { PageContainer, Title, PersistantNotification, ButtonGroup, Button, elMb11 } from '@reapit/elements'
import * as React from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const onMarketplaceButtonClick = () => {
  window.open(`${window.reapit.config.marketplaceUrl}/installed`, '_self')
}

export const onLogoutButtonClick = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

const AccessDenied: React.FC = () => (
  <PageContainer>
    <Title>Reapit Connect Management</Title>
    <PersistantNotification className={elMb11} isFullWidth isExpanded isInline intent="danger">
      It looks like the user account you have logged in with, does not have the required permissions to access this app.
      Please contact your Organisation Administrator.
    </PersistantNotification>
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
