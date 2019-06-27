import * as React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRoute from '../core/private-route'

const Home = React.lazy(() => import('../components/pages/home'))
const Item = React.lazy(() => import('../components/pages/item'))
const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const Register = React.lazy(() => import('../components/pages/register'))
const Developer = React.lazy(() => import('../components/pages/developer'))

const Router = () => (
  <BrowserRouter>
    <React.Suspense fallback={null}>
      <Switch>
        <Route path={Routes.HOME} exact render={props => <RouteFetcher routerProps={props} Component={Home} />} />
        <Route path={Routes.ITEM} exact render={props => <RouteFetcher routerProps={props} Component={Item} />} />
        <Route path={Routes.LOGIN} exact render={props => <RouteFetcher routerProps={props} Component={Login} />} />
        <Route
          path={Routes.REGISTER}
          exact
          render={props => <RouteFetcher routerProps={props} Component={Register} />}
        />
        <PrivateRoute path={Routes.CLIENT} exact component={Client} />
        <PrivateRoute path={Routes.DEVELOPER} exact component={Developer} />
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
