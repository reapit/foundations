import React, { FC, lazy } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

const LoginPage = lazy(() => catchChunkError(() => import('../components/login')))
const UsersPage = lazy(() => catchChunkError(() => import('../components/users')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
    <Route
      path={RoutePaths.USERS}
      element={
        <PrivateRouteWrapper>
          <UsersPage />
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
