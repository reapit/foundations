import * as React from 'react'
import { Dispatch } from 'redux'
import { History } from 'history'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Modal, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { authLogout } from '@/actions/auth'
import { LoginType } from '@reapit/cognito-auth'

export type AuthenticationProps = {}

export interface AuthenticationParamTypes {
  loginType: LoginType
}

export const onDevelopersButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.DEVELOPER_DESKTOP)
  }
}

export const onRegisterButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.REGISTER)
  }
}

export const onMarketplaceButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.DEVELOPER)
  }
}

export const onLogoutButtonClick = (dispatch: Dispatch) => {
  return () => {
    dispatch(authLogout())
  }
}

export const renderClientModal = (history, dispatch) => {
  return (
    <Modal
      title="Agency Cloud User License?"
      visible={true}
      tapOutsideToDissmiss={false}
      footerItems={
        <>
          <Button onClick={onDevelopersButtonClick(history)}>Developers</Button>
          <Button onClick={onLogoutButtonClick(dispatch)}>Logout</Button>
        </>
      }
    >
      <p>
        <span>
          To access the Reapit Marketplace, you will need to have an Agency Cloud User License. To obtain a license,
          please visit the&nbsp;
        </span>
        <span>
          <Link to={Routes.DEVELOPER_DESKTOP}>Desktop</Link>
        </span>
        <span>
          &nbsp;page within the Developers Portal, where you can subscribe to a Developer Edition of Agency Cloud.
        </span>
      </p>
    </Modal>
  )
}

export const renderDeveloperModal = (history, dispatch) => {
  return (
    <Modal
      title="Register as a Developer?"
      visible={true}
      tapOutsideToDissmiss={false}
      footerItems={
        <>
          <Button onClick={onRegisterButtonClick(history)}>Register</Button>
          <Button onClick={onMarketplaceButtonClick(history)}>Marketplace</Button>
          <Button onClick={onLogoutButtonClick(dispatch)}>Logout</Button>
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

const Authentication: React.FC<AuthenticationProps> = () => {
  const history = useHistory()
  const params = useParams<AuthenticationParamTypes>()
  const loginType = params.loginType?.toUpperCase() as LoginType
  const dispatch = useDispatch()

  return (
    <>
      {loginType === 'CLIENT' && renderClientModal(history, dispatch)}
      {loginType === 'DEVELOPER' && renderDeveloperModal(history, dispatch)}
    </>
  )
}

export default Authentication
