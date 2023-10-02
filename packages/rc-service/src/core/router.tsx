import React, { FC, lazy } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

const UsersPage = lazy(() => catchChunkError(() => import('../components/users')))
const OrgsPage = lazy(() => catchChunkError(() => import('../components/orgs')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={<Login appName="Reapit Connect Service App" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
    />
    <Route
      path={RoutePaths.USERS}
      element={
        <PrivateRouteWrapper>
          <UsersPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.ORGS}
      element={
        <PrivateRouteWrapper>
          <OrgsPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <UsersPage />
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
