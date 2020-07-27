import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { Modal, Button } from '@reapit/elements'
import { developerRoutes } from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AuthenticationProps = {}

export const onDevelopersButtonClick = (developerPortalURL: string) => () => {
  window.open(developerPortalURL, '_self')
}

export const handleLogout = () => {
  reapitConnectBrowserSession.connectLogoutRedirect()
}

export const renderModal = (dispatch: Dispatch, developerPortalURL: string) => {
  return (
    <Modal
      title="Agency Cloud User License?"
      visible={true}
      tapOutsideToDissmiss={false}
      footerItems={
        <>
          <Button onClick={onDevelopersButtonClick(developerPortalURL)}>Developers</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      }
    >
      <p>
        <span>
          To access the Reapit Marketplace, you will need to have an Agency Cloud User License. To obtain a license,
          please visit the&nbsp;
        </span>
        <span>
          <a href={developerPortalURL + developerRoutes.DESKTOP}>Desktop</a>
        </span>
        <span>
          &nbsp;page within the Developers Portal, where you can subscribe to a Developer Edition of Agency Cloud.
        </span>
      </p>
    </Modal>
  )
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const dispatch = useDispatch()
  const isProd = window.reapit.config.appEnv === 'production'
  const developerPortalURL = isProd ? developerRoutes.PROD : developerRoutes.DEV

  return <>{renderModal(dispatch, developerPortalURL)}</>
}

export default Authentication
