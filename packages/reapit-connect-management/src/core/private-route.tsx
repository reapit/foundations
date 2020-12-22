import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import Routes from '@/constants/routes'
import { useReapitConnect, ReapitConnectSession, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export interface PrivateRouteProps {
  component: React.FunctionComponent | React.LazyExoticComponent<any>
  exact?: boolean
}

export const isNotAllowedToAccess = (loginIdentity?: LoginIdentity) => {
  if (!loginIdentity || !loginIdentity.developerId) return false
  return true
}

export const handleRedirectToAuthenticationPage = (
  history: History,
  loginIdentity?: LoginIdentity,
  isFetchingAccessToken?: boolean,
) => {
  return () => {
    if (!loginIdentity || isFetchingAccessToken) {
      return
    }
    const { developerId } = loginIdentity
    if (!developerId) {
      history.replace(`${Routes.AUTHENTICATION}/developer`)
    }
  }
}

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps & RouteProps) => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { loginIdentity } = (connectSession || {}) as ReapitConnectSession

  React.useEffect(handleRedirectToAuthenticationPage(history, loginIdentity), [loginIdentity, history])

  return (
    <Route
      {...rest}
      render={() => {
        const Component = component
        return <Component />
      }}
    />
  )
}

export default PrivateRoute
