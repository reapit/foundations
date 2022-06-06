import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { SWRConfig } from 'swr'
import { fetcher } from '../utils/fetcher'
import { OkayPage } from '@reapit/utils-react'

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

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Offices = React.lazy(() => catchChunkError(() => import('../components/pages/offices')))
const Users = React.lazy(() => catchChunkError(() => import('../components/pages/users')))
const Marketplace = React.lazy(() => catchChunkError(() => import('../components/pages/marketplace')))
const AccessDenied = React.lazy(() => catchChunkError(() => import('../components/pages/access-denied')))
const MarketplaceAppPage = React.lazy(() => catchChunkError(() => import('../components/pages/marketplace-app')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.OK} exact render={() => <OkayPage />} />
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              fetcher,
            }}
          >
            <Switch>
              <Route path={Routes.OFFICES} component={Offices} />
              <Route path={Routes.USERS} component={Users} />
              <Route path={Routes.MARKETPLACE} component={Marketplace} exact />
              <Route path={Routes.MARKETPLACE_APP} component={MarketplaceAppPage} />
              <Route path={Routes.ACCESS_DENIED} component={AccessDenied} />
            </Switch>
          </SWRConfig>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
