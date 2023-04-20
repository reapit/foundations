import React, { FC } from 'react'
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const PaymentsPage = React.lazy(() => catchChunkError(() => import('../components/payments')))
const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))
const AdminPage = React.lazy(() => catchChunkError(() => import('../components/admin')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
    <Route
      path={`${RoutePaths.PAYMENT}/*`}
      element={
        <PrivateRouteWrapper>
          <PaymentPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.PAYMENTS}
      element={
        <PrivateRouteWrapper>
          <PaymentsPage />
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
    <Route path={RoutePaths.HOME} index element={<Navigate to={RoutePaths.PAYMENTS} replace />} />
  </Routes>
)

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router
