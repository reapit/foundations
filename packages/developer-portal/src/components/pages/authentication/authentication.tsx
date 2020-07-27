import * as React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router'
import { Modal, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const onRegisterButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.REGISTER)
  }
}

export const onMarketplaceButtonClick = () => {
  window.open(window.reapit.config.marketplaceUrl, '_self')
}

export const onLogoutButtonClick = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

const Authentication: React.FC = () => {
  const history = useHistory()
  return (
    <Modal
      title="Register as a Developer?"
      visible={true}
      tapOutsideToDissmiss={false}
      footerItems={
        <>
          <Button onClick={onRegisterButtonClick(history)}>Register</Button>
          <Button onClick={onMarketplaceButtonClick}>Marketplace</Button>
          <Button onClick={onLogoutButtonClick}>Logout</Button>
        </>
      }
    >
      <p>
        You are not currently registered as a Reapit Developer, if you would like to register please visit
        <span>
          <a onClick={onRegisterButtonClick(history)}> our registration page</a>
        </span>
      </p>
    </Modal>
  )
}

export default Authentication
