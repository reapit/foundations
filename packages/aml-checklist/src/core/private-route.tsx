import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '@/constants/routes'
import { getMarketplaceGlobalsByKey } from '@reapit/elements'

export interface PrivateRouteProps {
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({ component, fetcher = false, ...rest }: PrivateRouteProps & RouteProps) => {
  return (
    <Route
      {...rest}
      render={props => {
        const cntCode = getMarketplaceGlobalsByKey('cntCode')

        if (cntCode && location.pathname !== `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${cntCode}`) {
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

export default PrivateRoute
