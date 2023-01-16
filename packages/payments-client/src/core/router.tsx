import React from 'react'
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
const PaymentsPage = React.lazy(() => catchChunkError(() => import('../components/payments')))
const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <Switch>
          <Route path={Routes.PAYMENT} component={PaymentPage} exact />
          <PrivateRouteWrapper>
            <Route path={Routes.PAYMENTS} component={PaymentsPage} exact />
          </PrivateRouteWrapper>
        </Switch>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
