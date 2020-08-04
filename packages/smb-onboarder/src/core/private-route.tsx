import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType?: LoginType
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
}

export const PrivateRoute = ({ component, allow, loginType = 'CLIENT', ...rest }: PrivateRouteProps & RouteProps) => {
  const allowTypes = Array.isArray(allow) ? allow : [allow]
  /*
   * TODOME(PrivateRoute)
   *remove types, router only accept CLIET
   */
  allowTypes.includes(loginType)
  return (
    <Route
      {...rest}
      render={props => {
        /*
         * TODOME(PrivateRoute)
         *remove types, router only accept CLIET
         */
        if (!allowTypes.includes(loginType)) {
          return <Redirect to="/404" />
        }

        const Component = component

        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute
