import React, { FC, lazy } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { RoutePaths } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { Login, catchChunkError } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'

export const history: History<any> = createBrowserHistory()

const AppsBrowsePage = lazy(() => catchChunkError(() => import('../components/apps-browse')))
const AppsDetailPage = lazy(() => catchChunkError(() => import('../components/apps-detail')))
const AppsInstalledPage = lazy(() => catchChunkError(() => import('../components/apps-installed')))
const SettingsPage = lazy(() => catchChunkError(() => import('../components/settings')))
const SupportPage = lazy(() => catchChunkError(() => import('../components/apps-support')))
const PermissionChangePage = lazy(() => catchChunkError(() => import('../components/accept-permission-change')))

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path={RoutePaths.LOGIN}
      element={
        <Login
          appName="AppMarket"
          reapitConnectBrowserSession={reapitConnectBrowserSession}
          redirectPath={RoutePaths.APPS_BROWSE}
        />
      }
    />
    <Route
      path={RoutePaths.HOME}
      element={
        <PrivateRouteWrapper>
          <AppsBrowsePage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.APPS_BROWSE}
      element={
        <PrivateRouteWrapper>
          <AppsBrowsePage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.APPS_DETAIL}
      element={
        <PrivateRouteWrapper>
          <AppsDetailPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.APPS_INSTALLED}
      element={
        <PrivateRouteWrapper>
          <AppsInstalledPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={`${RoutePaths.SETTINGS}/*`}
      element={
        <PrivateRouteWrapper>
          <SettingsPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.SUPPORT}
      element={
        <PrivateRouteWrapper>
          <SupportPage />
        </PrivateRouteWrapper>
      }
    />
    <Route
      path={RoutePaths.ACCEPT_PERMISSION_CHANGE}
      element={
        <PrivateRouteWrapper>
          <PermissionChangePage />
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
