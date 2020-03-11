import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => import('../components/pages/login'))
const Home = React.lazy(() => import('../components/pages/home'))
const OfficesPage = React.lazy(() => import('../components/pages/offices'))
const NegotiatorsPage = React.lazy(() => import('../components/pages/negotiators'))
const GetStartedPage = React.lazy(() => import('../components/pages/get-started'))

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={Routes.LOGIN} exact component={LoginPage} />
          <PrivateRouteWrapper path="/">
            <Switch>
              <PrivateRoute allow="CLIENT" path={Routes.HOME} component={Home} />
              <PrivateRoute allow="CLIENT" path={Routes.OFFICES} component={OfficesPage} />
              <PrivateRoute allow="CLIENT" path={Routes.USERS} component={NegotiatorsPage} />
              <PrivateRoute allow="CLIENT" path={Routes.GET_STARTED} component={GetStartedPage} />
            </Switch>
          </PrivateRouteWrapper>
          <Redirect to={Routes.LOGIN} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
