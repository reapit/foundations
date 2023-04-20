import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RoutePaths from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { OkayPage, catchChunkError } from '@reapit/utils-react'

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const AccountsPage = React.lazy(() => catchChunkError(() => import('../components/accounts/accounts')))
const DataPage = React.lazy(() => catchChunkError(() => import('../components/data/data')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.OK} element={<OkayPage />} />
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
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
  </Routes>
)

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router
