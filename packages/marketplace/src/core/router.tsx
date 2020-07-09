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
const Client = React.lazy(() => catchChunkError(() => import('../components/pages/client')))
const ClientAppDetail = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail/client')))
const ClientWelcomePage = React.lazy(() => catchChunkError(() => import('../components/pages/client-welcome')))
const InstalledApps = React.lazy(() => catchChunkError(() => import('../components/pages/installed-apps')))
const ClientSetting = React.lazy(() => catchChunkError(() => import('../components/pages/settings/client-setting')))
const ClientAppsManagement = React.lazy(() =>
  catchChunkError(() => import('../components/pages/client-app-management')),
)
const ClientHelpPage = React.lazy(() => catchChunkError(() => import('../components/pages/client-help')))

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />

            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute allow="CLIENT" path={Routes.AUTHENTICATION_LOGIN_TYPE} component={Authentication} />
                <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={ClientAppsManagement} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.APPS} component={Client} exact fetcher />
                <PrivateRoute allow="CLIENT" path={Routes.APP_DETAIL} component={ClientAppDetail} exact fetcher />
                <PrivateRoute
                  allow="CLIENT"
                  path={Routes.APP_DETAIL_MANAGE}
                  component={ClientAppDetail}
                  exact
                  fetcher
                />
                <PrivateRoute allow="CLIENT" path={Routes.WELCOME} component={ClientWelcomePage} exact />
                <PrivateRoute allow="CLIENT" path={Routes.HELP} exact fetcher component={ClientHelpPage} />
                <PrivateRoute allow="CLIENT" path={Routes.SETTINGS} exact fetcher component={ClientSetting} />
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
