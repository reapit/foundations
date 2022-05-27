import * as React from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import { createBrowserHistory, History } from 'history'
import { Info } from '@reapit/elements-legacy'
import { PortalProvider } from '@reapit/elements-legacy'
import { OkayPage } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()

const PrivateRouteWrapper = React.lazy(() => catchChunkError(() => import('./private-route-wrapper')))
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const ApprovalsPage = React.lazy(() => catchChunkError(() => import('../components/pages/approvals')))
const DevsManagementPage = React.lazy(() => catchChunkError(() => import('../components/pages/devs-management')))
const AppsManagementPage = React.lazy(() => catchChunkError(() => import('../components/pages/apps-management')))
const Statistics = React.lazy(() => catchChunkError(() => import('../components/pages/statistics')))
const BillingPage = React.lazy(() => catchChunkError(() => import('../components/pages/billing')))
const CustomersPage = React.lazy(() => catchChunkError(() => import('../components/pages/customers')))
const SubscriptionsPage = React.lazy(() => catchChunkError(() => import('../components/pages/subscriptions')))
const UsagePage = React.lazy(() => catchChunkError(() => import('../components/pages/usage')))

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.OK} exact render={() => <OkayPage />} />
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
            <PrivateRouteWrapper>
              <Switch>
                <PrivateRoute path={Routes.BILLING} component={BillingPage} exact />
                <PrivateRoute path={Routes.USAGE} component={UsagePage} exact />
                <PrivateRoute path={Routes.APPROVALS} component={ApprovalsPage} exact fetcher />
                <PrivateRoute path={Routes.APPS} component={AppsManagementPage} fetcher exact />
                <PrivateRoute path={Routes.DEV_MANAGEMENT} component={DevsManagementPage} exact fetcher />
                <PrivateRoute path={Routes.STATS} component={Statistics} exact />
                <PrivateRoute path={Routes.CUSTOMERS} component={CustomersPage} exact fetcher />
                <PrivateRoute path={Routes.SUBSCRIPTIONS} component={SubscriptionsPage} exact />
                <Route render={() => <Info infoType="404" />} />
              </Switch>
            </PrivateRouteWrapper>
          </Switch>
        </PortalProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
