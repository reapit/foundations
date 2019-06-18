import * as React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'

const Home = loadable(() => import('../components/pages/home'))
const Item = loadable(() => import('../components/pages/item'))

const Router = () => (
  <BrowserRouter>
    <Route path={Routes.HOME} exact render={props => <RouteFetcher routerProps={props} Component={Home} />} />
    <Route path={Routes.ITEM} render={props => <RouteFetcher routerProps={props} Component={Item} />} />
  </BrowserRouter>
)

export default Router
