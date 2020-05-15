import * as React from 'react'
import { Route, RouteProps, useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginType, LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity, selectLoginType } from '@/selector/auth'
import { authChangeLoginType } from '@/actions/auth'
import Routes from '@/constants/routes'

export interface PrivateRouteProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const isNotAllowedAccess = (loginIdentity?: LoginIdentity) => {
  if (!loginIdentity) {
    return false
  }
  const { clientId, developerId } = loginIdentity
  if (!clientId && !developerId) {
    return true
  }
  return false
}

export const PrivateRoute = ({ component, allow, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginIdentity = useSelector(selectLoginIdentity)
  const loginType = useSelector(selectLoginType)

  React.useEffect(() => {
    if (!loginIdentity) {
      return
    }
    if (loginType === 'CLIENT' && allow === 'DEVELOPER' && loginIdentity.developerId) {
      console.log('PrivateRoute -> allow 1', allow)
      dispatch(authChangeLoginType('DEVELOPER'))
    }
    if (loginType === 'DEVELOPER' && allow === 'CLIENT' && loginIdentity.clientId) {
      console.log('PrivateRoute -> allow 2', allow)
      dispatch(authChangeLoginType('CLIENT'))
    }
  }, [allow, dispatch, loginIdentity, loginType])

  React.useEffect(() => {
    if (loginIdentity) {
      const { clientId, developerId } = loginIdentity
      if ((allow === 'CLIENT' && !clientId) || (allow === 'DEVELOPER' && !developerId)) {
        history.replace(Routes.Authentication)
      }
    }
  }, [loginType, loginIdentity])

  return (
    <Route
      {...rest}
      render={props => {
        if (isNotAllowedAccess(loginIdentity)) {
          return <Redirect to="/404" />
        }
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
