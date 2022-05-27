import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import { OkayPage } from '@reapit/utils-react'

export const history: History<any> = createBrowserHistory()

const PrivateRouteWrapper = React.lazy(() => catchChunkError(() => import('./private-route-wrapper')))
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const ChecklistDetail = React.lazy(() => catchChunkError(() => import('../components/pages/checklist-detail')))
const ClientSearch = React.lazy(() => catchChunkError(() => import('../components/pages/client-search')))
const Results = React.lazy(() => catchChunkError(() => import('../components/pages/results')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.OK} exact render={() => <OkayPage />} />
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <PrivateRouteWrapper>
          <Switch>
            <PrivateRoute path={Routes.CHECKLIST_DETAIL} component={ChecklistDetail} fetcher />
            <PrivateRoute exact path={Routes.HOME} component={ClientSearch} />
            <PrivateRoute path={Routes.RESULTS} component={Results} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
