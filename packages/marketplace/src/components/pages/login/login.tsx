import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { showNotificationMessage } from '@/actions/notification-message'
import { selectLoginSession, selectRefreshSession, selectIsDesktopMode } from '@/selector/auth'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button, Level, FlexContainerBasic, Section } from '@reapit/elements'
import { getDefaultRoute, getDefaultPath } from '@/utils/auth-route'
import messages from '@/constants/messages'
import { getCookieString, COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE } from '@/utils/cookie'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

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

export const onLoginButtonClick = (isFirstTimeLoginComplete: boolean) => {
  return () => {
    const redirectRoute = getDefaultRoute({ isFirstTimeLoginComplete })
    redirectToLogin(window.reapit.config.cognitoClientId, redirectRoute)
  }
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch()
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  const isDesktopMode = useSelector(selectIsDesktopMode)

  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const hasSession = !!loginSession || !!refreshSession
  const isFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE))
  React.useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  if (hasSession) {
    const redirectRoute = getDefaultPath({ isDesktopMode, isFirstTimeLoginComplete })
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
            onClick={onLoginButtonClick(isFirstTimeLoginComplete)}
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
