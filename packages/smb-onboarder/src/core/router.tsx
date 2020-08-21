import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Help = React.lazy(() => catchChunkError(() => import('../components/pages/help')))
const OfficesPage = React.lazy(() => catchChunkError(() => import('../components/pages/offices')))
const NegotiatorsPage = React.lazy(() => catchChunkError(() => import('../components/pages/negotiators')))

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={Routes.LOGIN} exact component={LoginPage} />
          <PrivateRouteWrapper path="/">
            <Switch>
              <PrivateRoute path={Routes.HELP} component={Help} />
              <PrivateRoute path={Routes.OFFICES} component={OfficesPage} />
              <PrivateRoute path={Routes.USERS} component={NegotiatorsPage} />
            </Switch>
          </PrivateRouteWrapper>
          <Redirect to={Routes.LOGIN} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
