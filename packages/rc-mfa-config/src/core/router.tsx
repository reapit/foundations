import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Routes } from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'
import { catchChunkError } from '@reapit/utils-react'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/login')))
const HomePage = React.lazy(() => catchChunkError(() => import('../components/home')))
const AdminPage = React.lazy(() => catchChunkError(() => import('../components/admin')))

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <Route path={Routes.HOME} exact component={HomePage} />
            <Route path={Routes.ADMIN} exact component={AdminPage} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
