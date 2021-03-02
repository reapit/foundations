import React from 'react'
import { ModalV2, Content, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { useHistory } from 'react-router-dom'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const handleLogin = (history) => () => {
  const { connectHasSession, connectLogoutRedirect } = reapitConnectBrowserSession
  if (connectHasSession) {
    connectLogoutRedirect()
    return
  }
  history.replace(Routes.LOGIN)
}

export const AcceptedModal = ({ visible }: { visible: boolean }) => {
  const history = useHistory()
  return (
    <ModalV2
      visible={visible}
      closable={false}
      title="Success"
      isCentered
      footer={
        <Button className="mr-2" key="close" type="button" onClick={handleLogin(history)}>
          Login
        </Button>
      }
    >
      <Content>
        <p>Thank you for confirming your invite to Reapit Foundations.</p>
        <p>
          If you already had a Developer account, you can use your existing credentials to login to the Developers
          Portal. If not, you will shortly receive an email with instructions on setting up your login credentials.
        </p>
      </Content>
    </ModalV2>
  )
}

export default AcceptedModal
