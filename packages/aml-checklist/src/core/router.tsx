import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const ChecklistDetail = React.lazy(() => catchChunkError(() => import('../components/pages/checklist-detail')))
const ClientSearch = React.lazy(() => catchChunkError(() => import('../components/pages/client-search')))
const Results = React.lazy(() => catchChunkError(() => import('../components/pages/results')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <PrivateRouteWrapper path="/">
          <Switch>
            <PrivateRoute allow="CLIENT" path={Routes.CHECKLIST_DETAIL} component={ChecklistDetail} fetcher />
            <PrivateRoute allow="CLIENT" exact path={Routes.HOME} component={ClientSearch} />
            <PrivateRoute allow="CLIENT" path={Routes.RESULTS} component={Results} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
