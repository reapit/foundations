import React, { FC } from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Routes } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

export const history: History<any> = createBrowserHistory()

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

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const AppsBrowseManagerPage = React.lazy(() => catchChunkError(() => import('../components/apps-market-manager')))

const Router: FC = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <Route path={Routes.HOME} exact component={AppsBrowseManagerPage} />
            <Route path={Routes.APPS_BROWSE_MANAGER} exact component={AppsBrowseManagerPage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
