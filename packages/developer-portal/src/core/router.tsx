import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
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
const Register = React.lazy(() => catchChunkError(() => import('../components/pages/register')))
const Apps = React.lazy(() => catchChunkError(() => import('../components/pages/apps')))
const AppDetail = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail')))
const EditApp = React.lazy(() => catchChunkError(() => import('../components/pages/edit-app')))
const ApiDocsPage = React.lazy(() => catchChunkError(() => import('../components/pages/api-docs')))
const SwaggerPage = React.lazy(() => catchChunkError(() => import('../components/pages/swagger')))
const DesktopPage = React.lazy(() => catchChunkError(() => import('../components/pages/desktop')))
const WelcomePage = React.lazy(() => catchChunkError(() => import('../components/pages/welcome')))
const HelpPage = React.lazy(() => catchChunkError(() => import('../components/pages/help')))
const AnalyticsPage = React.lazy(() => catchChunkError(() => import('@/components/pages/analytics')))
const RegisterConfirm = React.lazy(() => catchChunkError(() => import('../components/pages/register-confirm')))
const WebhooksPage = React.lazy(() => catchChunkError(() => import('../components/pages/webhooks')))
const SettingsPage = React.lazy(() => catchChunkError(() => import('../components/pages/settings/')))

const SettingsOrganisationTabPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/settings/settings-organisation-tab')),
)

const SettingsBillingTabPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/settings/settings-billing-tab')),
)

const EditionDownloadPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/developer-edition-download')),
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route allow="DEVELOPER" path={Routes.REGISTER} render={() => <Register />} />
            <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />

            <PrivateRouteWrapper path={Routes.DEVELOPER_EDITION_DOWNLOAD} showMenu={false}>
              <PrivateRoute allow="DEVELOPER" path="/" component={EditionDownloadPage} />
            </PrivateRouteWrapper>

            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute
                  allow={['DEVELOPER']}
                  path={Routes.AUTHENTICATION_LOGIN_TYPE}
                  component={Authentication}
                />
                <PrivateRoute allow="DEVELOPER" path={Routes.APPS} component={Apps} exact fetcher />
                <PrivateRoute allow="DEVELOPER" path={Routes.APP_DETAIL} component={AppDetail} exact fetcher />
                <PrivateRoute allow="DEVELOPER" path={Routes.APPS_EDIT} component={EditApp} exact fetcher />
                <PrivateRoute allow="DEVELOPER" path={Routes.API_DOCS} component={ApiDocsPage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.WEBHOOKS} fetcher component={WebhooksPage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.SWAGGER} exact component={SwaggerPage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.DESKTOP} exact component={DesktopPage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.ANALYTICS_TAB} fetcher exact component={AnalyticsPage} />

                <PrivateRoute allow="DEVELOPER" path={Routes.SETTINGS} fetcher exact component={SettingsPage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.SETTINGS} fetcher exact component={SettingsPage} />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.SETTINGS_BILLING_TAB}
                  fetcher
                  component={SettingsBillingTabPage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.SETTINGS_ORGANISATION_TAB}
                  fetcher
                  component={SettingsOrganisationTabPage}
                />
                <PrivateRoute allow="DEVELOPER" path={Routes.WELCOME} exact component={WelcomePage} />
                <PrivateRoute allow="DEVELOPER" path={Routes.HELP} exact fetcher component={HelpPage} />

                <Route render={() => <Info infoType="404" />} />
              </Switch>
            </PrivateRouteWrapper>
          </Switch>
        </PortalProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
