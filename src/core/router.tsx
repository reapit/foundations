import * as React from 'react'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRoute from '../core/private-route'

const Home = loadable(() => import('../components/pages/home'))
const Item = loadable(() => import('../components/pages/item'))
const Login = loadable(() => import('../components/pages/login'))
const Client = loadable(() => import('../components/pages/client'))

const Router = () => (
  <BrowserRouter>
    <Route path={Routes.HOME} exact render={props => <RouteFetcher routerProps={props} Component={Home} />} />
    <Route path={Routes.ITEM} render={props => <RouteFetcher routerProps={props} Component={Item} />} />
    <Route path={Routes.LOGIN} exact render={props => <RouteFetcher routerProps={props} Component={Login} />} />
    <PrivateRoute path={Routes.CLIENT} exact component={Client} />
    <Redirect to="/login" />
  </BrowserRouter>
)

export default Router
