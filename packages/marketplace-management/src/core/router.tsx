import * as React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RoutePaths from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { FC, lazy } from 'react'
import { catchChunkError } from '@reapit/utils-react'

const LoginPage = lazy(() => catchChunkError(() => import('../components/pages/login')))
const Offices = lazy(() => catchChunkError(() => import('../components/pages/offices')))
const Users = lazy(() => catchChunkError(() => import('../components/pages/users')))
const Marketplace = lazy(() => catchChunkError(() => import('../components/pages/marketplace')))
const AccessDenied = lazy(() => catchChunkError(() => import('../components/pages/access-denied')))
const MarketplaceAppPage = lazy(() => catchChunkError(() => import('../components/pages/marketplace-app')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
    <Route
      path={`${RoutePaths.OFFICES}/*`}
      element={
        <PrivateRouteWrapper>
          <Offices />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={`${RoutePaths.USERS}/*`}
      element={
        <PrivateRouteWrapper>
          <Users />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.MARKETPLACE}
      element={
        <PrivateRouteWrapper>
          <Marketplace />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.MARKETPLACE_APP}
      element={
        <PrivateRouteWrapper>
          <MarketplaceAppPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.ACCESS_DENIED}
      element={
        <PrivateRouteWrapper>
          <AccessDenied />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.HOME}
      index
      element={
        <PrivateRouteWrapper>
          <Users />
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
