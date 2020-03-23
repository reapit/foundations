import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, TabConfig, Level, FlexContainerBasic } from '@reapit/elements'
import { LoginType, redirectToLogin } from '@reapit/cognito-auth'
import { Redirect } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import { authChangeLoginType } from '../../actions/auth'
import { Dispatch, compose } from 'redux'
import Routes from '../../constants/routes'
import loginStyles from '@/styles/pages/login.scss?mod'
import { withRouter, RouteComponentProps } from 'react-router'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { getLoginTypeByPath, getDefaultPathByLoginType, getDefaultRouteByLoginType } from '@/utils/auth-route'
import {
  getCookieString,
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
} from '@/utils/cookie'
import connectImage from '@/assets/images/reapit-connect.png'
import { showNotificationMessage } from '@/actions/notification-message'
import messages from '@/constants/messages'

export interface LoginMappedActions {
  showNotiAfterPasswordChanged: () => void
  authChangeLoginType: (loginType: string) => void
}

export interface LoginMappedProps {
  hasSession: boolean
  loginType: LoginType
}

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const tabConfigs = ({ loginType, history }: LoginProps): TabConfig[] => [
  {
    tabIdentifier: 'CLIENT',
    displayText: 'Client',
    onTabClick: () => {
      history.push(Routes.CLIENT_LOGIN)
    },
    active: loginType === 'CLIENT',
  },
  {
    tabIdentifier: 'DEVELOPER',
    displayText: 'Developer',
    onTabClick: () => {
      history.push(Routes.DEVELOPER_LOGIN)
    },
    active: loginType === 'DEVELOPER',
  },
]

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const isProduction = window.reapit.config.appEnv === 'production'
  const isPasswordChanged = localStorage.getItem('isPasswordChanged') === 'true'
  const { hasSession, loginType, location, authChangeLoginType, showNotiAfterPasswordChanged } = props
  const { wrapper, container, image, tabsContainer /* , register */ } = loginStyles

  const currentLoginType = getLoginTypeByPath(location.pathname)
  authChangeLoginType(currentLoginType)

  const isDeveloperFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE))
  const isClientFirstTimeLoginComplete = Boolean(getCookieString(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE))

  if (isPasswordChanged) {
    showNotiAfterPasswordChanged()
    localStorage.removeItem('isPasswordChanged')
  }

  if (hasSession) {
    const redirectRoute = getDefaultPathByLoginType({
      loginType,
      isDeveloperFirstTimeLoginComplete,
      isClientFirstTimeLoginComplete,
    })
    return <Redirect to={redirectRoute} />
  }
  const loginHandler = () => {
    const redirectRoute = getDefaultRouteByLoginType({
      loginType,
      isDeveloperFirstTimeLoginComplete,
      isClientFirstTimeLoginComplete,
    })

    redirectToLogin(window.reapit.config.cognitoClientId, redirectRoute, loginType)
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to Reapit {`${loginType === 'CLIENT' ? 'Marketplace' : 'Foundations'}`}</p>

        {loginType !== 'ADMIN' && !isProduction && (
          <div className={tabsContainer}>
            <Tabs tabConfigs={tabConfigs(props)} />
          </div>
        )}

        <Level>
          {/* {loginType === 'DEVELOPER' && (
            <div className={register}>
              Don't have an account yet?&nbsp;
              <Link to={Routes.REGISTER}>Register</Link>
            </div>
          )} */}
          <Button type="button" onClick={loginHandler} loading={false} variant="primary" disabled={false} fullWidth>
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

export const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  loginType: state.auth.loginType,
})

export const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  showNotiAfterPasswordChanged: () =>
    dispatch(showNotificationMessage({ variant: 'info', message: messages.PASSWORD_CHANGED_SUCCESSFULLY })),
  authChangeLoginType: (loginType: string) => dispatch(authChangeLoginType(loginType as LoginType)),
})

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withRedux)(Login) as React.LazyExoticComponent<any>
