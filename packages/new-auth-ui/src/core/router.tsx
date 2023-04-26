import React, { FC } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RoutePaths from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const HomePage = React.lazy(() => catchChunkError(() => import('../components/landing')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <HomePage />
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
