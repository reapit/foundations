import * as React from 'react'
import { History } from 'history'
import { Redirect, useHistory } from 'react-router'
import { Modal, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { useDispatch, useSelector } from 'react-redux'
import { COGNITO_GROUP_ADMIN_USERS } from '../../../selector/auth'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import { developerCreate } from '../../../actions/developer'
import { selectDeveloperFormState } from '../../../selector'

export const onRegisterButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.REGISTER)
  }
}

export const onContinueButtonClick = (dispatch: Dispatch, session: ReapitConnectSession) => {
  const { loginIdentity } = session
  const values: CreateDeveloperModel = {
    name: loginIdentity.name ?? '',
    companyName: loginIdentity.orgName ?? '',
    email: loginIdentity.email ?? '',
  }
  return () => {
    dispatch(developerCreate(values))
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
  const dispatch = useDispatch()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerCreateState = useSelector(selectDeveloperFormState)
  const orgName = connectSession?.loginIdentity.orgName ?? ''
  const isUserAdmin = connectSession?.loginIdentity?.groups.includes(COGNITO_GROUP_ADMIN_USERS)
  const isLoading = developerCreateState === 'SUBMITTING'

  if (!connectSession) {
    return null
  }

  if (developerCreateState === 'SUCCESS') {
    return <Redirect to={Routes.SETTINGS_ORGANISATION_TAB} />
  }

  if (developerCreateState === 'ERROR') {
    return <Redirect to={Routes.LOGIN} />
  }

  return (
    <Modal
      title="Welcome to the Developers Portal"
      visible={true}
      tapOutsideToDissmiss={false}
      footerItems={
        <>
          {isUserAdmin ? (
            <Button onClick={onContinueButtonClick(dispatch, connectSession)} disabled={isLoading} loading={isLoading}>
              Continue
            </Button>
          ) : (
            <Button onClick={onRegisterButtonClick(history)}>Register</Button>
          )}
          <Button onClick={onMarketplaceButtonClick} disabled={isLoading}>
            Marketplace
          </Button>
          <Button onClick={onLogoutButtonClick} disabled={isLoading}>
            Logout
          </Button>
        </>
      }
    >
      <p>
        {isUserAdmin
          ? `To continue using the Developers Portal, you will first need to setup your profile information for your organisation ‘${orgName}’. Please click ‘Continue’ to procced, where you will be redirected to setup your organisation's profile.`
          : `As you are a part of the ‘${orgName}’ group, you will need to be invited to join this Developer organisation by an Administrator. Please contact an Administrator within your organisation to request an invitation.`}
      </p>
    </Modal>
  )
}

export default Authentication
