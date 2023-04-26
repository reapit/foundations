import * as React from 'react'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { catchChunkError } from '@reapit/utils-react'
import { FC, lazy } from 'react'

const LoginPage = lazy(() => catchChunkError(() => import('../components/pages/login')))
const WelcomePage = lazy(() => catchChunkError(() => import('../components/pages/welcome')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
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
