import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
const Register = React.lazy(() => import('../components/pages/register'))
const DeveloperHome = React.lazy(() => import('../components/pages/developer-home'))
const DeveloperSubmitApp = React.lazy(() => import('../components/pages/developer-submit-app'))
const AdminPage = React.lazy(() => import('../components/pages/admin'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <Route path={Routes.ADMIN_LOGIN} exact render={() => <Login />} />
        <Route path={Routes.REGISTER} exact render={() => <Register />} />
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
            <PrivateRoute allow="DEVELOPER" path={Routes.SUBMIT_APP} component={DeveloperSubmitApp} />
            <PrivateRoute allow="ADMIN" path={Routes.ADMIN} component={AdminPage} exact fetcher />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
