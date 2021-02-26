import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import RouteFetcher from '../components/hocs/route-fetcher'
import { reapitConnectBrowserSession } from './connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Info } from '@reapit/elements'

export interface PrivateRouteProps {
  component: React.FunctionComponent | React.LazyExoticComponent<any>
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const adminId = connectSession?.loginIdentity?.groups.includes('ReapitEmployeeFoundationsAdmin')

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!adminId) {
          return <Info infoType="404" />
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
