import * as React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { catchChunkError } from '@reapit/utils-react'
import PrivateRouteWrapper from './private-route-wrapper'
import { FC } from 'react'

export const history: History<any> = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Appointment = React.lazy(() => catchChunkError(() => import('../components/pages/appointment')))

export const ROUTES = {
  APPOINTMENT: '/',
  LOGIN: '/login',
  OK: '/ok',
}

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route
      path={ROUTES.APPOINTMENT}
      element={
        <PrivateRouteWrapper>
          <Appointment />
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
