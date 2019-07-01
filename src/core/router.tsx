import * as React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

const Home = React.lazy(() => import('../components/pages/home'))
const Item = React.lazy(() => import('../components/pages/item'))
const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
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
        <PrivateRouteWrapper path="/">
          <Route path={Routes.CLIENT} exact render={props => <RouteFetcher routerProps={props} Component={Client} />} />
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
        </PrivateRouteWrapper>
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
