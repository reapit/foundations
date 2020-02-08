import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => import('../components/pages/login'))
const HomePage = React.lazy(() => import('../components/pages/home'))
const AuthenticatedPage = React.lazy(() => import('../components/pages/authenticated'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.HOME} exact component={HomePage} fetcher />
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper path="/">
          <Switch>
            <PrivateRoute allow="CLIENT" path={Routes.AUTHENTICATED} component={AuthenticatedPage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
