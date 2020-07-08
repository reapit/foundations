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
const Register = React.lazy(() => catchChunkError(() => import('../components/pages/register')))
const DeveloperHome = React.lazy(() => catchChunkError(() => import('../components/pages/developer-home')))
const DeveloperAppDetail = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail/developer')))
const DeveloperEditApp = React.lazy(() => catchChunkError(() => import('../components/pages/developer-edit-app')))
const AdminApprovalsPage = React.lazy(() => catchChunkError(() => import('../components/pages/admin-approvals')))
const AdminDevManagementPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/admin-dev-management')),
)
const ApiDocsPage = React.lazy(() => catchChunkError(() => import('../components/pages/api-docs')))
const SwaggerPage = React.lazy(() => catchChunkError(() => import('../components/pages/swagger')))
const DeveloperDesktopPage = React.lazy(() => catchChunkError(() => import('../components/pages/developer-desktop')))
const DeveloperWelcomePage = React.lazy(() => catchChunkError(() => import('../components/pages/developer-welcome')))
const DeveloperHelpPage = React.lazy(() => catchChunkError(() => import('../components/pages/developer-help')))
const ClientHelpPage = React.lazy(() => catchChunkError(() => import('../components/pages/client-help')))
const AnalyticsPage = React.lazy(() => catchChunkError(() => import('@/components/pages/developer-analytics')))
const AdminAppsPage = React.lazy(() => catchChunkError(() => import('../components/pages/admin-apps')))
const RegisterConfirm = React.lazy(() => catchChunkError(() => import('../components/pages/register-confirm')))
const AdminStats = React.lazy(() => catchChunkError(() => import('../components/pages/admin-stats')))
const DeveloperWebhooksPage = React.lazy(() => catchChunkError(() => import('../components/pages/developer-webhooks')))
const DeveloperSettingsPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/settings/developer-settings')),
)

const DeveloperSettingsOrganisationTabPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/settings/developer-settings-organisation-tab')),
)

const DeveloperSettingsBillingTabPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/settings/developer-settings-billing-tab')),
)

const DeveloperAdminBillingPage = React.lazy(() => catchChunkError(() => import('../components/pages/admin-billing')))
const DeveloperEditionDownloadPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/developer-edition-download')),
)

const Router = () => {
  const isProduction = window.reapit.config.appEnv === 'production'
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={isProduction ? Routes.LOGIN : []} exact render={() => <Login />} />
            <Route allow="DEVELOPER" path={Routes.REGISTER} render={() => <Register />} />
            <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />

            <PrivateRouteWrapper path={Routes.DEVELOPER_EDITION_DOWNLOAD} showMenu={false}>
              <PrivateRoute allow="DEVELOPER" path="/" component={DeveloperEditionDownloadPage} />
            </PrivateRouteWrapper>

            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute
                  allow={['CLIENT', 'DEVELOPER']}
                  path={Routes.AUTHENTICATION_LOGIN_TYPE}
                  component={Authentication}
                />
                <PrivateRoute
                  allow="ADMIN"
                  path={Routes.ADMIN_BILLING}
                  component={DeveloperAdminBillingPage}
                  fetcher
                  exact
                />
                <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={ClientAppsManagement} fetcher exact />
                <PrivateRoute allow="CLIENT" path={Routes.CLIENT} component={Client} exact fetcher />
                <PrivateRoute
                  allow="CLIENT"
                  path={Routes.CLIENT_APP_DETAIL}
                  component={ClientAppDetail}
                  exact
                  fetcher
                />
                <PrivateRoute
                  allow="CLIENT"
                  path={Routes.CLIENT_APP_DETAIL_MANAGE}
                  component={ClientAppDetail}
                  exact
                  fetcher
                />
                <PrivateRoute allow="CLIENT" path={Routes.CLIENT_WELCOME} component={ClientWelcomePage} exact />
                <PrivateRoute allow="CLIENT" path={Routes.CLIENT_HELP} exact fetcher component={ClientHelpPage} />
                <PrivateRoute allow="CLIENT" path={Routes.CLIENT_SETTINGS} exact fetcher component={ClientSetting} />

                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_MY_APPS}
                  component={DeveloperHome}
                  exact
                  fetcher
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_APP_DETAIL}
                  component={DeveloperAppDetail}
                  exact
                  fetcher
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_MY_APPS_EDIT}
                  component={DeveloperEditApp}
                  exact
                  fetcher
                />
                <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_API_DOCS} component={ApiDocsPage} />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_WEBHOOKS}
                  fetcher
                  component={DeveloperWebhooksPage}
                />
                <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_SWAGGER} exact component={SwaggerPage} />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_DESKTOP}
                  exact
                  component={DeveloperDesktopPage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_ANALYTICS_TAB}
                  fetcher
                  exact
                  component={AnalyticsPage}
                />

                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_SETTINGS}
                  fetcher
                  exact
                  component={DeveloperSettingsPage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_SETTINGS_BILLING_TAB}
                  fetcher
                  component={DeveloperSettingsBillingTabPage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_SETTINGS_ORGANISATION_TAB}
                  fetcher
                  component={DeveloperSettingsOrganisationTabPage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_WELCOME}
                  exact
                  component={DeveloperWelcomePage}
                />
                <PrivateRoute
                  allow="DEVELOPER"
                  path={Routes.DEVELOPER_HELP}
                  exact
                  fetcher
                  component={DeveloperHelpPage}
                />
                <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_APP_PREVIEW} exact component={ClientAppDetail} />

                <PrivateRoute
                  allow="ADMIN"
                  path={Routes.ADMIN_APPROVALS}
                  component={AdminApprovalsPage}
                  exact
                  fetcher
                />
                <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPS} component={AdminAppsPage} fetcher exact />
                <PrivateRoute
                  allow="ADMIN"
                  path={Routes.ADMIN_DEV_MANAGEMENT}
                  component={AdminDevManagementPage}
                  exact
                  fetcher
                />
                <PrivateRoute allow="ADMIN" path={Routes.ADMIN_STATS} component={AdminStats} exact fetcher />
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
