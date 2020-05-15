import * as React from 'react'
import { Dispatch } from 'redux'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { Modal, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { authLogout } from '@/actions/auth'

export type AuthenticationProps = {}

export const onDevelopersButtonClick = history => {
  return () => {
    history.replace(Routes.DEVELOPER_MY_APPS)
  }
}

export const onLogoutButtonClick = (dispatch: Dispatch) => {
  return () => {
    dispatch(authLogout())
  }
}

const Authentication: React.FC<AuthenticationProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <>
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
          {` You do not currently have an Agency Cloud User License so you can't visit the Reapit Marketplace, 
                if you would like more information on Agency Cloud please visit our public site. 
                Alternatively, if you are a developer on the Reapit Platfom, one of your clients may be willing 
                to sponsor with a paid user license.`}
        </p>
      </Modal>
    </>
  )
}

export default Authentication
