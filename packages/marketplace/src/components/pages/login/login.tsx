import * as React from 'react'
import { Button, Level, FlexContainerBasic, Section, notification } from '@reapit/elements'
import { getDefaultRoute } from '@/utils/auth-route'
import messages from '@/constants/messages'
import * as loginStyles from './__styles__'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const { wrapper, container, imageContainer, loginImage, registerLevel, loginButton } = loginStyles

export type LoginProps = {}

export const handleShowNotificationAfterPasswordChanged = (isPasswordChanged: boolean, localStorage: Storage) => {
  return () => {
    if (isPasswordChanged) {
      notification.success({ message: messages.PASSWORD_CHANGED_SUCCESSFULLY, placement: 'bottomRight' })
      localStorage.removeItem('isPasswordChanged')
    }
  }
}

export const onLoginButtonClick = () => {
  const redirectRoute = getDefaultRoute()
  reapitConnectBrowserSession.connectLoginRedirect(redirectRoute)
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  React.useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage), [
    isPasswordChanged,
    localStorage,
  ])

  return (
    <div className={container}>
      <div className={imageContainer}>
        <div className={loginImage}></div>
      </div>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <Section>
          <p>Welcome to Reapit Marketplace</p>
        </Section>
        <Level className={registerLevel}>
          <Button
            className={loginButton}
            type="button"
            onClick={onLoginButtonClick}
            loading={false}
            variant="primary"
            disabled={false}
            fullWidth
            dataTest="login-button"
          >
            Login
          </Button>
        </Level>
        <FlexContainerBasic className="pt-8" centerContent>
          {process.env.APP_VERSION}
        </FlexContainerBasic>
      </div>
    </div>
  )
}

export default Login
