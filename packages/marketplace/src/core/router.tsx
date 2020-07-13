import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements'
import { PortalProvider } from '@reapit/elements'

export const history = createBrowserHistory()
const Authentication = React.lazy(() => catchChunkError(() => import('../components/pages/authentication')))
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Apps = React.lazy(() => catchChunkError(() => import('../components/pages/apps')))
const AppDetail = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail/client')))
const WelcomePage = React.lazy(() => catchChunkError(() => import('../components/pages/welcome')))
const InstalledApps = React.lazy(() => catchChunkError(() => import('../components/pages/installed-apps')))
const Setting = React.lazy(() => catchChunkError(() => import('../components/pages/settings')))
const AppsManagement = React.lazy(() => catchChunkError(() => import('../components/pages/app-management')))
const Help = React.lazy(() => catchChunkError(() => import('../components/pages/help')))
const HandleLegacyDeveloperRoutesModal = React.lazy(() =>
  catchChunkError(() => import('../components/pages/handle-legacy-routes/handle-legacy-developer-routes-modal')),
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />

            <PrivateRouteWrapper showMenu={false} path="/admin">
              <Switch>
                <PrivateRoute allow="CLIENT" path="/*" component={HandleLegacyDeveloperRoutesModal} />
              </Switch>
            </PrivateRouteWrapper>

            <PrivateRouteWrapper showMenu={false} path="/developer">
              <Switch>
                <PrivateRoute allow="CLIENT" path="/*" component={HandleLegacyDeveloperRoutesModal} />
              </Switch>
            </PrivateRouteWrapper>

            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute allow="CLIENT" path={Routes.AUTHENTICATION_LOGIN_TYPE} component={Authentication} />
                <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={AppsManagement} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.APPS} component={Apps} exact fetcher />
                <PrivateRoute allow="CLIENT" path={Routes.APP_DETAIL} component={AppDetail} exact fetcher />
                <PrivateRoute allow="CLIENT" path={Routes.APP_DETAIL_MANAGE} component={AppDetail} exact fetcher />
                <PrivateRoute allow="CLIENT" path={Routes.WELCOME} component={WelcomePage} exact />
                <PrivateRoute allow="CLIENT" path={Routes.HELP} exact fetcher component={Help} />
                <PrivateRoute allow="CLIENT" path={Routes.SETTINGS} exact fetcher component={Setting} />
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
