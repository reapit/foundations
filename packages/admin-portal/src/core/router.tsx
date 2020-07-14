import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements'
import { PortalProvider } from '@reapit/elements'

export const history = createBrowserHistory()
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const AdminApprovalsPage = React.lazy(() => catchChunkError(() => import('../components/pages/approvals')))
const AdminDevManagementPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/admin-dev-management')),
)
const AdminAppsPage = React.lazy(() => catchChunkError(() => import('../components/pages/admin-apps')))
const AdminStats = React.lazy(() => catchChunkError(() => import('../components/pages/admin-stats')))
const DeveloperAdminBillingPage = React.lazy(() => catchChunkError(() => import('../components/pages/admin-billing')))

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute allow="ADMIN" path={Routes.BILLING} component={DeveloperAdminBillingPage} exact />
                <PrivateRoute
                  allow="ADMIN"
                  path={Routes.ADMIN_APPROVALS}
                  component={AdminApprovalsPage}
                  exact
                  fetcher
                />
                <PrivateRoute allow="ADMIN" path={Routes.APPS} component={AdminAppsPage} fetcher exact />
                <PrivateRoute
                  allow="ADMIN"
                  path={Routes.DEV_MANAGEMENT}
                  component={AdminDevManagementPage}
                  exact
                  fetcher
                />
                <PrivateRoute allow="ADMIN" path={Routes.STATS} component={AdminStats} exact />
                <Route render={() => <Info infoType="404" />} />
              </Switch>
            </PrivateRouteWrapper>
            <Redirect to={Routes.LOGIN} />
          </Switch>
        </PortalProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
