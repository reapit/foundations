import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements'
import { PortalProvider } from '@reapit/elements'
import { RedirectToSettingsProfilePage } from '@/components/pages/settings/settings'

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
const AppDetailPreview = React.lazy(() => catchChunkError(() => import('../components/pages/app-detail-preview')))
const Invite = React.lazy(() => catchChunkError(() => import('../components/pages/invite')))

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
            <Route path={Routes.REGISTER} render={() => <Register />} />
            <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
            <Route path={Routes.INVITE} component={Invite} />

            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute path={Routes.AUTHENTICATION_LOGIN_TYPE} component={Authentication} />
                <PrivateRoute path={Routes.APPS} component={Apps} exact fetcher />
                <PrivateRoute path={Routes.APP_DETAIL} component={AppDetail} exact fetcher />
                <PrivateRoute path={Routes.APPS_EDIT} component={EditApp} exact fetcher />
                <PrivateRoute path={Routes.API_DOCS} component={ApiDocsPage} />
                <PrivateRoute path={Routes.WEBHOOKS} fetcher component={WebhooksPage} />
                <PrivateRoute path={Routes.SWAGGER} exact component={SwaggerPage} />
                <PrivateRoute path={Routes.DESKTOP} exact component={DesktopPage} />
                <PrivateRoute path={Routes.ANALYTICS_TAB} fetcher exact component={AnalyticsPage} />

                <PrivateRoute path={Routes.SETTINGS} exact component={RedirectToSettingsProfilePage} />
                <PrivateRoute path={Routes.SETTINGS_PROFILE_TAB} fetcher exact component={SettingsPage} />
                <PrivateRoute path={Routes.SETTINGS_BILLING_TAB} fetcher component={SettingsBillingTabPage} />
                <PrivateRoute path={Routes.SETTINGS_ORGANISATION_TAB} fetcher component={SettingsOrganisationTabPage} />
                <PrivateRoute path={Routes.WELCOME} exact component={WelcomePage} />
                <PrivateRoute path={Routes.HELP} exact fetcher component={HelpPage} />
                <PrivateRoute path={Routes.DEVELOPER_EDITION_DOWNLOAD} component={EditionDownloadPage} />
                <PrivateRoute path={Routes.APP_PREVIEW} exact component={AppDetailPreview} />
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
