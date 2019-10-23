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
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
const Register = React.lazy(() => import('../components/pages/register'))
const DeveloperHome = React.lazy(() => import('../components/pages/developer-home'))
const DeveloperSubmitApp = React.lazy(() => import('../components/pages/developer-submit-app'))
const AdminApprovalsPage = React.lazy(() => import('../components/pages/admin-approvals'))
const ApiDocsPage = React.lazy(() => import('../components/pages/api-docs'))
const SwaggerPage = React.lazy(() => import('../components/pages/swagger'))
const ElementsPage = React.lazy(() => import('../components/pages/elements'))
const DesktopDocsPage = React.lazy(() => import('../components/pages/desktop-api-docs'))
const WebComponentsPage = React.lazy(() => import('../components/pages/web-components'))
const SettingsPage = React.lazy(() => import('../components/pages/settings'))
const AnalyticsPage = React.lazy(() => import('../components/pages/analytics'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <Route path={Routes.ADMIN_LOGIN} exact render={() => <Login />} />
        <Route path={Routes.REGISTER} exact render={() => <Register />} />
        <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
        <PrivateRouteWrapper path="/">
          <Switch>
            <PrivateRoute allow="CLIENT" path={Routes.MY_APPS_PAGINATE} component={MyApps} fetcher />
            <PrivateRoute allow="CLIENT" path={Routes.MY_APPS} component={MyApps} fetcher exact />
            <PrivateRoute allow="CLIENT" path={Routes.CLIENT_PAGINATE} component={Client} fetcher />
            <PrivateRoute allow="CLIENT" path={Routes.CLIENT} component={Client} exact fetcher />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_MY_APPS} component={DeveloperHome} exact fetcher />
            <PrivateRoute
              allow="DEVELOPER"
              path={Routes.DEVELOPER_MY_APPS_PAGINATE}
              component={DeveloperHome}
              exact
              fetcher
            />
            <PrivateRoute allow="DEVELOPER" path={Routes.SUBMIT_APP} fetcher component={DeveloperSubmitApp} />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_API_DOCS} exact component={ApiDocsPage} />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_SWAGGER} exact component={SwaggerPage} />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_ELEMENTS} exact component={ElementsPage} />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_ANALYTICS} exact component={AnalyticsPage} />
            <PrivateRoute allow="DEVELOPER" path={Routes.DEVELOPER_DESKTOP_DOCS} exact component={DesktopDocsPage} />
            <PrivateRoute
              allow="DEVELOPER"
              path={Routes.DEVELOPER_WEB_COMPONENTS}
              exact
              component={WebComponentsPage}
            />
            <PrivateRoute allow="DEVELOPER" path={Routes.SETTINGS} exact component={SettingsPage} />
            <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPROVALS} component={AdminApprovalsPage} exact fetcher />
            <PrivateRoute allow="ADMIN" path={Routes.ADMIN_APPROVALS_PAGINATE} component={AdminApprovalsPage} fetcher />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
