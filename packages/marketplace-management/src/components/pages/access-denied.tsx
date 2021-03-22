import * as React from 'react'
import { ModalV2, Button, ButtonGroup } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const onMarketplaceButtonClick = () => {
  window.open(`${window.reapit.config.marketplaceUrl}/installed`, '_self')
}

export const onLogoutButtonClick = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

const AccessDenied: React.FC = () => (
  <ModalV2 title="Reapit Connect Management" visible={true}>
    <p className="mb-4">
      It looks like the user account you have logged in with, does not have the required permissions to access this app.
      Please contact your Organisation Administrator.
    </p>
    <ButtonGroup hasSpacing isCentered>
      <Button variant="secondary" onClick={onMarketplaceButtonClick}>
        Marketplace
      </Button>
      <Button onClick={onLogoutButtonClick}>Logout</Button>
    </ButtonGroup>
  </ModalV2>
)

export default AccessDenied
