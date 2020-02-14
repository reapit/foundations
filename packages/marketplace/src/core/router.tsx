import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements'

export const history = createBrowserHistory()

const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const InstalledApps = React.lazy(() => import('../components/pages/installed-apps'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
// const Register = React.lazy(() => import('../components/pages/register'))
const DeveloperHome = React.lazy(() => import('../components/pages/developer-home'))
const DeveloperSubmitApp = React.lazy(() => import('../components/pages/developer-submit-app'))
const AdminApprovalsPage = React.lazy(() => import('../components/pages/admin-approvals'))
const AdminDevManagementPage = React.lazy(() => import('../components/pages/admin-dev-management'))
const ApiDocsPage = React.lazy(() => import('../components/pages/api-docs'))
const SwaggerPage = React.lazy(() => import('../components/pages/swagger'))
const ElementsPage = React.lazy(() => import('../components/pages/elements'))
const SettingsPage = React.lazy(() => import('../components/pages/settings'))
const DeveloperWelcomePage = React.lazy(() => import('../components/pages/developer-welcome'))
const HelpPage = React.lazy(() => import('../components/pages/help'))
const AnalyticsPage = React.lazy(() => import('../components/pages/analytics'))
const ResetPassword = React.lazy(() => import('../components/pages/reset-password'))
const ForgotPassword = React.lazy(() => import('../components/pages/forgot-password/forgot-password'))
const AdminAppsPage = React.lazy(() => import('../components/pages/admin-apps'))
const RegisterConfirm = React.lazy(() => import('../components/pages/register-confirm'))
const AdminStats = React.lazy(() => import('../components/pages/admin-stats'))

const Router = () => {
  const isReapitEnvProd = process.env.REAPIT_ENV === 'PROD'
  const paths = [Routes.DEVELOPER_LOGIN, Routes.ADMIN_LOGIN]
  if (!isReapitEnvProd) {
    paths.push(Routes.CLIENT_LOGIN)
  }
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={paths} exact render={() => <Login />} />
          <Route path={Routes.DEVELOPER_RESET_PASSWORD} component={ResetPassword} />
          {/* <Route path={Routes.REGISTER} exact component={Register} /> */}
          <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
          <Route path={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
          <PrivateRouteWrapper path="/">
            <Switch>
              <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS_PAGINATE} component={InstalledApps} fetcher />
              <PrivateRoute allow="CLIENT" path={Routes.INSTALLED_APPS} component={InstalledApps} fetcher exact />
              <PrivateRoute allow="CLIENT" path={Routes.MY_APPS_PAGINATE} component={MyApps} fetcher />
              <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={MyApps} fetcher exact />
              <PrivateRoute allow="CLIENT" path={Routes.CLIENT} component={Client} exact fetcher />

              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_MY_APPS} component={DeveloperHome} exact fetcher />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_MY_APPS_PAGINATE}
                component={DeveloperHome}
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
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_API_DOCS} exact component={ApiDocsPage} />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_SWAGGER} exact component={SwaggerPage} />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_ELEMENTS} exact component={ElementsPage} />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_ANALYTICS}
                fetcher
                exact
                component={AnalyticsPage}
              />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_ANALYTICS_PAGINATE}
                fetcher
                exact
                component={AnalyticsPage}
              />
              <PrivateRoute allow="DEVELOPER" path={Routes.SETTINGS} fetcher exact component={SettingsPage} />
              <PrivateRoute
                allow="DEVELOPER"
                path={Routes.DEVELOPER_WELCOME}
                fetcher
                exact
                component={DeveloperWelcomePage}
              />
              <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_HELP} exact fetcher component={HelpPage} />

              <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPROVALS} component={AdminApprovalsPage} exact fetcher />
              <PrivateRoute
                allow="ADMIN"
                path={Routes.ADMIN_APPROVALS_PAGINATE}
                component={AdminApprovalsPage}
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
