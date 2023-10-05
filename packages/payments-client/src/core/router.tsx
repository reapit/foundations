import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

const PaymentsPage = React.lazy(() => catchChunkError(() => import('../components/payments')))
const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))
const AdminPage = React.lazy(() => catchChunkError(() => import('../components/admin')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={<Login appName="Payments" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
    />
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
    <Route
      path={RoutePaths.HOME}
      index
      element={
        <PrivateRouteWrapper>
          <PaymentsPage />
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
