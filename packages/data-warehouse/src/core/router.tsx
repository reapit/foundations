import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RoutePaths from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

const AccountsPage = React.lazy(() => catchChunkError(() => import('../components/accounts/accounts')))
const DataPage = React.lazy(() => catchChunkError(() => import('../components/data/data')))
const NetworkPage = React.lazy(() => catchChunkError(() => import('../components/network')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={
        <Login
          appName="Data Warehouse"
          reapitConnectBrowserSession={reapitConnectBrowserSession}
          redirectPath={RoutePaths.ACCOUNTS}
        />
      }
    />
    <Route
      path={RoutePaths.ACCOUNTS}
      element={
        <PrivateRouteWrapper>
          <AccountsPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.DATA}
      element={
        <PrivateRouteWrapper>
          <DataPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <AccountsPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.NETWORK}
      element={
        <PrivateRouteWrapper>
          <NetworkPage />
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
