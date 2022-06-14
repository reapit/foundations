import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory, History } from 'history'
import { Info } from '@reapit/elements-legacy'
import { PortalProvider } from '@reapit/elements-legacy'
import { OkayPage } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()
const AppDetail = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail/client')))
const AppsManagement = React.lazy(() => catchChunkError(() => import('../components/pages/app-management')))
const Apps = React.lazy(() => catchChunkError(() => import('../components/pages/apps')))
const Authentication = React.lazy(() => catchChunkError(() => import('../components/pages/authentication')))
const HandleLegacyDeveloperRoutesModal = React.lazy(() =>
  catchChunkError(() => import('../components/pages/handle-legacy-routes/handle-legacy-developer-routes-modal')),
)
const HandleLegacyAdminRoutesModal = React.lazy(() =>
  catchChunkError(() => import('../components/pages/handle-legacy-routes/handle-legacy-admin-routes-modal')),
)
const InstalledApps = React.lazy(() => catchChunkError(() => import('../components/pages/installed-apps')))
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Setting = React.lazy(() => catchChunkError(() => import('../components/pages/settings')))
const AcceptPermissionChangePage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/accept-permission-change')),
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route
              path={Routes.REGISTER}
              exact
              render={() => {
                window.location.href = `${window.reapit.config.developerPortalUrl}register`
                return null
              }}
            />
            <Route path={Routes.OK} exact render={() => <OkayPage />} />
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />

            <PrivateRouteWrapper showMenu={false} path="/admin">
              <Switch>
                <PrivateRoute path="/*" component={HandleLegacyAdminRoutesModal} />
              </Switch>
            </PrivateRouteWrapper>

            <PrivateRouteWrapper showMenu={false} path="/developer">
              <Switch>
                <PrivateRoute path="/*" component={HandleLegacyDeveloperRoutesModal} />
              </Switch>
            </PrivateRouteWrapper>

            <PrivateRouteWrapper>
              <Switch>
                <PrivateRoute path={Routes.AUTHENTICATION} component={Authentication} />
                <PrivateRoute path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
                <PrivateRoute path={Routes.MY_APPS} component={AppsManagement} fetcher exact />
                <PrivateRoute path={Routes.APPS} component={Apps} exact fetcher />
                <PrivateRoute path={Routes.APP_DETAIL} component={AppDetail} exact fetcher />
                <PrivateRoute path={Routes.APP_DETAIL_MANAGE} component={AppDetail} exact fetcher />
                <PrivateRoute path={Routes.SETTINGS} exact fetcher component={Setting} />
                <PrivateRoute path={Routes.ACCEPT_PERMISSION_CHANGE} exact component={AcceptPermissionChangePage} />
                <Route render={() => <Info infoType="404" />} />
              </Switch>
            </PrivateRouteWrapper>
            <Redirect to={Routes.LOGIN} />
          </Switch>
        </PortalProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
