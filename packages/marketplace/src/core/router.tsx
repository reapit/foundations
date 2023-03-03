import React, { FC } from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Routes } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const AppsBrowsePage = React.lazy(() => catchChunkError(() => import('../components/apps-browse')))
const AppsDetailPage = React.lazy(() => catchChunkError(() => import('../components/apps-detail')))
const AppsInstalledPage = React.lazy(() => catchChunkError(() => import('../components/apps-installed')))
const SettingsPage = React.lazy(() => catchChunkError(() => import('../components/settings')))
const SupportPage = React.lazy(() => catchChunkError(() => import('../components/apps-support')))
const PermissionChangePage = React.lazy(() => catchChunkError(() => import('../components/accept-permission-change')))

const Router: FC = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <Route path={Routes.HOME} exact component={AppsBrowsePage} />
            <Route path={Routes.APPS_BROWSE} exact component={AppsBrowsePage} />
            <Route path={Routes.APPS_DETAIL} exact component={AppsDetailPage} />
            <Route path={Routes.APPS_INSTALLED} exact component={AppsInstalledPage} />
            <Route path={Routes.SETTINGS_PROFILE} exact component={SettingsPage} />
            <Route path={Routes.SETTINGS_INSTALLED} exact component={SettingsPage} />
            <Route path={Routes.SUPPORT} exact component={SupportPage} />
            <Route path={Routes.ACCEPT_PERMISSION_CHANGE} exact component={PermissionChangePage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
