import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import RouteFetcher from '../components/hocs/route-fetcher'
import { LoadableComponent } from '@loadable/component'

export interface PrivateRouteConnectProps {
  isLogin: boolean
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  component: LoadableComponent<any> | React.FunctionComponent
}

export const PrivateRoute = ({ component, isLogin, ...rest }: PrivateRouteProps & RouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? <RouteFetcher routerProps={props} Component={component} /> : <Redirect to="/login" />
      }
    />
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteConnectProps => ({
  isLogin: state.auth.isLogin
})
export default connect(mapStateToProps)(PrivateRoute)
