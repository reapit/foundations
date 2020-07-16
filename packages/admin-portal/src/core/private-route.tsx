import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity } from '@/selector/auth'
import Routes from '@/constants/routes'
import { getAccessToken } from '@/utils/session'

export interface PrivateRouteProps {
  component: React.FunctionComponent | React.LazyExoticComponent<any>
  exact?: boolean
  fetcher?: boolean
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
    const { adminId } = loginIdentity
    if (!adminId) {
      history.replace(Routes.FOUR_O_FOUR)
    }
  }
}

export const fetchAccessToken = async () => {
  await getAccessToken()
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const [isFetchingAccessToken, setFetchingAccessToken] = React.useState(true)
  const history = useHistory()
  const loginIdentity = useSelector(selectLoginIdentity)

  React.useEffect(() => {
    fetchAccessToken().then(() => {
      setFetchingAccessToken(false)
    })
  }, [])

  React.useEffect(handleRedirectToAuthenticationPage(history, loginIdentity, isFetchingAccessToken), [
    loginIdentity,
    history,
    isFetchingAccessToken,
  ])

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
