import * as React from 'react'
import { useLocation, useRouteMatch } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { authChangeLoginType } from '@/actions/auth'
import { showNotificationMessage } from '@/actions/notification-message'
import { selectLoginSession, selectRefreshSession, selectLoginType, selectIsDesktopMode } from '@/selector/auth'
import { LoginType, redirectToLogin } from '@reapit/cognito-auth'
import { Button, Level, FlexContainerBasic } from '@reapit/elements'
import { getLoginTypeByPath, getDefaultPathByLoginType, getDefaultRouteByLoginType } from '@/utils/auth-route'
import Routes from '@/constants/routes'
import messages from '@/constants/messages'
import {
  getCookieString,
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
} from '@/utils/cookie'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import connectImage from '@/assets/images/reapit-connect.png'

const { wrapper, container, image, register, registerLevel, loginButton } = loginStyles

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

export const handleChangeLoginType = (dispatch: Dispatch, loginType: LoginType) => {
  return () => {
    dispatch(authChangeLoginType(loginType))
  }
}

export const onLoginButtonClick = (
  loginType: LoginType,
  isDeveloperFirstTimeLoginComplete: boolean,
  isClientFirstTimeLoginComplete: boolean,
) => {
  return () => {
    const redirectRoute = getDefaultRouteByLoginType({
      loginType,
      isDeveloperFirstTimeLoginComplete,
      isClientFirstTimeLoginComplete,
    })

    redirectToLogin(window.reapit.config.cognitoClientId, redirectRoute, loginType)
  }
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const location = useLocation()
  let developerLoginRouteMatch = useRouteMatch(Routes.DEVELOPER_LOGIN)
  let clientLoginRouteMatch = useRouteMatch(Routes.CLIENT_LOGIN)
  const dispatch = useDispatch()
  const loginType = useSelector(selectLoginType)
  const loginSession = useSelector(selectLoginSession)
  const refreshSession = useSelector(selectRefreshSession)
  const isDesktopMode = useSelector(selectIsDesktopMode)

  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const hasSession = !!loginSession || !!refreshSession
  const currentLoginType = getLoginTypeByPath(location.pathname)
  const isDeveloperFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE))
  const isClientFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE))

  React.useEffect(handleChangeLoginType(dispatch, currentLoginType), [dispatch, currentLoginType])

  React.useEffect(handleShowNotificationAfterPasswordChanged(isPasswordChanged, localStorage, dispatch), [
    isPasswordChanged,
    localStorage,
    dispatch,
  ])

  if (hasSession) {
    const redirectRoute = getDefaultPathByLoginType({
      loginType: currentLoginType,
      developerLoginRouteMatch,
      clientLoginRouteMatch,
      isDeveloperFirstTimeLoginComplete,
      isClientFirstTimeLoginComplete,
      isDesktopMode,
    })
    return <Redirect to={redirectRoute} />
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to Reapit {`${loginType === 'CLIENT' ? 'Marketplace' : 'Foundations'}`}</p>
        <Level className={registerLevel}>
          <Button
            className={loginButton}
            type="button"
            onClick={onLoginButtonClick(loginType, isDeveloperFirstTimeLoginComplete, isClientFirstTimeLoginComplete)}
            loading={false}
            variant="primary"
            disabled={false}
            fullWidth
            dataTest="login-button"
          >
            Login
          </Button>
          {loginType === 'DEVELOPER' && (
            <div className={register}>
              Don&apos;t have an account yet?&nbsp;
              <Link to={Routes.REGISTER}>Register</Link>
            </div>
          )}
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
