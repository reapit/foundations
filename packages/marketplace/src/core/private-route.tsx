import * as React from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginType, LoginIdentity } from '@reapit/cognito-auth'
import { selectLoginIdentity, selectLoginType } from '@/selector/auth'
import { authChangeLoginType } from '@/actions/auth'
import Routes from '@/constants/routes'
import { getAccessToken } from '@/utils/session'

export interface PrivateRouteProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent | React.LazyExoticComponent<any>
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

export const handleChangeLoginType = (
  loginType: LoginType,
  allow: LoginType | LoginType[],
  dispatch: Dispatch,
  loginIdentity?: LoginIdentity,
) => {
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

export const handleRedirectToAuthenticationPage = (
  allow: LoginType | LoginType[],
  history: History,
  loginIdentity?: LoginIdentity,
) => {
  return () => {
    if (!loginIdentity) {
      return
    }
    const { clientId, developerId } = loginIdentity
    if ((allow === 'CLIENT' && !clientId) || (allow === 'DEVELOPER' && !developerId)) {
      history.replace(`${Routes.AUTHENTICATION}/${allow.toLowerCase()}`)
    }
  }
}

export const fetchAccessToken = async () => {
  await getAccessToken()
}

export const PrivateRoute = ({ component, allow, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loginIdentity = useSelector(selectLoginIdentity)
  const loginType = useSelector(selectLoginType)

  React.useEffect(handleChangeLoginType(loginType, allow, dispatch, loginIdentity), [
    allow,
    dispatch,
    loginIdentity,
    loginType,
  ])

  React.useEffect(handleRedirectToAuthenticationPage(allow, history, loginIdentity), [loginIdentity, allow, history])

  fetchAccessToken()

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
