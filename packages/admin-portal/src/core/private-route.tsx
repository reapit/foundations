import React, { FC, LazyExoticComponent } from 'react'
import { Route, RouteProps, useLocation } from 'react-router'
import RouteFetcher from '../components/hocs/route-fetcher'
import { reapitConnectBrowserSession } from './connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { getAccess } from '../utils/get-access'
import { FlexContainer, PersistentNotification } from '@reapit/elements'

export interface PrivateRouteProps {
  component: FC | LazyExoticComponent<any>
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const hasAccess = getAccess(connectSession, location.pathname)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!hasAccess) {
          return (
            <FlexContainer>
              <PersistentNotification isFullWidth isExpanded intent="danger">
                You do not have permission to view this page.
              </PersistentNotification>
            </FlexContainer>
          )
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
