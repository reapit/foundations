import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

const HomePage = React.lazy(() => catchChunkError(() => import('../components/home')))
const AdminPage = React.lazy(() => catchChunkError(() => import('../components/admin')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={<Login appName="Reapit Connect MFA Config" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
    />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <HomePage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.ADMIN}
      element={
        <PrivateRouteWrapper>
          <AdminPage />
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
