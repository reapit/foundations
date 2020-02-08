import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
<<<<<<< HEAD

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType?: LoginType
=======
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoginType } from '@reapit/cognito-auth'

export interface PrivateRouteConnectProps {
  loginType: LoginType
>>>>>>> temp
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
<<<<<<< HEAD
}

export const PrivateRoute = ({ component, allow, loginType = 'CLIENT', ...rest }: PrivateRouteProps & RouteProps) => {
=======
  fetcher?: boolean
}

export const PrivateRoute = ({
  component,
  allow,
  fetcher = false,
  loginType,
  ...rest
}: PrivateRouteProps & RouteProps) => {
>>>>>>> temp
  const allowTypes = Array.isArray(allow) ? allow : [allow]
  allowTypes.includes(loginType)
  return (
    <Route
      {...rest}
      render={props => {
        if (!allowTypes.includes(loginType)) {
          return <Redirect to="/404" />
        }
<<<<<<< HEAD

        const Component = component

        return <Component {...props} />
=======
        if (fetcher) {
          return <RouteFetcher routerProps={props} Component={component} />
        }
        const Component = component

        return <Component />
>>>>>>> temp
      }}
    />
  )
}

<<<<<<< HEAD
export default PrivateRoute
=======
const mapStateToProps = (state: ReduxState): PrivateRouteConnectProps => ({
  loginType: state.auth.loginType,
})
export default connect(mapStateToProps)(PrivateRoute)
>>>>>>> temp
