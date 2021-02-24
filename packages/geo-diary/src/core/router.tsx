import * as React from 'react'
import { Route, Router as BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Loader } from '@reapit/elements'
import { catchChunkError } from '@reapit/utils'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { OkayPage } from '@reapit/utils'

export const history = createBrowserHistory()

const LoginPage = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Appointment = React.lazy(() => catchChunkError(() => import('../components/pages/appointment')))

export const ROUTES = {
  APPOINTMENT: '/',
  LOGIN: '/login',
  OK: '/ok',
}

const Router = () => (
  <BrowserRouter history={history}>
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path={ROUTES.OK} exact render={() => <OkayPage />} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <PrivateRouteWrapper>
          <Switch>
            <PrivateRoute allow="CLIENT" path={ROUTES.APPOINTMENT} component={Appointment} />
          </Switch>
        </PrivateRouteWrapper>
        <Redirect to={ROUTES.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
