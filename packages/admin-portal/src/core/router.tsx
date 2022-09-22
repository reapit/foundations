import React, { FC } from 'react'
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError, OkayPage } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import { createBrowserHistory, History } from 'history'
import { PageContainer, PersistentNotification } from '@reapit/elements'

export const history: History<any> = createBrowserHistory()

const PrivateRouteWrapper = React.lazy(() => catchChunkError(() => import('./private-route-wrapper')))
const Login = React.lazy(() => catchChunkError(() => import('../components/login')))
const ApprovalsPage = React.lazy(() => catchChunkError(() => import('../components/approvals')))
const DevsManagementPage = React.lazy(() => catchChunkError(() => import('../components/developers')))
const AppsManagementPage = React.lazy(() => catchChunkError(() => import('../components/apps')))
const InstallationsPage = React.lazy(() => catchChunkError(() => import('../components/installations')))
const BillingPage = React.lazy(() => catchChunkError(() => import('../components/billing')))
const CustomersPage = React.lazy(() => catchChunkError(() => import('../components/customers')))
const SubscriptionsPage = React.lazy(() => catchChunkError(() => import('../components/subscriptions')))
const UsagePage = React.lazy(() => catchChunkError(() => import('../components/usage')))
const TrafficPage = React.lazy(() => catchChunkError(() => import('../components/traffic')))
const IaaSPage = React.lazy(() => catchChunkError(() => import('../components/iaas')))

export const FourOFour: FC = () => (
  <PageContainer>
    <PersistentNotification isFullWidth isInline isExpanded intent="danger">
      Page not found
    </PersistentNotification>
  </PageContainer>
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path={Routes.OK} exact render={() => <OkayPage />} />
          <Route path={Routes.LOGIN} exact render={() => <Login />} />
          <Route path={Routes.FOUR_O_FOUR} exact render={() => <FourOFour />} />
          <PrivateRouteWrapper>
            <Switch>
              <PrivateRoute path={Routes.BILLING} component={BillingPage} exact />
              <PrivateRoute path={Routes.TRAFFIC} component={TrafficPage} exact />
              <PrivateRoute path={Routes.USAGE} component={UsagePage} exact />
              <PrivateRoute path={Routes.APPROVALS} component={ApprovalsPage} exact fetcher />
              <PrivateRoute path={Routes.APPS} component={AppsManagementPage} exact />
              <PrivateRoute path={Routes.DEV_MANAGEMENT} component={DevsManagementPage} exact fetcher />
              <PrivateRoute path={Routes.INSTALLATIONS} component={InstallationsPage} exact />
              <PrivateRoute path={Routes.CUSTOMERS} component={CustomersPage} exact />
              <PrivateRoute path={Routes.SUBSCRIPTIONS} component={SubscriptionsPage} exact />
              <PrivateRoute path={Routes.IAAS} component={IaaSPage} exact />
              <Route render={() => <FourOFour />} />
            </Switch>
          </PrivateRouteWrapper>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
