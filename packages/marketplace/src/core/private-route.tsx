import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps /*, useHistory */ } from 'react-router'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginIdentity } from '@reapit/connect-session'
import Routes from '@/constants/routes'
// import { useReapitConnect } from '@reapit/connect-session'
// import { reapitConnectBrowserSession } from './connect-session'
// import { selectDeveloperEditionId, selectIsUser } from '@/selector/auth'

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
  const [isFetchingAccessToken] = React.useState(false)
  // const history = useHistory()

  // const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  // const isDeveloperEdition = Boolean(selectDeveloperEditionId(connectSession))
  // const isUser = selectIsUser(connectSession)
  // const loginIdentity = connectSession?.loginIdentity

  // React.useEffect(handleRedirectToAuthenticationPage(history, loginIdentity, isDeveloperEdition, isUser), [
  //   loginIdentity,
  //   history,
  //   isFetchingAccessToken,
  //   isUser,
  // ])

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
