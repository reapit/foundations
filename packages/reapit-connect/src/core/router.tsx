import * as React from 'react'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { Login, catchChunkError } from '@reapit/utils-react'
import { FC, lazy } from 'react'
import { reapitConnectBrowserSession } from './connect-session'

const WelcomePage = lazy(() => catchChunkError(() => import('../components/pages/welcome')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={ROUTES.LOGIN}
      element={<Login appName="Reapit Connect Welcome" reapitConnectBrowserSession={reapitConnectBrowserSession} />}
    />
    <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
    <Route path={ROUTES.HOME} index element={<Navigate to={ROUTES.WELCOME} replace />} />
  </Routes>
)

const Router: FC = () => (
  <BrowserRouter>
    <RoutesComponent />
  </BrowserRouter>
)

export default Router
