import * as React from 'react'
import { Dispatch } from 'redux'
import { History } from 'history'
import { useHistory } from 'react-router'
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
    history.replace(Routes.APPS)
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

const Authentication: React.FC<AuthenticationProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  return <>{renderClientModal(history, dispatch)}</>
}

export default Authentication
