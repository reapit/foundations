import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const AppsBrowseManagerPage = React.lazy(() => catchChunkError(() => import('../components/apps-market-manager')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
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
