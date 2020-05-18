import * as React from 'react'
import { Dispatch } from 'redux'
import { History } from 'history'
import { useHistory, useParams } from 'react-router'
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
    history.replace(Routes.DEVELOPER_MY_APPS)
  }
}

export const onRegisterButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.REGISTER)
  }
}

export const onMarketplaceButtonClick = (history: History) => {
  return () => {
    history.replace(Routes.CLIENT)
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
          {`You do not currently have an Agency Cloud User License so you can't visit the Reapit Marketplace,
           if you would like more information on Agency Cloud please visit `}
        </span>
        <span>
          <a href="https://www.reapit.com/agency-cloud/">our public site. </a>
        </span>
        <span>
          Alternatively, if you are a developer on the Reapit Platfom, one of your clients may be willing to sponsor
          with a paid user license.
        </span>
      </p>
    </Modal>
  )
}

export const renderDeveloperModal = (history, dispatch) => {
  return (
    <Modal
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
        {'You are not currently registered as a Reapit Developer, if you would like to register please visit '}{' '}
        <span>
          <a onClick={onRegisterButtonClick(history)}>our registration page</a>
        </span>
      </p>
    </Modal>
  )
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const history = useHistory()
  const { loginType } = useParams<AuthenticationParamTypes>()
  const dispatch = useDispatch()
  return (
    <>
      {loginType === 'CLIENT' && renderClientModal(history, dispatch)}
      {loginType === 'DEVELOPER' && renderDeveloperModal(history, dispatch)}
    </>
  )
}

export default Authentication
