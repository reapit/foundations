import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements'

export const history = createBrowserHistory()

const Authentication = React.lazy(() => import('../components/pages/authentication'))
const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const ClientAppDetail = React.lazy(() => import('../components/pages/client-app-detail'))
const ClientAppDetailManage = React.lazy(() => import('../components/pages/client-app-detail-manage'))
const ClientWelcomePage = React.lazy(() => import('../components/pages/client-welcome'))
const InstalledApps = React.lazy(() => import('../components/pages/installed-apps'))
const ClientSetting = React.lazy(() => import('../components/pages/settings/client-setting'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
const Register = React.lazy(() => import('../components/pages/register'))
const DeveloperHome = React.lazy(() => import('../components/pages/developer-home'))
const DeveloperAppDetail = React.lazy(() => import('../components/pages/developer-app-detail'))
const DeveloperSubmitApp = React.lazy(() => import('../components/pages/developer-submit-app'))
const AdminApprovalsPage = React.lazy(() => import('../components/pages/admin-approvals'))
const AdminDevManagementPage = React.lazy(() => import('../components/pages/admin-dev-management'))
const ApiDocsPage = React.lazy(() => import('../components/pages/api-docs'))
const SwaggerPage = React.lazy(() => import('../components/pages/swagger'))
const ElementsPage = React.lazy(() => import('../components/pages/elements'))
const DeveloperSettings = React.lazy(() => import('../components/pages/settings/developer-settings'))
const DeveloperWelcomePage = React.lazy(() => import('../components/pages/developer-welcome'))
const DeveloperHelpPage = React.lazy(() => import('../components/pages/developer-help'))
const ClientHelpPage = React.lazy(() => import('../components/pages/client-help'))
const AnalyticsPage = React.lazy(() => import('@/components/pages/developer-analytics'))
const AdminAppsPage = React.lazy(() => import('../components/pages/admin-apps'))
const RegisterConfirm = React.lazy(() => import('../components/pages/register-confirm'))
const AdminStats = React.lazy(() => import('../components/pages/admin-stats'))
const DeveloperWebhooksPage = React.lazy(() => import('../components/pages/developer-webhooks'))

const Router = () => {
  const isProduction = window.reapit.config.appEnv === 'production'
  const paths = [Routes.DEVELOPER_LOGIN, Routes.ADMIN_LOGIN]
  if (!isProduction) {
    paths.push(Routes.CLIENT_LOGIN)
  }
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={paths} exact render={() => <Login />} />
          <Route allow="DEVELOPER" path={Routes.REGISTER} render={() => <Register />} />
          <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
          <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
          <PrivateRouteWrapper path="/">
            <Switch>
              <PrivateRoute
                allow={['CLIENT', 'DEVELOPER']}
                path={Routes.AUTHENTICATION_LOGIN_TYPE}
                component={Authentication}
              />
              <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS_PAGINATE} component={InstalledApps} fetcher />
              <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
              <PrivateRoute allow="CLIENT" path={Routes.MY_APPS_PAGINATE} component={MyApps} fetcher />
              <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={MyApps} fetcher exact />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT} component={Client} exact fetcher />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT_APP_DETAIL} component={ClientAppDetail} exact fetcher />
              <PrivateRoute
                allow="CLIENT"
                path={Routes.CLIENT_APP_DETAIL_MANAGE}
                component={ClientAppDetailManage}
                exact
                fetcher
              />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT_WELCOME} component={ClientWelcomePage} exact />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT_HELP} exact fetcher component={ClientHelpPage} />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT_SETTINGS} exact fetcher component={ClientSetting} />

              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_MY_APPS} component={DeveloperHome} exact fetcher />
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
                component={DeveloperSubmitApp}
                exact
                fetcher
              />
              <PrivateRoute allow="DEVELOPER" path={Routes.SUBMIT_APP} fetcher component={DeveloperSubmitApp} />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_API_DOCS} component={ApiDocsPage} />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_WEBHOOKS}
                fetcher
                component={DeveloperWebhooksPage}
              />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_SWAGGER} exact component={SwaggerPage} />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_ELEMENTS} exact component={ElementsPage} />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_ANALYTICS_TAB}
                fetcher
                exact
                component={AnalyticsPage}
              />
              <PrivateRoute allow="DEVELOPER" path={Routes.SETTINGS} fetcher exact component={DeveloperSettings} />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_WELCOME} exact component={DeveloperWelcomePage} />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_HELP}
                exact
                fetcher
                component={DeveloperHelpPage}
              />

              <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPROVALS} component={AdminApprovalsPage} exact fetcher />
              <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPS} component={AdminAppsPage} fetcher exact />
              <PrivateRoute
                allow="ADMIN"
                path={Routes.ADMIN_DEV_MANAGEMENT}
                component={AdminDevManagementPage}
                exact
                fetcher
              />
              <PrivateRoute
                allow="ADMIN"
                path={Routes.ADMIN_DEV_MANAGEMENT_PAGINATE}
                component={AdminDevManagementPage}
                exact
                fetcher
              />
              <PrivateRoute allow="ADMIN" path={Routes.ADMIN_STATS} component={AdminStats} exact fetcher />
              <Route render={() => <Info infoType="404" />} />
            </Switch>
          </PrivateRouteWrapper>
          <Redirect to={Routes.CLIENT_LOGIN} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
