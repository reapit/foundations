import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import PrivateRoute from './private-route'

export const history = createBrowserHistory()

export const catchChunkError = (
  fn: Function,
  retriesLeft = 3,
  interval = 500,
): Promise<{ default: React.ComponentType<any> }> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: Error) => {
        // Ignore chunk cache error and retry to fetch, if cannot reload browser
        console.info(error)
        setTimeout(() => {
          if (retriesLeft === 1) {
            window.location.reload()
            return
          }
          catchChunkError(fn, retriesLeft - 1, interval).then(resolve, reject)
        }, interval)
      })
  })
}

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Offices = React.lazy(() => catchChunkError(() => import('../components/pages/offices')))
const OfficesGroups = React.lazy(() => catchChunkError(() => import('../components/pages/officesGroups')))
const Users = React.lazy(() => catchChunkError(() => import('../components/pages/users')))
const UsersGroups = React.lazy(() => catchChunkError(() => import('../components/pages/usersGroups')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <PrivateRoute path={Routes.OFFICES} component={Offices} exact />
            <PrivateRoute path={Routes.OFFICES_GROUPS} component={OfficesGroups} exact />
            <PrivateRoute path={Routes.USERS} component={Users} exact />
            <PrivateRoute path={Routes.USERS_GROUPS} component={UsersGroups} exact />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
