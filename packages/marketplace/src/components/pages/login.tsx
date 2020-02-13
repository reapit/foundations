import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, TabConfig, Level } from '@reapit/elements'
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
import { getCookieString, COOKIE_FIRST_TIME_LOGIN } from '@/utils/cookie'
import connectImage from '@/assets/images/reapit-connect.png'

export interface LoginMappedActions {
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
  const reapitEnv = process.env.REAPIT_ENV || 'LOCAL'
  const isReapitEnvProd = reapitEnv === 'PROD'
  const { hasSession, loginType, location, authChangeLoginType } = props
  const { wrapper, container, image, tabsContainer /* , register */ } = loginStyles

  const currentLoginType = getLoginTypeByPath(location.pathname)
  authChangeLoginType(currentLoginType)

  const firstLoginCookie = getCookieString(COOKIE_FIRST_TIME_LOGIN)

  if (hasSession) {
    const redirectRoute = getDefaultPathByLoginType(loginType, firstLoginCookie)
    return <Redirect to={redirectRoute} />
  }
  const loginHandler = () => {
    const redirectRoute = getDefaultRouteByLoginType(loginType, firstLoginCookie)
    redirectToLogin(process.env.COGNITO_CLIENT_ID_MARKETPLACE as string, redirectRoute, loginType)
  }

  return (
    <div className={container}>
      <div className={wrapper}>
        <Level>
          <img src={connectImage} alt="Reapit Connect Graphic" />
        </Level>
        <p className="pb-8">Welcome to Reapit {`${loginType === 'CLIENT' ? 'Marketplace' : 'Foundations'}`}</p>

        {loginType !== 'ADMIN' && !isReapitEnvProd && (
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
  authChangeLoginType: (loginType: string) => dispatch(authChangeLoginType(loginType as LoginType)),
})

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withRedux)(Login) as React.LazyExoticComponent<any>
