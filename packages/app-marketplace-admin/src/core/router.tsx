import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

const AppsBrowseManagerPage = React.lazy(() => catchChunkError(() => import('../components/apps-market-manager')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={
        <Login
          appName="AppMarket Admin"
          reapitConnectBrowserSession={reapitConnectBrowserSession}
          redirectPath={RoutePaths.APPS_BROWSE_MANAGER}
        />
      }
    />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <AppsBrowseManagerPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.APPS_BROWSE_MANAGER}
      element={
        <PrivateRouteWrapper>
          <AppsBrowseManagerPage />
        </PrivateRouteWrapper>
      }
    />
  </Routes>
)

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router
