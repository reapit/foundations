import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '@/constants/routes'

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType: LoginType
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({
  component,
  allow,
  fetcher = false,
  loginType,
  ...rest
}: PrivateRouteProps & RouteProps) => {
  const allowTypes = Array.isArray(allow) ? allow : [allow]
  allowTypes.includes(loginType)

  return (
    <Route
      {...rest}
      render={props => {
        if (!allowTypes.includes(loginType)) {
          return <Redirect to="/404" />
        }

        const searchParams = new URLSearchParams(props.location.search)
        const cntCode = searchParams && searchParams.get('cntCode') ? searchParams.get('cntCode') : null

        if (cntCode) {
          return <Redirect to={`${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${cntCode}`} />
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

const mapStateToProps = (): PrivateRouteConnectProps => ({
  loginType: 'CLIENT'
})
export default connect(mapStateToProps)(PrivateRoute)
