import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps /*, useHistory */ } from 'react-router'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginIdentity } from '@reapit/connect-session'
import Routes from '@/constants/routes'

export interface PrivateRouteProps {
  component: React.FunctionComponent | React.LazyExoticComponent<any>
  exact?: boolean
  fetcher?: boolean
}

export const handleRedirectToAuthenticationPage = (
  history: History,
  loginIdentity: LoginIdentity | null | undefined,
  isDeveloperEdition: Boolean,
  isUser: Boolean,
) => {
  return () => {
    if (!loginIdentity) {
      return
    }
    if (!isDeveloperEdition && !isUser) {
      history.replace(Routes.AUTHENTICATION)
    }
  }
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (fetcher) {
          return <RouteFetcher routerProps={props} Component={component} />
        }
        const Component = component

        return <Component />
      }}
    />
  )
}

export default PrivateRoute
