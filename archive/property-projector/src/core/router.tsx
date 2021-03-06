import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

import { PortalProvider } from '@reapit/elements'

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
const ProjectorAppPage = React.lazy(() => catchChunkError(() => import('../components/pages/projectorApp')))
const DocumentationPage = React.lazy(() => catchChunkError(() => import('../components/pages/documentation')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <PortalProvider>
        <Switch>
          <Route path={Routes.LOGIN} component={LoginPage} />
          <PrivateRouteWrapper>
            <Switch>
              <Route exact path={Routes.HOME} component={ProjectorAppPage} />
              <Route path={Routes.DOCS} component={DocumentationPage} />
            </Switch>
          </PrivateRouteWrapper>
          <Redirect to={Routes.LOGIN} />
        </Switch>
      </PortalProvider>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
