import React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Routes } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const PaymentsPage = React.lazy(() => catchChunkError(() => import('../components/payments')))
const PaymentPage = React.lazy(() => catchChunkError(() => import('../components/payment')))
const AdminPage = React.lazy(() => catchChunkError(() => import('../components/admin')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <Switch>
          <PrivateRouteWrapper>
            <Route path={Routes.PAYMENT} component={PaymentPage} exact />
            <Route path={Routes.PAYMENTS} component={PaymentsPage} exact />
            <Route path={Routes.ADMIN} component={AdminPage} exact />
          </PrivateRouteWrapper>
        </Switch>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
