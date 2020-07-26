import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginIdentity } from '@reapit/connect-session'
import { selectLoginIdentity } from '@/selector/auth'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export interface PrivateRouteProps {
  component: React.FunctionComponent | React.LazyExoticComponent<any>
  exact?: boolean
  fetcher?: boolean
}

/**
 * FIXME: remove this
 * make sure login wont break
 * developer login marketplace
 * admin login marketplace
 */
// TODO: remove

/**
 * FIXME: remove this
 * make sure login wont break
 * developer login marketplace
 * admin login marketplace
 */
export const handleRedirectToAuthenticationPage = (
  history: History,
  loginIdentity?: LoginIdentity | null | undefined,
) => {
  return () => {
    if (!loginIdentity) {
      return
    }
    const { clientId } = loginIdentity
    // remove dev login
    if (!clientId) {
      history.replace(Routes.AUTHENTICATION)
    }
  }
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  // TODO(remove connnect session remove this)
  const [isFetchingAccessToken] = React.useState(false)
  const history = useHistory()
  // FIXME(selectLoginIdentity)
  // TESTME(selectLoginIdentity)
  /**
   * Show login shit for dev
   * Show login shit for admin
   */
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  /**
   * FIXME(remove connect session): remove this
   */

  /**
   * FIXME(remove connect session): make sure update to remove/handle
   *
   */
  React.useEffect(handleRedirectToAuthenticationPage(history, loginIdentity), [
    loginIdentity,

    history,
    isFetchingAccessToken,
  ])

  // Remove this
  if (isFetchingAccessToken) {
    return null
  }
  return (
    <Route
      {...rest}
      render={props => {
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
