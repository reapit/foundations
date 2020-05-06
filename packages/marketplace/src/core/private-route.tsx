import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginType } from '@reapit/cognito-auth'

export interface PrivateRouteConnectProps {
  loginType: LoginType
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent | React.LazyExoticComponent<any>
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
        if (fetcher) {
          return <RouteFetcher routerProps={props} Component={component} />
        }
        const Component = component

        return <Component />
      }}
    />
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteConnectProps => ({
  loginType: state.auth.loginType,
})
export default connect(mapStateToProps)(PrivateRoute)
