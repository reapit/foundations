import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { catchChunkError } from '@reapit/utils'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'

export const history = createBrowserHistory()

const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const ProfilePage = React.lazy(() => catchChunkError(() => import('../components/pages/profile')))
const SuccessPage = React.lazy(() => catchChunkError(() => import('../components/pages/success')))
const searchPage = React.lazy(() => catchChunkError(() => import('../components/pages/client-search')))
const resultsPage = React.lazy(() => catchChunkError(() => import('../components/pages/results')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={() => <Login />} />
        <PrivateRouteWrapper path="/">
          <Switch>
            <PrivateRoute allow="CLIENT" path={Routes.PROFILE_SUCCESS} component={SuccessPage} />
            <PrivateRoute allow="CLIENT" path={Routes.PROFILE_ID} component={ProfilePage} fetcher />
            <PrivateRoute allow="CLIENT" path={Routes.SEARCH} component={searchPage} />
            <PrivateRoute allow="CLIENT" exact path={Routes.HOME} component={searchPage} />
            <PrivateRoute allow="CLIENT" path={Routes.RESULTS} component={resultsPage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
