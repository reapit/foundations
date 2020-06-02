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

export const isNotAllowedToAccess = (allow: LoginType | LoginType[], loginIdentity?: LoginIdentity) => {
  if (!loginIdentity) {
    return false
  }
  const { clientId, developerId, adminId } = loginIdentity
  const isAdminProtected = allow === 'ADMIN' && !adminId
  const isNotClientOrDeveloper = !clientId && !developerId

  if (isNotClientOrDeveloper || isAdminProtected) {
    return true
  }
  return false
}

export const handleChangeLoginType = (
  loginType: LoginType,
  allow: LoginType | LoginType[],
  dispatch: Dispatch,
  loginIdentity?: LoginIdentity,
  isFetchingAccessToken?: boolean,
) => {
  return () => {
    if (!loginIdentity || isFetchingAccessToken) {
      return
    }
    if (loginType !== 'ADMIN' && allow === 'ADMIN' && loginIdentity.adminId) {
      dispatch(authChangeLoginType('ADMIN'))
      return
    }
    if (loginType !== 'CLIENT' && allow === 'CLIENT' && loginIdentity.clientId) {
      dispatch(authChangeLoginType('CLIENT'))
      return
    }
    if (loginType !== 'DEVELOPER' && allow === 'DEVELOPER' && loginIdentity.developerId) {
      dispatch(authChangeLoginType('DEVELOPER'))
      return
    }
  }
}

export const handleRedirectToAuthenticationPage = (
  allow: LoginType | LoginType[],
  history: History,
  loginIdentity?: LoginIdentity,
  isFetchingAccessToken?: boolean,
) => {
  return () => {
    if (!loginIdentity || isFetchingAccessToken) {
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
  const [isFetchingAccessToken, setFetchingAccessToken] = React.useState(true)
  const dispatch = useDispatch()
  const history = useHistory()
  const loginIdentity = useSelector(selectLoginIdentity)
  const loginType = useSelector(selectLoginType)

  React.useEffect(() => {
    fetchAccessToken().then(() => {
      setFetchingAccessToken(false)
    })
  }, [])

  React.useEffect(handleChangeLoginType(loginType, allow, dispatch, loginIdentity, isFetchingAccessToken), [
    allow,
    dispatch,
    loginIdentity,
    loginType,
    isFetchingAccessToken,
  ])

  React.useEffect(handleRedirectToAuthenticationPage(allow, history, loginIdentity, isFetchingAccessToken), [
    loginIdentity,
    allow,
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
        if (isNotAllowedToAccess(allow, loginIdentity)) {
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
