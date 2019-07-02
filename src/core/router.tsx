import * as React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRouteWrapper from './private-route-wrapper'

const Login = React.lazy(() => import('../components/pages/login'))
const Client = React.lazy(() => import('../components/pages/client'))
const MyApps = React.lazy(() => import('../components/pages/my-apps'))
const Register = React.lazy(() => import('../components/pages/register'))
const DeveloperHome = React.lazy(() => import('../components/pages/developer-home'))
const DeveloperSubmitApp = React.lazy(() => import('../components/pages/developer-submit-app'))

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
          <Route path={Routes.CLIENT} exact render={props => <RouteFetcher routerProps={props} Component={Client} />} />
          <Route
            path={Routes.MY_APPS}
            exact
            render={props => <RouteFetcher routerProps={props} Component={MyApps} />}
          />
          <Route
            path={Routes.DEVELOPER}
            exact
            render={props => <RouteFetcher routerProps={props} Component={DeveloperHome} />}
          />
          <Route path={Routes.SUBMIT_APP} component={DeveloperSubmitApp} />
        </PrivateRouteWrapper>
        <Redirect to={Routes.LOGIN} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
)

export default Router
