import * as React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
const Register = React.lazy(() => import('../components/pages/register'))
const Developer = React.lazy(() => import('../components/pages/developer'))

const Router = () => (
  <BrowserRouter>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} exact render={props => <RouteFetcher routerProps={props} Component={Login} />} />
        <Route
          path={Routes.REGISTER}
          exact
          render={props => <RouteFetcher routerProps={props} Component={Register} />}
        />
        <PrivateRouteWrapper path="/">
          <Switch>
            <Route
              path={Routes.CLIENT}
              exact
              render={props => <RouteFetcher routerProps={props} Component={Client} />}
            />
            <Route
              path={Routes.MY_APPS}
              exact
              render={props => <RouteFetcher routerProps={props} Component={MyApps} />}
            />
            <Route
              path={Routes.DEVELOPER}
              exact
              render={props => <RouteFetcher routerProps={props} Component={Developer} />}
            />
          </Switch>
        </PrivateRouteWrapper>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
