import * as React from 'react'
import { ModalV2, Button, Section } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const onMarketplaceButtonClick = () => {
  window.open(window.reapit.config.marketplaceUrl, '_self')
}

export const onLogoutButtonClick = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

const AccessDenied: React.FC = () => (
  <ModalV2 title="Reapit Connect Management" visible={true}>
    <p>
      It looks like the user account you have logged in with, does not have the required permissions to access this app.
      Please contact your Organisation Administrator.
    </p>
    <Section isFlex hasPadding={false} hasMargin={false}>
      <Button onClick={onMarketplaceButtonClick}>Marketplace</Button>
      <Button onClick={onLogoutButtonClick}>Logout</Button>
    </Section>
  </ModalV2>
)

export default AccessDenied
