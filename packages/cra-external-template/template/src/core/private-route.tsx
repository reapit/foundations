import * as React from 'react'
import { Route, RouteProps } from 'react-router'

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType?: LoginType
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps & RouteProps) => {
  return (
    <Route
      {...rest}
      render={props => {
        const Component = component

        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute
