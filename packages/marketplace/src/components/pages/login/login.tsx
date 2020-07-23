import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { selectLoginSession, selectRefreshSession } from '@/selector/auth'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements'
import { getDefaultRoute, getDefaultPath } from '@/utils/auth-route'
import messages from '@/constants/messages'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'
import { reapitConnectBrowserSession } from '@/core/connect-session'
console.log({ reapitConnectBrowserSession })

const { wrapper, container, image, registerLevel, loginButton } = loginStyles

export type LoginProps = {}

export const handleShowNotificationAfterPasswordChanged = (
  isPasswordChanged: boolean,
  localStorage: Storage,
  dispatch: Dispatch,
) => {
  return () => {
    if (isPasswordChanged) {
      dispatch(showNotificationMessage({ variant: 'info', message: messages.PASSWORD_CHANGED_SUCCESSFULLY }))
      localStorage.removeItem('isPasswordChanged')
    }
  }
}

export const onLoginButtonClick = () => {
  const redirectRoute = getDefaultRoute()
  redirectToLogin(window.reapit.config.cognitoClientId, redirectRoute)
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch()
  // TODO(login) remove this, replace with session
  // TESTME: able to redirect after login
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)

  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  // TODO: use selector from useReapitConnect
  const hasSession = !!loginSession || !!refreshSession
  React.useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  // TODO(login) this shit too
  if (hasSession) {
    const redirectRoute = getDefaultPath()
    return <Redirect to={redirectRoute} />
  }

  return (
    <div className={container}>
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
      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default Login
