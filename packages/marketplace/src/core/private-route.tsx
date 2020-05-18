import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps, RouteComponentProps, StaticContext } from 'react-router'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginType, LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity, selectLoginType } from '@/selector/auth'
import { authChangeLoginType } from '@/actions/auth'
import Routes from '@/constants/routes'

export type RouterComponentProps = {} & RouteComponentProps<any, StaticContext, History.PoorMansUnknown>

export interface PrivateRouteProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const isNotAllowedToAccess = (loginIdentity?: LoginIdentity) => {
  if (!loginIdentity) {
    return false
  }
  const { clientId, developerId } = loginIdentity
  if (!clientId && !developerId) {
    return true
  }
  return false
}

export const handleChangeLoginType = (loginIdentity, loginType, allow, dispatch) => {
  return () => {
    if (!loginIdentity) {
      return
    }
    if (loginType === 'CLIENT' && allow === 'DEVELOPER' && loginIdentity.developerId) {
      dispatch(authChangeLoginType('DEVELOPER'))
    }
    if (loginType === 'DEVELOPER' && allow === 'CLIENT' && loginIdentity.clientId) {
      dispatch(authChangeLoginType('CLIENT'))
    }
  }
}

export const handleRedirectToAuthenticationPage = (loginIdentity, allow) => {
  return () => {
    if (!loginIdentity) {
      return
    }
    const { clientId, developerId } = loginIdentity
    if ((allow === 'CLIENT' && !clientId) || (allow === 'DEVELOPER' && !developerId)) {
      window.location.href = `${Routes.Authentication}/${allow}`
    }
  }
}

export const PrivateRoute = ({ component, allow, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const dispatch = useDispatch()
  const loginIdentity = useSelector(selectLoginIdentity)
  const loginType = useSelector(selectLoginType)

  React.useEffect(handleChangeLoginType(loginIdentity, loginType, allow, dispatch), [
    allow,
    dispatch,
    loginIdentity,
    loginType,
  ])

  React.useEffect(handleRedirectToAuthenticationPage(loginIdentity, allow), [loginIdentity, allow])

  return (
    <Route
      {...rest}
      render={props => {
        if (isNotAllowedToAccess(loginIdentity)) {
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
