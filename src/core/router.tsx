import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const Login = React.lazy(() => import('../components/pages/login'))
const HomePage = React.lazy(() => import('../components/pages/home'))
const ProfilePage = React.lazy(() => import('../components/pages/profile'))
const SuccessPage = React.lazy(() => import('../components/pages/success'))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <PrivateRouteWrapper path="/">
          <Switch>
            <PrivateRoute allow="CLIENT" path={Routes.SUCCESS} component={SuccessPage} />
            <PrivateRoute allow="CLIENT" path={Routes.PROFILE} component={ProfilePage} fetcher />
            <PrivateRoute allow="CLIENT" path={Routes.HOME} component={HomePage} fetcher />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
